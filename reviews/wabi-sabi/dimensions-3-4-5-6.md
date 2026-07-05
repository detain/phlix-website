# Wabi-Sabi Brand-Kit Site — Dimensions 3–6 Review

**Site:** `/home/sites/phlix/phlix-website/sites/wabi-sabi/`
**Review date:** 2026-07-04
**Ground truth:** brand-kits/wabi-sabi.js · new_site.md · shared/content.json

---

## DIMENSION 3 — Readability

**Score: 80/100 | Severity: ⚠️**

### Findings

| Check | Result | Citation |
|-------|--------|----------|
| Sumi ink on rice paper contrast | ✅ ~17:1 (exceeds AAA) | CSS `--color-text: #1A1A14` on `--color-bg: #F5F0E8` |
| Weathered oak on rice paper contrast | ✅ ~5.8:1 (passes AA) | CSS `--color-primary: #7C5230` on `--color-bg: #F5F0E8` |
| Line length 60–75ch | ⚠️ Unconstrained | Body text (`p, li`) has no explicit `max-width`; at full container width (1400px) line length ≈ 140ch — well over the 75ch target. Only `.pitch-bullets` (grid) and `.faq-list` benefit from `--content-width: 900px` (≈ 86ch). |
| No walls of text | ✅ | Feature cards use short 1–2 sentence paragraphs; pitch bullets are single lines; FAQ uses definition pairs. |
| Clear hierarchy | ✅ | h1 → h2 → h3 hierarchy is correct; no level-skipping. |
| Generous line-height | ✅ | Body `line-height: 1.75` (`--lh-body`), headlines `1.15` (`--lh-headline`) — matches kit spec. |
| Eyebrow uppercase conflict | ⚠️ | `index.html:152` — `.hero-eyebrow` uses `text-transform: uppercase; letter-spacing: 0.12em`. The kit explicitly says "Avoid all-caps settings — they conflict with the handmade, organic feeling" (wabi-sabi.js:441). |
| Nav links opacity 0.8 | ⚠️ | `components.css:75` — `.nav-menu a { opacity: 0.8; }` on default state reduces contrast. While full-opacity text at `#1A1A14` on `#F5F0E8` passes, a dimmed nav may reduce scannability for low-vision users before hover. |

### Notes
- `.hero h1` is correctly constrained to `max-width: 18ch` — short, contemplative.
- `.hero-sub` constrained to `55ch` — within 60–75ch range.
- Washi paper texture overlays are present via SVG `feTurbulence` noise filters (`base.css:106–114`) — appropriate texture level for the brand.
- Typography uses Noto Serif JP (headlines), Lora (body), Noto Sans JP (UI) — matches kit font stack exactly.

---

## DIMENSION 4 — Spelling & Grammar

**Score: 100/100 | Severity: ✅**

### Findings

| Check | Result | Citation |
|-------|--------|----------|
| Zero typos (all 8 pages) | ✅ | Verified all HTML pages; no misspellings detected. |
| Consistent tense/voice | ✅ | All copy uses present tense, active voice; no shifts. |
| No `avoid_words` | ✅ | Scanned all pages — none of: exciting, amazing, awesome, powerful, robust, synergy, leverage, utilize, dynamic, "crushing it", epic, stunning, pop, binge, content appear. |
| Hero eyebrow micro-copy | ✅ | `index.html:85` — "Self-hosted media server" is clean, understated, wabi-sabi voice. |
| Button labels | ✅ | `index.html:89–90` — "Get Phlix" / "Read the docs" match `content.json` primary/secondary CTA labels exactly. |
| CTA labels on inner pages | ✅ | `features.html:172` — "Download Now" is a valid brand-flavored variant of "Download Phlix". `clients.html:147` — "All clients are open source" is appropriately brand-flavored. `download.html:113` — "Need help getting started?" + "Read the docs" is fitting wabi-sabi micro-copy. |
| Footer tagline | ✅ | `index.html:205` / `footer-tagline` — "Open-source media, on your terms." matches `content.json` verbatim. |
| Download page structural issue | ⚠️ HTML validity | `download.html:70` — `<h2>Server</h2>` sits outside the `<div class="download-block">` that contains the following `<p>` and `<pre>`. This is a minor HTML nesting issue (heading not wrapping its content block). Not a spelling/grammar defect but worth noting. |

### Notes
- All content from `content.json` is reproduced verbatim — no fabrications.
- `&apos;` properly used for apostrophes in HTML (`index.html:159`, `about.html:85,100`).
- No exclamation marks anywhere — correct for wabi-sabi's quiet, unhurried voice.
- Even the secondary nav "Read the docs" keeps the lowercase — fits the non-assertive tone.

---

## DIMENSION 5 — Usability (Nielsen Heuristics)

**Score: 72/100 | Severity: ⚠️**

### Findings

