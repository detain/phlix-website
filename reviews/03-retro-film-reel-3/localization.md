# Localization Review: 03-retro-film-reel-3 (Wave 3)

## Summary

| Aspect | Status | Notes |
|--------|--------|-------|
| Language Declaration | PASS | `lang="en"` properly set on `<html>` |
| i18n Infrastructure | **CRITICAL** | No translation system present |
| Hardcoded Strings | **MAJOR** | All visible text is English-only |
| Meta Tags | **MAJOR** | No localized Open Graph / Twitter Card content |
| Accessible Labels | **MINOR** | ARIA labels hardcoded in English |
| Date/Time | **MINOR** | Footer year hardcoded as 2026 |
| hreflang Links | **MAJOR** | No alternate language versions declared |

---

## Critical Issues

### 1. No Internationalization Infrastructure

**Severity:** Critical

The codebase contains **zero** internationalization patterns. Every visible string is hardcoded directly into HTML:

```html
<!-- Examples of hardcoded text -->
<h1 id="hero-heading">Your media. Your library. Your Phlix.</h1>
<p class="hero-eyebrow">Self-hosted media server</p>
<a href="./download.html" class="btn btn-primary btn-large">Get Phlix</a>
```

This is identical to the Wave 2 variant, indicating no i18n improvements were made between waves.

**Recommendation:** Before launching multilingual support, establish an i18n architecture. Options include:

- **Simple approach:** JSON-based translation files (`i18n/en.json`, `i18n/es.json`, etc.) loaded at runtime
- **Standard approach:** `i18next` or similar library with namespace separation
- **PHP approach:** GetText (`.po`/`.mo` files) if content is dynamically rendered

### 2. Meta Tags Not Localized

**Severity:** Major

All meta tags are hardcoded in English with no locale variants:

```html
<title>Phlix — Timeless stories. Modern streaming.</title>
<meta property="og:title" content="Phlix — Timeless stories. Modern streaming.">
<meta name="twitter:title" content="Phlix — Timeless stories. Modern streaming.">
<meta name="description" content="Self-hostable PHP media server for Roku, Samsung Tizen, Windows, and Mobile. SyncPlay, Live TV, transcoding, DLNA support.">
```

Open Graph and Twitter Card meta tags will display English content when shared in non-English contexts, degrading SEO and user experience.

**Recommendation:** Implement localized meta tags. When locale is `es`, serve:
```html
<meta property="og:title" content="Phlix — Historias eternas. Streaming moderno.">
```

---

## Major Issues

### 3. No hreflang Declaration

**Severity:** Major

No `<link rel="alternate" hreflang="...">` tags exist to declare available language versions. This is essential for:
- Google to serve the correct localized page in search results
- Proper SEO for multilingual sites

**Recommendation:** Add hreflang links to the `<head>`:
```html
<link rel="alternate" hreflang="en" href="https://phlix.io/variants/03-retro-film-reel-3/">
<link rel="alternate" hreflang="es" href="https://phlix.io/variants/03-retro-film-reel-3/es/">
```

### 4. No Language Switcher

**Severity:** Major

The navigation contains no mechanism for users to switch between language versions.

**Recommendation:** Add a language selector (flag icons, globe icon + code, or text dropdown) in the header.

---

## Minor Issues

### 5. ARIA Labels Hardcoded

**Severity:** Minor

Accessible labels are written in English directly in HTML:

```html
<button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
<a class="nav-logo" aria-label="Phlix home">
<a class="skip-link" href="#main-content">Skip to main content</a>
```

These should ideally be translatable for screen reader users in their language.

**Recommendation:** Use data attributes or a JS i18n object for ARIA labels, or accept hardcoding if only English is supported initially.

### 6. Footer Year Hardcoded

**Severity:** Minor

```html
<p class="footer-copy">© 2026 Phlix — BSD-3-Clause</p>
```

**Recommendation:** Use JavaScript to dynamically insert the current year:
```javascript
document.getElementById('footer-year').textContent = new Date().getFullYear();
```

---

## Architecture Notes

### Current State
- **Pure static HTML/CSS/JS site** — no build step, no bundler
- **No framework** — vanilla JS only
- **No translation files** — content lives in HTML

### Comparison to Wave 2

The Wave 3 variant is **identical** to Wave 2 in terms of internationalization:
- No new i18n files added
- No language detection logic
- No translation infrastructure
- All strings remain hardcoded

### Challenges for i18n
1. **Static HTML** makes traditional gettext impractical
2. **No build step** means no opportunity for string extraction at build time
3. **Self-hosted fonts** — good, won't break with CDN issues in other locales

### Recommended i18n Pattern (given current architecture)

Given the pure static nature, a runtime JSON-based solution is most practical:

```
variants/03-retro-film-reel-3/
├── index.html
├── i18n/
│   ├── en.json
│   ├── es.json
│   └── de.json
└── js/
    ├── main.js (existing)
    └── i18n.js (new — translation loader)
```

**`i18n/en.json` example:**
```json
{
  "nav.home": "Home",
  "nav.features": "Features",
  "hero.eyebrow": "Self-hosted media server",
  "hero.headline": "Your media. Your library. Your {brand}.",
  "meta.description": "..."
}
```

---

## Verification Checklist

- [ ] `lang` attribute correctly set on `<html>`
- [ ] All visible strings externalized to translation files
- [ ] Translation loading logic implemented
- [ ] ARIA labels translatable
- [ ] Meta tags localized per language
- [ ] `hreflang` tags added to `<head>`
- [ ] Language switcher UI implemented
- [ ] Date/year dynamically generated or localized
- [ ] Language detection (browser preference → stored preference) working
- [ ] `<html>` `dir` attribute set for RTL languages (if supported)

---

## Compliance

| Requirement | Current | Target |
|------------|---------|--------|
| WCAG 3.1 (Language of page) | ✓ | ✓ |
| WCAG 3.1.1 (Language of parts) | ✗ | TBD |
| hreflang for SEO | ✗ | Required |
| User-selectable language | ✗ | Required |

---

## Priority Recommendations

1. **Immediate:** Establish i18n JSON structure and loader
2. **Before launch:** Add hreflang tags + localized OG/Twitter meta
3. **Post-MVP:** Build language switcher UI, translate all strings

---

## JavaScript Analysis

The `main.js` file contains the following user-facing strings that would require translation:

```javascript
// Line 19 - aria-expanded is boolean, not translatable
// Lines 22-27 - Focus management, no visible strings
// Lines 36-43 - Escape key handling, no visible strings
// Lines 45-60 - Focus trap logic, no visible strings
// Lines 96-118 - Typewriter effect
//   - Speed text 'ms per character' is a comment, not user-visible
// Lines 122-171 - Entrance animations, no visible strings
// Lines 175-188 - Header scroll effect, no visible strings
```

The JavaScript itself contains no hardcoded user-visible strings beyond what's already in the HTML. The typewriter effect pulls text from existing DOM elements which would need to be translated at the HTML level first.

---

*Review Date: 2026-05-21*
*Reviewer: Localization Reviewer (Wave 3)*
*Files Reviewed: variants/03-retro-film-reel-3/index.html, variants/03-retro-film-reel-3/js/main.js*
