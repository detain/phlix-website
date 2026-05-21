# Usability Review: 03-retro-film-reel-3 (Film Noir)

**Reviewer:** Usability Reviewer (Wave 3)
**Variant:** `03-retro-film-reel-3` — Film Noir Theme
**Files Reviewed:** `index.html`, `js/main.js`, `css/base.css`, `css/theme.css`, `css/components.css`

---

## Summary

The Film Noir variant delivers a distinctive, high-contrast aesthetic with committed noir styling. Navigation is mostly solid, accessibility is well-implemented, and motion respects user preferences. However, one JavaScript bug and a few minor issues warrant attention.

**Overall Rating: ⚠️ Good with fixes needed**

---

## 1. Navigation & Interactive Elements

### ✅ Strengths
- **Skip link** is present, styled, and functional (`base.css` lines 158-179)
- **Mobile nav toggle** is 44×44px minimum touch target (`components.css` line 24-25)
- **Focus trap** correctly implemented in mobile nav with Shift+Tab循环 (`main.js` lines 46-60)
- **Escape key** closes mobile nav and returns focus to toggle (`main.js` lines 36-43)
- **Click outside** closes mobile nav (`main.js` lines 63-69)
- **aria-expanded** is properly toggled on nav toggle

### ⚠️ Issues

| Issue | Location | Severity | Description |
|-------|----------|----------|-------------|
| Header shadow bug | `main.js:182-186` | Medium | `initHeaderScroll()` sets **identical** box-shadow for both `> 100px` and `≤ 100px` scroll states. Shadow never changes. |
| Mobile menu z-index | `theme.css:352` | Low | Menu has `z-index: 99` but `header` has `z-index: 100`. Menu can appear behind header if header gains a background. |

### 🔧 Recommended Fix

**Header shadow bug** (`main.js` lines 179-187):
```javascript
// Current (broken):
if (currentScroll > 100) {
  header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
} else {
  header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)'; // IDENTICAL!
}

// Should be:
if (currentScroll > 100) {
  header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.7)';
} else {
  header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
}
```

---

## 2. Accessibility (a11y)

### ✅ Strengths
- Semantic HTML5 structure with proper `header`, `main`, `footer`, `nav` landmarks
- `aria-label` on navigation elements (`index.html` lines 62, 66)
- `aria-current="page"` on active nav link
- Focus management after nav open/close (focuses first item on open, toggle on close)
- `tabindex="-1"` on main content for skip-link target
- `:focus-visible` styled distinctly from `:focus` (`base.css` lines 182-189)
- **Reduced motion respected** via `prefers-reduced-motion: reduce` media query (`base.css` lines 95-107)

### ⚠️ Issues

| Issue | Location | Severity | Description |
|-------|----------|----------|-------------|
| Stagger delay timing | `main.js:168` | Low | Feature cards use `transitionDelay: index * 0.1s`. With 8 cards, last card waits 0.7s before animating. May feel slow to some users. |

---

## 3. Motion & Animation

### ✅ Strengths
- **Staggered entrance animations** using IntersectionObserver (`main.js` lines 122-171)
- **Typewriter effect** implemented (`main.js` lines 96-118) — though not currently applied to any element in HTML
- **Shadow play** keyframe animation available (`components.css` lines 358-369)
- **Reduced motion preference** fully respected — all animations disabled, elements shown immediately (`main.js` lines 135-143)
- **Smooth scroll** with focus update for accessibility (`main.js` lines 74-92)
- **No gratuitous animation** — motion serves purpose (entrance reveal, state feedback)

### ⚠️ Issues

| Issue | Location | Severity | Description |
|-------|----------|----------|-------------|
| Typewriter not applied | `index.html` | Low | `initTypewriter()` function exists but no `.typewriter` class is used in HTML. Dead code. |
| No entrance animation for hero | — | Low | Hero section has no staggered animation unlike feature cards. Inconsistent entrance experience. |

---

## 4. Visual Design & Layout

