# REVIEW — Cyber Pursuit Brand Kit Site

**Reviewer:** Hostile Audit
**Date:** 2026-07-28
**Site:** `sites/cyber-pursuit/`
**Brand Kit:** `brand-kits/cyber-pursuit.js`
**Ground Truth:** `shared/content.json`, `new_site.md`, `brand_kit_schema.js`

---

## Summary

**Status: ❌ REJECTED — multiple critical defects**

The site has 1 **critical** content accuracy failure (wrong install command), 3 **major** SEO/social metadata failures (og:image SVG, missing twitter:image on 8 pages, 404 missing all metadata), and several **moderate** issues. No dimension scores above 80.

---

## Scores by Dimension

| # | Dimension | Score | Status | Key Citations |
|---|-----------|-------|--------|--------------|
| 1 | Brand fidelity & spirit | 82 | ⚠️ | CSS uses correct tokens; Matrix rain + scanlines present; `do_dont.dont` avoided; but font-face uses `local()` only — no actual WOFF2 |
| 2 | SEO | 55 | ❌ | `download.html` title is 15 chars (underutilized); og:image is SVG on all 9 pages; 404.html missing canonical/og:url/og:image/twitter:card; sitemap excludes 404 but sitemap doesn't note that |
| 3 | Readability | 78 | ⚠️ | Good line-height and contrast; hero-subheadline max-width: 55ch is appropriate; no walls of text; some section-subtitle at 60ch could be tighter |
| 4 | Spelling & grammar | 88 | ⚠️ | No typos found; voice is correct terminal/terse; but `avoid_words` not explicitly checked |
| 5 | Usability | 75 | ⚠️ | Download path is 2 clicks from home; mobile nav present; `defer` missing on `main.js` script tag; intensity toggle persists via localStorage |
| 6 | Accessibility | 70 | ❌ | matrix rain + scanlines hidden via `aria-hidden` ✅; prefers-reduced-motion respected in CSS and JS ✅; but 404.html has no landmark nav; buttons missing visible focus ring styles in theme; |
| 7 | Responsive | 65 | ❌ | Grid tracks use bare `1fr` (violates new_site.md §19.12); boot sequence parallax on scroll may cause overflow at small widths; evidence-board at 320px may overflow |
| 8 | Performance | 68 | ⚠️ | No CDNs ✅; fonts self-hosted via `local()` only (no WOFF2 files in repo); matrix rain at 30fps is moderate; no lazy loading detected |
| 9 | Content accuracy | **40** | ❌ | **CRITICAL: download.html shows fake dev setup (`git clone && php -S`) instead of real install command from content.json**; Mobile status says "stable" but content.json says "beta" |
| 10 | CTA / funnel | 75 | ⚠️ | Primary CTA above fold ✅; contrast 15:1 (passes 3:1) ✅; but "Initialize System" is vague — kit uses it but it doesn't describe what happens |
| 11 | Social metadata | 30 | ❌ | og:image is `og.svg` (MUST be PNG per content.json + new_site.md §19.5); 8 pages missing twitter:image; 404 missing all social meta |
| 12 | Localization | 85 | ⚠️ | `lang="en"` on all pages ✅; strings mostly from kit voice; content.json strings not centralized in HTML (present inline) |
| 13 | Experience fidelity | 80 | ⚠️ | site_architecture.homepage_narrative implemented correctly; terminal aesthetic fully realized; Ghost mascot present and correct |

---

## Critical Defects (must fix)

### ❌ D1 — Content Accuracy: Wrong Install Command

**File:** `download.html:81-89`

```html
<pre><code id="install-cmd"># Clone the server
git clone https://github.com/detain/phlix-server.git
cd phlix-server

# Start the built-in server
php -S localhost:32400

# Or run with the daemon (recommended for production)
./bin/phlix-server start</code></pre>
```

This is a **dev checkout, not an install**. `new_site.md §19.22` explicitly calls this out as the #1 regression:

> "A dev checkout is NOT an install: it creates no database, no service, and runs no migrations."

`content.json` is explicit that the install command is:

```
curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash
```

**Fix:** Replace with the content.json `install.primary.command` verbatim.

---

### ❌ D2 — Social Metadata: og:image is SVG, not PNG

**All 9 pages** set `og:image` to `img/og.svg`. Per `content.json`:
> "og:image must be PNG not SVG. Per-site filename only... Keep og.svg as the editable source and rasterise with: node tools/gen-og.mjs --site <slug>"

`tools/check-meta.mjs` confirms:
- `cyber-pursuit/about.html: og:image "...og.svg" does not end with .png`
- `cyber-pursuit/about.html: og:image !== expected "...og.png"`

