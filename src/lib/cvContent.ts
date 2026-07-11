import { getCoreSkills } from "./content/loaders";

export type CvLang = "en" | "es";

/** Static contact info — language-independent. */
export const CV_CONTACT = {
  name: "Rodrigo Peralta",
  email: "rodrigoperalta.dev@gmail.com",
  website: "rodrigoperalta.ar",
  websiteUrl: "https://rodrigoperalta.ar",
  github: "github.com/rodrigoperaltadev",
  githubUrl: "https://github.com/rodrigoperaltadev",
  linkedin: "linkedin.com/in/rodrigo-alexis-peralta",
  linkedinUrl: "https://www.linkedin.com/in/rodrigo-alexis-peralta/",
};

/** Localized UI strings for the CV document. */
export const CV_STRINGS: Record<
  CvLang,
  {
    role: string;
    location: string;
    summary: string;
    sections: { summary: string; skills: string; experience: string };
    footerRight: string;
    metaTitle: string;
    metaDescription: string;
  }
> = {
  en: {
    role: "Senior React & React Native Engineer",
    location: "Argentina · Remote",
    summary:
      "Senior Developer with 8+ years delivering production-grade mobile and web applications. Specialized in the React ecosystem — from cross-platform mobile with React Native and Expo to performant web with Next.js — with a sharp focus on architecture, scalability, and developer experience. Experience spans fintech wallets, banking apps, airline booking systems, and AI-powered systems (RAG with Mistral AI and ChromaDB).",
    sections: { summary: "Summary", skills: "Core Skills", experience: "Experience" },
    footerRight: "References available upon request",
    metaTitle: "CV — Rodrigo Peralta",
    metaDescription:
      "Curriculum Vitae of Rodrigo Peralta, Senior React & React Native Engineer.",
  },
  es: {
    role: "Senior React & React Native Engineer",
    location: "Argentina · Remoto",
    summary:
      "Desarrollador Senior con más de 8 años entregando aplicaciones móviles y web en producción. Me especializo en el ecosistema React — desde mobile cross-platform con React Native y Expo hasta web performante con Next.js — con foco en arquitectura, escalabilidad y experiencia del desarrollador. Mi experiencia abarca wallets fintech, apps bancarias, sistemas de reserva de aerolíneas y, más recientemente, soluciones con IA (RAG con Mistral AI y ChromaDB).",
    sections: { summary: "Perfil", skills: "Skills", experience: "Experiencia" },
    footerRight: "Referencias disponibles a pedido",
    metaTitle: "CV — Rodrigo Peralta",
    metaDescription:
      "Currículum de Rodrigo Peralta, Senior React & React Native Engineer.",
  },
};

/**
 * Skill groups. `key` is stable (used for filtering); `label` is localized.
 * `items` are matched against the real stack from experienceData so only
 * skills the person actually used are surfaced.
 */
const SKILL_GROUPS: {
  key: string;
  label: Record<CvLang, string>;
  items: string[];
}[] = [
  {
    key: "mobile",
    label: { en: "Mobile", es: "Mobile" },
    items: ["React Native", "Expo", "Flutter"],
  },
  {
    key: "web",
    label: { en: "Web", es: "Web" },
    items: ["React.js", "React", "Next.js", "Vue 3", "Vue.js", "TypeScript"],
  },
  {
    key: "backend",
    label: { en: "Backend / BFF", es: "Backend / BFF" },
    items: ["Node.js", "NestJS", "Fastify", "FastAPI", "GraphQL", "BFF", "Python"],
  },
  {
    key: "state",
    label: { en: "State & Data", es: "Estado & Datos" },
    items: ["Redux", "Zustand", "XState", "TanStack Query", "React Query"],
  },
  {
    key: "ai",
    label: { en: "AI", es: "IA" },
    items: ["RAG", "Mistral AI", "ChromaDB"],
  },
  {
    key: "quality",
    label: { en: "Quality & Delivery", es: "Calidad & Entrega" },
    items: ["Jest", "CI/CD", "Clean Architecture", "MVVM", "Agile"],
  },
];

// Skills the person actually has — derived from the single source of truth at runtime.
async function getCoreSkillsSet(): Promise<Set<string>> {
  const skills = await getCoreSkills();
  return new Set(skills);
}

/** Returns localized skill groups, filtered to real skills only. */
export async function getSkillGroups(lang: CvLang) {
  const coreSkills = await getCoreSkillsSet();
  return SKILL_GROUPS.map((g) => ({
    label: g.label[lang],
    items: g.items.filter((s) => coreSkills.has(s)),
  })).filter((g) => g.items.length > 0);
}
