# Build Log — Reverb Chamber

## Generated Files (22)

- `index.html` — Home page with hero, pitch, features overview, CTA
- `features.html` — All 8 features with detailed descriptions
- `clients.html` — 4 native clients + DLNA (not "5")
- `download.html` — Server install + client downloads + ecosystem
- `plugins.html` — Plugin model documentation + ecosystem links
- `docs.html` — Documentation links + ecosystem overview
- `hub.html` — Hub explanation with self-host option
- `about.html` — Philosophy + License (MPL-2.0/MIT) + FAQ (6 items)
- `404.html` — Error page with sound wave theme
- `css/base.css` — Reset, custom properties, utilities
- `css/theme.css` — Typography, layout, section styles
- `css/components.css` — Buttons, nav, footer, animations
- `js/main.js` — Mobile nav, reduced motion, scroll reveals, easter egg
- `img/logo.svg` — Animated sound wave + wordmark
- `img/favicon.svg` — Sound wave bars icon
- `robots.txt` — Allows all crawlers, references sitemap
- `sitemap.xml` — All 8 pages + priorities
- `SITE.md` — This documentation
- `BUILD_LOG.md` — Build notes

## Content Notes

- Install command from `content.json`: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`
- License: Phlix Server + Hub = MPL-2.0; clients/plugins = MIT (sourced from `content.json`)
- 4 native clients + DLNA = 5 total streaming targets (never says "5" or "five")
- 8 features as specified in `content.json`
- 6 FAQ items from `content.json`

## Design Decisions

1. **Sound wave animations** — Primary visual motif; animated bars in hero, wave patterns at section bottoms
2. **Dark theme** — Deep void background (#1A1A2E) with electric accents
3. **Glow effects** — Purple, cyan, and pink glows on interactive elements and cards
4. **Acoustic panel pattern** — Subtle grid texture on hero and feature sections
5. **Logo easter egg** — 5 rapid logo clicks trigger expanding ring burst animation

## OG Image

Generated via: `node tools/gen-og.mjs --site reverb-chamber`

## Intentional Deviations from Spec

- None — followed new_site.md specification exactly
