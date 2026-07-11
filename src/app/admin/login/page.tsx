"use client";

import React, { useState } from "react";
import { BrutalistButton } from "@/components/ui/BrutalistButton";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { Lock, ShieldAlert, ChevronRight } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      
      if (res.ok) {
        window.location.href = "/admin";
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] grid-bg flex items-center justify-center p-4 selection:bg-accent selection:text-black">
      <div className="max-w-md w-full relative">
        <div className="absolute -inset-1 bg-accent/20 blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        
        <TerminalWindow className="relative">
          <div className="flex flex-col items-center text-center space-y-8 py-4">
            <div className="relative">
              <div className="w-20 h-20 bg-accent/5 border border-accent/20 flex items-center justify-center">
                <Lock className="w-10 h-10 text-accent glow-cyan animate-pulse" />
              </div>
              <div className="absolute -top-2 -right-2 w-4 h-4 border-t border-r border-accent"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b border-l border-accent"></div>
            </div>
            
            <div className="space-y-3">
              <h1 className="font-heading text-3xl font-bold tracking-tighter text-text-primary uppercase">
                Secure_Gate
              </h1>
              <div className="h-px w-12 bg-accent/50 mx-auto"></div>
              <p className="text-[10px] text-accent/60 uppercase tracking-[0.4em] font-bold">
                Level 3 Authorization Required
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full space-y-5">
              <div className="space-y-2 text-left">
                <label className="text-[9px] font-bold text-muted uppercase tracking-widest pl-1">
                  Access_Key
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/40">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="****************"
                    className="w-full bg-black border border-white/10 px-10 py-4 font-mono text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all placeholder:text-muted/30"
                    autoFocus
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-500/5 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-widest">
                  <ShieldAlert className="w-5 h-5 shrink-0" />
                  <span>ERR_AUTH_FAILURE: Check your credentials and try again.</span>
                </div>
              )}

              <BrutalistButton 
                type="submit" 
                className="w-full py-5 text-sm"
                disabled={loading}
              >
                {loading ? "Decrypting..." : "Execute_Login"}
              </BrutalistButton>
            </form>

            <div className="flex justify-between w-full text-[8px] text-muted/30 uppercase tracking-[0.2em] pt-4 border-t border-white/5">
              <span>Node: portfolio-01</span>
              <span>Uptime: 99.9%</span>
            </div>
          </div>
        </TerminalWindow>
      </div>
    </div>
  );
}
