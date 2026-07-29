# Easter Egg Brand Kit — Design Rationale

## Concept & Vision

The easter-egg theme celebrates hidden surprises, secret unlock culture, and developer joy. The site itself feels like a game where keen observers are rewarded — but the surprises never interrupt the core experience. Whimsical, playful, and inviting, it says "we hide things cleverly, not frustratingly."

The tone is light and fun without being childish — confident playful design that respects the user's intelligence.

## Aesthetic Direction

**Theme:** Hidden surprises, secret unlock culture, developer easter eggs.

**Visual metaphor:** A hidden treasure hunt. Clean surfaces with occasional bursts of color and delight. Nothing ugly or annoying, just the pleasant surprise of finding something unexpected.

## Color Palette

| Role | Name | Hex |
|------|------|-----|
| Background | Cornsilk | `#FFF8DC` |
| Primary Accent | Hot Pink | `#FF69B4` |
| Secondary Accent | Pale Green | `#98FB98` |
| Tertiary Accent | Sky Blue | `#87CEEB` |
| Soft Accent | Plum | `#DDA0DD` |
| Primary Dark | Deep Purple | `#2E0854` |

## Typography

- **Display:** Fraunces (self-hosted via local() declaration, graceful fallback to Georgia)
- **Body:** DM Sans (self-hosted via local(), fallback to Helvetica Neue)
- **Mono:** JetBrains Mono (self-hosted via local(), fallback to Consolas)

Typography roles follow the brand-kit spec: display for headings, body for prose, mono for code and technical elements.

## Spatial System

8px base spacing scale:
- `--space-1: 0.25rem` through `--space-12: 7rem`

Corner radius: `0.25rem` (sm) → `0.5rem` (md) → `1rem` (lg) → `1.5rem` (xl) → `9999px` (full)

Max content width: `1400px` (centered)

## Motion Philosophy

- **Entrance animations:** Scroll-reveal with `IntersectionObserver`, respecting `prefers-reduced-motion`
- **Hover states:** Subtle lift (`translateY(-2px to -4px)`) with shadow increase
- **Easter egg effects:** Confetti burst on secret triggers, logo spin on multiple clicks
- **Color transitions:** `250ms ease` base, `400ms ease` for larger elements

All animations are gated behind `prefers-reduced-motion: reduce`.

## Visual Assets

- **Logo:** Stylized egg shape with gradient fill and playful dot accent
- **Favicon:** Simple egg mark in hot pink/sky blue gradient
- **Icons:** Single-color stroke-based inline SVGs (24x24 default, larger for feature details)
- **Decorative:** Subtle radial gradient overlays, soft glow shadows

## Grid Behavior

Grids use `minmax(0, 1fr)` for proper shrink-to-fit behavior. No bare `1fr` that could cause overflow at narrow widths.

## Easter Egg Implementation

1. **Konami Code** (↑↑↓↓←→←→BA): Triggers confetti burst
2. **Logo clicks** (5 clicks in 1 second): Shows secret message toast
3. **Hidden hints** (`data-easter-hint` attribute): Hover reveals

All easter eggs are:
- Inert for non-discoverers
- Disabled when focus is in inputs/textareas
- Respect `prefers-reduced-motion`
- Exit cleanly on Escape

## Accessibility

- WCAG 2.2 AA contrast compliance
- All text meets 4.5:1 ratio minimum
- Large text and UI meet 3:1 ratio minimum
- All interactive elements keyboard-reachable with visible focus indicator
- `prefers-reduced-motion` fully honored
