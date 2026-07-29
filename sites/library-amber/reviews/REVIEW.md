# library-amber Brand Kit Site Review

**Reviewer:** Hostile auditor (no mercy)
**Date:** 2026-07-29
**Ground truth:** `phlix-website/new_site.md`, `phlix-website/shared/content.json`
**Lint:** `npm run lint` (HTML ✅ · CSS ✅ · JS ⚠️)

---

## OVERALL RESULT: NOT APPROVED

```❌ JS lint: 1 error + 2 warnings in js/main.js
❌ Dimension 9 (Content accuracy): 88/100 — factual claim issue
⚠️  Dimension 10 (CTA/Funnel): 91/100 — label mismatch
```

---

## DIMENSION SCORES

| # | Dimension | Score | Status |
|---|-----------|-------|--------|
| 1 | Brand fidelity & spirit | 96 | ✅ |
| 2 | SEO | 92 | ✅ |
| 3 | Readability | 95 | ✅ |
| 4 | Spelling & grammar | 100 | ✅ |
| 5 | Usability | 92 | ✅ |
| 6 | Accessibility (WCAG 2.2 AA) | 94 | ⚠️ |
| 7 | Responsive (320→1920) | 95 | ⚠️ |
| 8 | Performance | 96 | ✅ |
| 9 | Content accuracy | 88 | ❌ |
| 10 | CTA / funnel | 91 | ⚠️ |
| 11 | Social metadata | 95 | ✅ |
| 12 | Localization | 95 | ✅ |
| 13 | Experience fidelity | 97 | ✅ |

---

## 1. Brand Fidelity & Spirit — 96 ✅

**Site:** `phlix-website/sites/library-amber/`

Deep mahogany dark (`#2B1608`), amber gold (`#C8861A`), hunter green (`#2E5D3B`), antique cream (`#F2E8D0`) — the entire palette traces to the kit. No off-palette colors detected in any component CSS.

Typography: Playfair Display (headline), Cormorant Garamond (display/number), EB Garamond (body), Libre Baskerville (UI), Courier Prime (mono) — all correct, all self-hosted WOFF2 from the shared pool (`base.css:437-522`). No undeclared weights. Strong emphasis uses both weight 500 AND neutral color as second channel (`base.css:317-321`).

Mascot "The Librarian" — scholarly owl with amber spectacles in a wing-back chair with brass lamp — is brand-grounded and delightful. Seasonal activation (winter/autumn/spring CSS token overrides) is present and correctly gated. Brass divider ornaments, herringbone hero pattern, amber lamp glow pulse — all coherent with the private gentleman's library identity.

Minor deduction: `index.html:320` — "Five native clients" claim in the proof-placard. See Dimension 9.

---

## 2. SEO — 92 ✅

Every page has:
- `<title>` ≤ 60 chars, page-specific (`index.html:6`, `features.html:6`, etc.)
- `<meta name="description">` ≤ 160 chars (`index.html:8-9` — 156 chars ✅)
- `<meta name="keywords">` present
- `<link rel="canonical">` absolute URL
- Correct heading hierarchy (one `<h1>` per page, no skips)
- JSON-LD `SoftwareApplication` on home page (`index.html:58-73`)

**Deduction:** `index.html:23` — `og:description` is 84 chars, which is short. Acceptable but underused.

Sitemap (`sitemap.xml`) has all 8 pages with correct absolute URLs and priorities. `robots.txt` references it. No `404.html` in sitemap (correct — `noindex`).

---

## 3. Readability — 95 ✅

Serif typefaces, generous line-height (body 1.7, `base.css:71`), reading measure ~60–70ch (`p { max-width: 70ch }` at `base.css:310`). Body text at `1.125rem` / 18px on desktop, never dropping below ~16px on phones (`theme.css:1264`). Justified text in story section is appropriate for the editorial archetype. No jarring font fallback chains.

---

## 4. Spelling & Grammar — 100 ✅

Manual spot-check of all 9 pages. No errors found.

---

## 5. Usability — 92 ✅

Primary CTA above fold on hero (`index.html:135` — "Install Phlix" button). Download funnel reachable in ≤2 clicks from home. Nav is clear and consistent. Code blocks have functional copy buttons. FAQ accordion works.

**Deduction:** The home page hero replaces `hero.secondary_cta` ("Read the docs" → external docs) with "Explore the Collection" (→ `features.html`). While the `copy_overlay` allows presentation re-voice, the href destination change (external → internal) is a significant behavioral departure from the spec contract. See Dimension 10.

---

## 6. Accessibility (WCAG 2.2 AA) — 94 ⚠️

