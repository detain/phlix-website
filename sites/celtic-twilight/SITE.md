# SITE.md — Celtic Twilight Phlix Site

## 1. Concept & Vision

Celtic Twilight dresses Phlix in the luminous hush of a stone circle at dusk. The site should feel like stepping into an illuminated manuscript — every page a crafted vellum surface, every scroll a passage through mist and gold leaf. The brand is ancient, lyrical, and reverent; it moves slowly and breathes deeply. Users should feel the weight of stories and the warmth of a hearth, not the cold efficiency of a tech product.

**Brand identity in use:** Celtic Twilight (base kit, v1.0)

---

## 2. Aesthetic Direction

### Art Direction
Artwork evokes twilight moorland: deep emerald greens fading into dusk purples, soft ground mist, and a faint luminous horizon. Key illustrations draw from Celtic knotwork geometry (spirals, triskelions, interlace) and Pre-Raphaelite figure studies. Lighting is crepuscular and atmospheric: warm gold of a lantern or hearth against cool dusk blue-purple.

### Visual Style Tags
- Illuminated manuscript
- Celtic knotwork linework
- Pre-Raphaelite painterly depth
- Vellum texture and aged parchment
- Dusk atmospheric gradients

### Mood
Mystical · Reverent · Lyrical · Grounded · Timeless · Atmospheric

### Layout Archetype: **Immersive Editorial**
Chosen for its ability to convey depth, ceremony, and atmosphere — fitting for a brand built on ancient story and illuminated manuscript aesthetics. The full-bleed hero with atmospheric gradient, generous whitespace, and editorial serif typography creates the unhurried, reverent quality the brand demands.

---

## 3. Color Table

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Emerald Grove | `#2D6A4F` | Primary CTAs, active states |
| Secondary | Twilight Amethyst | `#6B3FA0` | Secondary actions, hover highlights |
| Tertiary | Ancient Gold | `#B8860B` | Badge highlights, ornamental accents |
| Background | Vellum | `#F4EDD8` | Default page background |
| Surface | Pale Mist | `#FAF7EE` | Card and panel surfaces |
| Surface Alt | Heather Wash | `#E8E0F0` | Alternate surfaces, hover states |
| Text | Ink Black | `#1A1208` | Primary body and headline text |
| Border | Peat Ink | `#2C2010` | Card borders, dividers, linework |
| Success | Shamrock Mist | `#A8DABC` | Success toasts, confirmations |
| Warning | Harvest Ochre | `#D4A827` | Warnings, caution states |
| Error | Rowan Berry | `#8B2020` | Errors, destructive actions |
| Focus | Gold Leaf Glow | `#C9980A` | Keyboard focus ring |
| Shadow | Dusk Shadow | `rgba(30,15,48,0.28)` | Drop shadows (twilight-purple tinted) |
| Overlay | Nightfall Veil | `rgba(13,8,32,0.65)` | Modal/scrim overlays |

### Gradients
- **Dusk Over the Moor:** `linear-gradient(160deg, #2D6A4F, #4A2578, #1A0D2E)` — hero backdrops
- **Gold Illumination:** `radial-gradient(circle, rgba(201,152,10,0.45), transparent)` — featured ornaments
- **Rising Mist:** `linear-gradient(0deg, rgba(244,237,216,0), rgba(250,247,238,0.9))` — footer fades

### Color Rules Followed
- Never more than 3 accent colors in a single view
- Backgrounds always vellum or vellum-derived — never pure white
- Gold reserved for highest-importance emphasis (one moment per section max)
- Shadows carry twilight-purple tint, never neutral grey or pure black
- Emerald for primary actions; amethyst for secondary; gold for premium/celebration

---

## 4. Typography

| Role | Family | Fallbacks | Weight | Tracking | Usage |
|------|--------|-----------|--------|----------|-------|
| Headline | Cinzel | Trajan Pro, Georgia, serif | 400, 700 | 0.06em | Hero headlines, section titles |
| Display | Cinzel Decorative | Cinzel, Georgia, serif | 400, 700 | 0.08em | Oversized splash headings |
| Body | EB Garamond | Garamond, Palatino, Georgia, serif | 400, 500, 600 | 0.01em | Paragraphs, long-form reading |
| UI | Nunito | Open Sans, system-ui, sans-serif | 400, 600, 700 | 0.02em | Buttons, labels, navigation, chips |
| Mono | DM Mono | Fira Mono, Courier New, monospace | 400, 500 | 0em | Code, tokens, file paths |

### Typography Rules Applied
- Cinzel and Cinzel Decorative reserved for display/headline only — never body text
- EB Garamond body text: generous line-height (1.7), no tight tracking
- Body line-length kept to 62–72 characters for comfortable reading
- Italic welcome in body copy for lyrical passages; never italic headlines

---

## 5. Spatial System

**Spacing scale (9 steps):** 4 · 8 · 12 · 16 · 20 · 24 · 32 · 48 · 64 · 96 px

**Corner radius scale:**
- `--radius-sm: 4px`
- `--radius-md: 10px`
- `--radius-lg: 18px`
- `--radius-xl: 28px`
- `--radius-pill: 999px`

**Max content width:** 1320px (generous vellum breathing room)

---

## 6. Motion Philosophy

- **Style:** Slow · Organic · Atmospheric · Reverent
- **Speed:** Slow (never snappy or mechanical)
- **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)`, `ease-in-out`, spring(low-tension)
- **Reduced motion:** All non-essential animation gated behind `prefers-reduced-motion: reduce`
- **Transitions used:** Slow cross-dissolve, mist rise, gentle scale from 0.97, knotwork unfurl
- **Hover microinteraction:** Cards lift 3px with dusk-purple shadow and 1.015 scale
- **Button press:** Gentle 0.98 scale with gold inner glow fading over 200ms

---

## 7. Visual Assets

| Asset | Description |
|-------|-------------|
| `img/logo.svg` | Cinzel wordmark in ancient gold on dusk-gradient field, knotwork corner ornaments |
| `img/favicon.svg` | 32×32 emerald square with gold triskelion spiral ornament |
| `img/og.svg` | 1200×630 social share card — dusk gradient, gold wordmark, tagline |
| `img/PROMPTS.md` | Exact generation prompts for every image asset |
| Inline SVG icons (7) | Single-color outlined icons with rounded caps, organic strokes (1.5px) |

### Icon Style Applied
- Outlined, rounded, hand-drawn, organic
- 1.5–2px stroke weight with rounded caps and joins
- Single-color (peat ink or emerald); duotone for featured/hero icons
- No sharp-cornered or purely geometric icons

---

## 8. Signature Elements Used

- Interlaced knotwork borders and dividers (SVG corner ornaments)
- Standing stone silhouettes at dusk (CSS/SVG gradient hero backdrop)
- Illuminated manuscript capital letter treatment (Cinzel + gold)
- Triskelion and spiral ornaments (favicon, OG image, ornaments)
- Hawthorn and oak branch motifs (knotwork SVG)
- Gold-leaf dot clusters (Book of Kells dotting — ornamental SVG)
- Vellum texture feel (background colors, warm shadows)

---

## 9. What Was Avoided (Brand Opposites)

The following were treated as hard constraints — any screen drifting toward these is a defect:
- Neon or electric colors
- Corporate or clinical design
- Flat or sterile minimalism
- Fantasy-game dark (grimdark, skulls, harsh contrast)
- Novelty-forward or trend-chasing aesthetics
- High-tech futurism
- Aggressively bright or cheerful tone
- Photographic realism, harsh edge lighting
- Generic play-button triangle, gear/cog, or tech iconography