No `og.png` file exists in `sites/cyber-pursuit/img/`.

**Fix:** Run `node tools/gen-og.mjs --site cyber-pursuit` to generate the PNG, then update all `og:image` meta tags to point to `img/og.png`.

---

### ❌ D3 — SEO: 404.html Missing All Social/Cannonical Metadata

`404.html` has only:
- `<meta name="robots" content="noindex" />`
- `<meta name="theme-color" />`
- `<link rel="canonical" />` — **NOT present**
- `<meta property="og:*">` — **NOT present**
- `<meta name="twitter:*">` — **NOT present**

Per new_site.md §4: every page including 404 needs canonical/og:url. 404 is excluded from sitemap but still needs the meta tags (the noindex prevents indexing, not meta generation).

Also per new_site.md §11, `og:image` is required on every page `<head>`.

**Fix:** Add canonical, og:type, og:site_name, og:url, og:title, og:description, og:image, twitter:card, twitter:title, twitter:description, twitter:image to 404.html.

---

## Major Defects

### ⚠️ D4 — Social Metadata: Missing twitter:image on 8 Pages

Pages missing `twitter:image`:
- `about.html` — missing
- `clients.html` — missing  
- `docs.html` — missing
- `download.html` — missing
- `features.html` — missing
- `hub.html` — missing
- `plugins.html` — missing
- `404.html` — missing

`check-meta.mjs` output: `✗ cyber-pursuit/about.html: expected 1 twitter:image, found 0`

**Fix:** Add `twitter:image` to all pages pointing to absolute URL of `img/og.png` (after generating the PNG per D2).

---

### ⚠️ D5 — Responsive: Grid Tracks Use Bare `1fr` (Horizontal Overflow Risk)

`download.html` line 374:
```css
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
```

Per new_site.md §19.12:
> "Grid tracks need `minmax(0, 1fr)`, not `1fr`."

Also `theme.css:419`:
```css
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
```

This same pattern appears in `components.css` grids.

A long unbreakable token forces the grid wider than the viewport at 320px.

**Fix:** Change all `1fr` grid tracks to `minmax(0, 1fr)` and ensure text wrapping is applied to body text via `overflow-wrap: anywhere`.

---

### ⚠️ D6 — Performance: Font-face Uses `local()` Only — No WOFF2 Files

`base.css:155-169`:
```css
@font-face {
  font-family: 'Share Tech Mono';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Share Tech Mono'), local('ShareTechMono-Regular');
}
```

Per new_site.md §1 and §19.3:
> "Self-hosted fonts as WOFF2 and declare them with `@font-face` + `font-display: swap`."

> "Every `@font-face` `src` must point at a WOFF2 that exists in the repo."

No WOFF2 files exist in `sites/cyber-pursuit/css/fonts/` or `shared/assets/fonts/`. The site relies entirely on the user's local system having Share Tech Mono / VT323 installed, which is unreliable.

**Fix:** Either:
1. Copy WOFF2 files from `shared/assets/fonts/` for Share Tech Mono and VT323, OR
2. Reference them via the relative path `../../assets/fonts/` in the @font-face src

Verify fonts exist in shared pool via `shared/data/font-sources.json`.

---

### ⚠️ D7 — Content Accuracy: Mobile Client Status Wrong

**File:** `clients.html:123`

```html
<span class="terminal-status">stable</span>
```

But `content.json:114` says:
```json
{ "id": "mobile", "status": "beta" }
```

Also `download.html:122-133` says "In development" and `clients.html:134` says "In development" — inconsistent with the terminal-window status showing "stable".

**Fix:** Change status to `beta` on the Mobile client card in clients.html.

---

### ⚠️ D8 — Content Accuracy: Missing Ecosystem Section on Download Page

Per `new_site.md §3.4` and `content.json`:
> "**Ecosystem** list from `ecosystem[]`" must appear on download page.

The download page is missing the ecosystem section entirely (`phlix-server`, `phlix-hub`, `phlix-shared`, `phlix-docs`, `phlix-plugin-example`).

The download page shows only: server install, Docker, and clients.

**Fix:** Add the ecosystem list from `content.json.ecosystem[]` to `download.html`.

---

### ⚠️ D9 — Content Accuracy: FAQ Mismatch on License

`about.html:124` says:
> "MPL-2.0. Do what you want with it. Modify it, fork it, sell it — just keep the source code open if you distribute changes."

But `content.json:156` is the authoritative answer:
> "Phlix Server and the Hub are MPL-2.0 — open source, and you can build on them commercially. If you modify a Phlix file, that file stays open; anything you add alongside it is yours. The shared libraries, plugins, and clients are MIT so you can build on them freely."

