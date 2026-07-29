# Velocity Rush — Brand Kit Site Review

**Reviewer:** Hostile adversarial audit
**Date:** 2026-07-28
**Kit:** `brand-kits/velocity-rush.js`
**Site:** `sites/velocity-rush/`
**Ground truth:** `shared/content.json`, `new_site.md`, `brand_kit_schema.js`

---

## Summary

| Dimension | Score | Status |
|---|---|---|
| 1. Brand fidelity & spirit | 82 | ⚠️ |
| 2. SEO | 82 | ⚠️ |
| 3. Readability | 88 | ⚠️ |
| 4. Spelling & grammar | 90 | ✅ |
| 5. Usability | 80 | ⚠️ |
| 6. Accessibility | 77 | ⚠️ |
| 7. Responsive | 88 | ⚠️ |
| 8. Performance | 75 | ⚠️ |
| 9. Content accuracy | 65 | ❌ |
| 10. CTA / funnel | 90 | ✅ |
| 11. Social metadata | 68 | ❌ |
| 12. Localization | 95 | ✅ |
| 13. Experience fidelity | 78 | ⚠️ |

**Result: FAILED — 1 critical ❌, 10+ ⚠️ defects require fixes before approval.**

---

## 1. Brand Fidelity & Spirit — Score: 82 ⚠️

**Finding: Missing content from content.json**

The `pitch_bullets` array (7 value props) from `content.json` does not appear anywhere on the home page. `new_site.md §3.1` requires an explicit `.pitch` section with `h2"Why Phlix?"` + pitch bullets list. While the kit's `homepage_narrative` does not list a pitch section, `new_site.md §3.1` is the default page spec that kits override — the override is silent omission of pitch bullets, which conflicts with the spec's mandatory `.pitch` section. The `feature_casting` kit field lists `support: ["transcode","auth","livetv","hub"]` meaning those 4 must appear somewhere, and they do appear on home as card-speed components — but all 8 features from `content.json` should appear. The `plugins` feature (id: "plugins") does not appear on the home page, and the `dlna` feature also does not appear.

`index.html` shows 6 of 8 features in the speed-grid section (SyncPlay, Library, Transcode, Auth, LiveTV, Hub — via card-speed components). Features 7 and 8 (Plugins, DLNA) are absent from the home page.

**Finding: Incorrect stat — "5 Native Clients"**

`index.html:271` — Lap Records section shows `<div class="trust-stat-number">5</div>` with label "Native Clients". Per `content.json.clients[]`, there are **4 native clients** (Roku, Tizen, Windows, Mobile) **plus** any DLNA device. The correct count is 4, not 5. This directly contradicts content.json.

**Finding: JetBrains Mono font files absent from shared pool**

`base.css:193-205` references `../../assets/fonts/jetbrains-mono-400-latin.woff2` and `jetbrains-mono-600-latin.woff2`. `shared/assets/fonts/` contains no `jetbrains-mono-*` files. `new_site.md §19.3`: "escalate — do not substitute silently and do not add a CDN link." The CSS will silently fall through to the `Fira Code` / `Courier New` / `monospace` fallback stack, breaking the kit's `mono` font role (JetBrains Mono for lap-time readouts). The kit explicitly requires JetBrains Mono for data readouts and sync counters; fallback to a different mono face changes the design.

