# Readability

**Score: 88/100**  
**Severity: ⚠️**

## Findings

### ⚠️ WARNING: Hero subheadline line-height 1.25 may be too tight (theme.css:275)
`.hero-sub` has `line-height: var(--leading-relaxed)` which is 1.70, but the subheadline paragraph on index.html spans a long sentence (~180 chars) where the 1.70 leading is appropriate. However, the `hero-eyebrow` eyebrow text uses the default line-height with tight 0.12em letter-spacing which is correct for eyebrow treatment.

Actually, this is fine. The hero sub at 1.70 is good for long-form reading. No issue.

### ⚠️ WARNING: Line length on very wide screens (1920px+)
With `max-width: 860px` on `.hero-content` and `max-width: 720px` on `.container-prose`, line lengths are comfortable on all screen sizes. No issue.

### ⚠️ WARNING: Body text minimum — verified at 320px
Font size `var(--text-base)` uses `clamp(1rem, 0.95rem + 0.25vw, 1.0625rem)`. At 320px viewport width, this computes to approximately `0.95rem + (320 × 0.0025) = 0.95 + 0.8 = 1.75rem... wait, let me recalculate.

`clamp(1rem, 0.95rem + 0.25vw, 1.0625rem)` at 320px width:
- `0.95rem + 0.0025 × 320 = 0.95 + 0.8 = 1.75rem`... that seems wrong.

Actually `vw` is 1% of viewport width. At 320px, 0.25vw = 0.8px. At default 16px root font size, 0.8px ≈ 0.05rem. So:
- `0.95rem + 0.05rem = 1.0rem`

At 375px: `0.95rem + 0.009375rem = 0.959rem ≈ 15.3px`. Acceptable but barely above 16px.

At 414px: `0.95rem + 0.01035rem = 0.96rem ≈ 15.4px`. Below 16px.

**Fix:** Adjust the clamp lower bound to ensure minimum 16px at all breakpoints. Change to `clamp(1rem, 0.9rem + 0.5vw, 1.0625rem)` to maintain 16px minimum.

## What Passed

- ✅ Reading level appropriate for design-aware adults (18–45): Lora serif body, sophisticated vocabulary in brand copy, no dumbed-down content
- ✅ Hero subheadline max-width 640px → ~72ch at 18px → within 60–75ch range
- ✅ Container-prose max-width 720px → ~81ch at 18px, slightly wide but prose sections are not multi-column so manageable
- ✅ Pitch list items, feature cards, client cards all comfortable reading widths
- ✅ Heading hierarchy clear: H1 for page title, H2 for section heads, H3 for card titles, no skipped levels
- ✅ No orphan words detected; feature titles and body copy are short enough not to strand
- ✅ Lora body font with 1.70 line-height (leading-relaxed) is appropriate for long-form reading per brand kit spec
- ✅ No justified text; left-aligned throughout
- ✅ Brand voice — warm, celebratory, romantic — applied consistently to micro-copy (eyebrows, CTAs, empty states)
- ✅ FAQ on about page uses `<dl>` with `<dt>`/`<dd>` pairs, properly structured for readability
