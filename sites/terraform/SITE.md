# Terraform Brand Kit — SITE.md

## Concept & Vision

The Terraform brand kit embodies the **Magician archetype** — reshaping digital worlds to suit your media needs. It draws visual inspiration from planetary terraforming: the transformation of barren worlds into habitable spaces. The aesthetic suggests that Phlix takes your scattered media files and reshapes them into a unified, accessible library.

The design language uses deep cosmic backgrounds with vibrant teal-green life-signs, evoking the first plants breaking through Martian soil. Atmospheric glows and crater formations add depth and visual interest, while colony dome imagery reinforces the "building something new" optimism.

## Aesthetic Direction

**Theme:** Planetary terraforming, crater formations, colony domes, mining drones

**Mood:** Transformative, technological, hopeful, expansive

**Key Visual Motifs:**
- Planetary orbs with orbital rings
- Crater textures and atmospheric layers
- Glowing terraforming pulses
- Deep space backgrounds with star fields
- Solar energy accents (warm gold)

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Vibrant teal-green | `#06D6A0` | CTAs, accents, active states |
| Secondary | Deep teal | `#1B998B` | Borders, secondary actions |
| Accent | Coral pink | `#EF476F` | Highlights, energy pulses |
| Dark | Cosmic navy | `#26547C` | Headers, depth elements |
| Light | Solar gold | `#FFD166` | Warm accents, badges |
| Background | Deep space | `#0D1B2A` | Page background |
| Surface | Dark surface | `#1B2838` | Cards, elevated surfaces |
| Text | Soft white | `#E8F1F2` | Body text |
| Text Muted | Gray-blue | `#7B8C9A` | Secondary text |

## Typography

| Role | Font | Fallback |
|------|------|----------|
| Display | Orbitron | Courier New, monospace |
| Heading | Exo 2 | Courier New, monospace |
| Body | IBM Plex Sans | Courier New, monospace |
| Mono | IBM Plex Mono | Courier New, monospace |

## Spatial System

Uses a 4px base unit with spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px.

Border radius: 4px (sm), 8px (md), 16px (lg), 24px (xl), 9999px (full).

## Motion Philosophy

- **Terraform pulse:** 4s ease-in-out animation on orbital ring elements
- **Glow pulse:** 3s ease-in-out box-shadow animation on hover states
- **Card reveals:** Staggered fade-in with 50ms delay per item via IntersectionObserver
- **All motion respects `prefers-reduced-motion: reduce`**

## Visual Assets

- **logo.svg:** Wordmark with orbital ring planet, Orbitron font
- **favicon.svg:** Square favicon with mini planet and ring
- **og.png:** 1200x630 social share image with deep space background, large planet, orbital ring, and brand text
- **Inline SVG icons:** Single-color, stroke-based, 24x24 viewBox, teal primary color

## CSS Architecture

Three stylesheets loaded in order:
1. `base.css` — Reset, tokens (:root CSS variables), base element styles
2. `theme.css` — Typography, layout containers, page structure sections
3. `components.css` — Header/nav, footer, buttons, cards, badges, forms

## Accessibility

- All text meets WCAG 2.2 AA contrast requirements (4.5:1 body, 3:1 large text)
- Full keyboard navigation with visible focus indicators
- ARIA landmarks and labels
- Skip-to-main-content link
- `prefers-reduced-motion` fully respected
- Touch targets minimum 44x44px
