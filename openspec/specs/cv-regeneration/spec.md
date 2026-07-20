# cv-regeneration Specification

## Purpose

Keep derived CV outputs (`/cv`, `/cv/es`, `CV.md`, `public/cv.pdf`) in sync when experience content changes.

## Requirements

### Requirement: CV outputs — Regeneration

On experience save/delete regen `/cv`, `/cv/es`, `CV.md`, `public/cv.pdf` matching today's CV pipeline.

#### Scenario: Regen on save

- GIVEN experience saved WHEN regen completes THEN CV routes, `CV.md`, `cv.pdf` updated
