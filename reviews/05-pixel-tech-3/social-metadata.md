# Social Metadata Review: 05-pixel-tech-3 (Wave 3)

## Summary

| Aspect | Status | Notes |
|--------|--------|-------|
| Open Graph Tags | ✅ Pass | Complete og:title, og:description, og:type, og:site_name |
| Twitter Card | ✅ Pass | Uses summary_large_image with matching content |
| OG Image | ✅ Pass | 1200×630px SVG with neon cyberpunk aesthetic |
| Theme Color | ✅ Pass | #FF2D78 matches OG image accent |
| JSON-LD | ✅ Pass | Valid SoftwareApplication schema |

---

## Open Graph Tags

| Tag | Value | Assessment |
|-----|-------|------------|
| `og:title` | "Your media. Your library. Your Phlix." | ✅ Clear, brand-forward |
| `og:description` | "Phlix — a self-hostable, open-source PHP media server with native clients for Roku, Samsung Tizen, Windows, and Mobile. SyncPlay, Live TV, transcoding, DLNA, hub relay." | ✅ Compelling, keyword-rich |
| `og:image` | `./img/og.svg` | ⚠️ **Relative path** — may fail to resolve when shared |
| `og:url` | `https://detain.github.io/phlix-website/` | ✅ Canonical, correct |
| `og:type` | `website` | ✅ Correct |
| `og:site_name` | `Phlix` | ✅ Correct |

### OG Image (`./img/og.svg`)

- **Dimensions**: 1200×630px — **Correct** (standard Open Graph minimum)
- **Style**: Neon cyberpunk with deep purple (#0D0815) background, hot pink (#FF2D78) accents
- **Typography**: Orbitron (headline), Exo 2 (tagline) — **Note**: These are web-safe font choices but may render differently on systems lacking these fonts. Since this is SVG used as an image, the fonts should be baked in.
- **Content**: "P" and "h" in neon pink, "lix" in light purple (#E8E0F0), tagline "OPEN SOURCE. ZERO COMPROMISE." — visually cohesive
- **Color harmony**: Theme-color #FF2D78 matches the image accent color — ✅

**Potential Issue**: Relative path (`./img/og.svg`) may not resolve when URL is shared on social platforms. Consider absolute path for production.

---

## Twitter Card Tags

| Tag | Value | Assessment |
|-----|-------|------------|
| `twitter:card` | `summary_large_image` | ✅ Correct for rich media |
| `twitter:title` | "Your media. Your library. Your Phlix." | ✅ Matches OG |
| `twitter:description` | "Phlix — a self-hostable, open-source PHP media server with native clients for Roku, Samsung Tizen, Windows, and Mobile. SyncPlay, Live TV, transcoding, DLNA, hub relay." | ✅ Matches OG |
| `twitter:image` | `./img/og.svg` | ⚠️ Same relative path concern |

---

## Additional Metadata

| Tag | Value | Assessment |
|-----|-------|------------|
| `theme-color` | `#FF2D78` | ✅ Matches OG image accents |
| `canonical` | `https://detain.github.io/phlix-website/` | ✅ Correct |
| JSON-LD | SoftwareApplication schema | ✅ Valid, minimal |

---

## Recommendations

### High Priority
1. **Fix relative image paths** — Replace `./img/og.svg` with absolute URLs (`https://detain.github.io/phlix-website/img/og.svg`) for both `og:image` and `twitter:image` to ensure social media scrapers can fetch the image correctly.

### Low Priority / Optional
2. **Consider PNG fallback** — Some platforms handle SVG less reliably than PNG/JPG. A PNG version at the same 1200×630 dimensions could improve compatibility.

---

## Verdict

**APPROVED** — Social metadata is well-structured and visually consistent. The neon cyberpunk aesthetic of the OG image aligns with the variant's design language. The relative path issue should be corrected before deployment to production.
