# Performance Review — Swiss Modernist

**Variant**: swiss-modernist
**Round**: 1
**Reviewer**: adversarial reviewer (claude-opus-5)
**Date**: 2026-07-25

## Score

- **Performance**: 92 / 100

> Per the owner ruling (`new_site.md` §2A, 2026-07-25) this dimension does **not** file findings
> against JS or CSS byte size. `selfcheck`'s 40 KB warning is the only threshold and it is not
> tripped. The question asked instead was whether 4.1 KB of JS leaves this site **under**-built.

## ✅ Passed

- `selfcheck` reports `js 4.1 KB` — well under the 40 KB warn line.
- `js/main.js` is loaded `defer` on all nine pages; nothing render-blocking.
- All eleven `@font-face` rules carry `font-display: swap` (`css/base.css:390-466`), and all
  eleven point at the shared latin-subset pool at `../../assets/fonts/`, so the faces are shared
  across the whole programme rather than duplicated per site.
- Zero external requests at load: no analytics, no CDN font, no icon library. All eight feature
  icons and the wordmark are inline SVG paths.
- All UI effects are CSS: borders, background-colour, `box-shadow: inset` for the hover rule, one
  `@keyframes` for the easter egg. No JS animation, no SVG filters — exactly
  `do_dont.performance.do`.
- Hero image budget: not applicable — there is no hero raster. The only image on any page is
  `og.png` (38 KB), which is referenced from `<meta>` only and never fetched by the page.
- Total per-page transfer is dominated by three stylesheets (56 KB uncompressed total) plus
  whichever WOFF2 faces the page actually matches, comfortably inside the 500 KB budget.
- No layout-shift sources: no lazy-loaded images, no web-font-swap on a fixed-height element, no
  JS that inserts content above the fold (the egg sweep is `position: fixed` and only exists
  after 7 clicks).

## ⚠️ Concerns (non-blocking)

- **Is 4.1 KB under-built for this kit?** No — and this is the right amount. `hero_experience`
  declares `mode: "static"` and `js_budget_kb: 0`; `scroll_experience` declares `mode:
  "continuous"` with "no animation, no parallax, no scroll-reveal effects"; `mascot.behavior` is
  `null`; `intensity_toggle` and `visitor_paths` are absent; `faq_experience` explicitly says "no
  accordion behavior". Every interactive surface this kit declares is either static or CSS-only.
  The two jobs left — the mobile disclosure and the one declared easter egg — are both
  implemented, and both have working fallbacks. **The richness of this site is in its CSS
  vocabulary and its markup** (four distinct content components — spec-rows, spec-table,
  repo-list, man-page — plus a numbered signage system, drawn guides, inverted cast modules,
  footnote rows and a purpose-built 404), not in script. A larger `main.js` here would be a kit
  violation, not an improvement.
- **`css/base.css:390-403, 460-466`** — two declared faces can never match a rule:
  `barlow-condensed-800` (no element uses `--font-display`/`--font-weight-display`; every Barlow
  usage is weight 900) and `jetbrains-mono-700` (no mono element is bold, and there is no
  `<strong>`/`<b>` anywhere on the site). Both are lazy so nothing is downloaded, but the
  declarations are noise. Low priority; the vendoring pass generates them, so raise it upstream
  rather than hand-editing the generated block.
- Three separate stylesheets in the critical path (`base.css`, `theme.css`, `components.css`)
  cost two extra round trips on a cold cache. This is the programme's shared convention, so no
  action here.

## ❌ Failures (must fix this round)

- None.

## Recommendations (ranked by impact)

1. Nothing required. If the orchestrator revisits `tools/vendor-fonts.mjs`, have it skip faces no
   rule can match (impact: low, effort: n/a here).

## Evidence

- `node tools/selfcheck.mjs --site swiss-modernist` → `js 4.1 KB`, PASS.
- `wc -l` / `du -sh`: `css` 56 KB across 3 files, `js` 4.1 KB, `img` 64 KB (og.png + 3 SVGs +
  PROMPTS.md).
- Unused-token sweep: `--shadow-*`, `--radius-md/lg/xl/pill`, `--font-display`,
  `--font-weight-display`, `--text-5xl`, `--space-24/32` and the four state colours are declared
  but unreferenced — consistent with `depth: "flat"` / `texture_level: "none"` and with the kit's
  own note that shadows are for modals and dropdowns only, so not a defect.
