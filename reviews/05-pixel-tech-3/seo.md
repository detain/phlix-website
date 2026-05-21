# SEO Review: 05-pixel-tech-3

## Summary

| Area | Status |
|------|--------|
| Sitemap | ⚠️ Issues |
| Robots.txt | ✅ Basic |
| On-page HTML | ✅ Good |
| Meta Tags | ✅ Complete |
| Schema.org | ✅ Present |
| Accessibility | ✅ Strong |

---

## Sitemap.xml

### ✅ Strengths
- Valid XML with correct namespace (`http://www.sitemaps.org/schemas/sitemap/0.9`)
- Logical prioritization: homepage 1.0, main pages 0.9, secondary 0.8, about 0.7
- Sensible `changefreq`: weekly for key pages, monthly for static content
- All entries have `lastmod` dates (2026-05-20)

### ⚠️ Issues

1. **URL Mismatch with Site Path**: Sitemap references `https://detain.github.io/phlix-website/` but this variant is at `variants/05-pixel-tech-3/`. Ensure production deployment uses correct base URL or variant-specific sitemap.

2. **Missing Secondary Pages**: Does not include:
   - `about.html`
   - `hub.html`
   - Any variant-specific paths

3. **No `<xhtml:link>` for Alternate Language Versions**: No hreflang declarations for multi-language variants.

### Recommendation
- Validate sitemap renders at correct production URL after deployment
- Add missing pages (about.html, hub.html)
- Consider adding `<xhtml:link rel="alternate" hreflang="...">` if multi-language variants exist

---

## Robots.txt

### ✅ Strengths
- Minimal, correct syntax
- `Allow: /` — all crawlers welcome
- `Sitemap:` directive points to correct location

### ⚠️ Minor Issues
- No `Crawl-delay:` directive (low priority, but could add `Crawl-delay: 1` for politeness)

### Recommendation
- No critical changes needed

---

## Index.html On-Page SEO

### ✅ Title Tag
```html
<title>Your media. Your library. Your Phlix.</title>
```
- Unique, descriptive, within 60-character recommendation
- Matches H1 text

### ✅ Meta Description
```html
<meta name="description" content="Phlix: self-hostable PHP media server. Roku, Tizen, Windows, Mobile clients. SyncPlay, Live TV, transcoding, DLNA, hub relay.">
```
- Within 155-160 character range
- Contains primary keywords (self-hostable, media server, client names, features)
- Actionable value proposition present

### ✅ Canonical URL
```html
<link rel="canonical" href="https://detain.github.io/phlix-website/">
```
- Absolute URL, correct location

### ✅ Open Graph Tags
- All present: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`
- `og:type` correctly set to `website`

### ⚠️ Open Graph Issue
```html
<meta property="og:image" content="./img/og.svg">
```
- Uses **relative path** for og:image. When shared on social platforms, this may not resolve correctly. Use absolute URL:
  ```
  https://detain.github.io/phlix-website/img/og.svg
  ```

### ✅ Twitter Card
```html
<meta name="twitter:card" content="summary_large_image">
```
- Uses `summary_large_image` for optimal display
- Title, description, image all present

### ⚠️ Twitter Image Issue
Same as OG image — relative path ` ./img/og.svg` should be absolute.

### ✅ Structured Data (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Phlix",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "PHP 8.3+",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "url": "https://detain.github.io/phlix-website/"
}
```
- Valid Schema.org `SoftwareApplication` markup
- Includes price (free), category, OS requirement
- Consider adding `aggregateRating` or `review` if reviews exist

### ✅ Additional Technical SEO
- `theme-color` meta tag: `#FF2D78`
- PWA manifest: `./manifest.webmanifest`
- Apple Touch Icon: `./img/apple-touch-icon.png`
- SVG favicon: `./img/favicon.svg`
- Skip link for accessibility
- ARIA landmarks: `role="banner"`, `role="navigation"`, `role="contentinfo"`
- `lang="en"` on `<html>` element

---

## H1/H2 Structure

| Element | Content |
|---------|---------|
| H1 | "Your media. Your library. Your Phlix." |
| H2 | "Why Phlix?", "Everything your library needs", "Ready to stream?" |

- ✅ Single H1 per page
- ✅ Logical heading hierarchy
- ✅ H2s contain target keywords

---

## Recommendations Summary

### Must Fix (High Priority)
1. **Fix og:image and twitter:image paths** — use absolute URLs instead of relative (`./img/og.svg`)

### Should Fix (Medium Priority)
2. **Update sitemap URLs** — ensure sitemap reflects correct deployed URL structure
3. **Add missing sitemap pages** — about.html, hub.html are absent

### Nice to Have (Low Priority)
4. Add `Crawl-delay: 1` to robots.txt for crawler politeness
5. Consider adding `aggregateRating` to JSON-LD schema if applicable
6. Add hreflang links in sitemap if multi-language variants are deployed

---

## Final Verdict

**SEO Health: Good**

The site implements solid foundational SEO: proper meta tags, Open Graph, Twitter Cards, JSON-LD schema, semantic HTML with ARIA landmarks, and a valid sitemap/robots.txt. The primary fixes needed are changing relative image paths to absolute URLs for social sharing, and ensuring the sitemap aligns with actual deployed URLs.
