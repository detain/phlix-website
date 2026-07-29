# Film Grain — Brand Kit

## Concept & Vision

Analog film grain texture, super 8mm home movies. Nostalgic warmth, dated timestamps, imperfect beauty. The visual language evokes the feeling of watching old family films — warm, intimate, slightly degraded in exactly the way that makes memories feel real. Not polished or clinical; textured, warm, and human.

## Aesthetic Direction

Super 8mm film aesthetic. Film grain texture overlaid on everything. Warm sepia/amber tones mixed with deep browns. Dated timestamp decorations. Film sprocket patterns as visual dividers. Slightly worn, imperfect feel — as if the site itself was once projected on a wall.

## Color Palette

| Role | Name | Hex |
|------|------|-----|
| Background | Dark Brown | `#1A1512` |
| Surface | Warm Dark | `#262019` |
| Surface Raised | Warm Mid | `#302820` |
| Primary | Film Amber | `#D4A574` |
| Accent | Vintage Gold | `#C9A227` |
| Accent Warm | Aged Bronze | `#8B7355` |
| Text | Warm Cream | `#F0E6D3` |
| Text Muted | Faded Amber | `#A89888` |
| Text Dim | Old Sepia | `#6B5B4F` |
| Border | Dark Brown | `#3D322A` |
| Border Light | Warm Edge | `#4A3D32` |

## Typography Roles

- **Display:** Playfair Display — elegant serif for headlines, evocative of vintage cinema title cards
- **Body:** Source Serif 4 — readable serif for body text, warm and literary
- **UI:** Space Grotesk — clean sans-serif for navigation and UI elements
- **Mono:** JetBrains Mono — for code blocks and technical content

## Spatial System

- `--space-1` through `--space-10` scale (0.25rem to 8rem)
- Generous padding in hero sections
- Comfortable reading widths (max 70ch for body text)
- Container max-width: 1400px; content max-width: 1200px

## Motion Philosophy

- Subtle film flicker animation on decorative date stamp elements
- Smooth hover transitions on cards (translateY + shadow lift)
- Scroll reveal animations for content sections (fade + slide up)
- All animations respect `prefers-reduced-motion`

## Visual Assets

- **logo.svg** — Film reel icon + Phlix wordmark with film strip decoration
- **favicon.svg** — Simple film reel mark in primary color on dark background
- **og.png** — Social share card (generated) with film grain texture overlay
- Inline SVG icons for all features (stroke-based, single color)
- CSS-generated film grain overlay on body via data URI SVG filter
- CSS-generated film strip patterns as decorative elements

## Component Notes

### Hero
- Super 8mm date stamp decoration (top-right corner)
- Film strip sprocket dots as bottom decoration
- Radial gradient overlays for depth and warmth

### Cards
- Subtle lift on hover with border-color accent transition
- Consistent border-radius (lg: 12px)

### Navigation
- Sticky header with blur backdrop
- Mobile drawer menu from right

### Footer
- 3-column grid layout
- Centered tagline in display font

### 404 Page
- Large "404" watermark in background (low opacity)
- Film strip decoration
- Recovery links to home, features, and download
