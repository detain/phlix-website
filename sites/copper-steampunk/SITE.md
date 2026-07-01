# SITE.md — Copper Steampunk Brand Kit Site

## Concept & Vision

Copper Steampunk is the marriage of Victorian engineering and modern media — warm amber copper, aged leather, riveted iron, and oxidized brass at every turn. The Phlix marketing site, dressed in this identity, feels like stepping into Professor Aldous Pemberton-Hale's copper-clad workshop beneath the gas lamps of Whitechapel: purposeful, mechanical, and brimming with discovery. Every surface is textured and weighty; every interaction is deliberate and precise. This is not a tech startup site — it is an inventor's workshop rendered in pixels.

## Aesthetic Direction

Artwork evokes a Victorian engineering plate or a hand-engraved instrument manual: rich cross-hatching on dark surfaces, polished copper highlights catching warm amber gas-lamp light, aged patina on brass fittings. Compositions are dense with purposeful detail — gears, pipes, gauges — but never cluttered; every element earns its presence. Backgrounds are deep mahogany (#2C1A0E) or riveted soot-black iron (#1A1208), never white or cream. Accent glows come from burning amber filaments, escaping steam, or the green bioluminescence of oxidized copper. The world has weight and texture.

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Polished Copper | `#B5651D` | Primary CTAs, key structural highlights |
| Secondary | Antique Brass | `#C9A84C` | Secondary actions, gear accents, decorative borders |
| Tertiary | Oxidized Verdigris | `#4A7C59` | Sparingly — aged copper patina, status indicators |
| Background | Soot Black | `#1A1208` | Default page background — deep iron-furnace black with warm tint |
| Surface | Mahogany Panel | `#2C1A0E` | Card and panel surfaces |
| Surface Alt | Riveted Iron | `#241C14` | Alternate surface for nested panels |
| Text | Parchment | `#E8D5A3` | Primary body and headline text on dark surfaces |
| Border | Hammered Iron | `#3D2B1A` | Card borders and dividers |
| Focus | Copper Glow | `#D4780A` | Keyboard-focus ring — warm copper halo |
| Success | Verdant Steam | `#5B8C5A` | Success states, confirmations |
| Warning | Amber Filament | `#D4860A` | Warnings, caution gauges |
| Error | Heated Iron Red | `#8B2500` | Errors, destructive actions |
| Info | Steam Cyan | `#4A8FA3` | Informational banners, pipe-label callouts |

**Gradient — Boiler Heat:** `linear-gradient(160deg, #B5651D, #7B4F2E, #1A1208)` — Hero backdrops, instrument panel headers.
**Gradient — Gas Lamp Glow:** `radial-gradient(rgba(212,134,10,0.45), rgba(26,18,8,0.0))` — Warm ambient bloom behind key subjects.
**Gradient — Mahogany Depth:** `linear-gradient(180deg, #2C1A0E, #1A1208)` — Panel-to-background fades.

## Typography

| Role | Family | Weights | Usage |
|------|--------|---------|-------|
| Headline | Playfair Display | 700, 900 | Page titles, hero headlines, instrument labels |
| Display | Cinzel Decorative | 400, 700 | Oversized splash text, logo wordmark |
| Body | Crimson Text | 400, 600 | Paragraphs, descriptions, long-form reading |
| UI | Josefin Slab | 400, 600, 700 | Buttons, navigation, labels |
| Mono | Share Tech Mono | 400 | Server addresses, timestamps, technical values |
| Number | Oswald | 500, 700 | Gauge numerals, dashboard stats, counters |

Typography rules: Playfair Display or Cinzel Decorative for headlines — never sans-serif. Body copy in Crimson Text at 1.7 line-height, 55–70 character line length. SMALL CAPS encouraged for section headings and instrument labels.

## Spatial System

Spacing scale (8px base, 4/8/12/16/24/32/48/64px). Generous padding inside cards (24px minimum). Max content width 1440px; inner content column 1200px. Copper pipe horizontal rules separate major page sections. No airy minimalist whitespace — structural density communicates engineering craft.

## Motion Philosophy

Mechanical, purposeful, weighty, precise. Animations feel like Victorian machinery: deliberate, with slow-in and deliberate settle. Gear-spin and steam-waft motifs for loaders. Honor `prefers-reduced-motion`: replace gear-spin and steam-waft with instant opacity/color transitions. Easing: `cubic-bezier(0.4, 0, 0.2, 1)` / `ease-in-out`. Medium animation speed.

## Visual Assets

- **Logo:** Cinzel Decorative 'PHLIX' in antique brass inside an octagonal engraved shield with a gear cog. Soot-black background. Brass rivet dots at panel corners.
- **Favicon:** Square octagonal copper gear cog on soot-black. 32×32 viewBox.
- **OG Card:** 1200×630. Boiler-heat gradient background with cross-hatch texture. Central octagonal shield badge with gear and PHLIX wordmark. Gas-lamp radial amber glow. Copper pipe horizontal dividers. Riveted iron corner panels.
- **Feature icons:** Filled, duotone, squared mechanical caps. Copper fill (#B5651D) for primary icons; brass (#C9A84C) for secondary. No rounded caps or joins.
- **Decorative elements:** Polished copper pipes as horizontal rules, brass gear cogs in hero backdrop, riveted iron corner panels.

## Component Notes

- **Cards:** Mahogany panel surface (#2C1A0E), sharp corners (2–4px radius), hammered-iron border, rivet-dot ornaments at corners. On hover: shift 1px up + copper-glow inner border.
- **Buttons:** Primary = polished copper with parchment label and inset bevel. Secondary = brass-outline ghost. Danger = heated iron red.
- **Navigation:** Mahogany beam header with Cinzel Decorative wordmark. Copper active indicator (bottom border or left bar on mobile).
- **Forms:** Mahogany-dark fill, 1.5px hammered-iron border, copper glow on focus.
- **Footer:** Riveted iron surface, brass section headings, copper active link.

## Do / Don't Checklist

**Do:**
- Keep backgrounds soot black or mahogany panel at all times
- Use copper as the single primary emphasis color; brass as secondary; verdigris sparingly
- Use Playfair Display or Cinzel Decorative for all headlines; Josefin Slab for UI
- Set body text in Crimson Text at 1.7 line-height
- Build layouts as instrument panels — each section a purposeful readout
- Use copper pipe horizontal rules between major sections
- Keep generous padding inside cards (24px minimum)
- Grade all imagery with warm amber/sepia; add heavy vignette and cross-hatch texture

**Don't:**
- Use cool-grey, blue-grey, or any desaturated neutral; white or cream backgrounds
- Layer more than two accent colors in one view
- Use geometric sans-serif for headlines; italic headlines except in-text media titles
- Float content without structural framing
- Exceed 1440px max content width
- Use bouncy spring animations; rapid or jittery motion
- Use clean, bright, flat photography; cool or blue-toned imagery
- Place the logo on light backgrounds; remove the gear-cog element
- Use thin hairline or rounded-cap icons
- Use millennial-casual filler, corporate jargon, or verbose copy
