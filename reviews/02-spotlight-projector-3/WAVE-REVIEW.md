# Wave 3 Review: 02-spotlight-projector-3

## Variant: Spotlight Projector V3 — Film Noir

**Review Date:** 2026-05-21
**Wave:** 3 of 5
**Variant Path:** `variants/02-spotlight-projector-3/`

---

## CRITICAL ISSUE: Brand Kit Mismatch

This variant has **significantly diverged** from the brand kit specification.

### Expected (Brand Kit 02-spotlight-projector-3)
| Element | Expected | Actual (Variant) |
|---------|----------|-------------------|
| Colors | gold_spotlight: #F5C542, deep_black: #000000, warm_white: #FFF7E6 | #C9A84C, #0A0A0C, #FAF9F6 |
| Headline Font | Cinzel Bold | Cormorant |
| Body Font | Lora Regular | Cormorant |
| UI Font | Source Sans Pro | Source Sans Pro (correct) |
| Theme Name | Film Noir (high contrast B&W, selective gold) | "Midnight Gallery" (museum elegance) |

---

## Visual Correctness

### Fonts
- **Expected:** Cinzel Bold (headlines), Lora Regular (body), Source Sans Pro (UI), Fira Code (code)
- **Actual:** Cormorant (headlines & body), Source Sans Pro (UI)
- **Status:** ❌ Font mismatch - Cormorant is not in brand kit

### Colors
| Token | Brand Kit Value | CSS Variable | Actual CSS Value |
|-------|----------------|--------------|------------------|
| gold_spotlight | #F5C542 | --color-antique-gold | #c9a84c |
| deep_black | #000000 | --color-deep-black | #0a0a0c |
| warm_white | #FFF7E6 | --color-museum-white | #faf9f6 |

### Layout
- **Header:** Sticky header with ambient pulse animation
- **Hero:** Minimalist layout with subtle gold accents
- **Content:** Feature cards with muted styling
- **Footer:** Minimal with gold accents

---

## Branding Consistency

### Brand Kit Expectation (02-spotlight-projector-3 Film Noir)
- **Personality:** ["Cinematic", "Dramatic", "Mysterious", "Noir", "Shadow-heavy"]
- **UI Style:** ["High contrast black and white", "Selective gold color only", "Deep shadows", "Noir lighting effects", "Umbrella lady silhouette motifs"]

### Actual Implementation ("Midnight Gallery")
- **Personality:** Elegant, museum-like, restrained
- **UI Style:** Ultra-dark with soft ambient light, subtle antique gold

### Assessment
❌ **MISMATCH** - The variant implements "Midnight Gallery" styling, not "Film Noir" as specified in brand kit

---

## Issues Found

### Critical Issues
1. **Colors don't match brand kit** - Using #C9A84C instead of #F5C542
2. **Fonts don't match brand kit** - Using Cormorant instead of Cinzel for headlines
3. **Theme doesn't match** - Implementing "Midnight Gallery" instead of "Film Noir"

### Minor Issues
1. No Fira Code font loaded (code font)
2. The theme appears to be a mix of concepts

---

## Accessibility

- Skip link present: ✅
- ARIA labels on nav: ✅
- Focus-visible styles: ✅
- Reduced motion support: ✅

---

## Build & Lint Status

- **Build:** Pending
- **HTML Lint:** Pending
- **CSS Lint:** Pending
- **JS Lint:** Pending

---

## Review Summary

| Dimension | Status |
|-----------|--------|
| Visual Correctness | ❌ Fail - Font & color mismatch |
| Branding Consistency | ❌ Fail - Theme mismatch |
| Mobile Responsiveness | ✅ Pass |
| JavaScript Functionality | ✅ Pass |
| Accessibility | ✅ Pass |
| SEO/Social Metadata | ✅ Pass |

---

## Recommendation

❌ **REJECT** - This variant requires significant fixes to match brand kit specifications. The variant implements a "Midnight Gallery" theme instead of the specified "Film Noir" theme.
