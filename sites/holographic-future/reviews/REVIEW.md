# REVIEW — holographic-future brand kit site

**Reviewer:** Hostile audit (no Google Fonts CDN, all 13 dimensions)
**Ground truth:** `new_site.md` + `shared/content.json`
**Lint:** `npm run lint` — PASSED clean

---

## 1. Brand fidelity & spirit — **92** ✅

All design tokens trace to the kit exactly. Electric blue `#0096FF` anchor, prismatic violet `#8B5CF6`, iridescent cyan `#22D3EE`, midnight `#0D1117`, chrome white `#F0F4F8`. Glassmorphism surfaces (`backdrop-filter: blur`, `rgba(255,255,255,0.06)` fill, `1px` `rgba(255,255,255,0.12)` border) on every card. Prismatic spectrum divider (`linear-gradient(120deg, #FF0080, #FF8C00, #FFE600, #00FF88, #0096FF, #8B5CF6)`). AR panel cards with shimmer sweep `::after`. Custom nav labels (`Signal`/`Calibrate`/`Dimensions`/`Interface`/`Relay`/`Spectrum`) from `site_architecture.nav`. Lux mascot at `#mascot-lux` with localStorage dismissal and section-aware tips. Both easter eggs (logo-clicks:7 spectrum spray, typed-word:refract diffraction overlay) wired per kit spec. Seasonal activation live-js date-gate with 3 variants. `prefers-reduced-motion` kills both transitions AND animations (not just one). Kit's Do/Dont list followed throughout. No warm tones, no organic shapes, no matte surfaces.

**Minor:** The Orbitron weight gap (kit wants 300, pool only has 400/700) is documented in BUILD_LOG.md. JetBrains Mono 500 declared in CSS but not in kit (harmless unused declaration). These are known and documented deviations — acceptable.

---

## 2. SEO — **88** ⚠️

Every page has `<title>` ≤ 60 chars, page-specific. Every page has `<meta name="description">` ≤ 160 chars from content. Every page has `<meta name="keywords">`. Canonical URL on every page (absolute). Single `<h1>` per page, unbroken heading hierarchy, semantic landmarks (banner/nav/main/contentinfo). Descriptive anchor text throughout. `sitemap.xml` has all 8 canonical pages, absolute URLs, no `404.html`. `robots.txt` references sitemap. ✅

**Missing:** No JSON-LD `SoftwareApplication` block on home page (spec §10 requires it: name, description, applicationCategory, operatingSystem, offers/price=0, license). new_site.md §18 gate 3 says SEO must be "complete" — JSON-LD is part of that. ⚠️

**Potentially missing:** `og:image` dimensions (1200×630) unverified without rendering. Relying on `tools/gen-og.mjs` generation.

---

## 3. Readability — **90** ✅

Body: Inter 300, 1rem, line-height 1.65 — legible. Max-width 1200px, padding `var(--space-6)` on containers. Headings: Orbitron, wide letter-spacing, compressed line-height. CTA label "Enter the interface" is 3 words — within a reasonable CTA length. Feature card body 0.875rem, line-height 1.6. All body text uses the kit's `color-text-muted` (`#C8D0DA`) on dark, which is the measured safe variant.

---

## 4. Spelling & grammar — **95** ✅

Footer copyright "Phlix Server and the Hub are MPL-2.0. Shared libraries, plugins, and clients are MIT." — correct, no fake symbol. Download page `from_source` correctly labeled "Development checkout (not an install)" with the disclaimer "This does not create a database, a service, or run migrations. Never present it as the way to install Phlix." — verbatim from content.json. Brand voice is precise and declarative throughout. No exclamation marks. No hype language.

---

## 5. Usability — **90** ✅

Primary CTA "Enter the interface" → `download.html` (download goal). Secondary "Read the calibration docs" → external docs. Download page CTA banner links to docs (correct for that page per §5). Footer links to all 3 columns per content.json.footer. Hub mode section on hub.html mentions all 4 native clients. Links use `target="_blank" rel="noopener noreferrer"` throughout. Code blocks for install command use `.install-command` class with `word-break: break-all`. `tabindex="-1"` on `<main>` for skip-link target. Skip-link styled with visible focus.

---

