# BUILD_LOG.md — Speakeasy Gold

## What was built

Full 8-page static brand-kit site for `speakeasy-gold` at `sites/speakeasy-gold/`.

## Output location
```
/home/sites/phlix/phlix-website/sites/speakeasy-gold/
```

## Files generated

```
index.html          Home page
features.html       Features page
clients.html        Clients page
download.html       Download page
plugins.html        Plugins page
docs.html           Docs page
hub.html            Phlix Hub page
about.html          About + FAQ page
css/base.css        Design tokens (:root CSS variables)
css/theme.css       Typography + layout + hero + sections
css/components.css Header/nav, footer, buttons, cards, badges
js/main.js          Nav toggle, reduced-motion, scroll reveals
img/logo.svg        Art Deco stepped-arch wordmark badge
img/favicon.svg     Art Deco hexagonal badge
img/og.svg          1200×630 social share image (SVG)
img/PROMPTS.md      Exact image generation prompts
robots.txt          References sitemap.xml
sitemap.xml         All 8 pages, absolute URLs
SITE.md             Design rationale document
BUILD_LOG.md        This file
```

## Layout archetype

**Immersive** — full-bleed hero with gilded-candelabra radial glow, midnight black ground, Art Deco geometric sunburst pattern overlay.

Chosen because: visual_style=["Art Deco geometric illustration", "Gilded line engraving", "Lacquered high-contrast", "Warm amber glow", "Opulent surface texture"]; layout_patterns.landing="Full-bleed hero (Gilda silhouette + sunburst + champagne-gold headline) → features in card grid → social proof → primary CTA."

## Design decisions

1. **Fonts:** Used Google Fonts CDN URLs in @font-face for development. For production, replace with self-hosted WOFF2 files in `css/fonts/`.
2. **Hero sunburst:** Pure CSS (repeating conic-gradient) — no external image dependency.
3. **Herringbone pattern:** Pure CSS (dual repeating linear-gradient) at 3% opacity.
4. **Feature icons:** Inline SVG, Art Deco geometric (45° angles, square caps per icon_rules).
5. **No mascot used:** Kit's `mascot` field describes Gilda but instructs not to invent a mascot; site respects this.
6. **Gilda silhouette:** Replaced with CSS sunburst pattern per design_principles, honoring the spirit without inventing imagery.
7. **Seasonal variants:** Documented in SITE.md but not applied.
8. **Sound identity:** Recorded as brand context only in SITE.md; no audio added to static site.

## Deviations from new_site.md

- Google Fonts CDN links used in @font-face (production requires self-hosted WOFF2 files in css/fonts/)
- No JSON-LD on home page (minor; can be added if tooling supports it)
- Tooling (tools/build.mjs, tools/dev-server.mjs) references legacy `variants/` dir; noted for future fix

## Review loop

- Run adversarial review across all 12 dimensions per `new_site_prompt.md` §3
- Iterate until all dimensions ≥90 and zero ❌
- Write `reviews/speakeasy-gold/FINAL-REVIEW.md`

## Kit metadata

- kit_type: base
- schema_version: 2.0
- license: Proprietary — Phlix internal use
- author: Phlix Design
- created/updated: 2026-06-30
