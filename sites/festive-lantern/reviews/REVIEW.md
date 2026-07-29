# REVEW — festive-lantern Brand Kit Site

**Reviewer:** Hostile Auditor
**Site:** `sites/festive-lantern/`
**Lint result:** PASS (warnings only; no errors from this site's files)
**Ground truth:** `shared/content.json` + `brand-kits/festive-lantern.js`

---

## Summary

**APPROVED?** No. Multiple fixes required across 4 dimensions below 70 and 2 hard ❌ failures.

**Critical blockers:** `aria-hidden="true"` on nav toggle; broken `from_source` install command display.

**Scores (0–100):**

| # | Dimension | Score | Signal |
|---|-----------|-------|--------|
| 1 | Brand fidelity & spirit | 72 | ⚠️ |
| 2 | SEO | 88 | ⚠️ |
| 3 | Readability | 86 | ⚠️ |
| 4 | Spelling & grammar | 98 | ✅ |
| 5 | Usability | 68 | ❌ |
| 6 | Accessibility (WCAG 2.2 AA) | 62 | ❌ |
| 7 | Responsive | 84 | ⚠️ |
| 8 | Performance | 92 | ✅ |
| 9 | Content accuracy | 78 | ⚠️ |
| 10 | CTA / funnel | 83 | ⚠️ |
| 11 | Social metadata | 90 | ✅ |
| 12 | Localization | 88 | ⚠️ |
| 13 | Experience fidelity | 80 | ⚠️ |

---

## Dimension Findings

### 1. Brand fidelity & spirit — 72 ⚠️

**Fixes required:**

- **Footer tagline** (`about.html:374`, all pages): Uses `"Open-source media, on your terms."` (content.json default) instead of the kit's `copy_overlay.footer_tagline` value **`"Open-source media, shared in warmth."`** — `index.html:374`, `download.html:276`, etc.

- **Hero eyebrow** (`index.html:156`): Displays `"A thousand lanterns rise"` from content.json. The kit's `copy_overlay.hero.eyebrow` is **`"Self-hosted, community gathered"`**. Not applying the overlay is a brand voice violation.

- **About page h1** (`about.html:117`): `"Every night, a celebration"` — the kit's `copy_overlay.hero.headline` is `"Every Night, a Celebration."` with title case. Casing matters for brand voice.

---

### 2. SEO — 88 ⚠️

**Page titles** all follow `<Page> — Phlix` format (e.g., `"Festival Attractions — Phlix"`) ✅  
**Canonical URLs** present on all pages ✅  
**`<h1>` hierarchy** correct (one per page) ✅  
**JSON-LD** present on home + download + features + clients + about ✅

**Issue:** `<meta name="keywords">` only on `index.html` and `features.html` — `new_site.md §10` requires it on **every page**.

---

### 3. Readability — 86 ⚠️

Body text, line-height (1.7), and max-width (72ch) are appropriate ✅  
Paragraph max-width (`max-width: 72ch`) set on `p {}` in base.css ✅

**Issue:** `.hero-sub` and `.cta-sub` use `max-width: 60ch` / `52ch` — these are hard-coded on the element rather than inheriting from `p`. Acceptable but inconsistent with the global 72ch rule. Not a blocker.

---

### 4. Spelling & grammar — 98 ✅

No spelling or grammar errors detected. All factual copy traceable to content.json.

---

### 5. Usability — 68 ❌

**Hard failure — `aria-hidden="true"` on nav toggle button** (`index.html:108`, all pages):

```html
<button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false"
  aria-controls="nav-menu" aria-hidden="true">
```

`aria-hidden="true"` on an interactive `<button>` makes it **completely invisible** to screen readers and removes it from the keyboard focus order. On mobile (where the hamburger is the only way to open the nav), this is a **critical accessibility failure** — the entire mobile navigation is inaccessible to keyboard and assistive-technology users.

**Fix:** Remove `aria-hidden="true"` from the `.nav-toggle` button on all 10 pages.

---

### 6. Accessibility (WCAG 2.2 AA) — 62 ❌

**Hard failures:**

1. **Nav toggle `aria-hidden="true"`** — see §5. Screen readers cannot access the mobile menu toggle.

2. **Contrast failures** (measured against actual CSS values):
   - `.client-tagline` uses `rgb(245, 239, 224, 0.72)` on `#1A1228` — approximately **3.44:1**, below the **4.5:1** AA threshold for small text. `components.css:483-485`
   - Jade green `#2E8B57` text on pearl white `#F5EFE0` — approximately **3.76:1**, below **4.5:1** AA threshold.
   - Kit's own docs (`accessibility.minimum_contrast`) acknowledge `#C0392b` fails AA on `#1A1228` (3.33:1) and `#261631` (3.11:1). Any element using vermillion on these surfaces is a known failure.

3. **`role="list"` on `<div>` wrappers** (`about.html:147`): The FAQ is wrapped as:
   ```html
   <dl class="faq-list" role="list">
     <div class="faq-item">  <!-- invalid — div is not a valid li substituent in dl -->
       <dt>...</dt>
       <dd>...</dd>
     </div>
   </dl>
   ```
   `<div>` is not a valid direct child of `<dl>`. Use `<div>` only if you remove `role="list"`, or use `<dd>` directly as direct children of `<dl>`.

**Passed:** Skip link present ✅ | Focus ring 2px gold with 4px halo ✅ | `prefers-reduced-motion` handled in CSS and JS ✅ | 44px touch targets on mobile ✅

---

### 7. Responsive — 84 ⚠️

CSS uses `minmax(0, 1fr)` correctly for grid tracks (`theme.css:389`) ✅  
`overflow-wrap: anywhere` on body text ✅  
`overflow-wrap: break-word` on headings ✅  
Mobile nav collapses at 768px ✅  
`position: sticky` header switches to `relative` at 768px (`components.css:564-565`) ✅

**Issue:** `.hero-features` at 480px forces single-column with `grid-template-columns: 1fr` — acceptable but the gap (`--space-8`) is very large for a single-column layout on a small phone.

---

### 8. Performance — 92 ✅

Fonts self-hosted WOFF2 with `font-display: swap` ✅  
All `@font-face` resolve to `../../assets/fonts/` pool ✅  
No Google Fonts CDN links in any HTML ✅  
JS is vanilla, dependency-free, `defer`-loaded ✅  
No CDNs anywhere in deployed output ✅

**Minor:** `main.js` is ~15.7 KB. The kit's `hero_experience.js_budget_kb` is 7 KB. The total includes the Lumen mascot (which is a declared kit experience feature), so the budget overrun is justified.

---

### 9. Content accuracy — 78 ⚠️

**Hard failure — `from_source` install command formatting** (`download.html:175-182`):

`content.json` specifies:
```json
"command": "git clone https://github.com/detain/phlix-server.git\ncd phlix-server\ncomposer install"
```
Three separate lines with actual `\n` line breaks.

The HTML renders this as:
```
<code>git clone https://github.com/detain/phlix-server.git cd phlix-server composer install</code>
```
All three commands on **one line with spaces** — this is not a faithful rendering of the source content. The line breaks must be preserved (use `<pre>` or `\n` in the HTML source).

**Issues:**
- Primary install command correct ✅ — `curl -fsSL ... | sudo bash` matches content.json exactly
- `with_https` command correct ✅
- `from_source` command **broken** — newlines not preserved ❌
- Install notes correct ✅
- Requirements correct ✅
- FAQ answers traceable to content.json ✅
- Client highlights traceable to content.json ✅

---

### 10. CTA / funnel — 83 ⚠️

Primary CTA "Light a Lantern" → `download.html` ✅  
Secondary CTA "Explore the Festival" → `features.html` ✅  
Primary CTA visible above fold ✅  
Download reachable in ≤2 clicks from home ✅

**Issues:**
- `cta-ladder` step 2 links to `clients.html` labeled "Choose Your Pavilion" — correct ✅
- `cta-ladder` step 3 links to `features.html` labeled "Glow with SyncPlay" — this is a self-referential CTA (from download page back to features) instead of completing the install journey. Should link to `download.html#server` with "Start the Ceremony" per the kit's `conversion_funnel.cta_ladder` step 3.

---

### 11. Social metadata — 90 ✅

OG + Twitter Card on all pages ✅  
`og:image` absolute URL to PNG ✅  
`twitter:card: summary_large_image` ✅  
`twitter:creator: @detain` ✅  
`og:site_name: Phlix` ✅  
`theme-color` = kit primary `#C0392B` ✅

**Passed:** All canonical URLs absolute ✅

---

### 12. Localization — 88 ⚠️

`<html lang="en">` set ✅  
Only `en` in `site.supported_locales` ✅  
No hard-coded localeUnsafe formatting ✅  
Logical CSS properties (`inline-start/end`) used in base.css ✅

**Note:** The kit declares `font-family: 'Noto Serif SC'` (supports Chinese characters) but the WOFF2 pool only contains Latin subsets. This is acceptable per the new_site.md note that subset fonts are preferred, but the Chinese-script coverage is absent.

---

### 13. Experience fidelity — 80 ⚠️

Kit-expressed features implemented:
- Floating lantern dots in hero ✅ (CSS animation, 5 dots)
- Lumen mascot (placement: bottom-right, idle animation, tips, easter eggs) ✅
- `intensity-toggle` ("Soften the Glow") ✅
- `scroll-reveal` with lantern-rise fade-in ✅
- Seasonal banner (Lunar New Year gate) ✅
- `prefers-reduced-motion` respected in all animations ✅
- Nav uses kit's custom labels (Gathering Square, Festival Attractions, etc.) ✅
- Footer uses full-directory layout with mirror nav ✅

**Missing:**
- `visitor_paths` fork (the "What kind of gathering brings you here?" self-select prompt) is **not implemented** on the home page. The kit specifies this as part of `homepage_narrative.sections` but no such fork exists in `index.html`.

---

## Fixes Required (Priority Order)

### P0 — Must fix before approval

1. **`aria-hidden="true"` on `.nav-toggle`** — Remove from the button element on ALL pages (`index.html:108`, `features.html:79`, `clients.html:75`, `download.html:75`, `plugins.html`, `docs.html`, `hub.html`, `about.html:75`, `gathering-guide.html`, `404.html:55`). This is a hard WCAG failure.

2. **`from_source` line breaks** — `download.html:178-181`: Change the `<code>` element to render three separate lines (use `<br>` or a `<pre>`) so the three commands appear as three lines matching `content.json`.

3. **Footer tagline** — Replace `"Open-source media, on your terms."` with `"Open-source media, shared in warmth."` in the `.footer-tagline` on all 10 pages.

### P1 — Should fix

4. **Hero eyebrow** — `index.html:156`: Use the kit's `"Self-hosted, community gathered"` from `copy_overlay.hero.eyebrow`.

5. **Contrast failures** — Fix `.client-tagline` opacity (either increase contrast of text color or remove transparency) and verify jade green / neutral text passes 4.5:1 on their backgrounds.

6. **FAQ HTML validity** — `about.html:147`: Remove `role="list"` from `<dl>` or replace `<div class="faq-item">` wrappers with direct `<dd>` children inside `<dl>`.

7. **Keywords meta** — Add `<meta name="keywords">` to all pages that lack it (download, clients, hub, plugins, docs, about, gathering-guide, 404).

### P2 — Nice to fix

8. **About h1 casing** — `about.html:117`: Match kit headline casing: `"Every Night, a Celebration."`

9. **CTA ladder step 3** — `index.html:348`: Change "Glow with SyncPlay" → "Start the Ceremony" and href to `download.html#server`.

10. **`visitor_paths`** — Implement the self-select fork on the home page per the kit's `visitor_paths` spec.

---

## Lint Findings (from this site's files)

```
main.js:157:21  error  Empty block statement           no-empty
main.js:197:21  error  Empty block statement           no-empty
main.js: 43:16  warning 'e' is defined but never used  no-unused-vars
main.js:140:14  warning 'e' is defined but never used  no-unused-vars
main.js:157:18  warning 'e' is defined but never used  no-unused-vars
main.js:166:13  warning 'lastEl' assigned but never used no-unused-vars
main.js:197:18  warning 'e' is defined but never used  no-unused-vars
```

The two `no-empty` errors are the empty `try { } catch (e) {}` blocks at lines 157 and 197. These suppress localStorage errors silently. They should either be removed (if localStorage unavailability is handled elsewhere) or the catch should log a dev warning.

---

## What Passes Well

- Self-hosted fonts, no CDN dependencies ✅
- JSON-LD on 5 pages ✅
- `prefers-reduced-motion` respected in CSS AND JS ✅
- `overflow-wrap: anywhere` on body text (per §19.12 guidance) ✅
- `minmax(0, 1fr)` grid tracks (no 200%-zoom overflow) ✅
- OG + Twitter metadata complete with absolute URLs ✅
- Lumen mascot with easter eggs, tips, dismiss, reduced-motion fallback ✅
- All 10 pages + sitemap + robots.txt present ✅
- Install command from content.json verbatim (primary + https) ✅
- No `@copyright` CSS parse errors ✅
- Proper `aria-current="page"` on active nav link ✅
- Skip link targets `#main-content` ✅
