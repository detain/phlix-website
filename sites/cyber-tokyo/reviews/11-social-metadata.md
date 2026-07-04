# Dimension 11: Social metadata

## Score: 60/100

## Severity: ❌

## Findings

**CRITICAL**: All 8 pages reference `og:image` pointing to `img/og.png`, but this file does not exist. Only `img/og.svg` is present. Social shares will fail or show broken images on platforms that strictly require PNG format.

- `index.html:14`: `<meta property="og:image" content="https://detain.github.io/phlix-website/sites/cyber-tokyo/img/og.png">`
- `features.html:13`: Same
- `clients.html:13`: Same
- `download.html:13`: Same
- `plugins.html:13`: Same
- `docs.html:13`: Same
- `hub.html:13`: Same
- `about.html:13`: Same

**Verification**: `ls /home/sites/phlix/phlix-website/sites/cyber-tokyo/img/og.png` returns "OG_PNG_MISSING". Only `og.svg` (source file) is present in the img/ directory.

Per new_site.md §8: "Ship `og.svg` as the editable source if used, but reference a rasterized **`og.png`** in meta." The spec explicitly requires a rasterized PNG for social sharing. The SVG alone is not sufficient for OG/Twitter image consumption by all platforms.

**Minor note**: The `og.svg` itself is well-designed — it uses the correct Tokyo Night background, Neon Sakura + Circuit Green accents, Space Grotesk typography, and vertical kanji decorative element matching the brand. If converted to PNG at 1200×630, it would be compliant.

## What passed

- **Open Graph tags complete on all 8 pages**: `og:title`, `og:description`, `og:url`, `og:type`, `og:site_name` all present ✅
- **`og:type=website`** on all pages ✅
- **`og:site_name=Phlix`** on all pages ✅
- **`og:url` is absolute** on all pages — all point to the full canonical URL for each page ✅
- **`og:image` is absolute URL** on all pages — all use the full `https://detain.github.io/...` path ✅
- **Twitter Card complete on all 8 pages**: `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:creator=@detain` all present ✅
- **`twitter:image` is absolute URL** on all pages ✅
- **`twitter:card=summary_large_image`** — appropriate for a 1200×630 image ✅
- **`theme-color=#FF00AA`** on all 8 pages — matches kit primary color ✅
- **Favicon link** (`type="image/svg+xml" href="img/favicon.svg"`) on all 8 pages ✅
- **Favicon uses Neon Sakura** (`#FF00AA`) as background — matches brand primary color ✅
- **No mixed content** — all resources use https ✅
