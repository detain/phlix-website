# Ambient Pulse — Site Design Rationale

## Concept & Vision

Ambient Pulse captures the essence of ambient music visualization — gentle breathing rhythms, soft gradients, and waveform art that evoke meditative calm. The site feels like watching a visualizer while relaxing in a dark room: organic, flowing, and unhurried.

## Aesthetic Direction

**Theme:** Ambient music visualization with gentle breathing rhythms and soft gradients. The design evokes a dark, immersive atmosphere with flowing waveform decorative elements that pulse with life.

## Color Palette

| Role          | Name           | Hex       |
|---------------|----------------|-----------|
| Background    | Deep Navy      | `#0D0D1A` |
| Surface       | Dark Purple    | `#1A1A2E` |
| Primary       | Medium Slate Blue | `#7B68EE` |
| Secondary     | Dark Turquoise | `#00CED1` |
| Accent        | Coral Pink     | `#FF6B9D` |
| Text          | Light Lavender | `#E8E8F0` |
| Text Muted    | Gray Lavender  | `#9090A8` |
| Text Dim      | Dim Gray       | `#606078` |

## Typography

- **Display:** Space Grotesk (headings, dramatic moments)
- **Body:** IBM Plex Sans (readable, modern)
- **Mono:** IBM Plex Mono (code, technical elements)

## Spatial System

Based on a 4px grid with spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px.

Corner radii: small (6px), medium (12px), large (20px), extra-large (32px).

## Motion Philosophy

- **Breathing animations:** Subtle scale/opacity pulses on hero gradients (8s cycle)
- **Waveform bars:** Gentle oscillating heights suggesting audio visualization
- **Scroll reveals:** Fade-in with upward translation, staggered for lists
- **Respect for `prefers-reduced-motion`:** All animations disabled when requested

All transitions use `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo) for a smooth, organic feel.

## Visual Assets

- **Logo:** Gradient wordmark "Phlix" with animated waveform pulse indicator
- **Favicon:** Dark square with simplified waveform bars in gradient
- **Icons:** Stroke-based inline SVGs, single-color, rounded joins
- **Decorative:** Radial gradient overlays, waveform bar animations
- **OG Image:** Generated via `tools/gen-og.mjs`

## Layout Archetype

Dark immersive single-page feel with generous vertical rhythm. Hero sections breathe with full-viewport height. Content sections use contained widths with responsive grids.

## Technical Notes

- No Google Fonts CDN — fonts are self-hosted WOFF2 from `shared/assets/fonts/`
- CSS custom properties for all tokens (colors, spacing, radii, shadows, fonts)
- Grid tracks use `minmax(0, 1fr)` to prevent overflow issues at narrow widths
- All `@copyright` declarations inside `/* */` comment blocks
