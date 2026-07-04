# CTA / Funnel Review — Cosmic Horror

**Variant**: cosmic-horror
**Round**: 1 (adversarial)
**Reviewer**: adversarial-code-reviewer
**Date**: 2026-07-04

## Score

- **CTA / funnel**: 91 / 100

## ✅ Passed

- **Primary CTA above the fold on home**: index.html hero CTA "Get Phlix" at line 122 — visible without scrolling on any viewport at 320px+ (hero uses `min-height: auto` on mobile with `padding: var(--space-12) var(--space-4)`) — primary CTA is always in first viewport
- **Primary CTA contrast ≥3:1**: `.btn-primary` uses `background: #00CC66` on `color: #04000A` — contrast ratio: approximately 6.8:1 — exceeds WCAG AA large text / UI requirement of 3:1. Confirmed by kit accessibility spec: "Eldritch Green (#00CC66) on Cosmic Void (#04000A) = 6.8:1 — passes AAA for large text, AA for small."
- **Secondary CTA de-emphasized**: Secondary buttons use ghost style (`background: transparent`, `color: var(--color-parchment)`, `border-color: var(--color-obsidian)`) — visually clearly secondary; smaller size (`btn-small` on some pages); never competes visually with primary
- **Primary CTA on every page**: Every page has at least one `.btn.btn-primary` in its CTA banner or hero section
- **Download reachable in ≤2 clicks from home**: Home → "Get Phlix" (hero CTA, 1 click) → download.html. Home → nav "Download" (1 click) → download.html. Verified: download.html:103 is the download page.
- **No surprise modals**: No modals, no popups, no email gates — clean funnel
- **No forced email gate**: No email collection forms anywhere
- **No auto-play media with sound**: No video/audio elements on any page
- **CTA banners at bottom of every page**: Each page ends with a `.cta-banner` driving toward download (or docs on download page) per new_site.md §5

## ⚠️ Concerns (non-blocking)

- **Download page CTA links to docs** — download.html:232 has CTA banner with secondary "Read the docs" button. Per new_site.md §5 "Every page ends in a .cta-banner that drives toward download (or docs on the download page)." Since this IS the download page, "Read the docs" as a secondary CTA is acceptable but the primary CTA should still be present. The page does have "Get Phlix" primary CTAs on client download cards themselves — so the funnel is still effective. — *impact: low*

## ❌ Failures (must fix this round)

None — no blocking issues in this dimension.

## Recommendations (ranked by impact)

No changes recommended — CTA funnel is clean and effective.

## Evidence

- `index.html:122` — primary CTA "Get Phlix" above fold in hero
- `index.html:124-128` — secondary CTA "Read the docs" with `btn-secondary` class (de-emphasized)
- `components.css:305-321` — primary button: background #00CC66 on color #04000A = 6.8:1 contrast
- `components.css:324-337` — secondary button: transparent bg, obsidian border, parchment text
- `index.html:327-333` — cta-banner at bottom of home with primary "Download Phlix"
- `index.html:109` — main element starts here; hero CTA is before it, in the first viewport
- download.html:232 — secondary "Read the docs" on download page CTA banner (acceptable per §5)
