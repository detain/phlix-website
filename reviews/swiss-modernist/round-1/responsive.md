# Responsive Review — Swiss Modernist

**Variant**: swiss-modernist
**Round**: 1
**Reviewer**: adversarial reviewer (claude-opus-5)
**Date**: 2026-07-25

## Score

- **Responsive**: 84 / 100

## ✅ Passed

- **No horizontal scroll on any of the nine pages at 320, 375, 768 or 1024** — verified by
  comparing `documentElement.scrollWidth` to `clientWidth` on all 36 page/viewport pairs; zero
  overflows. `render-check` also passes its 200%-zoom pass.
- Column counts step as the kit's `responsive_behavior` describes rather than at arbitrary
  breakpoints: 4 columns → 8 at 768 → 12 at 1024 (`theme.css:23-39`), with `.module--hero`
  span 6 / `.module--support` span 3 / `.module--footnote` span 6 at the top step.
- Display type uses `min(<scale step>, <vw>)` so the strict px scale is exact at desktop and
  cannot overflow at 320px or 200% zoom — a genuinely good resolution of `typography_rules`'
  strict-scale demand against §12/§14 reflow.
- No fixed-px widths on any layout container; every grid track is `minmax(0, …)`, which is what
  prevents the classic grid-blowout.
- Touch targets: 48px on nav links, buttons and the hamburger; 44px in the footer.
- Body copy never drops below 16px on phones; the smallest text anywhere is 12px, used only for
  uppercase labels and the mono footer line.
- The nav collapses at 900px rather than 768 — correct, because eight labels with two-digit
  indices genuinely do not fit an 8-column tablet row.
- `pre.code-block code` uses `white-space: pre-wrap; overflow-wrap: normal`, so the install
  one-liner wraps at spaces and is never broken mid-token (`components.css:570-578`).
- The 404's off-grid offset and red guide line are suppressed below 768px, with the reason
  documented in the CSS — at 320px there is no spare column to step off (`theme.css:609-626`).
- Column guides are suppressed below 1024px, so they never become noise on a phone.

## ⚠️ Concerns (non-blocking)

- **`css/base.css:44-63`** — `overflow-wrap: anywhere` is applied site-wide to
  `h1,h2,h3,h4,h5,h6,p,li,dt,dd,a,span,code,blockquote`. On the question asked: **the technique
  is right and the scope is too blunt.** `anywhere` (not `break-word`) is indeed the only value
  that reduces min-content size, so it is the correct tool for the stated cause, and the cause is
  real — the overflow came from `LifecycleInterface` and bare `github.com/detain/phlix-*-client`
  strings. But those strings live in exactly three contexts: `code`, the `<dd>` of
  `.spec-table` / `.repo-list` / `.manpage-head`, and bare-URL `<a>` text. Applying it to
  `h1`–`h6` and `blockquote` licenses a mid-word break with no hyphen in oversized Inter Black
  display type — the single most conspicuous place a break can happen, and the specific type
  crime this kit exists to prevent. It also masks future overflow bugs instead of surfacing
  them. **Fix**: scope to `code, kbd, samp, pre, .spec-table dd, .repo-list dd, .manpage-head dd,
  .link-list a, .proof-links a, .faq-entry dd` and re-run `render-check` at 200% to confirm the
  seven pages still reflow. If a heading genuinely needs it, add `hyphens: auto` there instead
  so the break is marked.
- **`clients.html` 4-up card row, `css/components.css:444-454`** — the internal `.spec-table`
  rules land at four different baselines because `.client-card h3` is a wrapping flex row of
  name + badge: measured tops **549 / 580 / 549 / 582** and h3 heights **28 / 58 / 28 / 60** at
  1280 (Samsung Tizen's badge wraps to its own line; "Mobile (iOS + Android)" wraps to two lines
  and pushes its BETA badge to a third). A 33px stagger of horizontal rules across a four-up row
  is a visible failure of `composition` ("Strong horizontal rule lines anchoring sections") and
  `do_dont.layout.do` ("Align every element to the 12-column, 8px grid") — Müller-Brockmann's
  cross-column baseline is the whole point of the device. `download.html` shows the same badge
  wrap in the captured screenshot (`../shots/download-desktop.png`, the Mobile card) even though
  it recovers once the webfonts load, so the row is one font-metric away from the same problem.
  **Fix**: give `.client-card` / `.download-card` a fixed head row — e.g.
  `display: grid; grid-template-rows: minmax(3.5rem, auto) auto 1fr auto` — or move
  `.client-status` out of the `h3` onto its own line unconditionally, so the rules align in every
  card at every width.
- **`css/components.css:483-485, 678-680`** — the 5th card spanning all 12 columns leaves ~1000px
  of empty measure at 1280 because `.spec-table .spec-row` stays single-column inside it. See
  `brand-fidelity.md`.

## ❌ Failures (must fix this round)

- None specific to this dimension. (The guide-field misalignment in `brand-fidelity.md` gets
  *worse* as the viewport widens — at 1920 a third of the guide field is painted in the page
  margins — so the fix must be verified at 1920, not only at 1280.)

## Recommendations (ranked by impact)

1. Align the card head rows so the four-up rules share a baseline (impact: high, effort: low).
2. Narrow `overflow-wrap: anywhere` to code/URL/identifier contexts (impact: medium, effort: low).
3. Verify the guide-field fix at 1920, not just 1280 (impact: medium, effort: trivial).

## Evidence

- `node tools/render-check.mjs --site swiss-modernist --shots` → PASS, 9 pages × 4 viewports
  + 200% zoom.
- Puppeteer overflow sweep at 320/375/768/1024 × 9 pages → zero overflows.
- `.client-card .spec-table` top coordinates `[549, 580, 549, 582, 884]`; `h3` heights
  `[28, 58, 28, 60, 28]`.
- `reviews/swiss-modernist/shots/index-320x700.png`, `clients-desktop.png`,
  `download-desktop.png`.
