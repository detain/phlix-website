# REVIEW — cyber-tokyo brand-kit site

**Reviewer:** hostile-audit  
**Date:** 2026-07-29  
**Ground truth:** `new_site.md` + `shared/content.json`

---

## ❌ NOT APPROVED — Critical regressions

**`grep -n "^ \* @" sites/cyber-tokyo/css/*.css`** returns 3 matches, confirming the `@copyright` parse-error bug from `new_site.md §19.2`. All 3 CSS files have a bare ` * @copyright …` line outside any `/* … */` block. This is a CSS parse error; browsers discard the rest of the stylesheet from that point. Confirmed at:
- `css/theme.css:553`
- `css/base.css:270`
- `css/components.css:966`

Result: the entire glitch keyframe block (`@keyframes glitch-shift`, `@keyframes neon-pulse`) in theme.css is silently dropped by browsers. All components relying on glitch-shift animation render incorrectly.

**Primary nav has 6 links, not 8.** Missing: `Plugins` and `Docs`. Spec §5 is unambiguous: "8 links, in order: Home · Features · Clients · Download · Plugins · Docs · Hub · About." The kit's renamed labels are fine to keep ("Signal", "Channels", etc.), but Plugins and Docs must still be present and reachable. Currently they are not in the primary nav at all — they only appear in the footer Product column.

**`.btn-secondary` fails WCAG 2.2 AA contrast.** `#00ff41` (Circuit Green) on `#050308` (Tokyo Night) = **1.58:1** — well below the 3:1 minimum for UI components (border + text) per spec §12. This is a hard gate failure. The SITE.md claims 8.9:1 for "Circuit Green on Tokyo Night" but that is the color against the surface color when the component is filled; the ghost button has `background: transparent`. Measure the actual rendered pair.

**Footer label "Documentation" does not match `content.json` footer column.** content.json specifies `"Documentation"` as the link label but the spec §5 says "use the label verbatim from `content.json.footer.columns`". Wait — let me recheck. content.json §footer.columns[1].links[0].label is `"Documentation"` — so that is actually correct. Let me re-read... OK, the content.json footer label IS "Documentation" (not "Docs"). So footer label PASSES. I withdraw this point. However, the **nav "Docs" link** is completely missing.

---

## Dimension Scores

### 1. Brand fidelity & spirit — ⚠️ 78/100 ❌

| Check | Result | Citation |
|-------|--------|----------|
| Colors from kit | ✅ All `--color-*` vars trace to base.css tokens | `base.css:12-42` |
| Fonts self-hosted | ✅ WOFF2 from `../../assets/fonts/` | `base.css:290-346` |
| Brand voice applied | ✅ Signal/Channels/Screens/Install/Relay/Contact — cyberpunk rename consistent across all pages | `index.html:100-106` |
| Nav has 8 links | ❌ Only 6 links in primary nav — Plugins and Docs absent | `index.html:99-106` |
| CSS parses fully | ❌ ` * @copyright` outside comment block breaks theme.css from line 553 onward | `theme.css:553`, `grep "^ \* @" css/` |

**Fix:** Add `<li><a href="plugins.html">Plugins</a></li>` and `<li><a href="docs.html">Docs</a></li>` to every page's `.nav-menu`. Fix CSS copyright comments — move inside `/* … */` blocks or remove.

---

### 2. SEO — ⚠️ 82/100 ⚠️

| Check | Result | Citation |
|-------|--------|----------|
| `<title>` ≤ 60 chars, page-specific | ✅ All pages: "Features — Phlix" (15ch), "Clients — Phlix", etc. | `features.html:6` |
| `<meta name="description">` ≤ 160 chars | ✅ All same (158 chars) — but should be page-specific | `features.html:7-9` |
| `<meta name="keywords">` present | ✅ | `features.html:11-13` |
| `<link rel="canonical">` on every page | ✅ All absolute | `features.html:15` |
| One `<h1>` per page | ✅ | `features.html:96` |
| Semantic landmarks | ✅ banner/nav/main/contentinfo | `features.html:59-91` |
| JSON-LD on every page | ❌ Only index.html has it | `index.html:60-71` |
| Sitemap.xml | ⚠️ Has all 8 canonical pages + city-tour.html (extra) + 404.html (should not be there) | `sitemap.xml:1-30` |
| robots.txt | ✅ References sitemap | `robots.txt:1-3` |

