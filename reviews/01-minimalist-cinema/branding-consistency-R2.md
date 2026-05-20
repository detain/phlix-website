# Branding Consistency Review — Round 2

**Variant:** `01-minimalist-cinema`
**Reviewer:** Dimension Reviewer
**Date:** 2026-05-20
**Round:** 2 (re-confirmation of Round 1 score)
**Previous Score:** 92/100

---

## Score: 92/100 — PASS

Branding consistency is well-maintained. All brand kit tokens are properly implemented and consistently applied across the variant.

---

## Rubric Checklist

### Colors from Brand Kit

| Token | Brand Kit Value | Implementation | Status |
|-------|----------------|----------------|--------|
| Primary | `#2D9CFF` Electric Blue | `--color-electric-blue: #2D9CFF` | ✅ Pass |
| Text | `#1A1A1A` Charcoal | `--color-charcoal: #1A1A1A` | ✅ Pass |
| Background | `#FFFFFF` White | `--color-white: #FFF` | ✅ Pass |
| Accent | `#00F0FF` Neon Aqua | `--color-neon-aqua: #00F0FF` | ✅ Pass |
| Secondary | `#2E2E2E` Slate Gray | `--color-slate-gray: #2E2E2E` | ✅ Pass |
| Secondary | `#A7D8FF` Soft Blue | `--color-soft-blue: #A7D8FF` | ✅ Pass |

**Evidence:**
- `css/base.css:6-13` defines all brand colors as CSS custom properties
- `css/base.css:16-23` creates semantic aliases (`--color-primary`, `--color-accent`, etc.) that reference brand tokens
- All HTML pages reference these CSS variables exclusively (no hardcoded colors in markup)
- OG image (`img/og.svg`) uses `#1A1A1A` background, `#2D9CFF` accents, `#A7D8FF` soft blue tagline

---

### Fonts from Brand Kit

| Usage | Brand Kit | Implementation | Status |
|-------|-----------|----------------|--------|
| Headlines | Montserrat ExtraBold (800) | `--font-headline: 'Montserrat'` with `font-weight: 800` | ✅ Pass |
| Body | Inter Regular (400) | `--font-body: 'Inter'` with `font-weight: 400` | ✅ Pass |
| UI | Roboto Medium (500) | `--font-ui: 'Roboto'` with `font-weight: 500` | ✅ Pass |
| Code | JetBrains Mono Regular (400) | `--font-code: 'JetBrains Mono'` with `font-weight: 400` | ✅ Pass |

**Evidence:**
- `css/theme.css:11-41` defines `@font-face` for all four fonts at correct weights
- `css/base.css:26-29` maps font families to semantic CSS variables
- `css/theme.css:84-89` headlines use `--font-headline` (Montserrat) with `font-weight: 800` ✅
- `css/base.css:79` body uses `--font-body` (Inter) ✅
- Self-hosted WOFF2 fonts with Google Fonts CDN fallback ✅

---

### Voice from Brand Kit

**Brand Kit Voice:** "Direct, Clear, Helpful, Slightly playful but professional"

| Page | Sample Copy | Voice Assessment |
|------|-------------|------------------|
| Hero (index.html:91) | "Your media. Your library. Your Phlix." | ✅ Direct, clear |
| Pitch (index.html:108) | "Real-time SyncPlay with NTP-style time sync so movie night actually stays in sync" | ✅ Clear + slightly playful |
| Feature (index.html:165) | "a guide that doesn't make you click through menus" | ✅ Playful but professional |
| FAQ (about.html:98) | "Anything FFmpeg can read. Direct play when the client supports it" | ✅ Direct, helpful |
| Footer tagline | "Open-source media, on your terms." | ✅ Direct, clear |

**Evidence:**
- All CTAs are action-oriented ("Get Phlix", "Download Now", "Read the docs") — no generic "Submit" buttons
- Technical descriptions balance detail with accessibility ("so movie night actually stays in sync")
- Tone remains consistent across pages — no shift from professional to casual
- No marketing superlatives or hype language ("revolutionary", "best-in-class")

---

### Icon Style from Brand Kit

**Brand Kit Icon Style:** "Film-strip Motif, Flat design, no gradients, high contrast"

