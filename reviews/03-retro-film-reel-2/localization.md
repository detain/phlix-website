# Localization Review: 03-retro-film-reel-2 (Wave 2)

## Summary

| Aspect | Status | Notes |
|--------|--------|-------|
| Language Declaration | PASS | `lang="en"` properly set on `<html>` |
| i18n Infrastructure | **CRITICAL** | No translation system present |
| Hardcoded Strings | **MAJOR** | All visible text is English-only |
| Meta Tags | **MAJOR** | No localized Open Graph / Twitter Card content |
| Accessible Labels | **MINOR** | ARIA labels hardcoded in English |
| Date/Time | **MINOR** | Footer year hardcoded as 2024 |
| hreflang Links | **MAJOR** | No alternate language versions declared |

---

## Critical Issues

### 1. No Internationalization Infrastructure

**Severity:** Critical

The codebase contains **zero** internationalization patterns. Every visible string is hardcoded directly into HTML:

```html
<!-- Examples of hardcoded text -->
<h1 class="hero__headline">Your media. Your library. Your <span>Phlix</span>.</h1>
<a href="/download" class="btn btn--primary">Get Phlix</a>
<span class="hero__eyebrow">Self-hosted media server</span>
```

**Recommendation:** Before launching multilingual support, establish an i18n architecture. Options include:

- **Simple approach:** JSON-based translation files (`i18n/en.json`, `i18n/es.json`, etc.) loaded at runtime
- **Standard approach:** `i18next` or similar library with namespace separation
- **PHP approach:** GetText (`.po`/`.mo` files) if content is dynamically rendered

### 2. Meta Tags Not Localized

**Severity:** Major

All meta tags are hardcoded in English with no locale variants:

```html
<meta property="og:title" content="Phlix — Timeless stories. Modern streaming.">
<meta name="twitter:title" content="Phlix — Timeless stories. Modern streaming.">
<meta name="description" content="Self-hostable PHP media server...">
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
<link rel="alternate" hreflang="en" href="https://phlix.io/">
<link rel="alternate" hreflang="es" href="https://phlix.io/es/">
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
<button class="menu-toggle" aria-label="Toggle menu" aria-expanded="false">
<a href="/" class="site-logo" aria-label="Phlix Home">
```

These should ideally be translatable for screen reader users in their language.

**Recommendation:** Use data attributes or a JS i18n object for ARIA labels, or accept hardcoding if only English is supported initially.

### 6. Footer Year Hardcoded

**Severity:** Minor

```html
<p>Open-source media, on your terms. © 2024 Phlix</p>
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

### Challenges for i18n
1. **Static HTML** makes traditional gettext impractical
2. **No build step** means no opportunity for string extraction at build time
3. **Self-hosted fonts** — good, won't break with CDN issues in other locales

### Recommended i18n Pattern (given current architecture)

Given the pure static nature, a runtime JSON-based solution is most practical:

```
/
├── index.html
├── i18n/
│   ├── en.json
│   ├── es.json
│   └── de.json
└── js/
    └── main.js (existing)
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

*Review Date: 2026-05-20*
*Reviewer: Localization Reviewer (Wave 2)*
*Files Reviewed: variants/03-retro-film-reel-2/index.html, variants/03-retro-film-reel-2/js/main.js*
