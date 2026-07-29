# desert-horizon Brand Kit Site Review

**Date:** 2026-07-29
**Reviewer:** Hostile Auditor
**npm run lint status:** ❌ FAIL (2 errors, 2 warnings in `js/main.js`)

---

## Scorecard

| # | Dimension | Score | Status | Critical |
|---|-----------|-------|--------|----------|
| 1 | Brand fidelity & spirit | 92 | ✅ | No |
| 2 | SEO | 90 | ✅ | No |
| 3 | Readability | 92 | ✅ | No |
| 4 | Spelling & grammar | 95 | ✅ | No |
| 5 | Usability | 82 | ⚠️ | Yes |
| 6 | Accessibility (WCAG 2.2 AA) | 90 | ✅ | No |
| 7 | Responsive (320→1920) | 85 | ⚠️ | Untested |
| 8 | Performance (self-hosted fonts) | 95 | ✅ | No |
| 9 | Content accuracy | 95 | ✅ | No |
| 10 | CTA / funnel | 92 | ✅ | No |
| 11 | Social metadata (OG + Twitter) | 95 | ✅ | No |
| 12 | Localization | 90 | ✅ | No |
| 13 | Experience fidelity | 88 | ⚠️ | Yes |

**Result:** ❌ NOT APPROVED — 2 dimensions flagged and 2 critical issues must be resolved.

---

## Critical Issues (MUST FIX)

### 1. ❌ JS Lint Errors — `sites/desert-horizon/js/main.js`

`npm run lint` exits with errors. Two **errors** block approval:

**`js/main.js:30`** — Empty block statement (error)
```js
function localStorageSet(key, val) {
  try {
    localStorage.setItem(key, val);
  } catch {}   // ← EMPTY — must not be empty
}
```
Fix: either remove the try/catch entirely (localStorage is non-critical) or log/handle the error.

**`js/main.js:50`** — Useless assignment (error)
```js
let active = false;   // ← assigned but NEVER used in subsequent statements
if (v.start <= v.end) {
  active = today >= v.start && today <= v.end;
} else {
  active = today >= v.start || today <= v.end;
}
if (active) { ... }
```
The variable `active` is assigned but the subsequent assignments and the `if (active)` check read from it — but ESLint says "value assigned is not used in subsequent statements." The variable itself is used in `if (active)` but the check seems to fail lint. Likely the `let active` should just be `const` and the logic simplified, or the variable removed entirely and the ternary used directly in the `if`.

Two additional **warnings** (non-blocking but must clean up):
- `js/main.js:47` — `'year' is assigned a value but never used`
- `js/main.js:294` — `'armed' is assigned a value but never used`

### 2. ⚠️ Navigation Missing Plugins and Docs Links — ALL PAGES

Every page's header nav has **6 links**, not 8:

```
Current:  The Trading Post | What's Inside | Gather 'Round | Stake Your Claim | The Relay | Our Story
Required: Home | Features | Clients | Download | Plugins | Docs | Hub | About
```

Missing: **Plugins** and **Docs** (or their kit-renamed equivalents).

Verified on: `index.html:76-83`, `features.html:68-77`, `clients.html:65-72`, `download.html:66-76`, `about.html:62-69`, `404.html:63-70`, `hub.html`, `plugins.html`, `docs.html`.

The sitemap (`sitemap.xml:13,25`) includes both `docs.html` and `plugins.html`, and the footer "Product" column links to `plugins.html`. But the **primary navigation on every page** omits both. This is a structural regression: per `new_site.md §5`, the primary nav must have **8 links in order**.

Fix: Add Plugins and Docs links to the header `<nav>` on every page, using the kit's voice (e.g., "The Workshop" for Plugins, "Trail Guides" for Docs — or whatever the kit's `copy_overlay` specifies).

---

## Dimension Breakdown

### 1. Brand Fidelity & Spirit — 92 ✅
- Desert/trading post theme applied consistently across all pages
- No Google Fonts CDN — all fonts self-hosted WOFF2 in `css/base.css:9-78`
- CSS custom properties from kit design tokens (`:root` block, `css/base.css:80-139`)
- Seasonal variant overrides present (`css/base.css:141-160`)
- Navajo-pattern strip dividers, warm umber shadows, terracotta/sage palette used throughout
- Self-hosted fonts: Playfair Display, Arvo, Lora, Source Sans 3, IBM Plex Mono
- **No CDN dependencies detected** in any HTML or CSS

### 2. SEO — 90 ✅
- `<title>` on all pages — e.g., `index.html:6` = "Phlix — Your Stories, Wide Open." (30 chars)
- `<meta name="description">` ≤ 160 chars on all pages
- `<meta name="keywords">` present on all pages
- `<link rel="canonical">` absolute URL on every page
- One `<h1>` per page, semantic heading hierarchy
- JSON-LD `SoftwareApplication` block on `index.html:44-55`
- `sitemap.xml` lists all 8 canonical pages (no 404.html) with absolute URLs
- `robots.txt` references sitemap correctly

### 3. Readability — 92 ✅
- Body text: Lora 400, 1rem/1.65 line-height (`css/base.css:179-181`)
- Headlines: Playfair Display 700/900
- UI: Source Sans 3
- Max-width 1400px, centered containers with fluid padding
- Good contrast between `--color-text: #2e1a0e` on `--color-bg: #f2e4c8`
- Code blocks use IBM Plex Mono

### 4. Spelling & Grammar — 95 ✅
- No obvious spelling or grammar errors observed
- All text appears professionally written

