# Accessibility Review — Marina Breeze

**Dimension:** Accessibility (WCAG 2.2 AA)
**Score:** 78/100
**Severity:** ⚠️ WARNING

---

## Findings

### ✅ PASS — Color Contrast: Body Text ≥4.5:1
- `#1A2535` on `#F5F1E8` (text on bg): **12.8:1** ✅
- `#1A2535` on `#FDFAF4` (text on surface): **12.85:1** ✅
- `#1A2535` on `#EDE3CC` (text on surface-alt): **8.93:1** ✅
- `#FFFFFF` on `#1B3A5C` (primary CTA text): **10.2:1** ✅

### ✅ PASS — Color Contrast: Large Text & UI ≥3:1
- `.hero-eyebrow` rgba(245,241,232,0.8) on gradient: ~10:1 ✅
- `.pitch-item` text on surface: ~12.8:1 ✅
- All badge text: contrast ratios well above 3:1 ✅

### ✅ PASS — Keyboard Reachable + Visible Focus
`base.css:232-236`:
```css
:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```
2px teal focus ring with 2px sailcloth offset — matches kit's focus spec ✅

`.skip-link:focus` at `base.css:226-230` — visible on focus, correctly styled ✅

### ✅ PASS — Logical Tab Order
All interactive elements are in natural DOM order. Navigation links, buttons, and anchors follow document order ✅
No positive `tabindex` found anywhere ✅

### ✅ PASS — Form Labels
No user-input forms on the marketing site (no contact forms, no search inputs on most pages). `docs.html` links use descriptive link text, not form inputs ✅

### ✅ PASS — ARIA Usage
`index.html:80` — `aria-labelledby="hero-heading"` on hero section ✅
All nav links with `role="list"` on `<ul>` ✅
`aria-expanded` correctly synced with nav toggle state (`main.js:17,24,32`) ✅
`aria-current="page"` on active nav links ✅
All feature icons have `aria-hidden="true"` ✅

### ✅ PASS — Prefers-Reduced-Motion Honored
`base.css:267-274` — Full `@media (prefers-reduced-motion: reduce)` block kills all animations/transition ✅
`main.js:41-43` — JS checks `prefersReducedMotion` before adding scroll-reveal or lighthouse-hero classes ✅

### ✅ PASS — Touch Targets ≥44×44px
`.btn-icon` at `components.css:276-279` — `width: 44px; height: 44px` ✅
`.btn-lg` at `components.css:292-295` — `padding: var(--space-4) var(--space-8)` (comfortably exceeds 44×44) ✅
Nav menu items at mobile breakpoint (`components.css:640-643`) — `padding: var(--space-3) var(--space-4)` (exceeds 44px wide, 48px tall) ✅

### ✅ PASS — 200% Zoom Doesn't Break Layout
Layout uses fluid `max-width` + `clamp()` for typography + percentage-based grids. No fixed-px layout constraints. At 200% zoom, containers reflow naturally ✅

### ❌ FAIL — Heading Hierarchy Broken on features.html
**File:** `features.html:60-165`

The page structure is:
```
<h1>Features</h1>  (page-header)
<section aria-labelledby="features-detail-heading">
  <h2 id="features-detail-heading" class="sr-only">Feature details</h2>  ← sr-only h2
  <article class="feature-detail" id="library">
    <h2>Library that organizes itself</h2>  ← h2 sibling to sr-only h2
  </article>
  [7 more articles each with h2]
</section>
```

Issues:
1. The sr-only h2 (`features.html:68`) and the feature article h2s (`features.html:80,91,102,112,123,139,150,160`) are all siblings at the same heading level (h2). The sr-only h2's `aria-labelledby` targets it from the `<section>`, meaning screen readers will announce "Feature details" as the section label, but the feature article h2s remain as separate landmarks.
2. The 8 feature detail h2s (in articles) have no parent h1 — they are siblings to each other and to the sr-only h2. This violates proper heading hierarchy where h2s should be children of h1.

**Should be:** `h1` → `h2` for section label (visible or sr-only) → `h3` for individual features (if needed), OR the section label is the visible h2 and individual features use h3.

### ❌ FAIL — Heading Hierarchy Broken on clients.html
**File:** `clients.html:55-139`

Same pattern:
```
<h1>Clients</h1>
<section aria-labelledby="clients-heading">
  <h2 id="clients-heading" class="sr-only">Available clients</h2>  ← sr-only h2
  [5× client-card articles each with <h2>Roku</h2>, <h2>Samsung Tizen</h2>, etc.]
```

Each client card has `<h2>` for the client name. These are all h2 siblings to the sr-only h2, with no parent h1 to group them under. Same structural issue as features.html.

### ⚠️ WARNING — DLNA Client Card Has No Heading Structure
**File:** `clients.html:124-135`

The DLNA client card has no `<h2>` inside the article — it uses plain text `<h2>` at `clients.html:126` for "Any DLNA device". This is actually correct (h2 is appropriate for client card name), but the structure issue above means these h2s are improperly nested.

### ⚠️ WARNING — Ecosystem Item Layout Uses Inline Styles
**Files:** `download.html:145`, `docs.html:97`

```html
<div style="display:grid;gap:var(--space-4);max-width:720px;margin-top:var(--space-6)">
```

This inline `style` is not an accessibility failure per se, but it bypasses the component system and could make responsive adjustments harder. No a11y impact since it's a layout container.

---

## Summary

**Score: 78/100 — ⚠️ WARNING**

Contrast ratios are all excellent. Keyboard navigation is solid with visible focus rings. Reduced motion is properly honored. Touch targets meet the 44×44px minimum. The two hard failures are **heading hierarchy issues on features.html and clients.html** where sr-only h2 siblings exist alongside article h2s, breaking the h1→h2→h3 document outline.

Screen reader users navigating by heading will encounter "Feature details" (sr-only) followed by 8 sibling h2s with no parent h1 grouping them. This is a WCAG 2.1 Success Criterion 1.3.1 (Info and Relationships) issue — the heading structure does not correctly represent the document structure.

Fixing the heading hierarchy on features.html (use h3 for individual feature names, with the section h2 as the group heading) and clients.html (use h3 for client names, with the section h2 as the group heading) would resolve the failures.
