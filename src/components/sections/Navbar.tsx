"use client";

import React from "react";
import { useApp } from "@/components/AppProvider";
import { Sun, Moon } from "lucide-react";

export function Navbar() {
  const { toggleTheme, theme, lang, setLang, dict } = useApp();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-[var(--color-border-subtle)]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="#" className="font-heading font-bold text-2xl tracking-tighter group">
            <span className="text-accent group-hover:mr-1 transition-all">R</span>P
          </a>
          <div className="hidden md:flex gap-6 text-sm font-mono text-text-secondary">
            <a href="#about" className="hover:text-accent transition-colors">{dict.nav.about}</a>
            <a href="#experience" className="hover:text-accent transition-colors">{dict.nav.experience}</a>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-6 text-sm font-mono text-text-secondary">
            <a href="#stack" className="hover:text-accent transition-colors">{dict.nav.stack}</a>
            <a href="#contact" className="hover:text-accent transition-colors">{dict.nav.contact}</a>
          </div>
          <div className="h-6 w-[1px] bg-[var(--color-border)] mx-2" />
          <div className="flex items-center gap-4 text-xs font-mono">
            <button
              onClick={() => setLang("en")}
              className={lang === "en" ? "text-accent" : "text-text-secondary hover:text-accent"}
            >
              EN
            </button>
            <span className="text-[var(--color-muted)]">|</span>
            <button
              onClick={() => setLang("es")}
              className={lang === "es" ? "text-accent" : "text-text-secondary hover:text-accent"}
            >
              ES
            </button>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-[var(--color-border)] hover:border-accent/50 transition-colors"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
