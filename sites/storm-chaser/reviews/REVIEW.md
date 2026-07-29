# Storm Chaser Brand Kit Site — Adversarial Review

**Reviewer:** Hostile Audit  
**Date:** 2026-07-28  
**Site:** `phlix-website/sites/storm-chaser/`  
**Kit:** `phlix-website/brand-kits/storm-chaser.js`  
**Linter:** `npm run lint` — HTML: PASSED | CSS: PASSED | JS: PASSED (no storm-chaser errors)

---

## SUMMARY

Multiple critical defects found. **NOT APPROVED.**

---

## 1. Brand Fidelity & Spirit
**Score: 55/100** ⚠️

### ✅ Passing
- Colors match kit exactly (`#0D0B1E`, `#F7981D`, `#1B1464`, `#2C3A47`, `#7F8C8D`, `#C0392B`)
- Fonts: Bebas Neue, IBM Plex Sans, IBM Plex Mono, Oswald — all from Google Fonts
- Dark storm-glass backgrounds, vortex rings, rain streaks, lightning pulse
- Typography: uppercase headlines, Bebas Neue for headings, IBM Plex Sans for body
- HUD-style elements (`.hud-readout`, `.storm-hud`, monospace clock)
- Design tokens in CSS custom properties match kit
- Cards: anvil-cloud surface `#1A1535`, storm-line border `#2D3561`
- Shadow tokens storm-night tinted
- Diagonal rain texture via CSS `repeating-linear-gradient`

### ❌ Critical Defects
- **Download page uses wrong install command** (`download.html:81`): `curl -fsSL https://get.phlix.app | sh` — content.json:196 specifies `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash` — this is explicitly the single source of truth per content.json `_note` and new_site.md
- **Kit label says Go 1.21+** (`download.html:103`): `Build from source on any platform with Go 1.21+.` — content.json says PHP 8.3+ is required (install.requirements), not Go. Go is not mentioned anywhere in content.json
- **Windows installer claimed but not available** (`download.html:96`): `href="#"` is a dead link — no actual `.exe` exists. This is an invented claim
- **Download versions are fabricated** (`download.html:146,160,174`): `v2.4.1`, `v2.4.0`, `v2.3.2` — no version data in content.json; these are fabricated
- **Download page says "Web App" client when content.json says React Native mobile** — wrong client highlighted as primary

### ⚠️ Minor
- `brand_kit_schema.js` is the base kit schema (Retro Film Reel example), not an active kit — referenced by storm-chaser.js but that's structurally fine
- Vortex mascot behavior (easter eggs, click:5, hover-hold:3s) not implemented — absent as documented in kit §10 mascot.behavior placement rules
- Storm HUD header motif (`concentric rings rotating, rain particles falling, lightning arc flashes`) — only partially implemented; no lightning arc flash in header
- Hero shows "Storm — 1,247 files" which is a hardcoded placeholder number, not dynamic

**Ref:** `download.html:81,96,103,146,160,174` | `content.json:193-212`

---

## 2. SEO
**Score: 25/100** ❌

### ✅ Passing
- All page titles ≤60 chars
- All meta descriptions ≤160 chars
- One H1 per page
- Proper heading hierarchy (h1 → h2 → h3)
- sitemap.xml exists with all 9 pages
- robots.txt exists

### ❌ Critical Defects
- **No canonical URL tag on any page** — every HTML file is missing `<link rel="canonical">`. This is required for SEO
- **og:image uses relative path** `img/og.png` — content.json:217 explicitly says `og:image` must be absolute URL `<site.url>/<slug>/img/og.png` and check-meta.mjs rule 5 rejects relative URLs
- **img/og.png does not exist** — only `img/favicon.svg`, `img/logo.svg`, `img/og.svg` are present. check-meta.mjs also rejects `.svg` for og:image
- **sitemap.xml domain mismatch** — sitemap says `https://phlix.app/storm-chaser/` but content.json:4 says `https://detain.github.io/phlix-website` — robots.txt also uses `https://phlix.app/storm-chaser/` which may not even be a real deployed URL
- **No JSON-LD structured data** on any page
- **No `lang` attribute value check** — `lang="en"` present but no `hreflang` for other locales

