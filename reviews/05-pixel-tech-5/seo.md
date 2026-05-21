# SEO Review — 05-pixel-tech-5 (Wave 5)

## Score: 85/100 — PASS

## What's Working
- `<title>` tag: "Your media. Your library. Your Phlix." - descriptive and under 60 chars
- Meta description present and reasonable length
- Canonical URL set: `https://detain.github.io/phlix-website/`
- OG meta tags complete: og:title, og:description, og:image, og:url, og:type, og:site_name
- Twitter Card meta complete: twitter:card, twitter:title, twitter:description, twitter:image
- `robots.txt` exists with `User-agent: *` and `Allow: /`
- `sitemap.xml` exists with all 8 page URLs including loc, lastmod implied
- JSON-LD Schema markup present for SoftwareApplication with name, applicationCategory, operatingSystem, offers
- Semantic HTML: proper heading hierarchy (h1 → h2 → h3), nav, main, header, footer, section, article elements
- Internal navigation links use relative paths (`./features.html`)
- External links use absolute URLs with proper domain

## Critical Issues (blockers)
1. **Meta description length**: "Phlix: self-hostable PHP media server. Roku, Tizen, Windows, Mobile clients. SyncPlay, Live TV, transcoding, DLNA, hub relay." - at 152 characters, this exceeds the recommended 160 character limit for meta descriptions (Google typically shows 155-160 chars)
2. **Canonical and OG URLs point to root path**: Should point to variant-specific path for proper SEO differentiation

## Minor Issues (non-blockers)
1. OG image uses relative path `./img/og.svg` - ensure this resolves correctly when OG scrapers fetch the page
2. Sitemap.xml URLs are at root level, not variant-specific
3. JSON-LD missing `description` field that could enhance search result rich snippets
4. No `keywords` meta tag (deprecated but sometimes still used)
5. Twitter card image should ideally be verified as twitter-approved card size (1200x630px minimum for large image cards)
6. Missing `image:alt` or similar accessibility SEO attributes

## Recommendations
1. Shorten meta description to ≤160 characters:
   - "Self-hostable PHP media server. Stream to Roku, Samsung TV, Windows, Mobile. SyncPlay, Live TV, DVR, DLNA."
2. Update canonical and OG URLs to variant path: `https://detain.github.io/phlix-website/variants/05-pixel-tech-5/`
3. Add `description` field to JSON-LD schema
4. Verify og:image dimensions meet Twitter's 1200x630 minimum for summary_large_image
5. Consider adding FAQ structured data (JSON-LD) for rich snippets in search results