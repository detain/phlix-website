# REVIEW_ROUND_1 — Soundwave Studio Brand-Kit Site

## Summary

Review of built site at `/home/sites/phlix/phlix-website/sites/soundwave-studio/` against:
- Brand kit: `soundwave-studio.js`
- Site spec: `new_site.md`
- Content: `shared/content.json`

---

## Dimension Scores

| Dimension | Score | Severity | Key Issues |
|-----------|-------|----------|------------|
| **1. Brand fidelity & spirit** | **72/100** | ⚠️ | Google Fonts CDN violation (critical), logo wordmark mismatch |
| **2. SEO** | **89/100** | ✅ | Minor heading hierarchy issues on feature pages |
| **3. Readability** | **88/100** | ✅ | Minor line length at narrow card widths |
| **4. Spelling & Grammar** | **100/100** | ✅ | No issues found |

---

## Critical Issues Requiring Fixes

### 1. CDN Font Dependencies (BLOCKER)

**Files affected:** `base.css:8`, all 8 HTML files (`index.html:32-33`, `features.html:32-33`, etc.)

The spec (new_site.md §1) explicitly prohibits Google Fonts CDN:
> "No CDN dependencies in the deployed page (no Google Fonts `<link>` to `fonts.googleapis.com`, no script CDNs). Self-host fonts as WOFF2."

The spec (new_site.md §13) also states:
> "Fonts self-hosted WOFF2 with `font-display: swap`."

**Impact:** This is a spec regression — the spec explicitly notes "CDN font links are an explicit, previously-fixed regression — do not reintroduce them."

**Fix required:** Download Rajdhani, Share Tech Mono, and Inter as WOFF2, place in `css/fonts/`, declare with `@font-face` + `font-display: swap` in `base.css`, remove all Google Fonts `<link>` tags from HTML and the `@import` from CSS.

---

### 2. Logo Wordmark Says "Soundwave Studio" Not "Phlix"

**Files affected:** All 8 HTML files (e.g., `index.html:70`)

The nav logo shows "Soundwave Studio" as the wordmark, but this is the brand-kit name, not the product name. The product is "Phlix."

**Fix required:** Change `<span class="nav-logo-name">Soundwave Studio</span>` to `<span class="nav-logo-name">Phlix</span>` on all pages.

---

## Minor Issues (Recommended Fixes)

1. **Nav logo tagline** — "Phlix Brand Kit" is visible in the nav. Consider removing or replacing with the kit's `tagline_primary: "Every Session. Perfectly Captured."`

2. **Heading hierarchy on features page** — `.feature-detail h2` should arguably be `h3` since they are children of a section with `h2` heading. Currently they are heading-siblings, not heading-children.

3. **Feature card line length** — At narrow widths (280px cards), line length is ~53ch, below the ideal 60-75ch. Consider increasing card `minmax` to 300px+.

---

## What Was Done Well

- **CSS design tokens** — All CSS custom properties correctly map to the kit's `design_tokens` with exact hex values
- **Color system** — Dark studio charcoal background, waveform green primary, VU amber secondary, all correct and restrained per brand rules
- **Typography** — Rajdhani for headlines, Share Tech Mono for display/data, Inter for body, all weights and tracking per spec
- **Buttons** — All 4 variants (primary, secondary, danger, ghost) match kit's `buttons` spec exactly
- **Cards** — Sharp corners (4px), border #2D2D3A, background #1E1E26, hover left-border accent in waveform green
- **Motion** — Correct `cubic-bezier(0.4, 0, 0.2, 1)` easing, 150-200ms transitions, VU pulse animation, `prefers-reduced-motion` honored
- **Brand opposites avoided** — No pastel, no rounded corners, no warm tones, no playful language
- **Voice** — Technical, direct, no buzzwords, studio vocabulary used correctly
- **SEO** — Title, meta, canonical, JSON-LD, sitemap, robots.txt all correct
- **Content accuracy** — Every piece of content from `content.json` is present verbatim
- **No typos** — Zero spelling errors
- **No banned words** — "awesome", "amazing", "seamless", "leverage", etc. not found anywhere

---

## Overall Assessment

The site demonstrates strong brand identity implementation in colors, typography, components, and voice. The critical blocker is the CDN font dependency which violates the spec and must be fixed before the site can pass review. Once that and the logo wordmark issue are corrected, the site will be in good shape for the brand kit it represents — it genuinely feels like the Soundwave Studio brand rather than a generic template.
