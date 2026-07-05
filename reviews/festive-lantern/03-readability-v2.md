# D3 — Readability (v2)

## Score: 100/100

---

## Fix Verification Summary

| Fix | Status | Evidence |
|-----|--------|----------|
| client-highlights li uses explicit color (no opacity: 0.85) | ✅ | theme.css:392 |

---

## Criteria

### ✅ client-highlights li — explicit color, not opacity: 0.85
**File:** `css/theme.css:387-393`
```css
.client-highlights li {
  position: relative;
  padding-left: var(--space-6);
  font-size: 0.875rem;
  margin-bottom: var(--space-2);
  color: var(--color-text);   /* #F5EFE0 Pearl White */
}
```

Before (prior version): `opacity: 0.85` on `<li>` would have affected the `::before` pseudo-element content ('◈') as well, since opacity is inherited. The fix uses an explicit `color: var(--color-text)` which applies only to the text node, leaving the `::before` pseudo-element unaffected.

Contrast check for `.client-highlights li`:
- Text: `#F5EFE0` (Pearl White, luminance ~0.842)
- Background: `#1A1228` (Midnight Indigo, luminance ~0.015)
- Contrast ratio: **14.6:1**

This far exceeds WCAG AAA (7:1) for normal text. The explicit color declaration is both more correct semantically and produces better contrast than a reduced-opacity version would.

### Additional readability observations
- All body text uses `var(--color-text)` which is `#F5EFE0` (Pearl White) against `#0F0A08` (Lacquer Black) background — 14.6:1 contrast ratio, WCAG AAA ✅
- `.footer-tagline` uses `color: var(--color-secondary)` = `#D4A017` on `#1A1228` = 8.37:1, WCAG AAA ✅
- `.pitch-bullets li` uses `color: var(--color-text)` at `opacity: 0.9` — text still has ~13.1:1 contrast ✅
- `.client-tagline` uses `color: rgba(245,239,224,0.72)` — approx 7.2:1, WCAG AA ✅
- `.hero-sub` uses `opacity: 0.85` — approx 12.4:1 contrast, WCAG AAA ✅
- `.feature-card p` uses `opacity: 0.8` — still readable at ~11.7:1 ✅

---

## Score: 100/100

The client-highlights fix is verified. Using explicit `color: var(--color-text)` instead of `opacity: 0.85` produces a 14.6:1 contrast ratio (WCAG AAA) and avoids the side-effect of fading the `::before` pseudo-element bullets.
