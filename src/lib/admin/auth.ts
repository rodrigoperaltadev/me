import "server-only";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export function getPassword(): string {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw || pw.length < 8) {
    throw new Error("ADMIN_PASSWORD must be set and >= 8 chars");
  }
  return pw;
}

async function getSecret(): Promise<string> {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;
  if (!secret || secret.length < 16) {
    throw new Error("ADMIN_SESSION_SECRET or ADMIN_PASSWORD (>=16 chars) required");
  }
  return secret;
}

async function sign(payload: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  const hash = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `${payload}.${hash}`;
}

async function verify(token: string, secret: string): Promise<boolean> {
  const lastDot = token.lastIndexOf(".");
  if (lastDot === -1) return false;
  const payload = token.slice(0, lastDot);
  const expected = await sign(payload, secret);
  return token === expected;
}

export async function setSession(): Promise<void> {
  const secret = await getSecret();
  const exp = Date.now() + SESSION_TTL_MS;
  const token = await sign(String(exp), secret);
  const isProd = process.env.NODE_ENV === "production";
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    expires: new Date(exp),
  });
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function getSession(): Promise<{ valid: boolean; exp: number | null }> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return { valid: false, exp: null };
  try {
    const secret = await getSecret();
    if (!(await verify(token, secret))) return { valid: false, exp: null };
    const lastDot = token.lastIndexOf(".");
    const exp = parseInt(token.slice(0, lastDot), 10);
    if (isNaN(exp) || exp < Date.now()) return { valid: false, exp: null };
    return { valid: true, exp };
  } catch {
    return { valid: false, exp: null };
  }
}
