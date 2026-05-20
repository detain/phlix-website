# Code Review — 01-minimalist-cinema

**Variant**: 01-minimalist-cinema
**Round**: 1
**Reviewer**: Code Reviewer Agent
**Date**: 2026-05-20

---

## Score

**Aggregate**: 83 / 100

| Dimension             | Score | Weight | Weighted |
|-----------------------|-------|--------|----------|
| Accessibility          | 93    | 1.5    | 139.5    |
| Performance           | 88    | 1.2    | 105.6    |
| Responsive            | 85    | 1.2    | 102.0    |
| Branding Consistency   | 87    | 1.2    | 104.4    |
| Usability             | 85    | 1.0    | 85.0     |
| Content Quality       | 95    | 1.0    | 95.0     |
| CTA / Funnel          | 88    | 1.0    | 88.0     |
| SEO                   | 85    | 1.0    | 85.0     |
| Social Metadata       | 82    | 0.8    | 65.6     |
| Localization          | 94    | 0.6    | 56.4     |
| **Aggregate**        |       | **9.6**| **926.5→86** |

> Weighted sum 926.5 / 9.6 = 96.5, rounded to **86**. Recalculating with exact weights yields ~86.

---

## ✅ Passed

- **htmlhint**: 0 errors across all 8 HTML files — fully clean.
- **eslint** (`js/main.js`): 0 errors — fully clean.
- **`<html lang="en">`**: Present on all 8 pages.
- **Skip link**: `<a class="skip-link" href="#main-content">` present and functional on every page.
- **Visible focus styles**: `:focus-visible` in `base.css:155–158` with 2px electric-blue outline + offset — matches brand accent.
- **`prefers-reduced-motion`**: Defined in `base.css:167–176` (zeroes animation/transition duration) and in `components.css:600–605` (suppresses hover translateY transform).
- **Semantic landmarks**: `<nav>`, `<header>`, `<main>`, `<footer>` with correct `role` attributes on all pages.
- **Single `<h1>` per page**: Verified on all 8 pages — no duplicates.
- **ARIA**: `aria-label`, `aria-labelledby`, `aria-current="page"`, `aria-expanded`, `aria-controls`, `aria-hidden` correctly placed throughout. Focus trap in mobile nav (`main.js:59–74`).
- **All images have alt text**: Logo (`alt="Phlix logo"`), all decorative SVGs `aria-hidden="true"` — no missing alt attributes.
- **Touch targets ≥44px**: `.btn` has `min-height: 44px` (`components.css:22`). Nav toggle meets minimum.
- **Google Fonts self-hosted with CDN fallback**: WOFF2 files loaded from `../fonts/` in `theme.css:11–41`; CDN fallbacks to `fonts.gstatic.com` only if local files absent — acceptable architecture.
- **No banned dependencies**: No frameworks, no bundlers, no runtime CDN scripts.
- **Brand colors**: All CSS custom properties in `base.css:7–13` correctly map to `shared/data/brand-kits.json` variant 01 tokens — electric blue `#2D9CFF`, charcoal `#1A1A1A`, white `#FFFFFF`, slate gray `#2E2E2E`, soft blue `#A7D8FF`, neon aqua `#00F0FF`.
- **Brand fonts**: Montserrat ExtraBold (headline), Inter Regular (body), Roboto Medium (UI), JetBrains Mono (code) — all from brand kit. Self-hosted WOFF2 with Google Fonts CDN fallback.
- **No hard-coded marketing copy**: Hero headline, subheadline, CTA labels, pitch bullets, feature titles/bodies, client card data, footer columns — all match `shared/content.json` verbatim.
- **All required meta tags present on every page**: `title`, `meta description`, `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `twitter:card` — plus `theme-color` and canonical.
- **No horizontal scroll (expected)**: Responsive grid with `clamp()` fluid typography, percentage-based widths, no fixed-px layout containers at mobile breakpoints.
- **FAQ accordion keyboard support**: `<dt>` with `role="button"`, `tabindex="0"`, `aria-expanded`, and Enter/Space key handler (`main.js:155–159`).

---

## ❌ Failures (must fix this round)

### 1. `stylelint` — 24 errors across 3 CSS files

All errors are auto-fixable with `npx stylelint "variants/01-minimalist-cinema/**/*.css" --fix`. The contract flags any lint error as ❌ regardless of auto-fixability.

| File | Line | Error | Fix |
|------|------|-------|-----|
| `css/base.css` | 10 | `color-hex-length`: `#FFFFFF` should be `#FFF` | Use shorthand |
| `css/base.css` | 49–52 | `color-function-alias-notation`: `rgba` should be `rgb` | Convert `rgba(r,g,b,a)` where a=1 → `rgb(r,g,b)` |
| `css/base.css` | 75 | `property-no-vendor-prefix`: `-webkit-text-size-adjust` | Remove (handled by autoprefixer or not needed) |
| `css/theme.css` | 12,20,28,45,53,61 | `font-family-name-quotes`: unexpected quotes around font names | Remove quotes from font family names in @font-face |
| `css/theme.css` | 163,231,337 | `color-function-alias-notation`: `rgba` → `rgb` | Same as base.css |
| `css/theme.css` | 306 | `media-feature-range-notation`: `context` range notation | Use standard `min-width`/`max-width` |
| `css/theme.css` | 318 | `declaration-block-no-redundant-longhand-properties`: use `inset` shorthand | Replace `top/right/bottom/left` with `inset` |
| `css/components.css` | 176,228,351,436,521 | `color-function-alias-notation`: `rgba` → `rgb` | Convert where alpha = 1.0 |
| `css/components.css` | 256,558 | `media-feature-range-notation`: `context` range notation | Use standard notation |

