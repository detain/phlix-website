# SITE.md — Celtic Twilight Phlix Site

## 1. Concept & Vision

Celtic Twilight dresses Phlix in the luminous hush of a stone circle at dusk — emerald greens, gold-leaf illumination, twilight purples, and the quiet cadence of ancient storytelling. Every page feels like an illuminated manuscript: warm vellum backgrounds, Cinzel headlines in ancient gold, and motion that rises like mist. The brand is mystical, reverent, folk-rooted, and deeply connected to the land and its stories.

## 2. Aesthetic Direction

**Archetype:** narrative-scroll — a scrolling illuminated manuscript, unhurried and ceremonial.

**Mood:** Pre-Raphaelite painterly depth, Book of Kells manuscript lineage, standing stone circles at dusk, lantern-gold against cool dusk purple.

**Visual style:** Watercolor/paper grain texture level, layered depth, warm crepuscular lighting, organic curves and Celtic spiral geometry.

## 3. Color Palette

| Role | Name | Hex | Usage |
|---|---|---|---|
| Primary | Emerald Grove | `#2D6A4F` | Primary CTAs, active states |
| Secondary | Twilight Amethyst | `#6B3FA0` | Secondary actions, hover highlights |
| Tertiary | Ancient Gold | `#B8860B` | Badge highlights, gold ornament accents |
| Background | Vellum | `#F4EDD8` | Default page background |
| Surface | Pale Mist | `#FAF7EE` | Card and panel surfaces |
| Surface Alt | Heather Wash | `#E8E0F0` | Alternate surfaces |
| Text | Ink Black | `#1A1208` | Primary body and headline text |
| Border | Peat Ink | `#2C2010` | Card borders, dividers |
| Focus | Gold Leaf Glow | `#C9980A` | Keyboard focus ring |
| Error | Rowan Berry | `#8B2020` | Errors, destructive actions |

**Seasonal variants:** Samhain (dark inverted), Imbolc (pale spring), Bealthane (deep summer green), Solstice (winter bonfire).

## 4. Typography

| Role | Family | Weights | Notes |
|---|---|---|---|
| Headline | Cinzel | 400, 700 | Hero headlines, section titles |
| Display | Cinzel Decorative | 400, 700 | Illuminated drop-caps, ceremonial headings |
| Body | EB Garamond | 400, 500, 600 | Paragraphs, long-form reading |
| UI | Nunito | 400, 600, 700 | Buttons, labels, navigation |
| Mono | DM Mono | 400, 500 | Code blocks, tokens |

`<strong>` weight: 600 (declared for EB Garamond; `eb-garamond-600-latin.woff2` in pool).

## 5. Spatial System

- Max content width: 1320px
- Spacing scale: 4, 8, 12, 16, 20, 24, 32, 48, 64, 96px
- Border radius: sm=4px, md=10px, lg=18px, xl=28px, pill=999px
- Border: 1.5px solid peat ink, hand-drawn feel

## 6. Motion Philosophy

- **Speed:** slow — animations are unhurried, meditative
- **Style:** mist rise, manuscript page turn, knotwork unfurl, slow cross-dissolve
- **Easing:** ease-in-out, cubic-bezier(0.4, 0, 0.2, 1)
- **Hero parallax:** lantern glow intensifies with scroll; pointer position creates gentle drift
- **Scroll reveals:** IntersectionObserver fade-in with 22px upward translate
- **Reduced motion:** all motion disabled, instant transitions
- **Mascot (Sídhe):** floating spiral drift + lantern pulse animation; easter eggs for hover-hold and typed-word "knotwork"

## 7. Visual Assets

- **logo.svg:** Cinzel wordmark in ancient gold on dusk gradient, knotwork corner ornaments
- **favicon.svg:** Emerald square with gold triskelion spiral ornament
- **og.svg/og.png:** Dusk gradient social card with wordmark and headline
- **Icons:** Hand-drawn outlined inline SVGs, 1.5–2px stroke, rounded caps, single-color (peat ink/emerald) or duotone
- **Hero illustration:** Pure CSS/SVG gradient diorama with lantern glow + standing stone silhouette

## 8. Navigation

**Labels:** The Hearth (Home), The Library (Features), The Vessels (Clients), Begin the Quest (Download), The Far Reach (Hub), The Elders Speak (About).

**Demoted to footer:** Plugins, Docs — not in primary nav, linked in footer only.

**Emphasis:** The Hearth, The Library, Begin the Quest = primary (bold, emerald color); others = default.

**Companion:** Sídhe — bottom-right on desktop (fixed), in-flow on mobile.

## 9. Homepage Sections (in order)

1. `the-threshold` — hero with diorama-parallax (lantern glow, stone silhouettes, visitor path fork)
2. `why-gather` — 7 pitch bullets as knotwork-framed tiles
3. `the-treasures` — 4 hero features as illuminated manuscript cards
4. `the-keepers` — proof strategy: spec numbers, GitHub link, quote from docs
5. `enter-the-circle` — conversion funnel CTA with install command

## 10. Accessibility Notes

- All text on vellum (#F4EDD8) background meets WCAG AA (4.5:1) or better
- Gold tertiary (#B8860B) used only for large text and decorative accents — never body copy
- Gold focus ring with 2px offset on all interactive elements
- prefers-reduced-motion: all animations disabled
- Touch targets minimum 44×44px
- All icons have aria-hidden="true" or descriptive alt

## 11. Performance Notes

- Fonts self-hosted WOFF2, subset to Latin, font-display:swap
- CSS gradient backgrounds (no image requests for hero)
- IntersectionObserver scroll reveals (no scroll event listeners)
- Mascot deferred below fold (defer attribute on script)
- No CDN dependencies
