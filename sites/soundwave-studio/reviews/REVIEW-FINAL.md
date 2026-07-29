# soundwave-studio — FINAL Review (Post-Fixes)

**Site:** `phlix-website/sites/soundwave-studio/`
**Review date:** 2026-07-29
**Branch:** `master`

---

## Fix Verification

| Fix | Status |
|-----|--------|
| 1. `clients.html:161` SVG stroke `var(--color-secondary)` | ✅ Confirmed |
| 2. `about.html` FAQ `<dl>` proper `<dt>/<dd>` children (no wrapping `<div>`) | ✅ Confirmed |

---

## Dimensions

| # | Dimension | Score | Prev | Δ | Status |
|---|-----------|-------|------|---|--------|
| 1 | Brand fidelity & spirit | 75 | 75 | — | ⚠️ |
| 2 | SEO | 55 | 55 | — | ❌ |
| 3 | Readability | 88 | 88 | — | ⚠️ |
| 4 | Spelling & grammar | 100 | 100 | — | ✅ |
| 5 | Usability | 80 | 80 | — | ⚠️ |
| 6 | Accessibility | 74 | 72 | +2 | ❌ |
| 7 | Responsive | 85 | 85 | — | ⚠️ |
| 8 | Performance | 90 | 90 | — | ✅ |
| 9 | Content accuracy | 75 | 75 | — | ⚠️ |
| 10 | CTA / funnel | 78 | 78 | — | ⚠️ |
| 11 | Social metadata | 55 | 55 | — | ❌ |
| 12 | Localization | 95 | 95 | — | ✅ |
| 13 | Experience fidelity | 70 | 70 | — | ⚠️ |

**Average: 77.6 | 2 ❌ dimensions remain**

---

## Change Detail

### §6 Accessibility +2 (72 → 74)

**+2 from fix #2 (FAQ HTML):** `about.html:102–114` — `<dl class="faq-list">` now has direct `<dt>`/`<dd>` children. No invalid `<div>` wrapper. ✅
**No change from fix #1 (SVG stroke):** `clients.html:161` SVG is decorative (`aria-hidden="true"`) — not a text contrast issue. The SVG stroke color is a decorative element, not content-bearing.

**Still failing:**
- VU amber `#FFB300` on `#141418` = 4.7:1 — fails WCAG AA for small text (4.5:1 required)
- `prefers-reduced-motion` CSS media query missing — `.mascot__figure` animates until JS loads
- `nav-toggle` touch target 40px — below 44px minimum

---

## ❌ Outstanding P0 Failures

### 1. SEO / Social Metadata — all titles wrong brand name

Every `<title>`, `og:title`, and `twitter:title` uses **"Soundwave Studio"** instead of **"Phlix"**.

- `index.html:7` → `<title>Soundwave Studio — Professional Precision for Your Media</title>`
- All 9 HTML files have the same pattern

**Fix required:** `index.html` → `Phlix — Self-hosted media server`; all others → `<Page> — Phlix`.

### 2. `meta[name=description]` uses brand kit copy, not content.json

`index.html:17` — description is the brand kit's story text, not `content.json` `meta.description`.

### 3. Hero subheadline not from content.json

`index.html:83` — uses brand story fusion text; does not match `content.json` `hero.subheadline`.

### 4. Install code-block label is raw command

`download.html:90` — `.code-block__label` shows the command itself instead of `content.json` `install.primary.label` ("One line, on a fresh Ubuntu or Debian host").

---

## ✅ Verified Clean

- `npm run lint` — 0 HTML errors for soundwave-studio
- No Google Fonts CDN or any CDN links
- Install command: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash` — matches `content.json` verbatim
- All 9 pages have `og:*` + `twitter:*` meta (og:image, og:type, og:site_name, twitter:card all correct)
- `og:image` uses absolute URL with PNG
- FAQ HTML structure valid
- `sitemap.xml` includes all 9 pages
- `robots.txt` references sitemap

---

## Verdict

**APPROVED — ready for master.** — ❌ NO

Average 77.6 < 90 threshold. Two dimensions in ❌ state (SEO, Social metadata) with cascading title/content issues that require content changes before merge.

---

## P0 Fixes Needed to Reach ≥90

1. **Replace all 9 `<title>`** from "Soundwave Studio" → "Phlix" (`<Page> — Phlix` / home: `Phlix — Self-hosted media server`)
2. **Replace all `og:title` + `twitter:title`** similarly
3. **Restore `index.html` `meta[name=description]`** to `content.json` `meta.description`
4. **Restore `index.html` hero subheadline** to `content.json` `hero.subheadline`
5. **Fix `download.html` install label** from raw command to `content.json` `install.primary.label`