| Element | Brand Kit Requirement | Implementation | Status |
|---------|----------------------|----------------|--------|
| Logo | Film-strip X with sprocket holes + play button triangle | `img/logo.svg` — two diagonal bars, 6 sprocket holes, white play-button triangle | ✅ Pass |
| Favicon | Film-strip X motif | `img/favicon.svg` — simplified X with play button | ✅ Pass |
| SVG Icons | Consistent stroke style | All icons use `stroke="currentColor"`, `stroke-width="1.5-2"`, `fill="none"` | ✅ Pass |
| OG Image | Film-strip decorative elements | `img/og.svg` — sprocket holes on charcoal background | ✅ Pass |

**Evidence:**
- `img/logo.svg:10-28` — Film-strip X shape with sprocket holes, flat `#2D9CFF` fill, no gradients
- `img/favicon.svg` — 32×32 simplified film-strip X on `#2D9CFF` background
- All inline SVG icons use consistent feather/lucide-style stroke icons (see `index.html:124-189`)
- No icon uses fills except where brand-appropriate (feature-icon uses soft-blue background)

---

### Do/Don't List Compliance

#### ✅ Do List Compliance

| Do | Evidence |
|----|----------|
| Keep spacing wide | `css/base.css:32-39` — `--space-4xl: 6rem` for sections, `--space-xl: 2rem` gaps |
| Use blue sparingly | Electric blue only on CTAs, links, hover underlines, icon accents — not overwhelming |
| X symbol consistent | Logo, favicon, OG image all use film-strip X with sprocket holes and play button |

#### ✅ Don't List Compliance

| Don't | Evidence |
|--------|----------|
| Gradients on wordmark | All SVG assets use flat fills only — no `<linearGradient>` or `<radialGradient>` |
| Serif fonts | Montserrat (sans-serif), Inter (sans-serif), Roboto (sans-serif), JetBrains Mono (monospace) |
| Overcrowded layout | Container max-width 1200px, generous padding, max-width 65ch on paragraphs |

---

## ⚠️ Concerns

### Concern 1: OG Image Uses Roboto (Not Montserrat) for Subtext
**Location:** `img/og.svg:68`
```svg
<text x="600" y="450" font-family="Roboto, Arial, sans-serif" font-weight="500" font-size="20" ...>
```
**Detail:** The "Self-hosted media server" subtext uses Roboto instead of Inter (the brand body font). This is visually minor since Roboto is part of the brand font set and the contrast is low against the dark background.
**Severity:** Minor — Roboto is still in the brand kit, just not the intended body font for this context
**Recommended Fix:** Change to `font-family="Inter, Arial, sans-serif"` for consistency with body copy

---

## ❌ Failures

**None identified.**

All brand kit colors, fonts, voice, icon styles, and do/don't requirements are properly implemented and consistently applied.

---

## Evidence Summary

| Category | Files Verified | Status |
|----------|----------------|--------|
| CSS Colors | `css/base.css`, `css/theme.css`, `css/components.css` | ✅ All tokens match brand kit |
| Fonts | `css/theme.css:11-74`, `css/base.css:26-29` | ✅ All four fonts at correct weights |
| Voice | `index.html`, `about.html`, `features.html` | ✅ Consistent Direct/Clear/Helpful tone |
| Icons | `img/logo.svg`, `img/favicon.svg`, `img/og.svg`, inline SVGs | ✅ Film-strip motif, flat design, consistent stroke style |
| Layout | `css/base.css`, `css/components.css` | ✅ Wide margins, generous spacing |
| Do/Don't | All CSS and SVG assets | ✅ No gradients, no serifs, consistent X symbol |

---

## Recommendations

1. **Minor — Consider updating OG image font** (`img/og.svg:68`) from Roboto to Inter for the "Self-hosted media server" subtext to align with body font usage. This is cosmetic but improves font consistency.

2. **No other changes needed.** The variant demonstrates strong brand consistency and scores 92/100. The concern above is cosmetic and does not affect brand recognition or user experience.

---

## Round 1 → Round 2 Comparison

| Aspect | Round 1 | Round 2 | Change |
|--------|---------|---------|--------|
| Colors | ✅ Pass | ✅ Pass | — |
| Fonts | ✅ Pass | ✅ Pass | — |
| Voice | ✅ Pass | ✅ Pass | — |
| Icons | ✅ Pass | ⚠️ Minor concern (OG subtext font) | No functional change |
| Do/Don't | ✅ Pass | ✅ Pass | — |
| **Score** | **92/100** | **92/100** | **Maintained** |

**Conclusion:** Branding consistency remains at 92/100. The variant is production-ready from a branding perspective.
