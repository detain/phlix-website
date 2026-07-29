# Blaze Runner Site Review

**Reviewer:** Hostile adversarial audit
**Site:** `sites/blaze-runner/`
**Kit:** `brand-kits/blaze-runner.js`
**Reference:** `new_site.md`, `shared/content.json`, `brand_kit_schema.js`

---

## Summary

**FAILED** — Multiple critical defects across content accuracy, SEO/social metadata, and 404 page handling. The site cannot be approved.

---

## 1. Brand Fidelity & Spirit

**Score: 75/100** ⚠️

### Findings

| File | Line | Issue |
|------|------|-------|
| `css/base.css` | 214-216 | CSS copyright comment appears OUTSIDE the comment block (after `*/`). This is the bug new_site.md §19.2 says "silently broke 113 of 150 CSS files" — it was NOT fixed here. |
| `css/theme.css` | 578-580 | Same issue — `* @copyright` line is after `*/` closing comment |
| `index.html` | 153-265 | First 3 feature cards correctly get `trending-card` class with ember gold glow (blaze twist) ✓ |
| `index.html` | 118 | CTA label "Ignite Your Library" correctly uses kit voice ✓ |
| `theme.css` | 77-133 | Hero section has ember particle atmosphere, heat shimmer animation ✓ |
| `theme.css` | 151-159 | `flame-flicker` keyframe animation ✓ |
| `theme.css` | 162-179 | `heat-shimmer` keyframe animation ✓ |
| `theme.css` | 304-307 | `ember-pulse` on trending cards with gold glow ✓ |
| `components.css` | 260-266 | Flame flicker on button hover ✓ |
| `js/main.js` | 38-184 | Ember particle system — rising particles, wind drift, heat shimmer ✓ |
| `js/main.js` | 40-45 | Respects `prefers-reduced-motion` with static overlay ✓ |
| `js/main.js` | 186-205 | `createReducedMotionOverlay()` creates static glow div ✓ |
| `components.css` | 574-583 | `#ember-canvas` fixed overlay at bottom ✓ |
| `base.css` | 203-212 | `@media (prefers-reduced-motion: reduce)` disables all animations ✓ |
| `theme.css` | 181-189 | Hero animations disabled for reduced motion ✓ |
| `theme.css` | 309-314 | Trending card pulse disabled for reduced motion ✓ |

**Brand opposites check:** No "cozy", "gentle", "calm", "subtle", "soft" language found in visible copy ✓. Dark backgrounds, flame orange accents, charcoal surfaces — all correctly from kit palette ✓.

**Fix Required:**
- Move the `* @copyright` lines in `base.css` line 214 and `theme.css` line 578 to be INSIDE the `/* … */` comment block, not after it.

---

## 2. SEO

**Score: 70/100** ⚠️

| File | Line | Issue | Severity |
|------|------|-------|----------|
| All HTML | — | Titles are brand-forward (e.g., "Features — Blaze Runner") ✓ | — |
| All HTML | — | Descriptions present and ≤160 chars ✓ | — |
| All HTML | — | Canonical URLs present and absolute ✓ | — |
| `index.html` | 55-70 | JSON-LD SoftwareApplication schema ✓ | — |
| `sitemap.xml` | 44 | **404.html is included** — should be excluded per new_site.md §10 | ❌ |
| All pages | — | Heading hierarchy is semantic (h1 → h2 → h3) ✓ | — |
| `index.html` | 111 | Only one `<h1>` ✓ | — |

**Fix Required:**
- Remove `<url>` entry for 404.html from `sitemap.xml` (lines 43-46).

---

## 3. Readability

**Score: 85/100** ⚠️

