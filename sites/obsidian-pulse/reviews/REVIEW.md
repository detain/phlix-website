# obsidian-pulse — Site Review

**Reviewer:** Hostile audit
**Date:** 2026-07-29
**Ground truth:** `new_site.md` + `shared/content.json`

---

## Scorecard

| # | Dimension | Score | Status |
|---|-----------|-------|--------|
| 1 | Brand fidelity & spirit | 78 | ⚠️ |
| 2 | SEO | 82 | ⚠️ |
| 3 | Readability | 95 | ✅ |
| 4 | Spelling & grammar | 100 | ✅ |
| 5 | Usability | 68 | ⚠️ |
| 6 | Accessibility (WCAG 2.2 AA) | 75 | ⚠️ |
| 7 | Responsive (320→1920) | 92 | ✅ |
| 8 | Performance (self-hosted fonts, no CDNs) | 100 | ✅ |
| 9 | Content accuracy | 50 | ❌ |
| 10 | CTA / funnel | 70 | ⚠️ |
| 11 | Social metadata | 85 | ⚠️ |
| 12 | Localization | 85 | ⚠️ |
| 13 | Experience fidelity | 62 | ❌ |

**Overall: REJECTED.** Dimensions 9 and 13 are ❌. Dimensions 1, 2, 5, 6, 10, 11, 12 are ⚠️.

---

## 1. Brand Fidelity & Spirit — 78 ⚠️

**What passes:**
- Obsidian `#0A0B0E` / Pulse Blue `#00B4FF` / Platinum Silver `#C8CDD6` / Optical White `#F0F2F5` — all brand tokens correctly implemented in CSS vars.
- All fonts self-hosted (DM Sans, Space Grotesk, Inter, JetBrains Mono) — no Google Fonts CDN.
- Precision-engineering voice applied consistently to hero, section labels, and micro-copy ("Precision engineering.", "Signal. Refined.", "Built not decorated.", "Every screen, the right signal.", "Zero-config remote access.").
- Pulse scan animation (animated `::before` on `.hero`) is brand-native and correctly gated on `prefers-reduced-motion`.
- Seasonal activation (`live-js`) correctly shifts `--color-primary` and `--color-bg` for Winter Signal and Midnight Edition.

**What fails:**
- **`new_site.md` §5** is explicit: the nav must have **8 links in this order**: Home · Features · Clients · Download · **Plugins** · **Docs** · Hub · About. Every page has only **6 nav links** — `Plugins` and `Docs` are entirely absent from the nav. `Plugins` exists as a page (correctly in sitemap.xml, linked from the footer), but `Docs` is neither in the nav nor in the footer link list on most pages (it is in the footer on index, features, clients, download, hub, about — but absent from the nav on all pages).
  - Index nav (line 61–70): Home · Features · Clients · Download · Hub · About — **missing: Plugins, Docs**.
  - Features nav: same 6 links.
  - Clients nav: same 6 links.
  - Download nav: same 6 links.
  - Hub nav: same 6 links.
  - About nav: same 6 links.
  - Plugins nav: same 6 links.
  - Docs nav: same 6 links.

**Fix:** Add `Plugins` and `Docs` to every nav per `new_site.md` §5. `Docs` should link to `docs.html` (not the external docs URL — per §5 note, internal `docs.html` link is acceptable and keeps one behavior consistent).

---

## 2. SEO — 82 ⚠️

**What passes:**
- `<title>` on every page ≤ 60 chars with page-specific title (`<Page> — Phlix`).
  - Index: `Phlix — Signal. Refined.` (23 chars) ✓
  - Features: `Features — Phlix` (17 chars) ✓
  - etc.
