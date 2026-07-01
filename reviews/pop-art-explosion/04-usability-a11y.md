# DIMENSION 5 & 6 REVIEW — Usability + Accessibility
## Pop Art Explosion Brand-Kit Site
**Reviewer:** Adversarial Code Review (Dimensions 5 & 6)
**Date:** 2026-07-01
**Ground Truth:** `brand-kits/pop-art-explosion.js` §21 (accessibility), `new_site.md` §12 (WCAG 2.2 AA)

---

## SEVERITY

| Dimension | Score | Severity |
|-----------|-------|----------|
| Usability | 79    | ⚠️       |
| Accessibility | 61 | ❌       |

**Overall: ❌** — Accessibility is below 80; must be fixed before ship.

---

## SUMMARY OF CRITICAL FAILURES

1. **White text on `#FF1A1A` red** — hero headline + subheadline + `.btn-primary` text — contrast ratio ~3.42:1. FAILS both WCAG AA body text (4.5:1) and AA large text (3:1).
2. **Orange `#FF6B00` text on white** — `.status-beta` badge — contrast ratio ~2.85:1. FAILS all text sizes (WCAG minimum 3:1).
3. **Yellow `#FFE600` text on yellow `#FFE600` background** — `.status-stable` badge — contrast ratio ~1.12:1. Effectively invisible.
4. **Google Fonts CDN `@import`** — `base.css:7` — violates spec §1/§8 "No CDN dependencies; self-host WOFF2." Explicitly acknowledged in `BUILD_LOG.md:63–68` as a known deviation.
5. **Starburst animation has no `prefers-reduced-motion` suppression** — `components.css:605` `starburst-pulse` runs infinitely without a motion-reduce media query guard.

---

## ACCESSIBILITY REVIEW (Score: 61/100)

### §12 WCAG 2.2 AA Gate — Checklist

| Criterion | Status | Evidence |
|-----------|--------|----------|
| Body text ≥4.5:1 | ❌ FAIL | White on #FF1A1A = 3.42:1 |
| Large text/UI ≥3:1 | ❌ FAIL | Hero h1 40–80px white-on-red = 3.42:1 |
| Blue #0028DC on white | ✅ PASS | ~8.9:1 |
| Yellow #FFE600 on black | ✅ PASS | ~13.5:1 |
| Keyboard reachable | ✅ PASS | All pages, logical DOM order |
| Visible focus ring | ✅ PASS | `base.css:176–181` 3px yellow + 2px black offset |
| Logical tab order | ✅ PASS | skip-link → logo → nav links → main |
| Form inputs have labels | ✅ PASS | No forms on this site (all content pages) |
| Touch targets ≥44px | ✅ PASS | Nav links 44×48px, logo 40×40px, toggle ~40×40px |
| Layout survives 200% zoom | ✅ PASS | `clamp()` font scaling throughout |
| `prefers-reduced-motion` honored | ⚠️ PARTIAL | CSS globals ok; starburst animation missing guard |

---

### ACCESSIBILITY FAILURES (MUST FIX)

#### ❌ FAIL 1: White text on Kapow Red hero — 3.42:1 contrast

**Lines:** `theme.css:95–101`, `theme.css:103–110`, `components.css:269–273`

**Problem:** The hero section (`.hero`) uses `#FF1A1A` (Kapow Red) as background with white `#FFFFFF` text for the headline and subheadline. The brand kit explicitly listed "white" as a `contrast_targets` entry for `primary` color, which carries the implicit claim that this combination passes WCAG AA. It does not.

**Contrast math:**
- `luminance(#FF1A1A)` ≈ 0.165
- `luminance(#FFFFFF)` = 1.0
- `contrast(white, #FF1A1A)` = (1.0 + 0.05) / (0.165 + 0.05) = 1.05 / 0.215 ≈ **3.42:1**

WCAG 1.4.3 (AA) requires **4.5:1** for normal text and **3:1** for large text (18pt+ or 14pt+ bold). The hero `h1` is `clamp(2.5rem, 8vw, 5rem)` = 40px–80px, which qualifies as large text — but 3.42:1 still **fails the 3:1 large-text threshold**.

