# CTA / Funnel Review — mid-century-modern

**Variant**: mid-century-modern
**Round**: 1
**Reviewer**: adversarial-cta-funnel-reviewer
**Date**: 2026-07-01

## Score

- **CTA / Funnel**: 76 / 100

## ✅ Passed

- Primary "Get Phlix" / "Download Phlix" CTA visible above fold on `index.html` — hero section (lines 385–393) renders at top of viewport without scrolling (`min-height: 90vh`, flex centered).
- **Contrast ratio — primary CTA**: Sunburst Yellow `#F2B705` on charcoal `#111008` yields ~10.4:1 (luminance 0.588 vs 0.002), well above the ≥3:1 UI-component threshold.
- **Contrast ratio — secondary CTA**: Teal `#00AFAF` ghost border on `#111008` bg yields ~4.6:1, above ≥3:1.
- **≤2 clicks home → download**: `index.html` → nav "Download" link = 1 click. Hero CTA button (`href="download.html"`) = 1 click. Both ≤2.
- **No surprise modals**: No `<dialog>`, no `alert()`, no JS-triggered overlays in any of the 8 pages.
- **No forced email gate**: No `<form>` elements requesting email anywhere.
- **No auto-play media with sound**: No `<video>` or `<audio>` elements found in any page.
- **CTA hierarchy** correctly applied across all 8 pages: `.btn-primary` (sunburst yellow `#F2B705`) reserved for primary download/start actions; `.btn-secondary` (teal ghost `#00AFAF` border, transparent bg) used for secondary actions (client source links, docs links).

## ⚠️ Concerns (non-blocking)

- **`download.html:224` — CTA banner bottom has secondary button for docs, not a primary download CTA** — The bottom CTA banner on the download page (the goal page itself) offers "Read the docs" via a teal ghost `.btn-secondary`, when the page's own purpose is to drive a download action. This is a funnel funnel inversion — the destination page de-emphasizes its own primary goal in favor of a secondary action. The banner should feature a primary "Download Server" or re-state the most relevant client download. Impact: users who scroll to the bottom of the download page without clicking a card are not prompted toward any primary action. Suggested next step: replace `.btn-secondary` with `.btn-primary` pointing to `download.html#download-server` or reframe the banner around a "Ready to start?" message with a primary CTA.
- **`download.html` — Client cards all use `.btn-primary` (yellow)** — All 4 client download cards use `.btn-primary` with external GitHub links. While these are valid download destinations, using yellow for every card reduces visual hierarchy differentiation on a page that shows multiple products of varying importance. Consider using `.btn-secondary` for less-critical client rows, reserving `.btn-primary` for the server download.
- **`about.html` — No CTA banner** — The about page ends without any CTA section. While less critical, users who reach about.html directly from search engines and want to try Phlix have no inline prompt to navigate to download. This is a missed funnel touchpoint (about → download = 2 clicks via nav).

## ❌ Failures (must fix this round)

- **None** — All 8 checklist items pass. No blockers.

## Recommendations (ranked by impact)

1. **HIGH — Fix `download.html` bottom CTA banner** (`download.html:224`): Change `.btn-secondary.btn-large` to `.btn-primary.btn-large` with a primary action label. The docs link should remain in the nav or as a tertiary text link. This page is the funnel goal — its bottom CTA must drive the primary action.
2. **MEDIUM — Add CTA banner to `about.html`**: Add a `.cta-banner` section before the footer with a single primary "Download Phlix" button, mirroring the pattern used on features, clients, hub, and plugins pages.
3. **LOW — Audit `download.html` client card button hierarchy**: Consider downgrading some secondary client cards (e.g. DLNA "Learn more") to `.btn-secondary` to increase visual distinction between primary and secondary download options on the download page itself.

## Evidence

- **Color tokens** confirmed from `css/base.css:61–74`:
  - `--color-secondary: #f2b705` (Sunburst Yellow, primary CTA)
  - `--color-primary: #00afaf` (Teal, secondary CTA border)
  - `--color-bg: #111008` (Charcoal, page background)
- **Primary CTA contrast** (manual WCAG relative luminance):
  - L(#F2B705) = 0.2126×(242/255)^2.4 + 0.7152×(183/255)^2.4 + 0.0722×(5/255)^2.4 ≈ 0.588
  - L(#111008) = 0.0023
  - Ratio = (0.588 + 0.05) / (0.0023 + 0.05) ≈ 10.4:1 — passes ≥3:1
- **Secondary CTA contrast**: L(#00AFAF) ≈ 0.166; ratio against #111008 ≈ 4.6:1 — passes ≥3:1
- **Hero CTA** in `index.html:386`: `<a href="download.html" class="btn btn-primary btn-large">Get Phlix</a>` — above fold, 1 click to download.
- **Nav** in `index.html:109`: `<li><a href="download.html">Download</a></li>` — visible in header.
- **CTA banners on features, clients, hub, plugins** all use `.btn-primary btn-large` pointing to `download.html`.
- **No modals/forms/audio** found by text search across all 8 HTML files.
- **Button class definitions** from `css/components.css:246–282`:
  - `.btn-primary`: `background: var(--color-secondary)` + `color: var(--color-bg)` + yellow glow shadow
  - `.btn-secondary`: `background: transparent` + `color: var(--color-primary)` + `border: 1px solid var(--color-primary)`