- `<meta name="description">` on every page (all descriptive, non-generic).
- `<link rel="canonical">` absolute URL on every page ✓.
- Sitemap.xml with all 8 canonical pages and absolute `<loc>` URLs ✓.
- `robots.txt` referencing the sitemap ✓.
- Semantic landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`) present on every page ✓.

**What fails:**
- No `<meta name="keywords">` — `new_site.md` §10 requires it from `meta.keywords`. Not present on any page.
- No JSON-LD `SoftwareApplication` block on the home page — `new_site.md` §10 explicitly requires it on the home page only (name, description, applicationCategory, operatingSystem, offers/price=0, license).
- `sitemap.xml` does not include `404.html` (correct, it should be excluded), but also does not include `plugins.html` in its entries? Actually it does — line 25: `plugins.html` ✓. The sitemap has all 8 pages correctly.

---

## 3. Readability — 95 ✅

- Typography scale: DM Sans 300 for headlines, 400 for body, Inter 400/500/600 for UI — all appropriate.
- `body { font-size: 1rem; line-height: 1.65 }` — generous, readable.
- `h1 { clamp(2.5rem, 5vw, 4rem) }` — good scale range.
- Body text `overflow-wrap: anywhere` on all text elements — prevents overflow in narrow tracks.
- No excessive line length; max-width containers at 1400px.
- Subheadings in hero use muted `#c8cdd6` which has ~12:1 contrast against `#0a0b0e`.

**Minor:** The home hero subheadline (`clamp(1rem, 1rem + 0.5vw, 1.25rem)`) becomes tiny at 320px viewport before the clamp minimum kicks in — acceptable but tight.

---

## 4. Spelling & Grammar — 100 ✅

No spelling or grammar errors detected. Content is clean.

---

## 5. Usability — 68 ⚠️

**What passes:**
- Skip link present and works (`href="#main-content"`).
- Download reachable in ≤2 clicks from every page (nav has Download link; primary CTA on home goes to download.html).
- External links use `rel="noopener noreferrer"` — mostly correct.
- Copy-to-clipboard button on install command.
- No dead links detected.

**What fails:**
- **Touch target on `.install-box__copy`**: The copy button is `padding: var(--space-1)` with a 16×16 SVG icon. The hit area is ~24×16px, below the required **44×44px** minimum (WCAG 2.2 AA SC 2.5.8). `install-box__copy` at `components.css:791–805`.
- **Touch target on `.nav__toggle`**: The hamburger button is `padding: var(--space-2)` with a 24×2px icon. Hit area ~28×12px at standard sizing. Below 44×44px.
- **`<script src="js/main.js">` without `defer`** — `new_site.md` §7: "keep it tiny and non-render-blocking. No analytics, no third-party scripts." §17 build script uses `<script src="js/main.js" defer>`. The defer attribute is missing on all pages. Without defer, the parser encounters the script before the DOM is complete, which blocks HTML parsing on slow connections.
- **No visible indication for easter egg trigger**: The logo-glow easter egg (5 clicks) has no affordance. A user clicking the logo repeatedly with no feedback won't know they need 5 clicks. Consider adding `cursor: pointer` to `.nav__logo` (it's on `a` so it already has that). The easter egg itself is well-implemented (disabled in input contexts, Esc to exit), but the discoverability is zero.

---

## 6. Accessibility (WCAG 2.2 AA) — 75 ⚠️

**What passes:**
- Skip link visible on focus ✓.
- `:focus-visible` with 1px outline + 4px blue glow ring — visible on all interactive elements ✓.
- `prefers-reduced-motion` respected: `@media (prefers-reduced-motion: reduce)` zeroes all animation/transition durations ✓.
- All images have `aria-hidden="true"` where purely decorative; logo has `aria-label="Phlix home"`.
- All `aria-expanded` on nav toggle is kept in sync ✓.
- Color contrast:
  - `#00b4ff` on `#0a0b0e` ≈ 12:1 ✓ (AA)
  - `#f0f2f5` on `#0a0b0e` ≈ 18:1 ✓ (AAA)
  - `#c8cdd6` on `#0a0b0e` ≈ 12:1 ✓ (AA)
  - `#00b4ff` on `#111317` ≈ 7:1 ✓ (AA)

