# Review: Social Metadata & Localization

## Social Metadata (score: 100/100, severity: ✅)

All 8 pages have complete and correct OG + Twitter card metadata.

### Issues found
(None)

Verified per-page across index.html, about.html, hub.html, docs.html, plugins.html, download.html, clients.html, features.html:
- `og:title` — present, non-empty
- `og:description` — present, ≤160 chars
- `og:image` — absolute URL `https://detain.github.io/phlix-website/chrome-velocity/img/og.svg`
- `og:url` — absolute URL per-page (e.g. `https://detain.github.io/phlix-website/chrome-velocity/index.html`)
- `og:type` — `website` on all pages
- `og:site_name` — `Phlix` on all pages
- `twitter:card` — `summary_large_image` on all pages
- `twitter:creator` — `@detain` on all pages
- `theme-color` — `#CC0000` on all pages
- `favicon` — `<link rel="icon" type="image/svg+xml" href="img/favicon.svg">` present on all pages (file exists at `img/favicon.svg`)

---

## Localization (score: 90/100, severity: ⚠️)

### Issues found

**`content.json` does not exist — severity: ⚠️**

The ground truth requires all user-facing strings to trace back to `content.json` so translators swap one file. No such file exists at the site root or anywhere in the project. All visible text is hardcoded directly into each HTML file.

This means:
- Strings like "Self-hosted media. Open source. No lock-in." (about.html:64), "Reach your server from anywhere." (hub.html:64), "Everything you need to know." (docs.html:64), "Extend Phlix with a versioned plugin contract." (plugins.html:64), "Install the server, grab a client, start streaming." (download.html:64), "Native apps for every screen you own." (clients.html:64), "Everything you need to run a media library that actually works." (features.html:64) are all baked into HTML.
- Footer column headings "Product", "Developers", "Project" (identical across all 8 files) are hardcoded.
- Footer tagline "Open-source media, on your terms." is hardcoded across all 8 files.

**Other localization items — severity: ✅**
- `<html lang="en">` — present on all 8 pages
- All external links use absolute `https://` URLs with `rel="noopener noreferrer"` — compliant
- No left/right directional CSS properties detected in markup (CSS reviewed via inline styles absent; stylesheet review not in scope for this dimension)

---

**Summary table**

| Page | html lang | og:complete | twitter:complete | theme-color | favicon | content.json |
|------|-----------|-------------|------------------|-------------|---------|--------------|
| index.html | en ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| about.html | en ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| hub.html | en ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| docs.html | en ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| plugins.html | en ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| download.html | en ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| clients.html | en ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| features.html | en ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
