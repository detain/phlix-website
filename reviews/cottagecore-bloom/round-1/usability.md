# Usability Review — Cottagecore Bloom

**Variant**: cottagecore-bloom
**Round**: 1
**Reviewer**: adversarial reviewer (Claude Opus 5)
**Date**: 2026-07-25

## Score

- **Usability**: 80 / 100

## ✅ Passed

- **Primary goal in one click.** "Start Your Garden" → `download.html` is in the
  hero, above the fold at 320 / 375 / 768 / 1280 (measured: `y = 586` at 375px in
  a 667px viewport). Well inside the ≤2-click requirement.
- **User control and freedom is unusually well handled.** Three independent exits
  exist and all work: `prefers-reduced-motion`, the "Quiet the Garden" toggle
  (persisted), and "Primrose, rest now" (persisted). The toggle's label flips to
  "Wake the Garden" so the control is honest about its current state
  (`js/main.js:56-61`), and `aria-pressed` is kept in sync.
- **Recognition over recall.** `jargon_policy: translate` is implemented as a
  visible plain sentence with the precise `content.json` wording one `<details>`
  away (`components.css:451-477`). A visitor never has to know what
  "QualitySelector profiles" means to understand "it reads the room and pours the
  right measure", and the precise text is never *hidden* from someone who wants
  it. This is the best usability idea on the site.
- **No dark patterns.** No modal, no email gate, no autoplay, no cookie banner,
  no urgency copy, no fake counts. The proof band explicitly refuses to print a
  star count it cannot verify (`index.html:861-864`).
- **Progressive enhancement is real, not claimed.** With JS off: the nav is a
  plain `<ul>` of six links (the `display: none` collapse only applies under
  900px, where the `.nav-toggle` is the documented fallback — see the concern
  below), every beat is at full opacity because the `.reveal` pre-state is gated
  behind `.js-reveal` (`theme.css:740`), the hero carries identical copy, the
  mascot and the calm toggle are `hidden` in markup and only revealed by JS, and
  the seasonal slot is inert. Nothing that matters depends on script.
- Consistency across ten pages: identical header, identical mirror-nav footer,
  identical CTA-banner pattern, one `.page-header` idiom for every interior page.
  Nothing surprises.
- `localStorage` is wrapped in try/catch on both read and write
  (`js/main.js:29-44`) so private-browsing modes degrade instead of throwing.
- The mobile disclosure has all three expected affordances: `aria-expanded`,
  Escape-to-close with focus returned to the trigger, and click-outside-to-close
  (`js/main.js:76-93`).
- Descriptive link text everywhere — "See all eight features", "Look inside every
  room", "Who has contributed", "The full planting guide". No "click here", no
  bare URLs.

## ⚠️ Concerns (non-blocking)

- **`js/main.js:272-280` — stale `closeEggs` timers truncate the `click:5` petal
  shower.** `showReward` schedules `window.setTimeout(closeEggs, ms)` but never
  stores or clears the handle. Clicks 1–4 on `.nav-sigil` each show a greeting and
  each schedule a `closeEggs` at +2600 ms. Because the counter resets after
  2500 ms of inactivity, a successful 5-click run must happen fast — so the 5th
  click's petal shower and its 3200 ms reward are destroyed by whichever *earlier*
  timer fires first. A 1.5-second five-click run gets the shower removed after
  ~1.1 s instead of the kit's declared "the petals settle on their own after ~3s"
  (`easter_eggs[0].exit`). The one egg most likely to be discovered is the one
  most likely to be cut off.
  **Fix**: hold the handle in a module-scope variable and `clearTimeout` it at the
  top of `showReward` (the same pattern already used correctly for `bubbleTimer`
  at `:175-181`).