The about page's FAQ answer **does not mention** the dual-license distinction (MPL-2.0 for server/hub, MIT for libs/plugins/clients). Per new_site.md §19.7: "Never state one licence 'across the board'."

**Fix:** Use the content.json FAQ answer verbatim or rephrase it to clearly state the dual-license structure.

---

### ⚠️ D10 — JavaScript: Missing `defer` on main.js Script Tag

`index.html:637`:
```html
<script src="js/main.js"></script>
```

Per `new_site.md §7`:
> "Vanilla, dependency-free, **`defer`-loaded**."

And `new_site.md §4` shell example:
```html
<script src="js/main.js" defer></script>
```

Also `download.html:207`, `features.html:215`, `clients.html:171`, `about.html:153`, `hub.html:177`, `404.html:60` — all missing `defer`.

**Fix:** Add `defer` to all `<script src="js/main.js">` tags.

---

### ⚠️ D11 — Accessibility: 404.html Missing Navigation Landmark

`404.html:20-24`:
```html
<header class="site-header" role="banner">
  <div class="header-inner">
    <a href="index.html" class="site-wordmark" aria-label="Phlix — Home"> Phlix </a>
  </div>
</header>
```

The header has no `<nav>` element with `aria-label="Primary navigation"`. The full nav is missing.

Per new_site.md §4, the shell must include the full nav list in `<nav class="main-nav">`. While 404 pages are minimal per §2A, the nav should still be functional for recovery links.

**Fix:** Either include the full nav or link directly to key pages (Home, Download, Features).

---

### ⚠️ D12 — SEO: Some Page Titles Could Be Improved

`download.html:6` — title is `Download — Phlix` (22 chars) — this is fine.

`about.html:6` — title is `About — Phlix` (17 chars) — fine.

No title exceeds 60 chars. All within spec.

---

## Moderate Issues

### ⚠️ D13 — Accessibility: Button Focus Ring Not Visible in Some Contexts

The `base.css:focus-visible` rule at line 205-209 sets:
```css
:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(0,255,65,0.15);
}
```

But `components.css:26-29` overrides for `.btn:focus-visible` to only:
```css
.btn:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
```

The outer glow `box-shadow` is removed for buttons, reducing visibility on dark surfaces.

**Fix:** Restore the box-shadow in the `.btn:focus-visible` rule, or keep the glow on buttons with `box-shadow: 0 0 0 4px rgba(0,255,65,0.15)`.

---

### ⚠️ D14 — Accessibility: Missing Skip Link Visibility

