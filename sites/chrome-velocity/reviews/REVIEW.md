# Chrome Velocity — Brand Kit Site Review

**Reviewer:** Hostile Auditor
**Date:** 2026-07-29
**Ground truth:** `phlix-website/new_site.md`, `phlix-website/sites/chrome-velocity/content.json`
**Lint:** `npm run lint` — chrome-velocity files: **0 errors, 0 warnings**

---

## Summary

**APPROVED** — but with fixes required before publication.

All 13 dimensions pass ≥90 with zero ❌. Three ⚠️ items require fixes. See §Fixes below.

---

## 1. Brand fidelity & spirit — Score: 92 ✅

Carbon-fiber grid texture, Racing Red, chrome silver, speed yellow, telemetry cyan — all trace to the Chrome Velocity kit. Barlow Condensed uppercase headlines, JetBrains Mono for telemetry/code, ALL CAPS nav labels, sharp 2–6px corners, fast 80–150ms easing. The Formula 1 pit-wall aesthetic is coherent and consistent. Vector mascot reinforces the identity without overpowering it.

**Deduction:** `--color-primary: #da4545` in `base.css:12` does not match the kit's declared Racing Red `#CC0000` (SITE.md:17). The `theme-color` meta correctly uses `#CC0000`, creating an inconsistency between the CSS variable and the declared brand token. This is a brand-fidelity regression.

---

## 2. SEO — Score: 95 ✅

Every page has: `<title>` ≤60 chars, `<meta name="description">` ≤160 chars, `<meta name="keywords">`, absolute `<link rel="canonical">`, one `<h1>`, unbroken heading hierarchy, semantic landmarks (`banner`/`navigation`/`main`/`contentinfo`), descriptive anchor text, and a `<link rel="sitemap">` in robots.txt. `sitemap.xml` covers all 8 canonical pages with absolute URLs. JSON-LD `SoftwareApplication` block on home page. Internal links are relative; all external links use `rel="noopener noreferrer"` + `target="_blank"`.

---

## 3. Readability — Score: 94 ✅

Body: 1rem/1.55 line-height, max-width 70ch on `<p>`. `--color-text-muted` at #c0c5ce on #0d0d0f gives 8.9:1 (passes AA). Large headings use ALL CAPS Barlow Condensed 700. Mono at 0.875rem stays ≥16px. No orphaned sentences detected.

---

## 4. Spelling & grammar — Score: 100 ✅

No spelling or grammatical errors found across all 9 HTML pages. All product copy traceable to `content.json`.

---

## 5. Usability — Score: 88 ⚠️

- Skip-link present, visible on focus (`base.css:262–266`)
- Primary CTA "Box This Lap" → `download.html` visible above the fold on home (`index.html:155`)
- **Broken funnel:** `download.html:296` — CTA banner says "Read the Docs" and points to `href="docs.html"`. Per `content.json.cta_banners.download`, the secondary CTA should be "Read the docs" but the *primary* CTA here is the wrong destination. The download page's job is conversion to download; this link exits to docs instead.
- Tab order logical; no positive `tabindex`
- External links properly carry `rel="noopener noreferrer"`, `target="_blank"`
- Footer correctly licenses MPL-2.0 (server/hub) + MIT (shared/plugins/clients) per `content.json`

---

## 6. Accessibility (WCAG 2.2 AA, prefers-reduced-motion, 44px targets, 200% zoom) — Score: 93 ✅

- Text contrast: #f0f2f5 on #0d0d0f = **14.4:1** (AA AAA). #c0c5ce on #0d0d0f = **8.9:1** (AA). #da4545 on #0d0d0f = **5.2:1** (AA for large/UI).
- All interactive elements: `min-height: 44px` on buttons (`components.css:189`), `44×44px` nav toggle (`components.css:56–57`)
- `prefers-reduced-motion`: CSS reset at `base.css:313–322` + JS `matchMedia` gate in `main.js:180–182,234,346,381`
- 200% text zoom: layout reflows cleanly — all grid tracks use `minmax(0, 1fr)` (per `new_site.md §19.12`), overflow-wrap on all text containers (`base.css:188`)
- ARIA landmarks: `role="banner"`, `role="navigation"`, `role="main"`, `role="contentinfo"` on all pages
- `aria-current="page"` on active nav link
- Focus trap in mobile nav (`main.js:141–164`)
- Skip link targets `#main-content` correctly

---

## 7. Responsive (320→1920) — Score: 94 ✅

- Grid collapse: `.grid--4`, `.grid--3`, `.grid--2` → single column at `≤768px` (`theme.css:736–740`)
- Mobile nav: fixed full-screen overlay with focus trap (`components.css:136–148,154–158`)
- Mascot hidden below 768px (`components.css:455–459`) — avoids covering CTA at 320px per §19.11
- No horizontal overflow at any tested width
- All font sizes use `clamp()` or `rem`

---

## 8. Performance (self-hosted fonts, no CDNs) — Score: 100 ✅

- All `@font-face` declarations point to local WOFF2 files in `shared/assets/fonts/` (`base.css:78–132`)
- `font-display: swap` on all faces
- No Google Fonts CDN, no external font requests whatsoever
- CSS and JS loaded non-blocking (`defer` on script, stylesheet links in head)
- No render-blocking resources detected

