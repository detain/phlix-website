# Demolition Crew — Brand Kit Site Review

**Reviewer:** Hostile Audit
**Date:** 2026-07-28
**Site:** `sites/demolition-crew/`
**Kit:** `brand-kits/demolition-crew.js`

---

## Summary

**❌ NOT APPROVED — 6 critical defects, multiple additional issues.**

The site has strong brand execution (visuals, motion, Demo Mode) but contains hard factual errors that violate the content contract, incorrect install commands, wrong OG image format, missing FAQ on about.html, and a non-functional nav on clients/download pages.

---

## Lint

**Result:** HTML scanned 648 files — 0 HTML errors. ESLint shows errors in OTHER sites, none in demolition-crew.

---

## 1. Brand Fidelity & Spirit

**Score: 75/100 ⚠️**

The brand kit is well-executed visually:
- ✅ Correct palette: `#FF3838` primary, `#2D3436` bg, `#FFD93D` hazard, `#6C5CE7` tertiary, `#00CEC9` spark
- ✅ Correct fonts: Russo One (headline), Teko (display), Exo 2 (body)
- ✅ Angular clip-path borders on cards and buttons
- ✅ Hazard stripe dividers
- ✅ Demo Mode is the signature interaction — implemented correctly with rubble cascade
- ✅ Debris particle system with angular debris shapes
- ✅ Blast-edge styling throughout
- ✅ Voice is bold and aggressive ("Demolish Now", "Stream Demolished", "Outlaw Archetype")

**❌ Missing Why Phlix section header (h2):** index.html line 194 has h2 "Controlled Blast" but per new_site.md §3.1 the pitch section must have `<h2>Why Phlix?</h2>`. The section label says "Why Phlix" but the visible heading says "Controlled Blast" — per spec §3.1 this must be "Why Phlix?" heading followed by pitch_bullets as a list.

**⚠️ Demo panel stat cards create false precision:** The demo panel (index.html:150-170) shows `50+` for "Native Apps" and `4K` as if these are facts. These are decorative demo numbers, not verifiable facts. Should not show specific counts that don't match content.json.

---

## 2. SEO

**Score: 80/100 ⚠️**

- ✅ `<title>` on all pages (≤60 chars)
- ✅ `<meta name="description">` ≤ 160 chars on all pages
- ✅ `<link rel="canonical">` absolute on all pages
- ✅ Semantic landmarks: `role="banner"`, `role="navigation"`, `role="main"`, `role="contentinfo"`
- ✅ Single h1 per page
- ✅ Descriptive anchor text
- ✅ JSON-LD SoftwareApplication on index.html

**❌ Missing `og:url` on about, clients, download, plugins, hub, docs:** Not on every page as required by new_site.md §10.

**⚠️ `sitemap.xml` missing 404.html exclusion note:** It correctly excludes 404 in the sitemap itself, but sitemap.xml itself has no comment marking it as auto-generated.

---

## 3. Readability

**Score: 88/100 ⚠️**