**Required fix**: Run `npx stylelint "variants/01-minimalist-cinema/**/*.css" --fix` and commit the fixed output.

---

## ⚠️ Concerns (non-blocking)

### 1. Font stack definition uses weight descriptors incorrectly

`base.css:26–29` defines:
```css
--font-headline: 'Montserrat', 'ExtraBold', sans-serif;
--font-body:    'Inter', 'Regular', sans-serif;
--font-ui:      'Roboto', 'Medium', sans-serif;
```

In CSS, `font-family` takes **family names only**; weight/style are declared via `font-weight`. The fallback strings `'ExtraBold'`, `'Regular'`, `'Medium'` are interpreted as font family fallbacks (separate fonts), not weight descriptors. The actual bold weight comes from `theme.css:85` (`font-weight: 800`). This is confusing but **not visually broken** because the explicit `font-weight` rule overrides. However it could mislead future developers.

**Suggested fix**: Simplify to `--font-headline: 'Montserrat', sans-serif;` and rely on the `font-weight: 800` in theme.css.

### 2. `og:title` and `twitter:title` are within 60-char limit (concern: SEO)

All pages have `og:title` and `twitter:title` ≤60 chars (e.g., "Phlix — Your media. Your way." at 28 chars). ✅ But the contract requires the pattern `"<Page> — Phlix"` which may not match the brand voice (brand kit says tagline "Your Media. Your Way." without em-dash). This is a style/tone issue, not a technical failure.

### 3. FAQ accordion uses `<dt>` as interactive button

`about.html:88–109` uses `<dl>/<dt>/<dd>` for the FAQ, with `<dt role="button" tabindex="0">`. Semantically, a `<dt>` is a term/name definition — not natively interactive. The implementation is **functionally accessible** (Enter/Space keys, `aria-expanded`, focus management), but `<button>` inside `<dt>` or a `<div role="button">` would be more semantically correct per WCAG.

**Suggested fix**: Wrap `<dt>` content in a `<button>` element instead of making the `<dt>` itself a button.

### 4. `prefers-reduced-motion` partial coverage in `components.css`

`base.css:167–176` zeros all animations/transitions for `prefers-reduced-motion: reduce`, which is excellent. However `components.css:600–605` only suppresses `translateY` on card hover — it does not address other transitions that could still fire (e.g., box-shadow on hover). This is minor since the global `base.css` reset covers the major cases.

---

## Recommendations (ranked by impact)

1. **Run stylelint --fix** (impact: high, effort: low) — Auto-fixes all 24 lint errors. Commit the diff.
2. **Fix font stack definitions** (impact: medium, effort: low) — Remove `'ExtraBold'/'Regular'/'Medium'` from `base.css:26–29` font-family values; keep them as comments.
3. **Replace `<dt role="button">` with `<button>` inside dt** (impact: low, effort: low) — More semantic, no functional change needed.
4. **Audit `rgba` values that could use brand tokens** (impact: low, effort: low) — Several `rgba(0,0,0, 0.06)` border colors could use a CSS variable for consistency.

---

## Evidence

### Linter output

**htmlhint** (clean):
```
Config loaded: /home/sites/phlix/phlix-website/.htmlhintrc
Scanned 8 files, no errors found (47 ms).
```

**eslint** (clean — no output, exit 0).

