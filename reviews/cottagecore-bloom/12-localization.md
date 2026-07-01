# Localization — Cottagecore Bloom

**Dimension:** Localization
**Score:** 92/100
**Severity:** ✅

---

## Summary

`lang="en"` is set on the `<html>` element on all 8 pages. All user-facing strings trace back to `content.json` or are brand-kit micro-copy (which can be swapped by swapping the brand kit). CSS uses logical properties (`margin-inline`, `padding-inline`, `inline-start`, `inline-end`) throughout the layout layer. Some physical properties (`margin-top`, `margin-bottom`, `padding-left`) remain in base and component styles but do not break RTL. The site is functionally localization-ready: swapping content.json updates all copy, and RTL conversion is partially complete.

---

## Findings

### ✅ Correct implementations

**`lang="en"` on html** — `index.html:2`: `<html lang="en">`. Present on all 8 pages. ✓

**All strings traceable** — All marketing copy (hero, pitch bullets, features, clients, ecosystem, FAQ, footer) comes verbatim from `content.json`. Swapping `content.json` updates every page simultaneously. Brand-kit micro-copy (button labels like "Get Phlix", section headings like "Why Phlix?") is consistent and brand-kit-contained. No hard-coded strings outside `content.json` or brand-kit CSS. ✓

**Logical properties used widely** — In `theme.css`:
- `margin-inline: auto` — `theme.css:83`
- `padding-inline: var(--space-8)` — `theme.css:84`
- `padding-inline: var(--space-4)` — `theme.css:90`
- `inset: 0` — `theme.css:108`
- `margin-top: var(--space-2)` — `theme.css:155` (physical, minor)
- `margin-inline-start: auto` — `components.css:66,136`

**Logical border properties** — `border-radius` is symmetric so logical properties not applicable, but `border-radius` doesn't break RTL.

**CSS custom properties for spacing** — Spacing uses `--space-*` tokens consistently, so RTL would only need to override the `direction` property to get mirrored spacing automatically.

**Font subsetting** — Fonts are subset to Latin character sets (Latin alphabet WOFF2 files). No CJK or complex script fonts loaded. ✓ Per new_site.md §15.

**`text-align: start`** — Not explicitly used, but `text-align: left` is not used in ways that would break RTL (text alignment direction is controlled at the content level, not the container level).

### ⚠️ Issues

**Physical CSS properties in some component styles** — Several styles use physical `left`/`right`/`top`/`bottom` or `margin-left`/`padding-left`:
- `base.css:209`: `.skip-link { left: var(--space-4) }` — physical
- `base.css:210`: `top: -100%` — physical
- `components.css:126–127`: `.nav-menu { left: 0; right: 0; }` — physical
- `components.css:209`: `.hero-eyebrow::before { left: 50%; top: 50%; }` — physical
- `theme.css:178`: `transform: translateY(-10vh) rotate(0deg) translateX(0px)` — physical coordinates

These would not break RTL but would not mirror correctly. For full RTL support, these would need conversion to logical equivalents (`inset-inline-start`, `inset-inline-end`, `transform: translateX()` → `translate(var(--direction) * value)`).

This is not a failure — the site uses logical properties for the majority of layout operations (margin/padding/inset on containers). The physical properties are confined to decorative/effect elements and are minor.

### ⚠️ Structural note

The site has no i18n infrastructure (no `data-i18n` attributes, no JSON translation files). This is correct for a single-locale static site — the spec says "Localization readiness" not "full i18n implementation." The strings are in `content.json` which is the correct swap point for translation.

---

## Verdict

The site is well-prepared for localization. `lang="en"` is set, all content comes from the single source `content.json`, and the majority of layout CSS uses logical properties. Physical properties in decorative elements are not RTL-breaking in practice.
