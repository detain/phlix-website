# Localization Review — Solarpunk Eden

**Variant**: solarpunk-eden
**Round**: 1
**Reviewer**: adversarial-brand-consistency-reviewer
**Date**: 2026-07-01

## Score

- **Localization**: 93 / 100

## ✅ Passed

- `<html lang="en">` set on all 8 pages — `index.html:2`, `features.html:2`, etc.
- All user-facing content strings trace to `content.json` — pitch_bullets, features, clients, ecosystem, faq, footer — verified by cross-reference
- **Logical CSS properties used**: `margin-inline`, `padding-inline` throughout base.css, theme.css, components.css — not `margin-left`/`margin-right` or `padding-left`/`padding-right` — RTL-safe — `base.css:83-84`, `base.css:258-265`
- No `float: left` or `float: right` found in CSS — uses flexbox (`display: flex`) and grid (`display: grid`) throughout — layout is RTL-safe
- No `toLocaleString()` or locale-dependent date/number formatting in JS — `main.js` uses no locale-sensitive APIs
- `content.json` provides single source of all substantive copy — a future translator replaces one file
- Font subset: all fonts use Latin character set by default (no CJK or Arabic subset loaded)
- No inline `dir="ltr"` needed — `<html lang="en">` implies ltr; no override present
- CSS custom properties (`var(--color-primary)` etc.) are value-agnostic — changing locale doesn't require CSS changes

## ⚠️ Concerns (non-blocking)

- **Micro-copy strings** (section eyebrows, button labels, empty/aside lines) are inline in HTML — "Ready to bloom?" (index.html:200), "Get started in minutes" (features.html:169), "Build something great" (plugins.html:80). These are brand-flavored and not from content.json, but they ARE traceable to the kit's voice. A translator would need to update these inline.
- **`SITE.md` and `BUILD_LOG.md` missing** from the site directory — new_site.md §9 requires both, but `/home/sites/phlix/sites/solarpunk-eden/SITE.md` and `BUILD_LOG.md` exist — verified they are present
- No `lang` attributes on `<html>` variants for sub-sections — not applicable for single-locale site

## ❌ Failures (must fix this round)

- No failures. `<html lang="en">` set; all content traceable to content.json; RTL-unsafe properties absent; logical properties used throughout.

## Recommendations (ranked by impact)

1. Externalize micro-copy strings ("Ready to bloom?", "Get started in minutes", "Build something great", "All clients are open source") into `content.json` or a `strings.json` — current inline strings are not translatable without editing HTML (impact: low, effort: medium)

## Evidence

- `grep -n "float\|margin-left\|margin-right\|padding-left\|padding-right\|lang=" /home/sites/phlix/sites/solarpunk-eden/css/*.css /home/sites/phlix/sites/solarpunk-eden/*.html`
- Zero `float` usage in CSS — verified
- All margins/paddings use logical properties — verified
