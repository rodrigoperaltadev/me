# TODO — Rodrigo Peralta · Dev Career Backlog

> **NOTA**: El backlog activo ahora vive en `.backlog/` (backend local, flow dev),
> gestionado con la skill `backlog-manager`. Este archivo queda como referencia
> histórica del contenido original. Fuente única de verdad: `.backlog/items/`.

---

## 🌐 Portfolio — rodrigoperalta.ar

### Pendiente de Kombai
- [ ] Fix tema dark/light en página de detalle de experiencia (`/experience/[id]`) — prompt ya generado
- [ ] Revisar responsividad de la página de detalle de experiencia en mobile

### Funcionalidades
- [ ] Probar formulario de contacto en producción (verificar que llega el mail con dominio propio)
- [ ] Agregar página 404 personalizada (`app/not-found.tsx`) con estilo terminal
- [ ] Agregar sección **Projects / Case Studies** (post-MVP) — documentar RAG, clause_pilot, germany
- [ ] Agregar sección **Blog** (post-MVP) — ver bloque dedicado abajo (`## ✍️ Contenido & Blog`)
- [ ] Conectar botón **Descargar CV** en el Hero → ruta `/cv` (el string `dict.hero.downloadCV` ya existe pero no está cableado a ningún botón)
- [ ] Agregar página **/now** — qué estás haciendo ahora mismo (stack actual, proyecto, lectura)
- [ ] Agregar **Fun Zone** — terminal interactiva en el browser (easter egg)
- [ ] Agregar **Open Graph image** para páginas de detalle de experiencia individualmente
- [ ] Internacionalización completa — revisar que todos los textos del sitio usen `dict`

### SEO & Visibilidad
- [ ] Registrar `rodrigoperalta.ar` en **Google Search Console** y subir sitemap
- [ ] Generar `sitemap.xml` dinámico (`app/sitemap.ts` en Next.js)
- [ ] Generar `robots.txt` (`app/robots.ts`)
- [ ] Agregar Google Analytics o Plausible para ver tráfico
- [ ] Compartir el portfolio en LinkedIn con un post explicando cómo lo construiste (Kombai + Claude + Next.js)
- [ ] Submitir el portfolio a directorios: Built With, Hackernoon Dev Profiles, etc.

### Calidad
- [ ] Audit de accesibilidad (lighthouse score > 90 en todas las métricas)
- [ ] Test en Safari (View Transitions puede comportarse diferente)
- [ ] Test completo en mobile (iOS Safari + Android Chrome)
- [ ] Agregar `<meta name="theme-color">` para color de barra en mobile
- [ ] Verificar que el favicon SVG se muestra correctamente en todos los browsers

---

## 🗂️ Backoffice / Admin — Gestión de contenido

> Objetivo: dejar de editar `experienceData.ts` a mano y cargar experiencia + artículos de blog
> desde una UI propia. Fuente única de verdad para el CV (web + PDF/Markdown) y el blog.

### Decisión pendiente (definir ANTES de codear)
- [ ] **Persistencia**: elegir dónde viven los datos. Opciones:
  - **Archivos MDX/JSON en el repo** (más simple, versionado en git, cero DB, ideal para volumen bajo) — *recomendado para arrancar*
  - **DB + CMS headless** (Sanity / Payload / Supabase) — más potente, pero over-engineering hasta tener volumen real
- [ ] **Auth**: el admin NO puede ser público. Definir gate (Clerk / NextAuth / basic auth por env var para MVP)

### Tareas (post-decisión)
- [ ] Ruta protegida `/admin` con layout propio (fuera del sitio público, `noindex`)
- [ ] CRUD de **Experiencia** — cargar/editar/reordenar entries que hoy están hardcodeadas en `experienceData.ts`
- [ ] CRUD de **Blog** — crear/editar artículos (título, slug, fecha, tags, cuerpo MDX)
- [ ] Migrar `experienceData.ts` a la nueva fuente de datos sin romper `/experience/[id]` ni el sitemap
- [ ] Regenerar CV (web `/cv` + `CV.md`) automáticamente desde la fuente única
- [ ] Preview en vivo antes de publicar (draft vs published)

---

## 🤖 AI / Chatbot — Decisión

**Decisión (Junio 2026): NO agregar chatbot al portfolio principal.**

Razones:
- Distrae del trabajo real (8 años mobile/web)
- "Chat with my portfolio" es gimmick ya visto mil veces
- Costo/beneficio nefasto: API key, RAG, rate limiting, streaming — para que un reclutador cliquee una vez
- Riesgo: si el bot alucina algo sobre tu experiencia, peor que no tenerlo

### Alternativas aprobadas

- [ ] **(alta prioridad)** Construir `rag-starter-kit` como OSS — es donde tu skill de RAG realmente vive (FastAPI + ChromaDB + Mistral AI, basado en NAVANTIA sin código propietario). Ya está en Open Source, subir prioridad.
- [ ] **(media, opcional)** "Ask my portfolio" RAG-powered — solo si se hace BIEN: RAG real sobre tu contenido, escondido en `/fun`, no en el portfolio principal
- [ ] `/now` page (ya en Portfolio) — alternativa sin AI, simple y efectiva
- [ ] Fun Zone terminal (ya en Portfolio) — easter egg on-brand con la estética brutalista

---

## 🐙 GitHub Profile — rodrigoperaltadev

