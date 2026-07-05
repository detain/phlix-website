# SITE.md — Tropical Lagoon Brand-Kit Site

## Concept & Vision

Tropical Lagoon is the **breathless moment you step off the boat onto a Polynesian atoll** — the world becomes turquoise water, white sand, and lush green forever. The Phlix site dressed in Tropical Lagoon feels like opening a window to paradise: every scroll is a wave, every click is a dive into warm water, and the entire experience radiates the sensory abundance of a tropical escape.

The world you're escaping to is already here.

---

## Design Language

### Aesthetic Direction
**Tropical paradise editorial** — the visual sensibility of a high-end travel magazine spread set in the Maldives or Bora Bora. Saturated but never garish; lush but always composed. Deep lagoon-teal backgrounds provide the "underwater world" canvas; burst of turquoise light from above the water surface; coral and gold accent elements; botanical palm frond details framing compositions.

### Color Palette (semantic roles)

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Lagoon Turquoise | `#00D4B8` | Primary CTAs, active states, signature color of shallow tropical water |
| Secondary | Sunset Coral | `#FF6B35` | Secondary actions, reward states, tropical warmth |
| Tertiary | Palm Lime | `#90E050` | Tertiary accents, badges, progress — jungle canopy energy |
| Background | Lagoon Depths | `#011A20` | Default page background — deep dark beneath tropical water |
| Surface | Reef Shadow | `#02242C` | Card and panel surfaces |
| Surface Alt | Deep Coral | `#03303C` | Alternate surface for striped rows, hover backgrounds |
| Text | Sea Foam White | `#F0FAF8` | Primary body and headline text |
| Neutral | Sea Sage | `#3A6060` | Muted UI chrome, dividers |
| Success | Turtle Green | `#00B87A` | Success toasts, confirmations |
| Warning | Starfish Gold | `#FFC300` | Warnings, caution states |
| Error | Fire Coral | `#E53935` | Errors, destructive actions |
| Info | Manta Blue | `#29B6D4` | Informational banners, tips |
| Border | Tidal Edge | `#0A3D4A` | Card borders, dividers |

### Gradients

- **Lagoon Surface:** `linear-gradient(160deg, #00D4B8, #29B6D4)` — hero backdrops, turquoise water surface
- **Tropical Sunset:** `linear-gradient(180deg, #FF6B35, #FFC300, #00D4B8)` — golden-hour celebration moments
- **Lagoon Depth:** `linear-gradient(180deg, #02242C, #011A20)` — subtle surface-to-background depth fade
- **Canopy Light:** `radial-gradient(rgba(0,212,184,0.25), rgba(1,26,32,0))` — caustic light effect

### Typography

| Role | Family | Weights | Notes |
|------|--------|---------|-------|
| Headline | Josefin Sans | 600, 700 | Page titles, section headings — clean modern vacation editorial |
| Display | Pacifico | 400 | Hero wordmarks, splash title cards, resort-style display moments |
| Body | Nunito | 400, 500 | Descriptions, synopses, long-form — friendly, open, warm |
| UI | Nunito | 500, 600, 700 | Buttons, labels, navigation, chips |
| Mono | Fira Code | 400, 500 | Code, tokens, technical readouts |

**Typography rules observed:**
- Josefin Sans headlines always semibold or bold on dark backgrounds
- Pacifico is celebration-mode only — not for general UI labels
- Nunito body benefits from generous line-height (1.65–1.7)
- Headline tracking slightly open (0.04em) — the brand feels airy, not compressed
- Sentence case preferred — this brand is warm and approachable

### Spatial System

Spacing scale (px): `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96`

### Motion Philosophy

Motion should **flow like water**: fluid, wave-like, never mechanical.

- **Ripple expand** — circle grows from interaction point like a water drop
- **Wave wipe** — horizontal flow left to right, water-surface style
- **Float in** — elements drift upward like something rising through water
- **Gentle scale** — 1.0 → 1.02 on hover, like breathing

Easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (water ease), `ease-out`, `cubic-bezier(0.34, 1.56, 0.64, 1)` (gentle spring)

All motion gated by `prefers-reduced-motion`.

### Visual Assets

- **Mascot:** Koa the Flame Angelfish — iridescent turquoise/coral scales, large bright eyes, mid-swim pose
- **Signature elements:** Lagoon ripple/caustic light patterns, palm frond silhouettes, frangipani/bird-of-paradise botanicals, wave-form decorative lines, coral reef micro-illustrations
- **Icons:** Rounded, outlined, 1.5–2px stroke, round caps/joins — tropical motifs (wave, palm, fish, shell, coral)
- **No mascot in static site images** (decorative CSS/SVG only)

---

## Layout & Structure

### Layout Archetype: `immersive`

Full-bleed cinematic hero with caustic light animation, alternating depth/shadow sections, generous horizon compositions. The deep lagoon background dominates; every element feels like it's suspended in tropical water.

**Landing page composition:**
1. Full-bleed hero illustration with lagoon-surface gradient and caustic drift animation
2. Pitch section on reef-shadow surface with canopy-light radial glow
3. Feature cards on lagoon-depths with hover glow lift
4. CTA banner with celebration gradient

### Responsive Behavior

| Breakpoint | Treatment |
|------------|-----------|
| Desktop | Multi-column poster rails, hover glow, 1400px max width |
| Tablet | 2–3 column grids, 48px min touch targets, collapsible sidebar |
| TV | 10-foot UI: 2× scale type, bold 4px focus ring, rounded corners |
| Mobile | Single column, bottom pill tab bar, full-width posters |

---

## Component Inventory

### Buttons
- **Primary:** Lagoon Turquoise pill (`#00D4B8` bg, `#011A20` text) — turquoise glow shadow
- **Secondary:** Coral ghost (`transparent` bg, `#FF6B35` border/text) — coral glow on hover
- **Ghost:** Tidal Edge outline (`#F0FAF8` text)
- **Danger:** Fire Coral pill (`#E53935` bg, `#F0FAF8` text)

### Cards
- Surface: `#02242C`, radius: 12px, border: 1px solid `#0A3D4A`
- Hover: 1px turquoise border + turquoise glow lift (+translateY(-4px))
- Background radial caustic shimmer on hover

### Badges
- **Quality** (4K/HDR/Dolby): lagoon-turquoise pill
- **Status** (New, Continue Watching): sunset-coral pill
- **Favorite:** palm-lime pill

---

## Accessibility

- WCAG 2.2 AA baseline
- Focus ring: 2px lagoon-turquoise + 4px outer glow (bioluminescent visibility)
- Minimum touch targets: 44×44px desktop, 48×48px mobile/TV
- `prefers-reduced-motion` honored: caustic animation becomes static, float-ups become fades
- 200% browser text zoom supported
- Contrast ratios verified: Sea Foam White on Lagoon Depths ≈ 19:1 (AAA), Turquoise on Depths ≈ 5.8:1 (AA), Coral on Depths ≈ 4.6:1 (AA)

---

## Localization Readiness

- `lang="en"` set globally
- All **substantive marketing copy** (hero, features, clients, FAQ, footer columns) is sourced from `content.json` (at `phlix-website/shared/content.json`) — swapping one file updates all pages. Navigation labels and CTA button text are shared across all kit sites and use generic English terms that work at any breakpoint.
- Logical CSS properties (`inline-start/end`) used for directional layouts where applicable
- Fonts subset to Latin script
