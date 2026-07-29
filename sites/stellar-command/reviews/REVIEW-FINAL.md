# Stellar Command — Social Meta Tags Review (Final)

**Date:** 2026-07-29
**Scope:** Post-fix verification of 5 missing social meta tags on review pages + regression check

---

## Primary Checks: Review Pages

### `reviews/index.html`
| Tag | Status | Line |
|-----|--------|------|
| og:site_name | ✅ | 11 |
| og:url | ✅ | 12 |
| og:image (absolute) | ✅ | 9 |
| twitter:title | ✅ | 14 |
| twitter:description | ✅ | 15 |
| twitter:image | ✅ | 16 |

### `reviews/stellar-command/index.html`
| Tag | Status | Line | Notes |
|-----|--------|------|-------|
| og:site_name | ✅ | 11 | |
| og:url | ❌ | 12 | **WRONG** — points to root `/stellar-command/` instead of `/stellar-command/reviews/stellar-command/` |
| og:image (absolute) | ✅ | 9 | |
| twitter:title | ✅ | 14 | |
| twitter:description | ✅ | 15 | |
| twitter:image | ✅ | 16 | |

---

## Regression Check: All Pages

| Page | og:* tags | twitter:* tags | Total | twitter:creator | Score |
|------|-----------|----------------|-------|-----------------|-------|
| 404.html | 6 | 5 | 11/11 | ✅ | ✅ |
| about.html | 6 | 5 | 11/11 | ✅ | ✅ |
| clients.html | 6 | 5 | 11/11 | ✅ | ✅ |
| docs.html | 6 | 5 | 11/11 | ✅ | ✅ |
| download.html | 6 | 5 | 11/11 | ✅ | ✅ |
| features.html | 6 | 5 | 11/11 | ✅ | ✅ |
| hub.html | 6 | 5 | 11/11 | ✅ | ✅ |
| index.html | 6 | 5 | 11/11 | ✅ | ✅ |
| plugins.html | 6 | 5 | 11/11 | ✅ | ✅ |
| reviews/index.html | 6 | 4 | 10/11 | ⚠️ missing | ⚠️ |
| reviews/stellar-command/index.html | 6 | 4 | 10/11 | ⚠️ missing | ❌ |

**og:image absolute URLs:** All 11 pages use `https://detain.github.io/phlix-website/stellar-command/img/og.png` ✅
**og.png size:** 75,136 bytes (~73KB) ✅

---

## Defects

### ❌ Critical
1. **Wrong og:url on review detail page** (`reviews/stellar-command/index.html:12`)
   - Current: `https://detain.github.io/phlix-website/stellar-command/`
   - Expected: `https://detain.github.io/phlix-website/stellar-command/reviews/stellar-command/`

### ⚠️ Warning
2. **Missing twitter:creator on both review pages**
   - `reviews/index.html` — twitter:creator absent
   - `reviews/stellar-command/index.html` — twitter:creator absent
   - All other 9 pages + 404 have `twitter:creator`

3. **content.json not found**
   - File `sites/stellar-command/content.json` does not exist
   - User mentioned "install from content.json" — cannot verify install process

---

## Score

| Category | Score |
|----------|-------|
| Main pages (9 + 404) | 10/10 ✅ |
| reviews/index.html | 6/7 ⚠️ |
| reviews/stellar-command/index.html | 5/7 ❌ |
| content.json | 0/1 ❌ |

**Total: ~74/100**

---

## Verdict

**❌ NOT APPROVED** — 3 remaining defects

1. Fix `og:url` on `reviews/stellar-command/index.html:12` to match its actual URL
2. Add `twitter:creator` to both review pages (copies from other pages: `@detain`)
3. Provide or clarify `content.json` location
