# Android Dreams — Site Design Document

## Concept & Vision

Android Dreams is the Sentient AI brand kit for Phlix — a digital consciousness that organizes your media with mechanical precision. The site feels like peering into the mind of a thinking machine: iris apertures that dilate on hover, circuit traces that reveal themselves, and an AI avatar that evolves with use. The Sage archetype: intelligent, precise, mechanical.

## Aesthetic Direction

**Theme:** Cyberpunk, circuit board, wireframe hologram, mechanical precision
**Mood:** Watchful, calculating, alive, aware

The visual language draws from:
- HAL 9000's calm yet watchful presence
- Blade Runner 2049 sentient AI interfaces
- Aperture Science mechanical iris aesthetics
- CPU chip architectures and circuit board traces

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Charcoal Steel | `#2D3436` | Chrome surfaces, primary background |
| Secondary | Circuit Grey | `#636E72` | Secondary surfaces, inactive states |
| Tertiary | Steel Silver | `#B2BEC3` | Wire-frame elements, inactive text |
| Accent | Electric Cyan | `#00CEFF` | Active AI elements, CTAs, iris glow |
| Highlight | Alert Red | `#FF6B6B` | Notifications, errors, alerts |
| Background | Deep Slate | `#1A1D1E` | Page background (never pure black) |
| Surface | Panel Dark | `#2D3436` | Cards and panels |
| Surface Alt | Chip Surface | `#3D4447` | Nested panels, chip backgrounds |
| Text | Pure White | `#FFFFFF` | Primary text |
| Text Secondary | Soft Silver | `#B2BEC3` | Secondary text, labels |

## Typography

| Role | Font | Fallbacks | Usage |
|------|------|-----------|-------|
| Display | Orbitron | Rajdhani, Exo 2, Audiowide, system-ui | Headlines, hero text, AI status displays |
| Body | Share Tech Mono | Roboto Mono, Source Code Pro, monospace | Body text, UI labels, data readouts |
| Accent | Rajdhani | Exo 2, Orbitron, sans-serif | Navigation, buttons, badges |

**Typography rules:**
- Headlines: Orbitron, uppercase, 0.05em letter-spacing
- Body: Share Tech Mono for machine-interface feel
- No generic fonts (Inter, Roboto, Arial) — this is a defining characteristic

## Spatial System

| Token | Value | Usage |
|-------|-------|-------|
| `--space-0` | 0 | Reset |
| `--space-1` | 4px | Micro spacing |
| `--space-2` | 8px | Tight spacing |
| `--space-3` | 12px | Compact |
| `--space-4` | 16px | Default |
| `--space-5` | 24px | Section spacing |
| `--space-6` | 32px | Component padding |
| `--space-7` | 48px | Section gaps |
| `--space-8` | 64px | Large sections |
| `--space-9` | 96px | Hero spacing |
| `--space-10` | 128px | Maximum |

**Container:** 1400px max-width, 24px padding

## Motion Philosophy

Motion is smooth and mechanical, never organic or bouncy:

| Effect | Trigger | Duration | Easing |
|--------|---------|----------|--------|
| Iris Dilation | hover | 600ms | mechanical |
| Circuit Reveal | scroll | 1200ms | smooth |
| Eye Tracking | mousemove | 100ms | smooth |
| Servo Click | click | 150ms | mechanical |
| Wire-frame Build | scroll | 1000ms | smooth |
| Chip Pulse | active | 400ms | smooth |

**Easing curves:**
- Default: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` — smooth deceleration
- Smooth: `cubic-bezier(0.4, 0, 0.2, 1)` — standard ease
- Mechanical: `cubic-bezier(0.68, -0.15, 0.32, 1.15)` — precise, servo-like

**Reduced motion:** Respects `prefers-reduced-motion`. All animations disabled, static cyan highlighting on focus/hover instead.

## Visual Assets

### Logo
The Phlix wordmark with an integrated mechanical eye icon — concentric rings with circuit traces, cyan accent iris.

### Favicon
A simple mechanical eye mark in the primary color (#2D3436) with cyan iris.

### OG Image
1200×630 social share card with:
- Deep slate gradient background with circuit grid
- Large mechanical eye (left side)
- "PHLIX" wordmark in Orbitron
- Tagline: "Your media. Your library. Your Phlix."
- Feature pills: SyncPlay, Live TV+DVR, DLNA, Plugin System, Roku, Samsung Tizen, Windows, Mobile

### SVG Icons
Inline stroke-based icons (1.5px stroke) for:
- Library (folder with lines)
- SyncPlay (concentric circles with center dot)
- Transcode (hexagon with center)
- Auth (shield with checkmark)
- Live TV (monitor with antenna)
- DLNA (broadcast circles)
- Plugins (grid of squares)
- Hub (network nodes)

## Component Design

### Buttons
- **Primary:** Cyan background, charcoal text, uppercase, 0.1em letter-spacing
- **Secondary:** Transparent with cyan border
- **Ghost:** Transparent with grey text, cyan on hover
- All buttons: 44px minimum touch target
- Hover: brightness increase + cyan glow shadow

### Cards
- Surface background (#2D3436)
- 1px border in Circuit Grey (#636E72)
- 8px border-radius
- Hover: cyan border, translateY(-4px), cyan glow shadow
- Featured cards: cyan border + stronger glow

### Navigation
- Sticky header with backdrop blur
- Logo left, nav links right
- Links: Rajdhani uppercase, 0.1em letter-spacing
- Active link: cyan color + 2px cyan underline
- Mobile: hamburger toggle → full-width dropdown

### Footer
- Surface background
- 3-column grid: Product / Developers / Project
- Cyan tagline centered above columns
- Copyright line with license info

## Overlays

### Scan Lines
Repeating horizontal lines (2px transparent, 2px cyan at 3% opacity) creating a CRT effect. Fixed position, pointer-events none, z-index 9999.

### Vignette
Radial gradient from transparent center to semi-opaque slate edges. Creates depth and focuses attention on center content.

## Signature Elements

1. **Mechanical Eye:** Concentric rings with dilating iris, follows cursor
2. **Circuit Patterns:** Grid of faint grey lines that become visible on scroll
3. **Wire-frame Avatar:** Holographic humanoid figure that evolves with interactions
4. **Chip Pulse Animation:** CPU glow effect when processing
5. **Servo Click Feedback:** Precise mechanical click on button interactions

## Accessibility

- **Contrast:** All text pairs meet WCAG 2.2 AA (4.5:1 minimum, 7:1 for enhanced)
- **Focus indicators:** 2px cyan outline, 2px offset
- **Keyboard navigation:** Full reachability, visible focus states
- **Reduced motion:** Animations disabled, static states shown
- **Touch targets:** Minimum 44×44px
- **200% text zoom:** Layout survives without overlap

## Responsive Behavior

| Breakpoint | Layout Changes |
|------------|----------------|
| 1024px+ | Full layout, 4-column feature grid |
| 768px-1023px | 2-column grids, mobile nav toggle |
| 640px and below | Single column, smaller spacing |

At 320px: Content must not overflow, CTA buttons go full-width, footer columns stack.
