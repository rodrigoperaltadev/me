# admin-auth Specification

## Purpose

Gate `/admin` and `/api/admin` behind a password session, keep admin pages out of search indexes, and protect mutations with CSRF and secret hygiene.

## Requirements

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

### Requirement: Security — CSRF and secrets

Mutations require session + CSRF/origin check. `ADMIN_PASSWORD` env-only; not in client, logs, or responses.

#### Scenario: Blocked mutations

- GIVEN no session WHEN delete action posted THEN 401; no file deleted
- GIVEN cross-origin WHEN mutation attempted THEN rejected; no changes
