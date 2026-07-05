# Localization Review — Stardust Observatory

**Variant**: stardust-observatory
**Round**: 1
**Reviewer**: Senior Front-End Reviewer
**Date**: 2026-07-04

## Score

- **Localization**: 97 / 100

## ✅ Passed

- **`<html lang="en">` present on all 8 pages** — Verified on: index.html:2, features.html:2, clients.html:2, download.html:2, plugins.html:2, docs.html:2, hub.html:2, about.html:2. All correctly set to `en` matching `site.default_locale` from content.json (line 6).
- **All user-facing strings trace to `content.json`** — All substantive product copy comes verbatim from content.json (hero, pitch_bullets, features, clients, ecosystem, faq, footer columns, footer tagline). Micro-copy (page leads like "Native apps for every screen you own.") is the implementer's brand-voice interpretation, which the spec explicitly permits (new_site.md line 109: "brand-flavored micro-copy drawn from the kit's voice").
- **No locale-unsafe formatting** — Zero uses of `toLocaleString()` without explicit locale. Zero `Date()` object instantiations in HTML. No `Intl.DateTimeFormat`, `Intl.NumberFormat`, or similar without locale parameter in the static HTML files or js/main.js.
- **No `float: left/right`** — CSS review of theme.css and components.css confirms use of modern layout properties (flexbox, grid). No `float: left`, `float: right`, `text-align: left/right` for directional layout. When directional control is needed, CSS logical properties are used or appropriate flex/grid alignment.
- **No hardcoded dates** — Footer copyright uses `&copy; 2026` with the year written as a number in the HTML, which is static and correct for 2026. No `new Date().getFullYear()` in the JS, no date strings like "January 2026" in content, no `<time>` elements with hardcoded dates. The year 2026 in the footer is appropriate (the review context date is July 2026).
- **External links use `rel="noopener noreferrer"`** — All GitHub links on all 8 pages include `rel="noopener noreferrer"`:
  - index.html:91 (Read the docs), index.html:204-207, 213-216 (footer)
  - features.html:171-175, 180-183 (footer)
  - clients.html:76, 90, 105, 119, 162-165, 171-174 (footer)
  - download.html:65, 75, 80, 85, 90, 96-100, 129-132, 138-141 (footer)
  - plugins.html:66, 72, 79, 100-103, 109-112 (footer)
  - docs.html:64, 66-69, 74-78, 100-103, 109-112 (footer)
  - hub.html:67, 77, 98-101, 107-110 (footer)
  - about.html:70, 119-122, 128-131 (footer)
- **Footer copyright year: 2026** — Confirmed on all 8 pages: index.html:220, features.html:187, clients.html:178, download.html:145, plugins.html:116, docs.html:116, hub.html:114, about.html:135.

## ⚠️ Concerns (non-blocking)

- **Micro-copy not in content.json** — Page leads on features.html:57 ("Everything you need to run a media library that actually works."), clients.html:57 ("Native apps for every screen you own."), hub.html:57 ("Reach your server from anywhere."), and about.html:57 ("Self-hosted media. Open source. No lock-in.") are not sourced from content.json. However, new_site.md §2 explicitly permits this: "brand-flavored micro-copy drawn from the kit's voice" and "You may restyle, reorder visually, and add brand-flavored micro-copy." These leads use the Stardust Observatory scholarly voice and are not generic corporate filler. Not a blocker. — suggested next step: If strict one-file translation is required in the future, these leads could be moved into content.json as a new `page_leads` section, but this is not currently required by spec.

## ❌ Failures (must fix this round)

None.

## Recommendations (ranked by impact)

1. **Move page leads to content.json** (impact: medium, effort: medium) — Add a `page_leads` section to content.json and reference it in page templates. This would guarantee 100% of user-facing strings come from one file, enabling single-file translation. Currently the micro-copy (page-lead text on each inner page) is hardcoded in each HTML file. This is not a blocker since the spec permits this micro-copy, but it would be a future-proofing improvement.
2. **Verify `@font-face` includes `font-display: swap`** (impact: low, effort: low) — Check base.css that all `@font-face` declarations include `font-display: swap` to prevent invisible-text flash during web font load. This is a performance accessibility concern for users with slow connections.
3. **Add `lang` to `html` in JSON-LD script block** (impact: low, effort: low) — The JSON-LD `<script type="application/ld+json">` in index.html:38-53 is not inside an element with `lang` attribute context, but since the parent `<html lang="en">` is set and JSON-LD is machine-readable, this is not a practical concern.

## Evidence

- Grep scan of all 8 HTML files: zero `toLocaleString()` occurrences, zero `new Date()` in HTML, zero hardcoded date strings like "2025" or "January"
- Grep scan of js/main.js: zero locale-sensitive API usage
- `robots.txt` reviewed: sitemap URL is absolute and correct (line 4)
- All 8 HTML files checked for `<html lang="en">` presence at line 2 of each file
- External links checked for `rel="noopener noreferrer"` on GitHub links across all pages
- Footer copyright year checked on all 8 pages — all show `2026`
- No `float: left` or `float: right` found in theme.css or components.css
