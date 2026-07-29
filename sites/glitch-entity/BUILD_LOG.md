# BUILD_LOG.md — Glitch Entity

## Build Summary

**Date:** 2026-07-29
**Theme:** glitch-entity (digital corruption, datamosh, broken pixels)
**Kit slug:** `glitch-entity`
**Branch:** master

## Generated Files

### HTML Pages (9)
- `index.html` — Home page with hero, pitch, features overview, CTA
- `features.html` — All 8 features detailed with icons
- `clients.html` — 4 native clients + DLNA (stable/beta badges)
- `download.html` — Server install + client downloads + ecosystem
- `plugins.html` — Plugin model, ecosystem, write your own
- `docs.html` — User guide, API reference, developer docs, Hub admin
- `hub.html` — Hub capabilities, self-host vs public, client integration
- `about.html` — Philosophy, license (MPL-2.0/MIT), contributing, FAQ
- `404.html` — "Signal Lost" error page with recovery links

### CSS (3)
- `css/base.css` — Reset, CSS custom properties token block, base typography
- `css/theme.css` — Typography roles, layout containers, page structures, grids
- `css/components.css` — Header, footer, buttons, cards, badges, animations

### JavaScript (1)
- `js/main.js` — Mobile nav toggle, reduced motion detection, scroll reveals, smooth scroll

### Assets (3)
- `img/logo.svg` — Glitch-effect wordmark with RGB offset filter
- `img/favicon.svg` — Magenta square with stylized "P" and artifacts
- `img/og.png` — Generated via `node tools/gen-og.mjs --site glitch-entity`

### Config (2)
- `robots.txt` — Allow all, reference sitemap
- `sitemap.xml` — All 8 canonical pages (excludes 404.html which is noindex)

## Intentional Deviations from Spec

None — all decisions follow new_site.md specification.

## Key Design Decisions

### Typography
- **Display:** Bebas Neue (bold impact headlines)
- **Headline:** Barlow Condensed (subheadings, titles)
- **Body:** Barlow (paragraphs, UI)
- **Mono:** JetBrains Mono (code, technical text)

### Glitch Effects
- Hero headline has RGB channel offset animation (magenta/green/blue separation)
- Artifact squares positioned as decorative elements
- Scanline overlay on body background
- Glitch border animations on hover for cards

### Grid Implementation
All grids use `minmax(0, 1fr)` to prevent overflow from long unbreakable strings per §19.12.

### Self-hosted Fonts
Fonts loaded from `../../../shared/assets/fonts/` (WOFF2 format, font-display: swap).

## Known Follow-ups

- None — all quality gates passed.

## Verification Commands Used

```bash
node tools/gen-og.mjs --site glitch-entity
node tools/gen-sitemap.mjs --site glitch-entity
```

## Commit

```bash
git add sites/glitch-entity/
git commit -m "feat(glitch-entity): complete brand kit site (digital corruption/glitch theme)"
git push origin master
```
