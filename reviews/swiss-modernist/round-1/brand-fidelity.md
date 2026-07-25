# Branding Consistency Review — Swiss Modernist

**Variant**: swiss-modernist
**Round**: 1
**Reviewer**: adversarial reviewer (claude-opus-5)
**Date**: 2026-07-25

## Score

- **Branding Consistency**: 62 / 100

## ✅ Passed

- Palette is disciplined: 16 hex values, all traceable to `design_tokens.color` or a documented
  mix of the kit's own pigments. No off-palette hue anywhere. `--color-primary-deep: #cc0018`
  is genuinely the kit's own `microinteractions.button_press` red, not an invented one
  (`css/base.css:96`).
- The contrast escalation is handled honestly and better than the kit's own prose: the kit
  claims Basel Red on Grid White is 4.6:1, it measures 4.43:1, and `SITE.md:52-58` records the
  measurement plus the derived substitutes. `--color-gray-deep: #5e5e5e` = 6.09:1 verified.
- Typeface discipline holds: Inter for headline/body/ui, Barlow Condensed for display numerals,
  JetBrains Mono for readouts. No fifth family, no serif, no decorative face.
- Zero border radius everywhere in primary UI (`--radius-sm: 0`, `--radius-md: 0`); the pill
  token exists but is never used, which matches `component_styles.chip` ("No pill-shaped chips
  in this system").
- Headline weights are 800–900 throughout; nothing headline-shaped falls below 700, honouring
  `do_dont.typography.dont` #4.
- Motion is genuinely mechanical: one 80ms linear token, no easing curve beyond linear, no
  scroll reveals, no parallax. `scroll_experience.mode: "continuous"` is real, not claimed.
- `img/og.svg` is a correct Swiss poster — its drawn grid lines (100px pitch) *do* align with
  the wordmark at x=100, and the stale `BSD-3-Clause` bar has been corrected to the real
  MPL-2.0 / MIT split.
- `.section-index` numerals are a real, legible section-index device at 48px Barlow 900 /
  `#888888` = 3.33:1 (large graphical text, clears 3:1). Calling the predecessor's 1.19:1
  numeral a defect rather than a watermark was the correct reading of
  `signature_elements` and `art_direction`; nothing is `aria-hidden` to dodge a check.

## ⚠️ Concerns (non-blocking)

- **`css/components.css:262-264, 323-325, 374-376, 440-442, 655-657`** — the Basel Red hover
  line is applied with no `transition`, so it snaps at 0ms. `microinteractions.hover`
  specifies "over 80ms linear". `.btn` is the only element that carries `--motion-snap`. Add
  `transition: box-shadow var(--motion-snap)` to the four card families.
- **`sites/swiss-modernist/img/favicon.svg:3-4`** — a Grid White "P" on a solid Basel Red
  field. `do_dont.branding.dont` forbids "Apply the logo on colored backgrounds (red, gray)
  without inversion approval", and `logo_rules.colors` allows only Ink-Black-on-Grid-White or
  Grid-White-on-Ink-Black. It is carried forward from the predecessor, but it is the most
  reproduced brand asset on the site. Invert to Ink Black ground, Grid White "P".
- **`css/components.css:483-485, 678-680`** — `.client-card:last-child` and
  `.download-card:last-child` span all 12 columns while their four siblings span 3, and
  `.spec-table .spec-row` stays `grid-template-columns: 1fr` inside them. At 1280 the DLNA
  card is ~1230px wide carrying ~200px of content: ~1000px of dead space that reads as a
  layout accident, not as `composition` "negative space used structurally". Either give the
  5th card `span 3` and let column 4 of row 2 stay empty (which *is* Swiss asymmetry), or
  switch the spec rows inside a wide card to the 2-column `minmax(0,12rem) minmax(0,1fr)`
  form already used by `.manpage-head`.
- **`css/base.css:44-63`** — `overflow-wrap: anywhere` on `h1,h2,h3,h4,h5,h6,p,li,dt,dd,a,span,
  code,blockquote`. See `responsive.md`; for this dimension the objection is that licensing
  mid-word breaks in oversized Inter Black display type is precisely the type crime this kit
  exists to avoid (Ruder's *Typographie* devotes a chapter to it).

## ❌ Failures (must fix this round)

- **`css/theme.css:113-121`** — the drawn column guides are not the grid. The
  `repeating-linear-gradient` is painted on the `.band--guides` **section**, whose padding box
  is the full viewport, so the guides are pitched at `viewport / 12`. The real columns live in
  `.container` (`max-width: 1400px`, `padding-inline: 24px`, `gap: 24px`). Measured at a
  1280px viewport: guides at `0, 106.7, 213.3, 320, 426.7, 533.3, 640, 746.7, 853.3, 960,
  1066.7, 1173.3`; real column edges at `24, 128.7, 233.3, 338, 442.7, 547.3, 652, 756.7,
  861.3, 966, 1070.7, 1175.3`. Per-column error: `24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2`
  px — **not one guide coincides with a column edge**. `.hero-aside` starts at x=861.3 and the
  nearest guide is at 853.3. At 1920 it fully decouples: the container is 1400px wide starting
  at x=260 while the guides span 0→1920 at a 160px pitch that has no relation to the real
  114.67px column pitch, so a third of the guide field is drawn in the page margins.
  This is the site's signature device and the author's own stated differentiator
  ("a visible 12-column guide field", `REGEN_PLAN.md:5-7`), and it makes the 404's central
  claim — "The red line marks where column 1 actually is" (`404.html:154`) — self-
  contradicting, because the gray field says column 1 is 24px further left.
  **Required outcome**: paint the guides from the same track definition the content uses.
  Move the gradient to `.band--guides > .container` with `background-origin: content-box;
  background-clip: content-box` and a pitch of
  `calc((100% - 11 * var(--grid-gutter)) / 12 + var(--grid-gutter))`, or draw them as
  12 empty children of a `repeat(12, minmax(0,1fr))` grid so they cannot drift. Verify by
  measuring that a guide edge equals `.hero-aside`'s left edge at 1280 and at 1920.
- **`css/components.css:266-273` vs `283-286`, `347-349`, `391-395`, `415-418`** —
  `.module-index` sets `font-size: var(--text-xs)` (12px), but `.module p` (0-1-1),
  `.module--footnote p` (0-2-1) and `.feature-detail p` (0-1-1) all out-specify the
  single-class `.module-index` (0-1-0), so **the declared 12px never applies anywhere**.
  Measured computed values: `.feature-detail .module-index` = **24px** at ≥1024px,
  `.module--support .module-index` = 16px, `.module--footnote .module-index` = 14px. On
  `features.html` every one of the 8 cards therefore renders index label 24px mono / title
  24px Inter 800 / body 24px Inter 500 — a flat 24/24/24 scale in which the gray metadata
  label is the visually loudest element in the card, louder than the feature title
  (see `../shots/features-desktop.png`, cards "01 · LIBRARY", "02 · AUTH"). This inverts
  `page_generation_rules` #7 ("strong typographic hierarchy through weight and size alone"),
  breaks `typography_rules`' strict scale for label type, and contradicts every label spec in
  the kit (`badges.typography` 10px, `tables.headers` 12px, `thumbnail_style` 14px).
  **Required outcome**: make the label rules win — e.g. `p.module-index` / add
  `.feature-detail .module-index, .module .module-index { font-size: var(--text-xs); }` after
  the `p` rules — and raise `.feature-detail h2` to `--text-2xl` so the card reads
  12 / 32 / 24 rather than 24 / 24 / 24.
- **`sites/swiss-modernist/index.html:82`** (and the identical inline SVG in `404.html`,
  `about.html`, `clients.html`, `docs.html`, `download.html`, `features.html`, `hub.html`,
  `plugins.html`) — `<rect x="0" y="30" width="56" height="4" fill="#E8001C" />` puts a Basel
  Red underrule beneath the wordmark **inside the navigation**, on all nine pages.
  `logo_rules.colors` is explicit: "A 2px Basel Red underrule may appear beneath the wordmark
  **only in full-identity lockup (not in navigation)**." It is also 4px, not the specified 2px.
  This is the un-counted fifth red mark on the home page and it is the only one the kit
  forbids outright. **Required outcome**: remove the `<rect>` from the header wordmark on all
  nine pages (keep it in `img/logo.svg` and `img/og.svg`, which are lockups).
- **`css/base.css:131-145`** — a malformed comment ships in the design-token block:

  ```
  /* Tracking + leading, per the kit's fonts{

  --tracking-headline: -0.04em;
  ...
  --lh-number: 1;
  } roles */
  ```

  The comment opens at `fonts{` and does not close until `} roles */`, swallowing **13
  duplicated custom-property declarations** — a template-interpolation artifact. Two of them
  (`--tracking-number`, `--lh-number`) exist nowhere else in the site, so the token set is not
  what the file appears to declare, and any future edit to the first `--tracking-headline`
  will silently do nothing. On a kit whose rule is "if an element solves no problem, it does
  not exist" (`design_principles` #6), shipping thirteen dead declarations inside a broken
  comment in the token block is a craft failure the tools cannot see.
  **Required outcome**: delete lines 131-145 and keep only the live block at 146-156, with a
  one-line comment.

## Recommendations (ranked by impact)

1. Fix the guide field so it is derived from the real column tracks (impact: high, effort: low).
2. Restore the 12px label scale and step the feature-card title up to 32px (impact: high, effort: low).
3. Strip the red underrule from the header wordmark on all nine pages (impact: high, effort: low).
4. Clean the malformed token comment (impact: medium, effort: trivial).
5. Add `transition: box-shadow var(--motion-snap)` to the card hover families (impact: low, effort: trivial).

## Evidence

- `node tools/kit-brief.mjs --site swiss-modernist`, `node tools/selfcheck.mjs` (PASS),
  `node tools/render-check.mjs --site swiss-modernist --shots` (PASS).
- Puppeteer measurement of `.band--guides` vs `.container` track geometry at 1280 and 1920
  (deltas quoted above).
- Computed-style probe of `.module-index` / `.feature-detail h2` / `.feature-detail p`.
- `reviews/swiss-modernist/shots/index-desktop.png`, `features-desktop.png`,
  `clients-desktop.png`, `index-320x700.png`.
