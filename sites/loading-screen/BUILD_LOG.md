# BUILD_LOG.md — Loading Screen Brand Kit

## Generated

2026-07-29

## Summary

Complete 9-page brand kit site with DOS retro loading screen aesthetic. Theme: retro loading bar, progress percentage, "please wait" DOS era, patience as a virtue, spinner wheels, boot sequences.

## Files Created

### HTML Pages (9)
- `index.html` — Home page with hero loading bar, pitch bullets, features overview, CTA
- `features.html` — All 8 features with detail cards
- `clients.html` — 4 native clients + DLNA device cards
- `download.html` — Server install, client downloads, ecosystem list
- `plugins.html` — Plugin model, ecosystem plugins, write your own
- `docs.html` — Documentation links (user guide, API, developer, hub admin)
- `hub.html` — Hub description, self-host vs public, hub mode in clients
- `about.html` — Philosophy, license, contributing, FAQ (6 items)
- `404.html` — Error page with DOS-style "FILE NOT FOUND" and glitch effect

### CSS Files (3)
- `css/base.css` — Reset, tokens, scanline effect, accessibility
- `css/theme.css` — Typography, layout, hero/pitch/features sections, code-block, faq-list
- `css/components.css` — Header/nav, footer, buttons, feature-card, client-card, loading animations

### JS (1)
- `js/main.js` — Mobile nav toggle, reduced motion handling, scroll reveals, boot text animation

### Assets (3)
- `img/logo.svg` — DOS-style loading bar logo with animated cursor
- `img/favicon.svg` — 32×32 green-on-black square favicon
- `img/og.png` — 1200×630 social card (generated via `gen-og.mjs`)

### Config (2)
- `robots.txt` — Allow all, sitemap reference
- `sitemap.xml` — All 8 canonical pages (no 404.html)

### Docs (2)
- `SITE.md` — Concept, color palette, typography, motion, assets, accessibility
- `BUILD_LOG.md` — This file

## Intentional Deviations from Spec

None — all requirements met.

## Compliance Checklist

- [x] Install command in hero CTA (index.html) and download.html
- [x] License: MPL-2.0 (server/hub), MIT (clients/plugins)
- [x] 4 native clients + DLNA (never "5")
- [x] 8 features from content.json
- [x] 6 FAQ from content.json
- [x] Footer: 3 columns + "Open-source media, on your terms."
- [x] No Google Fonts CDN — system monospace
- [x] CSS `@copyright` in `/* */` blocks on all CSS files
- [x] Grid: `minmax(0, 1fr)` not bare `1fr`
- [x] All pages: OG + Twitter meta, `twitter:creator=@detain`
- [x] FAQ uses `<details>/<summary>`
- [x] 404.html has `noindex` meta and self-canonical

## Known Follow-ups

- None
