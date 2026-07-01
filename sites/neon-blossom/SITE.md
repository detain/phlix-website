# SITE.md — Neon Blossom Brand Site

## Concept & Vision

Neon Blossom is a bioluminescent night garden identity for Phlix — deep black as velvet night sky, electric orchids burning neon pink, luminous wisteria in violet, and firefly sparks in gold. The site should feel like stepping into a garden that only blooms after midnight: romantic, mysterious, and achingly beautiful. Darkness dominates; glowing color blooms within it. Every surface appears to emit its own light.

**Brand archetype: Magician** — the editorial stance is quietly magical, poetic, and inviting. The site guides visitors through the garden with gentle wonder rather than hard sell.

**Layout archetype: immersive** — full-bleed sections with depth layers (dark negative space → midground bloom → sharp hero subject). Not a page you scroll through — a garden you walk into.

---

## Aesthetic Direction

### Mood
Dark romanticism meets bioluminescent nature photography. Think: midnight botanical gardens lit only by glowing flowers and fireflies. Remedios Varo's magical realism, long-exposure macro flower photography, Japanese hanabi reflected in dark water.

### Inspiration
- Bioluminescent deep-sea organisms
- Night-blooming moonflowers and nocturnal orchid species
- Japanese hanabi (fireworks) reflected in dark water
- Neon botanical prints and fluorescent-ink illustration
- Aurora borealis light diffusion through forest canopies
- The golden-hour moment just after the last sunset light vanishes

### Anti-brand (what this site is NOT)
- Not cyberpunk or tech-dystopian
- Not aggressive or loud
- Not corporate or utilitarian
- Not pastel or softly light
- Not flat or minimal-cold
- Not daytime — nothing with sunlight or bleached-out warmth
- Not primary-color cheerful
- Not geometric or mechanical

---

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| `--color-primary` | Neon Hot Pink | `#FF2D78` | Primary CTAs, hero bloom, active states |
| `--color-secondary` | Electric Violet | `#9B30FF` | Secondary actions, orchid highlights, hover |
| `--color-tertiary` | Luminous Gold | `#FFD166` | Firefly sparks, ratings, small accents |
| `--color-quaternary` | Leaf Green Glow | `#39FF85` | Foliage accents, success states |
| `--color-bg` | Midnight Black | `#08010F` | Default page background |
| `--color-surface` | Night Velvet | `#130822` | Card/panel surfaces |
| `--color-surface-alt` | Dusk Plum | `#1E0F38` | Elevated panels, alternate rows |
| `--color-text` | Petal White | `#F0EBF8` | Primary text — violet-tinted white |
| `--color-border` | Violet Mist | `#4A2070` | Card borders, dividers |
| `--color-focus` | Focus Violet Halo | `#C77DFF` | Keyboard focus ring |
| `--color-success` | Bloom Green Pulse | `#20E87A` | Success toasts, confirmations |
| `--color-warning` | Amber Firefly | `#FFAD1F` | Warnings, caution states |
| `--color-error` | Crimson Bloom | `#FF2255` | Errors, destructive actions |
| `--color-info` | Cerulean Glow | `#44CFFF` | Informational banners |

### Gradients
- **Bloom at Midnight:** `radial-gradient(ellipse at center, #FF2D78 0%, #9B30FF 45%, #08010F 100%)`
- **Firefly Trail:** `linear-gradient(135deg, #FFD166 0%, #FF2D78 100%)`
- **Garden Depth:** `linear-gradient(180deg, #1E0F38 0%, #08010F 100%)`
- **Bioluminescent Pulse:** `radial-gradient(ellipse at center, rgba(57,255,133,0.18) 0%, rgba(8,1,15,0) 70%)`

### Color Rules
- Background must always be Midnight Black or Night Velvet — never light.
- Lead each view with ONE dominant bloom color; let the others whisper.
- Glows (box-shadow with spread + blur + 0 offset) are preferred over flat borders.
- Luminous Gold and Leaf Green Glow are accent-only — never use them as large fills.
- Shadows are pure black, never warm brown or cool grey.
- Never introduce a color that could not plausibly describe a bioluminescent plant or insect.
- Gradients should always move FROM vivid color INTO near-black.

---

## Typography

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| **headline** | Cormorant Garamond | 300, 600 | Major display, hero titles, section headers |
| **display** | Cormorant Garamond | 300 | Oversized splash text, feature titles, pull quotes |
| **body** | Lato | 300, 400 | Paragraphs, descriptions, long-form reading |
| **ui** | DM Sans | 400, 500, 600 | Buttons, labels, nav, chips, badges |
| **mono** | Fira Code | 400, 500 | Code, tokens, timestamps |
| **number** | Cormorant Garamond | 300 | Stats, counters, dashboard figures |

**Typography rules:**
- Display and headline type should be lit — apply a soft text-shadow glow in the primary accent color.
- Body text is Petal White at full opacity; secondary text at 60% opacity.
- Avoid ALL CAPS except for very short UI labels (3 words or fewer).
- Line-length for body copy: 55–70 characters for maximum legibility on dark backgrounds.
- Never set body copy in a display or serif font — keep them strictly separated.

---

## Spatial System

Spacing scale (4px base): `4, 8, 12, 16, 24, 32, 48, 64, 96px`

Corner radius: `8px` (sm), `16px` (md), `24px` (lg), `40px` (xl), `999px` (pill)

---

## Motion Philosophy

**Motion style:** Languid, organic, ethereal, pulse-like.

**Animation speed:** Slow — flowers do not move fast.

**Easing:** `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (ease-in-out)

**Transitions:**
- Bloom fade — opacity cross-dissolve with radial glow burst
- Petal fall — elements drift downward and fade
- Firefly flicker — brief luminance pulse before new content
- Deep dissolve — pure cross-fade through black

**Microinteractions:**
- Cards: pulse with soft outer glow (box-shadow expands 0→16px) over 300ms; scale 1.0→1.015
- Buttons: slight depression (scale 0.97) with inner glow flare on press
- Focus: violet halo blooms outward over 200ms
- Success: gold pollen particle burst; leaf-green check grows in

**prefers-reduced-motion:** Replace all glow pulses, bloom fades, and particle animations with instant opacity transitions.

---

## Visual Assets

- **logo.svg:** Cormorant Garamond Light wordmark + minimal stylised orchid bloom in petal white on midnight black. Glows only, no drop shadows.
- **favicon.svg:** 32×32 square mark — orchid bloom silhouette in neon hot pink on midnight black.
- **og.svg:** 1200×630 social share card — radial bloom background, Phlix wordmark with pink glow, tagline, feature icons, midnight-black aesthetic.
- **Feature icons:** Inline SVG, 1.5px stroke, rounded caps/joins, single-color petal white.

**Signature motifs:** Glowing orchid blooms, electric rose silhouettes, firefly light trails, bioluminescent leaf veins, dew drops, tendril and vine borders, moth wings.

---

## UI Components

- **Buttons:** Pill-shaped (border-radius: 999px). Primary = Neon Hot Pink with glow_pink. Secondary = Electric Violet with glow_violet. Ghost = transparent with violet-mist border. Link = violet with animated bloom underline.
- **Cards:** Night Velvet surface (#130822), 1px violet-mist border, 24px radius, 24px padding. Hover = glow_violet outer shadow. Featured = glow_pink.
- **Navigation:** Sticky midnight-black bar with backdrop blur. Active link = neon-pink left edge accent + bloom tint background.
- **Focus rings:** 3px violet halo (#C77DFF) with 2px midnight-black offset.
- **Touch targets:** Minimum 44×44px; 48px preferred on mobile.