**What fails:**
- **Missing `aria-label` on footer `<nav>`**: All 9 pages use `<nav class="footer-nav" aria-label="Footer navigation">` — the attribute is declared but the `<nav>` element in the HTML uses `class="footer__nav"` without any `aria-label`. The footer nav needs `aria-label="Footer navigation"` on the `<nav>` element.
- **`.nav__toggle` `aria-label` is wrong**: Button has `aria-label="Open navigation"`. Per `new_site.md` §4, it should be `"Toggle navigation"`. Also it never updates to "Close navigation" when open.
- **download.html `id="install"` missing**: `new_site.md` §3.4 says the server install block should have `id="install"`. The install box div at `download.html:101` has no `id`.
- **Missing `role="main"` on `<main>`**: `new_site.md` §4 shell uses `<main id="main-content" tabindex="-1">` without `role="main"`. While `<main>` is a landmark element natively, `role="main"` is explicit in the spec and the HTML validator may flag the combination of `tabindex="-1"` without a role as suspicious.
- **No `aria-current="page"` on active nav link**: The active page nav link uses `nav__link--active` CSS class but does not have `aria-current="page"` per `new_site.md` §4.
- **Layout survives 200% text zoom** — `body` has `min-width: 0` and containers use fluid widths. The hero headline uses `clamp(3rem, 8vw, 6rem)` which reflows gracefully. However, the hero `min-height: calc(100vh - var(--nav-height))` at 200% zoom will cause the hero to become taller than the viewport, which is acceptable behavior (no clipping), but the hero's padding-bottom (`var(--space-24)` = 96px) may push content below the fold at small viewports at 200% zoom. This needs render-check verification.

---

## 7. Responsive (320→1920) — 92 ✅

**What passes:**
- All grids use `minmax(0, 1fr)` — no horizontal overflow from unbreakable strings (per `new_site.md` §19.12 rule 1).
- `body { overflow-wrap: anywhere }` on all body text — long words wrap correctly in narrow columns.
- Breakpoints at 480px, 540px, 640px, 768px, 860px, 900px — covers all specified widths.
- Container padding reflows to `var(--space-5)` at ≤480px.
- `device-rack` collapses from 5-col → 3-col (≤900px) → 2-col (≤540px).
- `features-grid` collapses from 3-col → 2-col (≤860px) → 1-col (≤540px).
- Footer `grid-template-columns: repeat(4, minmax(0, 1fr))` → 2-col (≤768px) → 1-col (≤480px).

**What fails:**
- At **320px**, the footer nav row (`.footer__nav`) with 6 links wraps to multiple lines. This is acceptable — no horizontal overflow.
- No horizontal scroll at any tested width — verified via grid track configuration.

**Note:** Formal render-check (320px + 200% zoom) not run in this audit. Grid/CSS code review strongly suggests pass, but `render-check.mjs --site obsidian-pulse` should be run before final approval.

---

## 8. Performance (self-hosted fonts, no CDNs) — 100 ✅

**Perfect. No CDN dependencies whatsoever:**
- All 4 font families (DM Sans, Space Grotesk, Inter, JetBrains Mono) self-hosted as WOFF2 from `../../assets/fonts/` ✓.
- `@font-face` declarations use `font-display: swap` on all weights ✓.
- `js/main.js` is vanilla, no dependencies, ~132 lines ✓.
- No `<link rel="preconnect">` to CDN (correct — none needed for self-hosted) ✓.
- `scroll-behavior: smooth` in CSS (not JS-driven) ✓.
- Lazy loading: no `<img loading="lazy">` attributes — but there are no decorative images on the site (SVG icons are inline), so this is a non-issue.

---

## 9. Content Accuracy — 50 ❌

### ❌ CRITICAL: `download.html` `from_source` is broken

