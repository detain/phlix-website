# Code Review — 02-spotlight-projector-1 (Wave 1, Round 1)

**Variant**: 02-spotlight-projector-1 — Spotlight Projector V1 (Classic Cinematic)
**Round**: 1
**Reviewer**: CodeReviewer Agent
**Date**: 2026-05-20

---

## Score

- **Aggregate**: 85 / 100

> FAIL — Aggregate < 90 AND failures remain.

---

## Passed

- All 8 HTML pages present: index, features, clients, download, plugins, docs, hub, about
- CSS: base.css, theme.css, components.css — all present
- JS: main.js — vanilla JS, no frameworks
- All 4 image files present: logo.svg, og.svg, favicon.svg, PROMPTS.md
- VARIANT.md and BUILD_LOG.md present
- html lang=en on all 8 pages
- Skip link on all 8 pages
- prefers-reduced-motion handled in CSS
- Visible focus styles present
- Semantic landmarks on all pages
- Single h1 per page on all 8 pages
- Touch targets >= 44px
- No horizontal scroll
- Brand colors match brand-kits.json exactly: gold_spotlight #F5C542, deep_black #000000, warm_white #FFF7E6, burgundy #7A1F1F, soft_shadow_gray #3A3A3A, amber_glow #FFB84D
- All content verbatim from content.json
- No frameworks, no bundlers, no tracking
- HTML/CSS/JS lint: 0 errors for variant files

---

## Concerns (non-blocking)

1. Google Fonts CDN at runtime (index.html:34) — violates contract
2. Fonts only have local() fallbacks, not self-hosted woff2 files yet

---

## Failures (must fix this round)

### 1. Google Fonts CDN at runtime (index.html:34 + 7 pages)

**What is wrong**: All 8 HTML pages embed Google Fonts CDN URL in `<style>` blocks:
```html
<link rel='preconnect' href='https://fonts.gstatic.com' crossorigin>
<style>
  @font-face {
    font-family: 'Cinzel';
    src: local('Cinzel'), url(https://fonts.gstatic.com/s/cinzel/v31/...) format('woff2');
  }
```

Builder contract MUST NOT: "Pull fonts or scripts from a third-party CDN at runtime. Self-host or inline."

**Required outcome**: Remove Google Fonts URLs from all 8 pages. Self-host Cinzel Bold, Lora Regular, Source Sans Pro, Fira Code font files locally. Update @font-face src: url() to local paths.

---

## Recommendations

1. Self-host font files (impact: high, effort: medium)
2. Fonts currently use local() fallbacks — once self-hosted, remove CDN dependency entirely

---

## Evidence

- HTMLHint: 0 errors
- ESLint: 0 errors
- Stylelint: 0 errors
- Brand colors: all match brand-kits.json
- All content verified verbatim from content.json
