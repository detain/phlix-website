# SEO Review — 04-portal-hub-5 (Wave 5)

## Score: 80/100 — PASS

## What's Working
- `<meta name="description">` present and under 160 characters on all pages
- Meta description: "Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support." — 108 characters
- Open Graph tags complete: og:type, og:url, og:title, og:description, og:image
- Twitter Card tags complete: twitter:card, twitter:title, twitter:description, twitter:image
- `og:image` and `twitter:image` both point to `/img/og.svg`
- Canonical URL present on all pages
- `<meta name="keywords">` present with relevant terms
- `<title>` tag present on all pages with site name
- Semantic HTML structure (header, main, nav, section, article, footer, h1-h4 hierarchy)
- Skip link for keyboard users improves accessibility
- Descriptive anchor text ("Features", "Clients", "Download") — no "click here"

## Critical Issues (blockers)
1. **Canonical URL points to root, not variant** — Should point to variant-specific URL (e.g., `https://detain.github.io/phlix-website/04-portal-hub-5/` or appropriate variant path). Current canonical分散 across pages without variant prefix dilutes SEO value.

## Minor Issues (non-blockers)
1. **Title tag format inconsistent** — Home page: "Phlix - Connect everything. Control everything." vs download page: "Download - Phlix" — consider standardizing to "Page Title | Phlix" format
2. **og:image aspect ratio** — Twitter requires minimum 120x120px (but recommends 1200x630 for summary_large_image). Verify `/img/og.svg` renders properly at Twitter card sizes or provide a raster fallback
3. **Missing structured data** — No JSON-LD schema.org markup (e.g., SoftwareApplication schema) to enhance SERP presence
4. **No XML sitemap** — No sitemap.xml referenced in robots.txt or submitted to search engines
5. **No robots.txt** — Root-level robots.txt not visible in variant (may exist at site root, but variant should verify or reference)

## Recommendations
1. Update canonical URLs to include variant path prefix
2. Add JSON-LD structured data for SoftwareApplication with operatingSystem, applicationCategory, offers fields
3. Ensure og:image exists at `/img/og.svg` and is at least 1200x630px for Twitter preview quality
4. Add robots.txt if not present at site root with appropriate crawl directives
5. Standardize title tag format across all pages: "Page Name | Phlix" or "Phlix - Page Name"
