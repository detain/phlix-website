# Localization Review — Variant 02-spotlight-projector

**Reviewer**: Dimension Reviewer  
**Dimension**: Localization  
**Date**: 2026-05-20  
**Files Reviewed**: 8 HTML files, 3 CSS files, 1 JS file

---

## Rubric Checklist

| Criterion | Status |
|----------|--------|
| `<html lang>` attribute present | ✅ PASS |
| No locale-unsafe `toLocaleString()` | ✅ PASS |
| Strings sourced from `content.json` | ❌ FAIL |
| RTL safety (no `float:left/right`) | ✅ PASS |
| Fonts properly subset | ⚠️ CONCERN |

---

## Score: **45 / 100**

---

## ✅ Passed Items

### 1. `<html lang>` attribute — PASS
All 8 HTML files correctly declare `<html lang="en">`:
- `index.html:2`
- `about.html:2`
- `features.html:2`
- `download.html:2`
- `clients.html:2`
- `docs.html:2`
- `plugins.html:2`
- `hub.html:2`

### 2. No `toLocaleString()` usage — PASS
Zero occurrences of `toLocaleString()` found in any JS or HTML files. No locale-sensitive number/date formatting that could produce inconsistent output across locales.

### 3. RTL Safety (no `float:left/right`) — PASS
No `float:left` or `float:right` found in any CSS. All layouts use modern flexbox (`display: flex`) and CSS Grid (`display: grid`). Layouts are RTL-safe and would not break with `dir="rtl"` document direction.

---

## ⚠️ Concerns (Non-blocking)

### 1. Google Fonts URL lacks explicit subset parameter — MEDIUM IMPACT
**Files**: `css/theme.css:8`

```css
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Fira+Code:wght@400&family=Lora:wght@400&family=Source+Sans+Pro:wght@500&display=swap');
```

The Google Fonts URL does not include a `subset=` parameter. Without explicit subsetting, browsers download the full character set including Latin extended, symbols, etc. While this is not a localization failure, it:
- Increases page load bloat (~30-50kb extra per font)
- Makes the site slower for users who only need basic Latin

**Recommendation**: Add `&subset=latin` to each font in the URL for production:
```
&family=Cinzel:wght@700&subset=latin
```

### 2. `@font-face` local font files missing — MEDIUM IMPACT
**Files**: `css/theme.css:10-32`

```css
@font-face {
  font-family: Lora;
  ...
  src: url('../fonts/lora-regular.woff2') format('woff2');
}
```

These `@font-face` rules reference local font files in `../fonts/` but no `fonts/` directory exists in this variant. The actual fonts load via Google Fonts `@import` instead, so functionality works but the `@font-face` blocks are dead code pointing to 404 resources.

### 3. Hardcoded copyright year — LOW IMPACT
**Files**: All 8 HTML files (footer-copy class)

```html
<p class="footer-copy">&copy; 2026 Phlix &mdash; BSD-3-Clause</p>
```

The year `2026` is hardcoded in every page's footer. This will become incorrect in 2027 and requires manual updates per-file. While not a localization failure, it violates DRY and will cause maintenance drift.

**Recommendation**: Generate year dynamically via JavaScript or server-side template:
```js
document.write(new Date().getFullYear())
```

---

## ❌ Failures (Must Fix)

### 1. No `content.json` — ALL HTML FILES — CRITICAL
**Evidence**: No `content.json` file exists under `variants/02-spotlight-projector/`.

All visible UI strings are hardcoded directly in HTML markup:
- Navigation labels: "Home", "Features", "Clients", "Download", "Plugins", "Docs", "Hub", "About"
- Button text: "Get Phlix", "Read the docs", "Download Now", "Get started", "See all features →"
- Section headings, body copy, footer links — everything inline

**Why this fails localization**: To translate the site, every HTML file must be edited separately. There is no central string repository to hand to translators. Adding a new language requires duplicating all 8 HTML files rather than adding a new locale JSON.

**Impact**: Localization is **impossible** without significant refactoring. This is the single largest blocker for multi-language support.

**Recommendation** (Ranked by implementation effort):
1. **Low effort**: Create `content.json` with all strings, use vanilla JS to read and inject into DOM on page load
2. **Medium effort**: Use a static site generator (e.g., Eleventy, Hugo, Astro) with i18n plugin
3. **High effort**: Implement a proper i18n solution with gettext-style `.po`/`.mo` files or JSON translation files per locale

---

## Recommendations (Ranked by Impact)

| Priority | Recommendation | Impact | Effort |
|----------|----------------|---------|--------|
| 1 | Create `content.json` with all UI strings | Enable localization | Low |
| 2 | Add `subset=latin` to Google Fonts URL | Performance | Low |
| 3 | Generate copyright year dynamically | Maintenance | Low |
| 4 | Remove dead `@font-face` blocks or add actual font files | Clean code | Medium |
| 5 | Migrate to static site generator with i18n | Full i18n | High |

---

## Evidence

### lang attribute verification
```
$ grep -n 'html lang' variants/02-spotlight-projector/*.html
index.html:2:<html lang="en">
about.html:2:<html lang="en">
features.html:2:<html lang="en">
download.html:2:<html lang="en">
clients.html:2:<html lang="en">
docs.html:2:<html lang="en">
plugins.html:2:<html lang="en">
hub.html:2:<html lang="en">
```

### float:left/right verification
```
$ grep -rE 'float\s*:\s*(left|right)' variants/02-spotlight-projector/css/
(No matches)
```

### toLocaleString verification
```
$ grep -r 'toLocaleString' variants/02-spotlight-projector/
(No matches)
```

### content.json verification
```
$ find variants/02-spotlight-projector/ -name 'content.json'
(No matches)
```

### Font files verification
```
$ ls -la variants/02-spotlight-projector/fonts/
ls: cannot access 'variants/02-spotlight-projector/fonts/': No such file or directory
```

---

## Summary

The variant is **RTL-safe** and has correct `<html lang="en">` attributes on all pages. JavaScript contains no locale-unsafe formatting calls. However, **all UI strings are hardcoded inline** with no `content.json` or other i18n mechanism, making localization impossible without significant refactoring. The Google Fonts implementation lacks subsetting and references missing local font files.

**Overall Assessment**: `REQUEST_CHANGES` — Localization blocked by absence of string externalization. Font subsetting should be addressed before production deployment.
