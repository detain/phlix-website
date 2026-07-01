# Localization Review — Marina Breeze

**Dimension:** Localization
**Score:** 95/100
**Severity:** ✅ PASS

---

## Findings

### ✅ PASS — `<html lang="en">` on All 8 Pages
All 8 pages have `<html lang="en">` ✅
(index.html:2, features.html:2, clients.html:2, download.html:2, plugins.html:2, docs.html:2, hub.html:2, about.html:2)

### ✅ PASS — Strings Traceable to content.json
All user-facing content strings are from `content.json`:

| String | Source | Usage |
|--------|--------|-------|
| "Self-hosted media server" | content.json.hero.eyebrow | index.html:82 ✅ |
| "Your media. Your library. Your Phlix." | content.json.hero.headline | index.html:83 ✅ |
| "Get Phlix" | content.json.hero.primary_cta.label | All pages ✅ |
| "Read the docs" | content.json.hero.secondary_cta.label | index.html:87 ✅ |
| All 7 pitch bullets | content.json.pitch_bullets | index.html:97-103 ✅ |
| All 8 feature titles + bodies | content.json.features | index.html + features.html ✅ |
| All 5 client names + taglines | content.json.clients | clients.html + download.html ✅ |
| All 5 ecosystem items | content.json.ecosystem | download.html + docs.html ✅ |
| All 6 FAQ items | content.json.faq | about.html ✅ |
| Footer tagline + 3 column headings + links | content.json.footer | All pages ✅ |

### ✅ PASS — CSS Logical Properties Used
Checked for non-logical directional properties:

- `base.css:91-92` — `margin-inline: auto` (logical, not `margin: 0 auto`) ✅
- `base.css:92` — `padding-inline: var(--space-6)` (logical, not `padding-left/right`) ✅
- `theme.css:88-93` — `.container { margin-inline: auto; padding-inline: var(--space-6); }` ✅
- `theme.css:96-99` — `.container-narrow { margin-inline: auto; }` ✅

No instances of `margin-left`, `margin-right`, `padding-left`, `padding-right` used in layout CSS ✅

### ✅ PASS — Flexbox Uses Logical Axes
All flexbox usage uses standard flow-relative directions:
- `flex-wrap: wrap` — works in both LTR and RTL ✅
- `flex-direction: column` — works in both LTR and RTL ✅
- `align-items` / `justify-content` — standard CSS box alignment, RTL-safe ✅

### ✅ PASS — Grid Layout Uses Flow-Relative
CSS Grid auto-placement works RTL-safe:
- `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` — adapts to available space in both writing directions ✅

### ✅ PASS — No Locale-Specific Formatting
No JavaScript `Date.toLocaleString()`, `Number.toLocaleString()`, or locale-sensitive string interpolation. All dates in sitemap.xml use ISO 8601 format (`2026-07-01`) ✅

### ⚠️ WARNING — Ecosystem Item Uses Inline Style
**Files:** `download.html:145`, `docs.html:97`

```html
<div style="display:grid;gap:var(--space-4);max-width:720px;margin-top:var(--space-6)">
```

The `margin-top` uses a physical property (top) in an inline style. In RTL, `margin-top` remains `margin-top` (physical), but the inline style bypasses the CSS cascade. However, `margin-top` is direction-agnostic (always the block direction, not inline), so this is not actually a problem. The `display:grid` and `gap` are also direction-agnostic. No RTL issue here.

### ⚠️ NOTE — Font Subsetting
No font subsetting is applied. All WOFF2 files contain full character sets. For an English-only site, Latin subset would reduce font size but this is a performance optimization, not a localization failure.

### ⚠️ NOTE — RTL Not Tested
The site's RTL behavior has not been physically tested, but the CSS uses logical properties throughout and no writing-mode-dependent features are used. The structural foundation is RTL-ready.

---

## Summary

**Score: 95/100 — ✅ PASS**

Localization readiness is strong. `<html lang="en">` is set on all pages. All user-facing strings trace back to `content.json`. CSS uses logical properties (`margin-inline`, `padding-inline`) rather than physical directions throughout the stylesheet. Flexbox and Grid layouts are flow-relative. No locale-specific formatting. Font subsetting could be improved for performance, but that's a bonus, not a requirement.

The inline `style` on ecosystem-item containers is not a localization failure (the properties used are direction-agnostic). The main thing preventing 100 is the font subsetting gap, but that's a performance/localization hybrid issue.
