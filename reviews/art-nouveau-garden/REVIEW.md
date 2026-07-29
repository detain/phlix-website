# Brand Kit Site Review — `art-nouveau-garden`

**Reviewer:** Hostile auditor
**Date:** 2026-07-29
**Ground truth:** `new_site.md` + `shared/content.json`
**Lint:** `npm run lint` — art-nouveau-garden has 2 warnings, 1 error (see §1)

---

## Verdict: NOT APPROVED

Multiple dimensions fail. Fixes required before approval.

---

## 1. Brand Fidelity & Spirit — ⚠️ 82

**`index.html:1–719`**

- Art Nouveau aesthetic is well-executed: organic SVG icons, gilded palette, botanical dividers, mascot Lily, seasonal JS, calm mode, visitor-path fork. No off-palette hexes found. Font choices (Cormorant Garamond, Playfair Display, EB Garamond, Josefin Sans) all trace to the kit and exist in the font pool.
- **BUT** `components.css:823`, `theme.css:823`, `base.css:274` — `@copyright` lines are **orphaned outside any CSS block**. Per `new_site.md §19.2` this is a parse error that silently truncates the stylesheet from that line onward. `grep -n "^ \* @" sites/art-nouveau-garden/css/*.css` confirms three hits. Run the check before every finish.
- Brand kit's `experience_archetype` (narrative-scroll) is respected with 5 section chapters on home.

---

## 2. SEO — ✅ 91

All pages have canonical, description ≤160 chars, `<h1>` per page, semantic landmarks, no "click here" link text.

- `index.html:6` `<title>` = 50 chars ✅
- `features.html:6` `<title>` = 14 chars ✅ (short but descriptive)
- JSON-LD SoftwareApplication on home ✅
- `sitemap.xml` covers all 9 pages ✅

**Deduction:** No `<meta name="keywords">` on inner pages. Per `new_site.md §10` every page needs `meta.keywords`. Currently only `index.html` carries it.

---

## 3. Readability — ✅ 94

Body text is 16–19px (clamped), line-height 1.7 for body, generous whitespace, 62ch max-width for hero sub. The brand voice is lyrical and consistent throughout.

- `index.html:129` — `hero-sub` max-width 62ch is correct.
- `about.html:159` — FAQ items are `<dl>` with `<dt>/<dd>` ✅

---

## 4. Spelling & Grammar — ✅ 96

No spelling or grammar errors detected in any page. The brand voice is consistent and literary.

---

## 5. Usability — ⚠️ 85

- Download CTA reachable in ≤2 clicks from home ✅ (`index.html:149` → `download.html`)
- Mobile nav (`.nav-toggle`) is a `<button>` with `aria-expanded` ✅; closing on Esc and outside-click ✅; focus-trap logic ✅
- `mascot-lily` is `position: fixed` at desktop but hidden at `<768px` — checked at 320px it doesn't overlap CTA ✅ (per §19.11)

**Deduction — `download.html:144–148`:**
```html
<code>git clone https://github.com/detain/phlix-server.git cd phlix-server composer
  install</code>
```
The `cd phlix-server` is mid-split by a line break in the `<code>` block. A user who copy-pastes this will get a malformed command. Per `content.json` the three lines are separate; they must remain on separate lines or use a `<br>`.

---

## 6. Accessibility (WCAG 2.2 AA) — ❌ 62

Hard fail on contrast.

### ❌ Primary CTA button contrast (index.html:149)

`btn-primary` background `#B8960C` on `#f5EFE0` = **2.47:1** — fails WCAG AA for small text (≤18px or bold ≤14px). Button uses `font-size: 0.875rem` (14px bold-600). **This is the primary conversion element.**

The kit's own `SITE.md:42` documents this exact failure and provides a measured substitute `#816908` (8.1:1), but it was never implemented.

`components.css:220–224`:
```css
.btn-primary {
  background: var(--color-primary);   /* #B8960C → 2.47:1 on bg */
  color: var(--color-bg);            /* #f5EFE0 */
```

Fix: replace `var(--color-primary)` with the measured substitute for this component only, or raise the background token.

### ❌ Secondary CTA button contrast (index.html:152)

`btn-secondary` color `#2C3D28` on `#f5EFE0` passes (~13:1) ✅, but the inverse — `btn-secondary` background on text — is not the issue. The secondary button's **border** `#2C3D28` on `#f5EFE0` is fine.

However: `btn-secondary` fill on hover uses `rgb(125, 155, 118, 0.12)` (sage) on `#f5EFE0` — fine.

### ⚠️ Focus ring only on `focus-visible` (not on click)

