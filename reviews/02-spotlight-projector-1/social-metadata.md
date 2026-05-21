# Social Metadata Review — `02-spotlight-projector-1` (Wave 1, Classic Cinematic)

**Reviewer:** Dimension Reviewer  
**Dimension:** Social Metadata  
**Files inspected:** 8 HTML files (`index.html`, `plugins.html`, `download.html`, `docs.html`, `hub.html`, `features.html`, `clients.html`, `about.html`)

---

## Summary

| Criterion | Status | Details |
|---|---|---|
| Open Graph tags | ✅ PASS | All 8 pages have complete OG tags |
| Twitter Card | ✅ PASS | All 8 pages have `summary_large_image` Twitter cards |
| JSON-LD SoftwareApplication | ❌ FAIL | No JSON-LD block found in any HTML file |
| Favicon set | ✅ PASS | SVG favicon declared on all pages |
| `manifest.webmanifest` | ❌ FAIL | No web app manifest referenced |

---

## Findings

### ✅ Open Graph Tags — Complete

Every page includes the full set of Open Graph meta tags:

```
og:title       → <page-specific title>
og:description → <page-specific description>
og:image       → /variants/02-spotlight-projector-1/img/og.svg
og:url         → https://detain.github.io/phlix-website/<page>
og:type        → website
```

All pages share the same OG image path (`/variants/02-spotlight-projector-1/img/og.svg`). Verify that this SVG file exists at that path.

---

### ✅ Twitter Card — Complete

Every page includes:

```
twitter:card        → summary_large_image
twitter:title       → <page-specific title>
twitter:description → <page-specific description>
twitter:image       → /variants/02-spotlight-projector-1/img/og.svg
```

Consistent with the Open Graph image. The `summary_large_image` card type is appropriate for a media-focused product.

---

### ❌ JSON-LD SoftwareApplication Block — Missing

**No JSON-LD schema.org structured data is present in any of the 8 HTML files.**

A `SoftwareApplication` (or `WebApplication`) JSON-LD block should be present in the `<head>` of each page, e.g.:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Phlix",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "PHP 8.3+",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Self-hosted PHP media server..."
}
</script>
```

**Suggested fix** — add to the `<head>` of each page (or a shared template partial):

```html
<!-- JSON-LD: SoftwareApplication -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Phlix",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "PHP 8.3+ (Workerman 5.x)",
  "description": "Self-hosted PHP media server that streams to Roku, Samsung TV, Windows, mobile, and any DLNA device.",
  "url": "https://detain.github.io/phlix-website/",
  "image": "https://detain.github.io/phlix-website/variants/02-spotlight-projector-1/img/og.svg",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
</script>
```

---

### ✅ Favicon — Set

All 8 pages declare:

```html
<link rel="icon" type="image/svg+xml" href="/variants/02-spotlight-projector-1/img/favicon.svg">
```

**Action item:** Verify that `/variants/02-spotlight-projector-1/img/favicon.svg` exists on disk.

---

### ❌ `manifest.webmanifest` — Missing

No `<link rel="manifest">` tag is present in any of the 8 HTML files. A web app manifest is required for progressive web app (PWA) installation prompts and fulfills the "Favicon set + manifest.webmanifest" rubric requirement.

**Suggested fix** — add to the `<head>` of each page:

```html
<link rel="manifest" href="/variants/02-spotlight-projector-1/site.webmanifest">
```

And create `/variants/02-spotlight-projector-1/site.webmanifest` with:

```json
{
  "name": "Phlix",
  "short_name": "Phlix",
  "description": "Self-hosted PHP media server",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#000000",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/variants/02-spotlight-projector-1/img/favicon.svg",
      "sizes": "any",
      "type": "image/svg+xml"
    }
  ]
}
```

---

## Verdict

**2 of 4 rubric items fail** — JSON-LD and manifest.webmanifest are both absent.

- Open Graph: ✅ Complete  
- Twitter Card: ✅ Complete  
- JSON-LD: ❌ Missing  
- Favicon: ✅ Set  
- manifest.webmanifest: ❌ Missing  

**Recommendation:** Add a JSON-LD `SoftwareApplication` block and a `site.webmanifest` to satisfy the rubric fully.
