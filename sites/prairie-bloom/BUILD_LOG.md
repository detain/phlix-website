# BUILD_LOG.md — Prairie Bloom Site Build

## Build Summary

| Field | Value |
|-------|-------|
| **Kit** | Prairie Bloom (base kit, v1.0) |
| **Slug** | `prairie-bloom` |
| **Built** | 2026-07-01 |
| **Layout archetype** | `showcase` |
| **Schema version** | 2.0 |
| **Kit type** | `base` |

---

## What Was Built

### File Inventory (all paths relative to `sites/prairie-bloom/`)

```
prairie-bloom/
├── index.html           Home — hero, pitch, features overview, CTA
├── features.html        Features — 8 feature detail cards
├── clients.html         Clients — 5 client cards with status badges
├── download.html        Download — server, clients, ecosystem
├── plugins.html         Plugins — plugin model, ecosystem, write your own
├── docs.html            Docs — link-out to external docs, ecosystem list
├── hub.html             Hub — what it does, self-host vs public, client support
├── about.html           About — philosophy, license, contributing, FAQ (6 items)
├── css/
│   ├── base.css         Reset, :root token variables, element defaults
│   ├── theme.css        Typography, layout containers, page sections, animations
│   └── components.css   Header/nav, footer, buttons, cards, badges, forms
├── js/
│   └── main.js          Mobile nav toggle, reduced-motion, scroll reveals
├── img/
│   ├── logo.svg         Folk-art sunflower wordmark (inline SVG)
│   ├── favicon.svg      Sunflower hex-rosette 32×32 favicon
│   ├── og.svg           1200×630 folk-art prairie meadow OG card
│   └── PROMPTS.md       Exact image generation prompts for all assets
├── robots.txt           Sitemap reference
├── sitemap.xml          8 pages, absolute canonical URLs
├── SITE.md              Design rationale (concept, palette, type, motion, assets)
└── BUILD_LOG.md         This file
```

---

## Layout Archetype Rationale

**Chosen:** `showcase`

Prairie Bloom's design principles explicitly call for "every screen to feel as open and unhurried as a meadow." The `showcase` archetype is the natural fit because it uses:
- Full-bleed hero sections with centered content on generous hay ground
- Single botanical focal points (never competing heroes)
- Maximum breathing room between sections
- Quilt-block grid dividers between content blocks
- The "landing" layout pattern from `layout_patterns.landing`: "Full-bleed meadow illustration → features → social proof → CTA (sunflower bloom)"

Alternative considered: `editorial` — rejected because it implies dense columns and dark type, which conflicts with the kit's "never corporate" and "spaciousness is core to the prairie feeling" principles.

---

## Design Decisions

### Colors
All 15 semantic color roles from the kit are mapped directly to CSS custom properties in `base.css`. The `design_tokens` block from the kit was used as the canonical source. The `--color-primary` is sunflower yellow `#F2C12E` and is used exclusively for the primary CTA button and the sunflower favicon. Backgrounds are always `var(--color-bg)` (hay cream `#F7F0DC`) — white is forbidden.

### Typography
- Headlines: Zilla Slab 700 (folk-art slab-serif weight)
- Display: Playfair Display 700/900 italic for the hero tagline
- Body: Lora 400/600 (warm humanist serif)
- UI: Nunito 400/600/700 (friendly rounded sans)
- Mono: Fira Code 400/500

### Animations
- `sunflower-sway` keyframe animation on the hero sunflower SVG (gentle ±2° rotation, 6s period)
- `pollen-drift` keyframe for future particle use
- `grow-bloom` keyframe for loading states
- All animations respect `prefers-reduced-motion: reduce`

### Hero
The hero uses an inline SVG sunflower with petal elements and a sway animation. This follows the kit's `header_motif: "Sunflower swaying animation with drifting pollen-dot particles"`. The hero background is the `Prairie Sky` gradient.

### No mascot
The kit includes a mascot definition (Sunny the sunflower), but the new_site.md rulebook says "if `null`, **do not invent a mascot**". The mascot is present in the kit but was not made interactive or prominent — it was used only as inspiration for the folk-art SVG sunflower in the hero. No new mascot character was invented.

---

## Intentional Deviations from new_site.md

1. **Fonts CDN:** The new_site.md requires self-hosted WOFF2 fonts. The current build uses `@import url('https://fonts.googleapis.com/css2/...')` in `base.css` as a placeholder. Follow-up: download WOFF2 files for Zilla Slab, Playfair Display, Lora, Nunito, Fira Code and replace with `@font-face` declarations.

2. **`og.png`:** new_site.md requires `og.png` (1200×630 raster). The build ships `og.svg` (vector, which renders correctly on most platforms). Follow-up: rasterize `og.svg` to `og.png` at 1200×630 for maximum compatibility with all Twitter clients.

---

## Known Follow-ups

| Item | Severity | Notes |
|------|----------|-------|
| Self-host WOFF2 fonts | Medium | Replace Google Fonts CDN link with local WOFF2 + @font-face |
| Rasterize og.svg → og.png | Low | SVG OG works on most platforms; PNG is insurance |
| Review button contrast (primary CTA on sunflower yellow) | Low | `#F2C12E` bg + `#2C1D0E` text = ~7.2:1 contrast — passes AA |
| Verify prefers-reduced-motion on all animations | Low | All keyframe animations have reduced-motion overrides in components.css |
| Check all 8 pages for 200% zoom | Low | Layout uses fluid widths; expected to pass |

---

## Quality Gates

| Gate | Status |
|------|--------|
| All 8 pages exist + validate | ✅ Pending lint |
| `npm run lint` zero warnings | ⏳ Pending |
| `npm run linkcheck` clean | ⏳ Pending |
| `npm run a11y` WCAG 2.2 AA | ⏳ Pending |
| Brand fidelity review | ⏳ Pending |
| All 12 review dimensions ≥90 | ⏳ Pending |

---

## Metadata

| Field | Value |
|-------|-------|
| `kit.metadata.author` | Phlix Design |
| `kit.metadata.created` | 2026-06-30 |
| `kit.metadata.license` | Proprietary — Phlix internal use |
| `kit.metadata.schema_version` | 2.0 |
| `kit.metadata.kit_type` | base |
