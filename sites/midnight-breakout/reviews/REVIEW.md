# ADVERSARIAL REVIEW — Midnight Breakout Brand Kit Site

**Site:** `sites/midnight-breakout/`
**Reviewer:** Hostile auditor
**Date:** 2026-07-28
**Ground truth:** `brand-kits/midnight-breakout.js`, `new_site.md`, `shared/content.json`, `brand_kit_schema.js`

---

## FINAL VERDICT

**REJECTED — 2 ❌ defects found. Score below threshold.**

---

## DIMENSION SCORES

| # | Dimension | Score | Severity | Citation |
|---|----------|-------|----------|----------|
| 1 | Brand Fidelity & Spirit | 88 | ⚠️ | `index.html:70`, `theme.css:194` |
| 2 | SEO | 96 | ✅ | all pages |
| 3 | Readability | 94 | ✅ | `theme.css:156` |
| 4 | Spelling & Grammar | **0** | **❌** | `about.html:63` |
| 5 | Usability | 92 | ✅ | `components.css:281–282` |
| 6 | Accessibility (WCAG 2.2 AA) | 94 | ✅ | `theme.css:160–165` |
| 7 | Responsive | 93 | ✅ | `theme.css:982–1015` |
| 8 | Performance | 88 | ⚠️ | `img/og.png:93KB` |
| 9 | Content Accuracy | 99 | ✅ | all pages verified |
| 10 | CTA / Funnel | 90 | ✅ | `index.html:73` |
| 11 | Social Metadata | 95 | ✅ | all pages |
| 12 | Localization | 100 | ✅ | all pages |
| 13 | Experience Fidelity | 90 | ✅ | site architecture verified |

**Overall: 86/100 — ❌ FAIL**

---

## ❌ CRITICAL DEFECTS (must fix before approval)

### DEFECT 1 — Spelling & Grammar — Score: 0 ❌

**File:** `about.html`, line 63
**Severity:** CRITICAL — content corruption / mojibake

```html
…noTerms of Service that can change overnight, no pricing pivot that turns your watchlist into a临时的恩惠。
```

Chinese characters `临时的恩惠` (meaning "temporary favor/grace" in Chinese) are embedded mid-sentence in English marketing copy. This is a copy-paste artifact or encoding error. It renders as broken text to any non-Chinese-reading visitor and makes the about page unreadable at that sentence.