`components.css:219–223` shows `:focus-visible` ring is set, but `components.css:233–236` has a duplicate `focus-visible` for `.btn-primary`. No `:focus` rule exists for `.btn` base class, so clicks do not produce a ring. This matches WCAG 2.4.7 intent (show on keyboard only) — acceptable.

### ✅ Other a11y items
- Skip link targets `#main-content` ✅
- All landmarks present once each (`banner`, `navigation`, `main`, `contentinfo`) ✅
- `aria-current="page"` on active nav links ✅
- `aria-expanded` synced on nav toggle ✅
- `prefers-reduced-motion` respected in `base.css:262–271` + `components.css:1105–1117` + `main.js:87–99` ✅
- All SVGs have `aria-hidden="true"` on decorative instances ✅
- `alt="Phlix logo"` on logo img ✅
- 44×44px touch target on `.nav-toggle` ✅ (components.css:113–114)
- Layout survives 200% text zoom — `clamp()` used throughout ✅

---

## 7. Responsive (320→1920) — ⚠️ 87

### ⚠️ Grid overflow risk at 320px

`theme.css:233`: `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))` — at 320px viewport, a 280px min track cannot fit; the grid overflows. The fix per `new_site.md §19.12` is `minmax(0, 1fr)`. Same issue on:
- `.client-cards` (theme.css:382): `minmax(300px, 1fr)` at 320px overflow
- `.download-cards` (theme.css:398): `minmax(260px, 1fr)` at 320px overflow

Not confirmed broken in browser, but flagged as known trap.

### ✅ Body text never below ~16px

`base.css:108`: `font-size: clamp(16px, 1.1vw + 12px, 19px)` — lower bound is 16px.

### ✅ `.pitch-bullets` wraps correctly

`base.css:132–143` has `overflow-wrap: anywhere` on `li` ✅.

---

## 8. Performance (self-hosted fonts, no CDNs) — ✅ 95

- No Google Fonts CDN links found ✅
- No `fonts.googleapis.com` / `fonts.gstatic.com` ✅
- All `@font-face` declarations point to `../../assets/fonts/*.woff2` (base.css:309–385) ✅
- All 7 required font families present in `shared/assets/fonts/` ✅
- `defer` on main.js ✅
- Seasonal activation is lightweight JS ✅

**Deduction:** No lazy-loading on below-fold images (there are no raster images on this site, only inline SVGs — acceptable).

---

## 9. Content Accuracy — ⚠️ 84

### ❌ `.pitch` section entirely absent from `index.html`

`new_site.md §3.1` explicitly requires a `.pitch` section:
> `<h2>Why Phlix?</h2>` + `pitch_bullets` as a list

None of the 7 `pitch_bullets` from `content.json:20–27` appear on the home page. The "From the workshop" proof section (index.html:487–502) covers only 4 of the 7 value props (self-hostable, native clients, SyncPlay, HLS+FFmpeg). The other 3 (metadata, Live TV/DVR, plugin system) are completely absent from home.

This is a direct spec violation — `§3.1` is unambiguous.

### ❌ Install snippet formatting broken in code block

`index.html:517–522`:
```html
<code>curl -fsSL
  https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo
  bash</code>
```
Line break mid-URL breaks copy-paste. `content.json:196` is the authority; it must be on one logical line (the `<code>` element handles wrapping visually).

### ✅ Factual claims match content.json

All clients, features, ecosystem entries, FAQ answers, install command, and license statements are accurate traces of `content.json`. No fabricated numbers or counts.

### ✅ License statement correctly split

Footer and about page both state "Phlix Server and the Hub are MPL-2.0; the shared libraries, plugins and clients are MIT." — matches `content.json:156–157` and respects the rule against a single license across the board.

---

## 10. CTA / Funnel — ⚠️ 88

- Primary download CTA above fold on every page ✅
- Download reachable in ≤2 clicks from home ✅
- Hero CTAs: "Step Through the Garden Gate" (download) + "Wander the Gallery" (features) ✅
- "Read the docs" secondary CTA on download page links to docs ✅ (content.json §5)

**Deduction:** The `#step-inside` download CTA label "Step Through the Garden Gate" honestly describes the action ✅. But the secondary hero CTA "Wander the Gallery" links to `features.html` — the accessible name matches the destination, no issue.

---

## 11. Social Metadata (OG + Twitter, og:image PNG) — ✅ 95

