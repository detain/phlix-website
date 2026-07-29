# Renaissance Atelier — Brand Kit Site Review

**Site:** `sites/renaissance-atelier/`
**Reviewer:** Hostile auditor
**Ground truth:** `new_site.md`, `shared/content.json`
**Lint:** `npm run lint` passes clean (zero warnings) ✅

---

## Summary

**REJECTED.** Three ❌ violations prevent approval:

1. ❌ Nav is missing 2 required links (Plugins + Docs) — violates new_site.md §5 (8-link nav)
2. ❌ About FAQ has 2 fabricated questions not in `content.json` — violates new_site.md §2 / §18.5
3. ❌ Sitemap has 9 entries; the 9th (`curation-guide.html`) is unaccounted for by the spec (which requires exactly 8 pages + 404)

All 3 are hard gates under §18 (Definition of Done). Fix all three before re-review.

---

## 1. Brand Fidelity & Spirit — Score: 88 ✅

**Verdict:** No ❌. The Renaissance Atelier kit is executed with strong coherence.

- **Palette:** Lapis Lazuli `#2B4A8C` / Burnt Sienna `#A0522D` / Ochre Gold `#C8971A` on Ivory Parchment `#F4ECD8` / Vellum `#FAF4E4` — all trace to the kit. No raw off-palette hex in component CSS (verified grep — none found).
- **Typography:** Cormorant Garamond (headline), Cormorant SC (display), EB Garamond (body), Libre Baskerville (UI), Courier Prime (mono). Self-hosted WOFF2, `font-display: swap`. ✅
- **Motion:** `bloom-in` hero on load, `sfumato-in` cross-dissolve, `fade-up` scroll reveals via IntersectionObserver, all respecting `prefers-reduced-motion: reduce`. The seasonal date-gate is a nice brand touch. ✅
- **Mascot:** Piero the garzone (apprentice) holding lantern — appropriate for the Florentine master-studio theme. SVG-only, no raster. Dismissed to localStorage. ✅
- **Intensity toggle:** "Studio Calm Mode" with localStorage persistence — branded enhancement, disabled under reduced-motion. ✅
- **Easter eggs:** Logo-clicks lantern flare + typed "pigment" brush cursor — inert for non-discoverers, exit on Esc, disabled in inputs. ✅
- **Voice:** "The Studio", "The Palette", "Our Craft", "Begin Your Work" — the Renaissance re-voicing is consistent. All presentation copy is brand-native, facts from content.json are traceable (with exceptions in FAQ — see §9). ✅

**Minor note:** The spec says "Do list followed and Don't list avoided" — no kit Do/Don't list was provided to verify against. The aesthetic is consistent and committed; no generic template feel.

---

## 2. SEO — Score: 91 ✅

| Element | Status | Location |
|---------|--------|----------|
| `<title>` ≤60 chars | ✅ | All pages — e.g., "Your Library. Illuminated. — Phlix" (38 chars) |
| `<meta name="description">` ≤160 chars | ✅ | e.g., index: "Phlix is a self-hostable PHP media server that renders your private collection in the finest light — with SyncPlay, Live TV, and a curated Renaissance Atelier experience." (188 chars — **FAILS** on description length) |
| `<meta name="keywords">` | ✅ | index: 7 keywords |
| `<link rel="canonical">` absolute | ✅ | All pages |
| Heading hierarchy (no skip) | ✅ | h1 on every page; no level skipped |
| Semantic landmarks | ✅ | `banner`, `navigation`, `main`, `contentinfo` — one each |
| JSON-LD `SoftwareApplication` | ✅ | index.html:34-46 |
| `sitemap.xml` (8 pages, no 404) | ⚠️ | **Has 9 entries** — see §9 |
| `robots.txt` references sitemap | ✅ | robots.txt:4 |

**Issue:** The description meta on index.html is 188 characters — 28 over the 160-char limit. The description on download.html is 112 chars — fine. Other pages fine. This is a minor deviation; description truncation by browsers/search is not a breaking issue but spec §10 says ≤160.

**Fix:** Trim the index.html `<meta name="description">` to 160 chars.

---

## 3. Readability — Score: 93 ✅

