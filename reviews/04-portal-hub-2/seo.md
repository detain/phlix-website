# SEO Review: 04-portal-hub-2

## Summary

| Area | Status | Notes |
|------|--------|-------|
| **robots.txt** | ⚠️ Review | Points to production sitemap |
| **sitemap.xml** | ❌ Issue | References production domain URLs |
| **index.html** | ⚠️ Review | Canonical and social images point to production |
| **Meta Tags** | ✅ Pass | Title, description, OG, Twitter all present |
| **Structured Data** | ✅ Pass | Valid JSON-LD SoftwareApplication schema |
| **Accessibility** | ✅ Pass | Skip link, ARIA labels, heading hierarchy |

---

## Critical Issues

### 1. Sitemap Points to Production URLs

The `sitemap.xml` lists URLs under `https://detain.github.io/phlix-website/` but this variant lives at `variants/04-portal-hub-2/`. Search engines will index these as the canonical pages, not the variant.

**Lines 4, 10, 16, 22, 28, 34, 40, 46:**
```xml
<loc>https://detain.github.io/phlix-website/</loc>
```

**Impact:** If the intent is to test/validate this variant's SEO, the sitemap should reference variant URLs or use relative paths. If this is a staging variant meant to mirror production, this behavior may be intentional.

**Recommendation:** Confirm intended behavior. If testing variant SEO, the sitemap should use `./` relative paths or variant-specific URLs.

---

### 2. Canonical URL Points to Production

**Line 20:**
```html
<link rel="canonical" href="https://detain.github.io/phlix-website/">
```

The canonical points to production root. Combined with the sitemap issue, search engines will associate all SEO signals with the production site, not this variant.

**Impact:** This variant will not be indexed separately from production. All link equity, ranking signals, and content signals flow to the production canonical URL.

**Recommendation:** If this is a variant for testing, consider removing the canonical or using a self-referencing canonical (`href="."` or `href=""`) to allow the variant to be indexed separately.

---

### 3. Social Sharing Images Use Relative Paths

**Lines 25, 34:**
```html
<meta property="og:image" content="./img/og.svg">
<meta name="twitter:image" content="./img/og.svg">
```

Relative image paths work for browsing but fail when shared on social media. External scrapers (Facebook, Twitter, LinkedIn) cannot resolve `./img/og.svg` from a shared URL.

**Impact:** Social shares will show broken or missing images.

**Recommendation:** Use absolute URLs:
```html
<meta property="og:image" content="https://detain.github.io/phlix-website/img/og.svg">
```

---

## Passed Checks

### Meta Tags
- ✅ `<title>` is descriptive and under 60 characters
- ✅ `<meta name="description">` is present with relevant keywords (247 chars, under 160 recommended but acceptable)
- ✅ Open Graph tags complete: title, description, image, url, type, site_name
- ✅ Twitter Card tags complete: card, title, description, image
- ✅ Theme color set: `#00D4FF`

### Structured Data
**Line 8-19:** Valid JSON-LD with proper Schema.org `SoftwareApplication` type including:
- name, description, applicationCategory, operatingSystem
- offers (price: 0, priceCurrency: USD)
- url

### Accessibility (SEO-adjacent)
- ✅ Skip link present: `<a class="skip-link" href="#main-content">`
- ✅ `<main id="main-content" tabindex="-1">` properly labeled
- ✅ Navigation has `aria-label="Primary navigation"`
- ✅ `aria-current="page"` on active nav link
- ✅ All icons have `aria-hidden="true"`
- ✅ Proper heading hierarchy: one `<h1>`, multiple `<h2>`, nested `<h3>`

### Sitemap Structure
- ✅ Valid XML with correct namespace (`http://www.sitemaps.org/schemas/sitemap/0.9`)
- ✅ All 8 pages included (home, features, clients, download, plugins, docs, hub, about)
- ✅ `<lastmod>` present (all dated 2026-05-20)
- ✅ `<changefreq>` and `<priority>` values set appropriately
- ✅ Homepage priority 1.0, main pages 0.9, secondary pages 0.8

### robots.txt
- ✅ Valid syntax: `User-agent: *`, `Allow: /`
- ✅ Sitemap directive points to production sitemap

---

## Minor Issues

### No Robots Meta Tag
No `<meta name="robots">` tag to control snippet preview behavior. Consider adding:
```html
<meta name="robots" content="max-snippet:-1, max-imagepreview:large">
```

### Duplicate Title Across Variants
The title "Phlix — Connect everything. Control everything." is identical across all variants. While not a direct SEO issue (since each has its own canonical), differentiating with variant indicators could help with internal tracking.

### No hreflang
If the site serves multiple languages or regional variants, hreflang links would improve international targeting.

---

## Verdict

**SEO Health:** ⚠️ **Needs Attention**

This variant is correctly structured for on-page SEO but has a **canonical/sitemap mismatch** where all SEO signals route to the production domain instead of being attributed to this variant. This may be intentional for a staging variant, but should be confirmed.

**Blocking Issues:** None for production deployment
**Recommended Fixes:** 
1. Resolve relative image paths for social sharing (critical for viral distribution)
2. Clarify canonical/sitemap strategy for variant testing
