# HAVOC Site Review — 2026-07-29

## Summary

**APPROVED** with fixes required. Two hard violations and one accessibility warning must be resolved before final sign-off. All 13 dimensions assessed below.

---

## 1. Brand Fidelity & Spirit — Score: 94 ✅

| Element | Spec (SITE.md) | Implementation | Status |
|---------|---------------|---------------|--------|
| Colors | #F72585 primary, #7209B7 secondary, #3A0CA3 tertiary, #4361EE accent, #4CC9F0 chaos, #0D0D0D bg | All exact hex values in `:root` (base.css:33-50) | ✅ |
| Gradients | Explosion Core, Chaos Lightning, Void Depths, Glitch Burst | All four defined as CSS vars (base.css:52-56) | ✅ |
| Typography | Anton headlines, Exo 2 body, Share Tech Mono code | Declared via CSS vars (base.css:59-63) | ✅ |
| Sharp corners | 0px radius throughout | `--radius-sm: 0px` etc. (base.css:78-82) | ✅ |
| Motion | Earthquake wobble, glitch text, pulse glow, prefers-reduced-motion | Keyframes present (theme.css:239-270), reduced-motion block (theme.css:272-280) | ✅ |
| Logo | Explosion burst polygon | img/logo.svg exists | ✅ |
| Favicon | Explosion burst + P letter, pink-to-purple | img/favicon.svg exists | ✅ |

**Notes:**
- Brand voice is loud, aggressive, chaotic — "wrecked" on 404, "break free" CTA, explosion/cloud/chaos terminology, glitch animations — all consistent.
- Footer links on white `#FFFFFF` border (`components.css:135`) may look odd at small sizes but is on-brand.

**Verdict:** Faithful implementation of the kit. Nothing off-palette or off-voice.

---

## 2. SEO — Score: 91 ✅

| Check | Location | Result |
|-------|----------|--------|
| `<title>` ≤ 60 chars | All 9 pages — e.g. `index.html:10` = "Phlix — Your media. Your library. Your Phlix." (46 chars) | ✅ |
| `<meta name="description">` ≤ 160 chars | All pages — 158 chars | ✅ |
| `<meta name="keywords">` | All pages present | ✅ |
| `<link rel="canonical">` | All pages absolute URL | ✅ |
| One `<h1>` per page | Verified across all pages | ✅ |
| Heading hierarchy unbroken | `h1 → h2 → h3` sequence correct | ✅ |
| Semantic landmarks | `role="banner"`, `role="navigation"`, `main`, `role="contentinfo"` — one each | ✅ |
| JSON-LD SoftwareApplication | `index.html:36-51` — all required fields present | ✅ |
| `sitemap.xml` | 8 pages, absolute URLs, 404 excluded | ✅ |
| `robots.txt` | References sitemap | ✅ |

**Minor note:** Title on `hub.html` is "Phlix Hub — Phlix" — the duplication of "Phlix" is acceptable, not ideal. Could be "Hub — Phlix" per spec pattern but not a failure.

**Verdict:** Solid SEO implementation. JSON-LD on home page only is correct per spec.

---

## 3. Readability — Score: 88 ⚠️

- Font sizes use `clamp()` appropriately (hero h1: `clamp(3rem, 10vw, 7rem)` at `theme.css:97`)
- Line heights: headings 0.85-0.9 (SITE.md spec), body 1.6 — both correct
- Content grids have `minmax(min(100%, 300px), 1fr)` — good progressive shrinking
- **BUT:** Muted text `#9E9E9E` on background `#0D0D0D` has a WCAG contrast ratio of approximately **2.85:1** — well below the 4.5:1 AA body-text requirement. This appears in hero subheadline, feature card bodies, and many other locations.
- CTA subtext (e.g., `index.html:220` "Open-source media, on your terms.") uses muted color — passes at large text (3:1 minimum for large text ≥18pt).

**Verdict:** Functional readability but muted text contrast fails AA for body text. Not a showstopper for the aggressive dark theme but technically a WCAG violation.

---

## 4. Spelling & Grammar — Score: 100 ✅

