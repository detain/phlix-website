# Usability Review — variant/02-spotlight-projector-2

**Review date**: 2026-05-20
**Reviewer**: Usability Reviewer agent
**Variant**: 02-spotlight-projector-2 (Wave 2, Art Deco Elegance)
**Pages reviewed**: index.html, js/main.js (with CSS reference to components.css, theme.css, base.css)

---

## Summary

| Check | Status | Notes |
|-------|--------|-------|
| Navigation discoverability | ⚠️ ISSUE | Hamburger visible on desktop; 8 nav items on mobile is dense |
| Navigation feedback | ⚠️ ISSUE | `aria-current="page"` set but no visible active state |
| Mobile nav usability | ✅ PASS | Focus trap, escape key, proper ARIA |
| Interaction accessibility | ✅ PASS | Keyboard support, ARIA attributes, skip link present |
| FAQ accordion | 🔴 BUG | Inline styles conflict with CSS; JS runs on pages without FAQ |
| Smooth scroll | ✅ PASS | Properly implemented with focus management |
| User flow (CTA) | ✅ PASS | Clear CTAs with distinct primary/secondary actions |
| Content flow | ⚠️ ISSUE | Feature cards are non-interactive (no links) |
| Visual feedback | ⚠️ ISSUE | Hover states present but animation may distract |

---

## Navigation

### Issues

**1. Hamburger menu visible on all screen sizes**
- The `.menu-toggle` button appears on both desktop and mobile
- On desktop, this creates unnecessary clutter since full nav is visible
- **Recommendation**: Hide `.menu-toggle` on viewports > 768px via CSS

**2. No visible active page indicator**
- The nav correctly uses `aria-current="page"` but sighted users get no visual cue
- Nav links lack an `.is-active` or `:active` state styling
- **Recommendation**: Add CSS for `a[aria-current="page"]` with underline or gold color

**3. Dense mobile navigation**
- 8 nav items (Home, Features, Clients, Download, Plugins, Docs, Hub, About)
- On mobile, opening the menu reveals a long list
- **Recommendation**: Consider grouping secondary links (Docs, Hub, About) or using a "More" dropdown

**4. Logo home link behavior**
- Logo links to `/` but this variant is in `/variants/02-spotlight-projector-2/`
- This correctly routes to the variant root, which may be intentional for deployment

---

## Interaction

### Issues

**1. FAQ JavaScript runs on pages without FAQ**
- `main.js` unconditionally queries for `.faq-item` elements (line 73)
- If index.html has no FAQ section, these listeners are wasted but harmless
- However, if future pages add FAQ with different markup, confusion may arise
- **Recommendation**: Wrap FAQ initialization in a check for `.faq-list` container existence

**2. Inline style conflict in FAQ toggle**
- `toggleFaq()` uses `answer.style.display = 'block'/'none'` (lines 105-108)
- But `components.css` also defines visibility via `.faq-item.is-open .faq-answer { display: block; }`
- After first toggle, inline style overrides CSS rule, breaking CSS transitions
- **Recommendation**: Use class toggle only, remove inline style manipulation

**3. Missing chevron rotation on FAQ open**
- The CSS correctly rotates chevron via `.faq-item.is-open .faq-question svg { transform: rotate(180deg); }`
- But JS doesn't add `.is-open` class before setting display block
- **Bug**: Answer appears without animation because `is-open` class is added after display change
- **Recommendation**: Add `item.classList.toggle('is-open', !isOpen)` BEFORE manipulating display, or better yet, rely solely on CSS

### Positive

- Skip link present (`<a href="#main" class="skip-link">`) ✅
- Focus trap in mobile nav works correctly ✅
- Escape key closes mobile nav and returns focus to toggle ✅
- Smooth scroll with `scrollIntoView({ behavior: 'smooth' })` ✅
- FAQ supports both Enter and Space key activation ✅

---

## FAQ

### Issues

**1. FAQ section missing from index.html**
- The index.html contains only a hero, feature grid, and CTA banner
- No FAQ accordion section present
- The FAQ JS code is dead weight on this page

