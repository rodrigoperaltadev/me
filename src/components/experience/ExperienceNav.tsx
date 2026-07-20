"use client";

import React from "react";
import { Link } from "next-view-transitions";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { useApp } from "@/components/AppProvider";

export function ExperienceNav() {
  const { theme, toggleTheme } = useApp();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-[var(--color-border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3">
        <Link
          href="/"
          className="font-heading font-bold text-xl sm:text-2xl tracking-tighter shrink-0"
        >
          <span className="text-accent">R</span>P
        </Link>

        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <Link
            href="/#experience"
            className="group flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-xs text-accent hover:text-text-primary transition-colors truncate"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 group-hover:-translate-x-1 transition-transform" />
            <span className="truncate">BACK_TO_LOG</span>
          </Link>

          <div className="h-5 w-px bg-[var(--color-border)] shrink-0" aria-hidden />

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            className="p-2 border border-[var(--color-border)] hover:border-accent/50 transition-colors cursor-pointer shrink-0"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-text-primary" />
            ) : (
              <Moon className="w-4 h-4 text-text-primary" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
