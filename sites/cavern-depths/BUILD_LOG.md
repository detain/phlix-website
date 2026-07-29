# Build Log — Cavern Depths

## Build Information
- **Site:** cavern-depths
- **Theme:** Cavern Depths (Underground cave systems, stalactite formations, bioluminescent pools)
- **Built:** 2026-07-29

## Files Created

### HTML Pages (9)
- `index.html` — Home page with hero, features overview, pitch bullets, proof band, and CTA
- `features.html` — Features detail page with all 8 feature articles
- `clients.html` — Clients page with 5 client cards (Roku, Samsung Tizen, Windows, Mobile, DLNA)
- `download.html` — Download page with server install command and client downloads
- `plugins.html` — Plugin documentation and ecosystem
- `docs.html` — Documentation links (external)
- `hub.html` — Phlix Hub explanation (reverse-tunnel relay)
- `about.html` — Philosophy, license, contributing, FAQ (6 items)
- `404.html` — Custom 404 page

### CSS Files (3)
- `css/base.css` — Reset, tokens, font declarations, focus states, reduced motion
- `css/theme.css` — Typography, layout, page structure, grid systems
- `css/components.css` — Header/nav, buttons, badges, forms, section-specific styles

### JavaScript (1)
- `js/main.js` — Navigation toggle, focus trap, reduced motion, scroll reveals

### Images (3)
- `img/logo.svg` — Stalactite/crystal wordmark
- `img/favicon.svg` — Stalactite formation favicon
- `img/og.png` — Generated via `node tools/gen-og.mjs --site cavern-depths`

### Config (2)
- `robots.txt` — References sitemap.xml
- `sitemap.xml` — All 8 canonical pages

### Documentation (2)
- `SITE.md` — Design rationale, color palette, typography, motion
- `BUILD_LOG.md` — This file

## Implementation Notes

### Theme Application
- Palette applied: Deep cave blacks (#0A0F1A), cave blues (#1A2A4A), glowing crystal blues (#4A90D9), bioluminescent teals (#7FFFD4), pale light (#E8E8E8)
- Typography uses Barlow Condensed/Barlow from shared font pool
- Motion includes pulse-glow, crystal-shimmer effects for bioluminescent feel

### Content Compliance
- ✅ 8 features from content.json
- ✅ 6 FAQ items from content.json
- ✅ 4 native clients + DLNA (never "5")
- ✅ Install command: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`
- ✅ Footer: 3 columns + "Open-source media, on your terms."
- ✅ License: MPL-2.0 for server/hub, MIT for clients/plugins
- ✅ No Google Fonts CDN — self-hosted fonts
- ✅ CSS @copyright inside /* */ comment blocks

### Grid Compliance
- All grids use `minmax(0, 1fr)` instead of bare `1fr`

### Social Meta
- All pages have OG + Twitter meta with `twitter:creator=@detain`
- OG image uses absolute URL

### Accessibility
- Skip link, focus states, ARIA labels
- FAQ uses `<details>/<summary>` elements
- Reduced motion support

## Deviation from Default
- Hero section named "The Depths" (thematic naming)
- Feature section named "Crystal Formations"
- Pitch section named "Subterranean Way"
- Proof section named "Underground Proof"
- CTA section named "Descent"
- Page branding uses cave exploration terminology throughout

## Verification Commands
```bash
node tools/gen-og.mjs --site cavern-depths
node tools/gen-sitemap.mjs --site cavern-depths
npm run lint
npm run linkcheck
npm run a11y
```
