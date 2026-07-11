"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function TerminalWindow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("max-w-5xl w-full reveal-hero", className)}>
      <div className="bg-surface rounded-t-lg border-t border-x border-[var(--color-border)] flex items-center p-2.5 gap-4">
        <div className="flex gap-2 font-mono text-[9px] text-[var(--color-muted)]">
          <div className="w-2.5 h-2.5 rounded-full border border-red-500/30 hover:bg-red-500/40 transition-colors" />
          <div className="w-2.5 h-2.5 rounded-full border border-yellow-500/30 hover:bg-yellow-500/40 transition-colors" />
          <div className="w-2.5 h-2.5 rounded-full border border-green-500/30 hover:bg-green-500/40 transition-colors" />
        </div>
        <div className="mx-auto text-[9px] font-mono text-[var(--color-muted)] tracking-[0.4em] uppercase opacity-50">
          SECURE_NODE_V1.2 // SESSION_ENCRYPTED
        </div>
      </div>
      <div className="bg-surface-alt border border-[var(--color-border)] p-5 sm:p-8 md:p-12 rounded-b-lg shadow-[0_40px_100px_rgba(0,0,0,0.4)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.6)] font-mono relative overflow-hidden group-hover:border-accent/20 transition-all duration-500">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.02)_50%),linear-gradient(90deg,rgba(255,0,0,0.005),rgba(0,255,0,0.003),rgba(0,0,255,0.005))] bg-[size:100%_4px,3px_100%] opacity-20 dark:opacity-100" />
        {children}
      </div>
    </div>
  );
}