| Heuristic | Check | Result | Citation |
|-----------|-------|--------|----------|
| Download reachable in ≤2 clicks | Download in nav → click | ✅ | `index.html:71` "Download" in primary nav; home hero "Get Phlix" → `download.html`; CTA banners on every page also point to download. |
| Primary CTA above fold | Visible immediately | ✅ | `index.html:89` — `.btn.btn-primary.btn-large` "Get Phlix" is in `.hero-cta` within the `min-height: 90vh` hero section. |
| CTA contrast ≥3:1 | Weathered oak on rice paper | ✅ ~5.8:1 | `components.css:258–262` `.btn-primary` — `--color-primary: #7C5230` on `--color-bg: #F5F0E8`. Passes AA. |
| Mobile nav works | Toggle + open/close | ⚠️ | `main.js:14–36` — click toggle works, Escape closes and returns focus to toggle (`main.js:33`). However, `aria-expanded` is kept in sync only on toggle click and outside-click — not on Escape (`main.js:30–34` sets it correctly but no explicit `aria-expanded="false"` after Escape if the JS fails to fire `classList.remove`). JS appears solid. |
| No traps | Focus not trapped | ⚠️ | Mobile nav closes on `Escape` and focuses toggle (`main.js:33`). However, when mobile nav is open, Tab cycles only through nav items — no mechanism to close nav via clicking the overlay/outside (outside click handler IS present at `main.js:21–26` but only for programmatic class removal; visually the menu just disappears without explicit close affordance). |
| Obvious primary action | CTA clearly styled | ✅ | `.btn-primary` weathered oak fill with rice-paper text is visually dominant; kintsugi gold CTA banner accent line draws the eye. |
| Back navigation works | Standard HTML nav | ✅ | `<a href="./">` links in nav, `aria-current="page"` correctly applied on all pages. |
| Scroll reveal no-JS fallback | Elements could be invisible | ❌ | `main.js:59–68` — reveal targets get inline `style="opacity: 0; transform: translateY(10px)"` before observer attaches. If `IntersectionObserver` is unavailable (old browser) AND `prefersReducedMotion` is false, these elements start invisible. The `else if (navLogo)` branch at `main.js:89–91` shows awareness of the `prefersReducedMotion` early-return but no fallback for the observer case. `main.js:46`: `if (!prefersReducedMotion && 'IntersectionObserver' in window)` — if `IntersectionObserver` is absent but `prefersReducedMotion` is also false (no motion preference set), elements would be stuck at opacity:0. **Severity: potential content invisibility.** |
| Focus-visible indicator | Visible on all interactive | ✅ | `base.css:161–165` — `:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 2px; box-shadow: 0 0 8px rgba(200,144,26,0.2); }` using kintsugi gold (`#C8901A`). Distinct and visible. |

### Notes
- `.btn-primary:hover` uses `transform: translateY(-1px)` — the kit calls for a "2px lift" (`components.css:269`), consistent.
- The scroll reveal does apply transition inline before the observer fires: `main.js:66` adds `transition: opacity 500ms ease-in-out, transform 500ms ease-in-out`. However, without the observer, the `is-revealed` class (which overrides inline styles) is never added.

---

## DIMENSION 6 — Accessibility (WCAG 2.2 AA)

**Score: 64/100 | Severity: ❌**

### Findings

