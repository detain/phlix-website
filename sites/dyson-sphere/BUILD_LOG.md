# BUILD_LOG.md — Dyson Sphere Brand Kit Site

## Build Summary

**Built:** 2024-07-29
**Brand kit:** `brand-kits/dyson-sphere.js` (v1.0.0)
**Site slug:** `dyson-sphere`

## Files Generated

### HTML Pages (9)
- `index.html` — Home (hero, pitch, features overview, CTA)
- `features.html` — All 8 features with detail cards
- `clients.html` — 5 clients (4 native + DLNA)
- `download.html` — Server install + client downloads + ecosystem
- `plugins.html` — Plugin model, ecosystem, write your own
- `docs.html` — Documentation links + ecosystem
- `hub.html` — Phlix Hub description
- `about.html` — Philosophy, license, contributing, FAQ (6 items)
- `404.html` — Custom themed error page

### CSS (3)
- `css/base.css` — Reset, tokens, base elements
- `css/theme.css` — Typography, layout, page sections
- `css/components.css` — Header, nav, footer, buttons, cards

### JavaScript (1)
- `js/main.js` — Mobile nav, reduced motion, scroll reveals, particles

### Images (4)
- `img/logo.svg` — Wordmark with animated megastructure rings
- `img/favicon.svg` — Square icon with rings and sun
- `img/og.png` — 1200×630 social share card (converted from og.svg)
- `img/og.svg` — Source SVG for og.png

### Config (2)
- `robots.txt` — Allows all, references sitemap
- `sitemap.xml` — All 9 pages with priorities

### Documentation (2)
- `SITE.md` — This design rationale document
- `BUILD_LOG.md` — What was built

## Content Sources

All content sourced from `shared/content.json`:
- Hero copy, pitch bullets, 8 features, 5 clients, 6 FAQ, footer columns
- Install command: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`
- Licenses: phlix-server & phlix-hub = MPL-2.0; shared libs/plugins/clients = MIT

## Design Decisions

1. **Megastructure rings:** Three animated ellipses at different rotation speeds create orbital ring illusion without heavy animation cost
2. **Solar gradient on text:** `background-clip: text` + gradient fill on `<h1>` creates glowing headline effect
3. **Corona radial gradient:** Hero background uses multiple layered radial gradients for depth
4. **Reduced motion:** All animations fully disabled under `prefers-reduced-motion: reduce`
5. **Stellar particles:** 30 small colored dots drift across hero section for ambient cosmic feel

## Known Deviations from new_site.md

- OG image generated from SVG → PNG via rsvg-convert (not a deviation — OG must be PNG per spec §19.5)
- No `img/PROMPTS.md` created — all artwork is SVG/CSS-generated, no AI image generation prompts needed

## Verification

- HTML: All 9 pages valid, single h1 per page, semantic landmarks
- CSS: No off-palette colors, all tokens via CSS custom properties
- Links: Internal relative, external absolute with `rel="noopener noreferrer"`
- Accessibility: WCAG 2.2 AA contrast, keyboard navigable, reduced motion respected
- SEO: Title ≤60 chars, description ≤160 chars, canonical URLs, JSON-LD on home
- Social: OG + Twitter cards with absolute image URL
