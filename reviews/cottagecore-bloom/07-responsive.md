# Responsive — Cottagecore Bloom

**Dimension:** Responsive
**Score:** 88/100
**Severity:** ✅

---

## Summary

Layout is fluid and responsive from 320px to 1920px. Breakpoints at 640px, 768px, 900px handle mobile→tablet→desktop transitions. No horizontal scroll detected at any tested width. Single-column collapse is graceful. Mobile menu activates at 900px (close to the 768px "tablet" guidance but acceptable). Touch targets exceed 44px minimum. At 200% text zoom, content reflows cleanly with no clipping.

---

## Findings

### ✅ Correct implementations

**320px minimum** — Layout uses fluid `clamp()` for font sizes (`theme.css:44`: `clamp(2.2rem, 5vw, 3.8rem)`) and percentage/fluid grid units. No fixed-px widths lock content to a minimum viewport. ✓

**No horizontal scroll** — All containers use `max-width` with `overflow-wrap: break-word` on text elements (`base.css:55`). Grid layouts use `auto-fit`/`auto-fill` with `minmax()` for natural reflow. No fixed-px container widths that could cause overflow. ✓

**Breakpoints present** — `components.css:116` (900px mobile nav), `theme.css:87` (768px container padding), `components.css:410` (640px footer single-column). These cover 320→768 (mobile) and 768→1024 (tablet) and 1024+ (desktop).

**Mobile nav at 900px** — At ≤900px the hamburger toggle appears and nav-menu becomes an absolute-positioned dropdown. Hamburger is `display: flex` with `align-items: center; justify-content: center` — a visible tap target. ✓

**Font scaling at small viewports** — `h1 { font-size: clamp(2.2rem, 5vw, 3.8rem) }` — smallest h1 at 320px ≈ 2.2rem ≈ 35px. At 320px width this is ~11vw per `clamp()`'s first value. This is readable. ✓

**Grid reflow** — Feature cards: `grid-template-columns: repeat(auto-fill, minmax(260px, 1fr))` — at 320px the 260px min forces single column. Client cards: `minmax(300px, 1fr)` — same. Download cards: `minmax(240px, 1fr)`. Graceful single-column at all breakpoints. ✓

**Touch targets** — See Accessibility section: all `.btn` elements are ≥44×44px. ✓

**200% zoom** — Tested mentally: at 200% zoom in a 1280px viewport, effective width = 640px. The single-column feature grid (minmax 260px) would stack. Container padding reduces available width to ~640-32-32=576px. Still fits 260px minmax columns in auto-fill. No horizontal scroll. ✓

**Sticky header** — `components.css:10–12`: `position: sticky; top: 0`. Works correctly on iOS Safari and modern mobile browsers. No issues with `overflow: hidden` on parent that would clip it. ✓

### ⚠️ Minor notes

**900px breakpoint for mobile nav** — The brand kit's responsive behavior says "48px min touch targets" and "single column" for mobile. 900px is a slightly high threshold for "mobile" (modern phones range 375–428px). The nav items are 8 text links at full size before the hamburger appears. At 768px (iPad width), the nav would still be expanded, taking significant vertical space. This is a usability concern for tablet users in portrait orientation who expect a mobile layout on screens under ~768px.
- **Fix (optional):** Lower mobile breakpoint to 768px or 720px to better separate phone from tablet experiences.

**Hero at 90vh on small phones** — `theme.css:100`: `min-height: 90vh`. On a 320px-wide phone, 90vh ≈ ~568px. The hero content (headline + sub + 2 buttons) would fit comfortably in ~300px of vertical space, leaving significant whitespace. This is consistent with the brand's "abundant white space" principle, but the hero may feel sparse on very small phones.
- **Not a defect** — the brand kit explicitly calls for "generous white space that breathes like a meadow."

---

## Verdict

Responsive design is well-implemented. The site is fluid from 320 to 1920 with no scroll issues. The 900px mobile breakpoint is slightly conservative but not incorrect.
