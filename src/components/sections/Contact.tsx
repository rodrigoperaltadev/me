"use client";

import React, { useActionState, useEffect, useRef } from "react";
import { useApp } from "@/components/AppProvider";
import { Github, Linkedin, Mail, CheckCircle, AlertCircle } from "lucide-react";
import { BrutalistButton } from "@/components/ui/BrutalistButton";
import { motion, AnimatePresence } from "motion/react";
import { sendContactEmail, type ContactState } from "@/app/actions/contact";

const initialState: ContactState = { status: "idle", message: "" };

export function Contact() {
  const { dict } = useApp();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(sendContactEmail, initialState);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      const timer = setTimeout(() => {}, 5000);
      return () => clearTimeout(timer);
    }
  }, [state.status]);

  return (
    <section id="contact" className="py-32 px-6 bg-background border-t border-[var(--color-border-subtle)] relative overflow-x-clip">
      <div className="max-w-4xl mx-auto text-center mb-16 reveal">
        <span className="font-mono text-accent text-xs font-bold uppercase tracking-widest mb-4 block">{"// 04_COMMUNICATION"}</span>
        <h2 className="text-5xl md:text-7xl font-heading font-bold tracking-tighter uppercase">{dict.contact.title}</h2>
        <p className="text-text-secondary mt-6 text-lg max-w-2xl mx-auto">{dict.contact.tagline}</p>
      </div>

      <div className="max-w-3xl mx-auto reveal">
        <div className="bg-surface p-6 md:p-16 brutalist-border-thick rounded-xs relative">
          <form ref={formRef} action={formAction} className="space-y-8 md:space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              <div className="space-y-3">
                <label className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold">
                  {dict.contact.form.name}
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  disabled={isPending}
                  placeholder="TYPE_NAME_HERE"
                  className="w-full bg-surface-alt border border-[var(--color-border)] rounded-none px-5 py-4 text-text-primary focus:outline-hidden focus:border-accent transition-colors font-mono text-sm placeholder:text-[var(--color-muted)] disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <div className="space-y-3">
                <label className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold">
                  {dict.contact.form.email}
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  disabled={isPending}
                  placeholder="TYPE_EMAIL_HERE"
                  className="w-full bg-surface-alt border border-[var(--color-border)] rounded-none px-5 py-4 text-text-primary focus:outline-hidden focus:border-accent transition-colors font-mono text-sm placeholder:text-[var(--color-muted)] disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold">
                {dict.contact.form.message}
              </label>
              <textarea
                name="message"
                rows={5}
                required
                disabled={isPending}
                placeholder="AWAITING_INPUT..."
                className="w-full bg-surface-alt border border-[var(--color-border)] rounded-none px-5 py-4 text-text-primary focus:outline-hidden focus:border-accent transition-colors font-mono text-sm placeholder:text-[var(--color-muted)] resize-none disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div className="flex flex-col gap-4">
              <BrutalistButton type="submit" disabled={isPending} className="w-full md:w-auto px-12 py-5 disabled:opacity-60 disabled:cursor-not-allowed">
                {isPending ? "TRANSMITTING..." : dict.contact.form.submit}
              </BrutalistButton>

              <AnimatePresence mode="wait">
                {state.status === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-start gap-3 border border-accent/40 bg-accent/5 px-5 py-4 font-mono"
                  >
                    <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <div>
                      <span className="text-accent text-[10px] font-bold uppercase tracking-widest block mb-0.5">
                        ▶ STATUS: MESSAGE_SENT
                      </span>
                      <span className="text-text-secondary text-xs">{state.message}</span>
                    </div>
                  </motion.div>
                )}

                {state.status === "error" && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-start gap-3 border border-red-500/40 bg-red-500/5 px-5 py-4 font-mono"
                  >
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-red-400 text-[10px] font-bold uppercase tracking-widest block mb-0.5">
                        ▶ STATUS: ERROR
                      </span>
                      <span className="text-text-secondary text-xs">{state.message}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>

          <div className="mt-12 pt-12 border-t border-[var(--color-border-subtle)] flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex gap-6">
              <a href="https://github.com/rodrigoperaltadev" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/rodrigo-alexis-peralta/" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors">
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
