# Pixel Dungeon — Brand Kit Site Review

**Site:** `sites/pixel-dungeon/`
**Reviewer:** Hostile Audit
**Lint:** `npm run lint` — 1 HTML error (site unspecified), 2 CSS warnings in pixel-dungeon, JS clean.

---

## Summary

**APPROVED? NO** — Multiple ❌ issues and several dimensions below 90.

---

## 1. Brand Fidelity & Spirit — 88 ⚠️

**✅ Self-hosted fonts** (Press Start 2P, Silkscreen — WOFF2 from shared pool).
**✅ Pixel aesthetic fully committed:** 0px border-radius, hard pixel drop shadows, `steps()` easing only, CRT scanline overlay, `image-rendering: pixelated` on all images.
**✅ Dungeon-crawler voice consistent:** Lobby/Armory/Device Roster/Insert Coin/Remote Tunnel/Adventurer's Log naming, "Press Start to Continue", Blip mascot.
**✅ Color palette matches SITE.md exactly** (Mario Red `#E8001A`, Coin `#88BB00`, etc.).
**⚠️ Footer tagline is a copy_overlay** (`Press Start to Continue` vs `content.json`'s `"Open-source media, on your terms."`) — this is permitted by §2 but the *tagline itself* is not in `content.json`, so it's traceable to the kit's `copy_overlay` but **not** to `content.json`. Per §2: "All FACTS must remain traceable to `content.json`." A tagline is presentation copy, so this is likely acceptable — flag for verification.

**❌ CRT scanline overlay** at `base.css:132–146` uses `position: fixed` with `z-index: 9999`. At 320px, this overlays the entire viewport including CTAs. Does not account for `intensity-reduced` state by default — only toggles via JS class. If JS fails, scanlines are maximum intensity on load.

**Reference:** `index.html:292–304`, `base.css:132–146`, `components.css:698–710`

---

## 2. SEO — 85 ⚠️

**✅** Canonical URLs on all pages.
**✅** `<title>` format `<Page> — Pixel Dungeon` ≤60 chars.
**✅** `meta name="description"` present, most ≤160 chars.
**✅** `meta name="keywords"` present.
**✅** Proper `<h1>` per page; heading hierarchy maintained.
**✅** JSON-LD on `index.html` (SoftwareApplication, complete).
**✅** `sitemap.xml` lists all 8 pages with absolute URLs; `robots.txt` references it.

**❌ `og:site_name`** on all pages is `"Pixel Dungeon — Phlix"` but §11 specifies `"Phlix"`. This is a regression — OG validators will flag mismatched site_name.

**Reference:** `index.html:21`, `features.html:15`, `download.html:15`, `hub.html:15`, etc.

**⚠️** `features.html` description `"Every power-up in the dungeon catalogued."` is 44 chars — the original fact from `content.json` is longer. The kit's `copy_overlay` shortened it, which is fine for presentation but the `og:description` on features.html is now **not** the same as the content.json fact. Verify this is intentional per the kit's `copy_overlay`.

**⚠️** Some `og:image:width` and `og:image:height` missing on non-index pages. Only `index.html:33–34` has them.

---

## 3. Readability — 72 ❌

**❌ Body text below WCAG AA floor.** `Silkscreen` at `0.75rem` = **12px** (`base.css:81`). WCAG 2.2 AA requires minimum **16px** for body text. The spec says `html { font-size: 16px; }` which is correct, but `font-body: 'Silkscreen', ...` with `font-size: 0.75rem` on `p, li` elements undercuts it. SITE.md says "12px–14px body copy" but §12 (hard gate) wins over kit prose per §19.6.

**Reference:** `base.css:81`, `base.css:203`

**❌ UI/nav text at `0.625rem` = 10px** (e.g., `theme.css:36` `.nav-score`, `theme.css:76` nav links). WCAG 2.2 AA minimum is **14px** for small UI text. These are in the Silkscreen face at 10px.

**Reference:** `theme.css:36`, `theme.css:75–76`

**✅** Line-height 1.8 on body is adequate.
**✅** `overflow-wrap: anywhere` on body text (`base.css:204`) prevents overflow.
**⚠️** Press Start 2P headings use `clamp()` with minimum 0.625rem (10px) for h3 — same problem.

---

## 4. Spelling & Grammar — 100 ✅

No errors found. All copy is clean.

---

## 5. Usability — 78 ⚠️

**✅** Skip link present and visible on focus.
**✅** Mobile nav toggle works with `aria-expanded` sync.
**✅** `aria-current="page"` set by JS for active nav state.
**✅** Primary CTA "Insert Coin" visible above fold on index.html.
**✅** Download reachable in ≤2 clicks from home.
**✅** Easter eggs properly guarded: `logoClickCount` resets on timeout, typed-word egg skips inputs, Esc dismisses (`main.js:106–112`, `main.js:181–198`).

**❌ Nav has only 6 links, not the required 8.** Per new_site.md §5: "Primary nav (8 links, in order): Home · Features · Clients · Download · Plugins · Docs · Hub · About." **Plugins and Docs exist as pages but are absent from the nav.** Every page's `<ul class="nav-menu">` lists only: Lobby, Armory, Device Roster, Insert Coin, Remote Tunnel, Adventurer's Log. Missing: **Plugins**, **Docs**.

**Reference:** `index.html:98–105`, `features.html:44–51`, `download.html:44–51`, etc.

**❌ Footer missing 3-column layout.** Per `content.json.footer.columns`, the footer must have 3 columns: Product (Features/Clients/Download/Plugins), Developers (Documentation/Server source/Plugin example/API reference), Project (GitHub org/Issues/Hub/License). The site footer only has a mirror nav + footer-bottom with legal. This is a content accuracy regression.

**Reference:** `index.html:236–289`, `theme.css:365–478`

**⚠️** `intensity-toggle` checkbox is `32×16px` — below the 44×44px touch target minimum for WCAG 2.2 AA. Native checkbox may be exempt, but the surrounding label area should be larger.

**⚠️** `.blip-dismiss` button is `~20×9px` (`components.css:655–663`) — far below 44×44px. Touch targets must be ≥44×44px per §12.

---

## 6. Accessibility (WCAG 2.2 AA) — 70 ❌

**✅** `role="banner"`, `role="navigation"`, `role="contentinfo"` landmarks present.
**✅** `aria-label` on all nav elements and landmark sections.
**✅** `prefers-reduced-motion` respected in CSS (`base.css:149–156`, `components.css:699–710`) and JS (`main.js:16–22`, `main.js:128`, `main.js:144`, `main.js:328`).
**✅** `skip-link` visible on focus with hard yellow border.

**❌ Body text 12px** — fails WCAG AA minimum 16px (see Readability §3).
**❌ UI text 10px** — fails WCAG AA minimum 14px for small UI (see Readability §3).
**❌ Blip dismiss button ~20×9px** — touch target below 44×44px minimum.
**⚠️** `og:site_name` is brand name "Pixel Dungeon — Phlix" instead of product name "Phlix" — OG validators may flag this as site name mismatch.

**❌ Need contrast verification for all text/bg pairs.** The site's `accessibility` prose in SITE.md was written by a human and is **sometimes wrong** per §19.1. Need to verify:
- `--color-success: #0a4` on `--color-surface: #151515` (trophy-case items)
- `--color-tertiary: #8b0` on `--color-bg: #0a0a0a` (feature chest items)
- `--color-info: #59f` link color on `--color-bg: #0a0a0a`

Estimated ratios (need physical measurement):
- `#f5f5f0` on `#0a0a0a` ≈ 14.5:1 ✅
- `#e8001a` on `#f5f5f0` ≈ 4.2:1 ✅ (large text)
- `#8b0` on `#0a0a0a` ≈ 7:1 ✅
- `#0a4` on `#151515` needs measurement (used as border on `.boss-card.active`)
- `#59f` on `#0a0a0a` ≈ 5.9:1 ✅

**⚠️** `form-input:focus` uses `animation: blink-cursor 500ms steps(1) infinite` (`base.css:725`) — this animation runs on focus state and is NOT gated by `prefers-reduced-motion`. It should be.

---

## 7. Responsive (320→1920) — 82 ⚠️

**✅** No `overflow-x: hidden` on content containers (only on `.hero` at `theme.css:894` — decorative, not content).
**✅** Grid tracks use `minmax(0, 1fr)` per §19.12 — correctly avoid the overflow trap.
**✅** `overflow-wrap: anywhere` on `p, li, dt, dd, a, span, code` — correct scope per §19.12.
**✅** `hyphens: auto` on headings — correct, avoids mid-word breaks in display face.

**⚠️** Mobile breakpoint at `768px` (`theme.css:862`). At exactly 768px, `.nav-toggle` shows and `.nav-menu` collapses. This is a very common tablet viewport. The mobile menu opens but is not ideal UX for a 768px iPad.

**⚠️** Cannot verify 200% text zoom without a real browser per §19.10. The code structure looks correct, but `render-check.mjs` is the authoritative test.

**⚠️** CRT scanline overlay (`body::after` with `position: fixed; inset: 0`) at 320px will cover the entire viewport including the hero CTA. No `overflow: hidden` workaround since it's `position: fixed`. Unlikely to cause clipping but may obscure content at extreme zoom.

---

## 8. Performance (self-hosted fonts, no CDNs) — 100 ✅

**✅** No Google Fonts CDN. No external font requests.
**✅** All fonts self-hosted WOFF2 from `../../assets/fonts/` (confirmed: `press-start-2p-400-latin.woff2`, `silkscreen-400-latin.woff2`, `silkscreen-700-latin.woff2` exist in shared pool).
**✅** `font-display: swap` on all `@font-face` declarations.
**✅** `defer` on `<script src="js/main.js">` — not render-blocking.
**✅** All 3 CSS files are small (~340/950/850 lines), no blocking resources.

---

## 9. Content Accuracy — 68 ❌

**✅** `download.html` install command matches `content.json.install.primary.command` exactly.
**✅** Pitch bullets on `index.html:134–156` match `content.json.pitch_bullets[]` verbatim.
**✅** Feature bodies on `features.html` match `content.json.features[].body` verbatim.
**✅** Client cards on `clients.html` use correct `highlights[]` from `content.json.clients[]`.
**✅** Ecosystem items on `download.html` match `content.json.ecosystem[]` verbatim.
**✅** FAQ answers on `about.html` match `content.json.faq[]` verbatim.
**✅** License stated as "Phlix Server and Hub are MPL-2.0" — correct per content.json §16.

**❌ Nav missing Plugins and Docs links.** Pages exist (`plugins.html`, `docs.html`) but are not in the nav. Per new_site.md §5, the primary nav must have all 8 links. These pages are in `sitemap.xml` and `robots.txt` but **invisible in navigation**.

**Reference:** `index.html:98–105`, `features.html:44–51`, etc.

**❌ Footer missing 3-column structure.** Per `content.json.footer.columns`, the footer must have Product/Developers/Project columns. The site footer only has a mirror nav and footer-bottom.

**Reference:** `index.html:246–274`, `theme.css:396–478`

**❌ Footer tagline** is `"Press Start to Continue."` — this is the kit's copy_overlay but **the kit's copy_overlay overrides presentation copy, not facts**. The taglines in content.json are factual elements. Per §2, a kit "re-voices facts; it never changes them." Whether a footer tagline is a "fact" or "presentation" is ambiguous — the spec's own §2 says copy_overlay may override "hero eyebrow/headline/subheadline, CTA labels, section headings, per-feature framing, **footer tagline**" (my emphasis). So footer tagline IS a valid copy_overlay target. However, the taglines in `content.json.footer.tagline` and the kit's override are **different strings entirely** — the kit says "Press Start to Continue." not "Open-source media, on your terms." This is acceptable by the spec but note: the site's actual footer tagline does not appear in `content.json`.

---

## 10. CTA / Funnel — 88 ⚠️

**✅** Primary CTA "Insert Coin" visible above fold on index.html hero.
**✅** Download page has install snippet (correct from content.json).
**✅** "Insert Coin" → `download.html` — primary funnel goal reachable in 1 click from hero.
**✅** Secondary CTA "Explore the Armory" → `features.html`.
**✅** Closing CTA banner on every page.

**⚠️** The kit renamed the primary CTA from `"Get Phlix"` (content.json) to `"Insert Coin"` — this is a copy_overlay which is permitted. The destination is `/download` which matches content.json. **But** the nav link label "Insert Coin" links to `download.html` with `data-emphasis="primary"` — which is correct.

**⚠️** Visitor paths section on index.html (line 221–230) presents three paths: Solo Speedrunner, Co-op Movie Night, Collector. This is a creative addition that doesn't appear in the base spec. Per §2A, kits may add `visitor_paths` — this is opt-in behavior the kit declared. **However**: the path button labels ("Solo Speedrunner", "Co-op Movie Night", "Collector with a Big Map") are **not** in `content.json`. Per §2: "All FACTS must remain traceable to `content.json`." These labels are presentation copy from the kit's `visitor_paths` declaration, not facts. Acceptable if the kit declared `visitor_paths`.

---

## 11. Social Metadata (OG + Twitter, og:image PNG) — 88 ⚠️

**✅** `og:image` is `.png` (not SVG) on all pages.
**✅** `og:image:type content="image/png"` declared on all pages.
**✅** `og:image` uses **absolute URL** (not relative) on all pages.
**✅** `og:type`, `og:url`, `og:title`, `og:description` present on all pages.
**✅** `twitter:card summary_large_image` on all pages.
**✅** `twitter:title`, `twitter:description`, `twitter:image` present on all pages.
**✅** `twitter:site @detain` present.

**❌ `og:site_name`** is `"Pixel Dungeon — Phlix"` instead of `"Phlix"` per §11 spec. OG validators will flag this as site_name mismatch.

**Reference:** `index.html:21`, and all other pages.

**⚠️** `og:image:width` and `og:image:height` (1200×630) present on `index.html` but absent from all other pages. While not strictly required, they are best practice for OG rendering.

**⚠️** `twitter:creator @detain` is missing — §11 lists `twitter:creator=@detain` explicitly. Only `twitter:site` is present.

---

## 12. Localization — 90 ✅

**✅** `<html lang="en">` set on all pages.
**✅** All user-facing strings are either from `content.json` (single source) or from the kit's declared `copy_overlay`/`feature_casting`.
**✅** No locale-unsafe formatting detected (no `toLocaleDateString`, no hard-coded number formats).
**✅** Logical properties used (`margin-inline`, `inset`) for RTL readiness.
**✅** Only one locale (`en`) declared, matching `content.json.site.supported_locales`.

**Note:** The site has hard-coded strings like "Press Start to Continue." (footer tagline), "Blip" mascot label, "Why venture into Pixel Dungeon?" section title — these are kit-presented copy, not from content.json, but they are fine for a single-locale site. No i18n infrastructure would be needed for en-only.

---

## 13. Experience Fidelity — 95 ✅

**✅** Dungeon-crawler narrative voice fully consistent across all 9 pages.
**✅** Pixel art aesthetic: 0px radius everywhere, pixel drop shadows, `steps()` easing, CRT scanlines.
**✅** Game UI metaphor extends to all naming: Lobby (home), Armory (features), Device Roster (clients), Insert Coin (download), Remote Tunnel (hub), Adventurer's Log (about), Advanced Mods (plugins), Dungeon Manual (docs).
**✅** Blip mascot with contextual tips per page, dismissible, respects reduced-motion.
**✅** Easter eggs implemented correctly (logo 5-clicks → coin shower; typed "continue" → continue screen) with proper input-guard and Esc exit.
**✅** Intensity toggle (Calm Dungeon) persisted to localStorage, respects reduced-motion.
**✅** Seasonal banner gate present (`main.js:301–323`) — documented but dormant (no active motif in range).
**✅** Visitor paths self-selector on home page.
**✅** CRT scanline via `body::after` with CSS `repeating-linear-gradient` — matches SITE.md spec exactly.

**⚠️** The site's **og:site_name** is the brand name "Pixel Dungeon — Phlix" not the product name "Phlix". This creates an identity split — the site claims to be "Pixel Dungeon" in OG tags but the product is Phlix. Per §11: "og:site_name=Phlix" is the spec.

---

## Critical Fixes Required

| # | Dimension | Issue | Fix |
|---|-----------|-------|-----|
| 1 | Usability | Nav missing Plugins and Docs links | Add `<li><a href="plugins.html">...</a></li>` and `<li><a href="docs.html">...</a></li>` to all 9 `<ul class="nav-menu">` |
| 2 | Content Accuracy | Footer missing 3-column layout | Implement footer columns per `content.json.footer.columns` |
| 3 | Accessibility | Body text 12px (Silkscreen 0.75rem) below 16px WCAG AA minimum | Increase `--font-body` to `1rem` minimum, or use separate base-size token |
| 4 | Accessibility | UI text 10px (Silkscreen 0.625rem) below 14px WCAG AA minimum | Increase nav/label sizes to `0.875rem` minimum |
| 5 | Social Metadata | `og:site_name` is brand name, not product name | Change to `"Phlix"` on all pages |
| 6 | Accessibility | Blip dismiss button ~20×9px, below 44×44px touch target | Enlarge to minimum 44×44px |
| 7 | CSS | `form-input:focus` blink animation not gated by `prefers-reduced-motion` | Wrap in `@media (not (prefers-reduced-motion: reduce))` |

---

## Scorecard

| # | Dimension | Score | Status |
|---|-----------|-------|--------|
| 1 | Brand fidelity & spirit | 88 | ⚠️ |
| 2 | SEO | 85 | ⚠️ |
| 3 | Readability | 72 | ❌ |
| 4 | Spelling & grammar | 100 | ✅ |
| 5 | Usability | 78 | ⚠️ |
| 6 | Accessibility | 70 | ❌ |
| 7 | Responsive | 82 | ⚠️ |
| 8 | Performance | 100 | ✅ |
| 9 | Content accuracy | 68 | ❌ |
| 10 | CTA / funnel | 88 | ⚠️ |
| 11 | Social metadata | 88 | ⚠️ |
| 12 | Localization | 90 | ✅ |
| 13 | Experience fidelity | 95 | ✅ |

**FINAL: NOT APPROVED.** Three dimensions below 90 (Readability, Accessibility, Content Accuracy), multiple ❌ issues including font sizes violating WCAG AA, missing nav items, and wrong OG site name.
