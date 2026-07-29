# REVIEW: Neural-Link Brand Kit Site

**Site:** `sites/neural-link/`
**Reviewer:** Hostile Audit
**Date:** 2026-07-29

---

## SUMMARY

**STATUS: REJECTED — MAJOR FAILURES ACROSS ALL 13 DIMENSIONS**

This is **not a Phlix brand kit site**. It is an entirely fabricated "Neural-Link" brain-computer interface marketing page that shares zero content with `shared/content.json`, implements none of the required 8 pages, and has no connection to Phlix whatsoever. The site ignores `new_site.md` entirely.

---

## DIMENSION SCORES

| # | Dimension | Score | Status |
|---|-----------|-------|--------|
| 1 | Brand fidelity & spirit | 0/100 | ❌ |
| 2 | SEO | 5/100 | ❌ |
| 3 | Readability | 45/100 | ⚠️ |
| 4 | Spelling & grammar | 70/100 | ⚠️ |
| 5 | Usability | 25/100 | ❌ |
| 6 | Accessibility (WCAG 2.2 AA) | 30/100 | ❌ |
| 7 | Responsive (320→1920) | 50/100 | ⚠️ |
| 8 | Performance (self-hosted fonts, no CDNs) | 0/100 | ❌ |
| 9 | Content accuracy (from content.json) | 0/100 | ❌ |
| 10 | CTA / funnel | 0/100 | ❌ |
| 11 | Social metadata (OG + Twitter, og:image PNG) | 5/100 | ❌ |
| 12 | Localization | 50/100 | ⚠️ |
| 13 | Experience fidelity | 0/100 | ❌ |

**Overall: 18/1300 ≈ 1.4%**

---

## 1. Brand Fidelity & Spirit — 0/100 ❌

**CRITICAL FAILURE: This is not a Phlix site.**

- Zero content from `shared/content.json` is used
- Product described is "direct brain-to-media interface technology" (`index.html:62-63`) — a hallucinated product unrelated to Phlix
- Site name throughout is "NEURAL-LINK", not "Phlix"
- Brand kit colors/fonts are correctly adopted from `neural-link.js`, but the entire **content** is fabricated
- Nav links (`index.html:37-41`) point to `#neural-map`, `#memory-palace`, `#synapse-gallery`, `#thought-stream` — all fake sections, not the required 8 Phlix pages
- Footer links (`index.html:414-417`) are fake: "Neural Protocol", "Synapse API", "Memory SDK", "Consciousness Docs" — none exist in `content.json`

**Required nav per `new_site.md` §5:** Home · Features · Clients · Download · Plugins · Docs · Hub · About. Zero match.

**Required footer per `content.json`:** Product (Features, Clients, Download, Plugins), Developers (Documentation, Server source, Plugin example, API reference), Project (GitHub org, Issues, Hub, License). Zero match.

---

## 2. SEO — 5/100 ❌

- `<title>` (`index.html:6`): "Neural-Link | Brain-Computer Interface Experience" — not Phlix, exceeds 60 chars with "Neural-Link | Brain-Computer Interface Experience" (54 chars, but wrong product)
- No `<meta name="keywords">` — spec requires it from `content.json.meta.keywords` (`new_site.md` §10)
- No `<link rel="canonical">` — spec requires absolute canonical URL per page (`new_site.md` §10)
- No JSON-LD `SoftwareApplication` block on home page — spec requires it (`new_site.md` §10)
- No `<meta name="robots" content="noindex">` on 404 page — spec requires it (`new_site.md` §2A/404)
- Heading hierarchy technically present but content is wrong product

**Reference:** `new_site.md` §10

---

## 3. Readability — 45/100 ⚠️

- Body font `Exo 2` is readable at 16px+ (`styles.css:42`)
- Line-height 1.6 (`styles.css:45`) and 1.8 (`styles.css:262`) is adequate
- Text contrast on dark backgrounds varies — readable in hero but some secondary text at 0.7 alpha may fail 4.5:1
- No prose content from `content.json` — fabricated "brain-computer interface" copy is readable but wrong product
- Code blocks absent entirely

---

## 4. Spelling & Grammar — 70/100 ⚠️

- No obvious spelling errors in fabricated copy
- However, fabricated stats "2847 Synaptic Paths" (`index.html:76`), "12 Memory Nodes" (`index.html:80`), "99.7% Clarity" (`index.html:84`) are invented — not traceable to any source
- Minor: "transmissi" in placeholder text is misspelled as "Transmit" (acceptable)

