import { z } from "zod";

const EXPERIENCE_ID = /^[0-9]{3}_[A-Z0-9]+$/;

export const ExperienceFileSchema = z.object({
  id: z.string().regex(EXPERIENCE_ID, "ID must match format: 000_NAME"),
  year: z.string().min(1, "Year is required"),
  company: z.string().min(1, "Company is required"),
  industry: z.string().min(1, "Industry is required"),
  role: z.string().min(1, "Role is required"),
  points: z.array(z.string().min(1)).min(1, "At least one point required"),
  stack: z.array(z.string().min(1)).min(1, "At least one stack item required"),
  active: z.boolean().optional(),
});

export type ExperienceFile = z.infer<typeof ExperienceFileSchema>;

export const ExperienceEsOverlaySchema = z.object({
  role: z.string().min(1, "ES role is required"),
  points: z.array(z.string().min(1)).min(1, "At least one ES point required"),
});

export type ExperienceEsOverlay = z.infer<typeof ExperienceEsOverlaySchema>;
