# Localization Review: 04-portal-hub-4

**Reviewer**: Localization Reviewer
**Date**: 2026-05-21
**Files Reviewed**: `index.html`, `js/main.js`

---

## Summary

| Aspect | Status |
|--------|-------|
| Document language declaration | ✅ Pass |
| User-facing text externalization | ⚠️ Needs Work |
| Internationalization infrastructure | ❌ Missing |
| Alternate language hreflang | ❌ Not Applicable |

---

## Detailed Findings

### 1. Document Language Declaration

**Status**: ✅ Pass

```html
<html lang="en">
```

The document correctly declares `lang="en"` on the root `<html>` element. This is essential for screen readers and browsers to render the page correctly for English users.

---

### 2. Hardcoded User-Facing Text

**Status**: ⚠️ Needs Work — All user-facing text is hardcoded in English with no externalization mechanism.

#### HTML (index.html)

All visible text content is embedded directly in the HTML:

| Element | Text |
|--------|------|
| `<title>` | "Phlix - Connect everything. Control everything." |
| Meta description | "Self-hostable PHP media server with native apps for Roku..." |
| Hero eyebrow | "Self-hosted media server" |
| Hero headline | "Your media. Your library. Your Phlix." |
| Nav links | "Features", "Clients", "Hub", "Docs", "Download" |
| CTA buttons | "Get Phlix", "Read the docs", "Explore features" |
| Feature titles | "Library that organizes itself", "SyncPlay across the room..." |
| Footer headings | "Product", "Developers", "Project" |

#### JavaScript (main.js)

Several UI strings are hardcoded in JavaScript:

```javascript
toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
// Line 19
```

All other JavaScript strings (comments, function names) are in English but do not require translation as they are developer-facing.

---

### 3. Missing Internationalization Infrastructure

**Status**: ❌ Missing — No i18n system is present.

The codebase lacks any of the following i18n mechanisms:

- **No translation keys**: Text is not mapped to keys (e.g., `t('nav.features')`)
- **No translation files**: No JSON/MO/PO files for storing translations
- **No i18n library**: No use of libraries like `i18next`, `IntlMessageFormat`, or gettext
- **No build-time extraction**: No infrastructure to extract strings for translation

For a production-ready localized product, consider:
1. Externalizing all user-facing strings to a central locale file
2. Using a proper i18n library (e.g., `i18next` for JS, gettext for PHP backend)
3. Implementing language detection (browser preference, URL prefix, or cookie)
4. Adding `hreflang` tags if multilingual versions exist at different URLs

---

### 4. Meta Tags and SEO Content

**Status**: ✅ Acceptable for single-language, ❌ No hreflang for multilingual versions

| Tag | Content | Language |
|-----|---------|----------|
| `<meta name="description">` | English | en |
| `<meta property="og:description">` | English | en |
| `<meta name="twitter:description">` | English | en |
| `<meta property="og:title">` | English | en |
| `<meta name="twitter:title">` | English | en |

If multilingual versions of this page exist or will exist at alternate URLs, `hreflang` tags should be added:

```html
<link rel="alternate" hreflang="en" href="https://example.com/en/page">
<link rel="alternate" hreflang="es" href="https://example.com/es/page">
```

---

### 5. Accessibility Considerations

**Status**: ✅ Good

- All interactive elements have proper `aria-label` attributes where needed
- `aria-expanded` states are correctly toggled for the mobile menu
- Focus management is implemented for keyboard navigation
- The skip link is properly labeled ("Skip to main content")

---

## Recommendations

### High Priority

1. **Externalize UI strings**: Move all human-readable text from HTML/JS to a centralized locale/translation file. This is a prerequisite for any translation effort.

2. **Add i18n infrastructure**: Establish a translation workflow using a library like:
   - **Frontend JS**: `i18next`, `svelte-i18n`, or `vue-i18n` depending on framework
   - **Template strings**: Consider using ICU MessageFormat for plural/gender support

### Medium Priority

3. **Document language switching**: If supporting multiple languages, implement:
   - URL-based routing (`/en/`, `/es/`, `/de/`)
   - Browser language detection
   - Language switcher UI component

4. **Add hreflang when multilingual URLs exist**: Once alternate language versions are published, add `<link rel="alternate" hreflang="...">` tags to help search engines understand language variants.

### Low Priority

5. **Date/number formatting**: The current content does not include dynamic dates or numbers. When adding dynamic content, use the `Intl` API for localized formatting:
   ```javascript
   new Intl.DateTimeFormat('de-DE').format(date);
   new Intl.NumberFormat('es-ES').format(1234567);
   ```

---

## Verdict

**Localization Ready**: ❌ No

The page is correctly structured for English-only deployment with proper `lang="en"` declaration. However, it lacks any internationalization infrastructure needed to support multiple languages. All user-facing text is hardcoded, making translation impossible without code changes and a proper i18n refactoring.

**Estimated Effort**: Medium-High — Requires architectural decision about i18n approach, string externalization, and translation workflow setup.
