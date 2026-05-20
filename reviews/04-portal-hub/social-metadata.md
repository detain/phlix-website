# Social Metadata Review — `04-portal-hub`

**Reviewer:** Dimension Reviewer  
**Dimension:** Social Metadata  
**Variant:** `04-portal-hub`  
**Date:** 2026-05-20  
**Files Reviewed:** 8 HTML pages (`index.html`, `about.html`, `features.html`, `hub.html`, `download.html`, `clients.html`, `docs.html`, `plugins.html`)

---

## Score: 30 / 100

---

## ✅ Passed Items

| Check | Status | Evidence |
|-------|--------|----------|
| OG meta tags present on all pages | ✅ Pass | All 8 pages include `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name` |
| Twitter Card meta present on all pages | ✅ Pass | All 8 pages include `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` |
| Twitter card type is `summary_large_image` | ✅ Pass | All pages use `summary_large_image` for visual impact |
| `og:image` dimensions are 1200×630 (viewBox) | ✅ Pass | `og.svg` has `viewBox="0 0 1200 630"` |
| `og:image` ratio matches recommended 1.91:1 | ✅ Pass | 1200:630 = 1.905:1 ≈ 1.91:1 |
| Theme-color meta tag present | ✅ Pass | All pages declare `<meta name="theme-color" content="#00E5FF">` |
| SVG favicon is valid | ✅ Pass | `favicon.svg` is well-formed SVG at 32×32 |

---

## ⚠️ Concerns (Non-blocking)

| Check | Severity | Detail |
|-------|----------|--------|
| `og:image` is SVG, not raster | ⚠️ Concern | Social scrapers (Facebook, LinkedIn, Discord, Slack) prefer PNG/JPG raster images. While the SVG has a 1200×630 viewBox, SVGs have no intrinsic pixel density — some scrapers may render it at a small size or reject it. Twitter/X reportedly supports SVG but behavior is inconsistent across platforms. |
| SVG fonts in `og.svg` may not render | ⚠️ Concern | The `og.svg` uses `"Poppins"` and `"Inter"` font families. Since social image scrapers fetch the SVG remotely, external font references may fail to load, resulting in fallback fonts or missing text. |
| No `twitter:site` or `twitter:creator` | ⚠️ Concern | The pages lack `@username` attribution for the Twitter Card. While not required for basic cards, this is recommended for sites with official accounts. |
| `og:description` is generic across all pages | ⚠️ Concern | Every page uses the exact same `og:description` content: `"Phlix — a self-hostable, open-source PHP media server..."`. This means sharing any non-homepage URL shows the same description, reducing click-through relevance. |

---

## ❌ Failures (Must Fix)

| Check | Severity | Detail |
|-------|----------|--------|
| **No JSON-LD `SoftwareApplication` schema** | 🔴 Critical | Zero structured data on any page. Google's SoftwareApplication schema (or `WebApplication` with `offers`) helps search results and can enable rich snippets. At minimum, homepage should carry a schema.org entry. |
| **No `manifest.webmanifest`** | 🔴 Critical | A PWA manifest is entirely absent. Without it, the site cannot be installed as a progressive web app, and mobile browsers cannot prompt "Add to Home Screen." |
| **No PNG favicon icons (16/32/180/192/512px)** | 🔴 Critical | Only an SVG favicon exists. iOS Safari, many Android launchers, and older desktop browsers require `.ico` or PNG files at specific sizes. The SVG favicon will be ignored on platforms that don't support inline SVG as a favicon. |
| **No `apple-touch-icon` link** | 🔴 Critical | Missing `<link rel="apple-touch-icon" href="...">`. iOS home screen shortcuts require a 180×180 PNG touch icon. |
| **`og:image` URL uses relative path** | 🔴 Critical | All pages declare `og:image content="/variants/04-portal-hub/img/og.svg"` — a root-relative path. When shared from a sub-page (e.g., LinkedIn strips the path and uses `og:url`), the relative URL may break unless the scraper correctly resolves it against the canonical base. Should be an absolute URL: `https://detain.github.io/phlix-website/variants/04-portal-hub/img/og.svg`. Same issue applies to `twitter:image`. |

---

## Recommendations (Ranked by Impact)

