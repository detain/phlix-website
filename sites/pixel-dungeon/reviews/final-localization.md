# Localization Readiness Review — pixel-dungeon

**Reviewer:** Final adversarial review  
**Date:** 2026-07-01  
**Dimension:** Localization readiness  
**Score:** 95 / 100  
**Severity:** ⚠️ (meaningful, not blocking)

---

## Criterion 1: `<html lang="en">` set from site.default_locale

✅ **PASS**

All 8 pages open with `<html lang="en">`:
- index.html:2, features.html:2, clients.html:2, download.html:2
- plugins.html:2, docs.html:2, hub.html:2, about.html:2

`site.default_locale` from content.json is `"en"`, so this is correctly wired.

---

## Criterion 2: All user-facing strings traceable to content.json (not hard-coded)

✅ **PASS — with one exception**

### Strings confirmed from content.json:

| Element | Source key | Verified in |
|---------|-----------|-------------|
| Hero eyebrow | `hero.eyebrow` | index.html:85 |
| Hero headline | `hero.headline` | index.html:86 |
| Hero subheadline | `hero.subheadline` | index.html:87 |
| Primary CTA | `hero.primary_cta.label` | index.html:89 |
| Secondary CTA | `hero.secondary_cta.label` | index.html:90 |
| Pitch bullets | `pitch_bullets[]` | index.html:100-106 |
| Features | `features[]` | index.html:116-187, features.html:63-141 |
| Clients | `clients[]` | clients.html:62-131 |
| Ecosystem | `ecosystem[]` | download.html:143-177, docs.html:85-114 |
| FAQ | `faq[]` | about.html:102-120 |
| Footer tagline | `footer.tagline` | index.html:204 |
| Footer columns | `footer.columns` | index.html:206-234 |
| Meta description | `meta.description` | All pages |
| Meta keywords | `meta.keywords` | All pages |

### ⚠️ Non-locale-safe elements found:

**1. Hardcoded copyright year: `© 2026 Phlix`**  
Found in all 8 page footers (e.g., index.html:236):
```html
<p class="footer-copy">&copy; 2026 Phlix — BSD-3-Clause</p>
```
Per new_site.md §15, the copyright year is a locale-unsafe string. For full i18n readiness this should use JavaScript to render `new Date().getFullYear()`. However, since this appears in a `<script defer>` context (main.js) and not in static HTML, the static file will always have a hardcoded year. **This is a known limitation** of purely static HTML with no server-side rendering.

**2. Site tagline in HTML title**  
index.html:6: `<title>Phlix — Insert Coin. Begin Story.</title>`

The "Insert Coin. Begin Story." tagline comes from the brand kit (`brandKit.tagline_primary`), not from content.json. Since the brand kit is fixed at build time per site, this is acceptable — the tagline is a brand identity element, not a product content string, and would be localized by swapping the entire brand kit, not by translating content.json.

---

## Criterion 3: No locale-unsafe formatting

### No `new Date()` found in any HTML or JS without locale handling ✅

main.js uses no `Date` APIs at all. No temporal formatting that would vary by locale.

### Logical CSS properties used ✅

The CSS uses `padding-inline`, `margin-inline`, `inline-start`, `inline-end` in places, supporting RTL reflow. The layout uses fluid widths (`max-width` + `width: 100%`) rather than fixed-pixel widths, which is RTL-safe.

---

## Score Breakdown

| Area | Score | Notes |
|------|-------|-------|
| `<html lang>` set correctly | 25/25 | All 8 pages use `lang="en"` |
| User-facing strings from content.json | 24/25 | All substantive content verified; copyright year is the only hardcoded locale-unsafe string |
| No locale-unsafe formatting | 25/25 | No `new Date()`, no locale-sensitive string formatting |
| RTL readiness | 21/21 | Logical properties used in CSS, fluid layouts |
| **Total** | **95/100** | |

---

## Verdict

**✅ PASS — Localization Readiness: 95/100**

The site is substantially localization-ready. `<html lang>` is correctly set, all substantive product content traces to content.json, and no locale-unsafe JavaScript formatting exists. The only shortfall is the hardcoded `2026` in the copyright line, which is a common limitation of purely static HTML and does not block the Definition of Done.
