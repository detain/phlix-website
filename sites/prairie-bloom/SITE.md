# SITE.md — Prairie Bloom

## Concept & Vision

Prairie Bloom brings the warmth of a summer county fair to every Phlix screen. It feels like a hand-stitched quilt draped over a porch railing — warm hay-cream backgrounds, sunflower yellow CTAs, folk-art rooster silhouettes, and a companion named Sunny who sways gently in the corner. This is media hosting as community gathering, not enterprise software.

## Aesthetic Direction

- **Theme:** American heartland wildflower meadow — quilted patterns, folk art roosters, sunflowers stretching to wide-open skies, county fairs, hand-stitched embroidery.
- **Visual style:** Folk art illustration, hand-stitched embroidery feel, seed packet woodblock print, quilted patchwork geometry.
- **Mood:** Wholesome, genuine, warm, community-centered, handcrafted, grounded.
- **Not:** Corporate, cold, minimalist, dark, hyper-polished, neon/cyberpunk.

## Color Table

| Token | Name | Hex | Usage |
|---|---|---|---|
| `--color-primary` | Sunflower Yellow | `#F2C12E` | Primary CTAs, active states |
| `--color-secondary` | Wildflower Violet | `#7B5EA7` | Links, secondary actions |
| `--color-tertiary` | Barn Red | `#B83A3A` | Warm accents, folk-art outlines |
| `--color-neutral` | Clover Green | `#4E7C59` | Success states, botanical details |
| `--color-bg` | Hay Cream | `#F7F0DC` | Default page background |
| `--color-surface` | Warm Linen | `#FBF6EA` | Card and panel surfaces |
| `--color-surface-alt` | Oat Field | `#EDE3C5` | Alternate surfaces, stripes |
| `--color-text` | Furrow Brown | `#2C1D0E` | Primary text, folk-art ink strokes |
| `--color-border` | Furrow Outline | `#2C1D0E` | Card borders, dividers |

## Typography Roles

| Role | Family | Weight | Usage |
|---|---|---|---|
| Headline | Zilla Slab | 700 | Folk-art headlines, hero titles |
| Display | Playfair Display | 700, 900 | Oversized display text |
| Body | Lora | 400, 600 | Paragraphs, long-form reading |
| UI | Nunito | 400, 600, 700 | Buttons, labels, nav |
| Mono | Fira Code | 400, 500 | Code, technical readouts |
| Number | Zilla Slab | 700 | Stats, counters |

**`<strong>` weight:** `font-weight: 600` (Lora 600, a 200-unit step from body 400).

## Spatial System

- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px
- Corner radius: 4 / 10 / 18 / 28 / 999px (pill)
- Max content width: 1320px
- Borders: 2px solid furrow-brown, hand-drawn feel

## Motion Philosophy

- **Style:** Gentle, organic, bouncy, warm, unhurried
- **Easing:** ease-out, spring, cubic-bezier(0.34, 1.56, 0.64, 1)
- **Speed:** Medium (160–300ms interactions)
- **Reduced motion:** All animations drop; content is static but readable
- **Pollen particles:** Subtle golden dots drifting down, disabled under prefers-reduced-motion
- **Sunflower sway:** Sunny mascot gently rocks; disabled under reduced motion

## Visual Assets

- `img/logo.svg` — Prairie Bloom wordmark with folk-art sunflower, Zilla Slab type
- `img/sunny.svg` — Sunny the sunflower mascot (anthropomorphic, straw hat, wildflower basket)
- `img/og.svg` — OG image source (folk-art meadow scene with sunflowers, tagline)
- CSS-only meadow art in hero (sunflower silhouettes, cloud drifts)
- Inline SVG icons for all 8 features (folk-art outlined, 2px stroke)
- Quilt-dash decorative dividers (repeating linear-gradient)

## Seasonal Activation

Live JS date-gate applies CSS custom-property overrides:
- **Harvest Festival** (09-15–11-15): primary → `#D97A2E`, bg → `#F5E8CC`
- **Winter Hearth** (11-25–01-06): primary → `#B83A3A`, secondary → `#4E7C59`, bg → `#F3ECE2`
- **Spring Seedling** (03-20–05-31): primary → `#6BAE75`, secondary → `#A87DC8`, bg → `#F4F2E6`

## Mascot Companion

- **Name:** Sunny, an anthropomorphic sunflower
- **Personality:** Bright, welcoming, tips hat on interaction
- **Pages:** Home, Features, Download
- **Dismissal:** "Sunny, take a rest" button → localStorage persisted
- **Tips:** Section-aware IntersectionObserver tips while scrolling
