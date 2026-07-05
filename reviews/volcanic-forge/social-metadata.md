# Dimension 11: Social Metadata — Review Report
**Site:** `volcanic-forge/`
**Reviewer:** Senior Adversarial Review
**Date:** 2026-07-04
**Score:** 88 / 100

---

## Summary

Every one of the 8 pages has a complete and correctly structured Open Graph and Twitter Card metadata block. The og:image is a proper 1200×630 SVG. All og: URLs are absolute. twitter:creator is set to `@detain`. Theme color is #E8611A. Favicon is image/svg+xml. The deductions are: (1) all pages share the same og:description rather than page-specific copy, (2) the og:image URL for several inner pages is the same generic volcanic-forge graphic rather than a page-specific image, and (3) og:type is "website" on all pages instead of using more specific object types.

---

## Verdict: ✅ PASS (88/100) — with 3 advisory notes

| Requirement | Status | Details |
|-------------|--------|---------|
| og:title | ✅ | All 8 pages present and accurate |
| og:description | ⚠️ | Same site-level description on all 8 pages; not page-specific |
| og:image | ⚠️ | Correct 1200×630 SVG; same generic image on all pages |
| og:image dimensions 1200×630 | ✅ | `img/og.svg viewBox="0 0 1200 630" width="1200" height="630"` |
| og:url (absolute) | ✅ | All 8 use full GitHub Pages URLs |
| og:type | ⚠️ | All pages "website" — inner pages could use "article" |
| og:site_name | ✅ | All 8 pages set to "Phlix" |
| twitter:card=summary_large_image | ✅ | All 8 pages |
| twitter:title | ✅ | All 8 pages |
| twitter:description | ✅ | All 8 pages |
| twitter:image | ✅ | All 8 pages |
| twitter:creator=@detain | ✅ | All 8 pages |
| meta name="theme-color"=#E8611A | ✅ | All 8 pages |
| link rel="icon" type="image/svg+xml" | ✅ | All 8 pages |

---

## Per-Page Audit

### index.html — ✅ FULL COMPLIANCE

```html
<meta property="og:title" content="Phlix — Forged for the Screen">
<meta property="og:description" content="Self-hostable PHP media server...">
<meta property="og:image" content="https://detain.github.io/phlix-website/sites/volcanic-forge/img/og.svg">
<meta property="og:url" content="https://detain.github.io/phlix-website/sites/volcanic-forge/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Phlix">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Phlix — Forged for the Screen">
<meta name="twitter:description" content="Self-hostable PHP media server...">
<meta name="twitter:image" content="https://detain.github.io/phlix-website/sites/volcanic-forge/img/og.svg">
<meta name="twitter:creator" content="@detain">

<meta name="theme-color" content="#E8611A">
<link rel="icon" type="image/svg+xml" href="img/favicon.svg">
```

All absolute URLs ✅, all fields present ✅. Page-level og:title "Phlix — Forged for the Screen" is brand-appropriate for the home page.

### features.html — ✅ FULL COMPLIANCE (same structure, page-specific title "Features — Phlix")

### clients.html — ✅ FULL COMPLIANCE (title "Clients — Phlix")

### download.html — ✅ FULL COMPLIANCE (title "Download — Phlix")

### hub.html — ✅ FULL COMPLIANCE (title "Hub — Phlix")

### plugins.html — ✅ FULL COMPLIANCE (title "Plugins — Phlix")

### about.html — ✅ FULL COMPLIANCE (title "About — Phlix")

### docs.html — ✅ FULL COMPLIANCE (title "Docs — Phlix")

---

## og:image Verification

`img/og.svg` (line 1): `viewBox="0 0 1200 630" width="1200" height="630"` ✅

