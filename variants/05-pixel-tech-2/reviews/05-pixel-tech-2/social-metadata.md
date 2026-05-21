# Social Metadata Review: 05-pixel-tech-2

## Summary

| Property | Value | Status |
|----------|-------|--------|
| **og:title** | Your media. Your library. Your Phlix. | ✅ Pass |
| **og:description** | Phlix — a self-hostable, open-source PHP media server... | ✅ Pass |
| **og:image** | ./img/og.svg | ⚠️ See notes |
| **og:url** | https://detain.github.io/phlix-website/ | ✅ Pass |
| **og:type** | website | ✅ Pass |
| **og:site_name** | Phlix | ✅ Pass |
| **twitter:card** | summary_large_image | ✅ Pass |
| **twitter:title** | Your media. Your library. Your Phlix. | ✅ Pass |
| **twitter:description** | Phlix — a self-hostable, open-source PHP media server... | ✅ Pass |
| **twitter:image** | ./img/og.svg | ⚠️ See notes |
| **theme-color** | #00FF41 | ✅ Pass |

## Open Graph Analysis

All required Open Graph tags are present and correctly populated. The `og:title` and `og:description` are consistent with the page content, accurately describing Phlix as a self-hostable media server with its key features (SyncPlay, Live TV, transcoding, DLNA, hub relay).

**Missing**: `og:image:width` and `og:image:height` attributes. While not required, these help social platforms render the image more efficiently.

## Twitter Card Analysis

The Twitter Card implementation is correct, using `summary_large_image` which is appropriate for the 1200×630 og.svg image. All content tags match the Open Graph values, ensuring consistency across platforms.

## Image Assessment (img/og.svg)

**Dimensions**: 1200×630px — Correct for Open Graph and Twitter Card.

**Design**: Arcade/pixel aesthetic using:
- Background: #0D0D0D (dark)
- Accent: #00FF41 (matrix green)
- Secondary: #9B30FF (purple)
- Grid pattern overlay with glow effects

**Content**: Logo, "Phlix" wordmark, tagline "Open source. Zero compromise.", and three feature bullets.

## Issues & Recommendations

### ⚠️ Relative Image Path
The `og:image` and `twitter:image` use relative paths (`./img/og.svg`). When shared on social platforms, these will resolve relative to the canonical URL. This works correctly for the primary use case but may cause issues if the page is embedded or shared from alternative URLs.

**Recommendation**: Consider using absolute paths for production:
```html
<meta property="og:image" content="https://detain.github.io/phlix-website/img/og.svg">
```

### ⚠️ Custom Fonts in SVG
The og.svg uses `Share Tech Mono`, `Fira Sans`, and `Roboto Mono` fonts. Social media platforms typically:
- Ignore custom fonts in SVG shared images
- Render with system fallback fonts

**Risk**: Low — The design uses monospace and sans-serif fallbacks, so even if custom fonts fail to load, the text remains legible.

### ℹ️ Missing Image Dimensions Meta
Not providing `og:image:width` and `og:image:height` is acceptable but not optimal. These attributes help Facebook/Twitter pre-fetch and reserve space for the image.

**Recommendation**: Add for improved pre-rendering:
```html
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
```

## Verdict

**✅ APPROVED** — Social metadata is properly implemented with correct tags and values. The og.svg design is cohesive with the "pixel-tech-2" aesthetic. Minor improvements possible but not required.
