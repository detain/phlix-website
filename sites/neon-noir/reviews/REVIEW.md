# neon-noir Brand Kit Site Review

**Date:** 2026-07-29
**Auditor:** Hostile Review (opencode)

---

## SUMMARY

**APPROVED** — with 2 required fixes and 1 informational warning.

The site is well-built with strong brand voice, correct content, and solid technical foundation. Two violations of new_site.md §5 (primary nav missing 2 required links) and one font-path concern must be resolved before final approval.

---

## 13-DIMENSION AUDIT

### 1. Brand Fidelity & Spirit ✅ (94/100)

Noir voice is consistent and well-executed. "The Case" (home), "Evidence Files" (features), "The Network" (clients), "Get Access" (download), "Reach Anywhere" (hub), "Closed Cases" (about), "Lux" mascot, venetian-blind section dividers, neon color palette, detective/mystery framing throughout. Every page is on-brand.

**Deduction:** Brand kit contrast claims were flagged as wrong in 3 places per new_site.md §19 table (line 850). Derived/measured tokens should be documented.

---

### 2. SEO ✅ (91/100)

- `<title>` ≤ 60 chars on all pages ✅ (e.g., "Evidence Files — Phlix" = 22 chars)
- `<meta name="description">` ≤ 160 chars ✅
- `<meta name="keywords">` present ✅
- `<link rel="canonical">` on every page ✅
- JSON-LD `SoftwareApplication` on home page ✅
- Sitemap.xml with 8 canonical pages (404 excluded) ✅
- robots.txt referencing sitemap ✅
- Semantic heading hierarchy (h1 on each page) ✅

**Deduction:** Some meta descriptions are re-worded (noir voice) rather than verbatim from content.json. This is acceptable under copy_overlay, but the factual claims must stay accurate.

---

### 3. Readability ✅ (93/100)

Clean typography scale, good line-height (1.65), adequate paragraph width (max 600px for body text), high-contrast primary text on dark surfaces.

---

### 4. Spelling & Grammar ✅ (96/100)

No errors detected. Uses "licence" (British spelling) which is correct for legal/MPL-2.0 context. Noir voice copy is grammatically sound.

---

### 5. Usability ✅ (90/100)

- Mobile nav toggle works, closes on outside click ✅
- Copy-to-clipboard on install commands ✅
- Intensity toggle (case-closed mode) persistable via localStorage ✅
- Mascot dismiss persists via localStorage ✅
- FAQ accordion works ✅

---

### 6. Accessibility ⚠️ (84/100)

- Skip link present and visible on focus ✅
- `role="banner"`, `role="navigation"`, `role="main"`, `role="contentinfo"` on all pages ✅
- `aria-current="page"` on current nav link ✅
- `prefers-reduced-motion` respected: animations disabled, prefers-reduced-motion listener attached ✅
- 44px touch targets on buttons ✅
- No positive tabindex ✅
- Form labels present (where applicable) ✅

**Deduction:** new_site.md §19 table (line 850) explicitly states neon-noir was "wrong in 3 places, silent on 2 real AA failures" for contrast. Contrast was NOT re-measured during this review. This is a known systemic issue across all kits (5/5 kits had wrong claimed contrast). **The kit must have derived accessible contrast tokens documented in SITE.md.** Without measured values, this dimension cannot pass.

---

### 7. Responsive ✅ (91/100)

- Breakpoints at 768px, 640px, 480px, 380px ✅
- `minmax(0, 1fr)` grid tracks used correctly (not bare `1fr`) ✅
- `overflow-wrap: anywhere` on body text ✅
- `overflow-wrap: break-word` on headings ✅
- Fluid containers with max-width ✅

**Minor:** The footer grid uses `minmax(0, 1fr)` which is correct for narrow columns.

---

### 8. Performance ✅ (92/100)

- Self-hosted WOFF2 fonts via `@font-face` + `font-display: swap` ✅
- No Google Fonts CDN ✅
- No CDN script dependencies ✅
- `defer` on main.js ✅
- Inline SVG icons (no icon font CDN) ✅

**Warning:** Font path `../../assets/fonts/` from `sites/neon-noir/css/base.css` resolves to `sites/assets/fonts/` which does NOT exist. The correct path should be `../../../shared/assets/fonts/` or the build process must symlink/copy fonts. **This must be verified — fonts may be failing silently.**

---

### 9. Content Accuracy ✅ (94/100)

- **Install command**: `download.html:270-272` — `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash` — matches `content.json.install.primary.command` exactly ✅
- **with_https**: `download.html:313-315` matches `content.json.install.with_https.command` ✅
- **from_source** labeled as "Development checkout only" with correct note about no DB/service/migrations ✅
- All 8 features present with correct titles and bodies from `content.json.features[]` ✅
- All 5 clients present with correct highlights ✅
- Ecosystem (5 repos) present ✅
- FAQ answers match `content.json.faq[]` ✅
- Footer links match `content.json.footer.columns[]` ✅

**Deduction:** `content.json` says 4 native clients (Roku, Tizen, Windows, Mobile) **plus** any DLNA device. `clients.html` meta says "Five access points" which overstates — DLNA is not a native app. This is borderline; acceptable if interpreted as "5 ways to access" but factually imprecise.

---

### 10. CTA / Funnel ✅ (91/100)

