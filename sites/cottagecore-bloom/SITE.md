# SITE.md — Cottagecore Bloom brand kit site for Phlix

## Concept & Vision

Cottagecore Bloom is the warmth of a country kitchen window in late June — sunlight through hand-stitched curtains, a jam jar stuffed with foxgloves and sweet peas on the sill, the hum of a bumble bee in the lavender outside. The Phlix site dressed in Cottagecore Bloom feels like settling into a beloved armchair with a pot of tea and a story that never quite ends. Every page breathes like a garden: generous warm ivory space, soft botanical accents, and motion as gentle as petals falling.

## Aesthetic Direction

**Visual style:** English cottagecore, hand-painted botanical watercolour, Edwardian botanical illustration plate, Laura Ashley floral textile print, Beatrix Potter watercolour.

**Art direction:** Artwork should feel like a page from a beloved Edwardian botanical journal — warm ivory ground, soft watercolour washes of rose, sage, and lavender, loose and slightly imperfect linework. Compositions are lush and overflowing. Light is warm and diffused — golden hour filtered through garden foliage, never harsh or directional.

**Lighting:** Warm, soft diffused — golden afternoon light filtered through garden foliage. No harsh shadows. No cold tones. Highlights are warm cream; shadows are soft warm taupe, never cold grey or black.

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Garden Rose | `#C8556A` | Primary CTAs, active states — the warmest welcome |
| Secondary | Sage Green | `#7A9E6B` | Secondary actions, links, garden-fresh highlights |
| Tertiary | Lavender Mist | `#8B7AB5` | Badges, ratings, tertiary accents |
| Background | Warm Ivory | `#FFF8F2` | Default page background — warm cream like old linen |
| Surface | Garden Cream | `#FFF3E8` | Card and panel surfaces |
| Surface Alt | Butter Soft | `#FDEEDE` | Alternate surface, striped rows, hover tints |
| Text | Bark Brown | `#2A1A10` | Primary body and headline text |
| Neutral | Warm Taupe | `#B0A090` | Muted UI chrome, dividers, secondary text |
| Border | Petal Blush | `#E8D5C4` | Card borders, dividers |
| Success | Herb Green | `#4A7C59` | Success toasts, confirmations |
| Warning | Honey Gold | `#C47B2B` | Warnings, caution states |
| Error | Briar Red | `#B53040` | Errors, destructive actions |
| Info | Cornflower | `#5B7FC4` | Informational banners, tips |

**Gradients:**
- `Garden Path`: linear 145deg, `#C8556A` → `#8B7AB5` — hero backdrops, floral section breaks
- `Morning Light`: radial, `rgba(200,85,106,0.12)` → transparent — warm rose radial glow
- `Cream Fade`: linear 180deg, `#FFF3E8` → `#FFF8F2` — subtle surface-to-background fade

## Typography

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| Headline | Playfair Display | 700, 900 | Elegant editorial headlines, section titles |
| Display | Dancing Script | 700 | Flowing handwritten taglines, hero sub-headline |
| Body | Lora | 400, 500 | Descriptions, synopses, long-form reading |
| UI | Nunito | 400, 500, 600 | Buttons, labels, navigation, chips |
| Mono | Courier Prime | 400, 700 | Timestamps, technical metadata |
| Number | Playfair Display | 700 | Stats, watch counts, runtimes |

**Typography rules:**
- Playfair Display headlines should be bold (700+)
- Dancing Script is for display moments only — never body copy
- Body copy (Lora) should never be set smaller than 15px
- Use Courier Prime only for genuine technical data

## Spatial System

Spacing scale (px): `4, 8, 12, 16, 24, 32, 48, 64, 96`

Corner radius scale: `4px` (sm), `8px` (md), `16px` (lg), `24px` (xl), `999px` (pill)

Maximum content width: `1400px`

## Motion Philosophy

Motion should feel like petals falling or a breeze through tall grass — never urgent. Slow, soft, organic.

- **Entrance animations:** gentle upward drift (20px translateY, 500ms ease-out)
- **Hover transitions:** 250ms ease-out
- **Micro-interactions:** card hover = rose border + 2px lift + soft rose shadow; button press = scale 0.97
- **Loading:** Primrose the bumble bee drifting left-to-right (when sprite available)
- **Page transitions:** gentle cross-fade dissolve
- **Easing:** `ease-in-out`, `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- **Reduced motion:** honor `prefers-reduced-motion` — replace petal-fall with cross-fades

## Visual Assets

- **Logo:** Playfair Display italic wordmark in Bark Brown on Warm Ivory, paired with a climbing-rose sprig botanical motif in Garden Rose and Sage Green
- **Favicon:** Square mark in Garden Rose (#C8556A) with small rose petal motif
- **OG image:** Warm ivory background, botanical corner accents, wordmark + tagline, rose/hub CTA
- **Feature icons:** Inline SVG, outlined, 1.5px stroke, round caps, Bark Brown; Garden Rose for active states; small botanical accent (leaf/petal dot)
- **Mascot:** Primrose the bumble bee (soft watercolour style) — appears in loading/empty states when available
- **Hero motif:** Slowly drifting petal animation (rose, lavender, sage petals floating down through hero)

## Layout Archetype

**Immersive / Editorial** — the layout pattern for landing from the kit is "Full-bleed botanical illustration hero with Playfair Display headline and Dancing Script sub-tagline → garden-cream feature sections → rose CTA." The aesthetic is abundant, warm, generous, and slightly irregular — like a hand-arranged cottage garden rather than a grid-perfect corporate layout.

## Signature Elements

- Trailing climbing-rose border motifs on section headers
- Pressed-flower and leaf watercolour spot illustrations
- Bee and butterfly accent icons in soft botanical line
- Thinned hand-drawn botanical rule lines between sections
- Linen-texture paper grain on surface backgrounds
- Primrose the bumble bee in empty/loading states

## Do / Don't

**Do:**
- Use Warm Ivory or Garden Cream for every background — never cold white, never dark
- Apply Garden Rose exclusively to the primary CTA
- Keep accent color combinations to two per view (rose+sage, or lavender+sage)
- Warm all shadows with a Bark Brown tint — never cold grey
- Use slow, soft transitions (300–500ms) with organic easing
- Use botanical unfolding metaphors for entrance animations

**Don't:**
- Use dark, black, or cold backgrounds
- Scatter all three botanical accent colors together
- Use Garden Rose for secondary or tertiary UI elements
- Use sharp, snappy transitions — cottagecore is never frantic
- Show stark empty spaces — the aesthetic is always abundant
- Use corporate jargon, urgency, or FOMO language in copy
