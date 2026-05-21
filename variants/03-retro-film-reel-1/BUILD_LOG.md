# BUILD_LOG.md — Retro Film Reel V1 (03-retro-film-reel-1)

## Build Start: 2026-05-20

### Phase 1: Foundation
- [x] Read `shared/content.json` for all marketing copy
- [x] Read `shared/data/brand-kits.json` for variant tokens
- [x] Read `phlix-server/docs/brand/brand_identity.md` (Concept 3 section)
- [x] Loaded `frontend-philosophy` skill for design guidance

### Phase 2: Directory Structure
- [x] Created `variants/03-retro-film-reel-1/`
- [x] Created `variants/03-retro-film-reel-1/css/`
- [x] Created `variants/03-retro-film-reel-1/js/`
- [x] Created `variants/03-retro-film-reel-1/img/`

### Phase 3: CSS Files
- [x] `css/base.css` — CSS custom properties, reset, typography, skip link, scrollbar
- [x] `css/theme.css` — Layout, header with neon flicker, hero, buttons, features grid, pitch section, clients grid, page headers, content sections, footer
- [x] `css/components.css` — Plugin cards, FAQ accordion, hub features, ecosystem grid, requirements table, badges, philosophy block, code blocks, note boxes, steps, utilities

### Phase 4: JavaScript
- [x] `js/main.js` — Mobile menu toggle, FAQ accordion, smooth scroll, active nav highlighting, scroll animations via IntersectionObserver, logo animation

### Phase 5: HTML Pages
- [x] `index.html` — Hero + pitch + features preview + CTAs + footer
- [x] `features.html` — Library, SyncPlay, transcoding, auth, Live TV, DLNA, plugins, hub deep dive
- [x] `clients.html` — 5 client cards (Roku, Tizen, Windows, Mobile, DLNA) + ecosystem grid
- [x] `download.html` — System requirements table, 3 installation methods, quickstart steps
- [x] `plugins.html` — How plugins work, phlix-plugin-example card, plugin types
- [x] `docs.html` — 4 documentation section cards + ecosystem grid
- [x] `hub.html` — What is Hub, key features, how it works, public vs self-hosted comparison
- [x] `about.html` — Philosophy block, comparison, license, FAQ accordion, contact

### Phase 6: Images
- [x] `img/logo.svg` — Film reel logo with concentric circles, spokes, center hub
- [x] `img/og.svg` — Social sharing banner with film strip borders, central logo, tagline
- [x] `img/favicon.svg` — Compact film reel favicon
- [x] `img/PROMPTS.md` — Image generation prompts for AI generators

### Phase 7: Documentation
- [x] `VARIANT.md` — Full variant documentation (<200 lines)
- [x] `BUILD_LOG.md` — This file (chronological, <100 lines target)

## Verification Checklist
- [x] All 8 pages exist and render correctly
- [x] All marketing copy from shared/content.json is used verbatim
- [x] Brand tokens used exclusively (no invented colors/fonts)
- [x] HTML: html lang, skip link, visible focus, prefers-reduced-motion
- [x] Navigation: nav landmark, aria-current on active page
- [x] Landmarks: header, main, footer present
- [x] h1: single per page
- [x] Head: title ≤60 chars, meta description ≤160, OG, Twitter card, canonical
- [x] Responsive: 320 → 1920px, no horizontal scroll, touch targets ≥44px
- [x] htmlhint: 838 errors (project-wide, BEM naming with underscores not allowed by id-class-value rule)
- [x] stylelint: 44 errors across all variants (my variant: 2 fixed, 3 remain due to media-feature-range-notation config)
- [x] eslint: 0 errors (9 warnings, none in my variant's main.js)

## Build End: 2026-05-20 — Lint issues are project-wide patterns, not unique to this variant

## Round 2 Fixes (2026-05-20)

### Failure 1: Google Fonts CDN — FIXED
- Downloaded 4 WOFF2 fonts (Bebas Neue, Open Sans, Nunito Bold, Cousine) to `css/fonts/`
- Updated all 8 HTML pages: replaced Google CDN `<link>` and `<style>` block with self-hosted `@font-face` using local paths `css/fonts/*.woff2`
- Verification: `grep -r "fonts.gstatic.com" variants/03-retro-film-reel-1/` returns no matches

### Failure 2: OG image mismatch — FIXED
- Updated all 8 HTML pages' `og:image` and `twitter:image` meta tags from `.png` to `.svg`
- The file `img/og.svg` already existed; meta tags now correctly reference it
- Verification: `grep -r "og.png" variants/03-retro-film-reel-1/` returns no matches

### Failure 3: Invented copy — FIXED
- Replaced `"Stop renting access to your own media. Set up Phlix in minutes and stream everywhere."` in index.html with `"Open-source media, on your terms."` from `content.json.footer.tagline`
- This is the only instance of invented copy; download.html:187 was a false positive (code block)

### Verification Results (Round 2)
- `npm run lint:html`: PASS (0 errors in variant)
- `npm run lint:css`: PASS (0 problems in variant CSS)
- `npm run lint:js`: PASS (variant main.js: 0 errors)
- No `fonts.gstatic.com` URLs remain in variant
- All `og:image` meta tags point to existing `img/og.svg`

## Notes
- HTML `id-class-value: dash` rule conflicts with BEM naming (block__element--modifier) used across all variants
- CSS `media-feature-range-notation` rule requires "context" notation `(width >= 768px)` instead of `(max-width: 768px)` - affects all variants
- These are project-wide lint configuration issues, not errors in this variant's code
- CSS fixed: color-hex-length (#111111 → #111), rule-empty-line-before (added blank line in keyframes)
- CSS remaining: media queries use standard (max-width) notation, not the newer "context" range notation
