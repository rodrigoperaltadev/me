# rodrigoperalta.ar

Personal portfolio and CV website for **Rodrigo Peralta** — Senior React & React Native Engineer.

🔗 **Live:** [rodrigoperalta.ar](https://rodrigoperalta.ar)
📄 **CV:** downloadable from the live site (Contact section)

Built with a brutalist terminal aesthetic: dark mode default, Electric Cyan accent, grid background, mono typography, and View Transitions between pages.

---

## ✨ What makes it special

- **View Transitions** between the experience grid and detail pages — shared element morphing (year, company, role) using `next-view-transitions`
- **Brutalist terminal design language** — custom CSS grid background, IBM Plex Mono for code, Space Grotesk for headings, IBM Plex Sans for body
- **Dark / light mode** with electric cyan (#00FFFF) accent in dark, deep teal (#008B8B) in light
- **Bilingual copy** (EN / ES) centralized in a typed `dictionary`
- **Server-rendered experience detail pages** — pre-generated at build time via `generateStaticParams` (8 entries → 8 static pages)
- **SEO-ready** — `robots.ts`, `sitemap.ts`, OpenGraph image, dynamic viewport theme-color, Twitter cards, canonical URLs

## 🛠️ Tech Stack

**Framework & Language**
- [Next.js 15](https://nextjs.org/) (App Router, Turbopack)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/) (strict)

**Styling**
- [Tailwind CSS v4](https://tailwindcss.com/) with CSS custom properties for theming
- Brutalist borders + box-shadow offset (no border-radius)
- Grid background utility (`.grid-bg`)

**Animations & UX**
- [GSAP](https://gsap.com/) — timeline-based animations
- [Lenis](https://lenis.darkroom.engineering/) — smooth scroll
- [Motion](https://motion.dev/) — view transitions and micro-interactions
- [next-view-transitions](https://github.com/shuding/next-view-transitions) — shared element morphing

**Backend & Integrations**
- [Resend](https://resend.com/) — contact form email delivery
- React 19 Server Actions for the form submission

**Design**
- [Kombai](https://kombai.com/) — AI design-to-code for the initial UI generation

---

## 📁 Structure

```
src/
├── app/
│   ├── layout.tsx                  # Root layout, metadata, viewport, fonts
│   ├── page.tsx                    # Landing page composition
│   ├── not-found.tsx               # 404 page (terminal mock)
│   ├── robots.ts                   # /robots.txt
│   ├── sitemap.ts                  # /sitemap.xml (9 URLs)
│   ├── opengraph-image.tsx         # Dynamic OG image
│   ├── icon.svg                    # Favicon
│   ├── globals.css                 # Theme tokens + base styles
│   ├── experience/
│   │   └── [id]/
│   │       ├── page.tsx            # Experience detail (async, uses generateStaticParams)
│   │       └── loading.tsx         # Skeleton while loading
│   └── actions/
│       └── contact.ts              # Server action: send email via Resend
├── components/
│   ├── AppProvider.tsx             # Theme + nav context
│   ├── sections/                   # Hero, About, Experience, Stack, Contact, Footer, Navbar
│   └── ui/                         # BrutalistButton, TerminalWindow, etc.
├── hooks/
└── lib/
    ├── experienceData.ts           # All work experience entries + slug helpers
    ├── dictionary.ts               # EN/ES copy (typed)
    ├── site.ts                     # SITE_URL constant (shared across metadata files)
    └── utils.ts                    # cn() + small helpers
```

## 🏃 Scripts

| Script | Description |
|---|---|
| `npm run dev` | Dev server with Turbopack + HMR |
| `npm run build` | Production build (with type-check) |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## 🚀 Local Development

```bash
git clone https://github.com/rodrigoperaltadev/me.git
cd me
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Copy `.env.local.example` (or create `.env.local`) with:

```bash
RESEND_API_KEY=your_resend_api_key_here
```

The contact form requires `RESEND_API_KEY` to send emails. The rest of the site works without it.

## 🎨 Design System

Colors and typography are defined as CSS custom properties in `globals.css`:

```css
--color-background: #111111;
--color-surface: #1a1a1a;
--color-accent: #00FFFF;
--color-text-primary: #E5E4E2;
```

Light theme overrides via `.light-theme` class. Toggle is persisted to `localStorage`.

---

## 📬 Contact

- **Portfolio:** [rodrigoperalta.ar](https://rodrigoperalta.ar)
- **LinkedIn:** [rodrigoperaltadev](https://www.linkedin.com/in/rodrigoperaltadev)
- **Email:** through the contact form on the live site

## 📄 License

MIT — feel free to fork and adapt the design for your own portfolio. Attribution appreciated.

---

<sub>Designed and built with care by Rodrigo Peralta · Buenos Aires, Argentina 🇦🇷</sub>
