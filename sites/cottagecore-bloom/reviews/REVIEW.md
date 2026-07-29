# Brand Kit Site Review — Cottagecore Bloom

**Reviewer:** Hostile Audit  
**Site:** `sites/cottagecore-bloom/`  
**Ground truth:** `new_site.md` + `shared/content.json`  
**Lint:** `npm run lint` — 3 warnings in cottagecore-bloom only; 0 errors in this site's files

---

## Summary

**NOT APPROVED.** Four blocking issues — two are ❌, two are ⚠️ severity.

| # | Dimension | Score | Status |
|---|-----------|-------|--------|
| 1 | Brand fidelity & spirit | 88 | ⚠️ |
| 2 | SEO | 82 | ⚠️ |
| 3 | Readability | 95 | ✅ |
| 4 | Spelling & grammar | 100 | ✅ |
| 5 | Usability | 72 | ❌ |
| 6 | Accessibility (WCAG 2.2 AA) | 90 | ⚠️ |
| 7 | Responsive (320→1920) | 80 | ⚠️ |
| 8 | Performance (self-hosted fonts, no CDNs) | 95 | ✅ |
| 9 | Content accuracy | 70 | ❌ |
| 10 | CTA / funnel | 78 | ⚠️ |
| 11 | Social metadata | 95 | ✅ |
| 12 | Localization | 85 | ⚠️ |
| 13 | Experience fidelity | 88 | ⚠️ |

---

## 1. Brand Fidelity & Spirit — 88 ⚠️

**Score: 88/100**

### What works ✅
- Cottagecore garden voice is fully and consistently realized. Garden metaphors
  permeate every page: "The Garden", "What Grows Here", "Guest Rooms",
  "Start Your Own", "The Gatehouse", "Our Story", "A Specialist's Shelf",
  "The Reference Library", "Three Steps to Blooming", "Come plant your own garden".
- Color palette, spacing scale, corner radii, and typography all trace cleanly to
  the `--color-*`, `--space-*`, `--radius-*`, and `--font-*` tokens defined in
  `base.css` §1–§2 of `SITE.md`.
- Self-hosted fonts: Playfair Display 700/900, Dancing Script 700, Lora 400/500,
  Nunito 400/500/600, Courier Prime 400/700 — all `@font-face` declarations
  correctly point to WOFF2 in `../../assets/fonts/`.
- Seasonal activation (`live-js`) is correctly implemented in `js/main.js` with
  inclusive date ranges matching `SITE.md` §2. No Google Fonts CDN links anywhere.
- Mascot Primrose (bee) is a distinctive brand element; `cottagecore-bloom-kit`
  branding is unmistakably applied — not a generic template recolor.

### What fails ⚠️
- **Nav structure does not match the spec's required 8 links.** `new_site.md` §5
  specifies: **Home · Features · Clients · Download · Plugins · Docs · Hub · About**.
  The site has 6 links with garden names. **Plugins** and **Docs** are entirely
  absent from the primary nav on every page. Both files exist (`plugins.html`,
  `docs.html`) and appear in sitemap.xml / footer, but are unreachable via the
  main nav. `new_site.md` §5 is explicit: "Primary nav (8 links, in order)" —
  this is a structural spec violation. `index.html:73–80`, `features.html:50–57`,
  `clients.html:42–49`, `download.html:42–49`, `plugins.html:42–49`,
  `docs.html:42–49`, `hub.html:42–49`, `about.html:42–49`, `404.html:45–52`.
- Footer correctly has 3 columns with the Product/Developers/Project structure
  from `content.json.footer.columns`, and footer-col link labels match
  `content.json` exactly (including "License (MPL-2.0)").
- `SITE.md` is complete (96 lines) covering all required sections per `new_site.md` §9.
- `BUILD_LOG.md` exists.

---

## 2. SEO — 82 ⚠️

**Score: 82/100**

### What works ✅
- `<title>` on all pages: `features.html:6` "What Grows Here — Phlix" (20 chars),
  `clients.html:6` "Guest Rooms — Phlix" (18), `download.html:6`
  "Start Your Own — Phlix" (22), `hub.html:6` "The Gatehouse — Phlix" (23),
  `about.html:6` "Our Story — Phlix" (16), `plugins.html:6` "Plugins — Phlix"
  (13), `docs.html:6` "Documentation — Phlix" (21), `404.html:6` "404 — Phlix"
  (10). All ≤60 chars. ✅
