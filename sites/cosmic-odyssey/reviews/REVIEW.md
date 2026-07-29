# REVIEW — cosmic-odyssey brand kit site

**Site:** `sites/cosmic-odyssey/`
**Reviewer:** Hostile Auditor
**Ground truth:** `shared/content.json` (install commands), `shared/content.json` / `SITE.md` (brand)
**Linter:** `npm run lint` — CLEAN (0 errors)

---

## ❌ NOT APPROVED

Multiple issues across dimensions. Fixes needed below.

---

## 1. Brand Fidelity & Spirit — 92/100 ⚠️

**Strengths:** Space aesthetic is consistent and well-executed. Cosmic terminology (Launch Pad, Star Catalog, Set Coordinates, Signal Relay, Mission Log) used coherently across all nav labels and page headers. Deep Space Black background, nebula violet glows, stardust gold accents, constellation-line borders all match `SITE.md` palette exactly. Vela mascot appears on `index.html` and `about.html` with zero-g float animation and contextual tips. Star-field hero with CSS radial-gradient dots and parallax. Mission-patch badge motif on cards. Typography system matches spec (Orbitron 700/900 headlines, Exo 2 display, Inter body, Rajdhani UI, Space Mono mono). Proper `font-display: swap` on all `@font-face` declarations.

**Deduction — icon mismatch:** `shared/content.json` §features[5].icon = `"broadcast"` — meaning the broadcast/antenna icon shown in `SITE.md` §Visual Assets ("antenna" for Live TV). But in `features.html:143` the Live TV icon uses diagonal strike-through lines (M4.93 4.93l14.14 14.14M6.34 17.66...) which is a Lightning bolt / disconnect symbol, NOT a broadcast antenna. This is a brand icon error.

---

## 2. SEO — 92/100 ⚠️

**Strengths:** All 8 pages in sitemap.xml with correct absolute URLs. `robots.txt` present with sitemap reference. All pages have `<meta name="description">`, `<meta name="keywords">`, `<link rel="canonical">`. All non-404 pages have OG meta + Twitter card. `og:image` as absolute URL (not relative) — passes `tools/check-meta.mjs rule 5`.

**Deduction — missing OG/Twitter on download.html:** `download.html` lacks `og:title` and `og:description` meta tags. It has `og:url` and `og:image` but not the title/description pair. Same for `twitter:title` and `twitter:description`. This was observed in `features.html`, `clients.html`, `hub.html`, `plugins.html`, `docs.html`, and `about.html` as well — all those pages are missing `og:title` and `og:description` (only `og:url` + `og:image` present).

**Reference:** `index.html:16-37` has all four OG/Twitter tags (type, site_name, url, title, description, image) + twitter:card, twitter:title, twitter:description, twitter:image, twitter:creator. The other 8 pages only have `og:url` + `og:image` and `twitter:card` + `twitter:image`.

---

## 3. Readability — 90/100 ⚠️

