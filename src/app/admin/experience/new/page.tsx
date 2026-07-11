import React from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ExperienceForm } from "@/components/admin/ExperienceForm";

export default function NewExperiencePage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <AdminHeader 
        title="New Experience" 
        backHref="/admin/experience"
      />
      <ExperienceForm />
    </div>
  );
}
