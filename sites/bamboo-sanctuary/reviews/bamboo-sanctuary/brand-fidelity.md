# Brand Fidelity & Spirit

## Score: 65/100

## Findings
- ✅ `--color-primary` = `#8FAF9F` — base.css:63 — correct celadon grove
- ✅ `--color-bg` = `#F2EDE5` — base.css:66 — correct washi white
- ✅ `--font-headline` = `'Cormorant Garamond', 'Garamond', georgia, serif` — base.css:114
- ✅ Body font = Lora — base.css:116
- ✅ UI font = DM Sans — base.css:117
- ✅ Font tracking/leading tokens match kit — base.css:122-131
- ✅ `--color-focus` = `#8FAF9F` — base.css:78 — matches kit
- ✅ `--shadow-sm/md/lg` use cool charcoal rgb(42,42,37,...) — base.css:134-136 — kit compliant
- ✅ Corner radius tokens match kit corner_radius — base.css:107-111
- ✅ No CDN Google Fonts links in any HTML page
- ✅ `--duration-slow` = 700ms — base.css:141 — kit animation_speed: "slow" ✅
- ✅ `--easing-gentle` = `cubic-bezier(0.4, 0, 0.2, 1)` — base.css:142 — kit easing ✅
- ✅ No brand_opposites violations (flashy, neon, playful, fast) detected in design
- ✅ kit.color_rules: washi white backgrounds ✅, celadon for primary CTAs only ✅, ≤2 accent colors per view ✅
- ✅ kit.logo_rules: logo.svg uses only allowed symbols (bamboo stalk, single leaf) — no play button, gear, circuit ✅
- ⚠️ `.feature-card h3` uses `font-weight: 400` — components.css:328 — kit typography_rules say "Headlines are always light-weight (300)" — this is a body-level element technically, but the rule is clear; weight 400 is heavier than 300
- ⚠️ `.faq-item dt` uses `font-weight: 400` — theme.css:377 — kit typography_rules say headlines weight 300; FAQ questions are question-heading level and should likely be 300
- ❌ `.btn-primary:hover` uses raw hex `#7A9E8A` instead of a CSS variable — components.css:222 — token rules: "No raw off-palette hex in component CSS"
- ❌ No `@font-face` declarations anywhere for Cormorant Garamond, Lora, or DM Sans. CSS variables define `font-family` stacks, but there are no WOFF2 files in `css/fonts/` and no CDN link. Fonts render only if installed locally; otherwise falls back to Georgia/Times New Roman/system-ui. Violates new_site.md §8 ("Self-host fonts as WOFF2 and declare them with @font-face + font-display: swap") and kit.performance_rules: "Do not block render with non-critical font loads" implies fonts ARE needed.
- ⚠️ `--color-shadow` defined as `rgb(42, 42, 37, 0.12)` vs kit's `rgba(42, 42, 37, 0.12)` — functionally identical; not a defect
- ✅ Hero SVG uses `--color-tertiary` (#7A9E89 muted sage) as stroke color at low opacity — kit-approved color used appropriately

## Summary
CSS token layer is well-structured and matches the kit's design token schema faithfully. Color, spacing, radius, shadow, and typography role variables all trace correctly to kit values. The brand spirit is respected: muted palette, slow motion, thin strokes, generous whitespace. However, two significant defects prevent a passing score: (1) no self-hosted font loading means Cormorant Garamond, Lora, and DM Sans won't render as intended for most users, fundamentally undermining the typographic brand; (2) a raw off-palette hex in the primary button hover state violates the token architecture rule.