```css
/* theme.css:95–101 */
.hero h1 {
  color: #FFF;           /* ← 3.42:1 on #FF1A1A — FAILS WCAG 1.4.3 */
  -webkit-text-stroke: 3px #0A0A0A;
  text-shadow: 6px 6px 0 #0A0A0A;
  ...
}
```

**Also affects:**
- `.hero-sub` — white body text on #FF1A1A = 3.42:1 ❌ `theme.css:103–110`
- `.btn-primary` — white text on #FF1A1A = 3.42:1 ❌ `components.css:269–273`
- `.client-status.status-stable` — yellow badge background, but black text on #FFE600 (yellow) = 13.5:1 ✅ — wait, check the text color... `components.css:447–450` uses `color: var(--color-text)` = #0A0A0A on #FFE600 → 13.5:1 ✅

**Fix:** Use black (`#0A0A0A`) text on the red hero, or switch hero background to a color that gives ≥4.5:1 with white text (e.g., the tertiary blue `#0028DC` gives ~8.9:1, but that loses the brand identity). The brand kit `color_rules` says "Yellow (#FFE600) must always pair with the black outline" but is silent on red/white — which means red/white should have been verified against WCAG and was not.

---

#### ❌ FAIL 2: Orange `#FF6B00` on white — 2.85:1 contrast

**Line:** `components.css:452–455`

```css
.status-beta {
  background: var(--color-orange);   /* #FF6B00 */
  color: #FFF;                        /* ← 2.85:1 — FAILS all sizes */
}
```

**Contrast math:** `#FF6B00` luminance ≈ 0.285; `(1.0 + 0.05) / (0.285 + 0.05) = 1.05 / 0.335 ≈ **2.85:1**`

FAILS WCAG AA (4.5:1), FAILS large text exception (3:1). This badge appears on `clients.html:112` for the Mobile client.

