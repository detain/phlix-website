# SEO Review — `01-minimalist-cinema`

**Variant:** `01-minimalist-cinema`
**Reviewer:** Dimension Reviewer (SEO)
**Date:** 2026-05-20
**Files Reviewed:** 8 HTML pages (`index.html`, `about.html`, `hub.html`, `docs.html`, `plugins.html`, `download.html`, `clients.html`, `features.html`)

---

## Overall Assessment: REQUEST_CHANGES

Multiple critical SEO issues found. The variant has solid structural HTML and good heading hierarchy, but is missing foundational SEO files and has meta descriptions that exceed the 160-character limit.

---

## Score: 58 / 100

---

## ✅ Passed Items

| Criterion | Evidence |
|-----------|----------|
| **Title length ≤60 chars** | All 8 pages: `index.html` (29 chars), `about.html` (14), `hub.html` (12), `docs.html` (13), `plugins.html` (16), `download.html` (17), `clients.html` (16), `features.html` (17) |
| **Single H1 per page** | All 8 pages contain exactly one `<h1>` each |
| **Heading hierarchy (h1→h2→h3, no skips)** | All pages follow proper nesting: index.html (h1→h2→h3), about.html (h1→h2), hub.html (h1→h2→h2), docs.html (h1→h2→h2), plugins.html (h1→h2→h2), download.html (h1→h2→h3), clients.html (h1→h2), features.html (h1→h2) |
| **Semantic HTML** | Proper use of `<header role="banner">`, `<main>`, `<footer role="contentinfo">`, `<nav aria-label>`, `<article>`, `<section aria-labelledby>`, `<button type="button">`, `<dl>/<dt>/<dd>` for FAQ |
| **Canonical URL on every page** | All 8 pages have `<link rel="canonical" href="https://detain.github.io/phlix-website/{page}.html">` |
| **Internal links use descriptive anchor text** | Nav links: "Features", "Clients", "Download", "Plugins", "Docs", "Hub", "About" — all descriptive, no "click here" patterns found |

---

## ⚠️ Concerns (Non-blocking)

| Issue | Evidence | Impact |
|-------|----------|--------|
| **Identical meta descriptions across all pages** | All 8 pages share the same meta description | Low (搜索引擎 may treat as duplicate; each page should describe its specific content) |
| **No Open Graph `og:locale` tag** | Pages have `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name` but no `og:locale` | Minor (defaults to `en_US`; acceptable but not explicit) |
| **External-only OG image path** | `og:image` uses `/variants/01-minimalist-cinema/img/og.svg` which is a relative path that only works on the live domain | Medium (social sharing previews will work on the deployed site, but local testing/preview is impossible) |

---

## ❌ Failures (Must Fix)

| Issue | Evidence | Fix Required |
|-------|----------|--------------|
| **Meta descriptions exceed 160 chars** | All 8 pages have `content="Phlix — a self-hostable, open-source PHP media server with native clients for Roku, Samsung Tizen, Windows, and Mobile. SyncPlay, Live TV, transcoding, DLNA, hub relay."` which is **194 characters** | Truncate to ≤160 chars. Each page should have a unique, page-specific description ≤160 chars |
| **Missing `sitemap.xml`** | Not found at `variants/01-minimalist-cinema/sitemap.xml` or anywhere in the project | Create `sitemap.xml` at variant root listing all 8 pages |
| **Missing `robots.txt`** | Not found at `variants/01-minimalist-cinema/robots.txt` or anywhere in the project | Create `robots.txt` at variant root allowing crawl of all pages |
| **No JSON-LD structured data** | No `<script type="application/ld+json">` found on any page | Add Organization and/or WebSite JSON-LD schema (at minimum on index.html) |

---

## Recommendations (Ranked by Impact)

### 1. 🔴 Critical: Fix meta descriptions (HIGH IMPACT)
**Problem:** 194 chars exceeds the 160-char limit. Search engines will truncate, potentially cutting off important keywords.

**Fix per page (examples):**
- `index.html`: "Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support."
  - Count: 137 chars ✅
