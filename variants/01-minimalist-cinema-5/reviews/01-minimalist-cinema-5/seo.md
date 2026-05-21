# SEO Review — 01-minimalist-cinema-5 (Wave 5)

## Score: 82/100 — PASS (borderline)

## What's Working
- `<title>` tags present on all pages with descriptive content
- Meta descriptions present on all pages:
  - index.html: 156 chars ✓
  - about.html: 78 chars ✓
- `og:image` present on all pages ✓
- `og:title` present on all pages ✓
- `og:description` present on all pages ✓
- `og:url` present on all pages ✓
- `og:type` set to "website" ✓
- `og:site_name` set to "Phlix" ✓
- Canonical URL on all pages pointing to variant path ✓
- `robots.txt` exists with proper Allow directive and Sitemap reference ✓
- `sitemap.xml` exists with all 8 pages indexed ✓
- JSON-LD Schema on index.html with SoftwareApplication structured data ✓
- Responsive design (mobile-friendly) ✓
- Semantic HTML structure ✓

## Critical Issues (blockers)
1. **og:image uses relative URL**: `content="./img/og.svg"` on all pages. Per Open Graph protocol, og:image should be an absolute URL.

## Minor Issues (non-blockers)
1. **Meta description on index.html is 156 chars** — Facebook truncates at 150 chars for some placements. Could be shortened to ~145.
2. **about.html title "About — Phlix"** is brief — might benefit from additional context.
3. **JSON-LD `url` field** only lists one GitHub repo when it could list multiple.

## Recommendations
1. **Fix og:image to absolute URL** on all HTML pages
2. Shorten index.html meta description to ~145 chars
3. Verify sitemap.xml and robots.txt are discoverable by Google Search Console
4. Consider adding `Last-Modified` headers to sitemap.xml entries
5. Add `hreflang="x-default"` if there are plans to localize later
