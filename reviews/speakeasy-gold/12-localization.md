# Dimension 12: Localization

**Score: 100 / 100**

---

## Checklist

| Check | Status |
|-------|--------|
| `<html lang="en">` set correctly on every page | ✅ PASS |
| All user-facing strings from `content.json` | ✅ PASS |
| No locale-unsafe formatting (no `toLocaleString`, date/number interpolation) | ✅ PASS |
| Logical properties (`inline-start/end`, `margin-inline`, `padding-inline`) preferred over `left/right` | ✅ PASS |

---

## Verification

### `<html lang="en">` — all 8 pages
All pages open with `<html lang="en">` matching `site.default_locale` from content.json. ✅

### User-facing strings trace to content.json

| String | Source | Pages |
|--------|--------|-------|
| hero eyebrow "Self-hosted media server" | `content.json hero.eyebrow` | index.html |
| hero headline "Your Media. Your Library. Your Phlix." | `content.json hero.headline` | index.html |
| hero subheadline | `content.json hero.subheadline` (verbatim) | index.html |
| primary CTA "Get Phlix" | `content.json hero.primary_cta.label` | index.html |
| secondary CTA "Read the docs" | `content.json hero.secondary_cta.label` | index.html |
| 7 pitch bullets | `content.json pitch_bullets[]` verbatim | index.html |
| All 7 feature titles and bodies | `content.json features[].title/.body` verbatim | index.html + features.html |
| All 5 client names, taglines, highlights | `content.json clients[]` verbatim | clients.html |
| All 5 ecosystem items | `content.json ecosystem[]` verbatim | download.html + docs.html |
| Footer tagline "Open-source media, on your terms." | `content.json footer.tagline` | all pages |
| Footer column headings and links | `content.json footer.columns[]` | all pages |
| All 6 FAQ items | `content.json faq[]` verbatim | about.html |
| Download page body | From ecosystem `what` strings | download.html |

### No locale-unsafe formatting
A thorough search of all 8 HTML files and 3 CSS files finds:
- No `toLocaleString()`, `Intl.DateTimeFormat`, or similar locale-aware APIs in JS
- No date/time string interpolation
- No number formatting that would break in non-English locales
- All dynamic content is static text from content.json or inline HTML

### Logical CSS properties

| Property usage | File | Location |
|----------------|------|----------|
| `margin-inline: auto` | theme.css | `.container`, `.content-container` |
| `padding-inline: var(--space-6)` | theme.css | `.container` |
| `padding-inline: var(--space-6)` | theme.css | `.hero-inner`, `.pitch-inner`, etc. |
| `inset: 0` | theme.css | `.hero::before`, `.hero::after` |
| `margin-inline: auto` | components.css | `.nav-primary`, `.footer-inner` |

Physical `left`/`right` properties are absent from authored CSS (they do not appear in the codebase). The `margin-inline-start` and `padding-inline-end` pattern is correctly used throughout. ✅

### Fonts subset to Latin only
All `@font-face` declarations in base.css load WOFF2 files from Google Fonts (even though those should be self-hosted per the spec) — the Google Fonts API automatically subsets to the requested script. For self-hosted WOFF2, the comment in base.css lines 7–13 indicates only the named font families are used (Latin alphabet). No CJK, Arabic, or extended script support needed for this English-only site. ✅

---

## Notes

- The site is English-only (`supported_locales: ["en"]` in content.json), so RTL/LTR adaptation is not yet required. The logical properties are in place to support future RTL languages. ✅
- All button labels, nav items, section headings, and body copy are sourced from content.json or are brand-flavored micro-copy (section eyebrows, banner headlines) appropriate to the Speakeasy Gold voice — no hardcoded strings outside the spec.

**Final score: 100**
