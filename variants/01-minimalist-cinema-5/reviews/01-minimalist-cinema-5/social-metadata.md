# Social Metadata Review — 01-minimalist-cinema-5 (Wave 5)

## Score: 88/100 — PASS

## What's Working
- **og:title**: Present on all pages ✓
- **og:description**: Present on all pages with content describing Phlix's features ✓
- **og:image**: Present on all pages (./img/og.svg) ✓
- **og:url**: Present on all pages, correctly pointing to variant URL ✓
- **og:type**: Set to "website" on all pages ✓
- **og:site_name**: Set to "Phlix" on all pages ✓
- **twitter:card**: Set to "summary_large_image" on all pages ✓
- **twitter:title**: Present on all pages ✓
- **twitter:description**: Present on all pages ✓
- **twitter:image**: Present on all pages (./img/og.svg) ✓

## Critical Issues (blockers)
1. **og:image and twitter:image use relative URLs**: `content="./img/og.svg"` instead of absolute URLs. Twitter's validator specifically recommends absolute URLs. LinkedIn's scraper is known to fail on relative image URLs.
2. **og:image is an SVG file**: While technically valid, Twitter's card validator may have issues with SVG images.

## Minor Issues (non-blockers)
1. **og:description differs from meta description**: Slightly different wording between og and meta descriptions on index.html.
2. **about.html og:description is generic**: Uses the same description as index.html instead of page-specific content.
3. **No twitter:site or twitter:creator** meta tags — these are optional but recommended.
4. **No og:image:width or og:image:height** — while not required, specifying dimensions helps social scrapers.

## Recommendations
1. **Change all og:image/twitter:image to absolute URLs**: `https://detain.github.io/phlix-website/variants/01-minimalist-cinema-5/img/og.svg`
2. Consider whether og:image should be a PNG for broader compatibility
3. Add `twitter:site` if the brand has an official Twitter account
4. Add `og:image:width="1200"` and `og:image:height="630"`
5. Align og:description with meta description for consistency
6. Create unique og:description for about.html page
