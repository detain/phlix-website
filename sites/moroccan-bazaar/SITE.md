# SITE.md — Moroccan Bazaar

## Concept & Vision

Moroccan Bazaar is a threshold between the ordinary world and one built by patient hands across centuries. The site feels like stepping through a carved cedar doorway into a Fes riad at dusk: deep warm darkness punctuated by lantern light, geometric tile shimmer, and the unhurried confidence of hand-crafted things. Every surface, shadow, and typographic choice honours the intelligence of craft.

## Aesthetic Direction

**Visual identity:** North African artisan craft, Islamic geometric precision, warm jewel-tone richness, lattice shadow chiaroscuro, hand-painted ceramic ornament.

**Art direction:** Warm dusk medina photography and illustration — honeyed lantern light through carved mashrabiya screens onto hand-set tile floors. Deep shadow punctuated by amber and copper. No cold blue light, no stark modernism, no empty white space.

**Mood:** Warm, ornate, inviting, crafted, rich, timeless. Not cold, clinical, minimal, or corporate.

## Layout Archetype: Immersive

Full-bleed hero with atmospheric lantern-glow gradient. Content sections alternate between deep midnight backgrounds and warm-dark card surfaces. Zellige geometric dividers separate sections. Dense information (clients, ecosystem) presented in warm-dark card grids. Every page begins in warm darkness — the medina is the frame.

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| `--color-primary` | Terracotta Ember | `#E8531A` | Primary CTAs, active states |
| `--color-secondary` | Moroccan Ceramic Indigo | `#1A4580` | Secondary actions, jewel accent |
| `--color-tertiary` | Hammered Copper | `#B87828` | Badges, highlights, hover states |
| `--color-bg` | Midnight Medina | `#140A04` | Default page background |
| `--color-surface` | Warm Dark Surface | `#200E06` | Card and panel surfaces |
| `--color-surface-alt` | Dark Brick Surface | `#2A1208` | Alternate surfaces, hover states |
| `--color-text` | Aged Parchment | `#F2E4CC` | Body and headline text |
| `--color-neutral` | Desert Stone | `#8C6A4A` | Muted UI chrome, dividers |
| `--color-border` | Dark Terracotta Border | `#3C2010` | Card borders, dividers |
| `--color-success` | Date Palm Green | `#2E7D4F` | Success toasts |
| `--color-warning` | Saffron Gold | `#D4920A` | Warning states |
| `--color-error` | Vermilion | `#CC1A1A` | Errors, destructive actions |
| `--color-info` | Fes Ceramic Blue | `#2A6A8C` | Informational banners |

**Gradients:**
- `Souk Sunset` (`--grad-souk-sunset`): 155° linear, `#E8531A` → `#B87828` — hero backdrops
- `Lantern Halo` (`--grad-lantern-halo`): radial, copper → transparent — hero lantern-glow
- `Medina Depth` (`--grad-medina-depth`): 180° linear, `#200E06` → `#140A04` — surface fade
- `Zellige Shimmer` (`--grad-zellige-shimmer`): 135° linear, `#1A4580` → `#B87828` — accent banners

**Color rules applied:**
- Backgrounds always midnight-medina or warm-dark-surface — never light
- At most two warm accent colors per view (terracotta + copper, or copper + indigo)
- Terracotta ember reserved exclusively for the primary CTA
- Never cold blue, electric neon, stark white, or cool gradients

## Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Display | Cinzel | 400, 700 | Section titles, numerals, uppercase |
| Headline | Cormorant Garamond | 600, 700 | Hero headlines, dramatic titles |
| Body | Lora | 400, 500 | Descriptions, long-form reading |
| UI | Nunito Sans | 400, 500, 600 | Buttons, labels, navigation |
| Mono | Fira Code | 400, 500 | Code, technical readouts |

**Typography rules applied:**
- Cormorant Garamond headlines are bold (600–700); never light
- Cinzel display text used in uppercase for inscriptional gravity
- Body copy (Lora) never set in all-caps; left-aligned for readability
- Headline tracking slightly tight (-0.01em)

## Spacing Scale

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 px`

Only these steps used in all margins, padding, and gaps.

## Motion Philosophy

**Style:** Unhurried, ornamental, warm, considered. Like a copper lantern swaying in a courtyard breeze.

- Default transition: `400ms cubic-bezier(0.35,0,0.15,1)` (warm deceleration)
- Hover lift: `250ms ease-out`
- Focus ring: `180ms ease-out` with copper outer glow

**Microinteractions:**
- Cards: 1px copper border glow + lift 4px on hover over 250ms
- Buttons: Terracotta pulse on press (lantern flame catching air)
- Focus: 2px terracotta ring + 4px copper outer glow
- Loading: Eight-pointed geometric star traces in hammered copper
- Reduced motion: `prefers-reduced-motion` respected; reveals become static; no animated hover lift

## Visual Assets

- **logo.svg** — Cormorant Garamond "Phlix" wordmark with Cinzel "Moroccan Bazaar" tagline, zellige eight-pointed star accent, copper gradient underline
- **favicon.svg** — 32×32 terracotta square with zellige star in aged parchment
- **og.svg** — 1200×630 social card with midnight-medina background, copper lantern glow, zellige watermark, brand wordmark and tagline
- **PROMPTS.md** — full prompt library for regenerating all raster assets
- **Inline SVG icons** — 7 feature icons (library, syncplay, transcode, shield, antenna, broadcast, puzzle, hub) in warm outlined geometric style, 1.5px stroke, hammered copper

## Signature Elements Used

- Zellige eight-pointed geometric star patterns (SVG dividers, logo, favicon)
- Mashrabiya lattice shadow overlays (hero radial gradient)
- Hammered copper glow on interactive elements (hover states, focus rings)
- Warm dark surfaces with terracotta top-edge accent on feature-detail cards
- Lantern-halo radial gradient behind hero content
- Unhurried warm cross-dissolve transitions

## Responsive Strategy

- **Desktop (1024+):** Multi-column poster grids, hover copper-glow affordances, full zellige borders, max-width 1400px
- **Tablet (768–1023):** 2–3 column grids, simplified zellige star dividers, reduced copper-glow intensity (−35%)
- **Mobile (<768):** Single column, bottom-aligned nav, full-width cards, no hover (press animations instead)
- All layouts survive 200% text zoom without clipping or horizontal scroll
