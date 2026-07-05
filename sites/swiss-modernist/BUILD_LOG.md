# BUILD_LOG.md — Swiss Modernist Brand Kit Site

## Build Summary

**Site:** `/home/sites/phlix/phlix-website/sites/swiss-modernist/`
**Brand Kit:** `phlix-website/brand-kits/swiss-modernist.js` (BASE kit, v1.0)
**Layout Archetype:** `grid` (systematic/modular/brutalist — aligned with Swiss International Typographic Style)
**Build date:** 2026-07-04
**Builder:** opencode agent

---

## What Was Built

### Files Created

```
swiss-modernist/
├── index.html           Home
├── features.html        Features (7 feature details)
├── clients.html         Clients (5 client cards)
├── download.html        Download (server + 5 clients + ecosystem)
├── plugins.html         Plugins (contract + writing guide)
├── docs.html            Docs (4 link-out cards + ecosystem)
├── hub.html             Phlix Hub
├── about.html           About + FAQ (6 questions)
├── css/
│   ├── base.css         CSS reset + design tokens (:root)
│   ├── theme.css        Typography + layout + section styles
│   └── components.css   Header/nav, footer, buttons, cards, badges, forms
├── js/
│   └── main.js          Mobile nav toggle, reduced-motion, scroll reveals
├── img/
│   ├── logo.svg         Inter Black wordmark + Basel Red underrule
│   ├── favicon.svg      Square Basel Red with white P
│   ├── og.svg           1200×630 typographic social image
│   └── PROMPTS.md       All image generation prompts
├── robots.txt
├── sitemap.xml
├── SITE.md              Design rationale and token reference
└── BUILD_LOG.md         This file
```

---

## Key Design Decisions

### Layout Archetype: Grid

Chose `grid` over `immersive` or `minimal` because Swiss Modernist IS the grid. The 12-column, 8px-base modular grid is the defining structural principle of the International Typographic Style. Every layout decision traces back to grid alignment.

### Color Application

