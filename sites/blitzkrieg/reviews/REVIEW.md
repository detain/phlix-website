# Blitzkrieg Brand Kit Site — AUDIT FAILED

**Status**: ❌ NOT APPROVED — Multiple critical failures across all 13 dimensions.

---

## 0. Executive Summary

The Blitzkrieg site is **severely incomplete**. It is missing 4 of 8 required pages, missing all required infrastructure files (robots.txt, sitemap.xml, og.png, logo.svg, SITE.md, BUILD_LOG.md), contains fabricated content that directly contradicts the ground truth (`content.json`), has only 4 of 8 required nav links, and ships a fake install command that was flagged as a "known trap" in new_site.md §19.22.

**Overall score: 22/100**

---

## 1. Brand Fidelity & Spirit — Score: 68 ⚠️

**Verdict**: Partially compliant — aesthetic is strong but facts are fabricated.

**Compliant**:
- Deep navy (#1A1A2E) dominates backgrounds
- Combat Red (#E94560) used for CTAs and accents
- HUD corner brackets on interactive elements
- Tank-tread navigation animation
- Radar sweep ambient effect
- Dog-tag content badges
- Artillery strike loading animation
- Explosion ring effects
- Military voice/tone: "Deploy", "Intel", "Command", "Operation"
- Clipped-corner card aesthetic
- `index.html:6` — custom meta description matches brand
- `404.html:29` — "MISSION FAILED" dog-tag with error styling

**Non-compliant**:
- `download.html:63` — **FABRICATED install command**: `curl -sSL https://get.phlix.tv | bash`
  - Ground truth (`content.json:install.primary.command`): `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`
  - Flagged explicitly in new_site.md §19.22 as a "known trap" (one of 50 sites that got this wrong)
- `download.html:57-124` — **FABRICATED client listings**: Shows Linux/Windows/macOS/Docker
  - Ground truth (`content.json:clients[]`): Roku, Samsung Tizen, Windows, Mobile (React Native), DLNA device
- `clients.html:57-71` — **FABRICATED statistics**:
  - "10,000+ Active Deployments" — unverifiable, fabricated
  - "50M+ Files Streamed" — unverifiable, fabricated
  - "99.9% Uptime SLA" — fabricated (new_site.md §19.7: "never print a figure you cannot verify")
- `download.html:44` — "Commence Operation" but actual install is not mentioned at all
- `index.html:368-375` — Footer "Documentation", "Hub", "Plugins", "Contact" links are all `href="#"` — broken dead links

**Reference**: `content.json:clients[]` (lines 79-124), `content.json:install` (lines 191-212)

---

## 2. SEO — Score: 35 ❌

**Verdict**: ❌ FAILED — critical elements missing.

**Issues**:
- All pages missing `<link rel="canonical">` (required per new_site.md §10)
- All pages missing `<meta name="keywords">` (required per new_site.md §10)
- `index.html` missing `<meta property="og:image">` and `<meta name="twitter:image">` entirely
- `features.html` has no og:image or twitter:image meta tags
- `clients.html` has no og:image or twitter:image meta tags
- `download.html` has no og:image or twitter:image meta tags
- `404.html` has no canonical, og:image, or twitter:image
- No JSON-LD `SoftwareApplication` block on index.html (new_site.md §10)
- No `sitemap.xml` (required per new_site.md §1, §10)
- No `robots.txt` (required per new_site.md §1, §10)
- `index.html:6` — meta description is brand copy, not Phlix product copy from `content.json:meta.description`

**Compliant**:
- `<title>` tags are present on all pages
- `<meta name="description">` present on all pages (though content varies)

**Reference**: `new_site.md:476-477` (sitemap + robots.txt requirement), `new_site.md:468-475` (SEO spec)

---

## 3. Readability — Score: 72 ⚠️

**Verdict**: ⚠️ Marginal — some areas need work.

**Compliant**:
- Body text uses Rajdhani at 16px with 1.6 line-height
- Paragraphs have `max-width: 65ch` preventing line-length issues
- Section headings have proper hierarchy (h1 > h2 > h3)
- Card descriptions are concise and scannable
- Code blocks use `font-mono` for technical content

**Issues**:
- `features.html:51` — "Intelligence Briefing" as h1 — verbose, could be clearer
- `clients.html:49` — "Deployed units across the operation. Military precision streaming serving operations worldwide." — vague, no specific product facts
- `download.html:49-53` — Generic marketing copy, no reference to actual Phlix capabilities
- Some card descriptions (e.g., `index.html:181`) are pure brand filler: "Every media file deployed with surgical accuracy. Zero packet loss. Zero hesitation." — not traceable to content.json facts

**Reference**: `content.json:features[]` for actual feature descriptions

---

## 4. Spelling & Grammar — Score: 85 ⚠️

**Verdict**: ⚠️ Minor issues — mostly clean but some awkward constructions.

**Issues**:
- `download.html:63` — Code has `-sSL` instead of `-fsSL` (the real flag includes `f`)
- `clients.html:50` — "serving operations worldwide" is a double-plural awkward construction
- `clients.html:80` — "Secure media streaming for classified defense operations. Mil-spec encryption throughout." — fragment, no verb
- `download.html:52` — "Zero buffering. Total dominance." — vague marketing slogans

**Compliant**:
- No obvious typos in brand copy
- Command syntax is mostly correct
- Terminology consistent throughout

---

## 5. Usability — Score: 38 ❌

**Verdict**: ❌ FAILED — broken links, wrong install instructions, incomplete content.

**Critical Issues**:
- `index.html:354-356` — Footer links to "Documentation", "Hub", "Plugins" all point to `href="#"` — completely dead
- `index.html:362-363` — "About" and "Contact" links also `href="#"`
- `download.html:63` — **WRONG INSTALL COMMAND** — `curl -sSL https://get.phlix.tv | bash` is fake. The real one is in content.json and the install script is at `https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh`
- `download.html:68-122` — Download buttons are `<button>` elements, not `<a>`. They have no href and trigger JS-only behavior — the artillery-loader demo animation. No actual download link.
- Nav only has 4 items instead of 8 (see Dimension 6)
- No ecosystem section on download page (new_site.md §3.4 requires `ecosystem[]` list)

**Compliant**:
- Navigation toggle works on mobile
- External links to features.html and download.html work
- All internal relative links to existing pages are correct

**Reference**: `content.json:install.primary.command` (the authoritative install command), `content.json:ecosystem[]` (required on download page)

---

## 6. Accessibility (WCAG 2.2 AA) — Score: 55 ⚠️

**Verdict**: ⚠️ Partially compliant — brand animation respected, but navigation is incomplete.

**Compliant**:
- `prefers-reduced-motion` respected: `blitzkrieg.css:88-98` has full reset, plus `js/prefers-reduced-motion.js` applies `reduced-motion` class
- `@media (prefers-reduced-motion: reduce)` blocks in CSS for animations
- `:focus-visible` styled with 2px tactical blue ring + 2px offset (meets 3:1 for large text/icons)
- Skip link could be added (missing in current implementation)
- All interactive elements have `:focus-visible` styling
- `aria-expanded` on nav toggle
- `aria-label` on nav toggle

**Issues**:
- `index.html:52-80` — Nav only has 4 items (Home, Intel/Features, Command/Clients, Deploy/Download) instead of the required 8 (new_site.md §5: Home · Features · Clients · Download · **Plugins** · **Docs** · **Hub** · **About**)
  - Missing: Plugins, Docs, Hub, About
- No `aria-current="page"` on active nav link (only `class="active"`)
- Touch targets: buttons at 44px+ are compliant, but some nav links (`index.html:64-67`) may be undersized at 16px font with 16px padding
- `index.html:21-27` — HUD frame overlay uses `aria-hidden="true"` — correct
- No skip-to-content link visible in source (new_site.md §4 requires `.skip-link`)

**Reference**: `new_site.md:496-506` (WCAG 2.2 AA requirements), `new_site.md:360-361` (8 nav links spec)

---

## 7. Responsive (320→1920) — Score: 60 ⚠️

**Verdict**: ⚠️ Basic responsive layout works, but missing breakpoints and issues at 320px.

**Compliant**:
- `responsive.css` handles tablet/mobile breakpoints
- Hero stacks vertically at `width <= 1024px`
- Nav toggle appears at smaller widths
- Grid uses `minmax()` patterns (though see below)

**Issues**:
- `responsive.css:9` — `@media (width <= 1024px)` — uses width-over-1024 as tablet breakpoint. new_site.md §14 requires probing at 320, 375, 414, 768, 1024, 1280, 1920. No `@media (width <= 768px)` or `max-width: 768px` for tablet.
- Grid items at `index.html:818-822` (`features-grid`) use `minmax(320px, 1fr)` without `minmax(0, 1fr)` — could overflow at 320px with long unbreakable text (new_site.md §19.12)
- Same issue with `features-grid` at `responsive.css` — no override for `minmax(0, ...)`
- `index.html:397` — `.tank-tread-track` uses `gap: 6px` — fixed spacing, not fluid

**Reference**: `new_site.md:520-527` (responsive spec), `new_site.md:744-811` (§19.12 grid/overflow rules)

---

## 8. Performance — Score: 45 ⚠️

**Verdict**: ⚠️ No CDN usage (good), but font references are broken and loading is suboptimal.

**Compliant**:
- No Google Fonts CDN link in any HTML — correct per new_site.md §1 and §84-87
- No icon CDN — all icons are inline SVG
- No third-party JS libraries
- JS is vanilla, self-contained
- `defer` loading on JS via separate script tags

**Issues**:
- `blitzkrieg.css:50-54` — Font `src` references are missing entirely. No `@font-face` declarations. The site will fall back to `Impact`, `Oswald`, `system-ui` — not the brand-specified Black Ops One, Russo One, Rajdhani, Share Tech Mono. Fonts must be self-hosted WOFF2 in `css/fonts/` (new_site.md §62).
- `blitzkrieg.css:1` — Has `* @copyright 2026 Joe Huss` comment outside a CSS block — this is a CSS parse error (new_site.md §19.2 — "113 of 150 CSS files had it"). Everything after line 2 may be discarded by the browser.
- Multiple CSS files (6 separate files) cause additional HTTP requests. Should be consolidated/minified.
- Hero animation uses CSS that may not parse past the broken copyright comment.

**Reference**: `new_site.md:631-652` (§19.3 fonts must resolve locally), `new_site.md:631` (fonts must be in `css/fonts/`)

---

## 9. Content Accuracy — Score: 18 ❌

**Verdict**: ❌ CRITICAL FAILURE — fabricated install command, fabricated clients, fabricated stats.

**Critical Issues**:
- `download.html:63` — **FABRICATED INSTALL COMMAND**: `curl -sSL https://get.phlix.tv | bash`
  - Authority: `content.json:install.primary.command` = `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`
  - This is a direct violation of new_site.md §2 (single source of truth) and §19.22 (known regression)
- `download.html:57-124` — **FABRICATED CLIENTS**: Shows Linux, Windows, macOS, Docker
  - Authority: `content.json:clients[]` = Roku, Samsung Tizen, Windows, Mobile (React Native beta), DLNA device
  - These are not even the correct clients — this is inventing a product that doesn't exist
- `clients.html:57-71` — **FABRICATED STATS**:
  - "10,000+ Active Deployments"
  - "50M+ Files Streamed"
  - "99.9% Uptime SLA"
  - Per new_site.md §19.7: "never print a figure you cannot verify"
- `clients.html:74-103` — **FABRICATED "units"**: Defense Contractor, Broadcast Network, Research Facility, Media Production
  - Authority: `content.json:clients[]` lists actual clients (Roku, Tizen, etc.), not fictional enterprise users
- `download.html` — No ecosystem section from `content.json:ecosystem[]` (phlix-server, phlix-hub, phlix-shared, phlix-docs, phlix-plugin-example) as required by new_site.md §3.4
- `download.html` — No install snippet in `.code-block` as required by new_site.md §3.4

**Compliant**:
- No content from content.json appears anywhere, so there's nothing accurate to cite

**Reference**: `content.json:clients[]` vs. site content; `content.json:install` vs. download.html command; `new_site.md:190-212`

---

## 10. CTA / Funnel — Score: 40 ⚠️

**Verdict**: ⚠️ Download is the goal but the path is broken.

**Compliant**:
- Primary CTA "Deploy Now" visible in hero above fold (`index.html:95-103`)
- "Deploy" button in nav links to download.html (`index.html:67`)
- Download page has CTA buttons (though they're broken — see Dimension 5)
- Kit's `conversion_funnel` (blitzkrieg.js:798-806) specifies "Deploy Now" → download → cta_ladder

**Issues**:
- Download page does not show the correct install command (see Dimension 9)
- Download page does not list actual clients (Roku, Tizen, etc.)
- Download page does not show ecosystem (phlix-server, etc.)
- `index.html:354-356` — "Documentation", "Hub", "Plugins" links are `href="#"` — users cannot navigate to learn more
- No "View source" buttons on clients page for clients with `repo` set
- No CTA banner linking to docs on features page (new_site.md §3.2)
- The brand kit's nav label "Deploy" for Download is correct, but the page doesn't deliver

**Reference**: `blitzkrieg.js:798-806` (conversion_funnel spec)

---

## 11. Social Metadata — Score: 25 ❌

**Verdict**: ❌ FAILED — og:image missing, twitter metadata missing on most pages.

**Issues**:
- `index.html:3-17` — `<head>` section has no `og:` meta tags at all (og:title, og:description, og:image, og:url, og:type, og:site_name)
- `index.html` has no `twitter:` meta tags
- `features.html`, `clients.html`, `download.html` — also have no og: or twitter: meta
- `404.html` has no og:image or twitter:image
- **No `img/og.png` file exists** — required per new_site.md §1 and §11, and §19.5 explicitly flags SVG og:image as rejected
- No `og:image` absolute URL — new_site.md §11 requires absolute URL to 1200×630 PNG
- No `<meta property="og:type">` on any page
- No `<meta property="og:site_name">` on any page

**Compliant**:
- Favicon SVG exists at `img/favicon.svg`
- Theme-color meta exists (#1A1A2E)

**Reference**: `new_site.md:480-492` (social metadata spec), `new_site.md:661-675` (§19.5 og:image must be PNG)

---

## 12. Localization — Score: 75 ⚠️

**Verdict**: ⚠️ Partially compliant — basic setup is there but incomplete.

**Compliant**:
- `<html lang="en">` set on all pages (matches `content.json:site.default_locale`)
- Uses logical CSS properties where practical (flexbox with gap, not explicit left/right)
- No locale-unsafe formatting detected in visible text

**Issues**:
- No `<link rel="alternate" hreflang="...">` for additional locales
- `content.json` has only `en` in `supported_locales`, so this may be acceptable
- Font subsetting not configurable (can't subset for specific scripts without self-hosted WOFF2)

**Reference**: `content.json:site.default_locale` = "en", `new_site.md:531-536`

---

## 13. Experience Fidelity — Score: 62 ⚠️

**Verdict**: ⚠️ Brand aesthetic is authentic but product representation is false.

**Compliant**:
- Military HUD aesthetic fully realized: corner brackets, status bars, coordinate readouts
- Tank-tread navigation animation implemented and animated
- Artillery strike loading animation present
- Radar sweep in hero section
- Dog-tag styled badges throughout
- Explosion ring effects on interactions
- Clipped-corner card aesthetic on briefing cards
- Color palette exactly matches brand kit
- Typography scale uses brand-specified fonts (in fallbacks)
- Voice is authoritative, military, decisive — no casual language
- Navigation labels use brand vocabulary: "Intel" (Features), "Command" (Clients), "Deploy" (Download)
- 404 page matches brand with "MISSION FAILED" and targeting reticle

**Non-compliant**:
- Fabricated client list makes the product look completely different
- Fabricated install command would direct users to wrong installation
- Fabricated statistics undermine credibility
- Missing 4 nav items breaks the experience the brand kit designed
- No SITE.md or BUILD_LOG.md — no design documentation

**Reference**: `blitzkrieg.js` (full brand spec for reference)

---

## Infrastructure Checklist (per new_site.md §1)

| File | Status |
|------|--------|
| `index.html` | ✅ Exists |
| `features.html` | ✅ Exists |
| `clients.html` | ✅ Exists |
| `download.html` | ✅ Exists |
| `plugins.html` | ❌ **MISSING** |
| `docs.html` | ❌ **MISSING** |
| `hub.html` | ❌ **MISSING** |
| `about.html` | ❌ **MISSING** |
| `404.html` | ✅ Exists |
| `css/base.css` | ❌ **MISSING** (consolidated into blitzkrieg.css) |
| `css/theme.css` | ❌ **MISSING** (consolidated into blitzkrieg.css) |
| `css/components.css` | ❌ **MISSING** (consolidated into component CSS files) |
| `js/main.js` | ❌ **MISSING** (has blitzkrieg.js + other brand JS) |
| `img/logo.svg` | ❌ **MISSING** |
| `img/og.png` | ❌ **MISSING** |
| `img/favicon.svg` | ✅ Exists |
| `img/PROMPTS.md` | ❌ **MISSING** |
| `robots.txt` | ❌ **MISSING** |
| `sitemap.xml` | ❌ **MISSING** |
| `SITE.md` | ❌ **MISSING** |
| `BUILD_LOG.md` | ❌ **MISSING** |
| `css/fonts/` | ❌ **MISSING** (no self-hosted WOFF2 fonts) |

---

## Lint Results

`npm run lint` returned `Missing script: lint` — no linting configured for this project. Per new_site.md §17, the lint command should exist and should include HTML, CSS, and JS linting.

---

## Summary of Critical Fixes Required

### P0 — Showstoppers (all dimension scores < 50)

1. **Replace fabricated install command** on `download.html:63` with content.json's real command
2. **Replace fabricated client list** on `download.html` with content.json clients (Roku, Tizen, Windows, Mobile, DLNA)
3. **Remove fabricated stats** from `clients.html` (lines 56-71)
4. **Fix broken footer links** (`href="#"` → actual links to features, clients, download, plugins, docs, hub, about)
5. **Add missing 4 pages**: plugins.html, docs.html, hub.html, about.html
6. **Add 8-item navigation** (currently only 4 items): Home, Features, Clients, Download, Plugins, Docs, Hub, About

### P1 — High Priority (multiple dimensions depend on these)

7. **Add og:image PNG** (generate from brand assets)
8. **Add robots.txt** and **sitemap.xml**
9. **Add self-hosted fonts** in `css/fonts/` with proper @font-face declarations
10. **Fix CSS copyright comment bug** (`blitzkrieg.css:1-2` — `* @copyright` outside block)
11. **Add canonical URLs** to all pages
12. **Add og:/twitter: meta tags** to all pages
13. **Add SITE.md** and **BUILD_LOG.md**
14. **Add logo.svg** to `img/`

### P2 — Medium Priority

15. Add JSON-LD SoftwareApplication schema to index.html
16. Add ecosystem section to download.html
17. Fix grid `minmax` overflow issues per §19.12
18. Add skip-to-content link
19. Add `aria-current="page"` to active nav link

---

**Final verdict**: NOT APPROVED. Site is 22/100. All 13 dimensions have critical failures. The fabricated content (install command, client list, stats) is the most severe issue — it presents a completely wrong product to users. The missing pages, broken navigation, and missing infrastructure files compound this into a total failure of the spec.
