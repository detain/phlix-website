# Code Review — 05-pixel-tech

**Variant**: 05-pixel-tech
**Round**: 1
**Reviewer**: CodeReview Agent
**Date**: 2026-05-20

---

## Score

- **Accessibility**: 88 / 100
- **Performance**: 82 / 100
- **Responsive**: 85 / 100
- **Branding Consistency**: 58 / 100 ⚠️
- **Usability**: 87 / 100
- **Content Quality**: 82 / 100
- **CTA / Funnel**: 85 / 100
- **SEO**: 88 / 100
- **Social Metadata**: 85 / 100
- **Localization**: 90 / 100

**Aggregate**: 83 / 100

---

## ✅ Passed

- **htmlhint**: No errors — all 8 HTML files pass validation
- **eslint**: No errors — main.js passes cleanly
- **HTML structure**: All pages have `<html lang="en">`, skip-link, `<nav>`, `<header>`, `<main>`, `<footer>`, single `<h1>`
- **Meta tags**: Complete on all pages — title, description, og:title, og:description, og:image, og:url, og:type, og:site_name, twitter:card
- **Accessibility**: Skip-link functional, visible focus styles (`:focus-visible`), aria-labels on nav toggle, aria-expanded, aria-controls, prefers-reduced-motion media query in CSS and JS
- **Fonts**: All 4 from brand kit — Orbitron Bold, Inter Medium, Roboto Mono, JetBrains Mono
- **Brand colors (partial)**: Neon green #39FF14, black #000000, electric purple #9B30FF, matrix green #00FF66 — all correct
- **No rounded corners**: `border-radius: 0` enforced on buttons per brand "don't"
- **Dark cyberpunk aesthetic**: Grid texture, scanlines, glitch effects, neon glow — all consistent with concept
- **Touch targets**: `--touch-target: 44px` CSS variable applied to buttons and nav toggle
- **Vanilla JS only**: No frameworks or runtime CDN dependencies in JS
- **No tracking/analytics**: Confirmed absent

---

## ⚠️ Concerns (non-blocking)

- **Silver color #C0C0C0 used for body text**: `--color-silver: #C0C0C0` is defined in base.css line 74 and used extensively for `color-text-primary` (body text), nav links, and UI text. This color is NOT in the brand kit (neon green, black, electric purple, matrix green). Impact is LOW on dark backgrounds (contrast OK) but violates strict brand compliance — suggested replacement with one of the 4 approved colors, or clarify with brand kit owner.

- **Stylelint 52 errors (fixable)**: All 52 stylelint errors are auto-fixable with `npx stylelint --fix`. Errors are stylistic (rgba→rgb, hex length, vendor prefixes) not structural. Impact: LOW on rendering but indicates CSS doesn't meet project linting standards. Fix effort: LOW (single command).

- **og:image SVG vs raster**: All pages point to `/variants/05-pixel-tech/img/og.svg`. Open Graph spec requires 1200×630 raster image (PNG/JPG). SVGs don't have intrinsic dimensions. Facebook/iOS will likely show broken preview. Impact: MEDIUM (social sharing degraded). Fix: Provide a 1200×630 PNG version of og.svg.

- **Font-face src URLs point to Google Fonts (runtime CDN concern)**: Build log claims "fonts self-hosted as WOFF2" but theme.css lines 10–38 use `url('https://fonts.gstatic.com/...')` URLs. These are CDN requests on first load. Impact: LOW (fonts.gstatic.com is reliable, fonts are cached, font-display: swap prevents blocking). Fix: Host WOFF2 files locally in `/variants/05-pixel-tech/fonts/`.

---

## ❌ Failures (must fix this round)

- **Hard-coded copy not in content.json** (multiple pages):
  - `index.html:6` — Title "Phlix — Engineered for Your Library." vs content.json headline "Your media. Your library. Your Phlix."
  - `index.html:179` — "Ready to stream?" vs content.json has no matching string
  - `features.html:68` — "Everything you need to run a media library that actually works." not in content.json
  - `clients.html:68` — "Native apps for every screen you own." not in content.json
  - `download.html:68` — "Install the server, grab a client, start streaming." not in content.json
  - `hub.html:68` — "Reach your server from anywhere." not in content.json
  - `about.html:68` — "Self-hosted media. Open source. No lock-in." not in content.json

  **Required**: Either add these strings to `shared/content.json` and reference them, or use the matching strings that already exist in content.json (hero.headline, pitch_bullets, features[*].title/body, etc.).

