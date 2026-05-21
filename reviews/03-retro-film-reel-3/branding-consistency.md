# Branding Consistency Review — 03-retro-film-reel-3 (Wave 3)

## Variant
**Retro Film Reel V3 — Sunday Matinee**: Soft family-friendly, popcorn vibes, warm and approachable

## Summary
**Status: FAIL** — The implementation has fundamental mismatches across color palette, typography, visual treatment, and tagline. The CSS file header incorrectly identifies the variant as "Film Noir" when it should be "Sunday Matinee".

---

## Issues

### 1. Color Palette — CRITICAL MISMATCH

| Role | Brand Kit Requirement | Implementation | Status |
|------|----------------------|----------------|--------|
| Background | Warm cream `#F5E9D4` or soft warm tones | `#0D0D0D` (dark noir black) | ❌ |
| Primary | `retro_red` `#C0392B` | `noir-amber` `#D4763B` | ❌ |
| Accent | `teal` `#1ABC9C`, `mint` `#A3E4D7` | Not used | ❌ |
| Border/Outline | `black_outline` `#111111` | `#3A3A3A` | ⚠️ |

**Problem**: The brand kit specifies warm, soft tones (cream, retro red, teal, mustard, soft brown, mint). The implementation uses a dark noir palette with `noir-black`, `noir-white`, `noir-amber`. This matches a "Film Noir" aesthetic, not "Sunday Matinee".

**Evidence in base.css lines 18-21**:
```css
--color-noir-black: #0D0D0D;
--color-noir-white: #FAFAFA;
--color-noir-amber: #D4763B;
```

**Evidence in base.css lines 61-64**:
```css
/* Border radius - sharp for noir */
--radius-sm: 0.125rem;
--radius-md: 0.25rem;
```

---

### 2. Typography — CRITICAL MISMATCH

| Role | Brand Kit Requirement | Implementation | Status |
|------|----------------------|----------------|--------|
| Headline | **Bebas Neue** | Oswald | ❌ |
| Body | **Open Sans** | Lora (serif) | ❌ |
| UI | **Nunito** | Oswald | ❌ |
| Code | **Cousine** | Courier New | ❌ |

**Problem**: None of the brand-specified fonts are loaded. The implementation uses Oswald and Lora which belong to a different variant (Spotlight Projector).

**Evidence in theme.css lines 8-30**: Loads Oswald fonts
**Evidence in theme.css lines 33-54**: Loads Lora fonts

**Required**: Add @font-face declarations for Bebas Neue, Open Sans, Nunito, and Cousine.

---

### 3. Visual Treatment — MISMATCH

| Brand Kit Requirement | Implementation | Status |
|----------------------|----------------|--------|
| Soft warm tones | Dark moody tones | ❌ |
| Popcorn bucket motifs | None present | ❌ |
| Rounded everything | Sharp corners (--radius-sm: 0.125rem) | ❌ |
| Cozy theater ambiance | Noir/dramatic styling | ❌ |
| Family-friendly feel | Dark, dramatic, cinematic | ❌ |

**Evidence in base.css lines 61-64**: Border radius uses sharp values (0.125rem, 0.25rem) not "rounded everything"
**Evidence in base.css line 19**: `--color-bg: var(--color-noir-black)` — dark background, not warm cream

---

### 4. Tagline — MISMATCH

| Brand Kit Requirement | Implementation | Status |
|----------------------|----------------|--------|
| **"Home Theater, Upgraded."** | "Open-source media, on your terms." (footer) / No Sunday Matinee tagline | ❌ |

**Evidence in index.html line 213**: Footer tagline is unrelated to brand kit

---

### 5. Header Comment — INTERNAL INCONSISTENCY

**Problem**: The CSS file header incorrectly identifies this variant:

```css
/* Variant: 03-retro-film-reel-3 (Film Noir) */  // ❌ Should be "Sunday Matinee"
```

---

### 6. Voice/Tone — MISMATCH

| Brand Kit Voice | Implementation | Status |
|----------------|----------------|--------|
| Playful | The tone is serious/dramatic | ❌ |
| Approachable | Dark moody design is not approachable | ❌ |
| Warm | Dark colors convey coldness | ❌ |
| Slightly quirky | No quirky elements (popcorn motifs) | ❌ |

---

## What Is Correct

- CSS custom property architecture is well-structured
- Responsive layout and spacing system follows consistent scale
- Font loading uses self-hosted fonts (no CDN) — matches infrastructure pattern
- Accessibility: skip links, focus states, ARIA labels present

---

## Required Corrections

1. **Replace all noir colors with Sunday Matinee palette**:
   - Background: `#F5E9D4` (cream)
   - Primary: `#C0392B` (retro red)
   - Secondary: `#D4A017` (mustard), `#8C5E3C` (soft brown)
   - Accent: `#1ABC9C` (teal), `#A3E4D7` (mint)

2. **Replace fonts**:
   - Headline: `Bebas Neue` (not Oswald)
   - Body: `Open Sans` (not Lora)
   - UI: `Nunito` (not Oswald)
   - Code: `Cousine` (not Courier New)

3. **Update border-radius** to use friendlier values (e.g., `--radius-md: 0.5rem`)

4. **Fix tagline** to "Home Theater, Upgraded."

5. **Add popcorn motifs** or playful Sunday Matinee elements

6. **Fix CSS header comment** from "Film Noir" to "Sunday Matinee"

7. **Add warm lighting effects** instead of dark noir shadows

---

## Verdict

**The implementation does not represent the 03-retro-film-reel-3 (Sunday Matinee) brand kit.** It appears to be a hybrid of Film Noir styling with incorrect variant attribution. The variant appears to conflate 03-retro-film-reel-3 ("Sunday Matinee") with 02-spotlight-projector-3 ("Film Noir") — a different wave entirely.
