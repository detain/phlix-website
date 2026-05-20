# Localization Review — Variant `01-minimalist-cinema`

**Reviewer:** Dimension Reviewer
**Dimension:** Localization
**Date:** 2026-05-20
**Files Reviewed:** 8 HTML pages, 3 CSS files, 1 JS file

---

## Overall Assessment: REQUEST_CHANGES

**Score: 30/100**

The variant lacks any localization infrastructure. All user-facing strings are hardcoded directly in HTML, making translation impractical. While `<html lang="en">` is correctly set on all pages, this is the only localization consideration that passes.

---

## ✅ Passed Items

| Check | Status | Evidence |
|-------|--------|----------|
| `<html lang="en">` present | ✅ PASS | All 8 HTML files (`index.html`, `about.html`, `features.html`, `download.html`, `clients.html`, `docs.html`, `hub.html`, `plugins.html`) have `<html lang="en">` at line 2 |
| No locale-unsafe `toLocaleString()` | ✅ PASS | No `toLocaleString()` calls found in `main.js` or any file |
| Date/number format abstraction | ✅ PASS | No date/number formatting logic present (static site) |
| RTL safety (no `float: left/right`) | ✅ PASS | CSS uses flexbox (`display: flex`) and grid (`display: grid`), margin tricks (`margin-left: auto`) for LTR而非float |
| JavaScript is locale-safe | ✅ PASS | `main.js` contains only nav toggle, smooth scroll, FAQ accordion — no locale-dependent logic |

---

## ❌ Failures (Must Fix)

### F1: No `content.json` — All Strings Hardcoded in HTML

**Severity:** 🔴 Critical
**Confidence:** 100%

**Problem:** There is no `content.json` or equivalent localization file. Every visible string is embedded directly in HTML:

- **Navigation:** "Home", "Features", "Clients", "Download", "Plugins", "Docs", "Hub", "About" (8 HTML files × nav)
- **Page content:** "Your media. Your library. Your Phlix.", feature descriptions, FAQ questions/answers, download card text
- **Buttons:** "Get Phlix", "Read the docs", "Download Now", "Get started", etc.
- **Footer:** "Product", "Developers", "Project", "Open-source media, on your terms.", copyright

**Impact:** A translator must edit each HTML file separately. This violates the rubric requirement that "Strings [be] reachable from one place (`content.json`) so a future translator can swap them."

**Fix Required:** Extract all display strings to `content.json` and render via JS or build-time templating.

---

## ⚠️ Concerns (Non-blocking)

### C1: Google Fonts Without Subsetting

**Severity:** 🟡 Minor
**Confidence:** 90%

**Problem:** The fallback `@font-face` rules load full font files from Google Fonts CDN without subsetting:

```css
/* theme.css:49 */
src: url('https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Hw5aXo.woff2') format('woff2');
```

No `&text=...` subset parameter is present. The woff2 filename suggests a full Latin character set rather than a subset.

**Impact:** Slightly larger font downloads. For Latin-only languages this is negligible. However, if the design system is intended for multilingual use, proper subsetting reduces bandwidth.

**Note:** The comment at `theme.css:7-9` mentions "Self-hosted WOFF2 fonts downloaded from Google Fonts" — suggesting self-hosted fonts are preferred but fallbacks use CDN without subsetting.

---

## Evidence

### `<html lang>` Verification
```
index.html:2      → <html lang="en">
about.html:2     → <html lang="en">
features.html:2  → <html lang="en">
download.html:2 → <html lang="en">
clients.html:2   → <html lang="en">
docs.html:2      → <html lang="en">
hub.html:2       → <html lang="en">
plugins.html:2   → <html lang="en">
```

### No `content.json` Present
```
$ ls variants/01-minimalist-cinema/**/*.json
# No files found
```

### Hardcoded Strings Example (index.html lines 52-59)
```html
<ul class="nav-menu" id="nav-menu" role="list">
  <li><a href="/variants/01-minimalist-cinema/">Home</a></li>
  <li><a href="/variants/01-minimalist-cinema/features.html">Features</a></li>
  <li><a href="/variants/01-minimalist-cinema/clients.html">Clients</a></li>
  <li><a href="/variants/01-minimalist-cinema/download.html">Download</a></li>
  <!-- ... all nav labels hardcoded -->
```

### Float Usage Check
```
$ grep -r "float:" variants/01-minimalist-cinema/css/
# No results — uses flexbox/grid throughout
```

### Google Fonts Fallback URLs
```css
/* Montserrat (theme.css:49) */
https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Hw5aXo.woff2

/* Inter (theme.css:57) */
https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2
```
Neither URL contains a `text=` subset parameter.

---

## Recommendations (Ranked by Impact)

| Priority | Recommendation | Impact | Effort |
|----------|----------------|--------|--------|
| **P0** | Create `content.json` with all display strings, refactor HTML to reference keys | Enables translation | High |
| **P1** | Once `content.json` exists, add `lang="de"`, `lang="es"` test variants to verify structure | Validates i18n | Medium |
| **P2** | Add `&text=...` subset parameter to Google Fonts fallback URLs (Latin subset only) | Reduces font size | Low |

---

## Score Breakdown

| Criterion | Score | Max |
|-----------|-------|-----|
| `<html lang>` present | 15 | 15 |
| No `toLocaleString()` issues | 10 | 10 |
| Date/number abstraction | 5 | 5 |
| `content.json` centralized strings | 0 | 30 |
| RTL safety | 0 | 20 |
| Font subsetting | 0 | 20 |
| **Total** | **30** | **100** |

---

## Conclusion

**REQUEST_CHANGES** — The variant passes several localization checks but fails the core requirement: strings must be reachable from a single `content.json` file. All display text is hardcoded in HTML, making this variant non-translatable without significant manual effort.

**Next Action:** Create `content.json` containing all UI strings (nav labels, headings, buttons, body copy, footer) and implement a JS or build-step mechanism to render them into templates.
