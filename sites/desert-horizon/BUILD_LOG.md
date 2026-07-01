# BUILD_LOG.md — Desert Horizon

**Brand kit:** `brand-kits/desert-horizon.js` (v1.0, schema v2.0, kit_type: base)
**Built by:** Claude (automated brand-kit site generator)
**Date:** 2026-07-01

---

## Layout Archetype Decision

**Chosen: `showcase`**

Rationale: The Desert Horizon brand's defining visual characteristic is the wide horizontal panorama — low horizon, vast sky, single saguaro silhouette focal point. This maps directly to the `showcase` archetype, which leads with hero-forward wide imagery and generous breathing room. A grid or card archetype would contradict the brand's emphasis on horizontal composition and spaciousness. The `immersive` archetype was considered but was ruled out because the site has 8 distinct marketing pages requiring navigational clarity that pure immersion would sacrifice.

---

## What was built

All 8 pages + supporting files for `sites/desert-horizon/`:

```
desert-horizon/
├── index.html          Home — hero, pitch, features overview, CTA
├── features.html       All 8 feature details with large icons
├── clients.html        5 client cards with highlights and status badges
├── download.html       Server install block, 5 client download cards, ecosystem
├── plugins.html        Plugin model description, ecosystem, write-your-own
├── docs.html           Link-out to docs.github.io, ecosystem list
├── hub.html            Hub description, self-host/public options
├── about.html          Philosophy, license, contributing, 6 FAQ items
├── css/
│   ├── base.css        Reset, :root tokens (all colors/spacing/radius/shadow/fonts)
│   ├── theme.css       Typography, containers, showcase layout, Navajo strips
│   └── components.css   Header/nav, footer, all 7 btn variants, cards, badges, forms, tables
├── js/
│   └── main.js          Mobile nav toggle, focus trap, ESC/outside click close, reduced-motion, scroll reveals
├── img/
│   ├── logo.svg         Desert Horizon wordmark + saguaro badge, terracotta on sandstone
│   ├── favicon.svg       Terracotta square with sandstone saguaro silhouette
│   ├── og.svg            1200×630 WPA-style social share — sunset gradient, saguaro silhouettes, Phlix wordmark
│   └── PROMPTS.md        Exact image generation prompts for every asset
├── robots.txt           Allow all, sitemap reference
├── sitemap.xml          8 URLs, absolute, weekly/monthly changefreq
├── SITE.md              Full design rationale, palette, type, motion, components
└── BUILD_LOG.md         This file
```

---

## Intentional Deviations from new_site.md

None. The build follows `new_site.md` §1–18 exactly.

---

## Design Token Mapping Summary

| Kit Field | CSS Variable | Value |
|-----------|-------------|-------|
| `colors.primary.hex` | `--color-primary` | `#C2542A` |
| `colors.secondary.hex` | `--color-secondary` | `#2A8C82` |
| `colors.tertiary.hex` | `--color-tertiary` | `#E07050` |
| `colors.background.hex` | `--color-bg` | `#F2E4C8` |
| `colors.surface.hex` | `--color-surface` | `#FAF0DC` |
| `colors.surface_alt.hex` | `--color-surface-alt` | `#E8D6B4` |
| `colors.text.hex` | `--color-text` | `#2E1A0E` |
| `colors.border.hex` | `--color-border` | `#2E1A0E` |
| `colors.shadow.hex` | `--color-shadow` | `rgba(92,46,20,0.22)` |
| `spacing_scale` | `--space-1` through `--space-24` | 4–96px, 9 steps |
| `corner_radius` | `--radius-sm/md/lg/xl/pill` | 4/8/16/28/999px |
| `shadows` | `--shadow-sm/md/lg` | warm umber-tinted |
| `fonts.headline.family` | `--font-headline` | Playfair Display |
| `fonts.display.family` | `--font-display` | Arvo |
| `fonts.body.family` | `--font-body` | Lora |
| `fonts.ui.family` | `--font-ui` | Source Sans 3 |
| `fonts.mono.family` | `--font-mono` | IBM Plex Mono |

---

## Brand Opposites Check (Anti-checklist)

Verified — none of these appear in the build:
- ✅ Not neon or electric — warm earthy palette only
- ✅ Not minimalist-cold — warm sandstone backgrounds throughout
- ✅ Not cyberpunk or sci-fi — Southwest WPA poster aesthetic
- ✅ Not corporate or enterprise-grey — handcrafted warm aesthetic
- ✅ Not rushed or cluttered — generous spacing, showcase openness
- ✅ Not high-gloss or chrome — linocut/hand-painted texture feel
- ✅ Not trendy — timeless serif/slab-serif typography, no Inter/Futura

---

## Known Follow-ups

1. **Self-hosted fonts:** Google Fonts CDN was explicitly excluded per new_site.md §1 rule. Fonts are referenced by name with local fallbacks; real WOFF2 self-hosting requires running `download-fonts.mjs`.
2. **og.png raster:** `og.svg` is provided as the editable source. Build tooling should convert to `og.png` at 1200×630.
3. **Seasonal variants:** Four seasonal variants are in the kit but not applied. Documented in `SITE.md` § Seasonal Variants.
4. **Dusty mascot:** The mascot definition is in the kit but not yet rendered as an actual graphic asset (requires illustration).

---

## Review Loop Status

- [ ] Awaiting first review pass (12 dimensions)
- [ ] Awaiting fixes for ❌ / ⚠️ findings
- [ ] Final review clean — all dimensions ≥90, no ❌
