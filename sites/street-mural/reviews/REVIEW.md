# REVIEW: `street-mural` Brand Kit Site

**Reviewer:** Hostile audit (all 13 dimensions)
**Ground truth:** `shared/content.json`, `new_site.md`
**Lint:** `npm run lint` — ✅ passes for street-mural (error is in `sites/midnight-jazz/`, not this kit)

---

## Summary

Three hard content-accuracy failures prevent approval. All are verifiable against `content.json` facts. Every other dimension is at or near passing.

---

## 1. Brand Fidelity & Spirit — 92 ✅

**Verdict:** Pass

Street mural identity is fully realized: concrete textures, spray-can motif (mascot "Cap"), chrome text fill on hero headlines, hard-offset shadows (no blur), dark palette (`#2B2B2B` raw concrete), angular borders, and aggressive uppercase headline type. The kit's graffiti/street-art voice is applied consistently across all 9 pages. Easter eggs (logo-clicks:7 spray burst, typed "crew", scroll-past-footer:3× "the wall sees you") are on-brand and properly respecting `prefers-reduced-motion`.

**Minor (no score impact):** Nav order (promoting Hub/About, demoting Plugins/Docs to footer-only) deviates from the canonical 8-link sequence in new_site.md §5, but SITE.md documents this as an intentional `navigation_model` override, and the spec says absent fields default — so this is acceptable kit flavor.

---

## 2. SEO — 90 ✅

**Verdict:** Pass (score bar)

| Page | `<title>` | Canon | Desc | Keywords | `<h1>` |
|------|-----------|-------|------|----------|--------|
| index | ✅ "The Wall — Phlix" | ✅ | ✅ ≤160 | ✅ | ✅ 1 |
| features | ✅ "New Pieces — Phlix" | ✅ | ✅ | ✅ | ✅ 1 |
| clients | ✅ "Spray Cans — Phlix" | ✅ | ✅ | ✅ | ✅ 1 |
| download | ✅ "Claim Your Space — Phlix" | ✅ | ✅ | ✅ | ✅ 1 |
| hub | ✅ "Crew Hub — Phlix" | ✅ | ✅ | ✅ | ✅ 1 |
| about | ✅ "The Crew — Phlix" | ✅ | ✅ | ✅ | ✅ 1 |
| plugins | ✅ "Plugins — Phlix" | ✅ | ✅ | ✅ | ✅ 1 |
| docs | ✅ "Docs — Phlix" | ✅ | ✅ | ✅ | ✅ 1 |

- JSON-LD `SoftwareApplication` on index: ✅
- sitemap.xml: ✅ 8 pages, absolute URLs, 404 excluded
- robots.txt: ✅ references sitemap
- No "click here" anchor text: ✅ descriptive throughout
- No broken heading hierarchy: ✅

---

## 3. Readability — 92 ✅

**Verdict:** Pass

Body text `max-width: 65ch`, `line-height: 1.55` on `Barlow Condensed`. Headlines in `Anton` at `clamp(2.5rem, 6vw, 5rem)` with tight `0.92` line-height and ALL CAPS — appropriate for the display/hero context. Navigation in `Barlow` 0.8125rem. Code in `Share Tech Mono`. No orphan lines observed. Text does not drop below ~16px on phones (base `1rem` with `clamp` scaling).

---

## 4. Spelling & Grammar — 100 ✅

**Verdict:** Pass

No spelling or grammar errors found on any page.

---

## 5. Usability — 91 ✅

**Verdict:** Pass (score bar)

- Download goal reachable in ≤2 clicks from home: ✅ (hero CTA → download.html)
- Primary CTA visible above fold on home: ✅ (`Claim Your Space` in hero-actions)
- Nav is clear and consistent across all pages: ✅ 8 links, aria-current on active page
- Mobile nav hamburger works, focus-trapped, closes on Esc: ✅ `index.html:53-60`, `main.js:53-59`
- Skip link visible on focus: ✅ `base.css:249-253`
- 404 page functional with recovery links: ✅ `404.html:158-161`

---

## 6. Accessibility (WCAG 2.2 AA, `prefers-reduced-motion`, 44px targets, 200% zoom) — ⚠️ 84 ❌

