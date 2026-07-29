# Synthwave Sunset — Brand Kit Site

## Concept & Vision

80s retrofuturism with neon pink and cyan sunsets. Grid horizons, chrome reflections, and the optimistic glow of a decade that believed in the future. The site should feel like a VHS tape left in the sun — warm, slightly degraded, and unmistakably 1985.

## Aesthetic Direction

**Reference:** Outrun aesthetics, Kavinsky album art, Far Cry 3: Blood Dragon palette. The grid horizon is the defining motif — a perspective grid stretching to a split sunset (cyan above, pink below).

## Color Palette

| Role         | Name            | Hex       |
|--------------|-----------------|-----------|
| Primary      | Neon Pink       | `#FF2E63` |
| Secondary    | Electric Cyan   | `#08D9D6` |
| Dark         | Deep Space Blue | `#252A34` |
| Light        | Chrome White    | `#EAEAEA` |
| Accent       | Ultraviolet     | `#9D4EDD` |
| Background   | Night Sky       | `#1a1a2e` |
| Surface      | Panel           | `#252A34` |

## Typography

- **Display / Headlines:** Orbitron (Google Fonts alternative: self-hosted WOFF2 from shared pool)
- **Body / UI:** Rajdhani (Google Fonts alternative: self-hosted WOFF2 from shared pool)
- **Mono / Code:** JetBrains Mono

## Spatial System

Uses the standard Phlix spacing scale: `--space-1` through `--space-10`. No custom spacing values.

## Motion Philosophy

Animations are used sparingly and purposefully:
- Glow effects pulse subtly on hover (box-shadow transitions)
- Cards lift on hover with `translateY(-4px)`
- Scroll reveals via IntersectionObserver for below-the-fold content
- `prefers-reduced-motion` respected throughout

## Visual Assets

- **logo.svg** — Wordmark in neon pink with Orbitron P, cyan accent line, Rajdhani "hlix"
- **favicon.svg** — 32×32 rounded square, neon P on deep blue
- **og.png** — 1200×630 social card with grid horizon, neon gradient, Phlix wordmark
- **Feature icons** — Inline stroke SVG icons (Lucide-style, single color cyan)

## Component Notes

- **Hero glow** — Radial gradient behind the headline creates depth
- **Grid horizon** — `body::before` pseudo-element with repeating linear gradients
- **Glow shadows** — CSS custom properties for pink, cyan, and purple glows
- **CTA buttons** — Primary uses neon pink gradient + glow; secondary uses cyan border + glow

## Implementation Notes

- Self-hosted fonts from `shared/assets/fonts/` (no external CDN)
- Grid tracks use `minmax(0, 1fr)` to prevent overflow at narrow widths
- `@copyright` banners present in all CSS and JS files
- All 8 pages + 404.html, robots.txt, sitemap.xml generated
- JSON-LD SoftwareApplication schema on home page
