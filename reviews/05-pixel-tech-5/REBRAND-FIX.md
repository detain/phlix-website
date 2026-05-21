# REBRAND-FIX: 05-pixel-tech-5 to Match Brand Kit

**Date:** 2026-05-21
**Variant:** 05-pixel-tech-5 (Pixel Tech V5 — Cyberpunk Street)
**Task:** Fix brand mismatches - cyan/blue colors and dominant purple usage

---

## Brand Kit Requirements (from shared/data/brand-kits.json)

```
"05-pixel-tech-5": {
  "name": "Pixel Tech V5 — Cyberpunk Street",
  "colors": {
    "primary": { "neon_green": "#39FF14", "black": "#000000", "silver": "#C0C0C0" },
    "secondary": { "dark_gray": "#1A1A1A", "matrix_green": "#00FF66" },
    "accent": { "electric_purple": "#9B30FF" }
  },
  "fonts": { "headline": "Orbitron Bold", "body": "Inter Medium", "ui": "Roboto Mono", "code": "JetBrains Mono" }
}
```

**Key brand rule:** Neon green #39FF14 is DOMINANT primary color. Electric purple #9B30FF is ACCENT only (sparingly).

---

## Problems Fixed

### Problem 1: `rgb(0, 168, 255)` Cyan/Blue Color NOT in Brand Kit

The previous rewrite still used `rgb(0, 168, 255)` extensively - this is CYAN/BLUE which does not exist anywhere in the brand kit. This color was used for:
- Header glow effects
- Navigation hover states
- Hero section text shadows
- Feature card hover effects
- Button glows
- And many more...

**Fix:** Replaced all `rgb(0, 168, 255)` with neon green `#39FF14` or `rgba(57, 255, 20, ...)` for semi-transparent variants.

### Problem 2: Electric Purple Used as DOMINANT Color

