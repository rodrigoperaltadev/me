import React from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ExperienceForm } from "@/components/admin/ExperienceForm";
import { getExperienceData } from "@/lib/content/loaders";
import { notFound } from "next/navigation";

interface EditExperiencePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditExperiencePage({ params }: EditExperiencePageProps) {
  const { id } = await params;
  
  const [expEn, expEs] = await Promise.all([
    getExperienceData("en"),
    getExperienceData("es"),
  ]);

  const entryEn = expEn.find((e) => e.id === id);
  const entryEs = expEs.find((e) => e.id === id);

  if (!entryEn) {
    notFound();
  }

  const initialValues = {
    id: entryEn.id,
    year: entryEn.year,
    company: entryEn.company,
    industry: entryEn.industry,
    roleEn: entryEn.role,
    pointsEn: entryEn.points.join("\n"),
    stack: entryEn.stack.join(", "),
    active: true,
    hasSpanish: !!entryEs,
    roleEs: entryEs?.role,
    pointsEs: entryEs?.points.join("\n"),
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <AdminHeader 
        title="Edit Experience" 
        backHref="/admin/experience"
      />
      <ExperienceForm initialValues={initialValues} isEdit />
    </div>
  );
}
