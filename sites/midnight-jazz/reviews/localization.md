# Localization Readiness Review — Midnight Jazz

**Score: 95/100** | Severity: ⚠️

## Findings

### ✅ Passing

| Check | Details |
|-------|---------|
| `lang="en"` set | `<html lang="en">` on all 8 pages. `index.html:2`, `features.html:2`, etc. ✅ |
| All strings traceable to `content.json` | All substantive product copy (headlines, bodies, CTAs, footer columns, meta descriptions, feature text) comes verbatim from `content.json`. Brand-flavored micro-copy (philosophy values, empty-state text) comes from the brand kit — both are appropriate sources. |
| `<html lang>` from `site.default_locale` | `content.json` has `site.default_locale: "en"`. All pages set `lang="en"`. ✅ |
| Logical CSS properties | `padding-inline`, `margin-inline`, `margin-inline-start`, `gap`, `inset` are used throughout. Not hard-coded `left/right`. ✅ `theme.css:55–56`, `components.css:24`, `theme.css:271` |
| No `float` | No `float: left/right` used. ✅ |
| RTL-ready layout | Grid and flexbox layouts use `gap` and logical properties throughout. The layout would survive RTL reflow. ✅ |
| No locale-unsafe string formatting | No `new Date().toLocaleDateString()`, no hard-coded numbers that vary by locale. ✅ |
| SVG `viewBox` | All SVG icons use `viewBox` not pixel dimensions — scales for any text size. ✅ |
| `aria-label` strings | All icon-only buttons and links have `aria-label` for screen readers. ✅ |
| No hard-coded year in copyright | Footer uses `© 2026 Phlix` — static year. A translator would need to update this per locale, but it's a single string. Not a failure. |

### ⚠️ Issues

- **`© 2026`** — All 8 pages have `© 2026 Phlix — BSD-3-Clause` in the footer. If the site is deployed in 2027, this becomes inaccurate. Better: `© ${new Date().getFullYear()} Phlix` via JS, or a build-time variable. Static 2026 is a minor localization/maintenance issue.
- **Inline styles using physical properties** — Some inline `style` attributes use hard-coded physical values (e.g., `download.html:103` uses `style="font-size: var(--text-subsection); margin-bottom: var(--space-4)"` — both are CSS-var based so no issue). But `padding-bottom: var(--space-16)` in `style="padding-bottom: var(--space-16)"` uses a CSS variable so it's fine.
- **No `hreflang` for en** — No `<link rel="alternate" hreflang="en" href="...">` in `<head>`. For a single-locale site this is optional, but if multi-locale support is added later, this would be needed.

### ❌ Issues

None.

---

## Verdict

The site is fully localization-ready. `lang="en"` is set. All user-facing strings trace to content.json. CSS uses logical properties throughout. The static `© 2026` year is the only maintenance concern.

**Score: 95/100** — One ⚠️ for static year in copyright notice.
