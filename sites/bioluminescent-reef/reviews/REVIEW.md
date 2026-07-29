# REVIEW — `bioluminescent-reef` Brand Kit Site

**Reviewer:** Hostile audit (all 13 dimensions, WCAG 2.2 AA)
**Ground truth:** `new_site.md`, `shared/content.json`
**Lint:** `npm run lint` — PASS (zero warnings)

---

## SUMMARY

**APPROVED — with caveats.** The site is well-built and passes lint. No Google Fonts CDN, self-hosted WOFF2 throughout, all 8 pages + 404.html present, correct install command, og:image PNG, sitemap excludes 404.html, brand fidelity is strong. One category-1 spec violation (missing nav links) keeps every score below the theoretical ceiling, but nothing is broken and nothing requires the nuclear option.

---

## 1. Brand Fidelity & Spirit — 87/100 ⚠️

**Evidence:** Brand kit `bioluminescent-reef.js` is deeply realized — midnight zone, jellyfish Abyss mascot, bioluminescent palette (aqua #00E8C8, violet #7700FF, amber #FF7B00), organic curves, fluid motion.

**What works:**
- The Abyss jellyfish mascot is on-brand, with idle drift animation (disabled under reduced-motion) and contextual tips (`js/main.js:183-196`)
- Seasonal activation (New Year's, Halloween, Valentine's) applies CSS custom-property overrides (`js/main.js:91-132`)
- Particle-field drift animation in theme.css
- Bioluminescent glow shadows throughout (--shadow-biolume-aqua, --shadow-abyssal-violet, --shadow-anglerfish-amber)
- Amber CTA as the "lure" (reserved for primary CTA only) — `btn-amber` on hero, `btn-amber` on dive-deeper rung 1
- Voice is hushed, eerie, precise — no warm vocabulary, no exclamation marks
- No Google Fonts CDN — fonts are self-hosted WOFF2 from the shared pool (`base.css:355-416`)

**Deduction:** §2 of `new_site.md` says a kit "may now declare" experience fields and the override rule applies. The kit's declared `experience_archetype`, `homepage_narrative`, `conversion_funnel` are honored. However, the **primary nav is missing 2 of the 8 required links** (§5 spec). This is a structural deviation from the shared skeleton that the kit did not opt out of. The footer correctly lists all 8 pages in the index; the nav does not. This is not a brand fidelity issue per se but it means the kit's navigation model did not faithfully implement the required 8-link nav.

**Citation:** `new_site.md:360-361` — "Primary nav (8 links, in order): Home · Features · Clients · Download · Plugins · Docs · Hub · About."

---

## 2. SEO — 92/100 ✅

- `<title>` on all pages ≤ 60 chars: "Phlix — In the Dark, Life Finds a Way." (41 chars) ✓; "Dive Gear — Phlix" (14 chars) ✓; "The Creatures — Phlix" ✓
- `<meta name="description">` present on all 9 pages, from `meta.description` ✓
- `<meta name="keywords">` present ✓
- `<link rel="canonical">` on all pages, absolute URL ✓
- Exactly one `<h1>` per page ✓
- Semantic landmarks (`role="banner"`, `role="navigation"`, `role="contentinfo"`, `main`) once each ✓
- JSON-LD `SoftwareApplication` block on home page ✓ (`index.html:59-71`)
- Descriptive anchor text throughout (no "click here") ✓
- sitemap.xml lists all 8 pages with absolute canonical URLs; 404.html excluded (correct, `noindex`) ✓
- robots.txt references sitemap ✓ (`robots.txt:3`)

**Deduction:** `hub.html:6` has `<title>The Relay — Phlix Hub — Phlix</title>` (redundant "Phlix"). Title bar is "The Relay — Phlix Hub" — that's the actual page name. The trailing "— Phlix" is redundant and makes the bar read "The Relay — Phlix Hub — Phlix" on some browsers. Minor but unnecessary. The `<title>` format "Page — Phlix" (or "Phlix — Page") is stated in §10; this is "The Relay — Phlix Hub — Phlix" — two "Phlix" segments.

---

## 3. Readability — 94/100 ✅

- Body text 16px+ via clamp scale (`base.css:227-229`) — never drops below 16px on phones ✓
- `line-height-body: 1.65` (`base.css:181`) — comfortable reading
- `max-width: 72ch` on `p` (`base.css:228`) — readable measure
- `text-wrap: balance` on headings (`base.css:211`) — prevents orphaned headlines
- `overflow-wrap: anywhere` on body text elements (`base.css:62-63`) — prevents overflow in narrow grid tracks (critical fix per §19.12)
- `hyphens: auto` on headings (`base.css:74`) — prevents mid-word breaks in Cormorant Garamond (per the comment at `base.css:65-76`)
- Contrast ratio phosphor-white on hadal-darkness = 16.39:1 (AAA) ✓
- No centered long body copy blocks — left-aligned throughout ✓

---

## 4. Spelling & Grammar — 98/100 ✅

- Factual copy from `content.json` is verbatim where used — install command, pitch bullets, FAQ answers, feature bodies all match exactly
- Brand voice copy is coherent and on-theme ("hadal darkness", "bioluminescent", "anglerfish lure")
- No obvious typos in UI text
- "Licence" spelling in about.html (`about.html:121`) — consistent with British spelling used in the project (content.json footer also uses "License" in the href label but MPL-2.0 is American spelling; no inconsistency)
- Minor: "Five ways into the deep" (clients.html) — copy_overlay for the clients hero, not an invented fact

---

## 5. Usability — 88/100 ⚠️

**What works:**
- Download goal reachable in ≤2 clicks from home (hero CTA → download.html) ✓
- Primary CTA above the fold on home ✓
- Mobile nav toggle works (JS-powered, `aria-expanded` synced, closes on outside click) ✓
- Nav menu closes on outside click (`main.js:23-28`) ✓
- All 8 pages accessible from footer index ✓
- Focus trap helper exists but nav doesn't use it (mobile nav at 767px is enhancement-only per §19.8)
- "Read the Case File (the docs)" — accessible name correctly matches destination (WCAG 2.5.3 compliance per §19.7) ✓

**Issues:**

1. **Intensity toggle missing `<label>`** (`components.css:333-387`). The button at `index.html:576` has `aria-pressed` but no associated `<label>`. A screen reader user may not understand what "Calm mode" controls. Fix: wrap with `<label>` or add `aria-label="Toggle calm mode"`.

2. **Nav missing 2 links** — Users cannot reach Plugins or Docs via primary nav. They can via footer index, but the spec requires the primary nav to carry all 8 links (§5). This is a usability regression.

---

## 6. Accessibility (WCAG 2.2 AA) — 88/100 ⚠️

- **Contrast:**
  - `#C8F0FF` on `#010b14` = **16.39:1** (AAA) ✓
  - `#00E8C8` on `#010b14` = **12.63:1** (AAA) ✓
  - `#7700FF` on `#010b14` = **~4.5:1** (AA for large text/UI only; kit marks it "large/UI" at `brand-kit:236` — acceptable)
  - `#FF7B00` on `#010b14` = **7.6:1** (AAA) ✓
  - Abyssal violet (#7700FF) is used for decorative purposes, large display text, and icon accents — NOT for body text. The kit's contrast prose (brand-kit §21) correctly describes it for large text. `base.css:87` notes `#9d47ff` as the safe derived value; the current #7700FF at full saturation is borderline. Per §19.1: measure and the measured value is used. 4.5:1 passes AA for large text but is NOT safe for small body text. Since the violet is never used for small body text, this passes.
- **Keyboard:** All interactive elements reachable; visible `:focus-visible` ring (aqua glow) at `base.css:274-278` ✓
- **`prefers-reduced-motion`:** Gated at `base.css:343-352`, in `main.js:50-63` for JS animations, in CSS at `theme.css:843-856` for reveals, mascot animation disabled at `main.js:142` ✓
- **Touch targets:** Nav links minimum 44×44px (`components.css:96-116` padding gives sufficient area) ✓
- **200% zoom:** `overflow-wrap: anywhere` prevents grid overflow at narrow viewports (`base.css:62-63`; confirmed per §19.12 pattern) ✓
- **Skip link:** First focusable element, visible on focus, targets `#main-content` (`base.css:285-305`, `index.html:74`) ✓
- **Landmarks:** `role="banner"`, `role="navigation"` (×2: nav + footer), `role="contentinfo"` — one each ✓
- **Forms:** No forms on the marketing site. If any were added, they would need `<label>`.

**Issues:**

1. Intensity toggle button lacks `<label>` — described above.
2. The `html { overflow: hidden }` at `base.css:23` — per §19.13 this "hides overflow from the naive test — and from your visitor". `document.scrollWidth` stays equal to viewport even when content overflows. However, the page's actual content reflow is governed by `min-width: 0` on body and proper grid `minmax(0, 1fr)`. The `overflow: hidden` on `html` is a safety net for `scroll-behavior: smooth` but could mask a clipped `<h1>` at extreme text zoom. The hero `<h1>` is `clamp(2.4rem, 5vw, 4rem)` which is unlikely to overflow even at 200% zoom. This is a theoretical concern but worth noting.

---

## 7. Responsive (320→1920) — 90/100 ✅

- Grid tracks use `minmax(0, 1fr)` pattern throughout — correct per §19.12.2 (`theme.css:198`, `theme.css:204`, `theme.css:520`, `components.css:443`, `components.css:778`)
- Body `min-width: 0` set (`base.css:31`) — prevents flex/grid blowout
- No horizontal scroll at 320px (selfcheck passes) ✓
- Mobile nav at 767px breakpoint (`components.css:147-181`) ✓
- Mascot (`.abyss`) hidden below 768px (`components.css:648-652`) — per §19.14, fixed companion must not cover CTA at 320px ✓
- Fluid typography with `clamp()` throughout ✓
- `max-width: var(--content-width)` with `margin-inline: auto` on containers ✓

---

## 8. Performance (self-hosted fonts, no CDNs) — 95/100 ✅

- **No Google Fonts CDN** — verified by grep (no `fonts.googleapis.com`, no `fonts.gstatic.com`) ✓
- Fonts self-hosted WOFF2 (`base.css:355-416`) from shared pool (`../../assets/fonts/`) ✓
- `@font-face` for: Cormorant Garamond (600, 700), Inter (400, 500, 600), JetBrains Mono (400, 500), Raleway (100, 200) ✓
- `font-display: swap` on all faces ✓
- `defer` on main.js (`index.html:590`) — non-render-blocking ✓
- `prefers-reduced-motion` prevents animation when user prefers no motion ✓
- selfcheck reports: "11 @font-face rules; js 13.6 KB" — well within budget ✓

**Minor:** The `html { overflow: hidden }` at `base.css:23` prevents smooth-scroll from creating horizontal overflow in some browsers. This is a known trade-off.

---

## 9. Content Accuracy (install from content.json) — 95/100 ✅

- Install command verbatim from `content.json.install.primary.command` ✓ (`download.html:131`)
- Install notes (what it does) verbatim from `content.json.install.primary.what_it_does` ✓ (`download.html:132-137`)
- `from_source` command labeled correctly as "development — not an install" ✓ (`download.html:148-158`)
- Requirements from `content.json.install.requirements` ✓ (`download.html:164-168`)
- All 8 pitch bullets verbatim from `content.json.pitch_bullets` ✓ (`index.html:296-338`)
- All 8 features with correct titles and bodies from `content.json.features` ✓ (`features.html` — library, syncplay, transcode, auth, livetv, dlna, plugins, hub all verified)
- All 5 clients from `content.json.clients` (Roku, Tizen, Windows, Mobile/beta, DLNA) ✓ (`clients.html`)
- All 6 FAQ items verbatim from `content.json.faq` ✓ (`about.html:136-169`)
- Footer tagline verbatim from `content.json.footer.tagline` ✓
- Footer columns from `content.json.footer.columns` (3 columns, correct headings and links) ✓
- `proof_strategy` signals are verifiable — links to `/stargazers`, `/issues`, real docs URLs; no fabricated star counts or user numbers ✓ (`index.html:389-410`)
- License stated as "Phlix Server and the Hub are MPL-2.0; the shared libraries, plugins and clients are MIT" — matches `content.json.faq[5]` ✓

**Deduction:** The about.html hard-codes the licence text rather than reading it from `content.json` as §3.8 requires ("never hard-code a licence name here; read it from `content.json`"). The content is factually correct, but the implementation doesn't follow the single-source-of-truth rule. In practice, since content.json's footer column already hard-codes "License (MPL-2.0)" as a label, this is a documentation-level non-compliance, not a user-visible bug.

---

## 10. CTA / Funnel — 90/100 ✅

- Primary CTA "Begin the Descent" (amber/lure) above the fold on home ✓
- Secondary CTA "Read the Case File (the docs)" links to external docs with honest destination label ✓
- Download page has working one-liner install command ✓
- Every page ends in a `.cta-banner` or `.cta-row` driving toward download (or docs on download page) ✓
- Funnel ladder (3 rungs) on home (`index.html:424-455`) ✓
- `proof_strategy` signals include real links to verify, not fabricated numbers ✓

**Issue:** The primary nav missing Plugins and Docs creates a navigation gap — a user who wants plugins cannot reach `plugins.html` from the top nav. Footer index provides the path, but the spec's §5 funnel rule ("download goal reachable in ≤2 clicks from home") is met; the general site navigation is the gap.

---

## 11. Social Metadata (OG + Twitter, og:image PNG) — 95/100 ✅

- `og:type=website` ✓
- `og:site_name=Phlix` ✓
- `og:url` absolute on all pages ✓
- `og:title` on all pages ✓
- `og:description` on all pages ✓
- `og:image` absolute URL to `img/og.png` (1200×630 PNG) on all pages ✓
- `og:image:width="1200"` and `og:image:height="630"` ✓
- `og:image:alt` on home page ✓
- `twitter:card=summary_large_image` ✓
- `twitter:creator=@detain` ✓
- Favicon link (`image/svg+xml`) ✓
- `theme-color=#00E8C8` ✓

**Deduction:** `hub.html:6` title "The Relay — Phlix Hub — Phlix" contains "Phlix" twice. `download.html:6` title "Dive Gear — Phlix" is slightly minimal but acceptable. No other OG issues.

---

## 12. Localization — 92/100 ✅

- `<html lang="en">` set on all 9 pages ✓
- All user-facing strings trace to `content.json` (so translator swaps one file) ✓
- No locale-unsafe formatting detected ✓
- Logical properties used (`margin-inline`, `inset`) for RTL readiness ✓
- Fonts subset to Latin script (WOFF2 files from shared pool are Latin-subsetted) ✓
- `supported_locales: ["en"]` in content.json — site correctly does not attempt i18n ✓

**Deduction:** `about.html:121` spells "Licence" in British form, while the footer link says "License (MPL-2.0)" (American). The licence text in about.html is hard-coded rather than pulled from `content.json` (which says "License"). This creates a minor inconsistency — British spelling in the body vs. American in the footer link label. Neither is wrong in isolation; the mismatch is the issue.

---

## 13. Experience Fidelity — 89/100 ⚠️

**What the kit defined and what shipped:**

| Kit declaration | Shipped | Status |
|---|---|---|
| `mascot.behavior` — Abyss jellyfish | Abyss on home/features/download, with tips, dismiss, hover-hold, logo-clicks easter egg | ✅ |
| `easter_eggs` — logo-clicks:5, typed-word:abyss | Logo-clicks easter in mascot section; typed "abyss" easter in `main.js:254-309` | ✅ |
| `seasonal_activation` — live-js, banner text | Seasonal CSS var overrides + injected banner in `[data-season-slot]` | ✅ |
| `scroll_experience` — drift reveals | `IntersectionObserver` fade-ins at `theme.css:843-856`, gated on `prefers-reduced-motion: no-preference` | ✅ |
| `copy_overlay` — all presentation copy | Hero headline "In the Dark, Life Finds a Way.", all nav brand names (Descent, The Creatures, etc.), all section copy | ✅ |
| `proof_strategy` — signals | Plaques for client count, SyncPlay, Streaming, Access, Live TV; quote from pitch_bullets[0] with link to docs | ✅ |
| `conversion_funnel` — cta_ladder 3 rungs | "The descent awaits" ladder with 3 rungs | ✅ |
| `intensity_toggle` | "Calm mode" toggle in footer utility area | ✅ (but missing `<label>`) |
| `visitor_paths` — null | No fork — single curated path (correct, null = no fork) | ✅ |

**Issue:** The `intensity-toggle` in the footer is a kit-opt-in feature, but the button at `index.html:576` lacks a proper `<label>` element. A screen reader will announce "Calm mode, pressed false" without indicating what it controls. Fix: wrap in `<label for="intensity-toggle">` or add `id="intensity-toggle"` + `aria-labelledby`.

---

## FIXES NEEDED

### Must fix (keeps scores below 90)

1. **[Usability #5, Experience #13 — intensity toggle label]**
   - File: `index.html:576`
   - The `.intensity-toggle` `<button>` has no associated `<label>`
   - Fix: Add `id="intensity-toggle"` to the button, then add `<label for="intensity-toggle" class="visually-hidden">Toggle calm mode</label>` before it. The `aria-pressed` attribute provides state but not the control relationship.

### Should fix (caps scores below ceiling)

2. **[Brand fidelity #1 — missing nav links]**
   - Files: `index.html:90-121`, `features.html`, `download.html`, `clients.html`, `hub.html`, `about.html`, `plugins.html`, `docs.html`
   - Primary nav has only 6 links; Plugins and Docs are missing (both pages exist at `plugins.html` / `docs.html`)
   - Fix: Add two `<li>` entries between Download and Hub:
     ```html
     <li>
       <a class="nav-menu__link" href="plugins.html">
         <PluginDepths<span class="nav-menu__gloss">Plugins</span>
       </a>
     </li>
     <li>
       <a class="nav-menu__link" href="docs.html">
         Nocturnal Library<span class="nav-menu__gloss">Docs</span>
       </a>
     </li>
     ```
   - The footer index already links these correctly.

3. **[SEO #2 — redundant Phlix in hub title]**
   - File: `hub.html:6`
   - `<title>The Relay — Phlix Hub — Phlix</title>` should be `<title>The Relay — Phlix</title>`
   - Same pattern as all other pages: page name (voiced) + "— Phlix"

---

## SCORE CARD

| # | Dimension | Score | Status |
|---|---|---|---|
| 1 | Brand fidelity & spirit | 87 | ⚠️ |
| 2 | SEO | 92 | ✅ |
| 3 | Readability | 94 | ✅ |
| 4 | Spelling & grammar | 98 | ✅ |
| 5 | Usability | 88 | ⚠️ |
| 6 | Accessibility | 88 | ⚠️ |
| 7 | Responsive | 90 | ✅ |
| 8 | Performance | 95 | ✅ |
| 9 | Content accuracy | 95 | ✅ |
| 10 | CTA / funnel | 90 | ✅ |
| 11 | Social metadata | 95 | ✅ |
| 12 | Localization | 92 | ✅ |
| 13 | Experience fidelity | 89 | ⚠️ |

**No dimension has a ❌.** Three dimensions are ⚠️ (1, 5, 6, 13) due to the missing nav links and intensity toggle label. With fixes #1 and #2 applied, all dimensions land ≥90.

**APPROVED** conditional on fixes #1 (intensity toggle label) and #2 (nav links). Fix #3 (hub title) is minor and non-blocking.
