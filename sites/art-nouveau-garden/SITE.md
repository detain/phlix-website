# SITE.md — Art Nouveau Garden for Phlix

## Concept & Vision

Art Nouveau Garden is the **flagship Phlix marketing site dressed in Belle Époque beauty** — the world of Alphonse Mucha decorative panels, Louis Comfort Tiffany stained glass, and the Paris Exposition of 1900. Every surface blooms with organic vines, peacock plumage, and gilded lily pads. The site feels like stepping into a small lantern-lit garden salon where cinema is celebrated as art. Pressing play is not an act of consumption; it is an act of aesthetic devotion.

**Brand DNA (condensed):** Art Nouveau Garden is the soul of Belle Époque beauty, grown from living vines and peacock feathers. It is sage green and dusty rose, aged gold and cream ivory — never cold, never corporate, never hurried. It moves like a garden in a gentle wind: sinuous, generous, and impossible to rush.

---

## Aesthetic Direction

- **Style tags:** Belle Époque illustration, botanical watercolor, Art Nouveau poster art, stained glass translucency, hand-lettered ornamental type, gilded embossed detail
- **Art direction:** Ivory vellum paper, lush sage and forest greens, dusty rose petals, aged gold leaf. Compositions framed by organic borders — curling vines, peacock feathers, lily stems — as if every scene exists inside a Mucha decorative panel. Lighting is soft, diffuse, warm (gaslight glow through stained glass). Textures: vellum grain, watercolor bloom, gold leaf shimmer. No harshness, no harsh contrast, no cold digital precision.
- **Realism level:** Illustrated (watercolor, paper grain, vector, linocut). No photorealistic CGI.
- **Depth:** Layered (soft shadows, gentle elevation, botanical overlays).
- **Rendering:** Watercolor + paper grain texture, vector linework.

---

## Color Palette

| Token | Name | Hex | Usage |
|-------|------|-----|-------|
| `--color-primary` | Aged Gold | `#B8960C` | Primary CTAs, gilded borders, active states |
| `--color-secondary` | Dusty Rose | `#C08070` | Secondary actions, floral accents, hover states |
| `--color-tertiary` | Sage Garden | `#7D9B76` | Badges, vine fills, progress indicators |
| `--color-bg` | Ivory Cream | `#F5EFE0` | Default page background |
| `--color-surface` | Parchment | `#FAF5EA` | Card and panel surfaces |
| `--color-surface-alt` | Sage Mist | `#EAF0E6` | Alternate tinted surfaces |
| `--color-text` | Forest Ink | `#1F2E1A` | Primary body and headline text |
| `--color-text-muted` | Warm Umber | `#7A6352` | Muted text, dividers |
| `--color-border` | Vine Ink | `#2C3D28` | Fine botanical borders |
| `--color-success` | Lily Pad | `#A8C8A0` | Success confirmations |
| `--color-warning` | Amber Petal | `#D4A83C` | Warnings |
| `--color-error` | Faded Crimson | `#9E4848` | Errors, destructive actions |
| `--color-info` | Peacock Blue | `#3D7A8A` | Informational banners, links |
| `--color-focus` | Gold Glow | `#B8960C` | Keyboard focus ring |

**Gradients:**
- `Golden Hour Garden`: linear 145deg, #B8960C → #C08070 — hero backdrops, frame fills
- `Vine to Bloom`: linear 160deg, #7D9B76 → #C08070 — botanical accents
- `Parchment Light`: radial, transparent → rgba(245,239,224,0.85) — candlelit vignette behind hero
- `Peacock Sheen`: linear 120deg, #3D7A8A → #7D9B76 → #B8960C — iridescent badge accents

**Color rules followed:**
- Aged Gold reserved for primary CTAs and gilded accents (never brash/chrome-bright)
- Backgrounds always ivory cream or parchment — never white, never dark
- Max 3 accent colors per view
- Shadows warm green-tinted (moss shadow), never cool grey or pure black
- Forest Ink (not pure black) for text and borders

---

## Typography

| Role | Font | Fallback | Size | Weight | Tracking | Leading |
|------|------|----------|------|--------|---------|---------|
| Headline | Cormorant Garamond | Playfair Display, Georgia, serif | clamp(2.25rem, 4vw, 3.5rem) | 600, 700 | 0.04em | 1.1 |
| Display | Playfair Display | Cormorant Garamond, Georgia, serif | clamp(3rem, 8vw, 7rem) | 700, 900 | 0.06em | 1.0 |
| Body | EB Garamond | Garamond, Georgia, serif | clamp(1rem, 0.95rem+0.25vw, 1.125rem) | 400, 500 | 0.01em | 1.7 |
| UI | Josefin Sans | Optima, Trebuchet MS, system-ui | 0.875rem | 300, 400, 600 | 0.08em | 1.4 |
| Mono | Courier Prime | Courier New, monospace | 0.875rem | 400, 700 | 0em | 1.6 |

