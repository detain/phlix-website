# DIMENSION 11: Social Metadata

## Score: 85/100
## Severity: ⚠️ (one ❌ issue, all other elements correct)

---

## Findings

### ✅ PASS — Complete `<head>` on every page (all 8 pages checked)

Every page (`index.html`, `features.html`, `clients.html`, `download.html`, `plugins.html`, `docs.html`, `hub.html`, `about.html`) contains all required social metadata:

| Required tag | Present on all pages | Reference |
|-------------|---------------------|-----------|
| `<meta property="og:title">` | ✅ | e.g. index.html:11 |
| `<meta property="og:description">` | ✅ | e.g. index.html:12 |
| `<meta property="og:image">` (absolute URL) | ✅ | e.g. index.html:13 |
| `<meta property="og:url">` (absolute) | ✅ | e.g. index.html:14 |
| `<meta property="og:type=website">` | ✅ | e.g. index.html:15 |
| `<meta property="og:site_name=Phlix">` | ✅ | e.g. index.html:16 |
| `<meta name="twitter:card=summary_large_image">` | ✅ | e.g. index.html:19 |
| `<meta name="twitter:title">` | ✅ | e.g. index.html:20 |
| `<meta name="twitter:description">` | ✅ | e.g. index.html:21 |
| `<meta name="twitter:image">` | ✅ | e.g. index.html:22 |
| `<meta name="twitter:creator=@detain">` | ✅ | e.g. index.html:23 |
| `<meta name="theme-color">` = `#00E676` | ✅ | e.g. index.html:26 |
| `<link rel="icon" type="image/svg+xml">` | ✅ | e.g. index.html:29 |

### ✅ PASS — Canonical URL is absolute on every page

All pages have `<link rel="canonical">` with absolute URLs:
- index.html:8 — `https://detain.github.io/phlix-website/sites/soundwave-studio/`
- features.html:8 — `https://detain.github.io/phlix-website/sites/soundwave-studio/features.html`
- (and similarly on all other pages) ✅

### ✅ PASS — og:image URL is absolute on every page

All `og:image` meta values use absolute URLs:
- index.html:13 — `https://detain.github.io/phlix-website/sites/soundwave-studio/img/og.svg` ✅

### ❌ FAIL — og:image is SVG, not the required 1200×630 PNG

**File:** `img/og.svg` (all 8 pages reference it as `og:image`)

**Problem:** The `img/` directory contains only `og.svg`. The site spec `new_site.md` §8 is explicit:

> "`og.png` (1200×630) — social share card: brand background, logo/wordmark, `hero.headline` or `tagline_primary`. Ship `og.svg` as the **editable source** if used, but reference a rasterized **`og.png`** in meta."

Social media scrapers (Facebook, LinkedIn, Discord, Slack, Twitter/X) **do not reliably render SVG images as Open Graph og:image**. Facebook's sharing debugger explicitly warns on SVG og:images. Twitter's card validator also has issues with SVG. Only a properly sized PNG (1200×630) will render consistently across all platforms.

**Exact fix needed:**
1. Rasterize `img/og.svg` to `img/og.png` at exactly **1200×630 pixels**
2. Update all 8 pages — change `content="https://detain.github.io/phlix-website/sites/soundwave-studio/img/og.svg"` → `content="https://detain.github.io/phlix-website/sites/soundwave-studio/img/og.png"` in both `og:image` and `twitter:image` meta tags

### ✅ PASS — OG image dimensions

The requirement states "og:image is 1200×630". The `og.svg` file is a vector file and could be rendered at that size, but as noted above, the rasterized PNG is required for social scraper compatibility. If the SVG is properly designed at 1200×630 viewBox, it would meet the dimension requirement — but scraper compatibility is the blocker.

---

## Verdict

Every structural social metadata element is correct (absolute URLs, all required tags, correct Twitter creator, correct theme-color). The single ❌ issue is that `og:image` points to an SVG file when a 1200×630 PNG is explicitly required by the spec. This will cause rendering failures or warnings on major social platforms.
