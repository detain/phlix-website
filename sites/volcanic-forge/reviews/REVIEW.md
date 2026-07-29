# Volcanic Forge — Brand Kit Site Audit

**Reviewer**: Hostile Reviewer
**Site**: `sites/volcanic-forge/`
**Ground truth**: `new_site.md` + `shared/content.json`
**Date**: 2026-07-29

---

## 1. Brand Fidelity & Spirit — ⚠️ Score: 72

**Strong points**: Obsidian-dark backgrounds throughout (#0E0C0A), molten orange (#E8611A) reserved for primary CTAs, warm amber shadows (no cool gray), ALL CAPS Anton headlines, condensed typographic hierarchy. Brand DNA of "standing at the edge of a caldera" is broadly honored in dark cinematic design.

**Deficits**:

- **`index.html` line 51-107**: Redundant inline `<style>` block declares `@font-face` with broken non-existent paths (`css/fonts/anton.woff2`, etc.). This directly conflicts with the correct `base.css` vendor-fonts block (which uses `../../assets/fonts/anton-400-latin.woff2`). The broken inline block will produce 404 font requests in browsers that load it before cascading to `base.css`. **Fix: delete the entire inline `<style>` block from `index.html` — `base.css` handles fonts correctly.**

- **Brand kit `site_architecture` not applied**: The kit declares custom nav labels (Forge/Tempering/Anvils/Ignition/Relay/Tradition for Home/Features/Clients/Download/Hub/About) and demotes plugins/docs to footer-only. The site implements the default generic nav (Home/Features/Clients/Download/Plugins/Docs/Hub/About — all 8 in nav, generic labels). Per `new_site.md` §2A, when a kit declares `site_architecture`, it overrides the default. **Fix: implement the kit's nav structure or remove `site_architecture` from the kit.**

- **Brand kit `mascot.behavior` not implemented**: The kit defines `Scoria`, an obsidian-rock elemental mascot with idle glow animation, tips per page, easter interactions, and localStorage dismissal. Per `new_site.md` §2A / §19.9: when `mascot.behavior` is non-null, it must be built. **Fix: build Scoria or set `mascot.behavior: null` in the kit.**

- **`mascot.behavior.easter_interactions`**: Click:5 raises hammer with sparks; Hover-hold:3s taps anvil. Not implemented.

- **`seasonal_activation` live-js not implemented**: The kit declares three seasonal variants (Midnight Eruption / Solstice Forge / Dry Season Caldera) with `mode: "live-js"`. Per `new_site.md` §2A this requires a date-gate JS that flips override tokens during active ranges.

---

## 2. SEO — ✅ Score: 88

- `<title>` ≤ 60 chars on all pages (`Features — Phlix` = 15 chars, etc.) ✅
- `<meta name="description">` ≤ 160 chars from `content.json.meta.description` ✅
- `<meta name="keywords">` absent on all pages — `new_site.md` §10 requires `meta.keywords` from `content.json`. **Fix: add `<meta name="keywords" content="phlix, media server, plex alternative, jellyfin alternative, self-hosted streaming, php media server">`**
- `<link rel="canonical">` absolute on every page ✅
- Single `<h1>` per page ✅; heading hierarchy intact ✅
- Descriptive anchor text ("See all features →", "View source") ✅
- JSON-LD `SoftwareApplication` on home page ✅ (but `license` URL is generic `mozilla.org/MPL/2.0` rather than the project-specific GitHub URL — minor)
- `sitemap.xml` covers all 8 canonical pages ✅; `robots.txt` references it ✅

---

## 3. Readability — ✅ Score: 85

- Body text 1rem/16px+, line-height 1.55 ✅
- `max-width: 70ch` on paragraphs ✅ (prevents overlong lines)
- `overflow-wrap: anywhere` not explicitly set on body text; `base.css` does not include the wrapping rule from `new_site.md` §19.12. This is a known trap that causes 200%-zoom overflow failures. **Fix: add `overflow-wrap: anywhere` to `p, li, dt, dd, a, span, code, kbd, samp, pre` in `base.css`.**
- Typography hierarchy is clear: Anton headlines / Barlow body / Barlow Semi Condensed UI ✅

---

## 4. Spelling & Grammar — ✅ Score: 95

No spelling or grammar errors detected. Factual claims match `content.json`. No invented copy.

---

## 5. Usability — ✅ Score: 82

- Primary CTA above fold on home ✅
- Download reachable in ≤2 clicks from home ✅
- All interactive elements are `<a>` or `<button>` ✅
- Skip link present and targets `#main-content` ✅
- Focus management on mobile nav toggle: `focus()` returned to toggle on Escape ✅
- Outside-click closes mobile menu ✅

**Deficits**:

- Download page (`download.html` line 107-108) shows `composer require detain/phlix-server` as the server install method. Per `content.json.install` this is **not** the install — it is a development checkout. The correct install command (from `content.json.install.primary`) is: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`. **This is a content accuracy error. Fix: replace with the correct install command from `content.json`.**
- No `404.html` exists. `new_site.md` §2A / §18 requires it. **Fix: create `sites/volcanic-forge/404.html`.**

---

## 6. Accessibility (WCAG 2.2 AA) — ⚠️ Score: 78

- `prefers-reduced-motion` respected in `js/main.js` ✅; `base.css` lines 200-209 reset all animation/transition ✅
- Keyboard navigation: focus-visible ring on all interactive elements (`base.css` `:focus-visible` 2px solid `--color-focus` 2px offset) ✅
- Touch targets ≥ 44px: `.btn` (min-height 44px, min-width 44px) ✅, `.nav-toggle` (44×44px) ✅, `.pitch-bullets li` (padding var(--space-3) var(--space-4)) — these are links ✅
- Layout survives 200% text zoom: NOT confirmed (would need `render-check.mjs`). `overflow-wrap: anywhere` missing from body text creates risk of overflow failures per `new_site.md` §19.12.
- ARIA landmarks: `role="banner"`, `role="navigation"`, `role="contentinfo"` on respective elements ✅; `aria-label` on all nav elements ✅
- `aria-current="page"` on active nav link ✅
- `tabindex="-1"` on `#main-content` for skip-link target ✅
- Form inputs have associated `<label>` elements — not applicable (no forms)
- `new_site.md` §12 hard gate: **Measured contrast must verify kit claims.** The brand kit claims ash-gray `#7A7268` on obsidian `#0E0C0A` = "4.6:1 (passes AA)". My calculation: relative luminance of `#7A7268` ≈ 0.157, of `#0E0C0A` ≈ 0.005. Contrast ratio ≈ **5.6:1** — passes AA ✅. The kit's own 4.6:1 estimate was slightly conservative but in the right ballpark.
- **ember gold `#D4820A` on obsidian `#0E0C0A`**: contrast ratio ≈ 4.3:1. **Fails AA for small text (< 18pt regular / < 14pt bold)**. Per `new_site.md` §12, derived tokens must be used when the kit's pure hue doesn't pass. However, ember gold is used only for badges (tiny text) and section eyebrows (0.75rem UI text). **Fix: darken ember gold to ~`#B86A08` for ≥4.5:1 on obsidian, or use it only on surface (#1C1916) where it passes.**

---

## 7. Responsive (320→1920) — ✅ Score: 82

- Fluid widths + `max-width: 1440px` on containers ✅
- `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))` on feature-cards — uses `1fr` without `minmax(0, 1fr)`. Per `new_site.md` §19.12, a bare `1fr` track has implicit `auto` minimum and can cause overflow. However, the 280px `minmax` floor makes overflow unlikely in practice. **Recommend: `minmax(0, 1fr)` for defensive correctness.**
- Same issue: `content-grid` (line 316), `client-cards` (line 324) use bare `1fr`.
- Mobile menu implementation ✅ with proper `aria-expanded` sync
- Footer 3-column grid collapses to 1-column at ≤768px ✅
- Hero inner padding collapses from `var(--space-24)` to `var(--space-16)` at ≤768px ✅ — generous but appropriate
- `render-check.mjs` has not been run; real-browser testing at 320px not confirmed

---

## 8. Performance (self-hosted fonts, no CDNs) — ⚠️ Score: 65

**CRITICAL**: `index.html` line 51-107 — inline `<style>` block with `@font-face` pointing to `css/fonts/anton.woff2`, `css/fonts/barlow.woff2`, `css/fonts/barlow-medium.woff2`, `css/fonts/barlow-semi-condensed-semibold.woff2`, `css/fonts/barlow-condensed-bold.woff2`, `css/fonts/jetbrains-mono.woff2`. These files **do not exist** (no `css/fonts/` directory). Browser will issue 6× 404 before cascading to `base.css` which has correct `../../assets/fonts/...` paths. **Fix: delete the inline `<style>` block from `index.html`.**

- No Google Fonts CDN links anywhere ✅
- `base.css` correctly self-hosts WOFF2 from `../../assets/fonts/` pool ✅
- Fonts loaded with `font-display: swap` ✅
- No render-blocking scripts (`defer` on `main.js`) ✅
- No third-party CDNs ✅
- No analytics, no tracking ✅

**Impact**: Every page load produces 6 HTTP 404 errors for fonts on `index.html`. The home page is the most visited — this is the worst page to have broken fonts.

---

## 9. Content Accuracy (install from content.json) — ❌ Score: 55

| Item | Status | Source |
|------|--------|--------|
| `install.primary` command | ❌ WRONG | `download.html:107` — shows `composer require` (dev checkout, NOT install) |
| `install.primary.label` ("One line...") | ❌ NOT SHOWN | download.html uses "Requires PHP 8.3+ and phlix-server" |
| `install.from_source` vs install | ❌ CONFLATED | download.html shows composer+git but presents it as install |
| `clients[]` from content.json | ✅ | All 5 clients shown correctly with correct highlights/status |
| `features[]` from content.json | ✅ | All 8 features with correct titles/bodies/icons |
| `pitch_bullets[]` | ✅ | All 7 verbatim |
| `faq[]` | ✅ | All 6 verbatim |
| `footer` columns | ✅ | Matches content.json |
| `hero` (eyebrow/headline/sub) | ✅ | Matches content.json |
| License (MPL-2.0/MIT) | ✅ | footer and about.html correctly state MPL-2.0 server + MIT clients |
| Ecosystem links | ✅ | All 5 ecosystem items with correct `what` strings |

**Critical fix**: `download.html` lines 103-108 must show `content.json.install.primary.command` (`curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`), not `composer require`. Remove the composer/git lines entirely.

**BUILD_LOG.md line 57**: "BSD-3-Clause" — wrong. Clients are MIT per content.json. Fix the build log.

---

## 10. CTA / Funnel — ✅ Score: 85

- Primary CTA "Get Phlix" → `/download` visible above fold on home ✅
- Download page has client download cards ✅
- Every page ends with `.cta-banner` ✅
- External docs link uses `rel="noopener noreferrer"` ✅

**Minor**: CTA labels on about.html ("Need help getting started?") are secondary/different — not a defect, just inconsistent tone. Brand kit voice says "The forge is ready." — the CTA uses generic phrasing. Acceptable.

---

## 11. Social Metadata (OG + Twitter, og:image PNG) — ✅ Score: 90

- `og:type=website` ✅
- `og:site_name=Phlix` ✅
- `og:url` absolute ✅
- `og:image` absolute URL to `img/og.png` (not SVG) ✅ — verified PNG 1200×630 at 120KB
- `twitter:card=summary_large_image` ✅
- `twitter:creator=@detain` ✅
- `<meta name="theme-color">` = `#E8611A` ✅
- Favicon SVG link ✅

**Deduction**: `og:image` on `index.html` line 20-22 absolute ✅, but the `og.png` is 120KB — new_site.md §13 says hero image ≤ ~120KB. At 120KB it's exactly at budget. Consider optimizing further.

---

## 12. Localization — ✅ Score: 90

- `<html lang="en">` from `site.default_locale` ✅
- All user-facing strings trace to `content.json` ✅
- Logical CSS properties (`inline-start/end` not used but `margin-inline: auto` used) ✅
- No locale-unsafe formatting detected ✅
- Font subset: Latin-only WOFF2 ✅ (in `base.css` vendor-fonts section)

---

## 13. Experience Fidelity — ⚠️ Score: 68

**What the kit declared that was built**:

- Obsidian-dark immersive design ✅
- Full-bleed forge-horizon hero with gradient ✅
- Feature grid on dark background ✅
- Single molten-orange CTA per section ✅
- Warm-amber shadows ✅
- ALL CAPS Anton headlines ✅
- Scoria mascot placeholder (img/ only, no JS) — CSS/SVG artwork only, no behavior ❌

**What the kit declared that was NOT built**:

- **`mascot.behavior`** (non-null in kit): idle glow cycle, page-specific tips, easter interactions (click:5 hammer-raise, hover-hold:3s anvil-tap), localStorage dismissal — **not implemented**
- **`seasonal_activation` mode: "live-js"**: date-gate switching between Midnight Eruption / Solstice Forge / Dry Season Caldera variants — **not implemented**
- **`site_architecture` nav override**: custom labels (Forge/Tempering/Anvils/etc.), demoted pages in footer — **not implemented**
- **3px molten-orange left indicator bar** on active nav item (from `navigation.sidebar` spec) — **not implemented**
- **Forge-iron border on all cards** (1px solid `#3D3530`) — actually implemented ✅

---

## Summary Table

| # | Dimension | Score | Status |
|---|-----------|-------|--------|
| 1 | Brand fidelity & spirit | 72 | ⚠️ |
| 2 | SEO | 88 | ⚠️ |
| 3 | Readability | 85 | ⚠️ |
| 4 | Spelling & grammar | 95 | ✅ |
| 5 | Usability | 82 | ⚠️ |
| 6 | Accessibility | 78 | ⚠️ |
| 7 | Responsive | 82 | ⚠️ |
| 8 | Performance | 65 | ❌ |
| 9 | Content accuracy | 55 | ❌ |
| 10 | CTA / funnel | 85 | ⚠️ |
| 11 | Social metadata | 90 | ✅ |
| 12 | Localization | 90 | ✅ |
| 13 | Experience fidelity | 68 | ❌ |

**Average score (excluding 0s)**: 75.5

---

## FIXES REQUIRED (❌ or score < 80)

1. **[P0 — BROKEN] Performance**: `index.html` lines 51-107 — delete the inline `<style>` block. `base.css` loads fonts from correct `../../assets/fonts/` paths. The inline block references 6 non-existent `css/fonts/*.woff2` files and will 404 on every home page visit.

2. **[P0 — CONTENT ERROR] Usability + Content Accuracy**: `download.html` lines 103-108 — replace `composer require detain/phlix-server` + `git clone` with the verbatim `content.json.install.primary.command`: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`. Add the `line_count: 1` and `label` ("One line, on a fresh Ubuntu or Debian host") from `content.json`. The current composer/git instructions are a development checkout, NOT an install per new_site.md §19.22.

3. **[P0 — MISSING FILE] Usability**: `404.html` does not exist. `new_site.md` §2A requires a per-kit `404.html`. Build it with the standard shell, `error_page_experience.concept` realized, `recovery_links` pointing to `./`, `features.html`, `download.html`, and `<meta name="robots" content="noindex">`.

4. **[P1 — CONTENT] SEO**: All 8 pages are missing `<meta name="keywords">` from `content.json.meta.keywords`. Add to every `<head>`.

5. **[P1 — ACCESSIBILITY]**: `--color-tertiary` (#D4820A) on `--color-bg` (#0E0C0A) = ~4.3:1 — **fails WCAG AA for small text** (below 18pt). Review all uses of ember gold for small/UI text. Derive a darker ember token for text use, or restrict ember gold to surface+ backgrounds. Document in `SITE.md`.

6. **[P1 — RESPONSIVE]**: `grid-template-columns` in `.feature-cards` (theme.css:226), `.content-grid` (theme.css:316), `.client-cards` (theme.css:324) use bare `1fr` tracks. Per `new_site.md` §19.12, change to `minmax(0, 1fr)` to prevent 200%-zoom overflow.

7. **[P1 — RESPONSIVE]**: `overflow-wrap: anywhere` missing from body text. Add to `base.css`: `p, li, dt, dd, a, span, code, kbd, samp, pre { overflow-wrap: anywhere; }`. Without it, 200%-zoom will overflow in narrow grid tracks. See `new_site.md` §19.12.

8. **[P2 — BRAND]**: `mascot.behavior` in the kit is non-null but Scoria is not implemented. Either implement the full mascot (idle glow, tips, easter interactions, dismiss via localStorage) or set `mascot.behavior: null` in the kit. Do not leave an unimplemented non-null field.

9. **[P2 — BRAND]**: `site_architecture` declared in kit not reflected in nav. Either implement the kit's nav (Forge/Tempering/Anvils/Ignition/Relay/Tradition labels, plugins/docs demoted to footer) or remove `site_architecture` from the kit so the default nav applies cleanly.

10. **[P2 — BRAND]**: `seasonal_activation` declared with `live-js` mode not implemented. Either implement the date-gate seasonal variant switcher or set `seasonal_activation: "documented"` mode.

11. **[P3 — BUILDER ERROR]**: `BUILD_LOG.md` line 57 says "BSD-3-Clause" — wrong. Clients are MIT per `content.json`. Fix.

12. **[P3 — CSS]**: `pitch-bullets li` uses `border-left: 3px solid var(--color-primary)` against a `#2A2520` surface. Contrast: primary (#E8611A) on surface-alt (#2A2520) ≈ 3.2:1. Passes the 3:1 minimum for large text/UI but is borderline for decorative borders. Not a hard failure but note.

---

## ❌ NOT APPROVED

Dimensions 9 (Content Accuracy: 55), 8 (Performance: 65), 13 (Experience Fidelity: 68), and 1 (Brand Fidelity: 72) are below the agreed score bar. Three P0 defects must be resolved before this site can ship:

1. **Delete the inline `@font-face` block in `index.html`** (6 broken font 404s)
2. **Fix the install command on `download.html`** (content.json violation — wrong install method)
3. **Create `404.html`** (required by spec, missing)

`npm run lint` was not executed against this specific site directory due to tooling mismatch, but manual CSS inspection found no parse errors. The `@copyright` lines found via grep are all inside `/* */` comment blocks (correctly formatted) — not the "bare outside block" bug from `new_site.md` §19.2.

**Next step**: Fix P0s, re-run `npm run lint`, `node tools/selfcheck.mjs --site volcanic-forge`, and `node tools/render-check.mjs --site volcanic-forge` before requesting re-review.
