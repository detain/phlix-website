# BUILD_LOG — neon-underground

## Generated

- `index.html` — Home page with hero, pitch, features overview, CTA
- `features.html` — All 8 features in detail cards
- `clients.html` — 4 native clients + DLNA (not "5")
- `download.html` — Server install command + clients + ecosystem
- `plugins.html` — Plugin model documentation
- `docs.html` — Documentation link-out page
- `hub.html` — Phlix Hub information
- `about.html` — Philosophy, license (MPL-2.0/MIT), FAQ (6 items)
- `404.html` — "Signal Lost" error page with noindex

## Assets

- `css/base.css` — Reset, custom properties, fonts
- `css/theme.css` — Typography, layouts, section styles
- `css/components.css` — Buttons, header, footer, cards, animations
- `js/main.js` — Mobile nav toggle, reduced motion, scroll reveals
- `img/logo.svg` — Phlix wordmark
- `img/favicon.svg` — 32x32 P mark
- `img/og.svg` + `img/og.png` — 1200x630 social card

## Supporting Files

- `robots.txt` — Allow all, sitemap reference, AI bot blocks
- `sitemap.xml` — All 8 pages (no 404.html per spec)
- `SITE.md` — Concept, colors, typography, motion documentation
- `BUILD_LOG.md` — This file

## Intentional Deviations from Spec

None — followed new_site.md §2-§19 strictly.

## Content Sources

All content traced to `shared/content.json`:
- Hero copy from `hero.*`
- Pitch bullets from `pitch_bullets[]`
- 8 features from `features[]`
- 4 native clients + DLNA from `clients[]`
- Install command from `install.primary.command`
- Ecosystem from `ecosystem[]`
- FAQ from `faq[]` (6 items)
- Footer from `footer.*`
- License: phlix-server and phlix-hub are MPL-2.0; clients/plugins are MIT (per content.json)

## Key Implementation Notes

1. **Fonts**: Self-hosted via `@font-face` pointing to `../../assets/fonts/`
2. **Grid**: All grids use `minmax(0, 1fr)` per §19.12
3. **@copyright**: All CSS files have banner comments with `@copyright` inside `/* */` blocks
4. **Client count**: 4 native clients + DLNA, never "5"
5. **Install command**: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`
6. **OG image**: Absolute URL `https://detain.github.io/phlix-website/neon-underground/img/og.png`

## Verification Status

- [x] All 8 pages + 404.html exist
- [x] CSS @copyright check passed
- [x] Grid tracks use minmax(0, 1fr)
- [x] Client count = 4 native + DLNA
- [x] License correctly split (MPL-2.0 / MIT)
- [x] OG image absolute URL
- [x] twitter:creator=@detain on all pages
- [x] Install command from content.json