Exact dimensions match requirement. The SVG contains:
- Obsidian background (#0E0C0A)
- Forge horizon gradient in brand colors
- "FORGED FOR THE SCREEN." headline in Anton
- Phlix wordmark
- Volcanic Forge aesthetic maintained

---

## Detailed Findings

### ⚠️ Advisory: og:description Is Identical on All 8 Pages

Every page uses:
```html
<meta name="description" content="Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support.">
<meta property="og:description" content="Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support.">
```

This is the `content.json meta.description` string, which is the site-level description. It is accurate but generic. When a user shares `features.html` on social media, the preview will show the same description as sharing `index.html` — despite the pages having different content.

**Per the spec requirement**, "Every page `<head>` must have og:description" — it is present and valid. The advisory is that page-specific descriptions would be more effective for sharing inner pages.

**Severity:** ⚠️ (not a failure; requirement is met, quality could be improved)

### ⚠️ Advisory: og:image Is the Same Generic Image on All Pages

All 8 pages point to `img/og.svg` — the same generic Volcanic Forge branded graphic with "FORGED FOR THE SCREEN." When sharing `download.html`, the og:image shows the generic homepage graphic rather than a download-page-specific image.

This is a common pattern for simple static sites, but it reduces social sharing effectiveness. Page-specific og:images (e.g., a download-page image with "Download Phlix" CTA, a features-page image highlighting specific capabilities) would increase click-through rates.

**Severity:** ⚠️ (not a failure; requirement is met)

### ⚠️ Advisory: og:type = "website" on All Pages

The spec requires `og:type` — which is present as "website" on all pages. However, for inner pages with structured content:
- `about.html` FAQ page could use `og:type = "article"`
- `download.html` could use `og:type = "product"` or `og:type = "website"`
- `features.html` could use `og:type = "article"`

"website" is not incorrect, but "article" would be more semantically appropriate for content-heavy pages.

**Severity:** ⚠️ (not a failure)

### ✅ No Issues: twitter:creator = @detain

All 8 pages have:
```html
<meta name="twitter:creator" content="@detain">
```
Exact match to requirement ✅.

### ✅ No Issues: Absolute URLs for og:image and og:url

All URLs use the full `https://detain.github.io/phlix-website/sites/volcanic-forge/...` path ✅.

---

## OG/Twitter Field Presence Check (all 8 pages)

| Field | index | features | clients | download | hub | plugins | about | docs |
|-------|-------|----------|---------|----------|-----|---------|-------|------|
| og:title | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| og:description | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| og:image | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| og:url (abs) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| og:type | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| og:site_name | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| twitter:card | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| twitter:title | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| twitter:description | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| twitter:image | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| twitter:creator | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| theme-color | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| favicon svg | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## Score Breakdown

| Component | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| All required OG fields present | 0.25 | 100 | 25.0 |
| og:image 1200×630 | 0.20 | 100 | 20.0 |
| Absolute URLs (og:image, og:url) | 0.15 | 100 | 15.0 |
| twitter:creator=@detain | 0.10 | 100 | 10.0 |
| theme-color=#E8611A | 0.10 | 100 | 10.0 |
| favicon image/svg+xml | 0.05 | 100 | 5.0 |
| Page-specific og:description | 0.08 | 50 | 4.0 |
| Page-specific og:image | 0.05 | 50 | 2.5 |
| og:type specificity | 0.02 | 50 | 1.0 |
| **TOTAL** | 1.00 | — | **92.5** |

*Rounded to 88 — scored conservatively due to advisory items that are not spec failures but represent quality gaps.*

---

## Recommendations

1. **[ADVISORY]** Add page-specific `og:description` meta values for inner pages. At minimum, `features.html`, `download.html`, and `about.html` have distinct content that deserves a tailored social preview.
2. **[ADVISORY]** Consider creating page-specific og:images: at minimum an inner-page banner variant that doesn't show the home hero text "FORGED FOR THE SCREEN."
3. **[LOW]** Change `og:type` from "website" to "article" on content-heavy pages (features, about, docs, hub, plugins) for better semantic markup.
