# Readability

## Score: 94/100

## Findings
- ✅ `p { max-width: 65ch }` — base.css:181 — body text correctly constrained to 65ch per kit.typography_rules
- ✅ Headlines (H1-H4) set with `font-weight: 300` — base.css:169 — kit typography_rules: "Headlines are always light-weight (300)"
- ✅ `--lh-body: 1.75` — base.css:129 — matches kit.fonts.body.line_height: 1.75
- ✅ `--lh-headline: 1.1` — base.css:127 — matches kit.fonts.headline.line_height: 1.1
- ✅ `--tracking-headline: 0.05em` — base.css:122 — matches kit.fonts.headline.tracking: "0.05em"
- ✅ `--tracking-display: 0.08em` — base.css:123 — matches kit.fonts.display.tracking: "0.08em"
- ✅ Body font = Lora serif — base.css:116 — kit typography_rules: "Body copy is serif (Lora)"
- ✅ UI font = DM Sans sans-serif — base.css:117 — kit typography_rules: "UI copy is sans-serif (DM Sans)"
- ✅ kit.typography_rules: "Keep body line-length to 60–65 characters" — `p { max-width: 65ch }` enforces this ✅
- ✅ `.hero-sub { max-width: 58ch }` — theme.css:195 — subheadline also within measure
- ✅ `.pitch-bullets li { line-height: 1.6 }` — theme.css:236 — acceptable line-height for list items
- ✅ `.page-header .lead { max-width: 55ch }` — theme.css:137 — lead text constrained
- ✅ Section spacing ≥48px: `.content-section { padding-block: var(--space-18) }` = 72px — theme.css:305 — exceeds kit.spacing_scale minimum
- ✅ kit.typography_rules: "Avoid all-caps except on very small UI labels" — hero eyebrow uses uppercase with `text-transform: uppercase` but font-size is 0.8rem (small UI label) — ✅
- ⚠️ `.page-header` top padding = 72px, bottom padding = 48px — slightly asymmetric, but bottom padding of 48px still meets the ≥48px requirement between sections
- ✅ `.pitch` section has 72px vertical padding and center-aligned heading
- ✅ `.features-overview` has 72px vertical padding — theme.css:248
- ✅ `.cta-banner` has 72px vertical padding — theme.css:288
- ✅ `.faq-item dt { font-size: 1.15rem }` — theme.css:378 — question text is appropriately sized above body text
- ✅ `.feature-card p { max-width: 32ch }` — components.css:341 — short card descriptions stay well within measure
- ✅ Font scaling via `clamp()` throughout: `h1 { font-size: clamp(2.25rem, 4vw, 3.5rem) }` — base.css:175 — readable at all viewport sizes

## Summary
Typography is well-executed. The reading measure is correctly capped at 65ch for body text; headlines are weight-300 Cormorant Garamond with generous tracking as specified; body is Lora serif; UI is DM Sans. Spacing between sections (72px) exceeds the 48px minimum from kit.spacing_scale. Font scaling is fluid via clamp(). No issues detected — this dimension passes cleanly.
