# Hostile Review — Prairie Bloom Brand Kit Site

**Site:** `sites/prairie-bloom/`
**Ground truth:** `new_site.md`, `shared/content.json`
**Lint:** `npm run lint` (HTML error found in `midnight-jazz`, not prairie-bloom; prairie-bloom HTML/CSS/JS lint passes clean)
**selfcheck:** `node tools/selfcheck.mjs --site prairie-bloom` → **PASS** (JS 12.4 KB, 10 @font-face, 6 nav labels, 5/5 narrative sections, 22 palette colors, 59 pairs clear 4.5:1)

---

## 1. Brand Fidelity & Spirit — 93 ✅

- **Colors:** All tokens from `design_tokens.color` are in `:root` and used throughout. Primary `#F2C12E` (Sunflower), secondary `#7B5EA7` (Wildflower violet), tertiary `#B83A3A` (Barn red), Clover Green `#4E7C59`, Hay Cream `#F7F0DC`. None of the forbidden neon/cool-grey appears anywhere. `new_site.md §19.1` is respected: all pair contrast measured and passes 4.5:1.
- **Typography:** Zilla Slab (headline/display), Playfair Display (display), Lora (body), Nunito (UI), Fira Code (mono) — all from kit's `fonts` block, all self-hosted WOFF2. No system-ui fallback abuse.
- **Shapes:** `border-radius` tokens match kit: pill=999px, lg=18px, md=10px. 2px furrow-brown borders throughout. Quilt-dash dividers present.
- **Motion:** `sunflower-sway` keyframes, pollen particle fall, scroll reveals, mascot sway — all gated on `prefers-reduced-motion`. Seasonal date-gate applies CSS custom-property overrides correctly.
- **Voice:** "Open your doors", "Grow Your Meadow", "Sunny's Porch Q&A", "Lost in the Meadow" — neighborly, warm, folk-art framing. No corporate vocabulary (`leverage`, `synergy`, `utilize`) detected. Brand opposites (not corporate, not minimalist-cold, not neon/cyberpunk) are respected.
- **Mascot Sunny** implemented on home/features/download with tips, dismissal to localStorage, and easter eggs (logo-click dance, "sunflower" typed-word bloom). Fully `prefers-reduced-motion` aware.
- **Site architecture:** 6 nav links (Plugins/Docs demoted to footer) per kit `site_architecture.demoted_pages`. All links in footer per `footer_arrangement: "full-directory"`.
- **extra_pages:** `gathering-guide.html` correctly included per kit `extra_pages`.

**Minus 7:** Content accuracy fault (see dimension 9) and a subtle CSS shadow token inconsistency across some components.

---

## 2. SEO — 88 ⚠️

- `<title>` ≤ 60 chars on all pages: ✅ (e.g., "Prairie Bloom — Phlix" = 21 chars, "Features — Prairie Bloom" = 26)
- `<meta name="description">` ≤ 160 chars: ✅ (all under 120)
- `<meta name="keywords">`: ✅ present on all pages
- `<link rel="canonical">` absolute on all pages: ✅
- One `<h1>` per page, unbroken hierarchy: ✅
- Descriptive anchor text (no "click here"): ✅
- JSON-LD `SoftwareApplication` on home page: ✅
- sitemap.xml — 9 entries (8 canonical + gathering-guide); 404.html excluded with `noindex`: ✅ (404.html has `noindex`)
- robots.txt referencing sitemap: ✅

**Minus 12:** JSON-LD only on `index.html`. `new_site.md §10` requires it "on the home page" — ambiguous whether all pages are required. If strictly all pages, −10. Using copy_overlay descriptions for `og:description`/`twitter:description` instead of `meta.description` from content.json on several pages (download.html, hub.html) — brand-consistent but deviates from the single meta description source principle. Not a hard fail.

---

## 3. Readability — 92 ✅

- Body font Lora 400, line-height 1.7. Max-width on paragraphs 70ch. Font size 1rem. Readable at all widths.
- Spacing scale used consistently (4px base). Section breathing room (`var(--space-12)`).
- `.container--narrow` (max-width: 800px) used appropriately for long-form sections (philosophy, license, FAQ).
- Font scaling `clamp()` used for headings (no fixed px that breaks at zoom). No orphan single words on lines.

**Minus 8:** `code-block` has `font-size: 0.8rem` (12.8px at default), dropping to `0.72rem` (11.5px) on ≤480px. This is below comfortable reading size for a monospace font.

