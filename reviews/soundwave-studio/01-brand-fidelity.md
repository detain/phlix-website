# DIMENSION 1: Brand fidelity & spirit

## Score: 82/100
## Severity: ⚠️ (minor drift — improved from 72)
## Round 2 Status: Improved — CDN font critical removed, logo fixed, 2 minors remain

---

## Findings

### ✅ FIXED — Google Fonts CDN (critical blocker resolved)

**Previously:** `base.css:8` had `@import url('https://fonts.googleapis.com/css2?family=...')` and all 8 HTML files had `<link rel="preconnect">` + `<link rel="stylesheet">` for Google Fonts.

**Now:** All Google Fonts links removed from HTML. `base.css:6-11` uses system font fallback stacks:
- Rajdhani → Barlow Condensed → system sans-serif
- Share Tech Mono → Courier New → system monospace
- Inter → Helvetica Neue → system sans-serif

Per `new_site.md` §13, self-hosted WOFF2 is preferred, but system fallbacks are spec-compliant and remove the CDN dependency entirely. The critical spec regression is resolved.

---

### ✅ FIXED — Logo wordmark: "Soundwave Studio" → "Phlix"

**Previously:** `<span class="nav-logo-name">Soundwave Studio</span>` on all 8 pages.

**Now:** `<span class="nav-logo-name">Phlix</span>` on all 8 pages. The waveform SVG glyph is correct and unchanged.

---

### ✅ FIXED — Mobile nav breakpoint: 1024px → 768px

**Previously:** `components.css:176` — `.nav-toggle` displayed at `max-width: 1024px`.

**Now:** `components.css:176` — `.nav-toggle` displayed at `max-width: 768px`. Correct per the brand kit's `responsive_behavior.mobile` guidance (44px touch targets, icon rail).

---

### ⚠️ MINOR — `og.svg` wordmark still says "Soundwave Studio"

**File:** `img/og.svg:46`

```svg
<text ...>Soundwave Studio</text>
```

The nav logo was fixed to "Phlix" but `og.svg` (social share image, 1200×630) still shows "Soundwave Studio" as its main wordmark. This creates brand inconsistency between the nav (Phlix) and the social card (Soundwave Studio).

Also: `<title>Soundwave Studio favicon</title>` in favicon.svg should be "Phlix favicon".

**Recommended fix:** Update `og.svg` wordmark to "Phlix" and fix `aria-label`/`title`/`desc` accordingly. Update `favicon.svg` title to "Phlix favicon".

---

### ⚠️ MINOR — Nav logo tagline is "Soundwave Studio"

**File:** All 8 HTML files: `<span class="nav-logo-tagline">Soundwave Studio</span>`

This was noted in Round 1 as confusing — the brand kit name is being used as a product sub-tagline. Options: remove entirely, replace with "Phlix", or use the kit's `tagline_primary: "Every Session. Perfectly Captured."` (though that may be too long for a small sub-label).

**Recommended fix:** Remove the `.nav-logo-tagline` element entirely.

---

### ✅ CSS Variables (design_tokens) — CORRECT

All CSS custom properties in `base.css:17-71` correctly trace to the kit's `design_tokens`:
- Color tokens match exactly (primary #00E676, secondary #FFB300, tertiary #7C4DFF, bg #141418, etc.)
- Spacing scale matches (2, 4, 8, 12, 16, 24, 32, 48, 64)
- Radius scale matches (2, 4, 6, 8, 999px)
- Font families match (Rajdhani, Share Tech Mono, Inter)
- Shadows are cool/neutral (no warm tint)

---

### ✅ Typography — CORRECT

- Headlines use Rajdhani at correct weights (600, 700)
- Display/numbers use Share Tech Mono (system fallback Courier New)
- Body uses Inter at 400/500 (system fallback Helvetica Neue)
- ALL CAPS applied to h1-h3 and UI labels per kit's `typography_rules`
- Letter-spacing per kit spec (headlines 0.04em, display 0.06em, UI 0.05em)
- Kit's rule "Never use italic" is honored — no italic type found

**Note on font loading:** Google Fonts CDN is gone. System fonts are used as fallbacks. The visual character of Rajdhani (condensed, technical) is reasonably approximated by Barlow Condensed; Share Tech Mono by Courier New; Inter by Helvetica Neue. This is an acceptable trade-off for removing CDN dependencies.

---

### ✅ Buttons — CORRECT

All button variants match the kit's `buttons` spec exactly:
- Primary: `bg: #00E676`, `text: #141418`, `radius: 2px` ✅
- Secondary: transparent, green border, green text ✅
- Danger: `bg: #D50000`, `text: #E8EAF0`, `radius: 2px` ✅
- Ghost: transparent, border-color #2D2D3A ✅

---

### ✅ Cards — CORRECT

Kit `cards` spec is correctly implemented:
- Border: 1px solid #2D2D3A
- Border-radius: 4px
- Background: #1E1E26
- Hover state adds waveform-green left border accent ✅

---

### ✅ Colors — CORRECT

All color usage traces to kit's `color_rules`:
- Backgrounds are dark (studio charcoal #141418) ✅
- Waveform green is primary signal color ✅
- VU amber used for ratings/status ✅
- Signal red used only for errors/destructive states ✅
- No white/light backgrounds ✅

---

### ✅ Motion — CORRECT

- `cubic-bezier(0.4, 0, 0.2, 1)` used for transitions ✅
- Fast transitions (150ms base) ✅
- VU pulse animation at 1.2s ✅
- `prefers-reduced-motion` properly honored in CSS (`base.css:251-257`) and JS (`main.js:122-124`, `155-160`, `188`) ✅

---

### ✅ Icon style — CORRECT

Feature icons are stroke-based, 1.5px stroke weight, sharp corners. Single-color in waveform green on dark backgrounds. Matches kit's `icon_rules`.

---

### ✅ Voice/copywriting — CORRECT

No words from `avoid_words[]` found anywhere:
- No "awesome", "amazing", "seamless", "leverage", "synergy", "disrupt", "robust", "cutting-edge", "journey", "ecosystem", "utilize"
- Copy is technical, direct, understated — matches kit voice: "Technical", "Direct", "Quietly passionate", "Authoritative without arrogance"
- Short declarative sentences used throughout
- Studio vocabulary present (session, track, level, signal)

---

### ✅ Shape language — CORRECT

- Cards and panels use sharp corners (radius-md: 4px) per kit's `corner_radius`
- No rounded/soft shapes anywhere
- Diamond/waveform patterns in SVG logo align with kit's geometric precision

---

### ✅ Brand opposites avoided

Checking against `brand_opposites[]`:
- "Not soft or pastel" — all colors are saturated/technical ✅
- "Not rounded and friendly" — sharp corners throughout ✅
- "Not cheerful or playful" — serious technical tone ✅
- "Not minimalist-white or clinical-bright" — dark backgrounds always ✅
- "Not neon cyberpunk" — this is analog precision, not digital rave ✅

---

## Summary

Brand fidelity improved significantly (72 → 82). The critical CDN font blocker is resolved, the logo wordmark is correct, and the mobile breakpoint is fixed. The remaining issues are minor: `og.svg` still shows "Soundwave Studio" as its wordmark (inconsistent with the now-correct nav logo), and the nav tagline is confusing. All other brand elements — colors, typography, buttons, cards, motion, voice, shapes — are correctly implemented and feel like the Soundwave Studio brand.

**Recommendation:** Fix `og.svg` wordmark and remove/fix the nav tagline. Both are small changes that will eliminate the last brand consistency issues.
