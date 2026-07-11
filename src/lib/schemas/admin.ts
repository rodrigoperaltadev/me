import { z } from "zod";

const EXPERIENCE_ID = /^[0-9]{3}_[A-Z0-9]+$/;

export const ExperienceSchema = z.object({
  id: z.string().min(1, "ID is required").regex(EXPERIENCE_ID, "ID must match format: 000_NAME"),
  year: z.string().min(1, "Year is required"),
  company: z.string().min(1, "Company is required"),
  industry: z.string().min(1, "Industry is required"),
  roleEn: z.string().min(1, "Role (EN) is required"),
  pointsEn: z.string().min(1, "Points (EN) are required"),
  stack: z.string().min(1, "Stack is required"),
  active: z.boolean(),
  hasSpanish: z.boolean(),
  roleEs: z.string().optional(),
  pointsEs: z.string().optional(),
}).refine((data) => {
  if (data.hasSpanish) {
    return !!data.roleEs && !!data.pointsEs;
  }
  return true;
}, {
  message: "Spanish fields are required when 'Spanish overlay' is active",
  path: ["roleEs"],
});

export type ExperienceFormValues = z.infer<typeof ExperienceSchema>;

export const BlogSchema = z.object({
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be URL-friendly"),
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
  tags: z.string().min(1, "Tags are required"),
  draft: z.boolean(),
  description: z.string().min(1, "Description is required"),
  body: z.string().min(1, "Body content is required"),
});

export type BlogFormValues = z.infer<typeof BlogSchema>;
