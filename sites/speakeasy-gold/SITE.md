# SITE.md — Speakeasy Gold

## Concept & Vision

Speakeasy Gold evokes the hidden backroom bars of the 1920s Prohibition era: champagne-gold chandeliers, Art Deco geometric panels, the crackle of a phonograph, and the thrill of having the password. Your private media library, dressed to the nines.

## Aesthetic Direction

Art Deco geometric illustration with gilded line engraving on lacquered midnight black. Compositions favor symmetry and stepped-arch framing. Gold rules, outlines, and Art Deco fan patterns divide space. Light sources are warm amber and soft gold: candelabra, back-lit frosted glass, phonograph lamplight.

## Color Table

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Champagne Gold | #C9A84C | CTAs, active states, headline accents |
| Secondary | Art Deco Emerald | #2E7D5E | Featured item highlights, premium badges |
| Tertiary | Bourbon Amber | #B86C2C | Warm accent glows, ratings, progress |
| Background | Midnight Black | #0A0806 | Default page background |
| Surface | Lacquered Ebony | #15110D | Card and panel surfaces |
| Surface Alt | Dark Mahogany | #1F1812 | Alternate surfaces, hover states |
| Text | Ivory Cream | #F2E8D9 | Primary body text |
| Text Muted | Smoked Pewter | #6B6560 | Secondary labels, dividers |
| Border | Gold Filigree | #8A6E2E | Card borders, decorative rules |
| Error | Velvet Crimson | #8B1C2A | Errors, destructive actions |
| Success | Speakeasy Sage | #5A8C6E | Success states |
| Warning | Gilt Warning | #C9951A | Warnings, caution |
| Info | Phonograph Blue | #3A6B8A | Informational banners |

**Contrast-safe substitutes (for small text on bg):**
- Secondary safe: #3b8568 (was #2E7D5E, measured 4.01:1 → needed AA 4.5:1)
- Text muted safe: #7d7773 (was #6B6560, measured 3.48:1 → needed AA 4.5:1)
- Error safe: #af626c (was #8B1C2A, measured 2.19:1 → needed AA 4.5:1)

## Typography Roles

| Role | Font | Weights | Notes |
|------|------|---------|-------|
| Headline | Poiret One | 400 | ALL CAPS, 0.12em tracking |
| Display | Cinzel Decorative | 400, 700 | ALL CAPS, 0.18em tracking |
| Body | Cormorant Garamond | 400, 500, 600 | Mixed-case, 0.01em tracking |
| UI | Josefin Sans | 300, 400, 600, 700 | ALL CAPS, 0.08em tracking |
| Mono | Share Tech Mono | 400 | Teletype/timestamps |

**Strong emphasis:** Cormorant Garamond at 600 (200-unit step from body 400).

## Spatial System

- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px
- Border radius: sm=2px, md=4px, lg=8px, xl=14px, pill=999px
- Max content width: 1400px; inner columns max 960px
- Shadows use warm amber-black (never cool grey)

## Motion Philosophy

Motion should feel like a Charleston step: precise, rhythmic, with a confident finish. Medium ease-in-out at 200–350ms. Champagne bubble particles for success moments. Art Deco iris wipe for major scene transitions. Under `prefers-reduced-motion`, all motion drops to instantaneous crossfades.

## Visual Assets

- Logo: Wordmark "PHLIX" in Poiret One champagne gold, inside a stepped-arch Art Deco badge
- Favicon: Simple sunburst mark in primary gold on midnight black
- Art Deco sunburst pattern background at 6% opacity
- Mascot: "Gilda" — Art Deco illustrated woman in gold beaded evening gown

## Install Command

From `content.json` — never invented:

```bash
curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash
```

One line on a fresh Ubuntu or Debian host.
