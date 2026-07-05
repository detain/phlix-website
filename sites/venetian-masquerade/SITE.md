# SITE.md — Venetian Masquerade Brand Kit Site

## Concept & Vision

The Venetian Masquerade site is a **Baroque palazzo on screen** — opulent, theatrical, and steeped in mystery. Every element should feel as if it belongs behind gilded doors in a 17th-century Venetian palazzo: deep crimson velvet, candlelit candelabras, ornate filigree, and the enigmatic half-hidden faces of carnival masks. The product (Phlix) is presented as the grand host of an endless, grand entertainment — the `tagline_primary` "Every Frame a Revelation" is the brand's oath.

**Brand DNA (condensed):**
> Venetian Masquerade is the velvet-curtained grandeur of a Baroque palazzo brought to life on screen. It is theatrical, gilded, and deeply atmospheric — deep crimson, burnished gold, and midnight blue. It is never casual, flat, or minimal; every surface carries ornament and every interaction rewards attention.

**Archetype:** Magician — the editorial stance is wonder, enchantment, and revelation.

---

## Aesthetic Direction

- **Visual style:** Baroque oil painting / gilded ornamental illustration / dramatic chiaroscuro lighting
- **Art direction:** Masterwork commissioned for a Venetian palazzo — deep shadows, warm candlelight, gold filigree, damask patterns, Baroque flourishes. Compositions are theatrical, stage-like, framed by drapes or ornate arches.
- **Lighting:** Warm candlelit amber flame with deep encircling shadow; high-contrast chiaroscuro.
- **Composition:** Theatrical and stage-like; subjects framed by drapes or arches; dramatic diagonals with symmetrical architectural anchoring; golden-ratio Baroque spirals.
- **Depth:** Layered — rich fabric, filigree, figure, architecture, canal reflection.
- **Texture level:** Heavy — brocade and damask texture overlays, paper grain, candlelight halos.

---

## Color Palette

| Token Role | Name | Hex | Usage |
|---|---|---|---|
| `--color-primary` | Crimson Velvet | `#8B1A1A` | Primary CTAs, key emphasis, draped curtain accents |
| `--color-secondary` | Burnished Gold | `#C9922E` | Filigree borders, decorative highlights, secondary CTAs |
| `--color-tertiary` | Peacock Teal | `#0D7377` | Links, informational states, mask feather accents |
| `--color-bg` | Midnight Velvet | `#0E0A1A` | Default page background |
| `--color-surface` | Deep Indigo | `#1A1230` | Card and panel surfaces |
| `--color-surface-alt` | Plum Shadow | `#251840` | Alternate surfaces, nested panels |
| `--color-text` | Pearl Ivory | `#F2EDDF` | Primary body and headline text |
| `--color-border` | Gold Filigree | `#9A6E20` | Card borders, panel dividers |
| `--color-success` | Emerald Palazzo | `#2D6A4F` | Success confirmations |
| `--color-warning` | Amber Lantern | `#D4850A` | Warnings and caution states |
| `--color-error` | Sangue Rosso | `#7A1010` | Errors, destructive actions |
| `--color-info` | Lagoon Teal | `#147377` | Informational banners |
| `--color-focus` | Gold Focus Halo | `#C9922E` | Keyboard focus ring |

**Gradients:**
- `Gilded Crimson` (`#8B1A1A` → `#C9922E` at 145deg): CTA banners, hero backdrops, mask halos
- `Midnight Canal` (`#0E0A1A` → `#1A1230` at 180deg): page backgrounds
- `Candle Glow` (radial, gold 35% → transparent): hero mask and card halos
- `Peacock Jewel` (`#0D7377` → `#8B1A1A` at 120deg): accent banners, feather strips

---

## Typography

| Role | Family | Weights | Usage |
|---|---|---|---|
| Headline | Cinzel Decorative | 400, 700 | Grand Baroque display headlines, hero titles |
| Display | Cinzel | 400, 600, 900 | Oversized numerals, theatrical banners |
| Body | EB Garamond | 400, 500, 600 | Paragraphs, long-form reading |
| UI | Cormorant Garamond | 400, 600, 700 | Buttons, labels, navigation, chips |
| Mono | Courier Prime | 400, 700 | Code, technical readouts |

**Typography rules enforced:**
- All headlines use Cinzel Decorative — never sans-serif headline variants
- Body text is always EB Garamond; never geometric sans-serif for reading
- Generous letter-spacing (0.06–0.12em) on display text
- Avoid ALL CAPS except short labels
- Gold text on dark reserved for section headings and decorative labels only
- Body line-length 60–72 characters

---

## Spatial System

- **Scale (8px-based):** 4, 8, 12, 16, 24, 32, 48, 64px
- **Max content width:** 1440px, centered with dark side gutters
- **Spacing pattern:** 24/32/48px cadence for section rhythm (regal, not cramped)
- **Card radius:** `--radius-lg` (16px) for cards, `--radius-md` (8px) for buttons

---

## Motion Philosophy

- **Style:** Ceremonious, sweeping, dramatic, controlled — never bouncy or abrupt
- **Speed:** Slow — 300–500ms for page/panel transitions
- **Easing:** `ease-in-out`, `cubic-bezier(0.25, 0.46, 0.45, 0.94)`, `ease-out`
- **Transitions:** Curtain draw, candlelight dissolve, gilded mask wipe, deep cross-fade, slow upward reveal
- **Hover microinteraction:** Cards lift 3px with gold-border glow over 220ms; buttons scale to 0.97 on press with stately release
- **Scroll reveals:** `IntersectionObserver` fade-up at 0.5s ease-out (no motion if `prefers-reduced-motion`)
- **Focus:** 3px burnished gold ring with 3px indigo offset, 160ms fade

---

## Visual Assets

| Asset | Source | Notes |
|---|---|---|
| `img/logo.svg` | Inline SVG | Baroque cartouche wordmark, ivory on midnight, gold flourishes |
| `img/favicon.svg` | Inline SVG | Crimson square with gold/ivory mask silhouette |
| `img/og.svg` | Inline SVG | Full hero scene: mask, candelabras, gondola, Baroque frame |
| 7× feature SVG icons | Inline SVG | 1.5px fine stroke, ivory on dark, gold + crimson on highlighted |
| `img/PROMPTS.md` | Generated | Full prompt library for asset regeneration |

All decorative elements achieved via CSS gradients and inline SVG — no raster background images.

---

## Layout Archetype

**Immersive** — full-bleed cinematic dark canvas, radial gold glow highlights, theatrical hero composition anchoring each page. Single dominant hero element per page; generous dark breathing room throughout; jewel-tone stat cards on midnight velvet dashboard sections.

Key structure:
- Sticky header: deep indigo with gold filigree bottom border, Cinzel Decorative wordmark
- Hero: full-bleed with radial gold candle glow + midnight canal gradient
- Content sections: deep indigo surfaces with gold border cards, asymmetric jewel-tone accents
- CTA banner: crimson-to-gold diagonal gradient with radial flame overlay
- Footer: plum shadow with gold filigree top border, 3-column nav