**Reference:** `new_site.md` §19.7 — "proof_strategy signals must be verifiable"

---

## 5. Usability — 25/100 ❌

- Contact form with "Neural ID", "Consciousness Level", "Synaptic Pattern" (`index.html:368-388`) fields — these are meaningless for a media server; no actual form submission handler
- Hero stats counter animation (`index.html:74-87`) — fabricated numbers, no connection to real product
- Memory palace section (`index.html:150-222`) — 6 rooms with fabricated "Neural Interface Demo", "Synaptic Animation" etc. thumbnails
- No actual download flow, no install commands from `content.json`
- Missing all 7 of 8 required pages (only index.html + 404.html exist)
- Service worker (`sw.js`) caches fabricated content

---

## 6. Accessibility (WCAG 2.2 AA) — 30/100 ❌

- **Contrast failures:** `#FF00FF` (primary magenta) on `#1A1A2E` (dark) = ~4.6:1 — passes for large text but fails for small text (needs 4.5:1); `#00FFFF` (cyan) on dark may be as low as 3.8:1 depending on shade
- **Touch targets:** palace-nav buttons at 48×48px (`styles.css:731-732`) — barely meets 44px minimum
- `prefers-reduced-motion` is respected — `styles.css:1447-1469` and checked in JS
- Skip link created by `a11y.js:72-78` but injected dynamically — spec requires it be in static HTML (`new_site.md` §4)
- No `aria-current="page"` on nav — spec requires it (`new_site.md` §4)
- Landmarks present (banner, navigation, main, contentinfo)
- 200% zoom untested but grid uses `1fr` not `minmax(0, 1fr)` — likely overflow per `new_site.md` §19.12

**Reference:** `new_site.md` §12, `new_site.md` §19.1, `new_site.md` §19.12

---

## 7. Responsive (320→1920) — 50/100 ⚠️

- Basic grid collapse exists (`styles.css:1340-1444`)
- Mobile menu implemented but uses absolute positioning that may overlap content
- Grid tracks use `1fr` not `minmax(0, 1fr)` — likely overflow at 320px per `new_site.md` §19.12
- No horizontal scrollbar check performed
- `overflow-wrap: anywhere` not found in CSS — long words will overflow

**Reference:** `new_site.md` §14, §19.12

---

## 8. Performance (self-hosted fonts, no CDNs) — 0/100 ❌

**CDN VIOLATION — EXPLICITLY FORBIDDEN:**

`js/head-tags.js:23-24`:
```js
{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' }
```

This directly violates `new_site.md` §1 rule: "No CDN dependencies in the deployed page (no Google Fonts `<link>` to `fonts.googleapis.com`, no script CDNs)."

The fonts `Orbitron`, `Rajdhani`, `Exo 2`, `Monda`, `Share Tech Mono` are referenced in CSS (`styles.css:12-14`) but are not self-hosted WOFF2 files in the repo.

**Reference:** `new_site.md` §1, §19.3

---

## 9. Content Accuracy (install from content.json) — 0/100 ❌

**ZERO content from `shared/content.json` is used.**

- Hero headline `index.html:56-60`: "CONNECT YOUR MIND TO MEDIA" — fabricated, not `content.json.hero.headline`
- Hero subheadline: fabricated techno-babble about "brain-to-media interface technology" — not `content.json.hero.subheadline`
- Pitch bullets: none (section absent entirely)
- Features: fabricated "Neural Map", "Memory Palace", "Synapse Gallery", "Thought Stream" — not the 8 `content.json.features[]`
- Clients: none (required `clients.html` missing)
- Install: absent (required `download.html` missing, no `content.json.install.primary.command`)
- FAQ: none (required `about.html` missing, no `content.json.faq[]`)
- Footer: fabricated "Neural Protocol", "Synapse API" — not `content.json.footer`

This is the most severe failure. Every factual claim in this site is invented.

**Reference:** `new_site.md` §2, `content.json`

---

## 10. CTA / Funnel — 0/100 ❌

- Primary CTA label "Initiate Link" (`index.html:67`) — not "Get Phlix" from `content.json.hero.primary_cta.label`
- Secondary CTA "Explore Memory" (`index.html:71`) — not "Read the docs" from `content.json.hero.secondary_cta.label`
- No download page (required `download.html` missing)
- No install command (required from `content.json.install`)
- Funnel dead-ends at contact form with "Neural ID" field

**Primary funnel rule** (`new_site.md` §5): "download goal must be reachable in ≤2 clicks from home, and primary CTA visible above the fold." Fails completely.

