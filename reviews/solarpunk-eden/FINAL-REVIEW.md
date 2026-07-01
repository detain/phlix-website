# FINAL REVIEW — Solarpunk Eden

**Variant**: solarpunk-eden
**Reviewer**: adversarial-brand-consistency-reviewer
**Date**: 2026-07-01
**Status**: ❌ NOT READY — blockers remaining

---

## Dimension Score Summary

| # | Dimension | Score | Severity |
|---|-----------|-------|----------|
| 1 | Brand fidelity & spirit | 81 / 100 | ⚠️ |
| 2 | SEO | 88 / 100 | ⚠️ |
| 3 | Readability | 92 / 100 | ✅ |
| 4 | Spelling & grammar | 95 / 100 | ✅ |
| 5 | Usability | 87 / 100 | ⚠️ |
| 6 | Accessibility | 84 / 100 | ⚠️ |
| 7 | Responsive | 85 / 100 | ⚠️ |
| 8 | Performance | 88 / 100 | ⚠️ |
| 9 | Content accuracy | 98 / 100 | ✅ |
| 10 | CTA / funnel | 91 / 100 | ✅ |
| 11 | Social metadata | 82 / 100 | ⚠️ |
| 12 | Localization | 93 / 100 | ✅ |

**Weighted aggregate**: 87 / 100

**Lowest-scoring dimension**: Social metadata (82) and Brand fidelity (81)

---

## ❌ Blockers — Must Fix Before Approval

### 1. Hero Vine Animation — `prefers-reduced-motion` Not Honored
- **File**: `index.html:96-102` (`.hero-vine` SVG)
- **Issue**: SVG vine animation plays unconditionally; `.reveal` animations are correctly gated but `.hero-vine` is not. Violates kit `accessibility.motion_reduction`.
- **Fix**: Add `@media (prefers-reduced-motion: reduce) { .hero-vine { opacity: 0.4; animation: none; } }` to `components.css`

### 2. Token Architecture Breach — Raw Hex in Gradient
- **File**: `theme.css:107` and `theme.css:275`
- **Issue**: `background: linear-gradient(160deg, var(--color-canopy) 0%, #4AADCF 100%)` uses raw hex `#4AADCF` instead of `var(--color-sky-prism)`. Violates new_site.md §6 "No raw off-palette hex in component CSS."
- **Fix**: Replace `#4AADCF` with `var(--color-sky-prism)`

### 3. Missing 404.html
- **File**: N/A — file does not exist
- **Issue**: No custom 404 page. Nielsen "error recovery" gap; WCAG 2.2 failure.
- **Fix**: Create `404.html` with site header/footer, friendly message ("This garden bed is empty — let's find your way back"), links home and docs

### 4. og:image Is SVG, Not PNG
- **File**: All 8 HTML pages (`og:image content=".../img/og.svg"`)
- **Issue**: new_site.md §8 explicitly requires a rasterized 1200×630 `og.png`. SVG is technically valid but spec-violating.
- **Fix**: Generate `img/og.png` at 1200×630 and update all `og:image` meta tags

---

## ⚠️ Non-Blocking Issues (Should Be Addressed)

1. **Frond mascot entirely absent** — kit `mascot{}` section (lines 519-536) defines Frond as a signature element for empty states, onboarding, and celebrations. None present anywhere on site. (Brand fidelity — score 81)

2. **Mobile nav uses hamburger instead of bottom tab bar** — kit `responsive_behavior.mobile` explicitly calls for "bottom tab bar with leaf-icon active indicator"; site uses standard hamburger at 768px. (Responsive — score 85, Brand fidelity — score 81)

3. **Hero eyebrow text contrast** — `rgba(244,239,224,0.75)` on gradient = ~4.3:1, just below 4.5:1 AA for what counts as body text (14px uppercase). (Accessibility — score 84)

4. **"Ecosystem plugins" section is empty stub** — `plugins.html:71-72` has no actual plugin list. (Usability — score 87)

5. **about.html:65** uses "BSD-3" shorthand instead of "BSD-3-Clause" (used correctly elsewhere on same page). (Spelling — score 95)

6. **hub.html CTA mismatch** — heading "Try the public Hub" with button "Get started" → download.html. Slightly mismatched. (CTA — score 91)

---

## ✅ Dimensions Passing (Score ≥ 90)

- **Readability** (92): Line length 60-72ch, line-height 1.7, appropriate reading level, clear hierarchy
- **Spelling & grammar** (95): Zero typos, no forbidden words, kit vocabulary used naturally
- **Content accuracy** (98): Every technical claim verified — PHP 8.3+, Workerman 5.x, JWT+Argon2ID, TMDB/TVDB/Fanart/NFO, SyncPlay NTP, DLNA, LifecycleInterface, BSD-3-Clause. No invented features.
- **CTA / funnel** (91): Primary CTA above fold with ≥3:1 contrast, ≤2 clicks to download, no traps, no forced gates
- **Localization** (93): `<html lang="en">`, logical CSS properties, all content from content.json, no locale-unsafe formatting

---

## Required Actions (Priority Order)

1. **[HIGH]** Fix `prefers-reduced-motion` for `.hero-vine` — `components.css` or `theme.css`
2. **[HIGH]** Replace raw hex `#4AADCF` with `var(--color-sky-prism)` — `theme.css:107, 275`
3. **[HIGH]** Create `404.html` with site shell
4. **[HIGH]** Replace `og.svg` with `og.png` (1200×630) and update all `og:image` meta tags
5. **[MEDIUM]** Add Frond mascot SVG to at least one page (e.g., homepage hero or features overview as illustration)
6. **[MEDIUM]** Implement bottom tab bar for mobile per kit `responsive_behavior.mobile` spec

---

## What Is Working Well

- Brand color system is thorough and well-implemented: CSS custom properties for every token, shadows green-tinted, warm parchment backgrounds, correct button shapes and radii
- Logo SVG is excellent — art nouveau botanical oval, vine stems, honeybee silhouette, leaf flourishes — clearly the strongest brand element on the site
- Content accuracy is near-perfect: every technical claim verified and correct
- Font stack correct: Playfair Display / Source Serif 4 / DM Sans / JetBrains Mono from self-hosted WOFF2
- No CDN dependencies — fully self-contained static site
- SEO fundamentals solid: canonical URLs, sitemap.xml, robots.txt, semantic HTML
- CTA funnel well-constructed: download always ≤2 clicks from home
- Accessibility baseline good: skip link, landmarks, aria-current, focus-visible ring, prefers-reduced-motion for scroll reveals, touch targets ≥44px
