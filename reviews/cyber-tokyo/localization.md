# Localization Review — Cyber Tokyo

**Variant**: cyber-tokyo
**Round**: 1
**Reviewer**: Senior Front-End Code Reviewer
**Date**: 2026-07-01

## Score

- **Localization**: 89 / 100

## ✅ Passed

- **`<html lang="en">` present on every page**: Verified on all 8 HTML pages — `index.html:2`, `features.html:2`, `clients.html:2`, `download.html:2`, `plugins.html:2`, `docs.html:2`, `hub.html:2`, `about.html:2`. ✓
- **All user-visible strings trace to `content.json`**: Pitch bullets, feature titles, feature bodies, client names, client taglines, client highlights, FAQ questions and answers, footer tagline, footer column headings, footer links, ecosystem list — all sourced verbatim from `content.json`. ✓
- **No inline hard-coded dates**: Footer uses `© 2026` but this is a static year value, not dynamically generated. No `toLocaleDateString()`, `Date.prototype.toLocaleString()`, or similar locale-unsafe formatting found anywhere. ✓
- **No locale-unsafe number formatting**: No numbers formatted with locale-dependent separators. All numeric content is static or unit-agnostic. ✓
- **RTL safety — logical properties used**: `margin-inline: auto`, `padding-inline-start`, `inset: 0`, `margin-inline: auto` used throughout CSS. No `float: left` or `float: right` found in layout CSS. The grid layouts (`grid-template-columns`) are direction-neutral. ✓
- **Fonts use CJK fallbacks**: Space Grotesk has `'Noto Serif JP'` fallback, IBM Plex Sans has `'Noto Sans JP'` fallback. Noto CJK fonts will render kanji/katakana correctly if added to the font stack. ✓

## ⚠️ Concerns (non-blocking)

- **`© 2026` is hardcoded in all 8 pages**: `about.html:147`, footer of all pages. While acceptable for a static site, it means the year must be manually updated each year. For a production site, a server-side or JS-generated year would be more maintainable. — Non-blocking for a static marketing site; acceptable.
- **Footer links in HTML use absolute paths `/features`, `/clients`, etc.**: These link to absolute paths under `https://detain.github.io/phlix-website/` rather than relative paths. For a site that may be served from a subdirectory or different domain, these would break. However, the canonical URLs in the HTML are absolute and correct for the current deployment. — Non-blocking for current deployment; a relative link strategy would improve portability.

## ❌ Failures (must fix this round)

- **`robots.txt:3` — Sitemap URL in robots.txt is hardcoded to the GitHub Pages URL**: `Sitemap: https://detain.github.io/phlix-website/sites/cyber-tokyo/sitemap.xml`. If the site is served from a different domain or path, the robots.txt sitemap reference will be stale. This is the same issue as the footer links. — Change `robots.txt` to reference a relative path `Sitemap: /phlix-website/sites/cyber-tokyo/sitemap.xml` or make it relative to the domain.

## Recommendations (ranked by impact/effort)

1. **Make robots.txt sitemap URL relative** (impact: low, effort: low) — File: `robots.txt:3`. Change to `Sitemap: /phlix-website/sites/cyber-tokyo/sitemap.xml`.
2. **Consider making footer nav links relative (`href="features.html"` instead of `/features`)** (impact: low, effort: medium) — Currently all footer links use absolute paths which would break if the site is moved. Changing to relative links (as the nav already uses) would improve portability. Files: all HTML pages.
3. **Add a year JS snippet for footer copyright** (impact: low, effort: low) — `<script>document.write(new Date().getFullYear())</script>` pattern, but this adds JS dependency. Acceptable to leave as `2026` for a static site.

## Evidence

- `grep "lang=" /home/sites/phlix/phlix-website/sites/cyber-tokyo/*.html | sort -u` — all 8 pages have `lang="en"`.
- `grep -E "toLocaleString|Date\." /home/sites/phlix/phlix-website/sites/cyber-tokyo/*.html /home/sites/phlix/phlix-website/sites/cyber-tokyo/js/main.js` — zero locale-unsafe date/number formatting.
- `grep -E "float:\s*(left|right)" /home/sites/phlix/phlix-website/sites/cyber-tokyo/css/*.css` — zero float properties used in layout CSS.
- `grep "Noto" /home/sites/phlix/phlix-website/sites/cyber-tokyo/css/base.css` — Noto Serif JP and Noto Sans JP in font stacks.
