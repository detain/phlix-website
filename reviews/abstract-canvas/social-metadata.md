# Social Metadata Review — Abstract Canvas

> Supersedes the 2026-06-30 review of the **predecessor** site (recoverable from git history).

**Variant**: abstract-canvas
**Round**: 1 (regen pass, `regen/wave-1`)
**Reviewer**: adversarial reviewer (independent)
**Date**: 2026-07-24

## Score

- **Social Metadata**: 86 / 100

## ✅ Passed

- **All six required Open Graph tags on all 9 pages**: `og:type`, `og:site_name`, `og:url`,
  `og:title`, `og:description`, `og:image` — every URL absolute and pointing at the live GH-Pages
  path, `og:url` matching the page's own canonical.
- **`og:image` is a real, correctly-sized PNG**: `img/og.png` verified by header inspection at
  **1200×630**, 74.9 KB. `og.svg` is retained as the editable source and is *not* referenced in the
  meta — §19.5 satisfied (this was a predecessor defect: the PNG was referenced but did not exist).
- **Twitter card complete**: `twitter:card=summary_large_image`, `twitter:title`,
  `twitter:description`, `twitter:image` (absolute PNG), `twitter:creator=@detain` on all 9 pages.
- `theme-color` = `#1A1A1A` (Carbon Black, on-token) on all 9 pages.
- **JSON-LD `SoftwareApplication`** on the home page is valid, and its `license`
  (`https://www.mozilla.org/en-US/MPL/2.0/`) matches the `content.json` licence fact rather than the
  predecessor's BSD-3 URL.
- `404.html` participates correctly: its own title/OG/Twitter set plus `robots: noindex`.

## ⚠️ Concerns (non-blocking)

- **Favicon set is `favicon.svg` alone.** No 16/32 PNGs, no `apple-touch-icon` (180), no 192/512, no
  `manifest.webmanifest` — the rubric lists all of these. Mitigating: **every** site in `sites/` has
  exactly the same gap (checked `editorial-underground`, `festive-lantern`), so this is a shared
  program change, not a per-kit fix, and `tools/check-meta.mjs` does not gate on it. — ROUND-1 #20.
- **No `og:image:alt`, `og:image:width`, `og:image:height`, `og:locale`.** All optional, but
  `og:image:alt` is the accessibility-relevant one and the image is a bespoke brand card worth
  describing.
- **The OG/Twitter description is identical on all 9 pages** (the single `content.json` string), so a
  shared link to the Clients page previews as the generic product blurb. — ROUND-1 #18.
- JSON-LD appears on the home page only (0/8 others). — ROUND-1 #19.

## ❌ Failures (must fix this round)

- None.

## Recommendations (ranked by impact)

1. Per-page `og:description` (and `og:title` already varies) so a shared deep link previews the actual
   page (impact: medium, effort: low).
2. Add `og:image:alt` + explicit `width`/`height` (impact: low, effort: trivial).
3. Raise the favicon/manifest gap with the orchestrator as a shared change across all 50 sites
   (impact: low, effort: shared).

## Evidence

- Scripted extraction of every `<meta property="og:*">` / `<meta name="twitter:*">` / `<link
  rel="icon">` from all 9 pages.
- `img/og.png` IHDR read directly → `1200 x 630`.
- `ls sites/*/img/` comparison against two sibling kits for the favicon question.