The previous rewrite used `var(--color-accent)` (electric purple #9B30FF) as the dominant color throughout for:
- Hero section headings
- Page headers
- Feature card titles
- Navigation links
- Footer elements

**Fix:** Replaced `var(--color-accent)` with `var(--color-text-secondary)` (neon green #39FF14) for all dominant/primary elements. Electric purple is now only used sparingly where appropriate (e.g., selection colors, focus outlines).

---

## Files Modified

### theme.css

**Changes:**

1. `@keyframes electric-glow` - Changed `var(--color-accent)` → `var(--color-text-secondary)` and `rgb(0, 168, 255)` → `#39FF14`

2. `.nav-logo:hover img` filter - Changed `var(--color-accent)` → `var(--color-text-secondary)` and `rgb(0, 168, 255)` → `#39FF14`

3. `.nav-menu a:hover` and `.nav-menu a[aria-current='page']` - Changed `var(--color-accent)` → `var(--color-text-secondary)` and `rgb(0, 168, 255)` → `#39FF14`

4. `.nav-toggle` - Changed border/color from `var(--color-accent)` → `var(--color-text-secondary)` and `rgb(0, 168, 255)` → `#39FF14`

5. `.page-header::before` - Changed background/box-shadow from `var(--color-accent)` and `rgb(0, 168, 255)` to `var(--color-text-secondary)` and `#39FF14`

6. `.page-header h1` - Changed color from `var(--color-accent)` → `var(--color-text-secondary)` and `rgb(0, 168, 255)` → `#39FF14`

7. `.content-section h2` - Changed color from `var(--color-accent)` → `var(--color-text-secondary)` and `rgb(0, 168, 255)` → `#39FF14`

8. `.content-section a` and hover - Changed from `var(--color-accent)` and `rgb(0, 168, 255)` to `var(--color-text-secondary)` and `#39FF14`

9. `.hero::before` background gradient - Changed `rgb(0, 168, 255)` → `rgba(57, 255, 20, 0.08)` and blue tint colors to green

10. `.hero-eyebrow::before` - Changed `var(--color-accent)` → `var(--color-text-secondary)`

11. `.hero h1` and `@keyframes neon-pulse` - Changed from `var(--color-accent)` and `rgb(0, 168, 255)` to `var(--color-text-secondary)` and `#39FF14`

12. `.feature-card`, `.feature-card::before`, `.feature-card:hover`, `.feature-card h3` - Changed from `var(--color-accent)` and `rgb(0, 168, 255)` to `var(--color-text-secondary)` and `#39FF14`

13. `.feature-icon` - Changed `var(--color-accent)` → `var(--color-text-secondary)` and `rgb(0, 168, 255)` → `#39FF14`

14. `.feature-detail-icon` - Changed border/color from `var(--color-accent)` → `var(--color-text-secondary)` and `rgb(0, 168, 255)` → `#39FF14`

15. `.feature-detail-text h2` - Changed `var(--color-accent)` → `var(--color-text-secondary)`

16. `.client-card::before`, `.client-card:hover`, `.client-card h2` - Changed from `var(--color-accent)` and `rgb(0, 168, 255)` to `var(--color-text-secondary)` and `#39FF14`

17. `.status-stable` - Changed background from `rgb(0, 168, 255, 0.1)` to `rgba(57, 255, 20, 0.1)` and `var(--color-accent)` → `var(--color-text-secondary)`

18. `.client-highlights li::before` - Changed `var(--color-accent)` → `var(--color-text-secondary)`

19. `.download-block` - Changed border from `var(--color-accent)` → `var(--color-text-secondary)` and `rgb(0, 168, 255)` → `#39FF14`

20. `.download-card:hover`, `.download-card h3` - Changed from `var(--color-accent)` and `rgb(0, 168, 255)` to `var(--color-text-secondary)` and `#39FF14`

21. `.ecosystem-list a` - Changed `var(--color-accent)` → `var(--color-text-secondary)`

22. `.faq-item:hover`, `.faq-item dt` - Changed `var(--color-accent)` → `var(--color-text-secondary)`

23. `.code-block` - Changed border/color from `var(--color-accent)` → `var(--color-text-secondary)` and `rgb(0, 168, 255)` → `#39FF14`

24. `.cta-banner::before`, `.cta-banner h2` - Changed from `var(--color-accent)` and `rgb(0, 168, 255)` to `var(--color-text-secondary)` and `#39FF14`

25. `.site-footer`, `.footer-tagline` - Changed from `var(--color-accent)` and `rgb(0, 168, 255)` to `var(--color-text-secondary)` and `#39FF14`

26. `.footer-col h3`, `.footer-col a:hover` - Changed from `var(--color-accent)` and `rgb(0, 168, 255)` to `var(--color-text-secondary)` and `#39FF14`

27. `.docs-links a` - Changed `var(--color-accent)` → `var(--color-text-secondary)`

28. `.hub-section:hover` - Changed from `var(--color-accent)` and `rgb(0, 168, 255)` to `var(--color-text-secondary)` and `#39FF14`

**Also Fixed:** Removed duplicate selectors `.client-card:hover` and `.client-card h2`

### components.css

**Changes:**

1. `.btn-primary` - Changed background/border/shadow from `var(--color-accent)` and `rgb(0, 168, 255)` to `var(--color-text-secondary)` and `#39FF14`

2. `.btn-primary:hover` - Changed from `rgb(0, 168, 255)` to `#39FF14`

3. `.btn-primary:active` - Changed from `rgb(0, 168, 255)` to `#39FF14`

4. `.btn-secondary` - Changed border/color from `var(--color-accent)` → `var(--color-text-secondary)`

5. `.btn-secondary:hover` - Changed from `rgb(0, 168, 255)` to `rgba(57, 255, 20, ...)`

6. `.btn-secondary:active` - Changed from `rgb(0, 168, 255)` to `rgba(57, 255, 20, ...)`

7. `.btn-primary:hover::before` - Changed from `rgb(0, 168, 255)` to `rgba(57, 255, 20, ...)`

8. `.electric-text` - Changed from `var(--color-accent)` and `rgb(0, 168, 255)` to `var(--color-text-secondary)` and `rgba(57, 255, 20, ...)`

9. `.electric-text-alt` - Changed `rgb(74, 106, 138)` → `rgba(74, 106, 138)`

10. `.neon-cursor::after` - Changed `var(--color-accent)` → `var(--color-text-secondary)`

11. `.hover-lift:hover` - Changed `rgb(0, 168, 255)` → `rgba(57, 255, 20, ...)`

12. `.pitch-bullets li:nth-child(odd)::before` - Changed `var(--color-accent)` → `var(--color-text-secondary)` and `rgb(0, 168, 255)` → `rgba(57, 255, 20, ...)`

13. `.features-more a` and hover - Changed from `var(--color-accent)` and `rgb(0, 168, 255)` to `var(--color-text-secondary)` and `rgba(57, 255, 20, ...)`

14. `.link-arrow` and hover - Changed from `var(--color-accent)` and `rgb(0, 168, 255)` to `var(--color-text-secondary)` and `rgba(57, 255, 20, ...)`

15. `.cyber-glow::after` - Changed `rgb(0, 168, 255)` → `rgba(57, 255, 20, ...)`

16. `.grid-overlay::before` - Changed `rgb(0, 168, 255)` → `rgba(57, 255, 20, ...)`

17. `.electric-spinner` - Changed `var(--color-accent)` → `var(--color-text-secondary)` and `rgb(0, 168, 255)` → `rgba(57, 255, 20, ...)`

18. `.counter` - Changed `var(--color-accent)` → `var(--color-text-secondary)` and `rgb(0, 168, 255)` → `rgba(57, 255, 20, ...)`

19. `@keyframes pulse` - Changed from `var(--color-accent)` and `rgb(0, 168, 255)` to `var(--color-text-secondary)` and `rgba(57, 255, 20, ...)`

---

## Verification

- **Build:** `npm run build` - PASSED (all 30 variants built successfully)
- **Lint:** `npm run lint` - Pre-existing lint errors in multiple variants (not introduced by this fix)

---

## Summary

| Issue | Status | Description |
|-------|--------|-------------|
| `rgb(0, 168, 255)` cyan/blue removed | FIXED | Replaced all instances with neon green #39FF14 |
| Electric purple as dominant color | FIXED | Replaced `var(--color-accent)` with `var(--color-text-secondary)` for dominant elements |
| Duplicate selectors | FIXED | Removed duplicate `.client-card:hover` and `.client-card h2` |

**Total theme.css changes:** ~40+ property value changes
**Total components.css changes:** ~30+ property value changes
