# Localization Review — Round 2 — Variant `01-minimalist-cinema`

**Reviewer:** Dimension Reviewer
**Dimension:** Localization
**Date:** 2026-05-20
**Round:** 2 (Re-audit after Phase I improvements)
**Files Reviewed:** 8 HTML pages, 3 CSS files, 1 JS file, `shared/content.json`, `BUILD_LOG.md`

---

## Overall Assessment: REQUEST_CHANGES

**Score: 35/100**

The variant retains most of the same issues as Round 1. While `<html lang="en">` is correctly set and CSS layout is RTL-safe, the core localization failure — strings not being sourced from `content.json` — remains unfixed. The `shared/content.json` file exists with a complete set of strings, but the variant's HTML files do not reference it at all. All display strings are hardcoded inline.

---

## ✅ Passed Items

| Check | Status | Evidence |
|-------|--------|----------|
| `<html lang="en">` present | ✅ PASS | All 8 HTML files (`index.html`, `about.html`, `features.html`, `download.html`, `clients.html`, `docs.html`, `hub.html`, `plugins.html`) have `<html lang="en">` at line 2 |
| No locale-unsafe `toLocaleString()` | ✅ PASS | No `toLocaleString()` calls found in `main.js` or any file in the variant |
| Date/number format abstraction | ✅ PASS | No date/number formatting logic present (static site) |
| RTL safety (no `float: left/right`) | ✅ PASS | CSS uses flexbox (`display: flex`) and grid (`display: grid`). No `float:` properties found. |
| JavaScript is locale-safe | ✅ PASS | `main.js` contains only nav toggle, smooth scroll, FAQ accordion — no locale-dependent logic |
| Self-hosted fonts preferred | ✅ PASS | `theme.css:11-41` defines self-hosted WOFF2 fonts (`../fonts/montserrat-extra-bold.woff2`, etc.) before CDN fallbacks |

---

## ❌ Failures (Still Present After Round 1)

### F1: Strings Still Hardcoded — `content.json` Not Referenced

**Severity:** 🔴 Critical
**Confidence:** 100%
**Status:** ❌ UNCHANGED from R1

**Problem:** `shared/content.json` exists at the repo root with a complete set of all UI strings (hero, features, clients, FAQ, footer, ecosystem, meta). However, none of the variant's HTML, CSS, or JS files reference or load this file. All strings remain hardcoded inline in HTML.

**Evidence:**

```
$ grep -r "content.json" variants/01-minimalist-cinema/
# Only found in BUILD_LOG.md (2 mentions):
#   Line 36: - All content rendered verbatim from `shared/content.json`
#   Line 123: - Updated `shared/content.json` meta.description to match trimmed version

$ grep -r "content.json" variants/01-minimalist-cinema/*.html variants/01-minimalist-cinema/*.css variants/01-minimalist-cinema/*.js
# No results — actual source files do not reference content.json
```

**Contrast:** `shared/content.json` contains exactly the strings used in HTML:
```json
{
  "hero": {
    "eyebrow": "Self-hosted media server",
    "headline": "Your media. Your library. Your Phlix.",
    "primary_cta": { "label": "Get Phlix", "href": "/download" }
  },
  ...
}
```

**Yet `index.html` hardcodes these same strings:**
```html
<!-- index.html:90-96 -->
<p class="hero-eyebrow">Self-hosted media server</p>
<h1 id="hero-heading">Your media. Your library. Your Phlix.</h1>
<a href="/variants/01-minimalist-cinema/download.html" class="btn btn-primary">Get Phlix</a>
```

**Impact:** A translator cannot update strings by editing `content.json`. They must edit each HTML file individually, violating the requirement that "Strings [be] reachable from one place so a future translator can swap them."

**Round 1 Recommendation Was:** "Create `content.json` with all display strings, refactor HTML to reference keys"
**Current Status:** `content.json` exists, but HTML was not refactored to use it.

---

## ⚠️ Concerns (Non-blocking)

### C1: Google Fonts CDN Fallbacks Without Subsetting

**Severity:** 🟡 Minor
**Confidence:** 95%

**Problem:** While self-hosted fonts are defined first (`theme.css:11-41`), the fallback `@font-face` rules at lines 44-74 load full font files from Google Fonts CDN without subsetting:

