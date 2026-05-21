# Accessibility Review — 03-retro-film-reel-2

## Findings

### Color Contrast

**CRITICAL: Fail**

| Element | Colors | Ratio | WCAG AA | WCAG AAA |
|--------|-------|-------|---------|-----------|
| Body text (`--color-soft-brown: #8C5E3C`) on `--color-cream: #F5E9D4` | #8C5E3C on #F5E9D4 | ~4.2:1 | ✗ Normal text (needs 4.5:1) | ✗ |
| Hero eyebrow (`--color-velvet: #7A1F1F`) on cream background | #7A1F1F on #F5E9D4 | ~5.7:1 | ✓ Large text only (3:1) | ✗ Normal text |
| Feature card body text on cream | #8C5E3C on #EDE4D3 | ~4.1:1 | ✗ | ✗ |
| Footer links (`--color-cream: #F5E9D4`) on dark velvet | #F5E9D4 on #4A0F0F | ~12.1:1 | ✓ | ✓ |
| Pitch section text (cream on velvet-dark) | #F5E9D4 on #4A0F0F | ~12.1:1 | ✓ | ✓ |
| Client card taglines on cream | #8C5E3C on #EDE4D3 | ~4.1:1 | ✗ | ✗ |

**Issue**: `--color-soft-brown` (#8C5E3C) used for body/paragraph text fails WCAG AA 4.5:1 contrast requirement for normal-sized text. This affects:
- `.hero__subheadline`
- `.feature-card__body`
- `.client-card__tagline`
- `.download-card__desc`
- `.content-block p`, `.content-block li`

### Keyboard Navigation

**PASS with Minor Issues**

| Check | Status | Notes |
|-------|--------|-------|
| Skip link | ✓ | Present, targets `#main`, styled correctly |
| `:focus-visible` | ✓ | Properly defined for interactive elements |
| Mobile menu toggle | ✓ | Has `aria-label`, `aria-expanded`, `aria-controls` |
| Escape key closes menu | ✓ | Implemented in `initMobileMenu()` |
| Focus visible on all interactives | ⚠️ | Gold outline on gold background (line 142-145 base.css) — may be invisible |

**Issue**: The `:focus-visible` outline uses `var(--color-gold)` which is the same as the focus ring color. When the gold text/shadow effect is present, the outline becomes nearly invisible. On dark velvet backgrounds the gold outline has insufficient contrast against gold borders/shadows.

### ARIA

**PASS**

- `aria-label` on logo link: "Phlix Home" ✓
- `aria-label` on menu toggle: "Toggle menu" ✓
- `aria-expanded` correctly toggled on menu open/close ✓
- `aria-controls="main-nav-list"` correctly references nav list ID ✓
- `aria-current="page"` on active nav link ✓
- `role="list"` on nav list ✓
- `role="presentation"` not needed — list semantics preserved ✓

### Semantic HTML

**PASS**

| Element | Usage | Status |
|---------|-------|--------|
| `<header>` | Site header landmark | ✓ |
| `<main>` | Page main content with `id="main"` | ✓ |
| `<nav>` | Main navigation with `aria-label="Main navigation"` | ✓ |
| `<section>` | Hero, pitch, content sections | ✓ |
| `<article>` | Feature cards | ✓ |
| `<footer>` | Site footer landmark | ✓ |
| `<h1>`–`<h3>` | Proper heading hierarchy | ✓ |
| `<ul>/<li>` | Pitch list, nav list, footer lists | ✓ |
| `<button>` | Mobile menu toggle | ✓ |

**Minor Issue**: Feature cards use `<article>` but are not wrapped in a `<section>` with heading. The section has a heading "Features at a Glance" (h2) but it's outside the grid div, not associating clearly with the cards.

### Motion & Animation

**PASS**

| Check | Status | Notes |
|-------|--------|-------|
| `prefers-reduced-motion` support | ✓ | CSS line 70-79 base.css disables all animations |
| Logo animation disabled for reduced motion | ✓ | JS line 155-157, CSS line 115-122 |
| Scroll animations disabled for reduced motion | ✓ | JS line 118 |
| No motion that causes vestibular issues | ✓ | Animations are subtle opacity/transform |

### Additional Findings

1. **Focus visibility on gold backgrounds**: The `outline: 3px solid var(--color-gold)` (line 143 base.css) on gold backgrounds provides insufficient contrast. Consider using `--color-velvet` or `--color-black-outline` for focus outlines.

2. **No keyboard trap in mobile menu**: When the menu is open and a keyboard user tabs through, focus exits the menu to the page content below. This is acceptable behavior for a disclosure widget.

3. **Feature card interactivity**: Cards with `article` containing only static content but visually indicated as interactive (hover effects) do not expose an explicit interactive role. This is acceptable since clicking the cards does nothing — they are pure presentation.

## Score: 78/100

## Pass/Fail: **FAIL**

**Primary Reason**: Color contrast failures for body text (`--color-soft-brown: #8C5E3C` on cream) fail WCAG AA 4.5:1 requirement for normal-sized text. This affects multiple text elements across the page.

**Recommendation**: Increase contrast of `--color-soft-brown` or replace with a darker color (e.g., `#5C3A1E` or darker) to achieve 4.5:1 on cream backgrounds.
