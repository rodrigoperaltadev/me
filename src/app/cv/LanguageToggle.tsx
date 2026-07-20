"use client";

import Link from "next/link";
import type { CvLang } from "@/lib/cvContent";

/**
 * Brutalist language toggle for the CV page. Stacks above `PrintButton` so
 * both controls share the bottom-right corner with the same terminal aesthetic.
 * `cv-print-hide` keeps the toggle out of the printed/PDF view.
 */
export function LanguageToggle({ lang }: { lang: CvLang }) {
  const isEn = lang === "en";
  const baseLink =
    "px-4 py-3 font-mono text-sm uppercase tracking-widest transition-transform";
  const inactive = "text-accent hover:bg-accent/10";
  const active = "bg-accent text-background";

  return (
    <nav
      aria-label="CV language"
      className="cv-print-hide fixed bottom-[5.25rem] right-6 z-50 inline-flex border border-accent bg-background shadow-[4px_4px_0px_0px_var(--color-accent)]"
    >
      <Link
        href="/cv"
        aria-current={isEn ? "page" : undefined}
        aria-label="English CV"
        className={`${baseLink} ${isEn ? active : inactive}`}
      >
        EN
      </Link>
      <Link
        href="/cv/es"
        aria-current={!isEn ? "page" : undefined}
        aria-label="Spanish CV"
        className={`${baseLink} ${!isEn ? active : inactive} border-l border-accent`}
      >
        ES
      </Link>
    </nav>
  );
}