`shared/content.json` §`install.from_source`:
```json
"from_source": {
  "label": "Build from source (development, not an install)",
  "line_count": 3,
  "command": "git clone https://github.com/detain/phlix-server.git\ncd phlix-server\ncomposer install",
  "notes": "This is a development checkout only..."
}
```

`download.html` lines 192–203:
```html
<p class="install-box__label">Build from source (development, not an install)</p>
<div class="install-box__command">
  <code>git clone https://github.com/detain/phlix-server.git cd phlix-server composer install</code>
</div>
<p class="install-box__what">
  This is a development checkout only. It does not create a database, a service, or run
  migrations. Never present it as the way to install Phlix.
</p>
```

**Four violations:**
1. **Three commands collapsed to one line** — the `\n`-separated commands are displayed as a single wrapped line, not three separate lines. `line_count` in content.json is `3`; only 1 visually distinct line is shown.
2. **Label mismatch**: Content.json says `"Build from source (development, not an install)"` with lowercase 'source'. The page uses the same label by coincidence, but the `line_count: 3` and the display format are both wrong.
3. **`notes` mismatch**: Content.json `from_source.notes` says: *"This is a development checkout only. It does not create a database, a service, or runs migrations. Never present it as the way to install Phlix."* The page says *"This is a development checkout only. It does not create a database, a service, or run migrations. Never present it as the way to install Phlix."* — missing "runs" (should be "or runs migrations" per content.json). Actually checking: content.json says `"or runs migrations"` - the page says `"or run migrations"` (grammatically the page may be correct actually, let me re-check). Content.json: "It does not create a database, a service, or runs migrations." — this looks like a typo in content.json itself ("or runs" should be "or run"). The page uses "or run" which is grammatically correct. Per `new_site.md` §16: "if it disagrees with this line, `content.json` wins and this line is the stale one" — but this is a content.json typo, not a fact. Still, the spec says copy from content.json. The page should use the content.json string verbatim, even if it has a typo.
4. **`id="install"` on the primary install box** (not from_source): `download.html:101` — the primary install box `<div class="install-box" ...>` has no `id="install"`. `new_site.md` §3.4 requires this for the anchor link.

### ❌ CRITICAL: Home page shows only 3 of 8 features

`new_site.md` §3.1:
> "**Features overview** (`.features-overview`) — `<h2>`, then a card grid of all 8 `features` (`.feature-card` with inline SVG icon, `h3` title, `p` body) and a "See all features →" link to `features.html`."

`index.html` section 2 ("Core Features") shows **only 3 cards** (Library, SyncPlay, Transcode) from the 8-item `features[]` array. There is no "See all features →" link. The remaining 5 features (Auth, Live TV, DLNA, Plugins, Hub) are absent from the home page.

Content.json has 8 `features[]` items. All 8 must appear on the home page features-overview OR on the Features page — and at least a link to the full list must be present on home.

### ⚠️ `download.html` missing ecosystem items

`download.html` ecosystem list (lines 359–386) correctly shows all 5 ecosystem items from `content.json.ecosystem[]`: phlix-server, phlix-hub, phlix-shared, phlix-docs, phlix-plugin-example. ✓

### ⚠️ `about.html` Contributing section missing ecosystem links

`about.html` Contributing section (lines 144–162) shows only 3 repos:
- phlix-server ✓
- phlix-plugin-example ✓
- phlix-docs ✓

Missing:
- `phlix-hub` — should link to `https://github.com/detain/phlix-hub` with "Cloud directory + reverse-tunnel relay"
- `phlix-shared` — should link to `https://github.com/detain/phlix-shared` with "Shared interfaces, DTOs, event types — Composer package"

`content.json.ecosystem[]` has all 5. The contributing section should list the 5 repos plus an optional note about where to start. Currently only 3 of 5 are shown.

### ⚠️ `hub.html` missing "Self-host or use the public hub" and "Hub mode in clients" sections

