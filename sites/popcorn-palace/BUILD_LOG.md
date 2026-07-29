# BUILD_LOG.md — Popcorn Palace

## Build Summary

Generated: 2026-07-29
Brand kit: popcorn-palace (Art Deco Movie Theater theme)
Pages: 9 (index, features, clients, download, plugins, docs, hub, about, 404)

## Files Created

### HTML Pages (9)
- `index.html` — Home with hero + install command + marquee decorations
- `features.html` — All 8 features detailed
- `clients.html` — 4 native clients + DLNA (5 total, never stated as "5")
- `download.html` — Install command + client cards + ecosystem
- `plugins.html` — Plugin model + ecosystem
- `docs.html` — Documentation links + ecosystem
- `hub.html` — Phlix Hub details
- `about.html` — Philosophy + License + Contributing + FAQ (6 items, `<details>/<summary>`)
- `404.html` — Error page with recovery links + noindex

### CSS Files (3)
- `css/base.css` — Design tokens, reset, base styles, font declarations
- `css/theme.css` — Typography, layout, page structure, grids
- `css/components.css` — Header/nav, footer, buttons, cards, FAQ

### JavaScript (1)
- `js/main.js` — Mobile nav, scroll reveals, reduced motion support

### Images (3)
- `img/logo.svg` — Art Deco marquee-style logo with animated bulbs
- `img/favicon.svg` — 32x32 Art Deco favicon
- `img/og.png` — (to be generated via `node tools/gen-og.mjs --site popcorn-palace`)

### Config Files (2)
- `robots.txt` — Allows all, references sitemap
- `sitemap.xml` — All 8 pages with priorities

### Documentation (2)
- `SITE.md` — Full design rationale and token documentation
- `BUILD_LOG.md` — This file

## Design Decisions

1. **Marquee Lights:** Art Deco animated bulb decorations at top and bottom of hero section. CSS keyframe animation with pulsing glow effect. Respects `prefers-reduced-motion`.

2. **Color Application:**
   - Primary gold (#FFD700) for headlines, CTAs, icons
   - Deep reds (#8B0000) for secondary accents, section dividers
   - Wheat (#F5DEB3) for body text (warm, cinema-popcorn feel)
   - Dark burgundy-black (#1A0A0A) for dramatic backgrounds

3. **Typography:** Playfair Display for headlines (serif elegance), Lato for body (clean readability), Fira Code for code.

4. **Grid System:** All grids use `minmax(0, 1fr)` to prevent overflow issues in narrow viewports per §19.12 spec.

5. **FAQ Implementation:** Uses native HTML `<details>/<summary>` elements for accessibility. No-JS accordion behavior built-in.

## Compliance Checklist

- [x] 4 native clients + DLNA mentioned correctly (never "5")
- [x] 8 features from content.json
- [x] 6 FAQ items from content.json
- [x] Footer: 3 columns + "Open-source media, on your terms."
- [x] Install command in hero CTA (index.html) AND download.html
- [x] No Google Fonts CDN — self-hosted fonts via @font-face
- [x] CSS @copyright inside /* */ comment blocks
- [x] Grid uses `minmax(0, 1fr)` not bare `1fr`
- [x] All pages: OG + Twitter meta, `twitter:creator=@detain`
- [x] FAQ uses `<details>/<summary>` elements
- [x] 404.html with recovery links and noindex

## Known Follow-ups

1. Run `node tools/gen-og.mjs --site popcorn-palace` to generate og.png
2. Run `node tools/gen-sitemap.mjs --site popcorn-palace` to regenerate sitemap (verify URLs)
3. Run `npm run lint` to verify HTML/CSS/JS
4. Run `npm run linkcheck` to verify all links
5. Run `node tools/render-check.mjs --site popcorn-palace` for visual regression at breakpoints