### ✅ Strengths
- **Distinctive typography**: Oswald (headlines), Lora (body), Courier New (code) — avoids generic defaults
- **Bold color commitment**: Single amber accent (#D4763B) against noir black (#0D0D0D)
- **Film grain texture**: Repeating-linear-gradient overlay creates noir atmosphere
- **Ambient lighting**: Radial gradients in hero section add depth
- **Dramatic shadows**: Hard offset shadows (e.g., `4px 8px 0 rgba(0,0,0,0.8)`) reinforce noir theme
- **Self-hosted fonts**: No CDN dependency for fonts
- **Fluid typography**: Uses `clamp()` for responsive text scaling

### ⚠️ Issues

| Issue | Location | Severity | Description |
|-------|----------|----------|-------------|
| Code font is generic | `base.css:39` | Low | `--font-code: 'Courier New', monospace` — Courier New is common but acceptable for code |
| `hero-sub` line-height | `components.css:178` | Low | `line-height: 1.8` combined with serif font may feel too spaced at large sizes |

---

## 5. Color & Contrast

### ✅ Strengths
- **Primary text**: #FAFAFA (noir-white) on #0D0D0D (noir-black) — excellent contrast (~19:1)
- **Muted text**: #9A9A9A on #0D0D0D — passes WCAG AA at 4.5:1+
- **Accent color**: #D4763B (amber) used sparingly and effectively
- **Focus indicators**: 2px solid amber with 2px offset — visible but not obtrusive

### ⚠️ Issues

| Issue | Location | Severity | Description |
|-------|----------|----------|-------------|
| Footer muted link contrast | `theme.css:178` | Low | `color: var(--color-text-muted)` (#9A9A9A) on alt background (#1A1A1A) may not meet 4.5:1 for small text |

---

## 6. Responsive Design

### ✅ Strengths
- **Fluid grid**: Uses `clamp()` throughout
- **Breakpoints**: Uses `width >= 768px` and `width <= 900px` (modern syntax)
- **Container max-width**: 1200px with auto margins
- **Mobile-first nav**: Hidden toggle at desktop, slide-in menu at mobile

### ⚠️ Issues

| Issue | Location | Severity | Description |
|-------|----------|----------|-------------|
| Nav menu transition | `theme.css:349-350` | Low | Uses `transform: translateX(-100%)` for slide-in, but on very small screens the header height variable (`72px`) may not account for all browser chrome |

---

## 7. Performance

### ✅ Strengths
- **IntersectionObserver** for scroll-based animations (not scroll event listener)
- **Passive event listener** for scroll (`main.js` line 187)
- **CSS containment**: Animations use transform/opacity (GPU-accelerated)
- **No jQuery**: Native JS only
- **Font-display: swap**: Prevents FOIT

### ⚠️ Issues

None significant. The codebase demonstrates good performance practices.

---

## 8. Browser Support Edge Cases

### ✅ Handled
- **IntersectionObserver fallback**: If undefined, cards show immediately (`main.js` lines 125-131)
- **prefers-reduced-motion**: Full fallback for older browsers
- **CSS custom properties**: Decent browser support, no IE11 concern mentioned

### ⚠️ Issues

| Issue | Location | Severity | Description |
|-------|----------|----------|-------------|
| `width` media query syntax | `theme.css:138` | Low | Uses `width >= 768px` which is newer syntax. Not supported in Safari <16.4. May need fallback for older Safari. |

---

## Priority Fixes

1. **High Priority**: Fix header scroll shadow bug (`main.js:182-186`)
2. **Medium Priority**: Add entrance animation to hero section
3. **Low Priority**: Remove unused typewriter code or apply to an element
4. **Low Priority**: Consider adding footer link hover underline always (not just on hover)

---

## Pillar Compliance Checklist

| Pillar | Status | Notes |
|--------|--------|-------|
| **Typography** | ✅ Pass | Distinctive Oswald + Lora pairing. No generic system fonts. |
| **Color** | ✅ Pass | Bold noir palette with single amber accent. High contrast. |
| **Motion** | ⚠️ Partial | Good motion design but one dead-code function and no hero animation. |
| **Space** | ✅ Pass | Generous spacing, clear hierarchy, responsive grid. |
| **Depth** | ✅ Pass | Film grain, ambient gradients, dramatic shadows, layered surfaces. |

---

## Conclusion

The 03-retro-film-reel-3 variant demonstrates strong commitment to the Film Noir aesthetic with distinctive typography, bold color choices, and atmospheric depth. Accessibility is well-implemented with proper ARIA, focus management, and reduced-motion support. The single critical bug (header scroll shadow) is minor in visual impact but should be fixed for code correctness. Motion design is solid overall with minor cleanup needed.

**Recommendation: Approve with required fixes**
