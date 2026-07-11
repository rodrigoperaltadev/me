import { NextResponse } from "next/server";
import { getPassword, setSession } from "@/lib/admin/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const password = body.password;
    const expected = getPassword();
    if (password !== expected) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    await setSession();
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    if (err instanceof Error && err.message?.includes("ADMIN_PASSWORD")) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
