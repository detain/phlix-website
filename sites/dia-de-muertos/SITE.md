# SITE.md — Día de Muertos brand kit site

## Concept & Vision

A Día de Muertos marketing site is an **ofrenda altar** — layered, luminous, and alive with
remembrance. The visitor is not a user, they are a guest at the altar. Every section is a
tier of the altar: candles and marigolds at the base, the hero offering in the middle, and
papel picado flags waving above. The palette is the deep dark of a Mexican cemetery at
midnight lit by ten thousand candles — #0C0512 — set against cempasúchil gold (#FFB800),
papel picado purple (#CC00BB), and calavera pink (#FF3355). The aesthetic is joyful
celebration, not morbid reminder.

## Aesthetic Direction

Mexican Day of the Dead folk art — Posada engraving line work meets Frida Kahlo color
richness. Sugar skulls are ornate and smiling. Marigold petals are everywhere as
leading lines and glow sources. Papel picado cut-paper patterns provide geometric
dividers and texture overlays. Composition is symmetrical and layered, echoing the
tiered architecture of a real ofrenda altar.

## Color Palette

| Token | Name | Hex | Role |
|---|---|---|---|
| `--color-primary` | Cempasúchil Gold | #FFB800 | Primary CTA, active nav, marigold glow |
| `--color-secondary` | Papel Picado Purple | #CC00BB | Links, purple accents; AA-safe: #D21FC3 on bg |
| `--color-tertiary` | Calavera Pink | #FF3355 | Badges, pink accents |
| `--color-bg` | Midnight Cemetery | #0C0512 | Page background |
| `--color-surface` | Ofrenda Shadow | #130820 | Cards, panels |
| `--color-surface-alt` | Altar Dark | #1A1030 | Alternate rows, nested panels |
| `--color-text` | Candlelight White | #FFF0E8 | Body, headlines (18.05:1 on bg) |
| `--color-neutral` | Incense Mauve | #5A4070 | Muted UI, dividers |
| `--color-border` | Petal Shadow | #2D1845 | Card borders, dividers |
| `--color-focus` | Marigold Focus Pulse | #FFB800 | Focus ring (2px + 4px glow) |

All contrast values measured per §19.1. The secondary (#CC00BB) achieves only 4.10:1
on bg — used at AA-safe #D21FC3 instead for any small-text/link use on bg.

## Typography Roles

| Role | Face | Weights | Notes |
|---|---|---|---|
| Headline | Playfair Display | 700, 900 | Dramatic serif; hero h1, section titles |
| Display | Cinzel Decorative | 400, 700 | Monumental ceremonial type; wordmark, stats |
| Body | Lora | 400, 500 | Warm readable serif; prose, feature bodies |
| UI | IBM Plex Sans | 400, 500, 600 | Buttons, labels, nav |
| Mono | IBM Plex Mono | 400, 600 | Code blocks, install command |

## Spatial System

8-step spacing scale (4px base): 4, 8, 12, 16, 24, 32, 48, 64, 96px. Generous warm dark
space is intentional — altar cloth needs room to breathe. Content max-width: 1400px.

## Motion Philosophy

Motion feels like candlelight — warm, flickering, alive, never mechanical. Speed is
medium (280–450ms). Easing is organic (ease-in-out, custom cubic-bezier). Marigold petal
fall is the signature loading/transition motif. Under `prefers-reduced-motion`, all
motion reduces to opacity fades and static states; the intensity toggle adds a further
`saturate(0.4)` filter to all glow effects.

## Visual Assets

Existing SVG assets preserved (logo.svg, favicon.svg, og.svg, og.png, icon PNGs,
PROMPTS.md). Text inside og.svg has been updated with the Día de Muertos tagline
headline. All SVG illustrations in HTML are inline folk-art style (Catrina figure,
ofrenda altar, candles, marigolds).

## Component Notes

- **Catrina mascot**: Bottom-right fixed, visible on home/features/download. Dismissible
  to localStorage. Tips appear at specific section anchors (home:#hero, .features-overview,
  download:#server, features:.feature-grid). Easter interactions: click:5 dance,
  hover-hold:3s heart whisper. §19.11: not fixed on mobile (<768px).
- **Intensity toggle**: "Soften the Flame" in footer utility row. Kills all CSS
  transitions AND animations via injected style tag (not just animation property).
  §19.2.
- **Seasonal activation**: Oct 31–Nov 2 triggers Día de Muertos Peak banner. No live
  palette override (no seasonal motif assets shipped).
- **404 page**: Catrina in empty cemetery SVG illustration, torn papel picado, broken
  candle, glowing marigold petal pointing the way home. recovery_links: home,
  features, download.

## Layout & Structure

Nine pages total (8 standard + 404). Nav: The Altar / The Offerings / The Paths /
Light the Candle / The Distance / Our Story — with plugins/docs demoted to
footer-shelved. Home page follows 5-section narrative arc: hero → why-watch →
the-offerings → gather-together → light-it.
