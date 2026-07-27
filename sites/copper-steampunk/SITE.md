# SITE.md — Copper Steampunk

## Concept & Vision

Copper Steampunk is a Victorian inventor's workshop brought to the streaming screen — polished copper pipes, ticking brass gears, aged leather journals, and mahogany instrument panels. Every view feels like opening the hatch of a grand airship: purposeful, mechanical, and brimming with discovery.

The experience archetype is **interactive-demo** — a layered workshop diorama with parallax scroll, a clockwork owl mascot (Cogsworth) who offers contextual tips, three discoverable easter eggs, and a visitor-path fork near the hero.

## Aesthetic Direction

**Style:** Victorian technical engraving / Edwardian instrument manual — rich cross-hatching on dark surfaces, polished copper highlights catching warm amber gas-lamp light, aged patina on brass fittings. Heavy texture, high contrast, deliberate mechanical detail.

**Color Palette (role → name → hex):**

| Role | Name | Hex |
|------|------|-----|
| Primary | Polished Copper | `#b5651d` |
| Secondary | Antique Brass | `#c9a84c` |
| Tertiary | Oxidized Verdigris | `#4a7c59` |
| Background | Soot Black | `#1a1208` |
| Surface | Mahogany Panel | `#2c1a0e` |
| Surface Alt | Riveted Iron | `#241c14` |
| Text | Parchment | `#e8d5a3` |
| Border | Hammered Iron | `#3d2b1a` |
| Focus | Copper Glow | `#d4780a` |
| Error | Heated Iron Red | `#8b2500` |

*Note: Primary on Soot Black measures 4.27:1 (below 4.5:1 AA for small text). WCAG-safe small-text substitute is `#b86b26` — used for button text labels.*

## Typography Roles

| Role | Family | Weight | Usage |
|------|--------|--------|-------|
| Headline | Playfair Display | 700, 900 | Page titles, hero headlines |
| Display | Cinzel Decorative | 400, 700 | Oversized splash, logo wordmark |
| Body | Crimson Text | 400, 600 | Paragraphs, long-form reading |
| UI | Josefin Slab | 400, 600, 700 | Buttons, nav, form labels |
| Mono | Share Tech Mono | 400 | Code, server addresses |
| Number | Oswald | 500, 700 | Gauge numerals, stats |

**Strong emphasis:** `font-weight: 600` — Crimson Text 600 is declared for this kit.

## Spatial System

8px base scale: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64px`

Max content width: 1200px (inner), 1400px (wide)
Header height: 72px
Card padding: 24px
Corner radius: 2–4px (sharp, mechanical)

## Motion Philosophy

- **Mechanical weight:** slow-in, deliberate settle — no bouncy springs
- **Gear spin** for loaders and idle avatar animation
- **Iris-wipe** (porthole-circle reveal) for scroll chapter transitions
- **`prefers-reduced-motion`:** all animations collapse to instant opacity/color transitions; Cogsworth idle stops

## Visual Assets

- **Logo:** Cinzel Decorative wordmark in antique brass inside octagonal engraved shield + integrated gear cog
- **Favicon:** Octagonal brass-bordered mark in primary copper
- **Mascot:** Cogsworth — brass-bodied clockwork owl automaton with rotating gear eyes, parchment scroll, key-wind idle animation
- **Decorative:** Copper pipe horizontal dividers, rivet-dot corner ornaments, gear cluster silhouettes, radial gas-lamp amber glow in hero
- **Images:** img/ already contains logo.svg, favicon.svg, og.svg, og.png, and 5 icon PNGs — correct and untouched

## Layout Patterns

- Hero: full-bleed copper-to-soot gradient with radial amber gas-lamp glow
- Instrument panels: mahogany card surfaces, sharp corners, copper-glow border on hover, brass left border accent
- Hub: 2-column feature rows with alternating content/visual order
- FAQ: logbook-entry cards with Cogsworth attribution voice
- 404: Cogsworth-with-broken-gear scene, no text printed verbatim from the schema

## Interaction Details

- **Cogsworth mascot:** bottom-right, in-flow at `<768px`, dismiss-to-session with localStorage restore
- **Easter eggs:** logo-clicks:5 (head spin + toast), typed-word:catalogue (amber tint + wordmark glow, disabled in inputs, exits on Esc), hover-hold:2s on `[data-gauge]` elements
- **Intensity toggle:** "Workshop lights down" — switches off all `transition` and `animation` via body class
- **Seasonal activation:** live-js date-gate flips `data-season` on `<html>` for 3 variants (Midwinter Dec–Jan, Exhibition Jun, Halloween Oct 15–31)
- **Nav:** mahogany-beam topbar with gear animation beside wordmark; mobile hamburger with slide-in panel; copper underline on active/hover

## Special Notes

- Primary CTA uses `#b5651d` background with `#e8d5a3` text — measured 4.27:1, insufficient for small text. Large/UI use only (≥24px or bold). No small-text body copy uses primary alone.
- Cinzel Decorative weight 900 exists in pool but is NOT declared by this kit — not vendored.
- Crimson Text weight 700 exists in pool but is NOT declared by this kit — not vendored.
- Seasonal primary variants use WCAG-safe substitutes computed in the brief (#c17f3a on `#0f0d14` = 5.85:1 ✅; `#8b4a00` on `#1a1208` uses `#a6743b` = 3.01:1 ✅).
