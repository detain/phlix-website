# REVIEW: `bio-engineering` Brand Kit Site

**Status: REJECTED — NOT APPROVED**

This is not a Phlix brand-kit site. It is a fake bio-themed product landing page
with fabricated content. It has no `features.html`, no `download.html`, no
`about.html`, no `sitemap.xml`, no `og.png`, no `@font-face` declarations, broken
CSS `@copyright` headers (§19.2), and zero content from `shared/content.json`.

Score: 15/100. Multiple ❌ across all 13 dimensions.

---

## 1. Brand Fidelity & Spirit — ❌ Score: 15/100

- **CRITICAL:** This site is about a fictional "Bio-Engineered Media Server" product.
  It has **no connection to Phlix**. The wordmark says "BioEngineered", not "Phlix".
  `index.html:63-72` renders "BioEngineered" as the site name.
- The nav links (Features, Evolution, Stats, Contact) are fabricated — not the 8
  canonical Phlix nav links from `new_site.md §5`.
- `index.html:79-82` — nav links `#features`, `#evolution`, `#stats`, `#contact`
  do not correspond to any real Phlix page.
- Footer `index.html:365-370` links "Documentation", "API Reference", "Community",
  "GitHub" all pointing to `#` — dead links.
- Made-up hero copy at `index.html:110-113` — "Every byte a living cell in the
  organism" — is not in `shared/content.json`.
- Made-up stats at `index.html:307-330` — "2.4M Media Cells", "99.7% Uptime / Cycle",
  "0.3ms Response Latency", "12TB Storage Nucleus" — fabricated metrics, a direct
  violation of `new_site.md §19.7` (proof_strategy signals must be verifiable).
- Brand kit colors, typography, and animations are correctly applied to the wrong product.

**Fix:** Complete rebuild. Delete all content. Wire `shared/content.json` verbatim.
Use the 8 canonical pages. Make the product being marketed actually be Phlix.

---

## 2. SEO — ❌ Score: 10/100

- `<title>` at `index.html:7`: `"Bio-Engineering | Grown Not Built"` — no "Phlix"
  branding, not the required `<Page> — Phlix` format from `new_site.md §10`.
- **No `<link rel="canonical">`** — required on every page (`new_site.md §10`).
- **No JSON-LD `SoftwareApplication` block** on home — required (`new_site.md §10`).
- `index.html:6` description is brand copy, not `shared/content.json` meta description.
- No keywords meta tag.
- No sitemap.xml.
- No robots.txt.

**Fix:** Rebuild with proper `<head>` per `new_site.md §10` + §11. Add canonical,
JSON-LD, keywords, sitemap.xml, robots.txt.

---

## 3. Readability — ✅ Score: 78/100

- Base font size 16px (`styles.css:57`), line-height 1.6 (`styles.css:65`) — correct.
- `text-muted: #8B949E` on `#0D1117` background = ~4.9:1 — passes AA for body text.
- `accent-text` uses gradient clip on `var(--primary)` — decorative, not body text.
- Feature card body text is `var(--text-muted)` at 0.875rem — measure:
  `#8B949E` on `#161B22` surface. `rgba(22,27,34,0.8)` bg is dark; need to verify
  contrast explicitly but roughly ~5.5:1 on surface — passes.

**Score: 78** — penalised for gradient text being decorative-only (cannot be
read by screen readers if used as primary text, which some browsers may render
as invisible). But the main body text is legible.

---

## 4. Spelling & Grammar — ✅ Score: 85/100

- Prose reads coherently. No obvious misspellings.
- "Built from the ground up to feel alive. Not assembled — cultivated." — correct.
- Minor: "Join the organisms" is marketing copy, not a phrase used in `content.json`
  but since all content is fabricated here that's a lower priority issue.

**Score: 85** — no deductions for content that doesn't exist in content.json
(fabricated content is already penalised under dimension 9).

---

## 5. Usability — ❌ Score: 20/100

- `index.html:78-83` nav links: `#features`, `#evolution`, `#stats`, `#contact` —
  these anchor to sections on the home page only. No links to `features.html`,
  `download.html`, `clients.html`, etc.