### 5. Usability — 82 ⚠️
- Mobile nav toggle present, hamburger at ≤768px
- 44px minimum touch targets on buttons (`css/components.css:252`)
- Skip link present on all pages
- Download reachable in 1 click from hero CTA
- **Minus 15 for missing Plugins and Docs from primary nav** — users cannot discover these pages without using the footer

### 6. Accessibility (WCAG 2.2 AA) — 90 ✅
- Skip link: present, visible on focus (`css/base.css:264-283`)
- `:focus-visible` ring: 3px solid `--color-focus` with 2px offset
- Landmarks: `role="banner"`, `role="navigation"`, `main`, `role="contentinfo"` — one each
- `aria-current="page"` on active nav link
- `aria-label` on all icon-only buttons
- `prefers-reduced-motion` respected: CSS reset (`css/base.css:326-336`) + JS gate (`js/main.js:16,141,164,383`)
- Intensity toggle (`js/main.js:69-94`) respects reduced-motion OS preference
- Touch targets ≥44px (buttons `min-height: 44px`)
- `overflow-wrap: anywhere` on body text in narrow tracks (`css/base.css:235`)

### 7. Responsive (320→1920) — 85 ⚠️ (Untested)
- Media query at 768px for mobile nav (`css/components.css:123-149`)
- Grid uses `minmax(0, 1fr)` per `new_site.md §19.12` (`css/theme.css:517,520`)
- `overflow-wrap: anywhere` on body text, `break-word` on headings
- No fixed-px layout widths — fluid containers with `max-width` + `padding-inline`
- No `overflow: hidden` on content containers (§19.13 fix applied on hero at `css/theme.css:109`)
- **Render-check not run** — desktop layout appears sound, but actual 320px/375px/414px/768px testing required

### 8. Performance (self-hosted fonts) — 95 ✅
- Fonts: self-hosted WOFF2, `font-display: swap` on all faces
- No `fonts.googleapis.com`, no `fonts.gstatic.com`, no CDN scripts
- `defer` on main.js
- Seasonal activation uses passive event listeners where appropriate
- CSS `prefers-reduced-motion` media query is free

### 9. Content Accuracy — 95 ✅
- Install command: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash` — matches `content.json` exactly
- Client list: all 5 clients from `content.json.clients[]` shown with correct status badges
- Ecosystem: all 5 items from `content.json.ecosystem[]` shown on download page
- FAQ: all 6 questions + answers verbatim from `content.json` on about page
- License: MPL-2.0 for server/hub, MIT for libraries/plugins/clients — correct per `content.json`
- No fabricated claims, no invented numbers

### 10. CTA / Funnel — 92 ✅
- Hero CTA "Stake Your Claim" links to `download.html#server` — 1 click to download
- CTA banner on every page drives toward download or docs
- Visitor paths fork on home page (`index.html:343-358`) routes users by intent
- No CTA misleads about destination — all hrefs match label intent

### 11. Social Metadata — 95 ✅
- `og:type=website`, `og:site_name=Phlix` on all pages
- `og:url` absolute on all pages
- `og:image` absolute URL to `img/og.png` (PNG, 1200×630) on all pages
- Twitter: `twitter:card=summary_large_image`, `twitter:creator=@detain`
- `theme-color` = `--color-primary: #c2542a`
- Favicon: `image/svg+xml` linked

### 12. Localization — 90 ✅
- `<html lang="en">` set on all pages
- Single locale (`en`) — matches `content.json.site.default_locale`
- All user-facing strings from `content.json` — single file to translate
- No locale-unsafe formatting observed
- Fonts subset to Latin scripts

### 13. Experience Fidelity — 88 ⚠️
- Desert/trading post narrative voice consistent throughout
- Copy overlay applied (eyebrow "The trading post has been waiting", hero headline "Your Stories, Wide Open")
- Mascot "Dusty" (saguaro cactus) with tips, dismiss, easter eggs
- Three easter eggs: logo-clicks:5, typed-word:horizon, time-of-day:sunset-zone
- Seasonal activation with 4 date-gated variants (monsoon, harvest, solstice, spring)
- Parallax hero with ridge silhouette and sun
- Intensity toggle to disable parallax
- Brand-consistent Navajo diamond accents on pitch bullets
- **Slight deduction**: the visitor paths fork and the rich hero experience feel at odds with the "unhurried" brand voice — parallax + pointer-tracking + multiple easter eggs creates a somewhat busy home page that could overwhelm the calm desert aesthetic promised

---

## Fixes Required for Approval

| Priority | Issue | Location | Fix |
|----------|-------|----------|-----|
| **P0** | Empty `catch {}` block | `js/main.js:30` | Remove try/catch or add error handling |
| **P0** | `active` useless assignment | `js/main.js:50` | Rewrite as `if ((v.start <= v.end && today >= v.start && today <= v.end) \|\| (v.start > v.end && (today >= v.start \|\| today <= v.end)))` or extract function |
| **P1** | Nav missing Plugins | All 8 pages | Add `<li><a href="plugins.html">...</a></li>` to nav |
| **P1** | Nav missing Docs | All 8 pages | Add `<li><a href="docs.html">...</a></li>` to nav |
| **P2** | Unused `year` variable | `js/main.js:47` | Remove or prefix with `_` |
| **P2** | Unused `armed` variable | `js/main.js:294` | Remove or prefix with `_` |

---

## Notes

- `npm run lint` must exit **zero errors** before site is approved (spec §18.2)
- The nav issue may require verification against the kit's `site_architecture` declaration — if the kit intentionally omits Plugins/Docs from the top nav, a `site_architecture.nav[]` override must be documented in `SITE.md` or `REGEN_PLAN.md`. Otherwise it is a plain regression.
- render-check not performed — responsive score reflects structural CSS review only, not live browser testing at 320px/375px/414px
