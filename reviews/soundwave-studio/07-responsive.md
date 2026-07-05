# DIMENSION 7: Responsive

**Score: 65 / 100**
**Severity: ⚠️**

---

## Findings

### ✅ What works well

- **No fixed-px layout widths:** All containers use `max-width` + `padding-inline` or percentage/flex/grid. `theme.css:62-67`, `components.css:26-28`
- **`clamp()` for fluid typography:** Hero h1 `clamp(2.5rem, 5vw, 4rem)`, h2 `clamp(1.75rem, 3.5vw, 2.5rem)`. `base.css:138-140`
- **Fluid grids:** `feature-cards` uses `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`. `theme.css:209-214` No fixed column counts.
- **`auto-fit` in content-grid** allows responsive reflow without media queries. `theme.css:311-315`
- **`max-width: var(--max-width)` on containers** (1600px) with fluid `width: 100%`. `theme.css:62-67`
- **No horizontal scroll at 320px** on index.html: body fills viewport, grid switches to 1 column, hero stacks.
- **CSS spacing scale from kit** used consistently for all padding/margin values.
- **`prefers-reduced-motion` resets** prevent animation jank on reduced-motion devices. `base.css:248-255`
- **Touch-friendly button sizes:** Primary buttons are 48px+ tall. `components.css:292`
- **Content reflows properly at 1920px:** Max-width caps content at 1600px, centering with `margin-inline: auto`. Fluid grids fill remaining space.

### ⚠️ Issues (Recommended Improvements)

1. **Mobile nav breakpoint too wide (1024px instead of 768px):**
   - **File:** `components.css:176` vs `theme.css:321`
   - The hamburger toggle appears at `max-width: 1024px`, but the horizontal nav should only collapse at ~768px. At 1024px on a landscape tablet, the nav links are hidden behind an off-canvas panel with no on-screen affordance to open them (the toggle is visible but users won't know what it does without clicking).
   - **Fix:** Change `components.css:176` `@media (max-width: 1024px)` to `@media (max-width: 768px)`.

2. **`theme.css` overrides `feature-cards` grid to 1 column at 768px:**
   - **File:** `theme.css:335-337` vs `components.css` (no corresponding rule)
   - At 768px, `theme.css` forces `.feature-cards { grid-template-columns: 1fr; }`. This works correctly. However, the `theme.css` breakpoint is `@media (max-width: 768px)` (line 321) which sets `--container-padding`, but the feature-cards rule is NOT inside that media query — it's a separate `@media (max-width: 768px)` at line 335.
   - The cascade means feature-cards become 1 column at 768px (correct), but the container padding change at 321 only affects `.container` elements inside `.hero` (not feature-cards which are in `.features-overview-inner`).
   - **Recommended improvement:** Move all 768px responsive rules into a single `@media (max-width: 768px)` block in `theme.css` to prevent cascade confusion and ensure consistent behavior.

3. **`hero-cta` flex-direction column at 768px creates awkward stacking:**
   - **File:** `theme.css:331-333`
   - Two buttons stacked vertically at 768px each take full width. This is acceptable on phones but could be a "large thumb-friendly" two-column layout at ~375-414px where screen is narrow but height is available.
   - **Recommended improvement:** Consider using `flex-wrap: wrap` with a min-width on buttons so two-column works down to ~400px, single-column only on narrow phones.

4. **No responsive behavior defined at 1440px or 1536px:**
   - Standard 16:9 laptop breakpoints (1366×768, 1440×900, 1536×864) aren't explicitly addressed, though the fluid grid with `auto-fit` handles these gracefully.
   - Not a critical issue; fluid grids handle it.

5. **`font-size: 0.8rem` for `.nav-menu a` at desktop** is smaller than the kit's recommended minimum readable size:
   - **File:** `components.css:155`
   - Nav links use `font-size: 0.8rem` (≈12.8px) at desktop sizes. This meets WCAG 4.5:1 contrast but the kit's accessibility guidance says body text should not drop below ~16px. Nav items are UI labels (acceptable at smaller size per WCAG) but still visually cramped at 1024px+ where nav space is ample.
   - **Recommended improvement:** Increase `.nav-menu a` font size to `0.875rem` (14px) at desktop.

### ❌ Critical Issues (Exact Fix Required)

1. **Broken mobile nav at 768px–1024px viewport width:**
   - **File:** `components.css:176-209`
   - At viewport widths 768px–1024px: the `.nav-toggle` is `display: flex` and visible, the `.nav-menu` is `position: fixed` with `transform: translateX(100%)` (off-screen), and `aria-expanded="false"` on the toggle. The menu is visually hidden and unreachable. Users see a hamburger icon but the underlying nav links (Home, Features, Clients, Download, Plugins, Docs, Hub, About) are completely inaccessible without JavaScript interaction (clicking the toggle). This is a **broken responsive state**.
   - **Exact fix needed:** Change `components.css:176` from `max-width: 1024px` to `max-width: 768px`. Also add the corresponding container-padding change to `theme.css:321` to be consistent. The mobile nav JS (`main.js`) is already correctly wired — the issue is purely CSS breakpoint.

---

## Breakpoint Checklist

| Width | Nav state | Feature cards | Body text | Horizontal scroll |
|-------|-----------|---------------|-----------|-------------------|
| 320px | ✅ Hidden (mobile menu) | ✅ 1 col | ✅ ~16px+ | ✅ None |
| 375px | ✅ Hidden (mobile menu) | ✅ 1 col | ✅ ~16px+ | ✅ None |
| 414px | ✅ Hidden (mobile menu) | ✅ 1 col | ✅ ~16px+ | ✅ None |
| 768px | ⚠️ Breakpoint conflict | ✅ 1 col | ✅ ~16px+ | ✅ None |
| 1024px | ❌ BROKEN — toggle visible, nav inaccessible | ⚠️ Should be multi-col | ✅ | ✅ None |
| 1280px | ✅ Full horizontal nav | ✅ Multi-col auto-fit | ✅ | ✅ None |
| 1920px | ✅ Full horizontal nav | ✅ Multi-col auto-fit | ✅ | ✅ None |