**Strengths:** 16px base, Inter 400 body at 1.7 line-height, max 70ch paragraphs, reading width 760px. `base.css:143` uses `overflow-wrap: break-word` on all text elements. Contrast ratios measured and safe values derived (--color-primary-safe #9362ca on #080b14 = 4.5:1).

**Deduction:** `theme.css:263` — `.hero__subheadline` uses `color: rgb(232 234 240 / 0.8)` on `#080b14` background. 0.8 × 232 ≈ 185.6. Using the formula: relative luminance ≈ 0.20 + 0.67 × (185.6/255) ≈ 0.69. Contrast ratio vs pure black (#000) ≈ 4.4:1. This is below the 4.5:1 WCAG AA threshold for normal text (AA requires ≥4.5:1). The subheadline is `clamp(1rem, 2vw, 1.2rem)` which is 16–19px — not "large text" (≥18pt or 14pt bold). The `--color-text` at 0.8 opacity for body text works because it's used against `#111827` surface (contrast high enough), but against `#080b14` hero background it's borderline. Perceived issue only on hero section.

---

## 4. Spelling & Grammar — 83/100 ⚠️

**Deduction 1 — incorrect telemetry claim:** `index.html:283` — `<blockquote class="proof-quote">BSD-3-Clause across the board</blockquote>`. This is factually wrong. `about.html:93-96` clearly states: "Phlix Server and the Hub are **MPL-2.0**… shared libraries, plugins, and clients are **MIT**." BSD-3-Clause appears nowhere in the project. This is a false claim in the proof/telemetry band.

**Deduction 2 — minor:** Both `index.html:383` and `download.html:387` have `View licence` (British spelling). `content.json` uses "licence" as well, so this is content-consistent and arguably intentional given Interserver.net is US-based but uses British spelling in content. Not penalized as hard since content.json is the source of truth.

---

## 5. Usability — 79/100 ❌

**Critical — FAQ `<details>/<summary>` keyboard inaccessibility:** `about.html:152-232` uses native `<details class="faq-item">` / `<summary class="faq-item__question">` for the FAQ accordion. Per `about.html:154`, the first item is `open`. The `<summary>` element is NOT natively keyboard-focusable as an interactive button in all screen readers/keyboard navigation scenarios. While some browsers provide native keyboard support for `<details>`, WCAG 2.1 Success Criterion 2.1.1 (Keyboard) requires all functionality to be operable via a keyboard interface **without requiring specific timing** — and `<details>` toggle behavior via keyboard is not universally implemented (Firefox requires Enter/Space, Chrome handles it differently). The custom `btn` class on `index.html:99` has `min-height: 44px; min-width: 44px` but the FAQ summary button lacks equivalent touch-target padding. The `<summary>` has `padding: var(--space-6)` but no `min-height` enforcement — it is a native summary element styled as a button, not a `<button>`. This is a **keyboard accessibility failure** under WCAG 2.2 AA §2.1.1.

**Reference:** `about.html:154` — `<summary class="faq-item__question">Is Phlix like Plex / Jellyfin / Emby?</summary>`

**Strengths:** Skip link present on all pages (`index.html:58`). ARIA roles banner, navigation, main, contentinfo used correctly. `aria-current="page"` on nav. `aria-label` on all icon-only buttons. Mobile nav with Escape key handling (`js/main.js:56-62`). Outside-click close for mobile nav (`js/main.js:47-53`).

---

## 6. Accessibility (WCAG 2.2 AA) — 79/100 ❌

**Same critical failure as dimension 5** — `<details>/<summary>` not keyboard-operable as a proper button.

**Strengths:** Skip links, focus-visible ring (2px #a78bfa, 2px offset, base.css:245-253). 44px min-height on all `.btn` (components.css:357). Contrast ratios measured safe in base.css:83-91 (primary-safe 9362ca on 080b14 = 4.5:1, on-primary f1d1e8 on 7b3fbe = 4.5:1, on-fab e8eaf0 on 7b3fbe = 5.3:1). `prefers-reduced-motion: reduce` handled in base.css:305-313, theme.css:1154-1168 (disables animations), components.css:763-769 (reveal becomes static), js/main.js:19-21, js/main.js:69 (scroll reveal exits early), js/main.js:161 (parallax skipped). Mascot float disabled under reduced-motion (components.css:633-638). `manifest.webmanifest` present with theme_color #7B3FBE and background_color #080b14. SVGs use `aria-hidden="true"`. All images have alt text.

**Deductions:**
- FAQ `<summary>` not a proper `<button>` (WCAG 2.1 §2.1.1 failure)
- `.mascot` on `index.html:409` and `about.html:336` has `role="img"` and `aria-label="Vela, your cosmic navigator"` — but the `role="img"` on a `<div>` that contains an SVG and a `<button>` (the dismiss button) is incorrect. A `div` with `role="img"` cannot contain interactive descendants — this creates an ARIA nesting violation. The mascot should use a `<figure>` or a `<div>` without `role="img"` with `aria-label` to label the section.

---

## 7. Responsive (320→1920) — 94/100 ⚠️

**Strengths:** Fluid type with `clamp()` throughout. `clamp(2.5rem, 6vw, 4.5rem)` hero headline, `clamp(1rem, 2vw, 1.2rem)` subheadline. Grid collapses to 1 column at 768px (theme.css:1173-1194). Mobile nav breakpoint at 768px with `display: none` + `.is-open` toggling. Container with `padding-inline: var(--space-8)` (20px at mobile via --space-8 override). `overflow-x: clip` on hero__actions and cta-banner__actions prevents horizontal scroll.

**Deduction — small gap at 320px:** At 320px viewport, `padding-inline: 20px` means available width = 280px. The hero__actions have 2 buttons with `btn-lg` padding and `btn-fab` border-radius pill shape. With `flex-wrap: wrap` and `gap: var(--space-4)` (16px), the buttons could overflow at very small viewports. Not a hard failure, but the button text "Fire Main Engines" at `btn-fab` with `padding: var(--space-3) var(--space-8)` (12px 32px) plus `max-width: 100%` should wrap safely.

---

## 8. Performance (self-hosted fonts, no CDNs) — 95/100 ⚠️

**Strengths:** All fonts self-hosted via `@font-face` in `theme.css:11-97`. Paths reference `../../assets/fonts/orbitron-700-latin.woff2` etc. `font-display: swap` on all declarations. No Google Fonts CDN. No external script CDNs. All scripts use `defer`. CSS is split into 3 files (base, theme, components) with separate loading. `manifest.webmanifest` present.

**Deduction:** `@font-face` for Space Mono weight 700 declared but `js/main.js:428` injects `@keyframes barrel-roll` dynamically inside `injectKeyframes()` which runs on init. This is acceptable. However, `theme.css:94` declares Space Mono weight 700 as `url('../../assets/fonts/space-mono-700-latin.woff2')` — if the actual font file doesn't exist at that path, it will silently fail and fall back to `JetBrains Mono` (the fallback in `--font-mono` definition). Unable to verify file existence from this review.

---

## 9. Content Accuracy — 88/100 ⚠️

**Strengths — install commands from content.json:** `download.html:83-86` primary install command **exactly matches** `shared/content.json §install.primary.command` (single-line curl pipe to bash). `download.html:112-115` HTTPS provision command matches `content.json §install.with_https`. `download.html:131-134` source checkout matches `content.json §install.from_source.command` (3-line `git clone && cd && composer install`). Description text in install block (`download.html:97-103`) matches `content.json §install.primary.what_it_does`. Notes match `content.json §install.primary.notes`.

**Strength — pitch bullets:** `index.html:235-252` all 7 pitch bullets exactly match `shared/content.json §pitch_bullets` array items.

**Deductions:**

1. **Wrong license claim in telemetry** (same as dimension 4): `index.html:283` "BSD-3-Clause across the board" — actually MPL-2.0 (server/hub) + MIT (clients). Critical content error.

2. **plugins.html:124-125** says "Find community plugins on GitHub under the detain org once they ship" — no actual plugins are listed, the ecosystem has zero community plugins. This is aspirational copy that could mislead users into thinking there's a plugin ecosystem to browse.

3. **Missing ecosystem items on plugins.html:** The ecosystem list in `download.html:214-284` lists all 5 items from `content.json §ecosystem`. But `plugins.html` does not list the ecosystem — it only says plugins are coming. The content says "See phlix-plugin-example for the smallest working starter" which is accurate. Minor inconsistency.

---

## 10. CTA / Funnel — 90/100 ⚠️

**Strengths:** Primary CTA "Fire Main Engines" (→ download.html) appears in hero (`index.html:99`), CTA banner (`index.html:291`), features CTA (`features.html:209`), clients CTA (`clients.html:179`), hub CTA (`hub.html:158`), about CTA (`about.html:238`), download CTA (`download.html:287-298`). Secondary CTA "Return to Launch Pad" on inner pages. "View Star Catalog" → features.html. "Choose Your Vessel" → clients.html. Multiple conversion paths. Strong install block CTA on download page. `manifest.webmanifest` links to download for PWA install.

**Deduction:** No `hreflang` on any page despite `shared/content.json §site.supported_locales: ["en"]` — but since there's only one locale, this is acceptable. No locale-specific content to localize anyway.

---

## 11. Social Metadata (OG + Twitter, og:image PNG) — 95/100 ⚠️

**Strengths:** `og:image` as absolute URL to PNG (not SVG) on all pages. `og:url` points to the exact page URL (not just site root). `twitter:card: summary_large_image` on all pages. `og:type: website` on index. Twitter creator `@detain` on index. Schema.org JSON-LD `SoftwareApplication` on index. Apple touch icon and favicons (SVG + PNG at multiple sizes).

**Deduction — incomplete OG tags on inner pages:** As noted in Dimension 2, all inner pages (features, clients, hub, download, plugins, docs, about) are missing `og:title` and `og:description`. They have `og:url` and `og:image` but not the full set. Per OpenGraph spec, `og:title` and `og:description` are required for `og:image` to render correctly in most scrapers. `index.html` is the only page with the full set.

**Reference:** `index.html:16-37` vs `features.html:15-27` (only og:url + og:image).

---

## 12. Localization — 95/100 ⚠️

**Strengths:** `shared/content.json §site.default_locale: "en"` and `supported_locales: ["en"]` — single-locale site, correct. All page `<html lang="en">`. `hreflang="en"` not needed for single locale. No hard-coded user-facing strings outside English. The install command and technical content is language-neutral.

**Deduction:** No `<link rel="alternate" hreflang="x-default">` or any `hreflang` tags. For a single-locale site this is technically fine, but best practice for absolute-canonical URLs on GitHub Pages would include at minimum a self-referential `hreflang="en"` on each page to signal the language tree.

---

## 13. Experience Fidelity — 91/100 ⚠️

**Strengths:** This is the site that best realizes the `SITE.md` brand kit. Vela mascot with contextual tips, zero-g float, 7-click barrel roll easter egg, 3-second hover visor flare, typed "void" easter egg (nebula pulse + visor flare), scroll-past-footer spacecraft drift, intensity toggle via localStorage. Seasonal date-gated variants (Perseid, Winter Solstice, Galaxy Season) via `initSeasonal()`. Parallax hero on scroll. Scroll-reveal warp-in. Constellation-dot nav separators. Proper focus ring with 2px violet + dark offset. Mobile mascot re-positioned to flow above footer (`components.css:617-631`). Paw/space metaphors consistent throughout (launch, coordinates, signal relay, mission log). CSS star field using only radial-gradient dots (no raster images). `body` background uses `background-attachment: fixed` for depth effect.

**Deductions:**

1. **About page Vela on cliff edge** — the 404 page has Vela sitting on a cliff edge (index.html and about.html have the standing Vela). The 404 page Vela is a different SVG scene, which is a nice touch but worth noting the thematic variation.

2. **`SITE.md §5 Motion: "Vela idle disabled under reduced motion"** — correctly implemented in `components.css:633-638` and `js/main.js:245`. ✅

3. **Seasonal meteor trails not implemented** — `SITE.md:57` mentions "Date-gated Perseid meteor trails" but `js/main.js:134-155` only sets a `data-seasonal` attribute on `<html>` — no actual meteor trail visuals are rendered. The CSS has no `@keyframes meteor` or related styles. This is aspirational in the brand kit.

---

## Summary Table

| # | Dimension | Score | Status |
|---|-----------|-------|--------|
| 1 | Brand fidelity & spirit | 92 | ⚠️ |
| 2 | SEO | 92 | ⚠️ |
| 3 | Readability | 90 | ⚠️ |
| 4 | Spelling & grammar | 83 | ⚠️ |
| 5 | Usability | 79 | ❌ |
| 6 | Accessibility | 79 | ❌ |
| 7 | Responsive | 94 | ⚠️ |
| 8 | Performance | 95 | ⚠️ |
| 9 | Content accuracy | 88 | ⚠️ |
| 10 | CTA / funnel | 90 | ⚠️ |
| 11 | Social metadata | 95 | ⚠️ |
| 12 | Localization | 95 | ⚠️ |
| 13 | Experience fidelity | 91 | ⚠️ |

---

## Fixes Required

### Critical (must fix before approval)

1. **`about.html` FAQ `<summary>` must be wrapped in or replaced with a `<button>`**
   Replace `<summary class="faq-item__question">` with `<button type="button" class="faq-item__question">` and keep the `<details>` container. Add click handler that toggles `details` open state. Apply same `cursor: pointer`, `appearance: none`, `background: none`, `border: none` resets. This is a WCAG 2.1 §2.1.1 keyboard accessibility failure.

2. **`index.html:283` — "BSD-3-Clause across the board" is factually wrong**
   Replace with correct license: "MPL-2.0 for server & Hub; MIT for clients, plugins, and libs." Or remove the quote entirely.

3. **All inner pages missing `og:title` and `og:description`**
   Add to `features.html`, `clients.html`, `hub.html`, `download.html`, `plugins.html`, `docs.html`, `about.html`:
   ```html
   <meta property="og:title" content="[Page Title] — Phlix" />
   <meta property="og:description" content="[One-sentence description]" />
   <meta name="twitter:title" content="[Page Title] — Phlix" />
   <meta name="twitter:description" content="[One-sentence description]" />
   ```

### Important (should fix)

4. **`features.html:143` — Live TV icon mismatch**
   The diagonal strike-through lines icon does not match `content.json §features[5].icon: "antenna"` / broadcast symbol. Replace with an antenna/broadcast tower SVG.

5. **`theme.css:263` — hero subheadline contrast**
   `color: rgb(232 234 240 / 0.8)` on `#080b14` ≈ 4.4:1 (below 4.5:1 AA). Either increase opacity to `0.85` (~4.7:1) or use `--color-text` at full opacity.

6. **`index.html:409` and `about.html:336` — mascot `role="img"` nesting**
   `<div class="mascot" role="img" aria-label="Vela, your cosmic navigator">` contains an interactive `<button class="mascot__dismiss">`. This is an ARIA nesting violation. Remove `role="img"` from the div; use `aria-label` on the figure element instead, or change wrapper to `<figure aria-label="Vela, your cosmic navigator">`.

7. **`plugins.html:124-125` — aspirational community claim**
   "Find community plugins on GitHub under the detain org once they ship" implies plugins exist. Reword to: "Plugin ecosystem documentation — see phlix-plugin-example to get started."

### Minor (nice to fix)

8. **Add `hreflang="en"` self-referential link to each page** `<link rel="alternate" hreflang="en" href="[canonical-url]" />`

9. **Seasonal Perseid meteor trails** (`SITE.md:57`) not implemented — CSS `@keyframes` for meteor trails + `data-seasonal="0"` handling not present in CSS.

10. **Space Mono 700 woff2** — verify `../../assets/fonts/space-mono-700-latin.woff2` exists at expected path in the build system (out of scope for code review but worth flagging for build verification).
