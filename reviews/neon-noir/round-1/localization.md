# Localization Review — Neon Noir

**Variant**: neon-noir
**Round**: 1
**Reviewer**: adversarial reviewer (claude-opus-5)
**Date**: 2026-07-25

## Score

- **Localization**: 82 / 100

## ✅ Passed

- `<html lang="en">` on all nine pages.
- No `toLocaleString()`, `toLocaleDateString()`, `Intl` call or any other locale-sensitive formatter anywhere in `js/main.js` or `js/experience.js` — so there is no unlocalised-format hazard to begin with.
- The one date computation is locale-independent by construction: `js/experience.js:319-320` builds an `MM-DD` string from `getMonth()`/`getDate()` with `padStart`, and compares it lexically against the kit's own `MM-DD` ranges. No parsing, no locale assumption, no timezone arithmetic.
- No number formatting at all — the site deliberately prints no counts (`proof_strategy` forbids hard-coded stars), so there are no thousands separators or decimal marks to localise.
- Logical properties are used well and deliberately in the layout layer: `margin-inline: auto`, `padding-inline`, `padding-block`, `inset-block`, `border-block`, `text-size-adjust`. These are the ones that matter most for a mirrored layout.
- Fonts are correctly latin-subset only, matching the shared pool — no wasted glyph coverage, and the fallback stacks are sensible (`Georgia`/`Times New Roman`, `Impact`/`Haettenschweiler`, `Palatino`/`Georgia`, `system-ui`, `Courier New`).
- `accessibility.font_scaling` is honoured: 200% text zoom passes on all nine pages, with an explicit `overflow-wrap: anywhere` fix documented for the two pages that previously failed.
- All copy lives in the HTML rather than being assembled in JS, so a translator has a single, extractable surface per page. The few JS-authored strings are few and centralised (`js/experience.js:55,100,196,204,248,276,341-343,363,369`).

## ⚠️ Concerns (non-blocking)

- **Physical directional properties are used pervasively where logical ones would work**, which would need a full second pass to support RTL: `border-left` on `.clue` (`css/components.css:391`), `.evidence__note` (`:376`), `.transcript__entry` (`:588`), `.case-quote` (`css/theme.css:517`), `.briefing` (`:733`), `.ladder__rung` (`:601`), `.vignette__leads` (`:374`), `.nav-menu__link` (`css/components.css:103`); `padding-left` on `.netmap` (`css/theme.css:674`) and the transcript/quote blocks; `left`/`right` on `.skip-link`, `.lux` (`:965`), `.egg-note` (`:1000`), `.evidence__pin` (`:358`), `.netmap::before` and both `.netmap__node` pseudo-elements, `.intensity-toggle__track::after` (`:809,816`). `border-inline-start`, `padding-inline-start` and `inset-inline-start/end` are drop-in replacements for nearly all of these.
- The two directional animations are LTR-baked: `blind-wipe` uses `clip-path: inset(0 100% 0 0)` → `inset(0)` (left-to-right), and `blind-sweep` translates `-100%` → `240%`. In RTL the venetian wipe would sweep against the reading direction. Cosmetic, but it is the kit's signature transition.
- `.netmap__node::before/::after` position the trunk stubs with negative `left` offsets computed from `--space-8`; in RTL the whole network map would need mirroring, not just flipping.
- Copy is duplicated per page rather than referenced from `shared/content.json` at build time, so a translator must touch nine files and the same `content.json` string appears in several places (e.g. the licence paragraph in `about.html` and the FAQ answer). This is the static-site norm across this programme, not a neon-noir defect — noting it only because the rubric asks whether strings are "reachable from one place".
- `<html lang="en">` is correct but there is no `dir` attribute; adding `dir="ltr"` explicitly would make a future `dir="rtl"` swap a one-line change per page.

## ❌ Failures (must fix this round)

None.

## Recommendations (ranked by impact)

1. Convert `border-left` → `border-inline-start` and `left`/`right` → `inset-inline-start`/`inset-inline-end` throughout; it is a mechanical change with no visual effect in LTR and it removes most of the RTL debt (impact: medium, effort: low).
2. Express `blind-wipe`/`blind-sweep` with logical `inset()` sides or gate them on `:dir(ltr)` (impact: low, effort: low).
3. Add an explicit `dir="ltr"` to `<html>` (impact: low, effort: trivial).

## Evidence

- `grep -rn "toLocaleString\|toLocaleDate\|Intl\." js/` → no matches.
- `js/experience.js:312-320` — locale-independent `MM-DD` seasonal comparison.
- `grep -rn "border-left\|padding-left\|left:\|right:" css/` — physical-property inventory above.
- `node tools/render-check.mjs --site neon-noir --shots` → PASS including 200% text zoom.
