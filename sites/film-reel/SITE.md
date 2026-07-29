# Film Reel Brand Kit — Design Rationale

## Concept & Vision

The **film-reel** brand kit evokes classic cinema projection — spinning reels, sprocket holes, silver and black metal. It feels like walking into a vintage movie theater's projection booth: technical, precise, warm with the glow of the projector's light.

## Aesthetic Direction

**Theme:** Classic cinema projection
**Reference:** 35mm film reels, projection booth machinery, silver and black metal fixtures, red velvet curtains, gold trim.

**Mood:** Technical warmth — the precision of mechanical film equipment combined with the romance of cinema.

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Silver | `#C0C0C0` | Main accent, interactive elements |
| Secondary | Charcoal | `#1C1C1C` | Primary surface, backgrounds |
| Accent | Projection Red | `#FF0000` | CTAs, highlights, film reel centers |
| Gold | Cinema Gold | `#FFD700` | Secondary accent, hover states |
| Black | True Black | `#000000` | Deep backgrounds, text |
| Dark Surface | Deep Black | `#0a0a0a` | Overlays, footer |
| Light Text | Silver Light | `#E8E8E8` | Body text |
| Muted Text | Silver Dark | `#909090` | Secondary text |

## Typography

- **Display:** Playfair Display (serif) — dramatic headlines with cinematic gravitas
- **Body:** Source Sans Pro — clean, readable body text
- **UI:** Inter — navigation and interface elements
- **Mono:** JetBrains Mono — code blocks and technical content

## Spatial System

- **Base unit:** 8px
- **Max content width:** 1400px
- **Max narrow width:** 1200px
- **Section padding:** 64-96px vertical

## Motion Philosophy

- **Primary animation:** Spinning film reels (decorative background)
- **Projector sweep:** Conic gradient rotation effect in hero
- **Hover states:** Subtle lift + glow effects
- **Transitions:** 150-400ms ease curves

## Visual Assets

- **Logo:** Film reel icon + "Phlix" wordmark in Playfair Display
- **Icons:** Stroke-based SVG icons in projection red
- **Decorative:** Sprocket hole patterns on section borders, spinning reel overlays
- **Favicon:** Film reel icon on charcoal background

## Grid System

- CSS Grid with `minmax(0, 1fr)` tracks to prevent overflow
- `overflow-wrap: anywhere` on body text in narrow columns
- Breakpoints: 320, 375, 414, 768, 1024, 1280, 1920px

## Film Strip Decorations

The design uses **sprocket hole patterns** as a recurring motif:
- Section borders (top/bottom of dark sections)
- Header decoration
- Footer decoration
- List item markers

## Reduced Motion

All animations respect `prefers-reduced-motion: reduce`:
- Spinning reels stop
- Fade transitions replace transforms
- No motion-based interactions without JS
