# SITE.md — Soundwave Studio Brand Kit Site

## Concept & Vision

Soundwave Studio is the aesthetic of a world-class recording session rendered as a media server brand. The console is warm, the monitors are up, and somewhere past the glass the playback reel is spinning. This site channels that energy: dark, focused, and alive with technical precision — a studio aesthetic that makes every viewing session feel like a late-night creative take.

## Aesthetic Direction

**Layout archetype:** Immersive dark studio — full-bleed dark backgrounds, cinematic waveform-driven visuals, VU meter accents, and the quiet intensity of professional recording equipment. The studio is always dimly lit.

**Reference:** Professional recording studios — Abbey Road, Electric Lady, Capitol B — seen through a lens that finds beauty in analog instrumentation. Oscilloscope waveforms, VU needles, acoustic foam diamond patterns.

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Waveform Green | `#00E676` | Primary CTAs, active states, waveform readouts, focus indicators |
| Secondary | VU Amber | `#FFB300` | Secondary actions, VU meter indicators, ratings, highlights |
| Tertiary | Foam Purple | `#7C4DFF` | Accent badges, acoustic-foam texture overlays |
| Background | Studio Charcoal | `#141418` | Default page background — the studio is always dark |
| Surface | Equipment Black | `#1E1E26` | Card and panel surfaces |
| Surface Alt | Channel Gray | `#252530` | Alternate surface for striped rows, hover states |
| Text | Monitor White | `#E8EAF0` | Primary body and headline text |
| Border | Console Edge | `#2D2D3A` | Card borders, panel dividers |
| Neutral | Console Gray | `#4A5568` | Mid-range UI chrome, secondary text |
| Error | Signal Red | `#D50000` | Errors, destructive actions, clipping indicators |
| Success | Signal Green | `#00C853` | Success toasts, confirmations |
| Warning | Peak Amber | `#FF8F00` | Warnings, nearing-limit indicators |
| Info | Phosphor Teal | `#00BCD4` | Informational banners, tips |

## Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Headlines | Rajdhani | 600, 700 | Page titles, hero headlines — condensed, technical, authoritative |
| Display | Share Tech Mono | 400 | Oversized readouts — timecodes, track numbers, dB values |
| Body | Inter | 400, 500 | Paragraphs, descriptions, long-form reading |
| UI | Rajdhani | 500, 600 | Buttons, labels, navigation — clean and technical |
| Mono | Share Tech Mono | 400 | Timecodes, file paths, technical readouts |

**Typography rules from kit:**
- Headlines use Rajdhani — condensed, technical, authoritative
- Monospaced readouts for all numerical data and timecodes
- Body text is Inter at normal weight
- ALL CAPS is appropriate for button labels, section headers, and meter readouts
- Letter-spacing wider than usual on labels (0.04–0.08em)

## Spatial System

**Spacing scale** (from kit `spacing_scale`): `2, 4, 8, 12, 16, 24, 32, 48, 64` (in pixels)

**Radius scale** (from kit `corner_radius`):
- `--radius-sm: 2px` — small elements
- `--radius-md: 4px` — cards, panels
- `--radius-lg: 6px` — larger panels
- `--radius-xl: 8px` — feature cards
- `--radius-pill: 999px` — status badges only

**Borders:** 1px solid, technical panel seams — never rounded except pill badges

**Content width:** Max 1600px, fluid with padding

## Motion Philosophy

**Animation speed:** Fast (150–250ms) — precise and intentional

**Easing:** `cubic-bezier(0.4, 0, 0.2, 1)` — kit easing

**Transitions:**
- Waveform wipe (green line sweeps across the screen)
- Fade through black
- VU needle drop (element falls like a settling meter)
- Horizontal slide (tape transport direction)

**Micro-interactions:**
- Cards: waveform-green left-border accent on hover
- Buttons: Fast 0.95 scale with 40ms green glow pulse on release
- Focus: Waveform green focus ring, 80ms fade-in

**Reduced motion:** Honor `prefers-reduced-motion` — replace waveform animations with instant state changes

## Visual Assets

**Logo:** Wordmark "Soundwave Studio" in Rajdhani Bold with minimal oscilloscope waveform glyph. Waveform green on charcoal. No rounded elements.

**Allowed symbols:** Waveform/oscilloscope curve, VU needle, reel hub circle, fader silhouette

**Forbidden symbols:** Music notes (too generic), headphones alone (cliche), gradient orbs, rounded badges

**Icons:** 1.5px stroke, monoline, sharp corners — from the kit's icon library (library, syncplay, transcode, shield, antenna, broadcast, puzzle, hub)

**Header motif:** Scrolling waveform animation with VU-style activity indicator

## Component Highlights

- **Cards:** Sharp 4px radius, 1px console-edge border, hover adds waveform-green left-border accent
- **Buttons:** Primary = waveform green; Secondary = ghost green border; Danger = signal red
- **Badges:** Sharp rectangle, 1px border, Rajdhani caps, color-coded by type
- **Forms:** Equipment-black fill, 1px console-edge border, green focus ring
- **Feature icons:** Monoline SVG, 20px, waveform green on dark surface
