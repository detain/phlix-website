# Usability Review — Swiss Modernist

**Variant**: swiss-modernist
**Round**: 1
**Reviewer**: adversarial reviewer (claude-opus-5)
**Date**: 2026-07-25

## Score

- **Usability**: 84 / 100

## ✅ Passed

- Primary goal reachable in **1 click** from home (hero "Install" → `download.html`), well inside
  the ≤2-click requirement. `download.html` opens on the command; the client list is one anchor
  away and is linked directly from five pages.
- Consistency and standards: identical topbar, identical footer (tagline → mirrored index → 3
  content columns → mono copyright) and identical `cta-banner` slot on all nine pages, with
  page-specific CTA copy. `aria-current="page"` is set correctly on every page.
- Recognition over recall: the two-digit signage index is used consistently for nav (01–08),
  page headers, sections, spec rows, link lists and FAQ refs — one device, applied everywhere, so
  a visitor learns it once. This is the site's best usability idea.
- User control and freedom: no modals, no interstitials, no autoplay, no scroll hijack; every
  external link carries `target="_blank" rel="noopener noreferrer"` and the docs link discloses
  its destination via the `phlix-docs` sub-label.
- Error recovery: `404.html` is a genuinely useful page — a mono `Expected/Actual/Status`
  readout, plain-language explanation, and three recovery destinations each with a one-line
  description of what is there ("One line to server, then the five clients."). Far better than a
  bare link list.
- Help and documentation: `docs.html` indexes four real doc surfaces (user guide, API reference,
  developer docs, hub admin) and every page's CTA band offers the docs as the secondary path.
- Escape closes the mobile menu and restores focus to the toggle; clicking outside closes it.
- Links are always underlined (`base.css:254-259`), per `buttons.link` — no hover-to-discover.

## ⚠️ Concerns (non-blocking)

- **`js/main.js:102-115`** — on the home page the wordmark link's default action is suppressed so
  clicks can be counted for the easter egg. Clicking "Phlix" on the home page therefore produces
  no observable response at all (until the 7th click). It is a self-link, so nothing is lost, but
  "clicking the logo does nothing" is a small violation of "visibility of system status". Consider
  counting the click *and* letting the navigation proceed (a same-page navigation is harmless),
  or only intercepting after the 3rd click.
- **`js/main.js:34-44`** — no `resize`/`matchMedia` handler, so an open mobile menu leaves
  `aria-expanded="true"` on a hidden toggle after the viewport crosses 900px. See
  `accessibility.md`.
- **`docs.html`** — the thinnest page on the site (141 words of body copy, two sections), and
  `<h1>Documentation</h1>` is immediately followed by `<h2>01 Documentation</h2>`
  (`docs.html:135, 146`), which reads as a duplication rather than a hierarchy. Rename the
  inner section and add a third numbered block. See `content-accuracy.md`.
- **`css/components.css:483-485, 678-680`** — the 5th client / download card spans the full
  12 columns while the other four span 3, so scanning the five clients means scanning four
  narrow columns and then one very wide, mostly-empty row. It breaks the comparison the grid is
  there to support. See `brand-fidelity.md`.
- **`clients.html`** — because the four card head rows are different heights (28/58/28/60 px),
  the CAPABILITIES and SOURCE rules do not line up across the row, which is precisely the
  cross-column comparison a spec table exists to enable. See `responsive.md`.
- **`index.html:368-371`** — the proof band's lead explains why a number is absent instead of
  telling the visitor what is there. See `content-accuracy.md`.

## ❌ Failures (must fix this round)

- None specific to this dimension.

## Recommendations (ranked by impact)

1. Align the card head rows so the five clients are actually comparable (impact: medium, effort: low).
2. Let the home-page wordmark click do something, or intercept later (impact: low, effort: low).
3. Add the 900px `matchMedia` close handler (impact: low, effort: low).
4. Give `docs.html` a third section and a distinct inner heading (impact: low, effort: low).

## Evidence

- Click-depth traced from `index.html` to `download.html` and `download.html#clients`.
- Puppeteer DOM tab-order dump for `index.html` (skip link → wordmark → toggle → 01–08 → hero
  CTAs → body links → footer): matches visual order.
- `reviews/swiss-modernist/shots/404-desktop.png`, `clients-desktop.png`, `docs-desktop.png`.
