/**
 * Public type for an experience entry. Used by both server and client
 * components (UI consumers) and by the server-only loader.
 *
 * Kept in its own file so client bundles can import the type without
 * pulling in the async loader (which depends on node:fs).
 */

export interface ExperienceEntry {
  year: string;
  company: string;
  industry: string;
  role: string;
  active?: boolean;
  points: string[];
  stack: string[];
  id: string;
}

export interface ExperienceEsOverlay {
  role: string;
  points: string[];
}

export type Lang = "en" | "es";

/** Slug helper: `000_VAL2` → `000-val2`. Preserves legacy URL contract. */
export function idToSlug(id: string): string {
  return id.toLowerCase().replace("_", "-");
}