- **Contrast:** `--color-primary-safe: #8e5f12` used for eyebrow/small text on cream/surface (4.5:1+). Primary `#C8861A` used for large/UI text and on dark backgrounds (7.14:1 on mahogany-dark). Strong text uses `font-weight: 500 + color-neutral` dual channel. All measured correctly in `base.css:16-17` comment and `SITE.md:32`.
- **Focus:** `2px solid var(--color-focus)` with `2px offset` ring on `:focus-visible` (`base.css:183-187`). Visible on all interactive elements.
- **Skip link:** Present, visible on focus, targets `#main-content` (`base.css:234-253`).
- **Landmarks:** `role="banner"` on `<header>`, `role="navigation"` on `<nav>`, `role="main"`, `role="contentinfo"` on `<footer>` — exactly once each on every page.
- **Touch targets:** All buttons `min-height: 44px` (`components.css:220-221`).
- **prefers-reduced-motion:** Fully respected — animations + transitions disabled at `base.css:259-268`. Mascot `display:none` when dismissed under reduced-motion (`components.css:686-700`). Scroll reveals opt out (`components.css:548-554`). Parallax skips (`main.js:485`).
- **Keyboard:** Mobile nav traps focus correctly (`main.js:60-98`). Easter egg typed-word listener skips inputs/textarea/contenteditable (`main.js:373-382`). Logo-clicks easter egg skips ctrl/meta/shift modifiers (`main.js:338`).

**Deduction:** `index.html:470` — `<div class="mascot" aria-hidden="true">`. The mascot's tip bubble uses `role="tooltip"` on a `<div>` (`components.css:595`). For a tooltip that appears on hover/focus, this requires the user to tab to the mascot to receive the tooltip content, but `aria-hidden="true"` removes the element from the accessibility tree entirely. A sighted keyboard user who focuses the dismiss button (the only focusable element in the mascot) gets no tooltip. Minor but real — the tooltip content is discarded from the AT tree.

---

## 7. Responsive (320→1920) — 95 ⚠️

- Grid tracks: `minmax(0, 1fr)` used throughout (e.g., `theme.css:275`, `theme.css:214-215`, `theme.css:333`). No bare `1fr` overflow.
- Body text wrapping: `overflow-wrap: anywhere` on `p, li, dt, dd, a, span, code, kbd, samp, pre` (`base.css:133-144`). `break-word` on headings (`base.css:147-156`).
- Media query breakpoints tested: 320, 375, 768, 1024, 1280 — responsive at all. Mobile menu becomes full-screen mahogany panel (`components.css:138-193`).

**Deduction:** The home page hero section at 320px has 3 visitor path options in a single column — they might stack very tight with the CTA banner below. Not a guaranteed failure but the `visitor-paths` section at 320px could compress below the fold before the CTA. Also, `index.html:384-385` — the "Your library awaits" CTA banner has body copy and a button; at narrow widths this may stack to 3+ visual lines. Acceptable but tight.

---

## 8. Performance — 96 ✅

- Fonts: self-hosted WOFF2, `font-display: swap`, declared in `base.css:437-522`. Pool references correct: `../../assets/fonts/playfair-display-700-latin.woff2` etc.
- No Google Fonts CDN. Confirmed: `grep` for `fonts.googleapis.com` and `fonts.gstatic.com` returns zero matches.
- `og.png` is 118KB (`img/og.png` — 118192 bytes). Hero has no raster image (CSS gradient + SVG pattern). No render-blocking scripts (`defer` on main.js).
- `loading="eager"` on logo images only; all other images use default lazy.

---

## 9. Content Accuracy — 88 ❌

All product facts traced to `content.json`.

**❌ CRITICAL — `index.html:320`:**
```html
Five native clients · Multi-source metadata · Adaptive streaming
· Live TV with DVR · A versioned plugin contract
```
`content.json` clients list has **5 entries** (Roku, Tizen, Windows, Mobile, DLNA), but `new_site.md` §16 and §19.14 explicit rule: "It is _four_ native clients — Roku, Tizen, Windows, Mobile — **plus any DLNA device**. Two kits stated 5; both were wrong." DLNA is not a native client. This claim overstates the native client count.

**Fix:** Replace "Five native clients" with "Four native clients · Any DLNA device · …" and move DLNA to the list rather than conflating it with native clients.

---

## 10. CTA / Funnel — 91 ⚠️

Primary CTA visible above fold on hero ✅. Download goal reachable in ≤2 clicks from home ✅. Install snippet verbatim from `content.json` ✅.

**⚠️ `index.html:136`:** The hero secondary CTA reads "Explore the Collection" and links to `features.html`. Per `content.json`, `hero.secondary_cta` is `{ label: "Read the docs", href: "https://detain.github.io/phlix-docs" }`. The kit's `copy_overlay` re-voices the label, but the href changes from an external docs URL to an internal features page. Per `new_site.md` §19.7: "A CTA label must not misdescribe its destination." The label "Explore the Collection" is accurate for `features.html`, but the spec's explicit secondary CTA points to docs. This is a should-fix, not a must, because the navigation footer still includes a working "Documentation" → docs URL.

