# Brand Fidelity & Spirit Review — Solarpunk Eden

**Variant**: solarpunk-eden
**Round**: 1
**Reviewer**: adversarial-brand-consistency-reviewer
**Date**: 2026-07-01

## Score

- **Brand fidelity & spirit**: 81 / 100

## ✅ Passed

- Background color `#F4EFE0` (Morning Parchment) correctly avoids clinical white/grey — `base.css:20` / `theme.css:164`
- All CSS custom properties defined from kit's `design_tokens.color` — `base.css:16-46`
- Typography roles match kit: Playfair Display headline, Source Serif 4 body, DM Sans UI, JetBrains Mono mono — `base.css:67-72`
- Corner radii match kit scale: `radius-sm:8px, radius-md:16px, radius-lg:24px, radius-pill:999px` — `base.css:60-64`
- Shadows use Canopy Green `rgba(45,122,79,...)` instead of cool grey — `base.css:81-83`
- Primary button (Canopy Green `#2D7A4F` pill) matches kit `buttons.primary` — `components.css:225-229`
- Secondary button (Solar Gold pill) matches kit — `components.css:244-249`
- Ghost button uses 2px garden-ink border per kit — `components.css:260-269`
- Cards use Greenhouse Glass surface `#FAFAF2`, garden-ink border, 24px radius — `components.css:312-320`
- Pitch bullets use leaf SVG bullet matching kit botanical motif — `theme.css:196-203`
- Vine SVG motif dividers present — `components.css:621-626`, `theme.css:400-406`
- Hero vine animation in index header — `index.html:96-102`
- Feature card hover uses 1deg tilt + 3px lift + border-color shift — `components.css:322-326`
- Brand opposites largely respected: not dystopian, not corporate, not cyberpunk/neon, not clinical white
- Gradient backgrounds match kit: Eden Canopy (canopy→sky-prism), Solar Bloom (solar-gold→parchment) — `theme.css:384-390`
- Brand DNA phrase "never sterile, never dystopian, never cold" respected in overall feel
- Logo SVG has art nouveau botanical oval, vine stems, honeybee silhouette, leaf accents — `img/logo.svg:1-57`

## ⚠️ Concerns (non-blocking)

- **Hero gradient uses raw hex `#4AADCF`** instead of CSS variable `var(--color-sky-prism)` — `theme.css:107` — breaks token architecture; kit's color_rules require all colors via CSS custom properties. Impact: low — color is correct but off-brand implementation.
- **Frond mascot entirely absent** — kit `mascot{}` section defines Frond as animated seedling with poses, empty states, onboarding presence. Not used on any page. Impact: medium — signature element missing, reduces brand distinctiveness.
- **Mobile nav is standard hamburger menu**, not the kit's `responsive_behavior.mobile` spec ("bottom tab bar with leaf-icon active indicator"). Impact: medium — deviates from explicit kit behavior; functionally works but not brand-faithful.

## ❌ Failures (must fix this round)

- **index.html:96-102** — `.hero-vine` SVG vine animation plays unconditionally without `prefers-reduced-motion` gating. The `.reveal` class animations are properly gated (`components.css:641-647`) but the hero vine overlay animation is not. This violates kit `accessibility.motion_reduction`: "Honor prefers-reduced-motion: replace all grow/unfurl/spring animations with simple opacity fades."
- **theme.css:107** — `background: linear-gradient(160deg, var(--color-canopy) 0%, #4AADCF 100%)` uses raw hex `#4AADCF` instead of `var(--color-sky-prism)`. Violates token architecture requirement in new_site.md §6: "No raw off-palette hex in component CSS."

## Recommendations (ranked by impact)

1. Add `@media (prefers-reduced-motion: reduce) { .hero-vine { opacity: 0.3; transition: none; } }` to `components.css` — fixes motion violation (impact: high, effort: low)
2. Replace `#4AADCF` with `var(--color-sky-prism)` in `theme.css:107` and `theme.css:275` — fixes token architecture breach (impact: high, effort: trivial)
3. Add Frond mascot SVG to hero or features overview — builds brand identity (impact: medium, effort: medium)
4. At 768px, replace hamburger nav with bottom tab bar using leaf SVG icons for active state — matches kit responsive_behavior.mobile spec (impact: medium, effort: high)

## Evidence

- Manual inspection of `theme.css:107`, `components.css:641-647`, `index.html:96-102`, `img/logo.svg`
- CSS custom property audit: all vars present in `base.css:14-96`
- Hero gradient hex audit: `grep -n "#4AADCF" css/theme.css`
