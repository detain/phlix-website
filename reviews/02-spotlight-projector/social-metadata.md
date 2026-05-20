# Social Metadata Review — `02-spotlight-projector`

**Date:** 2026-05-20
**Reviewer:** Dimension Reviewer (Social Metadata)
**Pages Reviewed:** 8 (index, about, hub, docs, plugins, download, clients, features)

---

## Summary

The variant has consistent Open Graph and Twitter Card markup across all 8 pages. However, **two critical requirements are missing entirely**: JSON-LD `SoftwareApplication` schema and a proper favicon set with `manifest.webmanifest`. Additionally, the OG image is an SVG rather than the recommended 1200×630 raster format, which may cause inconsistent rendering in some scrapers.

---

## Rubric Checklist

### Open Graph (OG)
| Tag | Required | Found | Status |
|-----|----------|-------|--------|
| `og:title` | ✓ | All 8 pages | ✅ |
| `og:description` | ✓ | All 8 pages | ✅ |
| `og:image` | ✓ (1200×630) | All 8 pages | ⚠️ SVG not guaranteed |
| `og:url` | ✓ | All 8 pages | ✅ |
| `og:type` | ✓ | All 8 pages | ✅ |
| `og:site_name` | ✓ | All 8 pages | ✅ |

### Twitter Card
| Tag | Required | Found | Status |
|-----|----------|-------|--------|
| `twitter:card` | `summary_large_image` | All 8 pages | ✅ |

### JSON-LD
| Schema | Required | Found | Status |
|--------|----------|-------|--------|
| `SoftwareApplication` | ✓ | None | ❌ |

### Favicon
| Item | Required | Found | Status |
|------|----------|-------|--------|
| `manifest.webmanifest` link | ✓ | None | ❌ |
| `apple-touch-icon` | ✓ | None | ❌ |
| 16×16 | ✓ | None | ❌ |
| 32×32 | ✓ | None | ❌ |
| 180×180 | ✓ | None | ❌ |
| 192×192 | ✓ | None | ❌ |
| 512×512 | ✓ | None | ❌ |
| `favicon.svg` | ✓ | All 8 pages | ✅ |

---

## Score

**Score: 50 / 100**

| Category | Points | Max |
|----------|-------|-----|
| OG tags | 12 | 12 |
| Twitter card | 4 | 4 |
| JSON-LD | 0 | 8 |
| Favicon set | 4 | 16 |
| Image format | 2 | 4 |
| Consistency | 8 | 8 |

---

## Findings

### ❌ Failures (must fix)

1. **Missing JSON-LD `SoftwareApplication` schema**
   - **All 8 pages** — No `<script type="application/ld+json">` block found anywhere.
   - **Impact:** Search engines cannot parse structured data about the software product.
   - **Evidence:** grep for `application/ld+json` returns zero matches across all HTML files.

2. **Missing `manifest.webmanifest` link**
   - **All 8 pages** — No `<link rel="manifest">` tag.
   - **Impact:** Progressive Web App installability is broken; iOS/Android add-to-homescreen behavior is degraded.
   - **Evidence:** `index.html:28` has only `<link rel="icon" type="image/svg+xml" ...>`

3. **Missing Apple Touch Icon**
   - **All 8 pages** — No `<link rel="apple-touch-icon" ...>` tag.
   - **Impact:** iOS users who add site to home screen get a scaled screenshot, not a proper icon.
   - **Evidence:** Same as above.

4. **Missing required favicon sizes (16, 32, 180, 192, 512)**
   - **All 8 pages** — Only a single SVG favicon is linked with no `sizes` attribute.
   - **Impact:** Browser tab, bookmark bar, and PWA icons display using the single SVG; older browsers that lack SVG favicon support get no icon at all.
   - **Evidence:** `index.html:28` — `<link rel="icon" type="image/svg+xml" href="/variants/02-spotlight-projector/img/favicon.svg">` (no `sizes`)

### ⚠️ Concerns (non-blocking)

