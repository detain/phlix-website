# Responsive

## Score: 94/100

## Findings
- ✅ Media query at ≤768px collapses nav to hamburger — components.css:79 — `.nav-toggle { display: flex }` and `.nav-menu { display: none; position: absolute... }`
- ✅ Mobile menu opens/closes correctly with `is-open` class toggle — components.css:100-102
- ✅ Footer nav at ≤600px goes to single column — components.css:178-183: `grid-template-columns: 1fr`
- ✅ hero-cta at ≤768px goes to column — components.css:687-690: `flex-direction: column; align-items: center`
- ✅ `overflow-x: hidden` not needed — fluid containers with `max-width` + `margin-inline: auto` prevent horizontal scroll
- ✅ `.container { width: 100%; max-width: var(--content-width); margin-inline: auto; padding-inline: var(--gutter) }` — theme.css:89-94 — fluid at all widths
- ✅ Font sizes use `clamp()` throughout — fluid type no clipping at any breakpoint
- ✅ `.hero { min-height: 90vh }` on desktop, `min-height: 80vh` on mobile — components.css:144, 680
- ✅ `.content-section { padding-block: var(--space-18) }` → `var(--space-12)` on mobile — components.css:696-698
- ✅ `.feature-cards { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) }` → `grid-template-columns: 1fr` at ≤480px — components.css:707-709
- ✅ `.client-cards { grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) }` → `grid-template-columns: 1fr` at ≤480px — components.css:711-713
- ✅ `.download-cards` similarly collapses to single column at ≤480px — components.css:715-717
- ✅ `.feature-detail` uses responsive grid at ≥768px — theme.css:353-359 — single column below
- ✅ `.docs-links { grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)) }` — naturally responsive
- ✅ `--gutter: clamp(var(--space-6), 4vw, var(--space-12))` — base.css:148 — fluid horizontal padding
- ✅ `.pitch-bullets { max-width: 640px; margin-inline: auto }` — theme.css:227-228 — centered, fluid
- ⚠️ `.nav-toggle` at 36×36px (components.css:38 — `padding: var(--space-2)`) is below the 44×44px WCAG touch target minimum, confirmed under the Accessibility dimension. Not an additional defect here — same issue.
- ✅ No fixed-px layout widths — all fluid with clamp/max-width/rem

## Summary
Responsive implementation is thorough. Nav collapses to hamburger at 768px, footer goes to single column at 600px, hero CTA stacks vertically at 768px, card grids collapse to single column at 480px, and font sizes are fluid at all widths. No horizontal scroll at any tested breakpoint. The only issue flagged is the undersized mobile nav toggle (36×36px, same defect noted in Accessibility). Score 94/100 — one shared defect, otherwise excellent.
