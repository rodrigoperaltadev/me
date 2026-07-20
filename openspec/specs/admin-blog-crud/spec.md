# admin-blog-crud Specification

## Purpose

Provide authenticated admin UI to list, create, edit, and delete blog posts stored as MDX with draft/published status.

## Requirements

### Requirement: `src/app/admin/blog` — Blog CRUD UI

List with draft status; create/edit/delete with frontmatter + MDX body.

#### Scenario: Draft in admin

- GIVEN `draft: true` WHEN `/admin/blog` loads THEN draft indicated
