# REVIEW — Velocity X Brand Kit Site

**Reviewer:** Hostile Audit  
**Date:** 2026-07-28  
**Ground Truth:** `new_site.md`, `shared/content.json`, `brand_kit_schema.js`  
**Lint:** `npm run lint` — PASSES (velocity-x files clean, errors are from other sites)

---

## Summary

**APPROVED: NO**  
**REJECT — 20+ critical defects found across all 13 dimensions.**

The site fails multiple hard gates. Content is fabricated, install commands are wrong, license is wrong, social metadata is incomplete, and the `og:image` is an SVG when a PNG is explicitly required.

---

## 1. Brand Fidelity & Spirit

**Score: 45 — ❌ FAIL**

| Aspect | Status | Evidence |
|--------|--------|----------|
| Colors | ⚠️ | `--color-primary: #F05` is shorthand for `#FF0055` ✅. `#0AF` for `#00AAFF` ✅. All tokens match kit hex values. |
| Typography | ⚠️ | Bebas Neue (headlines), Space Grotesk (body), Space Mono (mono) ✅. Self-hosted via `@font-face` ✅. ALL CAPS on headings ✅. |
| Shape language | ⚠️ | `border-radius: 0` throughout ✅. Sharp corners match kit `corner_radius.xl: "0px"`. |
| Voice | ⚠️ | Kit voice is "Rebellious, Electric, Bold, Snappy, Unapologetic." Nav labels use extreme-sports metaphors ("Drop In", "The Lineup", "The Stats") ✅. |
| Motion | ⚠️ | `prefers-reduced-motion` respected ✅. Kickflip, wheel-spin animations ✅. |
| Dark background | ⚠️ | `#000` background throughout ✅. |
| **Wrong install cmd** | ❌ | `download.html:64` — `curl -fsSL https://get.phlix.online | sh` is **fabricated**. Real command per `content.json` is `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh \| sudo bash` (`download.html:64`, `docs.html:56`). This is a fabricated domain. |
| **Wrong license** | ❌ | `about.html:89` claims "GNU General Public License v3.0 (GPLv3)." Real license per `content.json` FAQ: "Phlix Server and the Hub are MPL-2.0." `new_site.md` §16 explicitly forbids stating one license across the board. |
| **Wrong server repo** | ❌ | `download.html:135` links to `https://github.com/phlix/phlix/releases`. Correct org is `detain` per `content.json`: `https://github.com/detain/phlix-server`. |
| **8 fabricated clients** | ❌ | `clients.html` + `download.html` list: Roku, Apple TV, Android TV, iOS, Windows, macOS, Linux, Web (8 total). `content.json` defines only 5: Roku, Samsung Tizen, Windows, Mobile (iOS+Android), DLNA. Apple TV, Android TV, macOS, Linux, Web are **fabricated**. |
| **Wrong server language** | ❌ | `about.html:124` says "Server in Go." Per `new_site.md` §16, server is "PHP 8.3+ on Workerman 5.x." |
| **Wrong plugins repo** | ❌ | `plugins.html:146` links `https://github.com/phlix/plugins`. Per `content.json` ecosystem, correct is `https://github.com/detain/phlix-plugin-example`. |
| **Footer missing columns** | ❌ | Footer is a single-column copyright line. `new_site.md` §5 requires 3 columns from `content.json.footer.columns`. No Product/Developers/Project column structure. |
| **Tagline missing** | ❌ | Footer should have `content.json.footer.tagline` ("Open-source media, on your terms.") rendered in `.footer-tagline`. Not present. |
| **Proof stats fabricated** | ❌ | `index.html:181-195` shows "12000 GitHub Stars", "15 Supported Platforms", "0.2s Startup Time", "100% Open Source." These numbers are **not** in `content.json` and cannot be verified on a static page. `new_site.md` §19.7: "Do not print a star count, contributor count, download total, or user number — a static page cannot verify it and an invented figure is a fabrication." |

**Verdict:** Brand kit colors/shapes/motion/voice are well-implemented, but content is fabricated throughout. Hard gate failures in install command, license, client list, tech stack description, footer structure, and proof stats.