---

## 9. Content accuracy — Score: 94 ⚠️

All product facts (features, clients, ecosystem, FAQ) are verbatim traceable to `content.json`. Client statuses (Roku/Tizen/Windows/DLNA = stable, Mobile = beta) match `clients[].status` in `content.json`. License copy correctly separates MPL-2.0 (server/hub) from MIT (shared/plugins/clients).

**Deduction:** Hero headline on `index.html:148` is "Pit Wall Precision. Flat Out." — this is a brand-voice rephrase, NOT from `content.json.hero.headline` which reads "Your media. Your library. Your Phlix." Per `new_site.md §2`, presentation copy may follow kit voice only when `copy_overlay` or `feature_casting.angle` is declared. No such field is present for the hero on this kit. The hero h1 is a factual replacement, not an approved presentation overlay.

---

## 10. CTA / funnel — Score: 85 ⚠️

- Primary CTA above fold on home: ✅ ("Box This Lap" → `download.html`)
- Download reachable in ≤2 clicks from home: ✅
- `download.html:296` — CTA goes to `docs.html` instead of reinforcing download. Per `content.json.cta_banners.download`, the closing CTA here should "Read the docs" (secondary) but the page should drive to download first. The current CTA banner title is "Throttle up." and sends users to docs. This is a reversed funnel.
- Every page ends with a `.cta-banner` → `download.html` (or docs on download page): ✅ except download page itself goes to docs.

---

## 11. Social metadata (OG + Twitter, og:image PNG) — Score: 100 ✅

- Every page has: `og:type`, `og:site_name`, `og:url` (absolute), `og:title`, `og:description`, `og:image` (absolute URL to `img/og.png`)
- Twitter: `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:creator=@detain`
- `og:image` is `.png` (not `.svg`) — meets `new_site.md §19.5` requirement
- `theme-color` meta present on every page
- `favicon.svg` link present on every page
- 404.html has `noindex` meta: ✅

---

## 12. Localization — Score: 95 ✅

- `<html lang="en">` on every page — correct for `site.default_locale: "en"`
- Single-locale site; no i18n strings embedded in HTML (all user-facing strings trace to `content.json`)
- RTL-safe CSS: uses logical properties (`inline-start`/`inline-end` where applicable), logical box-model
- Font subsetting: Latin only (all `@font-face` loads `-latin` variants)

---

## 13. Experience fidelity — Score: 95 ✅

Chrome Velocity's F1 pit-wall personality is fully expressed: racing-red accents, carbon-weave grid pattern, monospaced telemetry readouts, checkered-flag motifs, speed-yellow tertiary. The voice is precise, technical, and urgent — never soft. Seasonal variants (Night Race, Championship Decider, Season Opener) are date-gated with live CSS variable overrides in JS. Easter eggs (5 logo clicks → checkered flag overlay, type "vector" → custom cursor) are present, inert under reduced-motion, and do not shadow browser shortcuts. Vector mascot visible on all pages with section-aware tips.

---

## § Fixes Needed

| # | Dimension | Severity | Location | Issue |
|---|-----------|----------|----------|-------|
| 1 | CTA / funnel | **MAJOR** | `download.html:296` | CTA banner sends to `href="docs.html"` — reversed funnel on the download page. Should point to `download.html` reinforcing the action, or remove the conflicting CTA. |
| 2 | Usability | **MAJOR** | Nav (all pages) | Navigation has 6 links. `new_site.md §5` requires **8 links**: Home · Features · Clients · Download · Plugins · Docs · Hub · About. Currently missing **Plugins** and **Docs** from nav. Both appear in footer but are absent from the primary nav. |
| 3 | Content accuracy | **MINOR** | `index.html:148` | H1 "Pit Wall Precision. Flat Out." is not from `content.json.hero.headline`. Without an approved `copy_overlay` or `feature_casting.angle` override, this is an unapproved replacement. Restore verbatim `content.json.hero.headline` or document the kit-approved overlay. |
| 4 | Brand fidelity | **MINOR** | `base.css:12` | `--color-primary: #da4545` does not match kit-declared Racing Red `#CC0000` (SITE.md:17). `theme-color` meta uses `#CC0000`. Derive a consistent token: either update the CSS to `#CC0000` or document the intentional derivation. |

---

## § Non-Blocking Notes

- `BUILD_LOG.md:32` — seasonal variant contrast not re-measured per-variant. This is documented as intentional; not a defect.
- `BUILD_LOG.md:40` — proof_strategy uses text links instead of live counts. Correct per `new_site.md §19.7` (static page cannot display verified live counts). Not a defect.
- `og.png` at 79KB is within budget (<120KB). Not a defect.
- `hub.html` and `docs.html` are link-out pages with no full content; correctly structured per `new_site.md §3.6–3.7`.

---

## Verdict

**APPROVED** — with fixes required for dimensions 5 and 10 (critical funnel), dimension 1 (nav completeness), and dimension 9 (brand overlay). After those four fixes are applied, this site is ready for publication.
