# Readability Review: 04-portal-hub (base)

**Review Date:** 2026-05-21
**Variant:** 04-portal-hub (base, no wave number)

---

## Summary

| Criterion | Status | Notes |
|-----------|--------|-------|
| Font size (body min 16px) | :warning: Issues found | Several elements below 16px |
| Line height (body 1.5+) | :white_check_mark: Pass | Body line-height 1.6 |
| Contrast | :white_check_mark: Pass | Contrast ratios appear sufficient |
| prefers-reduced-motion | :warning: Partial | Smooth scroll not disabled |
| Motion safety | :warning: Partial | JS scroll-reveal not blocked |
| Line length | :white_check_mark: Pass | Constrained to readable widths |
| Paragraph spacing | :white_check_mark: Pass | Proper spacing scale in use |

---

## Findings

### 1. Font Size Compliance — :warning: Medium Severity

Several text elements fall below the 16px minimum for body text:

| Element | Selector | Size | Location |
|---------|----------|------|----------|
| Feature card body | `.feature-card p` | 0.9rem (14.4px) | theme.css:290 |
| Footer links | `.footer-col a` | 0.9rem (14.4px) | theme.css:521 |
| Footer copyright | `.footer-copy` | 0.875rem (14px) | theme.css:531 |
| Client highlight items | `.client-highlights li` | 0.9rem (14.4px) | theme.css:377 |

**Recommendation:** Increase these to minimum 1rem (16px) for better readability, especially for footer and card content which users frequently read.

---

### 2. Line Height Compliance — :white_check_mark: Pass

| Element | Line Height | Location |
|---------|-------------|----------|
| body | 1.6 | base.css:19 |
| .hero-sub | 1.7 | theme.css:135 |
| .feature-card p | 1.6 | theme.css:292 |
| .faq-item dd | 1.7 | theme.css:473 |

All body text exceeds the 1.5 minimum.

---

### 3. Contrast Compliance — :white_check_mark: Pass

- Primary text (`#ffffff`) on background (`#0a0f1f` / `#08101c`) — excellent contrast
- Secondary text (`#7ff6ff` soft cyan) on dark backgrounds — approximately 9.5:1 ratio, passes WCAG AA
- Navigation text (`#7ff6ff`) at 0.9rem may be borderline; consider increasing font size if contrast is a concern

---

### 4. prefers-reduced-motion Compliance — :warning: Medium Severity

**CSS coverage (good):**
- `base.css:146-155` — Disables all animations and transitions, sets scroll-behavior to auto
- `components.css:380-394` — Disables portal ring, neon text, gradient, and stagger animations

**JavaScript coverage (partial):**
- `main.js:39` — Parallax disabled via `window.matchMedia` check
- `main.js:132-137` — Sets `--transition-base` to 0.01ms

**Issues found:**
1. **Smooth scroll not disabled for reduced motion** — `base.css:13` sets `scroll-behavior: smooth` but the reduced motion media query at `base.css:146-155` does NOT reset this to `auto`. The `scroll-behavior: auto !important` is present but `scroll-behavior` property on `html` element is not targeted.

2. **JS scroll-reveal not blocked** — The IntersectionObserver-based reveal at `main.js:59-75` runs regardless of reduced motion preference. Elements start with `opacity: 0` and animate in, which could cause issues for reduced motion users who never see them revealed if the animation is disabled but the initial hidden state remains.

---

### 5. Motion Safety — :warning: Medium Severity

**Continuous animations present:**
- `portal-rotate` — 3s and 2s infinite rotation (components.css:116-124, 199-200, 210)
- `portal-pulse` — 2s infinite pulse on center (components.css:126-137, 221)
- `neon-flicker` — 4s infinite text shadow flicker (components.css:139-159, 237)
- `float` — 3s infinite translateY (components.css:161-170)
- `gradient-shift` — 8s infinite background position (components.css:274-286, 296)

**JavaScript-driven motion:**
- Parallax effect on portal ring (main.js:41-50) — properly gated
- Scroll-reveal fade-in (main.js:59-75) — not gated, opacity starts at 0

---

### 6. Line Length — :white_check_mark: Pass

Content areas constrained with appropriate max-widths:
- Hero subtext: max-width 720px (theme.css:133)
- Pitch inner: max-width 900px (theme.css:204)
- Main content: max-width 1280px (theme.css:83)

These constraints keep line lengths within the 60-75 character optimal range.

---

### 7. Paragraph Spacing — :white_check_mark: Pass

Spacing scale properly defined and applied:
- Base unit 0.25rem with consistent multipliers
- Body paragraphs use `--space-4` (1rem) margins
- Feature cards and sections use adequate spacing

---

## Recommendations (Priority Order)

1. **High Priority:** Fix JS scroll-reveal to check `prefers-reduced-motion` before setting initial `opacity: 0` styles (main.js:68-75)

2. **High Priority:** Ensure `html` scroll-behavior is explicitly set to `auto` in reduced motion media query (base.css:146-155) — currently `scroll-behavior: auto !important` applies to `*` but html element may need explicit targeting

3. **Medium Priority:** Increase font sizes on `.feature-card p`, `.footer-col a`, `.footer-copy`, `.client-highlights li` from 0.9rem/0.875rem to 1rem (16px)

4. **Low Priority:** Consider reducing number of continuous animations (portal ring + neon flicker + float + gradient-shift) to minimize motion even with reduced motion enabled, for users who are sensitive but not explicitly requesting reduced motion