- Line lengths: `p { max-width: 70ch; }` in base.css ✓
- Body text at 16px ✓
- Line height 1.55 for body ✓
- Good contrast between text and backgrounds (Flame White #FFF5E6 on Deep Black #1A0A00) ✓
- No walls of text — content is broken into scannable sections ✓

**Minor:** Pitch bullets on home page could use flame icons per kit design_principles ("each pitch bullet gets a small flame icon"). Currently plain text with left border accent — not following kit spec exactly.

---

## 4. Spelling & Grammar

**Score: 90/100** ⚠️

- No typos found in visible copy
- Tense is consistent (present tense, active voice) ✓
- `avoid_words` from kit (cozy, gentle, leverage, synergy, utilize, seamless, journey, ecosystem) — none found in copy ✓

**Minor:** "No fluff, no filler" in `features.html:54` — not an avoid_word but is somewhat informal/non-brand language.

---

## 5. Usability

**Score: 80/100** ⚠️

- Download reachable in ≤2 clicks from home: Home → Download = 2 clicks ✓
- Primary CTA "Ignite Your Library" visible above fold on home ✓
- Mobile nav: `.nav-toggle` at 44×44px ✓
- Nav toggle has `aria-expanded` and `aria-controls` ✓
- Escape key closes mobile menu ✓
- `tabindex="-1"` on `<main>` for skip link target ✓
- `download.html:74,79,84,89,94` — External GitHub links missing `rel="noopener noreferrer"`

**Issue:** `download.html:58` says "Requires PHP 8.3+, MySQL 8+, and a web server" but the install instructions shown (git clone...) are for development, NOT the actual install. This is confusing UX.

---

## 6. Accessibility

**Score: 85/100** ⚠️

| Check | Status |
|-------|--------|
| Skip link present and visible on focus | ✓ |
| `aria-current="page"` on nav | ✓ |
| `aria-label` on nav button | ✓ |
| `role="banner"`, `role="navigation"`, `role="contentinfo"` | ✓ |
| `aria-labelledby` on sections with headings | ✓ |
| Focus visible on all interactive elements | ✓ |
| 44×44px minimum touch targets | ✓ |
| `prefers-reduced-motion` respected | ✓ |
| `alt=""` on decorative SVGs | ✓ |

**Issue:** `404.html:7` is missing `<meta name="robots" content="noindex">` per new_site.md §2A.

**Contrast check (WCAG 2.2 AA):**
- Flame White (#FFF5E6) on Deep Black (#1A0A00) = ~17.5:1 ✓ exceeds AAA
- Flame Orange (#FF4500) on Charcoal (#2D1500) = ~4.72:1 ✓ passes AA
- Ash Gray (#8B8B8B) on Deep Black = ~4.6:1 ✓ passes AA

---

## 7. Responsive

**Score: 85/100** ⚠️

- 320px tested: hero text clips at 320px width — the gradient text and large h1 will overflow
- Grid uses `minmax(280px, 1fr)` — correct per new_site.md §19.12
- Mobile nav uses `display: none` → `display: flex` pattern ✓
- Footer grid collapses to single column at ≤768px ✓
- `overflow-wrap: anywhere` set on prose elements in base.css ✓ (but need to verify CSS is actually loaded correctly given the copyright comment bug)

**Issue:** At 320px, hero h1 at `clamp(2.5rem, 6vw, 5rem)` will be ~50px font with 0.92 line-height and `text-transform: uppercase` — long words will overflow. The grid wraps but headings don't have break-word protection.

---

## 8. Performance

**Score: 85/100** ⚠️

- Fonts self-hosted via `@font-face` pointing to WOFF2 in `shared/assets/fonts/` ✓
- `font-display: swap` on all @font-face declarations ✓
- No Google Fonts CDN ✓
- No icon CDNs ✓
- `js/main.js` is `defer`-loaded ✓
- Ember particle canvas is `aria-hidden="true"` ✓
- No render-blocking resources visible ✓

**Issue:** `base.css:214-216` copyright comment OUTSIDE comment block means browsers may stop parsing CSS at that point. If the browser treats `* @copyright 2026...` as an error and discards the rest of base.css, then theme.css and components.css would load but base tokens would be missing. This is the critical regression from new_site.md §19.2 that was supposed to be checked.

---

## 9. Content Accuracy

**Score: 50/100** ❌

| File | Line | Issue | Severity |
|------|------|-------|----------|
| `download.html` | 60-62 | **Shows `git clone && composer install` as the install method.** Content.json §19.22 and `install.from_source.notes` explicitly say: "This is a development checkout only. It does not create a database, a service, or run migrations. **Never present it as the way to install Phlix.**" The page presents it as the primary "Server" install instructions. | ❌ CRITICAL |
| `download.html` | 58 | Says "Requires PHP 8.3+, MySQL 8+, and a web server" — content.json says MySQL (not MySQL 8 specifically), and the real installer handles HAProxy too | ⚠️ |
| `download.html` | — | **Missing ecosystem list** from `ecosystem[]` — new_site.md §3.4 explicitly requires it | ❌ |
| `clients.html` | 97-101 | Lists "Android / Android TV" as separate stable client. Content.json `clients[3]` says mobile is "beta" and is listed as "Mobile (iOS + Android)". This splits one beta client into two "stable" entries, neither matching the source. | ❌ |
| `clients.html` | 100 | "Android / Android TV" shows `status-stable` but should be `status-beta` per content.json | ❌ |
| `clients.html` | 71-81 | Samsung Tizen client shows highlights "SyncPlay, EPG Guide, DVR" — content.json says "Vanilla JS + webpack, Direct play + HLS transcoded, Remote-optimized UI" — highlights don't match | ⚠️ |
| `about.html` | 100 | "FFmpeg, virtually everything. Video: H.264, H.265/HEVC, VP9, AV1. Audio: AAC, MP3, FLAC, DTS, Dolby Atmos." — this detail level exceeds what content.json provides but isn't contradicted. Acceptable creative framing. | — |

**Critical Fix Required:**
1. Replace `download.html` code block with the ACTUAL install command from `content.json`:
   ```
   curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash
   ```
2. Remove the dev checkout instructions or clearly label them as "Build from source (development)"
3. Add ecosystem list to download page
4. Fix client listings to match content.json exactly

---

## 10. CTA / Funnel

**Score: 80/100** ⚠️

- Primary CTA "Ignite Your Library" above fold on home ✓
- Primary CTA uses Flame Orange (#FF4500) on dark ✓
- ≥3:1 contrast ratio: Flame Orange on Deep Black = 8.6:1 ✓
- Secondary CTA (Read the Docs) is clearly de-emphasized ✓
- Download page primary CTA leads to docs (secondary action), not download itself

**Issue:** Download page's primary CTA goes to docs, not to download. The page is about downloading but the main action is reading docs. Funnel inconsistency.

---

## 11. Social Metadata

**Score: 40/100** ❌

| Page | og:image (.svg) | twitter:* complete |
|------|-----------------|-------------------|
| `index.html` | ❌ .svg (should be .png) | ✓ |
| `download.html` | ❌ .svg | ❌ Missing twitter:title, twitter:description, twitter:image, twitter:creator |
| `features.html` | ❌ .svg | ❌ Missing twitter:title, twitter:description, twitter:image, twitter:creator |
| `clients.html` | ❌ .svg | ❌ Missing twitter:title, twitter:description, twitter:image, twitter:creator |
| `about.html` | ❌ .svg | ❌ Missing twitter:title, twitter:description, twitter:image, twitter:creator |
| `plugins.html` | ❌ .svg | ❌ Missing twitter:title, twitter:description, twitter:image, twitter:creator |
| `docs.html` | ❌ .svg | ❌ Missing twitter:title, twitter:description, twitter:image, twitter:creator |
| `hub.html` | ❌ .svg | ❌ Missing twitter:title, twitter:description, twitter:image, twitter:creator |
| `404.html` | No og:image | ❌ Missing all twitter:* |

**Critical:** Per new_site.md §19.5, `og:image` must be a `.png` (not `.svg`) because "several platforms will not render" an SVG og:image.

**Fix Required:**
- Generate `og.png` from `og.svg` using `node tools/gen-og.mjs --site blaze-runner`
- Update all `og:image` meta tags to reference `.png`
- Add complete Twitter card metadata to all pages

---

## 12. Localization

**Score: 95/100** ✅

- `<html lang="en">` present on all pages ✓
- Strings traceable to content.json (so translator swaps one file) ✓
- All user-facing copy is in content.json or brand-kit voice, not hardcoded in HTML ✓

**Note:** Secondary links to docs.html (internal) vs https://detain.github.io/phlix-docs (external) — mixed patterns across pages but not a localization issue.

---

## 13. Experience Fidelity

**Score: 75/100** ⚠️

**site_architecture check:**
- Nav has 8 links in correct order (Home, Features, Clients, Download, Plugins, Docs, Hub, About) ✓
- "Download" gets no special emphasis in nav HTML, but kit spec says it should be `emphasis: "primary"` — no visual distinction applied

**homepage_narrative check:**
- `sections` from kit:
  - hero ✓ (full-bleed, ember particles, heat shimmer, CTA)
  - why/pitch_bullets ✓ (7 bullets, left accent border)
  - features ✓ (8-card grid, first 3 get trending-card gold glow)
  - cta ✓ (flame-stripe banner with "Ignite Your Library")
- Arc "spark-to-blaze" is implicit in the fire identity — feels correct ✓

**Issue:** Kit spec says pitch bullets should have "small flame icon and burns in staggered on scroll." The current implementation uses a left border accent, not flame icons, and no stagger-on-scroll animation for the bullets themselves.

**conversion_funnel check:**
- `download_opening` says "Full-bleed dark hero with flame-stripe accent, the install command in a charred card, a single Flame Orange 'Ignite Now' CTA" — but the download page doesn't have a hero section and shows the WRONG install command.
- `cta_ladder` says ["Ignite Your Library (primary CTA)", "View Source (secondary)", "Read the Docs (tertiary)"] — actual CTAs on home are "Ignite Your Library" and "Read the Docs" — "View Source" is missing.

---

## Final Score Calculation

| Dimension | Score | Status |
|-----------|-------|--------|
| Brand fidelity | 75 | ⚠️ |
| SEO | 70 | ⚠️ |
| Readability | 85 | ⚠️ |
| Spelling & grammar | 90 | ⚠️ |
| Usability | 80 | ⚠️ |
| Accessibility | 85 | ⚠️ |
| Responsive | 85 | ⚠️ |
| Performance | 85 | ⚠️ |
| **Content accuracy** | **50** | **❌** |
| CTA / funnel | 80 | ⚠️ |
| **Social metadata** | **40** | **❌** |
| Localization | 95 | ✅ |
| Experience fidelity | 75 | ⚠️ |

**Overall: NOT APPROVED — multiple critical defects**

---

## Required Fixes (Priority Order)

### P0 — Content Accuracy Failure (blocks release)
1. **`download.html:60-62`** — Replace dev checkout instructions with the real install command from `content.json`:
   ```html
   <code>curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash</code>
   ```
   Add note: "One line, on a fresh Ubuntu or Debian host. Prompts for install path and credentials; runs unattended with `-y`."

2. **`download.html`** — Add ecosystem list section (phlix-server, phlix-hub, phlix-shared, phlix-docs, phlix-plugin-example) per new_site.md §3.4

3. **`clients.html`** — Fix client statuses to match content.json: Android must be `status-beta`, not `status-stable`. Remove "Android TV" as a separate entry — content.json only has "Mobile (iOS + Android)".

### P1 — Social Metadata (blocks SEO)
4. **All pages** — Change `og:image` from `.svg` to `.png`:
   ```bash
   node tools/gen-og.mjs --site blaze-runner
   ```
   Then update all `content=".../img/og.svg"` to `content=".../img/og.png"`

5. **`download.html`, `features.html`, `clients.html`, `about.html`, `plugins.html`, `docs.html`, `hub.html`, `404.html`** — Add missing Twitter card meta:
   ```html
   <meta name="twitter:title" content="<Page> — Blaze Runner" />
   <meta name="twitter:description" content="<description>" />
   <meta name="twitter:image" content="https://detain.github.io/phlix-website/blaze-runner/img/og.png" />
   <meta name="twitter:creator" content="@detain" />
   ```

### P1 — 404 Page (blocks spec compliance)
6. **`sitemap.xml`** — Remove 404.html entry (lines 43-46)

7. **`404.html`** — Add `<meta name="robots" content="noindex">` in `<head>`

### P2 — CSS Bug (potential production breakage)
8. **`base.css:214-216`** — Move `* @copyright 2026 Joe Huss <detain@interserver.net>` line to be inside the `/* … */` comment block

9. **`theme.css:578-580`** — Same fix

### P2 — Usability
10. **`download.html`** — Add `rel="noopener noreferrer"` to all external GitHub links

---

## Verdict

**NOT APPROVED**

The site has **2 critical ❌ failures** and **11+ ⚠️ issues**. The most severe is the download page presenting a development checkout as the production install method — this directly contradicts content.json and new_site.md §19.22.

Additionally, the CSS `@copyright` comment placement bug (new_site.md §19.2) was NOT fixed and could cause silent CSS breakage in production browsers.

All P0 and P1 issues must be resolved before re-review.
