# Game Cartridge Brand Kit — Build Log

## Date: 2026-07-29

## What Was Built

Complete Phlix brand kit site with vintage game cartridge theme (NES/SNES era).

### Files Created (22 total)

- `index.html` — Home page with hero, install command, pitch bullets, features overview, CTA
- `features.html` — 8 features with detailed cards
- `clients.html` — 4 native clients + DLNA (never "5")
- `download.html` — Server install command + client cards + ecosystem
- `plugins.html` — Plugin model explanation + ecosystem plugins
- `docs.html` — Documentation links + ecosystem list
- `hub.html` — Hub explanation with relay/NAT traversal
- `about.html` — Philosophy + license info + 6 FAQ items
- `404.html` — Themed error page ("Cartridge Not Found")
- `css/base.css` — Reset, tokens, element defaults
- `css/theme.css` — Typography, layout, page structure
- `css/components.css` — Header, nav, footer, buttons, cards, badges
- `js/main.js` — Nav toggle, reduced motion, scroll reveals
- `img/logo.svg` — Cartridge-styled wordmark
- `img/favicon.svg` — Mini cartridge with play button
- `robots.txt` — Sitemap reference
- `sitemap.xml` — All 8 canonical pages
- `SITE.md` — Design rationale
- `BUILD_LOG.md` — This file

### Content Compliance

- ✅ 8 features from `content.json`
- ✅ 6 FAQ items from `content.json`
- ✅ 4 native clients + DLNA (never "5" or "five")
- ✅ Install command in hero and download page
- ✅ Footer tagline: "Open-source media, on your terms."
- ✅ 3-column footer layout

### Technical Compliance

- ✅ No Google Fonts CDN — self-hosted fonts (Press Start 2P, VT323 from shared/assets/fonts/)
- ✅ CSS `@copyright` inside `/* */` comment blocks
- ✅ Grid uses `minmax(0, 1fr)` not bare `1fr`
- ✅ All pages have OG + Twitter meta
- ✅ `twitter:creator=@detain` on all pages
- ✅ FAQ uses `<details>/<summary>` elements
- ✅ MPL-2.0 (server/hub), MIT (clients/plugins) in footer

## Deviations

- Self-hosted fonts use shared/assets/fonts/ pool (Press Start 2P, VT323)
- og.png generated via `node tools/gen-og.mjs --site game-cartridge`

## Notes

- See `new_site.md` for full specification
- Brand kit theme: vintage game cartridge with phosphor green accent
