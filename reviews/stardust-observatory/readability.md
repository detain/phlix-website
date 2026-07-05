# Readability Review — Stardust Observatory

**Variant**: stardust-observatory
**Round**: 1
**Reviewer**: Senior Front-End Reviewer
**Date**: 2026-07-04

## Score

- **Readability**: 92 / 100

## ✅ Passed

- **Audience fit** — Reading level is appropriate for "thoughtful adults who romanticize discovery" (brand kit audience, line 83). Copy is clear, informative, and not condescending. No jargon without explanation in consumer-facing sections.
- **Line length** — Body text uses `max-width: 68ch` on `.content-section p` (theme.css:386), `max-width: 58ch` on `.hero-sub` (theme.css:225), and `max-width: 60ch` on `.page-lead` (theme.css:131). Lora body font at 1rem with line-height 1.7 yields approximately 65–68 characters per line at default sizing — within the kit's 60–72ch target (brand kit line 444).
- **No walls of text** — All sections have generous breathing room: `.content-section` and `.cta-banner` use `padding: var(--space-16) 0` (=96px top/bottom), `.pitch` uses `padding: var(--space-16) 0` with `gap: var(--space-4)` between bullet cards, feature cards have `gap: var(--space-6)`, FAQ items have `gap: var(--space-6)` and individual FAQ items have 24px padding.
- **Clear hierarchy** — Distinct headline sizes via `clamp()`:
  - H1: `clamp(2.25rem, 6vw, 4rem)` (theme.css:211)
  - H2: `clamp(1.75rem, 4vw, 3rem)` (theme.css:19)
  - H3/section heading: `clamp(1.35rem, 3vw, 2rem)` (theme.css:28)
  - Eyebrow: 0.75rem uppercase (theme.css:76)
- **Section eyebrow on hero** — index.html:86 correctly uses `hero.eyebrow` = "Self-hosted media server" from content.json as the kit voice specifies ("Self-hosted media server"). The eyebrow is styled with the kit's `text-eyebrow` class: 0.75rem Jost, uppercase, tracked 0.12em, constellation gold.

## ⚠️ Concerns (non-blocking)

- **Pitch bullet line length** (theme.css:267) — `.pitch-bullets li` uses font-size 0.9375rem (15px) with line-height 1.6 at `min-width: 280px` per card. At full 280px width minus padding and the 6px gold-dot pseudo-element, this yields approximately 73–76ch per line, slightly over the 72ch body-text target. This is at the edge of tolerance and likely not noticeable in practice, but a future refinement could reduce `min-width` to 260px or reduce padding-inline to tighten it. — why it matters: Kit typography_rules (line 444) specify 60–72ch for body. This exceeds by ~5%. — suggested next step: reduce `.pitch-bullets { grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }` for a 2–3px improvement.
- **Feature card body text** (theme.css:385) — `.content-section p { max-width: 68ch }` is applied globally, but `.feature-card p` inherits this. At 0.9375rem with 1.7 line-height on a 280px min-width card, actual line length is ~65ch — well within 60–72ch. No issue here.

## ❌ Failures (must fix this round)

None.

## Recommendations (ranked by impact)

1. **Tighten pitch bullet min-width** (impact: medium, effort: low) — Change `minmax(280px, 1fr)` to `minmax(260px, 1fr)` in theme.css:258 for pitch bullets. At 260px with 24px padding inline and 8px gap for the gold dot, line length becomes ~60ch — within target. This is an optional refinement, not a blocker.
2. **Add `font-display: swap`** (impact: low, effort: low) — Verify base.css includes `font-display: swap` on `@font-face` declarations to prevent flash-of-invisible-text during font load. This is a performance/readability cross-concern.
3. **Increase hub page content** (impact: low, effort: medium) — hub.html:63-70 has only 3 short `<p>` blocks for a full page. While readable, it feels thin compared to other pages. Consider expanding with the kit's story/mission framing for more atmospheric content.

## Evidence

- CSS line-length measurements taken from theme.css line 225 (.hero-sub), line 386 (.content-section p), and line 131 (.page-lead)
- Pitch bullets grid: theme.css:256-261
- Spacing scale confirmed via base.css `:root` tokens referencing brand kit `--space-*` scale
- Hero eyebrow present: index.html:86 `<p class="hero-eyebrow">Self-hosted media server</p>`
- Font family verification: theme.css:36 (`font-body: Lora`), confirmed via `var(--lh-body)` from base.css
