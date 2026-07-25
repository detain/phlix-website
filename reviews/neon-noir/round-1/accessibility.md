# Accessibility Review — Neon Noir

**Variant**: neon-noir
**Round**: 1
**Reviewer**: adversarial reviewer (claude-opus-5)
**Date**: 2026-07-25

## Score

- **Accessibility**: 58 / 100

## ✅ Passed

- Skip link present, functional, focus-revealed (`css/base.css:322-340`).
- Focus ring is a real 2px cyan outline + 2px offset + 6px cyan halo, never `outline: none` anywhere (`css/base.css:342-347`). Matches `accessibility.focus_style`.
- One `<h1>` on all nine pages; no skipped heading levels on any page.
- All decorative SVG art is `aria-hidden="true"` / `role="presentation"` with `focusable="false"`; the one content image (`img/logo.svg`) has `alt="Phlix"`.
- Touch targets: `.btn` 48px, `.btn--sm` 44px, `.nav-menu__link` 48px, `.nav-toggle` 48px, `.intensity-toggle` 44px, `.lux__tip > summary` 44px, `.lux__dismiss` 44px — meets `accessibility.touch_target`.
- No positive `tabindex`; the only `tabindex` is `main[tabindex="-1"]` as the skip target.
- **Status is never colour-alone**: `.client-status` always carries the word ("Stable"/"Beta") — `download.html:180,195,210,225,240`, `clients.html:151,187,…`. `.intensity-toggle` carries `aria-pressed` **and** a spelled-out `.intensity-toggle__state` ("Neon on" / "Lights out"), not just knob position. Active nav carries `aria-current="page"` **and** a 3px amber marker **and** an appended " · you are here" string (`css/components.css:145-154`). The `.netmap` node metaphor has no unlit state, so no colour-only signal exists there. §12 is satisfied on all four surfaces I was asked to check.
- Reduced motion: every `@keyframes` consumer is inside `@media (prefers-reduced-motion: no-preference)` (`css/theme.css:332,873,935`, `css/components.css:861,1043`), plus a global `*` duration clamp (`css/base.css:367-379`). `html { scroll-behavior: smooth }` is reverted to `auto`. No motion escapes the gate.
- The key-sequence egg meets §19.8 in full: inert inside `input`/`textarea`/`select`/`contenteditable`, never calls `preventDefault`, exits on Esc, ignores modified keys (`js/experience.js:256-279`).
- Contrast measurements in `REGEN_PLAN.md` §5.9 / §6 are **all independently confirmed**: ghost/void 16.65, amber/void 9.66, cyan/navy 11.53, `#FF2D78`/slate 4.41, `#E5154E`/void 4.24, and both derived mixes reproduce exactly (`#FA5391`, `#5A6B84`) with the quoted ratios 6.25/5.67/5.02 and 3.61/3.27. No fabricated numbers.
- `-webkit-text-stroke` and `-webkit-background-clip: text` appear **nowhere** in `css/` or `js/` or any HTML — the author's claim is true; all glow is `text-shadow`/`box-shadow`/`drop-shadow`.

## ⚠️ Concerns (non-blocking)

- **`css/base.css:121`** — `--color-magenta-text: #fa5391` diverges from the substitute `kit-brief` prescribes verbatim (`#ff357d` on slate, `#e7285c` on void) for cross-site token consistency — the author's mix is *safer* (5.02 vs 4.53 on slate) and is disclosed in `REGEN_PLAN.md` §6, but the divergence should be escalated to the orchestrator, not taken unilaterally.
- **`css/base.css:294-297`** — `strong { color: var(--color-text); font-weight: 500 }`. The `color` is identical to body text so it contributes nothing, leaving emphasis on a single 100-unit weight step in IBM Plex Serif at 16px — barely perceptible. `ibm-plex-serif-700` is now in the pool **and declared** (`css/base.css:476-482`), so 600/700 is legal. The kit's `fonts.body.weight:[400,500]` predates that addition and `typography_rules` is silent on `strong`. No note explains the choice. This reads as an accessibility weakness rather than a deliberate noir decision.
- **`js/experience.js:246,274`** — both easter eggs are suppressed under `prefers-reduced-motion: reduce`, because `quiet()` (`:70-75`) conflates the OS preference with calm mode. `intensity_toggle.affects` legitimately includes `easter_eggs`; an OS motion preference is not that toggle, and `accessibility.motion_reduction` asks to *replace* motion, not delete features. `kit-brief` requires both eggs be reachable.
- **`js/experience.js:245`** — `if (e.detail >= 2) e.preventDefault()` swallows navigation on any double-click of the brand wordmark, and runs even when `quiet()` is true, so reduced-motion users lose the link with no egg in exchange.
- **`js/experience.js:192-198`** — the `click:3` Lux reaction is bound to `.lux__figure`, a non-focusable `<div>` with no role, no `cursor: pointer` and no key handler: mouse-only, WCAG 2.1.1.
- **`js/experience.js:116`** — a `click` handler on `.opener__art`, which is `aria-hidden="true"` (`index.html:153`). `.vignette__advance` carries the same action for keyboard/AT, so no information is lost, but an interactive target inside AT-hidden content is the wrong way round.
- **`css/theme.css:876-879`** — `.will-cut { opacity: 0.6 }` dims a whole subtree, so `--color-neutral` text inside an armed group (`.t-serial` in `.caseboard`, `.case-quote cite` in `.trust__grid`) sits at **2.81:1** until observed.
- **`features.html:147,190,229,271,311,351,395,435`** and **`clients.html:150,186,…`** — card titles are `<h2>`, siblings of the section's own `<h2>`, flattening the outline. `download.html:179,194,…` correctly uses `<h3>`. No level skipped, so the automated check passes, but the site is internally inconsistent.

