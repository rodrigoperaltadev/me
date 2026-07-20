# admin-experience-crud Specification

## Purpose

Provide authenticated admin UI to list, create, edit, and delete experience entries (base EN + Spanish overlay) while preserving public slug helpers.

## Requirements

### Requirement: `src/app/admin/experience` — Experience CRUD UI

List by `order`; create/edit/delete with base + ES fields. `idToSlug`/`slugToEntry` unchanged.

#### Scenario: List matches disk

- GIVEN three JSON files WHEN `/admin/experience` opens THEN all three by `order`
