# Apex Predator — Brand Kit Site Review

**Site:** `sites/apex-predator/`
**Ground truth:** `new_site.md` + `shared/content.json`
**Lint:** `npm run lint` — apex-predator warnings only (unused `e` params in captured.js:26,34 and track.js:227,235) — negligible

---

## OVERALL VERDICT: **REJECTED** ❌

This site is **not a Phlix marketing site**. It is a brand-kit showcase/landing page that sells the Apex Predator brand kit itself with fake pricing tiers ($2,400–$9,600/month). It bears no resemblance to what `new_site.md` requires. A complete rebuild from scratch is the only path to approval.

---

## Dimension Scores

| # | Dimension | Score | Status |
|---|-----------|-------|--------|
| 1 | Brand fidelity & spirit | 40 | ⚠️ |
| 2 | SEO | 15 | ❌ |
| 3 | Readability | 55 | ⚠️ |
| 4 | Spelling & grammar | 80 | ⚠️ |
| 5 | Usability | 10 | ❌ |
| 6 | Accessibility (WCAG 2.2 AA) | 35 | ❌ |
| 7 | Responsive (320→1920) | 50 | ⚠️ |
| 8 | Performance (self-hosted fonts, no CDNs) | 20 | ❌ |
| 9 | Content accuracy (install from content.json) | 0 | ❌ |
| 10 | CTA / funnel | 5 | ❌ |
| 11 | Social metadata (OG + Twitter, og:image PNG) | 0 | ❌ |
| 12 | Localization | 50 | ⚠️ |
| 13 | Experience fidelity | 5 | ❌ |

---

## 1. Brand Fidelity & Spirit — 40 ⚠️

**Status: PARTIAL PASS — brand aesthetics present, product identity absent**

- Color palette is brand-correct: `#C70039` (arterial crimson), `#900C3F`, `#FF5733`, `#000000`, `#0A0A0A`, `#F0E6DC` — `index.html:13-26`, `styles.css:9-28`
- Typography system (Oswald/Bebas Neue/Roboto Condensed/Share Tech Mono) is declared in CSS vars — `styles.css:31-35`
- Dark predator aesthetic is consistent
- Sharp-cornered cards, claw-mark decorative elements, crimson glow box-shadows match the kit

**BREACHES:**
- Site sells the brand kit itself ("Pack Hunter $2,400/mo", "Alpha Predator $4,800/mo", "Apex Dominator $9,600/mo") — `services.html:59,83,107` — **not Phlix**. The brand kit IS the product, not Phlix. This directly violates the brand kit's own description: *"Apex Predator was forged for the viewer who watches a film and feels the pull of something deeper"* — it is a Phlix brand kit, not a standalone product.
- Nav wordmark says "APEX PREDATOR" — `index.html:41` — no Phlix branding anywhere
- Tagline "Nothing Escapes Your Library" is the kit's tagline_primary, but used to brand the kit itself rather than as Phlix copy

**Fix:** Replace fake pricing/service tiers with Phlix download CTA. Add Phlix wordmark/logo alongside any kit identity.

---

## 2. SEO — 15 ❌

**Status: FAIL — critical meta missing on every page**

**BREACHES:**
- No `<link rel="canonical">` on any page — spec §10 requires it
- No `<meta name="keywords">` on any page — spec §10 requires it
- No JSON-LD `SoftwareApplication` block on home page — spec §10
- No `sitemap.xml` — spec §10
- No `robots.txt` — spec §10
- `index.html:6` `<title>` is "Apex Predator | Nothing Escapes Your Library." — should be "Nothing Escapes Your Library — Phlix" per spec §10 (`<Page> — Phlix`)
- All page titles are kit-branded only: "About | Apex Predator" (`about.html:6`), "Services | Apex Predator" (`services.html:6`)

**Fix:** Add all required SEO meta to every page per spec §10. Add sitemap.xml and robots.txt.

---

## 3. Readability — 55 ⚠️

**Status: WARN — brand type system in CSS vars but fonts never load**

- Font families declared: `Oswald`, `Bebas Neue`, `Roboto Condensed`, `Share Tech Mono` — `styles.css:31-35`
- No `@font-face` declarations exist anywhere in CSS — fonts fall through to `Impact`, `Arial Black`, `sans-serif` (the fallbacks), which are **not the brand typefaces**
- `new_site.md §7` explicitly requires: *"Fonts self-hosted WOFF2 with `font-display: swap`"*
- `new_site.md §19.3` rule: *"Zero external font requests: no `fonts.googleapis.com`, no `fonts.gstatic.com`"* — there is no Google Fonts link, but also no local font loading

