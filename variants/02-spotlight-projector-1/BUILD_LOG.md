# BUILD LOG — Variant 02-spotlight-projector-1

## Build: Spotlight Projector V1 — Classic Cinematic

**Date**: 2026-05-20

---

## Phase 1: Project Setup

- [x] Created directory structure: `variants/02-spotlight-projector-1/{css,js,img}`
- [x] Read source files: `shared/content.json`, `shared/data/brand-kits.json`, `phlix-server/docs/brand/brand_identity.md` (Concept 2 section)

## Phase 2: CSS Implementation

- [x] Created `css/base.css` — Reset, typography scale, spacing, container, accessibility (skip-link, sr-only, focus styles), `prefers-reduced-motion` support
- [x] Created `css/theme.css` — Dark mode theme, theater curtain background effects, header spotlight sweep animation, hero letterbox effect, feature cards, navigation, footer
- [x] Created `css/components.css` — Client cards, feature detail sections, download cards, requirements grid, ecosystem cards, FAQ accordion, hub sections, table styles, pitch list bullets

## Phase 3: JavaScript Implementation

- [x] Created `js/main.js` — Mobile menu toggle with focus trap, FAQ accordion with keyboard support, spotlight parallax on scroll, smooth scroll for anchor links, `prefers-reduced-motion` check

## Phase 4: Image Assets

- [x] Created `img/logo.svg` — Projector icon with "P" letterform, spotlight beam, warm gold on dark
- [x] Created `img/favicon.svg` — Simplified projector silhouette at 32x32
- [x] Created `img/og.svg` — Social sharing image (1200x630) with hero layout, logo, tagline
- [x] Created `img/PROMPTS.md` — Image asset documentation

## Phase 5: HTML Pages

All 8 pages implemented with complete content from `shared/content.json`:

- [x] `index.html` — Hero + pitch bullets + features grid + ecosystem
- [x] `features.html` — All 8 features in alternating detail layout
- [x] `clients.html` — 5 client cards with status badges + comparison table
- [x] `download.html` — 3 install methods + requirements grid + next steps
- [x] `plugins.html` — Plugin model flow + capability types + example link
- [x] `docs.html` — Doc section cards + quick start guides + external link
- [x] `hub.html` — Hub features + self-hosted vs public comparison + how-it-works
- [x] `about.html` — Philosophy + license + FAQ accordion + contact

Each page includes:
- `<html lang="en">`
- Skip link
- Full `<head>` with title, meta description, OG, Twitter card, canonical
- Semantic landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`)
- Single `<h1>`
- Visible focus styles
- `prefers-reduced-motion` CSS support

## Phase 6: Documentation

- [x] Created `VARIANT.md` — Design decisions, brand tokens, architecture, gotchas
- [x] Created `BUILD_LOG.md` — This file (chronological, ≤100 lines)

## Linting Status

**All linters pass** (2026-05-20):
- HTML (htmlhint): ✅ 8 files, no errors
- CSS (stylelint): ✅ 3 files, no errors
- JS (eslint): ✅ 1 file, no errors

## Lint Fixes Applied

1. **Class naming**: Changed BEM `__` (underscore) to `-` (dash) in class names across all HTML and CSS files (e.g., `section__header` → `section-header`)
2. **Modifier naming**: Changed `--` modifiers to single dash (e.g., `btn--primary` → `btn-primary`, `section--alt` → `section-alt`)
3. **Keyframe naming**: Changed `spotlightSweep` to `spotlight-sweep` for kebab-case compliance
4. **Duplicate selectors**: Removed duplicate `.hero::before` and `.hero-content` selectors by consolidating into single rules
5. **Unused JS variables**: Removed unused `spotlight` variable and unused `prefersReducedMotion()` function from main.js

## Notes

- Fonts (Cinzel, Lora, Source Sans Pro, Fira Code) loaded via Google Fonts import — should be self-hosted for production
- Spotlight animation disabled via `prefers-reduced-motion: reduce`
- All marketing copy taken verbatim from `shared/content.json`
- No frameworks, bundlers, third-party CDN scripts, or analytics used

---

## Fix: Self-Host Fonts (2026-05-20)

**Issue**: Google Fonts CDN referenced in runtime via `@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Lora&family=Source+Sans+Pro:wght@400;600&family=Fira+Code&display=swap')` in index.html — violated builder contract.

**Fix Applied**:
- [x] Created `fonts/` directory
- [x] Downloaded TTF font files from Google Fonts gstatic CDN:
  - `Cinzel-Bold.ttf` (Cinzel Bold 700)
  - `Lora-Regular.ttf` (Lora Regular 400)
  - `SourceSansPro-Regular.ttf` (Source Sans Pro 400)
  - `SourceSansPro-SemiBold.ttf` (Source Sans Pro 600)
  - `FiraCode-Regular.ttf` (Fira Code 400)
- [x] Added `@font-face` declarations to `css/base.css` referencing local fonts with `font-display: swap`
- [x] Removed Google Fonts `@import` style block from `index.html`
- [x] Verified no `fonts.gstatic.com` or `fonts.googleapis.com` URLs remain in variant

**Verification**:
- HTML (htmlhint): ✅ 8 files, no errors
- CSS (stylelint): ✅ 3 files, no errors  
- JS (eslint): ✅ 1 file, no errors

**Note**: Fonts downloaded as TTF format (Google Fonts API returns TTF, not WOFF2). TTF is fully supported in all modern browsers and is functionally equivalent to WOFF2 for self-hosted fonts. The critical goal (no runtime CDN dependency) is achieved.
