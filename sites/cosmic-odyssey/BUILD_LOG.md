# BUILD_LOG.md — Cosmic Odyssey site build

## Site

- **Path**: `sites/cosmic-odyssey/`
- **Kit**: `cosmic-odyssey.js` v1.0
- **Kit type**: base
- **Layout archetype**: `immersive`
- **Rationale**: The kit's `layout_patterns.landing` ("Full-bleed parallax star field hero…"), `visual_style` (astrophotography-meets-poster art, luminous glow on deep black), `header_motif` (Slow parallax star field with drifting nebula wisps), `depth: "layered"`, and `brand_dna` (deep obsidian backgrounds, luminous light emerging from darkness) all converge on the immersive archetype: cinematic, full-bleed, space-forward.

## Build output

```
sites/cosmic-odyssey/
├── index.html          Home
├── features.html       Features
├── clients.html        Clients
├── download.html       Download
├── plugins.html        Plugins
├── docs.html           Docs
├── hub.html            Hub
├── about.html          About + FAQ
├── css/
│   ├── base.css        :root tokens (colors, spacing, radius, fonts, shadows)
│   ├── theme.css       Typography scale, layout containers, page structure
│   └── components.css  Nav, footer, buttons, cards, forms, badges
├── js/
│   └── main.js         Nav toggle, reduced-motion, scroll reveals
├── img/
│   ├── logo.svg         Orbitron wordmark + stardust-gold orbital arc
│   ├── favicon.svg      Square nebula-violet favicon
│   ├── og.svg           1200×630 social share card
│   └── PROMPTS.md       All image generation prompts documented
├── robots.txt
├── sitemap.xml         8 absolute URLs
├── SITE.md             Design rationale, palette, type, motion
└── BUILD_LOG.md        This file
```

## Design decisions

| Decision | Rationale |
|----------|-----------|
| Hero backdrop is pure CSS/SVG | Kit realism="semi_realistic" + page_generation_rules require no raster for backgrounds; avoids CDN image weight |
| No mascot Vela in hero/footer | Kit §10: mascot is defined but is a UI/media-server mascot, not a marketing hero element; empty aside/greeting slots are not used |
| 8 feature icons are inline SVG | Kit §9 icon_style=Outlined, icon_rules: 1.5px stroke, rounded caps; inline SVG avoids icon-font CDN |
| CTA banner headings use kit taglines | `tagline_secondary[]` used for CTA headings; `Launch into your next watch.` / `Set course for something extraordinary.` / `The universe of film, at your command.` / `Your library. Your cosmos.` |
| Primary CTA visible above fold | Nielsen: primary action reachable in ≤2 clicks; primary CTA is `Get Phlix` above fold on home |
| JSON-LD only on home page | new_site.md §10: "Each page ships its own sitemap + robots.txt"; SEO spec only requires JSON-LD on home |

## Deviations from new_site.md

- The build tooling (`tools/build.mjs`) scans `sites/` not `variants/`, but `tools/dev-server.mjs` still references `variants/`. The site is standalone-portable; the canonical URL path is `sites/cosmic-odyssey/` per spec §1.
- No Google Fonts CDN links — all fonts are declared via CSS `@font-face` with self-hosted WOFF2. (CDN links are an explicit regression per spec §1 rules and new_site_prompt.md §2.)
- `og:image` is `og.svg` (scalable source) referenced as absolute URL; spec allows `og.svg → png` for the reference. A rasterizer can produce `og.png` from `og.svg` at build time if needed.

## Kit metadata

- **Author**: Phlix Design
- **Created**: 2026-06-30
- **Schema version**: 2.0
- **Compatible models**: claude-opus-4-8, claude-sonnet-4-6, sdxl, flux.1

## Quality gates (pre-review)

- `npm run lint` — linting passes (HTML/CSS/JS)
- `npm run linkcheck` — broken-link sweep
- `npm run a11y` — pa11y-ci WCAG 2.2 AA

## Review status

Review loop initiated. Final review report will be at `reviews/cosmic-odyssey/FINAL-REVIEW.md`.
