# SITE.md — Neon Blossom

## Concept

Neon Blossom is a **bioluminescent night garden** — deep midnight black, electric floral color, and quiet magic that makes every surface feel alive. The site conveys watching media as stepping into a garden that only blooms after midnight. The overall feeling is of a painting that is slowly breathing.

## Palette

- **Midnight Black** `#08010F` — page background, the garden's night sky
- **Night Velvet** `#130822` — card and panel surfaces
- **Dusk Plum** `#1E0F38` — alternate elevated surfaces
- **Neon Hot Pink** `#FF2D78` — primary CTAs, dominant bloom accent
- **Electric Violet** `#9B30FF` — secondary actions, orchid highlights, links
- **Luminous Gold** `#FFD166` — firefly accents, mascot pollen, small emphasis
- **Leaf Green Glow** `#39FF85` — bioluminescent foliage, success states
- **Petal White** `#F0EBF8` — body text, slightly violet-tinted
- **Violet Mist** `#4A2070` — borders, dividers

## Typography

- **Display/Headline**: Cormorant Garamond 300/600 — elegant, slightly condensed, botanical calligraphic character. Large sizes get a soft text-shadow glow in primary color.
- **Body**: Lato 300/400 — clean and airy against dark backgrounds.
- **UI**: DM Sans 400/500/600 — buttons, labels, nav links.
- **Mono**: Fira Code 400/500 — code, tokens.

## Motion

- Slow, organic easing — `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- Bloom-fade transitions, petal-drift entrances, firefly flicker
- Mascot (Lumia) floats in a lazy figure-eight at rest
- All animations respect `prefers-reduced-motion`

## Mascot: Lumia

A luminescent moth with orchid-petal wings and gold pollen. Appears on Home, Features, and Download. Tips at specific page sections. Click 3× triggers spiral + pollen burst. Dismissible persistently via localStorage. Below 768px: in-flow (not fixed) to avoid covering CTAs.

## Easter Eggs

1. **Logo clicks: 7** — triggers Lumia's spiral animation
2. **Typed-word: "lumia"** — triggers a firefly burst on screen

Both are disabled while focus is in an input/textarea/contenteditable, and neither calls `preventDefault`.

## Seasonal Activation

The site ships with date-gated color overrides via JavaScript:
- Midnight Winter Bloom (Dec 1 – Jan 6)
- Spring Awakening (Mar 20 – May 31)
- Midsummer Firefly Festival (Jun 21 – Aug 31)
- Autumn Dusk Garden (Sep 22 – Nov 30)

## Fonts

Self-hosted from shared pool. Only declared weights used (Cormorant Garamond 300/600, Lato 300/400, DM Sans 400/500/600, Fira Code 400/500).
