# Final Review — Día de Muertos Brand-Kit Site

**Site:** `sites/dia-de-muertos/`
**Review directory:** `reviews/dia-de-muertos/`
**Reviewer:** adversarial-reviews-agent (12-dimension parallel review)
**Review date:** 2026-07-01
**Lint gates:** Not re-run (static review — see pre-existing BUILD_LOG.md for prior lint results)

---

## Executive Summary

The adversarial 12-dimension review identifies **7 dimensions below 90** and **multiple ❌ failures** requiring fixes before exit. The site has excellent technical foundations — correct CSS tokens, WCAG AA color contrast, self-hosted font architecture, no CDN dependencies, clean Performance score (84) — but **fails the brand spirit test**. Every visible word of copy is generic Phlix tech marketing with zero Día de Muertos brand vocabulary. The site feels like a color reskin, not a brand-kit implementation.

---

## 12-Dimension Review Results

| # | Dimension | Score | Status | Critical Issues |
|---|-----------|-------|--------|-----------------|
| 1 | Brand Fidelity & Spirit | **32** | ❌ FAIL | No brand vocabulary in copy; no signature elements (Catrina, papel picado beyond 1 divider, candle animation absent); Cinzel tracking 0.04em vs spec 0.08em |
| 2 | SEO | **68** | ❌ FAIL | JSON-LD only on index.html — all 7 sub-pages missing; sitemap.xml lacks `<lastmod>` |
| 3 | Readability | **62** | ❌ FAIL | Body copy is generic tech marketing; hero uses shared content.json headline not brand voice; no brand warmth |
| 4 | Spelling & Grammar | **55** | ❌ FAIL | Zero brand vocabulary words in visible copy; brand greetings/empty_state_messages entirely absent |
| 5 | Usability | **71** | ⚠️ CONCERN | Code block URLs not clickable links; prefers-reduced-motion CSS cascade conflict |
| 6 | Accessibility | **68** | ❌ FAIL | prefers-reduced-motion broken (base.css `0.01ms !important` overrides components.css `animation: none`); features page lacks landmark wrapping |
| 7 | Responsive | **81** | ⚠️ CONCERN | h1 breakpoint at 768px uses un-clamped fixed size; no ≤360px explicit breakpoint |
| 8 | Performance | **84** | ⚠️ CONCERN | Clean architecture; fonts are commented placeholders — acceptable |
| 9 | Content Accuracy | **91** | ✅ PASS | about.html:91 "Self-hosted media. Open source. No lock-in." not in content.json |
| 10 | CTA / Funnel | **88** | ⚠️ CONCERN | 11.4:1 AAA contrast; 1-click download; no modals/gates — structurally sound |
| 11 | Social Metadata | **89** | ⚠️ CONCERN | JSON-LD absent on 7/8 pages; og.svg uses web fonts not accessible to crawlers |
| 12 | Localization | **92** | ✅ PASS | `<html lang="en">` on all pages; no locale-unsafe APIs; RTL-safe CSS |

**Exit bar: no dimension below 90 AND no ❌. Current state: 5 ❌ failures, 7 dimensions below 90. Does NOT exit loop.**

---

## Weighted Aggregate Score

| Dimension | Score | Weight | Weighted |
|-----------|-------|--------|----------|
| Brand Consistency | 32 | 1.2 | 38.4 |
| SEO | 68 | 1.0 | 68.0 |
| Content Quality (Readability) | 62 | 1.0 | 62.0 |
| Spelling & Grammar | 55 | 1.0 | 55.0 |
| Usability | 71 | 1.0 | 71.0 |
| Accessibility | 68 | 1.5 | 102.0 |
| Responsive | 81 | 1.2 | 97.2 |
| Performance | 84 | 1.2 | 100.8 |
| CTA / Funnel | 88 | 1.0 | 88.0 |
| Social Metadata | 89 | 0.8 | 71.2 |
| Localization | 92 | 0.6 | 55.2 |
| **Total** | | **11.5** | **808.8** |

