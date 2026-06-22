"use client";

import React from "react";
import { Link } from "next-view-transitions";
import { useApp } from "@/components/AppProvider";
import { experienceData, idToSlug } from "@/lib/experienceData";

export function Experience() {
  const { dict } = useApp();

  return (
    <section id="experience" className="py-20 md:py-32 px-6 bg-background border-t border-[var(--color-border-subtle)] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="reveal flex flex-col md:flex-row items-baseline justify-between mb-12 md:mb-20 border-b border-[var(--color-border)] pb-8">
          <div className="space-y-2">
            <span className="font-mono text-accent text-xs font-bold uppercase tracking-widest">{"// 02_EXPERIENCE"}</span>
            <h2 className="text-4xl md:text-7xl font-heading font-bold tracking-tighter uppercase">{dict.experience.title}</h2>
          </div>
          <span className="font-mono text-[10px] text-[var(--color-muted)] uppercase tracking-[0.5em] mt-4 md:mt-0">
            {dict.experience.filteredBy}
          </span>
        </div>

        <div className="space-y-0">
          {experienceData.map((exp, idx) => (
            <Link
              key={idx}
              href={`/experience/${idToSlug(exp.id)}`}
              className="reveal grid grid-cols-1 md:grid-cols-12 py-8 md:py-12 border-b border-[var(--color-border-subtle)] hover:bg-[var(--color-border-subtle)] group transition-all cursor-pointer block"
            >
              <div
                style={{ viewTransitionName: `year-${exp.id}` }}
                className="col-span-12 md:col-span-2 font-mono text-accent text-sm mb-4 md:mb-0"
              >
                {exp.year}
              </div>
              <div className="col-span-12 md:col-span-3 pr-8">
                <h3
                  style={{ viewTransitionName: `company-${exp.id}` }}
                  className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors"
                >
                  {exp.company}
                </h3>
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="text-[var(--color-muted)] text-[10px] md:text-xs font-mono uppercase tracking-widest">{exp.industry}</span>
                  {exp.active && (
                    <span className="text-accent text-[10px] font-mono font-bold animate-pulse">●</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-4 md:hidden">
                  {exp.stack?.slice(0, 3).map((s, i) => (
                    <span key={i} className="text-[9px] font-mono bg-[var(--color-border-subtle)] border border-[var(--color-border)] px-2 py-0.5 rounded-xs uppercase">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="col-span-12 md:col-span-5 mt-4 md:mt-0 md:pl-4">
                <div
                  style={{ viewTransitionName: `role-${exp.id}` }}
                  className="text-text-primary text-base md:text-lg font-medium mb-2 group-hover:translate-x-1 transition-transform"
                >
                  {exp.role}
                </div>
                <div className="hidden md:flex flex-wrap gap-2 mt-4">
                  {exp.stack?.map((s, i) => (
                    <span key={i} className="text-[10px] font-mono bg-[var(--color-border-subtle)] border border-[var(--color-border)] px-2.5 py-1 rounded-xs uppercase">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2 text-right hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[var(--color-muted)] font-mono text-[10px] tracking-widest uppercase underline underline-offset-4 decoration-accent/30">VIEW_DETAILS →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
