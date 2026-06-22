"use client";

import React from "react";
import { useApp } from "@/components/AppProvider";
import { Laptop, Code, Cpu, TestTube, Settings, Cloud, Brain, GitBranch } from "lucide-react";
import { cn } from "@/lib/utils";

const stackCategories = [
  {
    id: "MOBILE_INFRA",
    icon: <Laptop className="w-4 h-4" />,
    items: [
      { name: "React Native", level: "LEVEL_MASTER" },
      { name: "Expo / EAS", level: "L_09" },
      { name: "Flutter", level: "L_05" },
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
      { name: "Zustand / MobX", level: "L_08" },
    ],
  },
  {
    id: "BACKEND_API",
    icon: <Settings className="w-4 h-4" />,
    items: [
      { name: "Node.js / NestJS", level: "L_07" },
      { name: "GraphQL / Apollo", level: "L_07" },
      { name: "Python / FastAPI", level: "L_06" },
    ],
  },
  {
    id: "AI_ENGINEERING",
    icon: <Brain className="w-4 h-4" />,
    items: [
      { name: "RAG (Mistral AI + ChromaDB)", level: "L_07" },
      { name: "LLM Integration / Agents", level: "L_07" },
      { name: "Pi Harness / MCP Tooling", level: "L_08" },
    ],
  },
  {
    id: "ARCHITECTURE",
    icon: <GitBranch className="w-4 h-4" />,
    items: [
      { name: "Clean Architecture", level: "L_09" },
      { name: "Feature-Based / MVVM", level: "LEVEL_MASTER" },
      { name: "Atomic Design", level: "L_08" },
    ],
  },
  {
    id: "QUALITY_ASSURANCE",
    icon: <TestTube className="w-4 h-4" />,
    items: [
      { name: "Jest / Testing Library", level: "L_08" },
      { name: "CI/CD Pipelines", level: "L_07" },
      { name: "Maestro E2E", level: "L_06" },
    ],
  },
  {
    id: "DEV_TOOLS",
    icon: <Cloud className="w-4 h-4" />,
    items: [
      { name: "Git / GitHub", level: "LEVEL_MASTER" },
      { name: "SQL / MySQL", level: "L_06" },
      { name: "Docker / Babel", level: "L_05" },
    ],
  },
];

export function Stack() {
  const { dict } = useApp();

  return (
    <section id="stack" className="py-32 px-6 bg-background border-t border-[var(--color-border-subtle)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="reveal mb-20 text-center md:text-left">
          <span className="font-mono text-accent text-xs font-bold uppercase tracking-widest mb-4 block">{"// 03_CAPABILITIES"}</span>
          <h2 className="text-5xl md:text-8xl font-heading font-bold tracking-tighter uppercase mb-4">{dict.stack.title}</h2>
          <p className="text-text-secondary font-mono text-sm max-w-xl">{dict.stack.tagline}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-12">
          {stackCategories.map((cat, idx) => (
            <div key={idx} className="reveal space-y-12">
              <div className="border-t border-[var(--color-border)] pt-6">
                <h4 className="font-mono text-accent text-[10px] font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                  {cat.id}
                </h4>
                <div className="space-y-4">
                  {cat.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center group cursor-default">
                      <span className="text-text-secondary group-hover:text-text-primary transition-colors flex items-center gap-3 text-sm">
                        {i === 0 && cat.icon} {item.name}
                      </span>
                      <span className="grow mx-3 h-[1px] bg-[var(--color-border-subtle)] group-hover:bg-accent/30 transition-all" />
                      <span className={cn(
                        "font-mono text-[9px] font-bold shrink-0",
                        item.level === "LEVEL_MASTER" ? "text-accent" : "text-[var(--color-muted)]"
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
