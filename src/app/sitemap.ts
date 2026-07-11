import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getExperienceData, idToSlug } from "@/lib/content/loaders";
import { getBlogPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const experience = await getExperienceData("en");
  const experiencePages = experience.map((exp) => ({
    url: `${SITE_URL}/experience/${idToSlug(exp.id)}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogPosts = await getBlogPosts(false);
  const blogPages = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    ...experiencePages,
    ...blogPages,
  ];
}