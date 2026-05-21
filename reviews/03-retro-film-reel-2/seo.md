# SEO Review — 03-retro-film-reel-2 (Wave 2)

## Files Reviewed
- `variants/03-retro-film-reel-2/sitemap.xml`
- `variants/03-retro-film-reel-2/robots.txt`
- `variants/03-retro-film-reel-2/index.html`

---

## Summary

| Area | Status |
|------|--------|
| Sitemap XML | ⚠️ Issues |
| robots.txt | ⚠️ Issues |
| On-page SEO | ✅ Good |
| Meta Tags | ✅ Good |
| Structured Data | ✅ Good |
| Accessibility | ✅ Good |

---

## sitemap.xml

### Findings

**Positives:**
- Valid XML with correct `urlset` namespace (`http://www.sitemaps.org/schemas/sitemap/0.9`)
- 8 URLs covering primary site sections
- Proper `<loc>` URLs with full `https://detain.github.io/phlix-website/` origin
- `<changefreq>` and `<priority>` values set for all entries

**Issues:**

1. **Sitemap location mismatch** — The sitemap in `variants/03-retro-film-reel-2/sitemap.xml` lists canonical URLs under `https://detain.github.io/phlix-website/` but this file is only one variant among many. If this variant is served at that URL, the sitemap should reflect only URLs this variant serves. If all variants share the same sitemap, it should live at the root `/sitemap.xml` rather than inside a variant folder.

2. **Missing pages** — The sitemap covers only 8 URLs. Consider adding:
   - `/pricing` (if exists)
   - `/blog` or `/news` (if exists)
   - Individual client download pages (e.g., `/clients/roku`, `/clients/samsung-tv`)
   - Any API or developer docs pages

3. **`changefreq: weekly` for all pages** — While not incorrect, the `/about` page is appropriately set to `monthly`. Consider setting `daily` or `hourly` for high-frequency content if applicable.

### Recommendation
**Medium** — Audit whether this sitemap accurately reflects the live site structure. If this variant is the canonical version, consider moving the sitemap to the domain root or ensuring variant-specific sitemaps don't overlap.

---

## robots.txt

### Findings

**Positives:**
- Syntax is valid
- `User-agent: *` — correctly allows all crawlers
- `Allow: /` — correctly allows full access
- `Sitemap:` directive present

**Issues:**

1. **Sitemap URL mismatch** — The `Sitemap:` directive points to `https://detain.github.io/phlix-website/sitemap.xml`, but the actual sitemap file is located at `variants/03-retro-film-reel-2/sitemap.xml`. Search engines will 404 when trying to fetch the referenced sitemap.

2. **No crawl-delay directive** — Not strictly required, but if the site is resource-intensive or has many variants, adding `Crawl-delay: 1` could prevent crawl budget waste.

### Recommendation
**High** — Fix the `Sitemap:` URL to point to the actual sitemap location. If the site uses content negotiation or variant folding, ensure the referenced sitemap is reachable at the declared URL.

---

## index.html

### On-Page SEO

**Title Tag** ✅
- Text: `Phlix — Timeless stories. Modern streaming.`
- Length: ~47 characters — within optimal range (50–60 recommended)
- Contains brand name and value proposition
- Unique and descriptive

**Meta Description** ✅
- Text: `Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support.`
- Length: ~130 characters — within optimal range (120–160 recommended)
- Contains target keywords (`self-hostable`, `media server`, `DLNA`)
- Actionable and descriptive

**Meta Keywords** ⚠️
- Present but of limited SEO value (Google ignores keywords, but Bing may use them)
- Could add: `self-hosted streaming`, `media organizer`, `SyncPlay`, `DVR`

### Open Graph & Twitter Cards ✅

| Tag | Value | Status |
|-----|-------|--------|
| `og:type` | `website` | ✅ |
| `og:url` | `https://detain.github.io/phlix-website/` | ✅ Canonical |
| `og:title` | `Phlix — Timeless stories. Modern streaming.` | ✅ |
| `og:description` | Matches meta description | ✅ |
| `og:image` | `https://detain.github.io/phlix-website/img/og.svg` | ✅ Use PNG/JPG for broader support |
| `twitter:card` | `summary_large_image` | ✅ |
| `twitter:title` | Same as og:title | ✅ |
| `twitter:description` | Same as og:description | ✅ |
| `twitter:image` | Same as og:image | ✅ |

### Canonical URL ✅
- `<link rel="canonical" href="https://detain.github.io/phlix-website/">`
- Present and correct — points to canonical domain

### Structured Data (JSON-LD) ✅
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Phlix",
  "description": "Self-hostable PHP media server...",
  "url": "https://detain.github.io/phlix-website",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "PHP 8.3+",
  "programmingLanguage": "PHP",
  "license": "https://opensource.org/licenses/BSD-3-Clause"
}
```
- Valid JSON-LD using `SoftwareApplication` schema
- All required fields present
- Consider adding `offers` field if applicable, and `aggregateRating` if user reviews exist

### Accessibility (SEO-Adjacent) ✅

| Element | Implementation |
|---------|---------------|
| Skip link | `<a href="#main" class="skip-link">Skip to main content</a>` |
| Landmark regions | `<header>`, `<main>`, `<nav>`, `<footer>` |
| Nav ARIA | `aria-label="Main navigation"`, `aria-expanded="false"`, `aria-controls="main-nav-list"` |
| ARIA roles | `role="list"` on `<ul>` |
| Current page | `aria-current="page"` on Home link |
| Icon alt text | `aria-hidden="true"` on decorative SVG; `aria-label` on logo link |
| Image alt | `aria-label="Phlix Home"` on logo link |

All ARIA and semantic HTML patterns are correct and aid both accessibility and SEO crawlers.

### Other Observations

1. **Self-hosted fonts** — `@font-face` with `font-display: swap` prevents render-blocking and CLS issues. Good.

2. **External links use `https://`** — All outbound links to GitHub and docs use secure URLs.

3. **No hreflang tags** — If this variant is part of a multi-language or multi-regional site, `<link rel="alternate" hreflang="...">` tags should be added in `<head>`.

4. **No `robots` meta tag** — The page has no `<meta name="robots">` tag. This is fine (defaults to `index, follow`), but explicit is better than implicit for SEO control.

---

## Priority Actions

| Priority | Action |
|----------|--------|
| **High** | Fix `robots.txt` Sitemap URL to point to actual sitemap location |
| **Medium** | Audit sitemap coverage — ensure all live URLs are included |
| **Medium** | If this is a variant, add `hreflang` tags or ensure canonical consolidation |
| **Low** | Add `offers` and `aggregateRating` to JSON-LD if applicable |
| **Low** | Consider replacing SVG og:image with PNG/JPG for Facebook compatibility |

---

## Verdict

The on-page SEO implementation is solid — title, description, Open Graph, Twitter Cards, canonical URL, structured data, and accessibility attributes are all properly implemented. The primary concerns are in the **crawl infrastructure**: the `robots.txt` references a sitemap that doesn't exist at that URL, and the sitemap's relationship to this variant needs clarification. Fixing the `robots.txt` Sitemap directive is the most urgent fix.
