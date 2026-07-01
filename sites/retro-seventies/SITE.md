# SITE.md — Retro Seventies Brand Kit Site

## Concept & Vision

**Retro Seventies** is a warm, groovy celebration of an era that never really left — harvest gold kitchens, avocado green appliances, shag carpet, lava lamps, and vinyl records that demanded you make a choice and commit. The site feels like settling into a beanbag chair, dropping the needle on a favourite LP, and letting the good times roll. This is not a streaming app wearing bell bottoms — it is genuine analog warmth translated into pixels.

The tagline, *Rewind. Replay. Relive.*, anchors the emotional promise: media is a ritual to be savoured, not a feed to be scrolled.

---

## Aesthetic Direction

- **Archetype**: `showcase` — full-bleed record-sleeve hero, warm-dark mahogany surfaces, media-forward poster grid, editorial center-stage composition
- **Mood**: Warm, nostalgic, playful, soulful — never cold, never clinical, never sleek-minimalist
- **Reference**: 1970s film one-sheets, vinyl record sleeves, lava lamp glow, Kodachrome film, wood paneling, psychedelic geometric patterns, silkscreen illustration

---

## Color Palette

| Token                  | Role             | Hex       | Usage |
|------------------------|------------------|-----------|-------|
| `--color-primary`      | Burnt Orange     | `#D4570D` | Primary CTA, active states, hero warmth |
| `--color-secondary`    | Avocado Green    | `#8B9B3A` | Secondary accents, nature callbacks |
| `--color-tertiary`     | Harvest Gold     | `#C9A22B` | Warm gold highlights, vinyl accents, star ratings |
| `--color-bg`           | Deep Mahogany    | `#0F0900` | Default page background — warm near-black |
| `--color-surface`      | Dark Walnut      | `#1A1005` | Card and panel surfaces |
| `--color-surface-alt`  | Warm Espresso    | `#231808` | Alternate surface, hover states |
| `--color-text`         | Cream Paper      | `#F5EDD8` | Primary body and headline text |
| `--color-text-muted`   | Cream Paper 70%  | rgba(245,237,216,0.7) | Secondary body text |
| `--color-neutral`      | Walnut Brown     | `#7A6A52` | Muted UI chrome, dividers |
| `--color-success`      | Fern Green       | `#5C8A3A` | Success states |
| `--color-warning`      | Mustard Yellow   | `#E0A020` | Warnings |
| `--color-error`        | Sienna Red       | `#C0391B` | Errors, destructive |
| `--color-info`         | Dusty Teal       | `#4A8C8A` | Informational |
| `--color-border`       | Tobacco Line     | `#3A2E1A` | Card borders, dividers |
| `--color-focus`        | Focus Gold Pulse | `#C9A22B` | Keyboard focus ring |

**Gradients**:
- `Sunrise Groove` (hero backdrops): `linear-gradient(135deg, #D4570D, #C9A22B)`
- `Avocado Fade` (secondary panels): `linear-gradient(180deg, #8B9B3A, transparent)`
- `Wood Depth` (surface-to-bg): `linear-gradient(180deg, #231808, #0F0900)`

---

## Typography

| Role      | Font               | Weight   | Size range         | Notes |
|-----------|--------------------|----------|--------------------|-------|
| Headline  | Playfair Display   | 700, 900 | 1.875rem – 5.5rem  | Editorial gravitas, hero h1, section heads |
| Display   | Fredoka One        | 400      | 1.25rem – 4rem     | Groovy numerals, CTA headings, mascots |
| Body      | Lato               | 400, 700 | 0.875rem – 1.125rem| Descriptions, synopses, long-form |
| UI        | Lato               | 400,700,900 | 0.75rem – 1rem   | Buttons, labels, nav, chips |
| Mono      | Courier Prime      | 400, 700 | 0.875rem          | Timecodes, runtimes, code |

**Typography rules** (from kit):
- Playfair Display headlines must always be bold (700+)
- Fredoka One display type is always sentence-case or title-case — never all-caps
- Body copy (Lato) never lighter than 400 weight on dark backgrounds
- Avoid justified text; left-align for readability

---

## Spatial System

**Spacing scale** (8px-base with 4/12/24/48/96 steps): 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96px

