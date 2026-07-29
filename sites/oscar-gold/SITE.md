# Oscar Gold — Phlix Brand Kit Site

## Concept & Vision

Oscar Gold channels the prestige of Academy Award night — the golden statuette glow, deep burgundy carpets, and black-tie elegance. This brand kit celebrates self-hosted media's ascent from hobby project to professional-grade entertainment infrastructure. Every detail whispers "you've arrived."

## Aesthetic Direction

Inspired by classic Hollywood premieres and Art Deco luxury. Deep, warm darkness punctuated by brilliant gold. The visual language of achievement, sophistication, and earned prestige.

## Color Palette

| Role | Name | Hex |
|------|------|-----|
| Primary | Champagne Gold | `#C9A227` |
| Primary Bright | Bright Gold | `#FFD700` |
| Secondary | Dark Burgundy | `#8B0000` |
| Background | Deep Burgundy-Black | `#1A0F0A` |
| Surface | Elevated Surface | `#2D1B14` |
| Surface Raised | Cards & Modals | `#3D2519` |
| Text | Cream/Beige | `#F5F5DC` |
| Text Muted | Muted Beige | `#BDB49A` |
| Text Inverse | Dark (on light) | `#1A0F0A` |

## Typography

- **Display**: Playfair Display (Georgia/Times fallback) — elegant serif for headlines, evokes classic Hollywood
- **Body**: Source Sans 3 (sans-serif fallback) — clean, readable body text
- **UI**: Source Sans 3 — navigation, buttons, labels
- **Mono**: JetBrains Mono (monospace fallback) — code blocks, technical elements

All fonts are self-hosted with `font-display: swap` for performance.

## Spatial System

Base unit: 4px. Scale follows: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96px.

Maximum content width: 1400px (layout), 1200px (content).

## Motion Philosophy

Animations are subtle and prestigious:
- Fade-in-up reveals (600ms ease)
- Gold glow shadows on hover (200ms)
- Smooth transitions on interactive elements (150-250ms)

Motion is disabled for `prefers-reduced-motion: reduce`.

## Visual Assets

- **Logo**: SVG with award statuette silhouette + "Phlix" wordmark in gradient gold
- **Favicon**: Square mark in primary gold on dark burgundy background
- **OG Image**: 1200×630 social card with gold gradient background, logo, and tagline

## Layout Archetype

Dark luxury with golden accents. Generous whitespace on hero sections, denser content grids on interior pages. Asymmetric gold accent lines as section dividers.

## Component Patterns

- Cards: Dark surface with gold border on hover, subtle glow shadow
- Buttons: Primary = gold gradient with glow; Secondary = transparent with gold border
- Badges: Pill-shaped with theme-aware colors (stable=green, beta=gold, deprecated=red)
- FAQ: Native `<details>/<summary>` with gold plus/close indicator
- Code blocks: Dark surface with gold left border accent

## Responsive Behavior

Fluid typography (clamp-based). Grid collapses gracefully: 4-col → 2-col → 1-col. Mobile nav is hamburger menu. Breakpoints at 480px, 768px, 1024px, 1280px.

## Accessibility

- WCAG 2.2 AA compliant
- 4.5:1 minimum contrast for text
- 3:1 for large text and UI components
- Visible focus indicators
- Keyboard navigable
- `prefers-reduced-motion` respected
