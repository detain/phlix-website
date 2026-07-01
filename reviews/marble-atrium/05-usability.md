# Usability — marble-atrium

**Score: 65/100** — Core navigation and CTA funnel work well; one dead button and one accessibility-adjacent issue.

## Findings

- **Download reachable in ≤2 clicks from home:** `index.html:96` "Get Phlix" → `download.html` ✅. The home page primary CTA is one click from the hero. Secondary CTA path: "See all features →" → `features.html` → "Get Phlix" is 2 clicks but secondary. Primary path is 1 click. Meets the ≤2 click requirement ✅.
- `index.html:230` ✅ `<script src="js/main.js" defer>` — JS is non-render-blocking.
- `js/main.js:19-42` ✅ Mobile nav: `aria-expanded` kept in sync; `Escape` key closes menu and returns focus to toggle; outside click closes menu.
- `js/main.js:44-73` ✅ Scroll reveal with `IntersectionObserver` — feature-detected, gracefully degrades.
- `js/main.js:78-84` ✅ `reveal-vein` animation gated behind `prefersReducedMotion` check.
- `css/components.css:87-147` ✅ Mobile nav at ≤900px: toggle appears, menu drops down with `aria-expanded` controlled.
- `css/components.css:139-146` ✅ Mobile nav menu items: `min-height: 52px` for touch friendliness.
- `css/components.css:129` ❌ **DLNA client card has a dead button.** `clients.html:129` — `<span class="btn btn-ghost" style="cursor: default;">Built in — no app needed</span>` — a `<span>` with `btn btn-ghost` class is not keyboard-focusable, not clickable, and semantically meaningless as a button. Every other client card has a real `<a href>` or `<button>`. This violates Nielsen heuristic #3 (users should always know if an element is interactive) and creates an accessibility trap. The DLNA card is also the only one without a functional action, which may confuse users about whether DLNA actually works.
- `download.html:111` ✅ Same pattern on download page: `<span class="btn btn-ghost" style="cursor: default;">Built in</span>` — again a dead span styled as a ghost button. Duplicated defect.
- `css/components.css:168-176` ✅ All buttons have `min-height: 44px` and `min-width: 44px` — meets touch target requirement.
- `css/theme.css:153-158` ✅ Skip link visible on focus — proper accessibility landmark.
- Nielsen #1 (visibility of system status): Not applicable — no dynamic state changes requiring feedback in a static marketing site.
- Nielsen #2 (match between system and real world): The hub page (hub.html) uses "memorise" (British) while content uses American spelling. Minor inconsistency.
- Nielsen #4 (consistency): Navigation is consistent across all 8 pages ✅.
- Nielsen #5 (error prevention): Not applicable to a static informational site.
- Nielsen #6 (recognition vs recall): Clear heading hierarchy, consistent nav, no forms requiring recall.
- Nielsen #7 (flexibility): Keyboard accessible, responsive at all breakpoints.
- Nielsen #8 (aesthetic): The marble-atrium aesthetic is consistent and refined.
- Nielsen #9 (help users recover): 404 handling not applicable to static site.

## Verdict

**Fail** — download is reachable in 1 click, mobile nav works, no other traps. But two dead "buttons" (DLNA client cards on clients.html and download.html) are real usability defects: they look interactive but are `<span>` elements with no action. This violates the "no dead buttons" requirement.
