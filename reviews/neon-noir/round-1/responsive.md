# Responsive Review — Neon Noir

**Variant**: neon-noir
**Round**: 1
**Reviewer**: adversarial reviewer (claude-opus-5)
**Date**: 2026-07-25

## Score

- **Responsive**: 93 / 100

## ✅ Passed

- `node tools/render-check.mjs --site neon-noir --shots` → **PASS** across 9 pages × 4 viewports plus 200% text zoom. No horizontal scroll anywhere.
- Breakpoints are coherent and content-driven, not copied: 700px (2-up support/agent grids, 3-up ladder, 2-up evidence board, 2-col chapters), 768px (Lux becomes fixed), 900px (nav becomes a row), 960px (asymmetric 7fr/5fr opener, 6fr/5fr brief, 8fr/4fr clearance, 4-up support), 1200px (3-up evidence board).
- **Every layout grid uses `minmax(0, …)`**, so no track can be forced wider than its container by long content — this is the discipline that usually breaks at 320px and it is applied consistently (`css/theme.css:965-1035`, `css/components.css:668,773`).
- `overflow-wrap: anywhere` on `body` with a comment explaining precisely why `break-word` was insufficient (flex containers whose anonymous text item would not shrink below "ContentDirectory") — a real diagnosis of a real 200%-zoom failure, not a blanket guess (`css/base.css:243-248`).
- No fixed-px widths on any layout container; the only fixed dimensions are on intentionally fixed objects (logo 168×56, Lux figure 52–64px, node dots, toggle track, badge padding).
- Type scales with `clamp()` throughout; smallest body text is `0.8125rem` (13px) for typewriter asides and `0.9375rem` (15px) for card bodies — no 12px body copy on phones.
- Touch targets meet 44–48px at all widths (`.btn` 48, `.btn--sm` 44, nav links 48, toggle 48, summary 44, dismiss 44).
- `img { max-width: 100%; height: auto }` and `svg { max-width: 100% }` in the reset; the hero and 404 art are `viewBox` SVGs that scale fluidly.
- Card hover lift/glow is gated behind `@media (hover: hover)`, so touch devices get no stuck hover state — matching `responsive_behavior.mobile` "No hover states — use press animations".
- **§19.11 satisfied**: `.lux` is `position: fixed` only inside `@media (width >= 768px)`; below that the same element renders in flow above the footer (`css/components.css:837-847, 961-990`). At 320px it cannot overlap the primary CTA, and no content is duplicated to achieve this.
- Lux's tip panel opens **upward** when fixed (`bottom: calc(100% + …)`, `css/components.css:984-989`) so it cannot run off the bottom of the viewport, and `max-width: 15rem` keeps it clear of centre content.
- `.egg-note` is clamped to `max-width: min(22rem, calc(100vw - var(--space-8)))`, so it cannot overflow at 320px.
- `.btn { flex-wrap: wrap }` with a comment explaining that "Read the Case File (the docs)" would otherwise break mid-phrase at 320px — verified in `index-320x640.png`, where the label wraps cleanly onto two lines.
- `.code-block pre { white-space: pre-wrap; overflow: hidden }` so the install snippet wraps rather than forcing a scrollbar.

## ⚠️ Concerns (non-blocking)

- **`css/components.css:961-977`** — between 768px and 899px, Lux is `position: fixed` bottom-right *and* the hamburger nav is still in use. That is legal and passes §19.11 (which governs 320px), but on a 768px tablet in portrait the fixed companion sits over content for the whole scroll. Consider raising the `fixed` threshold to 960px, where the asymmetric grid opens up and there is genuine gutter space for it.
- **`css/theme.css:995-1000`** — `.opener { min-height: 78vh }` at ≥960px. On a short landscape laptop viewport (e.g. 1280×640) this pushes `#case-brief` fully below the fold; `svh`/`dvh` or a `max()` floor would be safer. Not observed as a failure in the captured viewports.
- **`css/theme.css:271`** — `.opener__art { min-height: 240px }` reserves space at 320px for art that is purely decorative and, at that width, adds a screenful before `#case-brief`. Consider collapsing or reducing it below 700px.

## ❌ Failures (must fix this round)

None.

## Recommendations (ranked by impact)

1. Raise the Lux `fixed` breakpoint from 768px to ~960px so tablets keep a clean reading column (impact: medium, effort: trivial).
2. Swap `78vh` for a `dvh`/`max()` expression on `.opener` (impact: low, effort: trivial).
3. Reduce `.opener__art { min-height }` below 700px (impact: low, effort: trivial).

## Evidence

- `node tools/render-check.mjs --site neon-noir --shots` → PASS; 45 screenshots in `reviews/neon-noir/shots/` (320×640, 320×700, 375×667, mobile, desktop per page).
- `reviews/neon-noir/shots/index-320x640.png` — CTA labels wrap cleanly; no clipping.
- `reviews/neon-noir/shots/clients-320x640.png`, `about-320x640.png` — the two pages the `overflow-wrap` comment names as previous 200%-zoom failures.
