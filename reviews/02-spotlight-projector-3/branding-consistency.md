# Branding Consistency Review — 02-spotlight-projector-3 (Wave 3)

## Summary

| Aspect | Status |
|--------|--------|
| Brand Theme Alignment | **FAIL** |
| Color Palette | **PARTIAL** |
| Typography | **FAIL** |
| Voice & Tone | **PASS** |
| Visual Style | **FAIL** |
| Tagline | **FAIL** |

---

## Critical Issues

### 1. Brand Identity Mismatch (CRITICAL)

**Finding:** The implementation uses "Midnight Gallery" branding throughout all CSS files, but the brand kit specifies "Spotlight Projector V3 — Film Noir."

**Evidence:**
- `base.css` line 4: `Brand: Midnight Gallery — Ultra-dark museum elegance, antique gold, restrained beauty`
- `theme.css` line 4: `Brand: Midnight Gallery — Ultra-dark museum elegance, soft ambient light, restrained antique gold`

**Brand Kit Requirement:**
- Variant: 02-spotlight-projector-3
- Name: "Spotlight Projector V3 — Film Noir"
- Variation: "High contrast B&W with selective gold color, moody shadow play"
- Personality: ["Cinematic", "Dramatic", "Mysterious", "Noir", "Shadow-heavy"]

**Impact:** The "Midnight Gallery" branding suggests a museum/ gallery aesthetic with soft ambient lighting — completely misaligned with the Film Noir "moody shadow play" and "high contrast B&W" direction.

---

### 2. Typography Mismatch (CRITICAL)

**Brand Kit Specifies:**
- Headline: `Cinzel Bold` (serif, dramatic, cinematic)
- Body: `Lora Regular` (elegant serif for readability)
- UI: `Source Sans Pro`
- Code: `Fira Code`

**Implementation Uses:**
```css
--font-headline: 'Cormorant', Georgia, serif;
--font-body: 'Cormorant', Georgia, serif;
--font-ui: 'Source Sans Pro', system-ui, sans-serif;
```

**Impact:** Cinzel and Cormorant are both serif display fonts but have fundamentally different personalities — Cinzel is architectural and monumental; Cormorant is elegant and literary. The brand kit's explicit specification of "Cinzel Bold" for headlines indicates a desire for bold, architectural drama over refined elegance.

---

### 3. Color Palette Inconsistencies (SIGNIFICANT)

**Brand Kit Colors:**
| Token | Hex | Usage |
|-------|-----|-------|
| gold_spotlight | `#F5C542` | Primary gold — warm, cinematic |
| deep_black | `#000000` | Pure black for contrast |
| warm_white | `#FFF7E6` | Warm cream paper tone |
| burgundy | `#7A1F1F` | Secondary accent |
| soft_shadow_gray | `#3A3A3A` | Shadow work |
| amber_glow | `#FFB84D` | Accent for glows |

**Implementation Colors:**
| Token | Hex |
|-------|-----|
| --color-deep-black | `#0A0A0C` (not pure black) |
| --color-museum-white | `#FAF9F6` (not warm_white) |
| --color-antique-gold | `#C9A84C` (not gold_spotlight) |

**Missing from Implementation:**
- `burgundy` (#7A1F1F) — never referenced
- `soft_shadow_gray` (#3A3A3A) — never referenced  
- `amber_glow` (#FFB84D) — never referenced

**Impact:** The implementation uses a muted antique gold (#C9A84C) instead of the specified cinematic gold (#F5C542). The Film Noir variation requires high contrast — pure black and warm cream tones are essential to the aesthetic. The muted palette creates a "museum gallery" feel rather than noir drama.

---

### 4. Tagline Mismatch (SIGNIFICANT)

**Brand Kit Specifies:**
- Primary tagline: `"Your Personal Cinema."`

**Implementation (index.html line 214):**
- Footer tagline: `"Your story. Our stage."`

**Impact:** The tagline is a key brand voice element. The brand kit tagline emphasizes personal ownership and cinema identity. The actual tagline is theatrical/curated which conflicts with the "self-hosted media server" product positioning.

---

## Partial Compliance

### 5. UI Style — Compliance Gap

**Brand Kit Requires:**
- High contrast black and white
- Selective gold color only
- Deep shadows
- Noir lighting effects
- Umbrella lady silhouette motifs

**Implementation Provides:**
- Dark backgrounds with subtle gold accents ✓
- Soft ambient light effect (ambient-pulse animation) ✗
- No noir lighting effects
- No silhouette motifs

**Note:** The "ambient-pulse" animation (theme.css lines 310-326) creates a soft breathing glow — appropriate for a museum gallery but not for noir's dramatic shadow play. The brand kit calls for "Noir shadow play animation" as the header motif.

---

### 6. Voice & Tone — PASS

**Brand Kit Voice:** ["Warm", "Story-driven", "Slightly dramatic", "Movie night energy"]

**Implementation:** Content reads professionally with appropriate warmth:
- Hero: "An open-source PHP media server that streams to your Roku, Samsung TV..."
- Feature descriptions use "your" possessives appropriately
- Footer copy is clean and appropriate

**Verdict:** The written content aligns with the brand voice specification.

---

## Recommendations

1. **Rename brand identity** from "Midnight Gallery" to "Spotlight Projector — Film Noir" across all CSS files

2. **Update color palette** to match brand kit:
   - Replace `--color-antique-gold: #C9A84C` with brand gold_spotlight `#F5C542`
   - Add missing colors: burgundy (#7A1F1F), soft_shadow_gray (#3A3A3A), amber_glow (#FFB84D)
   - Update backgrounds to use deep_black (#000000) where high contrast is needed
   - Consider warm_white (#FFF7E6) for text on dark backgrounds

3. **Update typography:**
   - Replace Cormorant with Cinzel Bold for headlines
   - Use Lora Regular for body text
   - Self-host fonts or use appropriate Google Fonts

4. **Replace tagline** to match brand kit: "Your Personal Cinema."

5. **Update header motif animation** from ambient-pulse to "Noir shadow play" — consider a shadow animation that evokes the classic noir silhouette/shadow motif

6. **Add noir visual elements** — if umbrella lady silhouette motifs are too specific, consider other noir visual metaphors (fedora silhouette, rain on window, dramatic shadow play)

---

## Files Reviewed
- `variants/02-spotlight-projector-3/css/base.css`
- `variants/02-spotlight-projector-3/css/theme.css`
- `variants/02-spotlight-projector-3/index.html`
- `shared/data/brand-kits.json` (entry 02-spotlight-projector-3)

---

*Review Date: 2026-05-21*
*Reviewer: Branding Consistency Reviewer — Wave 3*
