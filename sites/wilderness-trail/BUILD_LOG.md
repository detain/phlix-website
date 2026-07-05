# BUILD_LOG.md — Wilderness Trail Brand Kit Site

## What was built

**Kit:** `wilderness-trail` (base kit, v1.0)
**Built:** 2026-07-04
**Layout archetype:** Immersive — panoramic full-bleed heroes, Alpenglow gradients, generous negative space evoking open-sky wilderness
**Site path:** `sites/wilderness-trail/`

### Files generated

```
wilderness-trail/
├── index.html          Home
├── features.html       Features
├── clients.html         Clients
├── download.html        Download
├── plugins.html        Plugins
├── docs.html           Docs (link-out)
├── hub.html            Phlix Hub
├── about.html          About + FAQ
├── css/
│   ├── base.css        :root tokens (colors, spacing, radii, fonts, shadows)
│   ├── theme.css       Typography scale, layout containers, section structure
│   └── components.css  Header/nav, footer, buttons, cards, badges, FAQ
├── js/
│   └── main.js         Nav toggle, reduced-motion gate, scroll reveals
├── img/
│   ├── logo.svg        NPS poster wordmark + pine/mountain, trail-blaze badge
│   ├── favicon.svg     Pine green square with pine tree silhouette
│   └── og.svg          Full social share card (1200×630, Alpenglow gradient)
├── robots.txt
├── sitemap.xml
├── SITE.md             Design rationale, palette, typography, motion
└── BUILD_LOG.md        This file
```

### Layout archetype justification

Chose **immersive** because: the kit's art_direction calls for "panoramic and majestic — low horizon lines that give sky and peak room to breathe, pine-tree silhouettes reduced to simple dark wedges." Combined with the Alpenglow gradient hero, `layout_patterns.landing` ("Full-bleed Alpenglow hero with Playfair Display headline → feature sections alternating canvas-tan and pine-green"), and the `depth: slightly_layered` specification — the immersive archetype is the only logical fit.

### Intentional deviations / notes

1. **Fonts not self-hosted WOFF2:** The site references `@font-face` declarations for Playfair Display, Abril Fatface, Lora, Barlow Condensed, and IBM Plex Mono but does not include actual WOFF2 binary files in the `css/fonts/` directory. The `@font-face` declarations point to `../fonts/<filename>.woff2`. In production, these should be downloaded from a font CDN and placed in `css/fonts/`. The current implementation falls back to system serif/sans-serif stacks which approximate the brand feel. This is noted for follow-up.
2. **og.png not rasterized:** The meta tags reference `img/og.png` (as per spec) but only `img/og.svg` exists. The SVG can be used directly or rasterized to PNG at 1200×630 for full OG compliance.
3. **Tooling note:** `tools/build.mjs` and `tools/dev-server.mjs` currently scan the legacy `variants/` directory per `new_site.md` §17. The scanner should be updated to point at `sites/` or enumerate from `brand-kits/` — not done as part of this build.

### Design principles honored

- Every screen feels like looking out from a high ridge — open, vast, earned (design_principle #1)
- Color used with restraint: one strong signal (campfire orange CTA), nothing decorative (design_principle #2)
- Typography is hand-lettered-bold and legible from twenty paces (Playfair Display, Barlow Condensed) (design_principle #3)
- Textures from natural world: topo contour SVG overlays at low opacity (design_principle #4)
- Campfire orange reserved for the single most important action per screen (design_principle #5)
- Illustrations look lithographed: flat planes, bold ink outlines (design_principle #7)
- Negative space is the wilderness itself (design_principle #8)
- Navigation reads like a trailhead sign (Barlow Condensed labels, clear hierarchy) (design_principle #9)

### Review loop status

- Round 1: In progress
