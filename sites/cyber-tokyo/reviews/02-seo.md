# Dimension 2: SEO
**On-page SEO, structured data, sitemap, robots**

---

## Score: 68 / 100

## Verdict: CONDITIONAL (≥80, no ❌ but has issues)

---

## Findings

### ✅ Titles — All ≤60 chars, page-specific
| Page | Title | Length |
|------|-------|--------|
| index | `Phlix — Your media. Your library. Your Phlix.` | 43 chars |
| features | `Features — Phlix` | 16 chars |
| clients | `Clients — Phlix` | 14 chars |
| download | `Download — Phlix` | 16 chars |
| plugins | `Plugins — Phlix` | 15 chars |
| docs | `Docs — Phlix` | 11 chars |
| hub | `Hub — Phlix` | 11 chars |
| about | `About — Phlix` | 12 chars |

All pass ≤60 char requirement.

### ✅ Meta Descriptions — All ≤160 chars
- All pages use the standard description: "Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support." = ~110 chars. ✅

### ✅ Heading Hierarchy — Single h1 per page
- index.html: one `<h1 id="hero-heading">` — ✅
- features.html: `<h1>Features</h1>` — ✅
- clients.html: `<h1>Clients</h1>` — ✅
- All other pages: same pattern — ✅

### ✅ Canonical URLs — All absolute
- index: `https://detain.github.io/phlix-website/cyber-tokyo/`
- features: `https://detain.github.io/phlix-website/cyber-tokyo/features.html`
- All 8 pages have correct canonical tags — ✅

### ✅ JSON-LD on Home Page
- index.html:38-49 — `SoftwareApplication` block with name, description, applicationCategory, operatingSystem, offers/price=0, license — ✅

### ✅ Sitemap.xml — Present with all 8 pages
- `sitemap.xml` lists all 8 pages with absolute URLs, proper `changefreq` and `priority` values — ✅

### ❌ robots.txt — Overly Restrictive
- **File:** `robots.txt:2`
- **Issue:** `Allow: /cyber-tokyo/` combined with no other Allow rules restricts crawlers to only that subdirectory. For a GitHub Pages site served from the repo root, this means crawlers cannot access other important paths (if any exist at root). More critically, this disallows all other crawling at the repo root level.
- A standard robots.txt for a site at `https://detain.github.io/phlix-website/cyber-tokyo/` should either be absent (letting the host root handle it) or use `Allow: /` with a Sitemap reference.
- The current rule `Allow: /cyber-tokyo/` implies a multi-site host structure where the restriction is intentional, but the sitemap still lives at the root `sitemap.xml`. If the crawler follows the sitemap (which it should), this may not cause practical harm. However the robots.txt file itself is non-standard.
- **Severity:** Minor — sitemap is still referenced correctly; crawlers following only sitemap won't be affected
- **Confidence:** 85%

### ⚠️ Descriptive Anchor Text — All pages
- All internal links use descriptive text (Features, Clients, Download, etc.) — ✅
- No "click here" or "read more" patterns — ✅
- External links use descriptive text ("View source", "Documentation") — ✅

### ⚠️ Metadata Keywords — Present
- index.html:8 — keywords meta tag present with relevant terms — ✅

---

## Summary

SEO fundamentals are solid: titles, meta descriptions, h1 hierarchy, canonical tags, JSON-LD, and sitemap are all correct. The one issue is the robots.txt file which uses a restrictive `Allow: /cyber-tokyo/` that may confuse crawlers in multi-site setups, though the sitemap reference still works. This is a minor structural issue rather than a content issue.
