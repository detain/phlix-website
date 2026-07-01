# Social Metadata Review — Marina Breeze

**Dimension:** Social metadata
**Score:** 72/100
**Severity:** ⚠️ WARNING

---

## Findings

### ✅ PASS — OG Tags on All 8 Pages
Every page has complete Open Graph metadata:

| Page | og:type | og:site_name | og:url (absolute) | og:title | og:description | og:image (absolute) |
|------|---------|--------------|-------------------|----------|----------------|---------------------|
| index | website ✅ | Phlix ✅ | absolute ✅ | Phlix — Set Sail for Tonight ✅ | 131 chars ✅ | absolute ✅ |
| features | website ✅ | Phlix ✅ | absolute ✅ | Features — Phlix ✅ | 131 chars ✅ | absolute ✅ |
| clients | website ✅ | Phlix ✅ | absolute ✅ | Clients — Phlix ✅ | 131 chars ✅ | absolute ✅ |
| download | website ✅ | Phlix ✅ | absolute ✅ | Download — Phlix ✅ | 131 chars ✅ | absolute ✅ |
| plugins | website ✅ | Phlix ✅ | absolute ✅ | Plugins — Phlix ✅ | 131 chars ✅ | absolute ✅ |
| docs | website ✅ | Phlix ✅ | absolute ✅ | Docs — Phlix ✅ | 131 chars ✅ | absolute ✅ |
| hub | website ✅ | Phlix ✅ | absolute ✅ | Hub — Phlix ✅ | 131 chars ✅ | absolute ✅ |
| about | website ✅ | Phlix ✅ | absolute ✅ | About — Phlix ✅ | 131 chars ✅ | absolute ✅ |

### ✅ PASS — Twitter Card Tags on All 8 Pages
`index.html:20-24` — `twitter:card = summary_large_image` ✅
All 8 pages have: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:creator = @detain` ✅

### ✅ PASS — theme-color = Primary Color on All 8 Pages
`index.html:13` — `<meta name="theme-color" content="#1B3A5C">` ✅
(Also on features.html:11, clients.html:10, download.html:10, plugins.html:10, docs.html:10, hub.html:10, about.html:10)

### ✅ PASS — Canonical URL Absolute on Every Page
All 8 pages have `<link rel="canonical">` with absolute URL ✅ (see SEO findings)

### ✅ PASS — Favicon SVG Link
All 8 pages have `<link rel="icon" type="image/svg+xml" href="img/favicon.svg">` ✅

### ❌ FAIL — og:image Is SVG, Not Rasterized PNG
**File:** All 8 pages (e.g., `index.html:19`)

```html
<meta property="og:image" content="https://detain.github.io/phlix-website/marina-breeze/img/og.svg">
```

`content.json:meta.og_image` = `/img/og.svg` — used verbatim.

`new_site.md:296` explicitly requires a **rasterized 1200×630 PNG**:
> "Ship `og.svg` as the editable source if used, but reference a rasterized **`og.png`** (1200×630) in meta."

Major social platforms (Facebook/Meta, LinkedIn, Twitter/X before v2, many messaging apps) do not reliably parse SVG as `og:image`. The official Open Graph specification requires rasterized images for `og:image`. Twitter's validator specifically requires either JPG, PNG, GIF, or WebP — not SVG.

The `img/` directory has no `og.png` — only `og.svg`. This means every social share across major platforms will show a broken or missing preview image.

**This is a known gap** per BUILD_LOG.md follow-ups, but it remains unfixed and represents a real social sharing defect.

### ⚠️ WARNING — og:description Same on All Pages
All 8 pages share the same 131-character description. While this is not an error (the site uses the shared `content.json` description), page-specific descriptions would provide better social previews. For example, the Hub page could have a unique description about the Hub specifically. However, since content.json provides a single shared meta description, this is by design rather than an error.

---

## Summary

**Score: 72/100 — ⚠️ WARNING**

Social metadata is structurally complete on all 8 pages: OG tags, Twitter card, theme-color, canonical, and favicon are all present and correctly formatted. The og:image URL is absolute. `twitter:card = summary_large_image` is correctly set.

The critical failure is the **og:image pointing to an SVG** (`og.svg`) instead of the required rasterized PNG. When shared on Facebook, LinkedIn, or Twitter, the preview image will likely fail to render. This is a real, measurable social sharing defect that should be fixed by generating a 1200×630 rasterized PNG from the og.svg source.
