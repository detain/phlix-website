# Responsive Review — Cottagecore Bloom

**Variant**: cottagecore-bloom
**Round**: 1
**Reviewer**: adversarial reviewer (Claude Opus 5)
**Date**: 2026-07-25

## Score

- **Responsive**: 80 / 100

## ✅ Passed

- **No horizontal overflow at any probed width.** `scrollWidth === clientWidth` at
  375, 768 and 1280 measured directly, and `render-check` clears 320×640, 320×700,
  375×667, desktop and the 200 % zoom reflow pass on all ten pages.
- **The two 200 %-zoom traps are correctly and durably fixed**, and the reasoning
  in `BUILD_LOG.md` is right on both counts:
  `.visually-hidden` carries `overflow: hidden` (`base.css:337-347`) because
  `clip-path: inset(50%)` alone does not stop a `nowrap` heading contributing to
  `scrollWidth`; and `overflow-wrap: anywhere` (`base.css:55-69`) is used rather
  than `break-word` because only `anywhere` lowers min-content, which is what makes
  a grid track refuse to shrink. `min-width: 0` is also applied to every grid/flex
  child that could carry a long token (`components.css:683-691`).
- **Every grid uses `repeat(auto-fit, minmax(min(Nrem, 100%), 1fr))`** — the
  `min(…, 100%)` guard means no track can ever exceed the viewport. Consistent
  across `.path-list`, `.catalog-plates`, `.catalog-rows`, `.room-strip`,
  `.placard`, `.client-cards`, `.download-cards`, `.bookshelf`, `.season-grid`,
  `.content-grid`, `.footer-nav`.
- **Spacing tokens are in px, not rem** (`base.css:122-132`), with an explicit
  comment explaining why: a 200 % text zoom cannot multiply structural gutters
  into overflow. Correct trade-off for a reflow gate.
- Touch targets meet the kit's `touch_target` rule: 48px on `.btn`,
  `.nav-toggle`, `.path-card`; 44px on `.nav-sigil`, `.nav-menu a`,
  `.footer-mirror a`, `.footer-col a`, `.calm-toggle`, `.mascot-dismiss`,
  `.plant-label > summary`, `.mascot-bee`. Nothing under 44.
- Body text is 17px on phones (`base.css:181`) — comfortably above the 12px floor
  and above the kit's own "never below 15px" rule for Lora.
- The mobile menu collapse uses `display: none` rather than a zero-height clipper
  (`components.css:198-208`), so a collapsed menu is unambiguously hidden to
  layout probes and to AT, and the active-page indicator switches from an
  underline+dot to a 3px left border (`:219-226`) which is the right idiom for a
  vertical list.
- The `1400px` max-width cap is honoured (`base.css:153`), and gutters step up at
  `48rem` (`theme.css:28-32`).
- Fluid type via `clamp()` throughout, with sensible floors — the hero h1 is
  `clamp(1.9rem, 5.4vw, 4rem)`, so it never gets illegibly small or absurdly
  large.
- `img` / `svg` are `display: block; max-width: 100%` in the reset
  (`base.css:33-40`); the seasonal motifs carry explicit `width`/`height` and
  `loading="lazy"`.

## ⚠️ Concerns (non-blocking)

- **The hero illustration effectively vanishes on phones, and the hero is 81 %
  empty at 375px.** `theme.css:168-182` gives `.hero-plane { height: 100% }` but
  the inner `svg` is `inset-block-end: 0; width: 100%; height: auto`, so each
  plane's rendered height is width ÷ aspect ratio and all five are pinned to the
  bottom edge. Measured:

  | viewport | `.hero` height | tallest plane svg | hero with no illustration |
  | --- | --- | --- | --- |
  | 375 × 667 | 1109 px | 210 px (sky) | **899 px — 81 %** |
  | 768 × 1024 | 1067 px | 430 px | 637 px — 60 % |
  | 1280 × 900 | 1138 px | 717 px | 421 px — 37 % |

  On a phone a visitor scrolls through ~900px of bare ivory before any garden
  appears, and what appears is a 105–210px strip *underneath* the visitor-paths
  cards. `hero_experience.fallback` promises "a single, hand-painted cottage
  garden watercolour with the gate already open"; the mobile reality is text on a
  blank field (`scratchpad/hero-m375.png`). Give the planes a `min-height`, or
  carry the botanical motif up the sides, so the composition survives a tall
  narrow hero.
