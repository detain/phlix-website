# Equalizer Build Log

## Generated: 2026-07-29

## Files Created

### HTML Pages (9)
- `index.html` — Home page with hero (including install command), pitch, feature overview, CTA banner
- `features.html` — Features detail page with all 8 features in detail cards
- `clients.html` — Client cards for 4 native clients + DLNA (5 total)
- `download.html` — Download page with install commands and client download cards
- `plugins.html` — Plugin documentation and example reference
- `docs.html` — Documentation links page
- `hub.html` — Hub information with connection diagram
- `about.html` — About page with philosophy, license, contributing, and FAQ
- `404.html` — Error page with recovery links (noindex)

### CSS Files (3)
- `css/base.css` — Reset, design tokens, @font-face declarations
- `css/theme.css` — Typography, layout, page structure
- `css/components.css` — Buttons, cards, badges, FAQ, download blocks, etc.

### JavaScript (1)
- `js/main.js` — Nav toggle, active nav highlighting, scroll reveals, FAQ accordion, install copy button, EQ spectrum animation

### Assets (2)
- `img/logo.svg` — Wordmark with EQ frequency bars
- `img/favicon.svg` — 32×32 favicon with mini EQ bars

### Config (4)
- `robots.txt` — Sitemap reference
- `sitemap.xml` — All 8 pages (not 404.html)
- `SITE.md` — Design documentation
- `BUILD_LOG.md` — This file

## Compliance Notes

- 4 native clients + DLNA — verified, never "5"
- 8 features from content.json — all present
- 6 FAQ from content.json — all present on about.html
- Footer: 3 columns + "Open-source media, on your terms." — verified
- No Google Fonts CDN — all fonts self-hosted via shared/assets/fonts/
- CSS @copyright inside `/* */` blocks — verified on all CSS files
- Grid uses `minmax(0, 1fr)` — verified throughout components.css
- OG + Twitter meta on all pages — verified, all absolute URLs
- `twitter:creator=@detain` — verified on all pages
- Install command in hero CTA on index.html — present
- Install command in hero CTA on download.html — present

## Known Issues

None.

## Follow-up

- `og.png` needs to be generated via `node tools/gen-og.mjs --site equalizer`
