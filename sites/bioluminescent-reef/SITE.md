# SITE.md — Bioluminescent Reef

## Concept & Vision

Bioluminescent Reef descends to the midnight zone — the crushing dark miles below the surface where sunlight has never reached, yet life blazes. Watching Phlix dressed in this identity feels like pressing your face to the glass of a deep-sea submersible as something impossible swims into view. Every glow is an organism; every dark space is a window into the abyss.

The atmosphere is **otherworldly, eerie, beautiful, and primal** — not horror, not cheerfulness, but the alien wonder of deep-sea footage. The hadal darkness is structural and load-bearing; the bioluminescent light is the only light in the world.

---

## Aesthetic Direction

**Theme:** Deep-sea bioluminescence — the midnight ocean where creatures manufacture their own cold light.

**Visual metaphor:** A submersible viewport into absolute darkness, broken only by living organisms. Content floats in hadal space like specimens suspended in the water column.

**Moodboard anchors:** Anglerfish lures glowing amber in total darkness, jellyfish bells pulsing aqua rings, siphonophores trailing violet fire, vampire squid bioluminescent displays, dinoflagellate blooms turning waves cold blue.

---

## Color Table

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Biolume Aqua | `#00E8C8` | Primary CTAs, active states, jellyfish glow |
| Secondary | Abyssal Violet | `#7700FF` | Secondary actions, highlights, violet creatures |
| Tertiary | Anglerfish Amber | `#FF7B00` | The lure — primary CTA only |
| Background | Hadal Darkness | `#010B14` | Default page background — never pure black |
| Surface | Abyssal Trench | `#020F1C` | Card and panel surfaces |
| Surface Alt | Midnight Zone | `#03142A` | Alternate surfaces, hover states |
| Text | Phosphor White | `#C8F0FF` | Primary body/headline — cold bioluminescent phosphor |
| Neutral | Deep Current | `#2A4860` | Muted UI chrome, dividers |
| Success | Symbiont Green | `#00D4A0` | Confirmations, completed states |
| Warning | Lure Flicker | `#FFB347` | Warnings, caution states |
| Error | Red Tide | `#CC1A4A` | Errors, destructive actions |
| Info | Pelagic Blue | `#0096D6` | Informational banners |
| Border | Deep Current Border | `#0D2A40` | Card borders, barely visible |
| Shadow | Biolume Glow Shadow | `rgba(0,232,200,0.15)` | Colored bioluminescent drop-glow |

---

## Typography Roles

| Role | Font | Weights | Notes |
|------|------|---------|-------|
| Headlines | Cormorant Garamond | 600, 700 | Dramatic gothic elegance, tight tracking (-0.02em) |
| Display | Raleway | 100, 200 | Cinematic oversized numerals, fluid negative space |
| Body | Inter | 400, 500 | Clean legibility against abyssal surfaces |
| UI | Inter | 400, 500, 600 | Buttons, labels, navigation, chips |
| Mono | JetBrains Mono | 400, 500 | Code, tokens, technical sonar readouts |
| Number | Raleway | 100, 200 | Stats, counters, depth-meter numerals |

**Typography rules applied:**
- Cormorant Garamond headlines always semibold or bold — never hairline
- Raleway display type uses thin/extralight (100–200) only
- Body copy (Inter) minimum 400 weight
- Headline tracking tight (-0.02em) — depth compresses things
- Left-aligned body copy for legibility in the dark

---

## Spatial System

Spacing scale (the only allowed steps): `4, 8, 12, 16, 24, 32, 48, 64, 96` px.

Corner radius scale: `6, 12, 20, 32, 999` px (sm/md/lg/xl/pill).

Max content width: **1400px** with generous abyssal negative space.

---

## Motion Philosophy

Motion is **fluid, drifting, pulsing, and slow** — creatures in zero-gravity salt water, not snappy UI animations.

**Easing:** `ease-in-out`, `cubic-bezier(0.25, 0.46, 0.45, 0.94)` — oceanic, never elastic/bouncy.

**Animation speed:** Slow (400–700ms for transitions).

**Signature animations:**
- Hero biolume pulse: slow radial bloom (6s period) on hero background gradient
- Lure pulse: anglerfish amber CTA glow animates at 2s period — the lure twitches in the dark
- Card hover: rise 4px with aqua box-shadow bloom — creature surfacing from the deep
- Scroll reveals: opacity + translateY drift entrance, 600ms ease-out

**Reduced motion:** All animations honor `prefers-reduced-motion: reduce` — replaced with opacity fades only.

---

## Visual Assets List

| Asset | Status | Notes |
|-------|--------|-------|
| `img/logo.svg` | SVG, generated | Jellyfish bell + Cormorant Garamond wordmark |
| `img/favicon.svg` | SVG, generated | Jellyfish bell in 32×32 hadal-darkness square |
| `img/og.svg` | SVG, generated | Social share card (1200×630) |
| Feature icons | Inline SVG, stroke-based | 7 icons (library, syncplay, transcode, shield, antenna, broadcast/dlna, puzzle, hub) |
| Hero background | CSS only | Radial gradient biolume bloom + violet underlayer |
| Particle drift | CSS only | Floating pseudo-element dots with `@keyframes drift` |

---

## Layout Archetype

**Immersive** — full-bleed bioluminescent hero moments with generous abyssal negative space, radial glow compositions, and layered translucent surfaces suggesting water column depth.

Key characteristics:
- Full-viewport hero sections with radial glow background effects
- Generous negative space (hadal darkness is structural)
- Layered translucent card surfaces suggesting depth planes
- Organic curved dividers and bioluminescent glow accent lines
- Single amber focal point (the lure) per screen

---

## Design Principles Applied

1. Darkness is the canvas — hadal darkness is structural, not absence
2. Bioluminescent glows feel biological: pulsing, organic, cold-spectrum
3. Curves and fluid motion reference marine biology, not UI convention
4. Abyssal violet and biolume aqua are the twin poles — never warm
5. Anglerfish amber is the lure — reserved for the single most important CTA
6. Depth is literal: layered translucent surfaces suggest water column pressure
7. Motion is slow, fluid, drifting — creatures in zero-gravity salt water
8. Restraint: one bioluminescent accent at a time reads as discovery, not chaos
