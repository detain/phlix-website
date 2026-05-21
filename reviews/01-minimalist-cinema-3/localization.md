# Localization Review — 01-minimalist-cinema-3

## Summary

| Aspect | Status | Notes |
|--------|--------|-------|
| HTML lang attribute | ✅ PASS | `lang="en"` correctly set on `<html>` |
| Charset | ✅ PASS | `utf-8` declared in all pages |
| Content Language | ⚠️ PARTIAL | Single language (English) only |
| hreflang links | ❌ FAIL | No alternate language versions linked |
| i18n infrastructure | ❌ FAIL | No translation system in place |
| JS i18n | ❌ FAIL | All JS strings hardcoded in English |

---

## Findings

### 1. HTML Lang Attribute — ✅ PASS

All pages correctly declare `<html lang="en">`. No issues.

### 2. Charset Declaration — ✅ PASS

All pages declare `<meta charset="utf-8">` in the `<head>`. UTF-8 support is properly configured.

### 3. Content Language — ⚠️ PARTIAL

The site is **English-only**. All visible text is hardcoded in English:

- **index.html**: "Your media. Your library. Your Phlix.", "Get Phlix", "Read the docs"
- **features.html**: "Features", "Library that organizes itself"
- **about.html**: "About", FAQ answers (e.g., "Is Phlix like Plex / Jellyfin / Emby?")
- **js/main.js**: No translatable strings, but no user-facing text either

No mechanism exists to serve content in alternative languages.

### 4. hreflang Links — ❌ FAIL

No `<link rel="alternate" hreflang="...">` tags exist in the `<head>`. For a site targeting international users, this is a missed SEO and accessibility opportunity.

**Example missing pattern:**
```html
<link rel="alternate" hreflang="es" href="./es/index.html">
<link rel="alternate" hreflang="de" href="./de/index.html">
<link rel="alternate" hreflang="x-default" href="./en/index.html">
```

### 5. i18n Infrastructure — ❌ FAIL

No internationalization system is present:

- No `.json` translation files
- No `i18next`, `Intl` API usage, or custom i18n module
- No language detection (URL prefix, query param, browser preference)
- All HTML content is hardcoded English

If future translations are needed, the architecture would require significant rework.

### 6. JavaScript i18n — ❌ FAIL

The `main.js` file has **zero translatable strings**. All interactive functionality is English-only:

```javascript
// No i18n patterns found:
navToggle.setAttribute('aria-label', 'Toggle navigation'); // Hardcoded
button.setAttribute('aria-expanded', 'false');                // Hardcoded
```

For an open-source project targeting international users, JavaScript strings (aria-labels, button text, error messages) should use a translation system.

---

## Recommendations

### High Priority

1. **Add hreflang links** for SEO and international accessibility
2. **Establish i18n architecture** before adding more content:
   - JSON translation files (e.g., `locales/en.json`, `locales/es.json`)
   - URL-based language switching (`/es/`, `?lang=es`)
   - Data-i18n attributes on HTML elements
   - Translation function in JS (`t('key')`)

### Medium Priority

3. **Extract visible strings** from HTML into translation files
4. **Add language selector** in header navigation

### Low Priority

5. **Consider RTL support** if Arabic/Hebrew markets are targeted
6. **Add `lang` attribute** changes dynamically when language switches

---

## Severity Classification

| Issue | Severity | Justification |
|-------|-----------|----------------|
| No hreflang | LOW | English-only site; not currently needed |
| No i18n | MEDIUM | Technical debt; will require rework to add translations |
| No JS i18n | LOW | Currently no user-facing JS strings |

---

## Files Reviewed

- `variants/01-minimalist-cinema-3/index.html`
- `variants/01-minimalist-cinema-3/features.html`
- `variants/01-minimalist-cinema-3/about.html`
- `variants/01-minimalist-cinema-3/js/main.js`

---

## Reviewer

Localization Reviewer — Wave 3  
Date: 2026-05-21
