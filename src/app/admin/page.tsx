import React from "react";
import Link from "next/link";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { Briefcase, FileText, ChevronRight, Database, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const DASHBOARD_TILES = [
    {
      title: "PRO_EXPERIENCE",
      description: "Management of professional history, tech stacks, and multi-lingual content delivery.",
      href: "/admin/experience",
      icon: Briefcase,
      count: "LIVE",
      color: "text-accent",
    },
    {
      title: "CONTENT_ENGINE",
      description: "MDX-based publishing system for technical documentation and development journals.",
      href: "/admin/blog",
      icon: FileText,
      count: "ACTIVE",
      color: "text-accent",
    },
  ];

  return (
    <div className="space-y-12 py-6 selection:bg-accent selection:text-black">
      <header className="space-y-3 relative">
        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-accent/20"></div>
        <h1 className="font-heading text-5xl font-bold tracking-tighter uppercase text-text-primary">
          Sys_Control
        </h1>
        <div className="flex flex-wrap items-center gap-6 text-[10px] text-accent/50 uppercase tracking-[0.3em] font-mono">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            CORE: ONLINE
          </span>
          <span className="flex items-center gap-2">
            <Database className="w-3 h-3" />
            VFS: MOUNTED
          </span>
          <span className="flex items-center gap-2">
            <Shield className="w-3 h-3" />
            AUTH: ROOT
          </span>
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {DASHBOARD_TILES.map((tile) => (
          <Link key={tile.href} href={tile.href} className="group block relative">
            <div className="absolute -inset-0.5 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
            <TerminalWindow className="h-full relative transition-all group-hover:border-accent/40">
              <div className="flex flex-col h-full space-y-8">
                <div className="flex justify-between items-center">
                  <div className={cn("p-3 border border-accent/20 bg-accent/5", tile.color)}>
                    <tile.icon className="w-8 h-8 glow-cyan" />
                  </div>
                  <div className="text-[9px] font-bold text-accent px-3 py-1 border border-accent/30 tracking-[0.2em] animate-pulse">
                    {tile.count}
                  </div>
                </div>

                <div className="space-y-3 flex-1">
                  <h2 className="font-heading text-2xl font-bold tracking-tight uppercase group-hover:text-accent transition-colors">
                    {tile.title}
                  </h2>
                  <p className="text-[11px] text-muted leading-relaxed font-mono tracking-wider opacity-80">
                    {tile.description}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-2 text-[10px] font-bold text-accent uppercase tracking-widest pt-6 border-t border-white/5">
                  <span className="flex items-center gap-2">
                    <ChevronRight className="w-3.5 h-3.5" />
                    Connect_Module
                  </span>
                  <span className="text-[8px] opacity-30 font-normal">ID: {tile.href.split('/').pop()?.toUpperCase()}</span>
                </div>
              </div>
            </TerminalWindow>
          </Link>
        ))}
      </div>

      <section className="mt-16">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[11px] font-bold text-accent uppercase tracking-[0.4em]">System_Logs</h3>
          <div className="h-px flex-1 bg-accent/20 mx-6"></div>
        </div>
        <div className="bg-black/40 border border-white/5 p-6 font-mono rounded-lg">
          <div className="space-y-2 text-[10px] text-muted/60">
            <p className="flex gap-4">
              <span className="text-accent/40">[{new Date().toISOString().split('T')[1].split('.')[0]}]</span>
              <span>AUTHENTICATION_SUCCESS: Root access granted to /dev/admin</span>
            </p>
            <p className="flex gap-4">
              <span className="text-accent/40">[{new Date().toISOString().split('T')[1].split('.')[0]}]</span>
              <span>FILESYSTEM_READY: Indexing content buffers...</span>
            </p>
            <p className="flex gap-4">
              <span className="text-accent/40">[{new Date().toISOString().split('T')[1].split('.')[0]}]</span>
              <span className="text-accent/80">READY_FOR_INPUT</span>
            </p>
            <p className="text-accent animate-pulse mt-2">_</p>
          </div>
        </div>
      </section>
    </div>
  );
}
