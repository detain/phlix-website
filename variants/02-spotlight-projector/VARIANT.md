# Variant 02 — The Spotlight Projector

## Overview

This variant embodies the cinematic, theatrical essence of a personal home theater. The design evokes the warmth of projector light in a dark room, with gold accents cutting through deep black backgrounds.

## Brand Identity

**Personality:** Cinematic, Dramatic, Premium, Warm, Theatrical

**Tagline:** "Your Personal Cinema."

**Voice:** Warm, Story-driven, Slightly dramatic, Movie night energy

## Design Decisions

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Gold Spotlight | `#F5C542` | Primary accent, CTAs, active states |
| Deep Black | `#000000` | Backgrounds (dark mode by default) |
| Warm White | `#FFF7E6` | Body text, high-contrast elements |
| Burgundy | `#7A1F1F` | Secondary accent, subtle highlights |
| Soft Shadow Gray | `#3A3A3A` | Card backgrounds, surfaces |
| Amber Glow | `#FFB84D` | Hover states, glows |

### Typography

| Role | Font | Weight |
|------|------|--------|
| Headlines | Cinzel Bold | 700 |
| Body | Lora Regular | 400 |
| UI | Source Sans Pro | 500 |
| Code | Fira Code | 400 |

### UI Style

- **Dark mode by default** — deep black backgrounds with warm undertones
- **Gold accents** — used sparingly for emphasis, CTAs, and active states
- **Soft glows** — subtle lighting effects around key elements
- **Cinematic shadows** — layered depth through box-shadows with warm undertones
- **Animated spotlight sweep** — header motif: a sweeping light animation

### Do's

- Use gold for highlights
- Keep backgrounds dark
- Use soft lighting effects

### Don'ts

- Use neon colors
- Use flat black without texture
- Overuse gradients

## Distinctive Features

1. **Animated spotlight header** — A subtle sweeping light animation traverses the header, evoking a projector beam
2. **Gold glow effects** — Cards and buttons have a warm glow on hover
3. **Cinematic card design** — Feature cards have warm-tinted borders and shadow depth
4. **Dark hero section** — Full-viewport hero with radial spotlight gradients
5. **Theatrical typography** — Cinzel Bold for headlines creates a premium, cinematic feel

## Technical Notes

- **Self-hosted fonts** — WOFF2 format via Google Fonts CDN download
- **CSS custom properties** — Full brand token system via CSS variables
- **No framework** — Vanilla CSS and JS only
- **Responsive** — 320px to 1920px, mobile-first
- **Accessibility** — Skip link, focus styles, ARIA landmarks, prefers-reduced-motion

## File Structure

```
02-spotlight-projector/
├── index.html
├── features.html
├── clients.html
├── download.html
├── plugins.html
├── docs.html
├── hub.html
├── about.html
├── css/
│   ├── base.css        # Reset, variables, skip-link, focus
│   ├── theme.css       # Typography, header/footer, layout
│   └── components.css   # Buttons, cards, hero, nav, footer
├── js/
│   └── main.js         # Mobile nav toggle, smooth scroll
└── img/
    ├── logo.svg         # Projector beam "Ph" logo
    ├── og.svg           # Social sharing image
    ├── favicon.svg      # Browser tab icon
    └── PROMPTS.md       # AI image generation prompts
```

## Content Source

All marketing copy rendered verbatim from `shared/content.json`.

## Implementation Date

May 2026