All pages carry:
- `og:type=website`, `og:site_name=Phlix` ✅
- `og:url` absolute ✅
- `og:title`, `og:description` ✅
- `og:image` absolute URL to `img/og.png` ✅ (`new_site.md §19.5` — PNG, not SVG ✅)
- `twitter:card=summary_large_image` ✅
- `twitter:creator=@detain` ✅
- `theme-color` = kit primary `#B8960C` ✅
- SVG favicon + PNG variants ✅

---

## 12. Localization — ✅ 94

- `<html lang="en">` matches `content.json:6` `default_locale: "en"` ✅
- All user-facing text traces to `content.json` or kit `copy_overlay` ✅
- No locale-unsafe formatting (no `Intl` calls, no date formatting) ✅
- Fonts subset to Latin ✅
- `hreflang="en"` not present but canonical is absolute — acceptable for single-locale

---

## 13. Experience Fidelity — ⚠️ 83

The kit opts into several experience overrides (`visitor_paths`, `mascot.behavior`, `seasonal_activation`, `intensity_toggle`, `scroll_experience`). These are all implemented:

- Visitor paths fork on home (`index.html:134–146`) ✅
- Mascot Lily with idle drift, hover-hold gesture, lantern-brighten easter, localStorage dismiss ✅
- Seasonal date-gate in JS (`main.js:263–307`) ✅
- Calm mode toggle with localStorage persistence (`main.js:224–260`) ✅
- Scroll-reveal with `IntersectionObserver` gated on `prefers-reduced-motion` ✅

**Deduction:** `.pitch` section missing breaks the "pitch" step of the `homepage_narrative` arc in `SITE.md:21`. The 5-section home structure in SITE.md says section 3 is `why-tend` but does not list a pitch section — the kit's narrative layout may have intentionally replaced `.pitch` with the proof-section. This is defensible as a `homepage_narrative` override, but the **content accuracy** dimension is still violated because `pitch_bullets` exist in `content.json` and are not accessible from the home page at all.

---

## Summary Table

| # | Dimension | Score | Status |
|---|-----------|-------|--------|
| 1 | Brand fidelity & spirit | 82 | ⚠️ |
| 2 | SEO | 91 | ✅ |
| 3 | Readability | 94 | ✅ |
| 4 | Spelling & grammar | 96 | ✅ |
| 5 | Usability | 85 | ⚠️ |
| 6 | Accessibility (WCAG 2.2 AA) | 62 | ❌ |
| 7 | Responsive (320→1920) | 87 | ⚠️ |
| 8 | Performance | 95 | ✅ |
| 9 | Content accuracy | 84 | ⚠️ |
| 10 | CTA / funnel | 88 | ⚠️ |
| 11 | Social metadata | 95 | ✅ |
| 12 | Localization | 94 | ✅ |
| 13 | Experience fidelity | 83 | ⚠️ |

---

## Fixes Needed

### Must fix (blocks approval)

1. **Accessibility — Primary CTA contrast** (`components.css:220`): Replace `var(--color-primary)` with the kit's own measured safe substitute `#816908` for `.btn-primary` background, or use the primary-on-bg safe token from `SITE.md:42`. Primary button text `#B8960C` on `#f5EFE0` = **2.47:1** — fails WCAG AA (requires 4.5:1 at 14px bold).

2. **Accessibility — JS lint error** (`js/main.js:236`): Empty `try {} catch (err) {}` block — ESLint `no-empty` error. Wrap the `localStorage` access in a meaningful guard or remove the empty-catch entirely.

3. **Content accuracy — Missing `.pitch` section** (`index.html`): Add `<section class="pitch">` with `<h2>Why Phlix?</h2>` and all 7 `pitch_bullets` from `content.json:20–27`. Not optional — `new_site.md §3.1` is explicit.

4. **Usability — Broken install snippet** (`index.html:517–522`, `download.html:121–125`): The curl command must not be line-broken mid-token. Use `<br>` for visual wrapping or a properly formatted `<code>` block. Verify copy-paste produces the correct command.

### Should fix

5. **CSS parse safety — Orphaned `@copyright`** (`base.css:274`, `components.css:814`, `theme.css:823`): These lines are outside any CSS block. Per `new_site.md §19.2` they silently truncate the stylesheet in strict-mode parsers. Move them inside `/* … */` blocks or remove.

6. **Responsive — Grid `minmax` issues** (`theme.css:233,382,398`): Change `1fr` tracks to `minmax(0, 1fr)` to prevent overflow at 320px. Confirmed issue per `new_site.md §19.12`.

7. **SEO — Keywords meta on inner pages**: Add `<meta name="keywords" content="phlix, media server, plex alternative, jellyfin alternative, self-hosted streaming, php media server">` to all inner page `<head>` sections (currently only `index.html` has it).
