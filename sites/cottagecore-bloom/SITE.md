# SITE.md — Cottagecore Bloom

## Concept & Vision

Cottagecore Bloom is the warmth of a country kitchen window in late June — sunlight through hand-stitched curtains, a jam jar stuffed with foxgloves and sweet peas on the sill, the hum of a bumble bee in the lavender outside. The site should feel like stepping through a garden gate and being welcomed by name. Every page breathes. Nothing is urgent, nothing is stark.

The experience archetype is **narrative-scroll** — a story-first homepage with six sections that carry the visitor from the garden gate through to a conversion CTA. The layout adapts the cottage garden metaphor structurally: the hero is the gate opening, the pitch is garden signposts along a path, features are seed catalog entries, clients are guest rooms, proof is a keeper's placard, and the CTA is the planting bed.

## Aesthetic Direction

English cottagecore with Edwardian botanical illustration. Warm ivory ground, soft watercolour washes of Garden Rose, Sage Green, and Lavender Mist. Generous linen-white space that reads as garden air, not emptiness. Botanical border and motif accents frame sections. Motion is petal-slow — a gentle drift, never urgent. The overall impression should be *abundant warmth*, not manicured perfection.

## Color Palette

### Core Tokens
| Token | Name | Hex | Usage |
|-------|------|-----|-------|
| `--color-primary` | Garden Rose | `#C8556A` | Primary CTAs, active states, mascot |
| `--color-primary-safe` | Garden Rose (small text) | `#ba4f63` | WCAG 4.5:1+ small text on ivory (#C8556A at 4.02:1 fails small, safe passes) |
| `--color-secondary` | Sage Green | `#7A9E6B` | Secondary actions, links, tags |
| `--color-secondary-safe` | Sage Green (small text) | `#5e7a52` | WCAG 4.5:1+ small text on ivory (#7A9E6B at 2.88:1 fails, safe passes) |
| `--color-tertiary` | Lavender Mist | `#8B7AB5` | Badges, tertiary accents |
| `--color-bg` | Warm Ivory | `#FFF8F2` | Page background — never cold white |
| `--color-surface` | Garden Cream | `#FFF3E8` | Card/panel surfaces |
| `--color-surface-alt` | Butter Soft | `#FDEEDE` | Alternate surfaces, hover tints |
| `--color-text` | Bark Brown | `#2A1A10` | All body/headline text — 15.92:1 on ivory |
| `--color-neutral` | Warm Taupe | `#B0A090` | Muted UI chrome, secondary text |
| `--color-border` | Petal Blush | `#E8D5C4` | Card borders, dividers |
| `--color-strong` | Dark Rose | `#6b2a1a` | `<strong>` text — 5.2:1 on ivory (Lora 500 at 100-unit step + ink colour per §19.17) |
| `--color-focus` | Rose Focus Ring | `#C8556A` | Keyboard focus, same as primary |

### Seasonal Overrides
| Season | Active | Primary | Secondary | Surface |
|--------|--------|---------|-----------|---------|
| Harvest Home | Sep 15–Oct 31 | `#B8621A` | `#7A9E6B` | `#FFF0DC` |
| Midwinter Hearth | Dec 1–Jan 6 | `#8B4A5A` | `#5A7A4A` | `#FFF0EA` |
| Spring Awakening | Mar 15–May 15 | `#D46A82` | `#8AB878` | (default) |

## Typography Roles

| Role | Face | Weight | Usage |
|------|------|--------|-------|
| Headline | Playfair Display | 700, 900 | H1–H3, feature titles |
| Display | Dancing Script | 700 | Hero taglines, section eyebrows (display moments only) |
| Body | Lora | 400, 500 | Paragraphs, descriptions (never below 15px) |
| UI | Nunito | 400, 500, 600 | Buttons, labels, nav, chips |
| Mono | Courier Prime | 400, 700 | Timestamps, technical metadata |
| Number | Playfair Display | 700 | Stats, counts |

Note: Lora 600/700 files exist in pool but are **not vendored** — declared weights are 400 and 500 only. Nunito 700 not vendored. Playfair Display 900 for number role not vendored (weight 900 declared for headline only). Courier Prime is used for genuine technical data, never decoration.

## Spatial System

Spacing scale (px): 4, 8, 12, 16, 24, 32, 48, 64, 96
Corner radii: sm=4px, md=8px, lg=16px, xl=24px, pill=999px
Max content width: 1400px
Content width (narrow): 860px

## Motion Philosophy

Motion should feel like petals falling or a bee drifting — no urgency, no snap. All transitions use `cubic-bezier(0.25, 0.46, 0.45, 0.94)` or `cubic-bezier(0.34, 1.02, 0.64, 1)`. Durations are slow (300–500ms) to match the unhurried brand voice. `prefers-reduced-motion` is unconditionally respected: all animations drop to instant opacity transitions or plain scroll.

Key animations:
- **Petal drift** — hero background, 6 particles drifting slowly downward and across
- **Scroll reveal** — `IntersectionObserver` fade-up (16px translate → 0, 400ms)
- **Mascot idle** — slow vertical float with gentle rotation (±8px, 4s, infinite)
- **Petal shower** — easter egg burst, 16–20 petals fall from top of viewport
- **Scale bloom** — sections/content entrance, scale 0.96→1.0 with opacity

## Visual Assets

- **Logo**: Playfair Display italic wordmark "Phlix" paired with a Primrose (bumble bee) silhouette. Garden Rose or Bark Brown on Warm Ivory.
- **Mascot**: Primrose — a plump, watercolour-style bumble bee with amber-striped fuzz, rounded wings, and a tiny flower crown (primrose, forget-me-not, lavender). Appears on Home, Features, Download, About pages. Fixed bottom-right (desktop), in-flow on mobile (320px).
- **Icons**: Outlined, rounded, 1.5–2px stroke, round caps/joins. Garden Rose for active states, Bark Brown for default. Single botanical accent detail per icon where space allows.
- **Dividers**: Thin 1px botanical rule lines between sections, warm petal-blush colour.
- **Empty states**: Mismatched vintage china teacup SVG silhouettes (404 page)
- **Seasonal motify**: SVG illustration motifs per season — harvest berries/leaves, midwinter holly/mistletoe, spring blossoms

## Component Notes

- **Feature cards**: Garden cream background, 1px petal-blush border, hover lifts 2px with rose glow shadow and primary border
- **Client cards**: Same card system with sage green hover glow (guest room theme)
- **FAQ**: Native `<details>`/`<summary>` — fully functional without JS
- **Nav**: Topbar with garden-gate post dividers (thin 1px lines between items); active link gets 2px rose underline with soft rose box-shadow
- **Intensity toggle**: "Quiet the Garden" in footer — switches off all animations via `body.quiet-mode` class and localStorage preference
- **Seasonal activation**: `live-js` date gate in `main.js` — applies `data-season` attribute to `<html>` which triggers CSS seasonal token overrides

## Accessibility

- All text/background pairs verified against WCAG AA (4.5:1 normal, 3:1 large/UI)
- Primary (#C8556A) fails small text on ivory — safe variant #ba4f63 used where small text is required
- Secondary (#7A9E6B) fails both — safe variant #5e7a52 used
- Keyboard navigation with visible 2px rose focus ring + 4px rose outer halo
- Touch targets minimum 44×44px throughout
- Layout survives 200% text zoom with no clipping or horizontal scroll
- `prefers-reduced-motion` respected unconditionally
