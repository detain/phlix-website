# SEO Review — Marina Breeze

**Dimension:** SEO
**Score:** 75/100
**Severity:** ⚠️

---

## Findings

### ✅ PASS — Page Titles (≤60 chars)
All 8 pages have titles ≤60 characters:

| Page | Title | Length |
|------|-------|--------|
| index | `Phlix — Set Sail for Tonight` | 26 chars ✅ |
| features | `Features — Phlix` | 15 chars ✅ |
| clients | `Clients — Phlix` | 14 chars ✅ |
| download | `Download — Phlix` | 16 chars ✅ |
| plugins | `Plugins — Phlix` | 14 chars ✅ |
| docs | `Docs — Phlix` | 10 chars ✅ |
| hub | `Hub — Phlix` | 10 chars ✅ |
| about | `About — Phlix` | 11 chars ✅ |

### ✅ PASS — Meta Descriptions (≤160 chars)
All pages share the same description from `content.json`:
`"Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support."` — **131 characters** ✅

### ✅ PASS — Canonical URLs (all 8 pages)
`index.html:10` — `https://detain.github.io/phlix-website/marina-breeze/` ✅
`features.html:9` — `https://detain.github.io/phlix-website/marina-breeze/features.html` ✅
`clients.html:8` — `https://detain.github.io/phlix-website/marina-breeze/clients.html` ✅
`download.html:8` — `https://detain.github.io/phlix-website/marina-breeze/download.html` ✅
`plugins.html:8` — `https://detain.github.io/phlix-website/marina-breeze/plugins.html` ✅
`docs.html:8` — `https://detain.github.io/phlix-website/marina-breeze/docs.html` ✅
`hub.html:8` — `https://detain.github.io/phlix-website/marina-breeze/hub.html` ✅
`about.html:8` — `https://detain.github.io/phlix-website/marina-breeze/about.html` ✅

All canonical URLs are **absolute** and page-specific ✅

### ✅ PASS — JSON-LD on Home Page
`index.html:30-45` — Valid `SoftwareApplication` JSON-LD block with:
- `@type: SoftwareApplication` ✅
- `name: "Phlix"` ✅
- `description` ✅
- `applicationCategory: "MultimediaApplication"` ✅
- `operatingSystem: "PHP 8.3+"` ✅
- `license: "BSD-3-Clause"` ✅
- `offers.price: "0"` ✅

### ✅ PASS — sitemap.xml
All 8 pages present with absolute canonical URLs and correct priorities:
- Home: priority 1.0 ✅
- Inner pages: priority 0.8–0.9 ✅

### ✅ PASS — robots.txt
`robots.txt:4` — `Sitemap: https://detain.github.io/phlix-website/marina-breeze/sitemap.xml` ✅

### ✅ PASS — Descriptive Anchor Text
All intra-site and external links use descriptive text:
- "See all features →" (`index.html:205`) ✅
- "View source" on all client cards ✅
- "Open user guide →", "Open API reference →", etc. (`docs.html`) ✅
- No "click here" or "read more" unlabeled links found ✅

### ✅ PASS — One H1 Per Page
`index.html:83` — `h1` = "Your media. Your library. Your Phlix." ✅
`features.html:60` — `h1` = "Features" ✅
`clients.html:55` — `h1` = "Clients" ✅
`download.html:55` — `h1` = "Download" ✅
`plugins.html:55` — `h1` = "Plugins" ✅
`docs.html:55` — `h1` = "Documentation" ✅
`hub.html:55` — `h1` = "Phlix Hub" ✅
`about.html:55` — `h1` = "About" ✅

### ⚠️ WARNING — Keyword Meta Tag Missing `lang` Attribute Note
`new_site.md:10` says `<meta name="keywords">` should be from `meta.keywords`. All pages do include it at `index.html:8` (and equivalently on other pages):
`"phlix, media server, plex alternative, jellyfin alternative, self-hosted streaming, php media server"`

However, the keywords array in `content.json:193` has 7 keywords, and the meta tag correctly reflects them. ✅

### ⚠️ WARNING — H1 Is Not the First Heading in Document Order on features.html
`features.html:60` — `<h1>Features</h1>` is inside `.page-header-inner`, which is inside `.page-header > .container`. The document flow is technically correct. However, the **first heading encountered by screen readers** in the main content area is the sr-only `<h2 id="features-detail-heading" class="sr-only">Feature details</h2>` at `features.html:68`, which appears BEFORE the individual feature detail h2s. This sr-only heading acts as a section label for the grid, but its text "Feature details" is semantically odd — the grid IS the features detail section, so the label should be "Feature details" but it being an h2 (not h1) means it doesn't disrupt the h1→h2 hierarchy. However, it may cause confusion as the first announced heading.

### ❌ FAIL — og:image Points to SVG, Not PNG
**File:** All 8 pages (e.g., `index.html:19`)

```html
<meta property="og:image" content="https://detain.github.io/phlix-website/marina-breeze/img/og.svg">
```

`content.json:meta.og_image` is `/img/og.svg` — this is used verbatim.

`new_site.md:296-297` explicitly states:
> "Ship `og.svg` as the editable source if used, but reference a rasterized **`og.png`** (1200×630) in meta."

The `img/` directory contains `og.svg` but **no `og.png`**. Facebook and many social scrapers require rasterized 1200×630 images for og:image. SVG support for og:image is unreliable/non-spec-compliant across major platforms. This is a known issue documented in BUILD_LOG but not yet fixed.

---

## Summary

**Score: 75/100 — ⚠️ WARNING**

SEO basics are solid: all titles ≤60 chars, all descriptions ≤160 chars, all 8 pages have canonical URLs (all absolute), sitemap.xml and robots.txt are correct, JSON-LD is on home, anchor text is descriptive, and one h1 per page is correct.

The og:image pointing to an SVG instead of a required rasterized PNG is a realsocial sharing defect — Facebook, LinkedIn, and many other platforms will not render og:image from SVG sources reliably. This should be prioritized as a fix (rasterize og.svg → og.png, update all 8 pages).

Keywords meta is present and correct. The heading flow concern on features.html (sr-only h2 sibling) is an accessibility issue, not strictly an SEO one, but worth noting.
