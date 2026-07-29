# electric-festival brand kit — SITE.md

## Concept & Vision

Electric Festival is a high-energy EDM brand kit inspired by massive electronic dance festivals — think UV blacklight stages, crowd energy, strobe patterns, and neon grid landscapes. The visual language is bold, immersive, and pulsing with electronic music culture. Every surface feels like it belongs on a festival main stage at 2 AM.

## Aesthetic Direction

Massive electronic dance festival with UV lights and crowd energy. Strobe patterns animate the background while neon grids create depth and rhythm. The overall effect should feel like stepping into a futuristic rave — dark, glowing, electric.

## Color Palette

| Role | Name | Hex |
|------|------|-----|
| Background | Near Black | `#0D0D0D` |
| Primary | Electric Purple | `#9D00FF` |
| Secondary | Neon Green | `#00FF9D` |
| Accent 1 | Hot Pink | `#FF0099` |
| Accent 2 | Electric Yellow | `#FFFF00` |
| Surface | Dark Surface | `#1A1A1A` |
| Surface 2 | Elevated Surface | `#252525` |
| Border | Subtle Border | `#333333` |
| Text | Primary Text | `#F0F0F0` |
| Text Muted | Muted Text | `#999999` |

## Typography

- **Display/Headlines**: Orbitron — futuristic, geometric, perfect for festival energy
- **Body**: Exo 2 — clean, readable, slightly technical feel
- **Monospace**: JetBrains Mono — for code blocks and technical content

## Spatial System

Base unit: 4px. All spacing uses multiples: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px.

## Motion Philosophy

- **Strobe rotation**: Slow conic gradient rotation (20s) on hero for ambient energy
- **Neon grid pulse**: Subtle CSS animation on background grid
- **Glow effects**: Box shadows with color-matched glow on interactive elements
- **Reveal animations**: Fade + translateY on scroll (IntersectionObserver)
- **Hover states**: translateY lift with enhanced glow
- **Reduced motion**: All animations respect `prefers-reduced-motion`

## Visual Assets

- **Logo**: SVG wordmark with gradient text and glowing P-mark with lightning bolt accent
- **Favicon**: Purple square with P-mark in neon green
- **Background**: Neon grid pattern with radial gradient mask
- **Noise texture**: SVG feTurbulence overlay for grain/depth
- **Icons**: Inline stroke-based SVG icons for features (library, syncplay, transcode, shield, antenna, broadcast, puzzle, hub)

## Component Inventory

- **Hero**: Full-height, neon grid background, strobe overlay, gradient headline, dual CTAs
- **Feature cards**: Surface background, border, hover glow, icon + title + body
- **Client cards**: Status badge, highlights list, source button
- **Code blocks**: Dark surface, bash label, monospace content
- **Buttons**: Primary (purple glow), Secondary (border only), Accent (green glow)
- **Footer**: Tagline, 3-column nav, gradient top border
- **404 page**: Glitch animation on error code, recovery links
