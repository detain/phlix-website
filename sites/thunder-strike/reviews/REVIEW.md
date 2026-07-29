# Thunder Strike — Brand Kit Site Review

**Review date:** 2026-07-28
**Reviewer:** Hostile Auditor
**Kit:** `brand-kits/thunder-strike.js` (v1.0)
**Site:** `sites/thunder-strike/`
**Lint status:** `npm run lint` — PASSES (no warnings)

---

## Overall Verdict

**❌ REJECTED — Multiple critical failures across 11 of 13 dimensions.**

The site has strong visual design and electric brand personality, but **fails content accuracy, content completeness, and technical requirements**. See fixes below.

---

## Dimension Scores

| # | Dimension | Score | Status |
|---|-----------|-------|--------|
| 1 | Brand fidelity & spirit | 78/100 | ⚠️ |
| 2 | SEO | 35/100 | ❌ |
| 3 | Readability | 82/100 | ⚠️ |
| 4 | Spelling & grammar | 95/100 | ✅ |
| 5 | Usability | 70/100 | ⚠️ |
| 6 | Accessibility | 72/100 | ⚠️ |
| 7 | Responsive | 68/100 | ❌ |
| 8 | Performance | 45/100 | ❌ |
| 9 | Content accuracy | 25/100 | ❌ |
| 10 | CTA / funnel | 68/100 | ⚠️ |
| 11 | Social metadata | 20/100 | ❌ |
| 12 | Localization | 80/100 | ✅ |
| 13 | Experience fidelity | 70/100 | ⚠️ |

---

## 1. Brand Fidelity & Spirit — 78/100 ⚠️

**Verdict:** Mostly faithful with exceptions.

