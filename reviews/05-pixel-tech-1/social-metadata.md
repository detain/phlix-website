# Social Metadata Review — `05-pixel-tech-1`

**Wave:** 1 — Terminal Hacker
**Files reviewed:** `variants/05-pixel-tech-1/*.html` (8 files)
**Reviewed:** index, about, hub, features, download, clients, docs, plugins

---

## Summary

| Tag Family | Present | Consistent | Notes |
|---|---|---|---|
| `<title>` | ✅ All 8 | ✅ | Page-specific titles |
| `<meta name="description">` | ✅ All 8 | ✅ | Each page has unique, relevant copy |
| `<link rel="canonical">` | ✅ All 8 | ✅ | All point to GitHub Pages URLs |
| Open Graph (`og:*`) | ✅ All 8 | ✅ | Consistent across all pages |
| Twitter Card (`twitter:*`) | ✅ All 8 | ✅ | Consistent across all pages |
| Favicon SVG | ✅ All 8 | ✅ | `/img/favicon.svg` |
| `manifest.json` | ❌ None | — | **Missing** — see Finding 1 |
| JSON-LD | ❌ None | — | **Missing** — see Finding 2 |
| `apple-touch-icon` | ❌ None | — | Low priority; see Finding 3 |

---

## Findings

### Finding 1 — [MEDIUM] `manifest.json` absent

**What:** No Web App Manifest is present anywhere in the variant.

**Why it matters:** A `manifest.json` enables PWA installation, "Add to Home Screen", and improves the mobile UX for a site about a self-hostable media server. Users discovering Phlix on mobile will see a bare browser chrome instead of an app-like experience.

**Suggested fix** (add to `<head>` of all pages):
```html
<link rel="manifest" href="/manifest.json">
```

A minimal viable manifest at `public_html/manifest.json`:
```json
{
  "name": "Phlix",
  "short_name": "Phlix",
  "description": "Self-hosted media server",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0a0a0a",
  "theme_color": "#39FF14",
  "icons": [
    { "src": "/img/favicon.svg", "sizes": "any", "type": "image/svg+xml" }
  ]
}
```

---

### Finding 2 — [LOW] JSON-LD structured data absent

**What:** No `<script type="application/ld+json">` blocks are present on any page.

**Why it matters:** JSON-LD allows search engines to understand the site as a software application with specific properties (name, description, author, license, URL). The home page would particularly benefit from a `SoftwareApplication` or `WebSite` schema.

**Impact:** Low because the site already has solid `<title>`, `<meta description>`, and Open Graph tags — the primary signals search engines use. JSON-LD is additive, not critical.

**Suggested fix** (add to `<head>` of `index.html`):
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Phlix",
  "description": "Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support.",
  "url": "https://detain.github.io/phlix-website/",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "PHP 8.3+",
  "license": "https://opensource.org/licenses/BSD-3-Clause",
  "author": {
    "@type": "Organization",
    "name": "Phlix",
    "url": "https://github.com/detain"
  }
}
</script>
```

---

### Finding 3 — [TRIVIAL] No `apple-touch-icon` link

**What:** No `<link rel="apple-touch-icon">` for iOS home screen bookmarking.

**Why it matters:** When an iOS user adds the site to their home screen, they get a greyed-out placeholder instead of the Phlix favicon.

**Suggested fix** (add to `<head>`, only needed if targeting iOS users):
```html
<link rel="apple-touch-icon" href="/img/favicon.svg">
```

---

## What's Working Well

- **All 8 pages** carry complete and correct social metadata — title, description, canonical, og:*, twitter:*.
- **og:image** and **twitter:image** both use `/img/og.svg` — a vector image works correctly across all card sizes and resolutions.
- **og:url** points to the correct GitHub Pages canonical URL on every page.
- **Twitter card type** is consistently `summary_large_image` — appropriate for a visual media server brand.
- **Favicon** is SVG (vector), meaning it stays crisp at any size — no raster favicon degradation.
- **No duplicate or conflicting meta tags** detected.

---

## Path Correctness Warning

The canonical URL on all pages is `https://detain.github.io/phlix-website/` and all relative asset paths (CSS, JS, images) are root-relative (`/css/`, `/js/`, `/img/`). This means assets resolve to:

```
https://detain.github.io/phlix-website/css/base.css   ✅
https://detain.github.io/phlix-website/img/og.svg       ✅
https://detain.github.io/phlix-website/img/favicon.svg  ✅
```

This is correct for GitHub Pages hosting. If the site is ever served from a different base path, all relative URLs will break — but this is a deployment concern, not a social metadata concern.
