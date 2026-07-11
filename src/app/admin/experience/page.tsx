import React from "react";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { ChevronRight, Database, Inbox, Activity } from "lucide-react";
import { getExperienceData } from "@/lib/content/loaders";

export default async function ExperienceListPage() {
  const experiences = await getExperienceData("en");

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <AdminHeader 
        title="Experience" 
        action={{ label: "Add_Entry", href: "/admin/experience/new" }}
      />

      {experiences.length === 0 ? (
        <TerminalWindow>
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-6">
            <div className="p-4 border border-white/5 bg-white/2 animate-pulse">
              <Inbox className="w-16 h-16 text-muted/20" />
            </div>
            <div className="space-y-2">
              <p className="font-bold uppercase tracking-[0.5em] text-accent/40">DB_NULL</p>
              <p className="text-[10px] text-muted/40 uppercase tracking-widest">No professional records detected in the primary buffer.</p>
            </div>
          </div>
        </TerminalWindow>
      ) : (
        <div className="grid gap-6">
          {experiences.map((exp) => (
            <Link key={exp.id} href={`/admin/experience/${exp.id}`} className="block group">
              <TerminalWindow className="transition-all duration-300 group-hover:border-accent/40 group-hover:shadow-[0_0_30px_rgba(0,255,0,0.05)]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="hidden sm:flex w-12 h-12 items-center justify-center border border-white/10 bg-white/2 group-hover:border-accent/30 group-hover:bg-accent/5 transition-colors">
                      <Database className="w-5 h-5 text-accent/30 group-hover:text-accent transition-colors" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-heading text-xl font-bold text-text-primary uppercase tracking-tight group-hover:text-accent transition-colors">
                        {exp.company}
                      </h3>
                      <div className="flex items-center gap-3">
                         <span className="text-[9px] font-bold text-accent/60 bg-accent/5 px-2 py-0.5 border border-accent/20 uppercase tracking-widest">
                           {exp.industry}
                         </span>
                         <span className="text-[10px] text-muted font-mono uppercase tracking-widest opacity-60">
                           {exp.role}
                         </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-10">
                    <div className="grid grid-cols-2 gap-8 text-[9px] font-mono text-muted uppercase tracking-[0.2em]">
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-accent/30">PERIOD</span>
                        <span className="text-text-primary group-hover:text-accent transition-colors">{exp.year}</span>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-accent/30">REC_ID</span>
                        <span className="text-text-primary/60">#{exp.id.toUpperCase()}</span>
                      </div>
                    </div>
                    <div className="p-2 border border-transparent group-hover:border-accent/20 group-hover:bg-accent/5 transition-all">
                      <ChevronRight className="w-5 h-5 text-accent/20 group-hover:text-accent transition-colors" />
                    </div>
                  </div>
                </div>
              </TerminalWindow>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-8 flex items-center gap-4 text-[8px] text-muted/30 uppercase tracking-[0.4em]">
        <Activity className="w-3 h-3" />
        Listing_active // Total_Records: {experiences.length}
      </div>
    </div>
  );
}