`.skip-link:focus` at `theme.css:66-70` only sets `top: var(--space-4)`. On dark backgrounds, the skip link background is `var(--color-primary)` (#00FF41) with text `#0D0D0D` — this passes contrast. However, the link needs to be clearly visible against the dark background.

**Assessment:** Passes contrast (matrix green on void black is 15:1), but could be more prominent.

---

### ⚠️ D15 — Responsive: Footer Grid at 320px

`theme.css:592-596`:
```css
.footer-grid {
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  ...
}
```

At 320px viewport, 3 columns × 150px = 450px > 320px. The grid will overflow unless wrapped. `minmax(0, 1fr)` pattern not applied.

Also `footer-legal` text may overflow at small widths with `overflow-wrap: anywhere` applied via base.css, but this is correct per §19.12.

---

### ⚠️ D16 — SEO: OG URL Mismatch

`index.html:15` has:
```html
<link rel="canonical" href="https://detain.github.io/phlix-website/cyber-pursuit/" />
```

But `og:url` is the same. The sitemap has the correct URL. No canonical/og:url mismatch.

---

### ⚠️ D17 — Brand: Fonts Listed as "Google Fonts" in SITE.md

`SITE.md:23-24`:
> "**Headlines/UI**: Share Tech Mono (Google Fonts fallback: Courier New)"
> "**Display/Numbers**: VT323 (Google Fonts fallback: Courier)"

SITE.md incorrectly states these are Google Fonts, but per spec they should be self-hosted WOFF2. The CSS uses `local()` only which is not true self-hosting.

---

## Verified Passing Items

### ✅ Brand Fidelity: Core Elements Present
- Matrix green (#00FF41) as primary ✅
- Void black (#0D0D0D) as background ✅
- Terminal-dark surfaces (#1F1F1F) ✅
- Sharp corners (0px radius) everywhere ✅
- Share Tech Mono and VT323 fonts (via local fallback) ✅
- Matrix rain canvas with green glow ✅
- CRT scanlines overlay ✅
- Glitch text animation on wordmark ✅
- Terminal window styled cards ✅
- Boot sequence hero animation ✅
- Mascot Ghost (pulsing cursor) ✅
- `prefers-reduced-motion` in CSS at `theme.css:41-48` and `base.css:23-36` ✅
- JS matrix rain gated at `main.js:12` with `matchMedia('(prefers-reduced-motion: no-preference)')` ✅
- JS scroll reveal gated at `main.js:101` with same matchMedia ✅
- `do_dont.dont` avoided — no warm colors, no rounded corners, no consumer-friendly language ✅

### ✅ SEO: Core Structure
- One `<h1>` per page ✅ (hero on home, `.page-header h1` elsewhere)
- Semantic landmarks (banner, navigation, main, contentinfo) ✅
- Descriptive anchor text ✅
- JSON-LD on home page ✅
- sitemap.xml with all 8 canonical pages ✅
- robots.txt referencing sitemap ✅

### ✅ Accessibility: Key Items
- `aria-hidden="true"` on matrix rain canvas and scanlines ✅
- `aria-label` on nav and landmark elements ✅
- `aria-current="page"` on current nav link ✅
- `aria-expanded` on nav toggle ✅
- Skip link targets `#main-content` ✅
- `role="list"` on all `<ul>` navs ✅
- Labels on interactive elements ✅

### ✅ Performance
- No Google Fonts CDN link ✅
- No icon CDNs ✅ (inline SVG sprite)
- `font-display: swap` on @font-face ✅
- Matrix rain canvas is hardware accelerated (uses 2D context) ✅
- CSS animations use `transform` and `opacity` (compositor-friendly) ✅
- No render-blocking scripts ✅ (though missing `defer` is a spec violation)

### ✅ Content Accuracy: Facts from content.json
- Hero headline matches `tagline_primary` ✅
- Pitch bullets match `pitch_bullets[]` exactly ✅
- Features match `features[]` ids and content ✅
- Client names match `clients[]` ✅
- FAQ questions match `faq[]` exactly ✅
- Footer columns match `footer.columns` ✅
- Footer tagline matches `footer.tagline` ✅

### ✅ CTA / Funnel
- Primary CTA "Initialize System" above fold on home ✅
- Primary CTA has 15:1 contrast (#00FF41 on #0D0D0D) ✅
- Download reachable in 2 clicks from home ✅

---

## Specific Fixes Required

1. **[CRITICAL] `download.html:81-89`**: Replace fake dev setup with `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`

2. **[CRITICAL] All 9 pages**: Run `node tools/gen-og.mjs --site cyber-pursuit` to generate `og.png`, then update all `og:image` meta tags from `og.svg` to `og.png`

3. **[CRITICAL] `404.html`**: Add canonical, og:type, og:site_name, og:url, og:title, og:description, og:image, twitter:card, twitter:title, twitter:description, twitter:image meta tags

4. **[MAJOR] 8 pages** (`about.html`, `clients.html`, `docs.html`, `download.html`, `features.html`, `hub.html`, `plugins.html`, `404.html`): Add `twitter:image` meta tag

5. **[MAJOR] `clients.html:123`**: Change Mobile client status from `stable` to `beta`

6. **[MAJOR] `download.html`**: Add ecosystem section from `content.json.ecosystem[]`

7. **[MAJOR] `about.html:124`**: Update FAQ answer to reflect dual license (MPL-2.0 for server/hub, MIT for libs/clients)

8. **[MAJOR] All 9 HTML pages + `404.html`**: Add `defer` to `<script src="js/main.js">`

9. **[MAJOR] `theme.css`, `components.css`**: Change all grid `1fr` tracks to `minmax(0, 1fr)`

10. **[MODERATE] `base.css:155-169`**: Add actual WOFF2 font files and update `@font-face` src to point to local WOFF2 files (reference `../../assets/fonts/` path or copy to `css/fonts/`)

11. **[MODERATE] `404.html`**: Add `<nav aria-label="Primary navigation">` with recovery links

12. **[MODERATE] `SITE.md:23-24`**: Fix font description — these are NOT Google Fonts

---

## Final Assessment

**All dimensions ≥ 90? NO**
**Any ❌? YES** (dimensions 2, 6, 7, 9, 11)
**APPROVED? NO**

The site has exceptional brand fidelity and the Cyber Pursuit identity is well-realized. However, the **critical content accuracy failure** (wrong install command) and **major social metadata failures** (SVG og:image, missing twitter:image on 8 pages) are blockers. The responsive grid issue and missing `defer` on scripts compound the problems.

Fix the critical and major items, then re-review.
