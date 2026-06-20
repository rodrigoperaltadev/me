"use client";

import React from "react";
import { useApp } from "@/components/AppProvider";

const experienceData = [
  {
    year: "2023 — PRES",
    company: "Distillery",
    industry: "IT Services",
    role: "Senior React & React Native Developer",
    active: true,
    points: ["Leading cross-platform mobile initiatives", "Architecting scalable React micro-frontends"],
    stack: ["React", "React Native", "TypeScript"],
    id: "001_DIST",
  },
  {
    year: "2023 — 2024",
    company: "n1u",
    industry: "Fintech (Freelance)",
    role: "React & React Native Developer",
    stack: ["Fintech", "Payments"],
    id: "002_N1U",
  },
  {
    year: "2022 — 2023",
    company: "Valtech",
    industry: "IT Services",
    role: "React & React Native Developer",
    stack: ["Enterprise"],
    id: "003_VAL",
  },
  {
    year: "2021 — 2022",
    company: "Plannifai",
    industry: "SaaS",
    role: "Frontend Developer",
    id: "004_PLAN",
  },
  {
    year: "2021 — 2021",
    company: "Banco del Sol",
    industry: "Banking",
    role: "Software Development Engineer",
    id: "005_BDS",
  },
  {
    year: "2018 — 2021",
    company: "Etermax",
    industry: "Video Games",
    role: "Software Development Engineer",
    id: "006_ETER",
  },
];

export function Experience() {
  const { dict } = useApp();

  return (
    <section id="experience" className="py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="reveal flex flex-col md:flex-row items-baseline justify-between mb-20 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <span className="font-mono text-accent text-xs font-bold uppercase tracking-widest">{"// 02_EXPERIENCE"}</span>
            <h2 className="text-5xl md:text-7xl font-heading font-bold tracking-tighter uppercase">{dict.experience.title}</h2>
          </div>
          <span className="font-mono text-[10px] text-white/20 uppercase tracking-[0.5em] mt-4 md:mt-0">
            {dict.experience.filteredBy}
          </span>
        </div>

        <div className="space-y-0">
          {experienceData.map((exp, idx) => (
            <div key={idx} className="reveal grid grid-cols-12 py-12 border-b border-white/5 hover:bg-white/[0.02] group transition-colors">
              <div className="col-span-12 md:col-span-2 font-mono text-accent text-sm mb-4 md:mb-0">
                {exp.year}
              </div>
              <div className="col-span-12 md:col-span-4 pr-8">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">{exp.company}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-white/30 text-xs font-mono uppercase tracking-widest">{exp.industry}</span>
                  {exp.active && (
                    <>
                      <span className="w-1 h-1 bg-white/20 rounded-full" />
                      <span className="text-accent text-[10px] font-mono font-bold">ACTIVE</span>
                    </>
                  )}
                </div>
              </div>
              <div className="col-span-12 md:col-span-4 mt-2 md:mt-0">
                <div className="text-white/80 text-xl font-medium mb-4">{exp.role}</div>
                {exp.points && (
                  <ul className="text-text-secondary text-sm space-y-2 mb-6 font-body">
                    {exp.points.map((p, i) => (
                      <li key={i} className="flex gap-2"><span>-</span> {p}</li>
                    ))}
                  </ul>
                )}
                {exp.stack && (
                  <div className="flex flex-wrap gap-2">
                    {exp.stack.map((s, i) => (
                      <span key={i} className="text-[10px] font-mono bg-white/5 border border-white/10 px-2.5 py-1 rounded-xs uppercase">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="col-span-12 md:col-span-2 text-right hidden md:block opacity-10 group-hover:opacity-100 transition-opacity">
                <span className="text-white/40 font-mono text-[10px] tracking-widest uppercase">ID: {exp.id}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