---

## 4. Spelling & Grammar — 95 ✅

- No spelling errors detected on manual scan. All `pitch_bullets`, `features[].body`, `faq[].a` are verbatim from `content.json` — which is known-correct source.
- No grammar issues in any prose copy.
- `aria-label` and `alt` text are descriptive and complete.

---

## 5. Usability — 87 ⚠️

- Download CTA reachable in ≤2 clicks from home: ✅ (home hero → download.html, or any page → download via CTA banner)
- Install command displayed correctly in `.code-block` on download.html: ✅ `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash` — verbatim from `content.json`
- External links all use `target="_blank" rel="noopener"`: ✅
- Footer has all 3 columns from `content.json.footer.columns`: ✅ Product/Developers/Project with correct links
- Ecosystem list on download.html: all 5 items from content.json with correct `what` strings and repo links
- Clients page correctly filters deprecated (none in content.json for prairie-bloom's 5 clients): ✅

**Minus 13:** `features.html` line 161: `<a href="gathering-guide.html" class="btn btn-ghost">Host a Perfect Gathering</a>` — CTA label does not match destination. Per `new_site.md §19.7`, "a CTA label must not misdescribe its destination." This button leads to a gathering guide, not the download. `new_site.md §5` defines the secondary CTA ladder as "Pick Your Devices" → clients. This is a WCAG 2.5.3 (accessible name mismatch) potential issue. Also the features CTA banner only has two CTAs and the primary is "Grow Your Meadow" (→download) and secondary "Host a Perfect Gathering" (→gathering-guide). The primary CTA ladder from the kit's `conversion_funnel.cta_ladder` is: step 1 = "Grow Your Meadow" → download, step 2 = "Pick Your Devices" → clients. The features page uses "Host a Perfect Gathering" instead of step 2's "Pick Your Devices".

---

## 6. Accessibility (WCAG 2.2 AA, prefers-reduced-motion, 44px targets, 200% zoom) — 78 ❌

- Skip link: ✅ (`.skip-link`, targets `#main-content`, visible on focus)
- Landmarks: `role="banner"`, `role="navigation"`, `main#main-content`, `role="contentinfo"` — one each: ✅
- `aria-current="page"` on active nav link: ✅
- `aria-expanded` / `aria-controls` on mobile nav toggle: ✅
- `:focus-visible` ring — 2px violet (#7B5EA7) with offset: ✅
- `prefers-reduced-motion`: `.narrative-section` transitions drop, `.mascot-sunny` animation: none, pollen particles: `display:none`, all reduced-motion media queries present: ✅
- 200% zoom: CSS uses `overflow-wrap: anywhere` on `li` and `dd`; `minmax(0, 1fr)` or explicit `minmax(0, 1fr)` on grids; no fixed-px layout widths. Selfcheck passes (it tests 200% text zoom).

**Minus 22 — ❌ FAIL on 44px touch targets:**

`.client-card__highlights li` (components.css line 394–401):
- font-size: 0.875rem, line-height: 1.3 → ~23px computed line-height
- padding: 0 (no explicit), gap: var(--space-2) = 8px
- No `min-height: 44px`
- **Effective touch height: <30px. FAILS 44×44 requirement.**

`.ecosystem-item__name` (theme.css line 526–530):
- font-size: 1rem, no explicit min-height
- Padding: var(--space-4) = 16px padding on parent `.ecosystem-item`
- Name span has no own min-height
- **Effective touch target: likely <44px if text is single line. FAILS.**

Both are in interactive contexts (client card highlight items are `<li>` in a list; ecosystem items are in a flex row). Per WCAG 2.2 SC 2.5.8 (target size minimum), these must be ≥44×44px.

---

## 7. Responsive (320→1920) — 91 ✅

- Mobile-first: no horizontal scroll at any width tested via CSS analysis. `overflow-x: hidden` on body/html: ✅
- Fluid grids: `minmax(min(100%, 300px), 1fr)` prevents overflow from unbreakable tokens (per `new_site.md §19.12`). `minmax(0, 1fr)` used in key grid contexts.
- `overflow-wrap: anywhere` on `li, dd, dt, p, a, span, code, kbd, samp, pre`: ✅ (base.css lines 778–787 — properly uses `anywhere` for body text, NOT `break-word`)
- Nav hamburger toggle at ≤768px: ✅
- Font sizes `clamp()`: ✅ headings never smaller than mobile baseline
- `.nav-logo__wordmark` has `overflow-wrap: anywhere`: ✅ prevents overflow at narrow widths

**Minus 9:** `pitch__list` uses `grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr))`. At 320px viewport, a single column 320px with `padding: var(--space-4) = 16px` would make the inner content 288px, which fits. However at 320px with 200% zoom, the text would double in rendered size — the `min(100%, 320px)` clamp would still force 288px content, and at 200% zoom text would try to fill a 288px column with ~32px effective base text → potential overflow. `render-check` would confirm. Cannot verify without browser.

---

## 8. Performance (self-hosted fonts, no CDNs) — 96 ✅

- Fonts: self-hosted WOFF2 via `@font-face` pointing to `../../assets/fonts/`. All 10 declared `@font-face` rules. `font-display: swap`: ✅
- No `fonts.googleapis.com`, no CDN scripts, no CDN dependencies: ✅ (confirmed by grep — zero external font links)
- `defer` on main.js: ✅
- CSS-only meadow art and dividers: no image requests for hero decoration: ✅
- `prefers-reduced-motion` cuts pollen particle JS entirely: ✅
- No render-blocking resources detected

**Minus 4:** Seasonal activation JS creates a `<div class="seasonal-banner">` and prepends it to `<body>` on every page load — the DOM insertion is conditional but the early script still runs on each navigation. Minor.

---

## 9. Content Accuracy — 74 ❌

All pitch_bullets, features[].body, faq[].a, clients[], ecosystem[], install commands checked against `content.json`.

### ❌ CRITICAL: False client count in proof band

**`index.html:174`:**
```html
<li>5 native clients — Roku, Tizen, Windows, Mobile, DLNA</li>
```

`content.json` defines **4 native clients** (Roku, Tizen, Windows, Mobile beta) **plus DLNA as a separate protocol/device category**. The pitch_bullets verbatim says: "Native clients on **Roku, Samsung Tizen, Windows, Mobile**, plus any **DLNA device**."

The proof band merges DLNA into the "native clients" list, stating 5. This is a **fabricated claim**. Per `new_site.md §19.7`: "`proof_strategy` signals must be verifiable" and "Do not print a figure you cannot verify." The "5 native clients" number cannot be verified against content.json because content.json explicitly separates DLNA from the native client count. This is the exact trap documented in `§19.14`: "A kit says '5 native clients' — content.json wins on facts."

**Fix:** Change to "4 native clients — Roku, Tizen, Windows, Mobile — plus any DLNA device" or simply "Native clients on Roku, Tizen, Windows, Mobile, plus any DLNA device."

### ❌ CTA label mismatch (see dimension 5)

`features.html:161` — "Host a Perfect Gathering" links to `gathering-guide.html`. This is brand-voice creative but the CTA ladder says step 2 should be "Pick Your Devices" → clients. The destination and label are both correct relative to each other, but the copy doesn't match the documented CTA ladder. Per `new_site.md §19.7`: "A CTA label must not misdescribe its destination." A visitor reading "Host a Perfect Gathering" expects a guide page, which is what they get. So the accessible name matches the behavior. However, it deviates from the documented conversion funnel step 2 copy.

### ✅ Install command correct

`download.html:79`: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash` — verbatim from `content.json install.primary.command`. One-line, correct.

### ✅ All 8 features verbatim

`features.html` feature bodies match `content.json features[].body` exactly. IDs present and correct.

### ✅ FAQ verbatim

`about.html` FAQ answers match `content.json faq[].a` exactly.

### ✅ Clients data correct

`clients.html` client names, taglines, highlights, and status badges all match `content.json clients[]` exactly. No inflated counts.

### ⚠️ Footer tagline

`content.json footer.tagline`: "Open-source media, on your terms." Site uses "Open-source media, rooted in community." This is from `copy_overlay.footer_tagline` — allowed per spec. Not a factual error.

---

## 10. CTA / Funnel — 85 ⚠️

- Download goal reachable in ≤2 clicks from home: ✅ (hero → download.html)
- Primary CTA visible above the fold on home: ✅ ("Grow Your Meadow" + "See How It Works" both in initial viewport at typical desktop)
- Every page ends in `.cta-banner`: ✅
- `conversion_funnel.cta_ladder` implemented: step 1 "Grow Your Meadow" → download, step 2 "Pick Your Devices" → clients. BUT features.html uses "Host a Perfect Gathering" → gathering-guide for its secondary CTA instead of "Pick Your Devices" → clients.
- Install one-liner on download.html: ✅ correct, `.code-block` styled correctly
- Ecosystem items on download.html all link to correct repos: ✅

**Minus 15:** The `features.html` CTA deviation from the documented CTA ladder (see dimension 5/9). The `gathering-guide.html` link from features.html is an extra_page per the kit — it IS in the sitemap — but the secondary CTA on features should be driving toward clients (step 2 of the ladder), not toward the guide. This disrupts the documented conversion funnel.

---

## 11. Social Metadata (OG + Twitter, og:image PNG) — 97 ✅

- `og:type=website`: ✅ all pages
- `og:site_name=Phlix`: ✅ all pages
- `og:url` absolute on all pages: ✅
- `og:title`: page-specific on all pages: ✅
- `og:description`: page-specific (from copy_overlay on some pages): ✅
- **`og:image` = absolute URL to `img/og.png` on all pages**: ✅ (confirmed: `https://detain.github.io/phlix-website/prairie-bloom/img/og.png` on all 10 HTML pages)
- `og.png` exists in `img/`: ✅ (also `og.svg` as source)
- `twitter:card=summary_large_image`: ✅ all pages
- `twitter:creator=@detain`: ✅ all pages
- `<meta name="theme-color">` = `#F2C12E` (primary): ✅

**Minus 3:** Twitter og:description on features page is "SyncPlay, library management, transcoding..." — uses feature listing from copy_overlay meta. Content.json meta description ("Self-hostable PHP media server with native apps for Roku...") does not appear on features.html. Acceptable since it's a copy_overlay, but technically the `meta.description` from content.json is not being used as `og:description` on features.html.

---

## 12. Localization — 90 ✅

- `<html lang="en">`: ✅
- `content.json` has `site.supported_locales: ["en"]` — single locale. Site uses English throughout.
- `content.json` is the single source of marketing copy: ✅
- CSS uses logical properties where applicable: ✅ (`margin-inline`, `padding-block`, etc.)
- Font subsetting: all self-hosted WOFF2 with Latin subset: ✅ (lithuanian/wOFF2 comments show proper subsetting)
- No hard-coded locale-unsafe formatting (no `new Date()` with locale string concatenation): ✅

**Minus 10:** No locale-switching infrastructure despite `supported_locales` being an array. Single-locale only — if Phlix adds localization later, this site has zero i18n architecture. The spec itself acknowledges `"supported_locales": ["en"]` so this is by design, not a regression.

---

## 13. Experience Fidelity — 91 ✅

The site fully embodies the Prairie Bloom folk-art meadow identity:

- **Warm hay-cream backgrounds** (never white/grey): ✅
- **Sunflower yellow primary CTAs** in pill shape: ✅
- **Quilt-dash dividers** (repeating linear-gradient): ✅ (`.divider-quilt`)
- **Narrative-scroll reveals** (`.narrative-section` + IntersectionObserver): ✅
- **Sunny mascot** with sway animation, section-aware tips, dismissal: ✅
- **Pollen particle** drift effect: ✅
- **Seasonal activation** date-gate with CSS custom property overrides: ✅
- **Easter eggs** — logo 3-click celebration, typed "sunflower": ✅
- **Folk-art inline SVG icons** on all 8 features: ✅
- **CSS-only meadow art** in hero (sunflower silhouettes, cloud drift): ✅
- **Seed-packet one-sheets** for feature casting heroes on home: ✅
- **Proof strategy band** with verbatim quote from `pitch_bullets[0]`: ✅
- **"Lost in the Meadow" 404** with confused Sunny SVG and recovery links: ✅
- **"Sunny's Porch Q&A"** FAQ framing: ✅

**Minus 9:** The seasonal banner text "The season has arrived in the meadow — gather around." doesn't match the kit's `seasonal_activation.banner` which is "The season has arrived in the meadow — gather around." Wait — checking kit: `banner: "The season has arrived in the meadow — gather around."` in the kit. JS line 321: `banner.textContent = 'The season has arrived in the meadow — gather around.'` — matches. ✅

Actually the only minus is the content accuracy issue from dimension 9.

---

## Summary

| Dimension | Score | Status |
|-----------|-------|--------|
| 1. Brand fidelity & spirit | 93 | ✅ |
| 2. SEO | 88 | ⚠️ |
| 3. Readability | 92 | ✅ |
| 4. Spelling & grammar | 95 | ✅ |
| 5. Usability | 87 | ⚠️ |
| 6. Accessibility | 78 | ❌ |
| 7. Responsive | 91 | ✅ |
| 8. Performance | 96 | ✅ |
| 9. Content accuracy | 74 | ❌ |
| 10. CTA / Funnel | 85 | ⚠️ |
| 11. Social metadata | 97 | ✅ |
| 12. Localization | 90 | ✅ |
| 13. Experience fidelity | 91 | ✅ |

**selfcheck: PASS** — JS 12.4 KB, 10 @font-face, 6 nav labels, 5/5 narrative sections, contrast pairs all clear 4.5:1

---

## REJECTED — Fixes Required

### ❌ [Dimension 9] Content Accuracy — "5 native clients" is factually wrong

**File:** `sites/prairie-bloom/index.html:174`

**Current:**
```html
<li>5 native clients — Roku, Tizen, Windows, Mobile, DLNA</li>
```

**Required:** Per `content.json clients[]` and `new_site.md §19.14` ("A kit says '5 native clients' — content.json wins on facts. It is *four* native clients — Roku, Tizen, Windows, Mobile — **plus any DLNA device**"), change to:

```html
<li>4 native clients — Roku, Tizen, Windows, Mobile — plus any DLNA device</li>
```

DLNA is a protocol/UPnP device category, not a native client. Claiming 5 native clients when content.json says 4 native + any DLNA device is a fabricated fact. This must be fixed before approval.

---

### ❌ [Dimension 6] Touch Targets <44px on interactive list items

**File:** `sites/prairie-bloom/css/components.css` and `sites/prairie-bloom/css/theme.css`

**Issue 1 — `.client-card__highlights li`** (components.css line 394–401):
```css
.client-card__highlights li {
  font-size: 0.875rem;
  line-height: 1.3; /* ~23px computed */
}
```
**Fix:** Add `min-height: 44px; display: flex; align-items: center;` to `.client-card__highlights li`.

**Issue 2 — `.ecosystem-item__name`** (theme.css line 526–530):
```css
.ecosystem-item__name {
  font-family: var(--font-ui);
  font-weight: 700;
  white-space: nowrap;
}
```
**Fix:** Add `min-height: 44px; display: flex; align-items: center;` to `.ecosystem-item__name` or to `.ecosystem-item`.

These fail WCAG 2.2 SC 2.5.8 (Target Size Minimum). 44×44px touch target is a hard requirement.

---

### ⚠️ [Dimension 5/10] features.html CTA does not follow conversion_funnel.cta_ladder step 2

**File:** `sites/prairie-bloom/features.html:161`

**Current:**
```html
<a href="gathering-guide.html" class="btn btn-ghost">Host a Perfect Gathering</a>
```

The kit's `conversion_funnel.cta_ladder` defines:
- step 2: `cta: "Pick Your Devices"` → target: `"clients"`

The features.html CTA should link to `clients.html` with the label "Pick Your Devices" to match the documented funnel step 2. The `gathering-guide.html` link is acceptable as the primary (→download) CTA secondary, but the secondary should follow the ladder. Alternatively, if `gathering-guide.html` is the intended step 2 per the kit's narrative, the `cta_ladder` in the kit needs updating — but per the kit's own spec, it says "Pick Your Devices" → clients.

---

### ⚠️ [Dimension 2] JSON-LD on homepage only

If `new_site.md §10` is interpreted as "JSON-LD on every page" rather than "home page only," add the `SoftwareApplication` JSON-LD block to all 9 remaining HTML pages. Currently only `index.html` has it. If home-page-only is the intent (per Schema.org intent for multi-page sites), this is acceptable — but the spec says "on the home page" which is ambiguous.

---

## Verdict

```
NOT APPROVED.

Score ≤90: Dimensions 6 (78), 9 (74), 10 (85)
Has ❌: 2 (Accessibility, Content Accuracy)

Required fixes before approval:
1. [CRITICAL] index.html:174 — Change "5 native clients" to "4 native clients —
   Roku, Tizen, Windows, Mobile — plus any DLNA device"
2. [CRITICAL] components.css + theme.css — Add min-height:44px to
   .client-card__highlights li and .ecosystem-item__name / .ecosystem-item
3. [HIGH] features.html:161 — Change "Host a Perfect Gathering" CTA
   to "Pick Your Devices" linking to clients.html, OR justify why the
   gathering-guide is the correct step-2 funnel destination per the kit's
   cta_ladder

After fixes, re-run selfcheck and this review.
```
