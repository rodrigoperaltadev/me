"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useApp } from "@/components/AppProvider";

type NavAnchor = "about" | "experience" | "stack" | "contact";

const ANCHORS: { hash: `#${NavAnchor}`; labelKey: NavAnchor }[] = [
  { hash: "#about", labelKey: "about" },
  { hash: "#experience", labelKey: "experience" },
  { hash: "#stack", labelKey: "stack" },
  { hash: "#contact", labelKey: "contact" },
];

/**
 * Full-screen mobile menu overlay. Renders nothing when closed.
 * Focus management, body scroll lock, and Escape-to-close all live in the open effect.
 */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { dict, lang } = useApp();
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const triggerElRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    triggerElRef.current = document.activeElement as HTMLElement | null;
    const focusId = window.setTimeout(() => firstLinkRef.current?.focus(), 0);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusId);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      triggerElRef.current?.focus();
    };
    // onClose identity may change per render; intentionally excluded to avoid
    // premature focus restoration while the menu is still open.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      role="dialog"
      id="mobile-menu"
      aria-modal="true"
      aria-labelledby="mobile-menu-title"
      className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="fixed inset-0 z-[61] flex flex-col bg-background"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="mobile-menu-title" className="sr-only">
          {dict.nav.menu}
        </h2>
        <div className="h-20 px-6 flex items-center justify-between border-b border-[var(--color-border-subtle)] shrink-0">
          <span className="font-heading font-bold text-2xl tracking-tighter">
            <span className="text-accent">R</span>P
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label={dict.nav.closeMenu}
            className="p-2 border border-accent/40 hover:border-accent text-accent hover:text-text-primary cursor-pointer transition-colors"
          >
            <span aria-hidden="true" className="block text-lg leading-none">✕</span>
          </button>
        </div>
        <nav className="flex-1 flex flex-col overflow-y-auto">
          {ANCHORS.map((anchor, i) => (
            <Link
              key={anchor.hash}
              href={{ pathname: "/", hash: anchor.hash }}
              onClick={onClose}
              ref={i === 0 ? firstLinkRef : undefined}
              className="py-5 px-6 font-mono uppercase tracking-widest text-lg sm:text-2xl border-b border-accent/30 hover:bg-accent/10 hover:text-accent transition-colors text-text-primary"
            >
              {dict.nav[anchor.labelKey]}
            </Link>
          ))}
          <Link
            href="/blog"
            onClick={onClose}
            className="py-5 px-6 font-mono uppercase tracking-widest text-lg sm:text-2xl border-b border-accent/30 hover:bg-accent/10 hover:text-accent transition-colors text-text-primary"
          >
            ./blog
          </Link>
          <a
            href={lang === "es" ? "/cv/es" : "/cv"}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="py-5 px-6 font-mono uppercase tracking-widest text-lg sm:text-2xl border-b border-accent/30 hover:bg-accent/10 hover:text-accent transition-colors text-text-primary"
          >
            {`> ./cv_${lang}`}
          </a>
        </nav>
      </div>
    </div>,
    document.body,
  );
}