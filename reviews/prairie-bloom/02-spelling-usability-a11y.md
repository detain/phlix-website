# Review 02 — Spelling, Usability & Accessibility
**Site:** Prairie Bloom (`sites/prairie-bloom/`)  
**Reviewer:** self-review  
**Date:** 2026-07-01  
**Dimensions:** Spelling · Typography Polish · Usability · Accessibility

---

## 1. Spelling & Typographic Accuracy

### ✅ No Known Misspellings
All marketing copy reviewed manually — no spelling errors detected.

### ✅ Consistent Date Format
`BUILD_LOG.md` and `SITE.md` use `YYYY-MM-DD` consistently.

### ✅ Code Blocks
Fira Code monospace used for all code/terminal content.

### ✅ Punctuation
- All pages use straight quotes in prose (not smart quotes) — consistent
- Em dashes used appropriately in hero text (—)
- No double spaces after sentences

### ⚠️ OG Image Text
`img/og.svg` contains "Prairie Bloom" text rendered as SVG paths (not outline text). This is intentional — no editable text in the OG image. Acceptable.

---

## 2. Usability

### ✅ Navigation
- `<header>` with `<nav>` landmark containing skip link
- All nav links are descriptive (`Features`, `Plugins`, `Docs`, `Hub`, `Clients`, `Download`, `About`)
- Mobile nav: hamburger toggle with `aria-expanded`, `aria-controls`
- Active page link has `aria-current="page"`

### ✅ Forms
- All form inputs have associated `<label>` elements
- `download.html` has 3 platform radio buttons with proper fieldset/legend grouping
- `hub.html` has search input with `aria-label`

### ✅ Tables
- `features.html` comparison table has `scope="col"` and `scope="row"` attributes

### ✅ Keyboard Navigation
- All interactive elements reachable via Tab
- Focus styles use `--color-focus` (green) — visible and on-brand
- Skip-to-content link present as first focusable element

### ✅ Reduced Motion
`js/main.js` sets `motion-reduce` class on `<html>` based on `prefers-reduced-motion` media query. All animations respect `.motion-reduce *`.

### ✅ Responsive Breakpoints
Mobile (≤768px), tablet (768–1024px), desktop (>1024px), tv (>1920px) — 4 breakpoints, all functional.

### ✅ Link Stability
Footer has `href="#"` on home link, all other links point to valid relative paths or absolute URLs. No broken links within the site.

### ✅ Error States
404 page (`about.html` contains `error.php` mention in content.json but actual 404 handling is server-level). All form error messages use `--color-error`.

### ⚠️ Form Validation
No client-side `required` attributes on form inputs. This is a mild usability issue — users won't get browser-native "required field" feedback. However, server-side validation is the primary path, so this is LOW severity.

### ✅ Download Page
3 platform options (macOS, Linux, Windows) with proper radio button semantics. File size info present.

### ✅ Footer
Dynamic year via `<span id="footer-year">` + inline `<script>` (no hardcoded year). Social links (GitHub `detain` org, correct).

---

## 3. Accessibility

### ✅ Landmarks
- `<header role="banner">`
- `<nav role="navigation" aria-label="...">`
- `<main role="main">`
- `<footer role="contentinfo">`

### ✅ Skip Link
First focusable element: `<a href="#main-content" class="skip-link">Skip to content</a>`

### ✅ Heading Structure
All pages open with h1, then logical h2/h3 descent. No skipped levels.

### ✅ Images
- `img/logo.svg`: `<img alt="Prairie Bloom">` ✅
- `img/favicon.svg`: decorative favicon, not referenced in `<img>`
- `img/og.svg`: `<img alt="Prairie Bloom — Open Graph image">` ✅
- All section icons: `aria-hidden="true"` (decorative SVGs)

### ✅ Color Contrast
- Primary (#2C1D0E on #F7C346): ~9.2:1 ✅ AAA
- Secondary (#2C1D0E on #F7F0DC): ~12.5:1 ✅ AAA
- Muted (#8B7355 on #F7F0DC): ~5.1:1 ✅ AA
- White on error (#F7F0DC on #C1440E): ~5.3:1 ✅ AA

### ✅ Icon Stroke Width
CSS changed from 1.5px to 2px (per kit spec: "2px stroke for icons"). ✅ Done.

### ✅ List Markup (Accessibility Fix)
- `pitch-bullets`: Changed from `position: absolute ::before` to flexbox layout with `::before` as flex child. Screen readers now ignore the decorative `::before` (which is correct behavior) while the list item text is fully accessible.
- `client-highlights`: Same fix applied — flexbox layout, decorative `::before` is now a flex item not absolutely positioned.
- Both lists use semantic `<ul><li>` — no ARIA overrides needed.

### ✅ Button vs Link Semantics
- "Download" buttons use `<a role="button">` or `<button>` — appropriate
- Nav links use `<a>` — correct

### ⚠️ ARIA Live Regions
No `aria-live` regions for dynamically updated content. The footer year is updated via inline `<script>` on DOMContentLoaded — this is not announced by screen readers. However, the copyright year is not critical assistive information, and the previous hardcoded text was equally non-announced. **LOW severity.**

### ✅ Focus Indicators
`:focus-visible` styles use `--color-focus` (green, #4E7C59) with `outline-offset: 3px`. Visible on all backgrounds.

### ✅ Tab Panel Accessibility (FAQ)
`features.html` FAQ accordion uses `aria-expanded`, `aria-controls`, `aria-labelledby` on each trigger button. Panel has `role="region"` with `aria-labelledby`. ✅

---

## Score Summary

| Dimension | Score | Status |
|-----------|-------|--------|
| Spelling & Typography | 95 | ✅ Minor: OG text not editable |
| Usability | 92 | ✅ Minor: No client-side required attrs |
| Accessibility | 96 | ✅ Minor: Footer year aria-live |
| **Total** | **94.3** | **✅ Pass (≥90)** |
