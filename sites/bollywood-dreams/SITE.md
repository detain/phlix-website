# SITE.md — Bollywood Dreams Brand Kit Site

## Concept & Vision

Bollywood Dreams is the opulent, sensory world of Indian cinema distilled into a
living interface — marigold gold blazing against midnight-mandir darkness, fuchsia
saris trailing across marble floors, peacock feathers catching chandelier light in
an old Mumbai picture palace. Every screen is a frame from the most romantic film
never made: opulent, celebratory, unforgettable.

The Phlix marketing site dressed in Bollywood Dreams feels like stepping into a
grand filmi cinema hall — every interaction a ceremony, every transition a dance
entrance, every colour a celebration of Indian visual culture.

---

## Aesthetic Direction

**Visual style:** Bollywood cinema poster + Mughal miniature painting + Rangoli
geometric pattern + Indian festive maximalism + Old Mumbai picture-palace grandeur.

**Mood:** Opulent, celebratory, romantic, sensory, vibrant, joyful.

**Brand archetype:** Lover — the warm usher welcoming you into a beautiful
cinema hall. Copy feels like a film trailer voiceover that makes you lean forward.

---

## Color Table

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| `--color-primary` | Marigold Gold | `#F5A800` | Primary CTAs, spotlight moments |
| `--color-secondary` | Fuchsia Silk | `#CC0066` | Secondary actions, links |
| `--color-tertiary` | Peacock Teal | `#00A8CC` | Tertiary accents, icon active states |
| `--color-bg` | Midnight Mandir | `#0A0505` | Default page background |
| `--color-surface` | Dark Vermillion | `#160808` | Card and panel surfaces |
| `--color-surface-alt` | Temple Shadow | `#1E0C0C` | Alternate surface, hover states |
| `--color-text` | Jasmine White | `#FFF5E0` | Primary body/headline text |
| `--color-neutral` | Sandalwood | `#7A5040` | Muted UI chrome, dividers |
| `--color-success` | Turmeric Spark | `#D4A017` | Success toasts |
| `--color-warning` | Saffron Flame | `#FF6B00` | Warnings |
| `--color-error` | Sindoor Red | `#C8001A` | Errors, destructive actions |
| `--color-info` | Indigo Night | `#3A5BCC` | Informational banners |
| `--color-focus` | Marigold Focus Pulse | `#F5A800` | Keyboard focus ring |
| `--color-border` | Burnished Copper | `#3D1A0A` | Card borders, dividers |

**Gradient: Holi Burst** — `linear-gradient(145deg, #CC0066, #F5A800, #00A8CC)` — hero only
**Gradient: Marigold Chandelier** — `radial-gradient(ellipse at top center, rgba(245,168,0,0.40), rgba(10,5,5,0.0))` — hero overhead glow
**Gradient: Temple Depth** — `linear-gradient(180deg, #1E0C0C, #0A0505)` — surface to background
**Gradient: Fuchsia Veil** — `linear-gradient(135deg, rgba(204,0,102,0.30), rgba(10,5,5,0.0))` — romantic hero overlay

---

## Typography

| Role | Family | Weights | Usage |
|------|--------|---------|-------|
| Headline | Playfair Display | 700, 900 | Dramatic page titles, hero headlines |
| Display | Cinzel Decorative | 400, 700 | Oversized display titles, numerals |
| Body | Lora | 400, 500 | Descriptions, synopses, long-form |
| UI | Hind | 400, 500, 600 | Buttons, labels, navigation |
| Mono | JetBrains Mono | 400, 600 | Code, tokens, technical readouts |
| Number | Cinzel Decorative | 700 | Stats, watch counts, runtimes |

**Key rules:** Playfair Display headlines always bold (700+). Cinzel Decorative
for display moments only — never body or UI. Lora body copy never all-caps.
Headline tracking slightly tight (-0.01em). Left-align body copy.

---

## Spatial System

**Spacing scale:** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 px

**Max content width:** 1400px, centered

**Header height:** 72px desktop, 64px mobile

**Corner radius scale:** sm=3px · md=6px · lg=12px · xl=20px · pill=999px

---

## Motion Philosophy

Motion is a **dance number entrance** — sweeping, opulent, deliberate, never
trivial. The brand calls for slow, choreographed animation:

- **Entrance:** `curtainRise` — opacity 0→1 + translateY(24px→0), 600ms, `cubic-bezier(0.25, 0, 0.0, 1.0)`
- **Hover:** cards lift 2px + gain 1px marigold-gold border glow + warm shadow
- **Button press:** brief marigold pulse, 180ms
- **Loading:** rangoli radial spinner, 1.5s/rotation
- **Focus:** 2px marigold-gold ring + 4px outer glow
- **Success:** marigold radial burst

**prefers-reduced-motion:** All animations replaced with instant states or
simple opacity fades.

---

## Visual Assets

| Asset | Description | Format |
|-------|-------------|--------|
| `img/logo.svg` | Phlix wordmark + Mughal arch frame + peacock feather accent | SVG |
| `img/favicon.svg` | Marigold gold ring/rangoli eye on midnight mandir | SVG |
| `img/og.svg` | Social share card: tagline + logo on Holi Burst gradient | SVG |
| `img/PROMPTS.md` | Exact generation prompts for every image asset | Markdown |
| 7 inline SVG icons | Feature icons (library, syncplay, transcode, shield, antenna, broadcast, puzzle, hub) | Inline in HTML |
| `img/rangoli-divider.svg` | Rangoli mandala SVG used as decorative section divider | Inline in HTML |

---

## Layout Archetype

**showcase** — The brand's maximalist, cinematic, celebratory aesthetic maps
directly to a showcase/immersive landing archetype. Grand centered hero
compositions with Holi Burst gradient backdrops, rangoli geometric dividers,
and marigold-gold ceremonial CTAs. The darkness is the stage; marigold gold
is the spotlight — exactly as the brand DNA prescribes.

---

## Signature Elements Applied

- Mughal arch decorative frame on hero and page header areas
- Rangoli mandala geometric border motif as section dividers
- Marigold-gold halation glow on primary CTAs (box-shadow)
- Fuchsia silk gradient sweeps on hero backdrops
- Peacock feather motif as decorative accent in logo
- Jasmine-white text on midnight-mandir background throughout
- Slow opulent entrance animations (curtain-rise analogy)
