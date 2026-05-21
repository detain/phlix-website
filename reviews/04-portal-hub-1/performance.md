# Performance Review — variant `04-portal-hub-1` (Wave 1, Clean Tech Minimal)

**Reviewer:** CodeReviewer (Performance Dimension)  
**Date:** 2026-05-20  
**Variant:** `04-portal-hub-1`  
**Criteria:** Lighthouse perf ≥90 · `font-display: swap` on all web fonts · No render-blocking JS

---

## Summary

| Criterion | Status | Notes |
|---|---|---|
| Lighthouse perf ≥90 | ⚠️ Likely Pass | Static HTML + minimal CSS/JS, but 3 CSS files add overhead |
| `font-display: swap` | 🔴 Missing | `base.css` `@font-face` for Poppins lacks `font-display: swap` |
| Render-blocking JS | ✅ Pass | `<script>` is at `</body>`, no synchronous scripts in `<head>` |

**Overall: 1 failure, 1 concern, 1 pass.** The variant is lightweight but has one definite issue to fix.

---

## Findings

### 🔴 CRITICAL — `font-display: swap` missing on `@font-face`

**File:** `css/base.css` lines 4–9

The only `@font-face` declaration in the variant does not include `font-display: swap`. If Poppins is actually loaded (from a local file or any future CDN addition), the browser's default font-loading behavior (likely `font-display: block`) will cause a flash of invisible text (FOIT), hurting perceived performance and Lighthouse score.

**Fix:** Add `font-display: swap;` to the `@font-face` block.

**Note:** The design currently relies primarily on the system-font stack (`'Segoe UI', system-ui, sans-serif`) and falls back gracefully. The Poppins `@font-face` is a local-file reference that may not resolve in all environments. However, if a real Poppins font file is ever added (or served from a CDN), `font-display: swap` must be present.

---

### ⚠️ CONCERN — Three separate CSS files cause extra HTTP requests

**Files:** `css/base.css`, `css/theme.css`, `css/components.css`

Every HTML page loads three separate stylesheets. This means 3 sequential HTTP requests for CSS before the browser can render. For a Lighthouse ≥90 target, these should be combined into a single `styles.css` (or inlined for critical CSS on the homepage).

**Estimated impact:** ~50–150ms extra per CSS file on a typical connection, which could shave 2–5 points off a Lighthouse run under throttling.

**Fix (short term):** Concatenate the three files into one `css/styles.css` and load that instead.

---

### ✅ PASS — No render-blocking JavaScript

**File:** All HTML pages (`index.html`, `hub.html`, `download.html`, etc.)

The sole `<script>` tag is placed just before `</body>` — the browser parses HTML, paints the page, then fetches and executes `main.js`. There are no `<script>` tags in `<head>`, inline synchronous `<script>` blocks, or external scripts loaded blocking the critical path.

JS is deferred naturally by its placement.

---

### ✅ PASS — Performance-positive design choices

The variant makes several choices that help Lighthouse scoring:

1. **Inline SVGs** for all icons (logo, feature icons, arrows). No raster image requests, no lazy-loading complexity.
2. **CSS-only animations** using `transform` and `opacity` — GPU-accelerated, no JS animation loops.
3. **`prefers-reduced-motion`** respected in CSS (`components.css` lines 254–268) and JS (`main.js` line 87–88).
4. **System-font-first** stack — no expensive web-font downloads for the critical rendering path.
5. **Minimal DOM depth** — semantic HTML with shallow nesting.
6. **`-webkit-font-smoothing: antialiased`** applied to `body` (`base.css` line 103–104), avoiding blurry text penalty.
7. **`scroll-behavior: smooth`** on `html`, overridden to `auto` under `prefers-reduced-motion`.
8. **Skip link** present for accessibility, which also helps Lighthouse accessibility score.

---

### ✅ PASS — `main.js` is lean and non-blocking

**File:** `js/main.js` (127 lines)

- IIFE wrapper with `'use strict'`
- All event listeners attached after `DOMContentLoaded`
- IntersectionObserver used for scroll animations (not scroll event polling)
- No external dependencies or libraries

---

## Recommendations (Priority Order)

1. **Add `font-display: swap`** to the `@font-face` in `base.css` — one-line fix, eliminates FOIT risk.
2. **Consolidate the 3 CSS files** into 1 (`styles.css`) — reduces HTTP request round-trips.
3. **Consider critical CSS inlining** for the hero section on `index.html`.
4. **Add `<link rel="preload">`** for above-the-fold CSS if the files remain separate.

---

## Files Reviewed

| File | Lines | Issues |
|---|---|---|
| `css/base.css` | 235 | Missing `font-display: swap` on `@font-face` |
| `css/theme.css` | 749 | Clean, no issues |
| `css/components.css` | 268 | Clean, `prefers-reduced-motion` handled |
| `js/main.js` | 127 | Clean, non-blocking, lightweight |
| `index.html` | 306 | 3 CSS links, script at `</body>` |
| `hub.html` | 230 | Same pattern |
| `download.html` | 234 | Same pattern |
| All other HTML pages | — | Same pattern as above |
