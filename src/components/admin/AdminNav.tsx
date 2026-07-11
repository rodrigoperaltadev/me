"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Briefcase, FileText, LogOut, Terminal } from "lucide-react";

const NAV_ITEMS = [
  { label: "DASHBOARD", href: "/admin", icon: LayoutDashboard },
  { label: "EXPERIENCE", href: "/admin/experience", icon: Briefcase },
  { label: "BLOG", href: "/admin/blog", icon: FileText },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-accent/20 bg-surface sticky top-0 z-40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="flex items-center gap-2 group">
            <div className="p-1.5 border border-accent/30 bg-accent/5 group-hover:border-accent transition-colors">
              <Terminal className="w-4 h-4 text-accent" />
            </div>
            <span className="font-heading font-bold text-sm tracking-tighter text-accent glow-cyan">
              SYS_ROOT
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase transition-all flex items-center gap-2 border border-transparent",
                  pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
                    ? "text-accent bg-accent/10 border-accent/30 shadow-[0_0_10px_rgba(0,255,255,0.1)]"
                    : "text-muted hover:text-text-primary hover:border-white/10"
                )}
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <form action="/api/admin/logout" method="POST">
          <button
            type="submit"
            className="px-3 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase text-red-500 hover:bg-red-500/10 transition-all flex items-center gap-2 border border-transparent hover:border-red-500/30"
          >
            <LogOut className="w-3.5 h-3.5" />
            DISCONNECT
          </button>
        </form>
      </div>
    </nav>
  );
}
