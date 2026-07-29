# Premiere Lens — Brand Kit Site

## Concept & Vision

Premiere Lens evokes the precision and craftsmanship of high-end camera lenses — the satisfying click of focus rings, the controlled aperture of light, the cinematic glow of lens flare. The design draws visitors into a world where media streaming is treated as an art form, with every interaction feeling deliberate and refined.

## Aesthetic Direction

**Reference:** Camera lens optics — aperture rings, depth of field rings, focus pull mechanics, precision glass elements, cinematic lens flare. The dark barrel of a pro lens, cyan reticles, and gold accent glints.

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Cyan | `#00CED1` | Focus ring accent, interactive elements, links |
| Secondary | Dark Blue-Gray | `#2C3E50` | Depth of field, secondary surfaces |
| Accent | Gold | `#FFD700` | Lens flare, highlights, badges |
| Background | Near Black | `#0D0D0D` | Lens barrel, main background |
| Surface | Dark Surface | `#1a1a1a` | Cards, elevated surfaces |
| Text | White | `#FFFFFF` | Primary text |
| Text Muted | Gray | `#a0a0a0` | Secondary text |

## Typography

- **Display:** Outfit (Google Font alternative: self-hosted Outfit) — bold geometric sans for headings
- **Body:** Source Sans 3 — clean, readable body text
- **Mono:** JetBrains Mono — code blocks, technical elements

## Spatial System

Based on a consistent spacing scale: 4px base unit (0.25rem increments).

- Spacing tokens: `--space-1` through `--space-32`
- Border radius: aperture-like precision corners (`0.25rem` to `1.5rem`)
- Max content width: `1400px`

## Motion Philosophy

- **Entrance:** Subtle fade + translate on scroll reveal (IntersectionObserver)
- **Hover:** Gentle lift with glow shadow on interactive cards
- **Navigation:** Smooth slide-in mobile menu with focus management
- **Reduced motion:** All animations respect `prefers-reduced-motion: reduce`

## Visual Assets

- **Logo:** Lens barrel with focus ring markings and aperture blade suggestion
- **Favicon:** Minimal lens icon on dark background
- **OG Image:** Lens-focused composition with brand typography
- **Icons:** Stroke-based inline SVG, single-color, matching cyan accent
- **Decorative:** Radial gradient overlays, concentric aperture ring patterns

## Component Patterns

- Cards with hover glow (`box-shadow: var(--shadow-glow)`)
- Cyan accent borders on pitch items
- Gradient text on hero title
- Code blocks with copy functionality
- FAQ using native `<details>/<summary>` for accessibility
