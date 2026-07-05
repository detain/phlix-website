# DIMENSION 12: Localization

## Score: 85/100
## Severity: ⚠️ (one spec violation, otherwise clean)

---

## Findings

### ✅ PASS — `<html lang="en">` set correctly on every page

All 8 pages have `<html lang="en">` at line 2. ✅

| Page | Line |
|------|------|
| index.html | 2 |
| features.html | 2 |
| clients.html | 2 |
| download.html | 2 |
| plugins.html | 2 |
| docs.html | 2 |
| hub.html | 2 |
| about.html | 2 |

### ✅ PASS — All user-facing strings trace back to content.json

All substantive product copy on every page was cross-checked against content.json:

| Content block | Verified source | Pages |
|---------------|-----------------|-------|
| hero.eyebrow ("Self-hosted media server") | content.json.hero.eyebrow | index.html:106 ✅ |
| hero.headline ("Your media. Your library. Your Phlix.") | content.json.hero.headline | index.html:107 ✅ |
| hero.subheadline | content.json.hero.subheadline | index.html:108 ✅ |
| primary_cta.label ("Get Phlix") | content.json.hero.primary_cta.label | index.html:110 ✅ |
| secondary_cta.label ("Read the docs") | content.json.hero.secondary_cta.label | index.html:111 ✅ |
| pitch_bullets (all 7) | content.json.pitch_bullets[] | index.html:121-127 ✅ |
| features (all 8) | content.json.features[] | index.html:137-212 + features.html:97-195 ✅ |
| clients (all 5) | content.json.clients[] | clients.html:97-166 ✅ |
| ecosystem (all 5) | content.json.ecosystem[] | download.html:128-147, docs.html:106-111 ✅ |
| faq (all 6) | content.json.faq[] | about.html:104-130 ✅ |
| footer.tagline ("Open-source media, on your terms.") | content.json.footer.tagline | All pages ✅ |
| footer.columns (3 columns × 4 links each) | content.json.footer.columns | All pages ✅ |

No hardcoded product claims, invented features, or off-brand copy was found. ✅

### ✅ PASS — No locale-unsafe formatting

No `Intl.DateTimeFormat`, `toLocaleDateString()`, `toLocaleNumberString()`, or similar locale-dependent APIs found in HTML or JavaScript. No hardcoded date or number formats that would break in other locales. ✅

### ⚠️ RECOMMENDED IMPROVEMENT — Google Fonts CDN link violates spec

**File:** `css/base.css:6-8`

```css
/* Google Fonts @import — self-hosting WOFF2 would require downloading files;
   using @import for practicality in this static site build */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Rajdhani:wght@500;600;700&family=Share+Tech+Mono&display=swap');
```

**The spec violation:** `new_site.md` §1 "Rules" explicitly states:

> "No CDN dependencies in the deployed page (no Google Fonts `<link>` to `fonts.googleapis.com`, no script CDNs). **Self-host fonts** as WOFF2 and declare them with `@font-face` + `font-display: swap`. (CDN font links are an explicit, previously-fixed regression — do not reintroduce them.)"

The `@import url('https://fonts.googleapis.com/...')` in base.css is a CDN dependency for fonts and must not be in the deployed output. The site's own comment acknowledges this ("self-hosting WOFF2 would require downloading files; using @import for practicality") — but "practicality" is not an exception permitted by the spec.

Additionally, all three font families declared in the Google Fonts URL (Inter, Rajdhani, Share Tech Mono) are declared via CSS custom properties (`--font-body`, `--font-headline`, `--font-mono`) and referenced throughout the CSS. If the Google Fonts CDN is unreachable or blocked, these fonts will fall back to the stack declared in `css/base.css:50-54` (e.g., `'Inter', 'Helvetica Neue', sans-serif`), but the brand's distinctive typographic identity (Rajdhani headlines, Share Tech Mono for readouts) would be lost.

**Recommended fix:** Download the WOFF2 files for Inter (400, 500), Rajdhani (500, 600, 700), and Share Tech Mono (400), place them in `css/fonts/`, and replace the `@import` with proper `@font-face` declarations using `font-display: swap`.

### ⚠️ RECOMMENDED IMPROVEMENT — CSS uses physical properties, not logical properties

**Files:** `css/theme.css`, `css/components.css`

The CSS consistently uses physical directional properties rather than logical properties:

- `css/theme.css:65` — `padding-inline: var(--container-padding)` (logical ✅)
- `css/theme.css:66` — `margin-inline: auto` (logical ✅)
- `css/components.css:89-90` — `padding-left`, `left` used in `.pitch-bullets li::before` (physical ❌)
- `css/components.css:183-184` — `top`, `bottom` in `.feature-card::before` (physical)
- `css/components.css:186-187` — `left: 0`, `top: var(--space-4)` in `.feature-card::before` (physical)

The spec §15 states: "Prefer logical properties (`inline-start/end`) over `left/right` so RTL stays possible."

Since the site is `lang="en"` only and no RTL layout is planned, this is a forward-compatibility recommendation rather than a hard failure. However, the `::before` pseudo-element positioning in `.pitch-bullets li` (physical `left: 0`) and `.feature-card::before` (physical `left`, `top`, `bottom`) could produce incorrect results in RTL layouts without adjustment.

---

## Verdict

The site correctly sets `<html lang="en">`, and all user-facing copy is properly sourced from content.json with no hardcoded strings or locale-unsafe formatting. The Google Fonts `@import` CDN link is a direct spec violation that should be addressed by self-hosting WOFF2 fonts. CSS physical vs. logical property usage is noted as a recommended improvement for RTL readiness but is not a current failure.