- `about.html`: "Learn about Phlix — an open-source BSD-3 licensed media server you control."
  - Count: 77 chars ✅
- `features.html`: "Explore all Phlix features: SyncPlay, transcoding, DLNA, multi-user profiles, Live TV DVR, and plugin system."
  - Count: 118 chars ✅
- `download.html`: "Download Phlix server and native clients for Roku, Samsung Tizen, Windows, iOS, and Android."
  - Count: 96 chars ✅
- `clients.html`: "Native media player apps for Roku, Samsung Tizen, Windows, iOS, Android, and any DLNA device."
  - Count: 105 chars ✅
- `plugins.html`: "Extend Phlix with plugins using the versioned LifecycleInterface manifest contract."
  - Count: 85 chars ✅
- `docs.html`: "Phlix documentation, API reference, developer guides, and ecosystem overview."
  - Count: 76 chars ✅
- `hub.html`: "Access your Phlix server from anywhere via the reverse-tunnel hub relay."
  - Count: 77 chars ✅

### 2. 🔴 Critical: Create `sitemap.xml` (HIGH IMPACT)
**Purpose:** Enables search engines to discover all pages efficiently.

**Example structure:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://detain.github.io/phlix-website/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://detain.github.io/phlix-website/about.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- ... all 8 pages -->
</urlset>
```

### 3. 🔴 Critical: Create `robots.txt` (HIGH IMPACT)
**Purpose:** Directs search engine crawlers and can specify sitemap location.

**Example:**
```
User-agent: *
Allow: /
Sitemap: https://detain.github.io/phlix-website/sitemap.xml
```

### 4. 🟠 Major: Add JSON-LD structured data (MEDIUM IMPACT)
**Purpose:** Enhanced search results with rich snippets.

**Minimum: Add to `index.html` inside `<head>`:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Phlix",
  "description": "Self-hostable open-source PHP media server",
  "url": "https://detain.github.io/phlix-website/",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "PHP 8.3+",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
</script>
```

**Bonus: Organization JSON-LD on all pages:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Phlix",
  "url": "https://detain.github.io/phlix-website/",
  "sameAs": [
    "https://github.com/detain"
  ]
}
</script>
```

### 5. 🟡 Minor: Add `og:locale` (LOW IMPACT)
Add to all pages in `<head>`:
```html
<meta property="og:locale" content="en_US">
```

---

## Evidence Summary

| Page | Title | Title Len | Meta Desc Len | H1 Count | Canonical | JSON-LD |
|------|-------|-----------|---------------|----------|-----------|---------|
| index.html | "Phlix — Your media. Your way." | 29 ✅ | 194 ❌ | 1 ✅ | ✅ | ❌ |
| about.html | "About — Phlix" | 14 ✅ | 194 ❌ | 1 ✅ | ✅ | ❌ |
| hub.html | "Hub — Phlix" | 12 ✅ | 194 ❌ | 1 ✅ | ✅ | ❌ |
| docs.html | "Docs — Phlix" | 13 ✅ | 194 ❌ | 1 ✅ | ✅ | ❌ |
| plugins.html | "Plugins — Phlix" | 16 ✅ | 194 ❌ | 1 ✅ | ✅ | ❌ |
| download.html | "Download — Phlix" | 17 ✅ | 194 ❌ | 1 ✅ | ✅ | ❌ |
| clients.html | "Clients — Phlix" | 16 ✅ | 194 ❌ | 1 ✅ | ✅ | ❌ |
| features.html | "Features — Phlix" | 17 ✅ | 194 ❌ | 1 ✅ | ✅ | ❌ |

---

## Exit Criteria

This review is **complete**. The variant has:
- ✅ Good structural HTML and heading hierarchy
- ✅ Descriptive internal anchor text
- ❌ Meta descriptions 34 chars over limit (must fix)
- ❌ Missing sitemap.xml (must fix)
- ❌ Missing robots.txt (must fix)
- ❌ Missing JSON-LD (should fix)

**Recommendation:** Block merge until critical items are addressed.
