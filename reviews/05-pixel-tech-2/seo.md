# SEO Review — 05-pixel-tech-2 (Wave 2)

## Files Reviewed
- `variants/05-pixel-tech-2/sitemap.xml`
- `variants/05-pixel-tech-2/robots.txt`
- `variants/05-pixel-tech-2/index.html`

---

## Sitemap XML (`sitemap.xml`)

| Check | Status | Notes |
|-------|--------|-------|
| Valid XML with namespace | ✅ Pass | Properly formatted with `http://www.sitemaps.org/schemas/sitemap/0.9` |
| `<loc>` URLs valid | ⚠️ Warning | URLs point to `https://detain.github.io/phlix-website/` (root), not variant-specific paths |
| `<priority>` values set | ✅ Pass | Home = 1.0, content pages = 0.8–0.9, about = 0.6 (reasonable hierarchy) |
| `<changefreq>` values set | ✅ Pass | Most pages weekly; about page correctly monthly |
| All site pages listed | ❌ Fail | **hub.html** is missing from sitemap (linked in nav and footer) |

**Issues:**
1. **Missing `hub.html`** — The primary navigation and footer both link to `hub.html`, but it does not appear in the sitemap.
2. **Variant vs root URL confusion** — The sitemap references root domain URLs. If this variant is served from a subdirectory or separate domain, the sitemap should reflect actual variant URLs.

---

## Robots.txt (`robots.txt`)

| Check | Status | Notes |
|-------|--------|-------|
| Valid syntax | ✅ Pass | `User-agent: *` / `Allow: /` allows all crawlers |
| Sitemap directive | ⚠️ Warning | Points to `https://detain.github.io/phlix-website/sitemap.xml` (root), not variant-specific sitemap |

**Issues:**
1. The `Sitemap:` directive references the parent site's sitemap. If this variant has its own sitemap at `variants/05-pixel-tech-2/sitemap.xml`, the robots.txt should reference it there.

---

## Index HTML (`index.html`)

### Meta Tags

| Check | Status | Notes |
|-------|--------|-------|
| `<title>` present | ✅ Pass | "Your media. Your library. Your Phlix." — clear, branded |
| `<meta name="description">` | ✅ Pass | Describes Phlix as self-hostable PHP media server with client platforms and key features |
| `<meta charset>` | ✅ Pass | UTF-8 declared |
| `<meta name="viewport">` | ✅ Pass | `width=device-width, initial-scale=1` for responsive |
| Canonical URL | ⚠️ Warning | Points to root `https://detain.github.io/phlix-website/` instead of variant URL |

### Open Graph

| Check | Status | Notes |
|-------|--------|-------|
| `og:title` | ✅ Pass | Matches page title |
| `og:description` | ✅ Pass | Expanded description including client list |
| `og:image` | ⚠️ Warning | `./img/og.svg` — verify this image exists in the variant's `img/` directory |
| `og:url` | ⚠️ Warning | Points to root URL, not variant |
| `og:type` | ✅ Pass | `website` |
| `og:site_name` | ✅ Pass | "Phlix" |

### Twitter Card

| Check | Status | Notes |
|-------|--------|-------|
| `twitter:card` | ✅ Pass | `summary_large_image` |
| `twitter:title` | ✅ Pass | Matches og:title |
| `twitter:description` | ✅ Pass | Matches og:description |
| `twitter:image` | ⚠️ Warning | `./img/og.svg` — same concern as og:image |

### Additional Head Elements

| Check | Status | Notes |
|-------|--------|-------|
| `theme-color` | ✅ Pass | `#00FF41` — appropriate for pixel-tech aesthetic |
| PWA manifest | ✅ Pass | `./manifest.webmanifest` linked |
| Apple touch icon | ⚠️ Warning | `./img/apple-touch-icon.png` — verify file exists |
| Favicon | ✅ Pass | SVG favicon at `./img/favicon.svg` |

### JSON-LD Schema

| Check | Status | Notes |
|-------|--------|-------|
| Valid JSON-LD | ✅ Pass | Schema.org `SoftwareApplication` |
| Required fields | ✅ Pass | name, applicationCategory, operatingSystem, offers, url |
| Price valid | ✅ Pass | `"0"` (free) with USD currency |

### HTML Structure & Accessibility

| Check | Status | Notes |
|-------|--------|-------|
| Skip link | ✅ Pass | `<a class="skip-link" href="#main-content">` for keyboard users |
| ARIA landmarks | ✅ Pass | `role="banner"`, `role="navigation"`, `role="contentinfo"`, `aria-label` on navs |
| `lang` attribute | ✅ Pass | `lang="en"` on `<html>` |
| Semantic HTML | ✅ Pass | Proper use of `<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>` |
| Headings hierarchy | ✅ Pass | h1 (hero), h2 (sections), h3 (feature cards) — no skipped levels |

### Internal Links

| Check | Status | Notes |
|-------|--------|-------|
| Navigation links | ✅ Pass | All 8 nav items use relative `./` paths |
| Footer links | ✅ Pass | Footer navigation present with external GitHub links |
| Link text descriptive | ✅ Pass | "Get Phlix", "Read the docs", "See all features →" are clear |

### External Links

| Check | Status | Notes |
|-------|--------|-------|
| Full URLs used | ✅ Pass | GitHub links use complete `https://` URLs |
| No broken links (suspected) | ✅ Pass | External links point to active GitHub/GitHub Pages URLs |

### Performance & Resources

| Check | Status | Notes |
|-------|--------|-------|
| CSSbundled | ✅ Pass | 3 stylesheets: `base.css`, `theme.css`, `components.css` |
| JS deferred | ✅ Pass | `<script src="./js/main.js" defer>` — non-blocking |
| No inline JS | ✅ Pass | Clean script separation |

---

## Summary

| Category | Score | Summary |
|----------|-------|---------|
| **Sitemap** | 6/10 | Missing `hub.html`; URLs point to root not variant |
| **Robots.txt** | 7/10 | Functional but sitemap reference not variant-specific |
| **On-page SEO** | 8/10 | Strong meta, schema, accessibility; canonical/og:url point to root |
| **Technical HTML** | 9/10 | Excellent semantic structure, ARIA, skip link, deferred JS |

### Critical Issues
1. **`hub.html` missing from sitemap`** — Linked in nav but not indexed
2. **Canonical and OG URL point to root** — If this variant should have its own identity, these should reflect variant-specific URLs

### Recommendations
1. Add `hub.html` to `sitemap.xml` with `priority 0.8` and `changefreq weekly`
2. If this variant is served from a distinct URL, update `canonical`, `og:url`, and sitemap URLs accordingly
3. Verify `./img/og.svg` exists in the variant directory (or adjust path)
4. Update `Sitemap:` in `robots.txt` if variant has its own sitemap path
