# Fixes Applied — variant 05-pixel-tech-1

## Issue 1: Contrast FAIL — Footer Text
**Problem:** Footer text "BSD-3-Clause" used `--dark-gray` (#1a1a1a) on black background (~1.6:1 contrast ratio, fails WCAG 4.5:1 requirement)

**Fix:** Changed `color: var(--dark-gray)` to `color: var(--silver)` (#c0c0c0) for proper contrast (~12:1)

**File Modified:** `variants/05-pixel-tech-1/index.html:288`

---

## Issue 2: ARIA Issue — Incorrect aria-current
**Problem:** Navigation links incorrectly used `aria-current="false"` on lines 60-66. ARIA current should be `aria-current="page"` when on the current page, or omitted entirely when not current.

**Fix:** Removed `aria-current="false"` from all nav links in the main navigation (Features, Clients, Download, Plugins, Docs, Hub, About)

**File Modified:** `variants/05-pixel-tech-1/index.html:60-66`

---

## Issue 3: Font Size FAIL — .feature-card p
**Problem:** `.feature-card p` in `css/components.css:258` (actually in theme.css) used `font-size: 0.875rem` (14px), failing the minimum 16px (1rem) requirement.

**Fix:** Changed `font-size: 0.875rem` to `font-size: 1rem`

**File Modified:** `variants/05-pixel-tech-1/css/theme.css:257-258`
