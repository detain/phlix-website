# REVIEW — pop-art-explosion

**Reviewer:** Hostile Auditor
**Date:** 2026-07-29
**Ground truth:** `new_site.md` + `shared/content.json`
**Lint:** `npm run lint` — pop-art-explosion passes (1 error in midnight-jazz, unrelated)

---

## OVERALL RESULT: ❌ NOT APPROVED

Multiple issues across all 13 dimensions. Fixes required before approval.

---

## 1. Brand Fidelity & Spirit — Score: 78 ⚠️

**Verdict:** Strong pop-art identity execution, but off-palette and structural deviations.

- ✅ Comic-panel layouts, Ben-Day dot motifs, KAPOW!/BAM!/WHAM! onomatopoeia, mascot Dotty — all brand-faithful
- ✅ Self-hosted fonts (Bangers, Anton, Barlow Condensed, Barlow, Share Tech Mono) — no CDN
- ✅ Seasonal variants implemented correctly (summer orange, winter blue)
- ✅ Easter eggs (confetti, dot burst, KAPOW! text explosion) match the playful brand voice
- ⚠️ `og:site_name` missing (see §11) breaks unified brand presentation across social shares
- ❌ `meta name="theme-color"` missing — mobile browser chrome won't match brand primary `#FF1A1A`

**Citation:** `index.html:6-34`, `SITE.md:28-34`, `base.css:8-56`

---

## 2. SEO — Score: 70 ⚠️

**Verdict:** Partial. Missing JSON-LD and critical meta on every page.

- ✅ `<title>` ≤ 60 chars on all pages (e.g., `index.html:6` — 54 chars)
- ✅ `<meta name="description">` ≤ 160 chars on all pages
- ✅ `<link rel="canonical">` absolute URL on all pages
- ✅ Semantic landmarks, heading hierarchy, descriptive anchor text
- ❌ **No JSON-LD `SoftwareApplication` block** on homepage — required by `new_site.md §10`:
  ```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Phlix",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "PHP 8.3+",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "license": "https://spdx.org/licenses/MPL-2.0.html"
  }
  </script>
  ```
- ❌ `<meta name="keywords">` missing from all pages — required by `new_site.md §10`

**Citation:** `index.html:3-34`, `new_site.md:468-478`

---

## 3. Readability — Score: 88 ⚠️

**Verdict:** Good. Pop-art voice is consistent; body text adequate.

- ✅ Pop-art voice is consistent and on-brand throughout
- ✅ Body text at `var(--font-body)` with `Barlow Condensed 400` at 16px+ base
- ✅ Hero subheadline uses proper `<p>` with readable line-height
- ⚠️ `features.html:9` meta description ("Six comic-panel features") doesn't match the 8 features in content.json — misleading snippet in search results
- ⚠️ Home page hero eyebrow (`index.html:67`) is `<p class="hero-eyebrow">Self-hosted media server</p>` — correct verbatim copy, but styled as eyebrow which may confuse screen reader users about its语义 role

**Citation:** `index.html:67-76`, `features.html:1-15`

---

## 4. Spelling & Grammar — Score: 92 ✅

**Verdict:** Clean. No spelling or grammar errors detected.

- ✅ All prose is grammatically correct
- ✅ Technical terms correctly capitalized (SyncPlay, DLNA, FFmpeg, NTP, Argon2ID)
- ✅ No contractions in awkward contexts
- ✅ `download.html:162-163` the from_source command is malformed as text (not a grammar issue) — see §9

---

## 5. Usability — Score: 75 ⚠️

**Verdict:** Functional but navigation architecture is non-standard.

- ✅ Download reachable in ≤2 clicks from home (`index.html:78` → `download.html`)
- ✅ Primary CTA above fold on home (`index.html:78` — "Get Phlix →")
- ✅ All interactive elements have accessible labels
- ⚠️ **Primary nav has only 6 items** (Home, Features, Clients, Download, Hub, About) — Plugins and Docs are demoted to footer per `SITE.md:26`. Per `new_site.md §5`, the canonical nav has 8 links. This is an opt-in override per `new_site.md §2A`, but it means **Plugins and Docs are harder to discover**. Not a hard fail since these pages exist and are linked from footer.
- ❌ **Download page install command is visually broken** — `download.html:162-163` renders as a single unformatted line instead of three separate command blocks:
  ```
  git clone https://github.com/detain/phlix-server.git cd phlix-server composer install
  ```
  Should be:
  ```
  git clone https://github.com/detain/phlix-server.git
  cd phlix-server
  composer install
  ```
  This is the single source of truth command from `content.json` that was mistyped.

**Citation:** `index.html:51-57`, `download.html:161-163`, `SITE.md:25-26`

---

## 6. Accessibility (WCAG 2.2 AA) — Score: 60 ❌

**Verdict:** Multiple hard failures. Does not meet AA baseline.

