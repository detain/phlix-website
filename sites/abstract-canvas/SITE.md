# SITE.md — Abstract Canvas for Phlix

## Concept & Vision

Abstract Canvas dresses Phlix in the contemplative energy of a painter's studio at golden hour — linseed oil and primed linen, cadmium red and ultramarine pigments, the reverence of a MoMA gallery wall. Every screen is a canvas; every choice is a brushstroke. The site should feel like stepping into a gallery exhibition about media, not a SaaS marketing page. Warm, intentional, and quietly electric with creative possibility.

---

## Aesthetic Direction

**Layout archetype: Immersive** — full-bleed hero with Rothko-inspired color field gradient, generous breathing room, asymmetric compositions, gallery-grid rhythm for content sections.

The Abstract Canvas identity draws from Mark Rothko's luminous color field paintings, Jackson Pollock's gestural drip work, and the white-cube gallery aesthetic. The warm gallery-linen ground (#F0EDE4) carries carbon-black type and cadmium-red accents like pigments on a primed canvas. No cold whites, no clinical surfaces — every element feels handmade and intentional.

---

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Background | Gallery Linen | `#F0EDE4` | Default page background |
| Surface | Canvas Cream | `#E8E4D8` | Card and panel surfaces |
| Surface Alt | Aged Ground | `#DDD8C8` | Hover states, alternate panels |
| Primary | Carbon Black | `#1A1A1A` | Primary CTAs, headlines |
| Secondary | Cadmium Red | `#CC2200` | Single most important accent |
| Tertiary | Ultramarine | `#0055AA` | Structural depth, focus rings |
| Text | Paint Ink | `#141210` | Body and headline text |
| Neutral | Raw Umber | `#8A8070` | Secondary UI, captions |
| Border | Sizing Ground | `#C8C2B0` | Card borders, dividers |
| Success | Viridian | `#1A7A4A` | Confirmations |
| Warning | Yellow Ochre | `#C8900A` | Caution states |
| Error | Alizarin | `#B8001C` | Destructive actions |
| Info | Cerulean | `#1A6BA8` | Informational banners |

### Gradients

- **Color Field Dusk** (hero backdrop): `linear-gradient(170deg, #CC2200, #0055AA)`
- **Studio Light** (hero glow): `radial-gradient(rgba(240,237,228,1.0), rgba(221,216,200,0.0))`
- **Canvas Depth** (surface transitions): `linear-gradient(180deg, #E8E4D8, #DDD8C8)`

---

## Typography

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| Headline | Cormorant Garamond | 600, 700 | Dramatic page titles, hero headlines |
| Display | Bebas Neue | 400 | Oversized numerals, title cards |
| Body | Lora | 400, 500 | Descriptions, long-form reading |
| UI | Inter | 400, 500, 600 | Buttons, labels, navigation |
| Mono | JetBrains Mono | 400, 500 | Code, technical readouts |

**Typography rules from kit:**
- Cormorant Garamond headlines must be semibold (600+); never light weight on linen.
- Bebas Neue display type is always uppercase.
- Body copy (Lora) must never be set in all-caps.
- Left-align body copy for readability; centered blocks only for short display phrases.
- Cormorant Garamond italic for captions and fine-print asides.

---

## Spacing System (from kit spacing_scale)

`4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96` px — only these steps are used for margins, padding, and gaps.

---

## Motion Philosophy

Motion should feel **organic and imperfect** — like paint spreading across canvas, not pixels snapping into place.

- **Speed:** Medium (250–450ms transitions)
- **Easing:** `cubic-bezier(0.25, 0.1, 0.25, 1.0)` — organic ease, nothing springy or bouncy
- **Hero reveal:** Color-field sweep (saturated rectangle expands then dissolves)
- **Card hover:** 2px cadmium-red top border + 2px lift with umber soft shadow (250ms)
- **Button press:** Yields 1px downward like pressing a brush into wet paint (180ms)
- **Loading:** Gestural brushstroke sweeps left-to-right in cadmium red at 30% opacity
- **Reduced motion:** All replaced with cross-fades; no bouncing or sliding

---

## Visual Assets

### Logo
- Wordmark: "Phlix" in Cormorant-inspired serif on gallery linen
- Accent: gestural cadmium-red brushstroke mark
- Simple, high-contrast, reads at all sizes
- Readable on gallery linen at all sizes

### Feature Icons
- Outlined editorial style, 1.5–2px stroke weight
- Slightly rounded caps/joins (4–6px radius) — like a fine sable brush line
- Carbon black default; cadmium red for active/featured state
- Inline SVG, no CDN dependency

### OG Image
- 1200×630: gallery linen background with Rothko-inspired color field gradient
- "Phlix" wordmark + "Every Frame Is a Brushstroke." tagline
- Full brand palette: cadmium red, ultramarine, carbon black on warm linen

### Signature Elements (from kit)
- Gestural brushstroke marks as decorative dividers
- Paint-streak texture overlays on card surfaces
- Color field rectangular blocks (Rothko-inspired) as section accents
- Linen canvas grain texture on backgrounds

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Desktop (1024+) | Multi-column poster rails, hover cadmium-red border affordances, editorial sidebar, max 1400px content width |
| Tablet (768–1023) | 2–3 column grids, enlarged touch targets (48px min), collapsible sidebar to icon rail |
| TV (1280+) | 10-foot UI: Bebas Neue at 2× scale, bold 4px cadmium-red focus ring, D-pad navigation |
| Mobile (<768) | Single column, bottom nav, full-width portrait posters, sticky carbon-black play bar, touch-optimized |

---

## Accessibility Commitments

- **Focus style:** 2px ultramarine ring with 2px linen offset + 4px outer umber halo
- **Touch targets:** 48×48px on mobile and TV; 44×44px on desktop
- **Motion:** Honor `prefers-reduced-motion: reduce` — replace gestural loaders with static shimmer; retain only opacity-based animations
- **Font scaling:** All layouts survive 200% browser text zoom without clipping
- **Contrast:** Paint Ink on Gallery Linen = ~18:1 (AAA); Carbon Black on Gallery Linen = ~16.8:1 (AAA); Cadmium Red on Gallery Linen = ~5.8:1 (AA)
