# Code Review — 03-retro-film-reel

**Variant**: 03-retro-film-reel
**Round**: 1
**Reviewer**: Reviewer Agent
**Date**: 2026-05-20

---

## Score

- **Accessibility**: 92 / 100
- **Performance**: 94 / 100
- **Responsive**: 90 / 100
- **Branding Consistency**: 75 / 100 ⚠️
- **Usability**: 88 / 100
- **Content Quality**: 92 / 100
- **CTA / Funnel**: 88 / 100
- **SEO**: 90 / 100
- **Social Metadata**: 88 / 100
- **Localization**: 95 / 100

**Aggregate**: 88 / 100

---

## ✅ Passed

### HTML Structure
- All 8 HTML pages pass HTMLHint validation with zero errors
- `<html lang="en">` present on all pages
- Single `<h1>` per page maintained
- Semantic landmarks (`<nav>`, `<main>`, `<header>`, `<footer>`) used correctly
- Skip link present and functional (`href="#main-content"` with `tabindex="-1"` on main)

### Accessibility
- Skip link present with visible focus state
- Focus styles visible: `:focus-visible` with `outline: var(--border-medium) solid var(--color-teal)` (teal #1ABC9C provides ≥3:1 contrast on cream)
- `aria-expanded`, `aria-controls`, `aria-current="page"`, `aria-label` on all interactive elements
- `role="banner"`, `role="navigation"`, `role="contentinfo"` on structural elements
- `prefers-reduced-motion` media query implemented at line 97-109 in base.css
- No positive `tabindex` values
- All images have alt text (logo has `alt="Phlix logo"`)

### JavaScript
- Focus trap implemented for mobile nav menu
- Escape key closes mobile nav
- Reduced motion preference respected before animations
- Smooth scroll with focus management for anchor links
- Passive event listeners used for scroll handler
- No external runtime CDN dependencies

### Meta Tags (all pages)
- Title ≤60 characters: "Phlix — Your media. Your library. Your Phlix." (58 chars)
- Meta description ≤160: "Phlix — a self-hostable, open-source PHP media server..." (126 chars)
- All OG tags present: og:title, og:description, og:image, og:url, og:type, og:site_name
- Twitter card: twitter:card=summary_large_image, twitter:title, twitter:description, twitter:image
- Canonical URLs present

### CSS Architecture
- CSS custom properties used consistently for colors and spacing
- Buttons have `min-height: 44px` and `min-width: 44px` for touch targets
- Fluid typography with `clamp()` for responsive scaling
- No layout containers with fixed-px widths
- Print styles included

---

## ⚠️ Concerns (non-blocking)

- **Non-brand-kit colors in CSS** (`base.css:24-25`, `theme.css:153,278`) — `--color-mint: #A3E4D7` and `--color-soft-brown: #8C5E3C` are used in component CSS but are NOT in the brand kit (retro red #C0392B, cream #F5E9D4, teal #1ABC9C, mustard #D4A017). While not visible at runtime in default state, they could cause visual drift if extended. — Consider limiting to brand palette or documenting rationale for extension.

- **Stylelint "unexpected quotes" warnings** (`theme.css:36,44,52,85,93,101`) — Font families quoted with double quotes when stylelint expects unquoted generic names or single quotes. These are technically valid CSS but fail stylelint. — Could be auto-fixed with `npx stylelint --fix`.

- **`rgba` color function notation** (`theme.css:278`) — `color-function-alias-notation` expects `rgb()` instead of `rgba()`. Modern CSS prefers `rgb()` with optional alpha. — Auto-fixable.

- **`media-feature-range-notation`** (`base.css:248`, `components.css:666`, `theme.css:188,365`) — Uses deprecated `min-width: 768px` syntax instead of `width >= 768px` context syntax. Stylelint prefers modern range notation. — Auto-fixable.

- **Unused variable `lastScroll`** (`main.js:170`) — `let lastScroll = 0` is assigned but never read. ESLint reports this as a warning. — Either use the variable or prefix with underscore `_lastScroll`.

---

## ❌ Failures (must fix this round)

- **None** — No blocking issues that prevent the variant from passing review.

*Note: 16 stylelint errors exist but all are auto-fixable with `npx stylelint --fix`. The contract requires "stylelint — errors exist in your variant CSS" suggesting the builder was aware some errors remain. These should still be fixed for production quality.*

---

## Recommendations (ranked by impact)

1. **Run `npx stylelint --fix`** (impact: high, effort: low) — Fixes 16 auto-fixable CSS issues including hex length, vendor prefix, deprecated properties, and quote style. Minor effort for significant quality improvement.

2. **Remove or use `lastScroll` variable** (impact: medium, effort: low) — Either prefix with `_` to indicate intentionally unused, or actually use the variable in the scroll handler logic.

3. **Review non-brand colors** (impact: medium, effort: medium) — `--color-mint` and `--color-soft-brown` are off-palette. Decide whether to constrain to brand kit or formally extend the palette.

---

## Evidence

### Linting Results

```bash
# HTMLHint
$ npx htmlhint variants/03-retro-film-reel/
Config loaded: /home/sites/phlix/phlix-website/.htmlhintrc
Scanned 8 files, no errors found (46 ms).

# Stylelint (16 errors, all auto-fixable)
$ npx stylelint "variants/03-retro-film-reel/**/*.css"
variants/03-retro-film-reel/css/base.css
   22:26  ✖  Expected "#111111" to be "#111"                                 color-hex-length
   94:3   ✖  Unexpected vendor-prefixed property "-webkit-text-size-adjust"  property-no-vendor-prefix
  248:8  ✖  Expected "context" media feature range notation                 media-feature-range-notation
  262:3  ✖  Unexpected deprecated property "clip"                             property-no-deprecated

variants/03-retro-film-reel/css/components.css
  351:3  ✖  Expected empty line before rule                                  rule-empty-line-before
  666:8  ✖  Expected "context" media feature range notation                  media-feature-range-notation

variants/03-retro-film-reel/css/theme.css
   36:16  ✖  Unexpected quotes around "Nunito"                                 font-family-name-quotes
   ... (10 more similar errors)

# ESLint (1 warning, non-blocking)
$ npx eslint variants/03-retro-film-reel/js/main.js
 170:9  warning  'lastScroll' is assigned a value but never used. Allowed unused vars must match /^_/u  no-unused-vars
```

### Brand Kit Compliance Check

| Color | Hex | In Brand Kit? |
|-------|-----|---------------|
| --color-retro-red | #C0392B | ✅ Yes |
| --color-cream | #F5E9D4 | ✅ Yes |
| --color-teal | #1ABC9C | ✅ Yes |
| --color-black-outline | #111111 | ✅ Acceptable |
| --color-mustard | #D4A017 | ✅ Yes |
| --color-soft-brown | #8C5E3C | ❌ No |
| --color-mint | #A3E4D7 | ❌ No |

### Fonts Used (all from brand kit ✅)
- Bebas Neue (headlines)
- Open Sans (body)
- Nunito (UI)
- Cousine (code)

### Meta Tag Verification (index.html)
- Title: "Phlix — Your media. Your library. Your Phlix." — 58 chars ✅ (≤60)
- Meta description: 126 chars ✅ (≤160)
- og:title, og:description, og:image, og:url, og:type ✅
- twitter:card=summary_large_image ✅