**Fix:** Add `@font-face` for all 4 typefaces from `shared/assets/fonts/`. Reference via `../../assets/fonts/…` from site's CSS.

---

## 4. Spelling & Grammar — 80 ⚠️

**Status: PASS with minor issues**

- Brand voice copy is consistent and well-written
- "The hunt resumes", "enter the territory", "prey captured" — kit voice applied correctly
- No spelling errors detected in observed content

**Minor issue:**
- "APEX PREDATOR BRAND KIT" badge in hero — `index.html:80` — all-caps kit identity crowds the Phlix messaging

---

## 5. Usability — 10 ❌

**Status: FAIL — wrong pages, wrong navigation, wrong structure**

**CRITICAL BREACHES:**

**Missing required pages (spec §3):**
- ❌ `features.html` — required per spec §3.2
- ❌ `clients.html` — required per spec §3.3
- ❌ `download.html` — required per spec §3.4 (primary funnel page)
- ❌ `plugins.html` — required per spec §3.5
- ❌ `docs.html` — required per spec §3.6
- ❌ `hub.html` — required per spec §3.7
- ❌ `404.html` — required per spec §2A / §18

**Extra unauthorized pages:**
- ❌ `contact.html` — not in spec, must be removed
- ❌ `portfolio.html` — not in spec, must be removed
- ❌ `services.html` — not in spec, must be removed
- ❌ `reviews/apex-predator/index.html` — not in spec, must be removed

**Navigation is completely wrong (spec §5):**
- Current: Home · About · Services · Portfolio · Reviews · Contact — `index.html:49-54`
- Required: Home · Features · Clients · Download · Plugins · Docs · Hub · About

**Footer links are wrong (spec §5):**
- Current footer has "Navigation" (home, about, services, portfolio, reviews) + "TRACK" (contact, twitter, linkedin, github) — `index.html:381-398`
- Required: 3 columns from `content.json.footer.columns` — Product / Developers / Project

**Fix:** Full rebuild per spec §3 page inventory. Delete contact.html, portfolio.html, services.html, reviews/ directory.

---

## 6. Accessibility (WCAG 2.2 AA) — 35 ❌

**Status: FAIL — missing several WCAG 2.2 AA requirements**

**PASSES:**
- `prefers-reduced-motion` respected — `animations.css:448-471`, `styles.css:49-55`
- `lang="en"` on `<html>` — all pages
- Mobile nav has `aria-expanded` — `main.js:31-34`

**BREACHES:**
- No `.skip-link` — spec §4 shell requires `<a class="skip-link" href="#main-content">Skip to main content</a>` as first focusable element
- No `aria-label` on primary `<nav>` — spec §4 shell requires `aria-label="Primary navigation"`
- No `aria-current="page"` on current nav link — spec §4 shell rule
- No visible `:focus-visible` ring in base CSS — only `.form-input:focus` and `.btn:focus` have outline handling
- Touch targets: nav-toggle bars are 28×2px — below 44×44px minimum
- `statusPulse` keyframe animation runs infinitely — `styles.css:1200-1209` — should be wrapped in reduced-motion check (is, via global rule at `animations.css:448`)
- Hero CTA buttons at `index.html:89-94` link to `services.html` and `about.html` — not a Phlix destination

**Fix:** Add skip link, nav aria-label, aria-current, visible focus styles, fix touch target size.

---

## 7. Responsive (320→1920) — 50 ⚠️

**Status: PARTIAL — CSS exists but untested, unverified**

- Uses `clamp()` for fluid type — `styles.css:91`
- Grid uses `auto-fit, minmax(280px, 1fr)` — `styles.css:541-544`
- Mobile nav toggle shows at `width <= 768px` — `styles.css:261-282`
- Stats grid collapses to 2 columns at 768px — `styles.css:653-657`
- Footer grid collapses to 2 columns at 768px — `styles.css:1133-1137`

