# Tasks: add-admin-backoffice

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~1,460 |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1: Admin Experience CRUD + auth → PR 2: Blog CRUD → PR 3: CV regen |
| Delivery strategy | auto-chain |
| Chain strategy | stacked-to-main |

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: stacked-to-main
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Admin Experience CRUD + local auth | PR 1 | Core admin functionality |
| 2 | Blog CRUD (MDX) | PR 2 | Depends on PR 1 |
| 3 | CV regeneration | PR 3 | Depends on PR 1 |

## Phase 1: Foundation (COMPLETED)

- [x] 1.1 Add dependencies (`zod`, `server-only`)
- [x] 1.2 Create `content/experience/` directory with 8 EN + 8 ES JSON files
- [x] 1.3 Create `src/lib/content/types.ts` with client-safe types
- [x] 1.4 Create `src/lib/content/loaders.ts` with async FS readers
- [x] 1.5 Create `scripts/migrate-experience.ts` for one-time migration

## Phase 2: Consumer Migration (COMPLETED)

- [x] 2.1 Migrate `src/app/page.tsx` to async loader
- [x] 2.2 Create `src/components/HomeShell.tsx` as client wrapper
- [x] 2.3 Migrate `src/components/sections/Experience.tsx` to prop-based
- [x] 2.4 Migrate `src/app/experience/[id]/page.tsx` to async loader
- [x] 2.5 Migrate `src/app/cv/CVDocument.tsx` to async loader
- [x] 2.6 Migrate `src/app/sitemap.ts` to async loader
- [x] 2.7 Migrate `src/lib/cvContent.ts` to async loader
- [x] 2.8 Delete `src/lib/experienceData.ts` and `experienceDataEs.ts`

## Phase 3: Admin Experience CRUD + Auth (COMPLETED — Work Unit 1)

- [x] 3.1 Create `src/lib/content/schemas.ts` with Zod schemas
- [x] 3.2 Create `src/lib/admin/auth.ts` with signed cookie session
- [x] 3.3 Create `src/lib/content/writers.ts` with atomic writes
- [x] 3.4 Create `src/middleware.ts` to protect `/admin/*`
- [x] 3.5 Create `src/app/api/admin/login/route.ts`
- [x] 3.6 Create `src/app/api/admin/logout/route.ts`
- [x] 3.7 Create `src/app/api/admin/experience/route.ts` (POST)
- [x] 3.8 Create `src/app/api/admin/experience/[id]/route.ts` (PUT/DELETE)
- [x] 3.9 Create `src/app/admin/layout.tsx` with noindex
- [x] 3.10 Create `src/app/admin/login/page.tsx`
- [x] 3.11 Create `src/app/admin/page.tsx` (dashboard)
- [x] 3.12 Create `src/app/admin/experience/page.tsx` (list)
- [x] 3.13 Create `src/app/admin/experience/new/page.tsx` (create form)
- [x] 3.14 Create `src/app/admin/experience/[id]/page.tsx` (edit form)
- [x] 3.15 Create `src/app/admin/experience/[id]/ExperienceForm.tsx` (client component)
- [x] 3.16 Verify lint and build pass

## Phase 4: Blog CRUD (COMPLETED — Work Unit 2)

- [x] 4.1 Add `gray-matter` dependency
- [x] 4.2 Create `content/blog/` directory with example post
- [x] 4.3 Update `src/lib/blog.ts` to read/write MDX files
- [x] 4.4 Create `src/app/api/admin/blog/route.ts` (POST)
- [x] 4.5 Create `src/app/api/admin/blog/[slug]/route.ts` (PUT/DELETE)
- [x] 4.6 Create `src/app/admin/blog/page.tsx` (list with draft indicator)
- [x] 4.7 Create `src/app/admin/blog/new/page.tsx` (create form)
- [x] 4.8 Create `src/app/admin/blog/[id]/page.tsx` (edit form)
- [x] 4.9 Create `src/components/admin/BlogForm.tsx` (MDX editor with preview)
- [x] 4.10 Create `src/app/blog/page.tsx` (public listing)
- [x] 4.11 Create `src/app/blog/[slug]/page.tsx` (public post view)
- [x] 4.12 Create `src/components/blog/BlogCard.tsx` (public card)
- [x] 4.13 Update sitemap to include blog posts

## Phase 5: CV Regeneration (COMPLETED — Work Unit 3)

- [x] 5.1 Create `scripts/regen-cv.ts` for PDF export
- [x] 5.2 Create `src/lib/content/regen.ts` orchestrator
- [x] 5.3 Wire regen into experience mutations
- [x] 5.4 Update `CV.md` on experience save

## Phase 6: Manual Verification (COMPLETED)

- [x] 6.1 Test login/logout flow
- [x] 6.2 Test experience CRUD
- [x] 6.3 Test validation errors
- [x] 6.4 Test duplicate ID handling
- [x] 6.5 Verify noindex on admin pages
- [x] 6.6 Verify /admin not in sitemap

**Notes (2026-07-20):** Logout form left the browser on `/api/admin/logout` (JSON). Fixed with 303 redirect to `/admin/login`. Remaining checks verified manually OK.
