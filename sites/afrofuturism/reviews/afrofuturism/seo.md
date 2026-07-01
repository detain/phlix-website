# SEO Review — Phlix Afrofuturism Marketing Site

**Reviewer:** adversarial SEO reviewer (CodeReviewer agent)
**Date:** 2026-06-30
**Spec base:** `new_site.md` §10 (SEO) and §11 (social metadata)
**Site root:** `/home/sites/phlix/phlix-website/sites/afrofuturism/`

---

## Overall SEO Score: 61 / 100

The site has a solid structural foundation — correct canonical URLs, proper Twitter Card setup, absolute OG/Twitter image URLs, theme-color, favicon link, correct sitemap with all 8 pages, and a valid robots.txt. However, there are **two critical regressions** and **widespread duplicate meta descriptions** that together drop the score below the 90-point PASS threshold.

---

## Per-Page Scores

| Page | Score | Critical Issues |
|------|-------|-----------------|
| index.html | 62 | Duplicate meta description; og:image SVG not PNG; missing WebPage JSON-LD |
| features.html | 62 | Duplicate meta description; og:image SVG not PNG; missing WebPage JSON-LD |
| clients.html | 62 | Duplicate meta description; og:image SVG not PNG; missing WebPage JSON-LD |
| download.html | 62 | Duplicate meta description; og:image SVG not PNG; missing WebPage JSON-LD |
| plugins.html | 75 | og:image SVG not PNG; missing WebPage JSON-LD |
| docs.html | 75 | og:image SVG not PNG; missing WebPage JSON-LD |
| hub.html | 75 | og:image SVG not PNG; missing WebPage JSON-LD |
| about.html | 75 | og:image SVG not PNG; missing WebPage JSON-LD |

---

## Critical Defects (Security/P0)

### C1 — `og:image` points to SVG on all 8 pages (ALL PAGES)
**Severity:** HIGH — social sharing is broken on all platforms
**Spec:** §8: `og.png (1200×630)` — "Ship og.svg as the editable source but reference a rasterized og.png in meta."
**Spec:** §11: `og:image` must be "absolute URL to the 1200×630 png"

The meta tag on every page reads:
```html
<meta property="og:image" content="https://detain.github.io/phlix-website/sites/afrofuturism/img/og.svg">
```

**Why this is critical:**
- Twitter's card validator explicitly requires JPEG or PNG; SVG is not in their supported formats
- Facebook/Linkedin scrapers may reject non-raster images for OG
- The 1200×630 dimension requirement implies raster (SVGs are scalable but scrapers request a rendered size)
- This is a **known past bug** per the spec: "a relative og:image is a known past bug — always absolute" — but the format bug is equally serious

**Fix:** Generate `img/og.png` (1200×630 rasterized PNG from the SVG), update all 8 pages:
```html
<meta property="og:image" content="https://detain.github.io/phlix-website/sites/afrofuturism/img/og.png">
<meta name="twitter:image" content="https://detain.github.io/phlix-website/sites/afrofuturism/img/og.png">
```

---

## High-Priority Defects

### H1 — Duplicate meta descriptions on 4 pages
**Severity:** HIGH — direct SEO impact
**Spec:** §10 — no explicit uniqueness requirement, but Google's content marketing guidelines treat duplicate meta descriptions as a quality issue

| Page | Duplicate Of | Characters |
|------|-------------|------------|
| `index.html:7` | — | 117 |
| `features.html:7` | index.html | 117 |
| `clients.html:7` | index.html | 117 |
| `download.html:7` | index.html | 117 |

All four share:
> "Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support."

The other 4 pages (plugins, docs, hub, about) have unique descriptions.

**Impact:** When Google indexes these pages, it will show the same snippet in search results for all four. Users cannot differentiate from SERPs. The `about.html` page with a unique description will likely outperform the duplicate-description pages for branded queries.

**Fix — per-page unique descriptions:**

