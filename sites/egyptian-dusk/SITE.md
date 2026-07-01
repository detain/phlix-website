# SITE.md — Egyptian Dusk Brand Kit Site

## Concept & Vision

Egyptian Dusk is the hour when Ra descends behind the pyramids and the Nile turns to molten gold — the threshold between the living world and the eternal kingdom of the dead. This site renders Phlix as a sacred, ceremonial media server: every frame a hieroglyph, every session a passage through the Hall of Two Truths. The visitor should feel the weight and permanence of three thousand years of storytelling culture applied to their media library.

**Layout archetype: IMMERSIVE / SHOWCASE**

Full-bleed hero with the Dusk Over the Pyramids gradient → register sections alternating Black Silt Night and Khufu's Shadow → hieroglyphic-band dividers between sections → centered, processional compositions with generous ceremonial negative space.

---

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| `--color-primary` | Pharaoh Gold | `#D4A520` | Primary CTAs, the single most important accent per screen |
| `--color-secondary` | Lapis Lazuli | `#1A4890` | Secondary actions, featured borders, divine sky accents |
| `--color-tertiary` | Terracotta Fire | `#C8440A` | Badges, warnings, emotional highlights |
| `--color-neutral` | Sandstone | `#7A6040` | Muted UI chrome, dividers, secondary text |
| `--color-bg` | Black Silt Night | `#0A0603` | Default page background — deep fertile Nile silt |
| `--color-surface` | Khufu's Shadow | `#130C05` | Card and panel surfaces |
| `--color-surface-alt` | Desert Night | `#1C1008` | Alternate surface, hover states |
| `--color-text` | Papyrus Cream | `#FFF5D8` | Primary body and headline text |
| `--color-success` | Nile Reed Green | `#2E7D52` | Success toasts, confirmations |
| `--color-warning` | Desert Amber | `#E8900A` | Warnings, caution states |
| `--color-error` | Cobra Red | `#B82020` | Errors, destructive actions |
| `--color-info` | Faience Blue | `#3A82C4` | Informational banners |
| `--color-focus` | Golden Focus Pulse | `#D4A520` | Keyboard focus ring |
| `--color-border` | Ancient Stone | `#2C1E0A` | Card borders, dividers |

### Gradients

| Name | CSS |
|------|-----|
| Dusk Over the Pyramids | `linear-gradient(170deg, #C8440A, #D4A520, #1A4890)` |
| Ra's Descent | `radial-gradient(ellipse at center, rgba(212,165,32,0.40), rgba(10,6,3,0.0))` |
| Nile Depth | `linear-gradient(180deg, #130C05, #0A0603)` |
| Lapis Horizon | `linear-gradient(135deg, #1A4890, #0A0603)` |

---

## Typography

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| `--font-headline` | Cinzel | 700, 900 | Dramatic page titles, hero headlines |
| `--font-display` | Cinzel Decorative | 700, 900 | Oversized ceremonial display, splash titles |
| `--font-body` | Cormorant Garamond | 400, 500 | Descriptions, synopses, long-form reading |
| `--font-ui` | Cinzel | 400, 600 | Buttons, labels, navigation, chips |
| `--font-mono` | Courier Prime | 400, 700 | Runtimes, counters, technical readouts |

**Typography rules from kit:**
- Cinzel headlines must always be 700 weight or heavier
- Cinzel Decorative is for monumental display only — never body or UI
- Body copy (Cormorant Garamond) must never be set in all-caps
- Tracking on headlines is open (0.04em+) — inscriptional spacing reads as authority
- Avoid centered body copy blocks; left-align for a manuscript feel

---

## Spatial System

Spacing scale (px): **4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96**

Max content width: **1400px** (processional symmetry, centered)
Max text content width: **1200px**

---

## Motion Philosophy

Egyptian motion is **ceremonial and processional** — every animation should feel like the slow opening of a tomb door.

- **Animation speed:** slow (350–600ms)
- **Easing:** `ease-in-out`, `cubic-bezier(0.3, 0, 0.15, 1)` (tomb-door easing)
- **Header motif:** slow golden shimmer animation — Ra's sun-disk crossing the sky
- **Hover cards:** 1px Pharaoh Gold border + warm gold box-shadow over 280ms
- **Focus:** 2px Pharaoh Gold focus ring + 4px gold outer glow (150ms)
- **Scroll reveals:** slow fade-up (500ms, tomb-door easing) via IntersectionObserver
- **Reduced motion:** honors `prefers-reduced-motion` — replaces scrolls with cross-fades

---

## Visual Assets

- **logo.svg** — Cinzel Decorative wordmark on Black Silt Night with 1px Pharaoh Gold cartouche border, ankh motifs flanking
- **favicon.svg** — Pharaoh Gold square with ankh symbol
- **og.svg** — 1200×630 social share: dusk pyramid hero, Phlix wordmark, tagline
- **PROMPTS.md** — full image generation prompts for all artwork
- **Inline SVGs** — 8 feature icons (stroke-based, 1.5px, squared joins, Pharaoh Gold)
- **Mascot: Kheper** — golden scarab beetle with lapis wings (described in brand kit, SVG-only artwork in this build)
- **Sand-grain texture** — CSS SVG filter applied subtly to hero surfaces

---

## Component Highlights

- **Cards:** Near-square-cornered Khufu's Shadow cards with barely-visible Ancient Stone border; featured cards gain 1px Pharaoh Gold border + gold_glow on hover
- **Buttons:** Pharaoh Gold primary, 1px border + Papyrus Cream ghost, near-square 1px radius
- **Badges:** Cartouche oval or sharp rectangle, Cinzel 600 weight uppercase, 10–11px
- **Focus style:** 2px Pharaoh Gold ring + 2px Black Silt offset + 4px gold outer glow
- **Shadow system:** deep warm-black base; gold aura on cards/CTAs; lapis/terracotta glows for secondary/urgent states
