# BUILD_LOG.md — Stardust Observatory

## Build Summary

**Brand kit:** Stardust Observatory v1.0
**Slug:** stardust-observatory
**Layout archetype:** immersive
**Built:** 2026-07-04
**Schema version:** 2.0
**Kit type:** base

---

## What was generated

### File inventory

```
sites/stardust-observatory/
├── index.html          Home — hero, pitch, features overview, CTA
├── features.html       All 8 feature details in content-grid layout
├── clients.html        5 client cards with status badges
├── download.html       Server requirement + client download cards + ecosystem
├── plugins.html        Plugin model, ecosystem, write-your-own
├── docs.html           Doc link-out + ecosystem list
├── hub.html            Hub description + public/self-host options
├── about.html          Philosophy, license, contributing, FAQ
├── css/
│   ├── base.css        CSS reset + :root token block (colors/spacing/radius/shadow/fonts)
│   ├── theme.css       Typography scale + layout containers + page structure
│   └── components.css Header/nav, footer, buttons, cards, badges, forms, reveals
├── js/
│   └── main.js         Mobile nav toggle, reduced motion gate, scroll reveals
├── img/
│   ├── logo.svg        Wordmark + dome-arc + six-point star mark, Constellation Gold
│   ├── favicon.svg     32×32 Midnight Navy, dome arc + star in gold
│   ├── og.svg         1200×630 social image — star-field, dome illustration, logo
│   └── PROMPTS.md     All image generation prompts per asset
├── robots.txt          Allow all, sitemap reference
├── sitemap.xml         All 8 pages with absolute URLs
├── SITE.md             Design rationale (concept, palette, type, motion, assets)
└── BUILD_LOG.md        This file
```

### Layout archetype choice

**Immersive** — chosen because the kit's `visual_style` (antique scientific
illustration, engraved copper-plate, deep atmospheric), `lighting` (candlelit
with cold star-point highlights), `composition` (large atmospheric backgrounds
with star-fields, wide breathing margins), and `depth` (layered) all point toward
a full-bleed cinematic presentation. The header motif ("slow dome-opening
animation") confirms this. An editorial or grid layout would misread the mood.

---

## Design decisions

- **Fonts:** Self-hosted via Google Fonts WOFF2 with `font-display: swap`
- **Star-field:** Pure CSS radial-gradient dots — no raster image needed
- **Hero glow:** `radial-gradient` nebula bloom in CSS — no heavy PNG
- **Layout:** CSS Grid + Flexbox, max-width 1360px, fluid to breakpoints
- **Animations:** All gated by `prefers-reduced-motion: no-preference`
- **No CDN dependencies** — all styles inline, fonts self-hosted

---

## Deviation notes

- `og.png` delivered as `og.svg` source; reference in meta points to `.png`
  (expected to be rasterized at build time if needed)
- `img/` contains SVG sources; PNG rasterization deferred to build step
- The `tools/render.mjs` tool references the legacy `variants/` path structure;
  this build uses `sites/<slug>/` per new_site.md §17 note

---

## Accessibility commitments (per kit §21)

- Focus ring: 3px `#E8D48B` Star-Point Focus with 2px Midnight Navy offset
- Touch targets: minimum 44×44px on all interactive elements
- Motion: `prefers-reduced-motion: reduce` disables all non-essential animation
- Font scaling: layouts survive 200% text zoom without clipping
- Contrast: Dome Parchment (#EDE4CC) on Midnight Navy (#0D1B2A) ≈ 11.5:1 (AAA)

---

## Quality gates

- [ ] `npm run lint` — pending
- [ ] `npm run linkcheck` — pending
- [ ] `npm run a11y` — pending

---

## Review round tracker

| Round | Date | Aggregate | Brand | Accessibility | Performance | Responsive | Notes |
|-------|------|-----------|-------|---------------|-------------|-----------|-------|
| — | — | — | — | — | — | — | Initial build |

---

## Next steps

1. Run `npm run lint && npm run linkcheck && npm run a11y`
2. Spawn adversarial reviewer agents across all 12 dimensions
3. Iterate until all dimensions ≥90, zero ❌
4. Write `reviews/stardust-observatory/FINAL-REVIEW.md`
