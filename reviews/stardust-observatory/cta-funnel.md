# CTA / Funnel Review — stardust-observatory

**Variant**: 01-minimalist-cinema
**Round**: 1
**Reviewer**: Senior Front-End Reviewer
**Date**: 2026-07-04

## Score

- **CTA / Funnel**: 78 / 100

## ✅ Passed

- Primary CTA "Get Phlix" visible above the fold on home (`index.html:90`) — hero section uses `min-height: calc(100vh - 80px)` (`css/theme.css:137`), ensuring CTA is in initial viewport
- Primary CTA button uses `.btn.btn-primary.btn-large` (`index.html:90`) with Constellation Gold (#C9A84C) background on Midnight Navy (#0D1B2A) — contrast ratio ~4.8:1 exceeds ≥3:1 requirement (brand kit §21 accessibility)
- Secondary CTA "Read the docs" is ghost-brass styled (transparent bg, border) (`css/components.css:261-271`) — visually de-emphasized relative to primary
- Download reachable in **1 click** from home: "Get Phlix" on hero links directly to `download.html` (`index.html:90`) — well within ≤2 click requirement
- No surprise modals found on any page
- No forced email gate found on any page
- All CTAs point to appropriate destinations (download → download page, docs → external docs)

## ⚠️ Concerns (non-blocking)

- Secondary CTA "Read the docs" opens external link but lacks `rel="noopener noreferrer"` (`index.html:91`) — minor but should be consistent with other external links across the site
- download.html page leads with ecosystem clients (GitHub source links) rather than direct download/install actions — user intent at this stage is "get the software" but the "Server" block shows composer/install snippet first which is developer-oriented — consider reordering to surface the client download cards before the install snippet for end-user clarity

## ❌ Failures (must fix this round)

- None — no blockers in this dimension

## Recommendations (ranked by impact)

1. **Add `rel="noopener noreferrer"` to secondary CTA** (impact: medium, effort: low) — `index.html:91` opens `https://detain.github.io/phlix-docs` without security attributes; other external links across the site correctly use `rel="noopener noreferrer"`
2. **Reorder download.html content blocks** (impact: medium, effort: low) — move "Clients" download cards above "Server" install snippet so end-users see immediate download options before dev-focused composer instructions

## Evidence

- Hero CTA above fold: `css/theme.css:137` sets `.hero { min-height: calc(100vh - 80px); }` — header is ~80px, so hero fills viewport
- Primary CTA contrast: brand kit primary #C9A84C on background #0D1B2A = ~4.8:1 per brand kit §21 accessibility minimum_contrast
- Primary CTA link: `index.html:90` href="download.html" — 1 click to download
- No modals/gates found via manual inspection of all 8 HTML files
- `rel="noopener noreferrer"` check: primary nav external links (`index.html:204-216`), footer links all correctly use it; only the hero secondary CTA is missing it
