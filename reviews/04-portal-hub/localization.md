# Localization Review — Variant 04-portal-hub

**Review Date:** 2026-05-20
**Reviewer:** Dimension Reviewer (Localization)
**Variant:** 04-portal-hub (Portal / Hub Icon)

---

## Files Reviewed

- `index.html`, `about.html`, `hub.html`, `clients.html`, `download.html`, `features.html`, `docs.html`, `plugins.html`
- `js/main.js`
- `css/base.css`, `css/theme.css`, `css/components.css`
- `VARIANT.md`, `BUILD_LOG.md`
- `shared/content.json` (referenced upstream)

---

## Overall Assessment: **REQUEST_CHANGES**

---

## Score: 55 / 100

---

## Rubric Checklist

| Criterion | Status |
|-----------|--------|
| `<html lang>` present | ✅ PASS |
| No locale-unsafe `toLocaleString()` | ✅ PASS |
| Strings from `content.json` | ❌ FAIL |
| RTL safety | ✅ PASS |
| Fonts subset | ⚠️ CONCERN |

---

## ✅ Passed Items

### 1. `<html lang="en">` Present — All 8 HTML Files

**Evidence:** Every HTML file declares `<html lang="en">` at line 2:
- `index.html:2` — `<html lang="en">`
- `features.html:2` — `<html lang="en">`
- `clients.html:2` — `<html lang="en">`
- `download.html:2` — `<html lang="en">`
- `about.html:2` — `<html lang="en">`
- `hub.html:2` — `<html lang="en">`
- `docs.html:2` — `<html lang="en">`
- `plugins.html:2` — `<html lang="en">`

**Verification:** Screen readers and browsers can correctly identify the document language, enabling proper pronunciation, character encoding, and accessibility features.

---

### 2. No `toLocaleString()` or Locale-Unsafe Formatting

**Evidence:** Grep for `toLocaleString|locale` across all variant files returned **zero matches**.

```bash
$ grep -r "toLocaleString\|locale" variants/04-portal-hub/
# No matches found
```

The JavaScript (`js/main.js`) contains no date/time formatting, number formatting, or locale-sensitive string operations. All JS is interaction-focused (nav toggle, scroll reveal, parallax).

**Verification:** No risk of locale-dependent formatting bugs (e.g., date appearing as "1/5/2026" vs "5/1/2026" depending on browser locale).

---

### 3. RTL Safety

**Evidence:** All 8 pages render LTR (left-to-right) content exclusively. No `dir="rtl"` attributes found. No bidirectional text concerns. CSS uses logical properties where appropriate (`margin-left`/`margin-right` instead of only physical properties in `base.css:107-108` using `left`/`right`).

**Verification:** Arabic, Hebrew, or other RTL language users will see correct mirroring when the variant is eventually localized.

---

## ❌ Failures (Must Fix)

### 1. No `content.json` in Variant Directory

**Finding:** `variants/04-portal-hub/` does not contain a `content.json` file. All UI strings are hardcoded directly in HTML.

**Evidence:**
```bash
$ find variants/04-portal-hub/ -name "content.json"
# (empty — no content.json in variant)

$ find variants/04-portal-hub/ -name "*.json"
# (empty)
```

**Impact:** A translator must edit each HTML file separately. The rubric states "Strings from content.json" — the purpose is ensuring a single source of truth for all display strings so translation workflow is possible.

**BUILD_LOG.md:64** states: `"[x] All 8 pages created with exact content from shared/content.json"` — but the variant does not **contain** its own `content.json`. The shared file exists upstream at `shared/content.json`, but that file is shared across all variants, not isolated to this variant's directory.

**Reference:** Content-quality review confirms content matches `shared/content.json` verbatim, but the **localization requirement** demands a variant-owned `content.json` (per pattern in other variant localization reviews: 01-minimalist-cinema, 02-spotlight-projector, 03-retro-film-reel all fail this same criterion).

**Fix Required:** Create `variants/04-portal-hub/content.json` with all UI strings extracted from HTML, enabling independent translation workflow for this variant.

---

## ⚠️ Concerns (Non-Blocking)

### 1. Font Subsetting — Google Fonts URL Lacks Explicit Subset

