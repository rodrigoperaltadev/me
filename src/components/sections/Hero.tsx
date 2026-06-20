"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useApp } from "@/components/AppProvider";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { BrutalistButton } from "@/components/ui/BrutalistButton";
import gsap from "gsap";

type Phase = "typing-cmd" | "showing-output" | "typing-clear" | "clearing";

export function Hero() {
  const { dict } = useApp();
  const [prompt, setPrompt] = useState("");
  const [clearPrompt, setClearPrompt] = useState("");
  const [phase, setPhase] = useState<Phase>("typing-cmd");
  const [showOutput, setShowOutput] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const fullPrompt = "bash init_portfolio.sh --full-profile";
  const clearCmd = "clear";

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const addTimeout = (fn: () => void, delay: number) => {
    const id = setTimeout(fn, delay);
    timeoutsRef.current.push(id);
    return id;
  };

  const runLoop = useCallback(() => {
    clearAllTimeouts();
    setPrompt("");
    setClearPrompt("");
    setShowOutput(false);
    setPhase("typing-cmd");

    // Step 1: type the init command
    let charIndex = 0;
    const typeCmd = () => {
      if (charIndex < fullPrompt.length) {
        const ch = fullPrompt.charAt(charIndex);
        setPrompt((prev) => prev + ch);
        charIndex++;
        addTimeout(typeCmd, Math.random() * 40 + 30);
      } else {
        // Step 2: reveal output content
        addTimeout(() => {
          setShowOutput(true);
          setPhase("showing-output");
          gsap.fromTo(
            "#hero-content",
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" }
          );

          // Step 3: after showing output, type "clear" on a new line
          addTimeout(() => {
            setPhase("typing-clear");
            let ci = 0;
            const typeClear = () => {
              if (ci < clearCmd.length) {
                setClearPrompt((prev) => prev + clearCmd.charAt(ci));
                ci++;
                addTimeout(typeClear, Math.random() * 60 + 60);
              } else {
                // Step 4: fade out and restart loop
                addTimeout(() => {
                  setPhase("clearing");
                  gsap.to("#hero-content", {
                    opacity: 0,
                    y: -8,
                    duration: 0.3,
                    ease: "power2.in",
                    onComplete: () => addTimeout(() => runLoop(), 150),
                  });
                }, 500);
              }
            };
            typeClear();
          }, 4500);
        }, 400);
      }
    };

    addTimeout(typeCmd, 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    runLoop();
    return () => clearAllTimeouts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runLoop]);

  const isClearPhase = phase === "typing-clear" || phase === "clearing";

  return (
    <header className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-x-clip grid-bg">
      <TerminalWindow>
        {/* Command line */}
        <div className="text-accent mb-4 flex flex-col md:flex-row md:items-center gap-4 text-base relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-text-primary/20">┌──(</span>
            <span className="text-accent">rodrigo㉿workstation</span>
            <span className="text-text-primary/20">)-[</span>
            <span className="text-text-primary">~</span>
            <span className="text-text-primary/20">]</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-text-primary/20 md:hidden">└─</span>
            <span className="text-accent">$</span>
            <span className="text-text-primary font-bold tracking-tight">{prompt}</span>
            {!isClearPhase && (
              <span className="w-2.5 h-6 bg-accent animate-pulse shadow-[0_0_10px_var(--color-accent)]" />
            )}
          </div>
        </div>

        {/* Output / hero content */}
        {showOutput && (
          <div id="hero-content" className="space-y-10 relative z-10 mb-10">
            <h1 className="text-5xl md:text-9xl font-heading font-bold tracking-tighter leading-[0.85] text-text-primary">
              Rodrigo<br />Peralta
            </h1>
            <div className="space-y-6">
              <h2 className="text-2xl md:text-4xl text-accent font-medium tracking-tight glow-cyan">
                {dict.hero.subtitle}
              </h2>
              <p className="text-text-secondary max-w-2xl text-lg md:text-xl leading-relaxed font-body border-l-2 border-accent/20 pl-6">
                {dict.hero.tagline}
              </p>
            </div>

            <div className="flex flex-wrap gap-6 pt-6">
              <BrutalistButton onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                {dict.hero.hireMe}
              </BrutalistButton>
              <BrutalistButton variant="secondary" onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}>
                {dict.hero.viewRecords}
              </BrutalistButton>
            </div>
          </div>
        )}

        {/* Clear command line — shown after output */}
        {isClearPhase && (
          <div className="flex items-center gap-2 text-base font-mono relative z-10 mt-2">
            <span className="text-text-primary/20">└─</span>
            <span className="text-accent">$</span>
            <span className="text-text-primary font-bold tracking-tight">{clearPrompt}</span>
            <span className="w-2.5 h-6 bg-accent animate-pulse shadow-[0_0_10px_var(--color-accent)]" />
          </div>
        )}
      </TerminalWindow>
    </header>
  );
}
