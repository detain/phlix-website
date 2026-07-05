# Usability Review — Stardust Observatory

**Variant**: stardust-observatory
**Round**: 1
**Reviewer**: Senior Front-End Reviewer
**Date**: 2026-07-04

## Score

- **Usability**: 91 / 100

## ✅ Passed

- **Primary goal reachable in ≤2 clicks from home**: index.html hero "Get Phlix" CTA → download.html (1 click). No other pages in the path. Download page has server + clients + ecosystem sections.
- **Mobile nav fully functional**: `.nav-toggle` appears at ≤900px (components.css:111), toggles `.is-open` class, syncs `aria-expanded` (js/main.js:20-22), closes on Escape keydown (js/main.js:31-38), closes on outside click (js/main.js:40-50). Focus is trapped and returned to toggle on close. No accessibility traps.
- **No forced flows or traps**: No modal stacks, no mandatory email gates, no surprise redirects. All 8 pages accessible from nav, footer, and inline links without forced progression.
- **Clear primary action on every page**: Every page terminates in a `.cta-banner` section with a prominent primary CTA. Home: "Download Phlix"; features: "Download Now"; clients: "Download Now"; download: "Read the docs" (secondary appropriate here); plugins: "Get the example plugin"; docs: "Read the docs"; hub: "Get started"; about: link to download.
- **Download button visible above fold on home**: index.html hero contains `.btn.btn-primary.btn-large` "Get Phlix" at line 90, within the `.hero-inner` container that is `max-width: 760px, padding: var(--space-16) var(--space-6)`. With a viewport of 1024×768 the hero CTA is well above the fold.
- **Brand consistency across all 8 pages**: Confirmed against stardust-observatory.js brand kit:
  - **Colors**: Midnight Navy (#0D1B2A) background, Constellation Gold (#C9A84C) primary CTA, Nebula Violet (#7B5EA7) used for nebula bloom gradients, Telescope Brass (#B07D3A) secondary accents, Dome Parchment (#EDE4CC) text — all on-palette
  - **Typography**: Playfair Display headings (headline role), Lora body text, Jost UI labels — all from the kit's font stack
  - **Shapes**: 4px/8px/16px radius scale, 1px Brass Filigree borders, soft rounded rectangles on cards — matches kit's `corner_radius` spec
  - **Motion**: `ease-in-out` and `cubic-bezier(0.25, 0.1, 0.25, 1.0)` easing, slow celestial animations (star-breath 8s loop), hover cards glow + lift 3px — consistent with kit's `motion_style: ["Celestial", "Slow", "Purposeful", "Luminous"]`
  - **Iconography**: Thin-stroke (1.5px) outlined SVG icons, parchment-on-navy default, gold duotone for featured actions — matches kit's `icon_rules`
  - **Spacing scale**: Uses `--space-*` CSS variables from the kit's scale (4, 8, 12, 16, 24, 32, 48, 64, 96px)

## ⚠️ Concerns (non-blocking)

- **Nav menu slides in from left with translateX(-100%)** — components.css:125-132 — On mobile, the menu slides from left to right (translateX 0 when open). This is a minor convention mismatch: most mobile menus slide from right. It's not a failure — the behavior is clearly communicated via aria-expanded — but could surprise users habituated to right-side drawers. — *Low impact; convention preference, not a blocker*
- **Hero CTA pair uses `.btn-large` class (min-height: 52px)** — components.css:294-298 — At mobile widths the hero CTA stacks vertically (theme.css:518-521) with `.hero-cta { flex-direction: column }`. The buttons become full-width stacked items, which is good for touch. However, the spec calls for "Download button visible above fold" and at very small viewports (320px) with 200% text zoom, two full-width 52px buttons stacked could push content slightly below fold. — *Low risk; the primary CTA remains reachable*
- **`touch-action: manipulation` not explicitly set** — js/main.js:91-97 uses `touchend` + `preventDefault()` to prevent double-tap zoom. This is a valid technique but applying it to ALL `button, a, input, select, textarea` elements (including form inputs) may interfere with native scroll/zoom on input fields. — *Low risk in practice for a marketing site with no forms; benign*

## ❌ Failures (must fix this round)

- **None** — No Nielsen heuristic violations. Primary CTA is reachable in 1 click, nav works correctly, no traps, no forced flows, and all pages maintain strong brand consistency.

## Recommendations (ranked by impact)

1. **Add `touch-action: manipulation`** to interactive elements via CSS instead of JS touchend interception (impact: low, effort: medium) — The current JS approach of intercepting `touchend` and calling `preventDefault()` + `click` on all interactive elements (js/main.js:91-97) is a broad hammer. A CSS-based `touch-action: manipulation` on buttons and links would be more targeted and avoid potential interference with form inputs.
2. **Consider right-side mobile menu drawer** (impact: low, effort: medium) — Slide-in from right is the more common pattern in mobile UIs. Changing `.nav-menu` from `inset: 65px 0 0` + left-positioned to right-side would improve convention alignment.

## Evidence

- All 8 pages reviewed: index.html (226 lines), features.html (193), clients.html (184), download.html (151), plugins.html (122), docs.html (122), hub.html (120), about.html (141)
- Mobile nav JS: js/main.js:15-51 — full toggle, escape, outside-click implementation
- Responsive behavior verified in: components.css:111 (≤900px mobile menu), theme.css:509 (≤768px stack layout), theme.css:540 (≤480px single column)
- Brand kit palette verified against CSS custom properties in base.css:49-66
- Font tokens verified in base.css:105-109 (--font-headline, --font-body, --font-ui, etc.)
- Touch target sizes verified: components.css:235 (.btn { min-height: 44px }), components.css:47-48 (.nav-toggle { width: 44px; height: 44px })
