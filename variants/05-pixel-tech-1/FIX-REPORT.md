# Fix Report — 05-pixel-tech-1

## Critical Issues Fixed

### 1. Mobile Nav Focus Trap (WCAG 2.1 Level A)

**Problem:** The mobile nav dialog had `aria-modal="true"` but no JS focus trap. Keyboard users could Tab out of the modal into background content.

**Fix applied to `variants/05-pixel-tech-1/js/main.js`:**
- Added a `keydown` listener on the nav element that intercepts Tab/Shift+Tab
- When nav is open, focus cycles within the modal:
  - Tab from last focusable element → wraps to first
  - Shift+Tab from first focusable element → wraps to last
- Focusable elements targeted: `a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])`

**Before (lines 69-73):**
```javascript
// Close when clicking a link
const mobileLinks = nav.querySelectorAll('a');
mobileLinks.forEach(function(link) {
  link.addEventListener('click', closeNav);
});
```

**After (lines 69-87):**
```javascript
// Focus trap: keep Tab/Shift+Tab within the open nav
nav.addEventListener('keydown', function(e) {
  if (e.key !== 'Tab') return;

  const focusable = nav.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

// Close when clicking a link
const mobileLinks = nav.querySelectorAll('a');
mobileLinks.forEach(function(link) {
  link.addEventListener('click', closeNav);
});
```

### 2. README.md Variant Slug

**Problem:** Line 17 showed `pixel-tech-1` as the link text but the directory is `05-pixel-tech-1`. The directory link and GitHub Pages preview URL were correct, but the displayed text was inconsistent.

**Fix applied to `README.md` line 17:**
- Changed link text from `pixel-tech-1` to `05-pixel-tech-1`
- Directory path and preview URL were already correct

**Before:**
```markdown
| 05 | [`pixel-tech-1`](variants/05-pixel-tech-1/) | Pixel→Smooth | Cyberpunk, developer-energy, neon green + black | https://detain.github.io/phlix-website/05-pixel-tech-1/ |
```

**After:**
```markdown
| 05 | [`05-pixel-tech-1`](variants/05-pixel-tech-1/) | Pixel→Smooth | Cyberpunk, developer-energy, neon green + black | https://detain.github.io/phlix-website/05-pixel-tech-1/ |
```

## Files Changed

| File | Change |
|------|--------|
| `variants/05-pixel-tech-1/js/main.js` | Added focus trap for mobile nav |
| `README.md` | Fixed variant slug in variant table (line 17) |

## Verification

Both critical issues are now resolved:
- Mobile nav now traps focus when open, preventing Tab from escaping to background content
- README.md now correctly references `05-pixel-tech-1` in the variant listing