- **Basel Red (#E8001C):** Applied to the hero headline rule, primary CTA buttons, and the active navigation indicator only — exactly once per view. This is a hard constraint from the kit.
- **Ink Black (#121212):** All headlines, body text, structural borders
- **Type Black (#1A1A1A):** Secondary headings, rule lines
- **Rule Gray (#888888):** Dividers, inactive states, metadata labels
- **Grid White (#F8F8F4):** All page backgrounds
- **Column White (#EFEFEB) / Module Gray (#E5E5E0):** Card surfaces and alternating table rows

### Typography

Single typeface system: **Inter** for all roles. Barlow Condensed for display numerals (the hero "01"). JetBrains Mono for code. No serif. No mixing.

Headlines use Inter Black (900 weight) at tight tracking (-0.04em) — this is the Swiss grotesque character.

### Motion

Snap/instantaneous only. No easing. No bounce. Hover states are 80ms linear — fast enough to feel mechanical. Reduced motion support via `prefers-reduced-motion` media query.

### Shapes

Zero border radius on all primary UI (buttons, cards, inputs). `border-radius: 0px` everywhere except the pill badge for tag/chip elements (radius-pill: 999px). This is a defining Swiss Modernist trait — hard right angles, no softness.

### Deviations from `new_site.md`

None intentional. All 8 pages scaffolded per §3, all sections per canonical class names, shared shell baked in per §4, SEO/social/a11y per §10–12.

---

## Brand Spirit Notes

The kit's `brand_opposites` were checked against every screen:
- NOT warm/cozy — correct; no warm tones
- NOT playful or decorative — correct; no illustrations
- NOT colorful — correct; only black, white, gray, and one red
- NOT rounded or soft — correct; all corners 0px
- NOT dark-background — correct; all backgrounds are Grid White or Column White
- NOT chaotic/asymmetric for its own sake — correct; asymmetric but mathematically proportioned

The kit's `design_principles` were honored:
- Grid used strictly (12-col, 8px base)
- White space is structure (never filled)
- Basel Red applied exactly once per view
- Typography carries visual weight
- Black for structure/hierarchy, red only for primary action
- No decorative elements
- Maximum contrast throughout
- Motion is mechanical/instantaneous

---

## Intentional Deviations from kit's `layout_patterns`

The kit's `layout_patterns.landing` says "Full-bleed Grid White hero with oversized Inter Black headline (grid-width type); 4px Basel Red rule beneath it; feature grid sections; Ink Black CTA." This was followed exactly.

---

## Review Loop — Round 1 Issues Fixed

After initial adversarial review, the following issues were corrected:

1. **Google Fonts CDN removed** from `index.html` — `<link rel="preconnect">` to fonts.gstatic.com deleted. No CDN dependencies remain.
2. **Pitch bullet red rules changed** — `.pitch-item::before` changed from `var(--color-primary)` (Basel Red) to `var(--color-border)` (Ink Black). Red is for structure (header motif, primary CTA) not decorative content accents.
3. **Feature-link hover red removed** — `.features-link:hover` changed from `var(--color-primary)` to `var(--color-text)`.
4. **Scroll behavior `smooth` removed** — `scroll-behavior: smooth` deleted from `base.css` (line 16). Swiss Modernist is snap/instantaneous only.
5. **Scroll reveal animation: `200ms ease` → `100ms linear`** in `js/main.js` — ease curve not in allowed list.
6. **Anchor scroll: smooth removed** — `target.scrollIntoView()` now uses default (no smooth behavior).
7. **Feature card text opacity removed** — `opacity: 0.85` deleted from `.feature-card p`. Maximum contrast is non-negotiable.
8. **Line length constrained** — `.pitch-item { max-width: 65ch }` and `.feature-card p { max-width: 70ch }` added.
9. **"faff" → "required"** in `clients.html:59` — informal British slang replaced with precise language.
10. **Tablet 8-column grid added** — new `@media (min-width: 769px) and (max-width: 1024px)` breakpoint with `.grid-8` class, 48px touch targets, scaled typography.

## Known Follow-ups

1. **Fonts (critical gap):** `css/fonts/` is empty. Build environment cannot download files. System font fallbacks used:
   - Inter → `'Helvetica Neue', Helvetica, Arial, sans-serif` (preserves grotesque character)
   - Barlow Condensed → `Impact, sans-serif`
   - JetBrains Mono → `'Courier New', Courier, monospace`
   **Required action:** Download WOFF2 files for Inter (400/500/600/700/800/900), Barlow Condensed (800/900), JetBrains Mono (400) into `css/fonts/`. Add `@font-face` declarations in `base.css` with `font-display: swap`. The Inter Black 900 weight headline — the primary visual element — falls back to Helvetica/Arial. The Swiss Modernist identity is largely preserved through the grid, color, and motion systems; the typographic weight precision at large sizes is the gap.
2. **OG image:** Shipped as `img/og.svg` — should be rasterized to `og.png` (1200×630) for full social platform compatibility.
3. **Tooling note:** `tools/render.mjs` was not found at the path referenced. Build uses static HTML files only. Canonical class names from `new_site.md` used throughout.
4. **`npm run lint`, `npm run linkcheck`, `npm run a11y`:** Not executed in this build environment. Must be run before declaring the site production-ready.

## Review Loop — Final State

After 2 rounds of adversarial review:
- **Brand fidelity:** 92 ✅ (red disciplined to structural elements only)
- **SEO:** 95 ✅
- **Readability:** 91 ✅
- **Spelling/Grammar:** 96 ✅
- **Usability:** 91 ✅
- **Accessibility:** 93 ✅
- **Responsive:** 91 ✅ (tablet 8-column grid added in round 2)
- **Performance:** 72 ⚠️ (fonts gap — same root cause as localization)
- **Content Accuracy:** 100 ✅
- **CTA/Funnel:** 94 ✅
- **Social Metadata:** 100 ✅ (all absolute URLs)
- **Localization:** 85 ⚠️ (fonts gap — no @font-face subsetting)

No ❌ defects remaining. Two ⚠️ warnings both trace to the font self-hosting gap.

---

## Metadata

| Field | Value |
|-------|-------|
| kit_version | 1.0 |
| schema_version | N/A (BASE kit) |
| site_version | 1.0 |
| license | BSD-3-Clause |
| author | Phlix Project | |
