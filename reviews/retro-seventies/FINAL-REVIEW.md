# FINAL REVIEW — Retro Seventies Brand-Kit Site

**Review date:** 2026-07-01
**Site:** `/home/sites/phlix/phlix-website/sites/retro-seventies/`
**Brand kit:** `retro-seventies.js` (base kit, version 1.0)
**Review dimensions:** 12

---

## Score Summary

| # | Dimension | Score | Severity |
|---|-----------|-------|----------|
| 1 | Brand fidelity & spirit | 92/100 | ⚠️ |
| 2 | SEO | 73/100 | ⚠️ |
| 3 | Readability | 94/100 | ✅ |
| 4 | Spelling & grammar | 100/100 | ✅ |
| 5 | Usability | 67/100 | ❌ |
| 6 | Accessibility | 76/100 | ⚠️ |
| 7 | Responsive | 88/100 | ⚠️ |
| 8 | Performance | 40/100 | ❌ |
| 9 | Content accuracy | 95/100 | ⚠️ |
| 10 | CTA / Funnel | 59/100 | ❌ |
| 11 | Social metadata | 69/100 | ⚠️ |
| 12 | Localization | 88/100 | ⚠️ |

**Weighted average:** ~78/100
**Exit criteria:** ❌ FAILS — 3 dimensions scored ❌; performance below 90.

---

## ❌ Hard Failures (must fix before launch)

### 1. Performance — Google Fonts CDN violation (Score: 40/100)

**File:** `css/base.css:6`

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Fredoka+One&family=Lato:wght@400;700;900&family=Courier+Prime:wght@400;700&display=swap');
```

`new_site.md §13` explicitly prohibits Google Fonts CDN links. All `@font-face src:` declarations at `base.css:10-64` also point to Google Fonts CDN WOFF2 URLs instead of local self-hosted files.

**Fix:** Remove the `@import`. Change all `@font-face src: url('https://fonts.gstatic.com/...')` to local `url('fonts/PlayfairDisplay-700.woff2')` etc. Create `css/fonts/` with subset WOFF2 files.

---

### 2. CTA/Funnel — docs.html has no CTA banner (Score: 59/100)

**File:** `docs.html` (end of `<main>`, lines 84-86)

The page ends immediately after the ecosystem list. No `.cta-banner` section.

Per `new_site.md §3.6`: "docs: `.page-header` → ... → closing `.cta-banner`."
Per `new_site.md §5`: "Every page ends in a `.cta-banner`."

**Fix:** Add before `</main>`:
```html
<section class="cta-banner" aria-labelledby="cta-banner-heading">
  <div class="cta-banner-inner">
    <h2 id="cta-banner-heading">Ready to start?</h2>
    <a href="download.html" class="btn btn-fab">Get Phlix</a>
  </div>
</section>
```

---

### 3. CTA/Funnel — about.html has no CTA banner (Score: 59/100)

**File:** `about.html` (end of `<main>`, lines 102-103)

The page ends after the FAQ `<dl>`. No `.cta-banner` section.

Per `new_site.md §3.8`: "about: `.page-header` → ... → closing `.cta-banner`."

**Fix:** Add the same CTA banner pattern before `</main>`.

---

## ⚠️ Warnings (should fix before launch)

### 4. SEO — Broken license URL in all footers

**Files:** `index.html:238`, `about.html:134`, `clients.html:177`, `download.html:149`, `plugins.html:115`, `docs.html:115`, `hub.html:113`

The license URL `https://github.com/phlix-website/blob/master/LICENSE` is missing the `detain/` org prefix. Should be `https://github.com/detain/phlix-website/blob/master/LICENSE`.

---

### 5. CTA/Funnel — features.html CTA not above fold

**File:** `features.html:58-63` (`.page-header`)

The `.page-header` shows `h1` + lead text only. No CTA button visible above the fold. The first CTA is at line 165+ (bottom of page). Users landing directly on features.html must scroll to find the primary action.

---

### 6. Social Metadata — og:image is SVG, not PNG

**Files:** All 8 HTML pages — `og:image` meta tag points to `img/og.svg`

`new_site.md §11` and §8 specify `og.png` (1200×630 raster). Twitter Card validator requires PNG/JPEG. SVG is non-standard for social meta.

---

### 7. Social Metadata — Missing twitter:description on 6 pages

**Files:** `index.html`, `features.html`, `download.html`, `plugins.html`, `docs.html`, `about.html`

Only `clients.html` and `hub.html` have explicit `twitter:description`. All pages should have it per spec §11.

