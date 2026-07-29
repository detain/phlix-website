# BUILD LOG — safari-dawn

## Date: 2026-07-29

## What was built

Complete safari-dawn brand kit site with 9 HTML pages, 3 CSS files, 1 JS file, and supporting assets.

## Pages Created

1. `index.html` — Home with hero (install command in CTA), pitch bullets, features overview, CTA banner
2. `features.html` — All 8 features with detailed descriptions
3. `clients.html` — 4 native clients + DLNA (never "5")
4. `download.html` — Server install (with one-line install command), clients, ecosystem
5. `plugins.html` — Plugin model documentation
6. `docs.html` — Documentation links
7. `hub.html` — Phlix Hub features
8. `about.html` — Philosophy, license (MPL-2.0/MIT), FAQ with details/summary
9. `404.html` — Themed error page

## Assets Created

- `css/base.css` — Reset, tokens, base styles, @copyright
- `css/theme.css` — Typography, layout, page sections, @copyright
- `css/components.css` — Header, nav, footer, buttons, animations, @copyright
- `js/main.js` — Mobile nav toggle, scroll reveal, no dependencies
- `img/logo.svg` — Brand wordmark with sun/sphere mark
- `img/favicon.svg` — Square favicon in primary color
- `robots.txt` — References sitemap
- `sitemap.xml` — All 8 canonical pages

## Compliance Notes

- Install command: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`
- License: MPL-2.0 (server/hub), MIT (clients/plugins)
- 4 native clients + DLNA — never "5" or "Five"
- 8 features from content.json
- 6 FAQ items with `<details>/<summary>` elements
- Footer: 3 columns + "Open-source media, on your terms."
- No Google Fonts CDN — self-hosted fonts with @font-face
- CSS @copyright inside `/* */` comment blocks
- Grid uses `minmax(0, 1fr)`
- All pages: OG + Twitter meta, `twitter:creator=@detain`
- Install command in hero CTA of index.html AND in download.html
- FAQ uses `<details>/<summary>` elements

## Deviations

None — all content follows the spec and content.json.

## Follow-ups

- og.png needs to be generated via `node tools/gen-og.mjs --site safari-dawn`
- Verify all external links are correct
- Run selfcheck and render-check tools
