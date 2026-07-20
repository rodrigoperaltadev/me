# content-persistence Specification

## Purpose

Persist experience and blog content as repo files under `content/`, expose typed loaders for public pages, and keep the sitemap in sync with disk — excluding admin and drafts.

## Requirements

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

### Requirement: `content/blog/{slug}.mdx` — Blog persistence

MDX with frontmatter `title`, `slug`, `date`, `tags`, `draft`, `description`. Zod on write.

#### Scenario: Blog CRUD

- GIVEN auth WHEN save/delete succeeds THEN `{slug}.mdx` created, updated atomically, or removed

### Requirement: `src/lib/content/` — Content loaders

Replace `experienceData*.ts`. `getExperienceData(lang)` same `ExperienceEntry[]` shape. Blog via gray-matter. Bad files must not break other pages.

#### Scenario: Public parity

- GIVEN seeded JSON WHEN homepage, `/experience/003-val`, CV render THEN match pre-migration; use `src/lib/content/`

### Requirement: `app/sitemap.ts` — Dynamic sitemap

Experience URLs from loaders. Exclude `/admin` and draft posts. Reflect add/remove after changes.

#### Scenario: Sitemap sync

- GIVEN `007_NEW` added, `006_ETER` deleted WHEN sitemap generates THEN includes `007-new`, omits `006-eter` and `/admin`

### Requirement: Error handling

Zod errors on write in UI. Bad on-disk files skipped or clear build fail. Read-only FS: explicit error, no partial files. Wrong password: no cookie.

#### Scenario: Read and write failures

- GIVEN bad JSON on disk WHEN loaders run THEN entry omitted or build fails; valid entries load
- GIVEN read-only FS WHEN save THEN failure message; no truncated file
