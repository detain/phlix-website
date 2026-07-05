# DIMENSION 12: Localization Review

**Score: 72/100**

## Summary
`lang="en"` present. Logical properties used. All user-facing strings from content.json. **One critical issue: no self-hosted fonts (WOFF2), no @font-face declarations, no font subsetting.**

---

## Findings

### lang="en" on html Element (✅)

All 8 pages correctly set `<html lang="en">`:
- `index.html:2`, `features.html:2`, `clients.html:2`, `download.html:2`
- `plugins.html:2`, `docs.html:2`, `hub.html:2`, `about.html:2`

### Logical Properties (✅)

CSS uses logical properties throughout:

| Property | Usage | Location |
|----------|-------|----------|
| `margin-inline` | `.container`, `.cta-banner p` | `base.css:323`, `theme.css:107` |
| `padding-inline` | `.container` | `base.css:324` |
| `padding-block` | `.site-footer`, sections | `components.css:284`, `theme.css:137` |
| `inset` | `.dialog` | `components.css:733` |
| `border-inline` | Not used (no RTL-specific borders) | N/A |

No raw `left`/`right`/`margin-left`/`margin-right` in layout contexts. ✅

### content.json Strings (✅)

User-facing copy verified as sourced from `content.json`:

| String | content.json key | Verified on |
|--------|------------------|-------------|
| "Self-hosted media server" | `hero.eyebrow` | index.html:87 |
| "Your media. Your library. Your Phlix." | `hero.headline` | index.html:89 |
| Hero subheadline | `hero.subheadline` | index.html:90 |
| "Get Phlix" | `hero.primary_cta.label` | index.html:92, all CTA banners |
| "Read the docs" | `hero.secondary_cta.label` | index.html:93 |
| 7 pitch bullets | `pitch_bullets[]` | index.html:110-116 |
| 7 feature titles + bodies | `features[]` | index.html:128-183, features.html |
| 5 client cards | `clients[]` | clients.html, download.html |
| Ecosystem list | `ecosystem[]` | download.html:110-129 |
| 6 FAQ items | `faq[]` | about.html:87-110 |
| Footer columns | `footer.columns[]` | All pages footer |
| Footer tagline | `footer.tagline` | "Grid. Type. Truth." (brand kit voice override) |
| Meta description | `meta.description` | All page `<head>` |

Note: Footer tagline "Grid. Type. Truth." is the brand kit's `tagline_primary` — a legitimate brand-voice override per new_site.md §2 ("you may restyle... add brand-flavored micro-copy").

### Font Subsetting (❌ Critical Issue)

**Score deduction: -28**

The brand kit specifies Inter (headline, body, ui) and JetBrains Mono (mono). Per new_site.md §13 and §8:

> "**No CDN dependencies** in the deployed page (no Google Fonts `<link>` to `fonts.googleapis.com`, no script CDNs). **Self-host fonts** as WOFF2 and declare them with `@font-face` + `font-display: swap`."
> "Fonts self-hosted WOFF2 with `font-display: swap`; subset to used scripts."

**Current state:**
- No `css/fonts/` directory exists (`glob` returned no files)
- No `@font-face` declarations in any CSS file
- No Google Fonts `<link>` in any HTML `<head>` (good — no CDN dependency)
- Fonts fall back to system fonts only (Helvetica Neue, Helvetica, Arial for Inter; Courier for Mono)

**Issue:** The site uses system font fallbacks which means:
- Inter will never render — users get Helvetica/Arial instead
- JetBrains Mono will never render — users get Courier instead
- Brand typography (Inter Black 900, Barlow Condensed) is not achieved
- Brand fidelity failure — the site's visual identity depends on Inter

**Files affected:** `css/base.css:86-90` (font-family definitions)

**Recommendation:** Add self-hosted WOFF2 fonts:
1. Download Inter (400, 500, 600, 700, 800, 900 weights) and Barlow Condensed (800, 900) as WOFF2
2. Download JetBrains Mono (400, 500) as WOFF2
3. Place in `css/fonts/` directory
4. Add `@font-face` declarations with `font-display: swap`
5. Subset to Latin characters only (English only site per `supported_locales: ["en"]`)

---

## Severity

| Issue | Severity | Rationale |
|-------|----------|-----------|
| Font self-hosting | ❌ Critical | Brand typography not achieved; spec §13 explicit requirement |
| `lang="en"` | ✅ Pass | Correct |
| Logical properties | ✅ Pass | Properly used throughout |
| content.json strings | ✅ Pass | All copy from source |

**Overall: ❌ Critical** — font self-hosting is an explicit spec requirement in §13 with "self-hosted WOFF2" and "@font-face + font-display: swap" as the required mechanism. The current implementation has no font loading whatsoever.
