# Usability Review — Neon Noir

**Variant**: neon-noir
**Round**: 1
**Reviewer**: adversarial reviewer (claude-opus-5)
**Date**: 2026-07-25

## Score

- **Usability**: 72 / 100

## ✅ Passed

- Primary goal reachable in **one** click from home: `#opener`'s `Unlock the Archive` → `download.html`, where the install snippet is the dominant element.
- **Visibility of system status**: `aria-current="page"` + amber marker + " · you are here" on the active nav item; `aria-pressed` + a spelled-out state string on the calm toggle; `.copy-token` reports "Copied" and, on failure, "Copy failed — select it by hand" (`js/experience.js:359-372`) — an honest failure path, not a silent one.
- **User control and freedom**: Esc closes the mobile menu and returns focus to the toggle (`js/main.js:36-41`); Esc clears both eggs; the calm-mode toggle and Lux dismissal both persist; `.lux-recall` restores Lux and moves focus to his summary (`js/experience.js:168-175`). Outside-click closes the menu.
- **Recognition over recall**: every noir nav label carries the canonical page name as a visible gloss, so a user who does not read "Evidence Files" as "Features" is never stranded. The footer case index names both demoted pages with a reason.
- `jargon_policy: translate` is implemented as an actual affordance — a closed `<details class="decoder">` on all eight Features entries, so precise terms stay on the page without taxing a general reader (`features.html:155-171` et al.).
- No surprise modals, no email gate, no auto-play media, no interstitials.
- Nothing is sticky or floating over the primary CTA: `.site-header` is deliberately `position: relative` (`css/components.css:17-26`), and Lux drops out of `fixed` below 768px.
- `localStorage` access is wrapped in `try`/`catch` on both read and write, so private-browsing mode degrades to non-persistence rather than a thrown error (`js/experience.js:23-38`).
- Escape and outside-click handlers are guarded on menu state, so they cannot fight each other.

## ⚠️ Concerns (non-blocking)

- **`js/experience.js:245`** — `if (e.detail >= 2) e.preventDefault()` on the brand wordmark. Double-clicking a logo is an extremely common gesture, and here it silently does not navigate. Worse, this line runs even when `quiet()` is true, so reduced-motion and calm-mode users lose the navigation with **no** egg in exchange. Move it inside the `!quiet()` branch at minimum; better, count clicks on `pointerdown` and never suppress the link.
- **`js/experience.js:192-198`** — the `click:3` Lux reaction is bound to `.lux__figure`, a plain `<div>` with no role, no `cursor: pointer`, no `tabindex` and no key handler. It is mouse-only and completely undiscoverable — there is no affordance suggesting the figure is clickable.
- **`js/experience.js:246,274`** — both easter eggs are disabled under `prefers-reduced-motion: reduce` because `quiet()` conflates the OS preference with calm mode. A user who prefers reduced motion loses a content feature entirely rather than getting a static version of it.
- **`js/experience.js:116-123`** — `.opener__art` carries `click` and `pointerenter` handlers while being `aria-hidden="true"`, and has no `cursor: pointer`. The `pointerenter` path also advances the vignette when a mouse merely passes over the art, which can consume the reveal before the user has read the current lead. The `.vignette__advance` button is the discoverable, labelled control; make it the primary one.
- **`css/theme.css:387-391`** — even setting aside the contrast failure (see accessibility.md), the "dim" treatment for unrevealed leads is ambiguous: it looks like broken/disabled text rather than "not yet revealed". A clearer affordance (a visible marker, or genuinely hiding them) would read better.
- **`features.html:147,190,…`** / **`clients.html:150,186,…`** — card titles are `<h2>` siblings of their section's own `<h2>`, so heading-based navigation gives eight or five flat siblings with no parent relationship. `download.html` uses `<h3>` correctly; the inconsistency is within one site.

## ❌ Failures (must fix this round)

- **`css/components.css:85-94`** with **`js/main.js:19`** — with JavaScript disabled at any viewport under 900px, the primary navigation is **completely unreachable**: `.nav-menu` is `display: none` and only the JS-applied `.is-open` reveals it, while `.nav-toggle` still renders as a button that does nothing. A user in that state can only navigate via the footer case index at the very bottom of the page. `js/main.js:19` sets `root.setAttribute('data-js','on')` for exactly this purpose but **no CSS rule consumes `data-js`**. **Required**: make `.nav-menu` visible by default and hide it only under `html[data-js='on']` below 900px; render `.nav-toggle` only when `data-js='on'`. (Also filed under Experience Fidelity, since `navigation_model.fallback` declares this behaviour explicitly.)

## Recommendations (ranked by impact)

1. Wire `data-js` so the nav works without JS, and hide the dead hamburger when it cannot function (impact: high, effort: low).
2. Stop swallowing double-clicks on the logo (impact: medium, effort: trivial).
3. Promote `.vignette__advance` to the primary reveal control; make the art decorative only (impact: medium, effort: low).
4. Make `.lux__figure` a `<button>` so its reaction is discoverable and keyboard-reachable (impact: low, effort: low).
5. Give unrevealed leads a "not yet revealed" affordance rather than a disabled-looking dim (impact: low, effort: low).

## Evidence

- `js/main.js`, `js/experience.js` read in full.
- `grep -rn "data-js" sites/neon-noir/css sites/neon-noir/*.html` → zero matches.
- `reviews/neon-noir/shots/index-320x640.png`, `index-375x667.png` — hamburger rendered at mobile widths.
