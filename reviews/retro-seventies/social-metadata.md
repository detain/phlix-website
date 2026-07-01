# Social Metadata Review — Retro Seventies

## Score: 69/100 — ⚠️ Warning

### ❌ Hard Failures

**1. theme-color uses wrong attribute name (not a hard failure, but incorrect)**

The spec §11 requires:
```html
<meta name="theme-color" content="#D4570D">
```

This is correctly implemented across all 8 pages ✅. The value `#D4570D` is the kit's primary color. Correct.

**2. og:image specified as SVG — not a PNG**

`new_site.md §11` requires: "og:image (absolute URL to the 1200×630 png). Ship `og.svg` as the editable source if used, but reference a rasterized **`og.png`** in meta."

All pages reference `img/og.svg` in their `og:image` meta tag. The spec explicitly says to ship `og.svg` as source but reference `og.png` in meta. Using SVG for og:image is non-standard — most crawlers (Twitter, Slack, Discord, Facebook) expect PNG/JPEG.

**Severity:** Warning for most crawlers; Facebook accepts SVG, Twitter does not. Twitter Card validator requires PNG/JPEG.

---

### ⚠️ Warnings

**3. Missing twitter:description on 6 of 8 pages**

Only `clients.html` and `hub.html` have custom `twitter:description` meta tags set.
The following pages have NO `twitter:description` — they fall back to the Twitter card default which may use the og:description or no description:

| Page | twitter:description present? |
|------|---------------------------|
| index.html | ❌ No (uses og:description but no explicit twitter:description) |
| features.html | ❌ No |
| clients.html | ✅ Yes |
| download.html | ❌ No |
| plugins.html | ❌ No |
| docs.html | ❌ No |
| hub.html | ✅ Yes |
| about.html | ❌ No |

While Twitter Card spec says `twitter:description` is optional if `og:description` is present, the spec §11 lists it as a required field for this project. All pages should have explicit `twitter:description`.

**4. Twitter Card image on non-home pages — all point to same og.svg**

`og:image` and `twitter:image` are identical across all pages. While this is technically correct (the og.svg has the brand wordmark and tagline), it means the social preview shows the generic home card even for deeper pages.

This is a common pattern and acceptable for a marketing site.

**5. og:url on inner pages — canonical URL, not page-specific**

All pages correctly use `og:url = <page's absolute canonical URL>` ✅

**6. footer license URL — wrong repository (also in SEO)**

`index.html:238`, `about.html:134`, `clients.html:177`, `download.html:149`, `plugins.html:115`, `docs.html:115`, `hub.html:113`:
```html
<a href="https://github.com/phlix-website/blob/master/LICENSE" ...>
```

Should be `https://github.com/detain/phlix-website/blob/master/LICENSE` (with `detain/` org prefix). The current URL 404s.

---

### ✅ PASS

**Open Graph — structural correctness**
- `og:type = website` on all pages ✅
- `og:site_name = Phlix` on all pages ✅
- `og:title` present on all pages ✅
- `og:description` present on all pages ✅
- `og:url` absolute on all pages ✅
- `og:image` absolute URL on all pages ✅

**Twitter Card — structural correctness**
- `twitter:card = summary_large_image` on all pages ✅
- `twitter:creator = @detain` on all pages ✅
- `twitter:title` present on all pages ✅
- `twitter:image` present (though as SVG, see warning) on all pages ✅

**Theme color**
- `meta name="theme-color" content="#D4570D"` on all 8 pages — matches kit primary ✅

**Favicon**
- `link rel="icon" type="image/svg+xml" href="img/favicon.svg"` on all 8 pages ✅
- favicon.svg uses kit primary color ✅

---

### ⚠️ Summary of Warnings

| Issue | Severity | Pages Affected |
|-------|----------|----------------|
| og:image = SVG not PNG | Warning | All 8 pages |
| Missing twitter:description | Warning | 6 pages (index, features, download, plugins, docs, about) |
| Footer license URL broken | Warning (also SEO fail) | All 8 pages |

No ❌ hard failures in social metadata itself — the structure is sound, og:image absolute URLs ✅, theme-color correct ✅, twitter:card set ✅.
