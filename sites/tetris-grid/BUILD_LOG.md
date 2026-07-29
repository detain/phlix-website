# Build Log — tetris-grid

## Date
2026-07-29

## What was built

Complete tetris-grid brand kit site with 22+ files:

### HTML Pages (9)
- `index.html` — Hero with install command, pitch bullets, features overview, CTA banner
- `features.html` — All 8 features with detail cards
- `clients.html` — 5 clients (4 native + DLNA), status badges
- `download.html` — Server install, client cards, ecosystem list; install command in hero
- `plugins.html` — Plugin model documentation, ecosystem plugins, write your own
- `docs.html` — Link-out to external docs, ecosystem list
- `hub.html` — Hub description, self-host vs public, client support
- `about.html` — Philosophy, license, contributing, FAQ with `<details>/<summary>`
- `404.html` — Tetris-themed error page with recovery links, `noindex` meta

### CSS (3 files)
- `css/base.css` — Reset, self-hosted fonts (Space Mono, Space Grotesk, Fira Code), design tokens, utility classes
- `css/theme.css` — Typography, layout containers, page structures, components
- `css/components.css` — Header/nav, footer, buttons, cards, badges, tetromino animations

### JavaScript
- `js/main.js` — Mobile nav toggle, reduced motion support, scroll reveals, active nav link

### Images
- `img/logo.svg` — Phlix wordmark with tetromino block accents
- `img/favicon.svg` — T-piece in cyan on dark background
- `img/og.png` — Generated social share card

### Config
- `robots.txt` — References sitemap
- `sitemap.xml` — 8 canonical pages, absolute URLs

### Documentation
- `SITE.md` — Design rationale, palette, typography, motion, assets
- `BUILD_LOG.md` — This file

## Implementation Notes

### Font Loading
Fonts are self-hosted from `../../../shared/assets/fonts/` (verified to exist: space-mono-400, space-mono-700, space-grotesk-400/500/600/700, fira-code-400/500).

### Install Command
Install command appears in both `index.html` hero and `download.html` page, as required:
```
curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash
```

### Client Count
"4 native clients + DLNA" — correctly stated throughout (NOT "5" or "Five").

### FAQ Implementation
Uses native HTML `<details>/<summary>` elements as specified, with CSS-animated +/- indicator.

### No Google Fonts CDN
All fonts self-hosted via `@font-face` declarations pointing to WOFF2 files in shared/assets/fonts/.

### Grid Syntax
All CSS grids use `minmax(0, 1fr)` not bare `1fr` to prevent overflow issues.

## Deviations / Notes

- No `img/PROMPTS.md` created — raster assets generated via tool
- L-piece orange (#FF8800) is derived to complete the 7-piece set (palette provided only 6 tetromino colors)
- The `@copyright` comments in CSS are properly nested inside `/* */` blocks (not bare lines)

## Follow-ups

- Run `node tools/gen-og.mjs --site tetris-grid` to generate og.png if not already done
- Run `npm run lint` and other quality checks when available