`new_site.md` §3.7 requires hub page sections:
1. `<h1>Phlix Hub` ✓
2. "What the Hub does" (reverse-tunnel relay, NAT traversal) ✓ (section 1 "How it works")
3. **"Self-host or use the public hub"** — MISSING
4. **"Hub mode in clients"** — MISSING
5. Closing `.cta-banner` ✓

The hub page only has "How it works" (step-by-step) and "Capabilities" (3 cards). The two missing sections per §3.7 are absent.

---

## 10. CTA / Funnel — 70 ⚠️

**What passes:**
- Primary CTA visible above the fold on home ✓.
- Download reachable in ≤2 clicks from home ✓.
- `hero.primary_cta` → `download.html` ✓.
- Every page ends in a `.cta-banner` or closing CTA section ✓.
- Primary button (`#00b4ff` on `#0a0b0e`) has ≥3:1 contrast ✓.

**What fails:**
- **`download.html` has no CTA banner at the end**: `new_site.md` §3.4 says the download page must end with "closing `.cta-banner` linking to docs." The page ends after the ecosystem list — no CTA section.
- **`secondary_cta` label mismatch on home**: `content.json.hero.secondary_cta.label` is `"Read the docs"`. Home correctly shows "Read the docs". ✓ But `content.json.hero.primary_cta.label` is `"Get Phlix"`, not `"Download Phlix"`. Home hero primary CTA shows "Download Phlix". Per `new_site.md` §2, presentation copy may follow `copy_overlay` if the kit provides one. The kit apparently provided a `copy_overlay` for the hero. Without the kit file I can't verify, but if the kit has no `copy_overlay`, the label should be `"Get Phlix"` verbatim.
- **No `aria-label` on the secondary CTA ghost button** — the button label is "Read the docs" and href goes to the docs. If someone using a screen reader reads "Read the docs" and the href resolves to the docs, the accessible name is accurate. This passes WCAG 2.5.3 (label-in-name) as long as the visible label matches the accessible name, which it does.
- **Footer license link**: `footer.columns[2].links[3]` in content.json has `href: "https://github.com/detain/phlix-server/blob/master/LICENSE"` with `label: "License (MPL-2.0)"`. All pages show `License (MPL-2.0)` with the correct link. ✓

---

## 11. Social Metadata — 85 ⚠️

**What passes:**
- `og:type=website`, `og:site_name=Phlix`, `og:url` (absolute), `og:title`, `og:description`, `og:image` (absolute URL) on all 9 pages ✓.
- `og:image` is `img/og.png` (not og.svg) ✓.
- `twitter:card=summary_large_image` on all pages ✓.
- `twitter:title`, `twitter:description`, `twitter:image` on all pages ✓.
- `<meta name="theme-color">` = `#00B4FF` (via SVG inline favicon, but no explicit `<meta name="theme-color">` tag). Actually, the spec says to set it in the `<head>`. Not present as a `<meta>` tag.
- `<link rel="icon" type="image/svg+xml">` pointing to inline data URI ✓.

**What fails:**
- **`twitter:creator=@detain` completely absent from every page** — `new_site.md` §11 is explicit: `twitter:creator=@detain` must be on every page `<head>`. This is missing on all 9 pages.

---

## 12. Localization — 85 ⚠️

**What passes:**
- `<html lang="en">` on all pages ✓.
- Single locale (`en`) matches `content.json.site.supported_locales: ["en"]` ✓.
- All user-facing strings trace back to `content.json` (so a translator swaps one file) ✓.
- CSS uses logical properties where applicable (e.g., `padding-inline`, `margin-inline`) ✓.
- `prefers-reduced-motion` respected ✓.
- Font subsets: Latin only (WOFF2 files use `-latin` suffix) ✓.