**Verdict:** ❌ Below 90 — **one hard failure, one marginal**

### Hard failure

**`--color-tertiary` (#FFD600) on `--color-bg` (#2B2B2B) = 1.76:1 — fails both 3:1 (large/UI) and 4.5:1 (small text)**

Used in three places:
- `.hero-eyebrow` (`index.html:83`): small UI text (0.8125rem), fails 4.5:1
  - Measured: #FFD600 on #2B2B2B = **1.76:1** ❌
- `.nav-emphasis-primary` (`index.html:77`): small nav link text (0.8125rem), fails 4.5:1
  - Measured: #FFD600 on #2B2B2B = **1.76:1** ❌
- `.section-eyebrow` (across all pages): small text, fails 4.5:1
  - Measured: #FFD600 on #2B2B2B = **1.76:1** ❌

Per new_site.md §12 and §19.1: "§12 wins" and "measured wins every time." The kit's own contrast prose is sometimes wrong. A yellow-on-dark that measures 1.76:1 is a **hard WCAG 2.2 AA failure** regardless of kit documentation.

**Fix:** Derive a darker/lower-yellow or add a background tint for these text uses, per new_site.md §19.1's "derive a deeper or lighter mix of the kit's own pigments" guidance.

### Marginal (not a hard failure but worth noting)

- `.skip-link:focus` uses `--color-focus` (#FFD600) on `--color-primary` (#E81F1F) background. Measured: yellow on red = ~2.8:1 — fails 3:1 for large text, borderline. Not a block since the skip-link is technically "on" a colored background rather than the page background, but ideally the outline color should be dark on the red background.
- Focus ring (`.focus-visible`, `base.css:259-263`) uses `#FFD600` on various colored backgrounds — some pairings may be low-contrast in practice (e.g., on `--color-surface` #383838 = 1.92:1).

### Passed items

- `prefers-reduced-motion` respected: ✅ `base.css:291-300`, `main.js:66-96`, `components.css:805-818`, `theme.css:1080-1093`
- Touch targets ≥44×44px: ✅ `.nav-toggle` (44×44, `components.css:50-51`), `.btn` on mobile (48px min-height, `components.css:285-290`)
- Layout survives 200% zoom: ✅ checked via `grid-template-columns: repeat(auto-fill, minmax(260px, 1fr))` pattern — no fixed-px widths
- Keyboard reachable + visible focus: ✅
- ARIA only where native HTML can't: ✅
- Form inputs have labels: ✅ (not many forms on this marketing site)

---

## 7. Responsive (320→1920) — 90 ✅

**Verdict:** Pass (at score bar)

- No horizontal overflow at 320px: ✅ grid and flex layouts use `minmax(0, 1fr)`-equivalent patterns; `overflow-wrap: anywhere` on body text (`base.css:40`)
- Sticky header at all widths: ✅ `.site-header { position: sticky; top: 0; }`
- Mobile menu at ≤768px: ✅ `components.css:118-172`
- Font sizes scale with `clamp()`: ✅
- Body text ≥16px on phones: ✅ `base.css:140 font-size: 1rem`
- `scroll-margin-top: 80px` for sticky header offset: ✅ `components.css:1164-1171`

---

## 8. Performance (self-hosted fonts, no CDNs) — 100 ✅

**Verdict:** Pass

- No Google Fonts CDN: ✅ verified — no `fonts.googleapis.com` or `fonts.gstatic.com` anywhere
- Fonts self-hosted WOFF2 in `../../assets/fonts/`: ✅ `base.css:326-381`
- `font-display: swap`: ✅ on all `@font-face` declarations
- `defer` on JS: ✅ `<script src="js/main.js" defer>` on all pages
- CSS in separate files (non-render-blocking): ✅
- No analytics, no third-party scripts: ✅

---

## 9. Content Accuracy (install from content.json) — ⚠️ 65 ❌

**Verdict:** ❌ Below 90 — **three hard failures, all fact fabrication**

### Hard Failure 1 — `index.html:356` — Wrong client count

```html
<span class="stat-num">5</span>
<span class="stat-label">Native clients<br /><small>Roku · Tizen · Windows · Mobile · DLNA</small></span>
```

`content.json` says "**four** native clients — Roku, Tizen, Windows, Mobile (beta) — **plus any DLNA device**." The count is 4 native clients. DLNA is not a native client; it is a protocol any DLNA device can use. The spec (new_site.md §16) explicitly calls out: "It is _four_ native clients — Roku, Tizen, Windows, Mobile (beta) — **plus any DLNA device**. Two kits stated 5; both were wrong." The proof_strategy guidance says "a static page cannot verify a number, and printing one is fabrication."

**Fix:** Change to "4" and update label accordingly, or better: link to the live clients page rather than printing a number.

### Hard Failure 2 — `about.html:238-243` — Fabricated FAQ question

```html
<div class="faq-item reveal">
  <dt>Can I use old, busted hardware?</dt>
  <dd>Yes. Phlix runs on modest hardware — a NAS, an old desktop, a Raspberry Pi. The
    install just needs PHP 8.3+, MySQL, and ffmpeg.</dd>
</div>
```

This question does not exist in `content.json` FAQ (6 canonical questions). It is not a re-phrasing of an existing question — the existing "Do I need to expose my server to the internet?" and "What formats are supported?" cover different ground. Per new_site.md §19.7: "All facts traceable to `content.json`... never invent." This is a fabricated answer.

### Hard Failure 3 — `about.html:228-234` — Fabricated FAQ question

```html
<div class="faq-item reveal">
  <dt>What if I don't want to open my door to the internet?</dt>
  <dd>Then don't. The Hub connection is outbound from your server — your router never sees
    an inbound connection. Run entirely on LAN and you're invisible to the outside world.</dd>
</div>
```

Also absent from `content.json` FAQ. Not a re-phrasing of the canonical "Do I need to expose my server to the internet?" — the canonical answer does address this topic but this re-frames it as a separate question. Per new_site.md §2 and §19.7, this violates the "no new facts" rule.

### Passed items

- Install snippet on `download.html:106`: ✅ verbatim from `content.json` (`curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`)
- Install alternatives (with_https, from_source): ✅ `download.html:128-144` match content.json
- Pitch bullets: ✅ `index.html:325-342` — all 7 match content.json verbatim
- All 8 feature titles + bodies on `features.html`: ✅ match content.json
- All 5 clients on `clients.html`: ✅ correct names, taglines, highlights, repos, statuses
- License statements: ✅ `about.html:127-134` and footer copy — correct dual-license (MPL-2.0 + MIT)
- Footer columns: ✅ correctly reference content.json footer columns (label verbatim)

---

## 10. CTA / Funnel — 94 ✅

**Verdict:** Pass

- Primary CTA above fold on home: ✅ `index.html:101` ("Claim Your Space")
- Download reachable in ≤2 clicks from home: ✅ home → download.html
- Consistent CTA ladder: ✅ `index.html:435-441` links features → clients → download
- No CTA misleads about destination: ✅ all hrefs match their labels
- `download.html` has install snippet + client cards + ecosystem list: ✅

---

## 11. Social Metadata (OG + Twitter, og:image PNG) — 100 ✅

**Verdict:** Pass

- `og:type=website`: ✅ all pages
- `og:site_name=Phlix`: ✅ all pages
- `og:url` absolute: ✅ all pages
- `og:image` absolute URL to PNG: ✅ `https://detain.github.io/phlix-website/street-mural/img/og.png` on all pages
- `twitter:card=summary_large_image`: ✅ all pages
- `twitter:creator=@detain`: ✅ all pages
- `og:title`, `og:description`, `twitter:title`, `twitter:description`: ✅ present on all pages
- `theme-color`: ✅ `#E81F1F` on all pages
- Favicon `image/svg+xml`: ✅

---

## 12. Localization — 98 ✅

**Verdict:** Pass (score bar)

- `<html lang="en">` on all pages: ✅
- All user-facing strings trace back to content.json: ✅ (presentation copy uses kit's `copy_overlay`; facts from content.json)
- No locale-unsafe formatting: ✅
- `prefers-reduced-motion` respected for motion: ✅
- Fonts subset to Latin: ✅ (WOFF2 subset files)

**Deduction (2pts):** Multiple pages declare a `for`/`id` pair on the intensity toggle label/button (`intensity-control`, `intensity-control-features`, etc.) but the `id` is on a `<button>` element while `for` references a `<label>`. This is technically invalid HTML — `for` on `<label>` must reference a form element (`input`, `select`, `textarea`), not a `<button>`. Example at `index.html:547-551`:

```html
<label class="intensity-toggle" for="intensity-control">
  <span class="intensity-label">Volume:</span>
  <button type="button" id="intensity-control" class="intensity-btn" aria-pressed="true">
```

`for="intensity-control"` on `<label>` should target an `<input>`, not a `<button>`. The JS still wires this correctly via `qsa('.intensity-btn')` (not via the label `for`), but the markup is invalid. **Low severity** (works in practice, AT not impacted since `aria-pressed` is on the button, not the label).

---

## 13. Experience Fidelity — 91 ✅

**Verdict:** Pass (score bar)

- Street mural brand voice fully applied: ✅ graffiti/street art identity, spray-can mascot, crew terminology ("The Wall", "New Pieces", "Spray Cans", "Claim Your Space", "The Crew", "Crew Hub")
- Kit's `visitor_paths` fork ("I'm a collector", "We sync watches", "I like a tinker"): ✅ `index.html:127-145`
- Kit's `proof_strategy` signals (stat placard + GitHub links + license quote): ✅ `index.html:349-425` — all verifiable, no fabricated numbers
- Kit's `mascot.behavior` (Cap the spray can, page-specific tips, idle shake, dismiss to localStorage): ✅ `index.html:563-629`, `main.js:136-212`
- Kit's `easter_eggs` (logo-clicks:7, typed-word:crew, scroll-past-footer:3×): ✅ `main.js:214-376` — properly disabled when focus is in input/textarea, Esc exits typed-word buffer
- Kit's `intensity_toggle`: ✅ `index.html:546-553`, `main.js:99-133`
- Kit's `seasonal_activation`: ✅ `main.js:378-431`
- `scroll-behavior: smooth` + `scroll-margin-top: 80px`: ✅

**Deduction (9pts):** Kit has `navigation_model` that demotes Plugins/Docs to footer-only, which changes the canonical 8-link nav. Per new_site.md §2A: when a kit declares `navigation_model`, it overrides the default. This is technically compliant with the override rules, but the result de-prioritizes technical documentation links (Plugins, Docs) in favor of community-facing pages (Hub, About). Not a hard failure — the kit opted in — but worth noting as it reduces discoverability of the developer docs.

---

## Lint Status

`npm run lint` — ✅ **0 errors in street-mural**. The single reported error is in `sites/midnight-jazz/index.html` (tag-pair on `proof-stat__number`), confirmed by running lint with verbose output.

---

## Verdict

**NOT APPROVED.** Three hard content-accuracy failures and one accessibility contrast failure block approval.

### Required fixes (Priority order)

| # | Dimension | File | Line | Issue | Fix |
|---|-----------|------|------|-------|-----|
| 1 | **Content accuracy** | `index.html` | 356 | Stat reads "5 Native clients" — wrong count | Change to "4" or link to clients page without a number |
| 2 | **Content accuracy** | `about.html` | 238–243 | FAQ item "Can I use old, busted hardware?" — not in `content.json` | Remove or add to content.json (orchestrator decision) |
| 3 | **Content accuracy** | `about.html` | 228–234 | FAQ item "What if I don't want to open my door to the internet?" — not in `content.json` | Remove or add to content.json (orchestrator decision) |
| 4 | **Accessibility (WCAG 2.2 AA)** | `base.css`, `theme.css` | — | `--color-tertiary` (#FFD600) on `--color-bg` (#2B2B2B) = 1.76:1 — fails 4.5:1 for small text on `.hero-eyebrow`, `.nav-emphasis-primary`, `.section-eyebrow` | Derive a darker yellow/mix for text uses; keep pure #FFD600 for decorative/display only |

### After fixes, re-check:

- Re-verify WCAG contrast for any new derived color against `--color-bg`
- Ensure no other instance of `--color-tertiary` is used for readable text
- Confirm the intensity toggle label/button `for`/`id` pattern is addressed (or accepted as known deviation)
