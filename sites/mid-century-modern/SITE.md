# SITE.md — Mid-Century Modern Brand Kit Site

## Concept & Vision

Mid-Century Modern Phlix channels the golden confidence of 1952–1968: TWA terminal optimism, Eames lounge chair warmth, and the clean geometry of a Saul Bass film poster. The site feels like settling into a perfectly proportioned lounge chair — immediate, confident, and quietly joyful. Every surface is warm walnut-dark, every accent is atomic teal or sunburst yellow, and every motion is mechanical and precise.

## Aesthetic Direction

- **Style**: Mid-century modern graphic design + Atomic age poster art + Saul Bass flat geometric
- **Mood**: Warm, optimistic, sophisticated, playful — never cold, ironic, or kitschy
- **Key references**: Eames lounge chairs, boomerang coffee tables, Sputnik chandeliers, sunburst clocks, TWA Flight Center, Saul Bass title sequences, California ranch clerestory light

## Color Table

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Atomic Teal | `#00AFAF` | Primary CTAs, active states, brand anchor |
| Secondary | Sunburst Yellow | `#F2B705` | Primary CTA buttons, key highlights |
| Tertiary | Atomic Coral | `#E8543C` | Badges, ratings, emphasis accents |
| Background | Charcoal Evening | `#111008` | Page backgrounds — very dark warm charcoal |
| Surface | Ebony Wood | `#1A1710` | Card and panel surfaces |
| Surface Alt | Dark Walnut | `#231F16` | Alternate surfaces, hover states |
| Text | Cream Card | `#F5EFE8` | Primary body and headline text |
| Neutral | Tan Linen | `#8C7B6A` | Muted UI chrome, dividers |
| Border | Warm Dim | `#2E2A1E` | Card borders, dividers |
| Success | Jade Teal | `#00A878` | Success toasts, confirmations |
| Warning | Harvest Gold | `#D4920A` | Warnings, caution states |
| Error | Brick Red | `#C0392B` | Errors, destructive actions |
| Focus | Focus Teal Pulse | `#00AFAF` | Keyboard focus ring |

**Gradients:**
- `Atomic Horizon`: `#00AFAF` → `#F2B705` at 145deg — hero backdrops
- `Sunburst Radial`: `rgba(242,183,5,0.30)` → transparent — sunburst ambient glow
- `Walnut Depth`: `#1A1710` → `#111008` at 180deg — surface-to-background fade

## Typography Roles

| Role | Family | Weight | Usage |
|------|--------|--------|-------|
| Headline | Josefin Sans | 600, 700 | Page titles, hero headlines |
| Display | Bebas Neue | 400 | Oversized display numerals, poster titles |
| Body | Libre Baskerville | 400, 700 | Descriptions, synopses, long-form |
| UI | Josefin Sans | 400, 500, 600 | Buttons, labels, navigation |
| Mono | IBM Plex Mono | 400, 600 | Code, tokens, technical readouts |
| Number | Bebas Neue | 400 | Stats, counters, runtimes |

**Rules applied:**
- Josefin Sans headlines use +0.04em tracking
- Bebas Neue display text is always uppercase
- Body copy (Libre Baskerville) must never be all-caps
- Line length kept to 60–75ch

## Spatial System

**Spacing scale (9 steps):** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 px

**Layout:**
- Max content width: 1400px
- Gutter: 24px (mobile: 16px)
- Section padding: 64–96px vertical
- Card padding: 24px

**Corner radius scale:**
- `--radius-sm`: 3px
- `--radius-md`: 6px (default for cards/buttons)
- `--radius-lg`: 12px
- `--radius-xl`: 20px
- `--radius-pill`: 999px

## Motion Philosophy

- **Style**: Mechanical, precise, confident, clean
- **Speed**: Medium (200–350ms)
- **Easing**: `cubic-bezier(0.4, 0.0, 0.2, 1)`, `ease-in-out`
- **Transitions**: Horizontal slide, iris wipe, starburst radial reveal, crisp cross-dissolve
- **Micro-interactions**: Cards lift with teal glow on hover (180ms); sunburst-yellow buttons compress 2% on press and spring back (120ms); focus ring fades in with teal halo (150ms)
- **Reduced motion**: All animations replace with opacity-only fades

## Visual Assets

| Asset | Path | Notes |
|-------|------|-------|
| Logo | `img/logo.svg` | Josefin Sans wordmark + atomic teal orbital ring on charcoal |
| Favicon | `img/favicon.svg` | Atomic teal orbital sunburst mark, 32×32 |
| OG image | `img/og.svg` | 1200×630 social share card with sunburst motif |
| Feature icons | Inline SVG in HTML | Single-color, stroke-based, 1.5px stroke, 6px radius joins |
| Hero backdrop | Inline SVG in index.html | Sunburst clock emblem, atomic horizon gradient, boomerang accent |

**Signature decorative elements used:**
- Sunburst / starburst radiating line motifs in hero backdrop and section dividers
- Atomic orbital ring decorations
- Thin rule lines in atomic teal
- Boomerang and kidney-curve accent shapes
- Walnut-grain-dark surfaces

## Layout Archetype

**Chosen: Editorial / Showcase**

The site follows a "showcase" layout archetype: full-bleed hero illustration (the SVG sunburst backdrop) → asymmetric feature grid → strong typographic CTA banner. The composition is bold and asymmetric but precisely balanced — single dominant geometric motif per section, generous warm-dark negative space, and a sunburst yellow CTA that commands attention.

## Component Inventory

- **Cards**: Ebony wood surface, 1px warm-dim border, 6px radius; hover: 1px teal border + teal-glow shadow
- **Buttons**: Primary (sunburst yellow on charcoal), Secondary (ghost teal), Danger (brick red), Ghost (warm-dim border)
- **Nav**: Ebony wood sticky top bar, 1px bottom border, teal active indicator
- **Footer**: Three-column grid, teal tagline, warm-dim dividers
- **Feature cards**: 8-up grid with teal SVG icons, hover lift
- **Client cards**: Name + status badge, tagline, highlights list, action button
- **Code blocks**: Ebony fill, teal monospace text, warm-dim border
- **FAQ**: Definition list with card-style items, teal hover border
- **Badges**: Status (stable=teal, beta=yellow), pill shape, 6px radius

## Accessibility

- WCAG 2.2 AA baseline
- Body text ≥ 4.5:1, large text/UI ≥ 3:1 (cream-card on charcoal = ~17:1; sunburst yellow on charcoal = ~10:1)
- 2px teal focus ring with 2px charcoal offset + 4px teal halo
- `prefers-reduced-motion` honored
- Touch targets ≥ 48×48px
- Layout survives 200% text zoom
