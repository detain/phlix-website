# Wild-West Brand Kit — Design Rationale

## Concept & Vision

A dusty frontier town aesthetic for Phlix — evoking wanted posters, saloon doors, and the scorched earth of the old west. The interface should feel like a weathered telegram or bounty notice: warm browns, hand-painted signage vibes, and bold star accents.

## Aesthetic Direction

Old West frontier town: wanted posters, saloon doors, dusty main street, six-shooter, tumbleweed, scorched earth.

**Mood:** Rugged but inviting — the warmth of a saloon interior combined with the vastness of open range.

## Color Palette

| Role | Name | Hex |
|------|------|-----|
| Primary (backgrounds) | Dark Wood | `#2C1810` |
| Primary Dark | Charred | `#1a0f09` |
| Secondary | Saddle Brown | `#8B4513` |
| Accent | Tan/Gold | `#D4A574` |
| Muted | Dusty Tan | `#C19A6B` |
| Light/Text | Wheat | `#F5DEB3` |
| Surface | Weathered Wood | `#3d2317` |
| Surface 2 | Aged Plank | `#4a2a1d` |

## Typography

- **Display/Headings:** Playfair Display (serif) — evokes old-west signage and newspaper headlines
- **Body:** Source Sans Pro (sans-serif) — clean, readable companion
- **Mono:** Fira Code (monospace) — for code blocks and terminal commands

## Spatial System

- 8px base unit, 4px half-unit
- Generous padding on hero sections (80-96px vertical)
- Compact feature cards (20-24px padding)
- Border radius: 4-16px scale with frontier-appropriate rounded corners

## Motion Philosophy

- Subtle fade-in reveals on scroll (no flashy transitions)
- Hover states with slight lift and shadow — like cards being picked up
- No bouncy or playful motion — deliberate, measured movement fitting the theme
- Respects `prefers-reduced-motion`

## Visual Assets

- **Logo:** Wood-plank background with wanted-star accent and serif wordmark
- **Favicon:** Dark background with tan star — matches wanted poster aesthetic
- **Decorative elements:** Subtle wood-grain textures, radial gradient atmosphere, star accents
- **Icons:** Single-color stroke-based inline SVGs matching the frontier theme

## Component Notes

- **Buttons:** Warm browns with gold hover states, slight lift on interaction
- **Cards:** Weathered wood background with tan accent border-top
- **Code blocks:** Dark terminal aesthetic with saddle-brown label badge
- **Badges:** Status-appropriate colors (green=stable, amber=beta, gray=deprecated)
- **FAQ:** `<details>/<summary>` elements styled as bounty questions