- ✅ Font sizes: body 1rem (16px), line-height 1.55, good readability
- ✅ Color contrast: Blast White (#F5F5F5) on Concrete Dark (#2D3436) = 11.9:1 AAA
- ✅ Font stack has fallbacks
- ✅ `font-display: swap` on all @font-face
- ✅ `overflow-wrap: anywhere` set for prose

**⚠️** `font-display: swap` with `local()` sources only — if the font isn't installed locally, `swap` has nothing to swap to. True self-hosted WOFF2 would be more robust. Per spec §13 fonts must be self-hosted WOFF2 in `shared/assets/fonts/`.

---

## 4. Spelling & Grammar

**Score: 95/100 ✅**

No spelling errors detected. Grammar is clean and brand-voice appropriate. Short punchy sentences, active voice, no filler.

---

## 5. Usability

**Score: 65/100 ❌**

- ✅ Skip link works and is visible on focus
- ✅ Mobile nav toggle functional (aria-expanded synced)
- ✅ Demo Mode toggle keyboard accessible (Enter/Space)
- ✅ Scroll animations respect reduced-motion
- ✅ Footer nav functional

**❌ Client download cards use `href="#"` — non-functional links on download.html:119, 127, 135.** These should link to actual download pages or repos. Screen readers announce "link, #" which is broken.

**❌ Nav menu items with `aria-current="page"` on index.html don't account for the fact that index.html uses `./` but the other pages reference `index.html` — so on index.html the Home link should be `href="index.html"` not `href="./"` for consistent behavior.

---

## 6. Accessibility (WCAG 2.2 AA)

**Score: 82/100 ⚠️**

- ✅ Contrast: Blast White (#F5F5F5) on Concrete Dark (#2D3436) = 11.9:1 (AAA)
- ✅ Signal Red (#FF3838) on Concrete Surface (#3D4449) = 4.8:1 (AA body)
- ✅ Hazard Yellow (#FFD93D) on Concrete Dark = 8.6:1 (AAA)
- ✅ Touch targets ≥ 44×44px (buttons are min 44px)
- ✅ Focus ring: 2px solid Signal Red, 2px offset — matches kit spec
- ✅ `prefers-reduced-motion` respected: debris particles → static dust, animations disabled
- ✅ `aria-pressed` on Demo Mode toggle, `aria-expanded` on nav toggle
- ✅ `aria-hidden` on decorative SVG icons
- ✅ `aria-labelledby` on all major sections
- ✅ Demo Mode rubble items are `pointer-events: none`
- ✅ Toast `role="alert"` not set — but `_showToast` creates a div with class `toast toast--warning` etc. This should probably have `role="status"` for success toasts and `role="alert"` for warnings.

**⚠️ Pitch bullet items lack semantic list structure:** The pitch-list (index.html:201) uses `div.pitch-item` without a wrapping `ul`/`ol`. Should be `<ul class="pitch-list">` with `<li class="pitch-item">`.

**⚠️ Focus visible on skip-link:** base.css:201-204 sets secondary outline color `--color-secondary` (yellow) on the skip-link when focused, but the focus ring is the primary red. Should match the kit's focus style.

---

## 7. Responsive (320→1920)

**Score: 78/100 ⚠️**

- ✅ `min-height: 100vh` on hero, fluid `clamp()` font sizes
- ✅ Container max-width 1440px, fluid width
- ✅ Grid breakpoints: 640px (single column), 1024px (2-column)
- ⚠️ Grid uses `repeat(3, 1fr)` on features-grid — at 200% zoom this will overflow in a 320px viewport. The spec requires `repeat(3, minmax(0, 1fr))`.

**❌ Hero at 320px may clip:** The hero `min-height: 100vh` with `padding: var(--space-24) var(--space-6)` — on a 320px-wide phone at normal zoom, this leaves ~568px of content height minus padding. The title + subtitle + CTA should fit, but at 200% text zoom the title font size clamps to `2.5rem` which at 200% zoom = 5rem equivalent... this could clip.

**⚠️ Download page install code block min-width: 200px** (components.css:561) — at 320px with 200% text zoom this may overflow the container.

---

## 8. Performance (self-hosted fonts, no CDNs)

**Score: 60/100 ❌**

- ✅ No Google Fonts CDN links
- ✅ No icon CDNs
- ✅ `defer` on main.js
- ✅ CSS loaded in `<head>`

**❌ `@font-face` uses `local()` sources only — `font-display: swap` with no actual WOFF2 file to swap to.** The fonts Russo One, Teko, Exo 2, Share Tech Mono are NOT guaranteed to be on user systems. If they're not installed, the page falls back to Impact/Oswald/Roboto which are not the brand fonts. Per new_site.md §19.3: "Every `@font-face` `src` must point at a WOFF2 that exists in the repo. The shared pool is `shared/assets/fonts/`." The site uses no WOFF2 files at all.

**❌ Canvas-based particle system runs continuously** — 40 particles on desktop. No visibility-based pausing (particles keep animating even when tab is not visible). Should use `document.hidden` or `visibilitychange` to pause.

---

## 9. Content Accuracy (install command from content.json)

**Score: 30/100 ❌ CRITICAL**

**❌ WRONG INSTALL COMMAND on index.html:368:**
```html
<code class="install-block__code">git clone https://github.com/detain/phlix.git && cd phlix && ./install.sh</code>
```

**This is the `from_source` (development checkout), NOT the real install command.**

Per `content.json.install.primary`:
```
command: "curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash"
```

The site shows `git clone && cd && ./install.sh` which the spec explicitly says "This is a development checkout only. It does not create a database, a service, or run migrations." and §19.22 says: "all 50 sites invented their own... three pages of one site claimed 'one line', 'three lines' and 'four lines' respectively."

This is a **regression** — the site is showing the WRONG command.

**❌ WRONG INSTALL COMMAND on download.html:73:**
Same issue:
```html
<code class="install-block__code">git clone https://github.com/detain/phlix.git && cd phlix && ./install.sh</code>
```

**❌ Clients page claims "50+ Native Apps"** — content.json says "4 native clients — Roku, Samsung Tizen, Windows, Mobile (beta) — plus any DLNA device." The 50+ count includes macOS, Linux, Android, iOS, LG webOS, Android TV, Fire TV, web browser, CLI — none of which are listed in content.json's `clients[]` array of 5 items. This is a fabricated claim.

**❌ Feature count on features.html:** The features grid shows 12 cards, but content.json has exactly 8 features. Also descriptions differ from content.json.

**❌ License on about.html:405 says "MPL-2.0" only.** Per content.json FAQ and footer, phlix-server/phlix-hub are MPL-2.0, but shared libraries/plugins/clients are MIT. This is the "one licence across the board" error that new_site.md §19.7 explicitly warns against.

---

## 10. CTA / Funnel

**Score: 70/100 ⚠️**

- ✅ Primary CTA "Demolish Now" visible in hero, above fold
- ✅ Download goal reachable in ≤2 clicks from home
- ✅ CTA banner at end of each page
- ✅ Hero CTA uses correct `.btn.btn-primary`

**❌ Install command in CTA banner (index.html:368) is WRONG** — shows dev checkout, not the real install script.

**⚠️ CTA ladder on index.html:** Primary "Demolish Now" (→ download), Secondary "View Features" (→ features.html) — matches kit's conversion_funnel style "single-blast". Good.

---

## 11. Social Metadata (OG + Twitter, og:image PNG not SVG)

**Score: 55/100 ❌**

**❌ OG IMAGE IS SVG on every page:**

| Page | og:image |
|------|----------|
| index.html:21 | `https://detain.github.io/phlix-website/demolition-crew/img/og.svg` ❌ |
| download.html:11 | same SVG ❌ |
| features.html:11 | same SVG ❌ |
| about.html:11 | same SVG ❌ |
| clients.html:11 | same SVG ❌ |
| plugins.html:11 | same SVG ❌ |
| hub.html:11 | same SVG ❌ |
| docs.html:11 | same SVG ❌ |

Per new_site.md §19.5: `og:image` **must** be a `.png`. Several platforms will not render an SVG og:image. Keep `og.svg` as the editable source, but the meta must reference `og.png` (1200×630 raster). Regenerate with `node tools/gen-og.mjs --site demolition-crew`.

**❌ Twitter Card meta tags missing on download, about, clients, plugins, hub, docs:**
- download.html has no `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- about.html, clients.html, plugins.html, hub.html, docs.html — same omission

**❌ 404.html missing canonical, og:url, og:title, og:description, og:image, twitter:card, `noindex`:** Per new_site.md §2A, the 404 page must have `<meta name="robots" content="noindex">` and canonical/og:url.

---

## 12. Localization

**Score: 85/100 ⚠️**

- ✅ `<html lang="en">` set correctly from site.default_locale
- ✅ All user-facing strings trace back to content.json fact structure
- ✅ CSS uses logical properties where appropriate
- ⚠️ Font subsetting not explicitly done — Exo 2 includes Latin only

**⚠️ "Why Phlix?" heading missing** — the pitch section should have `<h2>Why Phlix?</h2>` per new_site.md §3.1 and content.json structure. It has "Controlled Blast" instead.

---

## 13. Experience Fidelity

**Score: 82/100 ⚠️**

- ✅ Demo Mode is the signature experience — debris cascade on destruction, rebuild animation, works with reduced-motion
- ✅ Debris particle system with angular fragments (not round)
- ✅ Hazard stripe dividers
- ✅ Blast-edge card clip-paths
- ✅ Crate hook motif referenced in hero tagline ("The Outlaw Archetype")
- ✅ Purple blast glow on featured cards (card--featured)
- ✅ Brand voice is bold and aggressive throughout
- ✅ Install-block styled with concrete dark surface

**⚠️** The hub.html page describes the Hub as "Community Marketplace" and shows "Browse All on GitHub" linking to `github.com/detain/phlix-plugins` which is not a valid URL (repos are detain/phlix-server, detain/phlix-hub, etc. — `phlix-plugins` may not exist). This should link to `https://github.com/detain/phlix-hub` per content.json's hub description.

**⚠️** The About page is missing the FAQ entirely. Per new_site.md §3.8 and content.json §2, about.html must have a `<dl class="faq-list">` with all 6 FAQ items from content.json.

---

## Critical Fixes Required

### ❌ P0 — Must Fix (blocking)

1. **og:image is SVG, must be PNG** — Run `node tools/gen-og.mjs --site demolition-crew` to generate og.png; update all pages to reference `img/og.png`
2. **Wrong install command everywhere** — Replace `git clone https://github.com/detain/phlix.git && cd phlix && ./install.sh` with `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash` per content.json §19.22
3. **License misstatement on about.html:405** — Footer says "MPL-2.0" but content.json specifies both MPL-2.0 (server/hub) and MIT (shared/plugins/clients). Use the full text from content.json.footer.columns[2].links[3].label
4. **FAQ section missing from about.html** — Must add `<dl class="faq-list">` with all 6 items from content.json.faq[]
5. **Client cards on download.html use `href="#"`** — Replace with real repo links or remove the links; non-functional links are a11y failure
6. **Twitter Card meta missing from 5 pages** — Add `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` to download.html, about.html, clients.html, plugins.html, hub.html, docs.html

### ⚠️ P1 — Should Fix

7. Font self-hosting — add actual WOFF2 files from shared pool; the `local()` approach is not guaranteed
8. About page missing philosophy section heading (the "Three Rules" content exists under "The Philosophy" h3 but needs a proper h2 label per spec)
9. Pitch bullets section needs `<h2>Why Phlix?</h2>` per new_site.md §3.1
10. Features page shows 12 cards but content.json has only 8 — reconcile to actual content
11. Clients page "50+ Native Apps" claim doesn't match content.json (4 native + DLNA)
12. hub.html "Browse All on GitHub" links to non-existent `phlix-plugins` repo — fix to actual hub repo
13. 404.html missing noindex meta and canonical URL

---

## Final Verdict

**❌ NOT APPROVED**

The site has excellent brand execution — the visual identity, motion design, Demo Mode, and overall aesthetic are strongly on-brand for Demolition Crew. However, it fails on three hard factual errors (install command, license, client count) that violate the content contract, plus a critical social metadata regression (SVG og:image) that the spec explicitly calls out as a known past bug.

**All P0 issues must be fixed before approval.**
