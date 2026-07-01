# Brand Fidelity & Spirit Review — Marina Breeze

**Dimension:** Brand fidelity & spirit
**Score:** 82/100
**Severity:** ⚠️

---

## Findings

### ✅ PASS — Color System
All CSS custom properties are byte-for-byte matches with the kit's `design_tokens.color`:
`base.css:78-93`

| Token | Site value | Kit value | Status |
|-------|-----------|-----------|--------|
| `--color-primary` | `#1B3A5C` | `#1B3A5C` | ✅ |
| `--color-secondary` | `#5BA3A0` | `#5BA3A0` | ✅ |
| `--color-tertiary` | `#E07A5F` | `#E07A5F` | ✅ |
| `--color-bg` | `#F5F1E8` | `#F5F1E8` | ✅ |
| `--color-surface` | `#FDFAF4` | `#FDFAF4` | ✅ |
| `--color-surface-alt` | `#EDE3CC` | `#EDE3CC` | ✅ |
| `--color-text` | `#1A2535` | `#1A2535` | ✅ |
| `--color-border` | `#2E4E6E` | `#2E4E6E` | ✅ |
| `--color-shadow` | `rgba(27,58,92,0.18)` | `rgba(27,58,92,0.18)` | ✅ |
| `--color-overlay` | `rgba(13,31,51,0.65)` | `rgba(13,31,51,0.65)` | ✅ |

### ✅ PASS — Spacing Scale
All 9 spacing tokens match the kit's `spacing_scale` exactly: `base.css:101-109`
`4/8/12/16/24/32/48/64/96px` ✅

### ✅ PASS — Corner Radius
`base.css:112-116` — All 5 radius tokens match kit exactly: `4px/10px/18px/28px/999px` ✅

### ✅ PASS — Shadow System
`base.css:127-129` — All 3 shadow tokens match kit's `shadows` block exactly ✅

### ✅ PASS — Typography Roles
`base.css:119-124` — Font family stacks correctly mapped:
- Headline/Display: Playfair Display ✅
- Body: Lato ✅
- UI: Inter ✅
- Mono: JetBrains Mono ✅

`theme.css:9-15` — h1 uses Playfair Display 700 with `-0.01em` tracking ✅
`theme.css:182-187` — Base h1–h6 uses `--font-headline` (Playfair Display) ✅

### ✅ PASS — Gradients
`base.css:96-98` — All 3 kit gradients correctly implemented:
- Ocean-to-Sky: `linear-gradient(160deg, #1B3A5C, #5BA3A0)` ✅
- Lighthouse Sweep: `radial-gradient(ellipse at 20% 10%, rgba(253,250,244,0.9), rgba(245,241,232,0.0))` ✅
- Sunset Harbour: `linear-gradient(135deg, #DDA84A, #E07A5F)` ✅

### ✅ PASS — Button Styles
`components.css:204-209` — Primary CTA is `#1B3A5C` bg / `#F5F1E8` text (Deep Water Navy) ✅
`components.css:218-223` — Secondary CTA is `#5BA3A0` bg / `#F5F1E8` text (Sea Glass Teal) ✅
`components.css:231-241` — Ghost button is transparent bg / navy outline ✅
Kit rule: "Primary CTA is always Deep Water Navy (#1B3A5C)" ✅

### ✅ PASS — Card System
`components.css:316-329` — Feature cards use `border-radius: var(--radius-lg)` (18px), `border: 1.5px solid var(--color-border)`, `background: var(--color-surface)` ✅
Matches kit's `cards` spec: "18px radius, tide-line border, bright sail surface" ✅

### ✅ PASS — Microinteractions
`components.css:326-328` — Card hover: `translateY(-3px)` + `box-shadow: var(--shadow-md)` — matches kit's "Cards lift 3px with navy-tinted shadow" hover spec ✅
`components.css:200-202` — Button press: `scale(0.96)` — matches kit's "Gentle compress to 0.96" ✅

