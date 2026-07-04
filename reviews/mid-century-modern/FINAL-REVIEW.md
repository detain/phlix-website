# FINAL-REVIEW.md — Mid-Century Modern Brand Kit Site

**Variant**: mid-century-modern
**Site path**: `sites/mid-century-modern/`
**Canonical URL**: `https://detain.github.io/phlix-website/sites/mid-century-modern/`
**Review round**: 1 (adversarial 12-dimension)
**Date**: 2026-07-01
**Layout archetype**: Editorial / Showcase
**Palette**: Atomic Teal `#00AFAF` / Sunburst Yellow `#F2B705` / Atomic Coral `#E8543C` on Charcoal Evening `#111008` / Ebony Wood `#1A1710` / Cream Card `#F5EFE8`
**Type**: Josefin Sans (headline/UI), Bebas Neue (display), Libre Baskerville (body), IBM Plex Mono (mono)

---

## Final Scores Per Dimension

| # | Dimension | Score | Failures | Exit? |
|---|-----------|-------|----------|-------|
| 1 | Brand Fidelity & Spirit | **86** | 4 ❌ | NO |
| 2 | SEO | **100** | 0 | YES |
| 3 | Readability | **71** | 5 ❌ | NO |
| 4 | Spelling & Grammar | **100** | 0 | YES |
| 5 | Usability | **87** | 0 | YES |
| 6 | Accessibility | **70** | 1 ❌ | NO |
| 7 | Responsive | **64** | 3 ❌ | NO |
| 8 | Performance | **93** | 0 | YES |
| 9 | Content Accuracy | **100** | 0 | YES |
| 10 | CTA / Funnel | **76** | 0 | YES |
| 11 | Social Metadata | **72** | 2 ❌ | NO |
| 12 | Localization | **78** | 0 | YES |

**Weighted aggregate**: (86×1.2 + 100×1.0 + 71×1.0 + 100×1.0 + 87×1.0 + 70×1.5 + 64×1.2 + 93×1.2 + 100×1.0 + 76×1.0 + 72×0.8 + 78×0.6) / (1.2+1.0+1.0+1.0+1.0+1.5+1.2+1.2+1.0+1.0+0.8+0.6) = **81/100**

**Review status**: ❌ INCOMPLETE — 5 dimensions have remaining ❌ failures; site cannot exit the review loop.

---

## ❌ Blocking Failures (must fix before next round)

### Brand Fidelity (score: 86/100 — 4 failures)

1. **`theme.css` — Missing `--font-number` token** (`index.html:164` / `theme.css:91–98`)
   - `--font-number` is never defined in `:root`; `.number-xl` references `var(--font-number)` which resolves to nothing
   - Fix: Add `--font-number: var(--font-display)` to `base.css :root`

2. **`index.html:164` — Static sunburst clock emblem, no rotation animation**
   - Kit's `header_motif` specifies "Slow mechanical rotation of a sunburst clock emblem" — currently an entirely static SVG
   - Fix: Add `@keyframes rotate` and `.sunburst-emblem { animation: rotate 60s linear infinite; }` — or remove the static emblem and use CSS-only mechanical rotation with `prefers-reduced-motion` guard

3. **`components.css:93–101` — Active nav uses bottom border, not left 3px bar**
   - Kit spec: "3px left atomic-teal active indicator bar"; current implementation uses `bottom: -1px` border
   - Fix: Replace bottom `::after` with left-border: `top: 50%; left: 0; transform: translateY(-50%); width: 3px; height: 60%`

4. **`base.css:168–170` — Skip-link focus ring uses yellow instead of teal**
   - Kit spec: "2px atomic-teal focus ring with 2px charcoal-evening offset + 4px teal outer glow"
   - Current: `outline: 2px solid var(--color-secondary)` (yellow)
   - Fix: `outline-color: var(--color-focus)` + `box-shadow: 0 0 0 4px rgb(0, 175, 175, 0.18)`

### Readability (score: 71/100 — 5 failures)

All failures are the same root cause: `color: var(--color-neutral)` (`#8C7B6A`) on `background: var(--color-surface)` (`#1A1710`) yields **4.39:1**, below the 4.5:1 AA minimum.

| File | Selector | Location | Font size |
|------|----------|----------|-----------|
| index.html | `.feature-card p` | 437 | 15px |
| features.html | `.feature-detail-text p` | — | 16px |
| about.html | `.faq-item dd` | — | 15px |
| clients.html | `.client-tagline` | — | 15px |
| download.html | `.download-card p` | — | 14px |

Fix: Change `color: var(--color-neutral)` to `color: var(--color-text)` on all five selectors in `components.css`. This raises contrast to **15.67:1**.

### Accessibility (score: 70/100 — 1 failure)

1. **`components.css:76` — Nav menu link text contrast 3.57:1 (fails AA)**
   - `.nav-menu a` uses `opacity: 0.75`, reducing Cream `#F5EFE8` to effective luminance 0.585
   - On Charcoal `#111008` background: **3.57:1** — below 4.5:1
   - Fix: Remove `opacity: 0.75`; instead use `color: var(--color-neutral)` for inactive nav links (maintains 4.68:1 on Charcoal) with `opacity: 1` default

### Responsive (score: 64/100 — 3 failures)

1. **Font sizes below readable floor** — `.client-status` at **11px** (`components.css:507`), `.ui-label-sm` / `.hero-eyebrow` / `.footer-copy` at **12px** (`base.css:76`, `theme.css:226`, `components.css:211`), `.body-sm` at **14px** (`theme.css:61`)
   - Kit mobile guidance: "text never drops below ~16px on phones"
   - WCAG AA minimum for normal text: 14px
   - Fix: Raise all below-14px values to 14px minimum; use `clamp()` for fluid scaling