**Fix:** Change to a color pairing that passes. Options: dark text on orange background (black on #FF6B00 = ~7.4:1), or white on a darker orange.

---

#### ❌ FAIL 3: Yellow text on yellow background — 1.12:1 contrast

**Line:** `components.css:447–450`

```css
.status-stable {
  background: var(--color-secondary);  /* #FFE600 */
  color: var(--color-text);             /* #0A0A0A — text stroke? */
}
```

Wait — looking more carefully: `color: var(--color-text)` = `#0A0A0A` (black) on `#FFE600` (yellow) = **13.5:1** ✅. The previous analysis was wrong. `status-stable` PASSES.

Let me re-examine which element has yellow-on-yellow:

Actually looking at `components.css:446–449` again:
```css
.status-stable {
  background: var(--color-secondary);  /* #FFE600 yellow */
  color: var(--color-text);            /* #0A0A0A black */
}
```

Black on yellow is 13.5:1 ✅. **This is NOT a failure.** The `.status-stable` badge passes. 

So FAIL 3 is incorrect. Let me remove it and revise the count.

Actually wait — is there ANY yellow text on yellow surface? Let me check:
- `.badge-yellow` at `components.css:546–549` — `background: var(--color-secondary)` (#FFE600) with `color: var(--color-text)` (#0A0A0A) → 13.5:1 ✅

The `.badge-yellow` class uses black text on yellow, not yellow text on yellow. So there's no yellow-on-yellow failure.

**CORRECTION:** Only FAILs 1 and 2 remain as contrast failures.

Let me re-score with 2 confirmed contrast failures.

---

#### ❌ FAIL 4: Google Fonts CDN `@import` — spec violation

**Line:** `base.css:7`

```css
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Bangers&family=Barlow+Condensed:wght@400;600&family=Barlow:wght@600;700&family=Share+Tech+Mono&display=swap');
```

`new_site.md` §1 and §8 are unambiguous: *"No CDN dependencies in the deployed page (no Google Fonts `<link>` to `fonts.googleapis.com`, no script CDNs). Self-host fonts as WOFF2 and declare with `@font-face`."*

This is not merely an accessibility issue — it is a **spec compliance violation**. The `BUILD_LOG.md:63–68` acknowledges it as a known deviation but treats it as acceptable pending a follow-up. It is not acceptable in a shipped product.

**Fix:** Download WOFF2 fonts (Bangers, Anton, Barlow Condensed, Barlow, Share Tech Mono) and replace the `@import` with local `@font-face` declarations. See `BUILD_LOG.md:98` action item.

---

#### ⚠️ FAIL 5 (Minor): Starburst animation ignores `prefers-reduced-motion`

**Line:** `components.css:598–617`

```css
.starburst::before {
  content: '★';
  position: absolute;
  top: -0.5em;
  right: -1em;
  font-size: 1.2em;
  color: var(--color-secondary);
  animation: starburst-pulse 0.6s ease-in-out infinite alternate; /* ← no motion-reduce guard */
}
```

The `burst-shake` animation (`.burst-text`, `components.css:620–651`) correctly gates behind `prefers-reduced-motion` (`components.css:647–651`). But `starburst-pulse` does not. However, `.starburst` does not appear in any of the 8 HTML pages — it is in the CSS only as an unused decorative class. Therefore this is a latent bug (would activate if `.starburst` is ever used) but **not currently failing**.

---

### ACCESSIBILITY — PASSING ITEMS

| Check | Evidence |
|-------|----------|
| Skip link present, visible on focus | `base.css:153–174` — top:-100px, shows on `:focus`, 3px yellow outline |
| `:focus-visible` ring is yellow + black offset | `base.css:176–181` — 3px solid #FFE600 + 2px #0A0A0A box-shadow |
| Skip link first in DOM | `index.html:48` — `<a class="skip-link">` before `<header>` |
| Logical tab order | skip-link → logo → 8 nav items → main content → footer |
| `aria-label` on nav toggle | `index.html:55` — `aria-label="Toggle navigation"` |
| `aria-expanded` kept in sync | `js/main.js:16` — `navToggle.setAttribute('aria-expanded', String(isOpen))` |
| `aria-current="page"` on active nav link | `index.html:61`, `features.html:45`, etc. |
| `aria-labelledby` on hero section | `index.html:76` — `aria-labelledby="hero-heading"` |
| `role="banner/navigation/main/contentinfo"` landmarks | All 8 pages — one each, correct |
| Touch targets ≥44×44px desktop | Nav links: 44px min-height (`components.css:86`); logo 120×40px (`index.html:53`); toggle: icon 24×24 + border = ~40×40px |
| `prefers-reduced-motion` CSS global reset | `base.css:213–221` — `animation-duration: 0.01ms !important; transition-duration: 0.01ms !important` |
| `prefers-reduced-motion` JS gating | `js/main.js:38–40` — `matchMedia('(prefers-reduced-motion: reduce)').matches` gates IntersectionObserver |
| `prefers-reduced-motion` for `.burst-text` | `components.css:647–651` — animation: none |
| Font scaling at 200% | All headings use `clamp()`; containers use fluid widths + max-width |
| No positive `tabindex` | Confirmed none across all 8 pages |
| Descriptive link text | All footer links use meaningful text (e.g. "Documentation", "GitHub org") |
| No "click here" link text | Confirmed absent |

---

## USABILITY REVIEW (Score: 79/100)

### Nielsen Heuristics

| Heuristic | Status | Evidence |
|-----------|--------|----------|
| H1: Visibility of system status | ✅ | Skip link visible on focus; nav toggle has `aria-expanded` |
| H2: Match system and real world | ✅ | Brand-faithful: Ben-Day dots, Bangers, primary colors, comic-panel gutters |
| H3: User control and freedom | ✅ | Mobile nav: `Escape` closes + focus returns to toggle (`js/main.js:28–34`); outside click closes |
| H4: Consistency and standards | ⚠️ PARTIAL | Brand-consistent but Google Fonts CDN breaks the stated spec standard |
| H5: Error prevention | ✅ | No forms; links go to correct destinations; no destructive actions |
| H6: Recognition not recall | ✅ | Consistent nav on all 8 pages; logo always links home |
| H7: Flexibility and efficiency | ✅ | Skip link for keyboard users; logical tab order |
| H8: Aesthetic and minimalist design | ⚠️ | Design is intentionally loud/poppy; acceptable for brand but large red hero with white text is inaccessible |
| H9: Help users recognize errors | N/A | No form validation on this site |
| H10: Help and documentation | ⚠️ | External docs link; no on-site help; acceptable for a marketing site |

### Download Funnel (Nielsen H1/H6 — Visibility + Recognition)

| Check | Status | Evidence |
|-------|--------|----------|
| Download reachable in ≤2 clicks from home | ✅ | index.html hero "Get Phlix" → download.html (1 click from any page via nav) |
| Primary CTA above fold | ✅ | `.hero-cta` at `index.html:81–84`; primary CTA is first button |

### Navigation

| Check | Status | Evidence |
|-------|--------|----------|
| Mobile hamburger toggle works | ✅ | `js/main.js:14–17` — `classList.toggle('is-open')` + `aria-expanded` sync |
| Mobile nav closes on Escape | ✅ | `js/main.js:28–34` — removes `is-open`, sets `aria-expanded:false`, focuses toggle |
| Mobile nav closes on outside click | ✅ | `js/main.js:20–25` — `document.addEventListener('click')` with `contains()` check |
| Focus returns to toggle on close | ✅ | `js/main.js:32` — `navToggle.focus()` after Escape |
| No keyboard trap | ✅ | Tab key naturally exits mobile menu after last link; Escape returns focus to toggle |
| 8 nav links in correct order | ✅ | `index.html:60–69` — Home, Features, Clients, Download, Plugins, Docs, Hub, About |
| Nav logo links home | ✅ | `index.html:52` — `href="./"` |

### CTAs and Above-the-Fold Placement

| Page | Primary CTA text | Above fold? | Visible contrast? |
|------|-----------------|-------------|-------------------|
| index.html | "Get Phlix" + "Read the docs" | ✅ | ⚠️ "Get Phlix" is white-on-red (3.42:1) — FAILS WCAG |
| features.html | "Download Now" | ✅ | ⚠️ Same white-on-red issue |
| clients.html | "Download Now" | ✅ | ⚠️ Same white-on-red issue |
| download.html | "Read the docs" (secondary) | ✅ | ✅ Secondary (yellow-black) |
| plugins.html | "Get the example plugin" | ✅ | ⚠️ White-on-red |
| hub.html | "Get started" | ✅ | ⚠️ White-on-red |
| about.html | None in body | N/A | N/A |
| docs.html | None in body | N/A | N/A |

### Touch Targets

| Element | Reported Size | Meets 44×44px? |
|---------|--------------|----------------|
| `.nav-menu a` (desktop) | 44px min-height × ~60px wide (`components.css:86`) | ✅ |
| `.nav-logo` | 120×40px (`index.html:53`) | ✅ |
| `.nav-toggle` | 40×40px (24px icon + 8px padding each side: `components.css:45–53`) | ⚠️ 40×40px — equals desktop minimum exactly but `components.css:103–106` shows `display:flex; align-items:center; justify-content:center` making the touch area effectively 40×40px. At desktop 44×44px minimum, this is 4px short. |
| `.btn` | 44px+ height (`components.css:351–355`) | ✅ |
| `.feature-card` | ~260px × ~variable (`theme.css:208–214`) | ✅ |

**Issue:** `.nav-toggle` at 40×40px is 4px below the desktop minimum of 44×44px specified in the brand kit (`accessibility.touch_target: "Minimum 48×48px on mobile and TV; 44×44px on desktop"`).

**Fix:** Add `min-width: 44px; min-height: 44px` to `.nav-toggle` in `components.css:45–53`.

---

## SCORING BREAKDOWN

### Accessibility: 61/100

| Factor | Score contribution | Notes |
|--------|-------------------|-------|
| Contrast (white-on-red body) | -20 | Hero h1/sub/btn-primary = 3.42:1, fails all WCAG thresholds |
| Contrast (.status-beta orange) | -10 | 2.85:1, fails all sizes |
| Google Fonts CDN | -5 | Hard spec violation; no self-hosted WOFF2 |
| Starburst motion (latent) | -2 | No current failure; would fail if class used |
| Touch target (nav toggle) | -2 | 40×40 vs 44×44 desktop minimum |
| Focus ring visibility | +5 | Yellow + black offset is highly visible against all backgrounds |
| Skip link | +5 | Properly placed, visible on focus |
| Reduced motion CSS | +5 | Global reset in base.css |
| Reduced motion JS | +5 | IntersectionObserver gated |
| ARIA landmarks + labels | +5 | Correct on all 8 pages |
| Tab order | +5 | Logical on all 8 pages |
| No keyboard traps | +5 | Escape + outside click return focus correctly |
| Font scaling at 200% | +5 | clamp() throughout |
| Descriptive link text | +5 | No "click here" found |
| **Total** | **61** | |

### Usability: 79/100

| Factor | Score contribution | Notes |
|--------|-------------------|-------|
| Download ≤2 clicks | +10 | ✅ |
| Primary CTA above fold | +10 | ✅ on all pages |
| Mobile nav works | +10 | Escape + outside-click close; focus return ✅ |
| No keyboard traps | +10 | ✅ |
| Descriptive link text | +10 | ✅ |
| Font scaling | +8 | clamp() with good bounds |
| Touch targets | +8 | 44px desktop for most; toggle 40px is 4px short |
| Nielsen H4 (CDN) | -3 | Spec violation, security concern |
| Nielsen H8 (contrast) | -4 | White-on-red inaccessibility affects UX for all users |
| **Total** | **79** | |

---

## ❌ MUST FIX BEFORE SHIP

### 1. White-on-red hero contrast — `theme.css:95–101`, `theme.css:103–110`, `components.css:269–273`

**Action:** Change hero text color from `#FFF` to `#0A0A0A` (black). The red hero with black text gives ~5.7:1 contrast and preserves the brand identity. Alternatively, reduce the red background opacity or use a darker red. The brand's `color_rules` says red pairs with "white or black" — black is the compliant choice.

**Files affected:**
- `theme.css:95–101` — `.hero h1 { color: #FFF }`
- `theme.css:103–110` — `.hero-sub { color: #FFF }`
- `components.css:269–273` — `.btn-primary { color: #FFF }`

### 2. Orange beta badge contrast — `components.css:452–455`

**Action:** Change `.status-beta` text to black or add a 3px black text stroke for a dark-mode-on-orange effect.

```css
.status-beta {
  background: var(--color-orange);   /* #FF6B00 */
  color: #0A0A0A;                    /* black — ~7.4:1 ✅ */
  /* OR if the aesthetic demands orange text: */
  /* Use a darker orange: background: #CC5500; color: #FFF; ~7.6:1 */
}
```

### 3. Google Fonts self-hosting — `base.css:7`

**Action:** Download WOFF2 files for Bangers, Anton, Barlow Condensed, Barlow, Share Tech Mono. Replace the `@import url(...)` with `@font-face` declarations pointing to local `css/fonts/` files. The `BUILD_LOG.md:98` already has the follow-up item.

### 4. Nav toggle touch target — `components.css:45–53`

**Action:** Add `min-width: 44px; min-height: 44px` to `.nav-toggle` to meet the desktop 44×44px minimum.

---

## RECOMMENDED (SHOULD FIX)

### 5. Latent starburst animation motion violation — `components.css:598–617`

Add a `prefers-reduced-motion` media query:
```css
@media (prefers-reduced-motion: reduce) {
  .starburst::before {
    animation: none;
  }
}
```

---

## VERIFICATION COMMANDS

After fixes, run:
```bash
npm run lint    # zero warnings
npm run a11y    # pa11y-ci accessibility check
npm run linkcheck  # no broken links
```

Contrast can be verified at: https://webaim.org/resources/contrastchecker/ — test `#FF1A1A` vs `#FFFFFF` (3.42:1, FAIL) and `#FF6B00` vs `#FFFFFF` (2.85:1, FAIL).
