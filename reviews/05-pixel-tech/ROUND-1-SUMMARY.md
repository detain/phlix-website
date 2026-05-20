# ROUND-1-SUMMARY — Variant 05-pixel-tech

**Collator:** Agent
**Date:** 2026-05-20
**Review Files Synthesized:** 12 (accessibility, usability, responsive, performance, localization, cta-funnel, content-quality, social-metadata, seo, branding-consistency, tester, documenter)

---

## Aggregate Weighted Score

| Dimension | Raw Score | Weight | Weighted Points |
|-----------|-----------|--------|-----------------|
| Accessibility | 52/100 | 1.5 | 0.780 |
| Performance | 78/100 | 1.2 | 0.936 |
| Responsive | 78/100 | 1.2 | 0.936 |
| Branding Consistency | 78/100 | 1.2 | 0.936 |
| Usability | 85/100 | 1.0 | 0.850 |
| Content Quality | 87/100 | 1.0 | 0.870 |
| CTA / Funnel | 93/100 | 1.0 | 0.930 |
| SEO | 58/100 | 1.0 | 0.580 |
| Social Metadata | 42/100 | 0.8 | 0.336 |
| Localization | 35/100 | 0.6 | 0.210 |
| **TOTAL** | | **10.0** | **7.364 / 10** |

**Aggregate Score: 73.6 / 100**

---

## Top-10 Ranked Issues Across All Dimensions

| Rank | Issue | Dimensions Affected | Severity | Confidence |
|------|-------|---------------------|----------|------------|
| 1 | **Meta descriptions exceed 160 chars** — All 8 pages use identical 203-char description (43 chars over limit). Must be trimmed per-page and made unique. | SEO (58/100) | 🔴 Critical | 99% |
| 2 | **Body text contrast 1.19:1** — `#1A1A1A` on `#000` fails WCAG 4.5:1 minimum catastrophically. Body text essentially invisible for low-vision users. | Accessibility (52/100) | 🔴 Critical | 99% |
| 3 | **Missing sitemap.xml and robots.txt** — No sitemap for search engine discovery; no robots.txt guidance. Both are standard SEO requirements. | SEO | 🟠 Major | 99% |
| 4 | **Missing JSON-LD schema on all pages** — Zero `<script type="application/ld+json">` found across all 8 pages. Required for SoftwareApplication rich results in Google Search. | SEO, Social Metadata (42/100) | 🔴 Critical | 98% |
| 5 | **RTL layout not supported** — All CSS uses physical properties (`left`, `top`, `margin-left`) instead of logical properties. Layout breaks entirely for RTL languages. | Localization (35/100) | 🟠 Major | 95% |
| 6 | **Secondary button text contrast 2.08:1** — `.btn-secondary` text `#39FF14` on black fails WCAG 3:1 UI component minimum. | Accessibility | 🟠 Major | 97% |
| 7 | **Glitch animation not wrapped in prefers-reduced-motion** — CSS `.glitch::before/::after` infinite animations run regardless of `prefers-reduced-motion: reduce`. JS check exists but only affects re-animation, not CSS that plays on load. | Accessibility | 🟠 Major | 92% |
| 8 | **Missing manifest.webmanifest and favicon PNG set** — Only `favicon.svg` (32×32) exists. Missing: `.ico`, `apple-touch-icon.png` (180×180), `icon-192x192.png`, `icon-512x512.png`, `manifest.webmanifest`. Breaks PWA installability and iOS home screen bookmarks. | Social Metadata | 🟠 Major | 99% |
| 9 | **`.btn-small` touch target 32px** — Below 44px WCAG 2.5.5 minimum. Only `components.css:86` `min-height: 32px` change needed. | Responsive (78/100), Accessibility | 🟡 Minor | 95% |
| 10 | **Content hardcoded in HTML, not from content.json** — BUILD_LOG.md:42 falsely claims "Content from shared/content.json rendered verbatim." All content duplicated verbatim in each HTML file. Makes i18n impossible. | Localization, Content Quality (87/100) | 🟠 Major | 90% |

---

## Additional Issues (Priority Order)