**2. Inline style conflict (see Interaction #2 above)**
- Display toggle via JS inline style vs CSS class causes inconsistency

**3. Answer content overflow risk**
- Long FAQ answers could overflow container on mobile
- **Recommendation**: Add `max-height` with `overflow-y: auto` for very long answers

### What Works

- ARIA attributes properly set (`aria-expanded`, `aria-controls`) ✅
- Keyboard accessible (Enter/Space) ✅
- Chevron icon rotates on open ✅
- Gold spotlight color for questions ✅

---

## Flow

### Issues

**1. Feature cards are non-interactive**
- 6 feature cards in `.feature-grid` are pure `<article>` elements
- No links, no clickable areas
- User cannot navigate to learn more about a specific feature
- **Recommendation**: Wrap each card in an `<a>` tag or add "Learn more" link

**2. No clear next step after browsing**
- After hero, user sees features and a CTA banner
- If they don't click CTAs immediately, there's no further guidance
- **Recommendation**: Add links to feature cards or an "Explore features" section

**3. External links open in same tab**
- "Read the docs" and GitHub links use `<a href="...">` without `target="_blank"`
- External docs link opens in same tab, navigating away from site
- **Recommendation**: Use `target="_blank" rel="noopener noreferrer"` for external links

### Positive

- Hero has clear value proposition ✅
- Two CTAs (primary: Get Phlix, secondary: Read docs) with distinct styling ✅
- CTA banner at bottom reinforces download action ✅
- Footer provides organized link groupings ✅

---

## Visual Feedback

### Issues

**1. Fade-in animation may distract**
- Intersection Observer adds `opacity: 0 → 1` and `translateY(20px → 0)` animation
- This triggers on scroll for every `.feature-card`
- On slow devices or rapid scrolling, this can feel jittery
- **Recommendation**: Increase threshold to 0.2 or reduce animation duration

**2. Hover states subtle on dark theme**
- Cards use `rgba(245, 197, 66, 0.4)` border color on hover
- On dark background, this may not provide sufficient feedback
- **Recommendation**: Increase border opacity or add subtle box-shadow

### Positive

- Art Deco geometric styling is cohesive ✅
- Gold accent color provides clear interactive affordance ✅
- Client cards have status badges (Beta) with distinct styling ✅
- Button hierarchy clear (primary gold, secondary outlined) ✅

---

## Accessibility

### Checklist

| Feature | Status |
|---------|--------|
| Skip link | ✅ Present |
| ARIA labels on buttons | ✅ Present |
| ARIA expanded/controls | ✅ Present |
| Focus visible | ⚠️ Need verification |
| Color contrast | ⚠️ Need live testing |
| Keyboard navigation | ✅ Working |
| Screen reader navigation | ⚠️ Need testing |
| Reduced motion preference | 🔴 Not respected |

### Issue: Reduced motion not respected

`main.js` uses `scrollIntoView({ behavior: 'smooth' })` without checking `prefers-reduced-motion`.

**Recommendation**: Wrap smooth scroll in media query:
```javascript
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // smooth scroll code
}
```

---

## Recommendations Summary

### High Priority (Usability Bugs)

1. **Fix FAQ inline style conflict**: Remove `answer.style.display` calls, rely solely on class toggle
2. **Make feature cards interactive**: Add links so users can explore features
3. **Add visible active nav state**: Style `a[aria-current="page"]` with underline/color

### Medium Priority (Polish)

4. **Hide hamburger on desktop**: Show full nav, hide toggle above 768px
5. **Add external link handling**: Use `target="_blank"` for external links
6. **Respect reduced motion**: Check `prefers-reduced-motion` before animations

### Low Priority (Enhancement)

7. **Group mobile nav items**: Consider "More" dropdown for secondary links
8. **Reduce animation intensity**: Lower fade-in observer threshold or duration
9. **Add FAQ to index.html**: If FAQ exists on other pages, consider adding to homepage

---

## Final Verdict

**Usability: NEEDS MINOR REVISION**

The variant demonstrates solid foundational usability: proper ARIA, keyboard navigation, clear CTAs, and a distinctive Art Deco aesthetic. However, three bugs reduce effectiveness:

1. FAQ accordion has inline style conflicts that could cause inconsistent behavior
2. Feature cards are non-interactive, missing engagement opportunities  
3. Navigation lacks visible active state for sighted users

The JavaScript is generally well-written (focus trapping, escape key handling, intersection observer) but the FAQ toggle implementation needs refactoring to work consistently with the CSS. Once these issues are addressed, the variant will provide a polished user experience aligned with its "Art Deco Elegance" theme.
