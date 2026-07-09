import { experienceData, type ExperienceEntry } from "./experienceData";

/**
 * Spanish translations for experience entries.
 *
 * Only the fields that actually change per language are stored here
 * (role + points). Structural fields (year, company, industry, stack)
 * are inherited from experienceData — single source of truth for those.
 *
 * Keyed by experienceData `id`.
 */
const experienceTranslationsEs: Record<
  string,
  { role: string; points: string[] }
> = {
  "000_VAL2": {
    role: "Senior React & React Native Developer",
    points: [
      "Lidero el desarrollo frontend en múltiples proyectos de clientes en simultáneo, incluyendo una app self-service de post-booking en React Native para Aerolíneas Argentinas, dos apps en Flutter para Berel (marca mexicana de pinturas), una superapp en React Native para Siman (retail centroamericano) y una app de e-commerce en React Native con BFF en Fastify para Unisuper/La Torre (Guatemala).",
      "Impulso iniciativas de salud técnica: limpieza incremental de código muerto, modernización de Redux y mejora de cobertura de tests usando react-doctor y Knip para medir y reducir exports sin uso.",
      "Establezco estándares de arquitectura entre equipos: arquitectura basada en features, patrones BFF, XState para flujos complejos y TanStack Query para el manejo de estado del servidor.",
    ],
  },
  "000_ALT": {
    role: "Senior Fullstack Developer",
    points: [
      "Construí un asistente de soporte basado en RAG para NAVANTIA (SAP ARIBA) usando Python/FastAPI, Mistral AI, ChromaDB y React — con chat en streaming en tiempo real, un agente de email inteligente con auto-respuesta y un mapa de conocimiento semántico interactivo construido con UMAP + DBSCAN.",
      "Desarrollé una plataforma de gestión de contratos para Airbus Defence and Space usando Vue 3, GraphQL (Mercurius/Apollo), Node.js/Fastify y PostgreSQL — cubriendo cálculos de Liquidated Damages, fórmulas de escalación de precios indexadas a indicadores económicos y generación automática de documentos (Word/Excel/PDF).",
      "Construí una SPA de planificación de proyectos para un cliente de ingeniería alemán, con un diagrama de Gantt interactivo, seguimiento de hitos, dashboards de KPIs con exportación a Excel y un sistema de permisos granular de 4 roles.",
    ],
  },
  "001_DIST": {
    role: "Senior React & React Native Developer",
    points: [
      "Desarrollé la app móvil de Rabbit con React Native + TypeScript, entregando una experiencia fluida de compra, pago y recarga.",
      "Contribuí a la plataforma de backoffice usando Next.js, mejorando las capacidades administrativas y la eficiencia operativa.",
      "Apliqué arquitectura basada en features y patrones MVVM en todos los proyectos para mantenibilidad a largo plazo.",
    ],
  },
  "002_N1U": {
    role: "Senior React & React Native Developer",
    points: [
      "Lideré el desarrollo de la app de la wallet fintech N1u usando React Native + Expo, construyendo una UI cross-platform dinámica y accesible.",
      "Diseñé y construí la capa Backend-for-Frontend (BFF) con NestJS, actuando como intermediario entre el frontend móvil y los servicios de backend.",
      "Implementé pipelines de CI/CD, React Query para data fetching y Jest para tests unitarios — asegurando confiabilidad a escala.",
    ],
  },
  "003_VAL": {
    role: "Senior React & React Native Developer",
    points: [
      "Lideré el equipo de frontend web para Aerolíneas Argentinas, entregando soluciones de reserva y gestión de vuelos de alta calidad.",
      "Desarrollé y mantuve AR-PLUS, el programa de lealtad y recompensas de la aerolínea — una feature crítica usada por millones de pasajeros.",
      "Impulsé la adopción de Clean Architecture y patrones component-driven en el equipo de ingeniería.",
    ],
  },
  "004_PLAN": {
    role: "Frontend Developer",
    points: [
      "Construí y mantuve el módulo de administración web con Vue.js para la planificación de turnos de empleados en múltiples industrias.",
      "Contribuí a la app móvil en React Native, dando a los usuarios acceso on-the-go a las funcionalidades de gestión de turnos.",
    ],
  },
  "005_BDS": {
    role: "Software Development Engineer",
    points: [
      "Desarrollé la aplicación móvil de Sucursal Virtual del banco usando React Native, asegurando features de alta calidad y una experiencia de cliente fluida.",
      "Colaboré estrechamente con diseñadores para producir una UI accesible y pixel-perfect alineada con los estándares de UX bancario.",
    ],
  },
  "006_ETER": {
    role: "Software Development Engineer",
    points: [
      "Desarrollé y mantuve componentes de frontend y backend para herramientas internas, agilizando procesos en toda la organización de ingeniería.",
      "Primer rol profesional — construí una base sólida en desarrollo full-stack, prácticas de testing y sistemas en producción.",
    ],
  },
};

/**
 * Returns experience entries localized for the given language.
 * For "es", role + points are overridden; everything else is inherited.
 */
export function getExperienceData(lang: "en" | "es"): ExperienceEntry[] {
  if (lang === "en") return experienceData;

  return experienceData.map((entry) => {
    const t = experienceTranslationsEs[entry.id];
    return t ? { ...entry, role: t.role, points: t.points } : entry;
  });
}
