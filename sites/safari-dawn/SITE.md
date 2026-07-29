# Safari Dawn — Brand Kit Site

## Concept & Vision

Safari Dawn captures the golden hour on the African savanna — the moment when the sun crests the horizon and long shadows stretch across the grass. The design evokes the romance of a wildlife documentary: warm amber light, the silhouette of an acacia tree, the promise of adventure. It feels like the start of a game drive, not a corporate marketing site.

## Aesthetic Direction

Inspired by nature photography from Kenya and Tanzania at sunrise. Warm, cinematic, slightly nostalgic. Not the harsh noon sun or the muted tones of dusk — specifically that magical 20-minute window when everything glows gold.

## Color Palette

| Role | Name | Hex |
|------|------|-----|
| Primary | Gold/Amber | `#D4A017` |
| Primary Light | Light Gold | `#E8B84A` |
| Primary Dark | Deep Gold | `#A67C00` |
| Secondary | Saddle Brown | `#8B4513` |
| Secondary Light | Sienna | `#A0522D` |
| Secondary Dark | Dark Brown | `#5C2E0A` |
| Accent | Dark Green | `#2E5A1C` |
| Accent Light | Light Green | `#4A7F30` |
| Accent Dark | Deep Green | `#1A3A10` |
| Background Light | Wheat Light | `#FFF8E7` |
| Background | Wheat | `#F5DEB3` |
| Background Dark | Wheat Dark | `#E8D4A8` |
| Dark | Near Black | `#1A1A1A` |
| Dark Brown | Dark Brown | `#2A1F14` |
| Sunrise | Orange | `#FF6B35` |
| Sunset | Red-Orange | `#C75146` |

## Typography

- **Display**: Playfair Display (serif) — dramatic, editorial, romantic
- **Body**: Source Sans 3 (sans-serif) — clean, readable, modern contrast
- **Mono**: JetBrains Mono / Fira Code — for code blocks

## Spatial System

Uses the standard spacing scale from the spec: `space-1` through `space-10`. Corner radii follow a consistent scale from `radius-sm: 4px` to `radius-full: 9999px`.

## Motion Philosophy

Subtle, organic motion — like grass swaying in a gentle breeze. Single high-impact reveal animation on page load (fade-in-up). No aggressive bounces or spins. Prefers-reduced-motion is fully respected.

## Visual Assets

- **Logo**: Stylized sun/sphere mark with serif wordmark and subtle acacia silhouette
- **Favicon**: Gold circle with dark center and orange highlight
- **OG Image**: 1200x630 social card with brand background, logo, and headline
- **Decorative**: CSS radial gradients simulating sun rays and golden atmosphere

## Component Notes

- Hero features a sun-ray decoration effect using CSS pseudo-elements
- Feature cards have a hover lift effect
- 404 page themed with "lost in the tall grass" messaging
- Footer uses dark brown background with golden accents

## Technical Notes

- Self-hosted fonts via @font-face (Playfair Display, Source Sans 3)
- No Google Fonts CDN
- CSS @copyright comments inside block comments
- Grid uses `minmax(0, 1fr)` not bare `1fr`
- All content from shared/content.json