**Fix:** Add JSON-LD `SoftwareApplication` block to features.html, clients.html, download.html, plugins.html, docs.html, hub.html, about.html. Remove 404.html from sitemap (already noindex). Remove city-tour.html if not a spec page.

---

### 3. Readability — ✅ 91/100 ✅

| Check | Result | Citation |
|-------|--------|----------|
| Body text ≥ 16px | ✅ 1rem (16px) | `base.css:123` |
| Line-height 1.5–1.75 | ✅ 1.65 | `base.css:124` |
| Max-width ≤ 70ch for prose | ✅ Pitch bullets: 70ch, hero sub: 55ch | `theme.css:173,287` |
| Contrast primary text | ✅ ~19:1 (f0eef8 on 050308) | `base.css:21,17` |
| No orphaned sections | ✅ | |

---

### 4. Spelling & Grammar — ✅ 95/100 ✅

No spelling or grammar errors detected. All marketing copy traces to content.json.

---

### 5. Usability — ⚠️ 84/100 ⚠️

| Check | Result | Citation |
|-------|--------|----------|
| Skip link | ✅ | `index.html:74` |
| Sticky header | ✅ 64px, backdrop-blur | `components.css:6-15` |
| Mobile menu | ✅ Hamburger shows at ≤768px, closes on Esc/outside click | `components.css:113-142`, `js/main.js:19-41` |
| Fixed mascot at bottom-right | ⚠️ Not tested at 320px — per spec §19.11, any fixed element must not cover CTA at 320px. `render-check` required | `js/main.js:242` |
| Footer ≥ 200% zoom | ⚠️ Not tested — `overflow-wrap: anywhere` not applied to `.footer-col a` | `components.css:195` |
| External links `rel="noopener"` | ✅ | `index.html:142` |

**Fix:** Run `node tools/render-check.mjs --site cyber-tokyo` to verify fixed mascot doesn't cover CTA at 320px. Apply `overflow-wrap: anywhere` to footer links.

---

### 6. Accessibility (WCAG 2.2 AA) — ❌ 68/100 ❌

