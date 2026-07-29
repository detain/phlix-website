# Wild-West Build Log

## Generated: 2026-07-29

## What was built

Complete static site for the wild-west brand kit, following the new_site.md spec:

- **9 HTML pages**: index, features, clients, download, plugins, docs, hub, about, 404
- **3 CSS files**: base.css (tokens, reset), theme.css (typography, layout), components.css (buttons, nav, cards, FAQ)
- **1 JS file**: main.js (nav toggle, reduced motion, scroll reveal)
- **3 image assets**: logo.svg, favicon.svg
- **Config files**: robots.txt, sitemap.xml
- **Documentation**: SITE.md, BUILD_LOG.md

## Content compliance

- **Install command:** Placed in hero CTA area of index.html AND download.html (verbatim from content.json)
- **4 native clients + DLNA:** Correctly states "Four native apps plus any DLNA device" — never "5"
- **8 features:** All 8 features from content.json displayed with correct icons and descriptions
- **6 FAQ items:** All 6 FAQ questions from content.json displayed using `<details>/<summary>`
- **Footer:** 3 columns + "Open-source media, on your terms." tagline
- **License:** MPL-2.0 (server/hub), MIT (clients/plugins) — never stated as single license

## Technical compliance

- **CSS @copyright:** All CSS files have properly nested `/* ... */` comment blocks
- **Grid tracks:** Used `minmax(0, 1fr)` not bare `1fr` throughout
- **OG + Twitter meta:** All pages have complete social metadata with `twitter:creator=@detain`
- **Self-hosted:** No Google Fonts CDN links — would need font WOFF2 files for production
- **Accessible:** Skip link, ARIA landmarks, semantic HTML, keyboard navigation, focus states

## Notes

- `og.png` generated via `node tools/gen-og.mjs --site wild-west`
- Fonts are declared via CSS variables but require WOFF2 files in `css/fonts/` for production deployment
- No external CDN dependencies in CSS or JS