## 6. Accessibility (WCAG 2.2 AA, `prefers-reduced-motion`, 44px targets, 200% zoom) — **85** ⚠️

- Skip link: first focusable element, visible on focus, targets `#main-content` ✅
- All landmarks present once each: `role="banner"`, `role="navigation"`, `main`, `role="contentinfo"` ✅
- `aria-current="page"` on active nav link ✅
- `aria-expanded`/`.is-open` pattern on hamburger ✅
- Escape key closes mobile nav and refocuses toggle ✅
- All SVGs have `aria-hidden="true"` (icons) ✅
- `role="img"` + `aria-label` on mascot div ✅
- Focus ring: `box-shadow: 0 0 0 2px var(--color-bg), 0 0 0 4px var(--color-primary)` — visible on dark ✅
- `prefers-reduced-motion`: JS gates all animation behind `matchMedia` check; CSS `@media (prefers-reduced-motion: reduce)` resets transitions AND animations to `0.01ms` (both, not just transitions) ✅
- Touch targets: `.nav-toggle` 44×44px minimum; all interactive elements adequate ✅
- `overflow-wrap: anywhere` on `p, li, dd, code, samp` for word wrap in narrow tracks ✅
- `hyphens: auto; overflow-wrap: break-word` on headings ✅

**Issues:**
- Kit spec `accessibility.touch_target` says "48×48px on mobile and TV" (kit-specific stricter standard), but `.nav-toggle` is exactly 44×44px (WCAG minimum). This is a minor shortfall. ⚠️
- `prefers-reduced-motion` CSS reset in base.css also applies `scroll-behavior: auto !important` which overrides the smooth scroll behavior — correct behavior but worth noting. ✅
- No `<label>` or `aria-label` on any form inputs because there are no forms on the site — not applicable. ✅

---

## 7. Responsive (320→1920) — **85** ⚠️

- `@media (width >= 768px)` collapses hamburger; desktop nav is flex row ✅
- `@media (width >= 640px)` path-options go row ✅
- `.content-grid { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) }` — good ✅
- `.content-grid--2col { grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)) }` — good ✅
- Mobile: nav menu `position: absolute; top: var(--nav-height)` drops down correctly ✅
- Nav logo text hidden below 480px (`display: none` → `block`) ✅
- Mascot `#mascot-lux` switches from `position: fixed` at bottom-right to `position: static` on mobile ✅
- `.mascot-tip` same responsive repositioning ✅
- `clamp()` used throughout for fluid typography: `h1 { font-size: clamp(2rem, 5vw, 3.5rem) }` etc. ✅
- Footer nav grid: `repeat(auto-fit, minmax(160px, 1fr))` — fluid ✅

**Issue:** `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))` — the `1fr` track has an implicit `auto` minimum. Per new_site.md §19.12, this can cause overflow at 320px if a cell's content exceeds 280px. The grid will wrap to 1 column but the track can still overflow on very long unbreakable content. Proper fix: `minmax(0, 1fr)` instead of `1fr`. ⚠️

Same issue on `.content-grid--2col { grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)) }`.

---

## 8. Performance (self-hosted fonts, no CDNs) — **95** ✅

- All `@font-face` declarations point to `../../assets/fonts/*.woff2` — self-hosted ✅
- `font-display: swap` on every face ✅
- No Google Fonts CDN links in any HTML ✅
- All 3 CSS files: `link rel="stylesheet"` in `<head>`, no `media="print"` hiding ✅
- `js/main.js` has `defer` ✅
- Images: `img/` directory has SVG sources + raster PNGs; no external image CDNs ✅
- No third-party scripts ✅
- Seasonal activation, easter eggs, mascot tips — all self-contained vanilla JS ✅
- `@media (prefers-reduced-motion: reduce)` in CSS resets animation/transition without needing JS ✅
- Scroll reveals gated behind `IntersectionObserver` feature detection ✅

**Note:** Font files verified to exist in `shared/assets/fonts/`. All declared weights present (orbitron-400, orbitron-700, space-grotesk-300/400/500/600/700, inter-300/400/500, jetbrains-mono-300/400/500).

---

## 9. Content accuracy — **75** ❌

