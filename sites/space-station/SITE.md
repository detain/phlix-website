# Space Station — Site Design Document

## Concept & Vision

A self-hostable media server site that feels like mission control aboard an orbiting space station. Clean sterile panels, ISS module aesthetics, docking ports, cyan glow accents against deep space black, and earth-view cupola imagery. The experience should feel technical, precise, and quietly futuristic — like sterile astronaut tech panels rather than flashy sci-fi.

## Aesthetic Direction

**Theme:** Orbiting space station, ISS modules, docking ports, earth-view cupola, sterile tech panels.

The visual language draws from real space station interiors: clean white and gray panels with subtle lighting, status indicators in cyan and orange, modular construction where each section has a clear purpose. The overall feeling is precision engineering — everything has a function, nothing is decorative for its own sake.

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Deep space black | `#0B0B15` | Page background, primary text on light surfaces |
| Secondary | Station navy | `#1A2A4A` | Secondary backgrounds, card surfaces |
| Accent | Cyan glow | `#00BFFF` | Links, CTAs, active states, glow effects |
| Alert | Orange alert | `#FF6B35` | Warnings, status indicators, secondary accents |
| Surface | Surface gray | `#E8E8E8` | Body text, light elements |
| Surface alt | Panel surface | `#111827` | Card backgrounds, elevated surfaces |
| Border | Dim border | `#1E3A5F` | Dividers, borders on dark surfaces |

## Typography

- **Display / Headlines:** Orbitron — sci-fi display face, used for h1-h2, numerals, and the logo wordmark. Uppercase with letter-spacing.
- **UI / Navigation:** Rajdhani — technical sans-serif with a space-age feel. Used for nav links, labels, buttons, and UI text.
- **Body:** Exo 2 — readable geometric sans-serif. Used for paragraphs and longer-form text.

All fonts are self-hosted WOFF2 from the shared font pool.

## Spatial System

- **Container max-width:** 1400px
- **Gutter:** 24px (6 units)
- **Spacing scale:** 4, 8, 12, 16, 24, 32, 48, 64, 96px
- **Border radius:** 3px (sm), 6px (md), 12px (lg), 18px (xl)

## Motion Philosophy

Subtle, purposeful motion inspired by space station systems:

- **Reveals:** Fade-in with slight upward translate on scroll (opacity + translateY)
- **Hover states:** Glow intensification on cards, color transitions on links
- **Reduced motion:** All animations respect `prefers-reduced-motion: reduce`

No bouncy or playful animations — the space station theme calls for precise, controlled motion.

## Visual Assets

- **Logo:** SVG space station lockup — core module with solar panels and docking ports
- **Favicon:** Simplified station mark in primary cyan on dark background
- **Hero illustration:** Inline SVG of space station with modules, solar panels, docking ports, and cupola
- **Feature icons:** Single-color stroke-based inline SVGs, cyan accent color
- **Background:** Subtle star field using CSS radial gradients

## Layout Archetype

Technical documentation style — clean grid-based layouts with clear section hierarchy, generous whitespace, and strong typographic contrast. Each section is a "module" with its own contained purpose.

## Component Notes

- **Cards:** Dark surface with cyan border on hover, subtle glow shadow
- **Code blocks:** Deep space black background, cyan monospace text, copy button
- **FAQ:** `<details>/<summary>` elements for expandable accordion
- **Footer:** 3-column grid with tagline above
- **Nav:** Sticky header with blur backdrop, cyan accent on active link

## Grid Rule

All CSS grids use `minmax(0, 1fr)` not bare `1fr` to prevent overflow issues with long unbreakable strings at narrow widths.
