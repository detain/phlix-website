# FINAL REVIEW — Cyber Tokyo Site

**Site:** `sites/cyber-tokyo/`
**Review Date:** 2026-07-01
**Reviewer:** Adversarial multi-dimension code review (12 dimensions)

---

## Dimension Score Summary

| # | Dimension | Score | Verdict |
|---|-----------|-------|---------|
| 1 | Brand Fidelity & Spirit | 72 | CONDITIONAL |
| 2 | SEO | 68 | CONDITIONAL |
| 3 | Readability | 90 | **PASS** |
| 4 | Spelling & Grammar | 95 | **PASS** |
| 5 | Usability (Nielsen) | 85 | CONDITIONAL |
| 6 | Accessibility (WCAG 2.2 AA) | 85 | CONDITIONAL |
| 7 | Responsive | 88 | **PASS** |
| 8 | Performance | 60 | **FAIL** |
| 9 | Content Accuracy | 100 | **PASS** |
| 10 | CTA / Funnel | 88 | CONDITIONAL |
| 11 | Social Metadata | 72 | CONDITIONAL |
| 12 | Localization Readiness | 95 | **PASS** |

---

## Tally

- **PASS (≥90, no ❌):** 5 dimensions — Readability, Spelling & Grammar, Responsive, Content Accuracy, Localization
- **CONDITIONAL (≥80 or no ❌ but minor issues):** 6 dimensions — Brand Fidelity, SEO, Usability, Accessibility, CTA/Funnel, Social Metadata
- **FAIL (<80 or any ❌):** 1 dimension — Performance

---

## ❌ Critical Findings (Must Fix)

### 1. [Performance] Google Fonts CDN Dependency
- **File:** `base.css:7`
- **Issue:** ` @import url('https://fonts.googleapis.com/css2?family=...')` violates new_site.md §1 explicit rule: "No CDN dependencies in the deployed page (no Google Fonts `<link>` to `fonts.googleapis.com`...)"
- This is a **past-fixed regression** — documented in BUILD_LOG.md:86 as a known follow-up, yet present in the build
- Google Fonts @import is **render-blocking** and adds multiple network roundtrips
- Also: Noto Serif JP is NOT included in the import, but `.hero-kanji` uses it — the kit's typography_rules say it MUST be loaded
- **Fix:** Download WOFF2 files for all 5 font families (Space Grotesk, Bebas Neue, IBM Plex Sans, IBM Plex Mono, Noto Sans JP, Noto Serif JP) into `css/fonts/`, declare with `@font-face + font-display: swap`

### 2. [CTA/Funnel] About Page Missing .cta-banner
- **File:** `about.html` — last element is `</main>` at line 104, then footer immediately
- **Issue:** new_site.md §5: "Every page ends in a `.cta-banner` that drives toward download" — applies to all 8 pages
- The about page has no CTA driving toward download
- **Fix:** Add a `.cta-banner` section before the closing `</main>` on about.html, e.g., "Ready to start watching? → Download Phlix"

---

## ⚠️ Issues (Should Fix If Reasonable)

### 3. [SEO] robots.txt Overly Restrictive Allow Rule
- **File:** `robots.txt:2` — `Allow: /cyber-tokyo/`
- **Issue:** Restricts crawlers to only `/cyber-tokyo/` path. For a GitHub Pages repo with multiple project sites at root, this may be intentional. For a single-site deployment, this could confuse crawlers.
- **Fix:** If this is the only site in the repo, change to `Allow: /` or remove robots.txt entirely. If multi-project, keep but ensure sitemap covers this path.

### 4. [Brand] Hero Animation Duration Too Slow
- **Files:** `theme.css:178,187,199,200`
- **Issue:** Hero `glitch-enter` animations run 400–500ms. Brand kit transition_speed: "fast (80–200ms)"
- Not visually damaging (once-off entrance), but violates brand spec
- **Fix:** Reduce hero animation durations to 150–200ms range

