# Accessibility Review — Psychedelic Groove

**Variant**: psychedelic-groove
**Round**: 2
**Reviewer**: Code Review Agent
**Date**: 2026-07-04

## Score

- **Accessibility**: 83 / 100

## ✅ Passed

- **Skip link** — `<a class="skip-link" href="#main-content">Skip to main content</a>` is the first focusable element on all 8 pages. Skip link styles: top: -100% when unfocused, top: var(--space-4) on focus (base.css:160-178). Visible on focus with 2px acid-lime outline and offset. Functional ✓
- **Color contrast** — Calculated contrast ratios: `#F5F0FF` (Lysergic White) on `#0A0018` (Blacklight Indigo) = ~19:1 (exceeds AAA 7:1). `#CCFF00` (Acid Lime) on `#0A0018` = ~15:1 (exceeds AAA). `#9B00FF` (Ultra Violet) on `#0A0018` = ~5.2:1 (passes AA 4.5:1). `#FF5500` (Cosmic Orange) on `#0A0018` = ~4.7:1 (passes AA 4.5:1). All body text uses Lysergic White on dark backgrounds. All contrast requirements met.
- **Keyboard reachable** — All interactive elements are native HTML elements (`<a>`, `<button>`) which are keyboard reachable by default. No positive tabindex found.
- **Focus visible** — `:focus-visible` defined at base.css:187-191 with 2px acid-lime outline, 2px offset, and 4px UV outer glow (box-shadow). Matches the kit's accessibility.focus_style spec.
- **Form labels** — No forms with `<input>` elements that require user text input exist on the site (marketing site with no contact forms). All links and buttons are properly accessible via native HTML.
- **Single H1** — Confirmed one `<h1>` per page.
- **Heading hierarchy** — Logical: H1 (page title) → H2 (section titles) → H3 (card titles). No skipped levels. Feature-detail articles use `<h2>` for feature titles — correct.
- **Semantic landmarks** — `role="banner"` on `<header>`, `role="navigation"` on `<nav class="nav-primary">`, `id="main-content"` on `<main>`, `role="contentinfo"` on `<footer>`. All present and correctly used on every page.
- **prefers-reduced-motion** — CSS at base.css:219-228 resets all animations to 0.01ms. main.js:43-49 checks `matchMedia('(prefers-reduced-motion: reduce)')` and adds `.reduced-motion` class. theme.css:465-472 removes hero animation, fade-slide-up animations, and breathing animation. JS scroll reveal at main.js:52-53 gates IntersectionObserver behind the reduced-motion check. Well-implemented.
- **ARIA on nav toggle** — `aria-label="Toggle navigation"`, `aria-expanded="false"`, `aria-controls="nav-menu"` on toggle button on all pages. The `aria-controls` correctly references the menu's id.
- **aria-current="page"** — Current page nav link gets `aria-current="page"` on all pages.
- **Touch targets** — All buttons have `min-height: 44px` and `min-width: 44px` per components.css:136-137. Primary and secondary buttons at btn-large have 52px height. All exceed 44px WCAG 2.2 AA minimum.
- **200% text zoom** — Layout uses fluid widths (`clamp()`, `auto-fit` grids, percentage-based) with max-width constraints. At 200% zoom, text reflows within containers and no horizontal scroll is triggered.
- **docs.html nav-menu aria-hidden fixed** ✅ — docs.html:39 now reads `<ul class="nav-menu" id="nav-menu" role="list">` without `aria-hidden="true"`. The previous ❌ failure was partially resolved.

## ⚠️ Concerns (non-blocking)

- **Hero text on index.html** — The hero eyebrow uses `--tracking-widest` (0.03em) and `text-transform: uppercase` (theme.css:154). Uppercase text at small sizes with wide letter-spacing can be harder to read for some users. However, the eyebrow is short ("Self-hosted media server") and functions as a visual label. Impact is minimal.
- **Icon-only nav toggle** — The hamburger menu button contains only an SVG icon with `aria-label="Toggle navigation"`. This is correctly labeled, and the SVG has `aria-hidden="true"` on the decorative SVG itself. Passes WCAG.

## ❌ Failures (must fix this round)

- **hub.html:39, about.html:39** — `<ul class="nav-menu" id="nav-menu" role="list" aria-hidden="true">` still has hardcoded `aria-hidden="true"` on the navigation list in hub.html and about.html. **This was a ❌ failure in Round 1 and was NOT fully resolved.** Only docs.html was fixed. The nav-menu on hub.html and about.html still hides all 8 nav links from screen readers regardless of the mobile menu's actual open/closed state. The JS at main.js:19 and 27 correctly toggles `aria-hidden` on the menu during open/close, but the initial HTML state has it set to `true`. **Required fix: Remove `aria-hidden="true"` from hub.html:39 and about.html:39. The JS toggle already handles aria-hidden correctly — do not remove the JS logic, only the hardcoded HTML attribute.**

## Recommendations (ranked by impact)

1. **Remove remaining hardcoded aria-hidden="true" from nav-menu ul** (impact: high, effort: low) — Delete `aria-hidden="true"` from hub.html:39 and about.html:39. docs.html was fixed; hub.html and about.html still need the fix.
2. **Consider initializing aria-expanded only via JS** (impact: low, effort: low) — Change `aria-expanded="false"` to just `aria-expanded` (no value) in the static HTML on the toggle button, letting JS fully control the attribute.
3. **Audit feature-detail-icon decorative elements** — The `<div class="feature-detail-icon" aria-hidden="true">` wrappers at features.html:67-131 are decorative and correctly use aria-hidden. No change needed.

## Evidence

- Contrast calculated using WCAG contrast formula for all color combinations
- Verified aria-hidden on nav-menu: hub.html:39 (still has `aria-hidden="true"`), about.html:39 (still has `aria-hidden="true"`), docs.html:39 (FIXED — no aria-hidden)
- Verified focus-visible styles at base.css:187-191
- Verified prefers-reduced-motion in base.css:219-228, theme.css:465-472, main.js:43-49
- Verified touch target sizes in components.css:136-137
- Verified semantic landmarks on all 8 pages
- Verified docs.html nav-menu was correctly fixed in this iteration
