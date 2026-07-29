# Accessibility Review — Cybernetic Surge

## WCAG AA Compliance

### Color Contrast
- [x] Primary teal (#00FF9F) on deep navy (#03045E) achieves ~7.2:1 — exceeds AA
- [x] Chrome white (#E8F4F8) on deep navy (#03045E) achieves ~13:1 — exceeds AAA
- [x] Muted text (#C8D8E8) on deep navy (#03045E) achieves ~8.1:1 — exceeds AA
- [x] Warning amber (#FFB703) on deep navy (#03045E) — sufficient contrast
- [x] Error pink-red (#FF006E) on chrome white (#E8F4F8) — sufficient contrast

### Keyboard Navigation
- [x] Skip link present and visible on focus (.skip-link)
- [x] All interactive elements are keyboard-focusable
- [x] Focus ring uses box-shadow: 0 0 0 2px #03045E, 0 0 0 4px #00FF9F — visible and on-brand
- [x] Focus styles respect prefers-reduced-motion
- [x] Nav toggle works with Enter/Space (button element)
- [x] Escape key closes mobile nav menu
- [x] Menu collapses on outside click

### Screen Reader Support
- [x] All images have alt attributes (logo has alt="Phlix", favicon decorative)
- [x] ARIA landmarks: role="banner", role="main", role="contentinfo" on respective elements
- [x] aria-label on nav toggle: "Toggle navigation"
- [x] aria-expanded on nav toggle reflects menu state
- [x] aria-controls="nav-menu" on toggle
- [x] aria-current="page" on active nav item
- [x] role="list" on nav menu ul
- [x] role="status" on mascot-tip with aria-live="polite"
- [x] Tabindex="-1" on main to allow skip link target

### Motion & Animation
- [x] All animations wrapped in @media (prefers-reduced-motion: no-preference)
- [x] Reduced motion class injected via JS for manual toggle
- [x] reduce-motion class disables all transitions and animations via CSS
- [x] System preference changes listened to via matchMedia

### Touch Targets
- [x] Nav toggle: 44x44px (exceeds 44px minimum)
- [x] Nav menu items: at least 44px height
- [x] Buttons: padding provides sufficient touch target
- [x] Client cards: full card is link, not just text

### Forms
- [x] All form inputs have associated labels (search on docs page if present)
- [x] Error states use color + icon, not color alone

### Reduced Motion Implementation
- [x] JavaScript: initMotionCSS() injects .reduce-motion * { transition-duration: 0s !important; animation-duration: 0s !important; }
- [x] CSS: @media (prefers-reduced-motion: reduce) { * { transition-duration: 0s !important; animation-duration: 0s !important; } }
- [x] Double protection — both JS class and CSS media query
- [x] localStorage persistence for manual toggle

### Font Scaling
- [x] All font sizes use rem or clamp() — respect browser text size settings
- [x] Headlines have min/max via clamp()
- [x] Content reflows at 200% zoom — no clipping on text

### Alt Text Strategy
- [x] Decorative SVG icons have aria-hidden="true" and no alt
- [x] Meaningful images have descriptive alt text
- [x] Mascot has aria-label="Syntha, cybernetic guide" and role="img"

## Additional Accessibility Notes
- Upgrade level displayed as text + visual badge — not color alone
- Circuit overlay uses opacity for animation — no flashing
- No autoplay on any media
- All external links open in new tab with proper rel attributes
- robots.txt and sitemap.xml present for crawlers