- **`js/main.js:63-69` — turning on calm mode leaves the parallax frozen
  off-register.** `closeEggs()` is called but the inline `translate3d(...)` written
  by `draw()` (`:143`) stays on all five `.hero-plane` elements. The visitor asks
  for stillness and gets a diorama stuck wherever their cursor last left it. Clear
  `el.style.transform` when `isStill()` becomes true; also add a
  `reduceMotion.addEventListener('change', …)` so an OS-level change mid-session
  does the same.
- **`index.html:938-946` gives an install sequence that does not work.** The seed
  box shows `git clone https://github.com/detain/phlix-server.git` and then the
  prose "Then `composer install` and you are planted" — omitting the
  `cd phlix-server` that `download.html:363-366` correctly includes. A visitor who
  follows the home page alone runs `composer install` in the wrong directory. This
  also explains the "one line" / "four lines" spread across `index.html:938`,
  `seasons.html:499` and `docs.html:465`: each phrase is locally accurate about its
  own code block, but the three pages give three different answers to "how long is
  the install?".
- **`js/main.js:191-208` — an unrequested speech bubble on load.** The home tip is
  anchored to `.hero`, which is intersecting at load, so Primrose greets the
  visitor with a 304×82px bubble in the bottom-right within a second of arrival
  (verified at 768px and 1280px). It auto-hushes after 7 s and never covers the
  CTA, so it is not a blocker, but it is the one thing on an otherwise unhurried
  page that demands attention without being asked. The comment at `:195-196`
  claims this cannot happen.
- **The 720–899px band is a coverage hole in the site's own testing.** The
  companion appears at ≥720px (`components.css:1088`) while the nav stays
  collapsed until 900px (`components.css:193`), and `render-check`'s four
  viewports are 320×640, 320×700, 375×667 and desktop. Nothing tests the band
  where those two decisions interact — which is where the ❌ below lives. Worth
  adding a tablet width to the local check list regardless of how the ❌ is fixed.

## ❌ Failures (must fix this round)

- **`css/components.css:1088-1101` — between 720px and ~899px the fixed Primrose
  companion swallows clicks intended for a `visitor_paths` card.** At 768×1024
  the "I host movie nights" card spans (390,916)–(736,974) and the
  "Primrose, rest now" dismiss pill plus the bee button lie across its right-hand
  portion: **7 of 18 hit-test points inside the card resolve to
  `button.mascot-dismiss`.** At 860px the victim is "I like to build my own
  paths" (5/18). The user-visible failure is severe for its size — aiming at a
  self-select path card and instead dismissing the mascot is an action that cannot
  be undone from the UI (the dismissal is written to `localStorage` and there is no
  "bring Primrose back" control anywhere on the site). See
  `scratchpad/vp-t768.png` for the collision.
  **Required outcome**: raise the companion's breakpoint from `45rem` to
  `56.25rem` so it matches the nav's own breakpoint and the collision band ceases
  to exist. (A second, independently valuable fix: give the dismissal an undo, or
  scope the `localStorage` key to a session, so an accidental dismissal is
  recoverable.)

## Recommendations (ranked by impact)

1. Raise `.mascot` to `width >= 56.25rem` (impact: high, effort: low).
2. Add `cd phlix-server` to the home install prose, or point it at the full guide (impact: high, effort: low).
3. Track and clear the `closeEggs` timer in `showReward` (impact: medium, effort: low).
4. Reset `.hero-plane` transforms when calm mode engages (impact: medium, effort: low).
5. Delay the first Primrose tip until a scroll (impact: low, effort: low).

## Evidence

- Puppeteer 57-point grid hit-test of every `.path-card` at 768px
  (`scratchpad/probe3.mjs`) and a 10-viewport / 4-page sweep
  (`scratchpad/sweep.mjs`).
- Above-the-fold CTA position measured at 375 / 768 / 1024 / 1280
  (`scratchpad/probe.mjs`, `probe2.mjs`).
- `grep -rn "git clone\|composer install" sites/cottagecore-bloom/*.html`.
- Source read of `js/main.js` in full (452 lines).
