# Social Metadata Review: 01-minimalist-cinema-3

## Metadata Summary

| Property | Value |
|----------|-------|
| Title | `Phlix — Your media. Your way.` |
| Meta Description | `Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support.` |
| Canonical | `https://detain.github.io/phlix-website/variants/01-minimalist-cinema-3/` |
| OG Image | `./img/og.svg` (1200×630) |
| Twitter Card | `summary_large_image` |

---

## Open Graph Tags

| Tag | Content | Status |
|-----|---------|--------|
| `og:title` | `Phlix — Your media. Your way.` | ✅ Present |
| `og:description` | `Phlix — a self-hostable, open-source PHP media server with native clients for Roku, Samsung Tizen, Windows, and Mobile. SyncPlay, Live TV, transcoding, DLNA, hub relay.` | ✅ Present |
| `og:image` | `./img/og.svg` | ✅ Present |
| `og:url` | `https://detain.github.io/phlix-website/variants/01-minimalist-cinema-3/` | ✅ Present |
| `og:type` | `website` | ✅ Present |
| `og:site_name` | `Phlix` | ✅ Present |

---

## Twitter Card Tags

| Tag | Content | Status |
|-----|---------|--------|
| `twitter:card` | `summary_large_image` | ✅ Present |
| `twitter:title` | `Phlix — Your media. Your way.` | ✅ Present |
| `twitter:description` | `Phlix — a self-hostable, open-source PHP media server with native clients for Roku, Samsung Tizen, Windows, and Mobile. SyncPlay, Live TV, transcoding, DLNA, hub relay.` | ✅ Present |
| `twitter:image` | `./img/og.svg` | ✅ Present |

---

## Additional Metadata

| Tag | Content | Status |
|-----|---------|--------|
| `theme-color` | `#0A0A0F` | ✅ Present |
| JSON-LD Schema | `SoftwareApplication` | ✅ Present |

---

## OG Image Review: `img/og.svg`

| Aspect | Value | Assessment |
|--------|-------|------------|
| Dimensions | 1200×630 | ✅ Correct for OG/Twitter |
| Format | SVG | ⚠️ SVG valid but some platforms prefer raster (PNG/JPG) |
| Aspect Ratio | 1.91:1 | ✅ Matches `summary_large_image` |
| Accessibility | `role="img"`, `aria-label`, `<title>`, `<desc>` | ✅ Complete |
| Background | `#0A0A0F` | ✅ Matches theme-color |
| Text | Readable at 72px wordmark, 28px tagline | ✅ Legible |

**Visual Elements:**
- Film strip decorative accents (top/bottom borders)
- Stylized "X" logo mark with sprocket holes
- Play button triangle accent
- Wordmark "Phlix"
- Tagline "Your media. Your way."
- Subtext "Self-hosted media server"

---

## Consistency Checks

| Check | Result |
|-------|--------|
| Title matches `<title>` | ✅ Consistent |
| OG description ≈ Meta description | ⚠️ Slightly different — OG version more detailed |
| OG image path relative | ✅ Uses `./img/og.svg` |
| Canonical matches OG URL | ✅ Consistent |
| Twitter matches OG | ✅ All tags mirrored |

---

## Issues & Recommendations

### Issue 1: SVG as OG Image
**Severity:** Low (Informational)

SVG files may not be reliably rendered by all social media platforms. While technically valid per Open Graph specs, Facebook and some LinkedIn caches prefer raster images.

**Recommendation:** Consider providing a raster fallback (e.g., `og.png` 1200×630) alongside the SVG for maximum compatibility.

### Issue 2: Tagline Redundancy
**Severity:** Low (Informational)

The og:description opens with "Phlix —" which partially duplicates the og:title content ("Phlix — Your media. Your way.").

**Recommendation:** Consider a more distinct opening for og:description:
```
# Current
og:description = "Phlix — a self-hostable, open-source PHP media server..."

# Suggested
og:description = "Stream to Roku, Samsung TV, Windows & mobile. Self-hosted, open-source, with SyncPlay, Live TV, transcoding & DLNA."
```

---

## Verdict

| Category | Status |
|----------|--------|
| Tags Present | ✅ All required tags present |
| Tag Consistency | ✅ OG and Twitter aligned |
| Image Accessibility | ✅ Proper ARIA and titles |
| Image Dimensions | ✅ 1200×630 correct |
| Schema | ✅ Valid JSON-LD |

**Overall: PASS** — Social metadata is well-structured with all required tags present and properly formatted. Minor consideration for raster fallback image format.