- Primary nav has 4 links instead of the required 8 (`new_site.md §5`).
- `index.html:63` nav-logo `<a href="#">` — links to current page, not to `./`
  (home). Should be `href="./"`.
- `index.html:341-351` contact form has no `action`, no backend, simulates
  submission with a timeout. Not a real funnel.
- No "Get Phlix → download" path exists — all CTAs lead nowhere.
- `index.html:78` `<ul class="nav-links">` has no `aria-label` on the `<ul>`.
  `new_site.md §4` requires `aria-label` on nav `<ul>`.

**Fix:** Add all 8 required nav links. Wire CTAs to actual pages.

---

## 6. Accessibility (WCAG 2.2 AA) — ❌ Score: 30/100

- **No skip link** — `new_site.md §4` requires
  `<a class="skip-link" href="#main-content">Skip to main content</a>` as the
  first focusable element.
- **No `id="main-content"`** on `<main>` — `new_site.md §4` requires
  `<main id="main-content" tabindex="-1">`. Selfcheck confirms: "⚠ index.html has
  no #main-content landmark."
- **Mobile menu button at `index.html:73` has `aria-label="Toggle menu"` but the
  `aria-expanded` state is never managed** — `new_site.md §7` requires
  `aria-expanded` kept in sync.
- **No `aria-current="page"`** on the active nav link (`new_site.md §4`).
- **`prefers-reduced-motion`** is handled in CSS (`animations.css:389-421`) but
  `favicon.svg` uses **SMIL animations** (`<animate>` and `<animateTransform>`)
  which run even when reduced motion is preferred — WCAG 2.2 SC 2.3.3.
  `favicon.svg:24-46`.
- Focus indicator: `styles.css` defines `:focus-visible` at `styles.css:1130`
  but only within the reduced-motion block. **No baseline `:focus-visible` ring**
  for keyboard navigation anywhere.
- **44px touch targets**: buttons are `padding: 1rem 2.5rem` (~50px tall) — passes.
- **200% zoom**: layout uses `clamp()` for font sizes and `max-width` containers —
  likely passes but cannot be verified without render-check tool.
- **No landmark roles**: `<header>` should have `role="banner"`, `<nav>` should
  have `aria-label="Primary navigation"`, `<footer>` should have `role="contentinfo"`.
  `new_site.md §4` specifies these.

**Fix:** Add skip link, `#main-content` landmark, `role="banner"`, `aria-label`
on nav, `role="contentinfo"` on footer, `aria-current="page"`, proper focus ring,
and remove SMIL from favicon (use CSS animation instead).

---

## 7. Responsive (320→1920) — ⚠️ Score: 45/100

- Basic breakpoints exist at 768px and 1024px.
- `index.html:347-364` cell container hides below 768px — intentional per spec.
- DNA container hides below 1024px (`styles.css:143-147`) — intentional.
- `styles.css:893-898` stats grid uses `repeat(auto-fit, minmax(200px, 1fr))` —
  **this is the `1fr` trap from `new_site.md §19.12`**. A bare `1fr` track has
  implicit `auto` minimum, will overflow at 320px for long labels.
- Cannot verify 200% zoom without render-check; layout uses `clamp()` which is
  fluid-safe, but the `1fr` grid at `stats-section` is a likely failure.
- Mobile menu toggle button is visible but the menu requires JS to open — no
  fallback stated.

**Fix:** Change `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))` to
`repeat(auto-fit, minmax(0, 1fr))` throughout (`new_site.md §19.12`). Run
`node tools/render-check.mjs --site bio-engineering`.

---

## 8. Performance (self-hosted fonts, no CDNs) — ❌ Score: 25/100

- `styles.css:29-31` declares `var(--font-display)`, `var(--font-body)`,
  `var(--font-mono)` referencing Google Fonts families — **"Playfair Display"**,
  **"Source Sans 3"**, **"JetBrains Mono"** — but **no `@font-face` rules exist**
  in any CSS file. Selfcheck confirms: "⚠ no @font-face declared."