## ❌ Failures (must fix this round)

- **`css/theme.css:387-391`** (with `js/experience.js:92-102,110`) — `.vignette__lead[data-state='dim']` is `--color-neutral` (`#7a8fa6`) at `opacity: 0.45`, giving an effective `#3c4754` on void = **2.07:1**. The text is 17–22px at weight 700 — needs 4.5:1, or 3:1 under the large-text allowance; it fails both. `paint()` runs unconditionally on load and is **not** gated by `quiet()`, so on every JS-enabled visit two of three lead lines (real `tagline_secondary` copy) render at 2.07:1, including for reduced-motion users. Visible in `reviews/neon-noir/shots/index-320x640.png` and `index-desktop.png`. **Required**: unrevealed leads must be either ≥4.5:1 (e.g. `--color-neutral` at full opacity = 5.88:1, with the reveal carried by the `text-shadow`/marker already present) or genuinely hidden (`hidden`/`aria-hidden`) until revealed — not low-contrast visible text.
- **`css/base.css:196-211`** — `seasonal_activation: live-js` overrides tokens that feed small text, and none of the three variants was contrast-checked. Measured: **Blood Moon October** (`--color-primary: #e5154e`) breaks `.btn-primary`'s label (`var(--color-bg)` on `#e5154e`, 15px/600) at **4.24:1**, `.nav-menu__link--primary` on `#170810` (15px) at **4.22:1**, `.decoder__body dt` on surface-alt (12px) at **3.40:1**, `.badge--quality` (11px) at **4.22:1**. **Midnight New Year** (`--color-secondary: #ff2d78`) breaks every `a{}` (`css/base.css:274`) and `.decoder > summary` (13px) on `--color-surface-alt` at **4.41:1**. **Valentine's Neon** (`--color-primary: #ff2d78`) breaks `.decoder__body dt` at **4.41:1**. `REGEN_PLAN.md` §5.9 identified `#E5154E` as a failing hue but mitigated only the *tertiary* — the same hue is routed into `--color-primary` for the whole of October, unmitigated, including on the site's single most important control. **Required**: derive per-season text-safe tokens from the kit's own pigments (the same technique as `--color-magenta-text`), reroute every small-text consumer onto them inside each `[data-season]` block, and record the measurements in `REGEN_PLAN.md` §6.
- **`css/components.css:245-249`** with **`download.html:137-144`** — `.btn-ghost { border-color: var(--color-edge-strong) }`. `#5a6b84` is 3.61:1 on void and 3.27:1 on navy, but only **2.89:1** on `--color-surface-alt` `#1c2333` — below the WCAG 1.4.11 3:1 floor for a UI-component boundary. The `.copy-token` ghost button sits inside `.code-block__bar`, whose background *is* `--color-surface-alt` (`css/components.css:503`); with a transparent fill, that border is the control's only boundary. The §6 derivation table lists only void and navy, never the third surface — this is the gap the author's prose is silent about. **Required**: give `.btn-ghost` a slate-safe border (`--color-neutral` `#7a8fa6` = 4.72:1 on slate) or do not place a ghost button on surface-alt; extend the §6 table to all three surfaces.

## Recommendations (ranked by impact)

1. Fix the three ❌ contrast defects — dim leads, seasonal token fallout, ghost border on slate (impact: high, effort: low/medium).
2. Stop conflating `prefers-reduced-motion` with calm mode: split `quiet()` into `noMotion()` and `calm()`, and let reduced-motion users keep the eggs' reward copy without animation (impact: medium, effort: low).
3. Raise `strong` to 700 and drop the no-op `color` (impact: medium, effort: trivial).
4. Make `.lux__figure` a real `<button>` so the `click:3` reaction is keyboard-reachable (impact: low, effort: low).
5. Demote `features.html`/`clients.html` card titles to `<h3>` (impact: low, effort: low).

## Evidence

- `node tools/selfcheck.mjs --site neon-noir` → PASS (1 advisory: "kit claims contrast 4.5:1 — verify by measurement").
- `node tools/render-check.mjs --site neon-noir --shots` → PASS, 9 pages × 4 viewports + 200% zoom, screenshots in `reviews/neon-noir/shots/`.
- `node tools/kit-brief.mjs --site neon-noir` — measured contrast table used to cross-check every author claim.
- Independent WCAG relative-luminance recomputation of all base-palette pairs, both derived mixes, all three seasonal override sets, and both alpha-composited states (`opacity: 0.45` and `0.6`).
- `grep -rn "text-stroke\|background-clip\|-webkit-" css/ js/ *.html` → no matches.
- `reviews/neon-noir/shots/index-desktop.png`, `index-320x640.png` — dim lead lines visibly illegible.
