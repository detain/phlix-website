# SITE.md — Manga Studio

## Concept & Vision

Manga Studio is the energy of a professional manga artist's desk at 2 AM — N-pens lined up by nib size, screentone sheets half-applied, speed lines sketched in blue pencil before being inked. Stark ink-black on bright manga white, punched through with spot red and impact yellow. Bold, expressive, passionate, and beautifully hand-crafted.

Every page is a panel from an elite manga title. Every section is a chapter that earns its space. The site carries the same devotion to craft that a mangaka brings to a single perfect brushstroke.

## Aesthetic Direction

High-contrast ink editorial. Manga panel compositions with decisive 2px ink borders. Hard-offset shadows (2–4px) rather than blurred drop shadows. Spot color (red, yellow) arrives like a slap to the face — used for emphasis, not decoration. White space is structural tension between panels, not emptiness.

## Color Table

| Role | Name | Hex | Notes |
|------|------|-----|-------|
| Primary | Spot Red | `#D0021B` | CTAs, critical emphasis, active states. 5.32:1 on manga-white |
| Secondary | Impact Yellow | `#FFD000` | Decorative/badges only; fails 4.5:1 small-text contrast |
| Secondary text | Impact Yellow (safe) | `#876e00` | For yellow text on light backgrounds |
| Background | Manga White | `#F8F8F4` | Never pure #fff |
| Surface | Panel White | `#FFFFFF` | Card interiors |
| Surface alt | Light Screentone | `#EBEBEB` | Alternate rows, code blocks |
| Text | Ink Black | `#0D0D0D` | 18.26:1 on manga-white — AAA |
| Border | Panel Border Black | `#0D0D0D` | 2px default, 3px featured |
| Tertiary | Screentone Gray | `#C0C0C0` | Mid-tone fills |
| Success | Studio Green | `#00A86B` | |
| Warning | Deadline Orange | `#FF6600` | |
| Error | Urgent Red | `#B30015` | |
| Info | Blueprint Blue | `#1A5FB4` | |

Seasonal variants (live-js date gate):
- New Year (Jan 1–15): primary `#C0021B`, secondary `#FFD000`
- Summer (Aug 1–31): secondary `#FF8C00` (safe text: `#ab5e00`)
- Deadline (Dec 15–31): primary `#8B0012`, secondary `#FFD000`

## Typography Roles

| Role | Family | Weight | Notes |
|------|--------|--------|-------|
| Headline | Black Han Sans | 400* | Kit asks 900; only 400 file exists in pool |
| Display | Rampart One | 400 | |
| Body | Noto Sans JP | 400, 700 | `<strong>` uses 700 |
| UI | M PLUS 1p | 400, 700, 800 | |
| Mono | Source Code Pro | 400, 700 | |

All fonts self-hosted WOFF2 from `../../assets/fonts/`.

## Spatial System

Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px. Corner radius near-zero (2–6px) on structural elements. Content max-width 1200px; site max-width 1440px.

## Motion Philosophy

Snappy, impact-driven. Panel-wipe transitions. Speed-line bursts. 150ms or less. Instant cuts under reduced-motion. No bouncy spring animations.

`prefers-reduced-motion` respected: both `animation-duration` and `transition-duration` set to `0.01ms`, plus `change` listener so visitors can toggle mid-session.

## Visual Assets

- **Logo**: Black Han Sans wordmark in Ink Black on Manga White inside a hard-edged rectangular badge
- **Icons**: 2px stroke, angular, square caps — Ink Black default; Spot Red for active/critical
- **Mascot**: Sen — ink brush character, ink-stained apron, trailing speed lines
- **Textures**: Screentone dot pattern (8px grid, 8% opacity); ink-wash gradient on heroes
- **Image prompt style**: Professional manga illustration, stark ink-black linework, screentone halftone shadows

## Key Implementation Notes

- All grid tracks use `minmax(0, 1fr)` — bare `1fr` can overflow at 320px with unbreakable tokens
- `overflow-wrap: anywhere` on all body text (p, li, dt, dd, a, span, code, kdm, samp, pre)
- Headings use `hyphens: auto; overflow-wrap: break-word` — NOT `anywhere` (mid-word breaks look like errors)
- Focus ring combines own box-shadow + outline in one rule so control's own shadow doesn't override it
- `@copyright` notice inside `/* … */` comment block on every css/js file
- Install command copied verbatim from `content.json.install.primary.command` — never retyped
- Footer uses mirror-nav index row + 3 content.json columns verbatim