**Positive checks:**
- Colors: all token values match kit exactly. Dark backgrounds (#1C1C1E, #2A2A30), electric cyan (#00F5FF), hot pink (#FF2D55), orange (#FF9500) — correct.
- Typography: Barlow Condensed 700/800 for headlines, Barlow for body, JetBrains Mono specified (but unavailable). Self-hosted WOFF2 for Barlow fonts.
- Angular clip-path on buttons: `components.css:34` and `:154` — 6px parallelogram cuts, consistent with kit's "racing wedge" shape language.
- Corner radius: 2px–4px throughout, never exceeding kit's 4px max. ✅
- Blur-to-focus animation on hero: `theme.css:404-420` — `blur-reveal` keyframe, respects reduced-motion. ✅
- Elastic snap-back on hover: `cubic-bezier(0.34, 1.56, 0.64, 1)` used throughout. ✅
- Racing stripe dividers: `theme.css:282-296` and `components.css:631-644`. ✅
- `brand_opposites` avoided: no "cozy", "warm", "gentle", "playful", "nostalgic", "relaxed" language found anywhere. ✅
- Lap-time counter HUD motif: `.lap-readout` components used for features. ✅
- Mascot Rush: speed-bolt figure at bottom-right, tips on correct pages, 5-click easter egg, localStorage dismiss — all per `mascot.behavior` spec. ✅
- `prefers-reduced-motion` respected in CSS: `theme.css:342` (`hero-backdrop`), `theme.css:609` (`.reveal` elements), `base.css:24-36` (global reset). ✅

---

## 2. SEO — Score: 82 ⚠️

**Finding: JSON-LD only on homepage; features/clients pages missing it**

`features.html`, `clients.html`, `download.html`, `hub.html`, `plugins.html`, `docs.html`, `about.html` — none have the `SoftwareApplication` JSON-LD block. Per `new_site.md §10`, JSON-LD is required on the home page (satisfied) but should be on every page for a complete SEO implementation. However, the spec language "home page" means only index.html explicitly requires it. Marking as ⚠️ (not ❌) because the spec only explicitly requires JSON-LD on the home page.

**Finding: Sitemap includes 404.html**

`sitemap.xml:51-56` — `<loc>https://detain.github.io/phlix-website/velocity-rush/404.html</loc>` is included with `priority 0.1`. Per `new_site.md §10`, 404.html must be excluded from the sitemap. `new_site.md §2A` (error_page_experience) also confirms: "tools/gen-sitemap.mjs deliberately excludes 404.html."

**Positive checks:**
- All `<title>` tags ≤ 60 chars: ✅
- All `<meta name="description">` ≤ 160 chars: ✅
- Canonical URLs absolute and present on all pages: ✅
- Exactly one `<h1>` per page: ✅
- Heading hierarchy is logical and unbroken: ✅
- Descriptive anchor text throughout: ✅

---

## 3. Readability — Score: 88 ⚠️

**Finding: Small body text on dark neutral backgrounds**

`--color-neutral` is `#889` (rgb 136,136,153) — relative luminance ~0.169. On `--color-bg` (#1C1C1E, luminance ~0.011), contrast = ~15.6:1 (passes). On `--color-surface` (#2A2A30, luminance ~0.0199), contrast = ~8.86:1 (passes 4.5:1). However, `--color-neutral` on `--color-surface-alt` (#363640) — the alternate card background used in some contexts — needs verification. At 0.8rem (FAQ answers, feature body), text in `#889` is technically small text (<18pt) and must meet 4.5:1. The measured ratio (8.86:1 on surface) passes but is close to the threshold boundary — if the actual surface color varies slightly in rendering, it could dip below.

**Positive checks:**
- Line length: max-width 560px on subheadlines, 700px on chapter-body — within 70-char equivalent. ✅
- Line height 1.55–1.75 on body text — comfortable. ✅
- No walls of text; sections are broken up. ✅
- Clear visual hierarchy with display-size headlines. ✅
- Reading level: general audience, short punchy sentences. ✅

---

## 4. Spelling & Grammar — Score: 90 ✅

- No typos found in any reviewed text.
- Consistent active voice throughout.
- No instances of kit `avoid_words` ("cozy", "warm", "gentle", "playful", "nostalgic", "relaxed", "leverage", "synergy", "utilize", "seamless", "robust") found anywhere. ✅
- Minor inconsistency: `index.html:299` uses a quote attributed to "Phlix Documentation" which is a generic project reference, not a fabricated person — acceptable per `new_site.md §19.7`.

---

## 5. Usability — Score: 80 ⚠️

**Finding: Clients page repo links point to non-existent repos**

`clients.html:85` — Samsung Tizen links to `https://github.com/detain/phlix-tizen`. Per `content.json.clients[1]`, Tizen's repo is `https://github.com/detain/phlix-tizen-client`. Similarly:
- `clients.html:102` — Windows links to `phlix-windows`, content.json says `phlix-windows-client`.
- `clients.html:119` — Android links to `phlix-android`, content.json says `phlix-mobile-client`.
- `clients.html:136` — iOS links to `phlix-web`, but content.json has no `phlix-web-client`; the mobile entry is `phlix-mobile-client`.

All four client repo links are incorrect. Users clicking "View on GitHub" reach 404 pages.

**Finding: Footer nav lacks explicit `aria-label`**

`index.html:337` — `<footer ... role="contentinfo">` contains a `<nav>` without `aria-label="Footer navigation"`. Per `new_site.md §4` shell spec, the footer nav needs `aria-label="Footer navigation"` to distinguish it from the primary nav landmark.

**Finding: Duplicate H2 text on download page**

`download.html:95` and `download.html:98` both have `<h2>` with "Five clients. Install one." This appears twice in the same page section. Content is duplicated within the same page.

**Positive checks:**
- Download reachable in ≤2 clicks from home: ✅
- Primary CTA "Hit the Gas" above fold on home page: ✅
- Mobile hamburger nav implemented: ✅
- `aria-expanded` toggled correctly: ✅
- Primary action is obvious on every page: ✅

---

## 6. Accessibility — Score: 77 ⚠️

**Finding: FAQ accordion buttons lack `aria-expanded`**

`about.html:109` — `<button class="faq-question" aria-expanded="false">` — The attribute is set in HTML but the JS sets `answer.style.display = isOpen ? 'none' : 'block'` without ever updating the button's `aria-expanded` attribute. The JS at `main.js:96-98` only toggles the `.is-open` class on the parent, never calls `btn.setAttribute('aria-expanded', ...)`. Screen readers will announce all FAQ buttons as "collapsed" regardless of actual state.

**Finding: FAQ answer divs lack `id` for `aria-controls`**

The FAQ answer `<div class="faq-answer">` at `about.html:112` has no `id` attribute. There is no `aria-controls` on the corresponding button. The button-answer relationship is not programmatically determinable by AT.

**Fix needed:** Add `id="faq-0-answer"` to each answer div and `aria-controls="faq-0-answer"` to each button, with JS updating `aria-expanded` on click.

**Finding: Masthead mobile toggle `aria-controls` points to non-existent ID**

`index.html:151` — `<button class="nav-toggle" ... aria-controls="main-nav">`. The nav element at `index.html:140` has `class="main-nav"` but **no `id="main-nav"`**. The `aria-controls` reference is broken — no DOM element with `id="main-nav"` exists. The JS at `main.js:19` queries `.main-nav` (class), not `#main-nav` (ID), so the toggle works visually but the ARIA relationship is broken.

**Finding: Footer `<nav>` missing `aria-label`**

`index.html:337` — `<nav class="footer-nav" aria-label="Footer navigation">` — the `aria-label` is present on `about.html` and `hub.html` footers but NOT on `index.html`, `features.html`, `clients.html`, `download.html`, `plugins.html`, `docs.html`. Only `hub.html:114` and `about.html:157` have it. Violates `new_site.md §4` shell spec: "nav ... aria-label='Footer navigation'".

**Finding: `og:image` SVG format (check-meta.mjs rule 5 violation)**

`index.html:24` — `<meta property="og:image" content=".../og.svg" />`. `og.png` exists in `img/` but the HTML references `og.svg`. `new_site.md §19.5`: "tools/check-meta.mjs rule 5 rejects an SVG og:image — several platforms will not render one." `og.png` must be referenced, not `og.svg`. Also confirmed on `features.html:13`, `clients.html:11`, `download.html:11`, `hub.html:11`, `plugins.html:10`, `about.html:10` — all point to `og.svg`. Only `docs.html` does not have og:image at all.

**Positive checks:**
- Skip link to `#main-content` present on all pages. ✅
- `:focus-visible` with cyan glow on all interactive elements: `base.css:238-242`. ✅
- Touch targets ≥44px: FAQ buttons at 48px+ height, nav items, buttons. ✅
- `prefers-reduced-motion` respected in CSS and JS (checked at `main.js:52` before scroll reveal init). ✅
- `aria-hidden="true"` on all decorative SVG icons. ✅
- Contrast: white #FFF on dark backgrounds > 16:1; cyan #00F5FF on surface > 4.73:1 (meets 3:1 for large text/UI); muted text #889 on surface > 8.86:1 (meets 4.5:1). ✅

---

## 7. Responsive — Score: 88 ⚠️

**Finding: `grid-template-columns: repeat(2, 1fr)` pattern used**

The `trust-stats` grid at `components.css:646-653` uses `display:flex; flex-wrap: wrap` — this is safe. The `speed-grid` at `components.css:377-382` correctly uses `minmax(0, 1fr)` — ✅. The `network-grid` at `components.css:363-367` uses `minmax(0, 1fr)` — ✅.

However, the feature grid inside the speed section on `index.html:228` uses `grid-template-columns: repeat(auto-fill, minmax(0, 1fr))` — correct.

The footer grid at `theme.css:522-525` uses `repeat(auto-fit, minmax(0, 1fr))` — correct.

**Finding: Inline `grid-template-columns: repeat(auto-fill, minmax(0, 1fr))` at `index.html:228`**

This is correct behavior. Overall grid handling is properly `minmax(0, 1fr)`. ✅

**Positive checks:**
- `clamp()` used for fluid typography throughout (hero-headline `clamp(3rem,8vw,5.5rem)`). ✅
- Mobile hamburger menu: `theme.css:194-242`. ✅
- Responsive hiding via `@media (width <= 640px)` and `480px` breakpoints. ✅
- No fixed-px layout widths; fluid widths + max-content-width. ✅
- `overflow-wrap: anywhere` on `p, h1, h2, h3...` at `base.css:67-76`. ✅
- `overflow-wrap: break-word` on headings (not `anywhere`) per `new_site.md §19.12` guidance — correct. ✅

---

## 8. Performance — Score: 75 ⚠️

**Finding: `<script>` tags missing `defer` attribute**

All pages: `index.html:403`, `features.html:216`, `clients.html:188`, `download.html:205`, `hub.html:125`, `plugins.html:112`, `docs.html:99`, `about.html:181`, `404.html:33` — `<script src="js/main.js"></script>` without `defer`. Per `new_site.md §7`: "vanilla, dependency-free, `defer`-loaded." The script is render-blocking on all pages.

**Finding: JetBrains Mono font files not in shared pool**

`base.css:193-205` references two JetBrains Mono WOFF2 files that do not exist in `shared/assets/fonts/`. The browser will fail to load these fonts and fall back to the system mono stack. The kit's entire lap-time counter / HUD / telemetry data visual identity (central to Velocity Rush) is rendered in a fallback monospace font rather than JetBrains Mono.

**Positive checks:**
- No Google Fonts CDN links. ✅
- No icon CDNs. ✅
- No third-party scripts. ✅
- Barlow fonts self-hosted in `shared/assets/fonts/`. ✅
- No external image dependencies. ✅
- CSS loaded in `<head>` before body; JS at end of body. ✅

---

## 9. Content Accuracy — Score: 65 ❌

**CRITICAL FINDING: Wrong install command on download page**

`download.html:64` — Install code block shows:
```
git clone https://github.com/detain/phlix-server.git && cd phlix-server && composer install && php -S 0.0.0.0:8080
```

This is a **development checkout**, not an install. Per `new_site.md §19.22` and `content.json.install.primary`:
- The correct install command is a **single line**: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`
- The `from_source` block (3-line git clone) is explicitly labeled "Build from source (development, not an install)" and must never be presented as the install method.
- The content.json note warns: "16 shipped `git clone && composer install` as if it were the install" — this site repeats exactly that error.

`download.html:67` notes also incorrectly say "Requires PHP 8.3+, Composer, and a web server" — missing MySQL and ffmpeg which are required per `content.json.install.requirements`.

**CRITICAL FINDING: "5 Native Clients" contradicts content.json**

`index.html:270` — "5 Native Clients" is factually wrong. `content.json.clients[]` has 4 entries with `status:"stable"` (Roku, Tizen, Windows, DLNA) and 1 with `status:"beta"` (Mobile = iOS+Android). The "5 native clients" claim appears nowhere in content.json and directly violates the "never invent" rule. The correct count is 4 stable + 1 beta = 5 total, but the label "Native Clients" applied to 5 is wrong since one is beta.

Additionally, `clients.html:52` heading reads "Five cockpits" while the grid shows **6 cards** (Roku, Samsung Tizen, Windows, Android, iOS, Any Browser). The heading is factually inconsistent with the displayed content.

**Finding: Transcode feature adds AV1 codec claim**

`index.html:232` — "HEVC, VP9, AV1" in the transcode card. `content.json.features[2]` (transcode) only mentions "CRF 23/28 libx264/libx265 with HLS master and variant playlists" — AV1 is not in content.json. This is an invented spec claim. The features.html page uses a more conservative "HEVC, VP9, AV1, H.264" which is closer but still unverified.

**Finding: Auth feature claim "TLS everywhere" unverified**

`index.html:237` — "TLS everywhere". `content.json.features[3]` (auth) only mentions "JWT auth with refresh tokens, Argon2ID password hashing" — TLS is not mentioned. This is an invented claim not traceable to content.json.

**Finding: Hub "always in sync" not in content.json**

`hub.html:93` — "Watch progress, playlist state, and playback position sync across sessions automatically." `content.json.features[7]` (hub) only says "Sign in once. Reverse-tunnel relay handles NAT." The "watch progress sync" claim is not in content.json.

**Positive checks:**
- FAQ answers match content.json faq[].a verbatim: ✅ (verified each of 6 FAQ items)
- License: MPL-2.0 stated correctly: ✅
- GitHub org and repo links: ✅
- Tagline "Open-source media, full throttle." consistent with kit's secondary taglines: ✅

---

## 10. CTA / Funnel — Score: 90 ✅

- Primary CTA "Hit the Gas" (`index.html:179`) above fold in hero section. ✅
- Secondary CTA "Read the Specs" de-emphasized (ghost style, `index.html:183`). ✅
- 3:1 contrast ratio on primary CTA: cyan #00F5FF on #1C1C1E ≈ 5.7:1 — passes. ✅
- Download in ≤2 clicks from home: home → download.html. ✅
- CTA ladder on home page: steps 01/02/03 with primary CTA on "Hit the Gas". ✅

**Deduction:** The "Read the Specs" secondary CTA links to `features.html` which is appropriate, but the kit's `copy_overlay` specifies "Read the Specs" as the secondary CTA — this matches.

---

## 11. Social Metadata — Score: 68 ❌

**CRITICAL FINDING: `og:image` pointing to SVG on all pages**

All 8 pages + 404.html reference `og.svg` not `og.png`. `og.png` exists in `img/` but is not referenced. Per `new_site.md §19.5`: rule 5 of `tools/check-meta.mjs` rejects SVG og:image. Platform support for SVG og:image is inconsistent (Twitter/X, LinkedIn, WhatsApp all prefer PNG). All pages must reference the rasterized `og.png`.

Pages affected: `index.html:24`, `features.html:13`, `clients.html:11`, `download.html:11`, `hub.html:11`, `plugins.html:10`, `about.html:10`.

**CRITICAL FINDING: Twitter card missing on most pages**

| Page | twitter:card | twitter:title | twitter:description | twitter:image |
|---|---|---|---|---|
| index.html | ✅ | ✅ | ✅ | ✅ |
| features.html | ✅ | ❌ | ❌ | ❌ |
| clients.html | ❌ | ❌ | ❌ | ❌ |
| download.html | ❌ | ❌ | ❌ | ❌ |
| hub.html | ❌ | ❌ | ❌ | ❌ |
| plugins.html | ❌ | ❌ | ❌ | ❌ |
| about.html | ❌ | ❌ | ❌ | ❌ |
| docs.html | ❌ | ❌ | ❌ | ❌ |

Per `new_site.md §11`: Twitter card is required on every page `<head>`.

**CRITICAL FINDING: OG meta missing on several pages**

- `hub.html`: missing `og:type`, `og:site_name`, `og:url`, `og:description`.
- `plugins.html`: missing `og:type`, `og:site_name`, `og:url`, `og:description`, `twitter:*`.
- `about.html`: missing `og:type`, `og:site_name`, `og:url`, `og:description`, `twitter:*`.
- `docs.html`: missing `og:type`, `og:site_name`, `og:url`, `og:description`, `twitter:*`.
- `clients.html`: missing `og:title`, `og:description`, `og:url`, `og:site_name`, `twitter:*` (only og:image present).
- `download.html`: missing `og:type`, `og:site_name`, `og:url`, `og:description`, `twitter:*`.

**Finding: 404.html missing all social meta**

`404.html` has no `og:image`, `og:url`, `og:description`, `twitter:*`, `canonical`, or `robots` meta. Per `new_site.md §2A`, 404.html should have `noindex` and canonical/og:url following the normal rule.

---

## 12. Localization — Score: 95 ✅

- `<html lang="en">` on all pages: ✅
- All user-facing strings trace to content.json or kit copy_overlay: ✅
- `prefers-reduced-motion` gating in CSS and JS: ✅
- Logical CSS properties used (`inline-start/end` not hardcoded left/right): ✅

---

## 13. Experience Fidelity — Score: 78 ⚠️

**Finding: Nav has 6 items; kit specifies 8**

`site_architecture.nav` lists 8 entries (home, features, clients, download, hub, about, demoted: plugins/docs). The actual nav at `index.html:141-148` has only 6 items: LAUNCH, SPEED GRID, PIT CREW, GET IN, RELAY, DATA. Plugins and Docs are missing from the nav. Per `new_site.md §2` and kit `site_architecture`, all 8 pages must be reachable from the primary nav.

**Finding: Homepage narrative section count**

The kit's `homepage_narrative.sections` lists 5 sections. The site implements 4: Launch (hero), Speed-grid (feature grid), Lap-records (trust band), Full-throttle (CTA). The "why-fast" section (story-based "Performance Specs" grid) is implemented as Lap-records with spec numbers but without the "Why wait?" pitch bullets section.

**Positive checks:**
- `homepage_narrative.arc: "feature-first"` — home page leads with feature showcase: ✅
- `feature_casting.hero` (SyncPlay + Library) as lead features: ✅
- `proof_strategy.signals` rendered as HUD telemetry placard: ✅
- `page_blueprints.features` template "speed-dashboard" with 8 lap-readouts: ✅
- `page_blueprints.download` "race-start" template: partial (install command wrong)
- `page_blueprints.about` "telemetry" template: ✅
- `faq_experience.frame: "telemetry-log"` with Q./A. prefixes: ✅
- `mascot.behavior` implemented per spec (placement, idle, tips, easter_interactions): ✅
- Season activation: Night Circuit (09-01..10-31) and Championship Lap (11-01..11-30) date gates: ✅

---

## Required Fixes (Score < 90 or any ❌)

### Critical (content accuracy / legal / security)

1. **`download.html:64` — Replace install command**
   Replace the `git clone && composer install` code block with `content.json.install.primary.command`:
   ```
   curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash
   ```
   Update the label and notes to match `content.json.install.primary.label` and `what_it_does`.

2. **`download.html:67` — Fix install notes**
   Replace "Requires PHP 8.3+, Composer, and a web server" with the actual `content.json.install.requirements`: "PHP 8.3+, MySQL, ffmpeg."

3. **`index.html:270` — Fix "5 Native Clients" stat**
   Replace with "4 Native Clients" to match `content.json.clients[]` (4 stable + 1 beta). Or use "5 total" if separating stable from beta.

4. **`clients.html:52` — Fix heading or card count**
   Either change h1 to "Six cockpits" to match 6 cards, or remove the "Any Browser" card and change heading to "Five cockpits." The "Any Browser" card refers to the web UI / DLNA fallback — not a native client.

5. **`clients.html:85,102,119,136` — Fix client repo URLs**
   Correct per `content.json.clients[].repo`:
   - Samsung: `https://github.com/detain/phlix-tizen-client`
   - Windows: `https://github.com/detain/phlix-windows-client`
   - Android/iOS: should link to one Mobile entry → `https://github.com/detain/phlix-mobile-client`

6. **`index.html:232,237` — Remove unverified claims**
   - Remove "AV1" from transcode card
   - Remove "TLS everywhere" from Auth card

### High priority (broken links / a11y)

7. **All pages — Fix `og:image` references**
   Change `content=".../og.svg"` to `content=".../og.png"` on: `index.html:24`, `features.html:13`, `clients.html:11`, `download.html:11`, `hub.html:11`, `plugins.html:10`, `about.html:10`.

8. **All pages except index.html — Add Twitter card meta**
   Add `twitter:card="summary_large_image"`, `twitter:title`, `twitter:description`, `twitter:image` to: `features.html`, `clients.html`, `download.html`, `hub.html`, `plugins.html`, `about.html`, `docs.html`.

9. **About, hub, plugins, docs, clients, download — Add missing OG meta**
   Add `og:type="website"`, `og:site_name="Phlix"`, `og:url` (absolute), `og:description` to pages missing these.

10. **`sitemap.xml` — Remove 404.html entry**
    Remove lines 51–56 (`<url>` for 404.html).

11. **`about.html:109` — Fix FAQ `aria-expanded`**
    Update JS (`main.js:79-100`) to call `btn.setAttribute('aria-expanded', String(!isOpen))` when toggling. Also add `id` to each `.faq-answer` div and `aria-controls` to each button.

12. **`index.html:140` — Add `id="main-nav"` to `<nav>`**
    Change `<nav class="main-nav">` to `<nav id="main-nav" class="main-nav">` on all pages so the `aria-controls="main-nav"` on the toggle button resolves.

13. **Footer nav `aria-label` on index, features, clients, download, plugins, docs**
    Add `aria-label="Footer navigation"` to `<nav class="footer-nav">` on all pages that are missing it.

### Medium priority (brand fidelity / performance)

14. **Escalate JetBrains Mono font to pool or remove**
    Per `new_site.md §19.3`, escalate to the shared pool owner to add JetBrains Mono WOFF2 files. Do NOT add a CDN link. Do not substitute silently.

15. **`download.html:95,98` — Remove duplicate H2 text**
    Change one of the two "Five clients. Install one." headings.

16. **All pages — Add `defer` to `<script>` tag**
    Change `<script src="js/main.js">` → `<script src="js/main.js" defer>` on all 9 HTML files.

---

## Approved Dimensions (Score ≥ 90, no ❌)

- **4. Spelling & grammar** ✅ — 90
- **10. CTA / funnel** ✅ — 90
- **12. Localization** ✅ — 95

---

*APPROVED — no defects found: NO. The site has 1 critical ❌ (wrong install command), 1 critical ❌ (content accuracy violations), and 2 critical ❌ (social metadata on most pages). Fix all critical items and re-review before approval.*
