# Brand Fidelity & Spirit — Abstract Canvas Site Review

**Dimension:** Brand Fidelity & Spirit
**Score: 78 / 100**

---

## Findings

### ✅ PASS — CSS Variables (design_tokens) Match Kit Exactly

All `--color-*`, `--space-*`, `--radius-*`, `--font-*`, and `--shadow-*` variables in `css/base.css:23–98` are an exact match to the kit's `design_tokens` object.

| Token group | Status |
|---|---|
| Color tokens (14 vars) | ✅ Exact match |
| Spacing scale (9 steps) | ✅ Exact match |
| Radius scale (5 values) | ✅ Exact match |
| Font families (5 vars) | ✅ Exact match |
| Shadow tokens (6 values) | ✅ Exact match |

---

### ✅ PASS — Background Is Gallery Linen

`css/base.css:110` sets `background-color: var(--color-bg)` which is `#F0EDE4`. The hero uses the same. Background is never cold white anywhere in the site.

---

### ✅ PASS — Carbon Black Primary CTAs

`.btn-primary` in `css/components.css:158–169` correctly uses `#1A1A1A` as background. Primary CTAs across all pages use `.btn-primary` correctly.

---

### ✅ PASS — Ultramarine Used for Structural/Focus Elements

- Focus ring (`css/base.css:198–202`): `--color-focus: #0055AA` ✅
- Focus ring implementation: 2px outline + 4px outer halo ✅
- `components.css:463–466`: `.media-badge.hdr` uses `--color-tertiary` (ultramarine) for structural quality badges ✅
- Ultramarine is NOT used for primary actions ✅

---

### ⚠️ WARN — Cadmium Red Used on Multiple Elements (Not "Sparingly")

The kit states: *"Cadmium red is precious — reserve it for the single most important action."*

Multiple cadmium-red elements found:

1. **`.pitch-item` (css/theme.css:263)** — every pitch bullet has a 3px left border in `--color-secondary`. Seven pitch items × cadmium-red left border = red scatters across the entire "Why Phlix?" section.

2. **`.plugin-model` (css/theme.css:590)** — 3px left cadmium-red border on the plugin model block on `plugins.html`.

3. **`.pitch-item-icon` (css/theme.css:270)** — every pitch icon uses `--color-secondary`.

4. **`.feature-detail .feature-icon` (css/theme.css:426)** — all feature icons on `features.html` use cadmium red.

5. **`.hub-node-icon` (css/theme.css:645)** — all hub node icons use cadmium red.

**Verdict:** Cadmium red is used as a repeating accent across feature icons, section markers, and pitch bullets — not as "the single most important action." The kit's `do_dont.colors.do[1]` and `do_dont.colors.dont[1]` ("Scatter cadmium red across multiple elements indiscriminately") are both applicable. ⚠️

---

### ❌ FAIL — Primary CTA Button Uses Wrong Class

On **every page**, the primary CTA button (above-the-fold "Get Phlix") uses `.btn.btn-primary`.

But **home page (`index.html:105`)**: the "Get Phlix" button correctly uses `.btn.btn-primary`.

However, on `features.html:149`, `clients.html:148`, `plugins.html:116`, `about.html:148` — the primary CTA also uses `.btn.btn-primary` ✅.

The issue is the **secondary CTA** on the home page (`index.html:106`) correctly uses `.btn.btn-secondary` with cadmium red. The primary CTA is carbon black ✅.

**Re-examining — actually passes.** Primary CTAs are `.btn-primary` (carbon black) ✅. Secondary CTAs are `.btn-secondary` (cadmium red outline) ✅. Cadmium red is reserved for the secondary action.

---

### ⚠️ WARN — Logo SVG Uses Georgia/Times New Roman, Not Cormorant Garamond

`img/logo.svg:17–22` uses `font-family="Georgia, 'Times New Roman', serif"` instead of the kit's specified `'Cormorant Garamond'`.

The kit's `logo_rules.shape` states: *"Wordmark in Cormorant Garamond or Bebas Neue"*.

Using Georgia as a fallback means the logo does not display in the brand's primary typeface. This is a notable brand fidelity gap.

---

### ⚠️ WARN — `accent-color` Checkbox Overrides Brand

`css/components.css:439` sets `accent-color: var(--color-primary)` on checkboxes. However, `accent-color` is a browser-native property that tints the checkbox's checked state with the brand color — this is correct usage and does not directly violate the kit's border rules. Minor concern only.

---

### ✅ PASS — Transition Speeds Within 250–450ms

- `--transition-base: 250ms ease-in-out` (base.css:95) ✅
- `--transition-slow: 400ms ease-in-out` (base.css:96) ✅
- Animation duration: `450ms` for `.animate-reveal` (theme.css:735) ✅
- No spring/bounce/elastic easing found ✅

---

### ✅ PASS — `prefers-reduced-motion` Honored

`css/base.css:250–256` and `js/main.js:68–93` correctly gate animations behind `prefers-reduced-motion` check. ✅

---

### ✅ PASS — Brand Opposites Not Present

No evidence of: cold sterile clinical aesthetic, neon/digital colors, corporate/utilitarian tone, dark brooding backgrounds, rushed frenetic motion. The site maintains warm gallery-linen warmth throughout.

---

### ✅ PASS — Avoid Words Not Used

Scanned all HTML pages — no instances of "binge", "content", "consume", "algorithm", "awesome", "amazing", "exciting", "leverage", "synergy", "utilize", "robust", "seamless", or "game-changing."

---

### ✅ PASS — Paint-Stroke Divider Signature Element

`.divider-brushstroke` in `css/components.css:609–621` uses a gradient mimicking a gestural brushstroke sweep. ✅

---

### ✅ PASS — Color Field Blocks (Rothko-Inspired)

`.hero-accent-block` in `css/theme.css:209–237` implements a Rothko-inspired floating rectangular color-field with cadmium red + ultramarine gradients. ✅

---

### ⚠️ WARN — `.btn-primary` Hover Uses Non-Variable Hardcoded Color

`css/components.css:165` uses `#2a2a2a` (hardcoded, not a CSS variable) for the primary button hover state. Should use `var(--color-primary)` or `color-mix()` for brand consistency.

---

### ⚠️ WARN — `.body-small` / `.ui-small` Use Low-Contrast Raw Umber

`css/theme.css:59–64` sets `.body-small` at 0.875rem (≈14px) in `--color-neutral` (#8A8070) on `--color-bg` (#F0EDE4). Raw Umber on Gallery Linen contrast ratio is approximately **4.3:1** — this passes AA for normal text (≥4.5:1) at this size? Actually at 14px, the AA requirement is 4.5:1, so 4.3:1 is a borderline fail for body text.

The kit itself warns: *"Raw Umber (#8A8070) on Gallery Linen: check individually — may require larger text."*

---

## Summary

The Abstract Canvas site achieves **strong brand fidelity** in its CSS token system, color palette application, typography choices, motion design, and texture/branding elements. The design_tokens are an exact match to the kit. The gallery-linen background, carbon-black primary CTAs, and warm color palette are consistently applied.

**Critical issues:**
1. **Cadmium red overused** — appears on every pitch icon, every pitch bullet's left border, every feature icon, and every hub node icon. The kit's "single most important action" rule is not honored.
2. **Logo uses Georgia instead of Cormorant Garamond** — the wordmark does not display in the brand's primary typeface.
3. **`.body-small` low contrast** — raw umber at small sizes approaches WCAG failure.

**Score: 78/100** — Brand identity is clearly present and mostly well-executed, but cadmium red proliferation and the logo typeface gap are meaningful deviations from the "precious accent" principle.
