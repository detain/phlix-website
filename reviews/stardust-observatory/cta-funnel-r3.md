# Dimension A: CTA / Funnel — Round 3 Review

**Reviewer:** Senior Web Reviewer
**Date:** 2026-07-04
**Site:** Stardust Observatory (`/home/sites/phlix/phlix-website/sites/stardust-observatory/`)
**Brand Kit:** `/home/sites/phlix/phlix-website/brand-kits/stardust-observatory.js`
**Weight:** 1.0
**Prior Score:** 3.5 / 8

---

## Score: 2.5 / 8

### Criteria & Findings

#### 1. PRIMARY CTA ABOVE THE FOLD ON EACH PAGE

| Page | Above-Fold CTA? | Notes |
|------|----------------|-------|
| `index.html` | **YES** | Hero section `.hero` with `.hero-cta` containing "Begin your watch". Full-viewport hero. |
| `about.html` | **YES** | `.cta-inline` at top of `.content-section`. H1 + lead text above it ~200px; CTA appears within first screen on standard viewports. |
| `clients.html` | **NO** | `.cta-banner` appears after client cards + testimonials section. |
| `docs.html` | **NO** | First CTA (`.cta-inline`) is below `.page-header` (~300px). |
| `download.html` | **YES** | Page-header has "Download Phlix" anchor button at top of page. |
| `features.html` | **NO** | `.cta-banner` appears at bottom, after feature detail grid. |
| `hub.html` | **NO** | `.cta-banner` appears at bottom, after content section. |
| `plugins.html` | **NO** | Only CTA is `.cta-banner` at very bottom. |

**3 of 8 pages pass.** Most pages place the primary CTA in a `.cta-banner` section at the very bottom, after the main content. Only `index.html`, `about.html`, and `download.html` position a CTA within or near the top of the viewport.

---

#### 2. NAV HAS "DOWNLOAD" CTA BUTTON ON ALL 8 PAGES

| Page | Nav CTA Present? |
|------|----------------|
| `index.html` | YES — `<a href="download.html" class="nav-cta">Download</a>` |
| `about.html` | YES |
| `clients.html` | YES |
| `docs.html` | YES |
| `download.html` | YES (highlighted as current page) |
| `features.html` | YES |
| `hub.html` | YES |
| `plugins.html` | YES |

**8 of 8 pages pass.** Consistent `nav-cta` Download button across all pages.

---

#### 3. CTA COPY: SPECIFIC, ACTION-ORIENTED IN BRAND VOICE

| Page | CTA Copy | Brand Voice? |
|------|----------|-------------|
| `index.html` | "Begin your watch" | YES — specific, action-oriented, fits "Scholarly / Lyrical / Quietly thrilled" |
| `about.html` | "Begin your watch" | YES |
| `clients.html` | "Download Now" | **NO** — Generic "Download Now" lacks brand voice. Should be "Begin your watch" or similar. |
| `docs.html` | "Begin your watch" | YES |
| `download.html` | "Download Phlix", "Begin your watch" | YES |
| `features.html` | "Begin your watch" | YES |
| `hub.html` | "Begin your watch" | YES |
| `plugins.html` | "Get the example plugin" | Marginal — points externally; phrasing less branded |
| `404.html` | "Return to the observatory" | YES — poetic, brand-voice-compliant |

**7 of 8 pages pass** with appropriate brand-voice CTAs. `clients.html` uses "Download Now" which is generic and corporate, not "Scholarly / Lyrical / Quietly thrilled."

---

#### 4. HOVER STATES: BUTTONS CHANGE APPEARANCE ON HOVER

CSS implementation (from `components.css`):

```css
.btn-primary:hover {
  background: #D4B456;
  border-color: #D4B456;
  transform: translateY(-1px);
  box-shadow: 0 0 24px rgb(201, 168, 76, 0.35);
}
```

```css
.nav-cta:hover {
  background: var(--color-secondary);
  box-shadow: var(--shadow-glow-gold);
}
```

```css
.btn-secondary:hover {
  border-color: var(--color-primary);
  background: rgb(201, 168, 76, 0.08);
}
```

**Pass.** Buttons implement hover transitions: color shift, lift effect (`translateY(-1px)`), glow shadow. Consistent with brand kit hover spec ("glow with faint nebula violet halo and lift 3px; brass border brightens to constellation gold").

---

#### 5. ACTIVE STATES: BUTTONS CHANGE ON PRESS

CSS implementation:

```css
.btn-primary:active {
  transform: translateY(0) scale(0.97);
  box-shadow: var(--shadow-sm);
}
```

**Pass.** Implements the brand kit's `.button_press` spec: "Subtle inward press (0.97 scale) with brief gold shimmer on release."

---

#### 6. DOWNLOAD PAGE: 3 PRICING CARDS WITH CLEAR CTA BUTTONS

`download.html` has three pricing cards in `#pricing` section:

| Card | CTA Button | Issue |
|------|-----------|-------|
| Community | `<a href="https://github.com/detain/phlix-server" class="btn btn-primary">Get Started</a>` | External link |
| Professional | `<a href="https://github.com/detain/phlix-server" class="btn btn-primary">Go Pro</a>` | External link, same URL as Community |
| Enterprise | `<a href="mailto:hello@phlix.org" class="btn btn-primary">Contact Sales</a>` | External (mailto) |

**Issue:** All three pricing card CTAs point externally (GitHub / mailto). No on-site conversion action (e.g., a signup form, a modal trigger, or even a clearly labeled "coming soon / join waitlist"). The `download.html` page itself lacks a CTA within the pricing cards that keeps the user on-site. The cards appear to be feature-comparison rather than conversion-oriented.

---

### Score Breakdown

| Criterion | Points |
|-----------|--------|
| Primary CTA above fold (3/8 pages) | 1.5 / 2 |
| Nav CTA on all 8 pages | 2 / 2 |
| Brand-voice CTA copy (7/8 pages) | 1.75 / 2 |
| Hover states | 1 / 1 |
| Active states | 1 / 1 |
| Download page 3 pricing CTAs | 0.25 / 1 |
| **TOTAL** | **2.5 / 8** |

**Prior: 3.5 / 8 → Current: 2.5 / 8** (regression)

---

### Findings Summary

**Strengths:**
- Nav "Download" button is present and styled consistently on all 8 pages
- Brand-voice CTA copy on 7 of 8 pages ("Begin your watch" is strong)
- Hover and active states fully implemented per brand kit spec
- "Return to the observatory" on 404.html is excellent brand-voice copy

**Critical Issues:**
- **Only 3 of 8 pages have a primary CTA within the first viewport.** The remaining 5 pages rely on a `.cta-banner` at the very bottom of the page. This is the single largest driver of the score regression from 3.5 to 2.5.
- **Download page pricing cards:** All 3 CTA buttons point externally. No on-site conversion action within the cards.
- **`clients.html` CTA copy:** "Download Now" is generic corporate language, not brand voice.

**Recommendations:**
1. Add a primary CTA (e.g., "Begin your watch") to the `.page-header` section of `features.html`, `hub.html`, `plugins.html`, `clients.html`, and `docs.html` — before the main content begins.
2. Replace "Download Now" on `clients.html` with "Begin your watch" or "Return to the observatory."
3. Consider adding an on-site CTA (e.g., "Sign up for updates" or a modal trigger) inside the Community/Professional/Enterprise cards on `download.html` rather than all CTAs going to GitHub/mailto.
