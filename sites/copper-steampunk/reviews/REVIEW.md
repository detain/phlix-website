# Hostile Review — copper-steampunk Brand Kit Site

**Result: NOT APPROVED** — Two ❌ items block approval.

---

## 1. Brand Fidelity & Spirit — Score: 70 ⚠️

**Verdict: ⚠️ Partial pass.** The steampunk identity is executed with genuine craft — copper/amber/brass palette, Cinzel Decorative + Playfair Display + Crimson Text type stack, gear animations, mahogany plaque hero, rivet ornaments, mechanical metaphors throughout ("Commission an Engine", "The Relay Station", "The Logbook"). The voice is consistent and the aesthetic is cohesive.

**❌ Critical failure:** The primary nav does not include Plugins and Docs links. Per `new_site.md` §5, the primary nav must carry all 8 links in order: **Home · Features · Clients · Download · Plugins · Docs · Hub · About**. The current nav has only 6: Home · Features · Clients · Download · Hub · About. Plugins and Docs exist only in the footer. This is a structural violation, not a brand decision.

`index.html:97-104`, `features.html:72-81`, `download.html:72-83`, `clients.html:72-83`, `plugins.html:72-81`, `hub.html:69-78`, `about.html:72-79`, `docs.html:72-79`, `expedition-guide.html:72-79`

---

## 2. SEO — Score: 90 ✅

**Verdict: ✅ Pass.** All pages carry `<title>` ≤60 chars with page-specific copy, `<meta name="description">` ≤160 chars from content, `<link rel="canonical">` absolute URL, `<meta name="keywords">`, semantic heading hierarchy, and descriptive anchor text. `sitemap.xml` (9 URLs) and `robots.txt` present and correct. JSON-LD SoftwareApplication on home page.

**One issue:** `sitemap.xml:19` includes `expedition-guide.html` — an extra page beyond the 8 required canonical pages. If this is a kit-declared `extra_pages`, it should be included; if not, it should be removed. The spec allows extra pages but sitemap should reflect only canonical content pages.

---

## 3. Readability — Score: 92 ✅

**Verdict: ✅ Pass.** Typography scale is well-structured — display/headline/body/UI/mono/number roles with fluid clamp sizing. Line heights appropriate (1.7 for body, 1.1 for headlines). Max-width on prose containers (68ch). Color contrast on dark background is sufficient for body text. Font stack is cohesive serif + slab + monospace.

---

## 4. Spelling & Grammar — Score: 95 ✅

**Verdict: ✅ Pass.** Copy is clean. No spelling errors detected. The Edwardian workshop narrative voice is consistent and well-executed.

---

## 5. Usability — Score: 88 ⚠️

**Verdict: ⚠️ Issues found.**

**❌ Primary nav missing 2 required links** — same structural issue as Dimension 1. Users cannot reach Plugins or Docs from the main nav without scrolling to footer.

**Good patterns:**
- Mobile nav toggle with `aria-expanded` correctly synced (`main.js:64-65`)
- Outside click and Escape key close (`main.js:70-86`)
- Body scroll lock when mobile menu open (`main.js:66`)
- 44px minimum touch targets on buttons (`components.css:371-372`)
- Copy button for install command with fallback (`main.js:462-490`)
- Cogsworth mascot dismissed via localStorage (`main.js:344-345`)

**Minor:** Cogsworth fixed position at bottom-right (`components.css:709-718`) is acceptable — it hides below 900px (`components.css:806-809`), so mobile users never see it overlapping the CTA.

---

## 6. Accessibility (WCAG 2.2 AA) — Score: 80 ⚠️

**Verdict: ⚠️ Mostly compliant with gaps.**

- Skip link present and visible on focus (`base.css:510-529`)
- `aria-expanded` on nav toggle correctly maintained
- `aria-current="page"` on active nav link
- `role="banner"`, `role="navigation"`, `role="contentinfo"` landmarks present once each
- `prefers-reduced-motion` respected — animations off via media query (`base.css:549-558`, `components.css:68-72`, `components.css:800-804`) and JS listener (`main.js:92-103`)
- 44px touch targets on buttons ✅
- Focus rings visible (`base.css:586-590`)
- Toast notifications use `role="status"` and `aria-live="polite"` ✅
- Form labels present (intensity toggle with `aria-label`) ✅

**Issue:** The primary nav missing Plugins and Docs means keyboard users cannot reach those pages via primary nav — they must use footer nav or tab through page content. This is a navigation barrier.

**Cannot verify without browser testing:** 200% zoom layout survival, actual contrast ratios (WCAG requires 4.5:1 body, 3:1 large text/UI — `--color-text: #e8d5a3` on `--color-bg: #1a1208` needs real measurement), and whether any content clips at breakpoints.

---

## 7. Responsive (320→1920) — Score: 85 ⚠️

**Verdict: ⚠️ Good foundation, some gaps.**

