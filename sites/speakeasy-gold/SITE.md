# SITE.md — Speakeasy Gold

## Concept & Vision

Speakeasy Gold is the thrill of the hidden room made digital: midnight black lacquer, champagne gold ornament, bourbon amber light, and the low pulse of a phonograph needle finding the groove. Every screen should feel like stepping through a velvet curtain into gold light. The product is Phlix; the identity is the most glamorous decade in modern history.

## Aesthetic Direction

**Art Deco geometric illustration** — gilded line engraving on lacquered midnight black, warm amber candlelight, stepped-arch silhouettes, sunburst rays, champagne bubble particles. Everything feels as if it was printed on thick cream card stock and gilded by hand.

**Mood:** Glamorous, clandestine, celebratory, refined, roaring, mysterious.

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Champagne Gold | `#C9A84C` | CTAs, active states, headlines, Art Deco rule lines |
| Secondary | Art Deco Emerald | `#2E7D5E` | Featured/premium accents |
| Tertiary | Bourbon Amber | `#B86C2C` | Warm glows, ratings, progress |
| Neutral | Smoked Pewter | `#6B6560` | Muted UI chrome, dividers |
| Background | Midnight Black | `#0A0806` | Page backgrounds |
| Surface | Lacquered Ebony | `#15110D` | Card/panel surfaces |
| Surface Alt | Dark Mahogany | `#1F1812` | Hover states, alternate surfaces |
| Text | Ivory Cream | `#F2E8D9` | Body prose text |
| Border | Gold Filigree | `#8A6E2E` | Card borders, dividers |
| Shadow | Deep Bourbon Shadow | `rgba(10,5,0,0.55)` | Warm-tinted drop shadows |

## Typography Roles

| Role | Font | Usage |
|------|------|-------|
| Headline | Poiret One 400 | Main headlines, hero titles, ALL CAPS, 0.12em tracking |
| Display | Cinzel Decorative 400/700 | Oversized numerals, section dividers, 0.18em tracking |
| Body | Cormorant Garamond 400/500/600 | Paragraphs, descriptions — never for UI |
| UI | Josefin Sans 300/400/600/700 | Buttons, nav, labels, chips — ALL CAPS 0.08em tracking |
| Mono | Share Tech Mono 400 | Timestamps, code, file paths |

## Spatial System

Spacing scale (the only allowed steps): `4, 8, 12, 16, 24, 32, 48, 64, 96px`

Radius scale: `2px (sm) / 4px (md) / 8px (lg) / 14px (xl) / 999px (pill)`

Max content width: `1400px` | Inner column width: `960px`

## Motion Philosophy

- **Speed:** medium (200–350ms ease-in-out)
- **Character:** Stately, rhythmic, deliberate — like a Charleston step
- **Transitions:** Slow crossfade, Art Deco iris wipe (hexagon/diamond expand), vertical curtain raise
- **Micro:** Cards lift 3px with bourbon shadow; button press scale 0.97 with gold shimmer; focus ring fade 150ms
- **Reduced motion:** Swaps to instantaneous crossfades, no bubble particles

## Visual Assets

- **Logo:** PHLIX wordmark in Poiret One champagne gold inside a stepped-arch Art Deco badge frame with double gold rule borders
- **Favicon:** Art Deco hexagonal badge with P letterform
- **OG image:** 1200×630 — PHLIX headline, Art Deco sunburst, stepped-arch framing, midnight black ground, all Speakeasy Gold palette
- **Icons:** 7 feature icons as inline SVG — 1.5px stroke, Art Deco geometric, champagne gold on dark
- **Hero decoration:** CSS-only Art Deco sunburst (repeating conic-gradient) + herringbone pattern overlay + gilded-candelabra radial glow

## Key Brand Decisions

- **Layout archetype:** immersive — full-bleed cinematic hero with gilded candelabra radial glow
- **Backgrounds:** Always midnight black or lacquered ebony — never light
- **Gold:** The primary visual signal; reserved for CTAs, headlines, and key emphasis
- **Emerald:** Sparingly — featured/premium contexts only
- **Shadows:** Always warm amber-black, never cool grey
- **No mascot on site** (null in kit) — brand is the identity, not a character
