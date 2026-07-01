# Round 2 Social Metadata Review — Pixel Dungeon (pixel-dungeon)

## Dimension 9 — Social Metadata

**Score: 97/100** ⚠️

---

## All 8 pages: OG metadata complete ✅

Required: `og:type=website`, `og:site_name=Phlix`, `og:url` (absolute), `og:title`, `og:description`, `og:image` (absolute URL).

| Page | og:type | og:site_name | og:url (abs) | og:title | og:description | og:image (abs) |
|---|---|---|---|---|---|---|
| index.html | ✅ website | ✅ Phlix | ✅ | ✅ | ✅ | ✅ |
| features.html | ✅ website | ✅ Phlix | ✅ | ✅ | ✅ | ✅ |
| clients.html | ✅ website | ✅ Phlix | ✅ | ✅ | ✅ | ✅ |
| download.html | ✅ website | ✅ Phlix | ✅ | ✅ | ✅ | ✅ |
| plugins.html | ✅ website | ✅ Phlix | ✅ | ✅ | ✅ | ✅ |
| docs.html | ✅ website | ✅ Phlix | ✅ | ✅ | ✅ | ✅ |
| hub.html | ✅ website | ✅ Phlix | ✅ | ✅ | ✅ | ✅ |
| about.html | ✅ website | ✅ Phlix | ✅ | ✅ | ✅ | ✅ |

---

## All 8 pages: Twitter metadata complete ✅

Required: `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image` (absolute), `twitter:creator=@detain`.

| Page | twitter:card | twitter:title | twitter:description | twitter:image (abs) | twitter:creator |
|---|---|---|---|---|---|
| index.html | ✅ | ✅ | ✅ | ✅ | ✅ @detain |
| features.html | ✅ | ✅ | ✅ | ✅ | ✅ @detain |
| clients.html | ✅ | ✅ | ✅ | ✅ | ✅ @detain |
| download.html | ✅ | ✅ | ✅ | ✅ | ✅ @detain |
| plugins.html | ✅ | ✅ | ✅ | ✅ | ✅ @detain |
| docs.html | ✅ | ✅ | ✅ | ✅ | ✅ @detain |
| hub.html | ✅ | ✅ | ✅ | ✅ | ✅ @detain |
| about.html | ✅ | ✅ | ✅ | ✅ | ✅ @detain |

---

## `og:image` and canonical URLs are ABSOLUTE: ✅

All 8 pages use absolute canonical and og:image URLs:

`index.html:9` — `<link rel="canonical" href="https://detain.github.io/phlix-website/sites/pixel-dungeon/">`
`index.html:18` — `<meta property="og:image" content="https://detain.github.io/phlix-website/sites/pixel-dungeon/img/og.png">`

Same pattern on all 7 other pages with their respective page-specific paths. ✅

---

## theme-color = kit primary `#E8001A`: ✅

All 8 pages: `<meta name="theme-color" content="#E8001A">` ✅

`pixel-dungeon.js:958` — `design_tokens.color["--color-primary"]` = `"#E8001A"` (Mario Red). The theme-color correctly matches the kit's primary color. ✅

---

## Critical Issue: `og.png` does not exist ❌

**Penalty: −3**

All 8 HTML files reference:
```html
<meta property="og:image" content="https://detain.github.io/phlix-website/sites/pixel-dungeon/img/og.png">
<meta name="twitter:image" content="https://detain.github.io/phlix-website/sites/pixel-dungeon/img/og.png">
```

But `img/` directory contents are:
```
img/
├── og.svg          ← exists, IS the source
├── blip-sprite.svg
├── favicon.svg
├── logo.svg
└── PROMPTS.md
```

**`og.png` does not exist.** The build step to rasterize `og.svg` → `og.png` is missing.

**Why this matters:**
- LinkedIn, Slack, Discord, and some Twitter/X contexts do not reliably render SVG `og:image`
- OG image spec requires `1200×630` raster image for reliable cross-platform preview
- `new_site.md §8` anticipates this: "Ship `og.svg` as the editable source if used, but reference a rasterized **`og.png`** in meta"
- The HTML correctly references `og.png`. The build artifact is missing. This is a broken deployment contract.

**Corrective action:** Add a build step to rasterize `img/og.svg` to `img/og.png` at 1200×630 resolution, or update all meta tags to reference `img/og.svg` and accept SVG limitations. Per spec, the raster PNG must exist.

---

## Summary table

| Check | Status | File:Line |
|---|---|---|
| All 8 pages: og:type=website | ✅ | All 8 HTML files |
| All 8 pages: og:site_name=Phlix | ✅ | All 8 HTML files |
| All 8 pages: og:url (absolute) | ✅ | All 8 HTML files |
| All 8 pages: og:title | ✅ | All 8 HTML files |
| All 8 pages: og:description | ✅ | All 8 HTML files |
| All 8 pages: og:image (absolute) | ⚠️ URL correct but file missing | All 8 HTML files:18 |
| All 8 pages: twitter:card=summary_large_image | ✅ | All 8 HTML files |
| All 8 pages: twitter:title | ✅ | All 8 HTML files |
| All 8 pages: twitter:description | ✅ | All 8 HTML files |
| All 8 pages: twitter:image (absolute) | ⚠️ URL correct but file missing | All 8 HTML files:24 |
| All 8 pages: twitter:creator=@detain | ✅ | All 8 HTML files |
| og:image and canonical URLs absolute | ✅ | All 8 HTML files |
| theme-color = kit primary #E8001A | ✅ | All 8 HTML files |

**Required fix:** Generate `img/og.png` (1200×630 PNG) from `img/og.svg` as part of the build step. The SVG source exists; the required raster output is missing.
