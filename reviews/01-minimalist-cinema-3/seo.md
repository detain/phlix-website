# SEO Review — 01-minimalist-cinema-3

## Files Reviewed
- `variants/01-minimalist-cinema-3/sitemap.xml`
- `variants/01-minimalist-cinema-3/robots.txt`
- `variants/01-minimalist-cinema-3/index.html`

---

## Summary

| Area | Status |
|------|--------|
| Title & Meta Description | ✅ Good |
| Canonical URL | ✅ Present |
| Open Graph | ✅ Functional |
| Twitter Card | ✅ Functional |
| JSON-LD Schema | ✅ Valid |
| Sitemap | ✅ Complete |
| Robots.txt | ✅ Minimal but correct |
| Accessibility | ✅ Good |
| Image URLs | ⚠️ Relative paths may fail on social |

---

## Sitemap XML

**Verdict: Good**

8 URLs indexed with appropriate priorities:
- `priority 1.0` → homepage (correct)
- `priority 0.9` → features, clients, download (high-traffic pages)
- `priority 0.7` → plugins, docs, hub (secondary)
- `priority 0.6` → about (lowest priority, appropriate)

`changefreq` is sensible: weekly for active pages, monthly for static content. All `<loc>` values are absolute URLs pointing to the GitHub Pages deployment path.

**No issues found.**

---

## Robots.txt

**Verdict: Acceptable**

```
User-agent: *
Allow: /
Sitemap: https://detain.github.io/phlix-website/variants/01-minimalist-cinema-3/sitemap.xml
```

Minimal but correct. No blocking directives that would harm SEO. Sitemap reference points to the correct location.

**No issues found.**

---

## Index.html — On-Page SEO

### Title
```
<title>Phlix — Your media. Your way.</title>
```
✅ Concise (under 60 chars), descriptive, includes brand name.

### Meta Description
```
<meta name="description" content="Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support.">
```
✅ Within 120–160 char range, keyword-rich, descriptive.

### Canonical URL
```
<link rel="canonical" href="https://detain.github.io/phlix-website/variants/01-minimalist-cinema-3/">
```
✅ Absolute URL, prevents duplicate content issues.

### Open Graph
| Property | Value | Status |
|----------|-------|--------|
| `og:title` | "Phlix — Your media. Your way." | ✅ |
| `og:description` | Slightly different from meta description, more detailed | ✅ |
| `og:url` | Absolute URL | ✅ |
| `og:type` | "website" | ✅ |
| `og:site_name` | "Phlix" | ✅ |
| `og:image` | `./img/og.svg` | ⚠️ Relative path |

### Twitter Card
| Property | Value | Status |
|----------|-------|--------|
| `twitter:card` | "summary_large_image" | ✅ |
| `twitter:title` | Matches og:title | ✅ |
| `twitter:description` | Matches og:description | ✅ |
| `twitter:image` | `./img/og.svg` | ⚠️ Relative path |

### JSON-LD Schema
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Phlix",
  "description": "A self-hostable PHP media server...",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "PHP 8.3+",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "url": "https://detain.github.io/phlix-website/variants/01-minimalist-cinema-3",
  "sameAs": ["https://github.com/detain/phlix-server"]
}
```
✅ Valid Schema.org markup. SoftwareApplication type is appropriate. Free price (price "0") is correctly marked.

### Accessibility (A11y) for SEO
- Skip link present (`#main-content`)
- Semantic HTML: `<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`
- ARIA labels on nav (`aria-label="Primary navigation"`)
- `aria-current="page"` on active nav link
- All images have alt text (logo has alt="Phlix logo")

✅ Strong accessibility signals support SEO indirectly.

---

## Issues

### 1. Social Image Relative Paths — MEDIUM

**Location:** Lines 13 and 22 of index.html

```html
<meta property="og:image" content="./img/og.svg">
<meta name="twitter:image" content="./img/og.svg">
```

**Problem:** When crawlers (Facebook, Twitter, LinkedIn) fetch these pages, they resolve relative URLs against their own hostname, not the page's URL. This means the image will either not be found or resolve to an incorrect location.

**Fix:** Use absolute URLs:
```html
<meta property="og:image" content="https://detain.github.io/phlix-website/variants/01-minimalist-cinema-3/img/og.svg">
<meta name="twitter:image" content="https://detain.github.io/phlix-website/variants/01-minimalist-cinema-3/img/og.svg">
```

---

## Positive Notes

- No render-blocking resources in `<head>`
- No `noindex` or `nofollow` directives that would harm visibility
- Internal links use relative paths (`./features.html`) which is correct for a static site
- External links (GitHub, docs) use absolute URLs
- Footer navigation includes proper `<h3>` section headings for structure
- Copyright year dynamically set to 2026

---

## Recommendations

1. **Fix og:image and twitter:image to use absolute URLs** — High priority for social sharing
2. Consider adding `hreflang` if the site serves multiple languages
3. The `manifest.webmanifest` is referenced but its contents were not reviewed; verify it contains proper PWA metadata
4. `og.svg` should be at least 1200×630px for optimal display on Facebook/Twitter

---

*Review generated for Wave 3 — 01-minimalist-cinema-3*