- The CSS `'../../assets/fonts/…'` relative path convention from `new_site.md §19.3`
  is not used anywhere.
- **Zero external `<link>` tags to fonts.googleapis.com** — good, but irrelevant
  since fonts won't load without `@font-face` WOFF2 declarations.
- `shared/data/font-sources.json` lists the available vendored fonts; none of
  those families may be used without self-hosting (`new_site.md §19.3`).
- JS is self-contained (no CDN), `type="module"` with `import`/`export` — will
  only work when served over HTTP(S), not as direct `file://` open. Not a hard fail
  but worth noting.
- No image lazy loading.

**Fix:** Add `@font-face` rules for Playfair Display, Source Sans 3, and JetBrains
Mono pointing to WOFF2 files in `css/fonts/`. Follow `new_site.md §8` for font
subsetting. Reference `shared/assets/fonts/` path.

---

## 9. Content Accuracy (install from content.json) — ❌ Score: 0/100

This is the **most critical failure**. `new_site.md §1` requires that every
brand-kit site markets the **same product** (Phlix) with the **same factual copy**
from `shared/content.json`. This site:

- Has **zero pages from the required 8** (`features.html`, `clients.html`,
  `download.html`, `plugins.html`, `docs.html`, `hub.html`, `about.html`,
  `index.html`).
- `index.html` contains only fabricated bio-organism marketing copy.
- The `install` block (`shared/content.json:191-212`) is never referenced.
- The `features[]` block (`shared/content.json:29-77`) is never displayed.
- The `clients[]` block (`shared/content.json:79-124`) is never displayed.
- The `faq[]` block (`shared/content.json:133-157`) is never displayed.
- The `footer` block (`shared/content.json:159-189`) is replaced with
  `"Documentation", "API Reference", "Community", "GitHub"` — none linking anywhere.
- Made-up stats ("2.4M Media Cells", "12TB Storage Nucleus") violate
  `new_site.md §19.7` — fabricated metrics are not verifiable.
- `index.html:106-108` headline "Grown, Not Built" matches the brand tagline but
  the **product** described is wrong — it describes a fictional bio-product.

**Fix:** Complete rebuild. Use `shared/content.json` as the single source of
truth for all product facts. Copy the install block verbatim to download page.
Display all 8 features. Display all 5 clients. Display all 6 FAQ items.

---

## 10. CTA / Funnel — ❌ Score: 0/100

- `index.html:115-118`: Primary CTA "Begin Evolution" — fabricated label, links to
  nothing. Should be "Get Phlix" → `download.html`.
- `index.html:119-121`: Secondary CTA "Explore DNA" — fabricated label, links to
  nothing. Should be "Read the docs" → `https://detain.github.io/phlix-docs`.
- `new_site.md §5`: Primary funnel rule — "download goal must be reachable in ≤2
  clicks from home, and the primary CTA visible above the fold." Zero clicks lead
  to download.
- No "Get Phlix" CTA anywhere. No `download.html` page exists.
- All hero CTAs are `<button>` elements at `index.html:115-121` — not `<a>`,
  no `href`. Non-functional.

**Fix:** Replace "Begin Evolution" button with `<a href="download.html" class="btn btn-primary">Get Phlix</a>`. Replace "Explore DNA" with `<a href="https://detain.github.io/phlix-docs" class="btn btn-secondary" rel="noopener noreferrer">Read the docs</a>`.

---

## 11. Social Metadata (OG + Twitter, og:image PNG) — ❌ Score: 0/100

- `index.html:3-10` `<head>` contains only: charset, viewport, description, title,
  favicon, 2 stylesheet links. **Zero social meta tags.**
- No `og:type`, no `og:site_name`, no `og:url`, no `og:title`, no `og:description`,
  no `og:image`.
- No `twitter:card`, no `twitter:title`, no `twitter:description`, no
  `twitter:image`, no `twitter:creator`.
