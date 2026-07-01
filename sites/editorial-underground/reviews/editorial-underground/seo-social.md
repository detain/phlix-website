# SEO + Social Metadata Review — Editorial Underground

## SEO — Score: 88/100

### Findings

#### index.html
1. **`<title>` ≤ 60 chars, page-specific** ✅ — `index.html:6` — "Phlix — No Signal. No Permission. Just Play." (47 chars)
2. **`<meta name="description">` ≤ 160 chars** ✅ — `index.html:7` — 127 chars
3. **`<meta name="keywords">` present** ✅ — `index.html:8`
4. **`<link rel="canonical">` absolute URL** ✅ — `index.html:9` — `https://detain.github.io/phlix-website/sites/editorial-underground/`
5. **Exactly one `<h1>`, unbroken heading hierarchy** ✅ — `index.html:88` — single `<h1 id="hero-heading">`, h2s descend logically
6. **Descriptive anchor text (no "click here")** ✅ — all link text is meaningful
7. **JSON-LD SoftwareApplication block** ✅ — `index.html:43–54` — name, description, applicationCategory, operatingSystem, offers/price=0, license all present

#### features.html
1. **`<title>` ≤ 60 chars** ✅ — `features.html:6` — "Features — Phlix" (16 chars)
2. **`<meta name="description">` ≤ 160 chars** ✅ — `features.html:7` — 127 chars
3. **`<meta name="keywords">` present** ✅ — `features.html:8`
4. **`<link rel="canonical">` absolute URL** ✅ — `features.html:9`
5. **Exactly one `<h1>`, unbroken heading hierarchy** ✅ — `features.html:63` — `<h1>Features</h1>`, h2s for feature details
6. **Descriptive anchor text** ✅

#### clients.html
1. **`<title>` ≤ 60 chars** ✅ — `clients.html:6` — "Clients — Phlix" (15 chars)
2. **`<meta name="description">` ≤ 160 chars** ✅ — `clients.html:7`
3. **`<meta name="keywords">` present** ❌ — `clients.html` — **MISSING** — `<meta name="keywords">` not present in `<head>`
4. **`<link rel="canonical">` absolute URL** ✅ — `clients.html:8`
5. **Exactly one `<h1>`, unbroken heading hierarchy** ✅ — `clients.html:62` — `<h1>Clients</h1>`, h2s for client cards
6. **Descriptive anchor text** ✅

#### download.html
1. **`<title>` ≤ 60 chars** ✅ — `download.html:6` — "Download — Phlix" (17 chars)
2. **`<meta name="description">` ≤ 160 chars** ✅ — `download.html:7`
3. **`<meta name="keywords">` present** ✅ — `download.html:8`
4. **`<link rel="canonical">` absolute URL** ✅ — `download.html:9`
5. **Exactly one `<h1>`, unbroken heading hierarchy** ✅ — `download.html:62` — `<h1>Download</h1>`
6. **Descriptive anchor text** ✅ — ecosystem list links use descriptive text

#### plugins.html
1. **`<title>` ≤ 60 chars** ✅ — `plugins.html:6` — "Plugins — Phlix" (15 chars)
2. **`<meta name="description">` ≤ 160 chars** ✅ — `plugins.html:7`
3. **`<meta name="keywords">` present** ✅ — `plugins.html:8`
4. **`<link rel="canonical">` absolute URL** ✅ — `plugins.html:9`
5. **Exactly one `<h1>`, unbroken heading hierarchy** ✅ — `plugins.html:62` — `<h1>Plugins</h1>`
6. **Descriptive anchor text** ✅

#### docs.html
1. **`<title>` ≤ 60 chars** ✅ — `docs.html:6` — "Docs — Phlix" (12 chars)
2. **`<meta name="description">` ≤ 160 chars** ✅ — `docs.html:7`
3. **`<meta name="keywords">` present** ✅ — `docs.html:8`
4. **`<link rel="canonical">` absolute URL** ✅ — `docs.html:9`
5. **Exactly one `<h1>`, unbroken heading hierarchy** ✅ — `docs.html:62` — `<h1>Documentation</h1>`
6. **Descriptive anchor text** ✅

#### hub.html
1. **`<title>` ≤ 60 chars** ✅ — `hub.html:6` — "Hub — Phlix" (12 chars)
2. **`<meta name="description">` ≤ 160 chars** ✅ — `hub.html:7`
3. **`<meta name="keywords">` present** ✅ — `hub.html:8`
4. **`<link rel="canonical">` absolute URL** ✅ — `hub.html:9`
5. **Exactly one `<h1>`, unbroken heading hierarchy** ✅ — `hub.html:62` — `<h1>Phlix Hub</h1>`
6. **Descriptive anchor text** ✅

#### about.html
1. **`<title>` ≤ 60 chars** ✅ — `about.html:6` — "About — Phlix" (13 chars)
2. **`<meta name="description">` ≤ 160 chars** ✅ — `about.html:7`
3. **`<meta name="keywords">` present** ✅ — `about.html:8`
4. **`<link rel="canonical">` absolute URL** ✅ — `about.html:9`
5. **Exactly one `<h1>`, unbroken heading hierarchy** ✅ — `about.html:62` — `<h1>About</h1>`
6. **Descriptive anchor text** ✅

#### sitemap.xml
8. **sitemap.xml has all 8 pages with absolute URLs** ✅ — `sitemap.xml` — all 8 pages present with absolute `https://detain.github.io/phlix-website/sites/editorial-underground/` URLs

#### robots.txt
9. **robots.txt references sitemap** ✅ — `robots.txt:4` — `Sitemap: https://detain.github.io/phlix-website/sites/editorial-underground/sitemap.xml`

---

## Social Metadata — Score: 88/100

### Findings

#### All 8 pages (index, features, clients, download, plugins, docs, hub, about)
1. **`og:type=website`** ✅ — all pages
2. **`og:site_name=Phlix`** ✅ — all pages
3. **`og:url` absolute URL** ✅ — all 8 pages
4. **`og:title`** ✅ — all pages
5. **`og:description`** ✅ — all pages
6. **`og:image` absolute URL** ⚠️ — all pages reference `og.svg`; spec §8 requires a rasterized `og.png` at 1200×630. Meta references `img/og.svg` not `img/og.png`.
7. **`twitter:card=summary_large_image`** ✅ — all pages
8. **`twitter:title`** ✅ — all pages
9. **`twitter:description`** ✅ — all pages
10. **`twitter:image`** ⚠️ — same issue as og:image; `img/og.svg` used instead of `img/og.png`
11. **`twitter:creator=@detain`** ✅ — all pages
12. **`<meta name="theme-color">=#FFE500`** ✅ — all pages
13. **`<link rel="icon" type="image/svg+xml">` present** ✅ — all pages

---

### Summary

**SEO: 88/100**
- ❌ `clients.html` is missing `<meta name="keywords">` — the only missing keywords tag across all 8 pages
- ✅ All other SEO checks pass cleanly

**Social Metadata: 88/100**
- ⚠️ Every page's `og:image` and `twitter:image` point to `img/og.svg`; spec §8 requires a rasterized `og.png` (1200×630). The editable SVG source exists at `img/og.svg` but the deployed meta references the SVG, not the required PNG derivative. This affects all 8 pages.
- ✅ All other social metadata checks pass

**Critical path items:**
| # | Issue | Severity | File |
|---|-------|----------|------|
| 1 | Missing `<meta name="keywords">` on `clients.html` | ❌ | `clients.html:7` (absent) |
| 2 | `og:image`/`twitter:image` reference `og.svg` instead of `og.png` | ⚠️ | All 8 pages |
