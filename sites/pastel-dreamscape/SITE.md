# SITE.md — Pastel Dreamscape Phlix Brand Site

## Concept & Vision

**Pastel Dreamscape** is a soft kawaii cloud world dressed in cotton-candy pastels — baby pink lavender skies, mint meadows, peach sunrises, and iridescent bubbles drifting through every screen. The site should feel like stepping into a dream painted by a gentle hand: warm, encouraging, and full of childlike wonder. Watching your favorite media becomes a floaty, joyful journey through sweetness and light. Every screen glows softly, every corner is curved, every interaction feels like touching a cloud.

---

## Aesthetic Direction

- **Theme:** Kawaii pastel cloud world — cotton-candy skies, iridescent bubbles, fluffy cumulus clouds
- **Mood:** Joyful, whimsical, gentle, encouraging — never harsh, dark, or cold
- **Reference images:** Studio Ghibli cloud paintings, Kawaii Japanese stationery, cotton-candy fair rides, unicorn aesthetics, iridescent soap bubbles
- **Texture:** Subtle texture; watercolor washes, sticker-art character style, soft cel-shaded vector
- **Depth:** Slightly layered — foreground cloud, mid-subject, background gradient sky

---

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| `--color-primary` | Candy Pink | `#F9A8D4` | Primary CTAs, active states, key highlights, logo accent |
| `--color-secondary` | Dream Lavender | `#C4B5FD` | Secondary actions, links, hover states, section headers |
| `--color-tertiary` | Mint Cloud | `#A7F3D0` | Badges, tag chips, success states, decorative accents |
| `--color-neutral` | Peach Mist | `#FBCBA9` | Warm neutral accents, dividers |
| `--color-bg` | Cloud Cream | `#FEF9F5` | Default page background |
| `--color-surface` | Petal White | `#FEFCE8` | Card and panel surfaces |
| `--color-surface-alt` | Lavender Mist | `#F3EFFE` | Alternate surface, hover rows, highlighted panels |
| `--color-text` | Soft Ink | `#4B3F6B` | Primary body and headline text — never stark black |
| `--color-success` | Sprout Mint | `#6EE7B7` | Success toasts, confirmations |
| `--color-warning` | Peach Glow | `#FCD34D` | Warnings, caution notices |
| `--color-error` | Blush Rose | `#FDA4AF` | Errors — kept soft, never alarming |
| `--color-info` | Sky Blue | `#93C5FD` | Informational banners |
| `--color-focus` | Shimmer Lilac | `#A78BFA` | Keyboard focus ring |
| `--color-border` | Lilac Outline | `#DDD6FE` | Card borders, dividers |
| `--color-shadow` | Lavender Dream Shadow | `rgba(196,181,253,0.30)` | Soft lavender-tinted shadows |
| `--color-overlay` | Violet Dream Scrim | `rgba(45,27,105,0.55)` | Modal overlays |

**Gradients:**
- Cotton Candy Sky — `linear-gradient(145deg, #F9A8D4, #C4B5FD, #BAE6FD)` — hero backdrops
- Sunrise Peach — `linear-gradient(160deg, #FDE68A, #FBCBA9, #F9A8D4)` — CTA banners
- Iridescent Bubble — `radial-gradient(circle, rgba(255,255,255,0.9), rgba(196,181,253,0.35), rgba(167,243,208,0.2), rgba(249,168,212,0.15))` — shimmer overlay on cards
- Mint Meadow — `linear-gradient(180deg, #A7F3D0, #ECFDF5)` — success states

---

## Typography

| Role | Family | Weight | Notes |
|------|--------|--------|-------|
| Headline | Baloo 2 | 700, 800 | Big dreamy hero headlines and section titles |
| Display | Comfortaa | 700 | Oversized display text, splash titles |
| Body | Nunito | 400, 500, 600 | Paragraphs, descriptions, long-form reading |
| UI | Quicksand | 500, 600, 700 | Buttons, labels, navigation, chips |
| Mono | Fira Code | 400, 500 | Code blocks, token displays |
| Number | Baloo 2 | 700 | Dashboard stats, counters |

**Rules:**
- Never use serif or slab-serif fonts
- Never use condensed or angular typefaces
- All type is round and friendly
- Body line-length 55–70 characters
- Headlines use generous size — dreamscapes need big dreamy words

---

## Spatial System

**Spacing scale (px):** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96

**Corner radius:** `sm: 8px` · `md: 16px` · `lg: 28px` · `xl: 40px` · `pill: 999px`

**Max content width:** 1280px

**Shadows:** All soft lavender-tinted — `shadow-sm: rgba(196,181,253,0.25)`, `shadow-md: rgba(196,181,253,0.30)`, `shadow-lg: rgba(196,181,253,0.35)`

---

## Motion Philosophy

**Easing:** `cubic-bezier(0.34, 1.56, 0.64, 1)` (spring), `ease-out`

**Speed:** Medium — floaty, bubbly, dreamy

**Transitions:**
- Soft fade-up with scale
- Bubble pop-in
- Cloud drift-across
- Petal fall
- Shimmer dissolve

**Microinteractions:**
- Hover: Card floats up 3px + lilac shadow bloom + 1.03 scale. Iridescent shimmer overlay fades in.
- Button press: Bubbly squash to 0.95 then spring-back with tiny sparkle burst
- Focus: Soft pulsing shimmer-lilac focus ring, 150ms fade-in

**Reduced motion:** Replaced with simple cross-fades; floating bubbles hidden

---

## Visual Assets

**Logo:** "Phlix" wordmark in Comfortaa (candy pink or soft plum) on cloud-cream, with cloud/bubble/sparkle accents. Legible at all sizes.

**Favicon:** Square candy pink (#F9A8D4) with "Ph" in Comfortaa and small bubble/sparkle accents.

**OG image:** Cotton-candy sky gradient with bubbles, Phlix wordmark, and "Where every story floats on clouds." tagline.

**Inline feature icons:** 1.5–2px stroke, rounded caps/joins, soft ink color, pastel duotone on featured icons. Bubble/sparkle accent on decorative icons.

**Decorative elements:**
- Fluffy cumulus cloud puffs in hero section
- Floating iridescent bubble animations in hero
- Pastel rainbow arcs and soft star sparkles
- Wavy divider shapes

**Anti-patterns (never use):** dark/moody photography, neon or electric colors, sharp/angular shapes, stark black outlines, hard shadows, grey tones.

---

## Layout Archetype

**Immersive** — The kawaii cloud-world aesthetic with its dreamy watercolor washes, floating compositions, bubble animations, and the Dreamy mascot character calls for an immersive/showcase layout. The hero is full-bleed with animated bubbles; cards float on petal-white surfaces; the whole experience feels like floating through a cotton-candy sky.

Key composition rules:
- Full-bleed cotton-candy gradient hero with animated bubble particles
- Feature sections use soft pastel surfaces (petal white, lavender mist)
- Primary CTA is always a candy-pink pill button with spring animation
- Generous empty space treated as clouds — never cramped
- Max 3 accent colors per view
- Dreamy mascot (kawaii cloud fairy) influences decorative elements throughout

---

## Mascot: Dreamy

The **Dreamy** cloud fairy appears throughout the design as a kawaii character with iridescent pastel wings, rosy cheeks, and cotton-candy pink hair. She is always in gentle, encouraging poses — never aggressive or alarming. Used in empty states, hero decoration, and as the brand's emotional anchor.
