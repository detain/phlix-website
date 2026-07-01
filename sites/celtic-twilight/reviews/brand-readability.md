# Celtic Twilight — Brand + Readability Review

**Review date:** 2026-06-30
**Reviewer:** Adversarial Brand & Readability Auditor
**Site path:** `/home/sites/phlix/phlix-website/sites/celtic-twilight/`
**Pages reviewed:** index.html, features.html, clients.html, download.html, plugins.html, docs.html, hub.html, about.html
**CSS reviewed:** css/base.css, css/theme.css, css/components.css
**JS reviewed:** js/main.js
**Assets reviewed:** img/PROMPTS.md

---

## Score Summary

| Dimension | Score | Max |
|---|---|---|
| Brand Fidelity | 6 | 10 |
| Readability | 8 | 10 |
| Content Accuracy | 7 | 10 |
| Spelling & Grammar | 10 | 10 |
| **TOTAL** | **31** | **40** |

---

## Per-Dimension Breakdown

### Brand Fidelity: 6/10

**What passed (major items):**
- All CSS color tokens match brand kit hex values exactly (#2D6A4F, #6B3FA0, #B8860B, #F4EDD8, #FAF7EE, #E8E0F0, #2C2010, #1A1208)
- Shadows carry the correct twilight-purple tint: `rgb(30, 15, 48, *)` throughout
- Typography: Cinzel Decorative for display, Cinzel for headlines, EB Garamond for body, Nunito for UI — all correct font stacks
- Tracking, line-height, font sizes match brand spec
- Spacing scale is a correct 4px-based system
- Max-width: 1320px (matches brand)
- Corner radii: 4/10/18/28/999px (matches brand)
- Border thickness: 1.5px (matches brand)
- Motion easing uses `cubic-bezier(0.4, 0, 0.2, 1)` (brand-approved ease-in-out equivalent)
- Gold NOT used for body text in prose sections
- CTA-banner inline text uses `color: var(--color-vellum-75)` — correctly using vellum with alpha on dark background (NOT gold)

**What failed:**

---

### 🔴 Critical Issues (Brand Fidelity)

#### 1. Missing Hub feature card on index.html
- **File:** `index.html`, lines 141–216 (features-overview section)
- **What it is:** The hub feature card is entirely absent from the features-overview grid on the homepage. The grid shows only 7 cards: Library, SyncPlay, Transcode, Auth, Live TV, DLNA, Plugins. The `content.json` features array defines 8 items including hub (id: "hub").
- **Why it violates brand:** The brand kit mandates that every feature defined in content.json be represented on the home page. The hub is a core Phlix feature ("reach any of your servers from anywhere"). Its absence undermines the completeness and accuracy of the brand presentation.
- **Suggested fix:** Add an 8th `<article class="feature-card">` for Hub, mirroring the pattern of the other 7 cards, with the icon from `content.json` (icon: "hub") and the hub title/body copy from features.html line 126–133.

---

#### 2. Hub diagram uses gold on non-permitted elements
- **File:** `hub.html`, lines 82–103 (SVG hub-diagram)
- **What it is:** The Hub connection diagram uses `#B8860B` (gold) for:
  - Box border strokes on all three diagram boxes (Hub, Server, Client): `stroke="#B8860B"` — line 87, 91, 94
  - Arrow markers: `marker-end="url(#arrow)"` with `fill="#B8860B"` — line 84
  - Connecting arrow lines: `stroke="#B8860B"` — lines 97, 98
  - Label text fill: `fill="rgba(184,134,11,0.8)"` — lines 100, 101
- **Why it violates brand:** The brand kit (color_rules) explicitly states: "Gold is reserved for the highest-importance emphasis; never overuse it" and "Ancient gold for premium states." The brand kit's logo_rules reinforce that gold is for the wordmark. The brand kit's do/dont section explicitly says gold should NOT be used for body text. Box borders, arrows, and diagram labels are not logo, OG, focus ring, or CTA elements. This is a gratuitous use of gold on a decorative diagram element that does not serve a permitted brand purpose.
- **Suggested fix:** Replace all gold in the diagram with either emerald (`#2D6A4F`) for the Server/Client boxes, amethyst (`#6B3FA0`) for the Hub box, and peat (`#2C2010`) for arrows and labels.

---

### 🟠 Major Issues (Brand Fidelity)

#### 3. `--color-peat` used for body/description text instead of `--color-text`
- **Files/lines:**
  - `css/theme.css` line 227: `.feature-card__body { color: var(--color-peat); }`
  - `css/theme.css` line 350: `.client-card__tagline { color: var(--color-peat); }`
  - `css/theme.css` line 399: `.download-card__what { color: var(--color-peat); }`
  - `css/theme.css` line 456: `.faq-item dd { color: var(--color-peat); }`
  - `css/theme.css` line 488: `.ecosystem-item__what { color: var(--color-peat); }`
- **What it is:** Body/description text uses `--color-peat` (`#2C2010` — brand kit "Peat Ink") which the brand kit explicitly defines for "card borders, dividers, linework — a warm near-black with peat undertone." It is NOT designated for body text. The brand kit designates `--color-text` (`#1A1208` — brand kit "Ink Black") for "Primary body and headline text; a very dark warm brown, never cool black."
- **Why it violates brand:** Semantic misuse of color tokens. The brand kit designers explicitly separated ink (body text) from peat (borders). Using peat for body text collapses that distinction and violates the "Parse, Don't Validate" principle of the brand — the color assignment signals a meaning (border) that contradicts its use (body text).
- **Suggested fix:** Change all five instances above from `var(--color-peat)` to `var(--color-text)`.

---

#### 4. `--color-success` used for stable badge background on light surface
- **File:** `css/components.css`, lines 399–403 (`.status-stable`)
- **What it is:** `.status-stable` uses `background: var(--color-success)` (`#A8DABC` — "Shamrock Mist") on client cards that use `--color-surface` (`#FAF7EE` — pale mist/light surface). The badge text is `var(--color-ink)` (`#1A1208`).
- **Why it violates brand/accessibility:** The brand kit defines `--color-success: #A8DABC` with usage "Success toasts, confirmations, completed-scan states" and contrast_targets: ["ink_black"]. This implies success is designed for dark surfaces. On the light `--color-surface`, the contrast of #A8DABC on #FAF7EE is approximately 1.5:1 — failing WCAG AA (4.5:1 for normal text, 3:1 for large text) entirely. Even using the ink text, this is a severe contrast failure.
- **Suggested fix:** Replace `.status-stable` background with `--color-primary` (`#2D6A4F` — emerald) which has ~7.4:1 contrast on mist, and use mist text. The brand kit's badges section specifies "emerald grove for status (New/Continue Watching)" which is the correct treatment.

---

#### 5. Hub diagram box uses `#4A2578` — a color not in the brand palette
- **File:** `hub.html`, line 87
- **What it is:** `fill="#4A2578"` appears on the Hub box in the connection diagram.
- **Why it violates brand:** `#4A2578` does not appear anywhere in the brand kit's color system (primary: #2D6A4F, secondary: #6B3FA0, no such intermediate purple is defined). While #4A2578 falls between emerald and deep indigo in the dusk gradient (`#2D6A4F` → `#4A2578` → `#1A0D2E`), it is not a named or approved color token. Using ad-hoc hex values undermines the systematic color approach of the brand kit.
- **Suggested fix:** Replace `#4A2578` with `--color-secondary` (`#6B3FA0` — amethyst) for the Hub box to maintain brand consistency.

---

### 🟡 Minor Issues (Brand Fidelity)

#### 6. Nav current-page link uses gold
- **File:** `css/components.css`, lines 109–111
- **What it is:** `.nav-menu a[aria-current="page"]` sets `color: var(--color-gold)`.
- **Why it may violate brand:** The brand kit restricts gold to logo/OG/focus ring/CTA. The nav current-page indicator is not any of those four categories. Using gold for an active nav state is a secondary navigation embellishment, not a permitted gold use case.
- **Suggested fix:** Use `--color-vellum` for the current-page indicator, which maintains the light-on-dark contrast needed for readability while respecting the gold restriction.

---

### 🟢 Positive Brand Observations

- Color token CSS variables in base.css are an exact match to brand kit design tokens — correct hex values throughout.
- Shadows use the correct twilight-purple tint `rgb(30, 15, 48, *)` everywhere (not neutral grey).
- Typography stack is entirely correct: Cinzel Decorative for display/h1, Cinzel for h2/h3, EB Garamond for body, Nunito for UI, DM Mono for code.
- Tracking and line-height values match brand spec: display 0.08em/1.0, headline 0.06em/1.1, body 0.01em/1.7, UI 0.02em/1.35.
- Max-width is correctly set to 1320px.
- Corner radii exactly match brand spec.
- Motion easing `cubic-bezier(0.4, 0, 0.2, 1)` is the brand-approved organic ease.
- The dusk gradient `--gradient-dusk: linear-gradient(160deg, #2D6A4F 0%, #4A2578 50%, #1A0D2E 100%)` correctly uses brand colors.
- Copy throughout the site is lyrical and brand-aligned — "Ancient light. Living screen.", "The mist clears. Your story begins.", "Every tale the land remembers."
- All footer columns, ecosystem listings, and feature copy is actual content — no lorem ipsum anywhere.
- ::selection uses secondary color — minor but not a brand violation.
- prefers-reduced-motion is correctly implemented and respected.
- Responsive breakpoints at 768px and 480px are reasonable.

---

## Readability: 8/10

### ✅ What passed
- Body font size 1.0625rem with line-height 1.7 — matches brand spec exactly
- Paragraph max-width 72ch — within the 62–72ch comfortable reading range
- Responsive clamp() font sizing: h1 `clamp(2rem, 5vw, 3.75rem)`, h2 `clamp(1.5rem, 3vw, 2.5rem)`, h3 `clamp(1.125rem, 2vw, 1.5rem)`
- Emerald primary button on mist: ~7.4:1 contrast (passes WCAG AAA)
- Body text (ink/peat) on vellum: >13:1 contrast (passes WCAG AAA)
- Hero subheadline (vellum at 0.85 alpha) on dusk gradient: ~6:1 contrast (passes WCAG AA)
- CTA banner h2 in vellum on dusk gradient: ~8.5:1 contrast (passes WCAG AAA)
- Beta badge (warning gold) with ink text: ~7.5:1 contrast (passes WCAG AAA)
- Deprecated badge (rowan berry) with mist text: ~7.5:1 contrast (passes WCAG AAA)
- Primary button hover darkens to #245A40 — maintains ~6.5:1 contrast
- Ghost button text (ink on vellum): ~13:1 contrast — passes
- Nunito UI labels on vellum: >10:1 contrast

### ⚠️ Readability Concerns

#### 7. Stable status badge contrast failure
- **File:** `css/components.css`, lines 399–403
- **What it is:** Status badge uses `background: var(--color-success)` (`#A8DABC`) on `--color-surface` (`#FAF7EE`). Text is `var(--color-ink)` (`#1A1208`).
- **Contrast:** ~1.5:1 — **fails WCAG AA at every level**. This appears on every client card (clients.html) for Roku, Samsung Tizen, Windows, and DLNA entries.
- **This was flagged as brand violation #4 and readability issue simultaneously.**
- **Suggested fix:** Same as #4 — use emerald background with mist text.

#### 8. Ghost CTA button on dusk gradient has borderline contrast
- **File:** `css/components.css`, lines 251–260; used on `index.html` line 87, `features.html` line 144, `download.html` line 141, `docs.html` line 111
- **What it is:** Ghost button uses `--color-ink` (`#1A1208`) text on `--gradient-dusk` background. Ink on the deep indigo portion of the gradient (≈#1A0D2E) yields approximately 3.5:1 contrast — barely passes WCAG AA for large text but fails for normal-size body text.
- **Suggested fix:** Use `--color-vellum` instead of `--color-ink` for ghost button text in the CTA banner context, or add a semi-transparent vellum backing to the ghost button for consistent contrast across the gradient.

---

## Content Accuracy: 7/10

### ✅ What passed
- All 8 HTML files contain complete, real content — zero lorem ipsum
- Hero section (index.html) matches content.json hero object: eyebrow "Self-hosted media server", headline "Your media. Your library. Your Phlix.", subheadline verbatim
- All 7 pitch bullets match content.json pitch_bullets array exactly
- All 8 features match content.json features array (features.html has all 8 including hub)
- Clients page: all 5 clients match content.json clients array — names, taglines, highlights all correct
- Footer tagline "Open-source media, on your terms." matches content.json footer.tagline
- Footer columns match content.json footer.columns exactly
- All 6 FAQ Q&As on about.html match content.json faq array exactly
- All 5 ecosystem entries on download.html/docs.html match content.json ecosystem array
- No missing sections — all pages have substantive copy
- Taglines from brand kit secondary list are woven into the copy appropriately

### 🔴 Content Accuracy Issues

#### 9. Missing Hub feature card from index.html
- **File:** `index.html` features-overview section (lines 133–221)
- **What it is:** The homepage features-overview grid shows only 7 feature cards, omitting the hub feature which IS present in content.json features array and IS displayed on features.html.
- **Why it's a content accuracy issue:** content.json defines 8 features including hub. The homepage should show all 8. Omitting hub misrepresents the product's feature set to home page visitors.
- **Suggested fix:** Add the hub feature card to index.html features-overview grid. Use hub icon and copy from features.html (lines 126–133):
  ```html
  <article class="feature-card">
    <svg class="feature-card__icon">...</svg>
    <h3 class="feature-card__title">Phlix Hub — reach any of your servers from anywhere</h3>
    <p class="feature-card__body">Sign in once. Reverse-tunnel relay handles NAT. Self-hostable, or use the public hub.</p>
  </article>
  ```

---

## Spelling & Grammar: 10/10

All 8 HTML files were proofread. No spelling errors, no grammatical errors, no punctuation problems detected. Copy reads naturally and consistently uses the lyrical, folk-storyteller voice specified in the brand kit.

**Confirmed correct:**
- index.html: "Self-hosted media server" (not "self-hosted"), "SyncPlay" (proper product name, correctly capitalized), all bullet copy verbatim from content.json
- features.html: All feature titles and descriptions verbatim from content.json
- clients.html: "Samsung Tizen" (correct product name), "Any DLNA device" (not "DLNA devices"), "React Native" (correct casing)
- download.html: "iOS + Android" (correct), "Electron + React + TypeScript" (correct)
- docs.html: "API Reference" (correct), "Hub Admin" (correct)
- hub.html: Technical description of NAT traversal is accurate and grammatically sound
- about.html: Philosophy section is an original lyrical brand statement (not copy-pasted from content.json, which is appropriate for this page)

---

## Complete Defect List

| # | Severity | File | Line(s) | Issue |
|---|---|---|---|---|
| 1 | 🔴 Critical | index.html | 141–216 | Hub feature card missing from features-overview (7 of 8 features shown) |
| 2 | 🔴 Critical | hub.html | 82–103 | Gold (#B8860B) used on SVG diagram box borders, arrows, and labels — not a permitted gold use |
| 3 | 🟠 Major | css/theme.css | 227 | `color: var(--color-peat)` on `.feature-card__body` — peat is for borders, not body text |
| 4 | 🟠 Major | css/theme.css | 350 | `color: var(--color-peat)` on `.client-card__tagline` — same peat/text misuse |
| 5 | 🟠 Major | css/theme.css | 399 | `color: var(--color-peat)` on `.download-card__what` — same peat/text misuse |
| 6 | 🟠 Major | css/theme.css | 456 | `color: var(--color-peat)` on `.faq-item dd` — same peat/text misuse |
| 7 | 🟠 Major | css/theme.css | 488 | `color: var(--color-peat)` on `.ecosystem-item__what` — same peat/text misuse |
| 8 | 🟠 Major | css/components.css | 399–403 | `.status-stable` background `#A8DABC` on light surface — ~1.5:1 contrast, fails WCAG AA |
| 9 | 🟠 Major | hub.html | 87 | `#4A2578` used for Hub box fill — not a brand kit color token |
| 10 | 🟡 Minor | css/components.css | 109–111 | `color: var(--color-gold)` on `[aria-current="page"]` — gold not permitted for non-logo/OG/focus/CTA |
| 11 | 🟡 Minor | css/components.css, used on multiple | — | Ghost button text (`--color-ink`) on dusk gradient yields ~3.5:1 contrast on deep indigo portions |

---

## Detailed Findings by File

### index.html
- **Line 82:** Hero eyebrow uses `var(--color-vellum)` — CORRECT (not gold; vellum is appropriate for eyebrow on dark hero)
- **Line 98:** "Ancient light. Living screen." — tagline from brand kit secondary list, correctly used
- **Line 138:** "Every tale the land remembers." — tagline from brand kit secondary list, correctly used
- **Lines 141–216:** Features-overview grid shows 7 cards — hub card is missing (Defect #1)
- **Line 227:** CTA banner h2 "The mist clears. Your story begins." — brand tagline secondary list, correct
- **Line 228:** Inline p uses `color: var(--color-vellum-75)` — CORRECT (not gold)
- **Line 237:** Footer tagline matches content.json footer.tagline exactly

### features.html
- **Line 50:** "reverent, unhurried, and made to last" — brand voice correctly applied
- **Lines 59–133:** All 8 feature-detail articles match content.json features array exactly
- **Line 142:** CTA h2 "The fire is lit. What will you watch?" — brand greeting list item, correctly used

### clients.html
- **Line 48:** "The hearth has many rooms" — lyrical brand voice, appropriate eyebrow
- **Line 50:** "Every device you own, invited to the circle" — brand voice, no errors
- **Lines 59–136:** All 5 client cards match content.json clients array — status badges present for stable/beta
- **Line 145:** CTA h2 "Come in from the mist." — brand greeting list item, correctly used
- **Defect #8:** All `.status-stable` badges (lines 62, 79, 95, 128) use low-contrast success-green on light surface

### download.html
- **Line 48:** "Begin your chronicle" — brand vocabulary correctly applied
- **Line 58:** "the fire burns brightest with" — brand metaphor correctly applied
- **Lines 76–103:** All 4 client download cards match content.json ecosystem/clients — CORRECT
- **Lines 112–131:** Ecosystem list matches content.json ecosystem array exactly — CORRECT

### plugins.html
- **Line 48:** "Open the door" — brand-appropriate eyebrow
- **Line 50:** "The plugin system Phlix deserves" — brand voice, no errors
- **Lines 57–66:** Plugin model description accurate and complete
- **Line 91:** CTA h2 "All the tales the land remembers." — brand tagline secondary list

### docs.html
- **Line 48:** "Know the craft" — brand-appropriate eyebrow
- **Lines 58–77:** All 4 doc section cards (User Guide, Developer Docs, API Reference, Hub Admin) correct
- **Lines 86–101:** Ecosystem list matches content.json — CORRECT
- **Line 109:** CTA h2 "The stories are waiting." — brand greeting list item, correctly used

### hub.html
- **Line 48:** "Beyond the firewall" — brand-appropriate eyebrow
- **Lines 55–79:** Hub description is accurate and brand-voice-consistent
- **Defect #2 + #9 + #10:** SVG hub diagram has gold borders/arrows (not permitted) and non-brand `#4A2578` color

### about.html
- **Line 48:** "The story so far" — brand-appropriate eyebrow
- **Lines 59–61:** Philosophy section: original brand-aligned prose, not lorem ipsum — CORRECT
- **Lines 75–106:** FAQ matches content.json faq array exactly — CORRECT
- **Line 115:** CTA h2 "Welcome back to the hearth." — brand greeting list item, correctly used

### css/base.css
- **Lines 14–31:** All CSS color tokens match brand kit design_tokens exactly — CORRECT
- **Lines 34–41:** Semantic aliases (emerald, amethyst, gold, vellum, mist, heather, peat, ink) — note: peat maps to border color, not text — this is a naming distinction that contributes to Defects #3–#7
- **Lines 83–85:** Shadows correctly use `rgb(30, 15, 48, *)` (twilight purple) — CORRECT
- **Line 92–93:** Comment correctly notes fonts should be self-hosted WOFF2 in production

### css/theme.css
- **Line 8:** h1 uses `--font-display` (Cinzel Decorative) — CORRECT for display/hero text
- **Lines 16–30:** h2/h3 use `--font-headline` (Cinzel) — CORRECT
- **Line 40:** p uses `--font-body` (EB Garamond) — CORRECT
- **Lines 43–44:** Body text max-width 72ch — within brand spec 62–72ch — CORRECT
- **Defects #3–#7:** Multiple instances of `color: var(--color-peat)` on body/description text

### css/components.css
- **Line 13:** Header box-shadow uses twilight-purple `rgb(30,15,48,0.2)` — CORRECT
- **Line 105:** `[aria-current="page"]` uses `color: var(--color-gold)` — Defect #10
- **Line 214–217:** Primary button uses `--color-primary` (emerald) on mist — CORRECT; hover darkens to #245A40 — CORRECT
- **Lines 399–403:** `.status-stable` — Defect #8 (contrast failure)
- **Lines 460–513:** Responsive breakpoints at 768px and 480px — reasonable and correct

### js/main.js
- **Lines 43–68:** Scroll reveal animation uses `cubic-bezier(0.4, 0, 0.2, 1)` — brand-approved easing, CORRECT
- **Lines 38–41:** `prefers-reduced-motion` check — brand-compliant, CORRECT
- **Line 66:** Transition duration 0.5s — slow and organic as brand requires, CORRECT
- No issues found

### img/PROMPTS.md
- **Lines 15–32:** logo.svg, favicon.svg, og.svg prompts correctly reference brand kit prefixes/suffixes
- **Lines 36–75:** All icon prompts follow brand kit icon_style rules (1.5px stroke, rounded, organic)
- **Lines 79–81:** Hero illustration prompt correctly references dusk gradient, standing stones, knotwork framing

---

## Philosophy Compliance

| Law | Status | Notes |
|---|---|---|
| Early Exit (Guard Clauses) | N/A | No complex nested conditionals in CSS/JS |
| Parse, Don't Validate | ⚠️ PARTIAL | Color tokens are parsed correctly from brand kit but used semantically incorrectly (peat for text vs. borders) |
| Atomic Predictability | ✅ PASS | CSS custom properties are predictable; JS is pure with no side effects |
| Fail Fast, Fail Loud | N/A | CSS/JS don't have validation per se |
| Intentional Naming | ⚠️ PARTIAL | Semantic aliases exist (emerald, peat, etc.) but `color-peat` used for text confuses the naming |


| Security | ✅ PASS | No user input, no hardcoded secrets, no injection vectors |
| Performance | ✅ PASS | CSS transitions are GPU-compositable, IntersectionObserver is lazy, prefers-reduced-motion prevents unnecessary animations |

---

## Final Score Summary

| Dimension | Score | Max |
|---|---|---|
| Brand Fidelity | 6 | 10 |
| Readability | 8 | 10 |
| Content Accuracy | 7 | 10 |
| Spelling & Grammar | 10 | 10 |
| **TOTAL** | **31** | **40** |

**Overall Assessment: REQUEST_CHANGES**

The Celtic Twilight site demonstrates strong brand implementation in most areas — color tokens are correct, typography is faithful, shadows carry the correct twilight-purple tint, and the copy is lyrical and brand-appropriate throughout. However, there are 11 defects ranging from a missing feature card to incorrect color token usage to a severe WCAG contrast failure on the stable status badge. The most urgent fixes are:
1. Add the missing hub feature card to index.html
2. Remove gold from the hub diagram SVG
3. Replace `color: var(--color-peat)` with `var(--color-text)` on all body/description elements (5 locations)
4. Fix the stable status badge contrast failure (use emerald instead of success-green on light surface)
5. Replace the non-brand `#4A2578` color in the hub diagram with `--color-secondary`

Once these are addressed, the site will be substantially closer to full brand compliance.
