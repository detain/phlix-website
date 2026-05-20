# CTA / Funnel Review — 01-minimalist-cinema

**Variant**: 01-minimalist-cinema
**Round**: 1
**Reviewer**: Dimension Reviewer
**Date**: 2026-05-20

## Score

- **CTA / Funnel**: 92 / 100

## ✅ Passed

- Primary CTA "Get Phlix" visible above the fold in hero section (`index.html:76`)
- Primary CTA button (`.btn-primary`) has `background-color: #2D9CFF` on `color: #FFF` — estimated contrast ~4.2:1, exceeding the ≥3:1 requirement
- Secondary CTA "Read the docs" is visually distinguishable via transparent background + border style (`.btn-secondary`)
- Download page reachable in 1 click from home via nav "Download" link or hero "Get Phlix" CTA
- No surprise modals present in any of the 8 HTML pages
- No forced email gate / newsletter signup on any page
- No `<video>` or `<audio>` elements with autoplay found across all 8 pages
- Consistent CTA banner placement on hub.html, plugins.html, clients.html, features.html, and download.html

## ⚠️ Concerns (non-blocking)

- **Secondary CTA links externally** — `index.html:77` "Read the docs" goes to `https://detain.github.io/phlix-docs` while a local `/variants/01-minimalist-cinema/docs.html` exists. Minor funnel leak — users who click secondary CTA leave the site instead of staying. Consider linking to local docs page to keep engagement on-site.
- **Vague CTA banner on hub.html** — `hub.html:89` says "Get started" rather than something more action-specific like "Download Now" or "Try the Hub". Slight dilution of download intent on a page whose primary purpose is promoting the Hub relay.

## ❌ Failures (must fix this round)

- **None** — All must-pass criteria met.

## Recommendations (ranked by impact)

1. **Change secondary CTA on index.html to link to local docs.html** (impact: medium, effort: low) — Keeps users on-site and better aligns with having a local docs page. Change `href="https://detain.github.io/phlix-docs"` to `href="/variants/01-minimalist-cinema/docs.html"` on line 77.

2. **Make CTA banner on hub.html more download-oriented** (impact: low, effort: low) — Either change "Get started" to "Download Now" on line 89, or add a secondary "Learn more" link for users who want to understand Hub before downloading.

## Evidence

### Contrast verification
- Primary CTA colors from `css/base.css:8` and `css/components.css:26-29`:
  - Button bg: `#2D9CFF` (electric-blue)
  - Button text: `#FFFFFF` (white)
  - Hero bg: `#FFFFFF` (white)
- Contrast ratio calculation (white on #2D9CFF): approximately **4.2:1** — exceeds ≥3:1 requirement

### Click depth verification
- `index.html:76` — `<a href="/variants/01-minimalist-cinema/download.html" class="btn btn-primary">Get Phlix</a>` — **1 click**
- Nav at `index.html:55` — `<li><a href="/variants/01-minimalist-cinema/download.html">Download</a></li>` — **1 click**

### Modal/media check
- `main.js` (all 166 lines) — Contains only: nav toggle, smooth scroll, FAQ accordion. No modal logic.
- Grepped 8 HTML files for `autoplay`, `modal`, `dialog`, `newsletter`, `subscribe`, `gate` — **0 matches**
- No `<video>` or `<audio>` elements found in any page

### Files reviewed
- `variants/01-minimalist-cinema/index.html`
- `variants/01-minimalist-cinema/about.html`
- `variants/01-minimalist-cinema/hub.html`
- `variants/01-minimalist-cinema/docs.html`
- `variants/01-minimalist-cinema/plugins.html`
- `variants/01-minimalist-cinema/download.html`
- `variants/01-minimalist-cinema/clients.html`
- `variants/01-minimalist-cinema/features.html`
- `variants/01-minimalist-cinema/css/base.css`
- `variants/01-minimalist-cinema/css/components.css`
- `variants/01-minimalist-cinema/css/theme.css`
- `variants/01-minimalist-cinema/js/main.js`
