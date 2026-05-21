# ROUND-1-SUMMARY — 03-retro-film-reel-3 (Wave 3 Phase C)

## Variant
**Retro Film Reel V3 — Film Noir** (high-contrast B&W + amber)

---

## Collated Verdict

| Reviewer | Verdict | Score |
|----------|---------|-------|
| Branding Consistency | ❌ **FAIL** | Critical mismatch |
| SEO | ✅ PASS | 8.3/10 |
| CTA + Funnel | ⚠️ PASS (with concerns) | 3.5/5 pillars |
| Social Metadata | ✅ **APPROVED** | — |
| Content Quality | ✅ PASS | B+ |
| Localization | ❌ **CRITICAL** | No i18n infrastructure |
| Performance | ⚠️ **WARNING** | Fonts missing (deployment) |
| Accessibility | ⚠️ CONDITIONAL | Minor a11y gaps |
| Usability | ⚠️ PASS (with fixes) | Good |
| Responsive | ✅ **APPROVED** | — |
| Tester | ✅ PASS | Minor issues |
| Documenter | ✅ PASS | 94/100 |
| Code Review | ✅ **APPROVE** | All checks pass |

**Overall: 5 PASS / 4 CAUTION / 2 FAIL**

---

## 🔴 Critical Issues (Must Fix)

### 1. Wrong Variant Branding — branding-consistency.md

The CSS file header and entire implementation are **Film Noir**, not **Sunday Matinee** as specified for wave 3.

| Element | Should Be (Sunday Matinee) | Is (Film Noir) |
|---------|---------------------------|----------------|
| Background | Warm cream `#F5E9D4` | Noir black `#0D0D0D` |
| Primary | Retro red `#C0392B` | Amber `#D4763B` |
| Accent | Teal `#1ABC9C` / Mint `#A3E4D7` | Not used |
| Headline font | **Bebas Neue** | Oswald |
| Body font | **Open Sans** | Lora |
| UI font | **Nunito** | Oswald |
| Border radius | Rounded (friendly) | Sharp 0.125rem (dramatic) |
| Tagline | "Home Theater, Upgraded." | "Open-source media, on your terms." |

**Root cause:** The implementation appears to have conflated `03-retro-film-reel-3` (Sunday Matinee) with `02-spotlight-projector-3` (Film Noir).

**Impact:** FAIL — This variant does not represent the assigned brand kit.

---

### 2. Fonts Missing — performance.md

The `fonts/` directory contains **only README.md** — the actual `.woff2` files are absent:

```
variants/03-retro-film-reel-3/fonts/README.md  ← only file present
```

Required font files (not present):
- `oswald-400.woff2`, `oswald-500.woff2`, `oswald-700.woff2`
- `lora-400.woff2`, `lora-400-italic.woff2`, `lora-600.woff2`

**Impact:** Site falls back to system fonts, losing distinctive Film Noir typography.

---

## 🟡 Major Issues (Should Address)

### 3. No Internationalization — localization.md

Zero i18n infrastructure. All visible text is hardcoded English. This is identical to Wave 2 — no improvement made between waves.

- No translation files
- No language switcher UI
- No hreflang tags for SEO
- Meta tags not localized
- Footer year hardcoded as 2026

---

### 4. PWA Icons Missing — seo.md, tester.md

`manifest.webmanifest` references non-existent PNG icons:
```json
"icons": [
  { "src": "/phlix-website/.../img/icon-192x192.png", ... },
  { "src": "/phlix-website/.../img/icon-512x512.png", ... }
]
```

Only SVG assets exist (`og.svg`, `favicon.svg`, `logo.svg`). PWA installability is broken.

---

### 5. Mobile Nav Missing Dialog Role — accessibility.md

The mobile menu is functionally a dialog but lacks `role="dialog"` and `aria-modal="true"`. Screen reader users may not understand its modal nature.

---

## 🟠 Medium Issues (Consider Fixing)

### 6. Pitch Section Has No CTA — cta-funnel.md

