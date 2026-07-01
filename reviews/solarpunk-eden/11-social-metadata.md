# Social Metadata Review — Solarpunk Eden

**Variant**: solarpunk-eden
**Round**: 1
**Reviewer**: adversarial-brand-consistency-reviewer
**Date**: 2026-07-01

## Score

- **Social metadata**: 82 / 100

## ✅ Passed

- **Open Graph on all pages**: `og:type=website`, `og:site_name=Phlix` — present on all 8 pages
- **OG url**: absolute URL on all pages — `index.html:14`, `features.html:13`, etc.
- **OG title**: present on all pages — "Phlix — Stream in the Sunshine." on home, "Features — Phlix", etc.
- **OG description**: present on all pages
- **Twitter card**: `twitter:card=summary_large_image` on all pages
- **Twitter title, description, image**: present on all 8 pages
- **Twitter creator**: `@detain` on all pages
- **theme-color** set to kit primary `#2D7A4F` on all 8 pages — `index.html:26`, `features.html:23`, etc.
- **Favicon**: `<link rel="icon" type="image/svg+xml" href="img/favicon.svg">` on all pages
- **JSON-LD SoftwareApplication** on home page with correct schema.org fields: `@type`, `name`, `description`, `applicationCategory`, `operatingSystem`, `offers` (price=0), `license` — `index.html:37-52`
- **og:image** uses absolute URL (not relative) — `index.html:13` = `https://detain.github.io/phlix-website/solarpunk-eden/img/og.svg` — correct

## ⚠️ Concerns (non-blocking)

- **og:image is SVG** not PNG — `index.html:13` references `img/og.svg`; new_site.md §11 explicitly requires "1200×630 png" and §8 says "Ship `og.svg` as the editable source if used, but reference a rasterized **`og.png`** in meta." OG previewers generally handle SVG but PNG is more widely compatible. This is a spec violation, not a functional failure.
- **about.html:11,19** — `og:description` and `twitter:description` use a shorter, different text: "Self-hosted media. Open source. No lock-in. BSD-3-Clause across the board." while other pages use the generic product description. This is a per-page variation but not a spec violation — spec says "all present" not "identical across pages."
- **plugins.html:19** — `twitter:description` = "Extend Phlix with a versioned plugin contract..." — matches `og:description` — good consistency
- **hub.html:11** — `og:description` = "Reach any of your Phlix servers from anywhere..." — specific, appropriate

## ❌ Failures (must fix this round)

- **new_site.md §8 and §11 violation**: `og:image` references `img/og.svg` (SVG) instead of a rasterized 1200×630 `og.png`. While SVG is technically valid for OG image, the spec explicitly requires PNG. This is a documented spec violation in the site's own scaffold rules.

## Recommendations (ranked by impact)

1. Generate `img/og.png` (1200×630 raster) and update all `og:image` meta tags to reference `.png` instead of `.svg` — (impact: medium, effort: medium)
2. Ensure `og:image` renders correctly at 1200×630 preview size — if current og.svg renders acceptably at that size, defer PNG generation to future iteration (impact: low)

## Evidence

- `grep -n "og:\|twitter:\|theme-color\|json-ld\|favicon" /home/sites/phlix/sites/solarpunk-eden/index.html | head -30`
- Verified all 8 pages have complete OG and Twitter card meta — see above
