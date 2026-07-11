import React from "react";
import { cn } from "@/lib/utils";

interface BrutalistButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function BrutalistButton({ className, variant = "primary", children, ...props }: BrutalistButtonProps) {
  return (
    <button
      className={cn(
        "group relative px-10 py-5 font-mono font-bold uppercase tracking-widest text-[10px] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer flex items-center justify-center gap-2",
        variant === "primary"
          ? "bg-accent text-black border border-accent hover:bg-black hover:text-accent shadow-[4px_4px_0px_0px_rgba(0,255,255,0.3)] hover:shadow-[0px_0px_15px_rgba(0,255,255,0.4)]"
          : "border border-border text-text-secondary hover:border-accent hover:text-accent bg-transparent hover:bg-accent/5",
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      {variant === "primary" && (
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </button>
  );
}
