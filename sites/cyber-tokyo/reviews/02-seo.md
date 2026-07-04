# Dimension 2: SEO

## Score: 95/100

## Severity: ✅

## Findings

No critical issues. Minor: the site name is the default Phlix tagline; a more distinctive home title could improve CTR.

## What passed

- **`<title>` ≤ 60 chars on all 8 pages**: 
  - `index.html:6`: "Phlix — Every Screen. Every Signal. Every Story." (47 chars) ✅
  - `features.html:6`: "Features — Phlix" (15 chars) ✅
  - `clients.html:6`: "Clients — Phlix" (14 chars) ✅
  - `download.html:6`: "Download — Phlix" (16 chars) ✅
  - `plugins.html:6`: "Plugins — Phlix" (14 chars) ✅
  - `docs.html:6`: "Docs — Phlix" (11 chars) ✅
  - `hub.html:6`: "Hub — Phlix" (11 chars) ✅
  - `about.html:6`: "About — Phlix" (12 chars) ✅

- **`<meta name="description">` ≤ 160 chars on all 8 pages**: All pages use "Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support." (107 chars) ✅

- **`<meta name="keywords">` present on all 8 pages** (`index.html:8`, `features.html:8`, `clients.html:8`, `download.html:8`, `plugins.html:8`, `docs.html:8`, `hub.html:8`, `about.html:8`): All reference `content.json` keywords ✅

- **`<link rel="canonical">` on all 8 pages** with absolute URLs pointing to the correct page URL ✅

- **One `<h1>` per page**: Home has hero h1 (`index.html:90`); all other pages have `.page-header h1` — no duplicate h1 elements ✅

- **Heading hierarchy unbroken**: All pages follow h1 → h2 → h3 with no skipped levels. Feature cards use h3, feature details use h2 ✅

- **Descriptive anchor text throughout**: "See all features →" (not "click here"), "View source" buttons, "Get Phlix" CTAs — all meaningful ✅

- **JSON-LD on home page** (`index.html:38`): Complete `SoftwareApplication` schema with `name`, `description`, `applicationCategory`, `operatingSystem`, `offers` (price=0, priceCurrency=USD), `license` ✅

- **`sitemap.xml`** contains all 8 pages with absolute canonical URLs, priority values, and changefreq ✅

- **`robots.txt`** references the sitemap correctly at the absolute URL ✅

- **Semantic landmarks present**: `role="banner"`, `role="navigation"` (×2: nav-primary + footer-nav), `role="contentinfo"`, `role="main"` — each used exactly once per page ✅