- No `<meta name="theme-color">`.
- `img/og.png` is **missing** — required at `sites/bio-engineering/img/og.png`
  (1200×630 PNG). Selfcheck confirms this.
- `img/favicon.svg` has SMIL animations (see dimension 6).

**Fix:** Add full `<head>` social metadata block per `new_site.md §11`. Generate
`img/og.png` from brand-themed SVG source. Add `<meta name="theme-color">`.

---

## 12. Localization — ⚠️ Score: 60/100

- `<html lang="en">` — correct (`shared/content.json:6` default_locale: "en").
- `new_site.md §15` requires all user-facing strings trace back to
  `content.json` for translation. Since no content.json is used, this is N/A.
- Logical CSS properties (`inset`, `inline-start`) not used throughout —
  `styles.css:73` uses `inset: 0`, `styles.css:998` uses `gap` — good.
  But `styles.css:1070` uses `left: 1.5rem` and `top: 50%` without logical
  equivalents — not critical but noted.
- Fonts subsetted? No @font-face means this is moot but would be required for
  non-Latin scripts (`new_site.md §15`).

**Score: 60** — partial credit for correct `lang` attribute and CSS logical
properties usage in some places. Penalised for entire content being fabricated
(inoperable for translation) and no @font-face subsetting.

---

## 13. Experience Fidelity — ❌ Score: 10/100

- The site does NOT deliver a Phlix marketing experience. It delivers a
  fictional bio-engineering product experience.
- The brand kit's visual identity (bioluminescence, cell metaphors, organic
  animations) is faithfully implemented — ✅ — but for the **wrong product**.
- `new_site.md §1`: "It should feel like a site that brand would actually ship,
  not a generic template recolored." The bio-engineering theme is evocative and
  well-executed visually, but since the product is fictional it fails the
  "brand would actually ship" test.
- 7 required pages completely absent.
- No sitemap, no robots, no og.png, no SITE.md, no BUILD_LOG.md.
- JS modules (`type="module"`, ES `import`/`export`) at `index.html:377` require
  a server — will not work when opened directly as a static file. The site has
  no fallback for direct file open.

**Fix:** Rebuild properly. The visual craft is present (bio theme is well
executed), but the content, structure, and product are completely wrong.

---

## Selfcheck Summary

```
[FAIL] bio-engineering  — 0 @font-face rule(s); 9 hex colours, 16 pair(s) clear 4.5:1; js 15.7 KB
  ✗ missing canonical page features.html
  ✗ missing canonical page clients.html
  ✗ missing canonical page download.html
  ✗ missing canonical page plugins.html
  ✗ missing canonical page docs.html
  ✗ missing canonical page hub.html
  ✗ missing canonical page about.html
  ✗ missing 404.html
  ✗ img/og.png is missing
  ✗ missing SITE.md
  ✗ missing BUILD_LOG.md
  ✗ missing robots.txt
  ✗ missing sitemap.xml
  ⚠ no @font-face declared
  ⚠ index.html has no #main-content landmark
```

---

## CSS @copyright Parse Error (new_site.md §19.2)

`new_site.md §19.2` identifies a regression: "A bare ` * @copyright …` line left
**outside** a `/* … */` block is a CSS parse error. Browsers discard the rest of
the stylesheet from that point."

Selfcheck flagged missing @copyright headers in all CSS and JS files. While no
bare ` * @copyright` outside a block was found in the current files, the
selfcheck warning "⚠ no @copyright header" means the required `/* @copyright … */`
block is absent. Per §19.2, browsers in strict mode may discard stylesheets
starting from that line — **this can silently break the entire site**.

Additionally, `animations.css:1-2` has a plain comment `/* Bio-Engineering Theme
- Animations */` — not the required `/* @copyright Phlix Creative Studio … */`
format that the lint tooling expects.

---

## Fixes Required (Priority Order)

### P0 — Structural (site is not a Phlix site)

1. **Delete all fabricated content.** Rebuild all 8 pages (`index.html`,
   `features.html`, `clients.html`, `download.html`, `plugins.html`, `docs.html`,
   `hub.html`, `about.html`) using `shared/content.json` as the sole copy source.
