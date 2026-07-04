# Localization Review — Día de Muertos

**Variant**: dia-de-muertos
**Round**: 1
**Reviewer**: adversarial-reviews-agent
**Date**: 2026-07-01

## Score

- **Localization**: 92 / 100

## ✅ Passed

- `<html lang="en">` is correctly set on all 8 HTML pages:
  - index.html:2 — `<html lang="en">`
  - features.html:2 — `<html lang="en">`
  - clients.html:2 — `<html lang="en">`
  - download.html:2 — `<html lang="en">`
  - hub.html:2 — `<html lang="en">`
  - docs.html:2 — `<html lang="en">`
  - plugins.html:2 — `<html lang="en">`
  - about.html:2 — `<html lang="en">`
- No locale-unsafe `toLocaleString()` calls in `js/main.js` — confirmed by reading the full 70-line JS file (js/main.js:1–70). The script only contains: mobile nav toggle logic, `IntersectionObserver` for scroll reveals, `matchMedia` for `prefers-reduced-motion`, and class manipulation. No Date formatting, no number formatting, no locale-dependent string operations of any kind.
- No `Intl.DateTimeFormat`, `Intl.NumberFormat`, or other `Intl` API usage that would depend on system locale.
- Strings are consistently sourced from semantic HTML — all visible text comes from HTML elements (headings, paragraphs, list items, button labels, anchor text) rather than being injected via JavaScript. The content is static HTML, so a future translator would only need to update the HTML files or swap a translation layer.
- RTL safety — the codebase uses no `float: left` or `float: right` CSS properties anywhere. Layout uses CSS Flexbox (`.hero-cta`, `.nav-primary`, `.footer-nav`, `.pitch-bullets`, `.feature-cards`, `.client-cards`, `.download-cards`, `.ecosystem-list`) and CSS Grid (`.container`, `.content-grid`, `.feature-detail` via `grid-template-columns: auto 1fr`). Directional properties use `inline-start`/`inline-end` in some cases (`margin-inline: auto`, `padding-inline`) which are RTL-safe. No LTR-only `float: left` patterns found.
- `unicode-bidi: normal` is not overridden anywhere, so bidirectional text would render correctly if Arabic or Hebrew translations were added.
- Footer copyright "© 2026 Phlix — BSD-3-Clause" (static year, no `new Date().getFullYear()`) — no locale-dependent year formatting risk.
- All content is English (en). The `content.json` file specifies `"default_locale": "en"` and `"supported_locales": ["en"]` — consistent with what is built.
- `lang` attribute is set on the root `<html>` element, not on a wrapper div — this is the correct location for screen readers and search engines.
- Fonts are subset via `@font-face` with `font-display: swap` (once uncommented) — if a future translation adds extended Latin or accented characters, the font-stack fallback (Georgia, Times New Roman, serif) provides coverage. The brand fonts (Playfair Display, Lora, Cinzel Decorative) have broad Unicode coverage for Western European languages.

## ⚠️ Concerns (non-blocking)

- Strings are in static HTML files, not centralized in a `content.json` that feeds all pages. While this is a static site and not a JavaScript-driven app, the rubric's stated goal is that "strings come from one place so a future translator can swap them." Currently, the pitch bullets and feature bodies exist in multiple HTML files (index.html, features.html, about.html) — duplication means a translator would need to update multiple files. — Consolidate all page text into content.json-fed templates or, at minimum, use HTML includes (server-side) or a lightweight JS content loader to avoid duplication across index.html, features.html, and about.html.
- The `text-size-adjust: 100%` on `html` (base.css:14) is correct and prevents the browser from auto-scaling text in responsive layouts. However, this combined with `user-scalable=no` is sometimes used to force font scaling lock-down — confirmed that `user-scalable=no` is NOT in the viewport meta tag (index.html:5 shows `width=device-width, initial-scale=1` without `user-scalable=no`), so users can still pinch-zoom. This is correct behavior.

## ❌ Failures (must fix this round)

- No failures found. The site is fully English, `<html lang="en">` is on every page, no locale-unsafe APIs are used, no float:left/right patterns exist, and all text is in semantic HTML elements.

## Recommendations

1. Move repeated content (pitch bullets, feature bodies, FAQ) from multiple HTML files into a single content source (content.json + a lightweight JS loader or server-side includes) to enable single-point translation updates (impact: high, effort: medium)
2. Add `<link rel="alternate" hreflang="en" href="...">` canonical + alternate tags for future i18n readiness, even if only English is currently supported (impact: low, effort: low)
3. Add `dir="ltr"` explicitly to the `<html>` element (`<html lang="en" dir="ltr">`) for maximum clarity and future-proofing if RTL languages are ever added (impact: low, effort: trivial)

## Evidence

- `<html lang="en">` on index.html:2, features.html:2, clients.html:2, download.html:2, hub.html:2, docs.html:2, plugins.html:2, about.html:2
- No toLocaleString in js/main.js: full 70-line file read, zero Intl API usage
- No float:left/right: grep of all CSS files for `float:` — zero matches
- Flexbox layout for nav: `components.css:16–24` (`.nav-primary`)
- Grid layout for container: `theme.css:79–84` (`.container`)
- Footer copyright static year: grep of all HTML files for `getFullYear` — zero matches
- Viewport meta (no user-scalable=no): index.html:5
- content.json supported_locales: `content.json:7` — `["en"]`
