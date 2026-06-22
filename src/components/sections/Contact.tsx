"use client";

import React from "react";
import { useApp } from "@/components/AppProvider";
import { Github, Linkedin, Mail } from "lucide-react";
import { BrutalistButton } from "@/components/ui/BrutalistButton";

export function Contact() {
  const { dict } = useApp();

  return (
    <section id="contact" className="py-32 px-6 bg-background border-t border-[var(--color-border-subtle)] relative overflow-x-clip">
      <div className="max-w-4xl mx-auto text-center mb-16 reveal">
        <span className="font-mono text-accent text-xs font-bold uppercase tracking-widest mb-4 block">{"// 04_COMMUNICATION"}</span>
        <h2 className="text-5xl md:text-7xl font-heading font-bold tracking-tighter uppercase">{dict.contact.title}</h2>
        <p className="text-text-secondary mt-6 text-lg max-w-2xl mx-auto">{dict.contact.tagline}</p>
      </div>

      <div className="max-w-3xl mx-auto reveal">
        <div className="bg-surface p-6 md:p-16 brutalist-border-thick rounded-xs relative">
          <form className="space-y-8 md:space-y-10" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              <div className="space-y-3">
                <label className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold">{dict.contact.form.name}</label>
                <input
                  type="text"
                  placeholder="TYPE_NAME_HERE"
                  className="w-full bg-surface-alt border border-[var(--color-border)] rounded-none px-5 py-4 text-text-primary focus:outline-hidden focus:border-accent transition-colors font-mono text-sm placeholder:text-[var(--color-muted)]"
                />
              </div>
              <div className="space-y-3">
                <label className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold">{dict.contact.form.email}</label>
                <input
                  type="email"
                  placeholder="TYPE_EMAIL_HERE"
                  className="w-full bg-surface-alt border border-[var(--color-border)] rounded-none px-5 py-4 text-text-primary focus:outline-hidden focus:border-accent transition-colors font-mono text-sm placeholder:text-[var(--color-muted)]"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold">{dict.contact.form.message}</label>
              <textarea
                rows={5}
                placeholder="AWAITING_INPUT..."
                className="w-full bg-surface-alt border border-[var(--color-border)] rounded-none px-5 py-4 text-text-primary focus:outline-hidden focus:border-accent transition-colors font-mono text-sm placeholder:text-[var(--color-muted)] resize-none"
              />
            </div>
            <BrutalistButton type="submit" className="w-full md:w-auto px-12 py-5">
              {dict.contact.form.submit}
            </BrutalistButton>
          </form>

          <div className="mt-12 pt-12 border-t border-[var(--color-border-subtle)] flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex gap-6">
              <a href="https://github.com" className="text-text-secondary hover:text-accent transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" className="text-text-secondary hover:text-accent transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:rodrigoperalta.dev@gmail.com" className="text-text-secondary hover:text-accent transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <div className="font-mono text-[10px] text-[var(--color-muted)] uppercase tracking-widest">
              {dict.contact.secure}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