- `features.html`: "Explore all Phlix features — SyncPlay, Live TV/DVR, DLNA, multi-user profiles, transcoding, and a plugin system. Open-source PHP media server."
- `clients.html`: "Phlix clients for Roku, Samsung Tizen, Windows, Mobile, and any DLNA device. Native apps for every screen in your home."
- `download.html`: "Download Phlix — the self-hostable PHP media server. PHP 8.3+, Workerman 5.x. Server source, Rok u, Samsung Tizen, Windows, and Mobile clients."

---

### H2 — No WebPage JSON-LD on any subpage
**Severity:** MEDIUM — reduces rich result eligibility for subpages
**Spec:** §10 — JSON-LD `SoftwareApplication` block on home page only; no explicit mention of WebPage schema. However, Google's SEO recommendations include WebPage schema on all pages as best practice.

No page other than `index.html` has any JSON-LD block.

**Recommended fix for each subpage** (e.g., features.html):
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Features — Phlix",
  "description": "Explore all Phlix features...",
  "url": "https://detain.github.io/phlix-website/sites/afrofuturism/features.html",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Phlix",
    "url": "https://detain.github.io/phlix-website/sites/afrofuturism/"
  }
}
</script>
```

---

## Per-Page Defect Log

### index.html

| # | Element | Line | Issue | Severity |
|---|---------|------|-------|----------|
| 1 | `meta description` | 7 | Duplicate of features/clients/download (117 chars) | HIGH |
| 2 | `og:image` | 15 | SVG file — spec requires PNG | CRITICAL |
| 3 | JSON-LD | 26 | Home page has SoftwareApplication ✓ but no supplementary WebPage schema | MEDIUM |

**Score: 62/100**

---

### features.html

| # | Element | Line | Issue | Severity |
|---|---------|------|-------|----------|
| 1 | `title` | 6 | "Features — Phlix" — no page-specific keyword beyond brand | LOW |
| 2 | `meta description` | 7 | Duplicate of index.html (117 chars) — same description, different page | HIGH |
| 3 | `og:image` | 15 | SVG file — spec requires PNG | CRITICAL |
| 4 | JSON-LD | — | Absent — no WebPage schema | MEDIUM |

**Score: 62/100**

---

### clients.html

| # | Element | Line | Issue | Severity |
|---|---------|------|-------|----------|
| 1 | `title` | 6 | "Clients — Phlix" — no page-specific keyword beyond brand | LOW |
| 2 | `meta description` | 7 | Duplicate of index.html (117 chars) | HIGH |
| 3 | `og:description` | 14 | "Native clients on Roku, Samsung Tizen, Windows, Mobile, plus any DLNA device. Self-hostable PHP media server." (117 chars) — slightly different from meta description but still generic | LOW |
| 4 | `og:image` | 15 | SVG file — spec requires PNG | CRITICAL |
| 5 | JSON-LD | — | Absent — no WebPage schema | MEDIUM |

**Score: 62/100**

---

### download.html

| # | Element | Line | Issue | Severity |
|---|---------|------|-------|----------|
| 1 | `meta description` | 7 | Duplicate of index.html (117 chars) | HIGH |
| 2 | `og:description` | 14 | "Get Phlix — self-hostable PHP media server. PHP 8.3+, Workerman 5.x async server. Download clients and the server itself." — unique but truncated display concern | LOW |
| 3 | `og:image` | 15 | SVG file — spec requires PNG | CRITICAL |
| 4 | JSON-LD | — | Absent — no WebPage schema | MEDIUM |

**Score: 62/100**

---

### plugins.html

| # | Element | Line | Issue | Severity |
|---|---------|------|-------|----------|
| 1 | `og:image` | 15 | SVG file — spec requires PNG | CRITICAL |
| 2 | JSON-LD | — | Absent — no WebPage schema | MEDIUM |

**Notes:** Unique meta description (106 chars) — good. Title, canonical, OG/Twitter tags all correct.

**Score: 75/100**

---

### docs.html

| # | Element | Line | Issue | Severity |
|---|---------|------|-------|----------|
| 1 | `og:image` | 15 | SVG file — spec requires PNG | CRITICAL |
| 2 | JSON-LD | — | Absent — no WebPage schema | MEDIUM |

**Notes:** Unique meta description (89 chars) — good. Title, canonical, OG/Twitter tags all correct.

**Score: 75/100**

---

### hub.html

| # | Element | Line | Issue | Severity |
|---|---------|------|-------|----------|
| 1 | `og:image` | 15 | SVG file — spec requires PNG | CRITICAL |
| 2 | JSON-LD | — | Absent — no WebPage schema | MEDIUM |

**Notes:** Unique meta description (138 chars) — good. Title, canonical, OG/Twitter tags all correct.

**Score: 75/100**

---

### about.html

| # | Element | Line | Issue | Severity |
|---|---------|------|-------|----------|
| 1 | `og:image` | 15 | SVG file — spec requires PNG | CRITICAL |
| 2 | JSON-LD | — | Absent — no WebPage schema | MEDIUM |

**Notes:** Unique meta description (112 chars) — good. Title, canonical, OG/Twitter tags all correct.

**Score: 75/100**

---

## robots.txt — PASS (100/100)

```
User-agent: *
Allow: /
Sitemap: https://detain.github.io/phlix-website/sites/afrofuturism/sitemap.xml
```
- Allow all ✓
- Sitemap reference present and uses absolute URL ✓

---

## sitemap.xml — PASS (95/100)

| Page | changefreq | priority | Notes |
|------|-----------|----------|-------|
| index.html | weekly | 1.0 | ✓ |
| features.html | monthly | 0.9 | ✓ |
| clients.html | monthly | 0.9 | ✓ |
| download.html | weekly | 0.9 | ✓ |
| plugins.html | monthly | 0.8 | ✓ |
| docs.html | monthly | 0.8 | ✓ |
| hub.html | monthly | 0.8 | ✓ |
| about.html | monthly | 0.7 | ✓ |

All 8 pages present ✓ | All absolute URLs ✓ | changefreq in {weekly,monthly} ✓ | priority in 0.7–1.0 ✓

**Minor:** download.html set to weekly changefreq — weekly is appropriate for a download page with potentially versioned content, but if downloads rarely change, monthly would be more accurate.

---

## Structural/Accessibility SEO

### Heading hierarchy — PASS
All pages have exactly one `<h1>` ✓
Heading hierarchy is unbroken (h1 → h2 → h3) on all pages ✓
No skipped heading levels detected ✓

### Semantic landmarks — PASS
All pages include: `role="banner"`, `role="navigation"`, `role="main"`, `role="contentinfo"` ✓
Landmarks appear exactly once each per page ✓

### Skip link — PASS
`<a class="skip-link" href="#main-content">` is first focusable element on all pages ✓

### Alt text — PASS
`img/logo.svg` has `alt="Phlix logo"` ✓
All decorative SVGs use `aria-hidden="true"` ✓
No `<img>` tags with missing alt attributes detected ✓

### Descriptive anchor text — PASS
No "click here" or "read more" generic links found ✓
External links use `rel="noopener noreferrer"` ✓

### Canonical URLs — PASS (all pages)
All pages have correct `<link rel="canonical">` pointing to their absolute URL ✓

---

## Verdict: FAIL (61/100)

The site is structurally sound — semantic HTML, heading hierarchy, landmarks, skip links, alt text, canonical URLs, robots.txt, and sitemap.xml are all correctly implemented. The Twitter Card setup and Open Graph tags are complete and use absolute URLs throughout.

**Two regressions prevent a PASS:**

1. **`og:image` is SVG on all 8 pages** — the spec explicitly requires a 1200×630 PNG. SVG for OG images is non-standard and will cause Twitter/social scraper failures. This is a one-line fix per page but blocks all social sharing.

2. **Duplicate meta descriptions on 4 pages** — index, features, clients, and download all share the same 117-character description. This is a content differentiation problem that will cause generic or duplicate search snippets.

**Required fixes (in priority order):**
1. Generate `img/og.png` from `img/og.svg` and update all 8 `og:image` meta tags
2. Rewrite meta descriptions for features.html, clients.html, download.html to be unique per page
3. Add WebPage JSON-LD to each subpage (optional but recommended)

**Estimated fix effort:** 2 hours — generate PNG, update 8 meta tags, write 4 unique descriptions, add 7 JSON-LD blocks.
