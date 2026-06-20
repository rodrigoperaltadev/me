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
      tagline: "Engineering high-fidelity digital systems for fintech, banking, and aviation.",
      hireMe: "./EXECUTE_HIRE_CMD",
      viewRecords: "./VIEW_RECORDS",
    },
    about: {
      title: "Peralta.init()",
      p1: "I'm a solution-oriented Senior Developer with over 5 years of experience in the tech industry. I thrive at the intersection of complex problem solving and elegant user interface design.",
      p2: "My journey has spanned across industries from high-stakes fintech and banking to fast-paced gaming and aviation. I specialize in building robust mobile and web applications using the React ecosystem.",
      stats: {
        years: "Years_Exp",
        industries: "Industries",
        platforms: "Platforms",
        teams: "Teams",
      },
    },
    experience: {
      title: "Activity_Log",
      filteredBy: "Filtered_by: Chronological_Descending",
    },
    stack: {
      title: "Stack_Matrix",
      tagline: "A comprehensive ledger of technical proficiencies developed over 5+ years of production-grade engineering.",
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
      tagline: "Ingeniería de sistemas digitales de alta fidelidad para fintech, banca y aviación.",
      hireMe: "./EJECUTAR_CONTRATACION",
      viewRecords: "./VER_REGISTROS",
    },
    about: {
      title: "Peralta.init()",
      p1: "Soy un Desarrollador Senior orientado a soluciones con más de 5 años de experiencia en la industria tecnológica. Me destaco en la intersección de la resolución de problemas complejos y el diseño de interfaces de usuario elegantes.",
      p2: "Mi trayectoria abarca industrias que van desde fintech y banca de alto riesgo hasta gaming y aviación de ritmo acelerado. Me especializo en la construcción de aplicaciones móviles y web robustas utilizando el ecosistema React.",
      stats: {
        years: "Años_Exp",
        industries: "Industrias",
        platforms: "Plataformas",
        teams: "Equipos",
      },
    },
    experience: {
      title: "Registro_Actividad",
      filteredBy: "Filtrado_por: Cronológico_Descendente",
    },
    stack: {
      title: "Matriz_Stack",
      tagline: "Un registro completo de competencias técnicas desarrolladas durante más de 5 años de ingeniería de grado de producción.",
    },
    contact: {
      title: "Trabajemos_Juntos",
      tagline: "¿Tienes un proyecto en mente o quieres contratarme? Mi bandeja de entrada siempre está abierta para oportunidades de alto impacto.",
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
