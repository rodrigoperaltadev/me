"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function TerminalWindow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("max-w-5xl w-full reveal-hero", className)}>
      <div className="bg-surface rounded-t-lg border-t border-x border-[var(--color-border)] flex items-center p-3 gap-4">
        <div className="flex gap-3 font-mono text-[10px] text-[var(--color-muted)]">
          <span className="hover:text-accent cursor-default transition-colors">_</span>
          <span className="hover:text-accent cursor-default transition-colors">□</span>
          <span className="hover:text-red-500 cursor-default transition-colors">✕</span>
        </div>
        <div className="mx-auto text-[10px] font-mono text-[var(--color-muted)] tracking-[0.3em] uppercase">
          SYSTEM_CORE // SESSION_ACTIVE
        </div>
      </div>
      <div className="bg-surface-alt border border-[var(--color-border)] p-5 sm:p-8 md:p-16 rounded-b-lg shadow-[0_60px_120px_rgba(0,0,0,0.4)] font-mono relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.03)_50%),linear-gradient(90deg,rgba(255,0,0,0.005),rgba(0,255,0,0.003),rgba(0,0,255,0.005))] bg-[size:100%_4px,3px_100%]" />
        {children}
      </div>
    </div>
  );
}