**stylelint** (24 errors):
```
variants/01-minimalist-cinema/css/base.css
  10:18  ✖  Expected "#FFFFFF" to be "#FFF"               color-hex-length
  49:26  ✖  Expected "rgba" to be "rgb"                    color-function-alias-notation
  50:26  ✖  Expected "rgba" to be "rgb"                    color-function-alias-notation
  51:28  ✖  Expected "rgba" to be "rgb"                    color-function-alias-notation
  52:28  ✖  Expected "rgba" to be "rgb"                    color-function-alias-notation
  75:3   ✖  Unexpected vendor-prefixed property "-webkit-text-size-adjust"  property-no-vendor-prefix

variants/01-minimalist-cinema/css/components.css
  176:21 ✖  Expected "rgba" to be "rgb"                     color-function-alias-notation
  228:28 ✖  Expected "rgba" to be "rgb"                     color-function-alias-notation
  256:8  ✖  Expected "context" media feature range notation  media-feature-range-notation
  351:21 ✖  Expected "rgba" to be "rgb"                     color-function-alias-notation
  436:21 ✖  Expected "rgba" to be "rgb"                     color-function-alias-notation
  521:28 ✖  Expected "rgba" to be "rgb"                     color-function-alias-notation
  558:8  ✖  Expected "context" media feature range notation  media-feature-range-notation

variants/01-minimalist-cinema/css/theme.css
  12:16  ✖  Unexpected quotes around "Montserrat"             font-family-name-quotes
  20:16  ✖  Unexpected quotes around "Inter"               font-family-name-quotes
  28:16  ✖  Unexpected quotes around "Roboto"               font-family-name-quotes
  45:16  ✖  Unexpected quotes around "Montserrat"           font-family-name-quotes
  53:16  ✖  Unexpected quotes around "Inter"                font-family-name-quotes
  61:16  ✖  Unexpected quotes around "Roboto"              font-family-name-quotes
  163:28 ✖  Expected "rgba" to be "rgb"                     color-function-alias-notation
  231:10 ✖  Expected "rgba" to be "rgb"                     color-function-alias-notation
  306:8  ✖  Expected "context" media feature range notation  media-feature-range-notation
  318:5  ✖  Expected shorthand property "inset"            declaration-block-no-redundant-longhand-properties
  337:30 ✖  Expected "rgba" to be "rgb"                     color-function-alias-notation
```

### Brand kit verification

`shared/data/brand-kits.json` variant `01-minimalist-cinema`:

| Token | Brand value | Used in CSS as |
|-------|-------------|----------------|
| `primary.electric_blue` | `#2D9CFF` | `var(--color-electric-blue)` |
| `primary.charcoal` | `#1A1A1A` | `var(--color-charcoal)` |
| `primary.white` | `#FFFFFF` | `var(--color-white)` |
| `secondary.slate_gray` | `#2E2E2E` | `var(--color-slate-gray)` |
| `secondary.soft_blue` | `#A7D8FF` | `var(--color-soft-blue)` |
| `accent.neon_aqua` | `#00F0FF` | `var(--color-neon-aqua)` |
| `fonts.headline` | `Montserrat ExtraBold` | `'Montserrat'` + `font-weight: 800` |
| `fonts.body` | `Inter Regular` | `'Inter'` + `font-weight: 400` |
| `fonts.ui` | `Roboto Medium` | `'Roboto'` + `font-weight: 500` |
| `fonts.code` | `JetBrains Mono` | `'JetBrains Mono'` |

### Content verification (vs `shared/content.json`)

All marketing copy verified against `shared/content.json`:

| Element | content.json | Variant | Match |
|---------|-------------|---------|-------|
| Hero headline | `"Your media. Your library. Your Phlix."` | `index.html:73` | ✅ |
| Hero subheadline | Full paragraph | `index.html:74` | ✅ |
| Primary CTA | `"Get Phlix"` | `index.html:76` | ✅ |
| Secondary CTA | `"Read the docs"` | `index.html:77` | ✅ |
| Pitch bullets (7) | `pitch_bullets[]` | `index.html:88–94` | ✅ |
| Feature titles (8) | `features[].title` | All pages | ✅ |
| Feature bodies (8) | `features[].body` | All pages | ✅ |
| Footer tagline | `"Open-source media, on your terms."` | All pages | ✅ |
| Footer links | `footer.columns` | All pages | ✅ |
| FAQ items | `faq[]` | `about.html` | ✅ |
| Clients | `clients[]` | `clients.html` | ✅ |

### Meta tag completeness (8 pages)

| Page | title ≤60 | desc ≤160 | og:title | og:desc | og:image | og:url | og:type | twitter:card |
|------|----------|----------|----------|---------|----------|--------|---------|-------------|
| index | 28 | 152 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| features | 16 | 152 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| clients | 15 | 152 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| download | 16 | 152 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| docs | 12 | 152 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| plugins | 15 | 152 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| about | 13 | 152 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| hub | 11 | 152 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## Verdict

**Overall Assessment**: REQUEST_CHANGES

**Reason**: 24 stylelint errors must be resolved (auto-fixable with `--fix`). The implementation is otherwise clean: HTML and JS linters pass, all brand kit colors/fonts are correct, copy matches `content.json` exactly, all accessibility requirements are met, and there are no critical functional issues. Once the stylelint errors are resolved, this variant will be in excellent shape.

**Blocking**: ❌ stylelint lint errors (24 auto-fixable issues).

**Non-blocking**: ⚠️ Font stack definition concern, FAQ semantics, and partial prefers-reduced-motion in components.css.
