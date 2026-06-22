"use client";

import React from "react";
import { useApp } from "@/components/AppProvider";

export function Footer() {
  const { dict } = useApp();

  return (
    <footer className="py-12 border-t border-[var(--color-border-subtle)] relative bg-surface-alt overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8">
        <div className="font-mono text-[10px] text-[var(--color-muted)] uppercase tracking-widest order-3 md:order-1">
          © 2025 Rodrigo Peralta — All rights reserved
        </div>
        <div className="flex items-center gap-4 order-1 md:order-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="font-mono text-[10px] text-[var(--color-muted)] uppercase tracking-widest">
            {dict.footer.status}
          </span>
        </div>
        <div className="font-mono text-[10px] text-[var(--color-muted)] uppercase tracking-widest">
          {dict.footer.builtWith}
        </div>
      </div>
    </footer>
  );
}