**Typography rules:** Display/headline always serif — the garden speaks in curves. UI labels in Josefin Sans with generous tracking. Body text uses oldstyle numerals. Never use bold body copy for emphasis — use italic or color shift. Body line-length 60–70 characters.

---

## Spatial System

**Spacing scale (px):** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96

**Max content width:** 1440px | **Content width:** 1200px | **Gutter:** clamp(24px, 4vw, 48px)

**Corner radius:** sm=4px · md=10px · lg=18px · xl=28px · pill=999px · organic=asymmetric blob

**Layout archetype:** **Immersive/Showcase** — full-bleed Mucha-style hero illustration → feature panels with vine borders → testimonials → gilded CTA. Organic border language throughout. Generous "garden path" whitespace. Content always inside a botanical frame.

---

## Motion Philosophy

**Speed:** Slow (700ms for major transitions, 400ms for components, 200ms for microinteractions)

**Easing:** `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (garden ease), `ease-in-out`, `ease-out`

**Transition vocabulary:** Petal dissolve, vine unfurl, soft iris wipe (circular botanical), cross-fade with golden dust, leaf-fall reveal

**Micro-interactions:**
- Cards hover: rise 3px, moss-shadow deepens, vine tendril subtly extends on border
- Button press: gentle 0.98 scale with brief gold shimmer, spring return
- Loading: lily grows petal-by-petals in aged gold outline
- Focus: aged-gold focus ring blooms into view over 150ms with soft outward pulse
- Success: small blossom unfurls — three petals, dusty rose, then gold

**Reduced motion:** All auto-playing decorative animations replaced with simple fades. No parallax. Respects `prefers-reduced-motion`.

---

## Visual Assets

- **Logo:** Cormorant Garamond wordmark inside botanical oval frame with lily and vine border detail, aged gold on ivory. SVG.
- **Favicon:** Stylized lily blossom mark in aged gold on ivory. SVG.
- **OG image:** Full 1200×630 Art Nouveau poster composition with botanical frame, Phlix wordmark, tagline. SVG source; rasterize to PNG for Twitter.
- **Icons:** 8 inline SVG feature icons (1.5px stroke, rounded caps/joins, botanical hand-drawn style). No CDN icon fonts.
- **Hero decorations:** Hand-crafted inline SVG botanical vine corner accents with lily blossoms in kit colors.
- **Mascot Lily:** Art Nouveau garden spirit (half-human, half-botanical figure). Not yet rendered as raster — described in `img/PROMPTS.md` for future illustration.

---

## Seasonal Variants (documented, not auto-applied)

| Name | Active | Color overrides | Motif |
|------|--------|-----------------|-------|
| Midsummer Bloom | Jun 1–Aug 31 | Warmer ivory, terracotta rose, fresh sage | Sunflowers, abundant roses |
| Autumn Harvest Bower | Sep 22–Nov 30 | Amber/bronze gold, terracotta, dried botanicals | Harvest grapes, turning leaves |
| Winter Conservatory | Dec 1–Feb 28 | Muted gold, cool sage, frosted glass | Frosted botanical glass panels |
| Spring Awakening | Mar 1–May 31 | Cherry blossom pink, fresh sage | New tendrils, cherry blossoms, planting seeds |

To activate a variant, uncomment its CSS custom property overrides in `theme.css`.

---

## Design Principles Applied

1. Every surface carries a living motif — vine, petal, feather, or curve
2. Organic flows over geometric rigidity; nothing is harsh or angular
3. Gold accents are aged and matte, never brash or chrome-bright
4. Whitespace is the garden path — generous breathing room
5. Frames and borders are as important as content; ornament is substance
6. Colors always drawn from nature: sage, rose, ivory, forest, gold
7. Typography feels handcrafted — display type that could be hand-lettered

---

## Do / Don't Checklist

**Colors:** Ivory/parchment backgrounds · Aged gold for CTAs · Nature-derived hues · ❌ Pure white/black, neon, cool grey shadows

**Typography:** Cormorant Garamond/Playfair for headings · Josefin Sans for UI · ❌ Geometric sans for headlines, sans-serif body

**Layout:** Generous whitespace · Botanical border frames · Single calm focal point · ❌ Dense grids, sharp rectangular heroes, >1440px content

**Motion:** Slow, organic, vine-unfurl · Honor reduced-motion · Ease in-out · ❌ Bouncy springs, simultaneous animations, urgency-creating motion

**Imagery:** Botanical watercolor / Mucha-style illustrated · Warm amber-green grade · ❌ Photorealistic CGI, cold photography, unframed imagery

**Icons:** 1.5–2px botanical outlined · Nature metaphors (leaf home, vine library) · ❌ Tech dashboard icons, heavy filled glyphs

**Copywriting:** Gracious, lyrical, unhurried · Botanical metaphors (bloom, tend, cultivate) · ❌ Tech jargon, urgency, excessive exclamation points