- **At 768px the entire right half of the hero is empty.** `.hero-copy` is capped
  at `46ch` (`theme.css:238-240`) but `.hero-inner`'s `max-width: 62%` only
  applies from `62rem` (`theme.css:230-236`), so between roughly 620px and 992px
  the copy occupies the left ~420px of a 704px container and nothing occupies the
  rest (`scratchpad/vp-t768.png`). Either bring the `62%` rule down or let the
  copy use the width.
- **The `.hero-plane svg` aspect ratios differ per plane** (1200×600, 1200×400,
  1200×520, 1200×300), so the five planes' heights diverge as the viewport
  narrows — sky 210px vs flowers 105px at 375px. The parallax depths were tuned
  for the desktop proportions; at phone widths the "layered depth" the kit asks
  for collapses into a single band.

## ❌ Failures (must fix this round)

- **`css/components.css:1088-1101` — the 720–899px band puts the fixed companion
  on top of an interactive control.** `.mascot` becomes `position: fixed` at
  `width >= 45rem` (720px), but the nav does not un-collapse until `56.25rem`
  (900px, `components.css:193`), and at these widths the `visitor_paths` grid
  still spans the full container. Measured at 768×1024: the
  `.mascot-dismiss` button and the `.mascot-bee` button overlay the right-hand
  portion of the "I host movie nights" `.path-card`, and **7 of 18 hit-test points
  inside that card resolve to `button.mascot-dismiss`**. At 860px the same happens
  to the third card (5/18). Clean at ≥900px; correctly hidden below 720px.

  This is precisely the class of defect §19.11 exists to prevent — it escapes the
  gate only because §19.11 and `render-check` both name the *primary CTA*, and
  `render-check`'s viewport list (320×640, 320×700, 375×667, desktop) contains no
  tablet width at all.

  **Required outcome**: change the media query to `@media (width >= 56.25rem)` so
  the companion and the collapsed-nav band no longer coexist, and confirm with a
  hit-test at 768px and 860px that every `.path-card` is hittable across its
  whole box.

## Recommendations (ranked by impact)

1. `@media (width >= 56.25rem)` for `.mascot:not([hidden])` (impact: high, effort: low).
2. Give `.hero-plane` a `min-height` (e.g. `min(60vh, 420px)`) or add side motifs so the hero is illustrated on phones (impact: high, effort: medium).
3. Move `.hero-inner { max-width: 62% }` down to ~`48rem`, or widen `.hero-copy`, so 620–992px is not half empty (impact: medium, effort: low).
4. Add 768px and 860px to the local pre-flight viewport list (impact: medium, effort: low).

## Evidence

- `node tools/render-check.mjs --site cottagecore-bloom --shots` → PASS
  (10 pages × 4 viewports + 200 % zoom reflow).
- Direct measurement of `.hero`, `.hero-diorama`, `.hero-plane svg`, `.paths`,
  `.mascot`, `.mascot-bubble` and `.hero-actions .btn-primary` at 375 / 768 / 1280
  (`scratchpad/probe.mjs`, `probe2.mjs`).
- 57-point grid hit-test per path card at 768px (`scratchpad/probe3.mjs`);
  10-viewport × 4-page blocking sweep (`scratchpad/sweep.mjs`).
- `scratchpad/hero-m375.png`, `scratchpad/vp-t768.png`,
  `reviews/cottagecore-bloom/shots/index-320x640.png`.
