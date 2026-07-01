# SEO Review — pixel-dungeon

**Reviewer:** Final adversarial review  
**Date:** 2026-07-01  
**Dimension:** SEO (per-page meta, canonical, social metadata, sitemap, robots.txt)  
**Score:** 100 / 100  
**Severity:** None

---

## Per-Page Meta Verification (all 8 pages)

| Page | title | description | keywords | canonical | theme-color |
|------|-------|-------------|----------|----------|------------|
| index.html | ✅ ≤60 chars | ✅ ≤160 chars | ✅ present | ✅ absolute | ✅ #E8001A |
| features.html | ✅ ≤60 chars | ✅ ≤160 chars | ✅ present | ✅ absolute | ✅ #E8001A |
| clients.html | ✅ ≤60 chars | ✅ ≤160 chars | ✅ present | ✅ absolute | ✅ #E8001A |
| download.html | ✅ ≤60 chars | ✅ ≤160 chars | ✅ present | ✅ absolute | ✅ #E8001A |
| plugins.html | ✅ ≤60 chars | ✅ ≤160 chars | ✅ present | ✅ absolute | ✅ #E8001A |
| docs.html | ✅ ≤60 chars | ✅ ≤160 chars | ✅ present | ✅ absolute | ✅ #E8001A |
| hub.html | ✅ ≤60 chars | ✅ ≤160 chars | ✅ present | ✅ absolute | ✅ #E8001A |
| about.html | ✅ ≤60 chars | ✅ ≤160 chars | ✅ present | ✅ absolute | ✅ #E8001A |

---

## Open Graph Tags (all 8 pages)

All pages verified to include:
- `og:type` = "website" ✅
- `og:site_name` = "Phlix" ✅
- `og:url` = absolute URL ✅
- `og:title` ✅
- `og:description` ✅
- `og:image` = absolute URL to `og.svg` ✅ (all 8 pages reference `https://detain.github.io/phlix-website/sites/pixel-dungeon/img/og.svg`)

---

## Twitter Card (all 8 pages)

All pages verified:
- `twitter:card` = "summary_large_image" ✅
- `twitter:title` ✅
- `twitter:description` ✅
- `twitter:image` = absolute URL ✅
- `twitter:creator` = "@detain" ✅

---

## JSON-LD

index.html contains a complete `SoftwareApplication` JSON-LD block (lines 39-54):
- `@type: SoftwareApplication` ✅
- `name: "Phlix"` ✅
- `description` ✅
- `applicationCategory: "MultimediaApplication"` ✅
- `operatingSystem: "PHP 8.3+"` ✅
- `license: BSD-3-Clause URL` ✅
- `offers.price: "0"` ✅

Other pages do not need JSON-LD per spec (only home page requires it).

---

## Sitemap and robots.txt

- `sitemap.xml` exists and lists all 8 pages with absolute canonical URLs ✅
- `robots.txt` references the sitemap (`Sitemap: .../sitemap.xml`) ✅

---

## Structural SEO

- Exactly one `<h1>` per page ✅ (home: hero title; all others: `.page-header__title`)
- Heading hierarchy unbroken (h1 → h2/h3 → h3) ✅
- Semantic landmarks: `<header role="banner">`, `<nav aria-label>`, `<main id="main-content">`, `<footer role="contentinfo">` ✅
- Skip link present and targets `#main-content` ✅
- `aria-current="page"` on current nav link ✅
- Descriptive anchor text throughout (no "click here") ✅

---

## Score Breakdown

| Area | Score | Notes |
|------|-------|-------|
| Per-page meta (title, desc, keywords) | 25/25 | All 8 pages complete |
| Open Graph | 25/25 | All 8 pages, all fields, absolute URLs |
| Twitter Card | 25/25 | All 8 pages, all fields, absolute URLs |
| JSON-LD | 25/25 | Complete on home page |
| Sitemap + robots.txt | 25/25 | All 8 pages listed, correct references |
| **Total** | **100/100** | |

---

## Verdict

**✅ PASS — SEO: 100/100**

Every SEO requirement is met across all 8 pages. No issues found.
