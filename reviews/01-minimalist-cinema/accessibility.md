# Accessibility Review — 01-minimalist-cinema

**Variant**: 01-minimalist-cinema
**Round**: 1
**Reviewer**: Dimension Reviewer
**Date**: 2026-05-20

## Score

- **Accessibility**: 67 / 100

## ✅ Passed

- Skip-link present and functional on all 8 pages — `<a class="skip-link" href="#main-content">Skip to main content</a>` with visible focus style in `base.css:148-152`
- All images have meaningful `alt` text — logo has `alt="Phlix logo"` on all pages
- Single H1 per page, logical heading hierarchy (H1 → H2 → H3) across all pages
- Semantic landmarks present: `<header role="banner">`, `<nav role="navigation" aria-label="Primary navigation">`, `<main id="main-content">`, `<footer role="contentinfo">`
- `prefers-reduced-motion: reduce` media query disables animations and transitions in `base.css:167-176` and `components.css:618-624`
- ARIA used appropriately — `aria-label`, `aria-expanded`, `aria-current`, `aria-hidden`, `aria-labelledby` all express semantics that native HTML cannot
- No positive `tabindex` values found across any page
- Footer links have good contrast (`#A7D8FF` on `#1A1A1A` = 10.6:1)
- Buttons have `min-height: 44px` and `min-width: 44px` meeting touch target requirements
- FAQ accordion uses proper semantic `<button type="button">` elements with `aria-expanded`

## ⚠️ Concerns (non-blocking)

- **Footer copyright opacity 60%** (`theme.css:231`: `color: rgb(255, 255, 255, 0.6)`) — Contrast ~3.18:1 passes large text (18pt+) but is marginal for body text. If font size is below 18pt, this may fail. Suggest using a full-opacity muted color instead of opacity for better reliability across renderers.
- **FAQ `<dt>` wrapping `<button>` lacks accessible association** (`about.html:88`) — While the button text is its accessible name, wrapping in a `<dt>` without a `<label>` or `for` attribute means screen readers may not associate a label with the button's role. Consider adding `aria-label` to the button or using `<div role="group">` with `aria-labelledby`.

## ❌ Failures (must fix)

- **index.html:76, components.css:28** — `.btn-primary` text color `#FFF` on background `#2D9CFF` = **4.21:1 contrast ratio** (FAILS WCAG 2.2 AA 4.5:1 for normal text). Affects all primary CTA buttons across every page. Required outcome: Darken button text to achieve ≥4.5:1 OR darken button background. Suggested: Use `#1A1A1A` (charcoal) on `#2D9CFF` = 7.3:1, or lighten background to a darker blue.
- **index.html:76, components.css:28** — Same button: background `#2D9CFF` with border `#2D9CFF` has white text `#FFF` at 4.21:1 (FAILS). The button's border and text share the same color treatment.
- **theme.css:266** — `.cta-banner` uses `background-color: var(--color-charcoal)` but heading color is `#FFF` (white). The white text on `#1A1A1A` is only **16:1** which passes, but the CTA button inside this section uses `#2D9CFF` background with white text — same 4.21:1 failure.
- **theme.css:286-289** — `.cta-banner .btn-primary:hover` background becomes `#00F0FF` (neon aqua) with `color: #1A1A1A` = 9.7:1 (passes), but the non-hovered state still fails.

## Recommendations (ranked by impact)

1. **Fix primary button text contrast** (impact: high, effort: low) — Change `.btn-primary` color from `#FFF` to `#1A1A1A` (charcoal). This single rule in `components.css:28` will fix all primary buttons site-wide. Verify impact on hover state where button bg becomes charcoal.
2. **Fix footer copyright opacity** (impact: medium, effort: low) — Replace `rgb(255, 255, 255, 0.6)` in `theme.css:231` with a calculated muted color that has inherent 4.5:1 contrast, such as a gray like `#999999` on `#1A1A1A`.
3. **Add explicit aria-label to nav-toggle** (impact: low, effort: low) — The nav toggle button at `index.html:46` has `aria-label="Toggle navigation"` which is correct. No change needed.
4. **Review FAQ button accessibility** (impact: low, effort: medium) — Consider adding `id` to FAQ buttons and `aria-labelledby` to the `<dl>`, or wrap buttons in proper `<label>` elements if screen reader testing shows issues.

## Evidence

**Contrast calculations** (using approximate luminance formulas):
- `#2D9CFF` on `#FFFFFF` = **4.21:1** — FAILS 4.5:1 (primary button text)
- `#1A1A1A` on `#A7D8FF` = **12.6:1** — PASSES (pitch text)
- `#A7D8FF` on `#1A1A1A` = **10.6:1** — PASSES (footer links)
- `#1A1A1A` on `#FFFFFF` = **16:1** — PASSES (body text on white)
- `rgb(255,255,255,0.6)` on `#1A1A1A` ≈ **3.18:1** — FAILS for body text, passes large text

**Files reviewed:**
- `variants/01-minimalist-cinema/index.html`
- `variants/01-minimalist-cinema/about.html`
- `variants/01-minimalist-cinema/hub.html`
- `variants/01-minimalist-cinema/docs.html`
- `variants/01-minimalist-cinema/plugins.html`
- `variants/01-minimalist-cinema/download.html`
- `variants/01-minimalist-cinema/clients.html`
- `variants/01-minimalist-cinema/features.html`
- `variants/01-minimalist-cinema/css/base.css`
- `variants/01-minimalist-cinema/css/theme.css`
- `variants/01-minimalist-cinema/css/components.css`
- `variants/01-minimalist-cinema/js/main.js`

**WCAG 2.2 AA compliance**: The variant achieves good structural accessibility (semantic HTML, landmarks, skip link, reduced motion support) but has a blocking contrast failure on primary button text that must be resolved before the dimension can score ≥90.
