"use client";

import React from "react";
import { useApp } from "@/components/AppProvider";
import Image from "next/image";
import { Download } from "lucide-react";

export function About() {
  const { dict } = useApp();

  const stats = [
    { label: dict.about.stats.years, value: "8+" },
    { label: dict.about.stats.industries, value: "06" },
    { label: dict.about.stats.platforms, value: "∞" },
    { label: dict.about.stats.teams, value: "LEAD" },
  ];

  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden border-t border-[var(--color-border-subtle)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="reveal order-2 lg:order-1">
          <span className="font-mono text-accent mb-4 block uppercase tracking-[0.3em] text-xs font-bold">{"// 01_PROFILE"}</span>
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8 tracking-tighter">{dict.about.title}</h2>
          <div className="space-y-6 text-text-secondary leading-relaxed text-lg font-body">
            <p>{dict.about.p1}</p>
            <p>{dict.about.p2}</p>
          </div>

          <div className="mt-10">
            <a
              href="/cv.pdf"
              download="Rodrigo_Peralta_CV.pdf"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-secondary hover:text-accent border border-[var(--color-border)] hover:border-accent/50 px-5 py-3 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              {dict.hero.downloadCV}
            </a>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 items-end">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-1 group">
                <div className="text-4xl md:text-6xl font-heading font-bold text-accent group-hover:scale-105 transition-transform origin-bottom-left glow-cyan">
                  {stat.value}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal flex justify-center order-1 lg:order-2">
          <div className="relative group">
            <div className="w-full max-w-[280px] aspect-square md:w-96 md:h-96 p-4 flex items-center justify-center relative">
              <div className="absolute inset-0 border-2 border-accent translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4" />
              <div className="absolute inset-0 border-2 border-[var(--color-border)]" />
              <div className="w-full h-full bg-surface overflow-hidden relative z-10 border border-[var(--color-border)]">
                <Image
                  src="/profile.jpeg"
                  alt="Rodrigo Peralta"
                  width={800}
                  height={800}
                  className="w-full h-full object-cover filter grayscale contrast-125 brightness-90 hover:grayscale-0 hover:contrast-100 hover:brightness-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-accent/10 mix-blend-multiply group-hover:opacity-0 transition-opacity" />
              </div>
            </div>
            <div className="absolute -top-4 -right-8 bg-accent px-5 py-2 text-xs font-mono text-black font-bold tracking-tighter shadow-2xl z-20">
              SR_DEVELOPER_V5.0
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
