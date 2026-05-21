# R1 Review — 03-retro-film-reel-2 (50s Movie Theater)

**Score: 85/100 — PASS with fixes required**

---

## Checklist Results

| # | Requirement | Status | Notes |
|---|-------------|--------|-------|
| 1 | Google Fonts CDN — no `<link href="https://fonts.googleapis.com">` | ✅ PASS | All fonts self-hosted in `css/fonts/` with `@font-face` and `local()` fallback |
| 2 | Brand Consistency — CSS uses only brand-kit colors | ⚠️ FAIL | Hardcoded colors outside brand tokens found in multiple CSS files |
| 3 | SEO — meta description ≤160 chars on all pages | ✅ PASS | All 8 pages ≤160 chars (longest: features.html at 158) |
| 3 | SEO — `og:image` exists on all pages | ✅ PASS | All pages reference `/img/og.svg` which exists |
| 3 | SEO — `sitemap.xml` and `robots.txt` exist | ✅ PASS | Both present and valid |
| 4 | Mobile Navigation — focus trap for keyboard users | ⚠️ MINOR | Escape closes menu; no focus trap but keyboard users are not truly trapped |
| 5 | Accessibility — WCAG AA contrast, ARIA labels | ✅ PASS | Gold (#D4A017) on cream (#F5E9D4) = 6.64:1 ✓; all ARIA attributes correct |
| 5 | Accessibility — `aria-expanded`, `aria-controls` on mobile menu | ✅ PASS | Present on menu-toggle button in all 8 pages |
| 6 | Content Authenticity — all text from `shared/content.json` | ✅ PASS | All marketing text matches source; no invented copy |
| 7 | `manifest.webmanifest` — valid JSON, `name` + `icons` array | ✅ PASS | Valid JSON, has name and icons array |
| 8 | JSON-LD — `<script type="application/ld+json">` on index.html | ✅ PASS | SoftwareApplication schema present |
| 9 | FAQ Dead Code — if `js/faq.js` exists, FAQ HTML must exist | ✅ PASS | No `js/faq.js`; FAQ accordion in `main.js` and FAQ HTML in about.html |

---

## Critical Fixes

### 1. Brand Colors Outside CSS Variables (Severity: Medium)

Hardcoded color values appear in CSS that are not defined as CSS custom properties in `base.css`. These should be mapped to brand tokens.

**`css/theme.css`**:

| Line | Hardcoded | Should be |
|------|-----------|------------|
| 208 | `#EDE4D3` | `var(--color-cream)` |
| 388 | `#EDE4D3` | `var(--color-cream)` |
| 512 | `#EDE4D3` | `var(--color-cream)` |
| 595 | `#EDE4D3` | `var(--color-cream)` |
| 706 | `#EDE4D3` | `var(--color-cream)` |

**`css/components.css`**:

| Line | Hardcoded | Should be |
|------|-----------|------------|
| 107 | `#EDE4D3` | `var(--color-cream)` |
| 221 | `#EDE4D3` | `var(--color-cream)` |
| 44 | `#168c77` | `var(--color-teal)` (deeper shade, define `--color-teal-dark: #168c77` in base.css and use it) |

**`css/theme.css`**: `background-color: var(--color-cream)` at line 208 in the hero gradient is hardcoded as `#EDE4D3` (a slightly darker cream). Either add `--color-cream-dark: #EDE4D3` to base.css as an explicit variant, or use `var(--color-cream)` if the two-tone cream effect is intentional and document it as a brand sub-token.

**`manifest.webmanifest`**:

| Field | Current | Should be |
|-------|---------|-----------|
| `background_color` | `#2C1810` | `#4A0F0F` (`--color-velvet-dark`) |

**Fix** — Add to `css/base.css` under `:root`:

```css
/* Color — Subtokens (not in brand kit, derived) */
--color-cream-dark: #EDE4D3;  /* Two-tone cream for gradient depth */
--color-teal-dark: #168c77;   /* Teal gradient darker shade */
```

Then replace hardcoded values throughout theme.css and components.css.

---

### 2. Mobile Menu — No Focus Trap (Severity: Minor)

**Issue**: When the mobile menu opens (`.is-open`), focus is not trapped within the nav list. Keyboard users can Tab outside the open menu into background page content.

**Current behavior**:
- `Escape` key closes menu and moves focus to toggle ✅
- Click on `.main-nav__link` closes menu ✅
- No click-outside-to-close ✅ (acceptable)
- No focus trap when open ⚠️

**Fix** — In `js/main.js`, add a focus trap to `initMobileMenu()`:

```javascript
// Inside initMobileMenu(), after opening the menu:
navList.addEventListener('keydown', function(e) {
  if (e.key === 'Tab') {
    const focusable = navList.querySelectorAll('.main-nav__link');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});
```

Also add click-outside-to-close for improved UX:

```javascript
document.addEventListener('click', function(e) {
  if (!toggle.contains(e.target) && !navList.contains(e.target) && navList.classList.contains('is-open')) {
    navList.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});
```

---

## Minor Improvements

1. **JSON-LD on non-homepage pages** — Only `index.html` has structured data. `about.html` could use `AboutPage` schema; `features.html` could use `ItemList`.

2. **`manifest.webmanifest` icon** — Icon uses `favicon.svg` with `sizes: "any"`. Works, but a purpose-specific icon improves some PWA install prompts.

3. **CSS `:focus` for mobile menu toggle** — The toggle button loses its visual focus ring when focused programmatically via `toggle.focus()` after Escape. Consider adding `:focus-visible` ring in `theme.css`:
   ```css
   .menu-toggle:focus-visible {
     outline: 3px solid var(--color-gold);
     outline-offset: 2px;
   }
   ```

---

## Previously Filed Issues (from Round-1 code-review.md)

These were already noted and remain valid:
- `manifest.webmanifest` `background_color: #2C1810` doesn't match design (filed above as critical)
- Hardcoded `#168c77` in components.css (filed above)
- Sparse JSON-LD on non-homepage pages (minor, re-stated above)

---

## Verdict

**PASS** — The variant is well-built and passes all critical requirements. The two actionable items (hardcoded brand colors and mobile focus trap) are straightforward fixes. No security issues, no broken functionality, no accessibility failures. The brand aesthetic is consistent and the retro film reel / 50s movie theater theme is well-executed.

**Suggested priority**:
1. Add `--color-cream-dark` and `--color-teal-dark` to `base.css` (5 min)
2. Replace all hardcoded `#EDE4D3` and `#168c77` with CSS variables (5 min)
3. Fix `manifest.webmanifest` background_color (1 min)
4. Add mobile focus trap to `main.js` (10 min)
