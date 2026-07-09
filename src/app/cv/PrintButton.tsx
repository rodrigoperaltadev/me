"use client";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="cv-print-hide fixed bottom-6 right-6 z-50 rounded-none border border-accent bg-background px-5 py-3 font-mono text-sm uppercase tracking-widest text-accent shadow-[4px_4px_0px_0px_var(--color-accent)] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_var(--color-accent)]"
      aria-label="Print or save CV as PDF"
    >
      ./SAVE_AS_PDF
    </button>
  );
}
