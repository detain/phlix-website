# Build Log — Oscar Gold Brand Kit Site

## Date
2026-07-29

## What was built

Complete Phlix brand kit site for the "oscar-gold" theme (Academy Award prestige, golden statuette glow, red carpet luxury).

## Files created (22 total)

### HTML Pages (9)
- `index.html` — Home page with hero, pitch bullets, features overview, CTA banner
- `features.html` — All 8 features with detailed cards
- `clients.html` — 4 native clients + DLNA (5 total, 4 native)
- `download.html` — Server install + client downloads + ecosystem
- `plugins.html` — Plugin model, ecosystem plugins, write your own
- `docs.html` — Documentation link-out page with ecosystem
- `hub.html` — Hub explanation (cloud directory + reverse tunnel)
- `about.html` — Philosophy, license, contributing, FAQ
- `404.html` — Themed error page with recovery links

### CSS (3)
- `css/base.css` — Reset, tokens, element defaults
- `css/theme.css` — Typography, layout, page structure
- `css/components.css` — Header, nav, footer, buttons, cards

### JavaScript (1)
- `js/main.js` — Mobile nav toggle, reduced motion, scroll reveals, code copy

### Images (3)
- `img/logo.svg` — Award statuette + wordmark
- `img/favicon.svg` — Square gold mark on burgundy
- `img/og.png` — Generated social share card (1200×630)

### Config (4)
- `robots.txt` — Allows all, references sitemap
- `sitemap.xml` — All 8 canonical pages
- `SITE.md` — Design rationale and specifications
- `BUILD_LOG.md` — This file

## Compliance notes

- ✅ 4 native clients + DLNA (never "5")
- ✅ 8 features from content.json
- ✅ 6 FAQ from content.json
- ✅ Footer: 3 columns + "Open-source media, on your terms."
- ✅ No Google Fonts CDN — self-hosted fonts via local()
- ✅ CSS `@copyright` inside `/* */` comment blocks
- ✅ Grid: `minmax(0, 1fr)` not bare `1fr`
- ✅ All pages: OG + Twitter meta, `twitter:creator=@detain`
- ✅ Install command in hero CTA of index.html AND download.html
- ✅ FAQ: `<details>/<summary>` elements
- ✅ MPL-2.0 license correctly attributed to server/hub, MIT to clients/plugins

## Deviations from default spec

- Used a gold-gradient text effect on hero headline (visual enhancement)
- Added gold pattern overlay to CTA banner (texture depth)

## Follow-up items

- None currently

## Verification

Run `node tools/selfcheck.mjs --site oscar-gold` to validate.
