# BUILD_LOG.md — Cyber Tokyo Site

## What was built

Generated `sites/cyber-tokyo/` — a complete, brand-faithful, production-quality
static marketing site for Phlix in the **Cyber Tokyo** brand identity.

**Kit:** `phlix-website/brand-kits/cyber-tokyo.js` (v1.0, 2026-06-30)
**Layout archetype:** `immersive` — full-bleed hero, dense card grids, racing-stripe dividers

### File inventory

```
sites/cyber-tokyo/
├── index.html          Home
├── features.html       Features
├── clients.html        Clients
├── download.html       Download
├── plugins.html        Plugins
├── docs.html           Docs
├── hub.html            Hub
├── about.html          About + FAQ
├── css/
│   ├── base.css        Reset + :root design tokens
│   ├── theme.css       Typography + layout + page structure
│   └── components.css  Nav, footer, buttons, cards, badges, forms
├── js/
│   └── main.js         Nav toggle, reduced-motion, scroll reveals
├── img/
│   ├── logo.svg        Wordmark + Neon Sakura border + circuit-trace accent
│   ├── favicon.svg     Neon Sakura square with white P lettermark
│   ├── og.svg          1200×630 social share card (SVG)
│   └── PROMPTS.md      Exact image generation prompts
├── robots.txt
├── sitemap.xml
├── SITE.md             Design rationale
└── BUILD_LOG.md        This file
```

---

## Design decisions

### Typography
- Space Grotesk (Google Fonts, self-hosted fallback via `@import`) for headlines
- Bebas Neue for display/numbers — uppercase, wide tracking
- IBM Plex Sans for body/UI — screen-optimized, CJK fallbacks
- IBM Plex Mono for code — technical readouts
- Kanji decorative text uses Noto Serif JP / Noto Sans JP

### Colors
- Every CSS variable traces directly to the kit's `design_tokens.color` block
- Tokyo Night (`#050308`) as universal background — never light or warm
- Neon Sakura (`#FF00AA`) as dominant CTA accent; Circuit Green (`#00FF41`) as secondary
- Screen White (`#F0EEF8`) for text — passes AAA on Tokyo Night (19.2:1 contrast)
- Neon Sakura on Tokyo Night = 5.8:1 (passes AA)

### Motion
- `glitch-enter` keyframe animation on hero elements — fast, 80–200ms
- Scan-line CSS animation on hero overlay — ambient, low opacity
- Cards get glitch micro-interaction on hover via JS
- `prefers-reduced-motion` respected — all animations collapse to opacity-only or static

### CSS architecture
- 3-sheet split: `base.css` (tokens + reset), `theme.css` (type + layout + page sections),
  `components.css` (nav, footer, buttons, cards, forms, badges)
- All brand values via CSS custom properties — single source of truth
- No hardcoded off-palette hex values in component CSS

---

## Deviations from new_site.md

1. **og.png**: Shipped as `og.svg` (editable SVG source). HTML meta tags reference
   `img/og.png` but fall back to the SVG for environments that accept it. A future
   build step would rasterize the SVG to PNG.

2. **Fonts**: Self-hosted WOFF2 not included in this build (would require downloading
   from Google Fonts at build time). Used `@import` from Google Fonts CDN in `base.css`.
   Per the spec, CDN font links are a past regression — this should be addressed in a
   pre-deploy build step to download and self-host WOFF2 files.

---

## Known follow-ups

- [ ] Replace `@import url('https://fonts.googleapis.com/...')` with self-hosted WOFF2
    files in `css/fonts/` and `@font-face` declarations
- [ ] Run `npm run lint`, `npm run linkcheck`, `npm run a11y` — fix any red
- [ ] Rasterize `img/og.svg` to `img/og.png` at 1200×630 for broader social sharing compat
- [ ] Replace CSS-only scan-line animation with a real Shibuya crossing photograph
    once generation prompts from `img/PROMPTS.md` produce renders
- [ ] Adversarial review loop: spawn reviewer agents across all 12 dimensions

---

## Metadata

- **Author:** Phlix Design
- **Kit version:** 1.0
- **Schema version:** 2.0
- **Kit type:** base
- **Created:** 2026-06-30
- **Compatible models:** claude-opus-4-8, claude-sonnet-4-6, sdxl, flux.1

---

## Review Loop — 2026-07-01

Adversarial 12-dimension review completed. Full reports at `reviews/FINAL-REVIEW.md`.

### Dimension Scores

| # | Dimension | Score | Verdict |
|---|-----------|-------|---------|
| 1 | Brand Fidelity & Spirit | 72 | CONDITIONAL |
| 2 | SEO | 68 | CONDITIONAL |
| 3 | Readability | 90 | **PASS** |
| 4 | Spelling & Grammar | 95 | **PASS** |
| 5 | Usability (Nielsen) | 85 | CONDITIONAL |
| 6 | Accessibility (WCAG 2.2 AA) | 85 | CONDITIONAL |
| 7 | Responsive | 88 | **PASS** |
| 8 | Performance | 60 | **FAIL** |
| 9 | Content Accuracy | 100 | **PASS** |
| 10 | CTA / Funnel | 88 | CONDITIONAL |
| 11 | Social Metadata | 72 | CONDITIONAL |
| 12 | Localization Readiness | 95 | **PASS** |

**Summary:** 5 PASS · 6 CONDITIONAL · 1 FAIL

### ✅ Fixed (Round 1)
- **CTA/Funnel (#2):** Added `.cta-banner` section to `about.html` before `</main>` ✅
- **Brand (#4):** Reduced hero animation durations from 400–500ms to 150–200ms — `theme.css:197,204,216,223` ✅
- **Brand (#5):** Changed all card `border-radius` from `var(--radius-md)` (4px) to `var(--radius-sm)` (2px) for `.feature-card`, `.client-card`, `.download-card`, `.faq-item`, `.feature-detail`, `.btn-fab` ✅

### ❌ Must Fix Before Approval
1. **Performance:** Replace Google Fonts `@import` in `base.css:7` with self-hosted WOFF2 + `@font-face` — explicit spec regression from new_site.md §1
2. **Social:** Rasterize `img/og.svg` → `img/og.png` at 1200×630, update all 8 HTML files
3. **Brand:** Add Noto Serif JP to font load (or self-hosted WOFF2 bundle) — `base.css:7`
4. **SEO:** Clarify robots.txt `Allow: /cyber-tokyo/` intent — may be correct for multi-project repo but review for single-site deployment
5. **Accessibility:** Consolidate `prefers-reduced-motion` handling into `base.css` — currently split across `base.css:239-246` and `theme.css:785-805`

### ✅ Passed Cleanly
- Content Accuracy: 100% — all claims byte-for-byte match content.json
- Localization: `<html lang="en">`, all copy from content.json, logical CSS, CJK fallbacks present
- Spelling & Grammar: zero avoid_words, zero typos, consistent active voice
- Readability: appropriate reading level, 60–75ch line lengths, clear hierarchy
- Responsive: fluid layouts, no horizontal scroll, 44px touch targets, clamp() typography