**What works:**
- Colors match kit exactly (#5F27CD, #48DBFB, #EE5A24, #131720, #F5F6FA) ✅
- Russo One, Orbitron, Exo 2, Share Tech Mono fonts match kit ✅
- Plasma orb and arc animations present ✅
- Electric vocabulary used throughout (arc, voltage, discharge, tesla) ✅
- Dark storm backgrounds (#131720) ✅
- Electric arc dividers, HUD readout, thunder terminology ✅
- Mascot "Arc" references throughout ✅

**What breaks brand:**
- theme.css:112 — Google Fonts CDN TTF fallback: `url('https://fonts.gstatic.com/s/russoone/v14/1cXxaUPoC_D1B8WzgM2XSbGO7.ttf')` — **explicitly forbidden** per new_site.md §19.3
- Stats section (index.html:144-166) shows "47,000 GitHub Stars" fabricated number — the brand kit says nothing about GitHub stars, this is invented
- Review testimonials (index.html:217-253) are fabricated with invented usernames — brand kit never requests testimonials

**Reference:** `theme.css:106-113`, `index.html:148-151`

---

## 2. SEO — 35/100 ❌

**Verdict:** Critical gaps — missing canonical, keywords, JSON-LD, sitemap.

**Missing:**
- `<link rel="canonical">` — **absent on all pages**
- `<meta name="keywords">` — **absent on all pages** (should be from `content.json.meta.keywords`)
- JSON-LD `SoftwareApplication` block on home page — **absent** (required per new_site.md §10)
- `sitemap.xml` — **absent** (required per new_site.md §1)
- `robots.txt` — **absent** (required per new_site.md §1)

**Title issues:**
- index.html `<title>` is 54 chars — within 60 ✅
- But `og:title` and `twitter:title` are entirely absent from all pages ❌

**Reference:** `index.html:6-7`, all HTML files lack `<head>` SEO block

---

## 3. Readability — 82/100 ⚠️

**Verdict:** Generally good with minor issues.

**Works:**
- Body text 1rem+ ✅
- Line-height 1.6 on body ✅
- `overflow-wrap: anywhere` not explicitly set but body text wraps ✅
- Muted text (#8892A0) on dark surfaces readable ✅

**Issues:**
- HUD readout (index.html:84-87) uses 0.75rem mono text — at 320px this could be problematic
- Some card titles use ALL CAPS Russo One which can reduce readability for longer words
- Hero gradient text (base.css:338-344) uses `-webkit-text-fill-color: transparent` — may have accessibility implications

**Reference:** `index.html:84-87`, `base.css:338-344`

---

## 4. Spelling & Grammar — 95/100 ✅

**Verdict:** Clean, no errors found.

**Notes:**
- Brand voice language is consistent
- No typos or grammar issues
- Electric vocabulary used correctly and consistently

---

## 5. Usability — 70/100 ⚠️

**Verdict:** Core usable, navigation works, but gaps.

**Works:**
- Mobile nav toggle present ✅
- Skip link exists ✅
- Focus states visible ✅
- Primary CTA visible above fold on hero ✅

**Issues:**
- `plugins.html` and `docs.html` linked in nav but **don't exist** — dead links ❌
- Footer links to `plugins.html` and `docs.html` are also dead ❌
- No `404.html` — new_site.md §2A requires it
- Download page has placeholder `#` hrefs on client buttons (download.html:111, 117, 123, 129) ❌

**Reference:** `index.html:51`, `download.html:111`

---

## 6. Accessibility (WCAG 2.2 AA) — 72/100 ⚠️

**Verdict:** Mostly compliant with gaps.

**Works:**
- Skip link present ✅
- Focus ring visible (2px plasma cyan) ✅
- `prefers-reduced-motion` respected in CSS and JS ✅
- `aria-label` on nav toggle ✅
- Contrast ratios mostly pass (measured: #F5F6FA on #131720 = 16.1:1, #48DBFB on #131720 = 5.3:1) ✅
- Touch targets 44×44px+ on buttons ✅

**Issues:**
- Canvas arc animation runs continuously and may cause motion sensitivity issues despite reduced-motion media query — the reduced-motion query only affects the animation but the canvas element itself is always present and the JS creates it even with reduced motion (main.js:104-109) ⚠️
- Some interactive elements lack proper `aria-expanded` on toggles (index.html:59) — only nav toggle has it ✅, but other toggles on site may lack it
- No `aria-current="page"` on active nav items — the site uses `.active` class but doesn't set the ARIA attribute ❌
- Video/content playing indicators use `animation: plasmaGlow 2s ease-in-out infinite` which may be problematic at 200% zoom

**Reference:** `main.js:104-109`, `index.html:50`

---

## 7. Responsive (320→1920) — 68/100 ❌

**Verdict:** Core responsive but issues at breakpoints.

**Works:**
- Container max-width 1400px ✅
- Mobile nav collapses at 768px ✅
- Fluid typography with clamp() ✅
- `gap` and flex-wrap on hero CTA ✅

**Issues:**
- `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` on card-grid-4 — the bare `1fr` can cause overflow per new_site.md §19.12 — should be `minmax(0, 1fr)` ❌
- `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))` on footer-grid — same issue
- `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))` on review-grid — same issue
- `grid-template-columns: repeat(auto-fit, minmax(180px, 1fr))` on poster-grid — same issue
- No 404.html means broken links have no fallback
- At 320px, the arc background canvas may cause performance issues

**Reference:** `base.css:473`, `base.css:622`, `base.css:671`, `components.css:741`

---

## 8. Performance — 45/100 ❌

**Verdict:** Font loading will fail, canvas animation overhead.

**Critical issues:**
- **No self-hosted fonts exist** — CSS references `../fonts/russo-one.woff2` etc. but `/home/sites/phlix/phlix-website/sites/thunder-strike/css/fonts/` **does not exist** ❌ The fonts will fail to load and the site will fall back to system fonts, destroying brand typography
- Google Fonts TTF CDN fallback in theme.css:112 — violates no-CDN rule ❌
- Canvas arc animation runs on every page — expensive on mobile ❌
- `@font-face` has no preconnect hints (though fonts are local, preconnect helps with font-display)
- No `font-display: swap` on fallback (it's set on the main declarations but the Google Fonts fallback has no such concern)

**What works:**
- CSS is well-structured with variables ✅
- Animations use `requestAnimationFrame` in JS ✅
- No render-blocking scripts (main.js is not deferred but the arc animation is opt-in) ⚠️

**Reference:** `theme.css:66-104`, `theme.css:107-113`, `main.js:14-139`

---

## 9. Content Accuracy — 25/100 ❌

**Verdict:** Multiple critical content violations.

**CRITICAL — Install command is WRONG:**
- `download.html:75` shows: `curl -sSL https://get.phlix.app | bash`
- Per `content.json.install.primary.command`: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`
- **This is a completely different URL and command** ❌

**CRITICAL — Download clients are WRONG:**
- `download.html:99-132` shows: iOS, Android, Web, Smart TV
- Per `content.json.clients`: Roku, Samsung Tizen, Windows, Mobile (iOS + Android), Any DLNA device
- The download page shows iOS App Store / Android Play Store buttons with `href="#"` which don't even link anywhere real ❌

**CRITICAL — Stats are fabricated:**
- `index.html:148-151`: "47,000 GitHub Stars" — this is not verifiable and was printed without evidence
- Per new_site.md §19.7: "A static page cannot verify a number, and printing one is fabrication"
- `index.html:85`: "VOLTAGE — 1,247 files" — entirely fabricated, no such count exists
- The about.html:114 says "Over 47,000 GitHub stars" — same fabrication ❌

**Fabricated testimonials:**
- `index.html:217-253`: Three review cards with fake usernames (VoltageViking, StormCommander, ArcMaster) and fake quotes — **these are not real users**, brand kit never requested testimonials ❌

**Wrong pitch bullets on home:**
- index.html:174-205 shows 6 custom pitch bullets that are brand-voice rephrases, but the original pitch_bullets from content.json are missing entirely. The home page doesn't show any of the 7 actual pitch_bullets from content.json ❌
- The brand kit says it re-voices, not invents — these custom bullets don't map to the real pitch_bullets

**Wrong client showcase on clients.html:**
- clients.html:63-88 shows iOS, Android, Web, Smart TV
- Per content.json.clients, the actual clients are: Roku, Samsung Tizen, Windows, Mobile (iOS + Android), Any DLNA device
- This is an entirely different set of clients ❌

**Reference:** `download.html:75`, `download.html:99-132`, `index.html:174-205`, `clients.html:63-88`

---

## 10. CTA / Funnel — 68/100 ⚠️

**Verdict:** Download CTA exists but content is wrong.

**Works:**
- Primary download CTA visible in hero ✅
- Download page has CTA section ✅
- External docs link present ✅

**Issues:**
- Download page links to wrong/made-up client platforms (iOS/Android/Web instead of Roku/Tizen/Windows/Mobile) ❌
- Download page install command is wrong URL ❌
- Some CTA buttons use `href="#"` (download page client cards) which are dead ❌
- Footer CTAs link to plugins.html and docs.html which don't exist ❌

**Reference:** `download.html:111`, `index.html:77`

---

## 11. Social Metadata — 20/100 ❌

**Verdict:** Critical gaps — no og:image PNG, no absolute URLs, missing twitter card.

**Missing on ALL pages:**
- `og:image` — **absent** (only `favicon.svg` in img/, no `og.png`) ❌
- Per new_site.md §19.5: `og:image` must be a **PNG**, not SVG. The site has only `img/favicon.svg` ❌
- `og:title` — **absent** ❌
- `og:description` — **absent** ❌
- `og:url` — **absent** ❌
- `og:type` — **absent** ❌
- `og:site_name` — **absent** ❌
- `twitter:card` — **absent** ❌
- `twitter:title` — **absent** ❌
- `twitter:description` — **absent** ❌
- `twitter:image` — **absent** ❌
- `twitter:creator` — **absent** ❌
- `<meta name="theme-color">` — **absent** ❌

**Reference:** All HTML files — no `<head>` contains any og:* or twitter:* meta tags

---

## 12. Localization — 80/100 ✅

**Verdict:** Properly set up for future localization.

**Works:**
- `<html lang="en">` set correctly ✅
- All content in English
- No hard-coded locale-unsafe formatting
- Logical properties used in CSS where applicable ✅

**Notes:**
- No RTL issues (English only)
- `content.json` is the single source for translatable strings — the site follows this

---

## 13. Experience Fidelity — 70/100 ⚠️

**Verdict:** Strong brand visuals but missing pages break the experience.

**What works:**
- Electric storm aesthetic is consistent ✅
- Arc canvas background, plasma orbs, HUD readout ✅
- Brand voice (electric, powerful, direct) is consistent ✅
- Color usage follows kit rules ✅
- Signature elements (arc dividers, plasma glow, tesla coil aesthetic) ✅

**What breaks experience:**
- Only 6 of 8 required pages exist (missing `plugins.html`, `docs.html`) ❌
- No `404.html` — visitors hitting a missing page get a generic browser 404 ❌
- No sitemap.xml — SEO and discoverability suffer ❌
- Nav links to plugins/docs which are dead — poor UX ❌

**Reference:** `index.html:51` — "Plugins" nav link goes to plugins.html which doesn't exist

---

## Required Fixes (Priority Order)

### P0 — Must Fix (blocking release)

1. **[SEO]** Create `sitemap.xml` with all 8 canonical pages
2. **[SEO]** Create `robots.txt` referencing sitemap
3. **[SEO]** Add `<link rel="canonical">` to every page
4. **[SEO]** Add `<meta name="keywords">` from `content.json.meta.keywords`
5. **[SEO]** Add JSON-LD `SoftwareApplication` block to index.html
6. **[Social]** Generate `img/og.png` (1200×630 PNG) and add all og:* and twitter:* meta tags to every page
7. **[Content]** Fix download.html install command to match `content.json.install.primary.command`
8. **[Content]** Replace download page clients to match `content.json.clients` (Roku, Tizen, Windows, Mobile, DLNA)
9. **[Content]** Replace index.html pitch bullets with the 7 items from `content.json.pitch_bullets` (re-voiced per kit voice)
10. **[Content]** Remove fabricated stats (47,000 GitHub stars, 1,247 files) — link to live counts instead or remove entirely
11. **[Content]** Remove fabricated review testimonials
12. **[Content]** Fix clients.html to show actual clients (Roku, Samsung Tizen, Windows, Mobile, DLNA)
13. **[Pages]** Create `plugins.html`
14. **[Pages]** Create `docs.html`
15. **[Pages]** Create `404.html`
16. **[Fonts]** Copy self-hosted fonts to `css/fonts/` directory — currently references non-existent fonts
17. **[Fonts]** Remove Google Fonts TTF CDN fallback from theme.css:106-113
18. **[Nav]** Fix footer and nav links to point to real pages (remove plugins/docs links or create the pages)

### P1 — Should Fix (before master)

19. **[Responsive]** Change all `1fr` grid tracks to `minmax(0, 1fr)` per new_site.md §19.12
20. **[Content]** about.html FAQ is custom questions, not from `content.json.faq[]` — should use the 6 canonical FAQ items
21. **[Accessibility]** Add `aria-current="page"` to active nav links
22. **[Accessibility]** Review canvas animation behavior under `prefers-reduced-motion` — ensure static render doesn't cause issues

### P2 — Nice to Fix

23. **[Performance]** Consider lazy-loading the arc canvas background
24. **[SEO]** Add `preconnect` hints for self-hosted fonts
25. **[Brand]** Consider adding the "Arc" mascot as specified in brand kit section 10

---

## Summary

The Thunder Strike site has **exceptional visual design** — the electric storm aesthetic is well-executed with compelling animations, proper color usage, and consistent brand voice. The CSS architecture is solid and the JavaScript is well-structured.

However, the site **fails content accuracy** (wrong install command, wrong clients, fabricated stats/reviews) and **fails technical completeness** (missing pages, missing sitemap, missing social metadata, missing self-hosted fonts). These are not cosmetic issues — they are spec violations that would misdirect users and damage credibility.

**All P0 items must be fixed before this site can be approved for master.**

---

*Review generated by hostile auditor. All claims traceable to site source and ground-truth files.*