**Aggregate = 808.8 / 11.5 = 70 / 100**

---

## Priority Findings (ranked)

### 🔴 CRITICAL D1 — Brand Fidelity (32/100)

The site is technically correct CSS but brand-soulless. Every visible text string uses generic Phlix marketing copy from `content.json`. The brand kit's `vocabulary` words (`marigold`, `altar`, `celebrate`, `honor`, `return`, `glow`, `petals`, `beloved`, `story`) appear **zero times** across all 9 pages. The brand kit's `greetings` are entirely absent. The brand kit's `tagline_primary` ("Remember. Celebrate. Live.") appears only in `<title>`, not as a visual headline.

**Required fixes:**
1. Rewrite all visible copy to use brand vocabulary — hero, eyebrows, CTAs, page-leads, footer
2. Add Catrina mascot SVG to loading/empty states per kit spec
3. Add papel picado pattern overlays to feature card surfaces and section dividers throughout
4. Apply `candleflicker` animation to hero wordmark per `header_motif` spec
5. Fix Cinzel Decorative hero tracking: `theme.css:151` change `0.04em` → `0.08em`

### 🔴 CRITICAL D6 — prefers-reduced-motion broken (68/100)

`base.css:277` sets `animation-duration: 0.01ms !important` under reduced-motion. This overrides `components.css:591`'s `animation: none` via `!important` cascade priority. Users requesting reduced motion still get brief animation flashes.

**Fix:** In `base.css:277`, change `animation-duration: 0.01ms !important` to `animation: none !important`.

### 🟠 MAJOR D2 — JSON-LD missing on sub-pages (68/100)

`SoftwareApplication` JSON-LD exists only on `index.html:59-70`. Features, clients, download, about, hub, docs, plugins pages all lack structured data.

**Fix:** Copy the JSON-LD block from index.html to all 7 sub-page `<head>` sections.

### 🟠 MAJOR D4 — Zero brand vocabulary (55/100)

No instances of `marigold`, `altar`, `celebrate`, `honor`, `return`, `glow`, `petals`, `beloved`, `story` anywhere in visible copy. No use of brand kit `greetings` or `empty_state_messages`.

**Fix:** Rewrite hero eyebrow, hero headline, footer tagline, and all page-lead copy to use brand voice.

### 🟡 MINOR D9 — about.html lead not in content.json (91/100)

`about.html:91` has "Self-hosted media. Open source. No lock-in." which is not in `content.json`. This is a content accuracy violation.

**Fix:** Add phrase to `content.json` under `about.tagline` or use a content.json-sourced value.

### 🟡 MINOR D7 — h1 breakpoint regression (81/100)

At 768px, `theme.css:724-726` overrides hero h1's `clamp()` with fixed `var(--text-4xl)` (2.25rem) causing an unintended size jump. Hero clamp floor is 2rem at ≤768px but jumps to 2.25rem at 769px.

**Fix:** Use `clamp()` at the 768px breakpoint or confirm the override is intentional.

### 🟡 MINOR D11 — og.svg uses web fonts (89/100)

`img/og.svg` text elements use `Cinzel Decorative`, `Playfair Display`, `Lora` — social media crawlers will render fallback fonts, breaking the designed layout.

**Fix:** Convert text to SVG `<path>` elements in og.svg.

---

## Dimension-by-Dimension Summary

### 1. Brand Fidelity & Spirit — 32/100 ❌
CSS tokens ✅, typography roles ✅, shadow tokens ✅, gradients ✅, reduced-motion ✅, avoid_words ✅, brand_opposites avoided ✅. **But:** Zero brand vocabulary in copy, zero signature elements (Catrina absent, papel picado barely used, candle-flicker animation unused), Cinzel tracking wrong, no mascot, no ofrenda composition.

