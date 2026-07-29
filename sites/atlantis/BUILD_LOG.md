# Atlantis — Build Log

## Site Overview
- **Theme**: Atlantis — Sunken underwater kingdom, bioluminescent depths
- **Palette**: `#001A2E` (deep navy), `#004455` (dark teal), `#00CED1` (dark turquoise), `#7FFFD4` (aquamarine), `#F5F5F5` (off-white)
- **Created**: 2026-07-29

## What was built

### Pages (9)
- `index.html` — Home with hero, pitch bullets, features overview, CTA banner
- `features.html` — All 8 features with detailed descriptions
- `clients.html` — 4 native clients (Roku, Samsung Tizen, Windows, Mobile) + DLNA
- `download.html` — Install commands, clients, ecosystem list
- `plugins.html` — Plugin model, ecosystem, write your own
- `docs.html` — Documentation links, ecosystem
- `hub.html` — Hub explanation, self-hosted vs public, clients
- `about.html` — Philosophy, licensing, contributing, FAQ
- `404.html` — Error page with Atlantis branding

### Assets
- `css/base.css` — Reset, tokens, :root variables, base styles
- `css/theme.css` — Typography, layout, page structure, animations
- `css/components.css` — Header/nav, footer, buttons, cards, badges
- `js/main.js` — Nav toggle, scroll reveals, reduced motion support
- `img/logo.svg` — Text wordmark with gradient and glow
- `img/favicon.svg` — Square favicon with "P"
- `robots.txt` — References sitemap
- `sitemap.xml` — All 8 canonical pages

### Documentation
- `SITE.md` — Design rationale, palette table, typography, motion notes
- `BUILD_LOG.md` — This file

## Compliance Notes

- ✅ Install command in hero CTA (index.html) AND download.html
- ✅ 4 native clients + DLNA (NOT "5")
- ✅ 8 features from content.json
- ✅ 6 FAQ using `<details>/<summary>` elements
- ✅ Footer: 3 columns + "Open-source media, on your terms."
- ✅ No Google Fonts CDN — system fonts used
- ✅ CSS @copyright inside `/* */` comment blocks
- ✅ Grid: `minmax(0, 1fr)` pattern used
- ✅ All pages: OG + Twitter meta, twitter:creator=@detain
- ✅ Absolute canonical and og:image URLs

## Deviations from Reference

- Using system fonts (Georgia, Lato) instead of self-hosted WOFF2 — no font assets available for these families in the shared pool
- No mascot/easter eggs — keeping it focused on the core site
- No seasonal activation or intensity toggle

## Follow-ups
- Generate og.png using `node tools/gen-og.mjs --site atlantis`
- Add to dist/ build if running build step
