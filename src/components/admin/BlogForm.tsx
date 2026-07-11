"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BlogSchema, type BlogFormValues } from "@/lib/schemas/admin";
import { FormInput } from "./FormInput";
import { BrutalistButton } from "@/components/ui/BrutalistButton";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { Save, X, Trash2, Eye, Edit3, AlertCircle, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogFormProps {
  initialValues?: Partial<BlogFormValues>;
  isEdit?: boolean;
}

export function BlogForm({ initialValues, isEdit }: BlogFormProps) {
  const [isPreview, setIsPreview] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BlogFormValues>({
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      draft: true,
      ...initialValues,
    },
  });

  const bodyContent = watch("body");

  const onSubmit = async (data: BlogFormValues) => {
    try {
      const body = {
        slug: data.slug,
        title: data.title,
        date: data.date,
        tags: data.tags,
        draft: data.draft,
        description: data.description,
        body: data.body,
      };
      const url = isEdit ? `/api/admin/blog/${data.slug}` : "/api/admin/blog";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const errData = await res.json();
        alert(errData.error || "Failed to save");
        return;
      }
      window.location.href = "/admin/blog";
    } catch {
      alert("Connection error");
    }
  };

  const handleDelete = async () => {
    if (confirm("CRITICAL_ACTION: PERMANENTLY_DELETE_POST?")) {
      try {
        const res = await fetch(`/api/admin/blog/${initialValues?.slug}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          const errData = await res.json();
          alert(errData.error || "Failed to delete");
          return;
        }
        window.location.href = "/admin/blog";
      } catch {
        alert("Connection error");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 max-w-6xl animate-in slide-in-from-bottom-4 duration-500 selection:bg-accent selection:text-black">
      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <TerminalWindow>
            <div className="space-y-8">
              <FormInput
                label="Entry_Heading"
                {...register("title")}
                error={errors.title?.message}
                placeholder="e.g. The Future of Web Development"
                className="text-xl font-bold font-heading"
              />

              <div className="grid md:grid-cols-2 gap-6">
                <FormInput
                  label="URI_Slug"
                  {...register("slug")}
                  error={errors.slug?.message}
                  placeholder="future-of-web-dev"
                />
                <FormInput
                  label="Event_Timestamp"
                  type="date"
                  {...register("date")}
                  error={errors.date?.message}
                />
              </div>

              <FormInput
                label="Metadata_Tags_(Comma_Separated)"
                {...register("tags")}
                error={errors.tags?.message}
                placeholder="React, Nextjs, AI..."
              />

              <FormInput
                label="Abstract_Excerpt"
                textarea
                {...register("description")}
                error={errors.description?.message}
                placeholder="Short excerpt for lists..."
                className="min-h-[80px]"
              />

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <label className="text-[9px] font-bold text-accent/60 uppercase tracking-[0.3em]">Buffer_Content_(MDX)</label>
                  <div className="flex border border-white/10 p-0.5 bg-black">
                    <button
                      type="button"
                      onClick={() => setIsPreview(false)}
                      className={cn(
                        "px-3 py-1 text-[8px] font-bold uppercase tracking-[0.2em] transition-all",
                        !isPreview ? "bg-accent text-black" : "text-muted hover:text-text-primary"
                      )}
                    >
                      <Edit3 className="w-3 h-3 inline mr-1" /> Raw_Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsPreview(true)}
                      className={cn(
                        "px-3 py-1 text-[8px] font-bold uppercase tracking-[0.2em] transition-all",
                        isPreview ? "bg-accent text-black" : "text-muted hover:text-text-primary"
                      )}
                    >
                      <Eye className="w-3 h-3 inline mr-1" /> Rendered
                    </button>
                  </div>
                </div>

                {isPreview ? (
                  <div className="min-h-[500px] p-8 bg-surface-alt border border-accent/10 font-sans max-w-none prose-sm overflow-auto">
                    {bodyContent ? (
                       <div className="opacity-90 leading-relaxed space-y-4 text-text-primary/90">
                         {bodyContent.split('\n').map((line, i) => (
                           <p key={i}>{line}</p>
                         ))}
                       </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-muted/20 py-20">
                        <FileText className="w-12 h-12 mb-2" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">NO_CONTENT_BUFFERED</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <FormInput
                    label="Source_MDX"
                    textarea
                    id="body"
                    {...register("body")}
                    error={errors.body?.message}
                    className="min-h-[600px] text-xs leading-relaxed font-mono"
                    placeholder="# Write your post here..."
                  />
                )}
              </div>
            </div>
          </TerminalWindow>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          <TerminalWindow className="sticky top-24">
            <div className="space-y-8">
              <div className="space-y-5">
                <h4 className="text-[10px] font-bold text-muted uppercase tracking-[0.4em] border-b border-white/5 pb-2">Record_Status</h4>
                <label className="flex items-center gap-4 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      {...register("draft")}
                      className="w-5 h-5 accent-accent bg-black border-white/20"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-text-primary uppercase tracking-widest">Draft_Mode</span>
                    <span className="text-[9px] text-muted uppercase tracking-tighter">Visibility restricted to admin</span>
                  </div>
                </label>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5">
                <BrutalistButton 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-5 text-[10px] tracking-[0.2em]"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Processing..." : "Commit_Post"}
                </BrutalistButton>
                
                <BrutalistButton 
                  type="button" 
                  variant="secondary"
                  onClick={() => window.history.back()}
                  className="w-full py-5 text-[10px] tracking-[0.2em]"
                >
                  <X className="w-4 h-4 mr-2" />
                  Discard
                </BrutalistButton>
              </div>

              {isEdit && (
                <div className="pt-8 border-t border-red-500/10">
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="w-full text-[9px] font-bold text-red-500/50 hover:text-red-500 uppercase tracking-[0.3em] flex items-center justify-center gap-2 py-4 border border-red-500/10 hover:border-red-500/30 transition-all hover:bg-red-500/5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete_Record
                  </button>
                </div>
              )}
            </div>
          </TerminalWindow>

          {Object.keys(errors).length > 0 && (
            <div className="p-5 bg-red-500/5 border border-red-500/20 text-red-500 font-mono text-[10px] flex gap-4 animate-shake">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <div>
                <p className="font-bold uppercase mb-1">ERR_INTEGRITY</p>
                <p className="opacity-70 leading-relaxed">Required fields missing or malformed. Fix errors to proceed.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
