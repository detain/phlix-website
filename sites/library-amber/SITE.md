# SITE.md — Library Amber Brand Kit Site

## Concept & Vision

Library Amber channels the atmosphere of a distinguished private gentleman's library — floor-to-ceiling mahogany bookshelves, amber reading lamps casting warm pools of gold across herringbone parquet, Chesterfield leather chairs, and the scent of old paper. The site feels like entering a room you never want to leave. Every element carries the weight and warmth of a curated, permanent collection.

## Aesthetic Direction

**Archetype:** editorial — the site reads like a well-typeset volume, not a startup landing page.

**Mood:** Scholarly, warm, quietly prestigious. Not flashy, not cold, not casual. The confidence of someone who has nothing to prove.

**Reference:** Victorian private library meets 21st-century media server. Think: The Reform Club reading room, a first-edition dust jacket, amber oil lamp glow.

## Color Palette (role → name → hex)

| Role | Name | Hex |
|---|---|---|
| Primary | Amber Gold | `#C8861A` |
| Secondary | Hunter Green | `#2E5D3B` |
| Tertiary | Burnished Brass | `#A8792A` |
| Background | Antique Cream | `#F2E8D0` |
| Surface | Warm Vellum | `#F8F1DF` |
| Surface Alt | Aged Ivory | `#E8D9B8` |
| Text | Mahogany Ink | `#1C0F0A` |
| Neutral | Rich Chocolate | `#5C3317` |
| Border | Dark Mahogany Line | `#2B1608` |
| Mahogany Dark | — | `#2B1608` |
| Error | Wax Seal Red | `#8B2315` |
| Success | Library Sage | `#6B9E77` |

**Contrast notes:** Amber gold (`#C8861A`) on antique cream (`#F2E8D0`) is only 2.50:1 — **fails WCAG AA for small text**. Small-text uses of primary on cream/surface use the safe variant `#8e5f12`. Primary on mahogany-dark passes 7.14:1 — used directly for UI on dark backgrounds.

## Typography

| Role | Font | Weights |
|---|---|---|
| Headline | Playfair Display | 700, 900 |
| Display | Cormorant Garamond | 300, 400, 600 |
| Body | EB Garamond | 400, 500 |
| UI | Libre Baskerville | 400, 700 |
| Mono | Courier Prime | 400, 700 |
| Number | Cormorant Garamond | 600 |

**Strong emphasis:** `<strong>` uses `font-weight: 500` AND `color: var(--color-neutral)` (Rich Chocolate, 4.53:1 on cream) — two channels because a single 100-unit step in EB Garamond is not perceptible at body size.

**No undeclared weights** — `eb-garamond-700` exists in the pool but is NOT declared by this kit and was not vendored.

## Spatial System

8-step scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96px. Max content width: 1400px.

**Reading width:** 60–70 characters (body text max-width: `70ch`).

## Motion Philosophy

Measured and deliberate — like turning a page in a leather-bound volume. No bouncy springs. Ambient lamp-glow pulse at 4s intervals. Scroll reveals with 500ms fade+lift. All motion collapses to instant under `prefers-reduced-motion` (including transitions, not just animations — per trap 3, §19).

## Visual Assets

- **logo.svg:** Playfair Display 'Phlix' wordmark in amber gold, optionally inside a cartouche frame
- **favicon.svg:** Square amber-gold mark on mahogany
- **og.svg / og.png:** Hero headline on mahogany background with amber lamp glow
- **Mascot:** The Librarian — scholarly great horned owl with amber spectacles, wing-back chair, brass lamp beside
- **Icons:** Fine-line outlined, 1.5px stroke, amber gold or mahogany ink, old-world engraving aesthetic
- **Decorative:** Brass shimmer gradient as section divider ornaments, herringbone pattern in hero

## Layout & Structure

- **Home:** Five editorial chapters — hero → two-paths feature showcase → brand story → provenance trust band → conversion funnel
- **Interior pages:** Page header (h1 + lead) → content grid → CTA banner
- **Nav:** Cream topbar with Playfair Display wordmark, Libre Baskerville small-caps links, amber gold active underline, brass bottom rule. Mobile: full-screen mahogany panel
- **Footer:** Mirror-nav index row → tagline → 3 content.json columns
- **Grid tracks:** Always `minmax(0, 1fr)` (not bare `1fr`) to prevent overflow at 320px / 200% zoom
- **Text wrapping:** `overflow-wrap: anywhere` on body text elements; `break-word` on headings

## Interaction Details

- **Mascot (The Librarian):** Fixed bottom-right; appears on Home, Features, Download after 1.2s; 5 click → bow animation; 2s hover-hold → section-specific tip; dismiss → localStorage. Below 768px: in-flow above footer. Disabled under reduced-motion.
- **Easter egg — logo-clicks:5:** Amber page flash on 5 rapid logo clicks (all pages)
- **Easter egg — typed-word:collection:** Typing "collection" anywhere highlights all instances in amber gradient; disabled in inputs; Esc clears
- **Seasonal activation:** JS date gate switches `data-season` attribute on `<html>`: winter 11-15..01-15, autumn 09-22..11-14, spring 03-20..05-31; activates `--color-bg` and `--color-primary` seasonal overrides
- **Hero parallax:** Scroll + pointer-driven lamp glow position shift; disabled under reduced-motion
- **FAQ accordion:** One open at a time, aria-expanded toggle, no JS dependency for basic reveal

## Component Inventory

- **Buttons:** Primary (amber gold), Secondary (hunter green), Danger (wax-seal red), Ghost (mahogany outline), Link (brass, underline on hover), FAB (amber pill). All ≥44px touch target, 2px amber focus ring with cream offset.
- **Cards:** Warm vellum surface, 1.5px mahogany border, generous padding (24px), hover lift with deepened shadow
- **Code blocks:** Mahogany background, vellum text, brass label tag, fade-in copy button
- **FAQ items:** Aged ivory background, 3px amber left border, question as accessible `<button>`, smooth expand
- **Badges:** Small-caps, 1.5px border, role-colored background tint — stable (green), beta (amber), deprecated (red)

## Technical Approach

Pure static HTML + CSS + vanilla JS. No framework, no build step, no CDN fonts. Self-hosted WOFF2 from the shared pool. CSS custom properties as design tokens. `defer`-loaded JS with passive event listeners. All 9 pages + CSS/JS/img/assets in `sites/library-amber/`.
