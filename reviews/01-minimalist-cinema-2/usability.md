# Usability Review — 01-minimalist-cinema-2

## Findings

### Navigation Usability

**Desktop:**
- ✅ Skip link present with proper focus style (cinema-red outline)
- ✅ ARIA labels on navigation (`aria-label="Primary navigation"`)
- ✅ Current page indicator via `aria-current="page"` + animated underline
- ✅ Proper hover states on nav links (underline animation via `::after`)
- ✅ Logo links to home with descriptive alt text

**Mobile:**
- ✅ Hamburger toggle with `aria-expanded` state management
- ✅ Body scroll locked when menu open (`overflow: hidden`)
- ✅ Focus trap within open menu for keyboard accessibility
- ✅ Escape key closes menu
- ✅ Focus returns to toggle button on close
- ✅ Links close menu on click (good single-page behavior)
- ✅ Resize to desktop (>768px) closes mobile menu
- ⚠️ **Issue**: Hamburger icon only changes color on expand (`[aria-expanded="true"]`), does NOT transform to a close (X) icon — no visual affordance that tapping again will close
- ⚠️ **Issue**: Mobile nav underline animation (`::after`) is hidden via `display: none`, so active page indicator is only color change (`color: var(--color-cinema-red)`) — subtle

### Interaction Patterns

**Smooth Scroll:**
- ✅ `scroll-behavior: smooth` in CSS + JS polyfill
- ✅ `prefers-reduced-motion` respected in CSS (disables animations, `scroll-behavior: auto`)
- ✅ `tabindex="-1"` and `focus({ preventScroll: true })` after scroll for accessibility

**Focus Management:**
- ✅ Global `:focus-visible` with cinema-red outline
- ✅ FAQ buttons have explicit `focus-visible` styles
- ✅ Skip link has proper focus style with outline offset
- ⚠️ **Minor**: No explicit `:focus-visible` on `.nav-toggle` but inherits global style

**JS Structure:**
- ⚠️ **Observation**: The smooth scroll handler binds to `a[href^="#"]` but no in-page anchor links exist on index.html — harmless but unnecessary
- ⚠️ **Observation**: The FAQ accordion initialization sets `dd.setAttribute('hidden', '')` on load even though HTML already has `hidden=""` attribute — no functional issue but redundant

### FAQ Accordion Functionality

The FAQ exists on `about.html` (not `index.html`). Structure: `<dl class="faq-list">` → `<div class="faq-item">` → `<dt><button>` / `<dd hidden>`

- ✅ Proper `aria-expanded` state on buttons
- ✅ `hidden` attribute toggled correctly
- ✅ Accordion behavior (opening one closes others)
- ✅ Visual indicator via border-left accent color
- ✅ Button uses semantic `<button>` element, not div
- ✅ `focus-visible` styles for keyboard navigation

### User Flow

- ✅ Proper heading hierarchy (h1 hero → h2 sections → h3 cards)
- ✅ Skip link for keyboard/screen reader users
- ✅ Multiple clear CTAs ("Get Phlix", "Read the docs", "Download")
- ✅ Footer with organized navigation columns
- ✅ `aria-labelledby` on sections referencing headings
- ✅ Meta viewport and theme-color for mobile browsers
- ✅ Web app manifest linked for PWA capability

## Score: 87/100

**Deductions:**
- -5: Mobile hamburger lacks close icon transformation (only color change)
- -3: Mobile nav active page indicator is subtle (only color, no position/underline)
- -3: FAQ initialization could be cleaner (redundant hidden attribute set)
- -2: No explicit focus-visible style on nav-toggle button

## Pass/Fail: PASS

The variant demonstrates solid accessibility fundamentals and keyboard navigation. The mobile nav works correctly but could benefit from clearer close affordance. The FAQ accordion is well-implemented with proper ARIA states.
