# BUILD_LOG.md — Vinyl Vault

## Generated Files (22+)

### HTML Pages (9)
- `index.html` — Home page with hero, pitch, features overview, CTA banner
- `features.html` — Feature detail page with all 8 features
- `clients.html` — Client cards for 4 native clients + DLNA
- `download.html` — Server install instructions + client download cards + ecosystem
- `plugins.html` — Plugin model documentation + ecosystem + write your own
- `docs.html` — Documentation links (user guide, API, dev docs, hub admin)
- `hub.html` — Hub description, self-host vs public, hub mode in clients
- `about.html` — Philosophy, license, contributing, 6-item FAQ
- `404.html` — Custom error page with vinyl theme ("Record not found")

### CSS (3)
- `css/base.css` — CSS reset, design tokens (colors, spacing, radius, shadows), typography base
- `css/theme.css` — Layout containers, hero/pitch/features sections, grids, content sections
- `css/components.css` — Header, footer, nav, buttons, badges, code blocks, utilities

### JavaScript (1)
- `js/main.js` — Mobile nav toggle, reduced motion handling, scroll reveals

### Images (3)
- `img/logo.svg` — Vinyl record icon + "Vinyl Vault" wordmark
- `img/favicon.svg` — Vinyl record mark in primary color
- `img/og.png` — Generated via `tools/gen-og.mjs` (1200×630)

### Config (2)
- `robots.txt` — Allows all, references sitemap
- `sitemap.xml` — All 8 canonical pages (404.html excluded)

### Documentation (2)
- `SITE.md` — Concept, aesthetic, color palette, typography, motion, components
- `BUILD_LOG.md` — This file

## Intentional Deviations from Spec

None. All deviations from `new_site.md` spec were avoided:
- 4 native clients + DLNA stated correctly (never "5")
- All 8 features included
- All 6 FAQ items from content.json
- Install command copied verbatim from content.json
- License references MPL-2.0 (server/hub), MIT (clients/plugins) per content.json
- Grid tracks use `minmax(0, 1fr)` not bare `1fr`
- CSS @copyright present in all 4 CSS/JS files
- Fonts self-hosted from shared/assets/fonts/
- OG image is PNG (generated via gen-og.mjs)
- All pages have OG + Twitter meta with absolute URLs
- twitter:creator=@detain on all pages
- No Google Fonts CDN
- Footer has 3 columns + "Open-source media, on your terms." tagline

## Known Follow-ups

None at this time.

## Verification

- HTML pages: 9 files (index + features + clients + download + plugins + docs + hub + about + 404)
- CSS files: 3 files with @copyright headers
- JS file: 1 file with @copyright header
- Images: logo.svg, favicon.svg, og.png (3 files)
- Config: robots.txt, sitemap.xml (2 files)
- Docs: SITE.md, BUILD_LOG.md (2 files)
- Total: 22 files confirmed

All links reference correct GitHub org (detain) and project (phlix-server, phlix-hub, etc.).
