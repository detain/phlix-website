# Accessibility Review — mid-century-modern

**Variant**: mid-century-modern
**Round**: 1
**Reviewer**: a11y-adversarial
**Date**: 2026-07-01

## Score

- **Accessibility**: 70 / 100

## ✅ Passed

- Single H1 per page, logical heading hierarchy — all 8 pages (index, about, features, download, clients, hub, plugins, docs)
- Semantic landmarks (`role="banner"`, `role="navigation"`, `role="main"`, `role="contentinfo"`) present and singular on every page
- Skip-link (`<a class="skip-link" href="#main-content">`) is the first focusable element in DOM; becomes visible on focus with correct color (teal bg, charcoal text, 2px yellow outline)
- `prefers-reduced-motion: reduce` honored two ways: CSS at-rule in `base.css:138-146` AND JS toggle in `main.js:36-43` (`.reduce-motion` class added to `<html>`); scroll-reveal animations are properly suppressed via `.reduce-motion .scroll-hidden` rule in `theme.css:431-435`
- No positive `tabindex` anywhere — only `tabindex="-1"` on `<main>` for programmatic focus
- All `<img>` elements carry meaningful alt text (logo: "Phlix logo"); decorative SVGs (`aria-hidden="true"`) throughout
- Atomic Teal `#00AFAF` on Charcoal `#111008` = **5.28:1** (PASSES ≥3:1 for UI components)
- Cream `#F5EFE8` on Charcoal `#111008` = **17.3:1** (PASSES ≥4.5:1 for normal text)
- Sunburst Yellow `#F2B705` on Charcoal `#111008` = **10.7:1** (PASSES ≥4.5:1)
- `status-stable` badge: Dark `#111008` text on `#00a878` success-green background = **4.88:1** (PASSES ≥4.5:1)
- Keyboard navigation: nav toggle correctly manages `aria-expanded`, Escape closes mobile menu, focus moves to toggle on close (`main.js:26-31`)
- Page titles descriptive and unique (e.g., "About — Phlix", "Features — Phlix")
- All external links have `rel="noopener noreferrer"`; link text is descriptive
- `aria-current="page"` correctly set on active nav link across all pages

## ⚠️ Concerns (non-blocking)

- **Focus ring outer halo color deviates from brand kit spec** — `base.css:180` uses `box-shadow: 0 0 0 4px rgb(0, 175, 175, 0.18)` (teal-tinted), but the kit spec calls for a charcoal outer halo. The teal-on-teal outer ring reduces the distinctiveness of the 3-layer focus indicator for users with low moderate vision. Per spec, it should be `box-shadow: 0 0 0 4px rgb(17, 16, 8, 0.18)`. Note: the teal focus ring itself at 5.28:1 on charcoal passes WCAG AA — this is a spec-conformance issue, not an accessibility failure. — **suggested next step**: change `base.css:180` outer halo from teal to charcoal at 18% opacity
- **Nav menu link touch target height may be insufficient** — `components.css:65` sets `padding: 12px 16px` on `.nav-menu a`. The computed height is approximately 24px line-height + 24px vertical padding = ~48px, which meets the 44×44px minimum. However, on mobile (≤900px) the nav links stretch full-width with reduced padding (`padding: var(--space-4) var(--gutter)` ≈ 16px 24px), potentially reducing the tap height. The `nav-toggle` button correctly uses `min-width: 48px; min-height: 48px`. — **suggested next step**: add explicit `min-height: 44px` to `.nav-menu a` in the mobile breakpoint

## ❌ Failures (must fix this round)

- **`components.css:76` — Nav menu link text contrast fails WCAG AA** — `.nav-menu a` has `opacity: 0.75`, reducing Cream `#F5EFE8` text (luminance 0.7801) to effective luminance ~0.585. On the Charcoal `#111008` nav background (luminance 0.0037) this yields a contrast ratio of **3.57:1**, below the required **4.5:1** for normal text. The 12px/0.75rem uppercase nav links do not meet the WCAG definition of "large text" (≥18.66px or bold ≥14pt), so the 3:1 large-text threshold does not apply. — **required outcome**: remove `opacity: 0.75` from `.nav-menu a` and instead set `color: var(--color-neutral)` (`#8c7b6a`) for the inactive/less-prominent state; keep `opacity: 1` and `color: var(--color-text)` for the default state

## Recommendations (ranked by impact)

1. **Fix nav link contrast** (impact: high, effort: low) — in `components.css:76` remove `opacity: 0.75` and change to `color: var(--color-neutral)`; keep active links at `color: var(--color-text)` with `opacity: 1`
2. **Fix focus ring outer halo** (impact: medium, effort: low) — in `base.css:180` change `rgb(0, 175, 175, 0.18)` to `rgb(17, 16, 8, 0.18)`
3. **Add explicit min-height to mobile nav links** (impact: medium, effort: low) — in `components.css:128-131` add `min-height: 44px` inside the `≤900px` media query for `.nav-menu a`

## Evidence

- WCAG relative luminance calculations (verified via manual computation):
  - Atomic Teal `#00AFAF`: luminance = 0.3050; Charcoal `#111008`: luminance = 0.0037; contrast = (0.3050+0.0037)/(0.0037+0.0037) = **5.28:1**
  - Cream `#F5EFE8`: luminance = 0.7801; Charcoal `#111008`: 0.0037; contrast = **17.3:1**
  - Sunburst Yellow `#F2B705`: luminance = 0.6376; Charcoal `#111008`: contrast = **10.7:1**
  - Nav link cream at 75% opacity effective luminance ≈ 0.7801 × 0.75 = 0.585; Charcoal: 0.0037; contrast = **3.57:1** (fails 4.5:1)
- Files reviewed: all 8 HTML pages, `css/base.css`, `css/theme.css`, `css/components.css`, `js/main.js`
- `grep -n "tabindex" sites/mid-century-modern/*.html` — only `tabindex="-1"` on `<main>`, no positive values
- `grep -n "prefers-reduced-motion" sites/mid-century-modern/` — found in `base.css:138` (CSS at-rule) and `main.js:36-43` (JS toggle)
- `grep -n "role=" sites/mid-century-modern/*.html` — all landmarks correctly attributed
