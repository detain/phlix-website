# Branding Consistency Review — `01-minimalist-cinema-1`

**Reviewer:** CodeReviewer  
**Dimension:** Branding Consistency  
**Source of Truth:** `shared/data/brand-kits.json` entry `01-minimalist-cinema-1`  
**Files Reviewed:** `variants/01-minimalist-cinema-1/css/{base,components,theme}.css`

---

## Summary

The variant largely adheres to the brand kit, but has **two categories of violations**: (1) overuse of `font-weight: 800` throughout non-headline elements, conflicting with the `dont: ["Use more than 2 font weights"]` rule, and (2) several off-palette hardcoded hex values for UI backgrounds and outlines. The brand palette, headline font, body font, UI font, code font, rounded-button radii, subtle shadows, and single-column layout all pass.

---

## Findings

### ✅ PASS — Color Palette

| Token | Brand Kit Hex | CSS Variable / Value | Status |
|---|---|---|---|
| electric_blue | `#2D9CFF` | `--color-electric-blue: #2D9CFF` | ✅ |
| charcoal | `#1A1A1A` | `--color-charcoal: #1A1A1A` | ✅ |
| white | `#FFFFFF` | `--color-white: #FFF` (equivalent) | ✅ |
| slate_gray | `#2E2E2E` | `--color-slate-gray: #2E2E2E` | ✅ |
| soft_blue | `#A7D8FF` | `--color-soft-blue: #A7D8FF` | ✅ |
| neon_aqua | `#00F0FF` | `--color-neon-aqua: #00F0FF` | ✅ |

All palette colors are correctly defined as CSS custom properties and used throughout the stylesheet.

### ⚠️ WARN — Off-Palette Hardcoded Hex Values

The following values appear in the CSS but are **not present in the brand kit palette**:

| File | Line | Value | Used For |
|---|---|---|---|
| `base.css` | 60 | `#555` | `var(--color-text-muted)` |
| `base.css` | 63 | `#E0E0E0` | `--color-border` |
| `base.css` | 188 | `#00F0FF` | `:focus` outline (`--color-neon-aqua` is brand, but used here in a context not specified by the kit) |
| `components.css` | 80 | `#F3F3F3` | `code` background |
| `components.css` | 54, 59 | `#F8F8F8`, `#F0F0F0` | `.btn--secondary` hover/active backgrounds |
| `components.css` | 181, 186 | `#E8F5E9`, `#2E7D32` | `.client-card__status--stable` (green status) |
| `components.css` | 186 | `#FFF8E1`, `#F57F17` | `.client-card__status--beta` (amber status) |
| `components.css` | 203 | `#F5F5F5` | `.client-card__highlights span` background |
| `components.css` | 278 | `#FAFAFA` | `.install-card` background |
| `components.css` | 338 | `#F0F0F0` | `.pill` background |
| `components.css` | 364 | `#F8FBFF` | `.callout` background |

These are common UI greys and status colors **not listed in the brand kit**. Under the hard rule *"Do not invent colors ... outside what's listed here"*, they represent brand drift. The `text-muted: #555` and `border: #E0E0E0` are particularly visible on near-white backgrounds and should be elevated to design tokens.

### 🔴 FAIL — Font Weights: More Than 2 Weights Used

**Brand kit rule:** `dont: ["Use more than 2 font weights"]`  
**Brand kit fonts:** `headline: Montserrat ExtraBold` (800), `body: Inter Regular` (400), `ui: Roboto Medium` (500), `code: JetBrains Mono` (400)

The implied intent is: use **two weights** across the full typographic system. The kit defines ExtraBold (800) for headlines and Regular (400) for body. But several non-headline elements use `font-weight: 800`:

| File | Selector | Weight Used | Expected |
|---|---|---|---|
| `theme.css` | `h4`, `h5`, `h6` | 800 | 400 or 500 (body/UI) |
| `theme.css` | `.site-footer__col h3` | 800 | 400 or 500 |
| `theme.css` | `.site-header__nav` links | 500 (correct via `--font-ui`) | ✅ |
| `theme.css` | `.page-header__eyebrow`, `.hero__eyebrow` | 500 (correct) | ✅ |
| `components.css` | `.client-card__status` | 500 (correct via `--font-ui`) | ✅ |
| `components.css` | `.bullet-list li::before` | 800 | Should be body (400) |
| `components.css` | `.ecosystem-item__name` | 800 | Should be 400 or 500 |
| `components.css` | `.pill` | 500 (correct) | ✅ |
| `components.css` | `.section-label` | 500 (correct) | ✅ |
| `components.css` | `.faq-item__q` | 800 | Should be 400 or 500 |