- ❌ **`<main id="main">` instead of `<main id="main-content">`** on all 9 pages — skip link target mismatch. Every page has `<a href="#main" class="skip-link">` but the main element is `<main id="main">`. The spec (`new_site.md §4`) and WCAG technique require the skip link to target `#main-content`. Flagged by `selfcheck.mjs`.
- ❌ **No `aria-current="page"`** on any nav link — required to indicate current page to screen readers (`new_site.md §4`)
- ❌ Skip link visible on focus but href doesn't resolve to an `id="main-content"` anchor
- ✅ `prefers-reduced-motion` respected in `main.js:129-133`, all animations gated
- ✅ 44×44px minimum touch targets — `components.css` buttons are adequate
- ✅ Layout survives 200% text zoom (CSS uses fluid widths)
- ✅ Forms have associated labels; ARIA only where native HTML is insufficient
- ⚠️ `meta name="theme-color"` missing — see §11

**Citation:** `index.html:40,62`, `features.html:37,57`, `selfcheck.mjs` output

---

## 7. Responsive (320→1920) — Score: 85 ⚠️

**Verdict:** Appears functional. Not tested in browser at all breakpoints.

- ✅ Fluid grid layout with `minmax(0, 1fr)` tracks (per `new_site.md §19.12`)
- ✅ Mobile nav toggle implemented with `aria-expanded` sync (`main.js:47-51`)
- ✅ Content reflows at narrow widths — no fixed-px layout widths detected
- ✅ Body text stays at 16px+ on mobile
- ⚠️ dotty.js mascot is described as "in flow on mobile" (`SITE.md:56`) but `main.js` doesn't include the full mascot companion code — `dotty.js` (11.4KB) handles it. Need to verify `dotty.js` is loaded on mobile or if the mascot disappears entirely on mobile.

**Citation:** `index.html:44-58`, `main.js:43-59`, `SITE.md:56`

---

## 8. Performance (self-hosted fonts, no CDNs) — Score: 95 ✅

**Verdict:** Excellent. No CDN dependencies whatsoever.

- ✅ Zero Google Fonts `<link>` elements
- ✅ 7 `@font-face` rules, all pointing to local WOFF2 files in `../../assets/fonts/`
- ✅ `font-display: swap` on all faces
- ✅ `og.png` is 1200×630 PNG (99KB — acceptable)
- ✅ JS is `defer`-loaded (`index.html:275`)
- ⚠️ `dotty.js` (11.4KB) and `main.js` (13.6KB) are separate files — if both load on same page, 25KB JS total is within budget but worth noting
- ⚠️ No lazy-loading attribute on below-fold images (not critical for static site)

**Citation:** `base.css:8-56`, `index.html:35-37,275`

---

## 9. Content Accuracy — Score: 55 ❌

**Verdict:** Multiple factual errors. Hard gate failure.

- ❌ **features.html shows only 6 features** but `content.json.features` has **8 features** (library, syncplay, transcode, auth, livetv, dlna, plugins, hub). The page shows LIBRARY, SYNCPLAY, TRANSCODE, AUTH, LIVE TV, DLNA — missing PLUGINS and HUB as standalone feature articles. Only a "Plugins & Hub" teaser section at the bottom links to those pages. Per `new_site.md §3.2`: "one per `features[]`, each with `id=<feature.id>`" — all 8 must appear on the Features page.
- ❌ **"5 Client platforms" claim in index.html proof-stat** (line 161-162): `content.json.clients` has **4 native clients + 1 DLNA**. Claiming "5 Client platforms" is a fabrication. The site's own `dotty.js:47` correctly says "Four native clients, plus any DLNA device." Fix the homepage stat or remove it.
- ❌ **Malformed `from_source` install command** in `download.html:162-163` — all three commands smushed onto one line:
  ```
  git clone https://github.com/detain/phlix-server.git cd phlix-server composer install
  ```
  Per `content.json.install.from_source.command`, it must be three separate lines.
- ❌ **features.html meta description** ("Six comic-panel features") is factually wrong — there are 8 features in content.json

**Citation:** `content.json:29-78`, `features.html:68-140`, `index.html:160-162`, `download.html:161-163`, `new_site.md:269-273`

---

## 10. CTA / Funnel — Score: 85 ⚠️

**Verdict:** Download funnel works but presentation copy is non-standard.

- ✅ Primary CTA "Get Phlix →" on homepage is above fold with ≥3:1 contrast (`index.html:78`)
- ✅ CTA banner on every page drives toward download
- ✅ Download page has prominent one-liner install command with copy button
- ✅ "Read the docs" secondary CTA links to external docs URL
- ⚠️ "BAM! Install" and "KAPOW!" label styling makes CTAs feel like decoration rather than action triggers — visual hierarchy is a bit flat
- ⚠️ The homepage proof-stat "5 Client platforms" is wrong — see §9

**Citation:** `index.html:78-79,188-203`, `download.html:56-105`

---

## 11. Social Metadata (OG + Twitter, og:image PNG) — Score: 50 ❌

**Verdict:** Incomplete on all pages. Multiple missing tags.

