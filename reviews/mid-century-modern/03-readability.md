# Readability Review — Mid-Century Modern

**Variant**: mid-century-modern
**Round**: 1
**Reviewer**: adversarial-readability-reviewer
**Date**: 2026-07-01

## Score

- **Readability**: 71 / 100

## ✅ Passed

- Body copy line length is constrained to `max-width: 68ch` on all body-text elements, keeping line length within the 60–75ch target. (`theme.css:250`, `theme.css:107`, `hub.html:107`)
- `body-lg` uses `line-height: var(--lh-body)` (= 1.7) — generous breathing room for educated adult readers.
- Line length on `hero-sub` is capped at `68ch` with `line-height: 1.65` — appropriate for a longish hero tagline.
- No walls of text on any page. Content is broken into: bullet lists (index pitch), feature-card grids (index features-overview, features.html), client-cards grid (clients.html), download-cards grid (download.html), FAQ definition list (about.html), ecosystem-lists, docs-links.
- Visual hierarchy is consistent and clear: `H1` (uppercase, clamp 2–3rem) → `H2` (uppercase, clamp 1.25–2.25rem) → `H3/card-headings` on all pages.
- `<html lang="en">` is present on all 8 pages.
- Inline text links are underlined (browser default + `color: var(--color-primary)`) providing clear link affordance in body text.
- `pitch-bullets li` use a custom mid-century bullet (teal circle) that matches the brand aesthetic while remaining readable.

## ⚠️ Concerns (non-blocking)

- **Footer links at 0.7 opacity** (`components.css:198`) — `--color-text` (#F5EFE8) at 70% opacity over `--color-surface` (#1A1710) yields an effective contrast of ~4.8:1, barely above the 4.5:1 AA threshold for normal text. At 0.875rem footer link size this is borderline. Increasing to 0.85 opacity or using `--color-neutral` (which passes at full opacity on surface) would remove ambiguity. — *Elevated contrast margin would improve readability, especially for aging design-conscious readers*
- **Feature-card and feature-detail body text at 15–16px** — `.feature-card p` (15px) and `.feature-detail-text p` (16px) are just under the 18px "large text" WCAG boundary. At `neutral` color they sit at the edge of readability. This is not a failure (see below) but pushes the limits of comfortable reading for the 30–55 audience. — *Consider slightly increasing these to 1rem+ (16px+) for more breathing room*

## ❌ Failures (must fix this round)

- **index.html:417–614 (feature-card p)** — `.feature-card p` uses `color: var(--color-neutral)` (#8c7b6a) on `background: var(--color-surface)` (#1a1710). Measured contrast: **4.39:1** — below the 4.5:1 AA minimum for normal text. Font size is 15px (0.9375rem) — does not qualify as "large text" under WCAG 2.1 SC 1.4.3. — *Required: increase contrast to ≥4.5:1 — either darken neutral on surface or switch these paragraphs to use --color-text (#F5EFE8) which yields 15.67:1*
- **features.html:121–286 (feature-detail-text p)** — Same class, same color pairing, same contrast failure. 16px font (1rem) is still normal text, not large text. Measured contrast: **4.39:1**. — *Required: same fix as above*
- **about.html:131–171 (faq-item dd)** — `.faq-item dd` uses `color: var(--color-neutral)` on `.faq-item` which has `background: var(--color-surface)`. Font size is 15px (0.9375rem). Measured contrast: **4.39:1**. — *Required: same fix as above*
- **clients.html:110, 130, 149, 169 (client-tagline)** — `.client-tagline` uses `color: var(--color-neutral)` on `.client-card` (surface background). Font size 15px. Contrast: **4.39:1**. — *Required: same fix as above*
- **download.html:117, 127, 137, 147, 157 (download-card p)** — `.download-card p` uses `color: var(--color-neutral)` on surface background. Font size 14px (0.875rem). Contrast: **4.39:1**. — *Required: same fix as above*
- **download.html:168–209 (ecosystem-list li)** — `.ecosystem-list li` uses `color: var(--color-text)` at 0.875rem on surface. While `--color-text` passes on surface at full opacity, the ecosystem list items are body-size text (14px). This passes contrast but the small size is marginal for the 30–55 audience. — *Non-blocking concern: consider bumping ecosystem-list font to 1rem*

## Recommendations (ranked by impact)

1. **Replace all `--color-neutral` body text on `--color-surface` backgrounds with `--color-text` (#F5EFE8)** (impact: high, effort: low) — The `#8c7b6a` tan-on-`#1a1710` surface pairing yields 4.39:1, just below the AA floor. The fix is a one-line CSS change: change `color: var(--color-neutral)` to `color: var(--color-text)` on `.feature-card p`, `.feature-detail-text p`, `.faq-item dd`, `.client-tagline`, `.download-card p` in `components.css`. This raises contrast to 15.67:1. Alternatively darken the neutral value on surface specifically (e.g., `#9c8b7a` → `#7a6b5a`).
2. **Increase footer link opacity from 0.7 to 0.85** (impact: medium, effort: low) — `components.css:198` — raises effective contrast from ~4.8:1 to ~6:1+, removing the borderline AA fail.
3. **Bump `.ecosystem-list li` and `.download-card p` font size from 0.875rem to 1rem** (impact: medium, effort: low) — readability for the 30–55 design-conscious audience at these text sizes.
4. **Add `text-decoration: underline` to footer links explicitly** (impact: low, effort: low) — currently footer links rely on browser default for underline; making it explicit ensures the link affordance is unmistakable, especially on dark backgrounds.

## Evidence

### Contrast measurements (Python/sRGB)

```
cream (#F5EFE8) on charcoal (#111008):  16.70:1  ✅
neutral (#8C7B6A) on charcoal (#111008):  4.68:1  ✅ (passes AA on charcoal bg)
text (#F5EFE8) on surface (#1A1710):     15.67:1  ✅
primary (#00AFAF) on charcoal:             7.04:1  ✅
secondary (#F2B705) on charcoal:          10.49:1  ✅
neutral (#8C7B6A) on surface (#1A1710):   4.39:1  ❌ FAILS AA (< 4.5:1)
```

### CSS line-height tokens (`base.css:118–122`)

```css
--lh-headline: 1.1;
--lh-display: 0.9;
--lh-body: 1.7;      /* generous, appropriate */
--lh-ui: 1.35;
--lh-mono: 1.5;
```

### Pages inspected

| Page | Line-length | Scannability | Contrast issues |
|------|-------------|--------------|----------------|
| index.html | ✅ 68ch max | ✅ Cards + bullets | ❌ feature-card p (neutral/surface, 4.39:1) |
| features.html | ✅ 68ch max | ✅ Detail list | ❌ feature-detail-text p (neutral/surface, 4.39:1) |
| clients.html | ✅ 68ch max | ✅ Cards | ❌ client-tagline (neutral/surface, 4.39:1) |
| download.html | ✅ 68ch max | ✅ Cards + list | ❌ download-card p (neutral/surface, 4.39:1) |
| plugins.html | ✅ 68ch max | ✅ Short paragraphs | None |
| docs.html | ✅ 68ch max | ✅ Links list + ecosystem | None |
| hub.html | ✅ 68ch max | ✅ Short paragraphs | None |
| about.html | ✅ 68ch max | ✅ FAQ definition list | ❌ faq-item dd (neutral/surface, 4.39:1) |
