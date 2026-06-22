# rodrigoperalta.ar

Personal portfolio and CV website for Rodrigo Peralta — Senior React & React Native Engineer.

Built with a brutalist terminal aesthetic, dark mode default, Electric Cyan accent, and bilingual support (EN/ES).

## Stack

- **Framework**: Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4 with CSS custom properties
- **Animations**: GSAP + Lenis smooth scroll
- **View Transitions**: `next-view-transitions` for shared element morphing between pages
- **Design tool**: Kombai

## Structure

```
src/
├── app/
│   ├── experience/[id]/    # Dynamic experience detail pages
│   └── page.tsx            # Main landing page
├── components/
│   ├── sections/           # Hero, About, Experience, Stack, Contact, Footer, Navbar
│   └── ui/                 # BrutalistButton, TerminalWindow
└── lib/
    ├── experienceData.ts   # All work experience entries
    └── dictionary.ts       # EN/ES copy
```

## Sections

- **Hero** — Terminal animation loop with typewriter effect
- **About** — Bio, profile photo, stats
- **Experience** — Work history with View Transitions to detail pages
- **Stack** — Tech categories with proficiency levels
- **Contact** — Contact form + social links

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Deployed on Vercel at [rodrigoperalta.ar](https://rodrigoperalta.ar).
