# Build Log: achievement-unlocked

## Date: 2026-07-29

## Files Created

### HTML Pages (9)
- `index.html` — Home page with hero (install CTA), pitch bullets, features overview, CTA banner
- `features.html` — All 8 features with detailed cards
- `clients.html` — 4 native clients + DLNA (never says "5")
- `download.html` — Install command in hero, clients, ecosystem list
- `plugins.html` — Plugin model, lifecycle interface, ecosystem plugins
- `docs.html` — User guide, API reference, developer docs, hub admin links
- `hub.html` — Reverse-tunnel relay, NAT traversal, self-host info
- `about.html` — Philosophy, license (MPL-2.0/MIT), contributing, FAQ with `<details>/<summary>`
- `404.html` — Achievement not found themed error page

### CSS Files (3)
- `css/base.css` — Reset, tokens (:root CSS variables), element defaults, skip link
- `css/theme.css` — Typography, layout containers, page structure, badges
- `css/components.css` — Header/nav, footer, buttons, 404 page, scroll reveal

### JavaScript (1)
- `js/main.js` — Mobile nav toggle, reduced motion, scroll reveals, FAQ accordion

### Images (2)
- `img/logo.svg` — Trophy icon + Phlix wordmark
- `img/favicon.svg` — Trophy icon on navy square

### Config Files (2)
- `robots.txt` — References sitemap.xml
- `sitemap.xml` — 8 canonical pages (no 404.html)

### Documentation (2)
- `SITE.md` — Design rationale, color table, typography, motion
- `BUILD_LOG.md` — This file

## Compliance Checklist

- [x] Install command: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`
- [x] 4 native clients + DLNA (never "5" or "Five")
- [x] 8 features from content.json
- [x] 6 FAQ from content.json
- [x] Footer: 3 columns + "Open-source media, on your terms."
- [x] FAQ uses `<details>/<summary>` elements
- [x] All pages: OG + Twitter meta, `twitter:creator=@detain`
- [x] CSS `@copyright` inside `/* */` comment blocks
- [x] Grid uses `minmax(0, 1fr)` not bare `1fr`
- [x] No Google Fonts CDN
- [x] Self-hosted fonts with fallbacks
- [x] License: MPL-2.0 (server/hub), MIT (clients/plugins)

## Deviation Notes

- Used system font fallbacks (Oswald → Arial Black, Source Sans 3 → Arial, Fira Code → Consolas) since self-hosted WOFF2 fonts were not available in the build environment
- og.png generation deferred to `tools/gen-og.mjs --site achievement-unlocked`

## Follow-ups

- Generate `img/og.png` using `node tools/gen-og.mjs --site achievement-unlocked`
- Verify all external links resolve correctly
- Run lint and accessibility checks when build tools available
