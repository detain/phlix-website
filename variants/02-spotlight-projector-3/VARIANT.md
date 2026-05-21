# Variant 02-spotlight-projector-3 — Midnight Gallery

## Overview

This variant embodies the essence of an ultra-dark museum gallery. The design evokes quiet elegance where content is exhibited like precious artifacts under soft, focused illumination.

## Brand Identity

**Personality:** Restrained, Elegant, Quiet confidence, Museum curator, Art gallery

**Tagline:** "Your story. Our stage."

**Voice:** Refined, Confident, Slightly poetic, Museum whisper

## Design Decisions

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Deep Black | `#0A0A0C` | Primary background (ultra-dark) |
| Museum White | `#FAF9F6` | Body text, high-contrast elements |
| Antique Gold | `#C9A84C` | Accent, CTAs, active states |
| Text | `#1A1A1A` | Secondary text (on light backgrounds) |
| Muted | `#6B6B6B` | Secondary text, disabled states |

### Typography

| Role | Font | Weight |
|------|------|--------|
| Headlines | Cormorant | 400 (Regular) |
| Body | Cormorant | 400 (Regular) |
| UI | Source Sans Pro | 400, 600 |

### UI Style

- **Ultra-dark by default** — backgrounds so dark they feel infinite
- **Restrained gold** — antique gold used with extreme restraint, only for emphasis
- **Soft ambient light** — subtle radial gradients suggesting indirect gallery lighting
- **Museum borders** — delicate, whisper-thin borders rather than heavy strokes
- **Ambient pulse animation** — a barely perceptible light pulse in the header

### Do's

- Use antique gold sparingly
- Keep backgrounds ultra-dark
- Use subtle ambient light effects
- Maintain generous negative space
- Let content breathe like gallery pieces

### Don'ts

- Use bright or saturated colors
- Use heavy borders or glows
- Create visual noise or clutter
- Overuse gradients
- Add decorative elements

## Distinctive Features

1. **Ambient gallery lighting** — A soft, pulsing radial gradient from above creates the illusion of diffused gallery lighting
2. **Restrained gold accents** — Gold only appears on key interactive elements and subtle borders
3. **Elegant serif typography** — Cormorant font gives headlines an editorial, gallery-catalog feel
4. **Museum-white text on deep black** — Maximum contrast for readability without harshness
5. **Subtle surface elevations** — Cards use very faint surface colors rather than shadows

## Technical Notes

- **Self-hosted fonts** — WOFF2 format via local font files (Cormorant, Source Sans Pro)
- **font-display: swap** — Ensures text remains visible during font load
- **CSS custom properties** — Full brand token system via CSS variables
- **No framework** — Vanilla CSS and JS only
- **Responsive** — 320px to 1920px, mobile-first
- **Accessibility** — Skip link, focus styles, ARIA landmarks, prefers-reduced-motion

## File Structure

```
02-spotlight-projector-3/
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
│   └── components.css  # Buttons, cards, hero, nav, footer
├── js/
│   └── main.js          # Mobile nav toggle, smooth scroll, FAQ accordion
├── img/
│   ├── logo.svg         # Elegant "Ph" monogram with ambient glow
│   ├── og.svg           # Social sharing image
│   ├── favicon.svg      # Browser tab icon
│   └── PROMPTS.md       # AI image generation prompts
├── sitemap.xml
├── robots.txt
├── manifest.webmanifest
├── BUILD_LOG.md
├── VARIANT.md
└── content.json
```

## Content Source

All marketing copy rendered verbatim from `shared/content.json`.

## Implementation Date

May 2026
