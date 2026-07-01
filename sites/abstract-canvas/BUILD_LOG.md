# BUILD_LOG.md — Abstract Canvas Brand Kit Site

## What was built

**Site path:** `sites/abstract-canvas/`
**Brand kit:** `phlix-website/brand-kits/abstract-canvas.js` (version 1.0)
**Layout archetype:** Immersive (full-bleed hero, Rothko-inspired color field gradient, generous gallery breathing room)

## File inventory

```
sites/abstract-canvas/
├── index.html          Home
├── features.html       Features (7 feature details)
├── clients.html        Clients (5 client cards)
├── download.html       Download (server + 5 clients + ecosystem)
├── plugins.html        Plugins
├── docs.html           Docs (link-out + summary)
├── hub.html            Phlix Hub
├── about.html          About + FAQ (6 items)
├── css/
│   ├── base.css        CSS reset, :root tokens, base element styles
│   ├── theme.css       Typography, layout containers, page structure
│   └── components.css  Header/nav, footer, buttons, cards, badges, forms
├── js/
│   └── main.js         Nav toggle, reduced-motion gate, scroll reveals
├── img/
│   ├── logo.svg        Wordmark with gestural brushstroke accent
│   ├── favicon.svg     Simple square mark in carbon black
│   ├── og.svg          1200×630 social share card
│   └── PROMPTS.md      Image generation prompts for all assets
├── robots.txt
├── sitemap.xml        8 pages, absolute canonical URLs
├── SITE.md             Design rationale, palette, type, motion
└── BUILD_LOG.md        This file
```

## Layout archetype reasoning

Chose **immersive** based on:
- `visual_style`: abstract expressionism, gestural painting, color field, fine art gallery
- `layout_patterns.landing`: "Full-bleed gestural hero composition with Cormorant Garamond headline over color-field gradient"
- `composition`: asymmetric with strong gestural diagonals, color field blocks anchoring
- `depth`: layered
- `ui_style`: warm linen surfaces, carbon-black edge accents, gallery grid clarity
- `header_motif`: slow gestural brushstroke animation revealing the hero wordmark

The full-bleed Rothko-inspired color field hero, generous negative space, and gallery-white-card rhythm all point to immersive over editorial or grid.

## Palette & type used

**Palette (all from kit design_tokens + colors):**
- Background: `#F0EDE4` (Gallery Linen) — warm linen canvas ground
- Surface: `#E8E4D8` (Canvas Cream) — prepared canvas surface
- Surface Alt: `#DDD8C8` (Aged Ground) — worked canvas
- Primary CTA: `#1A1A1A` (Carbon Black)
- Accent: `#CC2200` (Cadmium Red)
- Depth: `#0055AA` (Ultramarine)
- Text: `#141210` (Paint Ink)
- Neutral: `#8A8070` (Raw Umber)
- Border: `#C8C2B0` (Sizing Ground)

**Typography:**
- Headline: Cormorant Garamond 600/700 (serif, editorial)
- Display: Bebas Neue 400 uppercase (graphic weight)
- Body: Lora 400/500 (warm, literary)
- UI: Inter 400/500/600 (contemporary, clean)
- Mono: JetBrains Mono 400/500

## CSS architecture

Three stylesheets driven entirely by CSS custom properties from the kit's `design_tokens`:
- `base.css` — reset + `:root` token block (colors, spacing, radius, fonts, shadows) + base elements + accessibility
- `theme.css` — typography scale + layout containers + page structure + animations
- `components.css` — shell (header/nav/footer) + buttons + cards + badges + forms

**Token rules followed:** No raw off-palette hex in component CSS; all spacing from kit's `spacing_scale`; radius from `corner_radius` scale; shadows warm-tinted per `shadows.notes`.

## Known deviations / notes

- **og.png not rasterized:** The spec calls for `og.png` (1200×630) but only `og.svg` was generated. The SVG is the canonical editable source and renders correctly in browsers. In a production pipeline, export to PNG.
- **Font files not self-hosted:** Fonts are declared via `@font-face` with `font-display: swap` but the WOFF2 files are not included in `css/fonts/`. For production, subset and add self-hosted WOFF2 files per §13 performance budget.
- **Seasonal variants:** Documented in SITE.md but not implemented as CSS overrides.
- **Mascot "Palette":** Not rendered as a standalone graphic — the brand kit mascot is documented in `img/PROMPTS.md` but not built as a static SVG asset.
- **CTA labels not i18n-centralized:** Button labels ("Get Phlix", "Read the docs", etc.) are hardcoded inline in HTML rather than sourced from content.json. Works for en-only build; architectural debt for future localization.

## Build/dev tooling note

Per `new_site.md` §17, `tools/build.mjs` and `tools/dev-server.mjs` currently scan the legacy `variants/` directory. When adopting `sites/` as the canonical location, update those scanners to build the folder list from `brand-kits/` slugs or directly scan `sites/*/`. This was not modified in this build.

## Review loop (Round 1 → Fixes Applied)

Round 1 identified these issues, all fixed:

1. **Cadmium red overused** — Removed from pitch-item-icon, feature-card-icon, feature-detail-icon, hub-node-icon; only primary CTA button now carries the accent per design_principles.
2. **Body text 15px** — `.feature-card p` changed from 0.9375rem to 1rem (16px floor).
3. **Nav toggle 44px** — Changed to 48px for tablet touch target compliance.
4. **Focus not returned on backdrop/outside-click close** — Added `navToggle.focus()` to both handlers in `main.js`.
5. **Second .btn-secondary on home** — "See all features →" changed to `.btn-ghost`.

Outstanding post-fix: Brand Fidelity, Responsive, and Performance dimensions need a Round 2 reviewer pass to confirm fixes are effective (scores: 78, 68, 38 before fixes). See `reviews/abstract-canvas/FINAL-REVIEW.md` for full details.
