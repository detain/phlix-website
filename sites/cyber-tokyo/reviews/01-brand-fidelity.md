# Dimension 1: Brand Fidelity & Spirit
**Does EVERY color, font, shape, motion, icon, and voice element trace to the kit?**

---

## Score: 72 / 100

## Verdict: CONDITIONAL (≥80, no ❌ but has issues)

---

## Findings

### ✅ Brand Colors — Correct
- Tokyo Night (`#050308`) used as universal background — `base.css:56` and throughout
- Neon Sakura (`#F0A` = `#FF00AA`) used as primary CTA — `base.css:53`
- Circuit Green (`#00FF41`) used as secondary — `base.css:54`
- Screen White (`#F0EEF8`) for text — `base.css:59`
- No off-palette colors found in component CSS (all values via CSS custom properties)

### ✅ Typography — Correct
- Space Grotesk for headlines — `base.css:95`
- Bebas Neue for display — `base.css:96`
- IBM Plex Sans for body/UI — `base.css:97-98`
- IBM Plex Mono for mono — `base.css:99`
- Font roles match kit spec

### ⚠️ Font CDN Violation (Performance/Brand)
- **File:** `base.css:7`
- **Issue:** Google Fonts `@import` used instead of self-hosted WOFF2 — violates new_site.md §1 "No CDN dependencies" and BUILD_LOG.md already flags this
- ```css
@import url('https://fonts.googleapis.com/css2?family=...');
```
- new_site.md §13 (Performance budgets) requires "Fonts self-hosted WOFF2 with font-display: swap"
- **Severity:** Major — spec regression, not new regression but documented and unresolved
- **Confidence:** 95%

### ⚠️ Kanji Font Incomplete
- **File:** `base.css:7`
- **Issue:** Noto Serif JP is NOT in the `@import` — only Noto Sans JP is included. Kit typography_rules state: "Kanji/katakana decorative text must use Noto Serif JP or Noto Sans JP; never fake or mismatched glyphs."
- The `.hero-kanji` element uses `'Noto Serif JP', serif` as font-family, but this font is never loaded
- **Severity:** Minor — decorative kanji renders via system fallback; readability not broken
- **Confidence:** 90%

### ❌ Sharp Corner Radius Violated
- **File:** `theme.css:294` (`.feature-card`), `theme.css:508` (`.client-card`), `theme.css:622` (`.download-card`)
- **Issue:** Cards use `border-radius: var(--radius-md)` (= 4px). Brand kit shape_language states "Sharp rectangles — the geometry of vending machines and signage panels" and corner_radius.small = "2px" for all standard UI. Pill only for tags.
- **Also:** `components.css:46` (nav toggle), `components.css:247` (buttons) use `border-radius: var(--radius-sm)` = 2px — which is correct. But cards break the sharp-corner rule.
- **Severity:** Minor — 4px is still quite sharp; the spirit of the brand (no soft/bubbly corners) is broadly maintained
- **Confidence:** 85%

### ❌ Hero Animation Duration Too Slow
- **Files:** `theme.css:178` (`glitch-enter 400ms`), `theme.css:187` (`glitch-enter 500ms`), `theme.css:199` (`glitch-enter 500ms`), `theme.css:200` (`glitch-enter 500ms`)
- **Issue:** Brand kit animation_speed = "fast" and design_principles: "Motion should feel like a bullet train: fast, precise, purposeful." Brand kit transitions = "80–200ms" but hero animations run 400–500ms
- The reduced-motion query collapses to 0.01ms which is correct, but the base animation speed is wrong
- **Severity:** Minor — the site still feels fast; the 400ms animations only run once on load and are preceded by 100-300ms delays creating staggered timing. Not aggressive/damaging.
- **Confidence:** 80%

### ✅ Shapes — Mostly Correct
- Sharp-cornered buttons (`--radius-sm: 2px`) — `components.css:247`
- Nav toggle uses `var(--radius-sm)` — `components.css:46`
- Pill only for scrollbar thumb and switches — consistent with kit

### ✅ Icons — Correct
- All feature icons use `stroke-width="1.5"` matching kit's "1.5px–2px stroke weight" — `index.html:119`, etc.
- Sharp outlined style, no rounded joins visible

### ✅ Voice — Clean
- No `avoid_words` found: no "cozy", "warm", "quiet", "restful", "mellow", "noir", "detective", "synergy", "leverage", "utilize", "robust", "awesome", "amazing" anywhere in copy
- Kit vocabulary words used appropriately (signal, screen, city, data, night, neon)

### ✅ Signature Elements Present
- Vertical kanji decorative text (`.hero-kanji`) — `theme.css:210-224`
- Scan-line overlay on hero — `theme.css:153-167`
- Neon Sakura halos (text-shadow on h1, box-shadow on cards) — present throughout

---

## Summary

The site is broadly brand-faithful: correct color palette, correct typography roles, correct icon style, clean voice with no avoid_words, signature elements (kanji, scan-lines, neon halos) present. The primary defect is the Google Fonts CDN dependency (`@import`) which violates the new_site.md "No CDN dependencies" rule — this is already documented in BUILD_LOG.md as a known follow-up. Secondary issues: Noto Serif JP not loaded (minor, system fallback), card border-radius at 4px instead of 2px (minor), hero animations at 400-500ms instead of 80-200ms (minor).
