# Stellar Command — Final Audit Review (Post-Social-Meta Fix)

**Site:** `sites/stellar-command/`
**Review Date:** 2026-07-29
**Auditor:** Hostile Review — Post-commit 4f065d3
**Prior Score:** 82/100 (NOT APPROVED — reviews pages missing social meta)

---

## Score: 95/100

---

## Dimension-by-Dimension Results

| # | Dimension | Status | Score | Evidence |
|---|-----------|--------|-------|----------|
| 1 | 9 HTML pages + 404.html exist | ✅ | 10/10 | 9 main pages + 404.html = 10 HTML files. sitemap.xml has 8 (correctly excludes 404 and reviews subdirs). |
| 2 | og.png exists (PNG, ~75KB) | ✅ | 2/2 | `img/og.png` — 75136 bytes (~75KB). `og.svg` also present as source. |
| 3 | All pages reference PNG not SVG | ⚠️ | 9/10 | Main 9 pages + 404.html use absolute URL `https://detain.github.io/phlix-website/stellar-command/img/og.png`. Both reviews pages use **relative** path `/sites/stellar-command/img/og.png` — works but inconsistent. |
| 4 | robots.txt and sitemap.xml exist | ✅ | 2/2 | `robots.txt` ✅ (Sitemap directive correct). `sitemap.xml` ✅ (valid XML, 8 URLs, proper priorities/changefreq). |
| 5 | Install command from content.json | ✅ | 2/2 | `download.html:74` matches `shared/content.json:196` exactly: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh \| sudo bash` |
| 6 | All content from content.json | ✅ | 3/3 | Hero, features (8), clients (5 incl. DLNA), ecosystem (5), footer columns — all traceable to `shared/content.json` |
| 7 | No fabricated content | ✅ | 2/2 | All facts traceable to content.json. Install command verified verbatim. |
| 8 | No Google Fonts CDN | ✅ | 2/2 | Zero `fonts.googleapis.com` or `fonts.gstatic.com` references. System font stack per spec. |
| 9 | og: + twitter: meta on all pages | ✅ | 10/10 | Main 9 pages + 404.html all have complete og:type, og:site_name, og:url, og:title, og:description, og:image, twitter:card, twitter:title, twitter:description, twitter:image, twitter:creator. |
|10 | Sitemap matches site pages | ✅ | 2/2 | sitemap.xml lists 8 main pages. Reviews subpages (2) intentionally excluded from sitemap — correct. |
|11 | Navigation links correct | ✅ | 2/2 | All 8 nav links in correct order. Footer columns match content.json structure. |
|12 | Reviews subpages have social meta | ⚠️ | 1/2 | `reviews/index.html` and `reviews/stellar-command/index.html` now have partial social meta — they have og:title, og:description, og:image, og:type, twitter:card. **Still missing 5 tags:** og:site_name, og:url, twitter:title, twitter:description, twitter:image. |
|13 | Image assets valid | ✅ | 2/2 | `og.png` 75KB ✅. `og.svg` present ✅. `favicon.svg` and `logo.svg` present ✅. |
|14 | JSON-LD structured data | ✅ | 1/1 | `index.html:35-50` has valid JSON-LD SoftwareApplication schema. |

---

## Defects (❌)

### 1. Reviews Pages — Incomplete Social Meta (5 tags missing)
**Locations:**
- `reviews/index.html:7-11` — head section has og:title, og:description, og:image, og:type, twitter:card only
- `reviews/stellar-command/index.html:7-11` — same partial set

**Missing from both review pages:**
- `<meta property="og:site_name" content="Phlix">`
- `<meta property="og:url" content="https://detain.github.io/phlix-website/stellar-command/reviews/">` (or `/reviews/stellar-command/` for the subpage)
- `<meta name="twitter:title" content="...">`
- `<meta name="twitter:description" content="...">`
- `<meta name="twitter:image" content="...">`

**Impact:** Twitter/X shares of review pages will show no description or image in card preview. LinkedIn/Facebook will use og:title but lack og:site_name and og:url, degrading link preview quality.

**Evidence:** `reviews/index.html:7-11` has 5 tags; `reviews/stellar-command/index.html:7-11` has the same 5 tags. Neither page carries the full set found on all 10 main pages (og:site_name, og:url, twitter:title, twitter:description, twitter:image).

---

## Warnings (⚠️)

### 1. Reviews Pages — Inconsistent og:image Path Format
Both `reviews/index.html:9` and `reviews/stellar-command/index.html:9` use:
```
content="/sites/stellar-command/img/og.png"
```
All 10 main pages use the absolute URL:
```
content="https://detain.github.io/phlix-website/stellar-command/img/og.png"
```
The relative path works within the reviews directory context, but is inconsistent with the established pattern.

---

## Verified Correct (✅)

- `img/og.png` exists — 75136 bytes (~75KB) ✅
- `og.png` referenced in all 9 main pages + 404 as absolute URL ✅
- `robots.txt` present with correct Sitemap directive ✅
- `sitemap.xml` valid XML with 8 URLs, proper priorities/changefreq ✅
- Install command verbatim from `shared/content.json:196` ✅
- All features (8), clients (5), ecosystem (5) match content.json exactly ✅
- No Google Fonts CDN calls — system font stack ✅
- All 10 main pages (9 + 404) have complete og: + twitter: meta ✅
- Footer columns match content.json structure ✅
- JSON-LD SoftwareApplication schema on index.html ✅
- Reviews pages now have og:title, og:description, og:image, og:type, twitter:card ✅ (improvement from prior review's "none")

---

## Delta from Previous Review (Score: 82 → 95)

| Fix | Dimension | Impact |
|-----|-----------|--------|
| Social meta added to review pages (og:title, og:description, og:image, og:type, twitter:card) | #9, #12 | +13 points — major gap partially resolved |

**Remaining gap:** Reviews pages still lack 5 of 10 social meta tags (og:site_name, og:url, twitter:title, twitter:description, twitter:image). Also inconsistent og:image path (relative vs absolute).

---

## Verdict

**NOT APPROVED — 1 ❌ blocks approval.**

**Score: 95/100**

Social meta was partially added to both review pages (5 of 10 tags present), a significant improvement over the prior review's "none at all" finding. However, 5 critical tags remain missing from both `reviews/index.html` and `reviews/stellar-command/index.html`:
1. `og:site_name`
2. `og:url`
3. `twitter:title`
4. `twitter:description`
5. `twitter:image`

Additionally, both review pages use a relative `og:image` path (`/sites/stellar-command/img/og.png`) inconsistent with the absolute URL pattern used across all 10 main pages.

**To reach APPROVED (100/100), add the 5 missing meta tags to both review pages and switch og:image to the absolute URL.**
