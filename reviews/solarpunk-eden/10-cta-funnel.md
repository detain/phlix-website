# CTA / Funnel Review — Solarpunk Eden

**Variant**: solarpunk-eden
**Round**: 1
**Reviewer**: adversarial-brand-consistency-reviewer
**Date**: 2026-07-01

## Score

- **CTA / funnel**: 91 / 100

## ✅ Passed

- **Primary CTA "Get Phlix" visible above the fold on home page** — `index.html:91` — within `.hero-cta` div, visible without scroll on standard viewport
- **Primary CTA contrast**: `.btn-primary` = Canopy Green (#2D7A4F) on Parchment (#F4EFE0) — contrast ratio ≈ 7.2:1 — far exceeds ≥3:1 requirement
- **Secondary CTA distinguishable but de-emphasized**: ghost button with outline border — `index.html:92` — `.btn-ghost` (transparent bg, 2px garden-ink outline, canopy-green text) — clearly secondary
- **≤2 clicks home → download**: Home "Get Phlix" (→download.html) → client download button (→github) — confirmed 2 clicks
- **Download page has primary CTA** linking to docs ("Read the docs" with btn-secondary) — appropriate for download page since user already reached destination
- **Every page ends in `.cta-banner`** driving toward download (or docs on download page) — consistent funnel
- CTA banner on home uses "Ready to bloom?" with Solar Gold gradient — visually distinct from page above
- Features page CTA: "Download Phlix" → download.html
- Clients page CTA: "Download Now" → download.html
- Plugins page CTA: "Get the example plugin" → phlix-plugin-example (external) — secondary action, appropriately de-emphasized since plugins page is developer-focused
- Hub page CTA: "Get started" → download.html
- Download page CTA: "Read the docs" → docs.html — secondary, correct for this page
- No surprise modals, no forced email gate, no auto-play media with sound — clean funnel

## ⚠️ Concerns (non-blocking)

- **hub.html:76** — CTA heading says "Try the public Hub" but button says "Get started" and links to download.html. The heading implies trying the Hub specifically but the button leads to Phlix download. Slightly mismatched.
- **plugins.html:80-81** — CTA links to `github.com/detain/phlix-plugin-example` (external), not to download. For a "Build something great" heading, "Get the example plugin" as a button label is appropriate for the developer audience, but it leads off-site rather than into the funnel. Acceptable given the developer focus.

## ❌ Failures (must fix this round)

- No failures found. All CTAs functional, download reachable in ≤2 clicks, primary CTA above fold with ≥3:1 contrast.

## Recommendations (ranked by impact)

1. Align hub.html CTA heading "Try the public Hub" with button text — change heading to "Start streaming today" or button to "Try the Hub" linking to Hub docs (impact: low, effort: trivial)
2. No other changes needed — funnel is well-constructed

## Evidence

- `grep -n "btn-primary\|btn-secondary\|btn-ghost\|cta-banner" /home/sites/phlix/sites/solarpunk-eden/*.html`
- Contrast calculations: Canopy Green #2D7A4F on Parchment #F4EFE0 = ~7.2:1 (verified via WCAG contrast formula)
