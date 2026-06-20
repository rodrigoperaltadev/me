"use client";

import React from "react";
import { useApp } from "@/components/AppProvider";
import { Laptop, Code, Cpu, TestTube, Settings, Cloud } from "lucide-react";
import { cn } from "@/lib/utils";

const stackCategories = [
  {
    id: "MOBILE_INFRA",
    icon: <Laptop className="w-4 h-4" />,
    items: [
      { name: "React Native", level: "LEVEL_MASTER" },
      { name: "Expo", level: "L_08" },
      { name: "Flutter", level: "L_04" },
    ],
  },
  {
    id: "WEB_ECOSYSTEM",
    icon: <Code className="w-4 h-4" />,
    items: [
      { name: "React.js / Next.js", level: "LEVEL_MASTER" },
      { name: "TypeScript", level: "L_09" },
      { name: "Tailwind / SASS", level: "L_09" },
    ],
  },
  {
    id: "STATE_MANAGEMENT",
    icon: <Cpu className="w-4 h-4" />,
    items: [
      { name: "Redux Toolkit", level: "L_09" },
      { name: "React Query", level: "L_08" },
      { name: "Zustand / MobX", level: "L_07" },
    ],
  },
  {
    id: "BACKEND_API",
    icon: <Settings className="w-4 h-4" />,
    items: [
      { name: "Node.js / NestJS", level: "L_07" },
      { name: "GraphQL / Apollo", level: "L_07" },
      { name: "SQL / MySQL", level: "L_06" },
    ],
  },
  {
    id: "QUALITY_ASSURANCE",
    icon: <TestTube className="w-4 h-4" />,
    items: [
      { name: "Jest / Testing Library", level: "L_08" },
      { name: "CI/CD Pipelines", level: "L_06" },
    ],
  },
  {
    id: "DEV_ENVIRONMENT",
    icon: <Cloud className="w-4 h-4" />,
    items: [
      { name: "Git / GitHub", level: "LEVEL_MASTER" },
      { name: "Docker / Babel", level: "L_06" },
    ],
  },
];

export function Stack() {
  const { dict } = useApp();

  return (
    <section id="stack" className="py-32 px-6 bg-background border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="reveal mb-20 text-center md:text-left">
          <span className="font-mono text-accent text-xs font-bold uppercase tracking-widest mb-4 block">{"// 03_CAPABILITIES"}</span>
          <h2 className="text-5xl md:text-8xl font-heading font-bold tracking-tighter uppercase mb-4">{dict.stack.title}</h2>
          <p className="text-text-secondary font-mono text-sm max-w-xl">{dict.stack.tagline}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-16 gap-y-12">
          {stackCategories.map((cat, idx) => (
            <div key={idx} className="reveal space-y-12">
              <div className="border-t border-white/10 pt-6">
                <h4 className="font-mono text-accent text-[10px] font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                  {cat.id}
                </h4>
                <div className="space-y-4">
                  {cat.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center group cursor-default">
                      <span className="text-white/60 group-hover:text-white transition-colors flex items-center gap-3">
                        {i === 0 && cat.icon} {item.name}
                      </span>
                      <span className="grow mx-4 h-[1px] bg-white/5 group-hover:bg-accent/30 transition-all" />
                      <span className={cn(
                        "font-mono text-[9px] font-bold",
                        item.level === "LEVEL_MASTER" ? "text-accent" : "text-white/30"
                      )}>
                        {item.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" />
    </section>
  );
}
