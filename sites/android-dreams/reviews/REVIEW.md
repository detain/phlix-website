# Android Dreams — Brand Kit Site Review

**Site:** `sites/android-dreams/`
**Review date:** 2026-07-29
**Overall:** ❌ **NOT APPROVED** — Multiple critical failures across all 13 dimensions.

---

## Summary

This site fails **11 of 13 dimensions**, many at 0 (complete absence). It is a
single landing page with fabricated content, missing pages, missing required files,
and no content.json integration. The brand kit's visual identity is well-executed,
but the implementation ignores the shared content contract entirely.

---

## 1. Brand Fidelity & Spirit

**Score: 45/100** ⚠️

**What passes:**
- Colors, typography, and visual style match the kit's cyberpunk/mechanical AI aesthetic
- Circuit patterns, mechanical eye, wireframe avatar are kit-authentic
- Motion design follows kit's easing and duration tokens
- Fonts (Orbitron, Share Tech Mono, Rajdhani) match the kit's declared fonts

**What fails:**
- Hero text "ANDROID DREAMS" is kit-fabricated, not content.json
- CTA labels "Initialize System" / "View Capabilities" are kit-branded, not Phlix CTAs
- The site **is not a Phlix marketing site** — it is an Android Dreams brand showcase
  that happens to mention Phlix exists somewhere

**Evidence:** `index.html:88-101`

---

## 2. SEO

**Score: 15/100** ❌

**Failures:**
- No `<title>` per-page pattern — "Android Dreams | Sentient Streaming" does not follow
  the required `<Page> — Phlix` / `Phlix — <tagline>` format (new_site.md §10)
- `<link rel="canonical">` is entirely absent
- No JSON-LD `SoftwareApplication` block on home page (§10)
- No `sitemap.xml` (selfcheck confirms missing)
- No `robots.txt` (selfcheck confirms missing)
- Heading hierarchy broken: h1 on hero, then subsequent sections use h2 for both
  section titles AND card titles inside those sections (violates §19.16)
- `<h1>` appears on index.html but the spec requires exactly one per page with
  h1=h1 on home, h1 on interior page headers

**Evidence:** `index.html:6` — title; `index.html` has no canonical, no JSON-LD

---

## 3. Readability

**Score: 55/100** ⚠️

**Passes:**
- Body text 16px minimum maintained
- Line-height 1.6 on body — adequate
- Max-width 65ch on paragraphs — correct
- Monospace body font is legible for the mechanical aesthetic

**Fails:**
- Text in chip elements uses 0.75rem (12px) — below comfortable reading size
- Footer binary (0.625rem, 10px) is decorative but still renders
- Some feature cards have insufficient contrast on secondary text

---

## 4. Spelling & Grammar

**Score: 70/100** ⚠️

No spelling errors detected. Grammar is correct. The invented testimonials
("Katherine R.", "Marcus T.", "Elena V.") are grammatically fine but fabricated —
see Content Accuracy.

---

## 5. Usability

**Score: 30/100** ❌

**Critical failures:**
- No navigation whatsoever — no header nav, no footer links to other pages
- All internal section links (`#features`, `#how`, `#reviews`, `#cta`) are anchors on
  a **single page** — there are no actual pages to navigate to
- Seven required pages are completely absent
- The "Download" CTA does not go to a download page — it is a `<button>` with no
  href at all (`index.html:95-98`)

**Buttons without destinations:**
```html
<!-- index.html:95-98 -->
<button class="btn btn-primary">
    <span class="btn-text">Initialize System</span>
```

---

## 6. Accessibility (WCAG 2.2 AA)

**Score: 25/100** ❌

**Critical failures:**
- ❌ No `#main-content` landmark on either page (selfcheck confirmed)
- ❌ No skip link (`.skip-link`) — mandatory per new_site.md §4 shell
- ❌ No `role="banner"`, `role="navigation"`, `role="contentinfo"` landmarks
- ❌ No `aria-label` on the (absent) nav element
- ❌ No `aria-current="page"` on any nav link
- ❌ `overflow: hidden` on `.scan-lines` (line 104-119 styles.css) — can hide
  content overflow at 200% text zoom
