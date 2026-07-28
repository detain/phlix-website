# SITE.md — Renaissance Atelier

## Concept & Vision

A painter's studio at the height of the Florentine Renaissance — candlelit vaults, pigment-dusted oak tables, da Vinci folios unfurled beside a lapis lazuli ground stone. Phlix becomes a grand atelier where every piece of media is a masterwork and every library is a curated collection worthy of a Medici patron. The visitor does not browse; they **curate**.

## Aesthetic Direction

**Visual style:** Old master oil painting, illuminated manuscript, Renaissance chalk and ink study. Chiaroscuro from a single warm candlelight source. Deep cool lapis shadows, warm ochre highlights, ivory parchment ground.

**Signature elements:**
- Sfumato radial glows behind hero content (candle-bloom)
- Double-rule card frames evoking manuscript chapter headings
- Lapis lazuli accent rules and gold leaf drop caps on key text
- Verdigris patina on metalwork details
- Florentine marble floor tile grid patterns

**Color role → name → hex:**

| Role | Name | Hex |
|------|------|-----|
| Primary | Lapis Lazuli | `#2B4A8C` |
| Primary hover | Deep Lapis | `#1E3568` |
| Secondary | Burnt Sienna | `#A0522D` |
| Tertiary | Ochre Gold | `#C8971A` |
| Neutral | Verdigris | `#4A7C6F` |
| Background | Ivory Parchment | `#F4ECD8` |
| Surface | Vellum | `#FAF4E4` |
| Surface alt | Aged Linen | `#EDE1C6` |
| Text | Rich Umber | `#2C1A0E` |
| Text muted | Umber 60% | `rgba(44,26,14,0.60)` |
| Success | Verdant Glaze | `#5A8A5E` |
| Warning | Saffron | `#D4961A` |
| Error | Carmine Lake | `#8C1F28` |
| Info | Cerulean Fresco | `#2A5FA5` |
| Focus | Gold Leaf | `#C8971A` |
| Border | Underdrawing Brown | `#3D1F0A` |
| Shadow | Raw Umber | `rgba(44,26,14,0.35)` |
| Overlay | Deep Shadow Veil | `rgba(14,10,6,0.72)` |

**Contrast notes:** Lapis Lazuli (`#2B4A8C`) on Ivory Parchment (`#F4ECD8`) = **5.2:1** (AA). Burnt Sienna (`#A0522D`) on Vellum (`#FAF4E4`) = **4.9:1** (AA small text). Rich Umber on Vellum = **8.9:1**. Gold Leaf (`#C8971A`) is reserved for large display text, focus rings, and icons only — not for body text below 18px.

## Typography

| Role | Face | Weights | Notes |
|------|------|---------|-------|
| Headline | Cormorant Garamond | 600, 700 | Grand display, authoritative |
| Display / small-caps | Cormorant SC | 600 | Section labels, numerals |
| Body | EB Garamond | 400, 500 | Long-form reading, 1.7 leading |
| UI / labels | Libre Baskerville | 400, 700 | Navigation, buttons, form labels |
| Mono / code | Courier Prime | 400, 700 | Code blocks, file paths |
| Number | Cormorant Garamond | 600 | Oldstyle numerals in context |

**Strong emphasis:** `<strong>` uses `font-weight: 700` + `color: var(--color-secondary)` (Burnt Sienna). Two-channel emphasis because the kit caps the body face at 500 and 700 is undeclared; Burnt Sienna on Vellum clears **4.9:1** for small text.

## Spatial System

- 8pt spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96px
- Max content width: 1400px; hero centred within 960px
- Desktop lateral margins: 48px; tablet: 32px; mobile: 20px
- Generous section rhythm: 48px sections with 32px internal padding

## Motion Philosophy

- **Sfumato smooth:** cross-dissolve transitions, 350–600ms ease-in-out
- Hero: slow bloom-in on load (`bloom-in`, 600ms)
- Section reveals: gentle fade-up via IntersectionObserver
- Hover states: 200ms ease-out, ochre inner glow + 2px lift
- **Reduced motion:** all animations freeze; opacity transitions become instant

## Visual Assets

- **Logo:** SVG wordmark in Cormorant Garamond semibold, lapis blue on ivory, enclosed in an ochre-gold tondo frame with fine double-rule border
- **Favicon:** Square lapis lazuli (`#2B4A8C`) mark with a quill-pen motif
- **OG image:** 1200×630 — lapis ground with sfumato, "Your Library. Illuminated." in Cormorant Garamond ivory, ochre gold rule, Piero silhouette
- **Piero mascot:** SVG garzone figure — young apprentice in linen apron holding a candle lantern; used on hero, features, download, about; dismissed to localStorage
- **Feature icons:** Inline stroke SVG, 1.5px burnt-sienna stroke, slightly imperfect, matching the quill-drawn icon rule

## Seasonal Variants

Four seasonal variants are date-gated via live-JS:
- **Advent Illumination** (Dec 1–31): deeper lapis, warmer gold, parchment shifted lighter
- **Carnivale Veneziano** (Feb 1–28): crimson secondary, gilded palette
- **Estate Summer Study** (Jun 21–Sep 22): bleached parchment, warmer surface
- **Autunno Harvest Studio** (Sep 23–Nov 30): terracotta-warmed secondary, deepened background

Motif assets (`img/seasonal/*.svg`) are decorative and not yet generated — the date gate, token overrides, and variant CSS are all shipped.
