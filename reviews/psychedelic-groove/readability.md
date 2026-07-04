# Readability Review — Psychedelic Groove

**Variant**: psychedelic-groove
**Round**: 2
**Reviewer**: Code Review Agent
**Date**: 2026-07-04

## Score

- **Readability**: 91 / 100

## ✅ Passed

- **Line length / max-width** — All content containers use `max-width: var(--max-width)` (1400px) or `.container-narrow` (860px). Body text has `max-width: 680px` on index.html hero sub. Pitch bullets have max-width: 900px on theme.css:242. This prevents excessively long line lengths on wide screens.
- **Line height** — body has `line-height: var(--leading-relaxed)` (1.7) from base.css:115. Feature card text uses `--leading-relaxed`. Appropriate for reading.
- **Font size** — Body text uses `var(--text-base)` (16px) per base.css:150. Feature card body uses 16px. Hero sub uses `clamp(var(--text-lg), 2.5vw, var(--text-xl))` — never smaller than 18px on mobile. This passes the "body text never drops below ~16px on phones" requirement.
- **Contrast on dark backgrounds** — All text uses `--color-text: #F5F0FF` (Lysergic White) on `--color-bg: #0A0018` (Blacklight Indigo) = ~19:1 contrast ratio. Secondary text (hero-sub at rgba(245,240,255,0.8) / 80% opacity) on dark = ~15:1 ratio. Both exceed WCAG AAA requirements.
- **Heading hierarchy readability** — H1 uses fluid `clamp()` giving dramatic, readable headlines. H2 provides clear section breaks.
- **Scannability** — Feature cards have clear structure: icon (visual anchor) → H3 title → body paragraph. Pitch bullets have colored dot indicators for scannability. FAQ uses `<dl>` with `<dt>`/`<dd>` pairs which is scannable.
- **No walls of text** — All body sections are broken into digestible pieces: feature cards (2-3 sentences each), pitch bullets (one line each), FAQ items (2-4 sentences each). No long unbroken paragraphs.
- **Pitch bullets have breathing room** — Each bullet has adequate padding and gap in the grid. Adequate whitespace.
- **Color blocks vs prose** — The design uses color-block sections (pitch has colored dot indicators, CTA banner has gradient overlay, page-header has color strip at top) which aid scannability.

## ⚠️ Concerns (non-blocking)

- **Feature card body text at 80% opacity** — components.css:363 sets `color: rgb(245,240,255,0.8)` (80% opacity) for `.feature-detail-text p`. While the contrast ratio against `--color-surface: #120825` is still ~11:1 (passing AAA), the reduced opacity is slightly harder to read for users with mild visual impairment. Impact is minimal since the surface color is dark enough to maintain high contrast.

- **Code blocks** — download.html has `<pre><code>` block with install instructions. Code is styled with Space Mono at 14px on dark surface. Code readability is acceptable. Not a failure.

## ❌ Failures (must fix this round)

None — no must-fix readability failures found. Text is appropriately sized, contrast is high, line lengths are controlled, and content is well-structured for scanning. This round's fixes (Google Fonts CDN removal, aria-hidden partial fix, component hover fixes, icon stroke-width) do not affect readability.

## Recommendations (ranked by impact)

1. **Consider full-opacity text on feature card bodies** (impact: low, effort: low) — Change `components.css:363` from `rgb(245,240,255,0.8)` to full `--color-text` for better readability, especially for users with visual impairments.

## Evidence

- Verified body font size at base.css:150 (`var(--text-base)` = 16px)
- Verified line-height at base.css:115 (`var(--leading-relaxed)` = 1.7)
- Verified max-width constraints in theme.css:61-73
- Calculated contrast ratios for all text/background combinations
