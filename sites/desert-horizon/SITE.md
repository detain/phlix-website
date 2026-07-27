# SITE.md — Desert Horizon

## Concept & Vision

Desert Horizon is the Sonoran Desert at golden hour — terracotta adobe walls, saguaro silhouettes against a burning amber sky, turquoise inlay accents, and the unhurried quiet of a wide-open horizon. The trading post metaphor runs through everything: this is a place where your media feels handcrafted and rooted, not rented and cloud-hosted. The personality is grounded, warm, unhurried, and quietly confident — like a well-made adobe wall at the end of a long day.

## Aesthetic Direction

WPA-era travel poster meets handcrafted Southwest illustration. Warm sandstone paper, confident earthy color fields, bold linocut outlines with deliberate imperfection. The palette stays grounded — terracotta, turquoise, burnt umber, sage — with sunset coral reserved for peak moments. Compositions favor wide horizontal panoramas: low horizon lines, enormous sky, single saguaro silhouettes. Texture is always present: grit, grain, the ghost of a woven linen.

## Color Palette (role → name → hex)

| Role | Name | Hex | Notes |
|---|---|---|---|
| Primary | Terracotta | `#c2542a` | CTAs, active nav, key emphasis. Safe small-text: `#a94925` |
| Secondary | Mesa Turquoise | `#2a8c82` | Links, focus rings, interactive affordances. Safe small-text: `#227169` |
| Tertiary | Sunset Coral | `#e07050` | Peak-emphasis gradients, hero accents |
| Neutral | Sage Green | `#7a8c68` | Muted UI, dividers. Safe small-text: `#5d6a4f` |
| Background | Sandstone | `#f2e4c8` | Universal page background — never swap for white/grey |
| Surface | Adobe Dust | `#faf0dc` | Card and panel surfaces |
| Surface Alt | Sun-Bleached Clay | `#e8d6b4` | Alternate rows, nested panels |
| Text | Burnt Umber | `#2e1a0e` | All body and headline text |
| Border | Canyon Outline | `#2e1a0e` | Same as text — hand-inked Pueblo feel |
| Focus | Turquoise Focus Ring | `#2a8c82` | Keyboard focus indicator |
| Success | Prickly Pear | `#8bc48a` | Success states |
| Warning | Ocotillo Amber | `#d4900a` | Warnings |
| Error | Cholla Red | `#a83220` | Destructive actions |
| Shadow | Desert Shadow | `rgba(92,46,20,0.22)` | Warm umber-tinted, never grey/black |

**Seasonal variants** (date-gated, live-js): Monsoon (Jul 1–Sep 15), Harvest Dusk (Oct 1–Nov 15), Winter Solstice (Dec 10–Jan 5), Spring Bloom (Mar 1–Apr 30). Each shifts `--color-bg`, `--color-primary`, and one accent token.

## Typography Roles

| Role | Family | Weight | Notes |
|---|---|---|---|
| Headline | Playfair Display | 700, 900 | Page heroes, section titles |
| Display | Arvo | 700 | Stat numbers, callouts |
| Body | Lora | 400, 600 | Paragraphs, long-form reading |
| UI | Source Sans 3 | 400, 600, 700 | Buttons, nav, labels |
| Mono | IBM Plex Mono | 400, 600 | Code, tokens, file paths |
| Number | Arvo | 700 | Bold slab numerals |

**`<strong>` weight:** Lora 600 — body face at a 200-unit step, declared by this kit.

## Spatial System

Spacing scale (4px base): 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96px.
Max content width: 1400px. Generous horizontal padding. Minimum 3 emphasis levels in nav.

## Motion Philosophy

Slow, deliberate, organic. Mesa-wipe and dust-fade transitions. Card hover: 3px upward lift with deepening umber shadow — like picking up a piece of pottery. Button press: compress to 0.97 then smooth ease-out return. All animation gated behind `prefers-reduced-motion` — reduced motion mode removes all animation, not just some (§19.20). The intensity toggle ("Turn off the parallax") provides visitor-controlled calm mode.

## Visual Assets

- **Logo:** Playfair Display wordmark in terracotta on sandstone, paired with a saguaro silhouette badge.
- **Icons:** 2px umber-stroke outlined icons (inline SVG), slightly rounded caps, hand-drawn imperfection. Subjects: library, syncplay, transcode, shield, antenna, broadcast/dlna, puzzle, hub.
- **Navajo-pattern strip:** 4px repeating geometric strip in terracotta + turquoise as section dividers and header border.
- **Mascot (Dusty):** Anthropomorphic saguaro cactus — tall, friendly, weathered leather hat, hand-woven blanket. Bottom-right fixed companion on home, download, about pages. Sway idle animation, tip bubbles at specific sections, 2 easter interactions (click:3 tips hat, hover-hold:2s points at horizon). Dismiss to localStorage.

## Signature Elements

- Saguaro cactus silhouette ridge as hero backdrop layer
- Sunset gradient hero (terracotta → amber → deep orange)
- Navajo geometric border strip divider
- Adobe-dust card surfaces with 2px umber borders
- Warm umber-tinted drop shadows throughout
- Dusty mascot companion in fixed bottom-right

## Layout & Structure

- **Homepage (narrative-scroll):** 6 chapters in order — Golden Hour hero → Why Stay brand story → What You Find feature casting → The Rest of the Kit pitch bullets → Gather proof band → Stay Rooted CTA. Visitor paths fork below hero.
- **Interior pages:** Page header → content sections → CTA banner → footer.
- **Responsive:** Grid tracks use `minmax(0, 1fr)` to prevent overflow at 320px and 200% text zoom. Body text in narrow tracks gets `overflow-wrap: anywhere`; headings get `break-word`.