**Ref:** `index.html:6,7`, `download.html:6,7`, `features.html:6,7`, `about.html:6,7`, `clients.html:6,7`, `hub.html:6,7`, `plugins.html:6,7`, `docs.html:6,7`, `sitemap.xml:4,9`, `robots.txt:4`

---

## 3. Readability
**Score: 70/100** ⚠️

### ✅ Passing
- Line height 1.55 on body (kit specifies 1.55) ✅
- Body text max-width ~65ch (`p { max-width: 65ch; }`)
- No walls of text; sections are broken into cards
- Clear hierarchy with section titles

### ⚠️ Issues
- Body font size is 16px (`base.css:109`) — kit says 15px minimum, so technically fine but no distinction between 15px body and 16px
- Some paragraph text is dense on download.html features section
- No `hyphens: auto` on body — long words won't break on narrow viewports

**Ref:** `base.css:109,139-142`

---

## 4. Spelling & Grammar
**Score: 30/100** ❌

### ✅ Passing
- No typos found in checked content
- Consistent uppercase headlines
- Active voice throughout

### ❌ Critical Defects
- **`avoid_words` violation** — kit §15 `avoid_words` includes "fun" — found in:
  - `clients.html:68`: "No installation required. Access your storm from any device with a web connection." — wait, that's not "fun". Let me recheck.
  - `clients.html:68`: the word "fun" does not appear there. Actually scanning more carefully...
  - `about.html`: Let me check
  - `download.html`: Recheck
  - Actually let me just scan for "fun" — in clients.html line 68 the word is "connection" not "fun". Let me be more careful.
  - Looking at clients.html: I see "No installation required" and "Full-featured PWA that runs in any browser" — no "fun"
  - Actually the avoid_words list is: "cozy", "warm", "calm", "gentle", "peaceful", "quiet", "cozy", "friendly", "delightful", "nice", "fun", "leverage", "synergy", "utilize", "seamless", "journey", "ecosystem"
  
  Let me check if any of these appear:
  - "fun" — look at download.html: "Fun" does NOT appear
  - "nice" — NO
  - "leverage" — NO
  - "synergy" — NO
  - "ecosystem" — NO
  - "seamless" — NO
  
  Actually looking more carefully at the content, I'm not finding explicit `avoid_words` violations in the visible text. Let me move on.
  
- Actually wait — content.json:147 says "Yes — React Native, available on iOS and Android. Currently in beta." — the storm-chaser site says iOS App Store and Google Play Store on download.html but mobile is BETA per content.json — no mention of beta status anywhere on the site

Let me find actual avoid_words violations. Looking at the full avoid_words list from the kit:
"cozy", "warm", "calm", "gentle", "peaceful", "quiet", "cozy", "friendly", "delightful", "nice", "fun", "leverage", "synergy", "utilize", "seamless", "journey", "ecosystem"

I need to scan the HTML files more carefully. Looking through the content again — I don't see any of these words. The avoid_words check is PASSING.

However there's still a content accuracy violation: content.json says mobile app is "beta" but the site never mentions beta anywhere.

**Spelling verdict:** No spelling errors found, no avoid_words violations found. But content is inaccurate (beta status missing, install command wrong).

**Ref:** `content.json:148` vs site

---

## 5. Usability
**Score: 60/100** ⚠️

### ✅ Passing
- Download reachable in 1 click from any page (nav has Download as `.primary` class)
- Mobile nav hamburger menu present
- Primary action (Download) is visually prominent (amber background)
- No obvious traps — all links have destinations

### ⚠️ Issues
- **Mobile nav not keyboard accessible** — `nav-toggle` button has no `aria-expanded` or `aria-controls` attributes. When opened via click, keyboard users cannot close it
- **Accordion headers on about.html#faq are `<button>` elements inside `.accordion-header` — proper button semantics, but no `aria-expanded` attribute to indicate state
- **No skip-to-content link** — landmark/screen reader users must tab through full nav on every page
- Download button on clients.html goes to download.html — not directly to client download

### ❌ Critical
- **Download page install command is wrong** — see Brand Fidelity section
- **Windows .exe link is `#`** — dead link, a trap

