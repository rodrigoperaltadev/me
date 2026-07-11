import React from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/blog";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { ArrowRight, Calendar, Tag } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block relative">
      <div className="absolute -inset-0.5 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
      <TerminalWindow className="h-full relative transition-all duration-300 group-hover:border-accent/30 group-hover:translate-x-1 group-hover:-translate-y-1">
        <div className="space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-px bg-accent/30 group-hover:w-12 transition-all"></span>
              <span className="text-[9px] font-bold text-accent/60 uppercase tracking-[0.4em]">{post.tags[0] || "ARTICLE"}</span>
            </div>
            <h2 className="font-heading text-3xl font-bold tracking-tighter uppercase text-text-primary group-hover:text-accent transition-colors leading-[0.95]">
              {post.title}
            </h2>
          </div>

          <p className="text-[12px] text-text-secondary leading-relaxed font-mono opacity-90 line-clamp-3 tracking-wide">
            {post.description}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-white/5">
            <div className="flex items-center gap-6 text-[9px] font-mono text-text-secondary uppercase tracking-[0.2em]">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-accent" />
                <span>{post.date}</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-accent" />
                <div className="flex gap-2">
                  {post.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="hover:text-accent transition-colors cursor-pointer">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[9px] font-bold text-accent uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
              Read_Full_Entry
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </TerminalWindow>
    </Link>
  );
}