After the 7-benefit pitch section, users face a **dead zone** with no CTA to drive conversion. They must scroll to the next section to find a conversion opportunity.

### 7. Hero Secondary CTA Deflects Externally — cta-funnel.md

"Read the docs" routes to `detain.github.io/phlix-docs` before users have decided to download — sends high-intent traffic away.

### 8. Header Scroll Shadow Bug — usability.md

`initHeaderScroll()` sets **identical** box-shadow for both scroll states (lines 182-186):
```javascript
if (currentScroll > 100) {
  header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
} else {
  header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)'; // IDENTICAL!
}
```

### 9. Nav Toggle Missing Focus Indicator — accessibility.md

The `.nav-toggle` button has `:hover` styles but minimal `:focus` styles — keyboard users may not see which element has focus.

### 10. CSS Duplicate Custom Properties — tester.md

`base.css` defines `--color-text` and `--color-text-muted` twice (lines 22-23 and lines 29-30). Second definition takes precedence in browser cascade but creates ambiguity.

---

## 🟢 Minor Issues (Nice to Have)

- External links missing `rel="noopener noreferrer"` (content-quality.md)
- `shadow-play` animation not excluded in `prefers-reduced-motion` (responsive.md)
- Typewriter effect function exists but is never applied (usability.md)
- Footer columns not wrapped in `<section>` with aria-labels (accessibility.md)
- CSS lint warnings in base.css, theme.css, components.css (tester.md)

---

## ✅ What Works Well

- **Code architecture**: Clean separation (base.css / theme.css / components.css), semantic HTML, self-hosted fonts (no CDN)
- **Accessibility foundation**: Skip links, landmarks, ARIA, focus management, focus trap in mobile nav, reduced-motion support
- **SEO fundamentals**: Title, description, canonical, OG, Twitter Card, JSON-LD all present and correct
- **Social metadata**: Title, OG, and Twitter perfectly aligned; og.svg is thematically consistent
- **CTA design**: Excellent contrast ratio (12.5:1 AAA), high-visibility amber on noir black
- **Responsive design**: Fluid typography with `clamp()`, CSS Grid with `auto-fit minmax()`, mobile-first navigation
- **Performance practices**: IntersectionObserver for animations, passive scroll listener, `font-display: swap`, no jQuery
- **Documentation**: BUILD_LOG.md complete, fonts/README.md clear, img/PROMPTS.md thorough

---

## Priority Actions

| Priority | Action | Files |
|---------|--------|-------|
| **P0** | Fix variant identity — this is Film Noir but should be Sunday Matinee | base.css, theme.css, components.css, index.html |
| **P0** | Download and add font files to `fonts/` | fonts/ |
| **P1** | Add i18n infrastructure | index.html, new i18n/ directory |
| **P1** | Fix PWA icon manifest or generate PNG icons | manifest.webmanifest, img/ |
| **P1** | Add interstitial CTA after pitch section | index.html |
| **P2** | Add `role="dialog"` to mobile nav | main.js, index.html |
| **P2** | Fix header scroll shadow bug | main.js:182-186 |
| **P2** | Add visible focus styles to nav toggle | theme.css |
| **P3** | Remove CSS duplicate custom properties | base.css:29-30 |

---

## Comparison to Previous Waves

| Aspect | Wave 1 | Wave 2 | Wave 3 (this) |
|--------|--------|--------|--------------|
| Theme | 50s Cinema | 50s Cinema | Film Noir |
| Primary CTA contrast | 4.27:1 | N/A | **12.5:1** ✓ |
| Typography | Bebas Neue + Open Sans | Bebas Neue + Open Sans | **Oswald + Lora** ✓ |
| Atmosphere | Velvet textures | Velvet textures | **Scanline grain + amber spots** ✓ |
| i18n | None | None | None (unchanged) |

Wave 3 improves in contrast and atmospheric depth but maintains the same localization gap as previous waves.

---

*Collated: 2026-05-21*
*Reviewers: branding, seo, cta-funnel, social-metadata, content-quality, localization, performance, accessibility, usability, responsive, tester, documenter, code-review*
