# SITE.md — Editorial Underground for Phlix

## Concept & Vision

Editorial Underground is the visual language of punk zine culture applied to a media server product. It looks like it was assembled at midnight on a dying photocopier — cut-up type, xerox grain, safety-pin dividers, and electric yellow as the one signal that cuts through the black. This is not a dark-mode site; this is a darkroom. Every element is deliberate in its rawness: heavy condensed type, hard-cut borders, no rounded softening, no gradients except overprint noise. The aesthetic is the message.

## Aesthetic Direction

**Archetype:** `editorial` — asymmetric/magazine, grid-breaking, typographically confrontational.

Punk zine cut-and-paste. Underground press editorial. DIY screen print. High contrast anti-design. The layout is intentionally dense and asymmetric — never centered, never balanced for comfort. Diagonal slash cuts and registration-mark corner accents reference print production. The mascot "Riot" (safety-pin-and-lightning-bolt figure) appears in brand assets.

**Layout decisions:**
- Full-bleed Xerox Black sections with electric-yellow edge cuts
- Zero corner radius on every element — hard corners are structural
- Grid-breaking typography: type escapes the container on hero
- Registration marks at all four corners of key sections
- Halftone dot texture overlays on dark surfaces

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Electric Yellow | `#FFE500` | CTAs, active states, signal cut-through |
| Secondary | Punk Magenta | `#FF0066` | Error, alarm, destructive states only |
| Tertiary | Newsprint White | `#FFFFFF` | Knock-out accents |
| Background | Xerox Black | `#0A0A08` | Page canvas — never light |
| Surface | Bleed Black | `#111110` | Cards, panels |
| Surface Alt | Print Register | `#181816` | Hover states, striped rows |
| Text | Paper White | `#F5F5F0` | Body and headline text |
| Neutral | Halftone Gray | `#555550` | Dividers, muted UI |
| Border | Ink Line | `#2A2A28` | Structural borders |
| Success | Safety Green | `#00CC44` | Confirmations |
| Info | Cold Static | `#AAAAAA` | Informational |

**Approved gradients only:**
- `Manifesto Burn`: `#FFE500` → `#0A0A08` (180deg) — hero divider
- `Xerox Overexpose`: radial, `rgba(255,229,0,0.18)` → transparent — photocopier flash

**Color rules enforced:** Backgrounds always dark. Electric yellow is the sole warm accent. Magenta is alarm-only. No warm amber/orange/gold anywhere.

## Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Headline | Anton | 400 | Hero headlines, page titles — uppercase, condensed |
| Display | Oswald | 700 | Section headers, feature titles — bold only |
| Body/UI/Mono | Space Mono | 400, 700 | All body copy, labels, navigation, code |

**Rules:**
- Anton headlines always uppercase, tracking 0
- Space Mono body line-height 1.7 (generous leading for mono)
- All body copy left-aligned (manifestos flush left)
- Never italic headlines
- Electric yellow highlight bars applied BEHIND text, not as text color

## Spatial System

**Spacing scale (px steps only):** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96

**Corner radius:** zero everywhere except `--radius-xl: 2px`

**Borders:** 2px solid, Ink Line (#2A2A28) structural; Electric Yellow at full opacity for accent.

**Content max-width:** 1400px

## Motion Philosophy

Hard cuts only. Zero easing. No `ease-in`, `ease-out`, or `cubic-bezier`. The animation vocabulary is:
- `steps(1, end)` for state changes
- Instant appear/disappear (0ms)
- No entrance animations — content is present or absent

Microinteractions:
- **Hover:** Cards gain 2px electric-yellow border instantly (0ms transition)
- **Button press:** Invert colors instantly — electric-yellow bg, black text
- **Focus:** 2px electric-yellow ring, direct contact, no offset, instant
- **Loading:** Step-function bar (steps(10)) — jerky, counter-like progress

`prefers-reduced-motion` is already satisfied by the step/instant system.

## Visual Assets

**Logo:** Anton uppercase wordmark in Paper White on Xerox Black, 2px electric-yellow rectangular badge with zero radius, registration-mark corners. Film reel icon embedded as brand mark.

**Favicon:** 32×32 electric-yellow square, zero radius, Xerox Black film-frame band across middle.

**OG image (1200×630):** Xerox Black bg, halftone texture overlay, registration marks, "PHLIX" in Anton at 160px, tagline "No Signal. No Permission. Just Play." in Oswald Bold, sub-copy in Space Mono.

**Icons:** 7 feature icons + nav/utility icons — all inline SVG, 2px stroke, square caps/joins, stencil style, monochrome. No icon-font CDN.

**Signature motifs:** Halftone dot patterns, safety-pin graphic divider, diagonal slash separators, registration-mark corner accents, distressed xerox grain overlay on hero sections.

## Sound Identity (brand context only — no audio in static site)

- Startup: brief vinyl crackle resolving to single guitar power chord — cut short
- Notification: dry single-cycle square-wave click — typewriter carriage return
- UI click: hard mechanical click, no reverb — stapler impact
- Success: two descending staccato notes on dry electric guitar — punk resolution
- Error: flat buzzer tone, 100ms, 60Hz — low, blunt, final
