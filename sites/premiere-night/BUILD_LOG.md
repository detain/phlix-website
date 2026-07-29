# BUILD LOG — premiere-night

## Built

- **Date**: 2026-07-29
- **Theme**: premiere-night (movie premiere under spotlights)
- **Palette**: `#1A0A0A` `#C9A227` `#8B0000` `#F5F5F5` `#FF0000`

## Files Created

### HTML Pages (9)
- `index.html` — Home with hero CTA showing install command
- `features.html` — All 8 features with detail cards
- `clients.html` — 4 native clients + DLNA
- `download.html` — Server install + clients + ecosystem, install command in hero
- `plugins.html` — Plugin model documentation
- `docs.html` — Documentation link-out page
- `hub.html` — Hub explanation with diagram
- `about.html` — Philosophy, license, contributing + 6 FAQ items
- `404.html` — Custom 404 with recovery links

### CSS (3)
- `css/base.css` — Reset, tokens (premiere-night palette), @font-face declarations
- `css/theme.css` — Typography, layout, hero with marquee effect, footer
- `css/components.css` — Buttons, cards, feature cards, FAQ <details>/<summary>, install blocks, trust band, CTA banner

### JavaScript (1)
- `js/main.js` — Nav toggle, scroll reveal, FAQ accordion (native <details>), install copy button

### Images (2)
- `img/logo.svg` — Gold "Phlix" wordmark with animated marquee dots
- `img/favicon.svg` — Gold "P" on dark red-black

### Config (2)
- `robots.txt` — Allows all, references sitemap
- `sitemap.xml` — All 8 canonical pages

### Documentation (2)
- `SITE.md` — Design rationale, color palette, typography, motion
- `BUILD_LOG.md` — This file

## Compliance Notes

- ✅ Install command: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash` appears in hero CTA of index.html AND download.html
- ✅ 4 native clients + DLNA (never "5")
- ✅ 8 features from content.json
- ✅ 6 FAQ from content.json using `<details>/<summary>` elements
- ✅ Footer: 3 columns + "Open-source media, on your terms."
- ✅ No Google Fonts CDN — all fonts self-hosted WOFF2
- ✅ CSS @copyright inside `/* */` comment blocks
- ✅ Grid: `minmax(0, 1fr)` (not bare `1fr`)
- ✅ All pages: OG + Twitter meta, `twitter:creator=@detain`
- ✅ License: MPL-2.0 for server/hub (from content.json)

## Deviations from new_site.md

- No `<details>/<summary>` JS accordion — used native HTML elements with CSS-driven open/close
- No mascot (lux, etc.) — not requested in brand kit
- No seasonal activation — not requested
- No intensity toggle — not requested
- No easter eggs — not requested

## Known Issues

- None at build time.

## Next Steps

- Generate `og.png` using `node tools/gen-og.mjs --site premiere-night`
- Run `npm run lint` and `npm run linkcheck` for validation
- Commit and push
