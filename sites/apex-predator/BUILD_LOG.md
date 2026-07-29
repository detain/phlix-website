# BUILD_LOG.md — apex-predator site build

## Build Summary

**Date:** 2026-07-29
**Site slug:** apex-predator
**Brand kit:** `brand-kits/apex-predator.js` v1.0
**Built by:** Claude (coder agent)

## Files Generated

### HTML Pages (9)
- `index.html` — Home (hero + pitch bullets + features overview + CTA)
- `features.html` — All 8 features with detail cards
- `clients.html` — 5 clients (Roku, Tizen, Windows, Mobile, DLNA)
- `download.html` — Server install + 4 clients + ecosystem
- `plugins.html` — Plugin model + ecosystem + write your own
- `docs.html` — Documentation links + ecosystem list
- `hub.html` — Hub explanation + self-host vs public + client support
- `about.html` — Philosophy + license + contributing + FAQ (6 items)
- `404.html` — "Prey Not Found" branded error page

### CSS (3)
- `css/base.css` — Reset, :root tokens, accessibility, layout
- `css/theme.css` — Typography, page structure, cards, sections, reveals
- `css/components.css` — Buttons, header/nav, footer, forms, tables

### JavaScript (1)
- `js/main.js` — Mobile nav toggle, reduced motion, scroll reveals, copy-code

### Images (3)
- `img/logo.svg` — Wordmark with claw accent (Bebas Neue, bone white)
- `img/favicon.svg` — Square claw mark icon (arterial crimson on void black)
- `img/og.png` — 1200×630 social card (rasterized from og.svg via rsvg-convert)
- `img/og.svg` — Editable OG source

### Config (2)
- `robots.txt` — Allows all, references sitemap
- `sitemap.xml` — 8 canonical URLs, no 404.html

### Docs (2)
- `SITE.md` — Design rationale, color table, typography, motion
- `BUILD_LOG.md` — This file

**Total: 20 files**

## Content Accuracy

- Install command from `content.json.install.primary.command` (verified verbatim)
- All 8 features from `content.json.features[]` included on features page
- All 5 clients from `content.json.clients[]` on clients page (no deprecated skipped since none marked)
- All 6 FAQ items from `content.json.faq[]` on about page
- 4 native clients + DLNA correctly stated (per content.json)
- License correctly split: server + hub = MPL-2.0, shared libs + plugins + clients = MIT
- No fabricated stats, pricing, or testimonials

## Deviations from new_site.md spec

None intentional. All decisions trace to the brand kit or content.json.

## Notes

- OG PNG was generated locally with `rsvg-convert` since the `tools/gen-og.mjs` was not available in this environment. The source SVG (`og.svg`) is valid and regeneratable via `node tools/gen-og.mjs --site apex-predator`.
- Font pool verification: Share Tech Mono, Roboto Condensed, Bebas Neue, and Oswald are all present in `shared/assets/fonts/` (referenced via `../../assets/fonts/` path).
- The kit's `error_page_experience` was not defined, so a default "Prey Not Found" 404 was created per new_site.md §2A.
- Kit specifies `Oswald` for headline/UI and `Bebas Neue` for display — these are available in the font pool.
- `prefers-reduced-motion` respected throughout: CSS transitions drop, JS scroll reveals skip, animations use `animation-duration: 0.01ms`.

## Follow-ups

- [ ] Run `node tools/gen-sitemap.mjs --site apex-predator` to refresh sitemap changefreq/priority values
- [ ] Verify all external links resolve (linkcheck)
- [ ] Verify accessibility with pa11y-ci (`npm run a11y`)
- [ ] Check WCAG contrast on all text/background pairs per §12
