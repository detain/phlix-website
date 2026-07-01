# Library Amber — Brand-Kit Site Design Document

## Concept & Vision

**Library Amber** is the visual identity of a private gentleman's library — floor-to-ceiling mahogany bookshelves, amber reading lamps casting pools of warm gold across herringbone parquet, Chesterfield leather chairs, and the settled knowledge that the room holds more wonders than any one evening could exhaust. Phlix inherits that ambition for the moving image: your media collection is not a backlog, it is a library, curated by taste and tended with care.

The site should feel like stepping into that room — warm, scholarly, quietly prestigious, never flashy. Every surface is crafted, not generated. The warmth comes from amber lamplight, not from fire or neon.

---

## Aesthetic Direction

**Archetype: Editorial / Sage** — asymmetric reading-room composition with strong vertical bookshelf rhythm, warm lamplight depth, and restrained brass accents that feel precious because they are rare.

**Visual style tags:** Old-world engraving with warm wash · Tooled leather texture overlays · Golden lamplight gradient grounds · Fine serif lettering and ligature details · Paper grain and engraving rendering.

**Art direction prose:** Deep mahogany and hunter-green grounds lit from within by amber lamplight. Compositions feel still and settled — no motion blur, no dynamic angles. Textures are tactile: the woven grain of fine paper, the embossed dimple of a leather binding, the cold weight of a brass fitting. Shadows are long, warm, and intentional. Highlights are amber gold, never white or cool.

---

## Color Palette

| Role            | Name              | Hex       | Usage                                            |
|-----------------|-------------------|-----------|--------------------------------------------------|
| Primary         | Amber Gold        | `#C8861A` | CTAs, active states, focus highlights            |
| Secondary       | Hunter Green      | `#2E5D3B` | Secondary actions, nav accents                    |
| Tertiary        | Burnished Brass  | `#A8792A` | Badges, decorative rules, icon accents            |
| Background      | Antique Cream    | `#F2E8D0` | Default page background — the vellum ground      |
| Surface         | Warm Vellum      | `#F8F1DF` | Card and panel surfaces                          |
| Surface Alt     | Aged Ivory       | `#E8D9B8` | Alternate surfaces, dividers                    |
| Text            | Mahogany Ink     | `#1C0F0A` | Primary body and headline text                    |
| Border          | Dark Mahogany    | `#2B1608` | Card edges, panel borders, rule lines             |
| Success         | Library Sage     | `#6B9E77` | Success toasts, confirmations                     |
| Warning         | Lamp Flame       | `#D4851A` | Warning states, caution banners                   |
| Error           | Wax Seal Red     | `#8B2315` | Errors, destructive actions                       |
| Info            | Ink Well Blue    | `#2A4A6B` | Informational banners                            |

### Gradients
- **Amber Lamp Glow** — `radial-gradient(ellipse, #C8861A, #7A4E10, #1C0F0A)` — hero backdrop radial glow
- **Mahogany to Cream** — `linear-gradient(180deg, #2B1608, #F2E8D0)` — section dividers and hero-to-content transitions
- **Brass Shimmer** — `linear-gradient(90deg, #A8792A, #C8861A, #E8B84B, #A8792A)` — decorative rule lines, badge borders

---

## Typography

| Role      | Font                  | Weight(s)  | Usage                                |
|-----------|-----------------------|------------|--------------------------------------|
| Headline  | Playfair Display      | 700, 900   | Page titles, hero headlines          |
| Display   | Cormorant Garamond    | 300, 400   | Oversized display text, pull quotes  |
| Body      | EB Garamond           | 400, 500   | Paragraphs, long-form reading        |
| UI        | Libre Baskerville     | 400, 700   | Buttons, labels, navigation          |
| Mono      | Courier Prime         | 400, 700   | Code, tokens, technical readouts     |
| Number    | Cormorant Garamond    | 600        | Stats, counters, dashboard figures   |

**Typography rules applied:** Old-style numerals preferred; body measure 60–70 chars; generous leading in body, tighter in display; Playfair Display for all headlines; EB Garamond for all body copy; no sans-serifs in the type hierarchy.

---

## Spacing System

Only these steps are used throughout: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96px`

---

## Motion Philosophy

**Style: Measured, Deliberate, Elegant, Unhurried.** Heavy things move slowly.

- **Transitions:** Cross-fade dissolve, slow scale from center, depth pull on scroll
- **Speed:** Slow (300–500ms for major transitions)
- **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)`, `ease-in-out`
- **Ambient animation:** Amber lamp glow pulse (4s ease-in-out infinite) on hero
- **Hover microinteraction:** Cards rise 3px + deepened mahogany shadow + faint brass highlight traces top edge over 200ms
- **Focus:** Amber gold 2px ring with 2px cream offset, 150ms fade-in

**Reduced motion:** All ambient animations collapse to instant fades via `prefers-reduced-motion: reduce`.

---

## Spatial System

Max content width: **1400px**, centered. Generous vertical rhythm (section padding `96px`). Negative space treated as mahogany panelling — purposeful and dignified.

---

## Visual Assets

### Logo
Playfair Display "Phlix" wordmark in amber gold, set inside a mahogany cartouche frame with brass corner ornaments and an open-book silhouette. The open book references the library theme without being literal.

### Favicon
Square mark: amber gold open-book on deep mahogany, brass border, Victorian engraving aesthetic.

### OG image (1200×630 SVG)
Deep mahogany background with amber radial lamp glow, herringbone texture, bookplate cartouche frame, Phlix wordmark + "Your Collection, Curated." tagline.

### Feature icons
7 inline SVGs — library, syncplay, transcode, shield, antenna, broadcast, puzzle. Fine-line outlined (1.5px stroke), amber gold color, slightly rounded ends, old-world engraving aesthetic.

### Signature decorative elements
- Brass shimmer rule dividers between major sections
- Mahogany sidebar as structural anchor
- Amber lamp glow radial in hero backdrop

---

## Responsive Behavior

| Breakpoint | Layout                                                    |
|------------|-----------------------------------------------------------|
| Desktop    | 240px mahogany sidebar + antique-cream content; multi-column poster grid; hover states active |
| Tablet     | Sidebar collapses to icon rail; 2–3 column grids; touch targets ≥48px; topbar on portrait |
| TV         | 10-foot UI: Playfair Display 48px+; 4px amber focus ring; D-pad-navigable; no hover dependency |
| Mobile     | Single column; mahogany bottom tab bar; full-width cards; sticky amber-gold play bar |

---

## Brand Opposites (anti-checklist)

The site must never feel:
- Neon or electric
- Playfully cartoonish
- Corporate-cold or minimalist-grey
- Futuristic or sci-fi
- Loud or maximalist-garish
- Pastel or saccharine
- Casual or disposable

---

## Seasonal Variants (documented, not applied)

The kit defines three seasonal variants (Winter Reading Season, Autumn Catalogue, Spring Collection Opening) with CSS custom property overrides. These are not applied by default but documented here for future implementation.

---

## Accessibility Commitments

- WCAG 2.2 AA minimum: 4.5:1 for body text, 3:1 for large text and UI components
- 2px amber-gold focus ring with 2px antique-cream offset, never hidden
- Minimum 48×48px touch targets on mobile/tablet; 56×56px on TV
- All ambient animations respect `prefers-reduced-motion`
- All layouts fully functional at 200% text zoom
