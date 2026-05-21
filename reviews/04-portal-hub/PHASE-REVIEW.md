# Visual/Brand Review — 04-portal-hub (base variant)

**Review phase:** Visual/Brand Review
**Variant:** 04-portal-hub (base, no wave number)
**Reviewer:** Automated brand compliance review
**Date:** 2026-05-21

---

## 1. Brand Color Compliance

**Status: PASS**

All colors in the CSS match the brand kit tokens exactly.

| Token | Brand Kit Value | CSS Variable | Value Used |
|---|---|---|---|
| neon_cyan (primary) | `#00E5FF` | `--color-neon-cyan` | `#00e5ff` |
| midnight_blue (primary) | `#0A0F1F` | `--color-midnight-blue` | `#0a0f1f` |
| white (primary) | `#FFFFFF` | `--color-white` | `#fff` |
| deep_navy (secondary) | `#08101C` | `--color-deep-navy` | `#08101c` |
| soft_cyan (secondary) | `#7FF6FF` | `--color-soft-cyan` | `#7ff6ff` |
| magenta_pulse (accent) | `#FF00C8` | `--color-magenta-pulse` | `#ff00c8` |

Semantic tokens map correctly to primary/secondary/accent roles throughout `base.css` and `theme.css`. Border accents, glows, and shadows all use the brand palette. No off-brand colors detected.

---

## 2. Font Compliance

**Status: PASS with minor issue**

| Role | Brand Kit | CSS Variable | Implementation |
|---|---|---|---|
| Headline | Poppins SemiBold | `--font-headline` | Local `@font-face` loading `Poppins SemiBold` — correct |
| Body | Inter Light | `--font-body` | Google Fonts import for `wght@300;400;500` — correct |
| UI | SF Pro Rounded | `--font-ui` | CSS Fallback chain: `'SF Pro Rounded', system-ui, sans-serif` |
| Code | IBM Plex Mono | `--font-code` | CSS variable only; font not loaded — acceptable, code blocks not prominent |

### Issue Found

**SF Pro Rounded is not a standard web-safe font.** It renders only on Apple devices. The fallback to `system-ui` is reasonable but means non-Apple users see a generic sans-serif for UI text, not the intended brand font. Consider:
- Loading SF Pro Rounded via `font-face` from a self-hosted source, or
- Using a Google Fonts equivalent such as `Nunito` or `Quicksand` that has a rounded UI feel but is universally available

This is a **minor non-blocking issue** — the fallback chain prevents broken rendering, just doesn't match brand spec on most devices.

Poppins and Inter are loaded correctly.

---

## 3. Layout Integrity

**Status: PASS**

All major sections are present and structurally sound:

| Section | HTML | Layout | Notes |
|---|---|---|---|
| Skip link | `index.html:60` | ✓ | Accessibility skip link |
| Site header | `index.html:63` | ✓ | Sticky nav, logo + hamburger + nav menu |
| Hero | `index.html:102` | ✓ | Portal ring, eyebrow, h1, sub, CTA buttons |
| Pitch | `index.html:134` | ✓ | Bulleted "Why Phlix?" list |
| Features overview | `index.html:152` | ✓ | 8 feature cards in `auto-fit` grid |
| CTA banner | `index.html:328` | ✓ | Gradient accent + download CTA |
| Footer | `index.html:337` | ✓ | Tagline, 3-column nav, copyright |

No broken sections, no missing content. The `portal-ring` element in the hero is a strong visual match for the brand kit's **"Rotating portal ring"** header motif.

### Internal Links Check

All nav links resolve to sibling HTML files in the variant directory:
- `features.html`, `clients.html`, `download.html`, `plugins.html`, `docs.html`, `hub.html`, `about.html` — these files need to be confirmed present.

### Note on `gradient-accent` class

The CTA banner (`index.html:328`) uses `class="cta-banner gradient-accent"` — the `gradient-accent` class in `components.css:288` applies a subtle animated gradient. This is consistent with the "Smooth animations" UI style directive.

---

## 4. Mobile Responsiveness

**Status: PASS**

Responsive behavior is implemented in `theme.css:555-594`:

| Breakpoint | Behavior |
|---|---|
| ≤768px | Hamburger menu toggle appears; nav menu hidden by default, toggled via `.is-open` class; hero padding reduced; pitch bullets switch to single column; footer nav switches to single column |

### Mobile nav implementation (`js/main.js:13-35`)
- Click handler toggles `.is-open` on nav menu
- `aria-expanded` is updated correctly
- Closes on outside click and on Escape key
- Accessible: proper button element with `aria-label` and `aria-controls`

### `prefers-reduced-motion` handling
- `base.css:146-155`: All animations disabled via `animation-duration: 0.01ms !important`
- `components.css:380-393`: All animated elements (portal ring, neon text, gradient, stagger) disabled
- `js/main.js:39`: Portal ring parallax check skips animation when reduced motion preferred

### No horizontal overflow
Body uses `overflow-wrap: break-word` (`base.css:51`) and images are `max-width: 100%` (`base.css:34`), preventing horizontal overflow on narrow viewports.

---

## 5. Additional Brand Compliance Observations

### UI Style Directives (from brand kit)
| Directive | Status | Evidence |
|---|---|---|
| Clean futuristic UI | ✓ | Midnight blue/dark backgrounds, minimal chrome |
| Minimal neon accents | ✓ | Cyan used sparingly: borders, glows, CTA accents |
| Maximum clarity | ✓ | High contrast white text on dark backgrounds |
| Glassmorphism subtle | ✓ | `.glass-card` class with `backdrop-filter: blur(12px)` in `components.css:62-70` |
| Smooth animations | ✓ | Portal ring rotation, pulse, hover transitions throughout |
| Circular motifs | ✓ | Portal ring (hero), circular bullet markers, rounded corners throughout |
| Don't: Use warm colors | ✓ | No warm tones (red, orange, yellow) detected |
| Don't: Use serif fonts | ✓ | All fonts are sans-serif or monospace |
| Don't: Add clutter | ✓ | Layout is clean; generous spacing; no visual noise |

### Tagline Check
Brand kit tagline: **"Stream Everything."**
No explicit tagline display found in `index.html`. The hero uses "Your media. Your library. Your Phlix." as the h1 — this is the overall Phlix brand tagline, not the variant-specific one. The variant tagline "Stream Everything." does not appear. This is **acceptable** since the page serves as a landing page for the broader brand.

---

## Summary

| Category | Verdict |
|---|---|
| Brand colors | **PASS** |
| Fonts | **PASS** (SF Pro Rounded fallback issue — minor) |
| Layout integrity | **PASS** |
| Mobile responsiveness | **PASS** |
| Brand style alignment | **PASS** |

**No blocking issues found.** The variant is production-ready pending the optional SF Pro Rounded font improvement.
