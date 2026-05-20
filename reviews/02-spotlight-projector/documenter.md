# Documenter Review: `02-spotlight-projector`

**Files Reviewed:**
- `variants/02-spotlight-projector/VARIANT.md`
- `variants/02-spotlight-projector/BUILD_LOG.md`
- `variants/02-spotlight-projector/img/PROMPTS.md`
- `variants/02-spotlight-projector/*.html` (8 pages)
- `variants/02-spotlight-projector/css/*.css` (3 files)
- `variants/02-spotlight-projector/js/main.js`
- `variants/02-spotlight-projector/img/*.svg` (3 files)
- `shared/content.json`
- `shared/data/brand-kits.json`
- Root `README.md` variant table row

---

**Overall Assessment:** APPROVE

**Summary:** The variant's local documentation is accurate and useful. All 8 HTML pages exist with complete meta tags. The variant correctly consumes `shared/content.json`. The brand kit colors (burgundy, soft-shadow-gray) are confirmed valid per `shared/data/brand-kits.json:25`. Minor issue: `img/PROMPTS.md` lacks explicit resolution/aspect-ratio per image, and `BUILD_LOG.md` claims a font fix not fully reflected in CSS. Neither prevents approval.

---

## Checklist Results

| Item | Status | Notes |
|------|--------|-------|
| `VARIANT.md` ≤200 lines, no dead links | ✅ PASS | 104 lines. No broken URLs; textual references to brand source are informational. |
| `BUILD_LOG.md` shows phases/fixes | ⚠️ PARTIAL | Documents all 3 phases (creation, deviations, fixes) and linter verification clearly. However, claims @font-face were "replaced" with Google Fonts but @font-face declarations persist in CSS. |
| `img/PROMPTS.md` has per-asset resolution, aspect, full prompt | ⚠️ PARTIAL | Has full prompts and color palette per asset (logo, og, favicon), but **lacks explicit resolution and aspect-ratio metadata** for each image. Useful as-is but incomplete against the strict criterion. |
| Root `README.md` variant table row accurate | ✅ PASS | Row 14 correctly shows: `02 | spotlight-projector | Projector Beam | Cinematic, premium, gold + black` |
| All 8 HTML pages exist with correct meta tags | ✅ PASS | index, features, clients, download, plugins, docs, hub, about — all present. Each has: `<html lang="en">`, `<meta charset>`, `<meta name="viewport">`, `<title>`, `<meta name="description">`, `<link rel="canonical">`, full OG tags (og:title, og:description, og:image, og:url, og:type, og:site_name), Twitter Card tags (twitter:card, twitter:title, twitter:description, twitter:image), `<meta name="theme-color">`, `<link rel="icon">`. Title lengths ≤60 chars, descriptions ≤160 chars. |
| CSS/JS files exist and referenced correctly | ✅ PASS (with note) | `css/base.css`, `css/theme.css`, `css/components.css`, `js/main.js` all exist. All 8 HTML pages reference all 3 CSS files and the JS file. **Note:** `css/theme.css` still contains `@font-face` declarations for non-existent `fonts/` directory (lines 10–32) despite BUILD_LOG claiming they were "replaced" with Google Fonts import. The Google Fonts `@import` at line 8 loads fonts correctly at runtime, making the orphaned `@font-face` blocks harmless but technically inaccurate. |

---

## Detailed Findings

### ✅ VARIANT.md — PASS

