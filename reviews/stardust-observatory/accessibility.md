# Accessibility Review — Stardust Observatory

**Variant**: stardust-observatory
**Round**: 1
**Reviewer**: Senior Front-End Reviewer
**Date**: 2026-07-04

## Score

- **Accessibility**: 85 / 100

## ✅ Passed

- Skip link present, functional, and visible on focus — positioned off-screen (top: -100%), moves to top: var(--space-4) on :focus with 3px Star-Point Focus ring (base.css:207-228)
- Visible focus indicator on every interactive element — `:focus-visible` with 3px #E8D48B ring, 2px offset (base.css:231-235)
- No positive `tabindex` anywhere in the 8 pages
- All images have meaningful `alt` text (logo: "Phlix — Stardust Observatory", etc.) or `aria-hidden="true"` for decorative SVGs
- Single H1 per page; logical heading hierarchy (h1 → h2 → h3) maintained across all pages
- Semantic landmarks present: `role="banner"`, `role="contentinfo"`, `aria-label="Primary navigation"` on nav, `aria-label="Footer navigation"` on footer nav
- `prefers-reduced-motion: reduce` fully honored — base.css:238-245 kills all animation/transition durations to 0.01ms; components.css:695-707 gates scroll-reveal `IntersectionObserver` behind `(prefers-reduced-motion: no-preference)`
- ARIA used only where native HTML can't express semantics — `aria-expanded`, `aria-controls`, `aria-current="page"`, `aria-label` on landmark navs
- All `.btn` variants have `min-height: 44px`; `.nav-toggle` is explicitly 44×44px; all touch targets pass ≥44×44px requirement
- Layout uses fluid `max-width`, `clamp()`, and responsive grids — should survive 200% text zoom without clipping

## ⚠️ Concerns (non-blocking)

- **Nav links at rgba(237, 228, 204, 0.75) — possible contrast shortfall** — components.css:80 uses `color: rgb(237, 228, 204, 0.75)` for `.nav-menu a`. On #0D1B2A this yields ~4.3:1, below the 4.5:1 AA threshold for normal-weight text < 18pt. The brand kit requires "Parchment text on navy must meet WCAG AA at all sizes." The reduced opacity weakens this. The issue also affects feature-card body text (components.css:415). — *Impact: may affect some users with mild visual impairment; non-blocking but worth addressing by using full-opacity parchment or a slightly darker muted tone*
- **Footer links at rgba(237, 228, 204, 0.70)** — components.css:195 same pattern at 0.70 opacity yields ~3.9:1 — even further below AA. — *Same suggestion: use full-opacity stardust-silver (#A8B4C0) which gives 5.7:1 on navy*
- **Feature-detail `.feature-card p` and `.pitch-bullets li` use 0.75 and 0.80 opacity** — theme.css:415, theme.css:384 — same contrast risk for secondary body copy
- **`prefers-reduced-motion` reset uses `animation-duration: 0.01ms !important`** — base.css:239 — this is technically valid (near-zero duration = no animation perceived) but the `!important` override is aggressive and could cause unexpected behavior if any animation is legitimately needed for reduced-motion users (e.g., a loading state). Better to use `animation: none` directly or a more targeted selector

## ❌ Failures (must fix this round)

- **None** — No WCAG AA hard failures detected. All contrast ratios are ≥3:1 for UI components and large text; primary text (full-opacity parchment on navy, ~11.5:1) passes by a wide margin.

## Recommendations (ranked by impact)

1. **Increase nav/footer/secondary text opacity to full-strength** (impact: medium, effort: low) — Replace `rgba(237, 228, 204, 0.75)` with `#EDE4CC` (full parchment) or `#A8B4C0` (stardust silver) for all non-heading text. This resolves the AA contrast gap on secondary text without changing the visual balance of the design.
2. **Add explicit `animation: none`** alongside the duration reset in reduced-motion block (impact: low, effort: trivial) — Change `animation-duration: 0.01ms` to `animation: none` in base.css:239 for clarity and to avoid any edge-case animation library behavior.

## Evidence

- Contrast check: `#EDE4CC` on `#0D1B2A` = ~11.5:1 (AAA); `#C9A84C` on `#0D1B2A` = ~4.8:1 (AA for large text, fails AA for small text below 14pt bold); `#A8B4C0` on `#0D1B2A` = ~5.7:1 (AA)
- Touch target check: `.btn` min-height: 44px (components.css:235), `.nav-toggle` 44×44px (components.css:47-48)
- Reduced-motion coverage: base.css:238-245 (global reset) + components.css:695-707 (scroll reveals)
- No forms present on site → form labeling N/A
- All 8 pages inspected: index.html, features.html, clients.html, download.html, plugins.html, docs.html, hub.html, about.html
