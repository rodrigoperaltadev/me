import React from "react";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  error?: string;
  textarea?: boolean;
}

export function FormInput({ label, error, textarea, className, id, ...props }: FormInputProps) {
  const InputComponent = textarea ? "textarea" : "input";
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-2 w-full group">
      <div className="flex justify-between items-end px-1">
        <label 
          htmlFor={inputId}
          className="text-[9px] font-bold text-accent/60 uppercase tracking-[0.3em] group-focus-within:text-accent transition-colors"
        >
          {label}
        </label>
        {error && (
          <span className="text-red-500 text-[9px] font-bold uppercase animate-pulse">
            ! ERR: {error}
          </span>
        )}
      </div>
      <div className="relative">
        <InputComponent
          id={inputId}
          className={cn(
            "w-full bg-black border border-white/10 px-4 py-3 font-mono text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/10 transition-all placeholder:text-muted/20",
            error && "border-red-500/40 focus:border-red-500 focus:ring-red-500/10",
            textarea && "min-h-[120px] resize-y leading-relaxed",
            className
          )}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement> & React.InputHTMLAttributes<HTMLInputElement>)}
        />
        <div className="absolute top-0 right-0 w-1 h-1 bg-white/5 border-t border-r border-white/20"></div>
        <div className="absolute bottom-0 left-0 w-1 h-1 bg-white/5 border-b border-l border-white/20"></div>
      </div>
    </div>
  );
}
