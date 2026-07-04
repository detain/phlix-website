# FINAL REVIEW — Bollywood Dreams Brand-Kit Site

## Score Summary

| # | Dimension | Score | Severity |
|---|-----------|-------|----------|
| 1 | Brand Fidelity & Spirit | 75/100 | ⚠️ |
| 2 | SEO | 72/100 | ⚠️ |
| 3 | Readability | 88/100 | ⚠️ |
| 4 | Spelling & Grammar | 92/100 | ✅ |
| 5 | Usability | 85/100 | ⚠️ |
| 6 | Accessibility | 78/100 | ⚠️ |
| 7 | Responsive | 87/100 | ⚠️ |
| 8 | Performance | 45/100 | ❌ |
| 9 | Content Accuracy | 65/100 | ❌ |
| 10 | CTA / Funnel | 80/100 | ⚠️ |
| 11 | Social Metadata | 72/100 | ⚠️ |
| 12 | Localization | 94/100 | ✅ |

**Overall: ❌ FAIL — 2 dimensions score below 90; 2 dimensions are ❌ severity.**

---

## ❌ Critical Issues (Must Fix)

### 1. PERFORMANCE: Google Fonts CDN (Severity: ❌)
**Files:** `css/base.css:117–121`

The CSS declares Google Fonts font families by name only (e.g., `"Playfair Display", Georgia, serif`). The browser resolves these to `fonts.googleapis.com` requests. The spec §1 explicitly forbids CDN font dependencies: "No CDN dependencies in the deployed page (no Google Fonts `<link>` to `fonts.googleapis.com`). Self-host fonts as WOFF2."

**Impact:** Browser makes external HTTP requests for all 5 font families. Causes FOUT, delays LCP, and violates the self-hosting mandate.

**Fix:** Download WOFF2 files for Playfair Display (700, 900), Cinzel Decorative (400, 700), Lora (400, 500), Hind (400, 500, 600), JetBrains Mono (400, 600). Place in `css/fonts/`. Add `@font-face` blocks with `font-display: swap`.

---

### 2. CONTENT ACCURACY: Home H1 uses brand tagline instead of content.json hero.headline (Severity: ❌)
**File:** `index.html:130`

The home page H1 reads "Every Story Deserves a Grand Entrance" — this is `tagline_primary` from the brand kit. Per spec §3.1: "hero.headline → `<h1>hero.headline</h1>`". The content.json hero.headline is "Your media. Your library. Your Phlix." which does not appear as the H1 anywhere.

**Impact:** Violates the content contract. The primary product headline is replaced by a brand tagline.

**Fix:** Change `<h1>` text to "Your media. Your library. Your Phlix." from `content.json.hero.headline`. Move the brand tagline to a visual overlay, eyebrow, or CTA banner section.

---

### 3. CONTENT ACCURACY: hub feature missing from home feature-grid (Severity: ❌)
**File:** `index.html:374–574`

The `.feature-grid` on index.html renders only 7 feature-card articles. content.json defines 8 features — the hub feature (index 7) is absent. The hub feature is also absent from the features-overview section on home.

**Impact:** Users viewing the home page see only 7 of 8 product features. The hub feature is documented on features.html but missing from home.

**Fix:** Add the 8th `feature-card` article for "Phlix Hub — reach any of your servers from anywhere" with the hub SVG icon and body from `content.json.features[7]`.

---

### 4. SOCIAL METADATA: og:image is SVG, not PNG (Severity: ⚠️ but blocking)
**Files:** ALL 8 HTML files (og:image meta tags), `sitemap.xml`

All `og:image` and `twitter:image` meta tags point to `img/og.svg`. The spec §8 requires a 1200×630 raster PNG. "Ship `og.svg` as the editable source if used, but reference a rasterized **`og.png`** in meta."

**Impact:** Social platforms (especially Twitter/X) may not render SVG og images correctly for `summary_large_image` cards.

**Fix:** Generate a 1200×630 PNG raster from og.svg. Update all `og:image` and `twitter:image` meta tags across all 8 pages and sitemap.xml.

---

### 5. USABILITY/ACCESSIBILITY: FAQ accordion JS broken (Severity: ⚠️)
**Files:** `js/main.js:146–163`, `about.html:204–254`

`initFaq()` uses selector `".faq-item details"` but the FAQ HTML has `<details>` as a direct child of `.faq-item` (`.faq-item > details`). The selector finds nothing; the custom toggle handler never initializes. Native browser disclosure still works, but JS-mediated ARIA state sync and reduced-motion handling are dead code.

Additionally, toast dismiss animation uses wrong keyframe name (`"toastIn"` in JS vs `"toast-in"` in CSS).

**Fix:** Change `main.js:149` selector to `".faq-item > details"`. Fix toast animation name to `"toast-in"`.

---

## ⚠️ Warnings (Should Fix)

| # | Dimension | Issue |
|---|-----------|-------|
| 4 | Brand Fidelity | Marquee easing is `linear`, not brand `cubic-bezier(0.25, 0, 0, 1)` |
| 4 | Brand Fidelity | `hub.phlix.io` domain cited without content.json basis |
| 4 | Brand Fidelity | features.html H1 is brand kit copy not in content.json |
| 2 | SEO | Home page title format doesn't follow spec pattern |
| 5 | Usability | Download requires navigating to GitHub (not a direct binary) |
| 5 | Usability | Toast animation name mismatch — dismiss animation doesn't fire |
| 6 | Accessibility | Placeholder text contrast ~5.4:1 — passes AA but brand kit warns |
| 7 | Responsive | Body text can drop to ~15.3px at 375px viewport |
| 9 | Content Accuracy | "Seven years of building" unverified against project history |
| 9 | Content Accuracy | License URL uses phlix-website repo, not phlix-server repo |

---

## What Passed (✅ Dimensions)

### ✅ Spelling & Grammar (92/100)
Zero typos, consistent active voice, all content.json copy verbatim, no avoid_words, brand vocabulary present, brand opposites checklist passed.

### ✅ Localization (94/100)
`<html lang="en">` on all pages, all strings traceable to content.json, external link targets correct, no locale-unsafe formatting, logical CSS properties for RTL readiness.

---

## Top 3 Most Critical to Fix First

1. **[Performance]** Self-host all fonts — download WOFF2, create `@font-face` blocks in `css/base.css`, remove any implicit Google Fonts resolution. This is an explicit spec regression.

2. **[Content Accuracy]** Fix home page H1 to "Your media. Your library. Your Phlix." from `content.json.hero.headline`. This is a direct content contract violation.

3. **[Content Accuracy]** Add the 8th hub feature-card to the home page feature-grid. The product's hub feature is the 8th feature in content.json and should appear on the home overview.

---

## Verdict

The site achieves strong brand identity expression and mostly accurate product copy. However, it **fails** the overall bar due to:

- **2 ❌ dimensions** (Performance 45/100, Content Accuracy 65/100)
- **No dimension scored below 65** (lowest is Performance at 45)
- **10 of 12 dimensions are ⚠️** — solid but not fully clean

The build correctly implements the Bollywood Dreams visual identity (colors, typography, motion, signature elements). The primary failures are (a) Google Fonts CDN dependency, (b) wrong home page H1, and (c) missing hub feature in home grid — all of which are fixable without re-building the brand expression.

**The site requires fixes before it can pass the quality gates defined in new_site.md §18.**