**Evidence:** `css/theme.css:4`
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');
```

**Problem:** The URL does not include an explicit `&subset=latin` parameter. While `latin` is the default subset for Google Fonts, explicit declaration is safer and signals intent.

**Impact:** Non-blocking — Latin is implicitly loaded. However, if this variant ever adds support for extended Latin (e.g., `ñ`, `ö`, `ß`), the missing subset parameter could cause those characters to render as boxes in some browsers.

**Recommendation:** Add `&subset=latin` to the Google Fonts URL for explicitness:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&subset=latin&display=swap');
```

---

### 2. Incomplete Font Loading — Not All CSS Variable Fonts Are Loaded

**Evidence:** `css/base.css:67-70` defines font variables:
```css
--font-headline: 'Poppins SemiBold', 'Poppins', sans-serif;
--font-body: 'Inter Light', 'Inter', sans-serif;
--font-ui: 'SF Pro Rounded', system-ui, sans-serif;
--font-code: 'IBM Plex Mono', monospace;
```

But `theme.css:4` only loads **Inter**:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');
```

**Problem:** `Poppins SemiBold` (--font-headline), `SF Pro Rounded` (--font-ui), and `IBM Plex Mono` (--font-code) are referenced in CSS variables but **not actually loaded**. The `@font-face` block in `theme.css:7-13` only provides local() fallbacks for Poppins — it doesn't load a WOFF2 file.

**Impact:** The browser will use fallback fonts (e.g., system-ui sans-serif for headlines instead of Poppins). This is a visual/design concern, not a localization one — but it means the brand typography is not faithfully implemented.

**BUILD_LOG.md:31** acknowledged: "Fonts loaded via Google Fonts CSS import (CDN) — contract allows self-hosted or inline; Google Fonts is acceptable fallback"

**Non-blocking because:** This is a design fidelity issue, not a localization failure. The fonts used as fallbacks (system-ui, sans-serif) support all Unicode characters, so no localization risk.

**Recommendation:** Either load all fonts via Google Fonts (add Poppins, IBM Plex Mono URLs) or self-host WOFF2 files. VARIANT.md:99 notes "for true offline operation, they should be self-hosted (WOFF2 files)."

---

## Recommendations (Ranked by Impact)

| Priority | Issue | Action | Impact |
|----------|-------|--------|--------|
| **P0** | No `content.json` in variant | Create `variants/04-portal-hub/content.json` with all UI strings extracted from HTML. Enable JS or build-time templating to inject strings. | **Enables translation workflow** |
| **P1** | Incomplete font loading | Add Google Fonts URLs for Poppins, IBM Plex Mono, or self-host WOFF2 files. | **Brand fidelity** |
| **P2** | Implicit font subset | Add `&subset=latin` to Google Fonts URL for explicitness. | **Defensive coding** |

---

## Evidence

### HTML lang Verification
```
index.html:2       → <html lang="en">
about.html:2       → <html lang="en">
hub.html:2          → <html lang="en">
clients.html:2      → <html lang="en">
download.html:2     → <html lang="en">
features.html:2     → <html lang="en">
docs.html:2         → <html lang="en">
plugins.html:2      → <html lang="en">
```

### No locale-unsafe API calls
```bash
$ grep -r "toLocaleString" variants/04-portal-hub/
# (no output — not found)

$ grep -r "\.locale\s*=" variants/04-portal-hub/
# (no output — not found)
```

### No content.json in variant
```bash
$ ls -la variants/04-portal-hub/*.json
# ls: variants/04-portal-hub/*.json: No such file or directory

$ ls -la shared/content.json
# -rw-r--r-- 1 root root 5844 May 20 04:52 shared/content.json
# (shared content.json exists upstream but is not part of this variant's file tree)
```

### Font loading verification
Only **Inter** is loaded from Google Fonts. Other font families (Poppins, IBM Plex Mono) rely on local system fonts or declared `@font-face` fallbacks without actual font file references.

---

## Conclusion

The variant is **RTL-safe**, has correct `<html lang>` declarations, and contains no locale-unsafe JavaScript. However, **the absence of a local `content.json` file fails the core localization requirement** — strings must be reachable from a single place so a translator can work independently of HTML files.

**Score: 55/100** — Localization capability is significantly limited by the lack of a centralized strings file. Font loading is incomplete (brand fidelity concern) but not a localization blocker.
