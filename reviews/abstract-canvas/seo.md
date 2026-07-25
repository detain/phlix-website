# SEO Review — Abstract Canvas

> Supersedes the 2026-06-30 review of the **predecessor** site (recoverable from git history).

**Variant**: abstract-canvas
**Round**: 1 (regen pass, `regen/wave-1`)
**Reviewer**: adversarial reviewer (independent)
**Date**: 2026-07-24

## Score

- **SEO**: 88 / 100

## ✅ Passed

- **Titles are all ≤60 chars** and page-specific: 15–40 chars (`plugins.html` 15 → `index.html` 36 →
  `404.html` 40). Meta descriptions are 125 chars, inside 160.
- **Canonical on every page**, absolute, and pointing at the live GH-Pages path — including
  `404.html`. The predecessor's spurious `/sites/` segment is gone; I re-derived every URL against
  `content.json.site.url` + slug and they match.
- **`sitemap.xml`**: 8 URLs (the 8 canonical pages, directory-style home), correctly **excluding**
  `404.html`. **`robots.txt`**: `Allow: /` plus the absolute sitemap URL. Both correct.
- **`404.html` carries `<meta name="robots" content="noindex">`** (`404.html:15`) and uses only
  relative `css/`/`img/` paths — no `../` walking, no absolute paths — so the root shim's injected
  `<base>` resolves it from any depth.
- **One `<h1>` per page, no heading-level skips on any of the 9 pages** (measured, not inferred);
  semantic sectioning throughout (`article`, `section`, `figure`/`figcaption`, `dl`, `blockquote`,
  `nav`, `ol` breadcrumbs).
- **Descriptive anchor text** everywhere — "View the source for Samsung Tizen", "Open the API
  reference", "Everyone who has contributed". No "click here", no bare URLs as link text.
- The renamed nav labels do not cost the crawler anything: each carries a hidden gloss
  ("The Canvas — features"), so the anchor text still contains the topical word.
- JSON-LD `SoftwareApplication` on the home page is well-formed and its `license` is the MPL-2.0 URL
  (matching `content.json`).
- All internal anchors resolve (`features.html#library|#syncplay|#dlna`, `download.html#server`), and
  the two footer-demoted pages stay in the sitemap and are internally linked from the footer plus the
  Features fold-in panel — no orphans.

## ⚠️ Concerns (non-blocking)

- **All 9 pages share one identical `<meta name="description">`** (and identical `og:description` /
  `twitter:description`). Lengths pass, but duplicate descriptions waste the strongest per-page SERP
  signal on a nine-page site whose pages are genuinely different. Page descriptions are authored
  presentation copy, so this is fixable without touching `content.json`. — ROUND-1 #18.
- **JSON-LD is on `index.html` only** (0/8 other pages). Matches the program norm, but `about.html`
  (FAQ) is a free `FAQPage` win and `download.html` could carry the `SoftwareApplication` block.
  — ROUND-1 #19.
- No `<meta name="robots">` on the 8 indexable pages (defaults are fine) and no `hreflang` (single
  locale) — both correct, noted only for completeness.
- `docs.html` and `hub.html` link to `https://detain.github.io/phlix-docs/dev` and `…/hub-admin`,
  which are not in `content.json`. Not this kit's invention — 43 and 38 sibling sites use the same
  paths — so it belongs in the shared `linkcheck` baseline rather than this round.

## ❌ Failures (must fix this round)

- None.

## Recommendations (ranked by impact)

1. Give at least `features`, `clients`, `download`, `hub` and `about` their own meta description
   (impact: medium, effort: low).
2. Add `FAQPage` JSON-LD to `about.html` — the six Q&A pairs are already marked up in a `<dl>`
   (impact: low, effort: low).
3. Keep the `/dev` and `/hub-admin` doc paths on the orchestrator's shared-baseline list
   (impact: low, effort: none here).

## Evidence

- Scripted extraction of `<title>`, `<meta description>`, canonical and OG/Twitter tags from all 9
  pages with lengths.
- `sitemap.xml` / `robots.txt` read and diffed against `content.json.site.url` + slug.
- Scripted id/anchor/aria-reference validation across all 9 pages (no duplicate ids, no broken
  fragments).