### 🔴 P0 — Must Fix Before Launch

1. **Add `manifest.webmanifest`**  
   Create `variants/04-portal-hub/manifest.webmanifest` with `name`, `short_name`, `start_url`, `display: "standalone"`, `icons` array referencing the PNG icons (see #3), and `theme_color: "#00E5FF"`. Then add `<link rel="manifest" href="/variants/04-portal-hub/manifest.webmanifest">` to all 8 pages' `<head>`.

2. **Export PNG favicon set**  
   Generate PNG icons from `favicon.svg` at these sizes: 16×16, 32×32, 180×180 (apple-touch-icon), 192×192, 512×512. Place in `variants/04-portal-hub/img/icons/`. Add to `<head>`:
   ```html
   <link rel="icon" type="image/png" sizes="16x16" href="/variants/04-portal-hub/img/icons/favicon-16.png">
   <link rel="icon" type="image/png" sizes="32x32" href="/variants/04-portal-hub/img/icons/favicon-32.png">
   <link rel="apple-touch-icon" sizes="180x180" href="/variants/04-portal-hub/img/icons/apple-touch-icon.png">
   ```

3. **Add JSON-LD SoftwareApplication schema**  
   At minimum on `index.html`, add a `<script type="application/ld+json">` with:
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

4. **Use absolute URLs for `og:image` and `twitter:image`**  
   Replace `/variants/04-portal-hub/img/og.svg` with the full absolute URL in all 8 pages.

### 🟠 P1 — Strongly Recommended

5. **Convert `og.svg` to a raster PNG at 1200×630**  
   SVG works but is unreliable across scrapers. Export `og.svg` as a 1200×630 PNG at 2× or 3× pixel density for crisp rendering everywhere.

6. **Embed fonts in `og.svg` or convert to paths**  
   Text in SVG shared images should use web-safe fonts or convert text to `<path>` elements so it renders identically everywhere without network font fetches.

7. **Differentiate `og:description` per page**  
   Each page's `og:description` should reflect its content, not echo the homepage description. E.g., `features.html` could say: *"SyncPlay, Live TV, transcoding, DLNA, and a hub that follows you anywhere — see all Phlix features."*

### 🟡 P2 — Nice to Have

8. **Add `twitter:site` / `twitter:creator`**  
   If Phlix has an official Twitter/X account, add `<meta name="twitter:site" content="@YourHandle">` to all pages.

9. **Add `og:image:width` and `og:image:height`**  
   While the viewBox is 1200×630, explicitly declaring `<meta property="og:image:width" content="1200">` and `og:image:height` helps scrapers allocate space before the image loads.

---

## Evidence

### File Locations
- HTML pages: `variants/04-portal-hub/{index,about,features,hub,download,clients,docs,plugins}.html`
- Image assets: `variants/04-portal-hub/img/{og.svg,favicon.svg}`
- No manifest: `variants/04-portal-hub/manifest.webmanifest` — **not found**
- No PNG icons: `variants/04-portal-hub/img/icons/` — **directory not found**

### Canonical URL Pattern
All pages use `https://detain.github.io/phlix-website/` (GitHub Pages) as the canonical base. This is consistent.

### OG/Twitter Image Path (all 8 pages)
```html
<meta property="og:image" content="/variants/04-portal-hub/img/og.svg">
<meta name="twitter:image" content="/variants/04-portal-hub/img/og.svg">
```
**Issue:** Root-relative URL. When shared, some scrapers may fail to resolve this correctly if they don't handle path-relative resolution against the page's canonical URL.

### JSON-LD Check
```bash
grep -r "application/ld+json" variants/04-portal-hub/*.html
# No output — no JSON-LD found
```

### manifest.webmanifest Check
```bash
find variants/04-portal-hub -name "manifest.webmanifest"
# No output — no manifest found
```

### Favicon Diversity Check
```bash
find variants/04-portal-hub -type f \( -name "favicon*.ico" -o -name "favicon*.png" -o -name "apple-touch-icon*" \)
# No output — only favicon.svg exists
```

---

**Review complete. All 8 pages have consistent OG and Twitter Card meta tags at the structural level, but are missing JSON-LD, manifest, and proper favicon/icon infrastructure entirely.**
