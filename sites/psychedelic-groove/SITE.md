# SITE.md — Psychedelic Groove

## Concept & Vision

Psychedelic Groove channels the electric spirit of 1967 Haight-Ashbury at midnight under a blacklight — swirling paisley, acid-lime concert posters, the deep UV-indigo of a room lit only by ultraviolet tubes and day-glo paint. The site should feel like a 1960s concert poster come to life: every color cranked to maximum, every edge swirls, every transition breathes.

## Aesthetic Direction

Art direction: **1960s psychedelic concert poster / Peter Max / blacklight poster art**. Maximum saturation. Radial symmetry and organic curves. Deep UV-indigo background (#0A0018) that makes every accent color appear to glow with UV fluorescence.

## Color Palette

| Role | Name | Hex | Usage |
|---|---|---|---|
| Primary | Ultra Violet | `#9B00FF` | Primary CTAs, active states, UV anchor |
| Secondary | Cosmic Orange | `#FF5500` | Secondary actions, warm counterpoint |
| Tertiary | Acid Lime | `#CCFF00` | Accents, badges, electric highlights |
| Background | Blacklight Indigo | `#0A0018` | Default page background |
| Surface | Deep Purple Haze | `#120825` | Card and panel surfaces |
| Surface Alt | Violet Dark | `#1A1030` | Alternate surfaces, hover states |
| Text | Lysergic White | `#F5F0FF` | Primary text on dark backgrounds |
| Neutral | Muted Mauve | `#6B5080` | Muted UI chrome, dividers |
| Border | Dim Violet | `#2D1A4A` | Card borders, dividers |
| Success | Groovy Green | `#39FF14` | Success toasts, confirmations |
| Warning | Solar Flare | `#FF9900` | Warnings, caution states |
| Error | Lava Red | `#FF2244` | Errors, destructive actions |
| Info | Aquarius Blue | `#00CFFF` | Informational banners |
| Focus | Peace Glow | `#CCFF00` | Keyboard focus ring (acid lime) |

**Gradients:**
- `Cosmic Rainbow`: 135° linear #9B00FF → #FF5500 → #CCFF00 — hero backdrops, dramatic breaks
- `UV Bloom Radial`: radial rgba(155,0,255,0.45) → transparent — blacklight halo effect

## Typography

| Role | Family | Weight | Usage |
|---|---|---|---|
| Headline | Lobster | 400 | Dramatic page titles, hero headlines, swirling organic letterforms |
| Display | Lobster | 400 | Oversized numerals, splash cards (Fredoka One not in pool; Lobster is the closest flowing alternative) |
| Body | Nunito | 400, 600 | Descriptions, synopses, long-form reading |
| UI | Nunito | 600, 700 | Buttons, labels, navigation, chips |
| Mono | Space Mono | 400, 700 | Code, tokens, technical readouts |

**Note:** Fredoka One (display and number roles) is NOT in the shared font pool. Escalated. Using Lobster for these roles — it carries the same flowing, organic psychedelic letterform quality.

**Emphasis:** `<strong>` uses `font-weight: 600` (200-unit step from body 400).

## Spatial System

- **Spacing scale**: 4, 8, 12, 16, 24, 32, 48, 64, 96px
- **Corner radius**: 8px (sm), 16px (md), 24px (lg), 40px (xl), 999px (pill)
- **Content max-width**: 1440px; text content: 1200px
- **Border**: 2px solid, rounded, with UV glow shadows

## Motion Philosophy

**Slow, organic, breathing** — nothing snaps or pops. Animations evoke a lava lamp: slow, organic, soothing. All motion disabled under `prefers-reduced-motion`.

- Entrance: gentle float-in from below + fade (300-450ms ease-in-out)
- Card hover: 2px UV glowing border + 4px lift + UV bloom shadow (250ms ease-in-out)
- Button press: UV halo pulse ring → scale 0.97 → 1.0
- Loading: Slowly rotating mandala (UV + orange + lime)
- Scroll reveals: IntersectionObserver fade-ins at 12% threshold

## Visual Assets

- **Mascot**: Paisley — a morphing cartoon paisley teardrop with kaleidoscope eyes, UV glow halo. Bottom-right corner, gently floating idle animation.
- **Decorative**: Swirling mandala SVG rings in hero. Paisley background watermark at 4-8% opacity.
- **Icons**: Inline SVG, rounded 2px stroke, fully rounded caps/joins, in brand accent colors.
- **Images**: CSS/SVG-only artwork (no raster images needed for brand kit).
- **Favicon**: Simple paisley mark in ultra-violet on blacklight indigo.

## Seasonal Variants

Three live-JS date-gated variants (activated by JS in main.js):
- **Summer Solstice** (06-18–06-24): primary→orange, secondary→lime, tertiary→hot-pink
- **Harvest Moon Festival** (10-01–10-31): primary→orange, secondary→UV, surface→#1A0A00
- **Peace & Love Winter** (12-21–01-01): primary→aqua, secondary→UV, tertiary→lime

## Accessibility

- WCAG 2.2 AA baseline: body text ≥4.5:1, large text/UI ≥3:1
- Keyboard navigation with visible acid-lime focus ring + UV outer halo
- `prefers-reduced-motion` honored: all animations disabled, mascots static, reveals instant
- 200% text zoom survives without clipping
- Touch targets ≥44×44px