**BREACHES:**
- `new_site.md §19.12` explicitly requires `minmax(0, 1fr)` not `1fr` — `styles.css:649` uses `repeat(4, 1fr)` — violates the known trap
- `overflow-wrap: anywhere` not applied to body text — spec §19.12 requires it for narrow grid tracks
- No `render-check` result available (spec §19.10)
- Not tested at 320, 375, 414, 768, 1024, 1280, 1920

**Fix:** Change `repeat(4, 1fr)` → `repeat(4, minmax(0, 1fr))`. Add overflow-wrap rules per spec §19.12. Run `node tools/render-check.mjs --site apex-predator`.

---

## 8. Performance (self-hosted fonts, no CDNs) — 20 ❌

**Status: FAIL — no fonts load, no CDN detected but also no local fonts**

**PASSES:**
- No Google Fonts CDN `<link>` found — site does not make external font requests
- JS is vanilla, no CDN scripts — `index.html:427-430`

**BREACHES:**
- No `@font-face` declarations for any of the 4 brand typefaces — fonts fall back to system fonts
- Fonts should be in `css/fonts/` as self-hosted WOFF2, referenced via `../../assets/fonts/…` from CSS
- `new_site.md §19.3`: *"Every `@font-face` `src` must point at a WOFF2 that exists in the repo"*
- `new_site.md §13`: *"Fonts self-hosted WOFF2 with `font-display: swap`"*

**Fix:** Add @font-face declarations for Oswald, Bebas Neue, Roboto Condensed, Share Tech Mono from the shared font pool. Subset to needed scripts.

---

## 9. Content Accuracy (install from content.json) — 0 ❌

**Status: FAIL — zero content.json content present**

**CRITICAL:** `new_site.md §2` states: *"All **FACTS** — spec claims, numbers, licenses, repo links, and FAQ **answer substance** — must remain **traceable to `content.json`**"*

**BREACHES:**
- `content.json.hero` — Not present. Hero shows "NOTHING ESCAPES YOUR LIBRARY" (kit tagline, not Phlix copy), wrong subheadline
- `content.json.pitch_bullets` — Not present. No "Why Phlix?" section with the 7 pitch bullets
- `content.json.features` (8 features) — Not present. Features section shows kit-specific "Claw Marks", "Pounce Transitions", etc. — not Phlix feature cards
- `content.json.clients` — Not present. No client cards for Roku, Tizen, Windows, Mobile, DLNA
- `content.json.ecosystem` — Not present. No ecosystem listing
- `content.json.faq` — Not present. No FAQ items from content.json
- `content.json.install` — Not present. No install command snippet. No PHP 8.3+, no `curl -fsSL | sudo bash`
- `content.json.footer` — Not present. Footer columns are wrong
- `content.json.meta` — Not present. No description/keywords from content.json

**Completely fabricated content:**
- Fake pricing tiers: "Pack Hunter $2,400/month" `services.html:59` — fabricated, no basis in content.json
- Stats section with "199M LIBRARY SIZE", "100% CAPTURE RATE" — `index.html:204-223` — fabricated, unverifiable
- No facts from content.json appear anywhere on the site

**Fix:** Full content replacement. Wire every page section to content.json per spec §2 and §3.

---

## 10. CTA / Funnel — 5 ❌

**Status: FAIL — CTAs do not drive to Phlix download**

**BREACHES:**
- Primary hero CTA: "ENTER THE HUNT" → `services.html` — `index.html:89`
- Secondary hero CTA: "LEARN MORE" → `about.html` — `index.html:92`
- Spec §5: *"Primary funnel rule: the download goal must be reachable in ≤2 clicks from home, and the primary CTA visible above the fold"*
- No "Get Phlix" or "Download Phlix" CTA anywhere
- CTA sections link to `contact.html` — `about.html:144`, `services.html:164`
- `content.json.hero.primary_cta` says `{ label: "Get Phlix", href: "/download" }` — not used

**Fix:** Primary CTA on every page must be "Get Phlix" → download.html. Secondary CTA → docs.

---

## 11. Social Metadata (OG + Twitter, og:image PNG) — 0 ❌

**Status: FAIL — no social meta on any page**

**BREACHES:**
- No `og:image` — spec §11 requires `og:image` as absolute URL to 1200×630 PNG. `index.html` has no og:* meta at all
- No `og:type`, `og:site_name`, `og:url`, `og:title`, `og:description`
- No `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- No `<meta name="theme-color">` = kit primary (`#C70039`)
- No `<link rel="icon">` (SVG)
- `shared/content.json.meta.og_image` = `img/og.png` — this file does not exist in `sites/apex-predator/img/`
- `new_site.md §19.5`: *"og:image must be a `.png` — tools/check-meta.mjs rule 5 rejects an SVG og:image"*