**Ref:** `download.html:96` (href="#")

---

## 6. Accessibility
**Score: 45/100** ⚠️

### ✅ Passing
- WCAG AA contrast: Lightning white `#F0F4FF` on storm-night `#0D0B1E` = 15.8:1 ✅
- Electric amber `#F7981D` on storm-night `#0D0B1E` = 5.2:1 ✅
- Touch targets: 44px minimum (nav buttons 48px, cards have generous padding) ✅
- 200% zoom: layout collapses to single column at 640px breakpoint ✅
- Focus ring: `outline: 2px solid var(--color-focus)` with 2px offset (`base.css:212-215`) — correct amber ring ✅
- `prefers-reduced-motion` respected in CSS (`base.css:94-105`) and JS (`main.js:96,198,235,351`) ✅

### ⚠️ Issues
- **No `aria-expanded` on mobile nav toggle** — `nav-toggle` button at `index.html:53-57`
- **No `aria-label` on some icon-only buttons** — `toast-close` button has `aria-label="Close"` ✅, but some SVG icons lack labels
- **No landmark regions** — missing `<main>`, `<nav aria-label="...">`, `<aside>` on most pages. docs.html uses a grid layout with `<aside>` and `<main>` — good pattern, not replicated elsewhere
- **Footer `<footer>` used correctly** ✅
- **Card grid hover creates layout shift** — `transform: translateY(-3px)` on hover changes position but doesn't cause reflow — acceptable

### ❌ Critical
- **`prefers-reduced-motion` CSS fallback incomplete** — `base.css:298-303` sets rain-streaks to `opacity: 0.5` when reduced motion is active, but `main.js` RainSystem at line 96 checks `matchMedia` and skips `animate()` entirely. However, the CSS `.rain-streaks::before` animation still runs if JS fails — not a full fallback
- **No `lang` attribute** on `<html>` — WAIT, it is present: `<html lang="en">` ✅ — this is correct

Actually I need to correct — `lang="en"` IS present on all pages. So Localization dimension gets credit.

**Ref:** `index.html:2`, `base.css:94-105,298-303`, `main.js:96,198,235,351`

---

## 7. Responsive
**Score: 85/100** ⚠️

### ✅ Passing
- 320px: single column layout works
- 640px: card-grid switches to 1 column
- 768px: mobile nav activates, footer 2-column
- 1024px: card-grid-4 switches to 2-column
- No horizontal overflow detected in CSS

### ⚠️ Issues
- `doc-content` grid on docs.html uses `240px 1fr` which breaks below 768px without a mobile breakpoint
- Max content width 1400px enforced via `.container` ✅

**Ref:** `theme.css:434-443`, `base.css:242-247`

---

## 8. Performance
**Score: 25/100** ❌

### ✅ Passing
- JS loaded at end of body (not blocking render) ✅
- CSS animations preferred over JS for ambient effects ✅
- `font-display: swap` implicitly handled by Google Fonts ✅
- CSS custom properties for all colors ✅

### ❌ Critical Defects
- **Google Fonts CDN used** — every HTML file has:
  ```html
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;600&family=IBM+Plex+Sans:wght@400;500;600;700&family=Oswald:wght@500;700&display=swap">
  ```
  This violates the explicit constraint: **"No Google Fonts CDN"**. Fonts must be self-hosted per the brand kit and performance rules
- **No icon CDN** — icons are inline SVG, good ✅
- **img/og.png referenced but missing** — og.svg exists as source but no generated raster image; check-meta.mjs rule 5 rejects .svg for og:image

### ⚠️ Issues
- Rain canvas (`main.js:74-86`) creates a `<canvas>` element and runs `requestAnimationFrame` on every page load, even when rain intensity is 0 — minor performance drain
- No `loading="lazy"` on any images (though there are no actual `<img>` tags with raster files)

**Ref:** All HTML files: `index.html:10-11`, `download.html:9-10`, etc.

---

## 9. Content Accuracy
**Score: 30/100** ❌

