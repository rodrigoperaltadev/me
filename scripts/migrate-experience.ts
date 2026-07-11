/**
 * Migrate experience data from the legacy TS sources
 * (`src/lib/experienceData.ts` + `src/lib/experienceDataEs.ts`)
 * into `content/experience/*.json` + `*.es.json`.
 *
 * Idempotent: running twice produces byte-identical output.
 *
 * Usage:
 *   npx tsx scripts/migrate-experience.ts
 *
 * Reads the TS files as text and parses with a tiny regex extractor
 * (no TS compiler needed — keeps the script dependency-free).
 */

import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const EN_SRC = path.join(ROOT, "src", "lib", "experienceData.ts");
const ES_SRC = path.join(ROOT, "src", "lib", "experienceDataEs.ts");
const OUT_DIR = path.join(ROOT, "content", "experience");

interface ExperienceEntry {
  year: string;
  company: string;
  industry: string;
  role: string;
  active?: boolean;
  points: string[];
  stack: string[];
  id: string;
}

/**
 * Extract the `experienceData = [...]` array literal as a JSON-compatible string.
 * TypeScript allows unquoted keys (`year: "..."`), but JSON requires them quoted
 * (`"year": "..."`). We quote top-level keys per line before parsing.
 *
 * Strings in the source use double quotes; if any contain escaped backslashes
 * or unicode, JSON.parse handles them. Single quotes and template literals
 * would break this — that's by design (controlled source).
 *
 * Bracket-balancing: locate the matching `]` for the opening `[` so we don't
 * accidentally extend past the array into subsequent type/function declarations.
 */
function extractArrayLiteral(source: string, identifier: string): string {
  const marker = `export const ${identifier} =`;
  const startIdx = source.indexOf(marker);
  if (startIdx === -1) {
    throw new Error(`Could not find "${marker}" in source`);
  }
  const bracketStart = source.indexOf("[", startIdx);
  if (bracketStart === -1) {
    throw new Error(`Could not find "[" after marker for "${identifier}"`);
  }
  // Walk forward, tracking depth, ignoring brackets inside strings.
  let depth = 0;
  let bracketEnd = -1;
  let inString = false;
  for (let i = bracketStart; i < source.length; i++) {
    const ch = source[i];
    if (ch === '"') {
      // Toggle string mode; handle escape \\"
      if (inString && source[i - 1] !== "\\") inString = false;
      else if (!inString) inString = true;
      continue;
    }
    if (inString) continue;
    if (ch === "[") depth++;
    else if (ch === "]") {
      depth--;
      if (depth === 0) {
        bracketEnd = i;
        break;
      }
    }
  }
  if (bracketEnd === -1) {
    throw new Error(`Unbalanced brackets for "${identifier}"`);
  }
  const raw = source.slice(bracketStart, bracketEnd + 1);
  let transformed = raw.replace(
    /^(\s*)([a-zA-Z_]\w*)(?=\s*:)/gm,
    (_match, indent: string, key: string) => `${indent}"${key}"`
  );
  // Strip trailing commas before `]` and `}` (JSON disallows them; TS allows).
  // Run twice because each replacement can reveal another trailing comma.
  for (let i = 0; i < 5; i++) {
    const before = transformed;
    transformed = transformed
      .replace(/,(\s*[}\]])/g, "$1")
      .replace(/,(\s*,)/g, ","); // belt-and-suspenders for `,,` chains
    if (transformed === before) break;
  }
  return transformed;
}

/**
 * Extract the Spanish translation object from experienceDataEs.ts.
 * The shape is `const experienceTranslationsEs: Record<...> = { id: {role, points}, ... };`
 * Bracket-balanced: walk forward from the opening `{` to find its matching `}`,
 * ignoring braces inside strings.
 */
function extractTranslationsObject(source: string): string {
  const marker = "const experienceTranslationsEs";
  const startIdx = source.indexOf(marker);
  if (startIdx === -1) {
    throw new Error(`Could not find "${marker}" in source`);
  }
  // Find the `=` that starts the value (after the type annotation), then the
  // opening `{` of the object literal. The first `{` after `marker` is the
  // start of the type annotation `Record<...>`, NOT the object literal.
  const eqIdx = source.indexOf("=", startIdx);
  if (eqIdx === -1) throw new Error(`Could not find "=" after marker`);
  const braceStart = source.indexOf("{", eqIdx);
  if (braceStart === -1) {
    throw new Error(`Could not find "{" after "="`);
  }
  let depth = 0;
  let braceEnd = -1;
  let inString = false;
  for (let i = braceStart; i < source.length; i++) {
    const ch = source[i];
    if (ch === '"') {
      if (inString && source[i - 1] !== "\\") inString = false;
      else if (!inString) inString = true;
      continue;
    }
    if (inString) continue;
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) {
        braceEnd = i;
        break;
      }
    }
  }
  if (braceEnd === -1) {
    throw new Error(`Unbalanced braces in translations`);
  }
  let transformed = source.slice(braceStart, braceEnd + 1);
  // Quote unquoted keys at line start (matches role:, points: inside translation objects).
  transformed = transformed.replace(
    /^(\s*)([a-zA-Z_]\w*)(?=\s*:)/gm,
    (_match, indent: string, key: string) => `${indent}"${key}"`
  );
  // Strip trailing commas before `}` and `]` (defensive — current source shouldn't have any).
  for (let i = 0; i < 5; i++) {
    const before = transformed;
    transformed = transformed.replace(/,(\s*[}\]])/g, "$1");
    if (transformed === before) break;
  }
  return transformed;
}

/** Write a JSON file with 2-space indent + trailing newline (matches existing style). */
async function writeJson(filePath: string, data: unknown): Promise<void> {
  const json = JSON.stringify(data, null, 2) + "\n";
  await fs.writeFile(filePath, json, "utf8");
}

async function main(): Promise<void> {
  await fs.mkdir(OUT_DIR, { recursive: true });

  // 1. Parse EN entries
  const enSource = await fs.readFile(EN_SRC, "utf8");
  const enLiteral = extractArrayLiteral(enSource, "experienceData");
  const entries: ExperienceEntry[] = JSON.parse(enLiteral);

  // 2. Parse ES translations
  const esSource = await fs.readFile(ES_SRC, "utf8");
  const esLiteral = extractTranslationsObject(esSource);
  const translations: Record<string, { role: string; points: string[] }> =
    JSON.parse(esLiteral);

  // 3. Write base EN files
  let enCount = 0;
  for (const entry of entries) {
    const filePath = path.join(OUT_DIR, `${entry.id}.json`);
    await writeJson(filePath, entry);
    enCount++;
  }

  // 4. Write ES overlay files
  let esCount = 0;
  for (const [id, overlay] of Object.entries(translations)) {
    const filePath = path.join(OUT_DIR, `${id}.es.json`);
    await writeJson(filePath, overlay);
    esCount++;
  }

  console.log(
    `[migrate-experience] wrote ${enCount} EN + ${esCount} ES files to ${path.relative(ROOT, OUT_DIR)}/`
  );
}

main().catch((err) => {
  console.error("[migrate-experience] failed:", err);
  process.exit(1);
});