2. **No bottom tab bar per kit mobile spec**
   - Kit `responsive_behavior.mobile`: "bottom tab bar on ebony-wood"
   - Current: only sticky header nav + hamburger at 900px
   - Fix: Add fixed-bottom `<nav class="nav-bottom">` with Home/Features/Download/About links; hide on desktop via `@media (width >= 768px)`

3. **Nav breakpoint at 900px instead of 768px** (`components.css:104`)
   - Content collapses to single column at 768px; nav doesn't collapse until 900px
   - Creates layout inconsistency on tablet (768–899px)
   - Fix: Change `(width <= 900px)` to `(width <= 768px)` in the nav media query

### Social Metadata (score: 72/100 — 2 failures)

1. **Missing `manifest.webmanifest`** — rubric requires 16, 32, 180 (apple), 192, 512 favicon variants plus `manifest.webmanifest`
   - Current: only `img/favicon.svg`
   - Fix: Add `manifest.webmanifest` with icons array and `og.svg` with explicit `width`/`height`

2. **Favicon only SVG** — no PNG multi-size variants
   - Fix: Provide required PNG sizes or document as intentional limitation (SVG favicon is valid, but rubric requires PNG variants)

---

## ✅ Passed Dimensions

- **SEO (100/100)**: All 8 pages — titles ≤60 chars, descriptions ≤160 chars, exact 1 H1, absolute canonical URLs, valid JSON-LD on home, complete sitemap.xml and robots.txt, descriptive anchor text, semantic landmarks
- **Spelling & Grammar (100/100)**: Zero typos, zero avoid_words, consistent mid-century documentary narrator voice
- **Usability (87/100)**: Nielsen heuristics met; download reachable in 1 click from home; mobile menu Escape/click-outside/focus return all correct; scroll-reveal properly gated by `prefers-reduced-motion`
- **Performance (93/100)**: No CDN dependencies; fonts use system stacks; JS deferred; hero is inline SVG; all images are tiny inline SVGs; `font-display: swap` via system fallbacks
- **Content Accuracy (100/100)**: All claims verified against content.json; FAQ verbatim; ecosystem list exact; no invented features; no unsupported clients mentioned
- **CTA/Funnel (76/100)**: Primary CTA above fold with ~10.4:1 contrast; ≤2 clicks to download; no modals/email gates/autoplay; yellow-only-primary correct
- **Localization (78/100)**: All 8 pages `<html lang="en">`; no locale-unsafe APIs; no `float: left/right` in CSS; strings centralized concern noted

---

## Concerns (non-blocking)

| Dim | Concern | Location | Suggested fix |
|-----|---------|----------|---------------|
| Brand | Hero title tracking 0.03em instead of 0.04em | theme.css:239 | Change to `--tracking-headline` |
| Brand | Circular bullet instead of brand teal dot | theme.css:316–325 | Replace inline SVG with `background: var(--color-primary); border-radius: 50%` |
| Brand | `.container-wide` at 1600px exceeds 1400px kit limit | theme.css:118–122 | Remove unused class or cap at 1400px |
| Brand | No self-hosted WOFF2 fonts | BUILD_LOG noted | Self-host Josefin Sans, Bebas Neue, Libre Baskerville, IBM Plex Mono |
| Usability | Inline `style` attributes on 5 CTA banners | index.html, hub.html, etc. | Replace with token CSS class |
| Usability | Download page links to GitHub repos, not release assets | download.html | Clarify or add actual download links |
| A11y | Focus ring outer halo teal instead of charcoal (spec deviation) | base.css:180 | Change to `rgb(17, 16, 8, 0.18)` |
| Responsive | No TV-mode 10-foot UI per kit spec | theme.css | Add `@media (min-width: 1920px)` block |
| CTA | about.html has no CTA banner | about.html | Add closing CTA banner |
| CTA | download.html bottom CTA uses secondary button for docs | download.html:224 | Consider primary CTA here since docs is a goal action |
| Social | `og.svg` lacks explicit `width`/`height` on root `<svg>` | img/og.svg | Add `width="1200" height="630"` attributes |
| L10n | Strings hardcoded in HTML, not centralized in content.json | all pages | As noted, acceptable for EN-only scope |
| L10n | Physical CSS properties (`left:`) in pitch bullet pseudo-elements | theme.css | Minor RTL concern; use logical properties if RTL ever needed |

---

## Fixes Applied (Round 1)

No fixes were applied in this round — this is the initial adversarial review. All findings are documented in:
- `reviews/mid-century-modern/01-brand-fidelity.md`
- `reviews/mid-century-modern/02-seo.md`
- `reviews/mid-century-modern/03-readability.md`
- `reviews/mid-century-modern/04-spelling-grammar.md`
- `reviews/mid-century-modern/05-usability.md`
- `reviews/mid-century-modern/06-accessibility.md`
- `reviews/mid-century-modern/07-responsive.md`
- `reviews/mid-century-modern/08-performance.md`
- `reviews/mid-century-modern/09-content-accuracy.md`
- `reviews/mid-century-modern/10-cta-funnel.md`
- `reviews/mid-century-modern/11-social-metadata.md`
- `reviews/mid-century-modern/12-localization.md`

---

## Exit Bar

The review loop may not exit until:
- **No ❌ failures remain** across all 12 dimensions
- **No dimension scores below 90**
- The site is re-reviewed after fixes are applied

**Current status**: ❌ NOT READY TO EXIT — 5 dimensions have ❌ failures (brand, readability, accessibility, responsive, social metadata). 7 dimensions score below 90.

**Next action**: Apply all ❌ fixes across brand fidelity (4), readability (1 root cause), accessibility (1), responsive (3), and social metadata (2). Re-run all failing dimensions in Round 2.