**Rule violated:** new_site.md §16 — "Do not invent… product copy" (this isn't content.json verbatim, and it's not a brand re-voice, it's noise); WCAG 3.1 (unusual characters in text); basic professional standards.

**Fix:** Replace `a临时的恩惠` with proper English. The sentence appears to intend something like "a临时恩惠" or "a perishable favor" — rephrase the entire clause to remove the Chinese character: `"…no pricing pivot that turns your watchlist into a perishable privilege."`

---

### DEFECT 2 — Font Weight Gap (Performance Budget) — Score: 88 ⚠️

**File:** `css/base.css`
**Severity:** WARNING

The kit declares font weights:

| Font | Kit weights | Declared `@font-face` |
|------|------------|-----------------------|
| Oswald | 700 | 700 ✅ |
| Source Sans 3 | 400, 600 | 400, 600 ✅ |
| JetBrains Mono | 400, 700 | 400, 700 ✅ |

All required weights are present. **No defect here.** Apologies — the self-review was correct on this point.

---

### DEFECT 3 — Hero Title Uses `transform: uppercase` — Score: 88 ⚠️

**Files:** `theme.css:194` (`text-transform: uppercase` on `.hero-title`), `index.html:70` (h1 content)

**Issue:** The hero `<h1>` reads `Break Free. Own Your Media.` in the DOM, but CSS `text-transform: uppercase` renders it visually as `BREAK FREE. OWN YOUR MEDIA.`

The kit's `typography_rules` state: *"Use ALL CAPS for eyebrow labels and section eyebrows only."* The hero `<h1>` is not an eyebrow label or section eyebrow — it is the primary page headline.

The kit's `brand_dna` says: *"Never soft, never warm, never pastoral."* The ALL CAPS treatment adds visual aggression that is directionally on-brand, but violates the explicit typographic constraint that limits ALL CAPS to eyebrows only. The ALL CAPS is also semantically dishonest — the content isn't written in ALL CAPS; the CSS makes it so, which could mislead screen readers and search engines.

**Rule violated:** `brand_kit.typography_rules[2]` — "Use ALL CAPS for eyebrow labels and section eyebrows only." `[theme.css:194]`

**Fix:** Remove `text-transform: uppercase` from `.hero-title`. The Oswald font at the large display size (clamp 3rem–6.5rem) is bold and commanding enough without the transform. If ALL CAPS is required by the art direction, change the source content to ALL CAPS in the HTML, not via CSS.

---

## ⚠️ WARNINGS (non-blocking but noted)

### WARN-1 — `og.png` at 93KB (`img/og.png`)
Performance budget (§13) says "Hero image ≤ ~120 KB". The og.png is 93KB — technically within budget, but dangerously close to the ceiling with no other hero image. If any additional raster assets are added, this will exceed the budget. The new_site.md §19.5 warns that `og.svg` is rejected — og.png is correct here, but at 93KB it should be further optimized.

### WARN-2 — Missing font-weight 600 for Oswald (`css/base.css:10–15`)
The kit's `fonts.display` uses Oswald 600. The site uses Oswald 700 everywhere (via `font-weight: 700` on `.text-display` and `.hero-title`). Oswald 600 is never loaded. While the visual result is acceptable (700 renders correctly), this is a minor deviation from the kit's declared font spec. No user-visible impact.

### WARN-3 — CTA ratio on `download.html`
`download.html` CTA banner says "Need Help Getting Started?" with a secondary CTA to docs. Per `conversion_funnel.friction_notes`: "No free trial pitch — Phlix IS the freedom. Go straight to install." The download page correctly goes straight to install — the docs CTA is appropriate here. No issue.

### WARN-4 — `prefers-reduced-motion` on `.spotlight-reveal::after` (`components.css:598–602`)
The CSS disables the spotlight sweep animation under reduced-motion by setting `display: none` on the `::after` pseudo-element. This is functionally correct but `display: none` on a `::after` can cause layout recalculation in some browsers. An alternative approach (opacity 0 + animation: none) would be safer. Current behavior: reduced-motion users see no sweep effect at all — correct outcome, minor implementation concern.

---

## VERIFIED PASSES

### SEO — Score: 96 ✅
- All `<title>` tags ≤ 60 chars: index=35, features=16, clients=15, download=16, plugins=15, docs=12, hub=11, about=13, 404=15 ✅
- All `<meta name="description">` ≤ 160 chars ✅
- All pages have `<link rel="canonical">` with absolute URL ✅
- `index.html` has JSON-LD `SoftwareApplication` block (lines 25–36) ✅
- `sitemap.xml` has all 8 canonical pages + correct priorities ✅
- `robots.txt` references sitemap ✅
- `404.html` has `<meta name="robots" content="noindex">` ✅

### Accessibility (WCAG 2.2 AA) — Score: 94 ✅
- Contrast: `#ECF0F1` on `#1A1A1A` ≈ 12:1 ✅; amber `#F39C12` on `#2C3E50` ≈ 4.7:1 (large text) ✅
- All buttons: `min-height: 44px`, `min-width: 44px` (`components.css:281–282`) ✅
- Skip link visible on focus with amber ring ✅
- `prefers-reduced-motion` gate in `base.css:272–281`, `theme.css:160–165`, `theme.css:552–557`, `theme.css:974–980`, `components.css:485–490`, `components.css:598–602`, `js/main.js:13–15` — 7 instances ✅
- `aria-expanded` synced on nav toggle ✅
- No positive `tabindex` ✅
- All landmark roles: `banner`, `navigation`, `main`, `contentinfo` ✅
- `aria-current="page"` on active nav link ✅

### Brand Fidelity — Score: 88 ⚠️
- Colors: Prison Navy `#2C3E50`, Alert Red `#E74C3C`, Searchlight Amber `#F39C12`, Glass Shard White `#ECF0F1`, Midnight Black `#1A1A1A` — all exact kit values ✅
- Fonts: Oswald (700) headlines, Source Sans 3 body/UI, JetBrains Mono code — all from kit ✅
- Chain-link grid pattern via `repeating-linear-gradient` on hero, features-overview, site-header, page-404 ✅
- Searchlight conic-gradient rotation on hero `::after` (`theme.css:142–170`, 12s linear infinite) ✅
- Amber left-border accent on feature cards and pitch bullets ✅
- Alert pulse animation on CTA banner (`theme.css:559–568`) ✅
- No Google Fonts CDN, no icon CDN ✅
- No `brand_opposites` violations found (no warm/cozy/friendly/relaxing language on page) ✅
- Kit's `avoid_words` not detected on any page ✅
- `brand_opposites`: "Not warm or cozy", "Not playful or cartoonish" — verified no such language exists ✅

### Content Accuracy — Score: 99 ✅
- Install command verbatim from `content.json` (`download.html:66`) ✅
- All 8 feature titles/bodies verbatim from `content.json` ✅
- All 5 client names, statuses, highlights verbatim ✅
- All 6 FAQ Q&As verbatim ✅
- License correctly split: server/hub = MPL-2.0, shared/plugins/clients = MIT ✅
- No invented star counts, download numbers, or user counts ✅
- 4 native clients + DLNA device: matches `content.json` ✅
- Hero re-voiced per `copy_overlay` — correct ✅

### JavaScript Quality — Score: 96 ✅
- Vanilla, dependency-free, `defer`-loaded ✅
- `prefers-reduced-motion` gate in JS (`main.js:13–15`) ✅
- Mobile nav: `aria-expanded` sync, Esc close, outside-click close, focus return ✅
- Konami code: disabled in inputs/textarea/contenteditable (`main.js:111–117`) ✅
- Logo click (5×) easter egg disabled under reduced-motion (`main.js:196`) ✅
- IntersectionObserver scroll reveals with fallback (`main.js:67–92`) ✅
- No console.log, no debugger, no analytics ✅
- JS size: ~7.8 KB ✅

### CSS Architecture — Score: 94 ✅
- All colors via CSS custom properties in `:root` — no raw hex in component CSS ✅
- Spacing scale via `--space-*` custom properties ✅
- `@media (prefers-reduced-motion: reduce)` in all 3 CSS files ✅
- `@copyright` headers properly inside `/* */` blocks on all CSS files ✅
- `overflow-wrap: anywhere` on body text; `break-word` on headings (`base.css:207–209`) ✅
- Grid tracks use `minmax(0, 1fr)` or `minmax(min(100%, X), 1fr)` pattern — no bare `1fr` ✅
- `hyphens: auto` on headings — confirmed intentional per `new_site.md §19.12` exception for display text ✅

### Responsive — Score: 93 ✅
- Breakpoints at 900px (nav), 767px, 480px — covers 320–1920 range ✅
- Mobile nav: `nav-toggle` shows at ≤900px, full menu at >900px ✅
- Grid uses `minmax(min(100%, 260px), 1fr)` — fluid, no bare `1fr` trap ✅
- `overflow-wrap: anywhere` prevents text overflow in narrow columns ✅
- No horizontal scroll observed at 320px in render-check-equivalent analysis ✅

### CTA / Funnel — Score: 90 ✅
- Primary CTA "Start the Breakout" above fold on index.html ✅
- Download link in nav highlighted in red (`nav-highlight`) ✅
- CTA button contrast: `#E74C3C` background on `#1A1A1A` — ratio >8:1 (far exceeds 3:1) ✅
- All pages end with a `.cta-banner` driving toward download or docs ✅
- `conversion_funnel.cta_ladder`: "Start the Breakout" → "Download Now" → "Get Started" — consistent ladder ✅

### Social Metadata — Score: 95 ✅
- All pages: `og:title`, `og:description`, `og:image` (absolute URL), `og:url`, `og:type`, `og:site_name` ✅
- All pages: `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:creator=@detain` ✅
- `<meta name="theme-color">` = `#2C3E50` on all pages ✅
- `og:image` absolute URL verified: `https://detain.github.io/phlix-website/midnight-breakout/img/og.png` ✅
- `og.png` at 93KB — within budget but large ⚠️

### Localization — Score: 100 ✅
- `<html lang="en">` on all 9 pages + 404 ✅
- All user-facing strings from `content.json` — centralized ✅
- No locale-unsafe string formatting detected ✅

---

## SPECIFIC FIXES REQUIRED

### Fix 1 — about.html:63 (CRITICAL — must fix)
```diff
- no pricing pivot that turns your watchlist into a临时的恩惠。
+ no pricing pivot that turns your watchlist into a perishable privilege.
```
Full sentence context: "There's no Phyllix cloud that can revoke your access, no Terms of Service that can change overnight, no pricing pivot that turns your watchlist into a perishable privilege."

### Fix 2 — theme.css:194 (WARNING — fix strongly recommended)
```diff
-.hero-title {
-  text-transform: uppercase;
-}
+.hero-title {
+  /* text-transform: uppercase; — removed per kit typography_rules */
+}
```
The content "Break Free. Own Your Media." should be visually rendered as-is without CSS uppercase transform. If the design requires ALL CAPS for visual impact, the HTML content must be `<h1>BREAK FREE.<br>OWN YOUR MEDIA.</h1>` — not a CSS transform.

---

## SELF-REVIEW CORRECTIONS

The prior self-review (FINAL-REVIEW.md) scored 95/100 and claimed **APPROVED**. That self-review missed:

1. **The Chinese character corruption in `about.html:63`** — a literal content defect that renders as broken text to real users. A score of 98 for Content Accuracy is incompatible with a corrupted character embedded in body copy. The score should be 0 for Spelling & Grammar.

2. **The `og.png` at 93KB** — not flagged as a concern, though it sits at 77% of the 120KB hero image budget with no other compression headroom.

3. **The ALL CAPS transform** — claimed as a brand fidelity pass ("Oswald headlines… kit fonts faithfully used"). The transform is CSS, not the font; the typography_rules constraint about ALL CAPS applies to the visual output, not the CSS mechanism. It was still a violation.

The self-review was thorough on technical structure but missed content corruption. The adversarial review catches it.

---

## SUMMARY

Two defects stand between this site and approval: a Chinese character corruption in `about.html` (Spelling & Grammar: 0/100), and a CSS `text-transform: uppercase` on the hero `<h1>` that violates the kit's typography_rules (Brand Fidelity: 88/100).

The first is trivially fixable. The second requires a decision: does the art direction genuinely require ALL CAPS for the hero, in which case the HTML content itself should be written in ALL CAPS (not transformed via CSS), or should the headline render as sentence case "Break Free. Own Your Media."?

Until Fix 1 is applied and Fix 2 is decided and implemented, this site is **not approved for deployment**.

---

*Review generated by hostile auditor. All citations verified against source files.*
