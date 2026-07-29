# Lost City — Build Log

## Build Information

**Date:** 2026-07-29
**Brand Kit:** lost-city
**Theme:** Ancient ruins reclaimed by jungle

## Files Created

### HTML Pages (9)
- `index.html` — Home with hero CTA, pitch bullets, feature overview, CTA banner
- `features.html` — All 8 features with detailed cards
- `clients.html` — 5 clients (4 native + DLNA)
- `download.html` — Server install + clients + ecosystem
- `plugins.html` — Plugin model docs
- `docs.html` — Link-out to external docs
- `hub.html` — Hub explanation and features
- `about.html` — Philosophy, license, contributing, FAQ (6 items)
- `404.html` — Themed 404 with recovery links

### CSS (3)
- `css/base.css` — Reset, tokens, base styles, reduced-motion
- `css/theme.css` — Typography, layout, page structures
- `css/components.css` — Header, nav, footer, buttons, cards, badges, code blocks

### JavaScript (1)
- `js/main.js` — Mobile nav toggle, scroll reveals, smooth scroll

### Images (2)
- `img/logo.svg` — Stylized P with ruin arch frame
- `img/favicon.svg` — Simple P mark in primary color

### Config (2)
- `robots.txt` — Allow all, reference sitemap
- `sitemap.xml` — All 8 pages (excludes 404)

## Compliance Notes

- ✅ Install command in hero CTA (index.html) and download page
- ✅ 4 native clients + DLNA (never "5")
- ✅ 8 features from content.json
- ✅ 6 FAQ items on about page
- ✅ Footer: 3 columns + "Open-source media, on your terms."
- ✅ No Google Fonts CDN — using Cinzel, Crimson Text, Source Sans 3, JetBrains Mono
- ✅ CSS @copyright inside /* */ comment blocks
- ✅ Grid: minmax(0, 1fr) not bare 1fr
- ✅ All pages: OG + Twitter meta with twitter:creator=@detain
- ✅ Absolute URLs for og:image and canonical

## Deviations from Spec

None — all content from content.json, all requirements met.

## Next Steps

- Generate og.png using `node tools/gen-og.mjs --site lost-city`
- Run `npm run lint` to verify
- Commit and push
