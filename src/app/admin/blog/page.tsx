import React from "react";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { ChevronRight, FileText, Clock, Tag, Activity } from "lucide-react";
import { getBlogPosts } from "@/lib/blog";
import { cn } from "@/lib/utils";

export default async function AdminBlogListPage() {
  const posts = await getBlogPosts(true);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 selection:bg-accent selection:text-black">
      <AdminHeader 
        title="Blog Engine" 
        action={{ label: "Write_Post", href: "/admin/blog/new" }}
      />

      {posts.length === 0 ? (
        <TerminalWindow>
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-6">
            <div className="p-4 border border-white/5 bg-white/2 animate-pulse">
              <FileText className="w-16 h-16 text-muted/20" />
            </div>
            <div className="space-y-2">
              <p className="font-bold uppercase tracking-[0.5em] text-accent/40">EMPTY_BUFFER</p>
              <p className="text-[10px] text-muted/40 uppercase tracking-widest">Your dev journal is currently devoid of content.</p>
            </div>
          </div>
        </TerminalWindow>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/admin/blog/${post.slug}`} className="block group">
              <TerminalWindow className="transition-all duration-300 group-hover:border-accent/40 group-hover:shadow-[0_0_30px_rgba(0,255,0,0.05)]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-6">
                    <div className={cn(
                      "p-3 border transition-colors",
                      post.draft 
                        ? "border-yellow-500/30 bg-yellow-500/5 text-yellow-500/80" 
                        : "border-accent/20 bg-accent/5 text-accent"
                    )}>
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center flex-wrap gap-3">
                        <h3 className="font-heading text-xl font-bold text-text-primary uppercase tracking-tight group-hover:text-accent transition-colors">
                          {post.title}
                        </h3>
                        {post.draft && (
                          <span className="text-[8px] font-bold text-yellow-500 border border-yellow-500/40 bg-yellow-500/5 px-2 py-0.5 tracking-[0.2em] uppercase">
                            [ DRAFT ]
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-5 text-[9px] text-muted/60 font-mono uppercase tracking-[0.2em]">
                        <span className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-accent/40" />
                          {post.date}
                        </span>
                        <div className="flex items-center gap-2">
                          <Tag className="w-3.5 h-3.5 text-accent/40" />
                          <div className="flex gap-2">
                            {post.tags.map(tag => (
                              <span key={tag} className="px-1.5 py-0.5 bg-white/5 border border-white/5">#{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-10">
                    <div className="hidden lg:flex flex-col items-end gap-1 text-[9px] font-mono text-muted uppercase tracking-[0.2em]">
                      <span className="text-accent/30">SLUG_PATH</span>
                      <span className="text-text-primary/40 truncate max-w-[200px]">/blog/{post.slug}</span>
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
        Blog_Index_Active // Total_Posts: {posts.length}
      </div>
    </div>
  );
}
