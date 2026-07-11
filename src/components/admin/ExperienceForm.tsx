"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExperienceSchema, type ExperienceFormValues } from "@/lib/schemas/admin";
import { FormInput } from "./FormInput";
import { BrutalistButton } from "@/components/ui/BrutalistButton";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { Save, X, Trash2, Globe, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExperienceFormProps {
  initialValues?: Partial<ExperienceFormValues>;
  isEdit?: boolean;
}

export function ExperienceForm({ initialValues, isEdit }: ExperienceFormProps) {
  const [showSpanish, setShowSpanish] = useState(initialValues?.hasSpanish || false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ExperienceFormValues>({
    resolver: zodResolver(ExperienceSchema),
    defaultValues: {
      active: true,
      hasSpanish: false,
      ...initialValues,
    },
  });

  const onSubmit = async (data: ExperienceFormValues) => {
    try {
      const body = {
        id: data.id,
        year: data.year,
        company: data.company,
        industry: data.industry,
        role: data.roleEn,
        points: data.pointsEn.split("\n").filter((p) => p.trim()),
        stack: data.stack.split(",").map((s) => s.trim()).filter(Boolean),
        active: data.active,
        esOverlay: data.hasSpanish
          ? {
              role: data.roleEs || "",
              points: (data.pointsEs || "").split("\n").filter((p) => p.trim()),
            }
          : undefined,
      };
      const url = isEdit ? `/api/admin/experience/${data.id}` : "/api/admin/experience";
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
      window.location.href = "/admin/experience";
    } catch {
      alert("Connection error");
    }
  };

  const handleDelete = async () => {
    if (confirm("CRITICAL_ACTION: PERMANENTLY_DELETE_RECORD?")) {
      try {
        const res = await fetch(`/api/admin/experience/${initialValues?.id}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          const errData = await res.json();
          alert(errData.error || "Failed to delete");
          return;
        }
        window.location.href = "/admin/experience";
      } catch {
        alert("Connection error");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 max-w-5xl animate-in slide-in-from-bottom-4 duration-500">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <TerminalWindow>
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <FormInput
                  label="Unique_Identifier"
                  id="id"
                  {...register("id")}
                  error={errors.id?.message}
                  readOnly={isEdit}
                  placeholder="e.g. stripe-senior-eng"
                  className={isEdit ? "opacity-50 cursor-not-allowed" : ""}
                />
                <FormInput
                  label="Timeline_Label"
                  {...register("year")}
                  error={errors.year?.message}
                  placeholder="e.g. 2023 - Present"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormInput
                  label="Organization"
                  {...register("company")}
                  error={errors.company?.message}
                  placeholder="e.g. Stripe"
                />
                <FormInput
                  label="Sector"
                  {...register("industry")}
                  error={errors.industry?.message}
                  placeholder="e.g. Fintech"
                />
              </div>
              
              <FormInput
                label="Role_Designation_(EN)"
                {...register("roleEn")}
                error={errors.roleEn?.message}
                placeholder="e.g. Senior Frontend Engineer"
              />

              <FormInput
                label="Core_Impact_Points_(EN)"
                textarea
                {...register("pointsEn")}
                error={errors.pointsEn?.message}
                placeholder="• Point one&#10;• Point two..."
                className="text-xs"
              />

              <FormInput
                label="Technology_Inventory"
                {...register("stack")}
                error={errors.stack?.message}
                placeholder="React, TypeScript, Node.js..."
              />
            </div>
          </TerminalWindow>

          {/* Spanish Content Overlay */}
          <div className="relative group">
            <div className={cn(
              "transition-all duration-500",
              !showSpanish ? "opacity-40 grayscale" : "opacity-100"
            )}>
              <TerminalWindow>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 border border-accent/20 bg-accent/5">
                      <Globe className="w-4 h-4 text-accent" />
                    </div>
                    <h3 className="text-xs font-bold text-accent uppercase tracking-[0.4em]">Localization_Layer: ES</h3>
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={showSpanish}
                      onChange={(e) => {
                        setShowSpanish(e.target.checked);
                        setValue("hasSpanish", e.target.checked);
                      }}
                      className="w-4 h-4 accent-accent"
                    />
                    <span className="text-[9px] font-bold text-muted uppercase tracking-widest">
                      {showSpanish ? "ACTIVE" : "DISABLED"}
                    </span>
                  </label>
                </div>

                {showSpanish ? (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <FormInput
                      label="Role_Designation_(ES)"
                      {...register("roleEs")}
                      error={errors.roleEs?.message}
                      placeholder="e.g. Ingeniero Frontend Senior"
                    />
                    <FormInput
                      label="Core_Impact_Points_(ES)"
                      textarea
                      {...register("pointsEs")}
                      error={errors.pointsEs?.message}
                      placeholder="• Punto uno&#10;• Punto dos..."
                      className="text-xs"
                    />
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-[10px] text-muted/40 uppercase tracking-[0.3em]">
                      Toggle the switch to provide Spanish translations.
                    </p>
                  </div>
                )}
              </TerminalWindow>
            </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          <TerminalWindow className="sticky top-24">
            <div className="space-y-8">
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold text-muted uppercase tracking-[0.3em] border-b border-white/5 pb-2">Record_Status</h4>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    {...register("active")}
                    className="w-5 h-5 accent-accent bg-black border-white/20"
                  />
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-text-primary uppercase tracking-widest">Visible_on_CV</span>
                    <span className="text-[9px] text-muted uppercase tracking-tighter">Current deployment status</span>
                  </div>
                </label>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5">
                <BrutalistButton 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 text-[10px]"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSubmitting ? "PROCESSING..." : "COMMIT_ENTRY"}
                </BrutalistButton>
                
                <BrutalistButton 
                  type="button" 
                  variant="secondary"
                  onClick={() => window.history.back()}
                  className="w-full py-4 text-[10px]"
                >
                  <X className="w-4 h-4 mr-2" />
                  DISCARD_CHANGES
                </BrutalistButton>
              </div>

              {isEdit && (
                <div className="pt-8 border-t border-red-500/10">
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="w-full text-[9px] font-bold text-red-500/60 hover:text-red-500 uppercase tracking-[0.2em] flex items-center justify-center gap-2 py-3 border border-red-500/10 hover:border-red-500/40 transition-all hover:bg-red-500/5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Destructive_Delete
                  </button>
                </div>
              )}
            </div>
          </TerminalWindow>

          {Object.keys(errors).length > 0 && (
            <div className="p-4 bg-red-500/5 border border-red-500/20 text-red-500 font-mono text-[10px] flex gap-3 animate-shake">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <div>
                <p className="font-bold uppercase mb-1">Validation_Failure</p>
                <p className="opacity-70">Check highlighed fields above to proceed.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