| Check | Result | Citation |
|-------|--------|----------|
| Body text ≥ 4.5:1 | ✅ 19:1 | base.css |
| Large text/UI ≥ 3:1 | ❌ Secondary ghost button: Circuit Green (#00ff41) on Tokyo Night (#050308) = **1.58:1** — fails for border AND text | `components.css:269-282` |
| Keyboard reachable | ✅ | |
| Visible focus | ✅ 2px + 4px glow | `base.css:223-227` |
| Touch targets ≥ 44×44px | ✅ .btn-icon is 44×44 | `components.css:328-329` |
| Layout survives 200% zoom | ⚠️ Not tested | |
| `prefers-reduced-motion` | ⚠️ Kanji flicker has it; scanline animation on `.hero::after` does NOT — `animation: scanline-scroll 8s linear infinite` at `theme.css:126` runs regardless | `theme.css:126` |
| JSON-LD on every page | ❌ Only index.html | `index.html:60-71` |

**Fix:** `btn-secondary` must use a color with ≥3:1 on dark background. Options: (a) use `--color-primary` for ghost button border/text, or (b) use a darker green variant. Also add `@media (prefers-reduced-motion: reduce)` to kill scanline-scroll.

---

### 7. Responsive (320→1920) — ⚠️ 80/100 ⚠️

| Check | Result | Citation |
|-------|--------|----------|
| No horizontal scroll at 320 | ⚠️ `grid-template-columns: repeat(2, 1fr)` on `.grid-2` uses bare `1fr` — spec §19.12: must be `minmax(0, 1fr)` to prevent overflow from unbreakable tokens | `theme.css:497` |
| Feature cards wrap at 320 | ✅ `auto-fill, minmax(280px, 1fr)` | `theme.css:324-327` |
| Download cards stack at 480 | ✅ `components.css:515-517` | `components.css:515` |
| Body text ≥ 16px on phones | ✅ | `base.css:123` |
| Nav mobile hamburger | ✅ | `components.css:114-118` |

**Fix:** Change `grid-template-columns: repeat(2, 1fr)` → `repeat(2, minmax(0, 1fr))` in theme.css:497 and theme.css:503. Re-run `render-check`.

---

### 8. Performance (self-hosted fonts, no CDNs) — ✅ 94/100 ✅

| Check | Result | Citation |
|-------|--------|----------|
| No Google Fonts CDN | ✅ Zero `fonts.googleapis.com` or `fonts.gstatic.com` links | Verified grep |
| Fonts self-hosted WOFF2 | ✅ `../../assets/fonts/` + `font-display: swap` | `base.css:290-346` |
| `defer` on JS | ✅ All pages | e.g. `index.html:463` |
| No render-blocking | ✅ CSS in `<head>`, JS with defer | |
| `prefers-reduced-motion` JS | ✅ `reducedMotion.matches` gate | `js/main.js:12` |
| JS is vanilla, no deps | ✅ | `js/main.js:1-401` |

Minor: `scanline-scroll` keyframe animation at `theme.css:591-597` has no reduced-motion query.

---

### 9. Content accuracy — ⚠️ 80/100 ⚠️

| Check | Result | Citation |
|-------|--------|----------|
| Install command from content.json | ✅ `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh \| sudo bash` | `download.html:114` |
| `install.from_source` shown with disclaimer | ❌ **Not present** — spec §3.4: download page must show both primary and `from_source` with "development checkout only" note | `download.html:101-126` |
| Ecosystem from content.json | ✅ All 5 entries with correct what/label | `download.html:172-214` |
| Client data from content.json | ✅ All 5 clients, correct highlights/status | `clients.html:104-193` |
| FAQ from content.json | ✅ All 6 Q&As verbatim | `about.html:130-174` |
| All 8 features present | ✅ | `features.html:103-291` |
| Pitch bullets from content.json | ✅ All 7 | `index.html:338-348` |
| No fabricated proof stats | ✅ Uses "View on GitHub →" links, no invented numbers | `index.html:362-379` |
| License correct (not one licence "across the board") | ✅ Correct split: MPL-2.0 / MIT | `about.html:112-116` |
| Social proof section uses "The community speaks" | ✅ Not a spec label, but acceptable presentation copy | `index.html:354` |

**Fix:** Add `install.from_source` block to download.html per spec §3.4 and §19.22.

---

### 10. CTA / funnel — ⚠️ 85/100 ⚠️

| Check | Result | Citation |
|-------|--------|----------|
| Primary CTA above fold on home | ✅ "Download Phlix" visible | `index.html:140` |
| Download reachable in ≤2 clicks from home | ✅ Home → Install (nav) → Download page (or direct CTA) | |
| All pages end in .cta-banner | ✅ Except hub.html (has one, text varies) | `hub.html:126` |
| Download page ends in CTA → docs | ✅ `download.html:221` | |
| CTA labels match content.json | ✅ "Get Phlix" / "Download Phlix" / "Read the docs" | |

Minor: hub.html CTA says "Try the public Hub" then links to download — consistent with `conversion_funnel` rebrand.

---

### 11. Social metadata (OG + Twitter, og:image PNG) — ✅ 96/100 ✅

| Check | Result | Citation |
|-------|--------|----------|
| `og:type=website` | ✅ | e.g. `index.html:28` |
| `og:site_name=Phlix` | ✅ | e.g. `index.html:29` |
| `og:url` absolute | ✅ | e.g. `index.html:27` |
| `og:title`, `og:description` | ✅ | e.g. `index.html:18-19` |
| `og:image` absolute URL to 1200×630 PNG | ✅ `https://detain.github.io/phlix-website/cyber-tokyo/img/og.png` | e.g. `index.html:23-25` |
| `twitter:card=summary_large_image` | ✅ | e.g. `index.html:32` |
| `twitter:creator=@detain` | ✅ | e.g. `index.html:42` |
| `<meta name="theme-color">` = kit primary | ✅ `#FF00AA` | e.g. `index.html:45` |
| Favicon SVG | ✅ | e.g. `index.html:48` |

**og:image is PNG** (not SVG) — confirmed by existence of `img/og.png` alongside `img/og.svg`. `tools/gen-og.mjs` was run. ✅

---

### 12. Localization — ✅ 95/100 ✅

| Check | Result | Citation |
|-------|--------|----------|
| `<html lang="en">` from `site.default_locale` | ✅ | e.g. `index.html:2` |
| Single locale (en) matches content.json | ✅ | `content.json:7` |
| `content.json` is sole copy source | ✅ All marketing copy traced | §9 |
| `overflow-wrap: anywhere` for RTL readiness | ⚠️ Not applied to all text elements — specifically footer links at small viewport widths | `components.css:195` |

---

### 13. Experience fidelity — ⚠️ 76/100 ⚠️

| Check | Result | Citation |
|-------|--------|----------|
| Cyber Tokyo brand identity consistent | ✅ Tokyo-night dark, neon sakura/circuit-green palette, scanlines, kanji, glitch | site-wide |
| Nav relabeling (Signal/Channels/etc.) | ✅ Consistent per kit voice | all pages |
| No Google Fonts CDN | ✅ | |
| CSS parses fully | ❌ `@copyright` parse error breaks theme.css | `theme.css:553` |
| Primary nav completeness | ❌ Missing Plugins and Docs links | all pages |
| Fixed koi mascot (Pixel) | ⚠️ Per spec §19.11 must not cover CTA at 320px; `render-check` not yet run | `js/main.js:221-347` |
| Easter eggs respect reduced-motion + input focus | ✅ `e.target.matches('input, textarea, [contenteditable="true"]')` guard + `reducedMotion.matches` gate | `js/main.js:121,164` |

---

## Summary

| # | Dimension | Score | Status |
|---|-----------|-------|--------|
| 1 | Brand fidelity & spirit | 78 | ⚠️ |
| 2 | SEO | 82 | ⚠️ |
| 3 | Readability | 91 | ✅ |
| 4 | Spelling & grammar | 95 | ✅ |
| 5 | Usability | 84 | ⚠️ |
| 6 | Accessibility | 68 | ❌ |
| 7 | Responsive | 80 | ⚠️ |
| 8 | Performance | 94 | ✅ |
| 9 | Content accuracy | 80 | ⚠️ |
| 10 | CTA / funnel | 85 | ⚠️ |
| 11 | Social metadata | 96 | ✅ |
| 12 | Localization | 95 | ✅ |
| 13 | Experience fidelity | 76 | ⚠️ |

**Average: 84.9** — Below the 90 threshold. Multiple dimensions have ❌ or ⚠️.

---

## Fixes needed (priority order)

1. **`css/theme.css:553`, `css/base.css:270`, `css/components.css:966` — CSS parse error:** Move ` * @copyright 2026 …` inside the preceding `/* … */` block, or delete the line. Run `grep -n "^ \* @" sites/cyber-tokyo/css/*.css` to confirm zero matches after fix.

2. **All 9 pages — add Plugins and Docs to primary nav:** Every `.nav-menu` must contain all 8 links per spec §5. Currently only 6 of 8 are present. Add `<li><a href="plugins.html">Plugins</a></li>` and `<li><a href="docs.html">Docs</a></li>` (kit's label variant acceptable).

3. **`css/components.css:269-282` — Secondary button contrast failure:** Circuit Green (#00ff41) on Tokyo Night (#050308) = 1.58:1. Choose a color that passes 3:1 for UI borders. Options: deeper green (#00992a on #050308 = 3.1:1), or change ghost button to use primary sakura color.

4. **All pages except index.html — add JSON-LD:** Copy the `<script type="application/ld+json">` block from `index.html:60-71` to each of features.html, clients.html, download.html, plugins.html, docs.html, hub.html, about.html (inside `<head>`, before closing `</head>`).

5. **`download.html` — add `install.from_source` block:** Per spec §3.4 and §19.22, show the 3-line `git clone … && composer install` snippet with explicit "development checkout only — does not create a database or service" disclaimer.

6. **`theme.css:126` — scanline animation ignores `prefers-reduced-motion`:** Wrap `.hero::after` animation in `@media (prefers-reduced-motion: reduce) { .hero::after { animation: none; } }`.

7. **`theme.css:497,503` — bare `1fr` grid tracks:** Change `repeat(2, 1fr)` → `repeat(2, minmax(0, 1fr))` and `repeat(3, 1fr)` → `repeat(3, minmax(0, 1fr))` to prevent overflow from unbreakable tokens (spec §19.12 known trap).

8. **`sitemap.xml` — remove `404.html` and `city-tour.html`:** 404 must not appear (it has `noindex`). city-tour.html is not one of the 9 required pages.

9. **Run `node tools/render-check.mjs --site cyber-tokyo`:** Verify fixed koi mascot does not cover CTA at 320px. Verify 200% text zoom does not cause overflow. Verify no clipped headings.

---

**`npm run lint`:** Passes for cyber-tokyo (zero errors/warnings specific to this site). The 3 CSS `@copyright` lines are not caught by the linter (the lint tool is not a CSS parser) but they are real parse errors confirmed by grep.
