# Social Metadata Review — Swiss Modernist

**Variant**: swiss-modernist
**Round**: 1
**Reviewer**: adversarial reviewer (claude-opus-5)
**Date**: 2026-07-25

## Score

- **Social Metadata**: 86 / 100

## ✅ Passed

- Full Open Graph set on all nine pages: `og:type`, `og:site_name`, `og:url`, `og:title`,
  `og:description`, `og:image`.
- `og:image` is the **absolute** URL to `img/og.png` (not `.svg`, not relative), satisfying
  `content.json.meta.og_image_note` and `tools/check-meta.mjs` rule 5.
- `img/og.png` is exactly **1200 × 630** (verified), 38 KB.
- `twitter:card=summary_large_image` plus `twitter:title`, `twitter:description`,
  `twitter:image`, `twitter:creator`.
- `theme-color` set to `#E8001C`.
- JSON-LD `SoftwareApplication` block on every page.
- **The OG card is a real Swiss poster, not a generic banner.** `img/og.svg` draws a 12-column
  guide field at a 100px pitch, an oversized `01` in Barlow Condensed 900 at Rule Gray, the Inter
  Black wordmark at x=100 with an 8px Basel Red rule beneath it, the tagline, and an Ink Black
  mono readout bar. Notably, **its guides do align with its content** (the wordmark sits on the
  x=100 guide) — which is the correct behaviour the on-page `.band--guides` field fails to
  achieve.
- The OG card's licence bar states the real split ("SERVER + HUB MPL-2.0 · CLIENTS MIT"); the
  predecessor's stale `BSD-3-Clause` bar is gone.
- `og:title` on the home page uses the kit's own `tagline_primary`, so the card is
  brand-distinct rather than boilerplate.

## ⚠️ Concerns (non-blocking)

- **Favicon set is SVG-only.** `index.html:16` declares only
  `<link rel="icon" type="image/svg+xml" href="img/favicon.svg">`. The rubric asks for 16/32/180
  (apple-touch-icon)/192/512 plus `manifest.webmanifest`. This is the shared baseline for most
  sites in the programme (`mid-century-modern`, `neon-noir` are also SVG-only) though at least
  one — `copper-steampunk` — does ship a webmanifest, so it is not universal. Low priority and
  arguably an orchestrator-level decision, not a per-site regression.
- **`img/favicon.svg:3-4`** places a Grid White "P" on a solid Basel Red field. The card and the
  favicon therefore disagree about the brand's ground colour, and the favicon violates
  `do_dont.branding.dont` ("Apply the logo on colored backgrounds (red, gray) without inversion
  approval"). Filed as a ⚠️ in `brand-fidelity.md`; it also matters here because the favicon is
  what appears next to the OG card in most share surfaces.
- **`BUILD_LOG.md:109-111` (known, accepted)** — `og.png` is rasterised by `rsvg-convert`, which
  does not embed the brand WOFF2 faces, so the card's type renders in the system fallback of the
  Inter / Barlow / JetBrains stacks. The author correctly identifies this as a `tools/**` fix and
  did not touch shared tooling. No action for the Fixer; keep it on the orchestrator's list.

## ❌ Failures (must fix this round)

- None.

## Recommendations (ranked by impact)

1. Invert `img/favicon.svg` to Ink Black ground / Grid White "P" (impact: medium, effort: trivial).
2. Raise the SVG-only favicon set and the `rsvg-convert` font gap to the orchestrator rather than
   patching one site (impact: low, effort: n/a).

## Evidence

- `<meta property="og:*">` / `<meta name="twitter:*">` extracted from all nine pages.
- `PIL.Image.open('img/og.png').size` → `(1200, 630)`.
- `img/og.svg` and `img/favicon.svg` read in full.
