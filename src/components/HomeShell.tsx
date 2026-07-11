"use client";

import { Children, useEffect, useState } from "react";
import { AppProvider, useApp } from "@/components/AppProvider";
import { useAnimations } from "@/hooks/useAnimations";
import { Experience } from "@/components/sections/Experience";
import type { ExperienceEntry } from "@/lib/content/types";

interface HomeShellProps {
  experiencesEn: ExperienceEntry[];
  experiencesEs: ExperienceEntry[];
  children: React.ReactNode;
}

const SECTIONS = [
  { id: "about", href: "#about" },
  { id: "experience", href: "#experience" },
  { id: "stack", href: "#stack" },
  { id: "contact", href: "#contact" },
];

function ScrollDots() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      const probeY = window.innerHeight * 0.45;
      let nextActiveIndex = 0;

      SECTIONS.forEach((section, index) => {
        const el = document.getElementById(section.id);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        if (rect.top <= probeY) {
          nextActiveIndex = index;
        }
      });

      setActiveIndex(nextActiveIndex);
      ticking = false;
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3 items-center">
      {SECTIONS.map((section, i) => (
        <a
          key={section.id}
          href={section.href}
          aria-label={`Go to ${section.id}`}
          className={[
            "block rounded-full transition-all duration-300",
            i === activeIndex
              ? "w-2 h-4 bg-accent shadow-[0_0_8px_var(--color-accent)]"
              : "w-2 h-2 bg-text-primary opacity-25 hover:opacity-70 hover:bg-accent",
          ].join(" ")}
        />
      ))}
    </div>
  );
}

/**
 * Renders the experience section with the list matching the current language.
 * Lives inside AppProvider so it can read lang from context.
 */
function LanguageAwareExperience({ en, es }: { en: ExperienceEntry[]; es: ExperienceEntry[] }) {
  const { lang } = useApp();
  const data = lang === "es" ? es : en;
  return <Experience experiences={data} />;
}

/**
 * Inner shell that needs the AppProvider context (for useAnimations hook).
 * useAnimations registers GSAP/Lenis effects on mount.
 */
function ShellInner({ en, es, children }: { en: ExperienceEntry[]; es: ExperienceEntry[]; children: React.ReactNode }) {
  useAnimations();

  const childSections = Children.toArray(children);
  const sectionsBeforeExperience = childSections.slice(0, 3);
  const sectionsAfterExperience = childSections.slice(3);

  return (
    <main className="min-h-screen">
      {sectionsBeforeExperience}
      <LanguageAwareExperience en={en} es={es} />
      {sectionsAfterExperience}
      <ScrollDots />
    </main>
  );
}

export function HomeShell({ experiencesEn, experiencesEs, children }: HomeShellProps) {
  return (
    <AppProvider>
      <ShellInner en={experiencesEn} es={experiencesEs}>
        {children}
      </ShellInner>
    </AppProvider>
  );
}
