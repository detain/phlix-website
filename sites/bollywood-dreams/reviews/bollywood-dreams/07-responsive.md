# Responsive

**Score: 87/100**  
**Severity: ⚠️**

## Findings

### ⚠️ WARNING: Hero loses full-viewport height at 768px breakpoint (theme.css:940–943)
At `width <= 768px`, `.hero { min-height: auto; padding-block: var(--space-12); }` — the hero section is no longer viewport-height. This is intentional responsive behavior but means the "hero above the fold" CTA layout may shift on tablets (768px). The primary CTA is still visible but the grand cinematic hero effect is reduced.

This is acceptable per the brand kit's mobile responsive behavior guidance, but worth documenting.

### ⚠️ WARNING: Body text may drop below 16px on small phones (base.css:126)
`--text-base: clamp(1rem, 0.95rem + 0.25vw, 1.0625rem)` — at 375px width: `0.95rem + 0.009375rem ≈ 0.959rem ≈ 15.3px`. At 320px: approximately `1.0rem`. The spec requires "Body text never drops below ~16px on phones."

**Fix:** Adjust lower clamp bound to `clamp(1rem, 0.9rem + 0.5vw, 1.0625rem)` to ensure 16px minimum at all widths.

### ⚠️ WARNING: No horizontal scroll at any breakpoint — verified
All containers use `max-width` + `padding-inline` pattern, `box-sizing: border-box` reset, and fluid grid templates. No `overflow-x: auto` on page wrappers. At 320px, 375px, 414px, 768px, 1024px, 1280px, 1920px no horizontal scrollbar appears.

This is confirmed PASS but marked as ongoing monitoring needed.

### ⚠️ WARNING: Mobile nav at 320px — full-width menu covers entire screen
At 480px and below, `.nav-menu { width: 100%; }` (components.css:237). The menu becomes a full-width overlay from top (header-height) to bottom. This is correct behavior per brand kit mobile nav spec. The toggle button stays visible at top-right. No entrapment.

### ⚠️ WARNING: Feature grid goes single-column at 768px (theme.css:963–965)
`.feature-grid { grid-template-columns: 1fr; }` at 768px breakpoint. All 8 feature cards stack vertically, which is correct for mobile. However, the feature-grid on index.html only shows 7 items (missing hub) — this affects the mobile stacked layout too.

## What Passed

- ✅ Responsive breakpoints at 1024px, 768px, 480px, 900px (mobile nav) all functional
- ✅ Grid columns collapse properly: 4-col → 2-col at 1024px; 3-col → 2-col at 1024px; 2-col/3-col/4-col → 1-col at 768px
- ✅ Hero actions stack vertically at 480px (theme.css:989–997): `flex-direction: column; align-items: center;`
- ✅ Container padding shrinks from 24px to 16px at 480px
- ✅ Nav toggle appears at 900px (components.css:180)
- ✅ Mobile menu: full-width slide-in at ≤480px (components.css:237), partial 280px at 481–900px (components.css:189)
- ✅ No horizontal scroll at 320, 375, 414, 768, 1024, 1280, 1920px
- ✅ Font sizes fluid with clamp() — no fixed px values that could cause overflow
- ✅ `overflow-wrap: break-word` on all text containers (base.css:45–46)
- ✅ Images: `max-width: 100%` + `display: block` (base.css:22–29) prevents overflow
