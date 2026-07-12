import React from "react";
import Link from "next/link";
import { getBlogPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import { ChevronLeft, Calendar, Tag, Clock, ArrowLeft } from "lucide-react";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import ReactMarkdown from "react-markdown";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post || post.draft) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background grid-bg text-text-primary font-mono selection:bg-accent selection:text-black">
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-32 space-y-16">
        <header className="space-y-10 relative">
          <Link 
            href="/blog"
            className="group inline-flex items-center gap-3 text-[10px] font-bold text-text-secondary hover:text-accent transition-all uppercase tracking-[0.4em]"
          >
            <div className="p-1.5 border border-white/10 group-hover:border-accent/40 bg-white/5 group-hover:bg-accent/5 transition-all">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span>Back_To_Index</span>
          </Link>

          <div className="space-y-8">
            <h1 className="font-heading text-6xl md:text-8xl font-bold tracking-tighter uppercase text-text-primary leading-[0.85] animate-in slide-in-from-left-4 duration-700">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-x-10 gap-y-4 text-[10px] text-text-secondary font-bold uppercase tracking-[0.4em] border-y border-white/5 py-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                <span>Published: {post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                <span>Reading_Time: 5M</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-accent" />
                <div className="flex gap-4">
                  {post.tags.map(tag => (
                    <span key={tag} className="hover:text-accent transition-colors">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <article className="relative">
          <div className="absolute -left-12 top-0 bottom-0 w-1 bg-accent/10 hidden lg:block"></div>
          
          <TerminalWindow className="relative mb-16">
            <div className="prose prose-invert prose-lg max-w-none lg:px-4 prose-headings:font-heading prose-headings:uppercase prose-headings:tracking-tighter prose-h1:text-4xl prose-h1:border-l-4 prose-h1:border-accent prose-h1:pl-6 prose-h2:text-3xl prose-h2:text-text-primary/90 prose-p:font-mono prose-p:text-[15px] prose-p:tracking-wide prose-p:text-text-primary/90 prose-strong:text-accent prose-strong:font-bold prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-li:text-text-primary/90 prose-li:font-mono prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:text-text-primary/90 prose-blockquote:italic prose-code:text-accent prose-code:bg-black/30 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10 prose-hr:border-white/20">
              <ReactMarkdown>{post.body}</ReactMarkdown>
            </div>
          </TerminalWindow>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-12 border-t border-white/5">
            <div className="flex items-center gap-4">
              <span className="text-[9px] font-bold text-muted uppercase tracking-[0.4em]">Share_Intel:</span>
              <div className="flex gap-2">
                {['Twitter', 'LinkedIn'].map(platform => (
                  <button key={platform} className="px-3 py-1.5 border border-white/10 hover:border-accent/40 hover:bg-accent/5 text-[9px] font-bold text-muted hover:text-accent transition-all uppercase tracking-widest">
                    {platform}
                  </button>
                ))}
              </div>
            </div>
            
            <Link href="/blog" className="w-full sm:w-auto">
              <div className="text-[10px] font-bold text-accent border border-accent/20 bg-accent/5 px-6 py-3 uppercase tracking-[0.4em] flex items-center justify-center gap-3 group hover:bg-accent hover:text-black transition-all">
                <span>Next_Log_Entry</span>
                <ChevronLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </article>

        <footer className="pt-32 pb-16 text-[8px] text-text-secondary/30 uppercase tracking-[0.6em] text-center italic">
          --- End_Of_Transmission // Node: {slug.replace(/-/g, '_').toUpperCase()} ---
        </footer>
      </div>

      {/* Screen Effects Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden opacity-10 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[size:100%_4px,3px_100%]" />
      </div>
    </div>
  );
}
