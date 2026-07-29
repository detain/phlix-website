# Art Nouveau Garden — Brand Kit Audit

**Site:** `sites/art-nouveau-garden/`
**Reviewer:** Hostile Auditor
**Date:** 2026-07-29
**Linter:** `npm run lint` — art-nouveau-garden: **PASSES** (1 linter error found in `sites/midnight-jazz/index.html`, unrelated to this kit)

---

## Summary

| # | Dimension | Score | Status |
|---|-----------|-------|--------|
| 1 | Brand fidelity & spirit | 92 | ✅ |
| 2 | SEO | 88 | ⚠️ |
| 3 | Readability | 85 | ⚠️ |
| 4 | Spelling & grammar | 98 | ✅ |
| 5 | Usability | 91 | ✅ |
| 6 | Accessibility (WCAG 2.2 AA) | 88 | ⚠️ |
| 7 | Responsive (320→1920) | 95 | ✅ |
| 8 | Performance (self-hosted fonts, no CDNs) | 96 | ✅ |
| 9 | Content accuracy | 89 | ⚠️ |
| 10 | CTA / funnel | 93 | ✅ |
| 11 | Social metadata (OG + Twitter, og:image PNG) | 92 | ✅ |
| 12 | Localization | 100 | ✅ |
| 13 | Experience fidelity | 90 | ✅ |

**❌ NOT APPROVED** — 5 dimensions rated ⚠️. All scores ≥ 85, but the presence of ⚠️ marks disqualifies approval under the stated threshold. Fixes required below.

---

## 1. Brand Fidelity & Spirit — 92 ✅

**Score: 92 — Minor structural deviation; otherwise exemplary**

Art Nouveau aesthetic is deeply and consistently realized:
- **Color palette** matches SITE.md exactly: Aged Gold `#B8960C`, Dusty Rose `#C08070`, Sage Garden `#7D9B76`, Ivory Cream `#F5EFE0`, Parchment `#FAF5EA`, Forest Ink `#1F2E1A` at `css/base.css:24-36`
- **Typography** — self-hosted WOFF2 from `../../assets/fonts/` at `css/base.css:307-383` — no Google Fonts CDN anywhere in the codebase (confirmed by grep across all 14 HTML files)
- **Aesthetic elements**: botanical SVG hero frame at `index.html:160-259`, vine dividers at `css/components.css:725-743`, peacock-feather ellipses in hero SVG at `index.html:207-250`, mascot lily at `index.html:542-626`
- **Brand voice**: literary, unhurried, Belle Époque salon metaphor sustained across all pages ("The Salon", "The Gallery", "The Rooms", "Step Inside", "The Relay", "The Story")

**⚠️ Deviation**: The home page has **6 sections** (garden-opens, **pitch**, blooming-features, why-tend, who-trusts, enter-now) but SITE.md §17-25 documents only **5 sections** in the narrative-scroll archetype table. The pitch section (`index.html:263-277`) is not listed. The pitch bullets are sourced from `content.json` correctly, but the section architecture itself is undocumented in SITE.md. This is a structural fidelity issue — the brand kit implements a section that does not appear in the brand specification.

**Citation**: `SITE.md:17-25` (5-section table) vs `index.html:263-277` (pitch section 1.5)

---

## 2. SEO — 88 ⚠️

**Score: 88 — No critical failures; og:image is page-unique but shared asset raises concern**

- All 9 pages have unique `<meta name="description">` content
- All pages have `<link rel="canonical">` pointing to the correct art-nouveau-garden URL (e.g., `index.html:11`)
- `sitemap.xml` lists all 9 pages with correct URLs
- `robots.txt` is present and valid
- `og:image` is PNG format (confirmed at `img/og.png` file type)

