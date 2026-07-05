# Social Metadata Review — stardust-observatory

**Variant**: stardust-observatory
**Round**: 2
**Reviewer**: Senior Front-End Reviewer
**Date**: 2026-07-04

## Score

- **Social Metadata**: 100 / 100

## ✅ Passed

All 8 pages verified: `index.html`, `features.html`, `clients.html`, `download.html`, `plugins.html`, `docs.html`, `hub.html`, `about.html`

- `og:image` content is `img/og.svg` (NOT `img/og.png`) — confirmed on all 8 pages (e.g. `index.html:14`, `features.html:12`, `clients.html:12`, `download.html:12`, `plugins.html:12`, `docs.html:12`, `hub.html:12`, `about.html:12`)
- `og:image` URL is absolute (full `https://detain.github.io/phlix-website/sites/stardust-observatory/img/og.svg`) — all 8 pages
- `og:url` is absolute canonical URL (e.g. `index.html:15` → `https://detain.github.io/phlix-website/sites/stardust-observatory/`) — all 8 pages
- All OG tags present on all pages: `og:title`, `og:description`, `og:image`, `og:url`, `og:type=website`, `og:site_name=Phlix`
- All Twitter Card meta present on all pages: `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:creator=@detain`
- `theme-color` = `#C9A84C` confirmed on all 8 pages (e.g. `index.html:27`, `features.html:23`)
- JSON-LD `SoftwareApplication` block present on `index.html:38-53`

## ⚠️ Concerns (non-blocking)

- None — all social metadata checks pass cleanly

## ❌ Failures (must fix this round)

- None

## Recommendations (ranked by impact)

1. Verify `img/og.svg` renders correctly at 1200×630 preview size in Twitter Card validator and Facebook OG debugger (impact: medium, effort: low) — file existence confirmed but render testing requires live URL
2. Consider adding `og:image:width` and `og:image:height` for improved crawler behavior (impact: low, effort: low)

## Evidence

- `grep -l "og.svg" /home/sites/phlix/phlix-website/sites/stardust-observatory/*.html` → all 8 files
- `grep -h "og:image\|og:url\|theme-color" /home/sites/phlix/phlix-website/sites/stardust-observatory/*.html` → every page has absolute `https://.../img/og.svg` and matching absolute `og:url`, theme-color `#C9A84C` on all pages
