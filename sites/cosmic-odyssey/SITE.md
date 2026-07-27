# SITE.md — Cosmic Odyssey

## Concept & Vision

Cosmic Odyssey channels the boundless wonder of deep space into every frame of media on your Phlix server. Inspired by NASA's golden-age mission posters, Hubble deep-field photography, and the quiet awe of an astronaut drifting against the infinite, the site feels like mission control for your personal media universe — vast, precise, and awe-inspiring.

## Aesthetic Direction

**Astrophotography-meets-poster art.** Luminous glow on deep black. Nebulae bloom in soft violet and magenta watercolor washes dissolving into stardust gold motes. Single distant-star illumination on subjects, hard shadows beyond, no warm tones anywhere.

## Color Palette

| Role | Name | Hex |
|---|---|---|
| Primary | Nebula Violet | `#7B3FBE` |
| Secondary | Cosmic Magenta | `#C0399A` |
| Tertiary | Stardust Gold | `#E8C44A` |
| Neutral | Stellar Blue | `#3A7FBF` |
| Background | Deep Space Black | `#080B14` |
| Surface | Void Panel | `#111827` |
| Surface Alt | Nebula Haze | `#1E2640` |
| Text | Star White | `#E8EAF0` |
| Success | Aurora Green | `#34D399` |
| Warning | Solar Flare | `#FBBF24` |
| Error | Red Dwarf | `#EF4444` |
| Info | Pulsar Blue | `#60A5FA` |
| Focus | Cosmic Focus Ring | `#A78BFA` |
| Border | Constellation Line | `#2D3A5E` |

**Note:** All accent colors were verified against their backgrounds using measured WCAG ratios from the kit-brief contrast table. Safe small-text substitutes were derived and applied where the default hue fell below 4.5:1.

## Typography

| Role | Family | Weight | Notes |
|---|---|---|---|
| Headline | Orbitron | 700, 900 | Uppercase, wide tracking — mission insignia style |
| Display | Exo 2 | 300, 400 | Ultra-wide tracking for large backgrounds |
| Body | Inter | 400, 500 | Maximum legibility against dark void |
| UI | Rajdhani | 400, 500, 600 | Buttons, nav, badges — technical yet approachable |
| Mono | Space Mono | 400, 700 | Code blocks, coordinate readouts |

**Strong/emphasis:** Inter 500 + same ink color (color+weight as second channel per §19.17).

## Spatial System

- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px
- Max content width: 1400px; reading width: 760px; content grid: 1200px
- Corner radii: sm=4px, md=8px, lg=16px, xl=24px, pill=999px

## Motion Philosophy

- **Speed:** Slow — 600ms+ transitions feel weightless, like orbital mechanics
- **Easing:** `cubic-bezier(0.22, 0.61, 0.36, 1)` (ease-out), `linear` for star drift
- **Scroll reveals:** Warp-in zoom + fade on section entry
- **Hero:** Layered parallax star field + nebula drift on pointer/scroll
- **Reduced motion:** All motion replaced with simple cross-fades; Vela idle disabled
- **Seasonal:** Date-gated Perseid meteor trails, Winter Solstice aurora curtain, Galaxy Season Milky Way texture

## Visual Assets

- **logo.svg** — Orbitron wordmark in star-white on deep-space-black, hexagonal mission-patch border in stardust gold
- **favicon.svg** — Star/constellation point in nebula violet
- **og.svg/og.png** — Social share: nebula backdrop, Orbitron headline, mission-style lockup
- **Feature icons** — Inline SVG, 1.5px stroke, rounded caps, violet-spectrum fill
- **Hero backdrop** — CSS radial gradient nebula bloom + scattered star dots (no raster)
- **Signature elements:** Star fields, orbital arcs, constellation-line borders, nebula glows, mission-patch badges

## Component Highlights

- **Mascot (Vela):** Floating astronaut with star-map visor. Zero-g idle animation (disabled under reduced-motion). Four contextual tips. Two easter interactions (click:7 → barrel roll; hover-hold:3s → visor flare). Dismiss persistent via sessionStorage. In-flow above footer on mobile.
- **Nav:** Topbar with constellation-dot separators, active link glows violet (pulsar effect). Three emphasis levels visually distinct.
- **Cards:** Void-panel surface (#111827), constellation-line border, violet glow on hover, 3px lift with void shadow.
- **Buttons:** Primary = nebula violet with glow shadow; Secondary = ghost violet border; FAB = pill shape.
- **Focus ring:** 2px violet (#A78BFA) with 2px dark offset — always visible.
- **Intensity toggle:** Footer utility row, reduces parallax/particle effects via CSS class + localStorage.
