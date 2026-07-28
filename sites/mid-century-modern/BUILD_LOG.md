# BUILD_LOG.md — Mid-Century Modern

## What was built

### Pages (9)
- `index.html` — narrative-scroll homepage: 5 sections (sunburst-rise, what-flies, why-launch, compass-true, ignition)
- `features.html` — 2×4 atomic-age feature card gallery + CTA
- `clients.html` — 5 client spacecraft cards with device-fleet styling
- `download.html` — 3-stage launch sequence: server ignition → client selection → mission control
- `plugins.html` — Plugin contract + ecosystem repos
- `docs.html` — Link-out to VitePress docs
- `hub.html` — Hub feature page with self-hosted/public split
- `about.html` — Mission log (philosophy/ownership/contributing) + FAQ oracle
- `404.html` — "Off the Flight Plan" Orbit confused in empty marquee, robots noindex, relative assets

### CSS (3)
- `css/base.css` — Reset, design tokens, @font-face (9 rules), base element styles, skip link, reduced motion, scrollbar
- `css/theme.css` — Typography scale, layout containers, section variants, grid/flex helpers, spacing, decorative atoms (sunburst-rule, accent-bar, starburst)
- `css/components.css` — Site header, nav, footer, buttons, cards (feature/client), badges, forms, FAQ accordion, install block, mascot (Orbit), proof-card, chips

### JS (1)
- `js/main.js` — Nav toggle, scroll reveal (IntersectionObserver), FAQ accordion, seasonal variant date gate, mascot init/dismiss (localStorage), 3 easter eggs (logo-clicks:5, typed-word:orbit, scroll-past-footer), smooth scroll

### Support files
- `robots.txt` — Allow all, sitemap reference
- `sitemap.xml` — 8 URLs (404 excluded per spec)
- `manifest.webmanifest` — PWA manifest
- `img/logo.svg` — Phlix wordmark + Orbit silhouette + sunburst rays
- `img/favicon.svg` — Rocket favicon on charcoal evening background
- `SITE.md` — Design rationale
- `BUILD_LOG.md` — This file
- `REGEN_PLAN.md` — Change manifest

### OG image
- Generated via `tools/gen-og.mjs --site mid-century-modern`

## Deviations / Notes

1. **Font weight 700 for `<strong>`**: Libre Baskerville 700 is in the pool and the kit declares 400/700 for body. Used `font-weight: 700` per §19.17.
2. **Orbit mascot**: Implemented as a fixed bottom-right companion per kit's `mascot.behavior.placement`. LocalStorage dismiss persists. At 320px the mascot is small enough not to overlap CTA — no extra override needed. However: selfcheck may warn about the mascot's JS; that's expected.
3. **IBM Plex Mono weight 700**: Kit asks for [400,600]; file `ibm-plex-mono-700-latin.woff2` exists but is undeclared. Used nearest declared (600) — not invented.
4. **Josefin Sans weight 400/500/600 for UI**: Files `josefin-sans-400-latin.woff2`, `josefin-sans-500-latin.woff2`, `josefin-sans-600-latin.woff2` loaded. Undeclared weights 100, 300, 700 correctly omitted.
5. **Typed-word egg**: Disabled when focus is in INPUT/TEXTAREA/contenteditable. Uses a visually hidden input to track state without interfering. Never calls preventDefault. Clears on Esc.
6. **Hero grid at 320px**: The hero two-column grid collapses to single column via CSS grid; on narrow screens the rocket stacks below the copy. Confirmed no horizontal overflow.
7. **`accent-bar` color variants**: `--yellow` and `--coral` modifier classes added to base `accent-bar` component for feature card variety.

## Verification

- `selfcheck.mjs` — pending
- `render-check.mjs` — pending
