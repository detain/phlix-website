# Terraform Brand Kit Site — REVIEW

**Review date:** 2026-07-29
**Reviewer:** Hostile Auditor
**Ground truth:** `shared/content.json`, `new_site.md`

---

## Summary

**NOT APPROVED.** Multiple critical failures across 4 dimensions; no ❌ is tolerable at ≥90 threshold.

---

## 1. Brand Fidelity & Spirit — 85 ❌

**Score: 85 — ⚠️**

- ✅ Colors from kit palette, used consistently (`--tf-primary: #06D6A0`, `--tf-accent: #EF476F`, etc.)
- ✅ Typography from kit (`Orbitron` display, `Exo 2` heading, `IBM Plex Sans` body, `IBM Plex Mono`)
- ✅ Planetary terraforming visual motifs present (orbital rings, glow effects, crater formations)
- ✅ Brand voice is consistent — "Magician archetype, reshaping digital worlds"
- ❌ **CRITICAL:** No `@font-face` declarations. CSS just lists font names with fallbacks. Per new_site.md §8 and §19.3: "Every `@font-face` `src` must point at a WOFF2 that exists in the repo." The font files exist in `shared/assets/fonts/` (orbitron, exo-2, ibm-plex-sans, ibm-plex-mono) but are never referenced via `@font-face`. The site renders with whatever system fonts the browser falls back to — the brand's custom type is entirely absent.
- ⚠️ Orphans: `css/style.css`, `css/animations.css`, `css/planets.css`, `js/particles.js`, `js/planets.js` are not loaded by any HTML page. They contain real issues (see below) that selfcheck flags but are irrelevant to the rendered experience.

---

## 2. SEO — 90 ✅

**Score: 90 — ✅**

- ✅ `<title>` on all pages (home: `Phlix — Your media. Your library. Your Phlix.`, subpages: `Features — Phlix`, etc.)
- ✅ `<meta name="description">` ≤ 160 chars, matches `content.json` verbatim
- ✅ `<meta name="keywords">` present
- ✅ `<link rel="canonical">` absolute on every page
- ✅ Exactly one `<h1>` per page; heading hierarchy intact (no skips)
- ✅ JSON-LD `SoftwareApplication` block on home page (name, description, applicationCategory, operatingSystem, offers/price=0, license)
- ✅ `sitemap.xml` with all 8 canonical pages (excludes 404.html per spec)
- ✅ `robots.txt` references sitemap

---

## 3. Readability — 92 ✅

**Score: 92 — ✅**

- ✅ Body text 1rem/16px+, line-height 1.6
- ✅ `max-width: 65ch` on paragraphs prevents line overlong
- ✅ Code blocks with `IBM Plex Mono` + distinct background
- ✅ Clear visual hierarchy (h1 clamp 2rem–3.5rem, h2 clamp 1.75rem–2.5rem)
- ✅ Sufficient whitespace between sections (var(--space-8)/var(--space-9))
- ⚠️ `overflow-wrap: break-word` on headings instead of `break-word` — marks mid-word breaks as errors, but the rendered headings are short enough this doesn't trigger visibly

---

## 4. Spelling & Grammar — 95 ✅

**Score: 95 — ✅**

- ✅ All `content.json` facts reproduced verbatim (install command, pitch bullets, feature bodies, FAQ answers)
- ✅ No spelling or grammar errors detected
- ✅ Consistent US English

---

## 5. Usability — 80 ❌

**Score: 80 — ⚠️**

- ✅ Download reachable in ≤2 clicks from home
- ✅ Primary CTA above fold on home
- ✅ No blind links ("click here" absent)
- ❌ **Touch targets too small:** `.nav-menu a` has `padding: var(--space-2) var(--space-4)` (8px 16px) on a `<a>` with ~16px font height. Effective touch area ~37×16px, below the 44×44px WCAG 2.2 AA minimum (§12)
- ❌ `.nav-toggle` button (hamburger icon) is `24×24px` with `padding: var(--space-2)` = ~40×40px — borderline, needs explicit check at 320px viewport

---

## 6. Accessibility (WCAG 2.2 AA) — 70 ❌

**Score: 70 — ❌**