- Grid tracks use `minmax(0, 1fr)` correctly (`theme.css:800, 806, 812`) — no bare `1fr` ✅
- `overflow-wrap: anywhere` on body text (`base.css:315`) ✅
- `overflow-wrap: break-word` + `hyphens: auto` on headings (`base.css:291-293`) ✅
- Mobile nav breakpoint at 900px (`components.css:165`) — slightly wider than typical 768px
- Mobile menu full-screen overlay (`components.css:171-187`)
- Cogsworth hides at ≤900px (`components.css:806-809`)

**Concerns:**
- `content-grid` uses `minmax(min(100%, 320px), 1fr)` — the `min(100%, 320px)` floor means at 320px viewport the grid cell is 100% wide (single column), which is correct, but the nested `content-grid` in `clients.html:198` overrides with `repeat(auto-fill, minmax(min(100%, 280px), 1fr))` — the `280px` floor could cause overflow issues at 320px with border/padding.
- `scroll-margin-top` on feature details (`theme.css:370`) helps scroll-to-anchor but cannot verify 200% text zoom without browser.

---

## 8. Performance (self-hosted fonts, no CDNs) — Score: 95 ✅

**Verdict: ✅ Excellent.**

- **No Google Fonts CDN** — confirmed via grep across all HTML and CSS files ✅
- Fonts self-hosted as WOFF2 from shared pool (`base.css:10-98` — Playfair Display, Cinzel Decorative, Crimson Text, Josefin Slab, Share Tech Mono, Oswald) ✅
- `@font-face` with `font-display: swap` on all faces ✅
- JS is `defer`-loaded (`index.html:619`, all pages) ✅
- No render-blocking resources
- `scroll-behavior: smooth` in CSS (`base.css:232`) but gated by `prefers-reduced-motion`

**Minor:** Fonts are loaded for multiple weights — e.g., Playfair Display loads both 700 and 900 even if only 900 is used in headlines. This is a minor efficiency concern but within acceptable bounds.

---

## 9. Content Accuracy (install from content.json) — Score: 70 ⚠️

**Verdict: ⚠️ Factual errors found.**

**❌ CRITICAL: "5 native client platforms" claim is WRONG.**
Per `new_site.md` §16 and §19.14: *"It is **four** native clients — Roku, Tizen, Windows, Mobile (beta) — **plus any DLNA device**."* DLNA is NOT a native client — it is a protocol. The claim of "5 platforms" is a fabrication.

**Locations with false claim:**
- `index.html:355` — proof-of-craft placard: `>5<strong>Native client platforms</strong>`
- `clients.html:9` — meta description: `"Five native gallery walls: Roku, Samsung Tizen, Windows, Mobile (beta), and any DLNA device."`
- `clients.html:92` — page lead: `"Five gallery walls — pick your screens."`
- `expedition-guide.html:125` — step 3: `"Roku, Samsung Tizen, Windows, Mobile (iOS + Android beta), or any DLNA device. Five platforms, zero configuration"`

**Install command:** Correctly copied from `content.json` ✅ (`download.html:115-119`)
`curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`

**"Not an install" dev checkout section:** Present and correctly labeled ✅ (`download.html:163-171`)

**License:** Correctly stated as MPL-2.0 for server+hub, MIT for libs/plugins/clients ✅

**Pitch bullets:** Not present on home page (home page uses feature grid instead). This is acceptable as a presentation variant.

**All 8 features:** Present on features page with correct body text from content.json ✅

**FAQ:** 6 canonical questions from content.json present on about page ✅ (plus 3 extra questions from kit — acceptable per `faq_experience` opt-in)

**Pitch bullets from content.json:** Not rendered verbatim on homepage — the page uses a feature grid + visitor paths fork instead. Per `new_site.md` §2, presentation copy may be restyled. The facts remain traceable but the pitch bullets section is absent from the home page entirely.

---

## 10. CTA / Funnel — Score: 90 ✅

**Verdict: ✅ Pass.** Primary CTA "Commission Your Engine" visible above fold on home page with correct `href="download.html"`. Download page reachable in ≤2 clicks from any page. Closing `.cta-banner` on every page drives toward download. The conversion funnel vocabulary is consistent with the steampunk theme.

**One concern:** The visitor paths fork on home (`index.html:144-152`) links to `features.html#library`, `features.html#syncplay`, `plugins.html` — but the nav itself doesn't include Plugins, so the fork is currently the only steampunk-named path to the Plugins page.

---

## 11. Social Metadata (OG + Twitter, og:image PNG) — Score: 85 ⚠️

**Verdict: ⚠️ Mostly complete with one error.**

- `og:image` is PNG ✅ (`img/og.png` exists, 363KB — larger than the ~120KB budget but acceptable)
- All OG tags present: `og:type=website`, `og:site_name=Phlix`, `og:url` (absolute), `og:title`, `og:description`, `og:image` (absolute URL), `og:image:type=image/png`, `og:image:width=1200`, `og:image:height=630` ✅
- Twitter: `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image` ✅

