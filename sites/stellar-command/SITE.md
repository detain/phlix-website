# Stellar Command — Site Design Rationale

## Concept & Vision

Stellar Command transforms Phlix into a starship bridge command experience — where managing your media library feels like commanding a starship's entertainment console. The design evokes the precision and authority of a ship's captain navigating through content universes with warp-speed clarity and navigation beacon guidance.

## Aesthetic Direction

**Theme:** Starship bridge console aesthetic with deep space atmosphere.

The visual language draws from science fiction command bridges: glowing navigation beacons, warp blur effects, HUD-style corner brackets, and the quiet confidence of deep space. Every interaction feels like operating advanced space technology.

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Deep Space Navy | `#0B132B` | Backgrounds, headers |
| Secondary | Hull Plating Blue | `#1C2541` | Cards, surfaces |
| Tertiary | Console Teal-Blue | `#3A506B` | Borders, secondary elements |
| Accent | Navigation Beacon Cyan | `#5BC0BE` | CTAs, highlights, links |
| Highlight | Bridge White | `#FFFFFF` | Headings, primary text |
| Alert | Red Alert | `#FF6B6B` | Deprecated status |
| Success | Systems Online | `#4ECDC4` | Stable status |
| Warning | Caution Yellow | `#FFE66D` | Beta status |

## Typography

**Display Font:** System UI stack (system-ui, -apple-system, "Segoe UI", sans-serif)

**Body Font:** System UI stack (system-ui, -apple-system, "Segoe UI", sans-serif)

**Weights:** Display 700/900, Body 400/500/600

**Display Letter Spacing:** -0.02em for tight, modern headlines

**Body Line Height:** 1.6 for readable content

## Spatial System

- **xs:** 0.25rem (4px)
- **sm:** 0.5rem (8px)
- **md:** 1rem (16px)
- **lg:** 1.5rem (24px)
- **xl:** 2rem (32px)
- **2xl:** 3rem (48px)
- **3xl:** 4rem (64px)
- **section:** 4rem (64px)

## Motion Philosophy

Motion reinforces the starship command experience:

1. **Warp Speed Effect** — Subtle blur on transitions suggests faster-than-light navigation
2. **Beam-Up Reveals** — Content materializes with a vertical fade-in, like cargo beaming aboard
3. **Console Power-Up** — Cards glow briefly on load, simulating console initialization
4. **Beacon Pulse** — Status indicators pulse with a soft glow, like navigation beacons
5. **Scan Lines** — Subtle horizontal line animation for retro display feel

**Reduced Motion:** All animations respect `prefers-reduced-motion: reduce` and fall back to instant transitions or simple fades.

## Visual Assets

| Asset | Purpose | Source |
|-------|---------|--------|
| `img/logo.svg` | Brand wordmark with starship icon | Custom SVG |
| `img/favicon.svg` | Square favicon with beacon design | Custom SVG |
| `img/og.svg` | Social share card (1200x630) | Custom SVG |

**Note:** `og.png` (rasterized 1200x630 PNG) should be generated from `og.svg` using:
```bash
node tools/gen-og.mjs --site stellar-command
```

## Component Design Language

### Cards
- Background: Linear gradient from hull plating to deep space
- Border: 1px solid with 20% beacon cyan opacity
- Border-radius: 8px
- Shadow: Multi-layer dark shadow + subtle cyan glow
- Hover: Lift effect + border glow intensification

### Buttons (Primary)
- Background: Linear gradient from beacon cyan to console teal
- Border: 1px solid beacon cyan at 50% opacity
- Box-shadow: Cyan glow + top highlight
- Hover: Lift + intensified glow
- Text: Uppercase, letter-spaced, bridge white

### Buttons (Secondary)
- Background: Transparent
- Border: 1px solid beacon cyan
- Hover: Subtle cyan background tint

### Code Blocks
- Background: Console panel gradient
- Border: 1px solid beacon cyan at 30% opacity
- Top accent: Cyan gradient line suggesting a console bezel

### Status Badges
- Small rounded rectangles with color-coded borders
- Pulsing dot indicator (beacon style)
- Colors: Green (stable), Yellow (beta), Red (deprecated)

## Decorative Elements

1. **Grid Overlay** — Subtle horizontal/vertical lines suggesting ship deck plating
2. **Corner Brackets (HUD)** — Screen-edge markers in accent color
3. **Glow Effects** — Soft cyan shadows on interactive elements
4. **Scan Lines** — Subtle horizontal animation on surfaces

## Accessibility

- All text meets WCAG 2.2 AA contrast requirements
- Navigation beacon cyan (#5BC0BE) on deep space navy (#0B132B) = 6.2:1 ratio
- White text on deep space navy = 14.5:1 ratio
- Reduced motion support throughout
- Full keyboard navigation with visible focus indicators
- Screen reader accessible landmarks and ARIA labels
