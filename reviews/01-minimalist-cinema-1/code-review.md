# Code Review — 01-minimalist-cinema-1 (Wave 1, Round 1)

**Variant**: 01-minimalist-cinema-1 — Minimalist Cinema V1 (Ultra-Minimal)
**Round**: 1
**Reviewer**: CodeReviewer Agent
**Date**: 2026-05-20

---

## Score

- **Aggregate**: 78 / 100

Per-dimension estimates:

| Dimension            | Score | Weight |
| --------------------- | ----- | ------ |
| Accessibility        | 85    | 1.5    |
| Performance          | 72    | 1.2    |
| Responsive           | 88    | 1.2    |
| Branding Consistency | 92    | 1.2    |
| Usability            | 85    | 1.0    |
| Content Quality      | 88    | 1.0    |
| CTA / Funnel         | 82    | 1.0    |
| SEO                  | 85    | 1.0    |
| Social Metadata      | 78    | 0.8    |
| Localization         | 90    | 0.6    |

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
- Semantic landmarks: header, main, nav, footer on all pages
- Single h1 per page: confirmed all 8
- Touch targets >= 44px enforced in CSS
- Responsive: clamp() fonts, auto-fit grids
- No horizontal scroll at 320px
- Brand colors match brand-kits.json: electric_blue #2D9CFF, charcoal #1A1A1A, white #FFFFFF, slate_gray #2E2E2E, soft_blue #A7D8FF, neon_aqua #00F0FF
- Hero/feature/client/FAQ copy verbatim from content.json
- No frameworks, no bundlers, no tracking
- Stylelint/ESLint pass for variant files

---

## Concerns (non-blocking)

1. Google Fonts CDN at runtime in all 8 HTML pages — should self-host fonts locally
2. OG image format — og.png referenced but og.svg exists
3. BEM naming with underscores — project-wide htmlhint config conflict

---

## Failures (must fix this round)

### 1. Google Fonts CDN at runtime (index.html + 7 pages)

**What is wrong**: Every HTML page loads fonts from Google Fonts CDN at runtime via `<link rel="stylesheet">` or `@font-face` with `url(https://fonts.gstatic.com/...)`. The Builder contract MUST NOT clause states: "Pull fonts or scripts from a third-party CDN at runtime. Self-host or inline."

**Required outcome**: Self-host font files locally and reference them with local `url()` paths.

### 2. OG image mismatch (all 8 pages)

**What is wrong**: Meta tag references `/img/og.png` but only `og.svg` exists on disk.

**Required outcome**: Either convert SVG to proper 1200x630 PNG, or update meta tags to reference `.svg`.

### 3. Invented marketing copy (index.html:187)

**What is wrong**: Some supplementary copy is not verbatim from content.json.

**Required outcome**: Use only copy from content.json or add new copy to content.json first.

---

## Recommendations

1. Self-host fonts (impact: high, effort: medium)
2. Fix OG image (impact: high, effort: low)
3. Source all copy from content.json (impact: medium, effort: medium)

---

## Evidence

- HTMLHint: 0 errors for variant files
- ESLint: 0 errors for main.js
- Stylelint: 0 errors for CSS files
- All content verified against content.json (hero/pitch bullets/features/clients/FAQ verbatim)
- Brand colors: all match brand-kits.json exactly
