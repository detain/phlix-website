# SEO Review: 04-portal-hub-3

## Files Reviewed
- `sitemap.xml`
- `robots.txt`
- `index.html`

---

## Sitemap XML

| Check | Status | Notes |
|-------|--------|-------|
| Valid XML structure | ✅ Pass | Proper XML declaration and `urlset` namespace |
| `<loc>` URLs correct | ✅ Pass | All URLs point to `https://detain.github.io/phlix-website/` |
| `<lastmod>` present | ✅ Pass | All entries have `2026-05-20` |
| `<changefreq>` defined | ✅ Pass | Weekly for most, monthly for About |
| `<priority>` set | ✅ Pass | Logical hierarchy: 1.0 (home) → 0.9 → 0.8 → 0.6 (About) |
| All site pages indexed | ⚠️ Review | 8 pages covered; verify no missing pages (hub.html is listed) |

### Observations
- Sitemap covers: index, features, clients, download, plugins, docs, hub, about
- Priority distribution is sensible
- All pages use HTTPS and correct domain

### Recommendations
- **Low priority**: Consider adding `hreflang` if multi-language variants exist
- **Low priority**: The `lastmod` date is identical for all entries; ensure this reflects actual update cycles

---

## robots.txt

| Check | Status | Notes |
|-------|--------|-------|
| Valid syntax | ✅ Pass | Standard format, no parsing errors |
| `User-agent: *` defined | ✅ Pass | Crawler-agnostic rules apply to all |
| `Allow: /` | ✅ Pass | All public pages are accessible |
| Sitemap directive | ⚠️ Issue | Points to root sitemap, not variant-specific |
| Common paths disallowed | ✅ Pass | `node_modules/`, `.git/`, `tests/` blocked |

### Issues

**1. Sitemap reference mismatch**
- robots.txt declares: `Sitemap: https://detain.github.io/phlix-website/sitemap.xml`
- This points to the **root** site sitemap, not the variant's sitemap
- If this variant (`04-portal-hub-3`) is deployed to a subdirectory or has a separate sitemap, the reference should reflect the actual deployed location

**Recommendation**: Ensure the deployed `robots.txt` at the actual site root references the correct sitemap URL.

---

## index.html

### On-Page SEO

| Check | Status | Notes |
|-------|--------|-------|
| `<title>` present | ✅ Pass | "Phlix — Your media. Your library. Your Phlix." |
| `<meta name="description">` | ✅ Pass | Concise, keyword-relevant description |
| `<html lang="en">` | ✅ Pass | Language declared |
| Canonical URL | ✅ Pass | `https://detain.github.io/phlix-website/` |
| Viewport meta | ✅ Pass | `width=device-width, initial-scale=1` |
| Charset declared | ✅ Pass | `utf-8` in `<head>` |

### Structured Data

| Check | Status | Notes |
|-------|--------|-------|
| JSON-LD present | ✅ Pass | `SoftwareApplication` schema |
| Schema fields complete | ✅ Pass | name, description, applicationCategory, operatingSystem, offers, url |
| Inline JSON-LD valid | ✅ Pass | Proper JSON syntax, no errors |

### Open Graph

| Check | Status | Notes |
|-------|--------|-------|
| `og:title` | ✅ Pass | "Phlix — Your media. Your library. Your Phlix." |
| `og:description` | ✅ Pass | Differs from meta description (intentional longer version) |
| `og:image` | ⚠️ Check | Relative path `./img/og.svg` |
| `og:url` | ✅ Pass | Full absolute URL |
| `og:type` | ✅ Pass | `website` |
| `og:site_name` | ✅ Pass | "Phlix" |

### Twitter Cards

| Check | Status | Notes |
|-------|--------|-------|
| `twitter:card` | ✅ Pass | `summary_large_image` |
| `twitter:title` | ✅ Pass | Matches og:title |
| `twitter:description` | ✅ Pass | Matches og:description |
| `twitter:image` | ⚠️ Check | Relative path `./img/og.svg` |

### Social Image Warning

**Both `og:image` and `twitter:image` use relative paths (`./img/og.svg`)**

When shared on social platforms:
- Facebook, LinkedIn, Twitter crawlers fetch the **absolute URL** from `og:url`
- A relative `og:image` resolves relative to `og:url`, which is `https://detain.github.io/phlix-website/`
- This should work correctly **if** `img/og.svg` exists at that location

**Recommendation**: Verify that `https://detain.github.io/phlix-website/img/og.svg` is accessible and returns a valid image (1200×630px recommended for Open Graph).

### Accessibility & Semantics

| Check | Status | Notes |
|-------|--------|-------|
| Skip link | ✅ Pass | `.skip-link` to `#main-content` |
| ARIA roles/labels | ✅ Pass | `role="banner"`, `aria-label` on nav, `aria-labelledby` on sections |
| Semantic HTML | ✅ Pass | Proper use of `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` |
| Focusable main | ✅ Pass | `<main id="main-content" tabindex="-1">` |
| Icon accessibility | ✅ Pass | `aria-hidden="true"` on decorative SVGs |

### Performance

| Check | Status | Notes |
|-------|--------|-------|
| External stylesheets | ⚠️ 3 files | `base.css`, `theme.css`, `components.css` — consider consolidation |
| Scripts deferred | ✅ Pass | `defer` attribute on main.js |
| No render-blocking scripts | ✅ Pass | All scripts are deferred or in body |

### Heading Structure

| Check | Status | Notes |
|-------|--------|-------|
| Single `<h1>` | ✅ Pass | One `<h1>` in hero section |
| Logical hierarchy | ✅ Pass | `<h2>` for sections, `<h3>` for cards |
| No skipped levels | ✅ Pass | h1 → h2 → h3, no jumps |

---

## Summary

| Area | Score |
|------|-------|
| Sitemap XML | 9/10 |
| robots.txt | 7/10 |
| On-page SEO | 9/10 |
| Structured Data | 10/10 |
| Social/Meta | 8/10 |
| Accessibility | 10/10 |

**Overall: 88/100 — Good**

### Critical Issues
1. **robots.txt sitemap reference**: Ensure it points to the actual deployed sitemap location

### Minor Issues
2. **Social image path**: Verify `./img/og.svg` resolves correctly at the deployment URL
3. **Stylesheet consolidation**: 3 separate CSS files could be combined to reduce HTTP requests

### Strengths
- Clean, semantic HTML throughout
- Complete meta tag coverage (OG, Twitter, theme-color)
- Proper JSON-LD structured data
- Accessible navigation with ARIA
- Logical heading hierarchy
- Good sitemap priority distribution
