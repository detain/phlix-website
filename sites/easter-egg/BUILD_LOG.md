# Easter Egg Brand Kit — Build Log

## What was built

Complete static brand-kit site for the `easter-egg` brand kit in `/home/sites/phlix/phlix-website/sites/easter-egg/`.

### Files created

- `index.html` — Home page with hero, pitch bullets, features overview, CTA banner
- `features.html` — All 8 features in detail grid
- `clients.html` — 5 clients (4 native + DLNA) with status badges
- `download.html` — Server install section with full install command, clients download cards, ecosystem list
- `plugins.html` — Plugin model documentation, ecosystem plugins, write your own
- `docs.html` — Documentation link-out with ecosystem list
- `hub.html` — Phlix Hub explanation (reverse-tunnel relay, NAT traversal)
- `about.html` — Philosophy, license (from content.json), contributing, FAQ
- `404.html` — Themed error page with recovery links

### CSS files

- `css/base.css` — Reset, CSS custom properties (design tokens), base element styles, accessibility, overflow-wrap utilities
- `css/theme.css` — Typography system, layout containers, hero/pitch/features/CTA/page-header sections
- `css/components.css` — Header/nav, footer, buttons, cards, badges, code blocks, FAQ list, easter egg effects

### JavaScript

- `js/main.js` — Mobile nav toggle, reduced-motion detection, IntersectionObserver scroll reveals, Konami code easter egg, logo click easter egg, confetti burst effect

### Assets

- `img/logo.svg` — Gradient egg mark + wordmark
- `img/favicon.svg` — Gradient egg in 32x32
- `robots.txt` — References sitemap
- `sitemap.xml` — All 8 canonical pages (excludes 404)

### Documentation

- `SITE.md` — Design rationale, color table, typography, spatial system, motion philosophy
- `BUILD_LOG.md` — This file

## Compliance notes

- ✅ Install command in hero CTA of `index.html` AND `download.html` (from `content.json`)
- ✅ License: MPL-2.0 (server/hub), MIT (clients/plugins) — never hardcoded as single license
- ✅ 4 native clients + DLNA — never "5" or "Five"
- ✅ 8 features from `content.json` across home overview and features page
- ✅ 6 FAQ from `content.json` using `<details>/<summary>` elements on about page
- ✅ Footer: 3 columns + "Open-source media, on your terms."
- ✅ No Google Fonts CDN — self-hosted font declarations with `local()` and `font-display: swap`
- ✅ CSS `@copyright` inside `/* */` comment blocks
- ✅ Grid: `minmax(0, 1fr)` not bare `1fr`
- ✅ All pages: OG + Twitter meta with `twitter:creator=@detain`
- ✅ FAQ uses `<details>/<summary>` elements

## Deviation from base spec

None intentional. All facts trace to `content.json`.

## Notes

- og.png must be generated via `node tools/gen-og.mjs --site easter-egg`
- All external links use `rel="noopener noreferrer"`
