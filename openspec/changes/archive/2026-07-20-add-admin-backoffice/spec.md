# Delta for add-admin-backoffice

## ADDED Requirements

### Requirement: `middleware.ts` + `src/app/admin/login` — Auth gate

`/admin` and `/admin/*` MUST require session auth (cookie after `ADMIN_PASSWORD` check). Unauthenticated: HTTP 401 or redirect to `/admin/login`. Login MUST set HTTP-only `Secure` (prod) `SameSite=Lax` cookie; failure MUST show generic error. Logout MUST clear cookie.

#### Scenario: Unauthenticated blocked

- GIVEN no session cookie
- WHEN `GET /admin/experience`
- THEN 401 or login redirect; no admin data returned

#### Scenario: Login and logout

- GIVEN correct password WHEN login succeeds THEN cookie set; redirect `/admin`
- GIVEN session WHEN logout THEN cookie cleared; `/admin/*` rejected

### Requirement: `src/app/admin/**` — Noindex

`/admin` HTML MUST include `noindex, nofollow`. `/admin` MUST NOT appear in `app/sitemap.ts`.

#### Scenario: Robots meta

- GIVEN `/admin` page WHEN rendered THEN noindex directive present

### Requirement: `content/experience/{id}.json` — Experience persistence

One JSON per `id` with `id`, `order`, `year`, `company`, `industry`, `role`, `points`, `stack`, optional `active`. Zod on write. Public order by ascending `order`.

#### Scenario: CRUD and validation

- GIVEN auth + valid data WHEN save/delete THEN file created/updated/removed; `.es.json` removed on delete
- GIVEN invalid data WHEN save THEN no write; field errors shown

### Requirement: `content/experience/{id}.es.json` — Spanish overlay

Stores `role` and `points` for same `id`. Save without base MUST fail.

#### Scenario: Merge and fallback

- GIVEN base + overlay WHEN `getExperienceData("es")` THEN ES role/points; structural fields from base
- GIVEN no overlay WHEN `getExperienceData("es")` THEN EN role/points

### Requirement: `src/app/admin/experience` — Experience CRUD UI

List by `order`; create/edit/delete with base + ES fields. `idToSlug`/`slugToEntry` unchanged.

#### Scenario: List matches disk

- GIVEN three JSON files WHEN `/admin/experience` opens THEN all three by `order`

### Requirement: `content/blog/{slug}.mdx` — Blog persistence

MDX with frontmatter `title`, `slug`, `date`, `tags`, `draft`, `description`. Zod on write.

#### Scenario: Blog CRUD

- GIVEN auth WHEN save/delete succeeds THEN `{slug}.mdx` created, updated atomically, or removed

### Requirement: `src/app/admin/blog` — Blog CRUD UI

List with draft status; create/edit/delete with frontmatter + MDX body.

#### Scenario: Draft in admin

- GIVEN `draft: true` WHEN `/admin/blog` loads THEN draft indicated

### Requirement: `src/lib/content/` — Content loaders

Replace `experienceData*.ts`. `getExperienceData(lang)` same `ExperienceEntry[]` shape. Blog via gray-matter. Bad files must not break other pages.

#### Scenario: Public parity

- GIVEN seeded JSON WHEN homepage, `/experience/003-val`, CV render THEN match pre-migration; use `src/lib/content/`

### Requirement: CV outputs — Regeneration

On experience save/delete regen `/cv`, `/cv/es`, `CV.md`, `public/cv.pdf` matching today's CV pipeline.

#### Scenario: Regen on save

- GIVEN experience saved WHEN regen completes THEN CV routes, `CV.md`, `cv.pdf` updated

### Requirement: `app/sitemap.ts` — Dynamic sitemap

Experience URLs from loaders. Exclude `/admin` and draft posts. Reflect add/remove after changes.

#### Scenario: Sitemap sync

- GIVEN `007_NEW` added, `006_ETER` deleted WHEN sitemap generates THEN includes `007-new`, omits `006-eter` and `/admin`

### Requirement: Error handling

Zod errors on write in UI. Bad on-disk files skipped or clear build fail. Read-only FS: explicit error, no partial files. Wrong password: no cookie.

#### Scenario: Read and write failures

- GIVEN bad JSON on disk WHEN loaders run THEN entry omitted or build fails; valid entries load
- GIVEN read-only FS WHEN save THEN failure message; no truncated file

### Requirement: Security — CSRF and secrets

Mutations require session + CSRF/origin check. `ADMIN_PASSWORD` env-only; not in client, logs, or responses.

#### Scenario: Blocked mutations

- GIVEN no session WHEN delete action posted THEN 401; no file deleted
- GIVEN cross-origin WHEN mutation attempted THEN rejected; no changes
