# SITE.md — Desert Horizon

## Concept & Vision

Desert Horizon is a brand identity rooted in the American Southwest at golden hour — terracotta adobe walls, saguaro silhouettes against a burning amber sky, turquoise Navajo patterns, and the unhurried warmth of a Sonoran evening. The site feels like stepping into a hand-painted WPA travel poster: wide open, hand-textured, and deeply warm. It is never slick, neon, or corporate; it is always grounded, authentic, and quietly confident.

## Layout Archetype: **Showcase**

The site follows the **showcase** archetype — hero-forward, wide horizontal panorama, low horizon lines, generous sky room, single strong silhouette focal points. Every section breathes like a mesa at dawn. The layout prioritizes visual impact and openness over density.

- **Hero:** Full-bleed mesa-dusk gradient with CSS/SVG desert landscape backdrop, sunset gradient overlay, Navajo-strip top border
- **Sections:** Generous vertical padding (96px), sandstone backgrounds, terracotta/turquoise accents
- **CTA banners:** Sunset gradient (golden-horizon) with top Navajo strip divider
- **Interior pages:** Adobe-dust page header with Navajo-strip bottom border

## Color Palette

| Token | Role | Hex | Usage |
|-------|------|-----|-------|
| `--color-primary` | Terracotta | `#C2542A` | Primary CTAs, key emphasis |
| `--color-secondary` | Mesa Turquoise | `#2A8C82` | Links, focus rings, interactive |
| `--color-tertiary` | Sunset Coral | `#E07050` | Peak accents, hero gradients |
| `--color-neutral` | Sage Green | `#7A8C68` | Muted chrome, dividers |
| `--color-bg` | Sandstone | `#F2E4C8` | Universal page background |
| `--color-surface` | Adobe Dust | `#FAF0DC` | Card/panel surfaces |
| `--color-surface-alt` | Sun-Bleached Clay | `#E8D6B4` | Alternate surfaces, striping |
| `--color-text` | Burnt Umber | `#2E1A0E` | Body/headline text |
| `--color-success` | Prickly Pear Green | `#8BC48A` | Success states |
| `--color-warning` | Ocotillo Amber | `#D4900A` | Warnings |
| `--color-error` | Cholla Red | `#A83220` | Errors, destructive |
| `--color-focus` | Turquoise Focus Ring | `#2A8C82` | Keyboard focus ring |
| `--color-border` | Canyon Outline | `#2E1A0E` | Card outlines, dividers |

**CSS Gradients:**
- `--gradient-golden-horizon`: `linear-gradient(160deg, #E07050, #C2542A, #8C3A18)` — hero backdrops, CTA banners
- `--gradient-mesa-dusk`: `linear-gradient(180deg, #F2B87A, #C2542A, #5C2E14)` — full-bleed hero sky zones
- `--gradient-turquoise-wash`: `radial-gradient(circle, rgba(42,140,130,0.15), rgba(42,140,130,0))` — subtle glow

## Typography Roles

| Role | Font | Fallback | Usage |
|------|------|----------|-------|
| **Headline** | Playfair Display | Rockwell, Georgia, serif | Hero headlines, section titles |
| **Display** | Arvo | Rockwell, Courier New, serif | Stat numbers, bold callouts |
| **Body** | Lora | Palatino, Georgia, serif | Paragraphs, descriptions |
| **UI** | Source Sans 3 | Open Sans, system-ui | Buttons, nav, labels |
| **Mono** | IBM Plex Mono | Courier New, monospace | Code blocks, file paths |

**Rules obeyed:**
- Slab-serif/serif for display and headline — no geometric sans in hero type
- Body line-length 60–72 characters
- Never use italic for headlines; weight contrast preferred
- Avoid pure ALL CAPS except on small UI labels

## Spatial System

Spacing scale (9 steps from kit): `4 8 12 16 24 32 48 64 96` px

Radius scale: `--radius-sm: 4px`, `--radius-md: 8px`, `--radius-lg: 16px`, `--radius-xl: 28px`, `--radius-pill: 999px`

