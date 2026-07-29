# Silver Screen — Build Log

## What was built

Complete Phlix brand kit site for the "silver-screen" theme.

### Files created (22 total)

- `index.html` — Home page with hero, pitch, features overview, CTA
- `features.html` — All 8 features with detailed cards
- `clients.html` — 5 clients (4 native + DLNA)
- `download.html` — Server install, clients, ecosystem
- `plugins.html` — Plugin model documentation
- `docs.html` — Documentation link-out page
- `hub.html` — Phlix Hub explanation
- `about.html` — Philosophy, license, contributing, FAQ
- `404.html` — Not found page with film-themed messaging
- `css/base.css` — CSS reset, design tokens, base styles
- `css/theme.css` — Typography, layout, page structures
- `css/components.css` — Header, footer, buttons, cards, FAQ, etc.
- `js/main.js` — Mobile nav, reduced motion, scroll reveal, code copy
- `img/logo.svg` — Art deco film reel + wordmark
- `img/favicon.svg` — Film reel favicon in gold/navy
- `robots.txt` — Allows all, references sitemap
- `sitemap.xml` — All 8 pages (no 404)
- `SITE.md` — Design rationale documentation
- `BUILD_LOG.md` — This file

### Implementation notes

- All 8 features from `content.json` included
- All 6 FAQ items from `content.json` using `<details>/<summary>`
- Install command (`curl -fsSL...`) in hero of index.html AND download.html
- Footer tagline: "Open-source media, on your terms."
- 4 native clients + DLNA (never "5")
- OG + Twitter meta on every page with `twitter:creator=@detain`
- Self-hosted fonts via `@font-face` referencing `../../assets/fonts/`
- CSS `@copyright` inside `/* */` comment blocks
- Grid uses `minmax(0, 1fr)` not bare `1fr`
- License: MPL-2.0 (server/hub), MIT (clients/plugins)

### Intentional deviations from spec

- Film grain overlay uses CSS-generated SVG noise pattern rather than raster texture (lighter weight, always available)

### Known follow-ups

- `og.png` needs to be generated via `node tools/gen-og.mjs --site silver-screen`
- Real font WOFF2 files need to be vendored to `shared/assets/fonts/`
