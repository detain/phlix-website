# SITE.md — Afrofuturism Brand Kit — Design Rationale

## Concept & Vision

Afrofuturism is the collision of African ancestral memory and galactic possibility. Every element of this site is built on the tension between the ancient (kente cloth geometry, Benin bronze warmth, star-lit African skies) and the cosmic (the boundless speculative fiction future, the galaxy as a canvas). Phlix, a media server, is presented here as the vessel: a device for projecting future stories from an infinite past. The site should feel like walking into a planetarium where the ceiling is a kente weave — bold, geometric, celebratory, and deeply rooted.

## Aesthetic Direction

**Art direction:** Near-total cosmic darkness broken by Kente Gold, Cosmic Violet, and Tribal Red. Compositions are bold and centered — figures stand tall. Patterns cascade outward from central forms like kente weave expanding across a loom. Lighting is dramatic and warm: golden stellar light from above, violet cosmic halos at edges. The world exists simultaneously in the past and the far future. Everything glows with purpose.

**Mood anchors:** Sun Ra's cosmic jazz, Wakanda's Afrofuturist architecture, Janelle Monáe's Metropolis, Benin bronze metallics, Kente cloth geometric precision.

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Kente Gold | `#F0B800` | Sacred primary CTA — the most powerful moments on screen |
| Secondary | Cosmic Violet | `#6600CC` | Secondary actions, links, galactic accent elements |
| Tertiary | Tribal Red | `#CC1A1A` | Ceremonial accents, badges, ratings, emotional emphasis |
| Background | Cosmic Earth | `#080510` | The deep dark of a star-lit African sky |
| Surface | Wakanda Night | `#0E0A1A` | Card and panel surfaces |
| Surface Alt | Starfield Earth | `#150F25` | Alternate surface for striped rows, hover states |
| Text | Warm Star White | `#F5EDD8` | Primary body and headline text — warm, never cold |
| Border | Bronze Veil | `#2A1F40` | Card borders, dividers |
| Focus | Kente Gold Focus | `#F0B800` | Keyboard focus ring with outer gold glow |
| Success | Savanna Green | `#00B865` | Success toasts, confirmations |
| Warning | Amber Ember | `#FFB300` | Warnings, caution states |
| Error | Ceremonial Crimson | `#CC1A1A` | Errors, destructive actions |

**Gradients:**
- `Kente Horizon` — 145deg linear, `#F0B800` → `#6600CC` — hero backdrops
- `Ancestral Glow` — radial, warm gold center → transparent — stellar overhead behind hero
- `Cosmic Depth` — 180deg linear, Wakanda Night → Cosmic Earth — panel depth
- `Pan-African Arc` — 160deg, `#CC1A1A` → `#F0B800` → `#006600` — celebration moments

## Typography

| Role | Family | Weight | Usage |
|------|--------|--------|-------|
| Headline | Montserrat | 800/900 | Dramatic page titles, hero headlines — bold proclamations |
| Display | Bebas Neue | 400 | Oversized cinematic numerals, title cards |
| Body | Nunito | 400/600 | Warm, accessible body copy |
| UI | Montserrat | 500/600/700 | Buttons, labels, navigation, chips |
| Mono | JetBrains Mono | 400/600 | Code, tokens, technical readouts |
| Number | Bebas Neue | 400 | Stats, counters, dashboard figures |

**Rules:** Montserrat Black (900) headlines; Bebas Neue always uppercase; Nunito never in all-caps for extended passages; gold text on cosmic-dark for hero display headings only; never center long body copy.

## Spatial System

Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px. Use only these steps. The brand breathes — generous whitespace.

Corner radius scale: 3px (sm), 6px (md), 10px (lg), 16px (xl), 999px (pill). Cards and buttons use 6px — decisive, not rounded.

## Motion Philosophy

Motion is **revelation**, not decoration. Transitions feel like a moment of sudden clarity — a kente-pattern wipe, a gold radial burst, a geometric triangle fragment scatter-reassemble. Speed: medium (200–400ms). Easing: `cubic-bezier(0.25, 0, 0, 1)` (decisive) and `cubic-bezier(0.4, 0, 0.2, 1)` (standard). Never spring or elastic. Never animate more than two elements simultaneously. Honor `prefers-reduced-motion` unconditionally.

**Micro-interactions:** Card hover = 2px gold border + 4px lift + gold shadow (180ms ease-out). Button press = Kente Gold flash (brightness 140%, 120ms). Focus = 2px gold ring + 4px outer gold halo (150ms). Success = brief gold starburst, settles to gold check.

## Visual Assets

- **Orisha mascot:** A luminous geometric figure made of interlocking triangles and kente-inspired patterns — appears in loading screens and empty states.
- **Hero:** Full-bleed cosmic starfield with animated kente-pattern top border, centered Orisha silhouette, warm stellar radial glow behind headline.
- **Feature icons:** Inline SVG, 2px angular stroke, outlined geometric Afrofuturist style. Kente Gold for active state.
- **Kente geometric borders:** Interlocking triangle and chevron patterns used as structural dividers and card corner accents.
- **Starfield texture:** CSS-generated radial gradient dots on deep cosmic-earth background.

## Brand DNA (condensed)

Afrofuturism is the union of the ancient and the cosmic. Deep purple-black skies alive with Kente Gold and Cosmic Violet — every element serves both the ancestral and the galactic. It is never bland, never muted, never timid. The brand celebrates abundance: bold geometry, vibrant color, the joy of a people imagining infinite futures from an infinite past.

## Layout Archetype

**Immersive** — full-bleed cosmic dark canvas, centered powerful hero, Kente Gold radiating through sacred moments, geometric kente borders framing content fields. The hero commands the entire viewport. Sections breathe. Every CTA glows with purpose. The TV mode uses 2× Bebas Neue numerals, 4px Kente Gold focus rings, and Orisha mascot in navigation transitions.