## Motion Philosophy

Slow, deliberate, earthy. Motion should feel like watching the sun move across the desert — unhurried and inevitable.

- **Transitions:** Slow dissolve, mesa-wipe, dusty fade, gentle scale-up from center
- **Speed:** `slow` — base 300ms, slow 500ms, fast 150ms
- **Easing:** `ease-out`, `cubic-bezier(0.25, 0.8, 0.25, 1)`
- **Hover:** Cards shift up 3px with deepening warm umber shadow — "like picking up a piece of pottery"
- **Button press:** Subtle compress to 0.97 then smooth ease-out return, no bounce
- **Focus:** Turquoise focus ring blooms in over 150ms
- **Reduced motion:** All animations replace with simple opacity fades

## Visual Assets

### Logos & Icons
- `logo.svg`: Desert Horizon wordmark in Georgia/Rockwell serif, terracotta on sandstone, with saguaro silhouette badge
- `favicon.svg`: Terracotta square with sandstone saguaro mark
- Feature icons: Hand-drawn Southwest style, 2px umber stroke, slightly irregular, single-color default

### Art Direction
WPA-era travel poster: warm sandstone paper, earthy terracotta/turquoise color fields, bold linocut outlines with deliberate imperfection. Wide horizontal panoramas: low horizon lines, massive sky, single saguaro silhouettes. Texture always present — grit, grain, the ghost of woven linen. Light always from the west, golden, low.

### Navajo Pattern Accents
Geometric diamond/step borders as 4px horizontal strips in terracotta + turquoise + coral + umber — used as:
- Section top/bottom dividers on header, cta-banner, and feature-card elements
- Top border of the site-header
- Navajo strip motif throughout

### Mascot: Dusty
Dusty is an anthropomorphic saguaro cactus with two raised arms, a weathered leather hat, hand-woven blanket, and calm ink-dot eyes. A slow-talking, deeply knowledgeable guide. Used for empty states and greeting microcopy.

## Component Inventory

- **Buttons:** Terracotta primary, Turquoise secondary, Ghost (2px umber outline), Danger (Cholla Red), Link (Turquoise underline), Icon (circular adobe-dust), FAB (floating terracotta pill)
- **Cards:** Adobe-dust surface, 2px umber border, 8px radius, optional Navajo-strip top accent, hover lifts 3px with umber shadow deepening
- **Badges:** 4px radius, 2px umber outline — Ocotillo amber for quality, Turquoise for status, Terracotta for favorite
- **Forms:** Sandstone-filled, 2px umber border, 8px radius, Lora text, turquoise focus ring
- **Nav:** Sticky adobe-dust header, 4px Navajo-strip top border, turquoise active state pill
- **Footer:** Sandstone with Navajo-strip top border, sage text, 3-column nav

## Responsive Strategy

Per `responsive_behavior`:
- **Desktop:** Multi-column poster grids, hover lift affordances, Navajo-pattern dividers, max 1400px
- **Tablet:** 2–3 column grids, 48px min touch targets, collapsible turquoise sidebar icon rail
- **TV:** 10-foot UI: massive Arvo slab numerals, 4px umber focus rings, D-pad spatial nav
- **Mobile:** Single column, sandstone bottom tab bar with terracotta active icons, full-width cards

## Seasonal Variants (documented, not auto-applied)

Four seasonal overrides exist in the kit: Monsoon Season (07-01–09-15), Harvest Dusk (10-01–11-15), Winter Solstice (12-10–01-05), Spring Bloom (03-01–04-30). These are documented but not applied to the base site build.

## Accessibility Commitments

- WCAG 2.2 AA: 4.5:1 body text, 3:1 large text/UI
- 3px turquoise focus ring with 2px sandstone offset — always fully visible
- Minimum 44×44px touch targets (mobile: 48×48px)
- `prefers-reduced-motion`: all animations replace with opacity fades
- All layouts survive 200% browser text zoom without clipping
