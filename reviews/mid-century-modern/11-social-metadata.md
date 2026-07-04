# Social Metadata Review — mid-century-modern

**Variant**: mid-century-modern
**Round**: 11
**Reviewer**: adversarial-social-metadata-reviewer
**Date**: 2026-07-01

## Score

- **Social Metadata**: 72 / 100

## ✅ Passed

- All 8 pages (index.html, features.html, clients.html, download.html, plugins.html, docs.html, hub.html, about.html) have complete Open Graph tags: `og:type=website`, `og:site_name=Phlix`, `og:url` (absolute), `og:title`, `og:description`, `og:image` (absolute URL)
- All 8 pages have complete Twitter Card tags: `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image` (absolute), `twitter:creator=@detain`
- All `og:image` and `og:url` values are absolute URLs — no relative URL bug
- All 8 pages have `<meta name="theme-color" content="#00AFAF">`
- All 8 pages have `<link rel="icon" type="image/svg+xml" href="img/favicon.svg">`
- Canonical URLs are absolute on all 8 pages
- index.html has a JSON-LD `SoftwareApplication` block with full schema.org markup

## ⚠️ Concerns (non-blocking)

- `og:image` is an SVG with `viewBox="0 0 1200 630"` but no explicit `width="1200"` / `height="630"` attributes — most social scrapers will infer from viewBox correctly, but explicit pixel dimensions are more reliable — `index.html:24` — add `width="1200" height="630"` to the og.svg `<svg>` tag for maximum compatibility
- The rubric specifies `manifest.webmanifest` with favicon sizes 16, 32, 180 (apple), 192, 512 — no `manifest.webmanifest` exists at the site root — this is listed in the rubric but not in the task's explicit checklist; included here for completeness

## ❌ Failures (must fix this round)

- **No manifest.webmanifest** — site root `/home/sites/phlix/phlix-website/sites/mid-century-modern/manifest.webmanifest` does not exist — required per rubric: "Favicon set: 16, 32, 180 (apple), 192, 512, plus manifest.webmanifest" — create `manifest.webmanifest` with `icons` array listing all required sizes
- **Favicon multi-size missing** — only `img/favicon.svg` is linked; rubric requires 16×16, 32×32, 180×180 (apple-touch-icon), 192×192, 512×512 variants — add `<link rel="icon" sizes="16x16">`, `<link rel="icon" sizes="32x32">`, `<link rel="apple-touch-icon" sizes="180x180">`, `<link rel="icon" sizes="192x192">`, `<link rel="icon" sizes="512x512">` to all 8 pages (or a shared head include)

## Recommendations (ranked by impact)

1. Create `manifest.webmanifest` at site root listing all required icon sizes (impact: medium, effort: low)
2. Add multi-size favicon `<link>` tags to a shared head include or each page (impact: medium, effort: medium)
3. Add explicit `width="1200" height="630"` to og.svg for maximum scraper compatibility (impact: low, effort: low)

## Evidence

- `ls /home/sites/phlix/phlix-website/sites/mid-century-modern/img/` — og.svg (4175 bytes), favicon.svg (872 bytes) present; no other icon sizes
- `ls /home/sites/phlix/phlix-website/sites/mid-century-modern/*.webmanifest` — no manifest found
- `file /home/sites/phlix/phlix-website/sites/mid-century-modern/img/og.svg` — SVG with viewBox="0 0 1200 630"
- python3 xml.etree check confirmed viewBox 1200×630, no explicit width/height on SVG element
- All 8 HTML files confirmed to have identical social metadata structure; only index.html includes JSON-LD block
