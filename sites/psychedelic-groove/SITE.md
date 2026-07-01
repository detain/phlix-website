# SITE.md — Psychedelic Groove

## Concept & Vision

Psychedelic Groove is the electric spirit of 1967 Haight-Ashbury at midnight under a blacklight — swirling paisley, acid-lime concert posters, the deep UV-indigo of a room lit only by ultraviolet tubes and day-glo paint. Every page should feel like a Fillmore West concert poster come to life: ultra-violet blooms against blacklight indigo, cosmic orange radiates warmth, acid lime shocks the eye with impossible brightness. The site wraps Phlix — a self-hostable PHP media server — in the free-spirited counterculture of the 1960s.

## Aesthetic Direction

**Art direction:** 1960s psychedelic concert poster — printed in day-glo inks under a blacklight, every color at maximum saturation, every line a swirling organic curve. Radial symmetry and kaleidoscope compositions over hard grids. Blacklight indigo is the void that makes every color glow.

**Keywords:** psychedelic, groovy, trippy, 1960s, counterculture, flower-power, blacklight, UV, day-glo, paisley, swirling, kaleidoscope, acid-lime, ultra-violet, cosmic-orange, peace, love, Woodstock, Haight-Ashbury, Peter-Max.

**Inspiration:** Peter Max poster art, Beatles Yellow Submarine, Woodstock festival posters, Grateful Dead skull-and-roses concert art, Jefferson Airplane concert posters, Sgt. Pepper's Lonely Hearts Club Band, Wes Wilson / Victor Moscoso Art Nouveau-psychedelic lettering.

## Color Table

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| `--color-primary` | Ultra Violet | #9B00FF | Primary CTAs, active states, UV anchor |
| `--color-secondary` | Cosmic Orange | #FF5500 | Secondary actions, warm counterpoint |
| `--color-tertiary` | Acid Lime | #CCFF00 | Accents, badges, electric shock |
| `--color-bg` | Blacklight Indigo | #0A0018 | Default page background |
| `--color-surface` | Deep Purple Haze | #120825 | Card/panel surfaces |
| `--color-surface-alt` | Violet Dark | #1A1030 | Alternate surfaces, hover states |
| `--color-text` | Lysergic White | #F5F0FF | Primary text on dark |
| `--color-neutral` | Muted Mauve | #6B5080 | Muted UI chrome, dividers |
| `--color-success` | Groovy Green | #39FF14 | Success states — day-glo green |
| `--color-warning` | Solar Flare | #FF9900 | Warnings, caution |
| `--color-error` | Lava Red | #FF2244 | Errors, destructive actions |
| `--color-info` | Aquarius Blue | #00CFFF | Informational banners |
| `--color-focus` | Peace Glow | #CCFF00 | Focus rings (2px acid lime) |
| `--color-border` | Dim Violet | #2D1A4A | Card borders, dividers |
| Gradient: Cosmic Rainbow | 135deg linear | #9B00FF → #FF5500 → #CCFF00 | Hero backdrops, section breaks |
| Gradient: UV Bloom Radial | Radial | rgba(155,0,255,0.45) → transparent | Blacklight halo behind hero subjects |

## Typography Roles

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Headline | Lobster | 400 | Dramatic page titles, hero headlines |
| Display | Fredoka One | 400 | Oversized numerals, splash text |
| Body | Nunito | 400, 600 | Descriptions, long-form reading |
| UI | Nunito | 600, 700 | Buttons, labels, navigation |
| Mono | Space Mono | 400, 700 | Code, technical readouts |
| Number | Fredoka One | 400 | Stats, counters, episode numbers |

**Typography rules:** Lobster headlines in sentence case; never small Lobster (<24px); Nunito body ≥15px; tracking slightly open (0.01–0.03em); left-align body, centered display type acceptable.

## Spatial System

Spacing scale (px): 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96

Border radius tokens: `--radius-sm: 8px` / `--radius-md: 16px` / `--radius-lg: 24px` / `--radius-xl: 40px` / `--radius-pill: 999px`

## Motion Philosophy

**Motion style:** Swirling, morphing, organic, breathing, cosmic. Animations are slow and hypnotic — nothing snaps or pops. The interface breathes like a lava lamp in slow motion.

**Animation speed:** Slow (800ms+ entrance, 250ms+ micro-interactions).

**Easing:** `ease-in-out`, `cubic-bezier(0.45, 0, 0.55, 1)`, `cubic-bezier(0.34, 1.56, 0.64, 1)` for spring.

**Key micro-interactions:**
- Cards: 2px UV glowing border + lift 4px + UV bloom shadow on hover, 250ms
- Primary button: rapid UV halo pulse on press, scale 0.97 → 1.0
- Focus: 2px acid-lime ring + 4px UV outer glow

**Reduced motion:** Honor `prefers-reduced-motion: reduce` — replace rotation with static stills, swirling transitions with cross-fades, breathing animations with opacity-only fades.

## Layout Archetype

**Showcase** — full-bleed psychedelic hero illustration with Lobster headline over cosmic-rainbow gradient → feature sections alternating blacklight/purple-haze → acid-lime CTA.

Selected because: the psychedelic identity demands maximum visual impact. A showcase layout puts the boldest expression front-and-center, creating an immediate "this is different" impression while the content follows a clear funnel toward download.

## Visual Assets List

- `img/logo.svg` — Wordmark in Lobster with paisley mandala, UV glow, acid-lime accent line
- `img/favicon.svg` — Ultra-violet rounded square, stylized "P" in lysergic white, acid-lime dot
- `img/og.svg` — 1200×630 social card: cosmic rainbow, paisley mandala, "Expand Your Universe."
- `img/PROMPTS.md` — Full prompt library for regenerating all assets
