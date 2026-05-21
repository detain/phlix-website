# Social Metadata Review — 02-spotlight-projector-3 (Wave 3)

## Summary

| Aspect | Status |
|--------|--------|
| Open Graph Tags | ✅ Good |
| Twitter Card Tags | ✅ Good |
| OG Image Quality | ✅ Good |
| Meta Description | ✅ Good |
| Schema.org JSON-LD | ✅ Good |
| Image Path Resolution | ⚠️ Minor Issue |

---

## Strengths

### Open Graph Tags
All required OG tags are present and correctly implemented:

- `og:title` — "Phlix — Your media. Your library. Your Phlix." matches `<title>`
- `og:description` — Clear value proposition with key features listed
- `og:image` — Points to `./img/og.svg`
- `og:url` — Correct canonical URL
- `og:type` — "website" (correct for homepage)
- `og:site_name` — "Phlix"

### Twitter Card Tags
- `twitter:card` — "summary_large_image" (1200x630 recommended, matches OG image dimensions)
- `twitter:title` — Synced with og:title
- `twitter:description` — Synced with og:description
- `twitter:image` — Synced with og:image

### Schema.org JSON-LD
Valid structured data at lines 7-27:
- `@type`: SoftwareApplication
- `name`: Phlix
- `url`: https://detain.github.io/phlix-website/
- `description`: Comprehensive with features
- `applicationCategory`: MultimediaApplication
- `operatingSystem`: Lists all platforms
- `offers`: Free (price: "0")
- `author`: Organization with GitHub link

### Meta Description
Line 28 provides a clear, concise description suitable for search results:
"Phlix: Self-hostable PHP media server with SyncPlay, Live TV, DLNA, and native apps for Roku, Samsung TV, Windows, and Mobile."

### OG Image Quality (img/og.svg)
The image demonstrates strong design choices:

| Element | Assessment |
|---------|------------|
| Dimensions | 1200x630 — Standard OG/ Twitter Card size ✅ |
| Color scheme | Midnight Gallery theme with #0A0A0C background and #C9A84C gold accents ✅ |
| Typography | Georgia serif for brand name, system-ui for features ✅ |
| Content | Brand wordmark, tagline, subtitle, and 4 feature pills ✅ |
| Visual style | Consistent with variant theme (dark + gold) ✅ |

---

## Issues to Review

### 1. Relative Image Path — Potential Share Issue

**Location:** Lines 34, 43

**Issue:**
```html
<meta property="og:image" content="./img/og.svg">
<meta name="twitter:image" content="./img/og.svg">
```

Using relative paths (`./img/og.svg`) relies on the page URL for resolution. While this works on GitHub Pages, if the page is served through a CDN, proxy, or scraped by social media crawlers, the relative path may not resolve correctly.

**Severity:** Minor — GitHub Pages handles this correctly, but social media scrapers may fetch before path resolution

**Recommendation:** Consider using an absolute URL for og:image:
```html
<meta property="og:image" content="https://detain.github.io/phlix-website/img/og.svg">
```

Alternatively, if relative paths are intentional for flexibility, document this as a known consideration for deployment.

---

### 2. Description Consistency

**Location:** Lines 28, 33, 42

**Issue:** Three slightly different descriptions exist:

| Tag | Description |
|-----|------------|
| `<meta name="description">` (line 28) | "Phlix: Self-hostable PHP media server with SyncPlay, Live TV, DLNA, and native apps for Roku, Samsung TV, Windows, and Mobile." |
| `og:description` (line 33) | "Phlix — a self-hostable, open-source PHP media server with native clients for Roku, Samsung Tizen, Windows, and Mobile. SyncPlay, Live TV, transcoding, DLNA, hub relay." |
| Schema `description` (line 13) | "Self-hostable open-source PHP media server with SyncPlay, Live TV, transcoding, DLNA, and native apps for Roku, Samsung TV, Windows, and Mobile." |

**Severity:** Informational — Not a breaking issue, but inconsistent messaging may confuse social preview appearances

**Recommendation:** Unify the description across all three sources to ensure consistent messaging when shared. Pick one authoritative version and use it consistently.

---

### 3. Schema.org URL Mismatch with OG URL

**Location:** Lines 12 vs 35

**Issue:**
- Schema.org `url`: "https://detain.github.io/phlix-website/"
- OG `og:url`: "https://detain.github.io/phlix-website/"

**Status:** These currently match ✅ — but verify they stay in sync if canonical URL changes.

---

## Additional Observations

### Theme Color
Line 46: `<meta name="theme-color" content="#0A0A0C">` — Correctly set to match the OG image background, ensuring browser chrome matches when saved to mobile home screen.

### Canonical URL
Line 29: `<link rel="canonical" href="https://detain.github.io/phlix-website/">` — Correctly set, matches og:url.

### Favicon
Line 52: SVG favicon properly declared.

---

## Verdict

**APPROVED** — The social metadata implementation is solid:

1. ✅ All required OG and Twitter Card tags present
2. ✅ Valid JSON-LD structured data
3. ✅ OG image dimensions (1200x630) match Twitter Card requirements (summary_large_image)
4. ✅ Consistent branding theme (Midnight Gallery dark + gold)
5. ✅ Feature pills in OG image reinforce key selling points
6. ⚠️ Minor: Consider absolute URL for og:image for maximum compatibility
7. ⚠️ Minor: Unify description text across meta, og:description, and JSON-LD

The implementation correctly leverages social metadata to present Phlix professionally when shared across platforms. The issues noted are refinements rather than blockers.
