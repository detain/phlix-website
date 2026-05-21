# Localization Review — 04-portal-hub-2

## Summary

| Aspect | Status | Notes |
|--------|--------|-------|
| HTML `lang` attribute | ✅ Pass | `lang="en"` correctly set on `<html>` element |
| User-facing HTML text | ⚠️ Hardcoded | All visible text is English-only, no i18n markup |
| Meta tags (SEO) | ⚠️ English-only | `description`, `og:description`, `twitter:description` hardcoded English |
| ARIA labels | ✅ Acceptable | Navigation and interactive elements use English — appropriate for English content |
| JavaScript strings | ✅ Acceptable | No user-facing strings in JS; only CSS class names and selectors |
| RTL support | ⚠️ Not implemented | No `dir` attribute; not applicable for English-only |

---

## Detailed Analysis

### ✅ HTML `lang` Attribute

The root `<html lang="en">` is correctly set in `index.html` (line 2) and all other pages. This is the single most important localization signal for screen readers and search engines.

### ⚠️ Hardcoded English Content

All visible user-facing text in `index.html` is hardcoded in English with no translation markup:

| Element | Line | Content |
|---------|------|---------|
| Page title | 6 | "Phlix — Connect everything. Control everything." |
| Meta description | 7 | Full English description |
| Hero heading | 91 | "Your media. Your library. Your Phlix." |
| Hero subtext | 92 | Full English paragraph |
| Feature headings | 127, 136, 145, etc. | English only |
| CTA buttons | 94-95 | "Get Phlix", "Read the docs" |

**No `data-i18n` attributes or similar translation key markers exist.**

### ⚠️ Meta Tags — SEO Critical

All meta tags used for SEO and social sharing are hardcoded English:

```html
<meta name="description" content="Self-hosted PHP media server with native apps...">
<meta property="og:description" content="Phlix — a self-hostable, open-source PHP media server...">
<meta property="twitter:description" content="Phlix — a self-hostable, open-source PHP media server...">
```

These would need translation files and runtime substitution if multilingual support is added.

### ✅ JavaScript

The `js/main.js` file contains no user-facing strings. All string literals are:
- CSS class names (`.glass-card`, `.revealed`, etc.)
- HTML attribute selectors
- CSS transform values
- No `aria-label` updates with translatable strings

### ⚠️ RTL / Direction Support

No `dir` attribute is present, and no CSS supports RTL layouts. This is not a defect for English-only content, but would need consideration for future locales (Arabic, Hebrew, etc.).

---

## Recommendations

### For English-Only Static Site (Current State)

No changes required. The implementation is consistent with other variants and appropriate for a single-language marketing site.

### If Multilingual Support Is Needed

1. **Translation infrastructure** — Add JSON locale files per language (e.g., `locales/en.json`, `locales/de.json`)
2. **HTML markup** — Add `data-i18n` attributes to translatable elements:
   ```html
   <h1 data-i18n="hero.heading">Your media. Your library. Your Phlix.</h1>
   ```
3. **i18n runtime** — Integrate a lightweight i18n library (e.g., vanilla JS or a small bundle) to swap content based on `lang` or user preference
4. **SEO meta tags** — Add `<link rel="alternate" hreflang="x">` tags and translate meta descriptions
5. **hreflang sitemap** — Consider adding `hreflang` entries in `sitemap.xml` if search engines need language variants
6. **RTL CSS** — Add `[dir="rtl"]` media query overrides for right-to-left languages

---

## Comparison to Project Norm

All five variants (01–05, Wave 2) use the same pattern: `lang="en"` on `<html>` with no translation markup. This is the project-wide convention for the static marketing site.

---

## Verdict

**Pass (English-only)** — The variant correctly sets `lang="en"` and has no localization defects. All text is in English, which is consistent with the project's current scope. No i18n infrastructure exists in this variant or across the project, which is appropriate for a single-language static site.