### Perfil (sin código, acción inmediata)
- [ ] Crear repo especial `rodrigoperaltadev/rodrigoperaltadev` con profile README
- [ ] Completar bio: "Senior React & React Native Engineer · Building mobile and web systems · rodrigoperalta.ar"
- [ ] Agregar website: `https://rodrigoperalta.ar`
- [ ] Agregar ubicación: Buenos Aires, Argentina
- [ ] Agregar link a LinkedIn y Twitter en el perfil
- [ ] Pinear los 6 repos correctos: easii-pi, my-resume, number-2-words, rag-starter-kit, rn-feature-architecture, easii-expo-template
- [ ] Sacar de pinned: trello-clone, z1-frontend-dev, countries-app-react-gql
- [ ] Agregar descripción y topics a TODOS los repos existentes
- [ ] Hacer público el repo `my-resume` (este portfolio) con README profesional
- [ ] Agregar website link en cada repo apuntando a la demo o a rodrigoperalta.ar

### Profile README (`rodrigoperaltadev/rodrigoperaltadev`)
- [ ] Banner/header con nombre y rol
- [ ] Stack badges (React Native, Next.js, TypeScript, Python, etc.)
- [ ] Links a proyectos destacados
- [ ] GitHub Stats badge (github-readme-stats)
- [ ] Link al portfolio y CV
- [ ] "Currently working on" section

---

## 📦 Proyectos Open Source a Crear

### 1. easii-pi — repo profesional (PRIORITARIO)
- [ ] Crear repo público `rodrigoperaltadev/easii-pi` con README completo
- [ ] Documentar arquitectura, casos de uso, instalación
- [ ] Agregar ejemplos de uso con código
- [ ] Agregar CI badge (GitHub Actions)
- [ ] Linkear el repo desde npm y desde el portfolio

### 2. rag-starter-kit (alto impacto)
- [ ] Template open source: FastAPI + ChromaDB + Mistral AI
- [ ] Basado en el proyecto de NAVANTIA (sin código propietario)
- [ ] README con diagrama de arquitectura
- [ ] Docker Compose para levantar en un comando
- [ ] Frontend React básico incluido

### 3. rn-feature-architecture (alto impacto)
- [ ] Boilerplate React Native con Feature-Based + Clean Architecture + MVVM
- [ ] TypeScript estricto, ESLint, Prettier configurados
- [ ] Testing con Jest + Testing Library
- [ ] GitHub Actions para CI
- [ ] README con explicación de la estructura

### 4. use-expo-hooks (impacto medio)
- [ ] Librería de custom hooks para Expo
- [ ] Hooks: biometrics, notifications, deep links, camera, location, storage
- [ ] TypeScript, docs, tests unitarios
- [ ] Publicar en npm

### 5. nextjs-clean-starter (impacto medio)
- [ ] Starter Next.js 15 App Router con Feature-Based architecture
- [ ] Tailwind v4, Vitest, CI/CD incluidos
- [ ] README con decisiones de arquitectura explicadas

---

## 💼 LinkedIn

- [ ] Actualizar titular: "Senior React & React Native Engineer | Next.js · TypeScript · AI/RAG"
- [ ] Actualizar "Acerca de" con el mismo tono del bio del portfolio
- [ ] Agregar experiencia Alten con los 3 proyectos (RAG, clause_pilot, germany)
- [ ] Agregar enlace al portfolio en la sección de contacto
- [ ] Pedir recomendaciones a ex-compañeros de Distillery, Valtech o n1u
- [ ] Publicar post compartiendo el portfolio (alcance orgánico gratuito)

---

## ✍️ Contenido & Blog

> Espacio de blog para comenzar a subir artículos. Depende de la infra del bloque
> `## 🗂️ Backoffice / Admin` (o arrancar con MDX estático en el repo mientras tanto).

### Infra mínima
- [ ] Ruta `/blog` (índice de artículos) + `/blog/[slug]` (detalle) con estilo del portfolio
- [ ] Soporte MDX (frontmatter: título, fecha, tags, descripción, draft)
- [ ] RSS feed (`app/feed.xml`) y entradas en el sitemap
- [ ] OG image por artículo

### Artículos a escribir (primeros sugeridos)
- [ ] "Cómo construí mi portfolio con Kombai + Claude + Next.js" — alto potencial de viralización entre devs
- [ ] "Feature-Based Architecture en React Native: la guía que necesitaba cuando empecé"
- [ ] "RAG desde cero: construyendo un asistente de soporte con Mistral AI y ChromaDB"
- [ ] "View Transitions en Next.js 15: lo que los docs no te dicen"
- [ ] "easii-pi: por qué construí mi propio harness para React Native con Expo"

---

## 🛠️ Technical Debt — Portfolio

- [ ] Agregar `loading.tsx` en la ruta `/experience/[id]` para estado de carga
- [ ] Implementar envío real del formulario de contacto — verificar en producción
- [ ] Agregar animaciones de entrada a la sección Stack (stagger por categoría)
- [ ] Mejorar animaciones de scroll reveal en mobile (actualmente pueden lagguear)
- [ ] Agregar `prefetch` en los links de experiencia para navegación instantánea
- [ ] Considerar ISR (Incremental Static Regeneration) para las páginas de experiencia

---

## 🎯 Objetivos de Visibilidad (métricas a trackear)

- [ ] 100 visitas únicas en el primer mes
- [ ] 10 stars en algún repo open source
- [ ] 50 followers en GitHub
- [ ] Aparecer en búsqueda de Google para "Rodrigo Peralta developer"
- [ ] 1 oportunidad laboral inbound desde el portfolio

---

_Última actualización: Julio 2026_
