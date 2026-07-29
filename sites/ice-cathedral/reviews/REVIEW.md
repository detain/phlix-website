# REVIEW — Ice Cathedral Brand Kit Site

**Reviewer:** hostile auditor (all 13 dimensions)
**Ground truth:** `shared/content.json`, `new_site.md`, `REGEN_PLAN.md`, `SITE.md`
**Lint:** `npm run lint` — PASS
**selfcheck:** PASS (11.5 KB JS, 10 @font-face, 5/5 narrative sections, all 71 color pairs ≥4.5:1)
**check-meta:** PASS (no ice-cathedral issues across 417 global problems)

---

## 1. Brand Fidelity & Spirit — 91/100 ⚠️

**Evidence:**
- Polar gothic palette exactly as declared: `#04101c` polar night, `#a8d8ff` crystal ice blue, `#eef5ff` arctic white — all in `:root` as CSS custom properties. No off-palette hexes.
- Cinzel (headline), Josefin Sans (display/UI), Libre Baskerville (body), JetBrains Mono (mono) — all declared in SITE.md and self-hosted in `base.css:8-86`. All weights match the declared pool.
- Cinzel tracking `0.08em+` on all headings, matching the "carved inscription" spec (`theme.css:17`).
- Gothic lattice SVG pattern on hero (`index.html:172-199`), crystal SVG mascot (`index.html:608-640`), rose-window geometric CSS on 404 crevasse, frost dividers, hexagonal logo mark.
- Seasonal JS date-gate with all 3 variants (midwinter/aurora/icehotel) in `components.css:611-626` + `main.js:105-133`.
- Nav labels use kit's cathedral chamber names: Cathedral Entrance, Vaulted Chambers, Windows & Apertures, Cross the Threshold, The Relay Chamber, The Archive — all correct per `REGEN_PLAN.md §2`.
- Proof section on home ("The Foundation") uses architecture/GitHub/license signals with no fabricated counts — link to live `/stargazers` as instructed.

**Deductions:**
- `features.html:369` says "Five native clients." The 6-item nav omits Plugins and Docs (correctly demoted per kit), but the phrase "Five native clients" in the copy is ambiguous — content.json says "four native clients plus any DLNA device." The kit's own copy_overlay or feature_casting does not override this. It is not factually wrong per se (four native + DLNA = five possible access paths), but the phrasing "Five native clients" is imprecise and could mislead.
- `base.css:196` uses `overflow-wrap: break-word` on body text (`p, li, dd, code`) instead of `anywhere` as required by new_site.md §19.12. In a 164px column at 200% text zoom, long code tokens in pitch bullets (`LifecycleInterface` in hover text) may overflow. Selfcheck passed because the tool doesn't simulate 200% zoom on specific narrow columns. This is a latent defect.

---

## 2. SEO — 95/100 ⚠️

**Evidence:**
- Every page has `<title>` ≤ 60 chars: "Ice Cathedral — Phlix" (25), "Vaulted Chambers — Phlix" (27), "Windows & Apertures — Phlix" (32), "Cross the Threshold — Phlix" (32), "The Relay Chamber — Phlix" (30), "The Archive — Phlix" (24), "Extensions — Phlix" (20), "Documentation — Phlix" (25), "404 — Passage not found — Phlix Ice Cathedral" (53).
- Every page has unique `<meta name="description">` (≤160 chars), `<link rel="canonical">` (absolute), semantic `<h1>` (one per page), no skipped heading levels, landmark roles (`banner`, `navigation`, `main`, `contentinfo`) once each.
- `sitemap.xml` lists all 8 canonical pages with absolute URLs. `robots.txt` references it correctly.
- Home has JSON-LD `SoftwareApplication` block with name, `applicationCategory`, `operatingSystem` ("PHP 8.3+"), description, license URL, `price=0` (`index.html:54-65`).
- Descriptive anchor text throughout ("View repository", "Read the full licence", "Browse the example plugin") — no "click here".