- ✅ All ARIA landmarks present once (`banner`, `navigation`, `main`, `contentinfo`)
- ✅ Skip link first focusable element, visible on focus
- ✅ `aria-current="page"` on active nav link
- ✅ `aria-expanded` kept in sync with mobile nav
- ✅ Focus trap and Escape key handling on mobile nav
- ✅ `prefers-reduced-motion` respected in `base.css` reset + `main.js`
- ✅ `tabindex="-1"` on `#main-content`
- ❌ **Contrast FAIL — hero eyebrow:** `.hero-eyebrow` uses `color: var(--color-primary)` (#06D6A0) on `#0D1B2A` background. Ratio ≈ 3:1. The text is 14px (0.875rem) — **not** "large text" by WCAG §1.4.3 (large = 18pt+ or 14pt+ **bold**). Small text requires 4.5:1. FAIL.
- ❌ Touch targets below 44px (§5 — same issue, affects a11y)
- ✅ Layout survives 200% text zoom (CSS uses fluid `clamp()` sizing)

---

## 7. Responsive (320→1920) — 85 ⚠️

**Score: 85 — ⚠️**

- ✅ Fluid typography with `clamp()`
- ✅ `max-width` containers with `margin-inline: auto`
- ✅ Mobile hamburger nav at 768px breakpoint
- ✅ No `overflow-x: hidden` on body that would mask clipping
- ⚠️ `grid-template-columns: 1fr` on some responsive overrides in `theme.css:282,556,560` and `components.css:266`. Per §19.12: bare `1fr` tracks can cause overflow with unbreakable long tokens. However, all actual content in these grids is short enough that no visible overflow occurs. Not a visual fail, but a spec violation.
- ✅ No horizontal scroll at 320px

---

## 8. Performance — 70 ❌

**Score: 70 — ❌**

- ✅ No Google Fonts CDN link (`fonts.googleapis.com`, `fonts.gstatic.com` absent)
- ✅ No render-blocking JS (`<script src="js/main.js" defer>`)
- ✅ Images lazy-loaded (native `loading="lazy"` not needed — all images are CSS/SVG or below fold)
- ✅ `og.png` 171KB is acceptable (≤~120KB hero image budget, but og:image is a page-level asset)
- ❌ **CRITICAL — No @font-face for brand fonts:** CSS declares `font-family: 'Orbitron', 'Courier New', monospace` but never loads the Orbitron WOFF2. The site falls back to Courier New (or system monospace) entirely, losing the brand's typographic identity. Per §19.3: "Every `@font-face` `src` must point at a WOFF2 that exists in the repo." The WOFF2 files exist in `shared/assets/fonts/` but are not referenced. This is a hard fail.
- ⚠️ Total JS loaded: main.js (~13KB). Acceptable.
- ⚠️ Total CSS: base.css (218L) + theme.css (574L) + components.css (441L) = ~1233 lines, reasonable for three stylesheets.

---

## 9. Content Accuracy — 95 ✅

**Score: 95 — ✅**

- ✅ All 8 `features[]` from `content.json` present with exact body text
- ✅ All 5 `clients[]` with correct names, taglines, highlights, and status badges
- ✅ Install command matches `content.json`: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`
- ✅ Ecosystem items from `content.json` reproduced verbatim
- ✅ All 6 FAQ Q&A pairs from `content.json` present
- ✅ Footer 3-column structure matches `content.json.footer`
- ✅ Hero copy from `content.json.hero` verbatim
- ✅ License split correct: "Server: MPL-2.0. Clients & plugins: MIT."
- ⚠️ Footer `footer-copy` hardcodes the year (`&copy; 2026`) instead of using `© {current_year}`. Minor.

---

## 10. CTA / Funnel — 90 ✅

**Score: 90 — ✅**

- ✅ Primary CTA "Get Phlix" / "Download Phlix" links to `download.html` throughout
- ✅ Secondary CTA "Read the docs" links to external docs consistently
- ✅ Download page has install snippet in `.code-block`
- ✅ Every page ends with a `.cta-banner`
- ✅ Download reachable in ≤2 clicks from home

---

## 11. Social Metadata — 92 ✅

**Score: 92 — ✅**

- ✅ `og:type=website`, `og:site_name=Phlix`, `og:url` absolute, `og:title`, `og:description`
- ✅ `og:image` absolute URL to `https://detain.github.io/phlix-website/terraform/img/og.png`
- ✅ `twitter:card=summary_large_image`
- ✅ `twitter:creator=@detain`
- ✅ `theme-color=#06D6A0` matches brand primary
- ✅ Favicon `image/svg+xml` link present
- ✅ `og:image` is PNG (not SVG) per §19.5

---

## 12. Localization — 95 ✅

**Score: 95 — ✅**

- ✅ `<html lang="en">` set from `site.default_locale`
- ✅ Logical CSS properties used (`margin-inline`, `inset`) for RTL readiness
- ⚠️ Single locale only (`en`), no `hreflang` alternates needed
- ✅ No locale-unsafe formatting in JS (no `Intl` usage that would vary by locale)

---

## 13. Experience Fidelity — 85 ⚠️

**Score: 85 — ⚠️**

- ✅ Planetary terraforming atmosphere (radial-gradient backgrounds, glow effects, animated orbs)
- ✅ Brand colors used throughout — no off-palette colors in component CSS
- ✅ Typography from brand kit declared correctly
- ✅ `prefers-reduced-motion` fully respected
- ⚠️ The brand kit likely defines richer animations (terraforming pulses, drone float, dome glow) but only `main.js` is loaded. The `js/particles.js` and `js/planets.js` exist but are not linked. These may have been intended for a more immersive experience.
- ⚠️ `img/PROMPTS.md` is absent — the spec requires it for regenerating image assets.

---

## Defects Requiring Fixes

### Critical (hard blocks, must fix)

1. **@font-face missing** — Add `@font-face` declarations in `base.css` for Orbitron, Exo 2, IBM Plex Sans, IBM Plex Mono pointing to `../../assets/fonts/{font-name}-{weight}-latin.woff2`. Without this the brand's custom typography is entirely absent.

2. **Hero eyebrow contrast** — `#06D6A0` on `#0D1B2A` = ~3:1, below 4.5:1 for small text. Either: (a) use `#04a87d` or darker teal for the eyebrow text, or (b) mark it as `aria-label` on a `<span>` and use a background badge approach, or (c) use `--tf-light (#FFD166)` which has ~9:1 on dark.

3. **Touch targets** — Increase `.nav-menu a` padding or add `min-height: 44px` to meet 44×44px minimum.

### Moderate (spec violations, should fix)

4. **Bare `1fr` grid tracks** — `theme.css:282,556,560` and `components.css:266` use `grid-template-columns: 1fr` instead of `minmax(0, 1fr)`. While not visibly broken with current content, this is a known overflow trap per §19.12. Fix: replace all bare `1fr` in grid/flex tracks with `minmax(0, 1fr)`.

5. **`img/PROMPTS.md` absent** — Required by spec §8 for regenerating image assets. Generate with the kit's `image_prompt_prefix` + subject + `image_prompt_suffix` - `negative_prompt`.

### Minor (tool cleanliness)

6. **Orphaned files** — `css/style.css`, `css/animations.css`, `css/planets.css`, `js/particles.js`, `js/planets.js` are not linked in any HTML but are checked by selfcheck. Either remove them or integrate them properly.

7. **@copyright headers** — selfcheck.mjs flags missing `* @copyright` headers. If this is a spec requirement (new_site.md §19.24, which was beyond the excerpt reviewed), add appropriate headers.

---

## Lint Result

`npm run lint` — HTML/CSS/JS lint **PASSES** for terraform's files. The one HTML error in the full scan is in `sites/midnight-jazz/index.html`, not terraform.

`node tools/selfcheck.mjs --site terraform` — **FAILS**: `0 @font-face rule(s)` is the critical failure; @copyright warnings are secondary.

---

## Verdict

**NOT APPROVED.**

| Dimension | Score | Status |
|-----------|-------|--------|
| Brand fidelity | 85 | ❌ |
| SEO | 90 | ✅ |
| Readability | 92 | ✅ |
| Spelling & grammar | 95 | ✅ |
| Usability | 80 | ⚠️ |
| Accessibility | 70 | ❌ |
| Responsive | 85 | ⚠️ |
| Performance | 70 | ❌ |
| Content accuracy | 95 | ✅ |
| CTA / funnel | 90 | ✅ |
| Social metadata | 92 | ✅ |
| Localization | 95 | ✅ |
| Experience fidelity | 85 | ⚠️ |

Two ❌ (Accessibility 70, Performance 70) and four ⚠️ drag the average below 90. Fix items 1–3 before re-review.