- ⚠ Touch targets: buttons are 44px+ but some `.footer-link` items may be smaller
- ⚠ 200% text zoom not tested via render-check (not run)

**Passes:**
- `:focus-visible` styles present with 2px cyan outline
- `prefers-reduced-motion` respected in CSS and JS

**Evidence:** `index.html:1-13` — no landmarks; `styles.css:104-119`

---

## 7. Responsive (320→1920)

**Score: 40/100** ⚠️

**Passes:**
- CSS Grid with `minmax()` for features and reviews
- `clamp()` used for font sizes
- `@media (max-width: 768px)` breakpoints present

**Fails:**
- No render-check performed (selfcheck warns)
- `overflow-wrap: anywhere` not applied to body text in narrow tracks — long words
  in feature cards at 320px will overflow (new_site.md §19.12)
- Grid tracks use `1fr` not `minmax(0, 1fr)` — will overflow at 320px

**Evidence:** `styles.css:459` — `grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));`
should be `minmax(0, 1fr)` per §19.12

---

## 8. Performance (self-hosted fonts, no CDNs)

**Score: 20/100** ❌

**Critical failures:**
- ❌ **Zero @font-face rules** — fonts are declared in CSS but no local WOFF2 files
  exist. The site will use system fallback fonts only, completely breaking the
  kit's typography (selfcheck confirmed: "0 @font-face rule(s)")
- ❌ No fonts directory at `css/fonts/` — no WOFF2 files present
- ⚠ The kit's `Orbitron` and `Share Tech Mono` are Google Font families that must
  be self-hosted as WOFF2 per §19.3

**Passes:**
- No Google Fonts CDN `<link>` tags in HTML
- No icon CDN
- No third-party JS libraries

**Evidence:** `styles.css:32-34` — font declarations exist but no @font-face src

---

## 9. Content Accuracy (install from content.json)

**Score: 0/100** ❌

**This is the site's most catastrophic failure. Nothing comes from content.json.**

**Fabricated features (not content.json):**
| Fabricated feature | content.json features |
|---|---|
| Eye Tracking | Library that organizes itself |
| Circuit Reveals | SyncPlay across the room or across the country |
| Servo Feedback | Transcoding that picks the right quality |
| Evolving Avatar | Multi-user, multi-profile, parental controls |
| Neural Processing | Live TV with DVR + EPG |
| Chip Architecture | DLNA for the devices you already own |
| _(6 missing features)_ | Plugin system with a real contract |
| _(6 missing features)_ | Phlix Hub — reach any of your servers from anywhere |

**Fabricated stats (§16 violation — static page cannot verify numbers):**
- "2,400,000 Neural Connections" — invented
- "99.7% Prediction Accuracy" — invented
- "47ms Avg Response Time" — invented
- "1024 Library Items Analyzed" — invented

**Fabricated testimonials (§19.7 — no fabricated quotes):**
- "Katherine R." quote — invented
- "Marcus T." quote — invented
- "Elena V." quote — invented

**CTA labels wrong:**
- `primary_cta` should be "Get Phlix" → href `/download` — shown as "Initialize System" with no href
- `secondary_cta` should be "Read the docs" → href `https://detain.github.io/phlix-docs` — shown as "View Capabilities" with no href

**Install command:** Not present. content.json `install.primary` is completely absent.

**Evidence:** `index.html:130-254` — features section; `index.html:328-349` — stats;
`index.html:362-424` — testimonials

---

## 10. CTA / Funnel

**Score: 10/100** ❌

- No path to download in ≤2 clicks — **there is no download page**
- Primary CTA "Initialize System" has no href at all — it is a `<button>`, not an `<a>`
- Secondary CTA "View Capabilities" also has no href
- No "Get Phlix" / "Download Phlix" label anywhere
- No "Read the docs" label anywhere
- Footer has only anchor links to sections on the same page

**Evidence:** `index.html:95-102`

---

## 11. Social Metadata (OG + Twitter, og:image PNG)

**Score: 15/100** ❌

**Present but broken:**
- `og:title` — "Android Dreams | Sentient Streaming" (not the required page-specific title)
- `og:description` — present but kit-specific, not content.json meta.description
- `og:image` — `img/og.png` is **relative** and the file **does not exist**
  (selfcheck confirmed missing)

