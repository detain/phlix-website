# Localization Review — Psychedelic Groove

**Variant**: psychedelic-groove
**Round**: 2
**Reviewer**: Code Review Agent
**Date**: 2026-07-04

## Score

- **Localization**: 92 / 100

## ✅ Passed

- **lang attribute set on all 8 pages** — All HTML documents open with `<html lang="en">`. The lang attribute is correctly set to "en" matching content.json's `default_locale: "en"`. ✓
- **Strings trace to content.json** — All substantive product copy (hero, pitch bullets, features, clients, ecosystem, FAQ, footer columns, meta descriptions) comes from content.json and is identical across all 8 pages. The only local deviations are brand-flavored micro-copy (eyebrow text, CTA banner body text, brand-specific styling). All content.json fields are used verbatim where required by new_site.md §2. ✓
- **No locale-unsafe toLocaleString()** — The only JS on the site is main.js (navigation toggle, reduced-motion, scroll reveal) and the inline footer-year script. None use `toLocaleString()`, `Date.toLocaleDateString()`, or locale-sensitive number formatting. The footer-year uses `new Date().getFullYear()` which is locale-safe. ✓
- **No hardcoded date/number formats** — All dates use string values ("weekly"/"monthly" in sitemap.xml). No number formats that could break in different locales. ✓
- **RTL safety — logical properties used in many places** — The CSS uses logical properties: `margin-inline: auto` (theme.css:64, 72), `padding-inline: var(--space-6)` (theme.css:65, 72), `text-align: center`. These properties automatically flip for RTL layouts. ✓
- **Font subset to needed scripts** — Self-hosted fonts in css/fonts/ are Latin-subset WOFF2 files. ✓
- **Single default_locale** — content.json specifies `"default_locale": "en"` and `"supported_locales": ["en"]`. The site has only one locale, correctly implemented. ✓
- **No inline RTL-specific CSS** — No `float: left` or `float: right` hardcoded in layout CSS. All margins use logical properties or component-level classes. ✓

## ⚠️ Concerns (non-blocking)

- **Inconsistent use of logical vs physical properties** — Some CSS still uses physical properties: `margin-left: var(--space-4)` (base.css:163 for skip-link), `top: -100%` (base.css:162), `left: 0` (base.css:163), `top: var(--space-4)` (base.css:177). The skip-link uses absolute positioning with `left: var(--space-4)`. For full RTL support, this would need to be `inset-inline-start` instead of `left`. Impact is low — the skip-link is a minor accessibility feature.

- **Webkit scrollbar styling** — base.css:200-216 uses `::-webkit-scrollbar` which is vendor-prefixed and not RTL-specific. Scrollbar styling is cosmetic and typically not locale-sensitive.

- **Limited RTL testing surface** — Since the site is English-only with no RTL content, RTL readiness cannot be fully verified. However, the logical properties used suggest the structure would accommodate RTL if content were added later.

## ❌ Failures (must fix this round)

None — no must-fix localization failures found. The `<html lang="en">` is set, strings are centralized in content.json, no locale-unsafe formatting is used, and the CSS architecture is mostly RTL-safe. This round's fixes (Google Fonts CDN removal, aria-hidden partial fix, component hover fixes) do not affect localization.

## Recommendations (ranked by impact)

1. **Audit skip-link positioning for RTL** (impact: low, effort: low) — The skip-link at base.css:160-178 uses `left: var(--space-4)` and `top: -100%` / `top: var(--space-4)`. For full RTL support, consider using `inset-inline-start` (logical property) instead of `left`. This would allow `direction: rtl` to automatically flip the skip-link to the correct side.

2. **Consider adding a `dir="rtl"` HTML attribute mechanism** (impact: low, effort: low) — For a purely English site, this is premature. But if RTL languages are ever planned, the `<html>` element would need `dir="rtl"` in addition to `lang="ar"`, etc.

## Evidence

- Verified `<html lang="en">` on all 8 pages
- Verified content.json strings used verbatim in HTML
- Searched main.js for `toLocaleString`, `Date.`, `Intl.`, locale-sensitive APIs — none found
- Verified logical properties usage: margin-inline, padding-inline, inset
- Verified no float: left/right in layout CSS
- Verified self-hosted font files are Latin-subset
