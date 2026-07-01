# Localization Review — Manga Studio

**Reviewer:** CodeReviewer (adversarial, 12-dimension)
**Score: 88 / 100**
**Status: ⚠️ Should Fix**

---

## Summary

The site is localization-ready in its structure: `<html lang="en">` on all pages, CSS uses logical properties (inline-start/end) in most places, all user-visible substantive content traces to `content.json` (with the exception of page headers and section micro-copy which is brand-generated but acceptable per spec). The primary issue is the FAQ `<dt>` text being displayed in ALL CAPS via `text-transform: uppercase`, which would cause problems for right-to-left languages and is generally an inappropriate content transformation. Some CSS uses physical properties (left/right) rather than logical properties.

---

## Findings

### ✅ PASS

| Check | Evidence |
|-------|----------|
| `<html lang="en">` on all pages | All 8 HTML files: `<html lang="en">` ✅ |
| All user-visible strings trace to content.json (substantive claims) | Hero, pitch bullets, features, clients, ecosystem, FAQ, footer — all from content.json verbatim ✅ |
| Logical CSS properties used where appropriate | `padding-inline-start` on `.pitch-bullets li::before` theme.css:264 ✅; `inset-inline-start` on nav hover theme.css:77 ✅; `inset-inline-start` on mobile nav `top: 100%; inset-inline-start: 0;` components.css:104 ✅; `padding-inline` on containers, `margin-inline`, etc. ✅ |
| CSS custom properties for spacing scale | `--space-1` through `--space-24` in 4px increments ✅ |
| RTL-ready layout logic | Logical properties used in grid and flex layouts; no hardcoded left/right assumptions in layout containers ✅ |
| Subset fonts | Japanese-script fonts (Noto Sans JP) included for body; Latin script fonts for UI/headlines — appropriate subset for English site ✅ |
| No locale-unsafe formatting | All numbers are static; no `Intl` API usage that would vary by locale ✅ |
| Brand-flavored micro-copy acceptable per spec | Page headers ("Everything you need to run a media library that actually works", "Native apps for every screen you own") are not from content.json but are brand-flavored micro-copy allowed by spec (new_site.md §2: "you may add brand-flavored micro-copy drawn from the kit's voice") ✅ |

### ⚠️ SHOULD FIX

**1. FAQ `<dt>` uses `text-transform: uppercase` — RTL/compatibility issue**
- **File:** `css/theme.css:405`
- `.faq-item dt { text-transform: uppercase; }` — transforms FAQ question text
- `text-transform: uppercase` is not locale-aware — it won't correctly uppercase accented characters or non-Latin scripts. For example, German "ß" should become "SS", not "ß" (which stays as-is with `text-transform`).
- While this is an English-only site, using `text-transform` to alter content is a content accuracy issue (FAQ questions from content.json are visually changed), not just a localization issue
- **Fix:** Remove `text-transform: uppercase` from `.faq-item dt` in theme.css. Display the content as-is.

**2. Some CSS uses physical properties instead of logical properties**
- **File:** `css/components.css`
- `border-left` used at components.css:85 instead of `border-inline-start`
- `padding-left` appears in some hover states where `padding-inline-start` would be more appropriate for RTL
- However, these are non-critical: the site is English-only, and physical properties don't break RTL for this layout
- **Impact:** Low — the site is English-only; these properties work fine for the current locale
- **Fix (optional):** Replace physical left/right properties with inline equivalents for full RTL readiness

**3. Nav menu border-inline-start usage is inconsistent with mobile hover**
- **File:** `css/components.css:119–134`
- Desktop nav uses `border-inline-start` for active indicator (components.css:77, 89)
- Mobile nav overrides with `border-inline-start: none` and `border-bottom: 1px solid var(--color-border)` (components.css:122–128)
- The mobile override uses physical `border-bottom` rather than `border-block-end` — minor RTL concern
- **Impact:** Very low for English-only site

---

## Logical Properties Check

| Property | File | Line | RTL-Safe? |
|----------|------|------|-----------|
| `padding-inline-start` | theme.css | 254 | ✅ |
| `inset-inline-start` | theme.css | 264 | ✅ |
| `inset-inline-start` | components.css | 104 | ✅ |
| `padding-inline` | theme.css | 117, 124, 131 | ✅ |
| `margin-inline` | theme.css | 117, 123, 131 | ✅ |
| `margin-inline-auto` | theme.css | 117, 123 | ✅ |
| `border-inline-start` | components.css | 77 | ✅ |
| `border-inline-start` | components.css | 90 | ✅ |
| `border-left` (physical) | components.css | 85 | ⚠️ Should be `border-inline-start` |
| `border-bottom` (physical) | components.css | 122, 127 | ⚠️ Should be `border-block-end` for RTL |

---

## Score Breakdown

| Category | Score | Notes |
|----------|-------|-------|
| html[lang] correct | 20/20 | All 8 pages |
| Content from content.json | 18/20 | FAQ Q uppercased — content altered |
| Logical properties | 15/20 | Most used; some physical properties present |
| RTL-ready layout | 15/20 | Mostly RTL-safe; nav and some hover states use physical |
| No locale-unsafe formatting | 20/20 | All static content |
| Font subsets | 5/5 | Japanese + Latin appropriate for en site |
| **Total** | **93/105 → 88/100** |

---

*Review generated by CodeReviewer — Manga Studio adversarial review, dimension: Localization*
