# Localization Review — Swiss Modernist

**Variant**: swiss-modernist
**Round**: 1
**Reviewer**: adversarial reviewer (claude-opus-5)
**Date**: 2026-07-25

## Score

- **Localization**: 92 / 100

## ✅ Passed

- `<html lang="en">` on all nine pages, matching `content.json.site.default_locale`.
- No `toLocaleString()`, `toLocaleDateString()`, `Intl.*` or any date/number formatting anywhere;
  `js/main.js` contains no user-facing strings except the egg reward `'Grids on grids.'`
  (`js/main.js:92`), which is the kit's own declared `reward_copy` — correct to keep in code, but
  it is the single string not reachable from `content.json` or the kit's copy fields.
- RTL-safe throughout: the CSS uses logical properties exclusively — `margin-inline`,
  `padding-inline`, `inset-block-start`, `inset-inline-start`, `border-block-start`,
  `border-inline-start`, `padding-block`. Across all three stylesheets there is exactly **one**
  physical-direction declaration, `transform-origin: left center` on `.egg-sweep`
  (`css/components.css:966`) — and even that is arguably correct, since the kit specifies the
  sweep as "left to right at constant velocity" regardless of writing direction. No `float`, no
  `margin-left/right`, no `padding-left/right`, no `left:`/`right:`. This is unusually clean.
- All facts (pitch bullets, feature titles/bodies, client capabilities, ecosystem repos, FAQ
  Q/A, footer columns, licence text) come from `shared/content.json`, and all presentation copy
  comes from the kit's `copy_overlay` / `feature_casting.angle` — so a future translator has two
  well-defined files to swap rather than nine HTML pages.
- Fonts are latin-subset only, matching the single declared locale — no wasted glyph coverage.
- `text-transform: uppercase` is used only for short category labels (`.label`, `.hero-eyebrow`,
  `.spec-table dt`, `.client-status`, `.module-index`, `.faq-ref`, `.manpage-head dt`), never on
  running copy, which keeps it locale-safe for languages where uppercasing is lossy.
- `font-variant-numeric: tabular-nums` on the signage indices and proof figures — correct for
  numerals that must align across rows in any locale.

## ⚠️ Concerns (non-blocking)

- **Authored connective prose is embedded in the HTML, not in a data file.** The section leads
  (`index.html:254-257`, `index.html:368-371`), the `hub.html` / `plugins.html` / `docs.html`
  body paragraphs, the 404 copy and the per-page `cta-banner` headlines are all inline. That is
  the programme's convention for all 50 sites and is not a per-site defect, but it does mean this
  site's translation surface is larger than `content.json` + the kit alone.
- The two-digit signage indices (`01`–`08`) are hard-coded as literal text in the markup rather
  than generated. Harmless for latin/CJK, but they are content that a localiser would have to
  leave alone; a comment saying so would help.

## ❌ Failures (must fix this round)

- None.

## Recommendations (ranked by impact)

1. Nothing required for this round (impact: n/a).

## Evidence

- `grep` sweep of all nine pages for `lang=`, and of all three stylesheets for
  `float|margin-left|margin-right|padding-left|padding-right|left:|right:` → no physical-direction
  properties found.
- `grep` sweep of `js/main.js` for `toLocale|Intl|new Date` → none.