| # | Issue | File(s) | Severity |
|---|-------|---------|----------|
| 11 | Missing Apple Touch Icon `<link rel="apple-touch-icon">` in all HTML pages | All 8 HTML | 🟠 Major |
| 12 | `.client-status` badge touch target ~22px (well below 44px) | theme.css:481-487 | 🟡 Minor |
| 13 | Mobile nav toggle missing `aria-modal="true"` and focus trap | main.js:initMobileNav() | 🟡 Minor |
| 14 | Fonts directory empty — WOFF2 files not downloaded | theme.css:13-43 | 🟠 Major |
| 15 | Download.html lacks above-fold primary CTA button | download.html | 🟡 Minor |
| 16 | About.html and docs.html lack primary download CTA | about.html, docs.html | 🟡 Minor |
| 17 | No explicit breakpoints for 320px/375px/414px viewports | theme.css:756 | 🟢 Nitpick |
| 18 | `og:image` is SVG — social platforms prefer PNG/JPG | img/og.svg | 🟡 Minor |
| 19 | img/PROMPTS.md missing og.svg and favicon.svg prompt entries | img/PROMPTS.md | 🟢 Nitpick |
| 20 | Footer column anchor text generic ("GitHub org", "Issues") — missed SEO keyword opportunity | about.html:212-213 | 🟢 Nitpick |

---

## Concrete Improvement Plan

### 1. Fix body text contrast — CRITICAL
- **File:** `css/base.css:86`
- **What:** Change `--color-silver: #1A1A1A` to `--color-silver: #B0B0B0`
- **Acceptance:** Body text on black yields ≥4.5:1 contrast ratio. Verify with accessibility checker.
- **Estimated lines:** 1

---

