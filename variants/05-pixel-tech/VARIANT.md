# Variant 05-pixel-tech

> **Status: not yet built.** The Builder agent (see `docs/HANDOFF_PROMPT.md` Phase B) will fill in this directory.

## Source of truth

- Brand kit: `shared/data/brand-kits.json` → `05-pixel-tech`
- Brand kit (long form): `phlix-server/docs/brand/brand_identity.md` (this variant's concept section)
- Content: `shared/content.json` — render every page from this, do not paraphrase.

## Hard isolation rules (from `docs/PLAN.md` § 0.1)

- Read/write inside `variants/05-pixel-tech/` and `reviews/05-pixel-tech/` only.
- Read-only: `shared/`, `docs/`, `phlix-server/docs/brand/`.
- Never open any other `variants/*` or `reviews/*` directory.

## After build

Replace this file with: what's distinctive about this variant, the design decisions made, anything a future contributor needs to know to extend it. Keep ≤200 lines.