5. **OG image is SVG, not 1200×630 raster**
   - **All 8 pages** — `og:image` points to `/variants/02-spotlight-projector/img/og.svg`
   - **Issue:** While technically valid, SVG does not guarantee the 1200×630 aspect ratio. Some scrapers (notably older Facebook, LinkedIn, Twitter in some contexts) handle SVG unpredictably.
   - **Recommendation:** Provide a 1200×630 PNG/JPG as `og:image` alongside the SVG, or validate the SVG renders correctly at that exact size.
   - **Evidence:** `index.html:13` — `<meta property="og:image" content="/variants/02-spotlight-projector/img/og.svg">`

6. **Favicon missing `sizes` attribute**
   - The single SVG favicon link has no `sizes="any"` or `sizes="16x16 32x32 ..."` attribute.
   - While SVG scales, explicitly declaring sizes improves early-match behavior in some browsers.
   - **Evidence:** Same as item 4.

---

## Recommendations (Ranked by Impact)

### P0 — Critical (breaks SEO/scraping)
1. **Add JSON-LD `SoftwareApplication` schema** to all 8 pages
   ```html
   <script type="application/ld+json">
   {
     "@context": "https://schema.org",
     "@type": "SoftwareApplication",
     "name": "Phlix",
     "description": "Self-hostable, open-source PHP media server...",
     "applicationCategory": "MultimediaApplication",
     "operatingSystem": "PHP 8.3+",
     "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
     "url": "https://detain.github.io/phlix-website/"
   }
   </script>
   ```
   Each page should have page-specific `name` (e.g., "Features — Phlix") and `url`.

### P1 — High (breaks PWA / mobile add-to-homescreen)
2. **Create `manifest.webmanifest`** with icons array at 16, 32, 180, 192, 512
   ```json
   {
     "name": "Phlix",
     "short_name": "Phlix",
     "start_url": "/variants/02-spotlight-projector/",
     "display": "standalone",
     "icons": [
       { "src": "/variants/02-spotlight-projector/img/icon-192.png", "sizes": "192x192", "type": "image/png" },
       { "src": "/variants/02-spotlight-projector/img/icon-512.png", "sizes": "512x512", "type": "image/png" }
     ]
   }
   ```
   Add to all pages: `<link rel="manifest" href="/variants/02-spotlight-projector/manifest.webmanifest">`

3. **Add `apple-touch-icon`** link to all 8 pages:
   ```html
   <link rel="apple-touch-icon" href="/variants/02-spotlight-projector/img/apple-touch-icon.png">
   ```

4. **Add `sizes` attribute** to the SVG favicon link:
   ```html
   <link rel="icon" sizes="any" type="image/svg+xml" href="/variants/02-spotlight-projector/img/favicon.svg">
   ```

### P2 — Medium (scraper compatibility)
5. **Provide a 1200×630 raster OG image** (PNG or JPG) alongside or replacing the SVG. If the SVG is kept, validate its viewBox renders cleanly at exactly 1200×630.

---

## Evidence

| File | Line | Finding |
|------|------|---------|
| `index.html` | 13 | `og:image` = `/variants/02-spotlight-projector/img/og.svg` (SVG) |
| `index.html` | 19 | `twitter:card` = `summary_large_image` ✅ |
| `index.html` | 28 | Only `<link rel="icon">`, no manifest, no apple-touch-icon ❌ |
| `index.html` | — | No JSON-LD block found ❌ |
| `about.html` | 28 | Same favicon-only pattern ❌ |
| `hub.html` | 28 | Same favicon-only pattern ❌ |
| `docs.html` | 28 | Same favicon-only pattern ❌ |
| `plugins.html` | 28 | Same favicon-only pattern ❌ |
| `download.html` | 28 | Same favicon-only pattern ❌ |
| `clients.html` | 28 | Same favicon-only pattern ❌ |
| `features.html` | 28 | Same favicon-only pattern ❌ |

All 8 pages have identical head markup patterns for OG/Twitter. All 8 are missing JSON-LD and PWA manifest links.

---

## Verdict

**APPROVE WITH CONDITIONS** — The OG and Twitter foundations are solid and consistent. However, the missing JSON-LD (P0) and missing manifest/web manifest (P1) represent clear rubric failures that must be addressed before this variant can be considered fully compliant. The SVG OG image concern is advisory only.
