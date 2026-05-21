# Social Metadata Review — 05-pixel-tech-5 (Wave 5)

## Score: 95/100 — PASS

## What's Working
- OG title: "Your media. Your library. Your Phlix." - matches page title, brand-appropriate
- OG description: "Phlix — a self-hostable, open-source PHP media server with native clients for Roku, Samsung Tizen, Windows, and Mobile. SyncPlay, Live TV, transcoding, DLNA, hub relay." - comprehensive
- OG image: `./img/og.svg` - relative path, should resolve correctly
- OG URL: `https://detain.github.io/phlix-website/` - correct base URL
- OG type: `website` - appropriate
- OG site_name: `Phlix` - correct
- Twitter card: `summary_large_image` - optimal for visual sharing
- Twitter title: "Your media. Your library. Your Phlix." - matches OG title
- Twitter description: "Phlix — a self-hostable, open-source PHP media server with native clients for Roku, Samsung Tizen, Windows, and Mobile. SyncPlay, Live TV, transcoding, DLNA, hub relay." - matches OG description
- Twitter image: `./img/og.svg` - matches OG image
- All Twitter meta mirrors OG meta for consistency

## Critical Issues (blockers)
None

## Minor Issues (non-blockers)
1. OG URL and Twitter URL point to root path, not variant-specific path
2. OG image aspect ratio should be verified for both Facebook (1.91:1) and Twitter (2:1) optimal display
3. OG image uses SVG format - while supported, some scrapers prefer raster images (PNG/JPG)
4. No `og:image:width` and `og:image:height` Open Graph tags for better image handling
5. No `og:image:alt` for accessibility

## Recommendations
1. Update og:url and twitter:url to variant-specific path: `https://detain.github.io/phlix-website/variants/05-pixel-tech-5/`
2. Consider adding `og:image:width` and `og:image:height` for optimal rendering
3. Add `og:image:alt` text describing the image for accessibility
4. Consider providing multiple og:image sizes for different platforms
5. Verify og.svg dimensions meet minimum requirements (1200x630 recommended)
6. If sharing variants separately, each should have unique og:url pointing to its variant path