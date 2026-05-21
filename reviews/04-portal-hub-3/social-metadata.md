# Social Metadata Review — 04-portal-hub-3

## Files Reviewed
- `variants/04-portal-hub-3/index.html`
- `variants/04-portal-hub-3/img/og.svg`

---

## Open Graph Tags

| Tag | Value | Status |
|-----|-------|--------|
| `og:title` | "Phlix — Your media. Your library. Your Phlix." | ✅ Present |
| `og:description` | "Phlix — a self-hostable, open-source PHP media server with native clients for Roku, Samsung Tizen, Windows, and Mobile. SyncPlay, Live TV, transcoding, DLNA, hub relay." | ✅ Present |
| `og:image` | `./img/og.svg` | ✅ Present |
| `og:url` | `https://detain.github.io/phlix-website/` | ✅ Present |
| `og:type` | `website` | ✅ Present |
| `og:site_name` | `Phlix` | ✅ Present |

### Notes on Open Graph
- All required Open Graph tags are present.
- The `og:description` is longer and more descriptive than the `meta description`, which is appropriate for social sharing.

---

## Twitter Card Tags

| Tag | Value | Status |
|-----|-------|--------|
| `twitter:card` | `summary_large_image` | ✅ Present |
| `twitter:title` | "Phlix — Your media. Your library. Your Phlix." | ✅ Present |
| `twitter:description` | "Phlix — a self-hostable, open-source PHP media server with native clients for Roku, Samsung Tizen, Windows, and Mobile. SyncPlay, Live TV, transcoding, DLNA, hub relay." | ✅ Present |
| `twitter:image` | `./img/og.svg` | ✅ Present |

### Notes on Twitter Card
- All required Twitter Card tags are present.
- Using `summary_large_image` card type is appropriate for this content.
- Twitter card tags match Open Graph values, ensuring consistent sharing across platforms.

---

## Open Graph Image (og.svg)

| Property | Value | Recommendation |
|-----------|-------|----------------|
| Dimensions | 1200×630 | ✅ Optimal (recommended: 1200×630 for `summary_large_image`) |
| Format | SVG | ⚠️ Some platforms prefer raster (PNG/JPG); SVG works on most modern platforms but Facebook may prefer raster |
| File size | ~2KB (SVG) | ✅ Excellent compression |

### Visual Design Analysis
- **Background**: Dark green gradient (`#0D1A0D` to `#001A00`) with subtle grid pattern
- **Color scheme**: Neon green (`#39FF14`, `#00FF41`) on dark — distinctively tech/hacker aesthetic
- **Typography**: Monospace font for "PHLIX" with letter-spacing; consistent terminal aesthetic
- **Iconography**: Terminal/command prompt icon
- **Tagline**: "Connect everything. Control everything." — matches the Hub theme

### Image Content Assessment
- Text is rendered as outlines/paths, ensuring visibility across platforms
- High contrast between text and background ensures readability
- Theme-appropriate: the portal/hub theme is reflected in the clean, technical aesthetic

---

## Meta Description

| Tag | Value |
|-----|-------|
| `meta description` | "Open-source PHP media server with SyncPlay, Live TV, transcoding, DLNA, and remote access via Hub." |

- Shorter than og:description — this is appropriate as search engines may truncate
- Contains key features (SyncPlay, Live TV, transcoding, DLNA, Hub)

---

## Additional Tags

| Tag | Value | Status |
|-----|-------|--------|
| `meta charset` | `utf-8` | ✅ Present |
| `meta name="viewport"` | `width=device-width, initial-scale=1` | ✅ Present |
| `meta name="theme-color"` | `#0D1A0D` | ✅ Present |
| `link rel="canonical"` | `https://detain.github.io/phlix-website/` | ✅ Present |
| `link rel="icon"` | `./img/favicon.svg` | ✅ Present |

---

## Structured Data

JSON-LD Schema.org structured data is present:
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Phlix",
  "description": "Self-hostable open-source PHP media server",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "PHP 8.3+",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "url": "https://detain.github.io/phlix-website/"
}
```

✅ Properly formatted and complete.

---

## Summary

| Area | Status |
|------|--------|
| Open Graph tags | ✅ Complete |
| Twitter Card tags | ✅ Complete |
| OG image dimensions | ✅ Optimal (1200×630) |
| OG image format | ⚠️ SVG (works but some platforms prefer raster) |
| Meta description | ✅ Present |
| Canonical URL | ✅ Present |
| Theme color | ✅ Present |
| Structured data | ✅ Valid |

---

## Recommendations

1. **Consider providing a raster fallback** (PNG/JPG) for `og:image` at the same dimensions. While SVG works on most platforms, Facebook and some LinkedIn posts perform better with optimized raster images (1200×630px).

2. **All other metadata is properly implemented** and follows best practices.

---

*Review completed for Wave 3 — 04-portal-hub-3*
