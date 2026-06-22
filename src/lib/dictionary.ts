export const dictionary = {
  en: {
    nav: {
      about: "./about",
      experience: "./experience",
      stack: "./stack",
      contact: "./contact",
    },
    hero: {
      subtitle: "Senior React & React Native Engineer",
      tagline: "Building scalable mobile & web systems across fintech, banking, aviation — and now AI.",
      hireMe: "./EXECUTE_HIRE_CMD",
      viewRecords: "./VIEW_RECORDS",
      downloadCV: "./DOWNLOAD_CV",
    },
    about: {
      title: "Peralta.init()",
      p1: "Senior Developer with 8+ years delivering production-grade mobile and web applications. I specialize in the React ecosystem — from cross-platform mobile with React Native and Expo to performant web with Next.js — with a sharp focus on architecture, scalability, and developer experience.",
      p2: "My work spans fintech wallets, banking apps, airline booking systems, and internal tooling for a video game company. More recently, I've been building AI-powered solutions: a RAG-based support assistant with Mistral AI and ChromaDB, and open-source tooling for the Pi AI coding assistant ecosystem. I care about Clean Architecture, Feature-Based design, and writing code that teams can maintain for years.",
      stats: {
        years: "Years_Exp",
        industries: "Industries",
        platforms: "Platforms",
        teams: "Teams_Led",
      },
    },
    experience: {
      title: "Activity_Log",
      filteredBy: "Filtered_by: Chronological_Descending",
    },
    stack: {
      title: "Stack_Matrix",
      tagline: "A comprehensive ledger of technical proficiencies developed over 8+ years of production-grade engineering.",
    },
    contact: {
      title: "Let's_Work_Together",
      tagline: "Have a project in mind or want to explore collaboration? My inbox is always open for high-impact opportunities.",
      form: {
        name: "Visitor.name",
        email: "Visitor.email",
        message: "Message.body",
        submit: "./SEND_PAYLOAD",
      },
      secure: "SECURE_ENCRYPTED_CHANNEL",
    },
    footer: {
      status: "Server_Status: Operational",
      builtWith: "Built_with: Next.js + Tailwind + GSAP",
    },
  },
  es: {
    nav: {
      about: "./sobre-mi",
      experience: "./experiencia",
      stack: "./stack",
      contact: "./contacto",
    },
    hero: {
      subtitle: "Senior React & React Native Engineer",
      tagline: "Sistemas móviles y web escalables para fintech, banca, aviación — y ahora IA.",
      hireMe: "./EJECUTAR_CONTRATACION",
      viewRecords: "./VER_REGISTROS",
      downloadCV: "./DESCARGAR_CV",
    },
    about: {
      title: "Peralta.init()",
      p1: "Desarrollador Senior con más de 8 años entregando aplicaciones móviles y web en producción. Me especializo en el ecosistema React — desde mobile cross-platform con React Native y Expo hasta web performante con Next.js — con foco en arquitectura, escalabilidad y experiencia del desarrollador.",
      p2: "Mi trabajo abarca wallets fintech, apps bancarias, sistemas de reserva de aerolíneas y herramientas internas para una empresa de videojuegos. Más recientemente, construí soluciones con IA: un asistente de soporte basado en RAG con Mistral AI y ChromaDB, y tooling open-source para el ecosistema de AI coding assistant Pi. Me importa la Clean Architecture, el diseño Feature-Based y escribir código que los equipos puedan mantener por años.",
      stats: {
        years: "Años_Exp",
        industries: "Industrias",
        platforms: "Plataformas",
        teams: "Equipos_Liderados",
      },
    },
    experience: {
      title: "Registro_Actividad",
      filteredBy: "Filtrado_por: Cronológico_Descendente",
    },
    stack: {
      title: "Matriz_Stack",
      tagline: "Un registro completo de competencias técnicas desarrolladas durante más de 8 años de ingeniería de grado de producción.",
    },
    contact: {
      title: "Trabajemos_Juntos",
      tagline: "¿Tenés un proyecto en mente o querés explorar una colaboración? Siempre estoy abierto a oportunidades de alto impacto.",
      form: {
        name: "Visitante.nombre",
        email: "Visitante.email",
        message: "Mensaje.cuerpo",
        submit: "./ENVIAR_CARGA_UTIL",
      },
      secure: "CANAL_SEGURO_ENCRIPTADO",
    },
    footer: {
      status: "Estado_Servidor: Operacional",
      builtWith: "Construido_con: Next.js + Tailwind + GSAP",
    },
  },
};

export type Dictionary = typeof dictionary.en;
export type Language = "en" | "es";
