# Proposal: Admin Backoffice for Content Management

## Intent

Experience is hardcoded in `experienceData.ts` (8 entries) with ES overlays in `experienceDataEs.ts`; `cvContent.ts` derives skills from it. Blog has no storage yet. Every edit needs a deploy. Add `/admin` to CRUD experience and blog as repo files—single source for `Experience.tsx`, `/experience/[id]`, `sitemap.ts`, `/cv`, `/cv/es`, `CV.md`, and `public/cv.pdf`.

## Scope

### In Scope
- `content/` persistence (Zod, CMS-migration-ready)
- `/admin` (`ADMIN_PASSWORD` basic auth, `noindex`)
- Experience CRUD + EN/ES overlays; preserve slug helpers
- Blog CRUD (MDX + frontmatter, draft/published)
- Loaders replace TS arrays; CV regen on experience save

### Out of Scope
- CMS, DB, Clerk/NextAuth; public `/blog`; WYSIWYG; `cvContent.ts` admin

## Capabilities

### New Capabilities
- `admin-auth`: Basic-auth gate for `/admin/*`
- `content-persistence`: Read/write `content/experience/` and `content/blog/`
- `admin-experience-crud`: Experience + ES overlay forms
- `admin-blog-crud`: Blog MDX CRUD
- `cv-regeneration`: Sync `/cv`, `/cv/es`, `CV.md`, `public/cv.pdf`

### Modified Capabilities
- None (no `openspec/specs/` baseline)

## Approach

**Layout:** `content/experience/{id}.json` + `{id}.es.json` (role, points). `content/blog/{slug}.mdx` with frontmatter. Zod on read/write.

**Loaders:** `src/lib/content/` — `getExperienceData(lang)`, slug helpers for `experience/[id]`, `sitemap.ts`, `CVDocument`, `cvContent`. `Experience.tsx` is `"use client"`; needs server-fed props (spec).

**Auth:** Middleware checks `Authorization: Basic` vs `ADMIN_PASSWORD`.

**Admin:** `src/app/admin/` list + forms; Server Actions for CRUD.

**CV regen:** On save → `revalidatePath` + script updates `CV.md` and `public/cv.pdf` (mechanism in design).

**Migration:** Seed from TS files; remove `experienceData*.ts`. Prod writes local/dev (Vercel FS read-only).

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `content/`, `src/lib/content/` | New | Store + loaders |
| `src/app/admin/`, `middleware.ts` | New | Admin UI + auth |
| `experienceData*.ts` | Removed | Replaced by loaders |
| `Experience.tsx`, `experience/[id]`, `cv/`, `sitemap.ts` | Modified | Loader-backed |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Vercel FS read-only in prod | High | Local admin + git push; defer GitHub API |
| Invalid JSON/MDX breaks build | Med | Zod on save; atomic writes |
| PDF regen flaky | Med | Web CV from loaders; optional export script |

## Rollback Plan

Restore `experienceData*.ts`; delete `content/`, `/admin`, middleware. Rebuild from TS arrays.

## Dependencies

- Zod; MDX parser (spec); `ADMIN_PASSWORD`; optional Playwright (PDF)

## Open Questions

- Prod writes: local git vs GitHub Contents API?
- Ordering: `order` field vs manifest vs filename?
- Blog draft preview: admin-only or defer?
- `revalidatePath` vs full rebuild on Vercel?
- MDX library: `next-mdx-remote` vs `@next/mdx`?

## Success Criteria

- [ ] Experience editable via `/admin`; public pages match pre-migration
- [ ] `CV.md` + `public/cv.pdf` regenerate on experience save
- [ ] Blog MDX creatable under `content/blog/`
- [ ] `/admin` returns 401 without auth; excluded from sitemap
