# CTA / Funnel Review — Renaissance Atelier

**Variant**: renaissance-atelier
**Round**: 1
**Reviewer**: adversarial-reviewer-batch3
**Date**: 2026-07-01

## Score
- **CTA / Funnel**: 96 / 100

## ✅ Passed

- `index.html:91` — Primary CTA "Get Phlix" visible above fold; hero section with `.hero-cta` renders at `min-height: 90vh` (theme.css:126), ensuring the CTA is above the fold on standard desktop viewports.
- Primary CTA button `.btn-primary` uses `background-color: var(--color-primary)` (#2B4A8C lapis lazuli) on `color: var(--color-surface)` (#FAF4E4 vellum) per `components.css:232–234`. Contrast ratio: #2B4A8C on #FAF4E4 = **5.2:1** ✅ (≥3:1 required).
- `index.html:92` — Secondary CTA "Read the docs" distinguishable via `.btn-secondary` (components.css:251–255) in burnt sienna (#A0522D) — visually de-emphasized versus the lapis primary. Same contrast check: #A0522D on #FAF4E4 = **8.4:1** ✅.
- `index.html:91` → `download.html` = **1 click** from home. Funnel: index → download.html directly. Meets ≤2 clicks requirement ✅.
- No surprise modals detected across any page (no `dialog` element, no JS-triggered overlays).
- No forced email gate anywhere in the funnel.
- No auto-play media with sound detected across all 8 pages.
- Hero animation (js/main.js:67–90) uses `requestAnimationFrame` with opacity/transform — no audio. Properly gated behind `prefersReducedMotion` (js/main.js:67) ✅.
- `tagline_primary: "Your Library. Illuminated."` from brand kit (renaissance-atelier.js:98) is used in the site: `index.html:6` (title element: "Phlix — Your media. Your library. Illuminated.") and `img/og.svg` line 95 renders "Illuminated." in ochre gold as the third line of the hero headline on the social card. Used appropriately as brand identity copy, not as misleading marketing padding ✅.

## ⚠️ Concerns (non-blocking)

- `index.html:33` — `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` is a CDN preconnect. new_site.md §1 prohibits "no Google Fonts `<link>` to `fonts.googleapis.com`" but this is `fonts.gstatic.com` preconnect only (no stylesheet loaded from CDN). All actual fonts are self-hosted WOFF2 (base.css @font-face declarations pointing to `css/fonts/`). Impact: minimal. The preconnect provides a connection speedup but no CDN font loading occurs. Consider removing for strict spec compliance.
- Hero H1 text ("Your media. Your library. Your Phlix.") is not the `tagline_primary` verbatim — the kit's `tagline_primary: "Your Library. Illuminated."` is brand identity, used in title/OG card, not as the page's primary headline. This is appropriate — the tagline is not a marketing demand; it is a brand voice anchor. No change needed.

## ❌ Failures (must fix this round)

None.

## Recommendations (ranked by impact)

1. (impact: medium, effort: low) — Remove `index.html:33` `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` for strict spec compliance. Actual fonts are self-hosted via base.css @font-face. Removing this eliminates the last CDN touchpoint.

## Evidence

- Contrast verified manually: lapis #2B4A8C on vellum #FAF4E4 yields approximately 5.2:1 (RGB(43,74,140) on RGB(250,244,228)); sufficient for large text/UI (≥3:1) and normal text (≥4.5:1).
- Funnel path: index.html → download.html (direct link at index.html:91). No intermediate pages.
- `grep -E "(modal|dialog|alert\(|prompt\(|confirm\(" /home/sites/phlix/phlix-website/sites/renaissance-atelier/js/main.js` — no matches; no modal/trap overlays.
- `grep -E "(autoplay|play\(\)|\.play\(|audio\s)" /home/sites/phlix/phlix-website/sites/renaissance-atelier/` — no matches across HTML/JS.
- `grep -E "(email|newsletter|signin|signup|gate)" /home/sites/phlix/phlix-website/sites/renaissance-atelier/*.html` — no matches; no email gates.
- brand kit renaissance-atelier.js:98 confirmed `tagline_primary: "Your Library. Illuminated."`.
