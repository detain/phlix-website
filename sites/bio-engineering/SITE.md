# Bio-Engineering Site — Design Rationale

## Concept & Vision

The Bio-Engineering brand kit for Phlix embodies the principle of **"Grown, Not Built"** — an organic media server experience that evolves like living systems. The design language draws from biological structures: DNA helixes, cell membranes, and bioluminescence, creating a distinctive aesthetic that sets it apart from typical tech product sites.

The Sage archetype infuses the experience with natural wisdom and organic growth — the site doesn't feel manufactured; it feels cultivated.

## Aesthetic Direction

Inspired by the intersection of technology and biology, the Bio-Engineering theme visualizes media library growth as natural evolution. The bioluminescent aesthetic creates an immersive, almost living interface where elements pulse and breathe like organisms.

Key visual motifs:
- **DNA helixes** — Double helix structures as decorative elements and animation subjects
- **Cell membranes** — Semi-transparent, breathing containers with organic borders
- **Bioluminescence** — Glowing accents that pulse and fade like living light
- **Membrane sheens** — Layered gradients that suggest organic depth

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Bioluminescent Green | `#00FF87` | CTAs, key highlights, glow effects |
| Secondary | Cell Blue | `#00B4D8` | Links, secondary accents, membrane tones |
| Accent | DNA Purple | `#7B2CBF` | Decorative elements, depth |
| Highlight | Nucleus Pink | `#FF006E` | Badges, emphasis, active states |
| Dark | Deep Dark | `#1A1A2E` | Text on light backgrounds |
| Background | Cell Background | `#0D1117` | Page background |
| Surface | Membrane Surface | `#161B22` | Cards, elevated surfaces |
| Text | Living Text | `#E6EDF3` | Primary text |
| Text Muted | Muted | `#8B949E` | Secondary text |

### Gradient Definitions

- **Bioluminescent Glow**: `linear-gradient(135deg, #00FF87, #00B4D8, #7B2CBF)` — Hero headlines, primary buttons
- **Membrane Sheen**: `linear-gradient(180deg, rgba(0,180,216,0.1), rgba(123,44,191,0.2), rgba(0,255,135,0.1))` — Card backgrounds
- **Cell Metabolism**: `linear-gradient(0deg, #0D1117, #1A1A2E, #161B22)` — Body background

## Typography Roles

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| Display | Playfair Display | 400, 700, 900 | Hero headlines, section titles |
| Body | Source Sans 3 | 300, 400, 600 | Body text, navigation, UI elements |
| Accent | JetBrains Mono | 400, 500 | Code, technical details, badges |

### Scale

- Base: 16px
- Ratio: 1.25 (Major Third)
- xs: 0.75rem | sm: 0.875rem | md: 1rem | lg: 1.25rem | xl: 1.5rem
- 2xl: 2rem | 3xl: 2.5rem | 4xl: 3.5rem | 5xl: 4.5rem

## Spatial System

### Layout
- Max width: 1400px
- Grid: 12 columns
- Gutter: 2rem
- Breakpoints: xs, sm, md, lg, xl, 2xl

### Spacing Scale
- 0.25rem (4px) to 8rem (128px)
- Common: 1rem (16px), 1.5rem (24px), 2rem (32px), 3rem (48px), 4rem (64px), 6rem (96px)

### Border Radius
- sm: 4px | md: 8px | lg: 12px | xl: 16px | 2xl: 24px | full: 50px

## Motion Philosophy

Motion in the Bio-Engineering theme reflects organic processes:

### Primary Animations

1. **Bioluminescent Pulse** (3s ease-in-out, infinite)
   - Opacity cycles 0.3 → 1 → 0.3
   - Brightness boost to 1.3x with drop-shadow at peak
   - Used for: glowing dots, active indicators

2. **Membrane Breathing** (4s ease-in-out, infinite)
   - Scale oscillates 0.98 → 1.02
   - Border width 2px → 3px → 2px
   - Used for: card hover states, decorative cells

3. **DNA Rotation** (20s linear, infinite)
   - rotateY(0deg) → rotateY(360deg)
   - Used for: decorative DNA helix elements

4. **Organic Growth** (1.5s cubic-bezier(0.34, 1.56, 0.64, 1))
   - Scale 0.8 → 1
   - Opacity 0 → 1
   - Blur 4px → 0
   - Used for: scroll reveal animations

### Reduced Motion

All animations disabled for `prefers-reduced-motion: reduce`:
- Uses `animation: none !important`
- Scroll reveals disabled
- Page functions without motion gracefully

## Visual Assets

### Logo
- DNA helix symbol combined with "Phlix" wordmark
- Gradient fill (green → blue → purple)
- Animated pulse on the helix nodes
- Delivered as inline SVG for flexibility

### Favicon
- 32x32px square with rounded corners
- Dark background matching `#0D1117`
- DNA helix motif in gradient colors
- Glowing node animation

### OG Image (1200x630)
- Dark gradient background with organic glow spots
- Large DNA helix motif
- "Phlix" title in gradient text
- "GROWN, NOT BUILT" tagline
- Bioluminescent dot decorations
- Animated elements (subtle, loads on most platforms)

### Feature Icons
- Single-color, stroke-based inline SVGs
- Color: `currentColor` (inherits from context)
- Stroke width: 1.5px
- Standard 24x24 viewBox
- 8 icons: library, syncplay, transcode, shield, antenna, broadcast, puzzle, hub

## Component Design

### Buttons

**Primary**
- Gradient background (green → blue)
- Dark text
- 50px border-radius (pill shape)
- Hover: scale(1.05) + bioluminescent glow shadow
- Uppercase, letter-spacing: 0.1em

**Secondary**
- Transparent with green border
- Green text
- Hover: green background at 10% opacity + glow

**Ghost**
- Transparent with subtle border
- Used for tertiary actions

### Cards

**Feature Card**
- Semi-transparent background with backdrop blur
- Membrane-style border (subtle cyan at 20% opacity)
- 16px border radius
- Hover: border brightens to green, lift effect with shadow
- Decorative gradient glow on hover

**Client Card**
- Similar structure to feature cards
- Status badge in top-right (stable=green, beta=pink)
- Highlights rendered as pill badges

### Badges

- Pill shape with 50px radius
- Monospace font (JetBrains Mono)
- Uppercase, small text
- Color-coded by type (primary/secondary/accent/highlight)

### Navigation

- Fixed header with backdrop blur
- Semi-transparent dark background
- Subtle bottom border (membrane-style)
- Mobile: full-screen overlay menu with slide-in

### Footer

- Three-column grid layout
- Product / Developers / Project sections
- Tagline: "Open-source media, on your terms." in italic display font
- Copyright with dual licensing notice

## Technical Notes

### CSS Architecture
- Single-direction token flow: base.css → theme.css → components.css
- All colors/spacing defined as CSS custom properties in `:root`
- No raw hex values in component styles
- `overflow-wrap: anywhere` for body text in narrow contexts
- `minmax(0, 1fr)` for grid tracks to prevent overflow

### JavaScript
- Vanilla JS, no dependencies
- Deferred loading
- Handles: nav toggle, reduced motion, scroll reveals
- Touch device detection for hover state adjustments

### Accessibility
- WCAG 2.2 AA compliant contrast ratios
- Full keyboard navigation
- Visible focus indicators
- Skip link to main content
- ARIA labels on interactive elements
- Reduced motion respected

### Performance
- Self-hosted fonts (system font fallbacks initially)
- Inline SVGs for icons (no icon font CDN)
- CSS-only animations where possible
- Lazy loading ready for images
- No render-blocking JavaScript
