"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function TerminalWindow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("max-w-5xl w-full reveal-hero", className)}>
      <div className="bg-[#1a1a1a] rounded-t-lg border-t border-x border-white/10 flex items-center p-3 gap-4">
        <div className="flex gap-3 text-white/40 font-mono text-[10px]">
          <span className="hover:text-accent cursor-default transition-colors">_</span>
          <span className="hover:text-accent cursor-default transition-colors">□</span>
          <span className="hover:text-red-500 cursor-default transition-colors">✕</span>
        </div>
        <div className="mx-auto text-[10px] font-mono text-white/30 tracking-[0.3em] uppercase">
          SYSTEM_CORE // SESSION_ACTIVE
        </div>
      </div>
      <div className="bg-[#0c0c0c] border border-white/10 p-8 md:p-16 rounded-b-lg shadow-[0_60px_120px_rgba(0,0,0,0.8)] font-mono relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.005),rgba(0,0,255,0.01))] bg-[size:100%_4px,3px_100%]" />
        {children}
      </div>
    </div>
  );
}
