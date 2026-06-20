import React from "react";
import { cn } from "@/lib/utils";

interface BrutalistButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function BrutalistButton({ className, variant = "primary", children, ...props }: BrutalistButtonProps) {
  return (
    <button
      className={cn(
        "group relative px-10 py-5 font-bold uppercase tracking-widest text-xs transition-all active:translate-x-1 active:translate-y-1 active:shadow-none",
        variant === "primary"
          ? "bg-accent text-black border border-accent hover:bg-black hover:text-accent shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          : "border border-white/20 text-white/60 hover:border-accent hover:text-accent",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {variant === "primary" && (
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </button>
  );
}