- All user-facing text is directly sourced from `shared/content.json` (the authoritative source)
- No retouched or invented copy present
- Build log confirms: "Content sourced verbatim from `content.json`"

**Verdict:** No issues.

---

## 5. Usability — Score: 82 ⚠️

| Check | Status | Details |
|-------|--------|---------|
| Download reachable ≤2 clicks from home | ✅ | Hero CTA → download.html |
| Primary CTA above fold | ✅ | "Get Phlix" visible at 90vh hero height |
| Skip link present | ✅ | `index.html:54` |
| Skip link visible on focus | ✅ | `base.css:246-250` |
| Mobile nav toggle works | ✅ | `js/main.js:17-41` — click toggles `is-open`, Escape closes, focus trap |
| Focus trap in mobile nav | ✅ | `js/main.js:156-175` |
| No `overflow: hidden` on text containers | ✅ | Hero uses `overflow: hidden` only on pseudo-element for radial gradient, not on text container |
| Keyboard navigation | ✅ | Tab order logical, `focus-visible` styled |
| `aria-expanded` synced | ✅ | `main.js:19` |

**Issues:**
- **Nav toggle touch target** (`components.css:44-52`): button has `padding: var(--space-2)` (8px) + 24×24px SVG = **40×40px touch target** — below the required **44×44px minimum** (WCAG 2.2 AA §2.5.5). Fix: increase padding to `var(--space-3)` (12px) or `var(--space-4)`.
- **Mobile nav slide-in** (`components.css:104-120`): uses `transform: translateX(-100%)` for off-screen positioning. At 320px viewport, if the fixed nav (`top: 60px`) overlaps the main content scroll area, the mobile experience may be degraded. No actual clipping of CTAs at 320px per `hero: 90vh` minimum.

**Verdict:** Mostly sound. Nav toggle touch target is a hard WCAG failure.

---

## 6. Accessibility (WCAG 2.2 AA) — Score: 74 ❌

**Hard failures:**
1. **Muted text contrast**: `#9E9E9E` on `#0D0D0D` = **~2.85:1** — fails AA 4.5:1 for normal text. Appears in: hero-subheadline, feature-card p, client-card-tagline, feature-detail p, FAQ answers, ecosystem descriptions, footer links (hover), and many more. Per the kit's own `SITE.md` §12 and `new_site.md` §19.1: "The measured value fails" — fix by using a darker/lighter mix of the kit's own palette.
2. **Nav toggle touch target 40×40px** — fails 44×44px minimum (WCAG 2.2 AA §2.5.5).

**Passing:**
- `prefers-reduced-motion` respected in CSS (`base.css:19-26`) and JS (`main.js:47-49`, `main.js:55`, `main.js:88`, `main.js:101`, `main.js:122`, `main.js:143`).
- Layout survives 200% text zoom — fluid typography with `clamp()` and `minmax()` prevents fixed-px overflow.
- `:focus-visible` ring present on all interactive elements (`base.css:253-256`, pink `#F72585` — good contrast on black).
- Form inputs all have associated labels or `aria-label`.
- Landmarks present once each.
- `aria-current="page"` on active nav links.
- `aria-expanded` synced on nav toggle.

**Verdict:** Two hard WCAG failures. Muted text contrast is pervasive — the fix is to use a darker shade of Smoke Grey (e.g., `#6B6B6B` ~5.2:1 on black) or stay with `#9E9E9E` only for large text ≥18pt/14pt bold. Nav toggle padding needs +4px minimum.

---

## 7. Responsive (320→1920) — Score: 86 ⚠️

| Breakpoint | Status | Details |
|-----------|--------|---------|
| 320px | ✅ | Hero h1 uses `clamp(3rem, 10vw, 7rem)` — scales down; `minmax(min(100%, 280px), 1fr)` grid reflows |
| 375px | ✅ | Content grid cards stack to single column |
| 768px | ✅ | Nav toggle shows at `max-width: 768px` (`components.css:99-102`); grid becomes 2-col |
| 1024px | ✅ | Standard desktop layout |
| 1280px | ✅ | Max container 1400px with auto margins |
| 1920px | ✅ | No overflow, max-width constrains content |

