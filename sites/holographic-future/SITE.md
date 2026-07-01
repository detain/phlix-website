# Holographic Future — Phlix Brand Kit Site

## Concept & Vision

The Holographic Future kit dresses Phlix in the visual language of tomorrow: prismatic chrome surfaces that shift through the visible spectrum as light catches each edge, translucent AR-style floating panels, and midnight-dark backgrounds that let iridescence glow with maximum impact. The site should feel like holding a holographic foil trading card under studio lighting — premium, precise, and luminous. Every surface refracts. Every interaction shimmers.

## Aesthetic Direction

**Archetype**: Magician — visionary, transformative, precise.
**Mood**: Awe, exclusivity, wonder, confidence.
**Reference points**: Apple Vision Pro spatial computing UI, holographic foil collector cards, dichroic glass art, sci-fi HUD design (Minority Report, Blade Runner 2049).

The identity is built on a foundation of **midnight blue-black** (`#0D1117`) with **electric blue** (`#0096FF`) as the mandatory anchor accent. Rainbow iridescence is the spectacle — used sparingly, always impactful. Chrome white (`#F0F4F8`) text on midnight achieves ~14:1 contrast. Glassmorphism with `backdrop-filter: blur` gives every panel its characteristic translucent depth.

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| primary | Electric Blue | `#0096FF` | CTAs, active states, focus rings, glowing accents |
| secondary | Prismatic Violet | `#8B5CF6` | Secondary actions, hover highlights |
| tertiary | Iridescent Cyan | `#22D3EE` | Tags, progress indicators, tertiary highlights |
| background | Chrome White | `#F0F4F8` | Light-mode page background |
| surface | Frosted Glass | `rgba(255,255,255,0.06)` | Card/panel surfaces |
| surface_alt | Midnight Panel | `#0D1117` | Dark-mode background |
| text | Chrome White | `#F0F4F8` | Primary text on dark surfaces |
| text_muted | Platinum Silver | `#C8D0DA` | Secondary text, dividers |
| success | Aurora Green | `#34D399` | Success states |
| warning | Solar Amber | `#FBBF24` | Warnings |
| error | Plasma Red | `#F43F5E` | Errors, destructive actions |
| info | Photon Blue | `#38BDF8` | Informational |
| border | Prism Edge | `rgba(255,255,255,0.12)` | Glass panel borders |

**Key gradients**:
- Chrome Aurora: `linear-gradient(135deg, #0096FF, #8B5CF6)` — primary CTA fill
- Prismatic Spectrum: `linear-gradient(120deg, #FF0080, #FF8C00, #FFE600, #00FF88, #0096FF, #8B5CF6)` — hero shimmer overlays
- Holographic Sheen: `linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.25), rgba(255,255,255,0))` — animate-able foil sweep

## Typography

| Role | Family | Weight | Usage |
|------|--------|--------|-------|
| headline | Orbitron | 300, 400, 700 | Hero titles, section headers, display numerals. Uppercase/title case, 0.08em tracking |
| display | Space Grotesk | 300, 700 | Oversized display text, splash numbers |
| body | Inter | 300, 400 | Paragraphs, descriptions, 0.01em tracking, 1.65 line-height |
| ui | Space Grotesk | 400, 500, 600 | Buttons, labels, navigation, tags |
| mono | JetBrains Mono | 300, 400 | Code snippets, diagnostics |
| number | Orbitron | 700 | Stats, counters, KPIs |

## Spatial System

4px base scale: `4, 8, 12, 16, 24, 32, 48, 64, 96px`

Corner radius: `4px` (sm), `8px` (md), `16px` (lg), `24px` (xl), `999px` (pill)

Max content width: `1200px`
Max site width: `1440px`

## Motion Philosophy

Motion should feel like a precision instrument — fluid, continuous, never abrupt. The signature effect is the **holographic sheen sweep**: a `linear-gradient` light sweep that simulates iridescent foil catching light.

- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` for enter transitions
- Animation speed: medium
- Microinteractions: hover card sheen + electric blue border glow; button press chromatic aberration (3px offset, 120ms snap)
- **Reduced motion**: shimmer sweeps and spectrum animations are disabled via `prefers-reduced-motion: reduce`

## Visual Assets

- **logo.svg**: Orbitron wordmark "PHLIX" + geometric prism mark in Chrome Aurora gradient on midnight
- **favicon.svg**: 32x32 electric blue rounded square with white prism mark
- **og.svg**: 1200x630 midnight background, geometric wireframe grid at 4% opacity, prism mark, Orbitron wordmark, "The Future, Now Playing." tagline
- **Feature icons**: 7 inline SVGs, thin stroke (1.5px), geometric, electric blue on dark surfaces

## Signature Motifs

- Prismatic light-dispersion spectrum sweep (animated on hero)
- Floating translucent glassmorphism panels at multiple Z-depths
- Razor-thin geometric wireframe grids at low opacity
- Electric blue glowing edge lines on key UI elements
- Cool midnight backgrounds with subtle depth gradients

## Accessibility

- WCAG 2.2 AA: Chrome white on midnight achieves ~14:1 (body), ~11:1 (large text)
- Focus: 4px electric blue glow ring (`box-shadow: 0 0 0 2px #0D1117, 0 0 0 4px #0096FF`)
- Touch targets: 44x44px minimum
- `prefers-reduced-motion`: all shimmer/spectrum animations disabled
- 200% text zoom: all layouts reflow without clipping
- Color never used alone to convey information — always paired with icon or label

## Layout Archetype

**Immersive** — The holographic aesthetic demands layered depth. Hero takes full viewport with animated spectrum sweep. Glassmorphism cards float above midnight backgrounds. Layout uses generous negative space carved from chrome darkness.

## Brand Opposites Checklist

The site must NOT be:
- Warm, nostalgic, or cozy
- Earthy, organic, or hand-crafted
- Cartoonish or playful-soft
- High-contrast flat design
- Dark without luminous depth
- Matte or textured-rough
- Pastel or desaturated
- Corporate-grey monotone

## Avoid Words

Never use in micro-copy: `awesome`, `amazing`, `leverage`, `synergy`, `magic`, `cozy`, `warm`, `nostalgic`, `simple`, `easy`
