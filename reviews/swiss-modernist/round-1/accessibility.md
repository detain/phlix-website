# Accessibility Review — Swiss Modernist

**Variant**: swiss-modernist
**Round**: 1
**Reviewer**: adversarial reviewer (claude-opus-5)
**Date**: 2026-07-25

## Score

- **Accessibility**: 76 / 100

## ✅ Passed

- Contrast is the strongest part of this build. The author measured rather than trusted the
  kit: Basel Red on Grid White is 4.43:1, not the claimed 4.6:1, so the solid CTA fill uses
  `#cc0018` (5.51:1 with Grid White text) and small secondary text uses `#5e5e5e` (6.09:1).
  Pure `#e8001c` is confined to rules, borders, the focus ring and large display accents,
  which need only 3:1. `css/base.css:88-98`.
- `.section-index` at `#888888` = 3.33:1 renders at 48px / weight 900 (38px at 320px), which
  is unambiguously large-scale text, so 3:1 applies and it clears. Nothing is `aria-hidden`
  to dodge a checker. The judgement call in `REGEN_PLAN.md:136-140` is correct.
- Focus is visible everywhere and matches the kit: `:focus-visible { outline: 2px solid
  #e8001c; outline-offset: 2px }` with no animation (`css/base.css:326-329`). `:focus { outline:
  none }` is paired with a `:focus-visible` rule, so keyboard users are never stranded.
- Working skip link, `#main-content` with `tabindex="-1"` on all nine pages.
- Accessible names verified via the CDP accessibility tree — the numeric signage indices do
  **not** run into the labels: `"01 Home"`, `"02 Features"`, … `"Read the spec phlix-docs"`.
  The flex/block layout inserts the separator, so `.nav-index` and `.btn-note` are safe.
- Every decorative SVG is `aria-hidden="true" focusable="false"`; the hamburger carries
  `aria-label="Toggle navigation"`, `aria-expanded`, `aria-controls`.
- No-JS fallback is real, not claimed: the nav is a plain `<nav><ul>` of links; with JS off the
  desktop nav is fully functional and the mobile menu degrades to the `display:none`/`flex`
  media query. `hero_experience.js_budget_kb: 0` is honoured — nothing in the hero needs JS.
- `prefers-reduced-motion` is honoured globally (`css/base.css:373-382`) *and* specifically for
  the easter egg (`css/components.css:993-998`), which draws the rule statically instead.
- Escape closes the mobile menu and returns focus to the toggle (`js/main.js:117-122`). No
  focus trap, no positive `tabindex`, DOM order == visual order on all pages.
- 48px minimum touch targets on nav links, buttons and the hamburger; 44px in the footer.
- No forms, so no label/validation surface to fail.
- Single `<h1>` per page on all nine pages.

## ⚠️ Concerns (non-blocking)

- **`js/main.js:89-99`** — the `role="status"` reward element is created with its text already
  set and then appended. A live region must exist in the DOM *before* its content changes for
  most screen readers to announce it; appending a fully-populated region typically announces
  nothing. It is then removed after 1000ms, which is below the reliable-announcement window.
  **Fix**: render an empty `<p class="egg-reward" role="status">` on load (or insert the empty
  node, then set `textContent` in a `requestAnimationFrame`), and hold it ~4s.
- **`js/main.js:34-44`** — no `resize` handling. If the menu is open at 375px and the viewport
  crosses 900px, `.nav-menu` becomes `display:flex` from the media query while
  `aria-expanded="true"` remains on a now `display:none` toggle. Stale state for AT.
  **Fix**: add a `matchMedia('(min-width: 900px)')` change listener that calls
  `closeMenu(false)`.
- **`index.html:67,457`** (and all nine pages) — `role="banner"` on `<header>` and
  `role="contentinfo"` on `<footer>` are redundant with the native elements. The rubric asks
  for ARIA only where native HTML cannot express the semantic. Harmless, but remove.
- **`index.html:97`** — on the home page the logo link's default action is suppressed by the
  easter-egg counter (`js/main.js:108`). It is a self-link so nothing is lost, but a keyboard
  user pressing Enter on "Phlix home" gets no observable response at all. Consider
  `aria-disabled` semantics or simply not preventing default and counting anyway.

## ❌ Failures (must fix this round)

- **`features.html:152, 164, 176, 187, 200, 213, 226, 238`** — the eight feature titles are
  `<h2>` elements nested inside a `<section>` whose own heading, `<h2 id="inventory-h">01 The
  inventory</h2>` (`features.html:145`), is also level 2. The document outline for
  `features.html` is therefore nine sibling `<h2>`s where eight are subordinate content:

  ```
  H1: 02 Features
  H2: 01 The inventory
  H2: Library that organizes itself      ← should be H3
  H2: Multi-user, multi-profile, …       ← should be H3
  ... (6 more)
  ```

  `index.html` marks the identical content as `<h3>` inside `.module` articles, so the site
  is internally inconsistent as well as structurally wrong. Screen-reader users navigating by
  heading level lose the section boundary entirely on the one page the kit gives an explicit
  blueprint for. **Required outcome**: change the eight `<article class="feature-detail">`
  titles to `<h3>` and retarget the CSS rule `css/components.css:383-389` from
  `.feature-detail h2` to `.feature-detail h3` (keeping `font-weight: 800`; see
  `brand-fidelity.md` for the size change that should land at the same time).

## Recommendations (ranked by impact)

1. Demote the eight feature titles to `<h3>` and retarget `.feature-detail h2` (impact: high, effort: low).
2. Make the egg reward a pre-existing empty live region held ~4s (impact: medium, effort: low).
3. Add the 900px `matchMedia` listener that closes the menu (impact: low, effort: low).
4. Drop the redundant `role="banner"` / `role="contentinfo"` (impact: low, effort: trivial).

## Evidence

- `node tools/render-check.mjs --site swiss-modernist --shots` → PASS (9 pages × 4 viewports
  + 200% zoom).
- CDP accessibility snapshot of `index.html` at 1280 and 375 (accessible names listed above).
- `document.querySelectorAll('h1,h2,h3,h4,h5,h6')` outline dumped for all nine pages.
- Contrast values recomputed independently from `tools/kit-brief.mjs`'s measured table.