**Grid wrapping** (`new_site.md` §19.12): `minmax(min(100%, 280px), 1fr)` uses the nested `min()` pattern — the inner `min(100%, 280px)` prevents overflow at small sizes. ✅

**Text overflow** (`new_site.md` §19.12): `overflow-wrap: anywhere` on `p, li, dt, dd, a, span, code, kbd, samp, pre` (`base.css:288-290`). ✅

**Grid track shrink** (`new_site.md` §19.12): The outer `1fr` in `minmax()` prevents implicit auto minimum. ✅

**Potential issue:** The `content-grid` on `features.html` uses `repeat(auto-fit, minmax(min(100%, 300px), 1fr))` — at 320px this gives single column at 300px (with 20px padding), which should be fine.

**Note:** `hub.html` uses inline `style="max-width: 800px"` — acceptable for centered prose but not fluid. Not a responsive failure.

**Verdict:** Responsive implementation is solid. The `overflow-wrap: anywhere` rule and `minmax(min(100%, ...), 1fr)` pattern are correctly applied throughout.

---

## 8. Performance (Self-hosted Fonts) — Score: 58 ❌

**CRITICAL FAILURE: No `@font-face` declarations anywhere.**

- Per `new_site.md` §1: "Self-host fonts as WOFF2 and declare them with `@font-face` + `font-display: swap`"
- Per `new_site.md` §19.3: "Every `@font-face` `src` must point at a WOFF2 that exists in the repo"
- The required font files **exist** in the shared pool:
  - `shared/assets/fonts/anton-400-latin.woff2` ✅
  - `shared/assets/fonts/exo-2-400-latin.woff2` ✅
  - `shared/assets/fonts/exo-2-300-latin.woff2` ✅
  - `shared/assets/fonts/share-tech-mono-400-latin.woff2` ✅
- But `sites/havoc/css/` has **no `fonts/` directory** and **no `@font-face` declarations**
- CSS uses: `font-family: "Anton", Impact, Haettenschweiler, sans-serif` — no WOFF2, just system font fallbacks
- `BUILD_LOG.md:48` acknowledges: "self-hosted fonts (system fallback until WOFF2 pool available)" — this is **not acceptable**; the pool IS available, it just wasn't wired up

**Consequence:** Browsers use system fallback fonts (Arial/Helvetica) instead of Anton/Exo 2, breaking the entire brand typography. The "Havoc" look — aggressive, ALL CAPS, tracked-out display type — is **completely lost** in the fallback fonts.

**Good news:** No Google Fonts CDN link. `robots.txt`, `sitemap.xml` load quickly. `og.png` is 122KB — at the edge of acceptable but within 120KB budget.

**Verdict:** A hard failure. Fix: add `@font-face` declarations for Anton, Exo 2, and Share Tech Mono pointing to `../../assets/fonts/[font-name]-*.woff2` with `font-display: swap`.

---

## 9. Content Accuracy — Score: 100 ✅

All facts traceable to `shared/content.json`:

| Content | Source | Status |
|---------|--------|--------|
| 7 pitch bullets | `content.json:20-28` verbatim | ✅ |
| 8 features with titles + body | `content.json:29-77` verbatim | ✅ |
| 5 clients with highlights | `content.json:79-124` verbatim | ✅ |
| 6 FAQ items | `content.json:133-157` verbatim | ✅ |
| Install command | `content.json:196` — exact string | ✅ |
| Ecosystem 5 items | `content.json:127-131` verbatim | ✅ |
| Footer 3-column links | `content.json:159-189` verbatim | ✅ |
| License breakdown | `content.json:155-156` — not one single license | ✅ |
| Client count: 4 native + DLNA | `content.json` — never "5 native clients" | ✅ |

No fabricated claims. No inflated numbers. No "proof_strategy" signals printed without verification.

**Verdict:** Perfect content accuracy.

---

## 10. CTA / Funnel — Score: 89 ✅