### ✅ PASS — Brand Voice in Copy
Home hero eyebrow uses `hero.eyebrow` ("Self-hosted media server") ✅
Tagline "Set Sail for Tonight." used as page title ✅
"Ready to set sail?" as CTA banner heading ✅
"Your harbor for every story." used in CTA banners ✅
Nautical metaphors ("chart a course", "set sail", "cast off") appear in plugins/about copy ✅
Kit voice: Breezy, Warm, Quietly poetic, Inviting — consistently applied ✅

### ❌ FAIL — Font CDN Dependency
**File:** `base.css:9-71`

All `@font-face` declarations use `src: url('https://fonts.gstatic.com/...')` — Google Fonts CDN WOFF2 URLs.

`new_site.md:84-87` explicitly states:
> "No CDN dependencies in the deployed page (no Google Fonts `<link>` to `fonts.googleapis.com`, no script CDNs). **Self-host fonts** as WOFF2 and declare them with `@font-face` + `font-display: swap`."

The BUILD_LOG.md:31 acknowledges this as an "Intentional Deviation" but the spec provides zero tolerance for reintroducing CDN font links. `css/fonts/` directory is empty/absent.

### ⚠️ WARNING — Heading Hierarchy on features.html
**File:** `features.html:66-69`

```html
<section class="content-section" aria-labelledby="features-detail-heading">
  <div class="container">
    <h2 id="features-detail-heading" class="sr-only">Feature details</h2>
```

The h2 is hidden with `.sr-only`, then each feature article uses `<h2>` again (`features.html:80,91,102,112,123,139,150,160`). This creates **8 sibling h2 elements with no parent h1** on the features page. The page has `h1` = "Features" in the page-header, but the feature-detail articles each have their own h2, which is semantically incorrect — they should be h2 under the h1, not all be sibling h2s with an sr-only h2 sibling.

**Expected structure:** `<h1>Features</h1>` → `<h2>Library that organizes itself</h2>` etc.
**Actual structure:** `<h1>Features</h1>` → `<h2 class="sr-only">Feature details</h2>` → 8× `<h2>` siblings

### ⚠️ WARNING — Heading Hierarchy on clients.html
**File:** `clients.html:61-63`

Same pattern: `<h2 id="clients-heading" class="sr-only">Available clients</h2>` followed by client cards each using `<h2>`. The h2 client names (Roku, Samsung Tizen, Windows) are at the same heading level as an sr-only h2 with a different id, creating a confusing heading structure.

### ⚠️ WARNING — Ecosystem Item Inline Styles
**File:** `download.html:145` and `docs.html:97`

```html
<div style="display:grid;gap:var(--space-4);max-width:720px;margin-top:var(--space-6)">
```

Inline `style` attribute used for layout. While `display:grid` and `gap` are correct CSS, this bypasses the token system. Kit spacing variable is used but the grid container itself should be a proper CSS class in components.css.

### ⚠️ WARNING — Missing Animated Hero Artwork
The site has no illustrated hero imagery. `index.html:80-90` uses only CSS gradient backgrounds for the hero section. The kit's `page_generation_rules` states: "Hero sections always contain a wide coastal illustration with an open horizon." The BUILD_LOG acknowledges this as a follow-up. While CSS/SVG-only artwork is preferred per new_site.md §8, the hero feels empty without any coastal illustration.

---

## Summary

**Score: 82/100 — ⚠️ WARNING**

The site is broadly brand-faithful: every color, spacing, radius, shadow, gradient, and font token is correct. Button styles, card styling, and microinteractions all match the kit precisely. Brand voice is consistently applied with nautical metaphors.

**Two issues prevent a passing score:**

1. **Font CDN dependency** (❌) — Google Fonts URLs in `@font-face` violate the explicit self-hosting requirement. This is a hard spec violation, not a judgment call.

2. **Heading hierarchy** (⚠️) — features.html and clients.html have sr-only h2 siblings before properly-structured feature/client h2s. These are semantic/accessibility issues that affect screen reader navigation.

The brand kit's coastal nautical spirit is genuinely present — the color palette is perfect, the typography hierarchy is correct, the microinteractions match the "wave-swell" hover spec, and the copywriting uses the right nautical metaphors. With fonts self-hosted and heading structure corrected, this would score 95+.
