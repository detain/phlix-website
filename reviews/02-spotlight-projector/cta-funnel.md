# CTA / Funnel Review — `02-spotlight-projector`

**Reviewer:** Dimension Reviewer
**Variant:** `02-spotlight-projector`
**Dimension:** CTA / Funnel
**Date:** 2026-05-20
**Files Reviewed:** `index.html`, `download.html`, `features.html`, `clients.html`, `plugins.html`, `docs.html`, `hub.html`, `about.html`, `css/base.css`, `css/theme.css`, `css/components.css`, `js/main.js`

---

## Rubric Criteria

| Criterion | Requirement | Result |
|---|---|---|
| Primary CTA above fold on home | ≥3:1 contrast | ✅ PASS |
| Secondary CTA distinguishable | Visually distinct from primary | ✅ PASS |
| Home → download depth | ≤2 clicks | ✅ PASS (1 click) |
| Surprise modals | None | ✅ PASS |
| Forced email gate | None | ✅ PASS |
| Auto-play with sound | None | ✅ PASS |

---

## Score: **92 / 100**

---

## ✅ Passed Items

### Primary CTA above fold with ≥3:1 contrast
- **Home (index.html:73):** `<a href="…/download.html" class="btn btn-primary">Get Phlix</a>` — Gold gradient background (`#F5C542` → `#FFB84D`) with `color: #000` text.
  - Contrast ratio ≈ **11.6:1** (far exceeds 3:1 AA requirement).
- The hero section occupies the full viewport (`min-height: calc(100vh - 72px)`), ensuring the CTA is above the fold on all standard screen sizes.

### Secondary CTA distinguishable
- **Home (index.html:74):** `<a href="https://detain.github.io/phlix-docs" class="btn btn-secondary">Read the docs</a>`.
- `.btn-secondary` uses `background: transparent`, `border: 2px solid var(--color-gold-spotlight)`, `color: var(--color-warm-white)` — visually distinct outline style vs. the filled primary button.
- All other pages use the same pattern: primary filled, secondary outlined.

### ≤2 clicks home → download
- **1 click** from home: `index.html` → `download.html` via hero CTA or nav "Download" link.
- No intermediate pages, no modal gates, no redirects.

### No surprise modals
- `main.js` contains only: mobile nav toggle, smooth scroll, and FAQ accordion.
- Zero `alert()`, `confirm()`, `window.open()`, `showModal()`, or overlay logic anywhere in HTML or JS.

### No forced email gate
- No `<form>` elements on any page.
- No newsletter signups, no email capture, no "Sign in" flow on the marketing site.

### No auto-play with sound
- Zero `<video>` or `<audio>` elements in any HTML file.
- Zero JS that triggers media playback.

---

## ⚠️ Concerns (Non-blocking)

### Secondary button text contrast on hero background
- **Location:** `index.html:74` (and the same pattern on `features.html:169`, `clients.html:147`, `hub.html:93`).
- **Issue:** `.btn-secondary` uses `color: var(--color-warm-white)` (`#FFF7E6`) on a transparent background. On the hero section's dark radial-gradient background (`rgba(0,0,0,0.8–0.95)`), the contrast ratio of the secondary button text is approximately **1.64:1**.
- **WCAG context:** WCAG 2.1 SC 1.4.3 requires 4.5:1 for normal text and 3:1 for large text (18px+ or 14px+ bold). The secondary button's 0.9375rem font does not meet the large-text threshold, and 1.64:1 does not meet the 3:1 minimum.
- **Severity:** The gold `2px` border provides visual distinguishability (per the rubric's secondary-CTA criterion), and the rubric does not mandate WCAG AA for secondary buttons. This is flagged as a concern rather than a failure.
- **Recommendation:** Add an explicit `background: rgba(0,0,0,0.6)` to `.btn-secondary` so the button text (`#FFF7E6`) sits on a scannable dark surface, raising contrast to ~9:1. Alternatively, lower the secondary button text to the gold accent color which has 3:1+ on the dark hero.

---

## ❌ Failures (Must Fix)

**None.** All six rubric criteria pass.

---

## Recommendations (Ranked by Impact)

1. **[High Impact] Fix secondary button text contrast on hero sections**
   - **Files:** `css/components.css` (line ~51–61)
   - **Action:** Set `background: rgba(0,0,0,0.7)` on `.btn-secondary` so `#FFF7E6` text achieves ~9:1 contrast on the dark hero. This addresses the only meaningful accessibility gap across all 8 pages.

2. **[Low Impact] Ensure `btn-large` on CTA banners doesn't shrink on mobile**
   - **Files:** `css/components.css:68–71`
   - **Action:** The `btn-large` class sets `padding: 1rem 2rem`. On very narrow viewports (<360px), this may cause text wrapping. Add `white-space: nowrap` if horizontal overflow is observed.

3. **[Low Impact] `prefers-reduced-motion` on hero background animation**
   - **Files:** `css/theme.css:353–357`
   - **Action:** The `@keyframes spotlight-sweep` on the header already has a `prefers-reduced-motion` override. The hero background (`.hero::before`) is a static CSS gradient so no motion concern there. No action needed — positive observation.

---

## Evidence

### Color token references (from `css/base.css:10–27`)
| Token | Value | Use |
|---|---|---|
| `--color-gold-spotlight` | `#F5C542` | Primary button background, accents |
| `--color-deep-black` | `#000` | Page background, button text |
| `--color-warm-white` | `#FFF7E6` | Body/heading text |
| `--color-text-muted` | `#B8B0A0` | Muted body text |
| `--color-amber-glow` | `#FFB84D` | Button gradient endpoint |

### CTA placement by page
| Page | Primary CTA | Secondary CTA | Download depth |
|---|---|---|---|
| `index.html` (hero) | "Get Phlix" → `/download.html` | "Read the docs" → external | 1 click |
| `index.html` (banner) | "Download Phlix" → `/download.html` | — | 1 click |
| `download.html` | "Get Roku/Tizen/Windows/Mobile" → GitHub | "Read the docs" → `/docs.html` | Landing page |
| `features.html` | "Download Now" → `/download.html` | — | 1 click |
| `clients.html` | "Download Now" → `/download.html` | — | 1 click |
| `plugins.html` | "Get the example plugin" → GitHub | — | External |
| `docs.html` | None (external doc links) | — | N/A |
| `hub.html` | "Get started" → `/download.html` | — | 1 click |
| `about.html` | None | — | N/A |

### JS behavioral scan (`js/main.js`)
| Behavior | Line | Details |
|---|---|---|
| Mobile nav toggle | 14–21 | Toggles `.is-open` class |
| Escape key closes nav | 24–29 | Accessibility trap |
| Focus trap in nav | 33–46 | Accessibility |
| Smooth scroll | 51–67 | Anchor links only |
| FAQ accordion | 69–121 | dt/dd elements, no modals |
| **Modal/overlay/open** | — | **Not found** |
| **Audio/video play** | — | **Not found** |
| **Form submission** | — | **Not found** |

---

## Philosophy Compliance (CTA/Funnel Dimension)

| Principle | Status |
|---|---|
| Primary CTA prominent and above fold | ✅ PASS — Hero spans full viewport height |
| Funnel path is short and linear | ✅ PASS — 1 click to download from any page |
| No dark patterns (modals, gates, traps) | ✅ PASS — Zero forms, zero modals |
| Secondary action is clearly distinguished | ✅ PASS — Outline vs. filled button |
| Motion is user-initiated only | ✅ PASS — No autoplay anywhere |
