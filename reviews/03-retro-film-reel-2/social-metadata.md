# Social Metadata Review — 03-retro-film-reel-2 (Wave 2)

## Review Summary

| Check | Status |
|-------|--------|
| OG Tags Present | ✅ PASS |
| Twitter Card Tags Present | ✅ PASS |
| OG Image Dimensions (1200×630) | ✅ PASS |
| Image Path Correctness | ⚠️ WARNING |
| URL Consistency | ⚠️ WARNING |

---

## Open Graph Tags

| Tag | Value | Status |
|-----|-------|--------|
| `og:type` | `website` | ✅ Correct |
| `og:url` | `https://detain.github.io/phlix-website/` | ⚠️ Generic root URL (see note) |
| `og:title` | `Phlix — Timeless stories. Modern streaming.` | ✅ Correct |
| `og:description` | `Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support.` | ✅ Correct |
| `og:image` | `https://detain.github.io/phlix-website/img/og.svg` | ⚠️ Path issue (see note) |

---

## Twitter Card Tags

| Tag | Value | Status |
|-----|-------|--------|
| `twitter:card` | `summary_large_image` | ✅ Correct |
| `twitter:title` | `Phlix — Timeless stories. Modern streaming.` | ✅ Correct |
| `twitter:description` | `Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support.` | ✅ Correct |
| `twitter:image` | `https://detain.github.io/phlix-website/img/og.svg` | ⚠️ Path issue (see note) |

---

## OG Image Review (`img/og.svg`)

| Aspect | Value | Status |
|--------|-------|--------|
| Dimensions | 1200×630 | ✅ Correct (1.91:1 ratio) |
| Format | SVG | ✅ Valid for social sharing |
| Theme | Retro film reel | ✅ Matches variant aesthetic |
| File Size | ~3KB | ✅ Lightweight |

### Image Design Notes
- **Background**: Dark brown (#2C1810) with velvet texture
- **Film strip borders**: Classic 35mm sprocket holes in gold (#D4A017)
- **Central panel**: Warm cream (#F4E4C1) with gold border
- **Logo**: Circular film-reel motif in burgundy (#7A1F1F) and gold
- **Typography**: Georgia serif for classic cinema feel
- **Tagline**: "Timeless stories. Modern streaming." displayed prominently

---

## Issues & Recommendations

### ⚠️ WARNING: Image Path Inconsistency

**Problem**: The `og:image` and `twitter:image` URLs use an absolute path:
```
https://detain.github.io/phlix-website/img/og.svg
```

However, this variant's `og.svg` lives at:
```
variants/03-retro-film-reel-2/img/og.svg
```

If this variant deploys to a subdirectory, the hardcoded root URL will reference a non-existent file at the parent level. The correct path should use a relative path or the full variant-correct URL.

**Current** (absolute to root):
```html
<meta property="og:image" content="https://detain.github.io/phlix-website/img/og.svg">
```

**Recommended** (relative):
```html
<meta property="og:image" content="img/og.svg">
```

Or ensure the absolute URL reflects the correct deployed path for this variant.

---

### ⚠️ WARNING: URL Mismatch with Variant Deployment

**Problem**: `og:url` is set to:
```
https://detain.github.io/phlix-website/
```

If this variant deploys to `https://detain.github.io/phlix-website/variants/03-retro-film-reel-2/`, the `og:url` should match the actual page URL for accurate social link preview behavior.

**Note**: The `<link rel="canonical">` also points to the root. If this variant is intended to be served from root (not a subdirectory), this is correct. Otherwise, both canonical and og:url should reflect the actual deployed variant URL.

---

### ✅ Keywords Meta Tag

The `<meta name="keywords">` tag is present with relevant terms:
```html
<meta name="keywords" content="phlix, media server, plex alternative, jellyfin alternative, self-hosted streaming, php media server">
```

Note: Google ignores the keywords tag, but Bing may still use it. This is acceptable for SEO purposes.

---

### ✅ JSON-LD Structured Data

The page includes valid JSON-LD:
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Phlix",
  "description": "Self-hostable PHP media server...",
  "url": "https://detain.github.io/phlix-website",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "PHP 8.3+",
  "programmingLanguage": "PHP",
  "license": "https://opensource.org/licenses/BSD-3-Clause"
}
```

This is well-formed Schema.org data for a software application.

---

## Verdict

**Social metadata is mostly well-structured** but has path consistency issues that should be addressed before deployment. The image design is excellent and perfectly captures the retro film reel aesthetic of this variant.

**Action Items**:
1. Verify the `og:image` path resolves correctly for the deployed variant
2. Ensure `og:url` matches the actual deployed page URL
3. Confirm canonical URL alignment with og:url for consistent social signals
