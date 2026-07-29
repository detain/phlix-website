# Session Studio — Brand Kit Site

## Concept & Vision

Session Studio evokes the precision and warmth of a professional recording studio. The aesthetic draws from mixing consoles, VU meters, and studio hardware — clean dark surfaces with warm indicator glows and cool LED accents. Every element feels intentional, measured, and professional.

## Aesthetic Direction

Professional recording studio with mixing console aesthetics. Dark, precise, warm accents against cool surfaces. The feel of a high-end studio at night — focused, quiet, powerful.

## Color Palette (Role → Name → Hex)

| Role | Name | Hex |
|------|------|-----|
| Primary | Steel Blue | `#3A6EA5` |
| Secondary | Teal (VU green) | `#4ECDC4` |
| Tertiary | Warm Orange (VU yellow) | `#FF8C00` |
| Background | Dark Charcoal | `#1C1C1C` |
| Surface | Console Panel | `#252525` |
| Surface Alt | Elevated Panel | `#2E2E2E` |
| Text | Light Gray | `#F5F5F5` |
| Text Muted | Muted Gray | `#A0A0A0` |
| Border | Panel Edge | `#404040` |
| Focus | Teal Focus | `#4ECDC4` |
| VU Green | LED Green | `#4ECDC4` |
| VU Yellow | LED Yellow | `#FF8C00` |
| VU Red | LED Red | `#FF4444` |

## Typography

- **Headlines**: Oswald (700, uppercase) — bold, studio-grade presence
- **Body**: Source Sans Pro (400, 600) — clean readability
- **Mono/Code**: Fira Code (400, 500) — precise technical feel
- **UI Elements**: Source Sans Pro (500) — clear interface text

## Spatial System

- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px
- Max content width: 1400px
- Container padding: 24px (6 units)
- Grid gaps: 24px (6 units)
- Border radius: 2-8px (subtle, precise)

## Motion Philosophy

- **Fast transitions (80ms)**: Micro-interactions like hover states
- **Base transitions (150ms)**: Card hovers, reveals
- **VU meter pulse**: Subtle ambient animation on hero bottom strip
- **Reduced motion**: All animations disabled when `prefers-reduced-motion: reduce`

## Visual Assets

- **Logo**: Wordmark "PHLIX" with VU meter bars and accent stripe
- **Favicon**: Square with VU meter bars and "P" letter
- **OG Image**: Generated via `tools/gen-og.mjs --site session-studio`
- **Icons**: Inline SVG, stroke-based, single-color matching theme

## Design Elements

- **VU meter LED strips**: Gradient bars at hero bottom (green → yellow → red)
- **Console panel shadows**: Subtle inset highlight + drop shadow for depth
- **LED indicators**: Small circular dots with glow shadows
- **Focus rings**: Teal (#4ECDC4) for accessibility
