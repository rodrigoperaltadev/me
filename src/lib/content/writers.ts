import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { ExperienceFileSchema, ExperienceEsOverlaySchema } from "./schemas";
import type { ExperienceFile, ExperienceEsOverlay } from "./schemas";

const CONTENT_DIR = path.join(process.cwd(), "content", "experience");

function checkWritable(): void {
  if (process.env.VERCEL === "1") {
    throw new Error("ADMIN_WRITES_DISABLED: writes not allowed in production");
  }
}

async function atomicWrite(filePath: string, content: string): Promise<void> {
  const tmp = `${filePath}.${process.pid}.tmp`;
  await fs.writeFile(tmp, content, "utf8");
  await fs.rename(tmp, filePath);
}

export async function writeExperience(data: ExperienceFile): Promise<void> {
  checkWritable();
  const parsed = ExperienceFileSchema.parse(data);
  const filePath = path.join(CONTENT_DIR, `${parsed.id}.json`);
  await atomicWrite(filePath, JSON.stringify(parsed, null, 2));
}

export async function writeExperienceEs(
  id: string,
  data: ExperienceEsOverlay
): Promise<void> {
  checkWritable();
  const parsed = ExperienceEsOverlaySchema.parse(data);
  const filePath = path.join(CONTENT_DIR, `${id}.es.json`);
  await atomicWrite(filePath, JSON.stringify(parsed, null, 2));
}

export async function deleteExperience(id: string): Promise<void> {
  checkWritable();
  const base = path.join(CONTENT_DIR, `${id}.json`);
  const overlay = path.join(CONTENT_DIR, `${id}.es.json`);
  try {
    await fs.unlink(base);
  } catch (err: unknown) {
    if (err instanceof Error && "code" in err && (err as { code: string }).code !== "ENOENT") throw err;
  }
  try {
    await fs.unlink(overlay);
  } catch (err: unknown) {
    if (err instanceof Error && "code" in err && (err as { code: string }).code !== "ENOENT") throw err;
  }
}

export async function experienceExists(id: string): Promise<boolean> {
  const filePath = path.join(CONTENT_DIR, `${id}.json`);
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}
