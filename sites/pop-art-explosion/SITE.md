# SITE.md — Pop Art Explosion

## Concept & Vision

**Pop Art Explosion** is the visual identity of Roy Lichtenstein meets Andy Warhol —
pure comic-book energy with Ben-Day dots screaming on stark white, primary-color
silk screens, and speech bubbles that shout from every corner. This site IS the
gallery wall: every interaction is a happening, every screen a canvas. Bold,
democratic, ironic, and unapologetically LOUD. WHAM!

The product (Phlix) is still the same self-hostable PHP media server — but dressed
in primary-color fireworks set to the rhythm of a comic-book panel.

---

## Aesthetic Direction

**Layout archetype:** `showcase` — bold comic-panel grid with full-bleed primary
color blocks and thick black gutters.

**Reference:** 1965 DC Comics panel → blown up 10× → silkscreened in four-color
process. Ben-Day halftone dot overlays create the illusion of shading. Speech
bubbles cut into compositions unexpectedly. Thick 4px black ink outlines contain
every shape. Stark white background is the canvas — color explodes FROM the white.

**Key decisions:**
- Full-bleed red hero with Ben-Day dot CSS fill — no raster image needed
- Yellow (secondary) feature panels with black-dot background texture
- White CTA section as the "reset" between color explosions
- Thick 3–4px black comic-panel gutters divide every content zone
- All shadows are hard offset (solid #0A0A0A at +4px/+4px) — zero blur

---

## Color Table

| Token               | Name                | Hex       | Usage                                      |
|---------------------|--------------------|-----------|--------------------------------------------|
| `--color-primary`   | Kapow Red          | `#FF1A1A` | Hero, primary CTAs, active states         |
| `--color-secondary` | Zap Yellow        | `#FFE600` | Secondary CTAs, Ben-Day fills, highlights |
| `--color-tertiary`  | Pow Blue           | `#0028DC` | Links, informational elements, selected tab |
| `--color-orange`    | Soup Can Orange    | `#FF6B00` | Warnings, occasional accent bands            |
| `--color-bg`        | Gallery White      | `#FFFFFF` | Default page background                    |
| `--color-surface`   | Panel White        | `#FAFAFA` | Card surfaces                              |
| `--color-surface-alt`| Dot Field Yellow  | `#FFFBE0` | Alternate panel backgrounds                |
| `--color-text`      | Newsprint Black    | `#0A0A0A` | All body text, headlines, outlines         |
| `--color-border`    | Newsprint Black    | `#0A0A0A` | All card/border/divider strokes            |
| `--color-focus`     | Zap Yellow Focus   | `#FFE600` | Keyboard focus ring                        |
| `--color-error`     | Kapow Red Dark     | `#CC0000` | Error states, destructive actions          |
| `--color-info`      | Pow Blue           | `#0028DC` | Informational banners                      |
| `--color-success`   | Zap Yellow Bright  | `#FFE600` | Success states (yellow burst)               |

**Gradient:** `Primary Stripe` — linear 90deg #FF1A1A → #FFE600 (hero accent bands only)

---

## Typography Roles

| Role      | Font                   | Weight | Usage                              |
|-----------|------------------------|--------|-------------------------------------|
| Headline  | Bangers                | 400    | Hero H1, section titles, onomatopoeia bursts |
| Display   | Anton                  | 400    | Large stat numerals, countdown figures |
| Body      | Barlow Condensed       | 400/600 | Paragraphs, descriptions, metadata  |
| UI        | Barlow                 | 600/700 | Buttons, labels, nav, chips          |
| Mono      | Share Tech Mono        | 400    | Code blocks, timecodes              |

**Key rules applied:**
- ALL CAPS encouraged for headlines and short labels (pop art aesthetic)
- Body line-length: 55–70 characters (condensed type enables density)
- Outline text on yellow/red headlines: `-webkit-text-stroke: 2px #0A0A0A`
- Font loading: Google Fonts CDN `@import` (WOFF2 self-hosting noted as follow-up)

---

## Spatial System

**Spacing scale** (from `spacing_scale[]`): 4, 8, 12, 16, 24, 32, 48, 64, 96 px

**Corner radius:** sm=0px, md=4px, lg=8px, xl=16px, pill=999px
(No rounded corners beyond 8px on panel containers — per do_dont/layout)

**Content max-width:** 1280px (comic-panel canvas width)

**Border thickness:** 3px default, 4px feature elements (cards, modals)

---

## Motion Philosophy

**Motion style:** Punchy, snappy, staccato, comic-book.
**Animation speed:** Fast (under 200ms).
**Easing:** `ease-in-out`, `steps(4, end)`, `cubic-bezier(0.34, 1.56, 0.64, 1)` (spring-like overshoot).

**Microinteractions:**
- **Hover:** Cards shift 4px right + 4px down to reveal hard offset shadow (reverses on leave)
- **Button press:** Hard squash to 0.97 scale in 80ms — no bounce
- **Focus:** 3px solid yellow ring with 2px black offset — blazing and unmissable
- **Success:** POW! starburst text in Bangers radiating from the confirmed element
- **Loading:** Ben-Day dots stamp onto screen one row at a time

**Reduced motion:** All non-essential animation is gated behind `prefers-reduced-motion: reduce` — panel-wipe transitions become instant cuts; KAPOW! animations collapse to static.

---

## Visual Assets List

| Asset              | Type   | Notes                                                     |
|--------------------|--------|-----------------------------------------------------------|
| `img/logo.svg`     | SVG    | PHLIX Bangers wordmark, white on red, 3px border, offset shadow |
| `img/favicon.svg`   | SVG    | 32×32 red square with white "P", 2px black border         |
| `img/og.svg`       | SVG    | 1200×630 social card — red + Ben-Day dots + tagline       |
| `img/PROMPTS.md`   | MD     | Exact generation prompts for every raster asset           |
| Ben-Day dot pattern| CSS    | Inline SVG data URI in `base.css` — no raster needed      |
| Feature icons      | Inline SVG | 7 icons (library, syncplay, transcode, shield, antenna, broadcast, puzzle, hub) |
| Starburst decoration| CSS   | SVG polygon with animation in `components.css`            |

**Note:** `img/og.png` (1200×630 raster) needs to be rendered from `img/og.svg` for full Twitter Card compatibility. Use ImageMagick: `convert -resize 1200x630 img/og.svg img/og.png`

---

## Signature Elements Used

- Ben-Day dot field backgrounds (CSS inline SVG data URI — no raster overhead)
- Hard offset shadows (4px/4px solid #0A0A0A, zero blur)
- Thick 3px black borders on all cards, buttons, panels
- Bangers ALL CAPS headline treatment with `-webkit-text-stroke`
- Comic-panel grid gutters (3px black between content zones)
- Onomatopoeia "WHAM!" in the hero visual headline
- Yellow KAPOW! starburst on brand wordmark in header
- POW! badge style on media status badges
