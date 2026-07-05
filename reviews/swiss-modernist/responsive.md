# DIMENSION 7: Responsive Review — Swiss Modernist Site

## Score: 68 / 100

---

## Breakpoint Coverage

| Viewport | Grid | Status | Location |
|----------|------|--------|----------|
| 1400px+ (desktop) | 12-column | ✅ | `theme.css:112-116` |
| 1024px–1399px | 12-column | ✅ | Default (no breakpoint needed) |
| 768px–1023px (tablet) | **8-column (not implemented)** | ❌ | Missing |
| 320px–767px (mobile) | 1-column | ✅ | `theme.css:814-876` |

### ❌ Critical Gap: No Tablet (8-column) Grid

The brand kit spec (`responsive_behavior.tablet`) explicitly requires an **8-column grid** at the tablet breakpoint with sidebar collapse:

> "8-column grid. Sidebar collapses to hidden off-canvas with hamburger trigger (Ink Black icon). Touch targets 48px minimum."

`new_site.md §14` also confirms:

> "Probe at **320, 375, 414, 768, 1024, 1280, 1920**."

The site has only two media queries in `theme.css` affecting layout:
- `@media (max-width: 1024px)` — only adjusts `.hero-content` and `.hero-visual` column spans
- `@media (max-width: 768px)` — collapses to single-column

**At 768px–1024px (tablet range):**
- The 12-column grid remains active with no adjustments
- Pitch list stays at `repeat(auto-fit, minmax(280px, 1fr))` — works but could be tighter
- Features grid, client cards, and download cards all remain at their default multi-column state
- Navigation remains the full desktop topbar (no hamburger), which is **correct** — but the grid doesn't adapt to a more condensed 8-column form

This violates the brand kit's explicit `responsive_behavior.tablet` contract.

---

## Horizontal Scroll Check

| Width | Horizontal Scroll? | Notes |
|-------|-------------------|-------|
| 320px | None | ✅ |
| 375px | None | ✅ |
| 414px | None | ✅ |
| 768px | None | ✅ |
| 1024px | None | ✅ |

All tested widths clear. `overflow-wrap: break-word` on headings (`base.css:35-36`) prevents overflow.

---

## Grid Collapse Behavior

### 320px–767px (Mobile)
```
Hero           → flex-column, visual hidden       ✅ theme.css:819-831
Pitch list     → 1-column                          ✅ theme.css:833-835
Features grid  → 1-column                          ✅ theme.css:837-838
Client cards   → 1-column                          ✅ theme.css:838-839
Download cards → 1-column                          ✅ theme.css:839-840
Content grid   → 1-column                          ✅ theme.css:843-845
Ecosystem items → stacked (1-column)              ✅ theme.css:854-857
```

---

## Sticky Navigation
| Check | Status | Location |
|-------|--------|----------|
| Header is `position: sticky` | ✅ | `components.css:148-154` |
| `z-index: var(--z-sticky)` = 200 | ✅ | `base.css:139` |
| Hero has `overflow: hidden` (no content bleed) | ✅ | `theme.css:159` |
| Mobile nav menu positioned `top: 64px` (below header) | ✅ | `components.css:247` |
| Sticky header survives 200% zoom | ✅ | Header height is fixed 64px, content scrolls |

---

## Touch Targets at Mobile
| Element | Size | Required | Status |
|---------|------|----------|--------|
| `.btn` | 44px min-height | ≥44px | ✅ `components.css:26` |
| `.nav-toggle` | 44×44px | ≥44px | ✅ `components.css:190-191` |
| Nav links on mobile | `padding: var(--space-4) var(--space-6)` | ≥44px | ✅ `components.css:261` |
| Pitch items | Full-block click | ≥44px | ✅ `theme.css:265-279` |

---

## Body Text Readability at 320px
| Check | Status | Notes |
|-------|--------|-------|
| Body text never below ~16px | ✅ | `--text-base: 16px` in `base.css:110` |
| Line height: 1.6 for body | ✅ | `base.css:152` |
| Max-width on body text (65ch) | ✅ | Prevents long lines on wide screens |
| Mobile font scale: h1 → 48px | ✅ | `theme.css:847` |
| Mobile font scale: h2 → 32px | ✅ | `theme.css:848` |
| Mobile font scale: h3 → 24px | ✅ | `theme.css:849` |

---

## Severity Summary

| Check | Severity | Location |
|-------|----------|----------|
| 12-col desktop grid | ✅ Pass | `theme.css:112-116` |
| 8-col tablet grid | ❌ Missing | No `@media (max-width: 1024px)` grid adaptation |
| 1-col mobile grid | ✅ Pass | `theme.css:814-876` |
| No horizontal scroll | ✅ Pass | All viewports clear |
| Readable body text on phones | ✅ Pass | 16px base, 1.6 line-height |
| Sticky nav | ✅ Pass | `components.css:148-154` |
| Touch targets ≥44px | ✅ Pass | All mobile touch targets 44px+ |
| 200% zoom survives | ✅ Pass | Fluid + clamp() typography |

**Score: 68/100 — Mobile-first layout is solid. Critical gap: the brand-kit-mandated 8-column tablet grid is not implemented. At 768px–1024px the site uses the full 12-column desktop grid without adaptation.**