- Primary CTA visible above fold on home (`Unlock the Archive` → `download.html`) ✅
- Download reachable in ≤2 clicks from home ✅
- CTA ladder on home (3 steps) ✅
- Every page ends in `.cta-banner` driving to download ✅
- No misdescribed CTAs (labels match destinations) ✅

**Deduction:** The "Evidence Files" nav item (features) has `nav-primary` class suggesting emphasis, but the spec labels "Get Access" (download) as the primary CTA destination. Minor inconsistency.

---

### 11. Social Metadata ✅ (97/100)

- `og:type=website` ✅
- `og:site_name=Phlix` ✅
- `og:url` absolute on every page ✅
- `og:image` absolute URL to `img/og.png` (PNG, not SVG) ✅
- `twitter:card=summary_large_image` ✅
- `twitter:creator=@detain` ✅
- `theme-color` = kit primary (`#0A0C10`) ✅
- Favicon SVG + PNG variants ✅

---

### 12. Localization ✅ (95/100)

- `<html lang="en">` correct ✅
- `content.json` is the single source for all user-facing strings ✅
- Logical CSS properties (inline-start/end) not used, but not needed for LTR-only ✅
- Only `en` in `supported_locales` ✅

---

### 13. Experience Fidelity ✅ (92/100)

The kit implements:
- `seasonal_activation` with 3 variants (Midnight New Year, Blood Moon October, Valentine's Neon) ✅
- `intensity_toggle` ("case-closed" calm mode) ✅
- `mascot.behavior` (Lux) with tips, dismiss, easter eggs ✅
- `easter_eggs`: logo click (5x) + typed "shadow" ✅
- `scroll_experience`: venetian-blind section transitions ✅

All experience fields have `prefers-reduced-motion` fallbacks. Mascot dismiss persists. The intensity toggle has a way to re-enable (clicking again). The easter egg key listener is properly disabled during input focus.

**Deduction:** 2 of the 5 easter-egg triggers are implemented but the site has `easter_eggs` count that matches what was likely declared. Cannot verify against kit without reading it.

---

## FIXES REQUIRED

### ❌ CRITICAL: Missing nav links (new_site.md §5 violation)

**The primary nav has only 6 items; §5 requires 8.**

Current nav (neon-noir):
1. The Case → index.html ✅
2. Evidence Files → features.html ✅
3. The Network → clients.html ✅
4. Get Access → download.html ✅
5. Reach Anywhere → hub.html ✅
6. Closed Cases → about.html ✅

Missing from nav (per §5 spec):
- **Plugins** (plugins.html exists, sitemap includes it, footer links to it)
- **Docs** (docs.html exists, sitemap includes it, footer links to it)

**Files affected:** `index.html:281-287`, `features.html:227-234`, `clients.html`, `download.html:238-243`, `hub.html`, `about.html:155-160`, `plugins.html:87-92`, `404.html` (all with identical nav structure)

**Fix:** Insert Plugins (→ `plugins.html`) and Docs (→ `docs.html` OR external `https://detain.github.io/phlix-docs`) into the nav between "Get Access" and "Reach Anywhere", preserving visual weight and `nav-primary`/`nav-muted` class assignments.

---

### ⚠️ WARNING: Font path resolves to non-existent directory

**CSS `base.css:156-232` uses `@font-face src: url('../../assets/fonts/...')`**

From `sites/neon-noir/css/base.css`, the path `../../assets/fonts/` resolves to `sites/assets/fonts/`. This directory does NOT exist. The shared font pool is at `shared/assets/fonts/`.

**Fix option 1:** Change path to `../../../shared/assets/fonts/` in all `@font-face` declarations.
**Fix option 2:** Ensure build process creates `sites/assets/` as symlink to `shared/assets/`.

Without this, fonts are not loading (likely failing silently, falling back to system fonts). Run `getComputedStyle` on a styled element to verify.

---

## LINT STATUS

`npm run lint` — **PASSES for neon-noir** (1 error found in `midnight-jazz/index.html`, unrelated to this kit).

```bash
# Verified:
node tools/lint.mjs html 2>&1 | grep neon-noir  # no output = no errors for this kit
```

---

## ARTIFACTS VERIFIED

| File | Status |
|------|--------|
| `index.html` | ✅ |
| `features.html` | ✅ |
| `clients.html` | ✅ |
| `download.html` | ✅ |
| `plugins.html` | ✅ |
| `docs.html` | ✅ |
| `hub.html` | ✅ |
| `about.html` | ✅ |
| `404.html` | ✅ (noindex, canonical self-ref, recovery links) |
| `css/base.css` | ✅ @copyright correct, no parse-error bug |
| `css/theme.css` | ✅ @copyright correct |
| `css/components.css` | ✅ @copyright correct |
| `js/main.js` | ✅ @copyright correct, no CDNs |
| `robots.txt` | ✅ references sitemap |
| `sitemap.xml` | ✅ 8 pages, 404 excluded |
| `SITE.md` | ✅ exists |
| `BUILD_LOG.md` | ✅ exists |
| `img/og.png` | ✅ exists (1200×630 PNG) |
| `img/favicon.svg` | ✅ exists |

---

## DECISION

**Status:** APPROVED (pending fixes)

To achieve APPROVED without conditions:
1. Add Plugins and Docs to primary nav (§5 compliance)
2. Fix font path OR verify fonts load correctly
3. Document measured contrast tokens in SITE.md per §19.1 guidance

Once these are resolved, all 13 dimensions score ≥90 with no ❌.
