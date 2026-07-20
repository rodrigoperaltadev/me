/**
 * Export the English CV page to `public/cv.pdf` via system Chrome headless.
 *
 * Requires the Next.js app to already be serving (default http://localhost:3000).
 * Does NOT start the server.
 *
 * Usage:
 *   npm run regen:cv
 *   CHROME_PATH=/path/to/chrome CV_URL=http://localhost:3000/cv npm run regen:cv
 */

import { spawn } from "node:child_process";
import { access } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const DEFAULT_CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const CV_URL = process.env.CV_URL ?? "http://localhost:3000/cv";
const OUT_PDF = path.join(ROOT, "public", "cv.pdf");

function resolveChromePath(): string {
  return process.env.CHROME_PATH ?? DEFAULT_CHROME;
}

async function assertChrome(chromePath: string): Promise<void> {
  try {
    await access(chromePath);
  } catch {
    throw new Error(
      `CHROME_PATH not found: ${chromePath}. Set CHROME_PATH to your Chrome/Chromium binary.`
    );
  }
}

async function assertServerReachable(url: string): Promise<void> {
  try {
    const res = await fetch(url, { method: "GET", redirect: "follow" });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
  } catch (err) {
    throw new Error(
      `Dev server not reachable at ${url} (${(err as Error).message}). ` +
        `Start \`npm run dev\` (or \`npm start\`) before regenerating the PDF.`
    );
  }
}

function runChromePrint(chromePath: string, url: string, outPdf: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const args = [
      "--headless=new",
      "--disable-gpu",
      "--no-pdf-header-footer",
      `--print-to-pdf=${outPdf}`,
      url,
    ];
    const child = spawn(chromePath, args, {
      cwd: ROOT,
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stderr = "";
    child.stderr?.on("data", (chunk: Buffer) => {
      stderr += chunk.toString();
    });

    child.on("error", (err) => reject(err));
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      const detail = stderr ? `: ${stderr.trim()}` : "";
      reject(new Error(`Chrome exited with code ${code}${detail}`));
    });
  });
}

async function main(): Promise<void> {
  const chromePath = resolveChromePath();
  await assertChrome(chromePath);
  await assertServerReachable(CV_URL);
  await runChromePrint(chromePath, CV_URL, OUT_PDF);
  console.log(`[regen-cv] wrote ${OUT_PDF}`);
}

main().catch((err) => {
  console.error(`[regen-cv] ${err instanceof Error ? err.message : err}`);
  process.exit(1);
});
