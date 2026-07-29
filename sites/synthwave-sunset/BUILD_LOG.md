# BUILD_LOG.md — Synthwave Sunset

## Build Summary

Created complete brand kit site for **synthwave-sunset** theme.

## Files Generated

### HTML Pages (9)
- `index.html` — Home page with hero, pitch, features overview, CTA
- `features.html` — All 8 features with detail cards
- `clients.html` — 4 native clients + DLNA
- `download.html` — Server install + client downloads + ecosystem
- `plugins.html` — Plugin model + ecosystem
- `docs.html` — Documentation links
- `hub.html` — Phlix Hub information
- `about.html` — Philosophy + FAQ (6 items)
- `404.html` — Custom 404 page

### CSS (3)
- `css/base.css` — Reset, design tokens, base elements, focus/motion
- `css/theme.css` — Typography, layout, page structure, neon effects
- `css/components.css` — Buttons, navigation, cards, badges, responsive

### JavaScript (1)
- `js/main.js` — Mobile nav, reduced motion, scroll reveals, active nav

### Images (4)
- `img/logo.svg` — Sun/horizon logo with Phlix wordmark
- `img/favicon.svg` — Minimal sun/horizon favicon
- `img/og.svg` — OG image source
- `img/og.png` — Generated via gen-og.mjs

### Documentation (2)
- `SITE.md` — Concept, color palette, typography, spatial system
- `BUILD_LOG.md` — This file

### Config (3)
- `robots.txt` — Allow all except 404.html
- `sitemap.xml` — All 8 canonical pages
- `manifest.webmanifest` — PWA manifest

## Compliance Checklist

- [x] Install command in hero CTA section of index.html
- [x] Install command in download.html hero block
- [x] License: MPL-2.0 (server/hub), MIT (clients/plugins)
- [x] 4 native clients + DLNA (Roku, Samsung Tizen, Windows, Mobile, DLNA)
- [x] 8 features from content.json
- [x] 6 FAQ items from content.json
- [x] Footer: 3 columns + "Open-source media, on your terms."
- [x] No Google Fonts CDN — self-hosted fonts (Orbitron, Exo 2, Source Sans 3)
- [x] CSS `@copyright` in all CSS files
- [x] Grid uses `minmax(0, 1fr)`
- [x] All pages: OG + Twitter meta + twitter:creator=@detain
- [x] Absolute URLs for og:image and canonical

## Intentional Deviations

- None. All content follows new_site.md specification.

## Known Follow-ups

- None.

## Build Date

2026-07-29