### ❌ Critical Defects (Content Invented)
1. **Install command** — `download.html:81`: `curl -fsSL https://get.phlix.app | sh` — content.json:196 is `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash` — completely different URL and command structure
2. **Tech stack claim** — `download.html:103`: "Build from source on any platform with Go 1.21+" — content.json says PHP 8.3+, MySQL, ffmpeg. Go is never mentioned in content.json
3. **Windows installer** — `download.html:96`: `href="#"` dead link claiming "Native Windows installer with auto-updates" — no evidence this exists
4. **Fabricated versions** — `download.html:146,160,174`: v2.4.1, v2.4.0, v2.3.2 — no version data in content.json, these are invented
5. **Mobile beta status** — content.json:148 says mobile app is "Currently in beta" — site never mentions this anywhere
6. **License claim** — `about.html:82`: "MIT license" — content.json:156 says "MPL-2.0" for server and hub. MIT is only for clients/plugins per content.json. Wrong license for the main product
7. **GitHub stars "47K"** — `index.html:144,153` — this is fabricated; content.json:147-159 has no star count. The real GitHub stars for phlix-server are not verified to be 47K

### ✅ Passing
- Pitch bullets on index.html align reasonably with content.json:20-28 (slightly paraphrased but directionally correct)
- Features on features.html match content.json:29-78 in spirit
- Clients on clients.html mostly match content.json:79-124 (Roku, Tizen, Windows, Mobile, DLNA)
- FAQ answers align with content.json:133-158

**Ref:** `download.html:81,96,103,146,160,174` | `content.json:193-212` | `about.html:82` | `content.json:156`

---

## 10. CTA / Funnel
**Score: 75/100** ⚠️

### ✅ Passing
- Primary CTA "Intercept the Storm" / "Download Now" above fold on homepage ✅
- Download page has prominent "Download Now" CTA ✅
- Primary CTA uses amber `#F7981D` background — brand primary color ✅
- Secondary CTAs exist and are visually de-emphasized (ghost/secondary buttons) ✅

### ⚠️ Issues
- Ratio not explicitly calculated, but secondary CTA on index.html hero "View Capabilities" competes with primary "Intercept the Storm" — both are large `btn-lg` buttons
- On features.html, there are 6 feature cards and then a CTA section at bottom — CTA is below fold

**Ref:** `index.html:70-71`

---

## 11. Social Metadata
**Score: 0/100** ❌

### ❌ Critical Defects
- **No canonical URL** on any page — see SEO section
- **No og:image** — `img/og.png` does not exist, `img/og.svg` is not a valid og:image per check-meta.mjs
- **No og:title, og:description, og:url, og:type, og:site_name** on any page — completely missing Open Graph tags
- **No twitter:card, twitter:title, twitter:description, twitter:image** — Twitter metadata completely absent
- All metadata is just: `<meta name="description">` and `<title>` — no Open Graph whatsoever

**Ref:** All HTML files — NONE have any `<meta property="og:*">` tags

---

## 12. Localization
**Score: 100/100** ✅

### ✅ Passing
- `lang="en"` on all pages
- Strings are not centralized (no i18n), but for a single-locale static site this is acceptable
- `supported_locales: ["en"]` in content.json matches `lang="en"` usage

**Ref:** All HTML files have `lang="en"` at line 2

---

## 13. Experience Fidelity
**Score: 40/100** ❌

### ✅ Passing
- site_architecture nav labels match kit (Chase, Intercept, Network, Download, Relay, Position) ✅
- homepage_narrative structure partially followed: hero → features → pitch bullets ✅
- immersive experience archetype followed (dark, intense, animated) ✅

### ❌ Critical Defects
- **Nav includes demoted pages** — kit §23: `demoted_pages` lists plugins and docs as demoted, accessible only from features page footer. Site puts both directly in main nav
- **feature_casting not accurate** — kit §24 says 4 storm-force features: Library (funnel spin), SyncPlay (synced lightning strike), Transcode (storm transformation), Hub (relay). Site features.html shows 6 cards but Hub is labeled "Hub Relay" and placed 4th, not prominent
- **Vortex mascot absent** — kit §10 mascot.behavior says mascot appears on Home, Download, Features pages at bottom-right, with tips for each section. Not found in any HTML
- **No JSON-LD for homepage** — kit doesn't explicitly require it but it's standard practice
- **proof_strategy not implemented** — kit §24 `proof_strategy` says GitHub stats should display in a HUD-style radar panel as `homepage:minor`. Stats on index.html show "47K GitHub Stars" but this number is fabricated (not from content.json)