---

## 2. SEO

**Score: 35 — ❌ FAIL**

| Issue | Evidence |
|--------|----------|
| **No `<link rel="canonical">`** | None of the 9 pages have a canonical URL. Required per `new_site.md` §10. |
| **No `<meta name="keywords">`** | `index.html` has description but no keywords. Required per `new_site.md` §10. |
| **Missing OG metadata on most pages** | `download.html`, `clients.html`, `hub.html`, `plugins.html`, `docs.html`, `about.html`, `404.html` — none have any OG meta tags. |
| **Missing Twitter metadata on all pages** | Zero pages have `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`, or `twitter:creator=@detain`. |
| **No JSON-LD on home page** | `index.html` has no `SoftwareApplication` JSON-LD block. Required per `new_site.md` §10. |
| Title length | `index.html:7` "Velocity X — Extreme Media Server" = 39 chars ✅ (≤60). |

---

## 3. Readability

**Score: 75 — ⚠️ WARNING**

- Body text: Space Grotesk 400, `line-height: 1.55` ✅
- Max-width on paragraphs: `max-width: 70ch` ✅
- No full-width text walls
- Code blocks: monospace, proper styling
- Section hierarchy is clear
- Brand voice is consistent: punchy, short sentences, imperative mood ✅

**Issues:**
- `index.html:7` title "Velocity X — Extreme Media Server" — "Extreme Media Server" is off-brand. Kit says "Extreme sports energy fused with media server culture." Not "Extreme Media Server."
- `about.html` philosophy section: "Phlix is GPLv3" — wrong license (see Brand Fidelity).

---

## 4. Spelling & Grammar

**Score: 82 — ⚠️ WARNING**

- Generally clean, short punchy sentences
- `about.html:59`: "No hidden paid tiers, no feature-gated licenses, no 'contact sales' for basic functionality" — correct
- No obvious typos
- Brand kit has Chinese characters in audience field (`velocity-x.js:86`): `"Anyone who个性 rejects the mainstream"` — this is in the brand kit source, not rendered on site, but indicates copy-paste contamination in kit authorship. Not a site defect but noted.

---

## 5. Usability

**Score: 60 — ⚠️ WARNING**

- Skip link present ✅ (`index.html:29`)
- Mobile nav toggle present ✅
- Primary CTA above fold ✅
- Download reachable in ≤2 clicks from home ✅
- `prefers-reduced-motion` respected throughout ✅
- Copy-to-clipboard on install commands ✅
- Accordion FAQ works ✅

**Issues:**
- **Install command is fake** — even if user copies it, it won't work (see Brand Fidelity)
- Footer only has one column — no Product/Developers/Project links
- `download.html` clients section links to `https://channelstore.roku.com`, `https://apps.apple.com`, `https://play.google.com` — generic app store URLs that aren't Phlix's actual channel pages

---

## 6. Accessibility (WCAG 2.2 AA)

**Score: 45 — ❌ FAIL**

| Requirement | Status | Evidence |
|-------------|--------|----------|
| `prefers-reduced-motion` | ✅ | `base.css:198-205`, `main.js` gated animations |
| Skip link | ✅ | `index.html:29`, visible on focus |
| `aria-current="page"` on nav | ⚠️ | Nav links use `class="active"` but no `aria-current="page"` attribute per `new_site.md` §4 |
| Visible focus ring | ✅ | Hot pink 2px ring on `:focus-visible` |
| Semantic landmarks | ⚠️ | `role="banner"`, `role="contentinfo"`, `<main id="main">` — each once ✅. But `role="navigation"` missing on some footers |
| 44px touch targets | ✅ | Buttons have adequate padding |
| 200% zoom | ⚠️ | Not tested in this review, but grid uses `minmax(280px, 1fr)` — could overflow at 200% zoom per `new_site.md` §19.12 |
| **Contrast on `#888` muted text** | ❌ | `#888888` on `#111111` surface = ~3.52:1. Body text requires 4.5:1. This FAILS WCAG AA. |
| `aria-expanded` on accordion | ✅ | Accordion triggers have `aria-expanded="false"` initially |
| `aria-controls` on accordion | ⚠️ | Accordion trigger has no `aria-controls` pointing to the content panel ID |
| `role="list"` on nav | ⚠️ | `features.html` nav has `role="list"` ✅, `download.html` nav is missing it |

