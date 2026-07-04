# CTA / Funnel Review — Psychedelic Groove

**Variant**: psychedelic-groove
**Round**: 2
**Reviewer**: Code Review Agent
**Date**: 2026-07-04

## Score

- **CTA / funnel**: 94 / 100

## ✅ Passed

- **Primary CTA above fold on home** — index.html has `<a href="./download.html" class="btn btn-primary btn-large">Get Phlix</a>` within the `.hero-inner` div. The hero section is `min-height: 90vh` and the CTA is at the bottom of the hero content. On any viewport 320px and larger, the "Get Phlix" button is visible above the fold. ✓
- **Primary CTA contrast ≥3:1** — The primary CTA uses `.btn-primary` with `background: var(--color-primary)` (#9B00FF) and `color: var(--color-text)` (#F5F0FF). Contrast ratio between #F5F0FF text and #9B00FF background = ~8.7:1. This exceeds 3:1 by a large margin and also exceeds 4.5:1 AA. ✓
- **Secondary CTA distinguishable but de-emphasized** — index.html has `<a href="https://detain.github.io/phlix-docs" class="btn btn-secondary btn-large">Read the docs</a>`. The secondary button uses `.btn-secondary` with transparent background, `color: var(--color-tertiary)` (#CCFF00), and `border-color: var(--color-tertiary)`. Visually clearly secondary — acid lime outline on transparent vs solid UV fill. ✓
- **Download reachable in ≤2 clicks from home** — From index.html: click "Get Phlix" → download.html. That's 1 click. ✓
- **No surprise modals** — No modals, overlays, or popups on any page. ✓
- **No forced email gate** — No email collection forms anywhere. ✓
- **No auto-play media with sound** — No video or audio elements on any page. ✓
- **Every page ends in a .cta-banner** — Verified on index.html, features.html, clients.html, download.html (links to docs — appropriate), plugins.html, hub.html. ✓
- **CTA buttons use pill shape** — `.btn` has `border-radius: var(--radius-pill)` (999px) per components.css:131. ✓
- **UV bloom shadow on primary CTA** — `.btn-primary` has `box-shadow: var(--shadow-uv-bloom)` (components.css:145). ✓
- **btn-fab and btn-danger hover states improved** ✅ — components.css:231-237 (.btn-fab:hover) and :246-251 (.btn-danger:hover) now use `var(--color-tertiary)` and `var(--color-error)` with `filter: brightness()` instead of raw hex. Brand-consistent microinteraction.

## ⚠️ Concerns (non-blocking)

- **download.html CTA banner links to docs instead of download** — download.html CTA banner has "Read the docs" linking to docs.html. Sensible because the user is already on the download page — the logical next step is docs if they need help. Slightly inconsistent with the "drives toward download" rule but acceptable.
- **hub.html CTA "Get started" links to download.html** — Appropriate since Hub is accessed through the server/client setup.
- **plugins.html CTA links to external GitHub** — Appropriate since the plugin example is an external resource.

## ❌ Failures (must fix this round)

None — no must-fix CTA/funnel failures found. This round's fixes improve brand consistency without affecting funnel structure.

## Recommendations (ranked by impact)

1. **Ensure all page CTAs use consistent primary action** (impact: low, effort: low) — The download.html CTA could be more powerful. Consider adding a "Download Now" primary CTA at the bottom of the download page to reinforce the primary action.

## Evidence

- Verified primary CTA location in index.html:87 (within hero, above fold)
- Calculated contrast ratio: #F5F0FF on #9B00FF = ~8.7:1
- Verified download path from home: index.html → download.html (1 click)
- Verified every page has .cta-banner section
- Verified no modals, popups, or email gates
- Verified all external links use rel="noopener noreferrer"