---

## 11. Social Metadata (OG + Twitter, og:image PNG) — 5/100 ❌

`js/head-tags.js:13-18` has partial OG/Twitter tags but:
- `og:image` absent — spec requires absolute URL to 1200×630 PNG (`new_site.md` §11, `new_site.md` §19.5)
- `og:site_name` absent — spec requires `og:site_name=Phlix` (`new_site.md` §11)
- `og:url` absent — spec requires absolute URL per page (`new_site.md` §11)
- `twitter:creator` absent — spec requires `twitter:creator=@detain` (`new_site.md` §11)
- `og:type` missing from index.html head (only in head-tags.js which is not loaded)
- `theme-color` meta tag points to `#1A1A2E` instead of kit primary `#FF00FF`

Only `favicon.svg` exists in img/ — no `og.png`.

**Reference:** `new_site.md` §11, §19.5

---

## 12. Localization — 50/100 ⚠️

- `<html lang="en">` set correctly (`index.html:2`)
- No i18n infrastructure — all strings hardcoded
- CSS uses logical properties partially (`inset` instead of `top/left`)
- `content.json` supports only `en` — site correctly does not attempt other locales

**Issues:** `content.json` is the single source for translations — if this were a real Phlix site, translation would require replacing that one file. Current site doesn't use it at all.

---

## 13. Experience Fidelity — 0/100 ❌

The site creates an immersive "brain-computer interface" experience with:
- Neural network canvas animation
- Memory palace 3D spatial navigation
- Synaptic firing effects on gallery items
- EEG brain scan visualizations
- Thought stream live feed

These are brand-faithful to the `neural-link.js` kit's "immersive" archetype and "brain-computer interface aesthetic" — but the kit is in the wrong context. The kit describes Phlix's visual identity, not a different product. The content is completely wrong product.

**The site is a brilliant execution of the wrong product.**

---

## REQUIRED FILES MISSING

Per `new_site.md` §1 and §2:

| File | Status |
|------|--------|
| `features.html` | ❌ MISSING |
| `clients.html` | ❌ MISSING |
| `download.html` | ❌ MISSING |
| `plugins.html` | ❌ MISSING |
| `docs.html` | ❌ MISSING |
| `hub.html` | ❌ MISSING |
| `about.html` | ❌ MISSING |
| `robots.txt` | ❌ MISSING |
| `sitemap.xml` | ❌ MISSING |
| `SITE.md` | ❌ MISSING |
| `BUILD_LOG.md` | ❌ MISSING |
| `img/og.png` | ❌ MISSING |
| `img/logo.svg` | ❌ MISSING |

---

## FIXES REQUIRED

1. **Rewrite all content from `content.json`** — the site must market Phlix, not a fictional brain-computer interface
2. **Implement all 8 required pages** — index.html, features.html, clients.html, download.html, plugins.html, docs.html, hub.html, about.html + 404.html
3. **Install self-hosted WOFF2 fonts** — remove Google Fonts preconnect from `head-tags.js`; use fonts from `shared/assets/fonts/`
4. **Add all required files** — robots.txt, sitemap.xml, og.png (1200×630 PNG), logo.svg, SITE.md, BUILD_LOG.md
5. **Fix canonical/OG URLs** — all absolute, pointing to `https://detain.github.io/phlix-website/neural-link/`
6. **Replace CTAs** — "Get Phlix" and "Read the docs" per `content.json.hero`
7. **Fix footer** — use `content.json.footer.columns` verbatim
8. **Fix nav** — 8 links per spec, not fake brain-interface sections
9. **Add JSON-LD** — SoftwareApplication on home page
10. **Add install commands** — from `content.json.install.primary.command` (the real one-liner, not `git clone && composer install`)
11. **Check contrast ratios** — measure all text/background pairs, derive kit-compatible tokens where failing
12. **Fix grid tracks** — `minmax(0, 1fr)` not `1fr` per `new_site.md` §19.12
13. **Remove service worker** — unnecessary complexity; spec doesn't require it

---

## VERDICT

**REJECTED.** This site cannot be approved. It is not a Phlix brand kit site — it is a beautifully executed but entirely incorrect implementation of a fictional product that shares nothing with `content.json` or the Phlix product. The visual design faithfully implements the `neural-link.js` brand kit, but the brand kit is for *Phlix* styled with a neural aesthetic, not for a different product.

All 13 dimensions fail or barely pass. No dimension scores above 70; most are 0–5.

**Start over with `content.json` as the single source of truth.**
