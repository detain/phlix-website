# Usability Review — 01-minimalist-cinema-1 (Round 2)

## Mobile Nav Fix Verification

### What the Phase I Review Requested
The Phase I review identified mobile nav as the primary focus area and noted the hamburger button animation (`is-open` class toggling) was working.

### Actual State of Mobile Nav

**Opening the mobile nav:**
- Hamburger button is correctly `44×44px` (min touch target) — PASS
- `aria-expanded` toggles correctly between `true`/`false` on click — PASS
- `aria-controls` properly associates button with `site-nav` — PASS
- Nav panel slides in from right (`transform: translateX(0)`) — PASS
- Background content is covered by nav panel — PASS

**Closing the mobile nav:**
- Clicking the hamburger closes the nav — PASS
- Clicking outside the nav closes it — PASS
- **Missing: Escape key does NOT close the nav** — FAIL

**Hamburger → X animation:**
The CSS defines the animation:
```css
.nav-toggle.is-open .nav-toggle__bar:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.nav-toggle.is-open .nav-toggle__bar:nth-child(2) { opacity: 0; }
.nav-toggle.is-open .nav-toggle__bar:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
```
However, the JS toggle does add `is-open` to the toggle button. Tracing through: on click, `navToggle.classList.toggle('is-open')` runs correctly. The animation **does work** in Round 2 — PASS.

**Keyboard navigation in mobile nav:**
- Tab key navigates through nav links — PASS
- Each nav link has `min-height: 44px` — PASS
- Nav links have a bottom border separator — PASS
- **Critical missing: No focus trap** — focus can leave the nav panel and reach background content/header without closing the nav
- **Critical missing: Escape key** does not close the nav

**Assessment:** Mobile nav is partially improved. Opening/closing works, hamburger animates, but keyboard handling (focus trap, Escape key) is still incomplete.

---

## Full Usability Audit

### 1. Navigation Usability

#### Desktop
| Element | State | Notes |
|---------|-------|-------|
| Sticky header | ✅ Working | `position: sticky; top: 0` with blur backdrop |
| Nav links | ✅ Working | Hover underline animation, `aria-current="page"` styling |
| Logo home link | ✅ Working | Proper `aria-label="Phlix home"` |
| Skip link | ✅ Working | Visible on focus, good contrast |

#### Mobile
| Element | State | Notes |
|---------|-------|-------|
| Hamburger toggle | ✅ Working | 44×44px, proper aria attributes |
| Nav panel open/close | ✅ Working | Slide-in animation, click-outside-to-close |
| Hamburger → X animation | ✅ Working | Three-bar-to-X transform |
| Escape key close | ❌ Missing | No keyboard shortcut to dismiss |
| Focus trap | ❌ Missing | Tab can exit nav to background |
| Touch target per link | ✅ Working | `min-height: 44px` on each `<a>` |

**Score: 6/10** — Core functionality works, keyboard accessibility gaps remain.

---

### 2. Interactive Elements

#### Buttons (index.html, about.html)

| Button | Hover | Active | Focus | Notes |
|--------|-------|--------|-------|-------|
| `.btn--primary` | ✅ Darken + lift + shadow | ✅ Press effect | ✅ Blue outline | Good feedback |
| `.btn--secondary` | ✅ Background tint + border darken | ✅ Press | ✅ Blue outline | Good |
| All CTAs | ✅ | ✅ | ✅ | Consistent behavior |

**Score: 10/10** — Buttons have clear, consistent hover/active/focus states with meaningful visual feedback.

#### Feature Cards (index.html lines 123–195)

- **Hover:** Shadow elevation change — PASS
- **Focus:** No visible focus indicator — FAIL
- **Clickable:** Cards are `<article>` elements, not links or buttons — no click handler
- **Keyboard:** Not in tab order — FAIL

**Issue:** Feature cards are purely decorative containers. If they're meant to be interactive, they need either `<a href>` or `<button>` wrappers, and `:focus-visible` styles.

#### FAQ Accordion (about.html lines 108–132)

**Critical failure:** The FAQ is **completely non-interactive**. The markup is:

```html
<div class="faq-item">
  <p class="faq-item__q">Is Phlix like Plex / Jellyfin / Emby?</p>
  <p class="faq-item__a">Yes — same job, different stack...</p>
</div>
```

- No `<button>` or `<summary>` element — FAIL
- No JS click handler — FAIL
- All answers visible at once — content is not scannable
- Screen readers announce all answers at once — poor accessibility

