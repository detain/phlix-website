# SITE.md — Dyson Sphere Brand Kit

## Concept & Vision

Dyson Sphere channels the raw power of stellar megastructures into a media server brand. Where other kits suggest warmth or playfulness, this one evokes cosmic scale — energy collectors harvesting light from captured stars, orbital rings tracing impossible geometries, plasma tendrils crackling with contained fusion. The visitor should feel they've stepped onto the command deck of a Class-II civilization.

## Aesthetic Direction

**Theme:** Stellar megastructure, solar energy harvesting, plasma tendrils
**Archetype:** Magician — cosmic power, transformation, wonder
**Experience:** Immersive, dramatic, vast

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Solar Gold | `#FFB800` | Headlines, CTAs, active states |
| Secondary | Plasma Orange | `#FF6B00` | Muted text, secondary actions |
| Accent | Flare Red | `#FF4500` | Borders, highlights |
| Dark | Core Red | `#8B0000` | Deep surfaces, shadows |
| Deepest | Void Black | `#1A0A00` | Background, depth |
| Foreground | Solar Gold | `#FFB800` | Body text on dark |
| Surface | Plasma Surface | `rgba(139,0,0,0.3)` | Card backgrounds |
| Border | Flare Border | `rgba(255,107,0,0.3)` | Card/element borders |

## Typography

**Display font:** Orbitron — geometric, futuristic, uppercase letterforms
**Heading font:** Rajdhani — technical, clean, readable
**Body font:** Exo 2 — humanist sans, comfortable for longer reads
**Mono font:** Share Tech Mono — for code blocks and technical elements

### Scale

| Name | Size |
|------|------|
| xs | 0.75rem |
| sm | 0.875rem |
| base | 1rem |
| lg | 1.125rem |
| xl | 1.25rem |
| 2xl | 1.5rem |
| 3xl | 2rem |
| 4xl | 2.5rem |
| 5xl | 3.5rem |
| 6xl | 4.5rem |

## Spatial System

**Unit:** 8px
**Scale:** 0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128
**Container max:** 1200px
**Narrow max:** 800px

## Motion Philosophy

**Reduced motion:** Respects `prefers-reduced-motion: reduce` — all animations disabled, content visible immediately.

**Normal motion:**
- **Megastructure rings:** Three concentric orbital rings rotate at different speeds (20s, 35s, 45s), two clockwise, one counter-clockwise. Creates sense of vast mechanical scale.
- **Stellar particles:** 30 particles drift slowly across the hero, in brand colors, with staggered timing.
- **Scroll reveals:** Content fades up from 20px below with 100ms stagger between items.
- **Hover states:** Solar flare glow intensifies on interactive elements.

**Easing:** Default `cubic-bezier(0.4, 0, 0.2, 1)` for smooth, natural movement.

## Visual Assets

### Logo
SVG wordmark with animated megastructure rings orbiting a glowing sun, "PHLIX" in Orbitron with solar gradient. The animation is subtle — a breathing sun pulse and slow ring rotation.

### Favicon
Square SVG mark: dark background, two orbital rings, glowing sun center, in brand colors.

### OG Image (1200×630)
Full social card: dark void background, large corona glow, three orbital rings at center with sun, "PHLIX" wordmark and tagline at bottom.

## Component Notes

### Buttons
- **Primary:** Solar gradient (`#FFB800` → `#FF6B00` → `#FF4500`), dark text, glowing box-shadow
- **Secondary:** Transparent with `#FF6B00` border, `#FFB800` text on hover
- **Ghost:** Text only, `#FF6B00` color, glows on hover

### Cards
Dark gradient background (`rgba(139,0,0,0.3)` → `rgba(26,10,0,0.8)`), subtle border, `backdrop-filter: blur(10px)`, glow border on hover.

### Hero
Full viewport height, centered content, three animated rings as background layer, radial corona gradient overlay, stellar particle drift effect.

## Accessibility

- All text meets WCAG 2.2 AA contrast requirements (4.5:1 body, 3:1 large/UI)
- Focus states visible with 2px `#FFB800` outline
- `prefers-reduced-motion` fully honored
- Skip link to main content
- Semantic landmarks: banner, navigation, main, contentinfo

## Technical

- Pure static HTML/CSS/JS — no framework, no build step for viewing
- Self-hosted fonts via `@font-face` with `font-display: swap`
- CSS custom properties for all design tokens
- Mobile-first responsive design, tested at 320px–1920px
