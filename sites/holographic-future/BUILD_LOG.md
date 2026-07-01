# BUILD LOG — Holographic Future Brand Kit Site

## What was built

**Site**: `sites/holographic-future/`
**Kit**: `phlix-website/brand-kits/holographic-future.js` (base kit, kit_type: "base")
**Version**: 1.0
**Generated**: 2026-07-01

## Files created

```
sites/holographic-future/
├── index.html          Home page
├── features.html       Features detail page
├── clients.html        Clients/ecosystem page
├── download.html       Download + requirements page
├── plugins.html        Plugin model page
├── docs.html           Documentation link-out page
├── hub.html            Phlix Hub page
├── about.html          About + FAQ page
├── css/
│   ├── base.css        Reset + CSS custom properties (design tokens)
│   ├── theme.css       Typography + layout + section structures
│   └── components.css  Header/nav, footer, buttons, cards, badges, forms, icons
├── js/
│   └── main.js         Nav toggle, reduced-motion, scroll reveals
├── img/
│   ├── logo.svg        Orbitron wordmark + prism mark lockup
│   ├── favicon.svg     32x32 electric blue prism mark
│   ├── og.svg          1200x630 social share card
│   └── PROMPTS.md      Image generation prompt library
├── robots.txt          References sitemap
├── sitemap.xml         8 URLs, absolute canonical URLs
├── SITE.md             Design rationale document
└── BUILD_LOG.md        This file
```

## Layout Archetype

**Immersive** — Selected because the holographic aesthetic requires layered depth with floating glassmorphism panels. The prismatic light-dispersion hero animation, translucent card surfaces, and midnight backgrounds with spectral glows are all structural to the brand's visual vocabulary, not decorative.

## Intentional Design Decisions

1. **Dark mode as canonical**: The kit's visual language is built around midnight surfaces and luminous depth. Light mode support is available via `--color-bg-light` token but dark is the primary rendering.
2. **Spectrum sweep animation**: The hero `hero-spectrum-sweep` div creates the prismatic light-dispersion animation described in `header_motif`. It animates at 8s per cycle with a diagonal path.
3. **Glassmorphism cards**: All `.card`, `.feature-card`, `.client-card`, `.download-card` use `backdrop-filter: blur()` + semi-transparent backgrounds per the kit's `cards` spec.
4. **No mascot**: Despite the kit having a mascot definition (Lux), the site does not include mascot artwork as it would require raster image generation.
5. **Inline SVG icons**: The 7 feature icons are inline SVGs with 1.5px stroke, geometric style, electric blue color — matching the kit's `icon_style` spec.
6. **Reduced motion fully implemented**: The `main.js` script and CSS `@media (prefers-reduced-motion: reduce)` completely disable all shimmer, spectrum, and scroll animations.

## Deviation from new_site.md

- No `npm run build` lint step performed yet (pending npm install + tooling check)
- JSON-LD only on index.html per spec

## Known follow-ups

- Run `npm install && npm run lint && npm run linkcheck && npm run a11y` to validate
- Review loop required before final sign-off
- If tooling points at `variants/` instead of `sites/`, update `tools/build.mjs` and `tools/dev-server.mjs` accordingly
