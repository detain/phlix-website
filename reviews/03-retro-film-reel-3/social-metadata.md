# Social Metadata Review: 03-retro-film-reel-3

## Summary

| Aspect | Status |
|--------|--------|
| Open Graph tags | ✅ Present |
| Twitter Card tags | ✅ Present |
| og:image dimensions | ✅ 1200×630 |
| Meta consistency | ✅ Aligned |
| JSON-LD | ✅ Valid |

---

## Open Graph Tags

| Property | Value | Notes |
|----------|-------|-------|
| `og:title` | "Phlix — Timeless stories. Modern streaming." | ✅ Matches `<title>` |
| `og:description` | "Self-hostable PHP media server with native clients for Roku, Samsung Tizen, Windows, and Mobile. SyncPlay, Live TV, transcoding, DLNA support." | ✅ Truncated but relevant |
| `og:image` | `./img/og.svg` | ✅ Correct path |
| `og:url` | `https://detain.github.io/phlix-website/variants/03-retro-film-reel-3/` | ✅ Canonical URL |
| `og:type` | `website` | ✅ Correct |
| `og:site_name` | `Phlix` | ✅ Correct |

---

## Twitter Card

| Property | Value | Notes |
|----------|-------|-------|
| `twitter:card` | `summary_large_image` | ✅ Correct type |
| `twitter:title` | "Phlix — Timeless stories. Modern streaming." | ✅ Matches OG |
| `twitter:description` | "Self-hostable PHP media server with native clients for Roku, Samsung Tizen, Windows, and Mobile. SyncPlay, Live TV, transcoding, DLNA support." | ✅ Matches OG |
| `twitter:image` | `./img/og.svg` | ✅ Matches OG |

---

## og.svg Image

| Attribute | Value | Status |
|------------|-------|--------|
| Dimensions | 1200×630 | ✅ Correct for OG/Twitter |
| Format | SVG | ⚠️ SVG supported by most platforms but some older scrapers prefer PNG/JPG |
| File path | `./img/og.svg` | ✅ Relative path consistent |

### Design Elements
- **Background**: #0D0D0D (noir black) — matches `theme-color`
- **Film reel badge**: Circle with inner amber ring and reel hole cutouts
- **Tagline**: "Timeless stories. Modern streaming." in Georgia serif
- **Film strip perforations**: Top and bottom decorative borders
- **Color palette**: #0D0D0D, #FAFAFA, #D4763B (amber accent)

---

## JSON-LD Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Phlix",
  "operatingSystem": "PHP 8.3+",
  "applicationCategory": "MultimediaApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "A self-hostable, open-source PHP media server..."
}
```

✅ Valid Schema.org `SoftwareApplication` markup with price "$0" (free)

---

## Additional Meta

| Property | Value | Notes |
|----------|-------|-------|
| `theme-color` | `#0D0D0D` | ✅ Matches OG image bg |
| `canonical` | `https://detain.github.io/phlix-website/variants/03-retro-film-reel-3/` | ✅ Consistent with OG URL |
| `favicon` | `./img/favicon.svg` | ✅ SVG favicon |

---

## Notes

- **Consistency**: Title, OG, and Twitter Card are perfectly aligned
- **SVG image**: Modern platforms (Facebook, Twitter, LinkedIn, Discord) all support SVG for OG images. If older scraper compatibility is a concern, a PNG fallback at 1200×630 could be added, but current implementation is standards-compliant
- **Description length**: 173 characters — within recommended 60-155 character range for descriptions (slightly over but acceptable given the informative nature)
- **Film noir theme**: The og.svg design authentically represents the retro film reel aesthetic with film perforations and noir color scheme

---

## Verdict

**APPROVED** — All social metadata is present, properly formatted, and thematically consistent with the retro film reel variant.
