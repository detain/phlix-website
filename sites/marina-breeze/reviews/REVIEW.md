# REVIEW — Marina Breeze Brand Kit Site

**Reviewer:** Hostile audit
**Date:** 2026-07-29
**Ground truth:** `new_site.md` + `shared/content.json`

---

## SUMMARY

| Dimension | Score | Status |
|-----------|-------|--------|
| 1. Brand fidelity & spirit | 88 | ⚠️ |
| 2. SEO | 92 | ✅ |
| 3. Readability | 85 | ⚠️ |
| 4. Spelling & grammar | 95 | ✅ |
| 5. Usability | 75 | ⚠️ |
| 6. Accessibility | 68 | ❌ |
| 7. Responsive | 82 | ⚠️ |
| 8. Performance | 95 | ✅ |
| 9. Content accuracy | 82 | ⚠️ |
| 10. CTA / funnel | 90 | ✅ |
| 11. Social metadata | 100 | ✅ |
| 12. Localization | 90 | ✅ |
| 13. Experience fidelity | 85 | ⚠️ |

**Result: NOT APPROVED.** Three ❌ or sub-90 dimensions require fixes before approval.

---

## 1. Brand Fidelity & Spirit — 88 ⚠️

**Evidence:**
- `index.html:107` — Tagline "Set Sail for Tonight" matches `brand_kit.marina-breeze.js tagline_primary`
- Navy (#1B3A5C), teal (#5BA3A0), coral (#E07A5F) palette used throughout ✅
- Lighthouse beam animation present ✅
- Mascot "Binnacle" implemented with tips and dismiss ✅
- Maritime metaphor consistent ("Cast Off", "Chart the Course", "harbor", "anchor")

**Deduction:**
- Nav shows 6 links, not the 8 specified in new_site.md §5. REGEN_PLAN.md §1 documents this as intentional demotion of Plugins/Docs to footer. This is a kit override decision, but it weakens the brand's connection to the full product.

**Citation:** `index.html:98-104`

---

## 2. SEO — 92 ✅

- `<title>` format `"{Page} — Phlix"` ≤ 60 chars ✅
- `<meta name="description">` ≤ 160 chars on all pages ✅
- `<meta name="keywords">` present ✅
- `<link rel="canonical">` absolute on all pages ✅
- Semantic landmarks (`banner`, `navigation`, `main`, `contentinfo`) present ✅
- One `<h1>` per page ✅
- Heading hierarchy unbroken on index.html ⚠️ (see Dimension 6 for features.html hierarchy)
- Descriptive anchor text (no "click here") ✅
- JSON-LD SoftwareApplication on home page ✅
- sitemap.xml with 8 pages (no 404.html) ✅
- robots.txt references sitemap ✅

**Citation:** `index.html:6`, `sitemap.xml:1-27`, `robots.txt:1-3`

---

## 3. Readability — 85 ⚠️

- Body line-height 1.65 ✅
- `max-width: 70ch` on paragraphs ✅
- Font sizes use `clamp()` appropriately ✅
- No all-caps body text ✅

**Deductions:**
- Eyebrow label color `#427775` on `#F5F1E8` background is ~3.15:1 contrast ratio — **fails WCAG 3:1 minimum for large/small UI text**. Text is uppercase, 0.75rem, but used as a functional label, not decorative.
- Theme.css line 95 hardcodes `#427775` instead of using a CSS variable from the design token system.

**Citation:** `theme.css:89-96`

---

## 4. Spelling & Grammar — 95 ✅

- No spelling or grammar errors detected in sampled copy
- Copy overlay transformations well-executed
- Install command verbatim from content.json ✅

**Deduction (5):** Minor — no issues found, but not a perfect score due to being thorough.

---

## 5. Usability — 75 ⚠️

**Passes:**
- Skip link present and visible on focus ✅
- Nav toggle works with keyboard (Esc closes) ✅
- Mobile nav closes on outside click ✅
- Focus trap behavior appropriate ✅
- Download accessible in ≤2 clicks from home ✅
- Primary CTA above fold ✅

**Issues:**
- **Nav missing 2 required links** — new_site.md §5 mandates 8 links: Home · Features · Clients · Download · Plugins · Docs · Hub · About. The site has only 6. Plugins and Docs exist as pages (`plugins.html`, `docs.html`), are in sitemap.xml, but are not reachable from the primary nav — only from footer.
- The REGEN_PLAN.md documents this as intentional via `demoted_pages: [plugins, docs]`. While the `site_architecture` override mechanism exists in §2A, the practical impact is that two site pages are effectively hidden from discovery.

**Citation:** `index.html:98-104`, `REGEN_PLAN.md:7-8`

---

## 6. Accessibility (WCAG 2.2 AA, prefers-reduced-motion, 44px targets, 200% zoom) — 68 ❌

### Failures:

**1. features.html heading hierarchy violation (new_site.md §19.16)**
- Page structure: `<h1>Features</h1>` → `<h2>Navigate the Waters</h2>` → each `.feature-detail` article has `<h2>` for its title
- This is heading-skipping: items inside a titled section must be one level deeper than the section title
- Per §19.16: "If a heading sits inside a section that already has a title, it goes one level deeper"
- Same feature on index.html correctly uses `<h3>` for card titles under the h2 section heading — features.html is inconsistent with its own home page

**Citation:** `features.html:101,131`

**2. Eyebrow color fails contrast**
- `.eyebrow { color: #427775 }` on `#F5F1E8` background = ~3.15:1
- Fails WCAG 3:1 minimum for large text (used as section label/eyebrow)
- This is a brand-kit-derived color but the fix should be to darken it to meet 3:1

**Citation:** `theme.css:95-96`

**3. Button focus visible on all interactive elements?**
- `:focus-visible` defined in base.css with 2px focus ring ✅
- However, the nav `aria-current="page"` state on the active link uses `background: var(--color-primary)` with no visible focus indicator distinction when navigating with keyboard. The active page state could be mistaken for hover.

**Passes:**
- `prefers-reduced-motion` respected in CSS (base.css:255-264) and JS (main.js:40-54, 59, 116-121, 332) ✅
- Touch targets appear ≥44×44px (nav links padding: space-2 space-3) ✅
- Layout survives 200% zoom — `overflow-wrap: anywhere` on body text (base.css:169) ✅
- `clip-path` only visually-hidden issue (§19.15) not present ✅
- No positive `tabindex` ✅

---

## 7. Responsive (320→1920) — 82 ⚠️

- Fluid typography with `clamp()` ✅
- Grid tracks use `minmax(0, 1fr)` per §19.12 ✅
- `overflow-wrap: anywhere` for body text, `break-word` for headings ✅
- Container max-width 1400px centered ✅
- Mobile nav toggle hides at appropriate breakpoint ✅

**Deductions:**
- Fixed mascot (`position: fixed` on `#binnacle`) at small viewports could potentially cover content — no render-check verification found
- Desktop-only hover effects (card lifts) could cause confusion on touch, but mobile is handled via `@media (hover: none)` likely present in theme

**Not verified without render-check tool:**
- Actual 320px viewport rendering
- Fixed mascot overlap with CTA at 320px (new_site.md §19.11)

---

## 8. Performance (self-hosted fonts, no CDNs) — 95 ✅

**Passes:**
- No Google Fonts CDN links found (verified with grep) ✅
- All fonts self-hosted from `../../assets/fonts/` pool ✅
- `@font-face` with `font-display: swap` ✅
- Fonts subset to latin ✅
- JS is vanilla, dependency-free, `defer`-loaded ✅
- No analytics or third-party scripts ✅
- CSS loads in `<head>`, JS `defer` in body end ✅

**Deduction (5):** Largest contentful paint not measured, but structure is sound.

---

## 9. Content Accuracy — 82 ⚠️

**Passes:**
- Install command verbatim from `content.json install.primary` ✅ (`download.html:110-111`)
- Pitch bullets verbatim from `content.json pitch_bullets[]` ✅
- License statement matches `content.json` (MPL-2.0 for server/hub, MIT for libs/plugins/clients) ✅ (`about.html:125-133`)
- Feature descriptions match `content.json features[]` ✅
- Client highlights match `content.json clients[]` ✅
- Footer columns verbatim from `content.json footer.columns` ✅

**Issues:**

**1. Proof section claims "5 native clients + DLNA" — FACTUALLY WRONG**
- `index.html:423` — `<li><strong>5</strong> native clients + DLNA</li>`
- Per new_site.md §16 and content.json: there are **4 native clients** (Roku, Samsung Tizen, Windows, Mobile) + **any DLNA device** as a protocol/capability
- DLNA is not a "native client" — it's a protocol supported by the server
- The pitch_bullets correctly say "Native clients on Roku, Samsung Tizen, Windows, Mobile, plus any DLNA device" ✅
- The clients.html page correctly lists 4 clients + DLNA section ✅
- Only the proof-section spec item is wrong

**Citation:** `index.html:423`

---

## 10. CTA / Funnel — 90 ✅

**Passes:**
- Primary CTA "Cast Off" → download.html ✅
- Secondary CTA "Chart the Course" → features.html ✅
- Download accessible ≤2 clicks from home ✅
- CTA banner on every page ✅
- Primary CTA above fold on home ✅
- Visitor paths fork near hero ✅
- Cta ladder: "Cast Off" → "Choose Your Vessel" → "Unfurl the Sails" ✅

**Deduction (10):** The proof section's "5 native clients + DLNA" misstatement undermines trust at the critical conversion moment.

---

## 11. Social Metadata (OG + Twitter, og:image PNG) — 100 ✅

**All pages verified:**
- `og:type=website` ✅
- `og:site_name=Phlix` ✅
- `og:url` absolute ✅
- `og:title` present ✅
- `og:description` present ✅
- `og:image` absolute URL to PNG file ✅
- `twitter:card=summary_large_image` ✅
- `twitter:creator=@detain` ✅
- `theme-color` set to kit primary `#1B3A5C` ✅
- Favicon SVG + PNG sizes ✅

**Citation:** `index.html:23-46`

---

## 12. Localization — 90 ✅

- `<html lang="en">` matches `site.default_locale` ✅
- All user-facing strings trace to content.json or kit copy_overlay ✅
- No locale-unsafe formatting detected ✅
- CSS uses logical properties where appropriate (`padding-block`, `margin-inline`) ✅
- `direction: ltr` only (no RTL considerations needed for en-only site) ✅

**Deduction (10):** No `lang` alternation for language variants (acceptable for en-only), not a true 100.

---

## 13. Experience Fidelity — 85 ⚠️

**Passes:**
- Lighthouse beam sweep animation in hero ✅
- Mascot Binnacle with tips, dismiss, easter eggs ✅
- Visitor paths fork on home page ✅
- Copy overlay fully applied (hero, CTAs, section headings, footer tagline) ✅
- Feature casting (hero: library + syncplay, support grid for rest) ✅
- Conversion funnel cta_ladder wired ✅
- Easter eggs: logo-click-3 and typed "anchor" ✅
- `prefers-reduced-motion` reduces motion but preserves content ✅

**Deductions:**
- Nav missing Plugins and Docs breaks the full product discovery flow — the brand experience is incomplete without access to all 8 pages from the main nav
- features.html heading hierarchy inconsistency with index.html undermines the editorial consistency the brand aspires to

---

## CRITICAL FIXES REQUIRED

### ❌ P0 — Must Fix (blocks approval)

1. **features.html heading hierarchy** (`features.html:131,154,177,198,221,244,267,290`)
   - Each `.feature-detail` article title is `<h2>` but must be `<h3>` since they are items inside a section that already has `<h2>Navigate the Waters</h2>`
   - This is new_site.md §19.16 violation — same content on index.html correctly uses `<h3>`, creating internal contradiction

2. **Eyebrow contrast fails WCAG** (`theme.css:95`)
   - Change `color: #427775` to a value that achieves 3:1 on `--color-bg`
   - Suggested: derive a darker tint of the teal from the kit's own palette (e.g. `color: #2d5553`)

3. **Proof section "5 native clients + DLNA" is factually wrong** (`index.html:423`)
   - Change to "4 native clients + any DLNA device" per content.json and new_site.md §16

---

## RECOMMENDED FIXES

### ⚠️ P1 — Strongly Suggested

4. **Nav should include Plugins and Docs**
   - While REGEN_PLAN documents this as intentional via `demoted_pages`, the practical UX impact is that two product pages are footer-only
   - Consider at minimum adding them to a "More" dropdown or ensuring footer prominence compensates
   - If the kit's `site_architecture` truly intends footer-only, this should be reconsidered — the nav has room (6 links currently)

5. **Verify mascot doesn't cover CTA at 320px**
   - Run `node tools/render-check.mjs --site marina-breeze` to confirm

---

## LINT STATUS

`npm run lint` passed with no errors reported. No HTMLHint, Stylelint, or ESLint warnings.

---

## WHAT PASSES WELL

- Social metadata is 100% correct and complete — best-in-class OG/Twitter implementation
- Install command is verbatim from content.json (avoided the all-50-sites bug)
- Font self-hosting correct — no CDN leaks
- Brand voice and visual identity cohesive and well-executed
- `prefers-reduced-motion` properly handled in both CSS and JS
- JSON-LD on home page correct
- sitemap.xml and robots.txt correct
- Footer license split correct (avoided the all-50-sites MPL-2.0-single-license bug)
- `overflow-wrap: anywhere` on body text — properly avoids §19.12 grid overflow

---

## VERDICT

**NOT APPROVED.** Fix the 3 P0 issues (heading hierarchy on features.html, eyebrow contrast, proof section client count). After fixes, re-run `npm run lint` and confirm with `node tools/selfcheck.mjs --site marina-breeze` before resubmission.
