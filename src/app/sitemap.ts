import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { experienceData, idToSlug } from "@/lib/experienceData";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const experiencePages = experienceData.map((exp) => ({
    url: `${SITE_URL}/experience/${idToSlug(exp.id)}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 1.0,
    },
    ...experiencePages,
  ];
}