### 2. Fix secondary button text contrast
- **File:** `css/components.css:65`
- **What:** Change `.btn-secondary { color: var(--color-neon-green); }` to `color: var(--color-matrix-green);` (#0F6)
- **Acceptance:** Secondary button text on black yields ≥3:1 contrast ratio.
- **Estimated lines:** 1

---

### 3. Wrap glitch CSS animations in prefers-reduced-motion
- **File:** `css/components.css:120-160`
- **What:** Add `@media (prefers-reduced-motion: reduce)` wrapper around `.glitch::before` and `.glitch::after` animations to set `animation: none;`
- **Acceptance:** With `prefers-reduced-motion: reduce` set, no glitch animation plays.
- **Estimated lines:** 8

---

### 4. Fix meta descriptions — all 8 pages
- **Files:** `index.html:7`, `about.html:7`, `hub.html:7`, `docs.html:7`, `plugins.html:7`, `download.html:7`, `clients.html:7`, `features.html:7`
- **What:** Trim each meta description to ≤160 chars. Make each page-specific, not identical copy.
  - **index.html:** "Phlix: self-hostable PHP media server. Roku, Tizen, Windows, Mobile clients. SyncPlay, Live TV, transcoding, DLNA, hub relay." (156 chars)
  - **about.html:** "About Phlix — BSD-3 licensed, community-driven open-source media server. Self-host your library, no lock-in." (116 chars)
  - **hub.html:** "Phlix Hub: reverse-tunnel relay lets you access your home server from anywhere. Self-host or use the public relay." (121 chars)
  - **docs.html:** "Phlix documentation: user guide, API reference, developer docs, and hub admin guide." (87 chars)
  - **plugins.html:** "Extend Phlix with a versioned plugin contract. PHP 8.3+ plugin API, LifecycleInterface, manifest schema." (104 chars)
  - **download.html:** "Download Phlix clients for Roku, Samsung Tizen, Windows, and Mobile. Open-source, no install required." (104 chars)
  - **clients.html:** "Native apps for every screen. Roku, Samsung Tizen, Windows, Mobile, DLNA — stable and beta clients." (107 chars)
  - **features.html:** "Everything you need to run a media library that actually works. Transcoding, SyncPlay, DLNA, NTP sync, and more." (120 chars)
- **Acceptance:** Each meta description ≤160 chars; all unique per page.
- **Estimated lines:** 8 (one per file)

---

### 5. Create sitemap.xml
- **File:** `variants/05-pixel-tech/sitemap.xml` (new)
- **What:** XML sitemap listing all 8 HTML pages with `<lastmod>`, `<priority>`, and `<changefreq>`
- **Acceptance:** sitemap.xml exists at variant root and is valid XML.
- **Estimated lines:** ~40

---

### 6. Create robots.txt
- **File:** `variants/05-pixel-tech/robots.txt` (new)
- **What:** Standard robots.txt pointing to sitemap location:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://detain.github.io/phlix-website/sitemap.xml
  ```
- **Acceptance:** robots.txt exists and is valid.
- **Estimated lines:** 4

---

### 7. Add JSON-LD SoftwareApplication schema — all 8 pages
- **Files:** All 8 HTML files, in `<head>` before `</head>`
- **What:** Add `<script type="application/ld+json">` with SoftwareApplication schema:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Phlix",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "PHP 8.3+",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "url": "https://detain.github.io/phlix-website/"
  }
  ```
- **Acceptance:** JSON-LD present in all 8 pages; validates at https://validator.schema.org/
- **Estimated lines:** 10 per page (~80 total)

---

### 8. Create manifest.webmanifest and favicon PNG set
- **Files:** `variants/05-pixel-tech/manifest.webmanifest` (new) + PNG assets in `img/`
- **What:**
  1. Create `manifest.webmanifest` with name, short_name, start_url, display: standalone, background_color: #000000, theme_color: #39FF14, icons array
  2. Create `icon-192x192.png` and `icon-512x512.png` (or generate from og.svg)
  3. Add `<link rel="apple-touch-icon" href="/variants/05-pixel-tech/img/apple-touch-icon.png">` to all 8 HTML pages
  4. Add favicon.ico, favicon-16x16.png, favicon-32x32.png
- **Acceptance:** manifest.webmanifest present; PWA installable in Chrome DevTools > Applications tab.
- **Estimated lines:** ~20 (manifest) + HTML link updates

---

### 9. Fix .btn-small touch target
- **File:** `css/components.css:86`
- **What:** Change `min-height: 32px;` to `min-height: 44px;`
- **Acceptance:** `.btn-small` renders at ≥44px height.
- **Estimated lines:** 1

---

### 10. Fix .client-status touch target
- **File:** `css/theme.css:481-487`
- **What:** Add `min-height: 44px; min-width: 44px;` to `.client-status`, or confirm it's non-interactive and add `pointer-events: none;`
- **Acceptance:** Touch target ≥44px if interactive.
- **Estimated lines:** 2

---

### 11. Replace physical CSS properties with logical properties for RTL
- **Files:** `css/base.css:118-141` (skip-link), `css/theme.css` (mobile nav at ~theme.css:762-776)
- **What:**
  - Replace `left: 50%` with `inset-inline-start: 50%`
  - Replace `transform: translateX(-50%)` with `transform: translateX(-50%)` (works for LTR, RTL needs `translateX(50%)` in RTL context)
  - Replace `margin-left` with `margin-inline-start`
  - Add `[dir="rtl"]` media query or use CSS logical properties throughout
- **Acceptance:** Layout mirrors correctly for Arabic/Hebrew with `dir="rtl"` on `<html>`.
- **Estimated lines:** ~15-20

---

### 12. Download WOFF2 font files
- **Files:** `css/theme.css:13-43` declarations point to `/variants/05-pixel-tech/fonts/` (does not exist)
- **What:** Create `variants/05-pixel-tech/fonts/` and download Orbitron Bold, Inter Medium, Roboto Mono, JetBrains Mono WOFF2 files. Alternatively use Google Fonts CDN with `display=swap` as interim fix.
- **Acceptance:** Network tab shows font files loading; no Courier New/system-ui fallback visible on load.
- **Estimated lines:** N/A (asset acquisition + 1 CSS line update for CDN fallback)

---

### 13. Update .btn-secondary to use #0F6 for text
- **File:** `css/components.css:65`
- **What:** Already identified in issue #2 — update secondary button text color
- **Acceptance:** Button text contrast ≥3:1
- **Estimated lines:** 1

---

### 14. Add aria-labelledby to download cards
- **Files:** `download.html:160-165`, `clients.html` client cards
- **What:** Wrap `<div class="download-card">` in `<article aria-labelledby="card-heading-id">` with heading ID referenced
- **Acceptance:** Screen reader can associate card heading with button action.
- **Estimated lines:** ~10

---

### 15. Add focus trap to mobile nav
- **File:** `js/main.js:initMobileNav()`
- **What:** Add `inert` attribute management when menu opens/closes, or add `aria-modal="true"` to menu
- **Acceptance:** Tab key cannot tab past menu items into background content while menu is open.
- **Estimated lines:** ~10

---

## Summary

The 05-pixel-tech variant scores **73.6/100** aggregate weighted. The cyberpunk aesthetic and technical implementation are strong — CTA funnel is excellent (93/100), content quality is high (87/100), and usability fundamentals pass (85/100). The three blocking issues requiring immediate attention are: (1) **body text contrast fails catastrophically** (WCAG violation), (2) **all meta descriptions exceed 160 chars**, and (3) **JSON-LD schema is entirely missing**. These must be fixed before deployment. The RTL layout gap and missing sitemap/robots are high-priority architectural issues. Font files and favicon assets need to be provisioned at build time.