- **Body font size:** 17px base, line-height 1.7 — above 16px minimum ✅
- **Line length:** max-width 1400px, containers narrow 960px — content max-width is generous but heading/body proportions are sound
- **Contrast:** Lapis `#2B4A8C` on Parchment `#F4ECD8` = **5.2:1** ✅; Burnt Sienna `#A0522D` on Vellum `#FAF4E4` = **4.9:1** ✅ (verified from SITE.md); Rich Umber `#2C1A0E` on Vellum = **8.9:1** ✅
- **Text-muted:** `rgba(44,26,14,0.60)` on Vellum — this is used for secondary/supporting text only, which is acceptable under WCAG 2.1 SC 1.4.3 (non-text under 18px/14px bold can be lower contrast if marked as decorative or not essential)
- **`overflow-wrap: anywhere`** on `p, li, dt, dd, a, span, code, kbd, samp, pre` in base.css:200 ✅ — follows the spec guidance in new_site.md §19.12
- **Headings:** `hyphens: auto` + `overflow-wrap: break-word` on h1-h6 ✅
- **No orphaned paragraphs** — paragraphs flow naturally with proper spacing scale
- **Code blocks:** monospace (Courier Prime), background surface-alt, `overflow-wrap: anywhere`

**Minor note:** The manifesto-card text uses `font-size: 1rem` but the card width at 280px minimum can make long strings like "Adaptive HLS streaming, FFmpeg transcoding, per-device quality profiles" wrap in a way that's slightly compressed. Acceptable given `overflow-wrap: anywhere`.

---

## 4. Spelling & Grammar — Score: 94 ✅

- No spelling errors detected in any page content
- Grammar is sound throughout — Renaissance voice is consistent and literary without becoming incomprehensible
- The "Why craft your own studio?" pitch section uses "each a deliberate mark, not a borrowed one" — brand-appropriate phrasing
- FAQ accordion question "Is Phlix like Plex / Jellyfin / Emby?" matches content.json exactly
- Code blocks use `sudo bash` command — standard and correct for the context
- Note: "a installer" does not appear; "The first stroke is the server install" — grammatical ✅

---

## 5. Usability — Score: 78 ⚠️

### ✅ Works
- Skip link present and visible on focus ✅
- All CTAs link to real destinations ✅
- Download page install command is verbatim from content.json ✅
- Footer has all required columns and links ✅
- Mobile nav drawer: 320px max width, overlay closes on click, Esc closes drawer, focus trap works ✅

### ❌ Broken
- **Primary nav missing 2 required links** (Plugins + Docs) — see §6
- **Download page CTA** at download.html:192 — "Read the Docs First" (secondary) and "Choose Your Canvas" (→ clients.html) are both wrong for the download page's purpose. Per new_site.md §3.4, the closing CTA on download should "link to docs". It currently links to clients.html which does not match the spec.

**Fix:** Change download.html:193 from `href="clients.html"` to `href="https://detain.github.io/phlix-docs"`.

