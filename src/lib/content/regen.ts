/**
 * CV regeneration after experience mutations.
 *
 * 1. Rewrite repo-root `CV.md` (Spanish content — matches current CV.md shape)
 * 2. Spawn `scripts/regen-cv.ts` for `public/cv.pdf` (EN page via Chrome)
 * 3. revalidatePath for /cv, /cv/es, /, /sitemap.xml
 *
 * Failures are logged; callers should fire-and-forget so HTTP mutations still 200.
 */

import "server-only";
import { spawn } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";
import { revalidatePath } from "next/cache";

import { CV_CONTACT, CV_STRINGS, getSkillGroups } from "@/lib/cvContent";
import { getExperienceData } from "./loaders";
import type { ExperienceEntry } from "./types";

const CV_MD_PATH = path.join(process.cwd(), "CV.md");

/** Localize year shorthand used in JSON (`PRES`) for Spanish markdown. */
function localizeYearEs(year: string): string {
  return year.replace(/\bPRES\b/g, "Presente");
}

function renderExperienceBlock(exp: ExperienceEntry): string {
  const year = localizeYearEs(exp.year);
  const points = exp.points.map((p) => `- ${p}`).join("\n");
  const stack = exp.stack.join(" · ");
  return [
    `### ${exp.company} — ${exp.role}`,
    `**${year}** · ${exp.industry}`,
    "",
    points,
    "",
    `**Stack:** ${stack}`,
  ].join("\n");
}

/**
 * Render Spanish `CV.md` from loaders + `CV_STRINGS.es`.
 * Shape mirrors the hand-maintained repo-root `CV.md`.
 */
export async function renderCvMarkdown(): Promise<string> {
  const s = CV_STRINGS.es;
  const [experience, skillGroups] = await Promise.all([
    getExperienceData("es"),
    getSkillGroups("es"),
  ]);

  const contactLine = [
    `[${CV_CONTACT.email}](mailto:${CV_CONTACT.email})`,
    `[${CV_CONTACT.website}](${CV_CONTACT.websiteUrl})`,
    `[${CV_CONTACT.github}](${CV_CONTACT.githubUrl})`,
    `[${CV_CONTACT.linkedin}](${CV_CONTACT.linkedinUrl})`,
  ].join(" · ");

  const experienceBlocks = experience.map(renderExperienceBlock).join("\n\n");

  const skillsBlocks = skillGroups
    .map((g) => `- **${g.label}:** ${g.items.join(" · ")}`)
    .join("\n");

  return [
    `# ${CV_CONTACT.name}`,
    "",
    `**${s.role}**`,
    "",
    s.location,
    "",
    contactLine,
    "",
    "---",
    "",
    `## ${s.sections.summary}`,
    "",
    s.summary,
    "",
    "---",
    "",
    `## ${s.sections.experience}`,
    "",
    experienceBlocks,
    "",
    "---",
    "",
    `## ${s.sections.skills}`,
    "",
    skillsBlocks,
    "",
    "---",
    "",
    `_${s.footerRight}._`,
    "",
  ].join("\n");
}

export async function writeCvMarkdown(): Promise<void> {
  const md = await renderCvMarkdown();
  const tmp = `${CV_MD_PATH}.${process.pid}.tmp`;
  await fs.writeFile(tmp, md, "utf8");
  await fs.rename(tmp, CV_MD_PATH);
}

function runPdfRegen(): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn("npx", ["tsx", "scripts/regen-cv.ts"], {
      cwd: process.cwd(),
      stdio: ["ignore", "pipe", "pipe"],
      env: process.env,
    });

    let stderr = "";
    child.stderr?.on("data", (chunk: Buffer) => {
      stderr += chunk.toString();
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      const detail = stderr ? `: ${stderr.trim()}` : "";
      reject(new Error(`regen-cv.ts exited ${code}${detail}`));
    });
  });
}

/**
 * Full regen pipeline. Safe to call fire-and-forget after experience writes.
 * Never throws to the caller — all errors are logged as warnings.
 */
export async function regenAfterExperienceChange(): Promise<void> {
  try {
    await writeCvMarkdown();
  } catch (err) {
    console.warn(
      "[content/regen] CV.md write failed:",
      err instanceof Error ? err.message : err
    );
  }

  try {
    await runPdfRegen();
  } catch (err) {
    console.warn(
      "[content/regen] PDF regen failed:",
      err instanceof Error ? err.message : err
    );
  }

  try {
    revalidatePath("/cv");
    revalidatePath("/cv/es");
    revalidatePath("/");
    revalidatePath("/sitemap.xml");
  } catch (err) {
    console.warn(
      "[content/regen] revalidatePath failed:",
      err instanceof Error ? err.message : err
    );
  }
}
