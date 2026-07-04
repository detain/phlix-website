# Readability Review — Cosmic Horror

**Variant**: cosmic-horror
**Round**: 1 (adversarial)
**Reviewer**: adversarial-code-reviewer
**Date**: 2026-07-04

## Score

- **Readability**: 93 / 100

## ✅ Passed

- Line length controlled via `max-width: 640px` on hero subheadline (`theme.css:226`), pitch bullets grid auto-fit at `minmax(280px, 1fr)` (`theme.css:262-266`) — natural line wrapping
- Line height `1.7` on body text (kit `typography_rules: line_height: 1.7`) — excellent readability (`base.css:188`)
- Body font size `1rem` (16px) — never drops below 16px on mobile; responsive `clamp()` never goes below `2.25rem` for h1 on mobile (`theme.css:21`)
- Reading level appropriate for target audience (horror enthusiasts, scholars, developers) — formal, academic vocabulary, no unnecessary complexity
- No walls of text — content is broken into short paragraphs, bulleted lists, cards with clear visual separation
- Clear hierarchy: h1 → h2/h3 → body, confirmed on all 8 pages
- Contrast ratios all adequate (see Accessibility dimension) — no readability barriers from contrast
- Scannability: pitch bullets as a grid, feature cards as a grid, client cards as a grid — users can scan and skip
- `max-width: 1400px` with auto side margins — content never stretches too wide on large screens (`base.css:205`)
- Font family `Crimson Text` for body — designed for long-form reading, excellent at screen sizes

## ⚠️ Concerns (non-blocking)

- **Hero H1 is very long: "That Which Has Always Been Watching."** — At certain mobile widths with `clamp(2.25rem, 5vw, var(--text-6xl))`, the browser may wrap to 2-3 lines reducing visual impact. Acceptable trade-off for brand expression. — *impact: low*

## ❌ Failures (must fix this round)

None — no blocking issues in this dimension.

## Recommendations (ranked by impact)

1. Consider a `max-width` on the hero h1 to prevent extreme wrapping scenarios on intermediate viewport widths (impact: low, effort: low)

## Evidence

- `theme.css:226` — hero sub `max-width: 640px`
- `theme.css:262-266` — pitch bullets grid with `minmax(280px, 1fr)`
- `base.css:188` — `--leading-relaxed: 1.7`
- `theme.css:21` — h1 `clamp(2.25rem, 5vw, var(--text-6xl))` ensures minimum 2.25rem (~36px) at smallest viewport
