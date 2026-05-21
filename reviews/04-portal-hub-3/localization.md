# Localization Review: 04-portal-hub-3

**Reviewer:** Localization Reviewer
**Date:** 2026-05-21
**Wave:** 3
**Variant:** 04-portal-hub-3

## Summary

| Aspect | Status | Notes |
|--------|--------|-------|
| Language declaration | PASS | All pages correctly declare `lang="en"` |
| Externalized strings | **FAIL** | All user-facing text hardcoded in HTML |
| i18n infrastructure | **FAIL** | No translation system, no i18n library |
| JavaScript i18n | N/A | No user-facing strings in JS |
| ARIA labels | PASS | All labels in English, appropriate for content |
| Meta tags | PASS | All meta content in English |

## Findings

### 1. Language Declaration (PASS)

All HTML documents correctly set `<html lang="en">`. This is essential for screen readers and search engines.

### 2. Hardcoded User-Facing Strings (CRITICAL)

All visible text is embedded directly in HTML markup with no externalization:

**index.html examples:**
- `Your media. Your library. Your Phlix.` (hero heading)
- `> Why Phlix?` (pitch heading)
- `> Everything your library needs` (features heading)
- `> Ready to stream?` (CTA banner)
- Footer columns: `Product`, `Developers`, `Project`
- `Open-source media, on your terms.` (footer tagline)
- `© 2026 Phlix — BSD-3-Clause` (copyright)

**features.html examples:**
- `> Loading features.dat` (eyebrow)
- `Everything you need to run a media library that actually works.` (page lead)
- All feature detail headings and descriptions

**download.html examples:**
- `> Initializing download manager...` (eyebrow)
- `Install the server, grab a client, start streaming.` (page lead)
- `> Server` and `> Clients` section headings
- Client names: `Roku`, `Samsung Tizen`, `Windows`, `Mobile (iOS + Android)`, `Any DLNA device`

**about.html examples:**
- `> Project info` (eyebrow)
- `About Phlix` / `Open-source media, on your terms.`
- All section headings (`What is Phlix?`, `The Ecosystem`, `Why "Phlix"?`, etc.)

### 3. Missing i18n Infrastructure (CRITICAL)

**No translation system exists:**
- No `.json` / `.yaml` translation files
- No i18n library (i18next, vue-i18n, etc.)
- No `data-i18n` attributes or similar
- No build-time string extraction
- No locale-specific routing (`/en/`, `/de/`, etc.)
- No RTL support mechanism
- No `hreflang` tags for alternate languages

**Meta tags lack i18n:**
```html
<!-- Missing: <link rel="alternate" hreflang="en" href="..."/> -->
<!-- Missing: <link rel="alternate" hreflang="de" href=".../de/..."/> -->
```

### 4. Copyright Year (MINOR)

Year `2026` is hardcoded in footers across all pages:
```html
<p class="footer-copy">© 2026 Phlix — BSD-3-Clause</p>
```
Manual update required annually.

### 5. JavaScript Review (PASS)

**js/main.js** contains no user-facing visible strings. All text content is:
- Code comments (developer-facing only)
- CSS selectors and class names
- Accessibility attribute values (`aria-expanded`, `aria-current`)

Dynamic CSS content added (`.revealed` class) contains no text.

## Recommendations

### High Priority

1. **Establish i18n infrastructure**
   - Choose a translation management approach (e.g., JSON files + build script, or CMS-based)
   - Add i18n library if dynamic content requires runtime translation
   - Implement `hreflang` tags for multi-language SEO

2. **Externalize all user-facing strings**
   - Extract all HTML text to translation files
   - Use semantic keys (e.g., `hero.heading`, `nav.features`, `footer.copyright`)
   - Update HTML to reference translation keys

### Medium Priority

3. **Add locale detection**
   - Implement browser language detection
   - Consider URL-based locale switching (`/en/`, `/de/`, etc.)

4. **Prepare for RTL languages**
   - Use logical CSS properties where possible
   - Test with `dir="rtl"` attribute

### Low Priority

5. **Automate copyright year**
   - Consider using JavaScript to generate current year dynamically
   - Or use server-side templating to inject year

## Action Items

| Item | Priority | Complexity |
|------|----------|-------------|
| Create translation JSON file structure | High | Medium |
| Extract strings from HTML to translation files | High | High |
| Add hreflang tags for alternate languages | Medium | Low |
| Implement locale routing | Medium | Medium |
| Add RTL support preparation | Low | Medium |
| Automate copyright year generation | Low | Low |

## Files Reviewed

- `variants/04-portal-hub-3/index.html`
- `variants/04-portal-hub-3/js/main.js`
- `variants/04-portal-hub-3/features.html`
- `variants/04-portal-hub-3/download.html`
- `variants/04-portal-hub-3/about.html`
