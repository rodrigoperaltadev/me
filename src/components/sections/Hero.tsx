"use client";

import React, { useEffect, useState, useRef } from "react";
import { useApp } from "@/components/AppProvider";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { BrutalistButton } from "@/components/ui/BrutalistButton";
import gsap from "gsap";

export function Hero() {
  const { dict } = useApp();
  const [prompt1, setPrompt1] = useState("");
  const [prompt2, setPrompt2] = useState("");
  const [showLine2, setShowLine2] = useState(false);

  const heroContentRef = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  const fullPrompt1 = "bash init_portfolio.sh --full-profile";
  const fullPrompt2 = "clear";

  useEffect(() => {
    let isCancelled = false;

    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const runSequence = async () => {
      if (isCancelled) return;

      setPrompt1("");
      setPrompt2("");
      setShowLine2(false);

      gsap.set(heroContentRef.current, { opacity: 0, y: 30 });
      if (line2Ref.current) gsap.set(line2Ref.current, { opacity: 1 });

      await wait(2000);
      if (isCancelled) return;

      for (let i = 0; i <= fullPrompt1.length; i++) {
        if (isCancelled) return;
        setPrompt1(fullPrompt1.slice(0, i));
        await wait(Math.random() * 40 + 30);
      }

      await wait(400);

      if (isCancelled) return;
      gsap.to(heroContentRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power4.out",
      });

      await wait(4500);

      if (isCancelled) return;
      setShowLine2(true);

      await wait(1000);

      for (let i = 0; i <= fullPrompt2.length; i++) {
        if (isCancelled) return;
        setPrompt2(fullPrompt2.slice(0, i));
        await wait(Math.random() * 40 + 30);
      }

      await wait(600);

      if (isCancelled) return;
      await gsap.to([heroContentRef.current, line2Ref.current], {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
      });

      runSequence();
    };

    runSequence();

    return () => {
      isCancelled = true;
    };
  }, []);

  const PromptPrefix = () => (
    <div className="flex items-center gap-1 flex-wrap text-[11px] sm:text-sm">
      <span className="text-[var(--color-muted)]">┌──(</span>
      <span className="text-accent">rodrigo㉿workstation</span>
      <span className="text-[var(--color-muted)]">)-[</span>
      <span className="text-text-primary">~</span>
      <span className="text-[var(--color-muted)]">]</span>
    </div>
  );

  return (
    <header className="relative min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 overflow-x-clip grid-bg">
      <div className="w-full max-w-5xl">
        <TerminalWindow>
          <div className="relative z-10">
            {/* Line 1 */}
            <div className="text-accent mb-4 sm:mb-6 flex flex-col gap-2 text-sm">
              <PromptPrefix />
              <div className="flex items-center gap-2 pl-2">
                <span className="text-[var(--color-muted)]">└─</span>
                <span className="text-accent">$</span>
                <span className="text-text-primary font-bold tracking-tight text-[11px] sm:text-sm break-all">{prompt1}</span>
                {!showLine2 && (
                  <span className="w-2 h-5 sm:w-2.5 sm:h-6 bg-accent animate-pulse shadow-[0_0_10px_var(--color-accent)] shrink-0" />
                )}
              </div>
            </div>

            {/* Hero Content */}
            <div id="hero-content" ref={heroContentRef} className="space-y-6 sm:space-y-10 opacity-0 mb-8 sm:mb-12">
              <h1 className="text-4xl sm:text-6xl md:text-9xl font-heading font-bold tracking-tighter leading-[0.85] text-text-primary">
                Rodrigo<br />Peralta
              </h1>
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-xl sm:text-2xl md:text-4xl text-accent font-medium tracking-tight glow-cyan">
                  {dict.hero.subtitle}
                </h2>
                <p className="text-text-secondary max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed font-body border-l-2 border-accent/20 pl-4 sm:pl-6">
                  {dict.hero.tagline}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-6 pt-2 sm:pt-6">
                <BrutalistButton onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                  {dict.hero.hireMe}
                </BrutalistButton>
                <BrutalistButton variant="secondary" onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}>
                  {dict.hero.viewRecords}
                </BrutalistButton>
              </div>
            </div>

            {/* Line 2 — clear command */}
            {showLine2 && (
              <div ref={line2Ref} className="text-accent flex flex-col gap-2 text-sm pt-4 border-t border-[var(--color-border-subtle)]">
                <PromptPrefix />
                <div className="flex items-center gap-2 pl-2">
                  <span className="text-[var(--color-muted)]">└─</span>
                  <span className="text-accent">$</span>
                  <span className="text-text-primary font-bold tracking-tight">{prompt2}</span>
                  <span className="w-2 h-5 sm:w-2.5 sm:h-6 bg-accent animate-pulse shadow-[0_0_10px_var(--color-accent)]" />
                </div>
              </div>
            )}
          </div>
        </TerminalWindow>
      </div>
    </header>
  );
}
