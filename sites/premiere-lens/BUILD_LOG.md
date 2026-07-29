# Build Log — premiere-lens

## Generated: 2026-07-29

## Site Overview

**Theme:** Camera lens optics — focus rings, aperture rings, precision glass, cinematic lens flare
**Slug:** premiere-lens
**Pages:** 9 (index, features, clients, download, plugins, docs, hub, about, 404)

## Files Generated

### HTML Pages
- `index.html` — Home page with hero, pitch bullets, 8 feature cards, CTA banner
- `features.html` — All 8 features with detailed cards
- `clients.html` — 4 native clients + DLNA (never "5")
- `download.html` — Install command, clients, ecosystem
- `plugins.html` — Plugin model with LifecycleInterface + manifest
- `docs.html` — Documentation link-out summary
- `hub.html` — Hub features and reverse-tunnel explanation
- `about.html` — Philosophy, license (from content.json), FAQ with 6 items
- `404.html` — "Out of focus" error page with recovery links

### CSS
- `css/base.css` — Reset, design tokens (CSS custom properties), accessibility
- `css/theme.css` — Typography, layout containers, section styles
- `css/components.css` — Header, nav, footer, buttons, cards, badges, etc.

### JavaScript
- `js/main.js` — Mobile nav toggle, scroll reveals, code copy, FAQ accessibility

### Images
- `img/logo.svg` — Lens barrel logo with focus rings
- `img/favicon.svg` — Minimal lens icon on dark background
- `img/og.svg` — OG image source (1200×630)
- `img/og.png` — Generated raster OG image

### Config
- `robots.txt` — Allows all, references sitemap
- `sitemap.xml` — 8 pages (excludes 404.html)

### Documentation
- `SITE.md` — Design rationale, palette, type, motion philosophy
- `BUILD_LOG.md` — This file

## Compliance Notes

- ✅ Install command in hero CTA and download.html
- ✅ 4 native clients + DLNA (not "5" or "Five")
- ✅ 8 features from content.json
- ✅ 6 FAQ items from content.json using `<details>/<summary>`
- ✅ Footer: 3 columns + "Open-source media, on your terms."
- ✅ No Google Fonts CDN — self-hosted fonts via CSS variables
- ✅ CSS `@copyright` inside `/* */` comment blocks
- ✅ Grid: `minmax(0, 1fr)` pattern used throughout
- ✅ All pages: OG + Twitter meta with `twitter:creator=@detain`
- ✅ MPL-2.0 (server/hub), MIT (clients/plugins) — never "across the board"

## Notes

- Fonts use CSS variables (`--font-display`, `--font-body`, `--font-mono`) — actual `@font-face` declarations should resolve to available self-hosted fonts from `shared/assets/fonts/`
- Mobile nav uses `nav-menu--closed` class for CSS-driven state (JS enhances)
- All external links use `target="_blank" rel="noopener noreferrer"`
- OG image generated via `node tools/gen-og.mjs --site premiere-lens`
