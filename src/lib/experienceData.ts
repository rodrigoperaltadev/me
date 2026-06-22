export const experienceData = [
  {
    year: "2025 — PRES",
    company: "Valtech",
    industry: "IT Services",
    role: "Senior React & React Native Developer",
    active: true,
    points: [
      "Leading frontend development across multiple simultaneous client projects — including a React Native post-booking self-service app for Aerolíneas Argentinas, two Flutter apps for Berel (Mexican paint brand), a React Native superapp for Siman (Central American retail), and a React Native e-commerce app with a Fastify BFF for Unisuper/La Torre (Guatemala).",
      "Driving technical health initiatives: incremental dead code cleanup, Redux modernization, and improved test coverage using react-doctor and Knip to measure and reduce unused exports.",
      "Establishing architecture standards across teams: feature-based architecture, BFF patterns, XState for complex flows, and TanStack Query for server state management.",
    ],
    stack: ["React Native", "Flutter", "TypeScript", "Expo", "Redux", "XState", "TanStack Query", "Fastify", "Jest"],
    id: "000_VAL2",
  },
  {
    year: "2024 — 2025",
    company: "Alten",
    industry: "IT Consulting · Freelance",
    role: "Senior Fullstack Developer",
    active: true,
    points: [
      "Built a RAG-powered support assistant for NAVANTIA (SAP ARIBA) using Python/FastAPI, Mistral AI, ChromaDB and React — with real-time streaming chat, an intelligent email agent with auto-response, and an interactive semantic knowledge map built with UMAP + DBSCAN.",
      "Developed a contract management platform for Airbus Defence and Space using Vue 3, GraphQL (Mercurius/Apollo), Node.js/Fastify and PostgreSQL — covering Liquidated Damages calculations, price escalation formulas indexed to economic indicators, and automated document generation (Word/Excel/PDF).",
      "Built a project planning SPA for a German engineering client with an interactive Gantt chart, milestone tracking, KPI dashboards with Excel exports, and a granular 4-role permission system.",
    ],
    stack: ["React", "Vue 3", "TypeScript", "Python", "FastAPI", "GraphQL", "Mistral AI", "ChromaDB", "RAG", "Node.js"],
    id: "000_ALT",
  },
  {
    year: "2023 — 2025",
    company: "Distillery",
    industry: "IT Services",
    role: "Senior React & React Native Developer",
    points: [
      "Developed Rabbit's mobile app with React Native + TypeScript, delivering a seamless shopping, payment and recharge experience.",
      "Contributed to the backoffice platform using Next.js, improving administrative capabilities and operational efficiency.",
      "Applied Feature-Based architecture and MVVM patterns across all projects for long-term maintainability.",
    ],
    stack: ["React Native", "TypeScript", "Next.js", "MVVM", "Agile"],
    id: "001_DIST",
  },
  {
    year: "2023 — 2024",
    company: "n1u",
    industry: "Fintech · Freelance",
    role: "Senior React & React Native Developer",
    points: [
      "Led development of the N1u fintech wallet app using React Native + Expo, crafting a dynamic and accessible cross-platform UI.",
      "Designed and built the Backend-for-Frontend (BFF) layer with NestJS, acting as the intermediary between mobile frontend and backend services.",
      "Implemented CI/CD pipelines, React Query for data fetching, and Jest for unit testing — ensuring reliability at scale.",
    ],
    stack: ["React Native", "Expo", "NestJS", "BFF", "React Query", "Jest", "Zustand", "CI/CD"],
    id: "002_N1U",
  },
  {
    year: "2022 — 2023",
    company: "Valtech",
    industry: "IT Services",
    role: "Senior React & React Native Developer",
    points: [
      "Led the frontend web team for Aerolíneas Argentinas, delivering high-quality flight booking and management solutions.",
      "Developed and maintained AR-PLUS, the airline's loyalty and rewards program — a critical feature used by millions of passengers.",
      "Drove adoption of Clean Architecture and component-driven patterns across the engineering team.",
    ],
    stack: ["React.js", "Flutter", "TypeScript", "Redux", "Jest", "Clean Architecture", "CI/CD"],
    id: "003_VAL",
  },
  {
    year: "2021 — 2022",
    company: "Plannifai",
    industry: "SaaS · Shift Software",
    role: "Frontend Developer",
    points: [
      "Built and maintained the web administration module with Vue.js for employee shift scheduling across multiple industries.",
      "Contributed to the React Native mobile app, giving users on-the-go access to shift management features.",
    ],
    stack: ["Vue.js", "React Native", "TypeScript", "Redux", "Jest", "CI/CD"],
    id: "004_PLAN",
  },
  {
    year: "2021 — 2021",
    company: "Banco del Sol",
    industry: "Banking",
    role: "Software Development Engineer",
    points: [
      "Developed the bank's Virtual Branch mobile application using React Native, ensuring high-quality features and a seamless customer experience.",
      "Collaborated closely with designers to produce an accessible, pixel-perfect UI aligned with banking UX standards.",
    ],
    stack: ["React Native", "TypeScript", "Jest", "CI/CD"],
    id: "005_BDS",
  },
  {
    year: "2018 — 2021",
    company: "Etermax",
    industry: "Video Games",
    role: "Software Development Engineer",
    points: [
      "Developed and maintained frontend and backend components for internal tooling, streamlining processes across the engineering org.",
      "First professional role — built a strong foundation in full-stack development, testing practices, and production systems.",
    ],
    stack: ["JavaScript", "Redux", "Jest", "CSS Flexbox", "CI/CD", "Babel.js"],
    id: "006_ETER",
  },
];

export type ExperienceEntry = typeof experienceData[0];

export function idToSlug(id: string): string {
  return id.toLowerCase().replace("_", "-");
}

export function slugToEntry(slug: string) {
  return experienceData.find((e) => idToSlug(e.id) === slug);
}
