# Localization Review — 05-pixel-tech-3 (Wave 3)

## Summary

**Status:** ❌ No i18n Infrastructure

This wave has zero localization support. All user-facing strings are hardcoded in English with no extraction to translation resources, no i18n library, and no lang/hreflang meta for multilingual variants.

---

## HTML Analysis

### ✅ Correct

| Item | Status | Notes |
|------|-------|-------|
| `<html lang="en">` | ✅ | Properly set on line 2 |

### ❌ Missing

| Item | Status | Evidence |
|------|--------|----------|
| `hreflang` alternate links | ❌ | No `<link rel="alternate" hreflang="...">` meta tags |
| `meta[http-equiv="content-language"]` | ❌ | Missing fallback meta tag |
| i18n attribute markers | ❌ | No `data-i18n`, `i18n-key`, or equivalent |
| Translation resource link | ❌ | No script loading translation JSON/PO files |
| URL-based locale switching | ❌ | No `/en/`, `/de/` path pattern or similar |

---

## JavaScript Analysis (`js/main.js`)

### ❌ Hardcoded English Strings

| Line | String | Context |
|------|--------|---------|
| 19 | `'hidden'` | `overflow` style value (technical, not user-facing) |
| 29 | `'false'` | `aria-expanded` (technical, not user-facing) |
| 31 | `'Escape'` | Keyboard event key (technical) |
| 40 | `'false'` | `aria-expanded` (technical) |
| 51 | `'(prefers-reduced-motion: reduce)'` | Media query string (technical) |
| 140 | `'Tab'` | Keyboard event key (technical) |
| 161 | `'smooth'` | Scroll behavior (technical) |

All JS strings are **technical constants**, not human-readable user-facing text. However, the JS architecture provides **no foundation** for future i18n — no translation loader, no `t()` helper, no `Intl` formatting.

---

## User-Facing Strings (HTML)

### Lines with hardcoded English content

| Line | String | Element |
|------|--------|---------|
| 6 | `Your media. Your library. Your Phlix.` | `<title>` |
| 7 | `Phlix: self-hostable PHP media server...` | meta description |
| 11 | `Your media. Your library. Your Phlix.` | og:title |
| 12 | `Phlix — a self-hostable...` | og:description |
| 20 | `Your media. Your library. Your Phlix.` | twitter:title |
| 21 | `Phlix — a self-hostable...` | twitter:description |
| 56 | `Skip to main content` | skip-link |
| 64 | `Toggle navigation` | aria-label |
| 87 | `Self-hosted media server` | hero eyebrow |
| 88 | `Your media. Your library. Your Phlix.` | h1 + glitch text |
| 89 | `An open-source PHP media server...` | hero-sub |
| 91 | `Get Phlix` | CTA button |
| 92 | `Read the docs` | secondary CTA |
| 100 | `Why Phlix?` | h2 |
| 102–108 | Feature bullet list | 7 list items |
| 116 | `Everything your library needs` | h2 |
| 124 | `Library that organizes itself` | feature-card h3 |
| 125 | `Folder-watcher hashes...` | feature-card p |
| 133 | `SyncPlay across the room or across the country` | feature h3 |
| 142 | `Transcoding that picks the right quality` | feature h3 |
| 151 | `Multi-user, multi-profile, parental controls` | feature h3 |
| 160 | `Live TV with DVR + EPG` | feature h3 |
| 169 | `DLNA for the devices you already own` | feature h3 |
| 178 | `Plugin system with a real contract` | feature h3 |
| 187 | `Phlix Hub — reach any of your servers from anywhere` | feature h3 |
| 191 | `See all features →` | link text |
| 198 | `Ready to stream?` | h2 |
| 199 | `Download Phlix` | button text |
| 207 | `Open source. Zero compromise.` | footer tagline |
| 209 | `Product` | footer h3 |
| 218 | `Developers` | footer h3 |
| 227 | `Project` | footer h3 |
| 237 | `© 2026 Phlix — BSD-3-Clause` | copyright |

**Count:** ~40+ hardcoded English strings across titles, headings, body copy, CTAs, and footer.

---

## Accessibility (Localization-Adjacent)

### ✅ Good

| Item | Status | Notes |
|------|-------|-------|
| `aria-label` on interactive elements | ✅ | Lines 64, 62 use descriptive labels |
| `aria-labelledby` on sections | ✅ | Lines 85, 98, 114, 196 reference heading IDs |
| `aria-current="page"` | ✅ | Applied by JS for active nav state (line 131) |
| `role` attributes | ✅ | Consistent use on nav, lists, footer |
| `alt` on logo | ✅ | Line 62: "Phlix logo" |

---

## Recommendations

### Immediate (Zero i18n Infrastructure)

1. **Add hreflang meta** for canonical + alternate languages:
   ```html
   <link rel="alternate" hreflang="en" href="https://detain.github.io/phlix-website/">
   <link rel="alternate" hreflang="x-default" href="https://detain.github.io/phlix-website/">
   ```

2. **Extract strings to JSON translation file**, e.g.:
   ```json
   {
     "en": {
       "hero.title": "Your media. Your library. Your Phlix.",
       "nav.home": "Home",
       "cta.get": "Get Phlix"
     }
   }
   ```

3. **Add i18n utility** in `main.js` before any user-facing string usage:
   ```js
   const t = (key) => translations[currentLocale]?.[key] ?? key;
   ```

4. **Use `data-i18n` attributes** in HTML to mark translatable nodes:
   ```html
   <h1 data-i18n="hero.title">Your media. Your library. Your Phlix.</h1>
   ```

5. **Replace hardcoded year** in copyright with dynamic:
   ```js
   document.getElementById('year').textContent = new Date().getFullYear();
   ```

### Future Waves

- [ ] Implement locale detection (`navigator.language`, URL prefix)
- [ ] Add `Intl.DateTimeFormat` / `Intl.NumberFormat` wrappers
- [ ] Add RTL language support via `dir` attribute switching
- [ ] Consider `i18next`, `FormatJS`, or similar i18n library for scale
- [ ] Extract all 40+ strings to translation files before adding new languages

---

## Verdict

| Criterion | Result |
|-----------|--------|
| HTML lang attribute | ✅ Present |
| Multilingual meta/hreflang | ❌ Missing |
| JS i18n architecture | ❌ None |
| Hardcoded user strings | ❌ 40+ strings |
| Accessibility i18n readiness | ⚠️ Partial (ARIA good, text not externalized) |

**Recommendation:** Do not approve for localization. Requires i18n infrastructure before any translation work can begin.