**Contrast issue:**
- `--color-text-muted: #888` used for muted body text like `card__text`, `hero__subtitle`
- On `--color-surface: #111` background: contrast ratio ~3.52:1
- WCAG AA requires 4.5:1 for body text
- **This is a hard WCAG 2.2 AA gate failure.** `new_site.md` §12: "Contrast: body text ≥ 4.5:1"

---

## 7. Responsive (320→1920)

**Score: 72 — ⚠️ WARNING**

| Breakpoint | Status | Evidence |
|------------|--------|----------|
| Mobile nav | ✅ | `theme.css:712-738` hamburger toggle works |
| 320px | ⚠️ | `.hero__title` uses `clamp(3rem, 15vw, 6rem)` — at 320px this is 3rem, may clip |
| Grid overflow risk | ⚠️ | `feature-grid--3` uses `minmax(320px, 1fr)` — one card per row at narrow widths ✅. But `.feature-grid` uses `minmax(280px, 1fr)` which could cause 200% zoom overflow per `new_site.md` §19.12 |
| No horizontal scroll | ✅ | `overflow-x: hidden` on body ✅ |
| 200% text zoom | ⚠️ | Not physically tested; grid tracks use bare `1fr` in places — per `new_site.md` §19.12 this is a known overflow cause |
| Container max-width | ✅ | `1440px` from kit ✅ |

---

## 8. Performance (self-hosted fonts, no CDNs)

**Score: 85 — ✅ PASS**

| Check | Status |
|-------|--------|
| No Google Fonts CDN | ✅ — Self-hosted via `@font-face` in `base.css` |
| No icon CDNs | ✅ — Inline SVG only |
| No external JS CDNs | ✅ — Vanilla JS only |
| `font-display: swap` | ✅ |
| CSS custom properties | ✅ — All tokens from kit design_tokens |

**Note:** Font files not verified to exist at `../fonts/` path in site folder. Spec requires fonts in `css/fonts/` or `shared/assets/fonts/`. BUILD_LOG claims self-hosted but actual font files not checked in this review.

---

## 9. Content Accuracy (install command from content.json)

**Score: 15 — ❌ FAIL — CRITICAL**

