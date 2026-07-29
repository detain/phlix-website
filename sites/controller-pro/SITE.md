# Site Design: controller-pro

## Concept & Vision

controller-pro is a brand kit site for Phlix that channels the energy of competitive gaming and esports. It feels like walking into a tournament arena — dark, focused, with sharp neon accents that pulse with precision. Every element communicates speed, control, and competitive edge. The site is for people who take their media setup seriously and want gear that performs at a tournament level.

## Aesthetic Direction

Esports tournament aesthetic meets precision gaming hardware. Think RGB lighting strips against matte black surfaces, sharp angular shapes, and the clean focus of a pro gaming setup. The vibe is "tournament-grade equipment" not "casual gaming lounge."

## Color Palette

| Role | Name | Hex |
|------|------|-----|
| Background | Void Black | `#0A0A0A` |
| Surface | Matte Dark | `#1A1A1A` |
| Primary Accent | Neon Green | `#00FF88` |
| Secondary Accent | Hot Pink | `#FF0055` |
| Text | Pure White | `#FFFFFF` |
| Text Muted | Soft Gray | `#888888` |
| Border | Subtle Edge | `#333333` |

## Typography

- **Display:** Orbitron — angular, futuristic, gaming DNA
- **Body:** Rajdhani — clean, readable, technical precision
- **Mono:** JetBrains Mono — code blocks and technical elements

## Spatial System

- Spacing scale: 8px base unit (0.25rem increments)
- Border radius: 4px-16px, sharp to medium
- Max content width: 1400px
- Cards and surfaces use 1px borders with subtle glow effects

## Motion Philosophy

- Scroll reveals: fade + translateY on intersection
- Hover states: border glow effects (green primary, pink secondary)
- Reduced motion: all animations respect `prefers-reduced-motion`
- No excessive animation — motion serves focus, not decoration

## Visual Assets

- **logo.svg:** Wordmark with mini controller icon and RGB gradient strip accent
- **favicon.svg:** Square controller mark in primary neon green
- **og.png:** 1200x630 social card with logo and tagline

## Notes

- Self-hosted fonts via shared font pool
- No Google Fonts CDN
- All CSS uses custom properties for brand tokens
- Grid tracks use `minmax(0, 1fr)` for proper wrapping
