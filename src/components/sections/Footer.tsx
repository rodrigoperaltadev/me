"use client";

import React from "react";
import { useApp } from "@/components/AppProvider";

export function Footer() {
  const { dict } = useApp();

  return (
    <footer className="py-12 border-t border-white/5 relative bg-black/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
          © 2025 Rodrigo Peralta — All rights reserved
        </div>
        <div className="flex items-center gap-4">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
            {dict.footer.status}
          </span>
        </div>
        <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
          {dict.footer.builtWith}
        </div>
      </div>
    </footer>
  );
}