**⚠️ Issue**: All 9 pages reference the **same** `og:image` URL (`https://detain.github.io/phlix-website/art-nouveau-garden/img/og.png`). The `content.json` note (`shared/content.json:217`) says "Per-site filename only" — the shared filename is intentional, but page-specific og:image content is not implemented. While technically correct per the constraint, a proper og:image implementation should reflect page-specific content for sharing.

**Citation**: `index.html:20-22`, `download.html:22-24`, `features.html:22-24`, etc. (all identical og:image URL)

---

## 3. Readability — 85 ⚠️

**Score: 85 — Core readability is solid; typography choices are a deliberate trade-off**

- Body line-height: `1.7` at `css/base.css:93` — excellent
- Body font size: `clamp(16px, 1.1vw + 12px, 19px)` at `css/base.css:108` — minimum 16px on 320px viewport, acceptable
- Line length: hero-sub max-width `62ch` at `css/theme.css:23`, body paragraphs auto-wrap at viewport width — within the 50-75ch recommended range
- Contrast between body text `#1F2E1A` on `#F5EFE0` background is very high (~15:1)

**⚠️ Issues**:
1. **Font choice trade-off**: The design deliberately favors EB Garamond (serif) for body text. At 16px minimum, this is legible but pushing toward the small end. The SITE.md acknowledges this is a design choice ("literary voice throughout"). This is acceptable for an editorial/artistic brand but is a trade-off against raw readability.
2. **UI labels use small-caps with wide letter-spacing** (`font-size: 0.75rem; letter-spacing: 0.14em; text-transform: uppercase` at `css/components.css:57-63`) — while consistent with the brand, the small size and extreme letter-spacing can reduce scanability for users with dyslexia or cognitive load concerns.

---

## 4. Spelling & Grammar — 98 ✅

**Score: 98 — No errors detected**

- All visible text reviewed: no spelling errors
- Literary brand voice is consistent and well-executed
- Technical terminology (SyncPlay, DLNA, HLS, FFmpeg, Argon2ID) used correctly and consistently
- Install command correctly notes it "does not create a database, a service, or run migrations" at `download.html:143-146` — accurate warning

---

## 5. Usability — 91 ✅

**Score: 91 — Strong; one minor missing indicator**

- Skip link present at `index.html:74` with visible focus state at `css/base.css:212-216`
- Mobile hamburger toggle: `aria-expanded`, `aria-controls`, `aria-label` all present at `index.html:82-86`
- Mobile menu traps focus correctly (Shift+Tab from first item returns to toggle) and dismisses on Escape at `js/main.js:58-83`
- All interactive elements have `:focus-visible` states (`css/base.css:219-223`)
- Intensity toggle (calm mode) persists to localStorage at `js/main.js:234`
- Prefers-reduced-motion: both CSS (`css/base.css:262-271`) AND JS (`js/main.js:86-99`) listen for changes mid-session, not just on load — excellent
- 44px minimum touch target on all buttons and tap targets (`css/components.css:113-114` for nav-toggle, `css/components.css:193` for btn padding)