**What fails:**
- **`&copy; 2026 Joe Huss`** is hardcoded on every page footer. Should use `<?= date('Y') ?>` or JavaScript `new Date().getFullYear()`. While this is technically correct for 2026, it will silently go stale in 2027 and require a code change to update.
- No `<link rel="alternate" hreflang="x-default">` for the single en locale — acceptable but not best practice.
- `manifest.webmanifest` uses `name: "Signal. Refined. — Phlix"` which mixes brand voice with product name — acceptable but the spec says to use the site name from content.json.

---

## 13. Experience Fidelity — 62 ❌

### ❌ Nav missing 2 required pages (Plugins + Docs)

`new_site.md` §5: nav must be **8 links**. The site has **6 links** on every page (Home, Features, Clients, Download, Hub, About). `Plugins` and `Docs` are completely absent from the nav.

**This is the single highest-impact defect in this audit.** Every page fails the nav structure requirement.

### ❌ Home features-overview shows only 3 of 8 features

Per `new_site.md` §3.1, the home page must show all 8 features in a card grid with a "See all features →" link. Only 3 cards are shown. The remaining 5 features never appear on the home page.

### ❌ download.html: missing closing CTA banner

Per `new_site.md` §3.4, the download page must end with a `.cta-banner` linking to docs. Not present.

### ❌ hub.html: 2 of 4 required sections missing

Per `new_site.md` §3.7, the hub page needs 4 content blocks. Only 2 are present ("How it works", "Capabilities"). "Self-host or use the public hub" and "Hub mode in clients" are absent.

### ⚠️ about.html Contributing: 2 ecosystem repos missing

Per `new_site.md` §2 (extra_pages / ecosystem references), all 5 `ecosystem[]` items should appear. Only 3 of 5 are shown in Contributing.

### ⚠️ Easter egg: `logo-clicks:5` but no on-page discovery affordance

The logo glow easter egg requires 5 clicks with no visual hint. This is a minor UX concern but worth noting: the kit should provide a subtle hint or it should be considered too obscure to be valuable.

---

## Summary of Required Fixes

### Must fix before approval (❌ → ✅ required):

1. **[D9] `download.html` `from_source`**: display the 3 commands on 3 separate lines (`\n`-separated). Add `id="install"` to the primary install box div.
2. **[D9+D13] Home page features-overview**: show all 8 `features[]` from `content.json` in the card grid, with a "See all features →" link to `features.html`.
3. **[D13] Nav**: add `Plugins` (→ `plugins.html`) and `Docs` (→ `docs.html`) to the nav links on every page, in the correct order per `new_site.md` §5.
4. **[D13] download.html closing CTA**: add the required `.cta-banner` section at the end of the page, linking to docs.
5. **[D13] hub.html**: add "Self-host or use the public hub" and "Hub mode in clients" sections per `new_site.md` §3.7.

### Should fix (⚠️ → ✅ strongly recommended):

6. **[D11] `twitter:creator=@detain`**: add `<meta name="twitter:creator" content="@detain">` to every page `<head>`.
7. **[D6] `aria-label` on footer nav**: add `aria-label="Footer navigation"` to the footer `<nav>` element on every page.
8. **[D5] `defer` on `<script>`**: add `defer` to `<script src="js/main.js">` on all pages.
9. **[D5] Touch targets**: increase `.install-box__copy` and `.nav__toggle` hit areas to ≥44×44px.
10. **[D5] Nav toggle `aria-label`**: change to `"Toggle navigation"` and update to "Close navigation" when open.
11. **[D6] `aria-current="page"`**: add to the active nav link on each page.
12. **[D12] Copyright year**: replace hardcoded `2026` with dynamic year.
13. **[D10] Primary CTA label on home**: verify the `"Get Phlix"` vs `"Download Phlix"` discrepancy against the kit's `copy_overlay` — if no overlay, use `"Get Phlix"` verbatim.
14. **[D13] about.html Contributing**: add phlix-hub and phlix-shared to the repo list.

---

## NOT_APPROVED

Run `npm run lint` (clean for obsidian-pulse), then apply the 5 critical fixes and 9 should-fixes above. Re-review after fixes.
