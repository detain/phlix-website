# Social Metadata Review — Cottagecore Bloom

**Variant**: cottagecore-bloom
**Round**: 1
**Reviewer**: adversarial reviewer (Claude Opus 5)
**Date**: 2026-07-25

## Score

- **Social Metadata**: 88 / 100

## ✅ Passed

- **All six required Open Graph properties on all ten pages**: `og:type`,
  `og:site_name`, `og:url`, `og:title`, `og:description`, `og:image`. Each
  page's `og:url` is its own absolute URL, and each `og:title` matches its
  `<title>` — no cross-page copy-paste errors (checked all ten).
- **`og:image` is `img/og.png` at exactly 1200×630** (verified by parsing the PNG
  IHDR chunk), referenced as an absolute URL as required. This also resolves the
  program-wide problem the author escalated: `shared/content.json`'s
  `meta.og_image` was an absolute-path SVG, which `check-meta.mjs` rule 5 rejects;
  this site's pages correctly agree with the corrected `img/og.png` value.
- Twitter card is complete and correct: `twitter:card=summary_large_image`,
  `twitter:title`, `twitter:description`, `twitter:image`, `twitter:creator`.
- **JSON-LD `SoftwareApplication` on the home page is well-formed and factually
  correct** — `name`, `description` (verbatim from `content.json`),
  `applicationCategory`, `operatingSystem`, `url`, `offers` (price 0 USD) and
  `license: https://www.mozilla.org/en-US/MPL/2.0/`. The predecessor build
  claimed `BSD-3-Clause` here, which was simply wrong; this is the fix.
- `theme-color` is set (`#C8556A`, the brand's Garden Rose) so mobile browser
  chrome carries the identity.
- `og.svg` is retained as the editable source beside the rasterised `og.png`,
  re-authored for the new "Grow Your Garden" headline rather than carrying the
  predecessor's copy.
- `<link rel="icon" type="image/svg+xml" href="img/favicon.svg">` on all ten
  pages, and the favicon is genuinely on-brand (Primrose the bee on a Garden Rose
  tile) rather than a generic mark.

## ⚠️ Concerns (non-blocking)

- **The favicon set the rubric asks for is not shipped: only `favicon.svg`
  exists.** The Social Metadata criterion names 16, 32, 180 (apple-touch), 192,
  512 and a `manifest.webmanifest`; none of those files is present in
  `sites/cottagecore-bloom/img/`. Practically this means no Apple home-screen icon
  and no PWA install metadata. **I am flagging this as program-scope, not as this
  author's regression** — every one of the 50 sites on disk ships only
  `favicon.svg`, there is no generator for the set in `tools/`, and
  `selfcheck` / `render-check` do not ask for it. It needs a program decision
  (probably a `tools/gen-icons.mjs`), not a per-site patch. Recorded here because
  the rubric names it explicitly.
- **All ten pages share one `og:description`.** This is the honest choice —
  `content.json` supplies exactly one `meta.description` and inventing nine more
  would risk fabrication — but a shared link preview for `seasons.html` describes
  the product rather than the page, so a shared link to the seasonal guide previews
  as the generic homepage. Same program-scope caveat as the meta description in
  `seo.md`.
- **`og:image` is identical on all ten pages**, including `404.html`. A shared 404
  link previews with the full-brand card, which is arguably friendlier than a
  broken preview, so this is a note rather than a problem — but the error page
  carries `robots noindex` and a self-canonical, so its social metadata is the one
  place the page's contradictory crawler signals are visible (see `seo.md`).

## ❌ Failures (must fix this round)

_None._

## Recommendations (ranked by impact)

1. Escalate the favicon set / `manifest.webmanifest` as a program-level tool
   (`tools/gen-icons.mjs`) rather than patching one site (impact: medium,
   effort: medium, owner: program).
2. If per-page descriptions are ever allowed, `seasons.html` and `404.html` are the
   two pages that most need one (impact: low, effort: low).

## Evidence

- `grep -n 'og:\|twitter:\|theme-color\|rel="icon"'` across all ten HTML files.
- PNG IHDR parse of `img/og.png` → `1200x630`.
- `ls sites/cottagecore-bloom/img/` → `favicon.svg`, `logo.svg`, `og.png`,
  `og.svg`, `PROMPTS.md`, `seasonal/` (3 SVGs). No icon set, no webmanifest.
- `ls sites/*/img/*.webmanifest` → no matches anywhere in the repo (program-scope
  confirmation).
- JSON-LD block read in full at `index.html:51-63`.
