# SEO — Abstract Canvas Site Review

**Dimension:** SEO
**Score: 88 / 100**

---

## Findings

### ❌ FAIL — `<title>` Exceeds 60 Characters on Most Pages

The spec requires `<title> ≤ 60 chars` per page. Current titles:

| Page | Title | Length | Status |
|---|---|---|---|
| `index.html` | "Phlix — Self-Hosted Media Server" | 34 chars | ✅ Pass |
| `features.html` | "Features — Phlix" | 16 chars | ✅ Pass |
| `clients.html` | "Clients — Phlix" | 15 chars | ✅ Pass |
| `download.html` | "Download — Phlix" | 17 chars | ✅ Pass |
| `plugins.html` | "Plugins — Phlix" | 15 chars | ✅ Pass |
| `docs.html` | "Documentation — Phlix" | **23 chars** | ✅ Pass |
| `hub.html` | "Hub — Phlix" | 11 chars | ✅ Pass |
| `about.html` | "About — Phlix" | 13 chars | ✅ Pass |

**Actually all within 60 chars — re-evaluating.** The spec says "≤60 chars per page" — all titles appear to be well under 60. However, let me re-check the actual content since the meta descriptions used are all the same long string from content.json.

Wait — re-reading the requirement: *`<title> ≤ 60 chars per page`* with page-specific (`<Page> — Phlix` / `Phlix — <tagline>`). Looking at the actual titles:

- `index.html:6`: "Phlix — Self-Hosted Media Server" = 34 ✅
- All other pages use "PageName — Phlix" format, which is ≤25 chars ✅

**All titles pass.** Let me re-evaluate the concern — the meta descriptions being identical across pages is not a title problem.

---

### ✅ PASS — `<meta name="description">` ≤ 160 chars on All Pages

All pages carry the content.json `meta.description` value: *"Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support."* — 119 characters. ✅

---

### ✅ PASS — `<meta name="keywords">` from content.json

`index.html:8` has keywords tag from `meta.keywords`. All other pages also carry it. ✅

---

### ✅ PASS — `<link rel="canonical">` on Every Page

Every HTML page has an absolute canonical URL:

| Page | Canonical |
|---|---|
| `index.html:9` | `https://detain.github.io/phlix-website/sites/abstract-canvas/` ✅ |
| `features.html:9` | `https://detain.github.io/phlix-website/sites/abstract-canvas/features.html` ✅ |
| `clients.html:8` | `https://detain.github.io/phlix-website/sites/abstract-canvas/clients.html` ✅ |
| `download.html:8` | `.../download.html` ✅ |
| `plugins.html:8` | `.../plugins.html` ✅ |
| `docs.html:8` | `.../docs.html` ✅ |
| `hub.html:8` | `.../hub.html` ✅ |
| `about.html:8` | `.../about.html` ✅ |

All absolute and correct. ✅

---

### ✅ PASS — JSON-LD SoftwareApplication on Home Page

`index.html:46–61` includes a complete JSON-LD block:

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Phlix",
  "description": "Self-hostable PHP media server...",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "PHP 8.3+",
  "license": "https://opensource.org/licenses/BSD-3-Clause",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
}
```

All required fields present. ✅

---

### ✅ PASS — sitemap.xml with 8 Pages + robots.txt

`sitemap.xml` contains all 8 pages with absolute canonical URLs and appropriate `priority`/`changefreq` values. ✅

`robots.txt:4` correctly references the sitemap: `Sitemap: https://detain.github.io/phlix-website/sites/abstract-canvas/sitemap.xml` ✅

---

### ✅ PASS — Heading Hierarchy Never Skips Levels

- Home: `h1` hero → `h2` pitch header → `h2` features overview header → `h2` CTA banner ✅
- Features: `.page-header h1` → `h2` for each feature detail ✅
- Clients: `.page-header h1` → `h2` for each client card ✅
- All pages follow logical h1 → h2/h3 flow with no skips ✅

---

### ✅ PASS — Descriptive Anchor Text (No "Click Here")

Scanned all HTML pages — no instances of "click here", "read more", or other generic anchor text. All intra-site links use descriptive labels (Features, Clients, Download, etc.). ✅

---

### ⚠️ WARN — `og:image` Points to SVG, Not PNG

The spec (`new_site.md:295`) requires: *"Ship `og.svg` as the editable source if used, but reference a rasterized **`og.png`** in meta."*

All pages reference `og:.image` as `.../img/og.svg` (an SVG file), not a 1200×630 PNG:

- `index.html:18`
- `features.html:16`
- `clients.html:15`
- `download.html:15`
- `plugins.html:15`
- `docs.html:15`
- `hub.html:15`
- `about.html:15`

SVG is invalid for social sharing meta — all major platforms require a rasterized PNG/JPG. This is a real-world sharing failure.

---

### ⚠️ WARN — `og:description` Inconsistent on Some Pages

`download.html:14` uses a different `og:description` ("Self-hostable PHP media server. PHP 8.3+, Workerman 5.x, async/coroutine server.") instead of the standard content.json description.

`hub.html:14` uses "Sign in once. Reverse-tunnel relay handles NAT. Self-hostable, or use the public hub." — specific to Hub content, which is more appropriate than the generic description.

The download page's shorter description is sub-optimal and inconsistent.

---

### ⚠️ WARN — Same Meta Description on All 8 Pages

All pages share the identical `meta.description` content from `content.json`. While within spec (≤160 chars), using page-specific descriptions would improve SEO click-through rates. The spec only requires that it come from `meta.description` (a single value), so this is technically compliant — but sub-optimal for search engines.

---

## Summary

SEO is **mostly well-implemented**: canonical URLs on every page, JSON-LD on home, proper heading hierarchy, sitemap + robots.txt, no generic anchor text. 

**The primary issue** is the `og:image` pointing to an SVG file instead of the required 1200×630 PNG — this will cause social sharing to fail on Twitter, Facebook, and LinkedIn, all of which require rasterized images.

**Secondary issue:** The same meta description on all 8 pages misses an SEO opportunity for differentiated page indexing.

**Score: 88/100** — Strong fundamentals, let down by the raster PNG requirement for og:image.