**Score: 0/10** — FAQ is a static list, not an accordion.

#### Footer Links
- Hover: color transition from 70% white to 100% white — PASS
- All footer links lack visible focus style on `:focus-visible` — borderline

---

### 3. User Flow Clarity

#### Strengths
- **Clear hero CTA hierarchy:** Primary "Get Phlix" + Secondary "Read the docs" — excellent
- **Short, scannable paragraphs** throughout
- **Bullet lists** for key selling points — excellent for quick scanning
- **Consistent section labeling** with small-caps eyebrow text
- **Footer navigation** is comprehensive

#### Weaknesses
- **Some nav links point to non-existent pages** in this static demo:
  - `/features`, `/clients`, `/hub`, `/download`, `/docs` — all return 404 or go to root
  - Users clicking these get dead ends
- **No breadcrumb** on About page — backnavigation unclear when deep-linked
- **Feature cards have no destination** — user can't click through to learn more

**Score: 7/10** — Good information architecture for what exists, but broken nav links and dead-end feature cards create frustrating detours.

---

### 4. Error Handling Quality

- **No forms present** on either page — cannot evaluate
- **External links use `rel="noopener noreferrer"`** — PASS (about.html line 138)
- **No 404 handling** visible — static site limitation

**Score: N/A** — No forms to test error states.

---

### 5. Content Scannability

| Area | Assessment |
|------|-------------|
| Hero | ✅ Large headline + subheadline + bullet list — excellent |
| Feature grid | ⚠️ Cards are scannable visually, but not interactive |
| About page FAQ | ❌ All answers visible at once — not scannable |
| Footer | ✅ Clear columnar organization |
| Typography | ✅ Distinct weights, sizes, and colors create hierarchy |
| Spacing | ✅ Generous whitespace — comfortable reading |

**Score: 7/10** — Good in hero and feature areas, FAQ is weak.

---

## Additional Findings

### Accessibility

| Check | Status |
|-------|--------|
| Skip link | ✅ Present and functional |
| `aria-expanded` on toggle | ✅ Correctly toggled |
| `aria-label` on nav | ✅ "Main navigation" |
| `aria-current="page"` | ✅ Used on desktop nav |
| `aria-label` on logo | ✅ "Phlix home" |
| `:focus-visible` styles | ✅ Present on buttons, links |
| Custom focus ring color | ✅ Blue `#2D9CFF` |
| `:focus-visible` on nav links | ✅ Present |
| `prefers-reduced-motion` | ✅ Respected in CSS |
| Scrollbar styled | ✅ Custom colors |
| Feature cards keyboard | ❌ Not focusable |
| FAQ accordion keyboard | ❌ Not keyboard accessible |

### Performance & Quality

- **Font loading:** Self-hosted fonts with `font-display: swap` — good
- **CSS:** Critical styles inlined in `<head>`, no render-blocking — good
- **JS:** Defer-loaded, simple vanilla — good
- **No console errors expected** from this codebase
- **Mobile-first responsive** — breakpoints at 768px and 480px

---

## Score: 59/100

### Breakdown
- Navigation: 6/10
- Buttons & CTAs: 10/10
- FAQ Accordion: 0/10
- User flow: 7/10
- Content scannability: 7/10
- Accessibility: 6/10

## Pass/Fail: **FAIL**

### Rationale
The variant passes on button interactions and core visual design, but **fails on two critical interactive elements**:

1. **FAQ is non-functional** — a static list masquerading as an accordion. Round 1 requested accordion behavior; Round 2 still has zero interactivity. This is the most glaring usability gap.

2. **Mobile nav keyboard accessibility is incomplete** — missing Escape key close and focus trap. While Tab navigation through links works, keyboard users cannot efficiently dismiss the nav without a mouse.

### Required Fixes for Pass
1. **FAQ accordion** — Add `<button>` per question with `aria-expanded`/`aria-controls`, JS toggle to show/hide answers, keyboard Enter/Space activation, and Escape to close all.
2. **Mobile nav keyboard** — Add `keydown` handler for Escape to close; implement focus trap so Tab cycles within open nav.
3. **Feature cards** — Either wrap in `<a href>` or convert to `<button>` with proper focus styles. Cannot remain unclickable `<article>` elements.

### Optional Improvements
- Hamburger animation could use a slight timing tweak — feels slightly abrupt
- Footer link hover states could be more prominent
- About page could benefit from in-page anchor links to each FAQ item