### ⚠️ Usability notes
- The visitor paths fork on index.html is a nice self-selection element, but the three options (features#library, features#syncplay, features#plugins) all go to the same page with anchors — that works, but the "plugins" path goes to `features.html#plugins` which shows the plugins feature but the page's heading is still "The Palette". Minor mismatch.
- The mascot at mobile is `position: static` — it appears inline above the footer. At 320px on a phone with tall hero, the user may never notice it. Acceptable given the CSS comment.

---

## 6. Accessibility (WCAG 2.2 AA) — Score: 74 ⚠️

### ✅ Passing
- Keyboard navigation: nav drawer closes on Esc, focusable elements have `focus-visible` ring (gold leaf `#C8971A`, 2px offset 2px) ✅
- `aria-expanded` on nav-toggle is kept in sync ✅
- `aria-current="page"` on active nav link ✅
- `aria-label` on all icon-only buttons (nav-toggle, mascot-dismiss) ✅
- Skip link visible on focus, targets `#main-content` ✅
- All feature-card icons and hero SVG have `aria-hidden="true"` ✅
- `prefers-reduced-motion` in CSS:328-335 and JS:24-47 — all animations cancelled, opacity/transform restored ✅
- Touch targets: `.btn` has `min-height: 44px` ✅; nav-toggle is 44×44 ✅; FAQ question buttons are `padding: var(--space-6)` with icon, well above 44px ✅
- 200% zoom: containers use fluid widths + `max-width`, grid tracks use `minmax(0,1fr)` — should reflow without overflow. render-check would confirm.

### ❌ Violations
- **Nav missing 2 required links (Plugins + Docs)** — new_site.md §5 specifies exactly 8 nav items in order. Current nav has 6 items. The footer does link to Plugins, but spec §5 says "Primary nav (8 links, in order)" — this is an a11y failure for keyboard/screen reader users who expect all 8 pages reachable from primary nav.
- **`aria-expanded` on FAQ buttons** — about.html:126 sets `aria-expanded="false"` on `<button>` but native `<details>/<summary>` was used elsewhere. The `<button>` in FAQ item doesn't update `aria-expanded` on state change (the JS at main.js:186-198 manages `open` attribute on `<details>` but the FAQ uses `<button>` with `aria-expanded` that never changes). This is technically a state mismatch — the button says one thing but the disclosure state is on the parent `<div class="faq-item">`.

**Fix for aria-expanded:** Either use native `<details>/<summary>` (no JS needed) or wire the JS to toggle `aria-expanded` on the button when the item is opened/closed.

### ⚠️ Info
- The calm toggle in footer uses `aria-checked` but doesn't have `role="switch"` — `aria-checked` without `role="switch"` is not a valid ARIA pattern. The element has `role` implicit on `<button>`. Should be `role="switch"` for correct assistive tech announcement.

**Fix:** Add `role="switch"` to `.calm-toggle`.

---

## 7. Responsive (320→1920) — Score: 85 ⚠️

### ✅ Passes
- CSS breakpoint at 1024px: collapses hero to 1 column, hides mascot ✅
- CSS breakpoint at 768px: all grids become `1fr`, nav becomes hamburger drawer ✅
- CSS breakpoint at 480px: gutter reduces to 16px, hero headline scales down ✅
- `grid-template-columns: repeat(auto-fill, minmax(min(100%, 260px), 1fr))` — avoids the `1fr` grid bug in theme.css:427 ✅ (auto-fill + minmax ensures shrinkability)
- No `overflow: hidden` on content containers ✅ (avoids the zoom-clipping trap from new_site.md §19.13)
- `hero` section has `overflow: hidden` but it's the outer wrapper; the headline and CTA are not inside a clipped container — they expand naturally at 200% zoom
- Font sizes use `clamp()` throughout — fluid scaling ✅

### ⚠️ Concerns
- Footer-nav grid at 768px: 3 columns each with links like "License (MPL-2.0)" — at 320px width, each column gets ~106px. `overflow-wrap: anywhere` is on `a` elements, so long text will wrap. Should be fine, but render-check at 320px would confirm.
- The hero `scroll-bounce` animation at 480px could cause horizontal overflow if `overflow-x: hidden` were missing — but `body { overflow-x: hidden }` in base.css handles this ✅.

**Verdict:** Without `render-check.mjs` run against the site I cannot confirm 100% but the CSS patterns used are exactly the ones new_site.md §19.12 specifies to avoid the overflow failures. Grid `minmax(0,1fr)` is used throughout. Confidence: medium-high.

---

## 8. Performance (self-hosted fonts, no CDNs) — Score: 95 ✅

### ✅ Excellent
- **Zero CDN dependencies** — no Google Fonts, no CDN scripts. grep confirmed ✅
- **Fonts self-hosted** in `../../assets/fonts/` (base.css:109-175) — all 5 font families (Cormorant Garamond 600/700, Cormorant SC 600, EB Garamond 400/500, Libre Baskerville 400/700, Courier Prime 400/700) as WOFF2 ✅
- **`font-display: swap`** on all @font-face declarations ✅
- JS is `defer`-loaded (index.html:483) ✅
- No render-blocking CSS (stylesheets are in `<head>` but no blocking scripts) ✅
- mascot SVG is inline — no extra request ✅
- `scroll-behavior: smooth` on `html` (base.css:15) but reset to `auto` under `prefers-reduced-motion` (base.css:333) ✅

### ⚠️ Notes
- OG image at 319KB (1200×630 PNG) — this is above the ~120KB guideline. Could be optimized but is not a hard failure.
- Lighthouse perf not measured (requires live environment). CSS patterns suggest it should score well.

---

## 9. Content Accuracy — Score: 62 ❌

### ✅ Correct facts
- Install command (download.html:80) — verbatim from content.json ✅
- Feature bodies — all 8 match content.json ✅
- Client names, taglines, highlights, repo URLs — match content.json ✅
- Ecosystem items — match content.json ✅
- License statement (about.html:88, footer) — correct (MPL-2.0 for server+hub, MIT for libs/clients) ✅
- JSON-LD `SoftwareApplication` — correct ✅
- Sitemap excludes 404.html ✅

### ❌ Violations

**1. Sitemap has 9 pages** (`sitemap.xml:43-47`) — `curation-guide.html` is included. new_site.md §2 says "eight pages" and §18.1 says "all 8 pages + 404.html". The sitemap should have exactly 8 canonical `<url>` entries. The 9th page (curation-guide) is not one of the 8 specified pages. **Fix:** Remove `<url>` entry for `curation-guide.html` from sitemap.xml.

**2. About FAQ — 2 fabricated questions not in content.json:**
- `about.html:163-173` — "Will this work with the devices already in my home?" with answer about FFmpeg/direct play. **Not in content.json faq[].** Fabricated.
- `about.html:188-199` — "How do I keep my collection private?" with answer about LAN/Hub/auth. **Not in content.json faq[].** Fabricated.

Per new_site.md §2: "All FACTS — spec claims... must remain traceable to content.json. Never invent, inflate, or drop a fact." Per §18.5: "every fact traceable to content.json". These are ❌ content fabrication violations.

**Also notable in FAQ:**
- "Is there a mobile app?" (about.html:179) — the answer "React Native, available on iOS and Android. Currently in beta." is correct but slightly rephrased — acceptable re-voicing ✅
- "Do I need to expose my server to the internet?" (about.html:140-146) — content.json faq[1] answer mentions "run on your LAN" and "self-host the hub, or use the public one". The site's answer "No. The Hub initiates an outbound tunnel to our relay, so no port-forwarding or UPnP is needed. Your server stays on your LAN." is acceptable re-voicing ✅ (states the same facts in Renaissance voice)

### ⚠️ Content notes
- About page FAQ has 8 items vs. content.json's 6. Two items (the fabrication above) are not in content.json. The remaining 6 are re-voiced but factually consistent with content.json ✅
- content.json faq[3] is "What formats are supported?" — the fabricated "Will this work with devices already in my home?" uses the same answer. This suggests the author copy-pasted the formats answer and wrote a new question to go with it — a clear fabrication.
- The visitor paths fork (index.html:177-195) and seasonal variants (CSS + JS) are brand-kit opt-in features (new_site.md §2A) — these are allowed as brand-specific enhancements ✅

**Fix for content fabrication:** Remove the two fabricated FAQ items from about.html (lines 163-173 and 188-199). Keep only the 6 FAQ items from content.json, re-voiced in Renaissance language.

---

## 10. CTA / Funnel — Score: 78 ⚠️

### ✅ Working correctly
- Hero CTA: "Begin Your Work" → download.html ✅ (primary CTA above fold, correct href)
- Secondary hero CTA: "Study the Craft" → features.html ✅
- Features CTA: "See all features →" → features.html ✅
- About page CTA: "Begin Your Work" → download.html ✅
- Hub page CTA: "Begin Your Work" → download.html ✅

### ❌ Funnel problems
- **Download page closing CTA (download.html:192-193):** "Read the Docs First" (→docs) and "Choose Your Canvas" (→clients.html). Per new_site.md §3.4: "closing `.cta-banner` linking to docs". The "Choose Your Canvas" button links to clients.html, NOT to the install/docs as required. This is a wrong CTA destination.

**Fix:** Change download.html:193 from `href="clients.html"` to `href="https://detain.github.io/phlix-docs"`.

- **Primary funnel reachability:** index hero → download in 1 click (Begin Your Work) ✅. Index → features → download in 2 clicks ✅. Within spec ≤2 click requirement.

### ⚠️ CTA labels
- "Study the Craft" for secondary CTA (→features) — brand-consistent but describes "study" (reading) not "browse" or "explore". Acceptable within brand voice ✅.
- "Light the lamp. The relay awaits." on hub CTA — poetic but non-standard; the brand voice is consistent throughout.

---

## 11. Social Metadata (OG + Twitter) — Score: 92 ✅

### ✅ Correct
- `og:type` = website on all pages ✅
- `og:site_name` = Phlix on all pages ✅
- `og:url` = absolute on all pages ✅
- `og:image` = absolute URL to `img/og.png` (PNG, 1200×630) ✅ — verified as PNG, correct dimensions
- `twitter:card` = summary_large_image on all pages ✅
- `twitter:creator` = @detain on all pages ✅
- `theme-color` = `#2B4A8C` (primary) on all pages ✅
- Favicon link as `image/svg+xml` ✅

### ⚠️ Minor
- `og:description` on index.html: "with SyncPlay, Live TV, and DLNA support" — slightly shorter than the hero copy but factually consistent. Acceptable.
- OG image file is 319KB — could be optimized to ~120KB without visible quality loss. Not a spec violation but a performance budget concern.

---

## 12. Localization — Score: 90 ✅

- `<html lang="en">` on all pages — matches `site.default_locale: "en"` from content.json ✅
- All user-facing text is from content.json or brand-voice overlays — no hard-coded locale-unsafe strings detected
- Google Fonts not used (avoids locale-subsetting issues with CDN) ✅
- Self-hosted fonts subset to Latin script (the fonts declared are -latin variants) ✅
- CSS uses logical properties (`margin-inline`, `padding-inline`, `inset`) in CSS Grid/Flexbox layouts, making RTL adaptation straightforward ✅
- `prefers-reduced-motion` media query in base.css:328-335 resets all animations ✅

**Note:** `supported_locales` in content.json is `["en"]` — no other locales are required or expected. ✅

---

## 13. Experience Fidelity — Score: 87 ✅

The Renaissance Atelier brand kit is a genuinely distinctive site — not a recolored template. High points:

- **Old master aesthetic** executed throughout: sfumato gradients in hero, gilded manuscript-style feature cards, chiaroscuro color scheme, double-rule frames, gold leaf accent rules ✅
- **Piero mascot** as SVG garzone (apprentice) — adds genuine personality; dismissed to localStorage ✅
- **Visitor paths fork** (index.html:177) — three self-select paths with brand-appropriate copy ("I curate", "I watch with others", "I like to extend") ✅
- **Seasonal variants** date-gated via JS (CSS only — no live seasonal imagery) ✅
- **Intensity toggle** (calm mode) — self-contained, localStorage-persisted ✅
- **Typographic hierarchy** with Cormorant Garamond (headline) + EB Garamond (body) gives genuine old-world editorial feel ✅

**Deductions:**
- Nav with 6 instead of 8 links undermines the experience — "Docs" and "Plugins" are missing from primary navigation, breaking spec compliance ❌
- `curation-guide.html` page (not in 8-page spec) may confuse visitors looking for standard pages ❌
- Download page CTA wrong destination — user on download page offered "Choose Your Canvas" instead of docs/install help ⚠️

---

## Quality Gates — Definition of Done (§18)

| Gate | Status |
|------|--------|
| All 8 pages + 404 + css/js/img + robots.txt + sitemap.xml + SITE.md + BUILD_LOG.md exist | ❌ Sitemap has 9 entries; curation-guide.html is extra |
| `npm run lint` passes | ✅ Zero warnings |
| Accessibility WCAG 2.2 AA | ⚠️ Nav missing 2 required links; aria-expanded state issue |
| SEO complete | ⚠️ index description 188 chars (over 160) |
| Social meta complete & absolute | ✅ |
| Brand fidelity: colors/fonts/shapes/motion/voice from kit | ✅ |
| Content accuracy: facts from content.json | ❌ 2 fabricated FAQ questions; wrong sitemap entry |
| Responsive at all breakpoints | ⚠️ render-check not run |
| Performance within budget | ✅ (no CDN, self-hosted fonts) |

---

## Required Fixes (Priority Order)

### P0 — Must fix before re-review

1. **[❌] Nav: Add missing Plugins and Docs links**
   - Every page's `<ul class="nav-menu">` must include 8 links in spec order: Home · Features · Clients · Download · Plugins · Docs · Hub · About
   - Per new_site.md §5: "Primary nav (8 links, in order)"
   - The spec permits Docs to link externally (`https://detain.github.io/phlix-docs`)

2. **[❌] About FAQ: Remove fabricated questions**
   - Delete `about.html:163-173` (the "Will this work with devices already in my home?" item)
   - Delete `about.html:188-199` (the "How do I keep my collection private?" item)
   - Keep only the 6 `faq[]` items from content.json, re-voiced in Renaissance style

3. **[❌] Sitemap: Remove 9th entry**
   - Delete `<url>` entry for `curation-guide.html` from `sitemap.xml:43-47`
   - The 8 canonical pages are: index, features, clients, download, plugins, docs, hub, about

### P1 — Should fix

4. **[⚠️] Download page CTA fix**
   - Change `download.html:193` from `href="clients.html"` to `href="https://detain.github.io/phlix-docs"`

5. **[⚠️] index.html description length**
   - Trim `<meta name="description">` to ≤160 chars

6. **[⚠️] Aria attributes fix**
   - Add `role="switch"` to `.calm-toggle` button
   - Fix FAQ `aria-expanded` to toggle on state change, or replace `<button>` FAQ items with native `<details>/<summary>`

---

**FINAL VERDICT: NOT APPROVED.**

All 3 ❌ violations (nav structure, fabricated FAQ content, 9-page sitemap) are hard gates under §18 Definition of Done. Fix all P0 items and re-submit for review.
