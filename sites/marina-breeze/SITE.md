# Site Design — Marina Breeze for Phlix

## Concept & Vision

Marina Breeze is a coastal nautical identity for Phlix — New England harbor town meets Mediterranean yacht club. The site should feel like stepping onto a sun-bleached dock on a perfect sailing afternoon: open, unhurried, optimistic, and a little adventurous. Every screen should feel like standing at an open porthole.

## Aesthetic Direction

**Mood:** Vintage sailing-club poster, heritage engraving, lighthouse-beam warmth.
**Art style:** Confident engraving-style line work over gentle watercolor washes of navy, teal, and sandy beige. Bright, coastal, diffuse midday sun.
**Anti-examples:** Not dark or moody, not cyberpunk or neon, not tropical kitsch, not industrial or corporate.

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Deep Water Navy | `#1B3A5C` | CTAs, headings, navigation |
| Secondary | Sea Glass Teal | `#5BA3A0` | Links, focus rings, secondary actions |
| Tertiary | Coral Pink | `#E07A5F` | Warm accent — ratings, favorites, hover glow |
| Neutral | Rope Tan | `#C9A97A` | Muted chrome, dividers |
| Background | Sailcloth White | `#F5F1E8` | Page background — warm off-white |
| Surface | Bright Sail | `#FDFAF4` | Card surfaces |
| Surface Alt | Sandy Beige | `#EDE3CC` | Alternate surfaces, table stripes |
| Text | Harbor Night | `#1A2535` | Body & headline text — never pure black |
| Success | Sea Spray | `#A8D5CF` | Success toasts |
| Warning | Amber Buoy | `#DDA84A` | Warnings |
| Error | Signal Red | `#C0443A` | Errors, destructive |
| Info | Harbor Teal | `#3A8C89` | Info banners |
| Focus | Teal Focus Ring | `#5BA3A0` | Keyboard focus ring |
| Border | Tide Line | `#2E4E6E` | Card borders, dividers |
| Shadow | Deep Harbour Shadow | `rgba(27,58,92,0.18)` | Navy-tinted drop shadows |
| Overlay | Midnight Tide | `rgba(13,31,51,0.65)` | Modal scrim |

## Gradients

- **Ocean to Sky** — `linear-gradient(160deg, #1B3A5C, #5BA3A0)` — Hero backdrops, feature section backgrounds
- **Lighthouse Sweep** — `radial-gradient(ellipse at 20% 10%, rgba(253,250,244,0.9), rgba(245,241,232,0.0))` — Soft sweeping-beam highlight behind hero subjects
- **Sunset Harbour** — `linear-gradient(135deg, #DDA84A, #E07A5F)` — Warm seasonal accents, promotional banners

## Typography

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| Headline / Display | Playfair Display | 700, 900 | Hero titles, section headlines, feature headings |
| Body | Lato | 400, 700 | Paragraphs, descriptions, long-form |
| UI | Inter | 400, 500, 600 | Buttons, labels, navigation, chips |
| Mono | JetBrains Mono | 400, 500 | Code, tokens, URLs |

**Rules:** Playfair Display is for headings only. Body text in Harbor Night (#1A2535). Keep body line-length 60–75 characters.

## Spatial System

Spacing scale (9 steps): `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96px`
Max content width: **1400px**, centered.
Minimum gutters: **24px**.

## Motion Philosophy

Motion should feel like wind filling a sail — gradual, purposeful, never frantic.
- **Hover:** Cards lift 3px + 1.015 scale (wave-swell feel)
- **Button press:** Gentle compress to 0.96
- **Loading:** Lighthouse beacon sweep animation
- **Transition:** Fade + horizontal slide, 250ms ease-out
- **Easing:** `ease-in-out` / `cubic-bezier(0.34, 1.56, 0.64, 1)` for microinteractions
- **Reduced motion:** Honor `prefers-reduced-motion` — replace lifts with opacity fades

## Layout Archetype

**Showcase / Editorial hybrid.** The home page leads with a full-bleed hero with open horizon, then feature trio, then social proof rail, then CTA — characteristic of the showcase archetype. Generous whitespace and classic typographic hierarchy give it an editorial quality.

## Visual Assets

| Asset | Description |
|-------|-------------|
| `img/logo.svg` | Playfair Display italic wordmark + compass rose mark, deep navy on sailcloth white |
| `img/favicon.svg` | Square compass rose mark in deep water navy |
| `img/og.svg` | 1200×630 social card: ocean-to-sky gradient, lighthouse sweep glow, logo, tagline |
| Inline SVG icons | 8 feature icons — outlined, 1.5px stroke, navy/teal, rounded caps/joins |

## Component Style Notes

- Cards: Bright Sail (#FDFAF4), 1.5px Tide Line border, 18px radius, 24px padding, hover lifts 3px
- Buttons: Primary = Deep Water Navy; Secondary = Sea Glass Teal; Ghost = outlined navy
- Badges: Pill shape, 1.5px outline; amber for quality (4K/HDR), teal for status (New/Continue), coral for Favorite
- Focus ring: 2px Sea Glass Teal with 2px sailcloth-white offset

## Brand Opposites (anti-checklist)

- NOT dark or moody
- NOT cyberpunk or neon
- NOT ultra-minimalist sterile
- NOT tropical/kitschy beach
- NOT industrial or gritty
- NOT corporate or over-polished
