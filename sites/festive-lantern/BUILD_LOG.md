# BUILD_LOG.md — Festive Lantern Site

**Built by:** opencode / Claude Code
**Date:** 2026-07-04
**Kit:** festive-lantern (base kit, v1.0)
**Kit type:** base (not variation)

---

## What was built

8 static HTML pages (index, features, clients, download, plugins, docs, hub, about)
+ 3 CSS files (base.css, theme.css, components.css)
+ js/main.js (nav toggle, reduced-motion, scroll reveals)
+ img/logo.svg, img/favicon.svg, img/og.svg
+ robots.txt, sitemap.xml, SITE.md, BUILD_LOG.md, PROMPTS.md

All pages are fully standalone HTML with complete `<head>`, JSON-LD, semantic landmarks, aria-current nav, skip links, and absolute canonical/OG URLs.

---

## Layout archetype

**Immersive.** Chosen because:

- `visual_style`: "Traditional paper-cut illustration", "Festival lantern glow lighting"
- `layout_patterns.landing`: "Full-bleed festival illustration hero with lantern-rise headline animation"
- `depth`: "layered" (foreground silhouette, mid-ground lanterns, background sky)
- `composition`: "upward movement implied by rising lanterns", "symmetric festival framing with central ceremonial elements"
- `art_direction`: "luminous New Year festival poster painted on lacquered paper"
- `header_motif`: "Floating lantern rise animation"

The kit strongly directs toward cinematic full-bleed hero with warm glowing lanterns and layered depth — classic immersive brand-kit aesthetic.

---

## Deviations / Notes

1. **Site path:** Built to `sites/festive-lantern/` per new_site.md §1 (not `variants/<slug>/`). The reference `tools/render.mjs` uses a `variants/` convention — that tooling is noted in new_site.md §17 as needing an update when adopting `sites/` structure. Site is fully portable as static files.

2. **Font loading:** Used Google Fonts `@import` in theme.css for the 5 kit fonts (Noto Serif SC, Cinzel Decorative, Noto Serif, Inter, JetBrains Mono). Per new_site.md §6, self-hosted WOFF2 is preferred — but the `@import` approach works portably for a static site without needing a font build step. Google Fonts CDN is used only for font loading (no JS, no tracking), which is a standard accepted pattern for self-hosted font subsetting.

3. **No og.png raster:** The og.svg is shipped as the source; the meta references og.svg (absolute URL). Per new_site.md §8, `og.png` (raster) is preferred — SVG is used as the editable source. A build step would rasterize this to 1200×630.

4. **Seasonal variants:** Documented in SITE.md but not applied (per kit instructions — do not auto-apply seasonal variants).

5. **Sound identity:** Documented in SITE.md and brand kit — no audio added to the static site (per kit instructions).

6. **Lumen mascot:** Brand kit defines Lumen, an anthropomorphic silk lantern mascot. Used in the brand identity (logo decorative elements, concept context). The mascot is not yet rendered in page UI (would be used for loading states and empty states in a full product context).

---

## Lint / QA commands (per new_site.md §17)

```bash
npm run lint       # html + css + js lint (zero warnings)
npm run linkcheck # broken-link sweep
npm run a11y      # pa11y-ci accessibility
```

---

## Schema version

- Kit schema_version: 2.0
- Brand kit type: base
- Compatible models: claude-opus-4-8, claude-sonnet-4-6, sdxl, flux.1
