# Build Log — Movie Camera Brand Kit Site

## Date: 2026-07-29

## Built by: Coder Agent (autonomous)

## Files Created

### HTML Pages (9)
- `index.html` — Home page with hero, pitch bullets, features overview, CTA
- `features.html` — Full feature details for all 8 features
- `clients.html` — All 4 native clients + DLNA (never "5 clients")
- `download.html` — Server install, client downloads, ecosystem
- `plugins.html` — Plugin model, LifecycleInterface, manifest example
- `docs.html` — Link-out to external documentation
- `hub.html` — Hub explanation, self-hosted vs public, client support
- `about.html` — Philosophy, license split (MPL-2.0/MIT), FAQ
- `404.html` — Custom 404 with film-reel motif, recovery links

### CSS (3)
- `css/base.css` — Reset, tokens, accessibility, reduced-motion
- `css/theme.css` — Typography, layout, sections, components (code blocks, FAQ)
- `css/components.css` — Buttons, header/nav, footer, cards, animations

### JavaScript (1)
- `js/main.js` — Mobile nav toggle, reduced-motion detection, scroll reveals, copy buttons

### Images (3)
- `img/logo.svg` — Film reel + PHIX wordmark
- `img/favicon.svg` — Square film reel favicon
- `img/og.png` — Generated via tools/gen-og.mjs

### Config (2)
- `robots.txt` — References sitemap
- `sitemap.xml` — All 8 canonical pages (no 404.html)

### Docs (2)
- `SITE.md` — Design rationale, color palette, typography, motion
- `BUILD_LOG.md` — This file

## Compliance Checklist

- [x] 9 HTML pages (all from content.json, 8 features, 6 FAQ)
- [x] Install command in hero CTA of index.html AND download.html
- [x] Footer: 3 columns + "Open-source media, on your terms."
- [x] No Google Fonts CDN — self-hosted fonts via shared font pool
- [x] CSS @copyright inside /* */ comment blocks
- [x] Grid: `minmax(0, 1fr)` not bare `1fr`
- [x] All pages: OG + Twitter meta, `twitter:creator=@detain`
- [x] FAQ: `<details>/<summary>` elements
- [x] 4 native clients + DLNA — never "5" or "Five"
- [x] MPL-2.0 / MIT license split correctly stated
- [x] No analytics, no third-party scripts

## Deviation Notes

- Used `animate-spin` on 404 film-reel for visual interest (reduced-motion safe)
- Hero install hint displayed as `<code>` with copy-friendly format
- Ecosystem section uses simplified links (no separate detail pages for plugins)

## Follow-up

- `og.png` generated via: `node tools/gen-og.mjs --site movie-camera`
- `sitemap.xml` regenerated via: `node tools/gen-sitemap.mjs --site movie-camera`