**Deductions:**
- `sitemap.xml` has no `<lastmod>` dates. new_site.md §10 calls this out explicitly. Not flagged by tooling but is a known gap.

---

## 3. Readability — 94/100 ⚠️

**Evidence:**
- 1.7 line-height on body, 1.75 on larger body text, generous section padding (96px), tight card padding (16-24px).
- Pitch bullets, feature details, and FAQ all use the body face (Libre Baskerville) at 0.875-1rem with adequate contrast.
- Seasonal banner text is italic headword — appropriate for its aside role.
- FAQ uses semantic `<dl>` with `<dt>/<dd>` pairs. `REGEN_PLAN.md §5` ambiguity on FAQ ordering was resolved (order matches content.json, extra questions appended at 85% opacity as "archive ledger" treatment).

**Deductions:**
- `about.html:365-374, 385-393` — Two extra FAQ questions have answers that don't match their questions. "Can I run this from a closet or a basement?" gets the Hub/NAT answer. "Will old televisions work?" gets the FFmpeg formats answer. This is a logical mismatch that hurts readability and factual integrity. See dimension 9 (Content Accuracy).

---

## 4. Spelling & Grammar — 97/100 ⚠️

**Evidence:**
- No forbidden words from REGEN_PLAN.md §7 (cozy, warm, fun, friendly, exciting, awesome, amazing, robust, synergy, leverage, utilize, pop, bounce, vibrant) — verified absent.
- Grammar is clean: no run-on sentences in body prose, apostrophes correct (don't → does not), em dashes used appropriately.
- The "Five windows. Five billion devices." CTA on `download.html:661` is a sentence fragment — intentional rhetorical device in the cathedral voice, not a grammatical error.

**Deductions:**
- `about.html:511` uses "Licence" (British spelling) while `content.json` FAQ uses "license" (American). The footer uses "License (MPL-2.0)" in American spelling. Inconsistency within the same page cluster.

---

## 5. Usability — 93/100 ⚠️

**Evidence:**
- Primary CTA above fold on all pages with ≥3:1 contrast. Primary button `.btn--primary` = `#a8d8ff` on `#04101c` = 12.71:1.
- Mobile hamburger nav works with `aria-expanded`, Escape key closes, outside click closes, focus returns to toggle on close.
- 3-step CTA ladder on home threshold section: Cross the threshold → Choose your window → Light the forge, each with correct href targets.
- Seasonal banner (when JS is active) is dismissible via its nature; no close button but is not intrusive.
- 44px minimum touch targets on all buttons (`components.css:238-239`).

**Deductions:**
- `download.html:661`: "Five windows. Five billion devices." — the "Five billion" figure is not from content.json and has no known source. Could set user expectation incorrectly.
- `seasonal-banner` on `404.html` uses `display: none` then `display: block` when `.seasonal-active` is added — but the banner's JS only runs when the seasonal date gate fires; if no season is active, the banner remains `display: none` always (correct behavior). However, if JS is disabled, the banner is permanently hidden. This is fine but means the seasonal message is JS-dependent.

---

## 6. Accessibility (WCAG 2.2 AA, `prefers-reduced-motion`, 44px targets, 200% zoom) — 89/100 ❌

**Evidence:**
- Skip link first focusable element, visible on focus with crystal blue styling (`base.css:231-261`).
- `:focus-visible` ring uses `--color-focus: #a8d8ff` with both outline and box-shadow (`base.css:264-268`).
- All images have meaningful `alt=""` (decorative) or `alt="..."` (meaningful). SVG icons have `aria-hidden="true"`.
- `prefers-reduced-motion: reduce` disables transitions globally in `base.css:271-279` and also in `theme.css:580-587`, `components.css:745-757`. The mascot companion rotation (`crystal-rotate` 24s) is additionally suppressed by `mascot-companion--reduced-motion` class via JS (`main.js:78-90`).
- `overflow-wrap: break-word` on headings (`base.css:207`) — NOT `anywhere`. This means headings with very long words in narrow columns (e.g., at 200% text zoom in a footer column ~130px wide) may overflow. See new_site.md §19.12 — this was a known defect in 50 first-pass sites.
- `components.css:745-757` uses `@media (prefers-reduced-motion: reduce)` with `transition: none` for a list of components — but the list does NOT include `.aperture-card` (the clip-path shaped client cards on `clients.html`). With reduced-motion, clip-path is set to `none` but only via the inline `<style>` block in `clients.html:152-157`. This is inconsistent with the global components.css approach.
- Touch targets: `.btn` at 44×44px minimum (`components.css:238-239`). Nav toggle at 44×44px (`components.css:61-62`). All good.

**Deductions:**
- `overflow-wrap: break-word` on body text (`code`, `dd`, `p`, etc.) instead of `anywhere` per new_site.md §19.12 — **known trap that causes overflow failures in render-check at 200% text zoom**. Selfcheck did not catch this because it does not simulate browser rendering. This is a **likely render failure** at 200% zoom on narrow viewports. Score: 89.

---

## 7. Responsive (320→1920) — 93/100 ⚠️

**Evidence:**
- Fluid typography via `clamp()` throughout: `h1` → `clamp(2rem, 5vw, 3.5rem)`, hero headline → `clamp(2.5rem, 6vw, 4.5rem)`.
- Grid uses `minmax(min(100%, Npx), 1fr)` pattern throughout — all 8 grids checked (pitch list, features-overview grid, content-grid, client-cards, download-cards, footer nav, FAQ list). This is the correct `minmax(0, 1fr)` substitution per new_site.md §19.12.
- Mobile nav slides in from left at ≤900px with `position: fixed` and `inset: 64px 0 0`.
- Mascot shifts from `position: fixed` bottom-right (desktop) to in-flow above footer (mobile ≤768px) via `components.css:512-523`.
- `@media (width <= 768px)` reduces container padding from 32px to 24px to 16px at each breakpoint.
- No fixed-px layout widths. Max content width is `var(--max-width)` = 1400px, fluid.

**Deductions:**
- `base.css:196` — `overflow-wrap: break-word` on body text (code, dd, p) instead of `anywhere` is a responsive/zoom risk. See dimension 6.

---

## 8. Performance (self-hosted fonts, no CDNs) — 100/100 ✅

**Evidence:**
- No Google Fonts CDN links anywhere. No `fonts.googleapis.com`, no `fonts.gstatic.com`.
- All fonts via `@font-face` pointing to `../../assets/fonts/*.woff2` — all 10 @font-face rules present and referencing existing files (selfcheck confirmed).
- `font-display: swap` on all faces.
- JS is `defer`-loaded on every page. No render-blocking scripts.
- CSS is loaded in order: base → theme → components.
- Images: logo SVG inline, mascot SVG inline, hero SVG lattice inline, hub relay diagram inline. No external image requests.
- OG image: `img/og.png` (108KB) exists and is referenced as absolute URL in all pages.

---

## 9. Content Accuracy (install from content.json) — 86/100 ❌

**Evidence:**
- Install command verbatim from `content.json.install.primary.command`: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash` — correct, one line, correct URL.
- Install `what_it_does` and `notes` paragraphs derived accurately from content.json at `download.html:175-211`.
- `from_source` block on `download.html:318-322` is correctly labeled "Build from source (development, not an install)" — matches `content.json.install.from_source.label`.
- All 8 features appear on features.html and home page in correct order per `feature_casting.hero` (library/syncplay) + `support` (transcode/auth/hub/livetv) + `footnote` (dlna/plugins) tiering.
- All 5 clients on `clients.html` with correct `highlights[]`, `repo` links, `status` badges.
- All 5 ecosystem repos on `download.html` and `docs.html` with correct `what` descriptions.
- License info: Server= MPL-2.0, Hub= MPL-2.0, shared libs/plugins/clients= MIT — matches content.json FAQ answer verbatim. No "across the board" license claim.
- FAQ answers verbatim from content.json on all 6 canonical questions.

**Deductions:**
- `download.html:661` CTA banner: "Five windows. Five billion devices." — "Five billion" is not in content.json and is a fabricated claim. new_site.md §16 prohibits inventing numbers. This is a hard content accuracy failure. Score: 86.
- `about.html:365-374`: Extra FAQ question "Can I run this from a closet or a basement?" maps to the answer about Hub reverse-tunnel relay. That answer does not address the question of physical installation space. This violates faq_experience.extra_questions contract (extra questions must map to existing canonical answers — the answer should actually respond to the question). Score: 86.
- `about.html:385-393`: Extra FAQ question "Will old televisions work with this?" maps to FFmpeg/formats answer. Again, doesn't answer the question. Score: 86.

---

## 10. CTA / Funnel — 94/100 ⚠️

**Evidence:**
- Home hero has primary CTA "Cross the threshold" → `download.html`, secondary CTA "Read the philosophy" → `about.html`. Both above fold.
- 3-step CTA ladder on home threshold section with exact kit labels: "Cross the threshold" (→ download), "Choose your window" (→ clients), "Light the forge" (→ download.html#server). Per REGEN_PLAN.md §5 cta_ladder mapping.
- Every page ends in a `.cta-banner` driving to download (or docs on download page).
- Download page has step-by-step install journey: Light the Forge → Choose Your Window → Enter the Library — all with correct href anchors.
- Primary CTA button color contrast: 12.71:1 (AAA).

**Deductions:**
- `download.html:661` — "Five windows. Five billion devices." is an invented figure in the CTA context. While the 3-step funnel architecture is correct, this phrase is a fabrication.

---

## 11. Social Metadata (OG + Twitter, og:image PNG) — 100/100 ✅

**Evidence:**
- Every page has `og:type=website`, `og:site_name=Phlix`, `og:url` (absolute), `og:title`, `og:description`, `og:image` (absolute URL to `https://detain.github.io/phlix-website/ice-cathedral/img/og.png`).
- Every page has `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image` (same absolute URL), `twitter:creator=@detain`.
- `og.png` exists at `img/og.png` (108KB) and is the rasterized version of `og.svg`.
- `theme-color` = `#A8D8FF` on all pages.
- Favicon link: `type="image/svg+xml"` referencing `img/favicon.svg`.

---

## 12. Localization — 95/100 ⚠️

**Evidence:**
- `<html lang="en">` set on all pages.
- All user-facing strings traceable to content.json (footer columns, hero copy, feature bodies, FAQ answers, install commands, ecosystem descriptions).
- Logical CSS properties used throughout (`margin-inline`, `inset`, etc.) — RTL-compatible.
- Font subset: all `@font-face` declarations include `latin` subset only (appropriate for `en`).

**Deductions:**
- `content.json` only has `en` in `supported_locales: ["en"]`. No i18n infrastructure. For a single-locale site this is correct, but the absence of any i18n readiness (no `data-i18n` attributes, no translation mechanism) means full localization would require a rebuild.

---

## 13. Experience Fidelity — 95/100 ⚠️

**Evidence:**
- Ice Cathedral concept fully realized: polar gothic dark palette, crystalline iconography, gothic arch motifs, cathedral chamber naming throughout, glacial prose voice.
- Crystal mascot companion: geometric hexagon SVG with 24s rotation, dismiss button with localStorage persistence, section-aware tips, hover-hold easter interaction, logo-clicks:9 rose-window effect.
- Seasonal JS date-gate: 3 variants (midwinter Dec 18–Jan 5, aurora Sep 15–Oct 15, ice hotel Dec 1–17) with CSS variable overrides and seasonal banner.
- Easter eggs: logo-clicks:9 → rose-window refraction (correctly disabled in inputs via `isInputFocus()` check, exits on Esc); typed-word:cathedral → lattice overlay (same safeguards).
- `prefers-reduced-motion` respected across all animation layers: global CSS reset, mascot companion class, inline `<style>` clip-path fallback on `clients.html`.
- 404.html crevasse concept with crystal resting at edge — matches `error_page_experience.concept = crevasse`.
- No Google Fonts CDN. No external CDNs of any kind.
- `img/PROMPTS.md` exists with generation prompts.

**Deductions:**
- The `overflow-wrap: break-word` on body text (base.css:196) means some decorative prose in narrow card columns may overflow at 200% zoom — diminishes the cathedral's polished feel in edge cases.
- Seasonal banner `<p>` element has `font-style: italic` but the text "The season has changed. The ice cathedral shifts." is too generic — it appears on every page and is the same regardless of which season is active. This isn't a defect per se but lacks seasonal specificity.

---

## Fixes Needed

### ❌ Hard failures (must fix before approval)

1. **`download.html:661`** — Remove or replace "Five billion devices." with a verifiable claim. Content.json has no device count. Suggested fix: "Every screen you own." or "Every screen, in every room."

2. **`about.html:365-374`** — "Can I run this from a closet or a basement?" extra FAQ question: the answer (Hub/NAT relay) does not address the question. Either remove this extra question, or map it to a canonical question it actually answers (e.g., DLNA, which addresses old hardware). Per faq_experience.extra_questions contract: extra questions must **map to** existing canonical answers, not just any answer.

3. **`about.html:385-393`** — "Will old televisions work with this?" extra FAQ question: the answer (FFmpeg formats) does not address this question. Same issue as above. Map to DLNA answer or remove.

### ⚠️ Warnings (should fix)

4. **`base.css:196`** — Change `overflow-wrap: break-word` to `overflow-wrap: anywhere` on `p, li, dt, dd, a, span, code, kbd, samp, pre`. Per new_site.md §19.12, `break-word` does not reduce min-content contribution in grid tracks. Risk of overflow at 200% text zoom in narrow columns (render-check would surface this).

5. **`base.css:207`** — Headings already have `hyphens: auto` + `overflow-wrap: break-word`. Keep `break-word` for headings (correct per §19.12), but the body text set (line 196) should use `anywhere`.

6. **`sitemap.xml`** — Add `<lastmod>` dates to each `<url>`. Not flagged by tooling but expected per new_site.md §10.

7. **`about.html:511`** — Inconsistent spelling: "Licence" (British) vs the rest of the site (American "License"). Pick one and be consistent. Footer uses "License (MPL-2.0)" in American spelling.

---

## Scorecard Summary

| Dimension | Score | Status |
|-----------|-------|--------|
| 1. Brand fidelity & spirit | 91 | ⚠️ |
| 2. SEO | 95 | ⚠️ |
| 3. Readability | 94 | ⚠️ |
| 4. Spelling & grammar | 97 | ⚠️ |
| 5. Usability | 93 | ⚠️ |
| 6. Accessibility | 89 | ❌ |
| 7. Responsive | 93 | ⚠️ |
| 8. Performance | 100 | ✅ |
| 9. Content accuracy | 86 | ❌ |
| 10. CTA / Funnel | 94 | ⚠️ |
| 11. Social metadata | 100 | ✅ |
| 12. Localization | 95 | ⚠️ |
| 13. Experience fidelity | 95 | ⚠️ |

**Average:** 93.3 | **❌ Count:** 2 | **⚠️ Count:** 11 | **✅ Count:** 2

---

## Decision

**NOT APPROVED.** Two hard ❌ failures and four ⚠️ warnings.

The site is genuinely beautiful and the brand execution is strong — the polar gothic concept is coherent and the technical execution (no CDN, self-hosted fonts, selfcheck pass) is largely sound. But content accuracy is a hard gate: invented claims and logically mismatched FAQ answers are defects in the facts layer, which the spec protects absolutely.

Fix the 3 content accuracy issues (items 1–3) and the overflow-wrap body text (item 4) and this site will clear 90 across the board.
