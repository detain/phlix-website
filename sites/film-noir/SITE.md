# Film-Noir Brand Kit — Design Rationale

## Concept & Vision

A cinematic noir interpretation of the Phlix brand — evoking the moody atmosphere of classic film noir with venetian blind light stripes, smoky gradients, and dramatic shadows. The aesthetic commits fully to black-and-white with a single warm amber accent, creating a sophisticated, atmospheric experience that stands apart from typical tech marketing sites.

## Aesthetic Direction

**Reference:** 1940s-1950s film noir cinematography — high contrast black-and-white photography with dramatic lighting, venetian blind shadow patterns (the iconic "shadows of the blinds" effect), and smoky atmosphere. Think Double Indemnity, The Big Sleep, or Out of the Past.

**Mood:** Mysterious, sophisticated, cinematic. The site feels like stepping into a noir film — dramatic but not dark for the sake of darkness. The amber accent cuts through like a shaft of light through venetian blinds.

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Background | Noir Black | `#0D0D0D` | Primary background |
| Background Elevated | Charcoal | `#1A1A1A` | Cards, elevated surfaces |
| Background Surface | Deep Gray | `#141414` | Code blocks, subtle surfaces |
| Border | Dim Gray | `#2A2A2A` | Subtle borders |
| Border Light | Mid Gray | `#3A3A3A` | Hover states, dividers |
| Primary Text | Off-White | `#F5F5F5` | Headlines, body text |
| Muted Text | Silver | `#A0A0A0` | Secondary text, captions |
| Accent | Gold | `#D4AF37` | Primary accent — buttons, highlights, icons |
| Accent Dark | Deep Gold | `#B8942F` | Hover states |
| Accent Alt | Dark Red | `#8B0000` | 404 page error code |

## Typography

**Display Font:** Bebas Neue (fallback: Impact, sans-serif)
- Used for all headlines, page titles, section headers
- Uppercase with wide letter-spacing
- Conveys the bold, cinematic quality of noir film titles

**Body Font:** Source Serif 4 (fallback: Georgia, serif)
- Elegant, readable serif for body copy
- Evokes the classic feel of film noir title cards and credits
- Provides good contrast with the display font

**UI Font:** Inter (fallback: Helvetica Neue, sans-serif)
- Clean sans-serif for navigation, buttons, labels
- Modern readability for interface elements

**Mono Font:** JetBrains Mono (fallback: Fira Code, monospace)
- For code blocks and technical content

## Spatial System

- **Max content width:** 1400px
- **Spacing scale:** 0.25rem base (4px increments through 8rem)
- **Corner radius:** Minimal — 2px, 4px, 8px only
- **Shadows:** Deep, diffused blacks (not gray) for true noir feel

## Motion Philosophy

Motion is restrained and deliberate — like a slow camera pan in a noir film.

- **Reduced motion:** Fully respected — all animations collapse to instant transitions
- **Scroll reveals:** Subtle fade-up with 600ms duration, staggered 100ms between items
- **Hover states:** Subtle transforms (2px lift, shadow expansion)
- **No bouncing, no playfulness** — every motion is measured and cinematic

## Visual Assets

**Logo:** Film reel with play button icon + "PHLIX" in Bebas Neue with venetian blind light stripe overlay. Gold on black.

**Favicon:** Film reel mark in gold on charcoal background.

**Icons:** Single-color, stroke-based SVG icons with 1.5px stroke weight. Gold color. Clean, minimal — like line illustrations from a noir graphic novel.

**Decorative Elements:**
- Venetian blind light stripe overlay (CSS repeating-linear-gradient at 75°)
- Radial smoke/atmosphere gradient overlays
- Film grain texture (SVG noise filter at low opacity)
- Gold accent lines as section dividers

## Component Notes

**Hero:** Dramatic spotlight radial gradient + venetian blind stripes. 90vh minimum height.

**Buttons:** Primary (gold background, black text), Secondary (transparent with gold border), Ghost (no border, text only).

**Cards:** Dark surfaces with gold accent on hover (border-color transition + glow shadow).

**404 Page:** "Scene not found" — the error code uses the dark red accent color with a red glow effect.

## Accessibility

All contrast ratios meet WCAG 2.2 AA:
- Body text (#F5F5F5 on #0D0D0D): ~15:1
- Gold accent on black: ~7.5:1
- Muted text (#A0A0A0 on #0D0D0D): ~5:1

The primary gold (#D4AF37) at 7.5:1 on black passes AA for all text sizes.