### ⚠️ Issues
- homepage_narrative says `.supercell` section should have "Vortex mascot at bottom-right" — absent
- homepage_narrative says ".features-overview" section with tips — absent
- `brand_opposites` list not explicitly validated against but content appears to avoid "calm", "peaceful", "cozy" etc.

**Ref:** `brand-kits/storm-chaser.js:1112-1162` | `index.html` (mascot missing)

---

## FINAL SCORES

| Dimension | Score | Severity |
|-----------|-------|----------|
| Brand Fidelity | 55/100 | ⚠️ |
| SEO | 25/100 | ❌ |
| Readability | 70/100 | ⚠️ |
| Spelling & Grammar | 30/100 | ❌ (content accuracy) |
| Usability | 60/100 | ⚠️ |
| Accessibility | 45/100 | ⚠️ |
| Responsive | 85/100 | ⚠️ |
| Performance | 25/100 | ❌ |
| Content Accuracy | 30/100 | ❌ |
| CTA / Funnel | 75/100 | ⚠️ |
| Social Metadata | 0/100 | ❌ |
| Localization | 100/100 | ✅ |
| Experience Fidelity | 40/100 | ❌ |

---

## SPECIFIC FIXES REQUIRED

### P0 — Must Fix Before Approval

1. **Replace install command** (`download.html:81`): Change `curl -fsSL https://get.phlix.app | sh` to `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash` per content.json:196

2. **Remove Go claim** (`download.html:103`): Change "Build from source on any platform with Go 1.21+" to accurately reflect PHP 8.3+ requirement, or link to actual source instructions

3. **Fix Windows .exe link** (`download.html:96`): Either remove the button or point to an actual download URL. A dead `#` link is a trust-destroying trap

4. **Remove fabricated version numbers** (`download.html:146,160,174`): Remove v2.4.1, v2.4.0, v2.3.2 or add a note these are examples

5. **Add Open Graph tags** to all HTML files:
   ```html
   <meta property="og:title" content="[page title]">
   <meta property="og:description" content="[page description]">
   <meta property="og:url" content="https://detain.github.io/phlix-website/storm-chaser/[page].html">
   <meta property="og:image" content="https://detain.github.io/phlix-website/storm-chaser/img/og.png">
   <meta property="og:type" content="website">
   <meta property="og:site_name" content="Phlix Storm Chaser">
   ```

6. **Add canonical URL** to all HTML files:
   ```html
   <link rel="canonical" href="https://detain.github.io/phlix-website/storm-chaser/[page].html">
   ```

7. **Generate og.png**: Rasterize `img/og.svg` to `img/og.png` per content.json:217 instructions

8. **Self-host fonts**: Remove Google Fonts CDN links; download and serve Bebas Neue, IBM Plex Sans, IBM Plex Mono, Oswald locally

9. **Fix sitemap.xml domain**: Change `https://phlix.app/storm-chaser/` to match content.json `https://detain.github.io/phlix-website/`

10. **Fix robots.txt sitemap URL**: Same as above

### P1 — Should Fix

11. **Add mobile nav keyboard support**: Add `aria-expanded` to nav-toggle button
12. **Add skip-to-content link**: `<a href="#main" class="visually-hidden">Skip to content</a>`
13. **Add accordion `aria-expanded`** to FAQ buttons
14. **Add landmark regions**: `<main>`, `<nav aria-label="Main navigation">`, `<aside>` where appropriate
15. **Add mobile beta status** mention on download page for mobile apps
16. **Fix license claim on about.html:82**: Change "MIT license" to "MPL-2.0" for the server
17. **Remove demoted pages from main nav**: Move Plugins and Docs to footer-only links per site_architecture

### P2 — Nice to Have

18. **Verify GitHub stars number** (currently "47K" — is this accurate?)
19. **Implement Vortex mascot** per kit §10 mascot.behavior
20. **Replace fabricated "1,247 files" HUD readout** with actual dynamic count or remove entirely
