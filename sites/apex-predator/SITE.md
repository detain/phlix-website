# SITE.md — Apex Predator Brand Kit Site

## Concept & Vision

Apex Predator is the top-of-the-food-chain streaming platform. The site should feel like the moment a predator closes distance — fast, deliberate, final. Every element is a claw mark on the screen: these contents are MINE. The visual language draws from predator and hunter imagery — claw marks, predator silhouettes, blood splatter accents — creating an aggressive, immersive dark aesthetic that commands attention and exudes power.

## Aesthetic Direction

**Archetype:** Outlaw — predatory, aggressive, top of the food chain, commanding.

**Visual style:** Dark atmospheric with crimson accents. Claw mark textures and scratches rake across surfaces. Predator silhouettes pace at the edges. The overall impression is of a creature that has climbed to the top of the food chain through fitness and holds its territory through presence.

**Mood references:** Big cats at the moment of the strike. Eagle and hawk silhouettes against a blood-red sky. Taxidermy display cases in hunting lodges. Military night-vision and thermal imaging.

## Color System

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| `--color-primary` | Arterial Crimson | `#C70039` | Primary CTAs, captured states, the blood-mark of aggression |
| `--color-secondary` | Deep Blood | `#900C3F` | Secondary accents, depth layers, predator silhouette fills |
| `--color-tertiary` | Splatter Orange | `#FF5733` | Energy accents, hover states, prey-freeze highlights |
| `--color-bg` | Void Black | `#000000` | Default page background. The hunting ground. |
| `--color-surface` | Hunting Ground | `#0A0A0A` | Card and panel surfaces |
| `--color-surface-alt` | Predator Silver | `#1A1A1A` | Alternate surface for nested panels, hover states |
| `--color-text` | Bone White | `#F0E6DC` | Primary body and headline text |
| `--color-neutral` | Midnight Slate | `#2C3E50` | Muted UI chrome, dividers, secondary text |
| `--color-success` | Captured Green | `#00A86B` | Success toasts, confirmations, captured states |
| `--color-warning` | Thermal Amber | `#CC5500` | Warnings, caution states |
| `--color-error` | Kill Red | `#8B0000` | Errors, destructive actions |
| `--color-info` | Tracking Blue | `#1A5276` | Informational banners, tips |
| `--color-border` | Claw Edge | `#1A1A1A` | Card borders, dividers |
| `--color-focus` | Hunting Glow | `#C70039` | Keyboard-focus ring |

## Typography

| Role | Font | Fallback | Usage |
|------|------|----------|-------|
| `--font-headline` | Oswald 700 | Impact, Arial Black, sans-serif | Page titles, hero headlines |
| `--font-display` | Bebas Neue 400 | Oswald, Impact, sans-serif | Oversized display numerals, splash text |
| `--font-body` | Roboto Condensed 400/700 | Arial, Helvetica, sans-serif | Paragraphs, descriptions, long-form |
| `--font-ui` | Oswald 400/600/700 | Impact, Arial Black, sans-serif | Buttons, labels, navigation, chips |
| `--font-mono` | Share Tech Mono 400 | Courier New, Courier, monospace | Technical readouts, metadata, timestamps |

**Typography rules (Apex Predator kit):**
- Headlines and UI text always Oswald — condensed, bold, uppercase, wide tracking.
- Body text uses Roboto Condensed at normal case.
- Avoid italic — predators don't equivocate.
- Technical data uses Share Tech Mono.

## Spatial System

- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px
- Max content width: 1400px
- Header height: 64px
- Corner radii: sm=2px, md=4px, lg=8px, xl=0px

## Motion Philosophy

**Motion style:** Fast, aggressive, predatory, pounce, strike.

**Micro-interactions:**
- Cards: 2px arterial crimson left-edge slash and faint crimson glow on hover over 200ms.
- Button press: Quick scale to 0.96 then snap back with a pounce-settle.
- Loading: Predator silhouette prowls across the loading bar — or three claw marks rake sequentially.
- Focus: 2px arterial crimson focus ring materializes over 120ms with a 3px outer void glow.
- Success: Brief crimson pulse that expands and fades — the capture is complete.

**Reduced motion:** All animations drop to instant/fade under `prefers-reduced-motion: reduce`.

## Visual Assets

| Asset | Description |
|-------|-------------|
| `img/logo.svg` | Bebas Neue wordmark in bone white on void black, with three crimson claw marks as accent left of the wordmark |
| `img/favicon.svg` | Square mark with three claw scratches in arterial crimson on void black background |
| `img/og.png` | 1200x630 social card: void black with blood sky radial gradient, PHLIX wordmark in bone white, "Nothing Escapes Your Library." tagline, crimson accent bar |
| `img/og.svg` | Editable source for og.png |

## Layout

- Full-bleed void hero with blood sky gradient → predator silhouette key art → Oswald headline in bone white → arterial crimson CTA.
- Feature sections on hunting ground surfaces.
- Sharp-cornered cards with crimson left-border accent on hover.
- 3-column footer grid.

## Implementation Notes

- Fonts loaded from shared pool: `../../assets/fonts/[family]-[weight]-latin.woff2`
- CSS variables map 1:1 to the kit's `design_tokens` block
- No CDN dependencies — all self-hosted
- Scroll reveals via IntersectionObserver, gated by `prefers-reduced-motion`