**Missing entire section — pitch bullets:**
`index.html` has no "Why Phlix?" pitch section with `pitch_bullets[]` as a list. new_site.md §3.1 item 2 explicitly requires `<h2>Why Phlix?</h2>` + `pitch_bullets` as a list on the home page. The kit's `copy_treatments.pitch_bullets: "spec-rows"` specifies the rendering style. This is a **required page section** that is entirely absent. ❌

**Incorrect fact — proof band "5 Native clients":**
`index.html` proof-band displays `5` as the "Native clients" value. Content.json pitch_bullets[1] correctly states: "Native clients on Roku, Samsung Tizen, Windows, Mobile, plus any DLNA device" — 4 apps + DLNA protocol. new_site.md §19.14 explicitly resolves this conflict: "A kit says '5 native clients' → content.json wins. It is **four** native clients — Roku, Tizen, Windows, Mobile (beta) — **plus any DLNA device**." The proof_strategy in the kit's own `proof_strategy.signals[0]` says "5 native clients" which contradicts the new_site.md §19.14 resolution that the kit's own ambiguity table flags. The site reproduces this incorrect claim. ❌

**Everything else verified ✅:**
- Install command on download.html: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash` — exact match to `content.json.install.primary.command` ✅
- `from_source` correctly marked "Development checkout (not an install)" ✅
- All 8 features present on features.html with correct content ✅
- All 5 clients on clients.html: Roku/Tizen/Windows/Mobile/DLNA ✅
- Clients page: "Five ways to reach your library" with "Five dimensions of access" eyebrow — consistent with 5 objects in content.json ✅
- Mobile status badge: "Beta" ✅
- Client highlights match content.json.clients[].highlights[] ✅
- Ecosystem items on download.html: all 5 ecosystem repos with correct descriptions ✅
- FAQ: all 6 canonical answers verbatim from content.json ✅
- Extra FAQ questions correctly mapped to canonical answers per kit `faq_experience.extra_questions` ✅
- `feature_casting` implemented correctly: 3 hero AR panels (syncplay, transcode, hub) + 5 support cards (library, auth, livetv, dlna, plugins) ✅
- Footer license copy: "Phlix Server and the Hub are MPL-2.0. Shared libraries, plugins, and clients are MIT." — correct ✅

---

## 10. CTA / funnel — **88** ⚠️

- Primary CTA "Enter the interface" on home → `download.html#server` ✅
- Secondary CTA "Read the calibration docs" → external docs ✅
- Download page CTA banner → docs ✅
- Features page CTA → `download.html` ✅
- CTA ladder (conversion_funnel) step 2 "See your devices lit up" → `clients.html` ✅
- CTA ladder (conversion_funnel) step 3 "Calibrate your setup (install)" → `download.html#server` ✅
- Download page "Enter the interface" on hero and CTA banner (correct per kit copy_overlay) ✅

**Issue:** The CTA labels are kit `copy_overlay` overrides (the kit re-voices them), which is permitted per new_site.md §2. However, the kit's `copy_overlay.hero.primary_cta` only overrides the `label` to "Enter the interface" — the href is still `download.html` per the spec. The accessible name matches the destination. ✅ But new_site.md §19.7 item 2 says: "When `copy_overlay` overrides only a label and the href still goes elsewhere, make the visible text honest... so the accessible name matches what happens on click." Here the href goes to download (correct destination for an install CTA), so the label "Enter the interface" is accurate for an install funnel.

**Minor:** The home page CTA "Enter the interface" is below the fold (after hero + features + proof-band + visit-paths). Per new_site.md §5: "Primary CTA visible above the fold." On a typical viewport, the hero CTA ("Enter the interface" + "Read the calibration docs") is visible above the fold — the primary CTA appears in the hero section, which satisfies the requirement. ✅

---

## 11. Social metadata (OG + Twitter, og:image PNG) — **80** ⚠️

- `og:type` = `website` ✅
- `og:site_name` = `Phlix` ✅
- `og:url` absolute on every page ✅
- `og:title`, `og:description` on every page ✅
- `og:image` absolute URL on every page (`https://detain.github.io/phlix-website/holographic-future/img/og.png`) ✅
- `og:image` is `.png` not `.svg` ✅
- `twitter:card` = `summary_large_image` on all pages (except 404.html — no twitter card on error page is fine) ✅
- `twitter:title`, `twitter:description`, `twitter:image` on all pages ✅
- `theme-color` = kit primary (`#0096FF`) on all pages ✅
- Favicon `image/svg+xml` on all pages ✅