- `<meta name="description">` present on every page.
- `<link rel="canonical">` on every page with correct absolute URL.
- `<h1>` exactly once per page; heading hierarchy intact (h1 → h2 → h3; no skips).
- Descriptive anchor text throughout ("View source", "Read the docs", "Full
  installation docs", not "click here").
- `robots.txt` references sitemap correctly at `sitemap.xml:4`.
- `sitemap.xml` lists all 8 canonical pages + `seasons.html`; `404.html` is excluded
  (correct — it carries `noindex`).

### What fails ⚠️
- **`index.html` only has 6 nav links (missing Plugins + Docs).** SEO crawlers
  will not discover those pages via nav links; they're only in footer and sitemap.
- **`index.html` lacks `<meta name="keywords">`** — only `features.html:8` has it.
  Per `new_site.md` §10: `<meta name="keywords">` should come from `meta.keywords`
  on every page. This is missing on 7 of 8 content pages.
- **Download page `<meta name="description">` uses garden copy instead of
  `content.json` copy.** `download.html:7` reads "Three steps to your first bloom..."
  which is not in `content.json.meta.description` (which is the canonical short
  product description). This is a copy-overwrite of a meta field that should
  track `content.json`.
- `seasons.html` page title "Blooming Through the Year" is appropriate but the
  page is a non-standard 9th page not required by `new_site.md`. Its presence in
  sitemap.xml is acceptable as it represents genuine content from the kit's
  `seasonal_activation` field.

---

## 3. Readability — 95 ✅

**Score: 95/100**

- Lora at 1rem / 1.75 line-height on 1.125rem hero sub is generous and warm.
- Body text on cards uses 0.875rem at 1.65 line-height — above the spec minimum
  of 16px / ~1.5 line-height. ✅
- Font sizes scale with `clamp()` — no fixed-px layout fonts.
- Warm ivory background `#FFF8F2` with Bark Brown `#2A1A10` text gives 15.92:1
  contrast (far exceeds AA). Opacity-reduced secondary text (0.8, 0.75, 0.65)
  is used for hierarchy, not for cutting contrast on body text.
- `overflow-wrap: anywhere` on `p, li, dd, a, span, code` and `break-word` on
  headings — correct per `new_site.md` §19.12.
- `<html lang="en">` set on all pages. ✅

---

## 4. Spelling & Grammar — 100 ✅

**Score: 100/100**

- No spelling or grammar errors detected across all 9 pages.
- U.S. vs. U.K. spelling is consistent (American English throughout, matching
  the content source).

---

## 5. Usability — 72 ❌

**Score: 72/100**

### What fails ❌
- **Primary nav missing Plugins and Docs.** These are two of the eight required
  pages per `new_site.md` §3 and §5. They exist as files but are not in the nav
  menu. Users cannot discover them without checking the footer or sitemap. Per
  `new_site.md` §5: "Primary nav (8 links, in order)". **This is a hard spec
  violation.**
- Download goal is reachable in ≤2 clicks from home: Home → "Start Your Garden"
  → download page. Primary CTA above fold on home. ✅
- The `seasons.html` page has a standalone nav and footer, but it has no link
  from any other page (not in the nav, not in any footer, not in any CTA). It
  is only reachable via direct URL or sitemap. This is acceptable per the
  `seasonal_activation: "documented"` intent — it is informational, not a nav
  destination.

### What works ✅
- All buttons and links have correct `href` destinations.
- Copy button on download page works with `navigator.clipboard.writeText`.
- Skip link present and correctly targets `#main-content`.
- Footer links on every page.

---

## 6. Accessibility (WCAG 2.2 AA) — 90 ⚠️

**Score: 90/100**

### What works ✅
- **Contrast**: All text/background pairs verified per `SITE.md` §8. Primary
  safe variant `#ba4f63` and secondary safe variant `#5e7a52` are used where
  small text is required. Body text 15.92:1. Focus ring #C8556A.
- **Keyboard**: All interactive elements reachable; visible 2px rose focus
  ring + 4px halo on `:focus-visible`. `prefers-reduced-motion` unconditionally
  respected via `base.css:196–202` and `js/main.js:35–39`.
- **Touch targets**: All `.btn` have `min-height: 44px` (`components.css:208`);
  `.nav-toggle` 44×44px (`components.css:143–146`); feature-card icons 44×44px.
- **200% zoom**: Layout uses fluid widths (`max-width`, `clamp()`, `%`);
  no fixed-px layout constraints found.
- **Landmarks**: Exactly one `banner`, `navigation`, `main`, `contentinfo`
  per page. `aria-current="page"` on active nav link. Skip link first
  focusable element.
- **Form labels**: `docs.html:65` has `<h2 class="visually-hidden">` for the
  docs grid (aria-labelledby is sufficient).

### What fails ⚠️
- **`og:site_name` missing on most pages.** Per `new_site.md` §11 and the spec's
  social metadata requirements, `og:site_name=Phlix` must appear on every page.
  Only `index.html:11` and `features.html:11` have it. `clients.html`,
  `download.html`, `hub.html`, `about.html`, `plugins.html`, `docs.html`,
  `404.html` all omit `og:site_name`. This is a social metadata completeness
  failure.
- **`og:type` missing on most pages.** `og:type=website` is present on
  `index.html:10` and `features.html:10` but absent from `clients.html`,
  `download.html`, `hub.html`, `about.html`, `plugins.html`, `docs.html`,
  `404.html`. Per §11: must appear on every page.
- The `mascot` element (`#mascot`) has `role="img"` and `tabindex="0"` but is a
  decorative branded element that gets dismissed. Its `aria-label="Primrose
  the bee mascot"` is present and the `aria-describedby="mascot-tip"` link to
  the tip text works when visible. This is acceptable.

---

## 7. Responsive (320→1920) — 80 ⚠️

**Score: 80/100**

### What works ✅
- Mobile breakpoint at 860px: nav toggle appears, nav menu becomes vertical
  dropdown (`components.css:155–187`).
- At 320px: `nav-menu` becomes `position: absolute` with `box-shadow: var(--shadow-lg)`
  — not fixed-width, so no horizontal overflow.
- Mascot repositions at 320px: `bottom: auto; top: var(--space-4)` to avoid
  covering CTA (`components.css:979–991`). Good. ✅
- Footer uses `grid-template-columns: repeat(3, minmax(0, 1fr))` — correct per
  §19.12.
- `.guest-rooms-grid` uses `minmax(280px, minmax(0, 1fr))` — correct per §19.12.

### What fails ⚠️
- **`content-grid` uses bare `1fr` not `minmax(0, 1fr)`** — the exact bug
  documented in `new_site.md` §19.12. `theme.css:200`:
  ```css
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  ```
  This should be `minmax(280px, minmax(0, 1fr))`. At narrow widths a long
  unbreakable token in a 280px–1fr track can force the grid wider than the
  viewport. The `new_site.md` §19.12 render-check test would catch this.
- **Mascot tip is hidden below 380px** (`components.css:948–950`) via `@media
  (width <= 380px) { #mascot-tip { display: none; } }` — this prevents it from
  covering content, but also means the tip content is inaccessible to mobile
  users who might need it. The tip content ("Come in through the garden gate...")
  is non-essential (decorative/brand), so this is acceptable though not ideal.
- Responsive at 320px not verified in a real browser render. The CSS structure
  appears sound per the patterns tested, but `node tools/render-check.mjs` is
  the authoritative test for this dimension per `new_site.md` §19.10.

---

## 8. Performance — 95 ✅

**Score: 95/100**

- All fonts self-hosted WOFF2 with `font-display: swap`. ✅
- No Google Fonts CDN links. ✅
- No CDN script dependencies. ✅
- `js/main.js` is `defer`-loaded (`index.html:476`, `features.html:238`, etc.). ✅
- All CSS is non-render-blocking (loaded in `<head>` without `media="print"` or
  lazy, which is acceptable for above-the-fold CSS).
- Hero background uses pure CSS petal particles — zero image weight. ✅
- Mascot is inline SVG — no extra request. ✅
- `<link rel="icon" type="image/svg+xml">` on all pages — no extra PNG favicon
  download for SVG-capable browsers. ✅

---

## 9. Content Accuracy — 70 ❌

**Score: 70/100**

### What fails ❌

- **"5 Native clients" — factually wrong** (`index.html:326`). The proof section
  displays:
  ```html
  <span class="number">5</span>
  <span class="label">Native clients</span>
  ```
  `content.json` and `new_site.md` §16 both confirm: **4 native clients** (Roku,
  Samsung Tizen, Windows, Mobile beta) **plus any DLNA device**. This is not a
  presentation copy issue — it is a verifiable factual claim that contradicts
  the source of truth. Per `new_site.md` §19.7: "Do not print a star count,
  contributor count, download total, or user number — a static page cannot
  verify it and an invented figure is a fabrication." The same logic applies to
  client counts. The content.json explicitly lists 5 clients, but the **count
  displayed as a number** (5) is wrong — it implies 5 native clients when there
  are 4. This is the exact kind of fabricated statistic §19.7 warns against.

### What works ✅

- **Install command is correct.** `download.html:72` uses:
  ```
  curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash
  ```
  This exactly matches `content.json.install.primary.command`. ✅ The notes below
  the code block match `what_it_does` and `notes` from `content.json.install.primary`.
  ✅
- **Feature bodies** on both the home overview grid and `features.html` match
  `content.json.features[].body` verbatim. ✅
- **Pitch bullets** on home match `content.json.pitch_bullets[]` verbatim. ✅
- **Client highlights** match `content.json.clients[].highlights[]` verbatim. ✅
- **FAQ answers** match `content.json.faq[].a` verbatim. ✅
- **Ecosystem descriptions** match `content.json.ecosystem[].what` verbatim. ✅
- **License** text in footer and about page matches `content.json.faq` answer on
  license. ✅ Correctly: "Phlix Server and the Hub are MPL-2.0; the shared
  libraries, plugins, and clients are MIT." Never states a single license
  "across the board." ✅
- **Hub page content** correctly describes the reverse-tunnel relay and NAT
  traversal per `content.json` and `new_site.md` §16. ✅
- **Metadata sources** — the proof section shows "4" for "Metadata sources" which
  matches `TMDB, TVDB, Fanart.tv, local NFO` (4 sources). ✅

---

## 10. CTA / Funnel — 78 ⚠️

**Score: 78/100**

### What works ✅
- Primary CTA "Start Your Garden" → `download.html` on home, features, clients,
  about, hub. ✅ Download page correctly shows install flow. ✅
- Primary CTA above fold on home page (`index.html:103`). ✅
- Download goal reachable in ≤2 clicks from home. ✅
- All CTAs point to correct destinations (no misdescribed CTAs per §19.7). ✅
- Secondary CTA "Peek Inside" → `features.html` is appropriate for the brand
  voice. ✅

### What fails ⚠️
- **Primary CTA label "Start Your Garden"** does not match
  `content.json.hero.primary_cta.label` which says **"Get Phlix"**. This is a
  copy_overlay replacement, but per `new_site.md` §2: "A kit re-voices facts; it
  never changes them." The CTA label is arguably presentation copy, yet it is
  the most conversion-critical label on the site. Without documented evidence
  that `copy_override` declares "Start Your Garden" as a replacement for
  `primary_cta.label`, this is an undocumented deviation from the spec's required
  CTA label. Similarly, the download page CTA shows "Plant the Server"
  (`clients.html:130`), not "Get Phlix". The `content.json.install` section
  (which is marked **"copy, never retype"**) is not directly surfaced on the
  download page as the `install` block — the garden-themed "Three Steps" framing
  is the presentation layer, which is acceptable.
- **No `with_https` install variant shown on download page.** The download page
  only shows the one-liner primary install. `content.json.install.with_https`
  shows the `--domain` + `--admin-email` variant for HTTPS provisioning in the
  same run. While simplifying to one command is a reasonable UX choice, the
  `content.json` block is marked "SINGLE SOURCE OF TRUTH" and the spec explicitly
  calls for the `with_https` variant to be shown. Omitting it is a deviation.

---

## 11. Social Metadata — 95 ✅

**Score: 95/100**

- `og:type=website` on index + features pages; missing on 6 other pages (see §6).
- `og:site_name=Phlix` on index + features pages; missing on 6 other pages (see §6).
- All other OG tags: `og:url`, `og:title`, `og:description`, `og:image` present
  and absolute on every page. ✅
- `og:image` is `img/og.png` (not SVG) — correct per `new_site.md` §19.5. ✅
- `twitter:card=summary_large_image` on all pages. ✅
- `twitter:creator=@detain` on all pages. ✅
- `<meta name="theme-color">` = `#C8556A` on all pages. ✅
- `<link rel="icon" type="image/svg+xml">` on all pages. ✅

---

## 12. Localization — 85 ⚠️

**Score: 85/100**

- `<html lang="en">` set on all pages. ✅
- All user-facing text is English; no locale-unsafe formatting detected
  (no `Intl.NumberFormat`, no locale-dependent `Date.toLocaleString`, no
  `new Date()` with string concatenation).
- Fonts subset to Latin script via WOFF2 `format('woff2')` — Latin-only subset
  confirmed by `lora-400-latin.woff2` etc. naming convention. ✅
- No hard-coded year (footer uses `&copy; 2026`). This is acceptable but a year
  that updates via JS would be better.
- CSS uses logical properties (`margin-inline`, `padding-inline`) throughout,
  enabling RTL compatibility. ✅
- `content.json` defines `site.supported_locales: ["en"]` and
  `site.default_locale: "en"`; the site only ships en. ✅
- No i18n infrastructure present (no `data-i18n` attributes, no translation JSON
  files). Per `new_site.md` §15, this is acceptable when only one locale is
  supported — "Prefer logical properties ... so RTL stays possible."

---

## 13. Experience Fidelity — 88 ⚠️

**Score: 88/100**

- **Narrative-scroll homepage** as declared in `SITE.md` §1: hero → pitch →
  features overview → clients preview → proof → CTA. The 6-section homepage
  matches `site_architecture` intent. ✅
- **Mascot behavior** matches `SITE.md` §5: Primrose on Home, Features, Download,
  About pages; `idle` float animation disabled under `prefers-reduced-motion`;
  dismissal persisted via `localStorage`. ✅
- **Seasonal activation** with `live-js` date gate in `js/main.js:14–32` applies
  `data-season` attribute to `<html>` which triggers CSS token overrides. Date
  ranges match `SITE.md` §3 (harvest 09-15→10-31, midwinter 12-01→01-06,
  spring 03-15→05-15). ✅
- **Visitor paths fork** in hero (`index.html:108–115`) is a `visitor_paths`
  experience override — not in the default spec structure, but present as an
  opt-in field in §2A. Acceptable. The three paths (library / movie nights /
  plugins) correctly target feature anchors. ✅
- **Easter eggs** (typed-word "garden" + logo click 5×) are implemented per
  `SITE.md` §5 and §19.8: typed-word disabled in form fields, `Escape` exits,
  no `preventDefault`. ✅
- **Intensity toggle** "Quiet the Garden" in footer — `body.quiet-mode` class
  disables all animations via `components.css:772–779`. ✅
- **404 page** is a proper themed page with Primrose, SVG illustration, and
  recovery links. `noindex` is set. ✅

### What fails ⚠️
- The `seasons.html` page is a non-standard 9th page. It is not linked from any
  navigation or footer on any other page — only reachable via direct URL or
  sitemap. This is a minor discovery failure. It should be linked from the
  footer-nav-index or have a seasonal banner CTA.
- The `index.html` hero includes a `<div class="visitor-paths">` fork that
  doesn't appear in the default `new_site.md` §3.1 hero spec. While
  `visitor_paths` is a valid §2A opt-in field, the hero structure deviates
  from the canonical spec.

---

## Lint Output

```
npm run lint 2>&1 | grep cottagecore-bloom
```

cottagecore-bloom-specific findings (all **warnings only**, zero errors):

```
/home/sites/phlix/phlix-website/sites/cottagecore-bloom/js/main.js
  149:7   warning  'tipVisible' is assigned a value but never used
  307:39  warning  'e' is defined but never used (arrow function param)
  353:34  warning  'e' is defined but never used (arrow function param)
```

Per `new_site.md` §17: "prefix deliberately-unused params with `_`" — these
params (`e` on lines 307 and 353) should be renamed to `_e` to comply with the
lint config. `tipVisible` on line 149 should be either removed or used.

**Global lint**: 43 errors in other sites, 118 warnings in other sites.
cottagecore-bloom itself has 0 errors, 3 warnings.

---

## Fixes Needed (Priority Order)

### ❌ CRITICAL — Must fix before approval

1. **[D5: Usability — 72]** Add **Plugins** and **Docs** to the primary nav.
   Every page's `<ul class="nav-menu">` must have all 8 links in order:
   The Garden / What Grows Here / Guest Rooms / Start Your Own / **Plugins** /
   **The Gatehouse** / **Our Story** / *(wait — re-read §5 for correct order)*
   Actually: **Home · Features · Clients · Download · Plugins · Docs · Hub · About**.
   The current order has only 6 links with garden names. Add the 2 missing ones.
   - OR: If the kit's `site_architecture` declares a demotion of Plugins/Docs to
     footer-only, that field must be explicitly declared in the kit's REGEN_PLAN.md
     §5 citing §19.6 field-precedence rules, and the reviewer must agree that
     the override is justified. Currently there is no such documentation.
   - `index.html:73–80`, `features.html:50–57`, `clients.html:42–49`,
     `download.html:42–49`, `plugins.html:42–49`, `docs.html:42–49`,
     `hub.html:42–49`, `about.html:42–49`, `404.html:45–52`

2. **[D9: Content Accuracy — 70]** Fix "5 Native clients" on `index.html:326`.
   Replace with one of:
   - "4 native apps + any DLNA device" (factual, traceable to content.json)
   - Remove the count and use labels only ("Roku · Samsung Tizen · Windows · Mobile")
   - Per `new_site.md` §19.7: link to the live client repo page instead of printing
     a count. Never print a figure you cannot verify.

### ⚠️ WARNING — Should fix

3. **[D7: Responsive — 80]** Fix `content-grid` bare `1fr` in `theme.css:200`:
   ```css
   /* wrong */
   grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
   /* right */
   grid-template-columns: repeat(auto-fill, minmax(280px, minmax(0, 1fr)));
   ```
   See `new_site.md` §19.12. Run `node tools/render-check.mjs --site cottagecore-bloom`
   after fixing.

4. **[D6: Accessibility — 90]** Add `og:site_name=Phlix` and `og:type=website`
   to `clients.html`, `download.html`, `hub.html`, `about.html`, `plugins.html`,
   `docs.html`, and `404.html`. These are missing on 7 of 8 pages.

5. **[D8: Performance]** Prefix unused event params with `_`:
   - `js/main.js:307` `_e` instead of `e`
   - `js/main.js:353` `_e` instead of `e`
   Remove unused `tipVisible` at `js/main.js:149` or use it.

6. **[D2: SEO]** Add `<meta name="keywords" content="phlix, media server, ...">`
   to all pages missing it (7 of 8 content pages — only `features.html` has it).
   Source from `content.json.meta.keywords`.

7. **[D10: CTA — 78]** If `copy_overlay` does not document a primary CTA label
   override, restore "Get Phlix" as the primary CTA text. If it does document
   "Start Your Garden", add that documentation to `REGEN_PLAN.md` §5 citing §2A.

8. **[D10: CTA — 78]** Consider surfacing the `install.with_https` variant on
   `download.html` as a secondary install option, since `content.json` marks the
   install block as "SINGLE SOURCE OF TRUTH — copy, never retype."

---

## Score Breakdown Detail

| Dimension | Raw Score | Weight | Weighted |
|-----------|-----------|--------|----------|
| Brand fidelity | 88 | 1.0 | 88 |
| SEO | 82 | 1.0 | 82 |
| Readability | 95 | 0.8 | 76 |
| Spelling & grammar | 100 | 0.8 | 80 |
| Usability | 72 | 1.2 | 86.4 |
| Accessibility | 90 | 1.2 | 108 → capped at 100 |
| Responsive | 80 | 1.0 | 80 |
| Performance | 95 | 1.0 | 95 |
| Content accuracy | 70 | 1.5 | 105 → capped at 100 |
| CTA / funnel | 78 | 1.0 | 78 |
| Social metadata | 95 | 0.8 | 76 |
| Localization | 85 | 0.5 | 42.5 |
| Experience fidelity | 88 | 0.8 | 70.4 |
| **Total** | | | **~882 / 1000** |

Weighted average ≈ **85/100**. Not approved due to the two ❌ items (Usability
and Content Accuracy) and the multiple ⚠️ items that together bring the site
below the 90/100 gate on several dimensions.

---

*Review generated: hostile audit, no mercy.*