| Item | Expected | Actual | Location |
|------|----------|--------|----------|
| **Install command** | `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh \| sudo bash` | `curl -fsSL https://get.phlix.online \| sh` | `download.html:64`, `docs.html:56` |
| **Domain in use** | `detain.github.io/phlix-website` per `content.json` | `phlix.online` (fabricated) | `robots.txt`, sitemap |
| **License** | MPL-2.0 (phlix-server + phlix-hub), MIT (shared libs/plugins/clients) | "GPLv3" | `about.html:89` |
| **Server tech** | PHP 8.3+, Workerman 5.x | "Go" | `about.html:124` |
| **Clients** | 5 (Roku, Samsung Tizen, Windows, Mobile, DLNA) | 8 (Roku, Apple TV, Android TV, iOS, Windows, macOS, Linux, Web) | `clients.html`, `download.html` |
| **Plugin repo** | `github.com/detain/phlix-plugin-example` | `github.com/phlix/plugins` (doesn't exist) | `plugins.html:146` |
| **Server repo** | `github.com/detain/phlix-server` | `github.com/phlix/phlix-server` (wrong org) | `download.html:135` |

`new_site.md` §19.22: "SINGLE SOURCE OF TRUTH for install commands — do not retype or invent one." And: "A dev checkout is NOT an install."

---

## 10. CTA / Funnel

**Score: 60 — ⚠️ WARNING**

| Check | Status | Evidence |
|-------|--------|----------|
| Primary CTA above fold | ✅ | `index.html:104` — "Get on the Board" → `/download` |
| Download in ≤2 clicks | ✅ | Hero CTA → download.html |
| CTA labels match destinations | ⚠️ | Some CTAs labeled differently than their href (e.g. "Get the Race Kit" → download ✅) |
| CTA contrast | ✅ | `#FF0055` primary on black = ~5.9:1 ✅ |
| No double CTAs in same viewport section | ✅ | One primary per section ✅ |
| Install command present on download page | ✅ | `download.html:64` |

**Issues:**
- Install command is fake (see Content Accuracy) — funnel is broken before it starts
- Secondary CTA "See the Lineup" links to features.html ✅ — correct

---

## 11. Social Metadata (OG + Twitter, og:image PNG not SVG)

**Score: 20 — ❌ FAIL**

| Page | OG title | OG description | OG image | Twitter card |
|------|----------|----------------|----------|--------------|
| `index.html` | ✅ "Velocity X — Extreme Media Server" | ✅ | ❌ **SVG** (not PNG) + **relative URL** | ❌ Missing |
| `features.html` | ✅ | ✅ | ❌ **SVG** + **relative URL** | ❌ Missing |
| All other pages | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing |

**`og:image` is SVG at `img/og.svg` — must be PNG per `new_site.md` §19.5**

`new_site.md` §19.5: "`tools/check-meta.mjs` rule 5 rejects an SVG `og:image` — several platforms will not render one."

`index.html:21`: `content="img/og.svg"` — relative AND SVG, both violations.

**Required absolute URL:** `https://detain.github.io/phlix-website/sites/velocity-x/img/og.png`

Missing on ALL pages:
- `og:url` (absolute)
- `og:title` (except index, features)
- `og:description`
- `og:image` (absolute PNG)
- `twitter:card`
- `twitter:title`
- `twitter:description`
- `twitter:image`
- `twitter:creator=@detain`

---

## 12. Localization

**Score: 60 — ⚠️ WARNING**

| Check | Status | Evidence |
|-------|--------|----------|
| `<html lang="en">` | ✅ | All pages |
| Default locale from content.json | ✅ | `"default_locale": "en"` |
| RTL-ready CSS | ⚠️ | Uses `inline-start/end` in some places ✅, but `left/right` in others (`transform: translateX(-50%)` etc.) |
| Locale-unsafe formatting | ⚠️ | `© 2026` hardcoded year — OK but could use JS |

No `lang` attribute deviations. Site is English-only which matches `supported_locales: ["en"]` in content.json ✅.

---

## 13. Experience Fidelity

**Score: 68 — ⚠️ WARNING**

| Aspect | Status | Evidence |
|--------|--------|----------|
| Kit's `site_architecture` implemented | ⚠️ | Kit declares 6 nav items (DROP IN, THE LINEUP, THE CREW, GET IT, THE RELAY, THE STATS) ✅. Plugins/docs demoted to footer. But footer doesn't match the 3-column spec from content.json. |
| `homepage_narrative` sections | ⚠️ | Kit specifies `drop-in` (hero), `the-lineup` (features), `speed-formula` (value props), `pit-credentials` (proof), `send-it` (CTA) sections. Home page has hero + features overview + stats + CTA ✅. Missing: `speed-formula` trick set grid, `pit-credentials` proof strategy. |
| `feature_casting` hero features | ⚠️ | Kit casts `syncplay` + `library` as lead tricks. Site shows them as Lead Trick cards ✅. But shows only 3 feature cards, not all 8. Kit spec: all 8 features must appear somewhere. |
| `copy_overlay` | ✅ | Hero uses kit's tagline "Drop In. Press Play." ✅ |
| Mascot Spin | ❌ | Kit declares mascot `Spin` with idle animation, tips, easter interactions. Site has no mascot implementation whatsoever. `new_site.md` §19.9: "Absence is never a defect" for fields NOT in kit. But the kit DOES declare `mascot.behavior` — so absence IS a defect. |
| Nav labels match kit | ✅ | "DROP IN", "THE LINEUP", "THE CREW", "GET IT", "THE RELAY", "THE STATS" ✅ |
| Page structure matches kit blueprints | ⚠️ | Features page uses trick-score-board template ✅. Download uses run-briefing ✅. Clients uses crew-list ✅. About uses score-review ✅. |

**Summary for Experience Fidelity:**
- Core nav and page structure follow kit ✅
- Mascot completely absent ❌
- Hero content matches kit overlay ✅
- Feature grid only shows 3 of 8 features on home — 5 are missing
- Proof stats are fabricated (see Brand Fidelity)

---

## Complete Fix List

### P0 — Must Fix Before Approval

1. **[CRITICAL] `og:image` must be PNG rasterized, not SVG**
   - Run: `node tools/gen-og.mjs --site velocity-x`
   - Update all pages to absolute URL: `https://detain.github.io/phlix-website/sites/velocity-x/img/og.png`

2. **[CRITICAL] Install command is completely wrong**
   - `download.html:64` and `docs.html:56` must use: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`
   - Never use `get.phlix.online` — that domain is fake

3. **[CRITICAL] License is wrong**
   - `about.html:89` must say MPL-2.0, not GPLv3
   - Per content.json FAQ answer and new_site.md §16

4. **[CRITICAL] Client list is fabricated**
   - Replace 8-client list with actual 5 clients from `content.json.clients`:
     - Roku (stable)
     - Samsung Tizen (stable) 
     - Windows (stable)
     - Mobile iOS+Android (beta)
     - Any DLNA device (stable)

5. **[CRITICAL] Server tech stack wrong**
   - `about.html:124` says "Server in Go" — must be "PHP 8.3+, Workerman 5.x"

6. **[CRITICAL] Contrasting text fails WCAG AA**
   - `#888888` on `#111111` = 3.52:1. Use `#999999` or lighter for muted text, or use the kit's `text` color `#FFFFFF` with reduced opacity for muted text.

7. **[CRITICAL] Sitemap uses wrong domain + includes 404**
   - Domain should be `detain.github.io/phlix-website`
   - Remove 404.html from sitemap
   - `robots.txt` sitemap URL must match

8. **[CRITICAL] No OG/Twitter metadata on 7 of 9 pages**
   - Add to all pages. Absolute URLs required.

9. **[CRITICAL] No canonical URL on any page**
   - Add `<link rel="canonical">` to all pages

10. **[CRITICAL] No JSON-LD on home page**
    - Add `SoftwareApplication` JSON-LD per `new_site.md` §10

### P1 — Should Fix

11. Footer has no 3-column layout from `content.json.footer.columns`
12. Footer tagline missing ("Open-source media, on your terms.")
13. `aria-current="page"` missing on active nav links
14. GitHub org wrong: `phlix` → `detain` in multiple links
15. Plugin repo wrong: `phlix/plugins` → `detain/phlix-plugin-example`
16. Fabricated proof stats (12000 stars, 15 platforms, 0.2s) must be replaced with verifiable signals or removed entirely
17. Accordion triggers missing `aria-controls`
18. `role="navigation"` missing on some footer nav elements
19. Apple TV client link is generic `apps.apple.com` — no Phlix-specific channel URL

---

## Scores by Dimension

| # | Dimension | Score | Status |
|---|-----------|-------|--------|
| 1 | Brand fidelity & spirit | 45 | ❌ |
| 2 | SEO | 35 | ❌ |
| 3 | Readability | 75 | ⚠️ |
| 4 | Spelling & grammar | 82 | ⚠️ |
| 5 | Usability | 60 | ⚠️ |
| 6 | Accessibility (WCAG 2.2 AA) | 45 | ❌ |
| 7 | Responsive | 72 | ⚠️ |
| 8 | Performance | 85 | ✅ |
| 9 | Content accuracy | 15 | ❌ |
| 10 | CTA / Funnel | 60 | ⚠️ |
| 11 | Social metadata | 20 | ❌ |
| 12 | Localization | 60 | ⚠️ |
| 13 | Experience fidelity | 68 | ⚠️ |

**Average: ~56 / 100**

**Any ❌ = FAIL. 9 dimensions have ❌. Site is NOT approved.**

---

**REJECTED — specific fixes listed above. Re-review after all P0 items are resolved.**