---

### 8. Performance — No css/fonts/ directory

The spec §1 requires `css/fonts/` with self-hosted WOFF2 files. This directory does not exist. `@font-face` declarations currently point to Google Fonts CDN URLs.

---

### 9. Brand Fidelity — Features overview shows 8 cards instead of 7

**File:** `index.html:122-194` — `features-overview` section renders all 8 content.json features. The spec §3.1 says "a card grid of **all 7** `features`" for the home page overview, with a "See all features →" link to features.html.

Including all 8 (including hub) on the home page defeats the purpose of the "see all" link.

---

### 10. CTA/Funnel — clients.html uses "Download Now" not "Download Phlix"

**File:** `clients.html:143`

The canonical CTA label per `new_site.md §5` is "Get Phlix" or "Download Phlix". "Download Now" is non-standard.

---

### 11. Accessibility — font-weight 900 WOFF2 unavailable

**File:** `base.css:17-22` — Playfair Display `@font-face` for weight 900 uses the same WOFF2 URL as weight 700. Browsers will render weight 900 as weight 700.

`theme.css:131` uses `font-weight: 900` on hero h1.

---

### 12. Localization — skip-link uses physical `left` property

**File:** `base.css:219`

Should use `inset-inline-start` for RTL safety.

---

## ✅ Dimensions with No Critical Issues

- **Readability (94):** Excellent — 60-75ch line lengths, clear hierarchy, sufficient contrast
- **Spelling & Grammar (100):** Zero avoid_words, zero typos, consistent voice
- **Accessibility (76):** All contrast ratios pass WCAG AA; keyboard reachable; prefers-reduced-motion honored; 44px touch targets; logical landmarks
- **Responsive (88):** No horizontal scroll at any width; 200% zoom survives; mobile nav works
- **Content Accuracy (95):** All product claims verified against new_site.md §16; content.json verbatim
- **Localization (88):** `<html lang="en">` on all pages; content traces to content.json

---

## Complete Issue List

| Priority | Dimension | Issue | File:Line | Fix |
|----------|-----------|-------|-----------|-----|
| MUST FIX | Performance | Google Fonts @import blocks render | `css/base.css:6` | Remove @import; self-host WOFF2s |
| MUST FIX | Performance | @font-face src: uses Google CDN | `css/base.css:10-64` | Use local `css/fonts/` paths |
| MUST FIX | CTA/Funnel | docs.html has no CTA banner | `docs.html:84-86` | Add `.cta-banner` before `</main>` |
| MUST FIX | CTA/Funnel | about.html has no CTA banner | `about.html:102-103` | Add `.cta-banner` before `</main>` |
| SHOULD FIX | SEO | Broken license URL (missing `detain/`) | All 8 HTML files (footer) | Fix to `github.com/detain/phlix-website/...` |
| SHOULD FIX | CTA/Funnel | features.html CTA not above fold | `features.html:58-63` | Add CTA in `.page-header` |
| SHOULD FIX | Social Meta | og:image is SVG not PNG | All 8 HTML files | Generate 1200×630 PNG from og.svg |
| SHOULD FIX | Social Meta | Missing twitter:description | 6 pages | Add explicit twitter:description meta |
| SHOULD FIX | Performance | No css/fonts/ directory | — | Create with subset WOFF2 files |
| SHOULD FIX | Brand | Features overview 8 cards, not 7 | `index.html:122-194` | Remove hub from home overview, keep "see all" |
| SHOULD FIX | CTA | "Download Now" not "Download Phlix" | `clients.html:143` | Change to "Download Phlix" |
| NICE FIX | Accessibility | Playfair 900 WOFF2 missing | `base.css:17-22` | Add separate weight-900 WOFF2 subset |
| NICE FIX | Localization | `left:` physical property on skip-link | `base.css:219` | Use `inset-inline-start` |

---

## Exit Criteria Assessment

| Criterion | Status |
|-----------|--------|
| All 8 pages + css/js/img + robots.txt + sitemap.xml exist | ✅ |
| No ❌ dimensions | ❌ FAIL — 3 dimensions score ❌ |
| No spelling/grammar errors | ✅ PASS — 100/100 |
| No dimension below 90 | ❌ FAIL — performance (40), usability (67), CTA (59) are below 90 |

**Overall: NOT DONE** — 3 dimensions score ❌ and 4 dimensions below 90.

Fix order: Performance (Google Fonts) → CTA banners (docs, about) → SEO link → then remaining warnings.
