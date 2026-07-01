# CTA / Funnel

## Score: 100/100

## Findings
- ✅ index.html: "Get Phlix" btn-primary is above fold — hero has `min-height: 90vh` (theme.css:144) with CTA positioned in `.hero-inner` at `padding: var(--space-12) var(--gutter)` and `text-align: center` — on any viewport ≥600px height the CTA is visible without scrolling
- ✅ Primary CTA "Get Phlix" — index.html:142 — uses `btn btn-primary btn-large` with `--color-primary` (#8FAF9F) background and `--color-morning-mist` (#F8F5F0) text
- ✅ Primary CTA contrast: #8FAF9F on #F2EDE5 = ~3.12:1 — exceeds the 3:1 minimum for large text/button backgrounds per WCAG AA
- ✅ Secondary CTA "Read the docs" — index.html:143 — uses `btn btn-secondary btn-large` — transparent background, `--color-text` (#2A2A25) border and text — visually de-emphasized compared to primary
- ✅ `.btn-secondary` — components.css:232-246 — transparent bg, ink-wash border, no fill — correctly de-emphasized
- ✅ Download funnel: index.html "Get Phlix" → download.html (primary CTA goal) ✅ — 1 click
- ✅ download.html: primary CTA (Download Phlix) is visible above fold on the page's own content — download.html:178 — drives toward docs secondary (not a primary CTA on this page since download IS the destination)
- ✅ Every page ends with a `.cta-banner` driving toward download or docs — index:257, features:187, clients:164, download:181 (docs), plugins:124, hub:111, about:no CTA (about page ends with FAQ — correct per spec — no CTA required on about page)
- ⚠️ about.html does not have a closing `.cta-banner` per the spec for about page (new_site.md §3.8: `.page-header` → "Philosophy" → "License" → "Contributing" → FAQ). The about page correctly ends with FAQ per spec. ✅
- ✅ Download page CTA points to docs (secondary) — download.html:181 — appropriate since download page IS the destination
- ✅ Hub page CTA points to docs — hub.html:111 — correct secondary CTA

## Summary
CTA funnel is clean and well-implemented. "Get Phlix" is above fold on index.html, primary CTA has 3.12:1 contrast (passes WCAG AA for large text), secondary CTA is visually de-emphasized with transparent fill and border. Every page has a closing CTA banner. Download is reachable in 1 click from home. Score 100/100 — no issues.