### 2. SEO — 68/100 ❌
Title lengths ✅, meta descriptions ✅, canonical URLs ✅, sitemap.xml ✅, robots.txt ✅, heading hierarchy ✅, single H1 ✅, JSON-LD on index ✅. **But:** JSON-LD absent on 7 sub-pages.

### 3. Readability — 62/100 ❌
Lora body font ✅, 1.7 line-height ✅, no all-caps body ✅, 60-75ch line length ✅, no walls of text ✅. **But:** Hero headline and subheadline are generic shared content, not brand voice. No Día de Muertos warmth anywhere.

### 4. Spelling & Grammar — 55/100 ❌
Zero typos ✅, consistent tense/voice ✅, no avoid_words ✅, proper capitalization ✅. **But:** Zero brand vocabulary words used. Brand kit greetings entirely absent. This is a brand voice failure, not a grammar failure.

### 5. Usability — 71/100 ⚠️
Skip link ✅, mobile nav with aria ✅, Escape closes menu ✅, toast component ✅, download in 1 click ✅, no auto-play media ✅. **But:** Code block URLs not clickable; reduced-motion cascade conflict.

### 6. Accessibility — 68/100 ❌
Color contrast AA/AAA ✅, skip link ✅, focus-visible gold ring ✅, no positive tabindex ✅, aria-hidden on decorative SVGs ✅, landmarks ✅, lang="en" ✅, touch targets 44px ✅, single H1 ✅. **But:** prefers-reduced-motion broken by CSS cascade; features page lacks landmark wrapping for main content section.

### 7. Responsive — 81/100 ⚠️
Fluid grid ✅, 768px breakpoint ✅, 480px breakpoint ✅, clamp() on hero h1 ✅, 44px nav toggle ✅, images fluid ✅, no fixed-px layout containers ✅. **But:** h1 at 768px uses un-clamped fixed size; no ≤360px explicit breakpoint.

### 8. Performance — 84/100 ⚠️
Self-hosted fonts (commented) ✅, no CDN ✅, all JS deferred ✅, no render-blocking JS ✅, no large raster images ✅, font-display: swap ✅, SVG og:image ✅. **But:** Fonts are placeholders (acceptable); no preconnect for future font origin.

### 9. Content Accuracy — 91/100 ✅
Pitch bullets match content.json ✅, features match content.json ✅, clients match ✅, FAQ matches ✅, no invented claims ✅. **But:** about.html page-lead not in content.json.

### 10. CTA / Funnel — 88/100 ⚠️
Primary CTA above fold ✅, 11.4:1 contrast (AAA) ✅, secondary CTA de-emphasized ✅, 1-click download path ✅, no modals/gates ✅. **But:** Secondary CTA opens external docs without `target="_blank"`.

### 11. Social Metadata — 89/100 ⚠️
OG tags complete ✅, Twitter card summary_large_image ✅, og:image 1200×630 ✅, absolute URLs ✅, canonical ✅. **But:** JSON-LD only on index.html; og.svg uses web fonts crawlers can't access.

### 12. Localization — 92/100 ✅
lang="en" on all pages ✅, no locale-unsafe APIs ✅, no float:left/right ✅, no toLocaleString ✅, semantic HTML ✅, static copyright year ✅.

---

## Individual Review Artifact Files

| File | Dimension |
|------|-----------|
| `01-brand-fidelity.md` | Brand Fidelity & Spirit |
| `02-seo.md` | SEO |
| `03-readability.md` | Readability |
| `04-spelling-grammar.md` | Spelling & Grammar |
| `05-usability.md` | Usability |
| `06-accessibility.md` | Accessibility |
| `responsive.md` | Responsive |
| `performance.md` | Performance |
| `content-accuracy.md` | Content Accuracy |
| `cta-funnel.md` | CTA / Funnel |
| `social-metadata.md` | Social Metadata |
| `localization.md` | Localization |

---

*Review performed by adversarial reviewer subagents across 12 dimensions. Aggregate score: 70/100. Site does NOT exit loop — 5 critical failures and 7 dimensions below 90 require fixes.*
