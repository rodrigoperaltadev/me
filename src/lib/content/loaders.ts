/**
 * Content loaders for the admin backoffice.
 *
 * Reads experience entries from `content/experience/<id>.json` (EN base)
 * and overlays Spanish translations from `<id>.es.json`.
 *
 * SERVER-ONLY: this module uses `node:fs`. NEVER import from a client
 * component — Turbopack will fail the build. Import types from
 * `./types` instead.
 */

import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";

import type { ExperienceEntry, ExperienceEsOverlay, Lang } from "./types";

// Re-export types so existing imports `from "@/lib/content/loaders"` keep working.
export type { ExperienceEntry, ExperienceEsOverlay, Lang } from "./types";
export { idToSlug } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content", "experience");

/**
 * Read and parse a single JSON file. Returns null on any error.
 * Logs a warning so issues are visible without crashing the loader.
 */
async function readJson<T>(filePath: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`[content/loaders] skipping ${filePath}: ${(err as Error).message}`);
    return null;
  }
}

/** List all base entry IDs by scanning for `<id>.json` (not `<id>.es.json`). */
export async function listExperienceIds(): Promise<string[]> {
  try {
    const entries = await fs.readdir(CONTENT_DIR);
    return entries
      .filter((name) => name.endsWith(".json") && !name.endsWith(".es.json"))
      .map((name) => name.replace(/\.json$/, ""))
      .sort();
  } catch (err) {
    console.warn(`[content/loaders] cannot list ${CONTENT_DIR}: ${(err as Error).message}`);
    return [];
  }
}

/** Read a single base EN entry. Returns null if missing/malformed. */
async function readBaseEntry(id: string): Promise<ExperienceEntry | null> {
  const filePath = path.join(CONTENT_DIR, `${id}.json`);
  const entry = await readJson<ExperienceEntry>(filePath);
  if (entry && entry.id !== id) {
    console.warn(`[content/loaders] id mismatch in ${filePath}: file.id=${entry.id} expected=${id}`);
    return null;
  }
  return entry;
}

/** Read a single ES overlay. Returns null if file missing (not an error). */
async function readEsOverlay(id: string): Promise<ExperienceEsOverlay | null> {
  const filePath = path.join(CONTENT_DIR, `${id}.es.json`);
  return readJson<ExperienceEsOverlay>(filePath);
}

/** Sort entries newest-first by `year` string. Heuristic: first 4 chars = year. */
function sortByYearDesc(a: ExperienceEntry, b: ExperienceEntry): number {
  const ya = parseInt(a.year.slice(0, 4), 10);
  const yb = parseInt(b.year.slice(0, 4), 10);
  return yb - ya;
}

/**
 * Read ALL experience entries, localized.
 * For "en": returns base entries only.
 * For "es": merges ES overlay (role + points) over base, falling back to base
 * if no overlay exists.
 */
export async function getExperienceData(lang: Lang): Promise<ExperienceEntry[]> {
  const ids = await listExperienceIds();
  const results = await Promise.all(
    ids.map(async (id) => {
      const base = await readBaseEntry(id);
      if (!base) return null;
      if (lang === "en") return base;
      const overlay = await readEsOverlay(id);
      if (!overlay) return base;
      return { ...base, role: overlay.role, points: overlay.points };
    })
  );
  return results.filter((e): e is ExperienceEntry => e !== null).sort(sortByYearDesc);
}

/** Read a single entry by id OR slug, localized. Returns null if not found.
 * Accepts both `000_VAL2` and `000-val2` — normalizes the latter to the former. */
export async function getExperienceEntry(
  idOrSlug: string,
  lang: Lang
): Promise<ExperienceEntry | null> {
  // Slugs are lowercase + hyphenated; ids are uppercase + underscored.
  // Convert slugs to ids so file lookups match `content/experience/<ID>.json`.
  const normalizedId = idOrSlug.toUpperCase().replace("-", "_");
  const base = await readBaseEntry(normalizedId);
  if (!base) return null;
  if (lang === "en") return base;
  const overlay = await readEsOverlay(normalizedId);
  if (!overlay) return base;
  return { ...base, role: overlay.role, points: overlay.points };
}

/**
 * Union of all stack arrays across experience entries, deduplicated.
 * Used by the CV to surface only skills the person actually has.
 */
export async function getCoreSkills(): Promise<string[]> {
  const all = await getExperienceData("en");
  return Array.from(new Set(all.flatMap((e) => e.stack))).sort();
}