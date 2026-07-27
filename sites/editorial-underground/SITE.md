# SITE.md — Editorial Underground

## Concept & Vision

Editorial Underground is the visual language of the copy shop at midnight — black ink bleeding through cheap paper, electric yellow highlighter dragged across a headline that demands to be read. It is Factory Records sleeve art and CBGB bathroom walls, Jamie Reid ransom-note lettering and Guy Debord Situationist pamphlets run off on a dying photocopier.

Anti-corporate, anti-aesthetic, anti-permission. Built for the viewer who does not ask for access — they take it.

**Zine archetype.** First of its kind in the 50-kit program. Sets the precedent for this archetype.

---

## Aesthetic Direction

**Visual style:** Punk zine cut-and-paste, high-contrast anti-design, underground press editorial, DIY screen print, xerox photocopy distress.

Every composition should feel like it was assembled by hand at speed. Grid-breaking, asymmetric, typographically aggressive. No gradients. No rounded corners. No softness.

---

## Color Table

| Role | Name | Hex | Notes |
|------|------|-----|-------|
| Primary | Electric Yellow | `#FFE500` | CTAs, active states, headline highlights. Signal, not decoration. |
| Secondary | Punk Magenta | `#FF0066` | Error/alarm only. Never decorative. |
| Background | Xerox Black | `#0A0A08` | Default page background. Darkroom black. |
| Surface | Bleed Black | `#111110` | Cards, panels. One step above background. |
| Surface Alt | Print Register | `#181816` | Striped rows, nested panels, hover states. |
| Text | Paper White | `#F5F5F0` | Primary body and headline text. Near-white, photocopied tone. |
| Border | Ink Line | `#2A2A28` | Card borders, structural dividers. |

All WCAG AA measured. Electric Yellow on Xerox Black = 15.53:1. Paper White on Xerox Black = 18.12:1. Punk Magenta on Xerox Black = 5.14:1.

---

## Typography Roles

| Role | Family | Weight | Notes |
|------|--------|--------|-------|
| Headline | Anton | 400 | Dramatic page titles, hero headlines. Always uppercase. Zero tracking. |
| Display | Oswald | 700 | Oversized section headers. Bold only. |
| Body | Space Mono | 400, 700 | All body copy, descriptions. Typewriter aesthetic. 1.7 line-height. |
| UI | Space Mono | 400, 700 | Buttons, labels, navigation. Same typewriter voice. |
| Mono | Space Mono | 400, 700 | Code, tokens, counters. |
| Number | Anton | 400 | Stats, counts. |

`<strong>` uses `font-weight: 700` (body face declared at 400/700).

---

## Spatial System

Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px.

Zero radius everywhere by default. Only `--radius-xl: 2px` exists for exceptional cases.

---

## Motion Philosophy

**Hard cuts only.** No easing, no interpolation, no transitions with a curve. State changes are instantaneous or step-function.

- Micro-interactions: instant on hover/press
- Hover: 2px electric-yellow border appears at 0ms
- Button press: colors invert at 0ms
- Focus: 2px yellow ring in direct contact with element edge, instant
- Loading: step-function progress bar (steps, not smooth)
- Reduced motion: already compliant — motion is step-based, reduced-motion removes the step timing

Under `prefers-reduced-motion`, the slash dividers remain static (no animation). The page becomes plain continuous scroll with instant section boundaries.

---

## Visual Assets

| Asset | Description |
|-------|-------------|
| `img/logo.svg` | Anton uppercase wordmark, Paper White on Xerox Black, 2px yellow rectangular border, zero radius |
| `img/favicon.svg` | Square mark in Electric Yellow on Xerox Black |
| `img/og.png` | 1200×630 social card |
| `img/PROMPTS.md` | Exact generation prompts for image assets |

Mascot: **Riot** — safety-pin-and-lightning-bolt icon, electric yellow on black. Bottom-left corner on all pages except docs. Static under reduced-motion.

---

## Signature Elements

- Cut-and-paste ransom-letter typographic collage headlines
- High-contrast halftone dot patterns on surface areas
- Safety-pin graphic device as structural divider
- Diagonal slash separators (yellow, skewX -20deg)
- Electric yellow highlight bars behind key text
- Registration-mark corner accents
- Zero-radius everywhere

---

## Layout Archetype

Full-bleed Xerox Black background. Content left-aligned on wider viewports (max 1400px). Hard-cut diagonal slash dividers between major sections. Dense information layout with 2px borders throughout. No centering, no symmetry.
