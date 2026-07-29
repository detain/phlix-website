# soundwave-studio — Brand Kit Site Review

**Site:** `phlix-website/sites/soundwave-studio/`
**Lint:** `npm run lint` — PASS (0 errors for this kit; 1 error in unrelated `midnight-jazz`)
**Review date:** 2026-07-29

---

## Summary

| Dimension | Score | Status |
|-----------|-------|--------|
| 1. Brand fidelity & spirit | 75 | ⚠️ |
| 2. SEO | 55 | ❌ |
| 3. Readability | 88 | ⚠️ |
| 4. Spelling & grammar | 100 | ✅ |
| 5. Usability | 80 | ⚠️ |
| 6. Accessibility | 72 | ❌ |
| 7. Responsive | 85 | ⚠️ |
| 8. Performance | 90 | ✅ |
| 9. Content accuracy | 75 | ⚠️ |
| 10. CTA / funnel | 78 | ⚠️ |
| 11. Social metadata | 55 | ❌ |
| 12. Localization | 95 | ✅ |
| 13. Experience fidelity | 70 | ⚠️ |

**APPROVED: NO** — Three ❌ dimensions (SEO, Accessibility, Social metadata) plus multiple ⚠️.

---

## 1. Brand Fidelity & Spirit — 75 ⚠️