**Entirely absent:**
- ❌ `og:url` — no absolute canonical URL
- ❌ `og:type`
- ❌ `og:site_name`
- ❌ `twitter:card`
- ❌ `twitter:title`
- ❌ `twitter:description`
- ❌ `twitter:image`
- ❌ `twitter:creator`
- ❌ `<link rel="canonical">`

**Evidence:** `index.html:3-12` — head is essentially empty of meta

---

## 12. Localization

**Score: 50/100** ⚠️

**Passes:**
- `<html lang="en">` set correctly
- `direction="ltr"` set in manifest.json

**Fails:**
- No `lang` attribute variant handling
- All user-facing strings are hard-coded, not traceable to content.json
- No RTL readiness — uses `left/right` in some properties instead of
  `inline-start/inline-end`

---

## 13. Experience Fidelity

**Score: 35/100** ❌

**Passes:**
- Mechanical eye, circuit reveals, wireframe avatar, servo interactions — all
  well-implemented and kit-authentic
- Animations respect `prefers-reduced-motion`
- Dark cyberpunk atmosphere is cohesive

**Fails:**
- The experience is **not a Phlix marketing site** — it is an art-piece landing page
  for the Android Dreams brand kit
- Seven required pages (Features, Clients, Download, Plugins, Docs, Hub, About)
  are absent, so the "experience" has no depth or conversion path
- No install instructions, no client downloads, no ecosystem information
- The "review" testimonials are actually system logs — the site doesn't even
  pretend to be a Phlix product site

---

## Required Fixes (Priority Order)

### P0 — Must fix before any other review
1. **Build all 8 pages + 404.html** per new_site.md §3 — currently only index.html exists
2. **Wire all content from shared/content.json** — hero, features (all 8), clients,
   ecosystem, faq, install, footer, meta
3. **Fix CTAs** — primary CTA must be `<a href="/download">Get Phlix</a>`,
   secondary `<a href="https://detain.github.io/phlix-docs">Read the docs</a>`
4. **Add canonical/SEO meta to every page** per §10 — title, description, canonical,
   keywords, JSON-LD
5. **Add social metadata to every page** per §11 — og:title/description/image (absolute),
   twitter:card/image/creator
6. **Self-host fonts** — add @font-face for Orbitron, Share Tech Mono, Rajdhani as
   WOFF2 in css/fonts/ — zero external font requests allowed
7. **Add missing files** — robots.txt, sitemap.xml, SITE.md, BUILD_LOG.md, img/og.png
8. **Add @copyright headers** to all CSS and JS files per §19.24
9. **Add #main-content to all pages** — both index.html and 404.html
10. **Add skip link** to all pages per §4 shell
11. **Add ARIA landmarks** — role="banner", role="navigation", role="main",
    role="contentinfo" on proper elements
12. **Fix grid tracks** — use `minmax(0, 1fr)` not bare `1fr` per §19.12
13. **Remove fabricated content** — stats, testimonials, non-existent features,
    fake install command

### P1 — Should fix
14. **Add proper nav header** with 8 links per §5 — Home · Features · Clients ·
    Download · Plugins · Docs · Hub · About
15. **Add footer** with 3 columns from content.json.footer.columns
16. **Fix 404.html** — add `<meta name="robots" content="noindex">`, add recovery links
    to pages, add #main-content landmark
17. **Fix CSS lint errors** — rgba→rgb, color-hex-length, media-feature-range
18. **Fix JS lint errors** — no-unused-vars, no-empty, no-undef

---

## Lint Results

```
HTML:  PASS (Scanned 668 files, no errors)
CSS:   FAIL — android-dreams/ has 26 lint errors (rgba notation, hex length,
       media-feature-range, single-line declarations)
JS:    FAIL — multiple errors including no-undef 'showEggNote', no-empty blocks,
       no-unused-vars
```

## selfcheck Results

```
[FAIL] android-dreams — 0 @font-face; 7 missing pages; 4 missing files;
       no @copyright headers; no #main-content landmarks
```

---

**Verdict: NOT APPROVED. 11 dimensions fail. Return to build.**