**Fix:** Add all og:* and twitter:* meta to every page `<head>`. Generate `img/og.png` (1200×630) per spec §8 and §19.5.

---

## 12. Localization — 50 ⚠️

**Status: PARTIAL — lang attribute set, no i18n structure**

**PASSES:**
- `<html lang="en">` on all pages

**BREACHES:**
- All user-facing strings are hardcoded in HTML — no reference to `content.json` keys
- `new_site.md §15`: *"All user-facing strings trace back to `content.json` (so a translator swaps one file)"*
- No logical properties (`inline-start/end`) used — uses `left/right` in some places

---

## 13. Experience Fidelity — 5 ❌

**Status: FAIL — this is not a Phlix site**

**CRITICAL:** `new_site.md §0` states: *"A brand-kit site markets the **same product** with the **same factual copy** (from `shared/content.json`) across the **same eight pages**"*

**BREACHES:**
- Product being marketed: the Apex Predator "brand kit" (fake pricing, service tiers) — not Phlix
- Experience archetype declared in kit: "immersive" (`apex-predator.js:1080`) — but there is no Phlix immersive experience. The kit's immersive experience is a showcase of its own design system
- No mascot from kit (`Slasher`) is present on the site — `apex-predator.js:525-566`
- No claw mark SVG scratches across borders, no predator silhouette watermark, no blood splatter accents — `apex-predator.js:151-159` signature elements not implemented
- "Services" section with pricing tiers is the antithesis of a Phlix media server site
- Site identity: "APEX PREDATOR BRAND KIT" everywhere — `index.html:41,80`, `about.html:22`

**Fix:** Complete rebuild. Use kit ONLY for visual identity (colors, fonts, shapes, motion, voice) layered over the fixed Phlix 8-page structure + content.json.

---

## Required Fixes (Priority Order)

### P0 — Structural (no Phlix site exists)
1. **Delete** `contact.html`, `portfolio.html`, `services.html`, `reviews/` directory
2. **Create** all missing pages: `features.html`, `clients.html`, `download.html`, `plugins.html`, `docs.html`, `hub.html`, `404.html`
3. **Wire** all pages to `shared/content.json` per spec §2 and §3
4. **Fix navigation** to 8-link spec: Home · Features · Clients · Download · Plugins · Docs · Hub · About
5. **Fix footer** to 3-column content.json.footer.columns spec

### P0 — Fonts
6. **Add `@font-face`** for all 4 typefaces from `../../assets/fonts/` in `css/base.css`

### P0 — SEO / Social
7. **Add canonical**, keywords, description, JSON-LD to every `<head>`
8. **Add og:*** and `twitter:*` meta to every page
9. **Generate `img/og.png`** (1200×630) per spec §8 and §19.5
10. **Create `sitemap.xml`** and `robots.txt`

### P1 — CTA / Funnel
11. **Replace all CTAs** — primary = "Get Phlix" → download.html, secondary = "Read the docs" → docs URL
12. **Remove** all "ENTER THE HUNT" / "START THE HUNT" / fake service CTAs

### P1 — Accessibility
13. **Add skip link** as first focusable element
14. **Add nav `aria-label`**, `aria-current="page"` on active link
15. **Fix touch targets** to ≥44×44px (nav-toggle)

### P2 — Responsive
16. **Fix** `repeat(4, 1fr)` → `repeat(4, minmax(0, 1fr))` in stats grid
17. **Add `overflow-wrap: anywhere`** for body text in narrow tracks per spec §19.12
18. **Run** `node tools/render-check.mjs --site apex-predator`

### P2 — Content
19. **Replace** fake stats and pricing with actual Phlix facts from content.json and spec §16

---

**Conclusion:** This site is a brand-kit showcase, not a Phlix marketing site. The entire 8-page Phlix structure with content.json wiring must replace the current content. Brand kit aesthetics (colors, type, motion, voice) should be applied as a visual layer over the correct Phlix structure. Zero required pages, wrong navigation, zero content.json content, zero SEO, zero social meta — approval requires a full rebuild.
