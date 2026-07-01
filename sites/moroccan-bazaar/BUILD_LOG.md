# BUILD_LOG.md — Moroccan Bazaar

## Build Summary

**Brand kit:** `moroccan-bazaar.js` v1.0
**Site slug:** `moroccan-bazaar`
**Built:** 2026-07-01
**Layout archetype:** Immersive — full-bleed dark hero, layered depth, warm lantern-lit atmosphere

## What Was Generated

```
sites/moroccan-bazaar/
├── index.html          Home — hero, pitch, features overview, CTA
├── features.html       Feature detail grid (8 features)
├── clients.html        Client cards (5 clients)
├── download.html       Server + clients + ecosystem
├── plugins.html        Plugin model + ecosystem + write your own
├── docs.html           Documentation link-out + ecosystem
├── hub.html            Hub description + CTA
├── about.html          Philosophy + license + contributing + FAQ
├── css/
│   ├── base.css        Reset, tokens (:root), fonts (@font-face), base styles
│   ├── theme.css       Typography roles, layout, page structure, components
│   ├── components.css  Site header, nav, footer, buttons, cards, badges
│   └── fonts/
│       ├── cormorant-garamond-600.woff2
│       ├── cormorant-garamond-700.woff2
│       ├── cinzel-400.woff2
│       ├── cinzel-700.woff2
│       ├── lora-400.woff2
│       ├── lora-500.woff2
│       ├── nunito-sans-400.woff2
│       ├── nunito-sans-500.woff2
│       ├── nunito-sans-600.woff2
│       ├── fira-code-400.woff2
│       └── fira-code-500.woff2
├── js/
│   └── main.js         Nav toggle, reduced-motion gate, scroll reveal
├── img/
│   ├── logo.svg        Wordmark + zellige star, Cormorant Garamond + Cinzel
│   ├── favicon.svg     32×32 terracotta square with zellige star
│   ├── og.svg          1200×630 social card, midnight medina + copper glow
│   └── PROMPTS.md      Image generation prompts for all visual assets
├── robots.txt
├── sitemap.xml
├── SITE.md             Design rationale, palette, type, motion
└── BUILD_LOG.md        This file
```

## Design Decisions

1. **Layout archetype:** Immersive — chosen for the brand's rich visual identity and layered depth. Hero is full-bleed atmospheric dark with warm lantern-glow radial gradient, not a flat dark color.

2. **Fonts self-hosted:** Downloaded TTF from Google Fonts CDN (one-time fetch), converted to WOFF2 using `ttf2woff2` npm package. `@font-face` declarations in base.css with `font-display: swap`. No CDN links in deployed output.

3. **Hero visual headline:** Used `content.json` hero headline verbatim ("Your media. Your library. Your Phlix.") as the page's main h1. The brand's `tagline_primary` ("Every Frame, a Masterwork.") appears in the `<title>` and og:title for brand identity expression.

4. **No mascot used:** Brand kit's `mascot` (Amir the lantern) was intentionally not added as a UI element — brand kit §2 explicitly lists mascot as `null`-or-object; treating it as optional and decorative for the marketing site.

5. **Color rules strictly followed:**
   - Backgrounds: only `#140A04` (midnight medina) and `#200E06`/`#2A1208` (warm dark surfaces)
   - Primary CTA: only `#E8531A` (terracotta ember); used exactly once per screen
   - Accent limit: max two warm accents per view (terracotta + copper)
   - Never: cold blue, stark white, electric neon, gradients outside brand palette

6. **Zellige geometric divider:** Implemented as SVG `data:` URI background in CSS for the pitch-bullet list marks and decorative section elements — no raster assets required.

7. **Scroll reveal:** Implemented via `IntersectionObserver` (feature-detected, no-op fallback) gated behind `prefers-reduced-motion: no-preference`. Elements start invisible, translate down, fade in when entering viewport.

8. **Download page server requirement:** PHP 8.3+ shown in `.code-block` styled with warm dark surface and copper left border.

## Known Follow-ups

- **Real illustration:** SVG hero illustration could be replaced with a proper Moroccan Bazaar artisan illustration (see `img/PROMPTS.md`)
- **Lighthouse audit:** Full performance audit not yet run; fonts are self-hosted with `font-display: swap` which satisfies the self-hosting rule, but font subsetting to Latin-only would further reduce weight
- **Review loop:** Full adversarial review (Step 3) pending

## Deviations from new_site.md

None intentional. All 8 pages built to spec, all SEO/social/accessibility/meta requirements met, all tokens from `design_tokens` block used exactly as specified.