**⚠️ `index.html:135`:**
```html
<a href="download.html#server" class="btn btn-primary btn-lg">Install Phlix</a>
```
`content.json` specifies `primary_cta.label: "Get Phlix"` → `/download`. The kit's `copy_overlay` re-voices to "Install Phlix" and adds a fragment `#server`. The fragment is acceptable (same page anchor), but the label "Get Phlix" is replaced with "Install Phlix". This is technically a `copy_overlay` re-voice but the label shift is material — "Get Phlix" and "Install Phlix" have different intents.

---

## 11. Social Metadata (OG + Twitter) — 95 ✅

Every page has complete OG (`og:type`, `og:site_name`, `og:url` absolute, `og:title`, `og:description`, `og:image` absolute URL to PNG). `og:image` is a real PNG file (118KB, not SVG) at `img/og.png`. Twitter card `summary_large_image` + `twitter:creator=@detain` on all pages. `<meta name="theme-color">` = `#C8861A` on all pages.

**Deduction:** `download.html:28` — `og:title` is "Install — Phlix" (18 chars) which is short, but acceptable.

---

## 12. Localization — 95 ✅

`<html lang="en">` on all 9 pages. All user-facing strings trace to `content.json`. No locale-unsafe formatting detected (no `Intl` usage, no locale-specific number formatting). Logical CSS properties (`inline-start/end`) used where applicable. Fonts subset to Latin. `en` is both `default_locale` and the only `supported_locale` per `content.json`.

**Deduction:** The `index.html:136` secondary CTA href change from external docs to internal features page is a localization gap — if a translator expected "Read the docs" to go to the actual docs URL, it now goes to features.

---

## 13. Experience Fidelity — 97 ✅

The site fully exercises the kit's declared experience overrides:

- `visitor_paths` (self-select fork after hero) ✅
- `feature_casting` (two hero features as path cards) ✅
- `homepage_narrative` (5-section editorial home: hero → paths → story → proof → CTA) ✅
- `proof_strategy` (placard + quote block + GitHub link) ✅
- `conversion_funnel` (3-step ladder: Explore → Choose Devices → Install) ✅
- `mascot.behavior` (The Librarian owl, click:5 bow, hover-hold:2s tips, dismiss localStorage, in-flow below 768px) ✅
- `seasonal_activation` (JS date gate switching `data-season` on `<html>`) ✅
- `easter_eggs` (logo-clicks:5 amber flash, typed-word:collection) ✅
- `hero_experience` (scroll + pointer parallax on lamp glow, reduced-motion fallback) ✅
- `scroll_experience` (section brass-divider separators, IntersectionObserver) ✅
- `faq_experience` (extra_questions as re-phrasings, "From the suggestion box" framing) ✅
- `error_page_experience` (per-kit 404.html with empty reading nook concept) ✅

All animations respect `prefers-reduced-motion`. No-JS fallback always carries the same content.

---

## LINT RESULTS

### HTML — ✅ PASS
`node tools/lint.mjs html` — 0 errors. Scanned 719 files.

### CSS — ✅ PASS (library-amber only)
`node tools/lint.mjs css` — 0 errors in `library-amber/`. The 1713 errors shown are from other sites (wilderness-trail, void-walker, wabi-sabi, etc.).

### JS — ⚠️ 1 ERROR + 2 WARNINGS in `js/main.js`

**`js/main.js:142:58` — ❌ error — `no-useless-escape`**
```javascript
var mascotPage = window.location.pathname.replace(/\/[^\/]*$/, '') || '/';
```
Inside a character class `[^\/]`, the `\` before `/` is unnecessary. Should be `[^\/]` → `[^/]` or simply keep the RegExp literal but remove the escape.

**`js/main.js:138:12` + `js/main.js:146:12` — ⚠️  warnings — `no-unused-vars`**
```javascript
} catch (e) {          // line 138 — e unused
  // localStorage not available — ignore
}
} catch (e) {}          // line 146 — e unused
```
Per `new_site.md` §17: "prefix deliberately-unused params with `_`". Should be `catch (_e)`.

**Fix:** Replace `catch (e)` with `catch (_e)` on lines 138 and 146. Remove `\` from `\/` in the regex on line 142.

---

## REQUIRED FIXES (for APPROVED)

1. **[MUST — lint]** `js/main.js:142` — Remove unnecessary `\` in regex: `/\/[^\/]*$/` → `/[^/]*$/`
2. **[MUST — lint]** `js/main.js:138,146` — Change `catch (e)` → `catch (_e)` on both lines
3. **[MUST — content accuracy]** `index.html:320` — "Five native clients" → "Four native clients · Any DLNA device"
4. **[SHOULD — CTA)]** `index.html:135` — Consider restoring secondary CTA href to docs URL, or making the label "Explore the Collection" consistent with a features-page destination
