# Performance + Content Accuracy + CTA/Funnel Review
## Editorial Underground — 2026-07-01

---

## Performance — Score: 38/100

| Criterion | Status | Evidence |
|-----------|--------|----------|
| Fonts self-hosted WOFF2 | ❌ FAIL | `index.html:32-35`, all 8 pages |
| No render-blocking JS | ✅ PASS | `<script defer>` on all pages |
| LCP estimate | ✅ PASS | Hero text-only, no blocking image |
| Image weight og.png ≤120KB | ✅ PASS | 92 KB (`ls -la`) |
| Total transferred per page | ⚠️ WARN | ~120KB + CDN font overhead |
| CSS source readability | ✅ PASS | Commented, unminified (build-time minification separate) |

### Findings

- **❌ Fonts via Google Fonts CDN — CRITICAL VIOLATION** (`index.html:32-35`, and all other pages):
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
  ```
  `new_site.md §1` explicitly forbids CDN font dependencies: *"No CDN dependencies in the deployed page (no Google Fonts `<link>` to `fonts.googleapis.com` … Self-host fonts as WOFF2"* — this is a **direct spec violation on every page**.

- **✅ JS deferred**: `<script src="js/main.js" defer></script>` (`index.html:246`) — no render-blocking scripts anywhere.

- **✅ LCP**: Hero section is text + CSS gradients only, no hero image to block rendering. LCP will be text render.

- **✅ og.png**: `92 580 bytes ≈ 92 KB` — comfortably under the 120 KB budget.

- **⚠️ Total page weight**: Without fonts (self-hosted), estimated ~120–140 KB. With Google Fonts CDN, additional ~60–100 KB of font transfers per page session, plus DNS/TCP/TLS latency per page load. Significant regression from self-hosted WOFF2.

- **✅ CSS source**: Unminified with comments — `base.css`, `theme.css`, `components.css`. Per `new_site.md §6`: *"CSS is minified at build time — keep authored CSS readable and commented."*

---

## Content Accuracy — Score: 100/100

All 8 pages verified against `shared/content.json`. No invented claims, no unsupported clients.

| Check | Page | Status |
|-------|------|--------|
| `hero.eyebrow` | `index.html:87` | ✅ "Self-hosted media server" |
| `hero.headline` | `index.html:88` | ✅ "Your media. Your library. Your Phlix." |
| `hero.subheadline` | `index.html:89` | ✅ Exact match |
| 7 × `pitch_bullets[]` | `index.html:103-109` | ✅ All 7 match exactly |
| 8 × `features[]` (overview) | `index.html:119-194` | ✅ All 8 present |
| 8 × `features[]` (detail) | `features.html:72-154` | ✅ All 8 with correct `id`, `title`, `body` |
| 5 × `clients[]` | `clients.html:72-141` | ✅ All 5 match — name, tagline, highlights, status, repo |
| 5 × `ecosystem[]` | `download.html:152-171` | ✅ All 5 match name/repo/what |
| 6 × `faq[]` (q and a) | `about.html:113-141` | ✅ All 6 match exactly |
| `footer.tagline` | All pages | ✅ "Open-source media, on your terms." |
| `footer.columns` (3 cols) | All pages | ✅ Product / Developers / Project — all links correct |
| `meta.description` | All pages | ✅ "Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support." |
| No invented features | All | ✅ No unsupported claims detected |

### Findings

Content accuracy is **fully compliant**. All copy traced to `content.json` verbatim. No product claims deviate from `new_site.md §16` ground truth. The `og:image` meta references `og.png` (not `og.svg` as in content.json) but this is an acceptable adaptation per spec §8.

---

## CTA/Funnel — Score: 100/100

| Check | Evidence | Status |
|-------|----------|--------|
| Primary CTA above fold on `index.html` | `index.html:91` — `.hero-cta .btn.btn-primary` | ✅ |
| Primary CTA uses `.btn.btn-primary` | `index.html:91` | ✅ |
| At least one CTA drives to `download.html` | `index.html:91`, `index.html:204`, all cta-banners | ✅ |
| No page has >1 equally-prominent CTA | Hero has primary + secondary (intentional per spec §3.1) | ✅ |
| Download reachable in ≤2 clicks from home | Nav link = 1 click; hero CTA = 1 click | ✅ |

### Findings

Funnel is **fully compliant**. Download is reachable in 1 click from every page. Primary CTA ("Get Phlix") is visually dominant (electric yellow) and above the fold.

---

## Summary

| Dimension | Score | Blocking Issue |
|-----------|-------|----------------|
| Performance | **38/100** | ❌ Google Fonts CDN on every page (spec §1 explicit prohibition) |
| Content Accuracy | **100/100** | None |
| CTA/Funnel | **100/100** | None |

**Required remediation**: Replace all Google Fonts `<link>` elements (8 pages) with self-hosted WOFF2 fonts in `css/fonts/` + `@font-face` declarations in `base.css`. Fonts (Anton, Oswald 700, Space Mono 400/700) must be downloaded as WOFF2 subsets and served locally. This is the only remaining blocker — all other dimensions are compliant.
