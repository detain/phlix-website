# Equalizer Brand Kit Site

## Concept & Vision

The equalizer site channels the aesthetic of professional audio equipment — the glowing LED meters, the tactile sliders, the precise frequency curves of a parametric equalizer. It's a dark interface with neon accents that feel like studio hardware, not consumer electronics. The experience should evoke tuning a live sound system: precise, technical, and satisfying.

## Aesthetic Direction

Audio frequency EQ visualization. Sliders, frequency curves, spectrum analyzers, LED meters. Think: mixing console in a darkened studio, VU meters pulsing green and amber, rack-mount gear with that distinctive brushed-metal-on-black look.

## Color Palette

| Role | Name | Hex |
|------|------|-----|
| Primary | LED Green | `#00FF88` |
| Secondary | LED Blue | `#0099FF` |
| Tertiary | LED Magenta | `#FF0080` |
| Quaternary | LED Yellow | `#FFCC00` |
| Background | Void Black | `#0D0D0D` |
| Surface | Dark Surface | `#1A1A1A` |
| Surface Alt | Elevated Dark | `#242424` |
| Text | Off-White | `#E8E8E8` |
| Neutral | Muted Gray | `#7A7A7A` |
| Border | Subtle Border | `#333333` |

## Typography

| Role | Font | Fallback |
|------|------|----------|
| Headlines | Orbitron | Bebas Neue, sans-serif |
| Display | Bebas Neue | sans-serif |
| Body | Barlow | system-ui, sans-serif |
| UI | Rajdhani | system-ui, sans-serif |
| Mono | Fira Code | Share Tech Mono, monospace |

## Spatial System

- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px
- Max content width: 1400px
- Content width: 900px
- Border radius: 2, 4, 8, 12, 999px

## Motion Philosophy

- LED glow effects on interactive elements (box-shadow)
- Spectrum bar animations on hero (randomized heights)
- Fade-in reveals on scroll (IntersectionObserver)
- Spring-like ease: `cubic-bezier(0.4, 0, 0.2, 1)`
- Durations: slow 400ms, medium 250ms, fast 150ms
- All animations respect `prefers-reduced-motion`

## Visual Assets

- **logo.svg** — Wordmark with EQ frequency bars motif in green LED
- **favicon.svg** — 32×32 square with mini EQ bars in green LED
- **og.png** — 1200×630 social card generated via `node tools/gen-og.mjs --site equalizer`

## Icon Strategy

Inline SVG icons in a sprite, single-color stroke-based matching the audio equipment aesthetic. 8 feature icons: library, syncplay, transcode, shield, antenna, broadcast, puzzle, hub.

## Responsive Behavior

Breakpoints: 380px, 480px, 640px, 768px+. Grid tracks use `minmax(0, 1fr)` to prevent overflow at narrow widths. Hero is full-height with content centered.

## Accessibility

- WCAG 2.2 AA compliant
- All text contrast ratios verified against background
- Keyboard navigable with visible focus indicators
- `prefers-reduced-motion` fully supported
- Skip link to main content
- ARIA landmarks: banner, navigation, main, contentinfo
