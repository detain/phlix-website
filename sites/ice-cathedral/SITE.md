# SITE.md — Ice Cathedral

## Concept & Vision

Ice Cathedral is the silence inside a glacier — the absolute cold of polar night broken only by the blue light that lives inside ancient ice. It is gothic cathedral architecture transposed into permafrost: soaring vaulted arches of translucent ice, rose windows rendered in frost crystal, the hush that precedes an avalanche. Phlix built Ice Cathedral for the viewer who wants watching to feel like entering a space of genuine awe — majestic, untouchable, eternal.

Every page is a chamber of that cathedral. Navigation is a progression through named spaces (Cathedral Entrance, Vaulted Chambers, Windows & Apertures, Cross the Threshold, The Relay Chamber, The Archive). The language is spare, architectural, reverent. No warmth. No urgency. The glacier does not hurry.

---

## Aesthetic Direction

**Polar gothic** — absolute darkness broken by one singular luminous element (Crystal Ice Blue, `#A8D8FF`). Architecture is gothic: pointed arches, lancet windows, frost-crystal lattice. All light is cold and internal — refracted through ancient ice, not cast from outside. Compositions are vertical and soaring.

**Reference imagery:** Waitomo Glowworm Caves, Blue Cave Croatia, Antarctic research stations lit against polar night, Ice Hotel Jukkasjärvi, Naica Crystal Cave.

---

## Color Table

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| `--color-bg` | Polar Night | `#04101C` | Default page background |
| `--color-surface` | Ice Cave Depth | `#081828` | Card and panel surfaces |
| `--color-surface-alt` | Frost Chamber | `#0C2035` | Hover states, alternate surfaces |
| `--color-primary` | Crystal Ice Blue | `#A8D8FF` | Primary CTAs, active states, focal accent |
| `--color-secondary` | Glacial Silver | `#C8EEFF` | Secondary text, subtle accents |
| `--color-tertiary` | Deep Aurora Blue | `#6090FF` | Badges, emphasis accents |
| `--color-text` | Arctic White | `#EEF5FF` | Body and headline text |
| `--color-border` | Ice Vein | `#1A3050` | Card borders, dividers |
| `--color-neutral` | Ice Shadow | `#2A4A6A` | Muted text, third-level elements |
| `--color-focus` | Crystal Focus Pulse | `#A8D8FF` | Focus ring |

All colors pass WCAG AA minimum. Crystal Ice Blue on Polar Night = 12.71:1 (AAA). Arctic White on Polar Night = 17.46:1 (AAA).

---

## Typography Roles

| Role | Family | Weight | Usage |
|------|--------|--------|-------|
| Headline | Cinzel | 400, 700 | Page titles, hero headlines — carved inscription |
| Display | Josefin Sans | 100 | Large numerals, cold-precision display text |
| Body | Libre Baskerville | 400, 700 | Descriptions, long-form reading |
| UI | Josefin Sans | 300, 400, 600 | Buttons, labels, navigation — precise, cold |
| Mono | JetBrains Mono | 400, 600 | Code, tokens, technical readouts |
| Number | Josefin Sans | 100 | Stats, episode numbers — thin cold numerals |

Cinzel tracking is 0.08em+ (the spacing of letters carved across a cathedral facade). Body text is always left-aligned.

---

## Spatial System

Spacing scale: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 px`. Negative space is structural, not accidental. Max content width: 1400px, centered. Generous section padding (96px) with tight card padding (16–24px) creates cathedral-nave rhythm.

---

## Motion Philosophy

**Slow crystalline.** Motion is like ice forming — geometric, inevitable, and unhurried. 400–700ms transitions with `ease-in-out` or `cubic-bezier(0.3, 0, 0.1, 1)`. No bounce, no spring, no elastic. Under `prefers-reduced-motion`, all motion is replaced with instant state changes — no content is lost.

Three motion layers: (1) ambient crystal rotation (mascot, slow 24s cycle), (2) scroll reveals (opacity-only 300ms fade, chaptered), (3) micro-interactions (card hover: 300ms border + box-shadow). Scroll reveals are disabled under reduced-motion.

---

## Visual Assets

- **Logo:** SVG wordmark in Cinzel with crystal ice blue text-shadow on polar night
- **Favicon:** Hexagonal crystal mark in Crystal Ice Blue on polar night
- **OG image:** `og.png` — generated from `og.svg` with `tools/gen-og.mjs`
- **Icons:** Inline SVGs, sharp 1–1.5px stroke, geometric/angular, crystal ice blue active state
- **Decorative:** CSS frost lattice pattern, SVG rose-window geometry, CSS frost dividers
- **Mascot:** Crystal — translucent geometric ice formation, slow rotation, bottom-right (in-flow on mobile)

---

## Seasonal Variants (live-js)

Three date-gated palette overrides:
- **Midwinter Solstice** (Dec 18–Jan 5): primary → `#C8EEFF`
- **Aurora Season** (Sep 15–Oct 15): secondary → `#90FFCC`, tertiary → `#9060FF`
- **Ice Hotel Opening** (Dec 1–17): primary → `#D0F0FF`, surface → `#0A1E30`

Applied by JS date-gate adding `.seasonal-*` class to `<html>`.