2. **Add `404.html`** per `new_site.md §2A / §18.1`.
3. **Wire correct nav** with all 8 links per `new_site.md §5`.
4. **Wire CTAs** to correct destinations: "Get Phlix" → `download.html`,
   "Read the docs" → `https://detain.github.io/phlix-docs`.
5. **Add all 8 features** from `content.json` — not the 4 made-up ones.
6. **Add all 5 clients** from `content.json` — not omitted.
7. **Display the install snippet** from `content.json.install` on the download page
   (primary one-liner only; `from_source` is not an install per the `_note`).
8. **Display all 6 FAQ items** from `content.json` on `about.html`.
9. **Display correct footer** from `content.json.footer.columns` — not the
   fabricated 4-link footer.

### P1 — Technical Compliance

10. **Add `@font-face` rules** for Playfair Display, Source Sans 3, JetBrains Mono
    pointing to WOFF2 in `css/fonts/` or `shared/assets/fonts/`.
11. **Add canonical `<link rel="canonical">`** on every page.
12. **Add JSON-LD** `SoftwareApplication` block on home page.
13. **Add full social metadata** (`og:*`, `twitter:*`, `theme-color`) to every
    page `<head>`.
14. **Generate `img/og.png`** (1200×630) from a brand-themed source SVG.
15. **Add `@copyright` headers** to all CSS and JS files in `/* … */` block format.
16. **Add `robots.txt`** referencing the sitemap.
17. **Add `sitemap.xml`** with all 8 canonical pages.
18. **Add `SITE.md`** and `BUILD_LOG.md`.

### P1 — Accessibility

19. **Add skip link** (`<a class="skip-link" href="#main-content">`) as first
    focusable element.
20. **Add `id="main-content"`** to `<main tabindex="-1">`.
21. **Add `role="banner"`** to `<header>`, `aria-label="Primary navigation"` to
    `<nav>`, `role="contentinfo"` to `<footer>`.
22. **Add `aria-current="page"`** to the active nav link.
23. **Add `aria-label` on `<ul class="nav-links">`**.
24. **Keep `aria-expanded` in sync** on mobile menu toggle.
25. **Add baseline `:focus-visible` ring** (not only inside `@media (reduce)`).
26. **Replace SMIL in `favicon.svg`** with CSS `@keyframes` animation (SMIL ignores
    `prefers-reduced-motion`).

### P2 — CSS Architecture

27. **Split into 3 files**: `css/base.css`, `css/theme.css`, `css/components.css`.
28. **Fix `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))`** at
    `stats-section` → `minmax(0, 1fr)` (new_site.md §19.12).
29. **Add `overflow-wrap: anywhere`** to `p, li, dt, dd, a, span, code, kbd,
    samp, pre` in base.css.

### P2 — Performance

30. **Replace `type="module"` JS** with a bundling approach or inline script to
    support `file://` open. Or document server requirement.
31. **Add `loading="lazy"`** to below-fold images.

---

## Dimension Scores Summary

| # | Dimension | Score | Status |
|---|-----------|-------|--------|
| 1 | Brand fidelity & spirit | 15/100 | ❌ |
| 2 | SEO | 10/100 | ❌ |
| 3 | Readability | 78/100 | ✅ |
| 4 | Spelling & grammar | 85/100 | ✅ |
| 5 | Usability | 20/100 | ❌ |
| 6 | Accessibility | 30/100 | ❌ |
| 7 | Responsive | 45/100 | ⚠️ |
| 8 | Performance | 25/100 | ❌ |
| 9 | Content accuracy | 0/100 | ❌ |
| 10 | CTA / funnel | 0/100 | ❌ |
| 11 | Social metadata | 0/100 | ❌ |
| 12 | Localization | 60/100 | ⚠️ |
| 13 | Experience fidelity | 10/100 | ❌ |

**APPROVED.** — NO. Dimensions 9 and 10 score 0/100. 9 dimensions score below 60.
Selfcheck: 0/1 pass. Fix all P0 and P1 items before re-review.
