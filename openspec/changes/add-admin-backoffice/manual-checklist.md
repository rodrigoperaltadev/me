# Manual verification checklist — add-admin-backoffice

## Prerequisites

- [ ] `.env.local` contains `ADMIN_PASSWORD` (≥32 characters recommended)
- [ ] `.env.local` contains `ADMIN_SESSION_SECRET` (≥32 chars) OR reuse long `ADMIN_PASSWORD`
- [ ] Local dev server: `npm run dev`
- [ ] For PDF regen: Google Chrome installed; optional `CHROME_PATH` if non-default

## Auth

- [ ] `GET /admin` without cookie → redirect to `/admin/login`
- [ ] Wrong password on login → generic error, no cookie set
- [ ] Correct password → redirect to `/admin` dashboard
- [ ] `POST /api/admin/logout` clears session; `/admin/*` blocked again
- [ ] `/admin` HTML includes `noindex` robots meta
- [ ] `/sitemap.xml` does not list `/admin` URLs

## Public experience (pre-migration parity)

- [ ] Homepage shows 8 experience cards in `order` sequence
- [ ] `/experience/003-val` renders Valtech 2022 entry
- [ ] `/cv` and `/cv/es` render with correct experience sections
- [ ] Skills on CV derive from experience `stack` fields

## Admin experience CRUD

- [ ] `/admin/experience` lists all 8 entries by `order`
- [ ] Create new entry with valid `id` (e.g. `007_TEST`) → file in `content/experience/`
- [ ] Edit EN fields → `content/experience/{id}.json` updated
- [ ] Edit ES overlay → `content/experience/{id}.es.json` created/updated
- [ ] Delete entry → both `.json` and `.es.json` removed
- [ ] Invalid `id` format → validation error, no file written
- [ ] Duplicate `id` → 409 conflict

## Admin blog CRUD

- [ ] `/admin/blog` lists posts; drafts marked
- [ ] Create post → `content/blog/{slug}.mdx` with frontmatter + body
- [ ] Edit post → atomic update
- [ ] Delete post → file removed
- [ ] Duplicate slug → 409 conflict

## Public blog

- [ ] `/blog` shows only published (`draft: false`) posts
- [ ] `/blog/[slug]` renders MDX for published post
- [ ] Draft post not listed on `/blog` or sitemap

## CV regeneration

- [ ] After experience save/delete, `CV.md` updates (Spanish default in regen)
- [ ] `npm run regen:cv` with dev server running updates `public/cv.pdf`
- [ ] Save still succeeds if Chrome/PDF step fails (warning logged)

## Production guard

- [ ] With `VERCEL=1`, admin write API returns 503 `ADMIN_WRITES_DISABLED`
- [ ] No partial/truncated files on failed writes

## Build quality

- [ ] `npx tsc --noEmit` passes
- [ ] `npx eslint src/` passes
- [ ] `npm run build` passes (Turbopack)