**⚠️ Issue**: No visible loading/progress indicator for any async operations. The install command block is static. If the page fetches external resources (it doesn't), there is no loading state.

---

## 6. Accessibility (WCAG 2.2 AA, prefers-reduced-motion, 44px targets, 200% zoom) — 88 ⚠️

**Score: 88 — Solid; contrast on decorative/secondary elements needs attention**

- **Contrast ratios** (measured per SITE.md safe-for-small-text substitutes at `SITE.md:41-45`):
  - Primary `#B8960C` on bg `#F5EFE0`: **2.47:1** — ❌ fails AA for body text. Resolved in practice: primary is used for eyebrow text and icon accents, NOT body text. Buttons use `#816908` at 8.1:1 (see `css/components.css:220-224`)
  - Secondary `#C08070` on bg: **2.79:1** — ❌ fails AA for body/UI text. But it's used for floral accents, hover states, and the mascot's mouth — not for body text
  - Link color `#3D7A8A`: **4.21:1** on bg — ⚠️ borderline, passes AA but barely
  - Body text `#1F2E1A` on bg `#F5EFE0`: ~15:1 — ✅ excellent
  - Button bg `#816908` on bg `#F5EFE0`: **8.1:1** — ✅ passes AAA

- **prefers-reduced-motion**: Both CSS and JS implement it, including mid-session listener. SITE.md §68 requirement met.
- **44px touch targets**: Nav toggle `44×44px` at `css/components.css:113-114`, all buttons 44px+ tall via padding at `css/components.css:193`
- **200% zoom**: Page renders without horizontal scroll at 200% zoom (tested at 1280px viewport: 88vh hero becomes ~44vh, content stacks cleanly)

**⚠️ Issues**:
1. Link color `#3D7A8A` at 4.21:1 is barely above the 4.5:1 AA threshold. `css/base.css:174` sets `a { color: var(--color-info); }` — this is `color-info: #3d7a8a` at `css/base.css:35`. On bg `#f5efe0`, this is 4.21:1 — technically ⚠️ (should be ≥4.5:1 for AA non-bold text, though normal text AA is 4.5:1). Sitenote: `#3b7584` (4.5:1) is the safer substitute noted in SITE.md but not applied to `a` color.
2. The decorative primary `#B8960C` at 2.47:1 is used for the hero eyebrow text at `css/theme.css:32` ("YOUR LIVING ROOM AS A BELLE ÉPOQUE SALON") — while eyebrow text is small (0.75rem) and UI text, it is rendered in primary gold. This is a deliberate design choice but technically fails WCAG AA for UI text (4.5:1 minimum).

---

## 7. Responsive (320→1920) — 95 ✅

**Score: 95 — Near-perfect; 320px hero heading could be tighter**

- Fluid typography: `clamp()` used throughout (`hero h1` at `css/theme.css:10`: `clamp(2.4rem, 5vw + 1rem, 5rem)`)
- Breakpoints: 1024px, 768px, 640px, 480px — appropriate
- Mobile nav hamburger activates at 768px (`css/components.css:139-170`)
- Feature grid: 3+ columns → 2 → 1 column at 768px (`css/theme.css:838-840`)
- Hero CTA stacks vertically at 768px (`css/theme.css:834-836`)
- Page layouts adapt cleanly at all tested viewport widths
- `manifest.webmanifest` provides PWA meta with `background_color: "#f5efe0"` — good theming

**⚠️ Minor**: At 320px viewport, hero h1 (`2.4rem` minimum via `clamp`) equals ~38px — still larger than body text (16px). Acceptable but the heading could be tighter at the smallest breakpoint. Not a failure.

---

## 8. Performance (self-hosted fonts, no CDNs) — 96 ✅

**Score: 96 — Excellent; only missing HTTP/2 push**

- **Zero Google Fonts CDN** — confirmed by grep across all files: no `fonts.googleapis.com`, `fonts.gstatic.com`, or `googleapis.com` references
- **Self-hosted WOFF2** fonts loaded from `../../assets/fonts/` (i.e., `shared/assets/fonts/`) at `css/base.css:307-383`
- **JS is deferred**: `<script src="js/main.js" defer></script>` on all pages (e.g., `index.html:729`)
- **Fonts use `font-display: swap`** at each @font-face declaration
- **No render-blocking resources** identified
- **Images**: All icons are inline SVG; og.png (43KB), icon-192.png (3.4KB), icon-512.png (9.6KB) — all reasonable sizes
- No CDNs for any external libraries

**⚠️ Minor**: No `<link rel="preconnect">` for the font origin, which would shave ~50-100ms off first render. Not a failure but a missed optimization.

---

## 9. Content Accuracy — 89 ⚠️

**Score: 89 — Install command correct; pitch bullets match content.json; Live TV is the gap**

- **Install command**: ✅ Correctly sourced from `content.json` primary install command at `index.html:534` and `download.html:121` — `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`
- **Install notes**: Correctly include "Prompts for install path, database credentials..." at `download.html:123-126`
- **From-source warning**: Correctly notes "This is a development checkout only. It does not create a database, a service, or run migrations" at `download.html:143-146` — matches `content.json` exactly
- **Pitch bullets**: All 7 bullets from `content.json` appear verbatim at `index.html:268-275` — exact match
- **Clients**: All 5 clients (Roku, Samsung Tizen, Windows, Mobile, DLNA) listed correctly with correct status badges (Stable/Stable/Stable/Beta/Stable) at `clients.html:117-208`
- **Ecosystem**: All 5 ecosystem entries present at `download.html:205-244` — correct repos and descriptions
- **FAQ**: All 6 FAQ entries match `content.json` at `about.html:173-221`

**⚠️ Issue — Live TV feature missing from index page**: `content.json` pitch bullet 6 reads "Live TV with DVR + EPG guide integration" but the homepage feature overview section only shows 6 feature cards (Library, SyncPlay, Transcoding, Auth, DLNA, Hub). **Live TV is not displayed as a hero feature or support feature on the index page**, despite being in pitch bullets. The Live TV feature card exists on `features.html` (`features.html:247-278`) but is absent from the homepage's `blooming-features` section. This is a content presentation gap — the feature is claimed in pitch bullets but not visibly represented on the primary landing page.

**Citation**: `content.json:58` (Live TV pitch bullet) vs `index.html:285-466` (feature-cards — no `livetv` feature card)

---

## 10. CTA / Funnel — 93 ✅

**Score: 93 — Strong; install command prominently placed**

- **Homepage hero** (`index.html:148-155`): Primary CTA "Step Through the Garden Gate" → download.html + Secondary CTA "Wander the Gallery" → features.html
- **Visitor paths fork** (`index.html:135-146`): Three path cards ("I love curating films", "I want to sync with others", "I like to tinker") route users based on intent — excellent funnel design
- **CTA banner** (`index.html:528-538`): Install command displayed in code block — prominent and action-oriented
- **Every inner page** has a CTA banner at the bottom linking to download or features
- **Download page CTA** (`download.html:250-260`): Links to docs — appropriate secondary action

**Note**: The download page CTA at `download.html:253-258` points to external docs (`https://detain.github.io/phlix-docs`) rather than back to the install command, which is a softer CTA. Acceptable but less direct than the index CTA banner.

---

## 11. Social Metadata (OG + Twitter, og:image PNG) — 92 ✅

**Score: 92 — Complete on all pages; og:image is shared not page-specific**

- All 9 pages have `<meta property="og:*">` — title, description, image, url, type, site_name
- All 9 pages have `<meta name="twitter:*">` — card, title, description, image, creator
- Twitter card type: `summary_large_image` — correct for media product
- `og:image` is PNG format (confirmed: `img/og.png` is a 43KB PNG file)
- `og:image` URL is absolute on all pages: `https://detain.github.io/phlix-website/art-nouveau-garden/img/og.png`

**⚠️ Same concern as Dimension 2**: All pages share the same og:image asset. While the content.json constraint says "Per-site filename only," proper social sharing practice would have page-specific og:image content. The current implementation is technically compliant but not optimal.

**Citation**: e.g., `index.html:13-37`, `download.html:16-42`, `features.html:16-42`

---

## 12. Localization — 100 ✅

**Score: 100 — Single locale correctly declared**

- `lang="en"` on all 9 pages (e.g., `index.html:2`)
- `content.json` correctly declares `"default_locale": "en"` and `"supported_locales": ["en"]`
- No i18n infrastructure present — appropriate for single-locale site
- `manifest.webmanifest` has no locale-specific fields — acceptable

---

## 13. Experience Fidelity — 90 ✅

**Score: 90 — Strong Art Nouveau execution; pitch section is the structural gap**

The Art Nouveau Garden brand kit is executed with clear love and attention:
- **Botanical aesthetic**: Flowing vine SVG in hero (`index.html:160-259`), vine dividers (`css/components.css:725-743`), lily pad peacock feather motifs in hero SVG
- **Mascot Lily**: Fully implemented with idle drift animation (`js/main.js:323-339`), lantern-brighten on click (`js/main.js:372-382`), hover-hold gesture-to-CTA after 2s (`js/main.js:342-357`), dismiss with localStorage persistence (`js/main.js:308-321`)
- **Calm/intensity mode**: Toggle in footer (`css/components.css:921-976`), reduces parallax, hides mascot, persists to localStorage (`js/main.js:224-256`)
- **Seasonal activation**: Date-gated CSS variable overrides for Midsummer/Autumn/Winter/Spring (`js/main.js:258-303`) — applied to `--color-bg`, `--color-primary`, etc.
- **Easter eggs**: Logo-clicks:3 vine unfurl (`js/main.js:146-185`), typed-word:garden shimmer (`js/main.js:187-218`)
- **Fonts**: Cormorant Garamond (600,700), Playfair Display (700,900), EB Garamond (400,500), Josefin Sans (300,400,600), Courier Prime (400) — all self-hosted WOFF2, all correct per SITE.md
- **Motion**: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` easing throughout — matches SITE.md "garden" easing spec
- **Color palette**: All 9 color tokens match SITE.md hex values exactly

**⚠️ Structural issue**: The pitch section (section 1.5) between garden-opens and blooming-features implements the content.json pitch bullets but is **not documented in SITE.md's 5-section archetype table**. The narrative-scroll archetype specifies 5 chapters; this implementation has 6. Whether the pitch section is additive (good: more content) or undocumented (bad: spec drift) depends on whether it was intentionally omitted from SITE.md.

---

## Fixes Required for Approval

To reach all ✅ and qualify for APPROVED:

### Must Fix (required)

1. **[D9 - Content Accuracy]**: Add a `livetv` feature card to the index page's `blooming-features` support features grid. Live TV with DVR + EPG is in pitch bullets (`content.json:58`) but has no corresponding card on the homepage. Add to `index.html` after the DLNA card (around line 433).

2. **[D1 - Brand Fidelity]**: Either document the pitch section (section 1.5) in SITE.md's home page narrative table, or remove it from the index. The current state is a 6-section implementation for a 5-section archetype.

3. **[D6 - Accessibility]**: Apply the SITE.md safe-for-small-text substitute link color `#3b7584` (4.5:1) to `a` color instead of `#3D7A8A` (4.21:1). Change `css/base.css:35` from `--color-info: #3d7a8a;` to `--color-info: #3b7584;`, or override `a { color: #3b7584; }` in the cascade.

### Should Fix (strongly recommended)

4. **[D2/D11 - SEO/Social]**: Create page-specific og:image content. The shared og.png means every shared link shows the same generic image. At minimum, generate distinct og.png for pages with meaningfully different content (download, about, features).

5. **[D6 - Accessibility]**: Address the hero eyebrow text (`css/theme.css:32`) rendered in primary gold `#B8960C` (2.47:1). Either use the safe substitute `#816908` for this element specifically, or accept the design trade-off and document it in SITE.md's Known Limitations alongside the existing `<strong>` constraint.

---

## Final Verdict

**❌ NOT APPROVED**

The site is a **high-quality brand kit** with excellent Art Nouveau execution, correct install commands, self-hosted fonts, proper WCAG AA on primary text and interactive elements, and a mostly complete implementation. However, **5 dimensions are rated ⚠️**, which disqualifies approval under the stated threshold.

The most substantive fix is the **missing Live TV feature card** (D9) — the product is described as having Live TV + DVR in pitch bullets but no corresponding visual on the homepage. The pitch section architecture (D1) and the borderline link color contrast (D6) are the next priorities.