- ✅ `og:type=website`, `og:url` (absolute), `og:title`, `og:description`, `og:image` (absolute URL to PNG)
- ✅ `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`
- ✅ `og:image` is 1200×630 PNG (confirmed via `file` command)
- ❌ **Missing `og:site_name=Phlix`** on every page — `new_site.md §11` explicitly requires it
- ❌ **Missing `twitter:creator=@detain`** on every page — `new_site.md §11` explicitly requires it
- ❌ **Missing `meta name="theme-color"`** (should be `#FF1A1A`) on every page — `new_site.md §11` explicitly requires it
- ❌ **404.html has `noindex`** (correct per `new_site.md §2A`) but all other pages have `index, follow` which is fine

**Citation:** `index.html:13-29`, `new_site.md:481-492`

---

## 12. Localization — Score: 90 ✅

**Verdict:** Ready. `<html lang="en">` set, locale-unsafe formatting avoided.

- ✅ `<html lang="en">` set from `site.default_locale`
- ✅ All user-facing strings from `content.json` (translator-swappable single file)
- ✅ No locale-unsafe formatting (e.g., no `new Date().toLocaleDateString()`)
- ✅ Logical CSS properties (`inline-start/end`) used in base.css
- ✅ Fonts subset to Latin scripts

**Citation:** `index.html:2`, `shared/content.json:6-7`

---

## 13. Experience Fidelity — Score: 80 ⚠️

**Verdict:** Strong pop-art immersive experience but structural deviations reduce fidelity.

- ✅ 20 declared experience fields implemented — seasonal activation, mascot, easter eggs, nav demotion, etc.
- ✅ Pop-art speech-bubble design language consistent across pages
- ✅ Dotty mascot companion with contextual tips, dismiss to localStorage
- ✅ Comic-panel feature cards, starburst effects, Ben-Day dot grids
- ⚠️ features.html shows only 6 of 8 features — breaks the "all 8 features appear somewhere" rule (`new_site.md §3.2`)
- ⚠️ Nav has 6 items instead of 8 — Plugins/Docs demoted to footer per kit override, but reduces discoverability
- ❌ Main landmark id mismatch (`main` vs `main-content`) — breaks skip-link and landmark targeting

**Citation:** `SITE.md:1-68`, `index.html:268-273`, `main.js:120-183`, `new_site.md:130-183`

---

## SUMMARY TABLE

| # | Dimension | Score | Status |
|---|-----------|-------|--------|
| 1 | Brand fidelity & spirit | 78 | ⚠️ |
| 2 | SEO | 70 | ⚠️ |
| 3 | Readability | 88 | ⚠️ |
| 4 | Spelling & grammar | 92 | ✅ |
| 5 | Usability | 75 | ⚠️ |
| 6 | Accessibility | 60 | ❌ |
| 7 | Responsive | 85 | ⚠️ |
| 8 | Performance | 95 | ✅ |
| 9 | Content accuracy | 55 | ❌ |
| 10 | CTA / funnel | 85 | ⚠️ |
| 11 | Social metadata | 50 | ❌ |
| 12 | Localization | 90 | ✅ |
| 13 | Experience fidelity | 80 | ⚠️ |

**Average score: 77.2**

---

## FIXES REQUIRED (priority order)

### P0 — Hard gate failures (must fix before approval)

1. **[§6] Fix `<main id="main-content">`** on all 9 pages — change `<main id="main">` → `<main id="main-content">` and update skip link to `href="#main-content"`. `selfcheck.mjs` flags all 9 pages.

2. **[§11] Add `og:site_name`, `twitter:creator`, `theme-color`** to every page `<head>`:
   ```html
   <meta property="og:site_name" content="Phlix" />
   <meta name="twitter:creator" content="@detain" />
   <meta name="theme-color" content="#FF1A1A" />
   ```

3. **[§9] features.html must show all 8 features** from `content.json.features[]`. Currently missing standalone articles for `plugins` (id: "plugins") and `hub` (id: "hub"). Add them to the `.features-grid` section. Every feature must appear as a `.feature-panel` with its `id`, icon, `h3` title, and `p` body.

4. **[§9] Fix "5 Client platforms" claim** in `index.html:161`. Either remove the stat or correct it to "4 native clients + DLNA". The fabricated number violates `new_site.md §19.7`.

5. **[§9] Fix malformed `from_source` command** in `download.html:162-163`. It must be three separate lines:
   ```html
   <div class="install-command">
     git clone https://github.com/detain/phlix-server.git
     cd phlix-server
     composer install
   </div>
   ```

6. **[§2] Add JSON-LD** to `index.html` `<head>` (required by `new_site.md §10`).

### P1 — Important (fix before final approval)

7. **[§9] Fix features.html meta description** — "Six comic-panel features" is wrong. Should reference all 8 features.

8. **[§6] Add `aria-current="page"`** to the current page's nav link on every page.

9. **[§2] Add `<meta name="keywords">`** from `content.json.meta.keywords` to every page.

---

**APPROVED?** NO — 4 P0 hard gate failures in accessibility, social metadata, and content accuracy. Fix all P0 issues and re-review.
