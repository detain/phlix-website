# BUILD LOG — Leaderboard Elite Brand Kit Site

## Built: 2026-07-29

## Overview

Complete brand kit site for the "leaderboard-elite" theme — a competitive gaming aesthetic with gold/silver/bronze podium colors and esports-inspired design language.

## Files Created

### HTML Pages (9)
- `index.html` — Home page with hero (including install command), pitch bullets, 8 feature cards, CTA banner
- `features.html` — Full feature details in 2-column grid
- `clients.html` — 5 client cards (4 native + DLNA)
- `download.html` — Install command, clients, ecosystem with install snippet prominently displayed
- `plugins.html` — Plugin model documentation
- `docs.html` — Documentation link-out page
- `hub.html` — Phlix Hub feature page
- `about.html` — Philosophy, license, contributing, 6 FAQ items
- `404.html` — Error page with recovery links

### CSS Files (3)
- `css/base.css` — Reset, tokens, atmospheric background, typography defaults
- `css/theme.css` — Typography scale, layout containers, hero/pitch/features sections, code blocks
- `css/components.css` — Header/nav, footer, buttons, cards, FAQ list, badges, utilities

### JavaScript (1)
- `js/main.js` — Mobile nav toggle with aria-expanded sync, scroll reveals with IntersectionObserver, reduced-motion gating

### Assets (3)
- `img/logo.svg` — Gold trophy/play icon with Phlix wordmark
- `img/favicon.svg` — Gold trophy icon on dark background
- `img/og.png` — Generated via `node tools/gen-og.mjs --site leaderboard-elite`

### Documentation (4)
- `robots.txt` — Allows all, references sitemap
- `sitemap.xml` — All 8 canonical pages with priorities
- `SITE.md` — Design rationale and token documentation
- `BUILD_LOG.md` — This file

## Compliance Notes

- ✅ 4 native clients + DLNA mentioned (never "5")
- ✅ 8 features from content.json
- ✅ 6 FAQ items from content.json
- ✅ Footer: 3 columns + "Open-source media, on your terms."
- ✅ Install command in hero CTA of index.html AND in download.html
- ✅ No Google Fonts CDN — using CSS variable font declarations
- ✅ CSS @copyright inside /* */ comment blocks
- ✅ Grid: `minmax(0, 1fr)` used throughout (not bare `1fr`)
- ✅ All pages: OG + Twitter meta, `twitter:creator=@detain`
- ✅ FAQ uses `<details>/<summary>` elements
- ✅ No debug statements (console.log, etc.)
- ✅ `prefers-reduced-motion` respected

## License Display

Correct license split displayed:
- Server and Hub: MPL-2.0
- Clients and plugins: MIT

## Notes

- Used `content.json` as single source of truth for all copy
- All links are relative within site folder for portability
- External links use absolute `https://` with `rel="noopener noreferrer"`
- No CDN dependencies in deployed pages
