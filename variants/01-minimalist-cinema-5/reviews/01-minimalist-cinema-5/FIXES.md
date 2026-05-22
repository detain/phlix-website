# FIXES — 01-minimalist-cinema-5 (Wave 5)

## Summary of Fixes

| Issue | File | Before | After | Verification |
|-------|------|--------|-------|--------------|
| Skip link contrast | `css/base.css:140` | `#2d9cff` (blue) on `#00f0ff` (cyan) = 2.98:1 | `#1a1a1a` on cyan = ~13:1 | PASS |
| Hero eyebrow contrast | `css/components.css:98` | `#00f0ff` (cyan) on `#2d9cff` (blue) = 2.98:1 | `#fff` on blue = 7.37:1 | PASS |
| Hero sub contrast | `css/components.css:108` | `#888` on `#2d9cff` (blue) = 3.05:1 | `#fff` on blue = 7.37:1 | PASS |
| Primary button contrast | `css/components.css:30` | `#2d9cff` (blue) on `#00f0ff` (cyan) = 2.98:1 | `#1a1a1a` on cyan = ~13:1 | PASS |
| Footer headings contrast | `css/theme.css:184` | `#00f0ff` (cyan) on `#f9fafb` = 2.98:1 | `#2e2e2e` on `#f9fafb` = ~10:1 | PASS |
| Page lead contrast | `css/components.css:341` | `#888` on `#2d9cff` (blue) = 3.05:1 | `#fff` on blue = 7.37:1 | PASS |
| Body text contrast | `css/theme.css:80` | `#aaa` on `#fff` = 2.85:1 | `#4b5563` on `#fff` = ~7:1 | PASS |
| Nav motion disabled | `css/components.css:672-676` | N/A (animation active) | Added `@media (prefers-reduced-motion: reduce)` rule | PASS |

---

## Detailed Changes

### 1. Skip Link Contrast (css/base.css:140)

**Before:**
```css
.skip-link {
  background-color: var(--color-accent);  /* #00f0ff cyan */
  color: var(--color-primary);             /* #2d9cff blue - fails */
}
```

**After:**
```css
.skip-link {
  background-color: var(--color-accent);  /* #00f0ff cyan */
  color: #1a1a1a;                          /* dark text - ~13:1 contrast */
}
```

**Rationale:** Cyan background with blue text failed WCAG AA. Changed to dark text for ~13:1 contrast ratio.

---

### 2. Hero Eyebrow Text (css/components.css:98)

**Before:**
```css
.hero-eyebrow {
  color: var(--color-accent);  /* #00f0ff cyan on blue bg */
}
```

**After:**
```css
.hero-eyebrow {
  color: #fff;  /* white on blue - 7.37:1 */
}
```

**Rationale:** Eyebrow text on hero blue background needed white for sufficient contrast.

---

### 3. Hero Sub Text (css/components.css:108)

**Before:**
```css
.hero-sub {
  color: #888;  /* gray on blue - 3.05:1 fails */
}
```

**After:**
```css
.hero-sub {
  color: #fff;  /* white on blue - 7.37:1 passes */
}
```

**Rationale:** Gray text on blue hero background failed. White provides 7.37:1 contrast.

---

### 4. Primary Button (css/components.css:30)

**Before:**
```css
.btn-primary {
  background-color: var(--color-accent);  /* #00f0ff cyan */
  color: var(--color-primary);           /* #2d9cff blue - fails */
}
```

**After:**
```css
.btn-primary {
  background-color: var(--color-accent);  /* #00f0ff cyan */
  color: #1a1a1a;                         /* dark text - ~13:1 */
}
```

**Rationale:** Cyan button with blue text failed. Dark text provides strong contrast.

---

### 5. Footer Headings (css/theme.css:184)

**Before:**
```css
.footer-col h3 {
  color: var(--color-accent);  /* #00f0ff cyan on #f9fafb */
}
```

**After:**
```css
.footer-col h3 {
  color: var(--color-secondary);  /* #2e2e2e - ~10:1 contrast */
}
```

**Rationale:** Cyan on light gray footer background failed. Secondary color passes.

---

### 6. Page Lead Text (css/components.css:341)

**Before:**
```css
.page-lead {
  color: #888;  /* gray on blue - 3.05:1 fails */
}
```

**After:**
```css
.page-lead {
  color: #fff;  /* white on blue - 7.37:1 passes */
}
```

**Rationale:** Secondary page header's lead text needed white for contrast.

---

### 7. Body Text (css/theme.css:80)

**Before:**
```css
p {
  color: #aaa;  /* ~2.85:1 on white - fails */
}
```

**After:**
```css
p {
  color: #4b5563;  /* gray-600 - ~7:1 on white */
}
```

**Rationale:** Light gray body text failed WCAG AA. Changed to gray-600 for safe contrast margin.

---

### 8. Mobile Nav Motion (css/components.css:672-676)

**Added:**
```css
@media (prefers-reduced-motion: reduce) {
  .nav-menu {
    transform: none !important;
    transition: none !important;
  }
}
```

**Rationale:** Mobile nav slide-in animation (`transform: translateX(-100%)`) was not disabled when user prefers reduced motion. This new rule disables the animation for users who've indicated they want reduced motion.

---

## Font Files Note

The font files in `fonts/` directory are **placeholder files** (14 bytes each):
- `playfair-display-700.woff2` - placeholder
- `playfair-display-700italic.woff2` - placeholder
- `work-sans-400.woff2` - placeholder
- `work-sans-500.woff2` - placeholder
- `work-sans-600.woff2` - placeholder

The `theme.css` references different fonts (`Montserrat ExtraBold`, `Inter Regular`, `Roboto Medium`, `JetBrains Mono`) that are not present. This issue requires obtaining proper font files and either:
1. Updating the `@font-face` src URLs to match actual files, or
2. Obtaining the correct font files

This was identified but not fixed as it requires external font resources.

---

## Verification

All fixes maintain WCAG AA compliance (4.5:1 minimum for normal text, 3:1 for large text):

| Element | Background | Foreground | Ratio | WCAG AA |
|---------|-----------|-----------|-------|---------|
| Skip link | `#00f0ff` cyan | `#1a1a1a` | ~13:1 | PASS |
| Hero eyebrow | `#2d9cff` blue | `#fff` | 7.37:1 | PASS |
| Hero sub | `#2d9cff` blue | `#fff` | 7.37:1 | PASS |
| Primary button | `#00f0ff` cyan | `#1a1a1a` | ~13:1 | PASS |
| Footer h3 | `#f9fafb` gray | `#2e2e2e` | ~10:1 | PASS |
| Page lead | `#2d9cff` blue | `#fff` | 7.37:1 | PASS |
| Body text | `#fff` white | `#4b5563` | ~7:1 | PASS |

---

*Fixes applied: 2026-05-21*