**Corner radius**: `--radius-sm: 6px` · `--radius-md: 12px` · `--radius-lg: 20px` · `--radius-xl: 32px` · `--radius-pill: 999px`

**Max content width**: 1400px

---

## Motion Philosophy

The Retro Seventies motion vocabulary is analog and unhurried — like a record winding up or a lava lamp blob slowly rising. Motion is warm, organic, and never mechanical.

- **Speed**: slow (300–550ms transitions)
- **Easing**: `ease-in-out` and `cubic-bezier(0.34, 1.56, 0.64, 1)` (gentle spring)
- **Entrance**: `reveal-up` — opacity 0→1 + translateY(24px→0), 550ms
- **Hover cards**: lift 4px + warm orange glow on 2px burnt-orange border, 250ms ease-in-out
- **Button press**: brief 15% darken → gentle bounce, 150ms spring
- **Loading**: Groove the mascot blob pulsing/wobbling (replaced by shimmer on reduced-motion)
- **Reduced motion**: All animations replaced by instant state changes or opacity-only fades

---

## Visual Assets

### Inline SVG Icons
Seven feature icons (library, syncplay, transcode, shield, antenna, broadcast/dlna, puzzle, hub) rendered as single-color stroke SVGs in the warm folk style: 2px rounded stroke, round caps/joins, cream paper color idle, burnt orange active.

### Decorative Elements
- **Vinyl-groove concentric circles**: Used in hero SVG, footer accent, and section breaks
- **Wood-grain texture**: Subtle repeating-linear-gradient overlay on hero and header
- **Warm ambient radial glow**: Radial gradient emanating from hero focal point
- **Sunburst/sunrise accent lines**: Burnt orange → harvest gold gradient lines at section tops
- **Lava-blob amoeba shapes**: CSS/SVG organic shapes as framing devices

### Mascot: Groove
A friendly anthropomorphic lava lamp blob in burnt orange with harvest gold lamp base. Poses: floating with outstretched arms, drooped/waiting, holding a vinyl record. Used in loading states, empty states, and onboarding flows.

### Photo/Art Treatment
Any photography used is warm Kodachrome-graded: amber/gold shadows, cream highlights, subtle 35mm grain. Never cold blue, never desaturated. Illustrations follow the 1970s silkscreen/letterpress flat-color style.

---

## Accessibility

- **Contrast**: Cream paper (#F5EDD8) on deep mahogany (#0F0900) = 18.2:1 (AAA). Burnt orange on mahogany = 4.7:1 (AA). All pairs pass WCAG AA.
- **Focus style**: 2px harvest-gold ring + 2px mahogany offset + 4px warm gold outer glow (`rgba(201,162,43,0.25)`)
- **Touch targets**: 44×44px minimum desktop, 48×48px mobile
- **Motion**: `prefers-reduced-motion: reduce` honored — all animations replaced by static states
- **Zoom**: 200% browser text zoom survives without clipping or horizontal scroll
- **Fonts**: Degrade gracefully — Playfair Display → Georgia, Fredoka One → Trebuchet MS, Lato → system-ui

---

## Seasonal Variants (documented, not applied)

1. **Funky New Year** (12-28..01-03): harvest gold primary, rotating disco ball motif, vinyl confetti particles
2. **Harvest Halloween** (10-01..10-31): pumpkin orange primary, macramé spider-web overlay
3. **Valentine Groove** (02-10..02-14): warm rose + gold, heart-shaped vinyl record motif

Each is documented in `theme.css` as commented-out override token blocks for future use.

---

## File Inventory

```
sites/retro-seventies/
├── index.html          Home
├── features.html       Features
├── clients.html        Clients
├── download.html       Download
├── plugins.html        Plugins
├── docs.html           Docs (link-out)
├── hub.html            Phlix Hub
├── about.html          About + FAQ
├── css/
│   ├── base.css        :root token layer
│   ├── theme.css       Typography + layout
│   └── components.css  Shell + UI components
├── js/
│   └── main.js         Nav toggle + scroll reveals
├── img/
│   ├── logo.svg        Wordmark + vinyl-groove
│   ├── favicon.svg      32px vinyl record mark
│   ├── og.svg           1200×630 social share card
│   └── PROMPTS.md      Exact image generation prompts
├── robots.txt
├── sitemap.xml
├── SITE.md             (this file)
└── BUILD_LOG.md        What was built
```
