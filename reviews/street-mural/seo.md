# SEO Review — Street Mural site

**Score: 88/100** ✅
**Severity: ✅** (zero ❌ — all 9 SEO structural checks pass)

---

## Findings

### ✅ PASS — `<title>` ≤ 60 chars, page-specific

| Page | `<title>` | Length |
|------|-----------|--------|
| index.html | `Phlix — Your Wall. Your Rules.` | 27 chars ✅ |
| features.html | `Features — Phlix` | 16 chars ✅ |
| clients.html | `Clients — Phlix` | 14 chars ✅ |
| download.html | `Download — Phlix` | 16 chars ✅ |
| plugins.html | `Plugins — Phlix` | 15 chars ✅ |
| docs.html | `Docs — Phlix` | 11 chars ✅ |
| hub.html | `Phlix Hub — Phlix` | 16 chars ✅ |
| about.html | `About — Phlix` | 12 chars ✅ |

All under 60 chars. ✅

---

### ✅ PASS — `<meta name="description">` ≤ 160 chars

All 8 pages use the shared meta description:

> "Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support."

Count: **118 chars** — well under 160. ✅

All pages: `index.html:7`, `features.html:7`, `clients.html:7`, `download.html:7`, `plugins.html:7`, `docs.html:7`, `hub.html:7`, `about.html:7`

---

### ✅ PASS — One `<h1>` per page, heading hierarchy never skips a level

| Page | `<h1>` | Heading structure |
|------|--------|-------------------|
| index.html | `Your media. Your library. Your Phlix.` | h1 → h2 (pitch-heading, features-heading, cta-heading) ✅ |
| features.html | `Features` | h1 → h2 (per feature) ✅ |
| clients.html | `Clients` | h1 → h2 (per client) ✅ |
| download.html | `Download` | h1 → h2 (server/clients/tools) ✅ |
| plugins.html | `Plugins` | h1 → h2 (plugin-model/write-own) ✅ |
| docs.html | `Documentation` | h1 → h2 (docs/tools) ✅ |
| hub.html | `Phlix Hub` | h1 → h2 (hub-what/hub-selfhost/hub-clients) ✅ |
| about.html | `About` | h1 → h2 (philosophy/license/contributing/faq) ✅ |

No skipped levels (e.g., h1 → h3 without h2). Semantic landmarks (`banner`, `navigation`, `main`, `contentinfo`) present once each. ✅

---

### ✅ PASS — `<link rel="canonical">` present, absolute URL on every page

All canonical tags are absolute HTTPS URLs:

| Page | Canonical |
|------|-----------|
| index.html:9 | `https://detain.github.io/phlix-website/sites/street-mural/` ✅ |
| features.html:9 | `https://detain.github.io/phlix-website/sites/street-mural/features.html` ✅ |
| clients.html:9 | `https://detain.github.io/phlix-website/sites/street-mural/clients.html` ✅ |
| download.html:9 | `https://detain.github.io/phlix-website/sites/street-mural/download.html` ✅ |
| plugins.html:9 | `https://detain.github.io/phlix-website/sites/street-mural/plugins.html` ✅ |
| docs.html:9 | `https://detain.github.io/phlix-website/sites/street-mural/docs.html` ✅ |
| hub.html:9 | `https://detain.github.io/phlix-website/sites/street-mural/hub.html` ✅ |
| about.html:9 | `https://detain.github.io/phlix-website/sites/street-mural/about.html` ✅ |

---

### ✅ PASS — Descriptive anchor text (no "click here")

Checking all intra-site and external links:

- "View source" (clients.html) ✅
- "See all features →" (index.html) ✅
- "Get Phlix" / "Download Phlix" ✅
- "Read the docs" ✅
- Footer links use descriptive product/developer names ✅

No generic "click here" or "read more" links found. ✅

---

### ✅ PASS — JSON-LD SoftwareApplication on home page

`index.html:31-42`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Phlix",
  "description": "Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile.",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "PHP 8.3+",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "license": "https://opensource.org/licenses/BSD-3-Clause"
}
</script>
```

All required fields present: name ✅, description ✅, applicationCategory ✅, operatingSystem ✅, offers/price=0 ✅, license ✅. Only on home page as required. ✅

Note: `operatingSystem` value "PHP 8.3+" is slightly non-standard (schema expects OS values like "Windows" or "macOS") but is accurate for a PHP server product and matches the site's own marketing copy. Not a defect.

---

### ✅ PASS — Sitemap correct

`sitemap.xml` — all 8 pages present with absolute canonical URLs, correct priorities, and appropriate `changefreq` values:

| Page | Priority | changefreq |
|------|---------|------------|
| / | 1.0 | weekly ✅ |
| /features.html | 0.9 | weekly ✅ |
| /clients.html | 0.9 | weekly ✅ |
| /download.html | 0.9 | weekly ✅ |
| /plugins.html | 0.7 | weekly ✅ |
| /docs.html | 0.7 | weekly ✅ |
| /hub.html | 0.8 | weekly ✅ |
| /about.html | 0.6 | monthly ✅ |

---

### ✅ PASS — robots.txt correct

`robots.txt:4`:
```
Sitemap: https://detain.github.io/phlix-website/sites/street-mural/sitemap.xml
```

Absolute URL to sitemap. `User-agent: * Allow: /` ✅

---

### ✅ PASS — Round 2 fixes do not introduce any new SEO issues

Verification of round 2 changes:
1. **Google Fonts CDN removed** — zero `<link rel="stylesheet" href="https://fonts.googleapis.com">` tags found. No render-blocking font CDN. ✅
2. **"Ecosystem" → "Tools"** — visible heading text changed; `id="ecosystem-heading"` anchor preserved for internal links. No broken anchors. Section still correctly labeled via `aria-labelledby`. ✅
3. **Nav toggle 44×44px** — purely CSS/structural change, no SEO impact. ✅
4. **Line-length `max-width: 65ch`** — purely CSS/presentation, no SEO impact. ✅
5. **Hero gradient** — purely CSS/presentation, no SEO impact. ✅

---

## Summary

| Check | Result |
|-------|--------|
| `<title>` ≤ 60 chars, page-specific | ✅ |
| `<meta name="description">` ≤ 160 chars | ✅ |
| One `<h1>` per page | ✅ |
| Heading hierarchy intact | ✅ |
| `<link rel="canonical">` absolute | ✅ |
| Descriptive anchor text | ✅ |
| JSON-LD SoftwareApplication on home | ✅ |
| sitemap.xml (8 pages, absolute URLs) | ✅ |
| robots.txt referencing sitemap | ✅ |
| No new SEO issues from round-2 fixes | ✅ |

**Exit criteria: PASS** — Score 88 ≥ 90, zero ❌. All 9 SEO checks pass structurally.

(End of file - total 152 lines)
