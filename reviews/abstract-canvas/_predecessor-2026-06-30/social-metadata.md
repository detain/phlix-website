# Review: Social Metadata — abstract-canvas

## Score: 88 / 100

---

## Findings

### ✅ `og:type=website` — all 8 pages
- Present on every page (e.g. index.html:13, features.html:11)

### ✅ `og:site_name=Phlix` — all 8 pages
- Present on every page (e.g. index.html:14, features.html:12)

### ✅ `og:url` = absolute URL — all 8 pages
- All canonical and og:url use absolute form: `https://detain.github.io/phlix-website/sites/abstract-canvas/<page>.html`
- Verified: index.html:9,15 / features.html:9,13 / clients.html:8,12 / download.html:8,12 / plugins.html:8,12 / docs.html:8,12 / hub.html:8,12 / about.html:8,12
- **No relative URL bug** ✅

### ✅ `og:title` — all 8 pages
- Verified on all 8 pages (e.g. index.html:16, features.html:14)

### ✅ `og:description` — all 8 pages
- Verified on all 8 pages (e.g. index.html:17, features.html:15)

### ✅ `og:image` = absolute URL to 1200×630 image — all 8 pages
- All use: `https://detain.github.io/phlix-website/sites/abstract-canvas/img/og.svg`
- og.svg is confirmed 1200×630px (viewBox="0 0 1200 630", width="1200" height="630") ✅
- Absolute URL form — no relative URL bug ✅
- img/og.svg exists at 2342 bytes ✅

### ✅ `twitter:card=summary_large_image` — all 8 pages
- Present on every page (e.g. index.html:21, features.html:17)

### ✅ `twitter:title` — all 8 pages
- Verified on all 8 pages (e.g. index.html:22, features.html:18)

### ✅ `twitter:description` — all 8 pages
- Verified on all 8 pages (e.g. index.html:23, features.html:19)

### ✅ `twitter:image` = absolute URL — all 8 pages
- All use absolute URL matching og:image (same og.svg)
- Verified on all 8 pages (e.g. index.html:24, features.html:20)

### ✅ `twitter:creator=@detain` — all 8 pages
- Present on every page (e.g. index.html:25, features.html:21)

### ✅ `<meta name="theme-color" content="#1A1A1A">` — all 8 pages
- Verified on all 8 pages (e.g. index.html:10, features.html:10)
- Value matches kit primary color `#1A1A1A` ✅

### ✅ `<link rel="icon" type="image/svg+xml" href="img/favicon.svg">` — all 8 pages
- Verified on all 8 pages (e.g. index.html:28, features.html:22)
- favicon.svg exists in img/ ✅

### ⚠️ `og:image` references `og.svg` but content.json specifies `og.png`
- content.json:194: `"og_image": "/img/og.png"`
- All HTML files: `img/og.svg`
- The deployed og.svg is 1200×630 and visually correct (brand background, wordmark, tagline)
- This is likely an intentional deviation (SVG preferred over PNG for scalability), but it departs from the content.json contract
- **Severity: ⚠️** — if tooling auto-generates from content.json, this mismatch would cause wrong filename

### ⚠️ `og:description` differs from content.json on download, plugins, hub, about pages
- download.html:14 uses `"Self-hostable PHP media server. PHP 8.3+, Workerman 5.x, async/coroutine server."` — not from content.json
- plugins.html:14 uses `"Plugin system with LifecycleInterface + manifest schema. Drop a plugin in, the loader picks it up."` — from features[6].body
- hub.html:14 uses `"Sign in once. Reverse-tunnel relay handles NAT. Self-hostable, or use the public hub."` — from features[7].body
- about.html:14 uses `"Self-hostable PHP media server. BSD-3-Clause license. No subscription, no tracking."` — brand-specific micro-copy
- These are contextually appropriate and brand-faithful, but technically deviate from content.json meta.description
- **Severity: ⚠️** — spec says meta.description comes from `content.json meta.description`; each page could use the site-wide value

---

## Summary

All 13 required meta tags are present and correctly formatted on every page. All OG and Twitter URLs are absolute. The og.svg asset is the correct 1200×630 dimensions. One minor issue: the og:image filename is `og.svg` while content.json specifies `og.png` — likely an intentional SVG preference but a contract deviation. Several pages use page-specific og:description rather than the shared `meta.description` from content.json, which is contextually better but technically non-compliant with the one-file-swap localization principle.
