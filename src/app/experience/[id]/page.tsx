import React from "react";
import { Link } from "next-view-transitions";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getExperienceData, getExperienceEntry, idToSlug } from "@/lib/content/loaders";
import { ExperienceNav } from "@/components/experience/ExperienceNav";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ExperienceDetailPage({ params }: PageProps) {
  const { id } = await params;
  const exp = await getExperienceEntry(id, "en");

  if (!exp) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-text-primary font-body grid-bg">
      <ExperienceNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-40 pb-20 sm:pb-32">
        <div className="border-b border-[var(--color-border)] pb-8 sm:pb-12 mb-10 sm:mb-16">
          <div
            style={{ viewTransitionName: `year-${exp.id}` }}
            className="font-mono text-accent text-sm md:text-base mb-4 sm:mb-6 uppercase tracking-widest"
          >
            {exp.year}
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6">
            <h1
              style={{ viewTransitionName: `company-${exp.id}` }}
              className="text-4xl sm:text-5xl md:text-8xl font-heading font-bold tracking-tighter text-text-primary leading-[0.95] break-words"
            >
              {exp.company}
            </h1>
            <div className="flex items-center gap-3 shrink-0 flex-wrap">
              <span className="text-[var(--color-muted)] text-xs sm:text-sm font-mono uppercase tracking-widest">
                {exp.industry}
              </span>
              {exp.active && (
                <span className="text-accent text-[10px] font-mono font-bold border border-accent px-2 py-0.5 animate-pulse">
                  ACTIVE
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20">
          <div className="md:col-span-4 space-y-8 sm:space-y-10">
            <div>
              <span className="font-mono text-[10px] text-[var(--color-muted)] uppercase tracking-widest mb-3 block">
                POSITION
              </span>
              <div
                style={{ viewTransitionName: `role-${exp.id}` }}
                className="text-lg sm:text-xl md:text-2xl text-text-primary font-medium border-l-4 border-accent pl-4 sm:pl-5 py-2 leading-snug"
              >
                {exp.role}
              </div>
            </div>

            <div>
              <span className="font-mono text-[10px] text-[var(--color-muted)] uppercase tracking-widest mb-4 block">
                TECH_STACK
              </span>
              <div className="flex flex-wrap gap-2">
                {exp.stack?.map((s, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono bg-surface border border-[var(--color-border)] px-3 py-1.5 uppercase text-text-secondary hover:text-accent hover:border-accent/30 transition-colors"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 sm:pt-6">
              <Link
                href="/#experience"
                className="group inline-flex items-center gap-2 font-mono text-xs text-[var(--color-muted)] hover:text-accent transition-colors border border-[var(--color-border)] hover:border-accent/30 px-4 py-3"
              >
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                BACK_TO_LOG
              </Link>
            </div>
          </div>

          <div className="md:col-span-8">
            <span className="font-mono text-[10px] text-[var(--color-muted)] uppercase tracking-widest mb-6 sm:mb-8 block">
              KEY_ACHIEVEMENTS
            </span>
            {exp.points && (
              <ul className="space-y-6 sm:space-y-8">
                {exp.points.map((p, i) => (
                  <li key={i} className="group flex gap-4 sm:gap-6 leading-relaxed">
                    <span className="text-accent shrink-0 font-mono text-base sm:text-lg font-bold mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-text-secondary text-base sm:text-lg group-hover:text-text-primary transition-colors font-body leading-relaxed">
                      {p}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const experience = await getExperienceData("en");
  return experience.map((exp) => ({ id: idToSlug(exp.id) }));
}
