# Branding Consistency Review: 05-pixel-tech-3 (CRT Monitor)

**Review Date:** 2026-05-21
**Variant:** Pixel Tech V3 — CRT Monitor
**Files Reviewed:** `css/base.css`, `css/theme.css`, `index.html`

---

## Summary

| Aspect | Status | Severity |
|--------|--------|----------|
| Color Palette | ❌ FAIL | Critical |
| Typography | ⚠️ PARTIAL | Medium |
| UI Style / Effects | ❌ FAIL | Critical |
| Tagline | ⚠️ MISMATCH | Low |
| Voice & Tone | N/A | — |

**Overall:** Implementation does not match brand specification.

---

## Brand Specification (from `shared/data/brand-kits.json`)

### Colors
| Role | Token | Hex |
|------|-------|-----|
| Primary | `neon_green` | `#39FF14` |
| Primary | `black` | `#000000` |
| Primary | `silver` | `#C0C0C0` |
| Secondary | `dark_gray` | `#1A1A1A` |
| Secondary | `matrix_green` | `#00FF66` |
| Accent | `electric_purple` | `#9B30FF` |

### Typography
| Role | Font |
|------|------|
| Headline | Orbitron Bold |
| Body | Inter Medium |
| UI | Roboto Mono |
| Code | JetBrains Mono |

### UI Style Mandate
- CRT monitor effects
- **Scanline overlays**
- **Phosphor glow**
- Screen curvature hints
- Vintage computing

### Tagline
> "Engineered for Your Library."

---

## Findings

### 1. Color Palette — ❌ CRITICAL FAILURE

**Specified:** Green monochrome theme (neon green `#39FF14`, matrix green `#00FF66`) with black background and electric purple accent.

**Actual (in `base.css` lines 72–77):**
```css
--color-primary: #0D0815;      /* deep purple-black */
--color-secondary: #1A1030;    /* dark purple */
--color-accent: #FF2D78;       /* hot pink */
--color-text: #E8E0F0;          /* light text */
--color-muted: #6B5B7B;         /* muted purple */
```

**Issues:**
- Background is deep purple-black (`#0D0815`) instead of pure black (`#000000`)
- Accent is hot pink (`#FF2D78`) instead of electric purple (`#9B30FF`)
- No use of the mandated neon green (`#39FF14`) or matrix green (`#00FF66`) anywhere
- Text uses purple-gray tones instead of green monochrome
- The CSS comment at line 5 of `theme.css` describes "Neon Cyberpunk" with "hot pink/magenta accents" — this contradicts the brand spec

**Required Action:** Replace entire color palette with green-monochrome theme. See `brand-kits.json` entry `05-pixel-tech-3` for exact values.

---

### 2. Typography — ⚠️ PARTIAL FAILURE

**Specified:** Orbitron Bold (headlines), Inter Medium (body), Roboto Mono (UI), JetBrains Mono (code).

**Actual (in `base.css` lines 88–92 and `theme.css`):**
```css
--font-headline: 'Orbitron', 'Courier New', courier, monospace;  /* ✅ Correct */
--font-body: 'Exo 2', system-ui, ...;                               /* ❌ Should be Inter Medium */
--font-ui: 'Exo 2', system-ui, sans-serif;                          /* ❌ Should be Roboto Mono */
--font-code: 'Exo 2', 'Courier New', courier, monospace;             /* ❌ Should be JetBrains Mono */
```

**Issues:**
- Headline font (Orbitron) is correct ✅
- Body, UI, and Code fonts are all "Exo 2" instead of the specified Inter Medium, Roboto Mono, and JetBrains Mono respectively
- The font files in `../fonts/` are `Exo2-*.woff2` but should be `Inter-Medium.woff2`, `RobotoMono-*.woff2`, and `JetBrainsMono-*.woff2`

**Required Action:** Replace Exo 2 font family with specified fonts (Inter Medium, Roboto Mono, JetBrains Mono).

---

### 3. UI Style / Effects — ❌ CRITICAL FAILURE

**Specified:** CRT monitor effects, **scanline overlays**, **phosphor glow**, screen curvature hints, vintage computing aesthetic.

**Actual:**

| Mandated Effect | Present? | Implementation |
|----------------|----------|----------------|
| Scanline overlays | ❌ NO | Uses cyberpunk hex grid pattern (`linear-gradient` at `base.css` lines 64–68) |
| Phosphor glow | ❌ NO | Uses hot pink glow effects (`rgba(255, 45, 120, ...)`) instead of green phosphor |
| Screen curvature hints | ❌ NO | No curvature or vignette effects present |
| Vintage CRT aesthetic | ❌ NO | Cyberpunk/neon aesthetic with purple-pink color scheme |

**Issues:**
- Background texture is a hex grid pattern, not scanlines
- Glow effects use hot pink/magenta instead of green phosphor glow
- No CRT curvature, vignette, or barrel distortion effects
- The `neon-pulse` and `neon-flicker` animations (theme.css lines 71–80, 325–360) produce a hot pink flicker instead of green phosphor flicker
- Comment at `theme.css` line 4 says "Neon Cyberpunk aesthetic" — entirely wrong theme

**Required Action:** Implement scanline overlay effect, green phosphor glow, and CRT curvature vignette. Remove all hot pink/magenta color usage.

---

### 4. Tagline — ⚠️ MISMATCH

**Specified:** "Engineered for Your Library."

**Actual (in `index.html` line 88):**
```html
<h1 class="glitch" data-text="Your media. Your library. Your Phlix.">Your media. Your library. Your Phlix.</h1>
```

**Issue:** Homepage uses a different tagline. This may be intentional for the homepage hero, but the brand tagline is not present.

**Required Action:** Add brand tagline "Engineered for Your Library." to appropriate location (e.g., footer tagline at `theme.css` line 707 or as a header motif).

---

## Violations Summary

| Rule (from brand kit) | Violated? |
|-----------------------|-----------|
| Use soft pastel colors | ❌ Avoiding correctly (using dark) |
| Use serif fonts | ✅ Compliant (using sans/mono) |
| Add modern flat design | ✅ Avoiding correctly (has depth/glow) |
| Use sharp hi-tech aesthetics | ❌ Violating (this is cyberpunk, not CRT) |

**Key violation:** The implementation is a "Neon Cyberpunk" variant (purple-black + hot pink), not "CRT Monitor" (green monochrome + scanlines). This is a completely different aesthetic than specified.

---

## Required Corrections

1. **Colors:** Replace entire palette with green monochrome theme per brand spec
2. **Fonts:** Replace Exo 2 with Inter Medium, Roboto Mono, JetBrains Mono
3. **Effects:** Add scanline overlay, green phosphor glow, CRT screen curvature
4. **Tagline:** Insert "Engineered for Your Library." per brand spec
5. **Comments:** Remove/fix CSS comments that describe "Neon Cyberpunk" — should describe "CRT Monitor vintage computing"

---

*Review generated for Wave 3 branding consistency audit.*
