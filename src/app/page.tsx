"use client";

import { useAnimations } from "@/hooks/useAnimations";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Stack } from "@/components/sections/Stack";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", href: "#" },
  { id: "about", href: "#about" },
  { id: "experience", href: "#experience" },
  { id: "stack", href: "#stack" },
  { id: "contact", href: "#contact" },
];

function ScrollDots() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((section, index) => {
      const el = section.id === "hero"
        ? document.querySelector("header")
        : document.getElementById(section.id);

      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(index);
        },
        { threshold: 0.4 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3 items-center">
      {SECTIONS.map((section, i) => (
        <a
          key={section.id}
          href={section.href}
          aria-label={`Go to ${section.id}`}
          className={[
            "block rounded-full transition-all duration-300",
            i === activeIndex
              ? "w-2 h-4 bg-accent shadow-[0_0_8px_var(--color-accent)]"
              : "w-2 h-2 bg-text-primary opacity-25 hover:opacity-70 hover:bg-accent",
          ].join(" ")}
        />
      ))}
    </div>
  );
}

export default function Home() {
  useAnimations();

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Stack />
      <Contact />
      <Footer />
      <ScrollDots />
    </main>
  );
}