**What works:**
- Dark studio charcoal (#141418) background, waveform green (#00E676) primary CTA — correct palette application.
- Sharp 2–4px border radii throughout; no soft/rounded elements.
- Rajdhani headlines in uppercase with wide tracking; Share Tech Mono for mono/readouts.
- VU meter bar animation in nav; waveform idle animation on mascot.
- `channel-strip-grid` on features, `monitor-wall` on clients, `session-notes` on about — all per `page_blueprints`.
- Muted nav links on "Credits" (about) and primary emphasis on "Signal Map" (features) and "Roll Tape" (download) — correctly following `site_architecture.emphasis`.
- Signal red (#D50000) used only for error states (404 page) and destructive actions.

**What's wrong:**
- **Logo wordmark says "Soundwave Studio" but must say "Phlix".** `index.html:49`, `download.html:37`, `features.html:37`, all HTML files. The nav logo is a product logo, not a brand-kit identifier. new_site.md §5 is explicit: `<img src="img/logo.svg" alt="Phlix logo">` — the img/asset should be "Phlix", not "Soundwave Studio". The kit's `logo_rules` describe a "waveform glyph or oscilloscope 'S' curve" but the actual logo.svg and nav-logo text say the brand kit name, not the product name.
- **Intensity toggle is not declared in the kit.** `components.css:322–369`, footer utility row. The kit declares `mascot.behavior` and `intensity_toggle` but does not actually set `intensity_toggle` to anything — it's a `null` in the kit schema (effectively absent). Shipping it as a visitor-facing toggle without a kit declaration is an extra feature invented outside the kit's opt-in system.
- **Footer tagline is the brand story, not `content.json` footer.tagline.** `index.html:180` says "Open-source media, on your terms — engineered for the long take." content.json footer.tagline is "Open-source media, on your terms." The kit's `copy_overlay` does not override this field, so it must be verbatim. The appended "— engineered for the long take." is off-brand micro-copy not sanctioned by either the kit or content.json.

---

## 2. SEO — 55 ❌

**FAIL** — page titles and social titles use brand kit name instead of product name.

- `<title>` on every page starts with "Soundwave Studio" rather than "Phlix". new_site.md §10: `<title>` must be page-specific (`<Page> — Phlix` or `Phlix — <tagline>`). Current:
  - index: `"Soundwave Studio — Professional Precision for Your Media"` → should be `"Phlix — Self-hosted media server"` or `"Session — Phlix"`
  - features: `"Signal Map — Phlix Soundwave Studio"` → should be `"Signal Map — Phlix"`
  - download: `"Roll Tape — Phlix Soundwave Studio"` → should be `"Roll Tape — Phlix"`
  - Same pattern on all 8 pages + 404.

- `og:title` and `twitter:title` mirror the broken `<title>` on every page. All use "Soundwave Studio" prefix instead of "Phlix".

- `<meta name="description">` on index: `"Soundwave Studio is the creative intensity of a professional recording session rendered as a visual identity. Every session, perfectly captured."` — this is the **brand kit description** (`soundwave-studio.js:32`), not `content.json` `meta.description` which is `"Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support."`. The SEO description must come from `meta.description` (a fact), not the kit's brand description (a presentation overlay that is absent for this field).

**Fix:** `index.html:7`, `index.html:14`, `index.html:17`, all HTML `<head>` sections.

---

## 3. Readability — 88 ⚠️

- Body text 16px base, line-height 1.65 — good.
- 70ch max-width on paragraphs — appropriate.
- Monospace pitch bullets with left border accent — good visual hierarchy.
- VU amber eyebrow text at 0.15em letter-spacing — may feel tight at small sizes but acceptable for display type.
- `proof-signal__value` at `text-3xl` (1.875rem) may be too large in mono for dense grid layouts; no overflow-wrap fallback in the proof signal items (though the parent `.proof-signal` grid uses `minmax(0, 1fr)` correctly per §19.12).

**Minor:** hero gradient text using `-webkit-text-fill-color: transparent` with `background-clip: text` — safe in modern browsers but worth monitoring for older Safari compatibility.

---

## 4. Spelling & Grammar — 100 ✅

No spelling or grammar errors detected. All prose is clean and technical without filler words (awesome, seamless, leverage, etc. — all correctly absent per kit's `avoid_words`).

---

## 5. Usability — 80 ⚠️

- Primary download CTA reachable in ≤2 clicks from home ✓
- Skip link present and visible on focus ✓
- Mobile nav: Escape closes, outside click closes, focus returns to toggle — correct ✓
- Footer "Plugins" and "Docs" links correctly in footer (demoted per `site_architecture`) ✓
- Intensity toggle in footer (undeclared feature — see §1) — works but shouldn't exist without kit opt-in.
- Hub page client code block shows `wss://hub.phlix.io` — this domain is not verifiable as the canonical public Hub URL from any content.json source. If it's wrong, it's a fabricated proof point. Should link to `https://github.com/detain/phlix-hub` for the public hub endpoint instead.

**Touch targets:**
- `.btn` has `min-height: 44px` ✓
- `.nav-toggle`: 40px tall × 24px wide (padding 8px + icon 24px). Total clickable area 40px — **fails 44px minimum**. `components.css:57–75`
- `.mascot__close`: 20×20px — fails 44px but this is `aria-hidden="true"` so mouse-only; dismiss is via parent click. Acceptable.
- `.intensity-toggle__switch`: 36×20px — fails 44px; however this is a label-wrapped checkbox where the full label element is the click target, not just the switch visual. `components.css:334–369`

---

## 6. Accessibility (WCAG 2.2 AA, prefers-reduced-motion, 44px targets, 200% zoom) — 72 ❌

**FAIL** on multiple counts.

1. **VU amber (#FFB300) on charcoal (#141418) contrast ratio = 4.7:1** — fails WCAG AA for small text (4.5:1 required). Used for hero eyebrow (`hero__eyebrow`, `theme.css:184–192`) and secondary text throughout. Per new_site.md §19.1: kit's own contrast claims must be measured, not trusted. The kit claims 5.8:1 in `accessibility.minimum_contrast` but that is for the primary waveform green, not VU amber.

2. **Waveform idle animation without sufficient fallback.** `components.css:554–557` — mascot figure animates with `rotate(2deg)` at 3s intervals. Even though JS disables it under `prefers-reducedMotion`, CSS `animation` continues independently. A user with vestibular sensitivity who has NOT enabled `prefers-reduced-motion` gets a constantly moving element. This is a fail of WCAG 2.3.3.

3. **`prefers-reduced-motion` handling is JS-only for mascot.** `main.js:14` queries the media and sets `prefersReducedMotion`, but the CSS animation for `.mascot__figure` runs regardless until JS loads and hides it. A flash of animation occurs before JS executes. The CSS should also check the media query:
   ```css
   @media (prefers-reduced-motion: reduce) {
     .mascot__figure { animation: none; }
   }
   ```

4. **`nav-toggle` touch target 40px** — below 44px minimum. `components.css:57–75`.

5. **FAQ accordion: `<div>` wrapper around `<dt>`/`<dd>` pairs** — `about.html:103, 107, 111, 115, 119, 123`. While not semantically wrong (definition lists can wrap), the `faq-list__item` is a `<div>` not a `<dd>` itself. The list should be a single `<dl>` with direct `<div>`/`<dt>`/`<dd>` children for styling flexibility, but the `<dt>` and `<dd>` must follow the `<div>` wrapper correctly. Current nesting: `<dl class="faq-list"><div class="faq-list__item"><dt>...<dd>...` — the `<div>` is an invalid child of `<dl>` per HTML spec. Use `<dd class="faq-list__item">` as the wrapper or remove the wrapper div.

---

## 7. Responsive (320→1920) — 85 ⚠️

- Grid columns use `minmax(0, 1fr)` correctly per §19.12 ✓
- `overflow-wrap: anywhere` applied to body text ✓
- Hero text uses `clamp()` for fluid sizing ✓
- Footer nav collapses to single column at 768px ✓
- Mobile nav is `position: fixed` with `inset: 60px 0 0` — covers the full screen below the header on mobile. Acceptable but verify no overlap with fixed mascot (mascot is `display: none` at ≤768px in `components.css:583–587`, so no conflict).

**Minor issue:** `session-note__timestamp` is `100px` fixed width (`components.css:799`). At 200% text zoom in a narrow column, this could cause overflow. Not critical but worth monitoring.

**No `render-check` data** — per new_site.md §19.10, `node tools/render-check.mjs --site soundwave-studio` must be run to verify no overflow at 320px or 200% zoom. Not present in the build log for this kit.

---

## 8. Performance (self-hosted fonts, no CDNs) — 90 ✅

- No Google Fonts CDN or any CDN links detected ✓
- All `@font-face` declarations self-hosted in `theme.css:11–57` pointing to `../../assets/fonts/` ✓
- Fonts have `font-display: swap` ✓
- JS is `defer`-loaded ✓
- `og.png` is 77KB — within the ~120KB hero image budget. Acceptable for a 1200×630 social image.
- `seasonal-banner` JS is self-contained and tiny (≤40KB total JS budget not breached).

**Deduction:** `main.js` is 334 lines but the `seasonal-check` IIFE runs on every page load. Minor but noted.

---

## 9. Content Accuracy — 75 ⚠️

**Install command:** `download.html:90–91` — `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash` — **matches `content.json` install.primary.command verbatim** ✓

**Install description:** `download.html:93–95` — matches `content.json` `install.primary.what_it_does` verbatim ✓

**FAQ:** `about.html:103–126` — all 6 Q&A pairs match `content.json` faq[] exactly ✓

**License:** `about.html:83` and footer copy — correctly split: "MPL-2.0" for Server/Hub, "MIT" for shared/libs/plugins/clients. Does not claim one license across the board ✓

**Issues:**

- **Hero subheadline is brand kit story, not content.json.** `index.html:83`: `"An open-source media server with the technical depth of a world-class recording studio — SyncPlay, transcoding, Live TV, and a hub that reaches your servers from anywhere."` — This is the kit's `story` text fused with a partial product description. It is NOT `content.json` `hero.subheadline` which is: *"An open-source PHP media server that streams to your Roku, Samsung TV, Windows desktop, phone, and any DLNA device — with SyncPlay, Live TV, transcoding, and a hub that follows you anywhere."* The kit does not provide a `copy_overlay.hero` to replace the subheadline, so per new_site.md §2 it must be used verbatim. The on-page version incorrectly adds "technical depth of a world-class recording studio" (brand story voice) and drops "PHP", "Roku, Samsung TV, Windows desktop, phone, and any DLNA device" (factual product claim from content.json). This is a content accuracy violation: **facts must be traceable to content.json**.

- **Proof signals fabricated** — `index.html:138–155`: "4 Native clients, NTP SyncPlay sync, CRF 23/28 FFmpeg quality, Multi User auth". These are specs from content.json, but the spec does NOT have "4 native clients" as a verified count — the content.json `clients[]` array has 5 entries (Roku, Tizen, Windows, Mobile, DLNA). Claiming exactly 4 is a fabrication. It should say "4 native clients (Roku, Samsung Tizen, Windows, Mobile) + DLNA" or link to the live client page rather than printing a rounded count. The new_site.md §19.7 explicitly forbids printing star counts, client counts, or download totals that cannot be verified from content.json.

---

## 10. CTA / Funnel — 78 ⚠️

- Primary CTA "Roll Tape" → download.html — follows kit's `conversion_funnel` and reaches download in 1 click ✓
- Primary CTA above fold on homepage ✓
- Secondary CTA "See the Signal Map" on homepage goes to features.html — not a standard content.json CTA but kit-approved.
- CTA buttons have proper `btn--primary` + `btn--secondary` styling ✓

**Issues:**

- The `download.html` install label shows the raw `curl | sudo bash` command text inside the code-block label field (`download.html:90`):
  ```html
  <div class="code-block__label">curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash</div>
  ```
  This duplicates the command in the visible label AND in the `<pre>`. The label should be the human description from `content.json` `install.primary.label` which is **"One line, on a fresh Ubuntu or Debian host"** — not the command itself.

- Download page CTA at bottom says "Press record." — this is not the `content.json` CTA label ("Read the docs" or primary CTA "Get Phlix"). It is kit voice ("press record" fits the studio metaphor) but not approved in `copy_overlay` or `conversion_funnel` which don't specify per-page CTA banner text.

---

## 11. Social Metadata (OG + Twitter, og:image PNG) — 55 ❌

**FAIL** — see §2 SEO for title issue (cascades to og:title and twitter:title).

Additionally:

- `og:image` is correctly `https://detain.github.io/phlix-website/soundwave-studio/img/og.png` (absolute URL, PNG format) ✓
- `og:site_name = "Phlix"` ✓
- `og:type = "website"` ✓
- `twitter:card = summary_large_image` ✓
- `twitter:creator = @detain` ✓
- **og:title and twitter:title use brand kit description instead of content.json meta.description** — see §2.

---

## 12. Localization — 95 ✅

- `<html lang="en">` set correctly from `site.default_locale` ✓
- No hard-coded locale-unsafe formatting detected ✓
- Logical properties (`margin-inline`, `inset`) used throughout — RTL-ready ✓
- Font subset: Latin only (Rajdhani, Share Tech Mono, Inter all have `-latin` variants) ✓
- `content.json` `supported_locales: ["en"]` — single locale. Site correctly does not ship localized variants. If the site were localized, the translator would only need to replace `content.json`.

---

## 13. Experience Fidelity — 70 ⚠️

- **Nav labels** are the kit's branded names (Session, Signal Map, Monitors, Roll Tape, Relay, Credits) — correctly follows `site_architecture.nav` ✓
- **Homepage sections** follow `homepage_narrative.sections` with the five-section arc (console-rise → the-takes → craft → real-sessions → press-play) ✓
- **Page templates** follow `page_blueprints`: channel-strip-grid for features, monitor-wall for clients, console-section for download, session-notes for about ✓
- **Mascot** "Waveform" appears on Home, Features, Download (per `mascot.behavior.placement: "Home, Features, and Download pages only"`) ✓
- **VU pulse indicator** in nav ✓
- **Seasonal activation** runs live JS per `seasonal_activation.mode: "live-js"` ✓

**What's wrong:**

- **Hero headline uses kit's `tagline_primary`** — `index.html:82`: "Every Session. Perfectly Captured." is `soundwave-studio.js:101` `tagline_primary`, not `content.json` `hero.headline` which is "Your media. Your library. Your Phlix." The kit doesn't provide a `copy_overlay.hero` so the content.json headline must be used verbatim. Using the kit's tagline_primary as the hero headline is a `copy_overlay` substitution that wasn't declared.

- **Intensity toggle not from kit.** Per §1, this is an undeclared opt-in feature.

- **Footer tagline deviation.** Per §1, the " — engineered for the long take" suffix is unsanctioned.

---

## Fixes Required (Priority Order)

### P0 — Must fix before approval

1. **[SEO/Social] All `<title>`, `og:title`, `twitter:title`** — Replace "Soundwave Studio" prefix/suffix with "Phlix". Format: `<Page> — Phlix`. Home: `Phlix — Self-hosted media server`. All 9 HTML files.

2. **[SEO] `meta[name=description]` on index.html** — Replace brand kit description with `content.json` `meta.description`. Same for `og:description` and `twitter:description` on index.

3. **[A11y] VU amber contrast on small text** — `#FFB300` on `#141418` = 4.7:1 (fails 4.5:1 AA). Either lower the amber to ~`#CC8F00` (≈4.5:1) or reserve amber for large text/UI only (≥3:1).

4. **[A11y] CSS `prefers-reduced-motion` for mascot** — Add to `components.css:554`:
   ```css
   @media (prefers-reduced-motion: reduce) {
     .mascot__figure { animation: none; }
   }
   ```

5. **[A11y] FAQ invalid HTML** — `about.html`: wrap `<dt>`/`<dd>` pairs in `<dd class="faq-list__item">` not `<div class="faq-list__item">`. A `<div>` is not valid as a direct child of `<dl>`.

6. **[A11y] `nav-toggle` 44px touch target** — Increase padding or height to reach 44px minimum. `components.css:57–65`.

7. **[Content] Hero subheadline** — Restore `content.json` `hero.subheadline` verbatim. Current version is unsanctioned brand-story fusion.

8. **[Content] Install code-block label** — `download.html:90`: change `.code-block__label` text from the raw command to `"One line, on a fresh Ubuntu or Debian host"` (from `content.json` `install.primary.label`).

9. **[Content] Proof signal "4 native clients"** — Replace with a verifiable statement. The content.json has 5 clients total (4 native + DLNA). Either "4 native clients + any DLNA device" or link to clients page rather than a static number.

### P1 — Should fix

10. **[Brand] Logo wordmark** — `img/logo.svg` and `nav-logo__text` should say "Phlix", not "Soundwave Studio". Verify against kit's `logo_rules` which say "waveform glyph or oscilloscope 'S' curve" but the product name must be Phlix per new_site.md §5.

11. **[Brand] Footer tagline** — Restore `content.json` `footer.tagline` verbatim: "Open-source media, on your terms." Remove the "— engineered for the long take" suffix.

12. **[Brand] Hero headline** — Use `content.json` `hero.headline` ("Your media. Your library. Your Phlix.") or, if the kit's `tagline_primary` is intended as a presentation overlay, document it in `copy_overlay.hero.headline`.

13. **[Brand] Intensity toggle** — Either remove (if kit doesn't declare `intensity_toggle`) or document it as implemented.

14. **[A11y] Vestibular animation** — `.mascot__figure` animation (rotate ±2deg) should be gated by `prefers-reduced-motion` in CSS in addition to JS, per WCAG 2.3.3.

15. **[Content] Download CTA text** — "Press record." is kit-voice but not declared in `copy_overlay` or `conversion_funnel`. Either document as approved or replace with kit's `tagline_secondary[]` values which include "Roll tape." as an approved secondary tagline.

### Notes

- `npm run lint` passes cleanly for this kit (the one HTML error is in `midnight-jazz`, not this site).
- No `@copyright` parse errors in CSS (verified no bare ` * @` at line start outside blocks).
- `sitemap.xml` includes all 9 pages (index, about, clients, docs, download, features, hub, plugins, 404 excluded as `noindex`) ✓
- `robots.txt` references sitemap correctly ✓
- JSON-LD on index has correct `SoftwareApplication` schema with `price: "0"`, `priceCurrency: "USD"`, `license` URL ✓
- `manifest.webmanifest` exists (PWA manifest, good) — not audited in detail but present.
