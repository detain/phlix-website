# Localization Review — Variant 03-retro-film-reel

**Reviewer:** Dimension Reviewer
**Dimension:** Localization
**Date:** 2026-05-20
**Score:** 60/100

---

## Summary

The variant demonstrates good foundational localization practices with proper `<html lang>` attributes and safe JavaScript handling, but suffers from a critical lack of externalized strings and incomplete font infrastructure. RTL readiness is partially addressed through CSS logical properties but not actively tested.

---

## Rubric Checklist

| Criterion | Status |
|----------|--------|
| `<html lang>` present | ✅ PASS |
| No locale-unsafe `toLocaleString()` | ✅ PASS |
| Strings from `content.json` | ❌ FAIL |
| RTL safety | ⚠️ CONCERN |
| Fonts subset | ⚠️ CONCERN |

---

## ✅ Passed Items

### 1. `<html lang>` attribute — PASS
All 8 HTML files correctly declare `<html lang="en">`:
- `index.html:2` — `<html lang="en">`
- `about.html:2` — `<html lang="en">`
- `features.html:2` — `<html lang="en">`
- `download.html:2` — `<html lang="en">`
- `clients.html:2` — `<html lang="en">`
- `docs.html:2` — `<html lang="en">`
- `plugins.html:2` — `<html lang="en">`
- `hub.html:2` — `<html lang="en">`

**Evidence:** Every HTML document opens with proper language declaration, enabling screen readers and browsers to apply correct language-specific rendering.

### 2. No locale-unsafe `toLocaleString()` — PASS
JavaScript in `js/main.js` contains no date/time/number formatting that could leak locale assumptions.

**Evidence:** `main.js` only handles:
- Mobile nav toggle (lines 15-70)
- Smooth scroll (lines 74-92)
- Marquee lights animation (lines 97-109)
- Entrance animations with `prefers-reduced-motion` check (lines 113-162)
- Header scroll effect (lines 166-179)

No `toLocaleString()`, `Intl.DateTimeFormat`, `Intl.NumberFormat`, or similar locale-sensitive APIs found.

---

## ❌ Failures (Must Fix)

### 1. No `content.json` — CRITICAL FAILURE

**Finding:** No `content.json` file exists in `variants/03-retro-film-reel/`. All UI strings are hardcoded directly in HTML files.

**Impact:** Strings cannot be extracted, translated, or maintained independently from markup. Adding i18n support requires complete refactoring.

**Evidence:**
```
$ ls variants/03-retro-film-reel/
about.html  css/  docs.html  hub.html    index.html  js/
BUILD_LOG.md  clients.html  download.html  features.html  img/
plugins.html  VARIANT.md
```
No `content.json`, `strings.json`, `i18n/`, or equivalent localization asset directory exists.

**Examples of hardcoded strings requiring externalization:**
- `index.html:79` — "Your media. Your library. Your Phlix."
- `index.html:80` — "An open-source PHP media server that streams to your Roku..."
- `about.html:91` — "Is Phlix like Plex / Jellyfin / Emby?"
- `download.html:82` — "composer require detain/phlix-server"
- Footer copyright: `© 2026 Phlix — BSD-3-Clause` (appears in all 8 files)

**Recommendation:** Create `content/content.json` with structured string keys, then reference via a lightweight i18n runtime. Prioritize user-facing content first (headings, descriptions, CTAs), then structural strings.

---

## ⚠️ Concerns (Non-blocking)

### 1. RTL Safety — Partial Concern

**Finding:** CSS uses logical properties (`margin-inline`, `padding-inline`, `margin-block`) in `theme.css:184-186` which provides good RTL foundation, but no actual RTL content or testing exists.

**Evidence:**
```css
/* theme.css:181-186 */
.container {
  width: 100%;
  max-width: var(--max-width);
  margin-inline: auto;  /* Good: logical property */
  padding-inline: var(--space-lg);  /* Good: logical property */
}
```

No `[dir="rtl"]` attributes, no `direction: rtl` declarations, no Arabic/Hebrew translations. All 8 files hardcode `lang="en"` with no lang switching mechanism.

**Recommendation:** If RTL languages are in scope, add `dir` attribute binding to `<html>` and ensure layout works with `direction: rtl`. Even for English-only, using logical properties is correct practice (already done).

### 2. Fonts Subset — Incomplete Infrastructure

**Finding:** `theme.css` defines `@font-face` rules expecting self-hosted WOFF2 files at `../fonts/` (lines 11-57), with Google Fonts CDN as fallback (lines 60-106). However, the `fonts/` directory does not exist in the variant.

**Evidence:**
```css
/* theme.css:11-17 — self-hosted (MISSING) */
@font-face {
  font-family: 'Bebas Neue';
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  src: url('../fonts/bebas-neue-regular.woff2') format('woff2');
}

/* theme.css:60-66 — CDN fallback (WORKS) */
@font-face {
  font-family: 'Bebas Neue';
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  src: url('https://fonts.gstatic.com/s/bebasneue/v14/JTUSjIg69CK48gW7PXoo9Wlhyw.woff2') format('woff2');
}
```

**Issue:** The fallback CDN fonts load correctly, but:
1. Self-hosted fonts cannot be verified as subsetted (comment says "Build process should download...")
2. No `fonts/` directory exists to audit subset coverage
3. BUILD_LOG.md does not document font subsetting process

**Recommendation:** Document expected font subsets (Latin only? Latin + extended?) and verify build process downloads and subsets fonts before deploying.

---

## Recommendations (Ranked by Impact)

| Priority | Recommendation | Impact |
|----------|----------------|--------|
| **P0** | Create `content/content.json` for all hardcoded strings | Enables translation workflow, reduces duplication, improves maintainability |
| **P1** | Verify build process generates subsetted WOFF2 fonts in `fonts/` | Ensures font files exist and are properly subset |
| **P2** | Add `[dir]` binding to `<html>` if RTL is in scope | Future-proofs for RTL language support |
| **P3** | Consider `Intl.DisplayNames` or `Intl.Segmenter` if expanding JS i18n | Avoids locale fragmentation in future JS additions |

---

## Evidence Summary

**Files reviewed:**
- `index.html`, `about.html`, `features.html`, `download.html`, `clients.html`, `docs.html`, `plugins.html`, `hub.html`
- `js/main.js`
- `css/base.css`, `css/theme.css`, `css/components.css`
- `VARIANT.md`, `BUILD_LOG.md`

**No issues found in:**
- `js/main.js` — No locale-unsafe APIs, proper `'use strict'`, accessibility considerations
- `css/base.css` — Logical properties, `prefers-reduced-motion` support, no hardcoded text

**Issues found in:**
- All 8 HTML files — Hardcoded English strings, no i18n externalization
- `css/theme.css` lines 6-106 — Font infrastructure incomplete (no `fonts/` directory)

---

## Score Breakdown

| Category | Points | Max |
|----------|--------|-----|
| `<html lang>` present | 20 | 20 |
| No `toLocaleString()` unsafe | 15 | 15 |
| Strings from content.json | 0 | 25 |
| RTL safety | 10 | 20 |
| Fonts subset | 15 | 20 |
| **TOTAL** | **60** | **100** |

---

*Review complete. No fixes applied.*