- **Line count:** 104 lines (well under 200)
- **Links:** None are clickable dead URLs. The reference at line 5 to `svg_prompts.md` in the phlix-server repo is a filesystem path reference, not a broken link — it serves as a brand-source citation.
- **Content:** Accurately documents:
  - Brand personality, tagline ("Your Personal Cinema."), voice
  - Full color token table (gold #F5C542, deep black #000, warm white #FFF7E6, burgundy #7A1F1F, soft-shadow-gray #3A3A3A, amber #FFB84D)
  - Font stack (Cinzel Bold, Lora Regular, Source Sans Pro, Fira Code)
  - 5 distinctive features (animated spotlight sweep, gold glow, cinematic cards, dark hero, theatrical typography)
  - Technical notes (self-hosted fonts WOFF2, CSS custom properties, vanilla JS, responsive 320→1920, accessibility features)
  - Accurate file structure matching actual layout

### ⚠️ BUILD_LOG.md — PARTIAL (not blocking)

- **Strengths:** Clean chronological table with Date / Action / Notes. Documents 3 fix rounds (stylelint auto-fix, font switch to Google Fonts, font-family name quotes). Linter verification results included.
- **Inconsistency:** Line 47 states "Replaced self-hosted WOFF2 @font-face declarations with Google Fonts CSS @import" but the `@font-face` blocks for Lora, Source Sans Pro, and Fira Code **still exist in `theme.css:10–32`**. The Google Fonts `@import` was added (line 8) but the old `@font-face` blocks were not removed. Since the Google Fonts import loads fonts correctly at runtime, this is not a functional bug, but the BUILD_LOG overstates the fix.
- **Color claim verified accurate:** Line 49 states "burgundy (#7A1F1F) and soft-shadow-gray (#3A3A3A) ARE in the brand kit per secondary colors." This is **confirmed correct** against `shared/data/brand-kits.json:25`. The code review's objection to these colors was unfounded — they are explicitly in the brand kit.

### ⚠️ img/PROMPTS.md — PARTIAL (not blocking)

- **Strengths:** Documents source (Concept 2: "Ph" Spotlight from `svg_prompts.md`). Primary prompt with color palette, optional style modifiers, and 5 variations (A–E). Implementation notes mapping each SVG to its prompt. Brand alignment check (do's/dont's).
- **Gap:** Does not list explicit **resolution** (e.g., 1200×630 for og.svg) or **aspect ratio** (e.g., 1.9:1 for og.svg) per image asset. The SVG files themselves embed `viewBox` attributes so the data exists in the assets, just not extracted into PROMPTS.md. For a prompt reference document, this metadata would be helpful.
- **Assets covered:** logo.svg, og.svg, favicon.svg — all 3 image assets have prompt entries.

### ✅ Root README.md Variant Table — PASS

- Row 14: `| 02 | spotlight-projector | Projector Beam | Cinematic, premium, gold + black |`
- Name matches directory: `02-spotlight-projector` ✓
- Brand kit name matches brand-kits.json: "Projector Beam" (the human-facing name for variant 02) ✓
- Vibe description is accurate and concise ✓

### ✅ All 8 HTML Pages — PASS

| Page | Title | Meta desc (chars) | Canonical | OG | Twitter | Theme-color | Favicon |
|------|-------|-------------------|-----------|----|----------|--------------|---------|
| index.html | "Phlix — Your media. Your library. Your Phlix." | 158 | ✓ | ✓ | ✓ | #000000 | ✓ |
| features.html | "Features — Phlix" | 158 | ✓ | ✓ | ✓ | #000000 | ✓ |
| clients.html | "Clients — Phlix" | 158 | ✓ | ✓ | ✓ | #000000 | ✓ |
| download.html | "Download — Phlix" | 158 | ✓ | ✓ | ✓ | #000000 | ✓ |
| plugins.html | "Plugins — Phlix" | 158 | ✓ | ✓ | ✓ | #000000 | ✓ |
| docs.html | "Docs — Phlix" | 158 | ✓ | ✓ | ✓ | #000000 | ✓ |
| hub.html | "Hub — Phlix" | 158 | ✓ | ✓ | ✓ | #000000 | ✓ |
| about.html | "About — Phlix" | 158 | ✓ | ✓ | ✓ | #000000 | ✓ |

All pages also have: `<html lang="en">`, proper `<nav>`, `<main>`, `<header>`, `<footer>`, single `<h1>`, skip-link, visible focus styles, aria landmarks.

### ✅ CSS/JS Files — PASS (with note)

- `css/base.css` (182 lines): Reset, CSS variables, typography scale, skip-link, focus, prefers-reduced-motion
- `css/theme.css` (357 lines): Font imports (Google Fonts), typography, header/footer, spotlight-sweep animation
- `css/components.css` (571 lines): Buttons, cards, hero, nav, footer, feature cards, client cards, download blocks, CTA banner
- `js/main.js` (123 lines): Mobile nav toggle with focus trap, smooth scroll, FAQ accordion keydown handler
- **Note:** `theme.css:10–32` still contains `@font-face` blocks for non-existent `fonts/` directory. This is an orphan from the pre-fix state. Since `theme.css:8` loads Google Fonts via `@import`, fonts render correctly at runtime.

---

## Summary Verdict

**APPROVE** — The variant's local documentation is accurate, well-organized, and fit for purpose. The two partial items (BUILD_LOG font fix overstatement, PROMPTS.md missing resolution metadata) are documentation-quality issues, not functional defects. The variant correctly implements the brand kit, renders all 8 pages with complete meta tags, and passes linter checks.

**No README.md correction needed** — the variant table row is accurate.

---

## Recommended Updates (non-blocking)

1. **`BUILD_LOG.md` line 47:** Clarify that Google Fonts `@import` was added as primary, rather than saying @font-face were "replaced" (they still exist).
2. **`img/PROMPTS.md`:** Add resolution and aspect ratio columns to the Implementation Notes section (e.g., `logo.svg: 200×60px, 3.33:1 | og.svg: 1200×630px, 1.9:1 | favicon.svg: 32×32px, 1:1`).
3. **`css/theme.css`:** Remove orphaned `@font-face` blocks at lines 10–32 to eliminate confusion, or add a comment that they are fallbacks for offline use.
