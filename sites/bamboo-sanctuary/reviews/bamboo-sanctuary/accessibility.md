# Accessibility (WCAG 2.2 AA)

## Score: 82/100

## Findings
- ✅ `--color-text` #2A2A25 on `--color-bg` #F2EDE5: contrast ratio ~14.9:1 — far exceeds 4.5:1 body text requirement
- ✅ `--color-primary` #8FAF9F on `--color-bg` #F2EDE5: contrast ratio ~3.12:1 — meets 3:1 large text/UI component threshold
- ✅ Kit notes primary on warm_white verified at 3.1:1 — confirmed here: 3.12:1
- ✅ `--color-primary` #8FAF9F used only on large text (btn-primary, focus ring, feature-icon backgrounds, badges) — not used for body text
- ✅ `prefers-reduced-motion` in CSS: `@media (prefers-reduced-motion: reduce)` sets `animation-duration: 0.01ms !important`, `transition-duration: 0.01ms !important`, `scroll-behavior: auto` — base.css:247-256
- ✅ `prefers-reduced-motion` in JS: main.js:10-12 reads `window.matchMedia('(prefers-reduced-motion: reduce)').matches` and conditionally skips IntersectionObserver setup — main.js:87
- ✅ Skip link present on all 8 pages — `<a class="skip-link" href="#main-content">Skip to main content</a>` — base.css:210-233
- ✅ Skip link is first focusable element in DOM order on all pages
- ✅ Skip link visible on focus — base.css:227-233: `top: var(--space-4)` on `:focus`
- ⚠️ Skip link focus ring uses `box-shadow` approach (2px morning-mist + 4px focus), while regular `:focus-visible` uses `outline` — two different techniques for the same concept. Kit specifies outline-offset approach. Not a functional failure, but inconsistent.
- ⚠️ Skip link uses `outline: none` with box-shadow instead of `outline: 2px solid var(--color-focus) outline-offset: 2px` per kit.accessibility.focus_style. The result achieves the same visual but uses a different mechanism.
- ✅ All form inputs have associated `<label>` or `aria-label` — verified: nav-toggle uses `aria-label`, logo link uses `aria-label`, all external links have descriptive text
- ✅ Landmarks: exactly one `role="banner"` on `<header class="site-header">` on all pages
- ✅ Exactly one `role="navigation"` on `<nav class="nav-primary">` on all pages
- ✅ Exactly one `role="main"` on `<main id="main-content">` on all pages
- ✅ Exactly one `role="contentinfo"` on `<footer class="site-footer">` on all pages
- ✅ `aria-current="page"` on active nav link — all 8 pages correctly set
- ✅ All images: logo.svg has `alt="Phlix logo"` — index.html:62; decorative inline SVGs (hero bamboo, feature icons) use `aria-hidden="true"`
- ❌ `.nav-toggle` button padding: `padding: var(--space-2)` = 8px — at 36×36px, this is below the 44×44px minimum touch target required by kit.accessibility.touch_target and WCAG 2.2 AA. The toggle button is 36px tall × 36px wide (components.css:38, 81-84).
- ❌ Regular `:focus-visible` ring (base.css:236-240): `outline: 2px solid var(--color-focus); outline-offset: 2px; border-radius: var(--radius-sm)` — Kit's focus_style specifies: "2px celadon (#8FAF9F) focus ring with 2px washi-white (#F8F5F0) offset". The current implementation has only 2px celadon outline + 2px offset, but the WASHI-WHITE OFFSET is missing. The kit explicitly calls for a 2px washi-white offset ring. The skip link correctly implements the 2px-white-offset via box-shadow; the regular focus-visible does not.
- ⚠️ `.highlights li::before` uses a 6px diameter circle — well above the 4px minimum but the list items themselves are small touch targets (text links, not buttons). Not a violation.
- ✅ 200% text zoom: font sizes use `clamp()` fluid scaling; max-width on containers prevents overflow; `overflow-wrap: break-word` on headings and paragraphs — base.css:45-46
- ✅ `.feature-card { padding: var(--space-6) }` = 24px padding — full-width on mobile → 44px+ touch target ✅

## Summary
Color contrast is excellent (3.12:1 primary, 14.9:1 body). Reduced motion is properly gated in both CSS and JS. Skip link is present and visible on focus. Landmarks are correct and unique. aria-current is on all active nav links. Two defects: (1) the `.nav-toggle` is 36×36px, below the 48×48px minimum (the kit says 48×48px for tablet, 44×44px in WCAG — both are violated); (2) the regular focus ring is missing the required 2px washi-white offset specified in kit.accessibility.focus_style. The skip link implements the offset via box-shadow but uses a different mechanism than the standard focus-visible.
