import React from "react";
import Link from "next/link";
import { BlogCard } from "@/components/blog/BlogCard";
import { getBlogPosts } from "@/lib/blog";
import { ChevronLeft, Inbox, Terminal, Activity } from "lucide-react";

export default async function BlogListingPage() {
  const posts = await getBlogPosts(false);

  return (
    <div className="min-h-screen bg-background grid-bg text-text-primary font-mono selection:bg-accent selection:text-black">
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-32 space-y-20">
        <header className="space-y-8 relative">
          <div className="absolute -left-8 top-0 bottom-0 w-1 bg-accent/20 hidden md:block"></div>
          
          <Link 
            href="/"
            className="group inline-flex items-center gap-3 text-[10px] font-bold text-text-secondary hover:text-accent transition-all uppercase tracking-[0.4em]"
          >
            <div className="p-1.5 border border-white/10 group-hover:border-accent/40 bg-white/5 group-hover:bg-accent/5 transition-all">
              <ChevronLeft className="w-4 h-4" />
            </div>
            <span>Home_Directory</span>
          </Link>

          <div className="space-y-6">
            <h1 className="font-heading text-7xl md:text-9xl font-bold tracking-tighter uppercase text-text-primary leading-[0.8] animate-in slide-in-from-left-4 duration-700">
              Dev_Logs
            </h1>
            <div className="flex items-center gap-6 text-[11px] text-accent/70 font-bold uppercase tracking-[0.5em] animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-200">
              <Terminal className="w-5 h-5 text-accent animate-pulse" />
              <span>Technical_Documentation // Research_Buffer</span>
            </div>
          </div>
        </header>

        <div className="relative">
          <div className="absolute left-0 top-0 w-px h-full bg-white/5"></div>
          
          {posts.length === 0 ? (
            <div className="py-32 flex flex-col items-center justify-center text-center space-y-8 border border-white/5 bg-white/[0.01]">
              <div className="p-5 border border-white/5 bg-white/2">
                <Inbox className="w-16 h-16 text-muted/10" />
              </div>
              <div className="space-y-3">
                <p className="font-bold uppercase tracking-[0.6em] text-accent/30 italic">ARCHIVE_NULL</p>
                <p className="text-[10px] text-muted/40 uppercase tracking-[0.2em] max-w-[320px] leading-relaxed">
                  No public intelligence has been committed to the archive yet.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-12 pl-4 md:pl-12">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>

        <footer className="pt-24 pb-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] text-muted/20 uppercase tracking-[0.4em]">
           <div className="flex items-center gap-3">
             <Activity className="w-3.5 h-3.5" />
             <span>Status: Online // Nodes: {posts.length}</span>
           </div>
           <span>[ PORTFOLIO_V3.0.0-PROD ] &copy; {new Date().getFullYear()} RP_SECURE</span>
        </footer>
      </div>

      {/* Screen Effects Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden opacity-10 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[size:100%_4px,3px_100%]" />
      </div>
    </div>
  );
}
