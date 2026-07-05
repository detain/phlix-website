# Wilderness Trail — Brand Kit Site

## Concept & Vision

Wilderness Trail is the spirit of a backcountry expedition brought to your living room. Granite peaks, pine-canopied campsites, campfire glow, and the Milky Way overhead — rendered in the bold, hand-lithographed style of golden-era National Park Service travel posters. The site should feel like a well-worn topographic map tacked above a ranger station desk: honest, spacious, and deeply evocative of open sky and hard-won views.

## Aesthetic Direction

**Layout archetype: Immersive** — panoramic full-bleed hero sections with dramatic Alpenglow gradients, generous negative space, and the NPS poster lithography aesthetic. Every screen feels like looking out from a high ridge — open, vast, and earned.

**Visual style:** Vintage National Park Service travel poster lithography (1930s–1950s), WPA woodblock illustration, flat color planes with bold ink outlines, topographic map contour overlays. Nothing airbrushed, digital, or corporate.

**Mood:** Rugged, adventurous, grounded, awe-struck, self-reliant. Quietly Epic.

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Pine Green | `#2D5A27` | Navigation, borders, headlines, key UI |
| Secondary | Sky Blue | `#3A7CA5` | Links, informational states, illustration |
| Tertiary | Campfire Orange | `#D4581A` | **Single primary CTA only** |
| Neutral | Trail Brown | `#7A5C3A` | Muted text, dividers, secondary labels |
| Background | Canvas Tan | `#E8D9BC` | Page background — topographic map feel |
| Surface | Aged Canvas | `#F0E6CE` | Cards, panels — one step lighter |
| Surface Alt | Field Parchment | `#D8C89A` | Alternate surfaces, hover states |
| Text | Granite Dark | `#1E1E1E` | Body and headline text |
| Border | Ink Pine | `#1A3318` | Card borders, dividers, outlines |
| Success | Meadow Green | `#4A8B5C` | Success states |
| Warning | Amber Blaze | `#C87A1A` | Warnings |
| Error | Wildfire Red | `#A83220` | Errors, destructive |
| Focus | Summit Signal Orange | `#D4581A` | Focus ring |

**Gradient: Alpenglow** — `linear-gradient(165deg, #D4581A, #3A7CA5)` for hero backdrops.

## Typography

- **Headlines:** Playfair Display Bold/Black, 700/900 weight, tracked +0.03em
- **Display numerals:** Abril Fatface 400 — poster-style elevation numbers
- **Body:** Lora 400/600, 1.7 line-height — warm, humanist serif
- **UI labels:** Barlow Condensed 600/700, tracked +0.06em, ALL CAPS — trail-sign authority
- **Code:** IBM Plex Mono 400/600

## Spatial System

Spacing scale (only these values): 4, 8, 12, 16, 20, 24, 32, 48, 64, 96px

Max content width: 1400px (lateral breathing room = wilderness negative space)
Max text content width: 1200px

## Motion Philosophy

- **Transitions:** Dissolve (like smoke drifting through pines), horizontal trail-map slide, contour-line wipe
- **Timing:** 200–350ms ease-out (unhurried, grounded)
- **Hover:** Cards lift 3px with trail-shadow and pine-green border brightening
- **Button press:** 0.96 scale, 100ms, then smooth ease-out return
- **Micro-interaction:** 2px campfire-orange focus ring, 120ms fade, 3px canvas-tan offset
- **Reduced motion:** Honor `prefers-reduced-motion` — dissolve fades replace slides

## Visual Assets

- **Logo:** Wordmark "WILDERNESS TRAIL" in Playfair Display Bold, pine green on canvas tan, inside trail-blaze rectangle badge with ink-pine border. Pine tree + mountain peak silhouette above wordmark.
- **Favicon:** Pine green square with small white pine tree silhouette.
- **OG card:** Full Alpenglow gradient with pine ridgeline silhouettes, NPS poster-style typography, trail-blaze diamond accent.
- **Signature elements:** Topographic contour overlays at 8–12% opacity, pine silhouette ridgelines, campfire flame motifs, ranger-station typography.

## Voice & Tone

- **Voice:** Direct, Grounded, Quietly Lyrical, Self-reliant
- **Tone:** Encouraging, Unhurried, Reverent of the landscape, Matter-of-fact with flashes of wonder
- **Vocabulary:** trail, summit, trailhead, waypoint, bearing, blaze, camp, elevation, ridge, backcountry, expedition, switchback, terrain, horizon
- **Avoid:** leverage, synergy, utilize, robust, seamless, content, disruption, epic, crushing it, binge, hack

## Accessibility

- WCAG 2.2 AA minimum
- Granite-dark on canvas-tan achieves ~9:1 contrast
- Campfire orange (3.2:1 on canvas tan) — **use only for large/bold interactive elements, never body copy**
- Focus style: 2px campfire-orange ring, 3px canvas-tan offset
- Touch targets: minimum 44×44px
- Honor `prefers-reduced-motion`

## Seasonal Variants (documented for future use)

1. **Winter Backcountry** (Dec 1 – Feb 28): Snowfield white canvas, pale-blue sky, star field more prominent
2. **Peak Wildflower Season** (Jun 1 – Jul 31): Wildflower meadow foregrounds, pine ridgeline recedes to blue-haze
3. **Autumn Ridge** (Sep 15 – Nov 15): Aspen gold and russet in backgrounds, topo overlay shifts to amber
