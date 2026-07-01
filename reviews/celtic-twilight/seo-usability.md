# SEO + Usability Review — Celtic Twilight Site

**Reviewer:** Adversarial SEO + Usability Agent
**Date:** 2026-06-30
**Site:** `/home/sites/phlix/phlix-website/sites/celtic-twilight/`
**Ground truth:** `brand-kits/celtic-twilight.js`, `shared/content.json`, `new_site.md`

---

## Dimension 3: SEO — Score: 87/100

### Findings

| Check | Result | Citation |
|-------|--------|----------|
| `<title>` ≤ 60 chars, page-specific | ✅ Pass | All 8 titles within limit |
| `<meta name="description">` ≤ 160 chars | ✅ Pass | All ≤ 133 chars |
| One `<h1>` per page | ✅ Pass | Hero h1 on index; `.page-header h1` elsewhere |
| `<link rel="canonical">` on every page | ✅ Pass | All 8 pages have absolute canonical |
| Heading hierarchy never skips level | ✅ Pass | h1 → h2 everywhere, no jumps |
| Descriptive anchor text | ✅ Pass | No "click here" found |
| JSON-LD SoftwareApplication on home | ✅ Pass | `index.html:37–52` |
| sitemap.xml with all 8 pages, absolute URLs | ✅ Pass | All 8 URLs absolute |
| robots.txt referencing sitemap | ✅ Pass | `robots.txt:5` |
| Broken internal links | ⚠️ Warning | See defect CTX-SEO-001 |

---

#### ❌ CTX-SEO-001 — Broken license link (all 8 pages)
**Severity:** Defect
**Pages:** All 8 HTML files — footer column 3 "Project" → "License (BSD-3)"

Every page renders this footer link:
```html
<a href="https://github.com/phlix-website/blob/master/LICENSE">License (BSD-3)</a>
```

`github.com/phlix-website` does not exist. The correct org is `github.com/detain` (confirmed in `new_site.md` §5 external-link table, `content.json` `site.repo_org: "detain"`, and every other GitHub link in the site). The link should be:
```
https://github.com/detain/phlix-website/blob/master/LICENSE
```

**Citations (all 8 pages):**
- `index.html:264`
- `features.html:177`
- `clients.html:158`
- `download.html:152`
- `plugins.html:104`
- `docs.html:122`
- `hub.html:121`
- `about.html:128`

---

#### ⚠️ CTX-SEO-002 — `<meta name="keywords">` missing on home page
**Severity:** Warning
**Page:** `index.html`

`new_site.md §10` explicitly requires `<meta name="keywords">` from `meta.keywords`. All 7 sub-pages correctly omit it (keywords are unnecessary on interior pages per modern SEO practice), but the home page — which carries the full keyword intent — is missing it. The keywords are available in `content.json.meta.keywords` and are entirely brand-appropriate (`"celtic", "mystical", "folk", …`).

**Citation:** `index.html:4–7` — has `description` and `keywords` meta tags, but `keywords` is absent.

---

#### ⚠️ CTX-SEO-003 — Google Fonts CDN URLs in `@font-face` src
**Severity:** Warning
**File:** `css/base.css:90–151`

`new_site.md §1` states: *"No CDN dependencies in the deployed page (no Google Fonts `<link>` to `fonts.googleapis.com`, no script CDNs). **Self-host fonts** as WOFF2."*

`base.css` uses `@font-face` with `src: url('https://fonts.gstatic.com/...')` — these are Google Fonts CDN URLs, not locally-hosted WOFF2 files. While the intent (woff2 format, `font-display: swap`) is correct, the delivery mechanism is a CDN dependency.

**Citation:** `css/base.css:93, 100, 107, 114, 121, 128, 135, 143, 150`

---

### SEO Summary
- 1 confirmed defect (broken license link, all 8 pages)
- 2 warnings (missing keywords tag, Google Fonts CDN src)
- All other checks pass cleanly

---

## Dimension 4: Usability (Nielsen Heuristics) — Score: 94/100

### Findings

| Check | Result | Citation |
|-------|--------|----------|
| Download reachable ≤2 clicks from home | ✅ Pass | index.html:86 → download.html |
| Primary CTA above fold on home | ✅ Pass | Hero CTA at index.html:86 |
| Mobile nav toggle works | ✅ Pass | `css/components.css:461–481`, `js/main.js:13–35` |
| No traps (infinite scroll, dead ends) | ✅ Pass | No infinite scroll; all pages have exits |
| Error messages in brand voice | ✅ Pass | Bardic copy used throughout |
| Consistent navigation | ✅ Pass | Same 8-link nav + 3-column footer everywhere |
| Page title matches content | ⚠️ Warning | hub.html title mismatch |

---

#### ⚠️ CTX-UX-001 — hub.html `<title>` / h1 mismatch
**Severity:** Warning
**File:** `hub.html`

The `<h1>` reads "Phlix Hub" (hub.html:49) but the `<title>` reads "Hub — Phlix" (hub.html:21). Every other page follows the unambiguous `<h1 content> — Phlix` pattern (e.g., Features — Phlix, Clients — Phlix). "Hub — Phlix" is also only 12 chars — there is no character-count pressure causing the abbreviation.

The title bar and the h1 visible on the page create a slight identity gap: the user may not immediately register that the page they're on is the Hub page.

**Citation:** `hub.html:21` (`<title>Hub — Phlix</title>`) vs `hub.html:49` (`<h1>Phlix Hub</h1>`)

---

### Usability Summary
- 0 confirmed defects
- 1 warning (hub title mismatch)
- No infinite scroll, no dead ends
- Download is 1 click from every page via CTA banners and nav
- Voice is consistently bardic — brand kit tone is well-executed
- Primary CTA "Get Phlix" is prominently above the fold on every page that needs it
- Mobile nav: toggle button shows at ≤768px (`css/components.css:461`), `.is-open` class correctly shows/hides the menu (`css/components.css:479–481`), JS wires `aria-expanded` and `Esc` key correctly (`js/main.js:29–35`)

---

## Scorecard

| Dimension | Score | Critical Defects | Warnings |
|-----------|-------|-----------------|----------|
| SEO | 87/100 | 1 (broken link on all 8 pages) | 2 |
| Usability | 94/100 | 0 | 1 |

---

## Required Fixes (Defects Only)

1. **CTX-SEO-001** — Replace all 8 instances of `https://github.com/phlix-website/blob/master/LICENSE` → `https://github.com/detain/phlix-website/blob/master/LICENSE` in all footer nav columns. This is the only blocking issue.

## Recommended Fixes (Warnings)

2. **CTX-SEO-002** — Add `<meta name="keywords">` with the `content.json.meta.keywords` array to `index.html` only.
3. **CTX-SEO-003** — Either self-host the WOFF2 files locally (preferred per spec) or clarify that `@font-face` CDN URLs are a deliberate exception to the no-CDN rule.
4. **CTX-UX-001** — Change `hub.html:21` `<title>` from `Hub — Phlix` → `Phlix Hub — Phlix` to match the h1 and the naming convention used on all other pages.