**Missing:** `twitter:creator=@detain` — new_site.md §11 explicitly requires `twitter:creator=@detain`. All 9 HTML pages omit this meta tag. ❌

**Unverified:** `og:image` is 1200×630px. File exists at `img/og.png` but dimensions not programmatically verified here.

---

## 12. Localization — **100** ✅

- `<html lang="en">` on all pages ✅
- `content.json.site.supported_locales` = `["en"]` ✅
- No locale-unsafe formatting detected ✅
- No hardcoded locale assumptions ✅
- Fonts subset to Latin scripts ✅
- Logical CSS properties (`inline-start/end` equivalents in flex/grid where applicable) ✅

---

## 13. Experience fidelity — **90** ✅

Fully implements the kit's `experience_archetype: "interactive-demo"`. Lux mascot with section-aware tips, dual easter eggs (logo spectrum spray + diffraction overlay), seasonal live-js date-gate, visitor path self-select fork, scroll parallax + scroll reveals, AR-panel hero feature layout, man-page FAQ with Lux persona and extra questions, chapter-scroll about page layout, device-rack clients layout, portal-entry download layout, spec-sheet features layout. All experience fields from the kit are either implemented or explicitly marked `null` (e.g., `intensity_toggle: null`). Brand kit deviation noted (lux.svg placeholder via CSS div — documented in BUILD_LOG.md). No Google Fonts CDN. No CDNs at all.

---

## Summary

| # | Dimension | Score | Status |
|---|----------|-------|--------|
| 1 | Brand fidelity & spirit | 92 | ✅ |
| 2 | SEO | 88 | ⚠️ |
| 3 | Readability | 90 | ✅ |
| 4 | Spelling & grammar | 95 | ✅ |
| 5 | Usability | 90 | ✅ |
| 6 | Accessibility | 85 | ⚠️ |
| 7 | Responsive | 85 | ⚠️ |
| 8 | Performance | 95 | ✅ |
| 9 | Content accuracy | 75 | ❌ |
| 10 | CTA / funnel | 88 | ⚠️ |
| 11 | Social metadata | 80 | ⚠️ |
| 12 | Localization | 100 | ✅ |
| 13 | Experience fidelity | 90 | ✅ |

**Average: 88.7**

---

## Fixes needed

### ❌ CRITICAL — content.json spec violation (blocks approval)

1. **`index.html` is missing the "Why Phlix?" pitch section** — new_site.md §3.1 item 2 explicitly requires `<h2>Why Phlix?</h2>` + `pitch_bullets` as a list on the home page. The kit's `copy_treatments.pitch_bullets: "spec-rows"` specifies rendering. Add a `.pitch` section between hero and core-dimensions with the 7 `pitch_bullets` rendered as `.spec-rows`.

2. **Proof band "5 Native clients" is factually wrong** — `index.html:333`. Content.json pitch_bullets[1] correctly says "four native clients + any DLNA device." new_site.md §19.14 resolves this: content.json wins. Change the proof-item value from `5` to `4` and label to "Native apps". Add a separate proof-item for "DLNA" to account for the 5th content.json client object.

### ⚠️ MEDIUM — spec incomplete

3. **`twitter:creator=@detain` missing from all 9 pages** — Add `<meta name="twitter:creator" content="@detain" />` to every `<head>` (every HTML file that has `twitter:card`). Reference: new_site.md §11.

4. **JSON-LD `SoftwareApplication` missing from `index.html`** — Add the JSON-LD block to `<head>` per new_site.md §10. Should include: name="Phlix", description, applicationCategory, operatingSystem, offers/price=0, license.

5. **`grid-template-columns: 1fr` implicit auto minimum** — `index.html:1008` `.content-grid` and `index.html:1013` `.content-grid--2col`. Change `1fr` to `minmax(0, 1fr)` per new_site.md §19.12 to prevent overflow at 320px and 200% text zoom.

---

## APPROVED? NO — 3 ❌, 4 ⚠️

Three critical spec violations (missing pitch bullets, wrong client count, missing twitter:creator) plus four medium-severity issues must be resolved before approval.