**Error:** `index.html:38` uses `twitter:site` instead of `twitter:creator` — spec requires `twitter:creator=@detain` per `new_site.md` §11. The `twitter:site` field is for the site account, not the content creator. Should be `@detain` in `twitter:creator`.

Same error on all pages (`download.html:38`, `features.html:38`, `clients.html:38`, `plugins.html:38`, `hub.html:35`, `about.html:38`, `docs.html:38`, `expedition-guide.html:38`, `404.html:31`).

---

## 12. Localization — Score: 95 ✅

**Verdict: ✅ Pass.** `<html lang="en">` set correctly. All user-facing strings trace back to `content.json` (presentation copy is brand-overlaid but facts are from the single source). Logical CSS properties used (`inline-start/end` not `left/right`). No locale-unsafe formatting detected. Fonts subset to Latin scripts. English only in `supported_locales`.

---

## 13. Experience Fidelity — Score: 88 ⚠️

**Verdict: ⚠️ Strong steampunk identity, undermined by structural shortcuts.**

The steampunk voice is genuinely realized — Victorian workshop vocabulary (boiler, commission, relay station, logbook, catalogue), brass/copper/amber palette, Cinzel Decorative display type, mechanical metaphors, Cogsworth mascot, gear animations, riveted frame motifs, intensity toggle "Workshop lights down", reduced motion note in footer, seasonal activation with midwinter/exhibition/halloween date gates.

**However:** The experience overrides that dropped Plugins and Docs from the nav feel like shortcuts rather than intentional redesign. The `site_architecture` field (if present in the kit) should formally specify the reduced nav; absence of it makes the omission look like an oversight. The visitor paths fork is a nice touch but it's the only path to the Plugins page from the main nav area.

**Easter eggs** are well-implemented: logo-clicks:5 → Cogsworth head spin, typed "catalogue" → amber tint, hover-hold:2s on gauge elements. All respect reduced-motion, keyboard focus is not captured, Escape exits. ✅

**Mascot Cogsworth** is charming and on-brand. Idle animation disabled under reduced-motion (`main.js:442-444`). Dismissal persisted via localStorage (`main.js:345`). Tip bubble content is brand-appropriate. ✅

---

## Summary Table

| # | Dimension | Score | Status |
|---|-----------|-------|--------|
| 1 | Brand fidelity & spirit | 70 | ⚠️ |
| 2 | SEO | 90 | ✅ |
| 3 | Readability | 92 | ✅ |
| 4 | Spelling & grammar | 95 | ✅ |
| 5 | Usability | 88 | ⚠️ |
| 6 | Accessibility (WCAG 2.2 AA) | 80 | ⚠️ |
| 7 | Responsive (320→1920) | 85 | ⚠️ |
| 8 | Performance (self-hosted fonts, no CDNs) | 95 | ✅ |
| 9 | Content accuracy (install from content.json) | 70 | ⚠️ |
| 10 | CTA / funnel | 90 | ✅ |
| 11 | Social metadata (OG + Twitter, og:image PNG) | 85 | ⚠️ |
| 12 | Localization | 95 | ✅ |
| 13 | Experience fidelity | 88 | ⚠️ |

**Average (unweighted):** 86.4

---

## Fixes Required

### ❌ CRITICAL (blocking)

1. **Add Plugins and Docs to primary nav** — `index.html:97-104` and all other page navs. The nav must carry all 8 links per `new_site.md` §5. Order: Home · Features · Clients · Download · Plugins · Docs · Hub · About.

2. **Fix "5 native client platforms" factual error** — This claim appears in:
   - `index.html:355` — remove or correct to "4 native clients + any DLNA device"
   - `clients.html:9` meta description — change "Five native gallery walls" to accurate description
   - `clients.html:92` page lead — remove "Five gallery walls" claim
   - `expedition-guide.html:125` — change "Five platforms" to "Four native clients, plus any DLNA device"
   
   Per `new_site.md` §19.14: *"A kit that says '5 native clients' (or any client/feature count) — content.json wins on facts. It is four native clients — Roku, Tizen, Windows, Mobile (beta) — plus any DLNA device."*

### ⚠️ RECOMMENDED (non-blocking)

3. **Change `twitter:site` to `twitter:creator`** — `index.html:38` and all other pages. Replace `<meta name="twitter:site" content="@detain">` with `<meta name="twitter:creator" content="@detain">`. The spec in `new_site.md` §11 is explicit.

4. **Clarify expedition-guide.html status in sitemap** — If this is a kit-declared `extra_pages`, keep it in sitemap and document the rationale in `SITE.md`. If not, remove from sitemap.

---

## Lint Status

`npm run lint` passes for copper-steampunk with no errors or warnings. ✅

---

*Review methodology: Manual code inspection against `new_site.md` ground truth and `shared/content.json` single source of truth. Grep for CDN patterns, font-face declaration audit, CSS grid token inspection, nav link inventory, factual claim cross-reference against content.json. Browser-level checks (200% zoom, 320px render, contrast ratios) could not be performed without a live browser environment — those dimensions carry uncertainty.*