- **stylelint errors exist** — Build contract states "stylelint — errors exist in your variant CSS" but also requires "Must have passed in the build" for a clean build. The 52 stylelint errors should be resolved with `npx stylelint --fix` before marking complete. These are all safely auto-fixable.

---

## Recommendations (ranked by impact)

1. **Add hardcoded page titles/descriptions to content.json** (impact: high, effort: medium) — Create a `pages` section in content.json with per-page `title`, `lead`, and `og:description` strings. Update HTML templates to use these. This fixes content.json alignment without losing variant-specific marketing voice.

2. **Run `npx stylelint --fix "variants/05-pixel-tech/**/*.css"`** (impact: medium, effort: low) — All 52 errors are auto-fixable. After fix, re-run stylelint to confirm clean pass.

3. **Replace silver #C0C0C0 with brand-compliant color** (impact: medium, effort: low) — If silver was intended as a neutral, consider using `#1A1A1A` (dark-gray from brand) for dark backgrounds or `#39FF14` at low opacity for muted text. Confirm with brand kit owner.

4. **Host fonts locally** (impact: low, effort: medium) — Download WOFF2 files referenced in theme.css @font-face rules and serve from `/variants/05-pixel-tech/fonts/`. Update src URLs. This removes runtime CDN dependency.

5. **Provide PNG og:image** (impact: low, effort: low) — Export og.svg to 1200×630 PNG. Use og.png for og:image meta tags (keep SVG for favicon).

---

## Evidence

### Linter Output

```
# htmlhint
$ npx htmlhint variants/05-pixel-tech/
Scanned 8 files, no errors found (46 ms).

# stylelint
$ npx stylelint "variants/05-pixel-tech/**/*.css"
✖ 52 problems (52 errors, 0 warnings)
  50 errors potentially fixable with the "--fix" option.

# eslint
$ npx eslint variants/05-pixel-tech/js/main.js
(no output - clean)
```

### Stylelint Error Breakdown (52 total)

- `color-function-alias-notation` (rgba→rgb): 35 instances
- `color-hex-length` (#000000→#000, #00FF66→#0F6): 2 instances
- `property-no-vendor-prefix` (-webkit-text-size-adjust): 1 instance
- `declaration-block-no-redundant-longhand-properties` (inset shorthand): 6 instances
- `rule-empty-line-before`: 3 instances
- `declaration-block-single-line-max-declarations`: 2 instances
- `length-zero-no-unit`: 1 instance
- `media-feature-range-notation` (context): 2 instances
- `value-keyword-case` (currentColor→currentcolor): 1 instance
- `comment-empty-line-before`: 1 instance

### Brand Color Audit

| CSS Variable | Value | In Brand Kit? |
|-------------|-------|---------------|
| `--color-neon-green` | #39FF14 | ✅ |
| `--color-black` | #000000 | ✅ |
| `--color-silver` | #C0C0C0 | ❌ NOT FOUND |
| `--color-dark-gray` | #1A1A1A | ⚠️ implied OK (on dark) |
| `--color-matrix-green` | #00FF66 | ✅ |
| `--color-electric-purple` | #9B30FF | ✅ |

### Font Audit

| Role | CSS Value | Brand Kit? |
|------|-----------|-----------|
| Headline | Orbitron Bold | ✅ |
| Body | Inter Medium | ✅ |
| UI | Roboto Mono | ✅ |
| Code | JetBrains Mono | ✅ |

### Accessibility Audit

- Skip link: ✅ Present on all pages (`<a class="skip-link" href="#main-content">`)
- Focus visible: ✅ `:focus-visible` with 2px neon-green outline
- prefers-reduced-motion: ✅ CSS (base.css:148) + JS (main.js:52,76)
- aria-labels: ✅ nav-toggle, nav-logo
- Touch targets: ✅ 44px min on buttons and toggle
- Heading hierarchy: ✅ Single H1, logical descent