Additionally, `--font-headline` is defined as `'Montserrat', 'Arial Black', sans-serif` (base.css line 66), but the brand kit specifies only **Montserrat ExtraBold**. The `'Arial Black'` fallback is a very heavy weight that visually conflicts with the deliberate single-weight headlines approach.

**Suggested fix:**
1. Remove `font-weight: 800` from `h4`, `h5`, `h6`, `.site-footer__col h3`, `.ecosystem-item__name`, `.faq-item__q` — use `--font-body` with `font-weight: 400` or `--font-ui` with `font-weight: 500` instead.
2. Remove `'Arial Black'` from the `--font-headline` fallback stack — use only `'Montserrat', sans-serif`.
3. Apply only 2 weights system-wide: 800 for true display headlines (`h1`–`h3`, `.hero__headline`, `.client-card__name`), and 400/500 for everything else.

---

### ✅ PASS — Fonts

| Role | Brand Kit | CSS Variable | Status |
|---|---|---|---|
| Headline | Montserrat ExtraBold | `--font-headline: 'Montserrat', ...` | ✅ (weight issue above) |
| Body | Inter Regular | `--font-body: 'Inter', ...` | ✅ |
| UI | Roboto Medium | `--font-ui: 'Roboto', ...` | ✅ |
| Code | JetBrains Mono | `--font-code: 'JetBrains Mono', ...` | ✅ |

---

### ✅ PASS — UI Style / "Do" List

| Brand Kit "Do" | Implementation | Status |
|---|---|---|
| Keep spacing enormous | `--space-8: 8rem`, `--space-9: 12rem`, single-column layout | ✅ |
| Use blue only for key CTAs | `.btn--primary` is the sole blue CTA; nav underlines and accents are controlled | ✅ |
| Let content breathe | Generous `line-height: 1.7+`, `max-width: 65ch`, large margins | ✅ |
| Use the X symbol consistently | *(No X-symbol elements in CSS — this is a template/HTML concern)* | N/A |
| Rounded buttons | `border-radius: var(--radius-md)` on `.btn` | ✅ |
| Subtle shadows | `--shadow-sm/md/lg` with low-opacity blacks | ✅ |
| Single-column layout | `.layout-single { grid-template-columns: 1fr }` | ✅ |
| Header motif: thin blue underline animation on hover | `.site-header__nav a::after { background: var(--color-electric-blue); ... }` | ✅ |

---

### ✅ PASS — UI Style / "Don't" List

| Brand Kit "Don't" | Implementation | Status |
|---|---|---|
| Add gradients to wordmark | No gradient declarations found | ✅ |
| Use serif fonts | All fonts are sans-serif (Montserrat, Inter, Roboto, JetBrains Mono) | ✅ |
| Overcrowd any section | Single-column layout, `gap: var(--space-4)+`, large padding | ✅ |
| Use more than 2 font weights | ❌ **FAIL** — see above | 🔴 |

---

## Severity Summary

| Severity | Count | Issue |
|---|---|---|
| 🔴 **Fail** | 1 | Font weights: more than 2 weights used throughout non-headline elements |
| ⚠️ **Warn** | ~12 | Off-palette hardcoded hex values for UI backgrounds, borders, muted text, status badges |

---

## Verdict

**BRANDING CONSISTENCY: CONDITIONAL PASS**

The brand kit's color palette, headline/body/UI/code font families, button radii, shadows, spacing scale, and header motif are all correctly implemented. The primary blocking issue is the **font-weight overuse** — at least 6 non-headline selectors use `font-weight: 800` when the `dont: ["Use more than 2 font weights"]` rule restricts the system to 2 weights. Secondary concern is the cluster of **off-palette grey/white values** used for UI chrome (borders, muted text, status badges, card backgrounds) that should be promoted to design tokens defined in the kit itself.