# Stardust Observatory — Site Design Rationale

## Concept & Vision

Stardust Observatory is the candlelit study of a Victorian astronomer who never
stopped gazing upward — brass refractors aimed at ancient light, hand-ruled star
atlases spread across mahogany, and a dome that parts to reveal a sky so dense
with stars it humbles. Phlix, rendered in this identity, feels like stepping
into that observatory: quiet, vast, scholarly, and full of wonder.

Every screen should feel like opening an antique star atlas. The brand's dominant
mood is **romantic-scientific wonder** — the same humbling thrill Elspeth Ward
felt tracking Andromeda and realizing the smudge was an island universe two million
light-years away.

---

## Aesthetic Direction

**Art style:** Victorian astronomical atlas plate — midnight navy ground, engraved
copper-plate linework in stardust silver and constellation gold, soft nebula violet
halos, warm candlelight amber ambient, precise scientific draughtsman exactitude
with painterly romance. Atmospheric depth through layered watercolor wash.

**Layout archetype:** `immersive` — full-bleed star-field hero, deep navy backgrounds,
astronomical glow effects, generous atlas-style margins, centered focal instruments.

**Mood:** Wonder, serenity, awe, reverence. Not clinical, not playful, not
loud. Scientific rigor made beautiful.

---

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| `--color-primary` | Constellation Gold | `#C9A84C` | Primary CTAs, active states, star accents |
| `--color-secondary` | Telescope Brass | `#B07D3A` | Secondary actions, ornamental borders |
| `--color-tertiary` | Nebula Violet | `#7B5EA7` | Glow halos, badges, special states |
| `--color-neutral` | Stardust Silver | `#A8B4C0` | Chrome, dividers, secondary labels |
| `--color-bg` | Midnight Navy | `#0D1B2A` | Page background — the night sky |
| `--color-surface` | Observatory Indigo | `#162338` | Cards and panel surfaces |
| `--color-surface-alt` | Deep Meridian | `#1E2E45` | Alternate surfaces, hover fills |
| `--color-text` | Dome Parchment | `#EDE4CC` | Primary body and headline text |
| `--color-success` | Meridian Green | `#5B9E78` | Success states |
| `--color-warning` | Transit Amber | `#D4952A` | Warnings |
| `--color-error` | Mars Crimson | `#B03A2E` | Errors, destructive actions |
| `--color-info` | Refractor Blue | `#3A7BD5` | Informational banners |
| `--color-focus` | Star-Point Focus | `#E8D48B` | Keyboard focus ring |
| `--color-border` | Brass Filigree | `#7A5C2A` | Card borders, dividers |

**Color rules obeyed:**
- Backgrounds always deep navy or observatory indigo — never light
- Constellation Gold for exactly one primary CTA per view
- Telescope Brass for secondary actions and ornamental detail only
- Nebula Violet as single atmospheric glow accent, max one per screen
- Shadows deepen the navy — never warm-grey or lifted to mid-tone

---

## Typography

| Role | Font | Fallback | Usage |
|------|------|----------|-------|
| `--font-headline` | Playfair Display 700/900 | Georgia, Times New Roman | Page titles, section headings |
| `--font-display` | IM Fell English 400 | Palatino Linotype, Palatino | Ornamental quotes, display text |
| `--font-body` | Lora 400/500/600 | Palatino, Georgia | Paragraphs, long-form reading |
| `--font-ui` | Jost 300–600 | Futura, Gill Sans, system-ui | Buttons, labels, navigation |
| `--font-mono` | DM Mono 400/500 | Courier New, Courier | Code, technical readouts |

**Typography rules:**
- Playfair Display headlines: never fully lowercase, never condensed
- IM Fell English for display only — never body paragraphs (breaks below 20px)
- Body line-length 60–72 characters (atlas page margins)
- Jost UI labels tracked 0.04–0.08em on dark backgrounds
- Never use sans-serif for running paragraphs

---

## Spacing System

`4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96` — the only allowed spacing steps.

---

## Motion Philosophy

**Celestial motion:** Slow, vast, purposeful. 500ms minimum for ambient motion.
Animations feel like the turning of a telescope mount or the drift of stars —
never rushed, never bouncy.

**Easing:** `cubic-bezier(0.25, 0.1, 0.25, 1.0)` — the slow drift of a celestial
sphere. Never spring/bounce.

**Key animations:**
- Star-field breathing: 8s ease-in-out opacity pulse
- Card hover: 3px lift + nebula violet halo + border brightens to gold over 200ms
- Focus ring: 150ms fade-in of Star-Point Focus corona
- Scroll reveals: 500ms fade + 16px translateY

**Reduced motion:** All animations disabled; instant opacity transitions.

---

## Visual Assets

- **Logo:** Playfair Display wordmark in Constellation Gold on Midnight Navy, paired
  with a thin-line observatory dome arc + six-point star mark
- **Icons:** 1.5px thin-stroke outlined, geometric, scientific instrument-inspired
- **Favicon:** 32×32 Midnight Navy square, dome arc + star in Constellation Gold
- **OG image:** 1200×630, full brand identity background with dome illustration
- **Feature icons:** 7 inline SVG icons matching the thin-line instrument style
- **Background texture:** Star-field CSS radial gradients + subtle constellation grid

---

## Signature Elements

1. Observatory dome arc motif in header
2. Star-field background on hero (CSS, not raster)
3. Brass Filigree borders on all cards
4. Constellation Gold as the single primary CTA color
5. Nebula Violet glow as one atmospheric accent per screen
6. Six-point star polygon accent in logo mark
7. Parchment text on deep navy — ~11.5:1 contrast ratio (exceeds AAA)

---

## Layout Archetype

**Immersive:** Full-bleed cinematic hero with star-field atmosphere, centered
instrument focal point, generous breathing room like an atlas page. Deep navy
dominates; gold accents are rare and earned. Sections breathe like the night sky
between constellations.
