import React from "react";
import { BrutalistButton } from "@/components/ui/BrutalistButton";
import Link from "next/link";
import { Plus, ChevronLeft } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  backHref?: string;
  action?: {
    label: string;
    href: string;
    icon?: React.ElementType;
  };
}

export function AdminHeader({ title, backHref, action }: AdminHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/5 relative">
      <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-accent"></div>
      
      <div className="space-y-2">
        {backHref && (
          <Link 
            href={backHref}
            className="group inline-flex items-center gap-2 text-[9px] font-bold text-muted hover:text-accent transition-colors uppercase tracking-[0.3em] mb-2"
          >
            <div className="p-1 border border-white/10 group-hover:border-accent/30 bg-white/5">
              <ChevronLeft className="w-3 h-3" />
            </div>
            <span>Return_To_List</span>
          </Link>
        )}
        <h1 className="font-heading text-5xl font-bold tracking-tighter uppercase text-text-primary">
          {title}
        </h1>
      </div>

      {action && (
        <Link href={action.href}>
          <BrutalistButton className="px-8 py-4 flex items-center gap-3 text-xs tracking-[0.2em]">
            {action.icon ? <action.icon className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {action.label}
          </BrutalistButton>
        </Link>
      )}
    </div>
  );
}