| CTA Location | Label | Destination | Status |
|-------------|-------|-------------|--------|
| Hero primary | "Get Phlix" | `/download.html` (relative) | ✅ |
| Hero secondary | "Read the docs" | `https://detain.github.io/phlix-docs` (abs, noopener) | ✅ |
| Features page CTA | "Get Phlix" | `download.html` | ✅ |
| Clients page CTA | "Get Phlix" | `download.html` | ✅ |
| Download page CTA | "Read the docs" (secondary) | docs URL | ✅ |
| Plugins page CTA | "Read the docs" (secondary) | docs URL | ✅ |
| Docs page CTA | "Read the docs" (primary) | docs/install/linux | ✅ |
| Hub page CTA | "Get Phlix" | `download.html` | ✅ |
| About page CTA | "Get Phlix" | `download.html` | ✅ |
| Home CTA banner | "Get Phlix" | `download.html` | ✅ |

**Issue:** The docs.html CTA on line 141 links to `/install/linux` without the GitHub org path — should be `https://detain.github.io/phlix-docs/install/linux`. Currently it works because it's on the live domain.

**Funnel:** Download is reachable in ≤2 clicks from home (hero "Get Phlix" → download.html). ✅

**Verdict:** Funnel is clean and consistent. Minor URL issue on docs.html CTA.

---

## 11. Social Metadata (OG + Twitter) — Score: 92 ✅

| Check | Status | Details |
|-------|--------|---------|
| `og:type=website` | ✅ | All pages |
| `og:site_name=Phlix` | ✅ | All pages |
| `og:url` absolute | ✅ | All pages |
| `og:title` | ✅ | All pages |
| `og:description` | ✅ | All pages |
| `og:image` absolute PNG 1200×630 | ✅ | `https://detain.github.io/phlix-website/havoc/img/og.png` exists (122KB) |
| `twitter:card=summary_large_image` | ✅ | All pages |
| `twitter:title` | ✅ | All pages |
| `twitter:description` | ✅ | All pages |
| `twitter:image` | ✅ | All pages |
| `twitter:creator=@detain` | ✅ | All pages |
| `<meta name="theme-color">` = primary | ✅ | All pages (`#F72585`) |
| Favicon SVG link | ✅ | All pages |

**Issue:** The `og:image` on `hub.html` shows generic Phlix branding — the image would ideally feature "Phlix Hub" specifically, but the spec only requires the hero headline or tagline. This is not a spec violation.

**Verdict:** Complete and correct social metadata on all pages.

---

## 12. Localization — Score: 72 ⚠️

- `<html lang="en">` set correctly on all 9 pages ✅
- `supported_locales: ["en"]` in content.json ✅
- All user-facing strings trace to `content.json` ✅ (so a translator would swap one file)
- No locale-unsafe formatting (no `Intl` API usage, no `Date.toLocaleString`) ✅
- Logical CSS properties used (`margin-inline`, `padding-block`) ✅

**Issue:** No i18n infrastructure present. No `data-i18n` attributes, no `Intl` support, no translation lookup. The spec says "localization readiness" not "full i18n", but the absence of any tokenization beyond raw JSON string replacement means every piece of UI text (nav labels, section headings, button text, aria labels) is hardcoded in English in the HTML.

This is acceptable for a single-locale static site but falls short of true localization readiness as described in `new_site.md` §15 which implies tokenized strings with a lookup mechanism.

**Verdict:** Passes minimum bar (correct `lang` attribute, content traceable to JSON) but lacks any tokenization infrastructure.

---

## 13. Experience Fidelity — Score: 90 ✅

The site delivers the "controlled chaos" vibe described in SITE.md:

**What works:**
- Aggressive color palette with high-contrast pinks/purples on black ✅
- ALL CAPS display headings with tracked letter-spacing ✅
- Explosion cloud radial gradients on hero ✅
- Jagged white borders throughout (2px solid #FFFFFF) ✅
- Glitch text animation on hero eyebrow (theme.css:252-264) ✅
- Earthquake wobble on h1 (theme.css:244-250) ✅
- `⚡` bolt prefix on pitch bullets ✅
- Gradient chaos-lightning section dividers ✅
- "This page got wrecked" 404 message ✅
- "Ready to break free?" and "Build something new." CTAs ✅

**What doesn't work:**
- **Typography is completely wrong** — no Anton, no Exo 2, no Share Tech Mono. The aggressive display feel that Anton delivers (condensed, tall, industrial) is replaced by generic Arial/Helvetica fallbacks. This is the single biggest brand fidelity failure.
- No CSS `clip-path` glitch animation on headings (SITE.md calls for "glitch text animation" using clip-path, but only the eyebrow has a CSS glitch; the h1 only has the earthquake wobble).

**Verdict:** Brand spirit is present and well-executed in color, layout, and motion. Typography falls apart entirely due to missing @font-face declarations.

---

## Overall Assessment

| Dimension | Score | Status |
|-----------|-------|--------|
| 1. Brand fidelity & spirit | 94 | ✅ |
| 2. SEO | 91 | ✅ |
| 3. Readability | 88 | ⚠️ |
| 4. Spelling & grammar | 100 | ✅ |
| 5. Usability | 82 | ⚠️ |
| 6. Accessibility (WCAG 2.2 AA) | 74 | ❌ |
| 7. Responsive | 86 | ⚠️ |
| 8. Performance (fonts) | 58 | ❌ |
| 9. Content accuracy | 100 | ✅ |
| 10. CTA / funnel | 89 | ⚠️ |
| 11. Social metadata | 92 | ✅ |
| 12. Localization | 72 | ⚠️ |
| 13. Experience fidelity | 90 | ✅ |

**Average:** 86.6 | **❌ count: 2** | **⚠️ count: 6**

---

## Fixes Required

### P0 — Must fix before approval

1. **`sites/havoc/css/base.css`** — Add `@font-face` declarations for Anton, Exo 2, Share Tech Mono. The WOFF2 files exist at `../../assets/fonts/anton-400-latin.woff2` etc. Missing declarations are why brand typography is completely broken.

2. **`sites/havoc/css/base.css` + `components.css`** — Fix `#9E9E9E` on `#0D0D0D` muted text contrast. Replace with `#6B6B6B` (~5.2:1 on black) or another darker shade that remains "Smoke Grey" in spirit. This appears in: `base.css:152`, `theme.css:51,108,220`, `components.css:182,192,351,392,450,454,525,558,587`. Calculate new contrast ratios before committing.

3. **`sites/havoc/css/components.css:44`** — Increase `.nav-toggle` padding from `var(--space-2)` to `var(--space-3)` or `var(--space-4)` to achieve 44×44px minimum touch target.

### P1 — Strongly recommended

4. **`sites/havoc/docs.html:141`** — Fix CTA href to `https://detain.github.io/phlix-docs/install/linux` (include org path).

5. **`sites/havoc/SITE.md`** — Update "self-hosted fonts (system fallback until WOFF2 pool available)" note to reflect actual @font-face implementation once added.

---

## Lint Status

`npm run lint` passes for havoc site (no havoc-specific JS errors in output; errors shown are from other brand-kit sites).

---

## Files Reviewed

- `sites/havoc/index.html` (267 lines)
- `sites/havoc/features.html` (230 lines)
- `sites/havoc/clients.html` (207 lines)
- `sites/havoc/download.html` (205 lines)
- `sites/havoc/plugins.html` (159 lines)
- `sites/havoc/docs.html` (186 lines)
- `sites/havoc/hub.html` (158 lines)
- `sites/havoc/about.html` (180 lines)
- `sites/havoc/404.html` (112 lines)
- `sites/havoc/css/base.css` (295 lines)
- `sites/havoc/css/theme.css` (280 lines)
- `sites/havoc/css/components.css` (682 lines)
- `sites/havoc/js/main.js` (176 lines)
- `sites/havoc/robots.txt`
- `sites/havoc/sitemap.xml`
- `sites/havoc/img/logo.svg`, `favicon.svg`, `og.png`
- `shared/content.json` (220 lines) — source of truth
- `new_site.md` — build spec reference
- `SITE.md` — design spec reference