### 5. [Social] og:image References SVG Not PNG
- **Files:** All 8 HTML pages (og:image and twitter:image meta tags)
- **Issue:** new_site.md §8 requires `og.png` (1200×630 raster) but only `img/og.svg` exists. The spec says "reference a rasterized `og.png` in meta"
- **Fix:** Rasterize `img/og.svg` to `img/og.png` at 1200×630, update all 8 HTML files to reference `.png`

### 6. [Brand] Noto Serif JP Font Not Loaded
- **File:** `base.css:7`
- **Issue:** `.hero-kanji` uses `'Noto Serif JP', serif` but Noto Serif JP is not in the Google Fonts import. Only Noto Sans JP is loaded.
- Kanji decorative text falls back to system fonts — acceptable but not brand-perfect
- **Fix:** Add Noto Serif JP to font import (or better: add to self-hosted WOFF2 bundle from issue #1)

### 7. [Brand] Card Corner Radius 4px Instead of 2px
- **Files:** `theme.css:294` (feature-card), `theme.css:508` (client-card), `theme.css:622` (download-card)
- **Issue:** Brand kit shape_language: "Sharp rectangles — the geometry of vending machines and signage panels" with corner_radius.small = "2px". Cards use `--radius-md` (4px).
- 4px is still sharp by conventional standards, but inconsistent with the kit's 2px sharp-corner directive
- **Fix:** Change card border-radius from `var(--radius-md)` to `var(--radius-sm)` (=2px)

### 8. [Accessibility] prefers-reduced-motion — Scanline Handled But Implementation Split
- **Files:** `base.css:239-246` vs `theme.css:785-805`
- **Issue:** Two different approaches to reduced-motion: base.css uses `animation-duration: 0.01ms` (aggressive but effective), theme.css uses `animation: none` for specific elements. This split approach could create edge cases where some animations slip through.
- Current behavior IS correct (scanline disabled, glitch animations collapsed), but the implementation is fragmented across two stylesheets
- **Fix:** Consolidate reduced-motion handling into base.css only; remove redundant rules from theme.css

---

## Summary of Strengths

The site is built to a genuinely high standard in several dimensions:

- **Content Accuracy at 100%** — every product claim byte-for-byte matches content.json. This is the most important dimension for a marketing site and it's perfect.
- **Localization at 95%** — all copy from content.json, `<html lang="en">` correct, logical CSS properties used, CJK fallbacks present (minus Noto Serif JP)
- **Spelling & Grammar at 95%** — zero avoid_words, no typos, consistent active voice
- **Readability at 90%** — appropriate reading level, line lengths within 60-75ch spec, clear hierarchy
- **Responsive at 88%** — fluid clamp() typography, proper mobile single-column, no horizontal scroll, 44px touch targets
- Brand color palette, typography roles, icon styles, and voice are all correctly implemented
- Accessibility fundamentals (contrast, focus rings, skip link, landmarks, ARIA) all correct
- SEO fundamentals (titles, meta, h1 hierarchy, canonical, sitemap, JSON-LD) all correct

---

## Final Recommendation

**NEEDS_REVISION**

**Rationale:**
The site is well-built — content accuracy is perfect, brand identity is broadly faithful, and most dimensions pass or conditional-pass. However, the **Performance dimension fails at 60/100** due to the Google Fonts CDN `@import` which is an **explicit, documented regression** from new_site.md §1. This is not a new issue — it was flagged in BUILD_LOG.md but was shipped anyway. That violates the quality gate in new_site.md §18.

Additionally, the **about page missing its CTA banner** is a technical spec violation, and the **og:image referencing SVG instead of PNG** is a spec deviation.

The good news: all fixes are straightforward and non-structural. The site doesn't need rework — it needs the CDN font issue fixed (self-host WOFF2), the about page CTA added, and the PNG rasterized.

**Required before approval:**
1. Replace Google Fonts @import with self-hosted WOFF2 + `@font-face` declarations
2. Add .cta-banner to about.html
3. Rasterize og.svg → og.png and update all 8 HTML files

**Strongly recommended:**
4. Reduce hero animation durations from 400-500ms to 150-200ms
5. Change card border-radius from 4px to 2px
6. Add Noto Serif JP to font load