```css
/* theme.css:49 — Montserrat fallback */
src: url('https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Hw5aXo.woff2') format('woff2');

/* theme.css:57 — Inter fallback */
src: url('https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2') format('woff2');
```

Neither URL contains a `&text=...` subset parameter.

**Impact:** For Latin-only languages, this is negligible. However, for broader i18n, proper subsetting would reduce bandwidth. The self-hosted fonts (which are the primary approach) would also need subsetting if/when downloaded.

**Note:** The comment at `theme.css:7-9` states "Self-hosted WOFF2 fonts downloaded from Google Fonts" and lists 4 fonts. The primary `@font-face` blocks reference `../fonts/*.woff2` (self-hosted), with CDN fallbacks only for development/deployment before fonts are downloaded.

---

## Score Breakdown

| Criterion | Score | Max | Notes |
|-----------|-------|-----|-------|
| `<html lang>` present | 15 | 15 | All 8 pages correctly set |
| No `toLocaleString()` issues | 10 | 10 | None found |
| Date/number abstraction | 5 | 5 | Static site, N/A |
| `content.json` centralized strings | 0 | 30 | ❌ Still hardcoded |
| RTL safety | 5 | 20 | Flexbox/grid, no float |
| Font subsetting | 0 | 20 | CDN fallbacks lack subset param |
| **Total** | **35** | **100** | |

---

## Recommendations (Ranked by Impact)

| Priority | Recommendation | Action |
|----------|----------------|--------|
| **P0** | Reference `shared/content.json` from variant | Add `<script type="application/json" id="content-data">` in head with content.json data, or build-time templating that injects strings |
| **P0** | Replace hardcoded strings with data-key references | Use `data-i18n="hero.headline"` attributes or similar, with JS that reads from content.json |
| **P1** | Add `lang="ar"`, `lang="he"` test page to verify RTL works | Though CSS uses flexbox/grid without float, manual testing confirms no LTR-specific assumptions |
| **P2** | Add `&text=ABC...` subset param to CDN font fallbacks | Only affects fallback; primary fonts are self-hosted |

---

## Evidence

### `<html lang>` Verification
```
index.html:2      → <html lang="en">
about.html:2     → <html lang="en">
features.html:2  → <html lang="en">
download.html:2  → <html lang="en">
clients.html:2    → <html lang="en">
docs.html:2      → <html lang="en">
hub.html:2       → <html lang="en">
plugins.html:2   → <html lang="en">
```

### `content.json` vs HTML Strings

`shared/content.json` has exact strings matching hardcoded HTML:
```json
"hero": { "headline": "Your media. Your library. Your Phlix." }
"features": [{ "title": "Library that organizes itself" }, ...]
"footer": { "tagline": "Open-source media, on your terms." }
```

`index.html:90-213` contains the same strings hardcoded:
```html
<h1 id="hero-heading">Your media. Your library. Your Phlix.</h1>
<p class="footer-tagline">Open-source media, on your terms.</p>
```

`about.html:88-111` duplicates FAQ content that exists verbatim in `shared/content.json`:
```json
"faq": [{ "q": "Is Phlix like Plex / Jellyfin / Emby?", "a": "Yes — same job, different stack..." }]
```

### Float Usage Check
```
$ grep -r "float:" variants/01-minimalist-cinema/css/
# No results — layout uses flexbox and grid
```

### toLocaleString Check
```
$ grep -r "toLocaleString" variants/01-minimalist-cinema/
# No results
```

---

## Conclusion

**REQUEST_CHANGES** — The R1 finding is confirmed still present: while `shared/content.json` exists with all necessary strings, the variant's HTML files do not reference it. All display text (navigation, headings, body copy, buttons, footer) remains hardcoded inline, making translation impractical.

**The fix is straightforward:** `shared/content.json` already exists and contains all strings. The variant needs either:
1. A build step that injects strings from `content.json` into HTML at build time, or
2. A runtime JS approach where HTML uses `data-i18n-key` attributes and a small JS reads `content.json` to populate them

**Next Action (for implementer, not reviewer):** Implement string externalization using the existing `shared/content.json`. Do not create a new content.json — use the one that already exists at the repo root.

---

*Review completed. File written to `reviews/01-minimalist-cinema/localization-R2.md`.*