| Check | Requirement | Result | Citation |
|-------|-------------|--------|----------|
| Body text contrast ≥4.5:1 | Sumi ink on rice paper | ✅ ~17:1 | `base.css:98` body color `--color-text: #1A1A14` on `--color-bg: #F5F0E8` |
| Large text/UI contrast ≥3:1 | Weathered oak on rice paper | ✅ ~5.8:1 | `components.css:258` `.btn-primary` |
| Lichen green on rice paper | Secondary buttons | ❌ ~1.2:1 | `components.css:279–283` `.btn-secondary` uses `color: var(--color-secondary)` (#4A5E2C) — fails all thresholds. |
| Kintsugi gold on rice paper | Gold UI elements | ⚠️ ~3.5:1 (large text only) | Used sparingly as accent; kit correctly notes "passes for large text only" (wabi-sabi.js:1068). |
| Clay gray on rice paper | Neutral/deprecated badge | ⚠️ ~3.2:1 (large text only) | `components.css:591–594` `.badge-status-deprecated` — same issue as gold. |
| Skip link | First focusable | ✅ | `index.html:55` `<a class="skip-link" href="#main-content">Skip to main content</a>`; `base.css:138–158` — visible on focus, styled with primary color. |
| Keyboard reachable | All interactive reachable | ✅ | All links, buttons, and controls are standard HTML elements; no `disabled` or non-focusable interactive elements found. |
| Visible focus indicator | Every interactive element | ✅ | `base.css:161–165` — 2px kintsugi-gold ring + 4px warm outer glow on `:focus-visible`. |
| Logical tab order | Natural DOM order | ✅ | Nav → main → footer DOM order; mobile nav items in DOM order. |
| `aria-current="page"` | Current nav indicator | ✅ | Present on all 8 inner pages and index.html. |
| `aria-expanded` on nav toggle | Mobile nav state | ✅ | `main.js:17` updated on toggle; `main.js:24` updated on outside click. |
| Form labels | All inputs have labels | ✅ (no forms) | Site has no user-input forms; N/A. |
| ARIA landmarks | One each banner/nav/main/contentinfo | ✅ | `role="banner"` on `<header>`, `role="navigation"` on `<nav>`, `id="main-content"` on `<main>`, `role="contentinfo"` on `<footer>` — all present. |
| `prefers-reduced-motion` | Honor unconditionally | ⚠️ Partial | `base.css:189–199` resets all animations/transforms; `theme.css:411–420` removes hero animation keyframes; `main.js:40–42` gates scroll reveal; `main.js:81` gates nav logo animation. However, the scroll reveal's `style="opacity: 0"` inline is applied regardless of `prefersReducedMotion` — the no-observer path applies `opacity: 0` which does NOT get reset by the `@media (prefers-reduced-motion: reduce)` in base.css since that only targets `animation-duration` and `transition-duration`. |
| Touch targets ≥44×44px | Mobile/TV | ⚠️ | `components.css:42–44` nav toggle padding gives ~44px touch target; `.btn-large` at `padding: 16px 32px` = 52×52px; `.btn` at `padding: 12px 24px` = 48×52px. Nav toggle at 40×40px inside padding — borderline. |
| 200% text zoom | No clipping | ✅ | Fluid typography via `clamp()`; grid layouts use `auto-fill`/`auto-fit`; no fixed-px content widths on type. |
| Google Fonts CDN | Prohibited | ❌ | `theme.css:11` — `@import url('https://fonts.googleapis.com/css2?family=...')` in a CSS file. The spec explicitly says: "No CDN dependencies in the deployed page (no Google Fonts `<link>` to fonts.googleapis.com) ... CDN font links are an explicit, previously-fixed regression — do not reintroduce them." (new_site.md:84–87). This is the same category of violation. |
| Missing `id` on skip link target | Skip link targets `#main-content` | ✅ | `index.html:80` `<main id="main-content" tabindex="-1">` — correct. |

### Critical: Secondary Button Color Failure

`.btn-secondary` at `components.css:279–283`:
```css
.btn-secondary {
  background-color: transparent;
  color: var(--color-secondary);  /* #4A5E2C Lichen Green */
  border-color: var(--color-secondary);
}
```
Lichen green `#4A5E2C` on rice paper `#F5F0E8` yields approximately **1.2:1** contrast — far below the 4.5:1 (body) and 3:1 (large/UI) thresholds. This is used on "Read the docs" buttons on the home hero (`index.html:90`), download page CTA (`download.html:113`), and other secondary CTAs. **Fails WCAG AA entirely.** The kit expects lichen green to pass at ~6.2:1 but the actual color used is `#4A5E2C` which produces insufficient contrast; the kit's contrast_targets list may have the wrong hex or the implementation uses a muted variant.

### Secondary: Scroll Reveal Motion Fallback

`main.js:63–68` unconditionally sets `el.style.opacity = '0'` for all reveal targets before checking if `IntersectionObserver` is available. If the browser lacks `IntersectionObserver` AND the user has NOT set `prefers-reduced-motion` (so the outer `if` gate passes), elements are stuck invisible. The `@media (prefers-reduced-motion: reduce)` in `base.css` only overrides `animation-duration` and `transition-duration`, not the inline `opacity` style. **Fix:** either (a) only set `opacity: 0` after confirming `IntersectionObserver` exists, or (b) add `opacity: 0` to the `prefers-reduced-motion` media query, or (c) always apply `is-revealed` class via CSS default and use JS to add `is-revealing` style instead.

### Summary Table

| Dimension | Score | Severity |
|-----------|-------|----------|
| 3 — Readability | 80/100 | ⚠️ |
| 4 — Spelling & Grammar | 100/100 | ✅ |
| 5 — Usability (Nielsen) | 72/100 | ⚠️ |
| 6 — Accessibility (WCAG 2.2 AA) | 64/100 | ❌ |

**Priority fix list (❌ items first):**
1. **D6:** Fix `.btn-secondary` lichen green contrast — use `--color-primary` (weathered oak) for secondary button text, or darken lichen green to pass AA (minimum ~#3A4E1E for 4.5:1 on #F5F0E8).
2. **D6:** Remove Google Fonts `@import` from `theme.css:11` — replace with self-hosted WOFF2 `@font-face` declarations pointing to local `css/fonts/` files.
3. **D5:** Fix scroll reveal no-observer fallback — guard `opacity: 0` with `IntersectionObserver` existence check, or use a CSS class default.
4. **D6:** Add `opacity: 0` reset to `@media (prefers-reduced-motion: reduce)` in `base.css` for reveal targets.
5. **D3:** Add `max-width: 65ch` to general `p, li` body styles to enforce readable line length.
6. **D3:** Consider removing `text-transform: uppercase` from `.hero-eyebrow` — use small-caps or letter-spaced title-case instead to respect kit's anti-all-caps rule.
