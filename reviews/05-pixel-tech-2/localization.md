# Localization Review: 05-pixel-tech-2 (Wave 2)

## Summary

| Aspect | Status | Notes |
|--------|--------|-------|
| Language declaration | ✅ PASS | `<html lang="en">` correctly set on all pages |
| i18n infrastructure | ❌ FAIL | No translation mechanism present |
| hreflang tags | ❌ FAIL | No alternate language versions specified |
| Translated content | ❌ FAIL | All visible text is hardcoded English |
| SEO meta tags | ⚠️ WARN | Meta content English-only, no variants |
| Dynamic JS strings | ✅ PASS | Minimal JS; no hardcoded user-facing strings |

---

## Findings

### ✅ Passing

1. **Language declaration (index.html:2)**
   - `<html lang="en">` properly declared
   - Consistent across all 8 HTML pages

2. **Accessibility labels (index.html:64)**
   - `<button class="nav-toggle" aria-label="Toggle navigation"...>`
   - aria-labels present and meaningful

3. **Reduced motion preference (main.js:60-61, 86-87, 125-126, 228-229)**
   - Respects `prefers-reduced-motion` before applying animations
   - Good accessibility practice

### ❌ Failures

1. **No i18n infrastructure**
   - No `data-i18n` attributes on translatable elements
   - No translation JSON files or JS modules
   - All UI text hardcoded directly in HTML
   - If localization is needed, site would require complete rework

2. **No hreflang links**
   - No `<link rel="alternate" hreflang="...">` tags
   - No mechanism for multilingual SEO
   - Would need separate URLs per language (e.g., `/en/`, `/de/`)

3. **Hardcoded English strings throughout**
   - Navigation: "Home", "Features", "Clients", "Download", "Plugins", "Docs", "Hub", "About"
   - Hero section: "Your media. Your library. Your Phlix."
   - Skip link: "Skip to main content"
   - Buttons: "Get Phlix", "Read the docs", "Download Now"
   - Footer headings: "Product", "Developers", "Project"
   - Copyright: "© 2026 Phlix — BSD-3-Clause"

4. **SEO meta tags English-only**
   - `<title>`, `<meta name="description">`, `og:*`, `twitter:*` all in English
   - JSON-LD schema uses English terminology ("MultimediaApplication")
   - No localized equivalents for social sharing

### ⚠️ Warnings

1. **Copyright year hardcoded (index.html:237)**
   - `"© 2026 Phlix — BSD-3-Clause"` would need updating annually
   - Typical for static sites, but consider dynamic year

2. **No language switcher**
   - No UI element to indicate/change language
   - Single-language site with no localization path

---

## Recommendations

1. **Add i18n infrastructure** (if multilingual support planned)
   - Add `data-i18n` attributes to all translatable elements
   - Create `/locales/en.json`, `/locales/de.json`, etc.
   - Implement `i18n.js` module to swap text via data attributes

2. **Add hreflang for current language**
   ```html
   <link rel="alternate" hreflang="en" href="https://detain.github.io/phlix-website/">
   <link rel="alternate" hreflang="x-default" href="https://detain.github.io/phlix-website/">
   ```

3. **Externalize JS strings**
   - Move "Toggle navigation" aria-label to a config object for consistency

4. **Consider year dynamically**
   - Replace `"© 2026"` with JavaScript `new Date().getFullYear()`

---

## Files Reviewed

- `variants/05-pixel-tech-2/index.html`
- `variants/05-pixel-tech-2/download.html`
- `variants/05-pixel-tech-2/features.html`
- `variants/05-pixel-tech-2/js/main.js`
