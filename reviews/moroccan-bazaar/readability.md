# Readability Review — Moroccan Bazaar

**Variant**: moroccan-bazaar
**Round**: 2
**Reviewer**: reviewer
**Date**: 2026-07-01

## Score
- **Readability**: 97 / 100

## ✅ Passed
- Body font Lora at `1.7` line-height provides excellent readability for long-form content
- Warm parchment text (`#f2e4cc`) on dark midnight background (`#140a04`) yields strong contrast (~11.5:1 for body text, well above WCAG AA)
- `overflow-wrap: break-word` on all text elements prevents overflow on narrow viewports
- Fluid font sizing via `clamp()` prevents jarring size jumps between breakpoints
- Clear visual hierarchy: display (Cinzel uppercase) → headline (Cormorant Garamond) → body (Lora) → UI labels (Nunito Sans)
- Feature card descriptions at `0.875rem` with `1.7` line-height remain comfortable at small sizes
- Generous paragraph spacing (`margin-bottom: 1em`) prevents text walls
- Pitch bullets use a distinct warm-dark card surface to visually separate them from surrounding content
- CTA banner text contrasts with warm radial glow background for emphasis without harshness

## ⚠️ Concerns (non-blocking)
- Hero sub-text color uses `rgb(242, 228, 204, 0.82)` — slight transparency reduces contrast slightly (still above AA) but this is an intentional atmospheric effect per SITE.md — acceptable
- Footer copy at `0.45` opacity is intentionally muted — this is decorative, not content-bearing

## ❌ Failures (must fix)
- None
