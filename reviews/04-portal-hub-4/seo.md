# SEO Review: 04-portal-hub-4 (Wave 4)

**Review Date:** 2026-05-21
**Variant:** `variants/04-portal-hub-4/`

---

## Summary

| Area | Status |
|------|--------|
| HTML Document | ✅ Pass |
| Meta Tags | ✅ Pass |
| Open Graph | ✅ Pass |
| Twitter Cards | ✅ Pass |
| Semantic HTML | ✅ Pass |
| Accessibility | ✅ Pass |
| robots.txt | ⚠️ Inherited (base variant) |
| Sitemap | ⚠️ Inherited (base variant) |

---

## index.html Analysis

### Meta Tags

| Tag | Value | Assessment |
|-----|-------|-------------|
| charset | UTF-8 | ✅ Correct |
| viewport | width=device-width, initial-scale=1.0 | ✅ Correct |
| description | "Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support." | ✅ Descriptive, 148 chars |
| keywords | phlix, media server, plex alternative, jellyfin alternative, self-hosted streaming, php media server | ✅ Relevant |
| title | Phlix - Connect everything. Control everything. | ✅ Clear, branded |

### Open Graph Tags

| Property | Value | Assessment |
|----------|-------|-------------|
| og:type | website | ✅ Correct |
| og:url | https://detain.github.io/phlix-website/ | ✅ Absolute URL |
| og:title | Phlix - Connect everything. Control everything. | ✅ Matches title |
| og:description | Self-hostable PHP media server... | ✅ Matches meta description |
| og:image | /img/og.svg | ⚠️ Relative path (resolved to full URL) |

### Twitter Card Tags

| Name | Value | Assessment |
|------|-------|-------------|
| twitter:card | summary_large_image | ✅ Good for content sharing |
| twitter:title | Phlix - Connect everything. Control everything. | ✅ Matches title |
| twitter:description | Self-hostable PHP media server... | ✅ Matches meta description |
| twitter:image | /img/og.svg | ✅ Same as OG image |

### Canonical URL

```html
<link rel="canonical" href="https://detain.github.io/phlix-website/">
```

✅ Correctly set to the production URL. All social/preview links will resolve properly.

---

## robots.txt Analysis

**Location:** Inherited from `variants/04-portal-hub/robots.txt`

```
User-agent: *
Allow: /
Sitemap: https://detain.github.io/phlix-website/sitemap.xml
```

| Check | Status |
|--------|--------|
| Valid syntax | ✅ Yes |
| Allows crawling | ✅ Yes |
| Sitemap reference | ✅ Yes |
| Specific to this variant | ❌ No — shared with base variant |

---

## sitemap.xml Analysis

**Location:** Inherited from `variants/04-portal-hub/sitemap.xml`

| Entry | Priority | Change Freq | Last Mod |
|-------|----------|-------------|----------|
| / (home) | 1.0 | weekly | 2026-05-20 |
| /features.html | 0.9 | weekly | 2026-05-20 |
| /clients.html | 0.9 | weekly | 2026-05-20 |
| /download.html | 0.9 | weekly | 2026-05-20 |
| /plugins.html | 0.8 | weekly | 2026-05-20 |
| /docs.html | 0.8 | weekly | 2026-05-20 |
| /hub.html | 0.8 | weekly | 2026-05-20 |
| /about.html | 0.7 | monthly | 2026-05-20 |

| Check | Status |
|--------|--------|
| Valid XML | ✅ Yes |
| Valid URLset namespace | ✅ Yes |
| All pages included | ✅ Yes |
| Specific to this variant | ❌ No — shared with base variant |

---

## Observations

### ✅ Strengths

1. **Meta description** is well-written: specific, includes key terms (SyncPlay, DLNA, DVR), and falls within optimal character range (under 160)
2. **Title tag** is succinct, branded, and descriptive
3. **Open Graph + Twitter Cards** are both present and consistent
4. **Canonical URL** correctly points to production domain
5. **Semantic HTML** properly uses `<header>`, `<main>`, `<nav>`, `<footer>`, `<article>`, `<section>`
6. **Accessibility**: skip link, ARIA labels on navigation, `aria-labelledby` on sections, `aria-hidden` on decorative SVGs
7. **Heading hierarchy**: Single `<h1>` on page, logical `<h2>` for sections, `<h3>` for feature cards

### ⚠️ Warnings

1. **Favicon:** Uses SVG favicon but no `apple-touch-icon` or high-DPI variants declared
2. **hreflang:** Not present (acceptable for single-language site)
3. **Structured Data:** No JSON-LD Schema.org markup (e.g., `SoftwareApplication`, `Organization`)
4. **sitemap.xml / robots.txt:** Variant 04-portal-hub-4 has no dedicated SEO files — it inherits from the base `04-portal-hub` variant. This is functionally acceptable since all variants share the same page structure, but a specific sitemap would allow variant-specific `lastmod` timestamps or `alternate` links if multi-variant content diverges.

### ❌ Issues

None critical.

---

## Recommendations

| Priority | Recommendation |
|----------|-----------------|
| Low | Add `apple-touch-icon` link for iOS home screen icons |
| Low | Add JSON-LD structured data (e.g., SoftwareApplication schema with `offers`, `operatingSystem`) |
| Low | If 04-portal-hub-4 diverges content from base variant, create dedicated sitemap.xml |
| Info | Current inherited sitemap/robots.txt is sufficient for this variant's needs |

---

## Verdict

**SEO Status: APPROVED** with minor recommendations.

The page is well-optimized for search and social sharing. Meta tags are descriptive and correctly structured. The canonical URL ensures consistent indexing. No blocking issues identified.
