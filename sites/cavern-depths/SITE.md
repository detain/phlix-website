# Site Design Document — Cavern Depths

## Concept & Vision

Cavern Depths evokes the mystery and beauty of underground cave systems — stalactite formations, bioluminescent pools, and the echo of deep exploration. The design embraces the dark, mysterious atmosphere of deep caves while highlighting the glowing crystal formations that light the way. Every element suggests discovering something precious in unexpected places.

## Aesthetic Direction

**Theme:** Underground cave exploration with bioluminescent accents

**Mood:** Mysterious, serene, otherworldly, exploratory

**Reference:** Underground caverns illuminated by glowing crystals, stalactite formations, still pools reflecting bioluminescent light

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Glowing Crystal Blue | `#4A90D9` | CTAs, key interactive elements |
| Secondary | Bioluminescent Teal | `#7FFFD4` | Accents, glows, highlights |
| Tertiary | Cave Blue | `#1A2A4A` | Surfaces, depth layers |
| Background | Deep Cave Black | `#0A0F1A` | Page background |
| Surface | Deep Cavern | `#1A2A4A` | Cards, sections |
| Surface Alt | Stalactite Blue | `#243550` | Elevated surfaces |
| Text | Pale Light | `#E8E8E8` | Primary text |
| Text Muted | Bioluminescent Teal | `#7FFFD4` | Secondary text, muted elements |
| Border | Cave Edge | `#2A3D5A` | Borders, dividers |
| Focus | Bioluminescent Teal | `#7FFFD4` | Focus rings |
| Glow | Crystal Glow | `rgba(127, 255, 212, 0.3)` | Glow effects |
| Crystal | Crystal Shimmer | `rgba(74, 144, 217, 0.4)` | Crystal-like shadows |

## Typography

**Font Families:**
- Headline: Barlow Condensed (700, 800) — uppercase display text
- Body: Barlow (400, 500, 600) — readable body text
- UI: Barlow (500) — navigation and UI elements
- Mono: JetBrains Mono (400, 600) — code blocks

**Type Scale:**
- H1: 2.5rem–4.5rem, uppercase, condensed
- H2: 1.75rem–3rem, uppercase, condensed
- H3: 1.25rem–1.75rem, uppercase, condensed
- Body: 1rem, 1.55 line-height
- Lead: 1.125rem, 1.6 line-height

## Spatial System

**Spacing Scale:**
- `--space-1`: 4px
- `--space-2`: 8px
- `--space-3`: 12px
- `--space-4`: 16px
- `--space-6`: 24px
- `--space-8`: 32px
- `--space-12`: 48px
- `--space-16`: 64px
- `--space-24`: 96px

**Layout:**
- Max width: 1400px
- Content width: 1200px
- Container padding: var(--space-6)

## Motion Philosophy

**Easing:** Sharp cubic-bezier for snappy interactions, smooth ease-out for reveals

**Duration:**
- Fast: 80ms (micro-interactions)
- Base: 150ms (standard transitions)
- Slow: 300ms (larger reveals)

**Reduced Motion:** All animations respect `prefers-reduced-motion: reduce`

**Theme Animations:**
- `pulse-glow`: Bioluminescent pulsing effect for accent elements
- `crystal-shimmer`: Subtle shimmer for crystal-like decorations
- `float`: Gentle floating for decorative elements
- `stalactite-drip`: Cave formation animation (subtle)

## Visual Assets

**Logo:** Stalactite/crystal formation forming "P" with bioluminescent accents

**Icons:** Stroke-based SVG icons in bioluminescent teal with glow filter effects

**Decorative Elements:**
- Stalactite patterns (CSS triangular shapes)
- Bioluminescent pool effects (radial gradients with blur)
- Crystal formations (angular polygon shapes)
- Noise texture overlays for cave atmosphere

**Background Effects:**
- Radial gradients simulating bioluminescent pools
- Subtle noise texture for depth
- Gradient overlays for atmospheric depth

## Component Styling

**Cards:** Dark surface with subtle border glow on hover, bioluminescent accent lines

**Buttons:**
- Primary: Crystal blue with glow shadow, teal hover
- Secondary: Transparent with teal border
- Ghost: Minimal with subtle hover effect

**Code Blocks:** Surface background with teal top border accent

**Navigation:** Sticky glass-morphism header with blur backdrop

## Responsive Breakpoints

- Mobile: ≤768px (single column, stacked layout)
- Desktop: >768px (multi-column grids)

## Accessibility

- WCAG 2.1 AA compliant
- Focus rings use bioluminescent teal for visibility
- Text contrast ratios verified against dark backgrounds
- Touch targets minimum 44×44px
