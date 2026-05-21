# Localization Review — 02-spotlight-projector-3 (Wave 3)

## Summary

| Aspect | Status | Notes |
|--------|--------|-------|
| Locale declaration | ✅ Pass | `<html lang="en">` correctly set |
| Content centralization | ⚠️ Partial | `content.json` exists but HTML has hardcoded strings |
| i18n infrastructure | ❌ Missing | No build-time substitution or data-i18n attributes |
| ARIA labels | ✅ Pass | All in English, matching content |
| Meta/localized content | ❌ Fail | All meta tags hardcoded English |
| hreflang alternate | ❌ Missing | No alternate language versions declared |
| translate attributes | ❌ Missing | No `translate="yes"` on translatable elements |
| Plural/gender forms | N/A | No complex i18n strings detected |
| RTL support | N/A | Single locale (en) currently |

---

## Detailed Findings

### 1. Locale Declaration ✅

```html
<html lang="en">
```

Correctly set at the document level. No inline `lang` overrides needed since all content is English.

---

### 2. content.json Structure ⚠️

**Positive:** The variant includes a `content.json` with centralized translatable strings:

```json
"default_locale": "en",
"supported_locales": ["en"],
```

**Issue:** The `index.html` and other HTML files do **not** consume these values. Instead, all user-facing text is hardcoded directly in the HTML markup:

```html
<!-- Hardcoded in HTML instead of sourced from content.json -->
<h1 id="hero-heading">Your media. Your library. Your Phlix.</h1>
```

This makes future translation impossible without manually replacing every string in every HTML file. For true i18n, the build system should replace placeholder tokens with values from `content.json`.

---

### 3. Missing i18n Infrastructure ❌

No evidence of internationalization infrastructure:

| Check | Present |
|-------|---------|
| `data-i18n` attributes | No |
| i18n key placeholders (e.g., `{{hero.headline}}`) | No |
| Build-time template substitution | No |
| Runtime i18n JS library | No |
| Translation files (`en.json`, `de.json`, etc.) | No |

**Recommendation:** If multi-locale support is planned, adopt a standard pattern:
- Add `data-i18n="hero.headline"` attributes to HTML elements
- Use a build tool (e.g., a simple Node script, or 11ty/ Metalsmith with i18n plugin) to substitute values at build time

---

### 4. Meta Tags — Hardcoded English ❌

All SEO and social meta tags are hardcoded English:

```html
<title>Phlix — Your media. Your library. Your Phlix.</title>
<meta name="description" content="Phlix: Self-hostable PHP media server...">
<meta property="og:title" content="Phlix — Your media. Your library. Your Phlix.">
<meta property="og:description" content="Phlix — a self-hostable, open-source PHP media server...">
<meta name="twitter:title" content="Phlix — Your media. Your library. Your Phlix.">
<meta name="twitter:description" content="Phlix — a self-hostable, open-source PHP media server...">
```

Schema.org JSON-LD is also hardcoded:
```json
"name": "Phlix",
"description": "Self-hostable open-source PHP media server...",
"applicationCategory": "MultimediaApplication",
"operatingSystem": "Linux, Roku, Samsung Tizen, Windows, iOS, Android",
```

---

### 5. hreflang Declarations ❌

No `<link rel="alternate" hreflang="...">` declarations exist. Since `supported_locales: ["en"]` only, this is technically fine for now, but if translations are added later, each page will need:

```html
<link rel="alternate" hreflang="de" href=".../de/index.html">
<link rel="alternate" hreflang="x-default" href=".../index.html">
```

---

### 6. translate Attribute ❌

No `translate="yes"` attributes on translatable elements. Per Google and WCAG guidelines, this attribute helps translation tools identify content that should be translated vs. UI chrome (like "Skip to main content" should likely remain in the page's language, but translatable content should be marked).

---

### 7. JavaScript (js/main.js) ✅

No issues. The JavaScript contains only behavioral code (nav toggle, smooth scroll, FAQ accordion). All user-visible strings are:
- ARIA attributes (sourced from HTML, correctly set)
- Key event names (`'Escape'`, `'Enter'`, `' '`) — standard and locale-independent
- No hardcoded English UI strings

---

### 8. ARIA Labels ✅

ARIA labels are present and correctly match their visible text:

```html
<button class="nav-toggle" aria-label="Toggle navigation">
<a class="nav-logo" aria-label="Phlix home">
```

No localized content in ARIA — all human-readable strings are in English.

---

## Recommendations

### Immediate (if keeping single-locale)

1. **Add `translate="yes"`** to all user-visible text containers for future-proofing:
   ```html
   <h1 id="hero-heading" translate="yes">Your media. Your library. Your Phlix.</h1>
   ```

2. **Document the content sourcing gap** — the VARIANT.md notes say "All marketing copy rendered verbatim from `shared/content.json`" but the HTML doesn't actually use it. If this is intentional (static site, no build step), that's fine. If translations are planned, this is a gap.

### If Adding i18n Support

1. **Introduce placeholder syntax** in HTML:
   ```html
   <h1 data-i18n="hero.headline">Your media. Your library. Your Phlix.</h1>
   ```

2. **Add translation files** alongside `content.json`:
   ```
   locales/
   ├── en.json   # source
   ├── de.json   # German
   └── fr.json   # French
   ```

3. **Add build-time substitution** — a simple Node script can replace `data-i18n` values before deployment.

4. **Add hreflang** to `<head>` for each locale version.

5. **Translate Schema.org JSON-LD** and Open Graph tags via build substitution.

---

## Verdict

**Overall: Needs Work**

The project has the *structure* for localization (`content.json`, `default_locale`/`supported_locales` config) but the HTML does not consume it — all visible content is hardcoded directly. If English-only is acceptable for the foreseeable future, this is a low-risk finding. If multi-locale support is planned, significant refactoring is needed before any translations can be added.

---

*Reviewer: Localization Reviewer — Wave 3*
*Date: 2026-05-21*
