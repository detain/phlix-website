# REVIEW — speakeasy-gold

**Reviewer:** Hostile audit against `new_site.md` + `shared/content.json`
**Date:** 2026-07-29
**Lint:** `npm run lint` — PASSES (zero warnings)

---

## Summary

Two spec violations found. Neither is cosmetic. Both must be fixed before approval.

| # | Dimension | Score | Status |
|---|-----------|-------|--------|
| 1 | Brand fidelity & spirit | 92 | ✅ |
| 2 | SEO | 95 | ✅ |
| 3 | Readability | 87 | ⚠️ |
| 4 | Spelling & grammar | 100 | ✅ |
| 5 | Usability | 93 | ✅ |
| 6 | Accessibility (WCAG 2.2 AA) | 94 | ✅ |
| 7 | Responsive (320→1920) | 90 | ✅ |
| 8 | Performance | 95 | ✅ |
| 9 | Content accuracy | 85 | ⚠️ |
| 10 | CTA / funnel | 88 | ⚠️ |
| 11 | Social metadata | 98 | ✅ |
| 12 | Localization | 100 | ✅ |
| 13 | Experience fidelity | 91 | ✅ |

**Result: NOT APPROVED.** Fixes required — see §FIXES.

---

## 1. Brand Fidelity & Spirit — 92 ✅

**`sites/speakeasy-gold/SITE.md`** documents the full Art Deco speakeasy concept correctly. Every visual decision traces to the kit:

- **Palette**: Champagne Gold `#C9A84C` primary, Midnight Black `#0A0806` background, Art Deco Emerald `#2E7D5E` secondary — all match SITE.md color table (`SITE.md:15-26`).
- **Typography**: Poiret One headlines, Cinzel Decorative display, Cormorant Garamond body, Josefin Sans UI — all self-hosted from `../../assets/fonts/` (`theme.css:11-97`). No Google Fonts CDN. ✅
- **Motion**: Art Deco ease-in-out at 200–350ms; champagne bubble particles for easter egg; `prefers-reduced-motion` respected (`base.css:194-203`, `main.js:47-54`). ✅
- **Voice**: "The Lobby", "The Vault", "Get the Password", "Gilda", "Dim the House Lights" — speakeasy voice is consistent and on-brand.
- **Contrast fixes**: `#3b8568` for secondary-safe, `#7d7773` for text-muted-safe — measured and applied per §19.1 (`SITE.md:30-31`). ✅

**Minor note**: Primary nav has 6 links instead of 8 (Plugins and Docs demoted to footer per `site_architecture` override — `BUILD_LOG.md:15`). This is a legitimate kit override per §2A, not a defect. All 8 pages still exist and are reachable.

**Deducted**: 8 pts for the nav-architecture divergence from the default 8-link spec (even though allowed, it reduces discoverability of Plugins/Docs).

---

## 2. SEO — 95 ✅

- `<title>` on all pages ≤ 60 chars: `index.html:6`, `features.html:6`, `clients.html:6`, etc. ✅
- `<meta name="description">` ≤ 160 chars on all pages. ✅
- `<meta name="keywords">` present on all pages. ✅
- `<link rel="canonical">` absolute on all pages. ✅
- JSON-LD `SoftwareApplication` block on `index.html:26-41`. ✅
- Single `<h1>` per page; heading hierarchy never skips levels. ✅
- Descriptive anchor text throughout (no "click here"). ✅
- `sitemap.xml` has all 8 canonical pages with absolute `<loc>` (`sitemap.xml:1-27`). `404.html` excluded (correct, `noindex`). ✅
- `robots.txt` references the sitemap (`robots.txt:3`). ✅

---

## 3. Readability — 87 ⚠️

- Body text is `1rem` / `16px` — never drops below the minimum (`base.css:148`). ✅
- Line-height `1.72` on body is comfortable. ✅
- `color-text: #f2e8d9` on `color-bg: #0a0806` — high contrast, readable. ✅
- **⚠️** Sections like "Why step inside?" (`index.html:168-178`) contain long, narrative prose paragraphs (60–90 words). This is a deliberate speakeasy brand choice (`narrative-scroll` archetype per `BUILD_LOG.md:14`) but negatively impacts readability on mobile. Not a spec failure — the kit chose this — but the trade-off costs points.

---

## 4. Spelling & Grammar — 100 ✅

Zero spelling or grammar errors detected across all 9 HTML pages, 3 CSS files, and JS. Professional quality throughout.

---

## 5. Usability — 93 ✅

- Download reachable in ≤2 clicks from home (hero CTA → `download.html`). ✅
- Primary CTA above the fold on `index.html:73`. ✅
- Skip link first focusable element (`index.html:45`). ✅
- Mobile hamburger menu at `768px` (`components.css:121`). ✅
- Touch targets ≥44×44px on all buttons (`components.css:246-247`: `min-height: 48px; min-width: 48px`). ✅
- Visible `:focus-visible` ring (`base.css:171-174`: `2px solid var(--color-focus)`). ✅
- `<a href="download.html" class="btn btn-primary">You Know the Password</a>` on `index.html:73` — CTA mislabels its destination (see Dimension 10). **Downgrade due to CTA label mismatch.**

---

## 6. Accessibility (WCAG 2.2 AA) — 94 ✅

- **Contrast**: Kit measured unsafe colors and derived substitutes (`SITE.md:30-31`). Primary gold `#C9A84C` on `#0A0806` ≈ 11:1 (AAA). Ivory cream `#f2e8d9` on `#0a0806` ≈ 14:1 (AAA). Muted text `#7d7773` on `#0a0806` ≈ 5.2:1 (AA). All pass. ✅
- Keyboard reachable; `tabindex` never positive. ✅
- `aria-expanded` kept in sync on nav toggle (`main.js:23`). ✅
- `aria-current="page"` on active nav link (e.g., `features.html:39`). ✅
- Landmarks: `role="banner"`, `role="navigation"`, `main`, `role="contentinfo"` — one each. ✅
- `prefers-reduced-motion` respected (`base.css:194-203`, `main.js:47-54`, `main.js:91-96`). ✅
- `base.css:194-203` uses `animation-duration: 0.01ms !important` and `transition-duration: 0.01ms !important` under reduced-motion — slightly aggressive but acceptable (instant cross-fade, not complete removal). ✅
- Images have `alt` attributes; decorative SVGs omitted appropriately. ✅
- **Minor**: `intensity-toggle` checkbox at `components.css:481-513` has no visible label text (only `aria-label` on input). Screen readers can access it but sighted users see only the toggle track. Acceptable WCAG 2.5.3 (label in name) given the visual design intent. ⚠️

---

## 7. Responsive (320→1920) — 90 ✅

- Fluid grid: `repeat(auto-fill, minmax(280px, minmax(0, 1fr)))` on features grid (`theme.css:306`) and all card grids. ✅
- `minmax(0, 1fr)` used on all grid tracks — the §19.12 fix. ✅
- `overflow-wrap: anywhere` on body text (`base.css:130`). ✅
- `hyphens: auto` on headings (`base.css:140`). ✅
- No fixed-px layout widths; all use `max-width` + fluid `width: 100%`. ✅
- Mobile nav collapses to hamburger at `768px` (`components.css:121`). ✅
- No horizontal scroll at any tested width. ✅
- `clamp()` used for font sizes (`theme.css:106`). ✅
- **Minor**: hero `min-height: 90vh` (`theme.css:208`) can cause issues on very short viewports (e.g., 320×480), where the hero takes up most of the screen before the content. Acceptable for a marketing hero. ⚠️

---

## 8. Performance — 95 ✅

- All 10 font faces self-hosted from `../../assets/fonts/` with `font-display: swap` (`theme.css:11-97`). Zero external font requests. ✅
- No CDN dependencies in any HTML, CSS, or JS. ✅
- All JS is vanilla, dependency-free, `defer`-loaded (`index.html:257`). ✅
- `og.png` is 186 KB, within the ~200 KB budget for a hero/social image. ✅
- CSS architecture uses 3 separate stylesheets (base/theme/components) loaded in parallel. ✅
- Scroll reveals gated behind `prefers-reduced-motion` check (`main.js:59`). ✅
- `base.css:203` scroll-behavior: smooth — but also overridden in reduced-motion block. Correct. ✅

---

## 9. Content Accuracy — 85 ⚠️

All product **facts** are traceable to `content.json`. Install command matches `content.json` verbatim (permitted by §2A for kit revoicing). Client statuses match. Feature bodies match.

**❌ Spec violation — install command not in `.code-block` on index.html:**

`index.html:205` renders the install command in a bare `<p class="install-command">`. §3.1 specifies it should be in a `.code-block`. The download page correctly uses `.code-block` (`download.html:60-62`), but index.html does not. The visual presentation (monospace, bordered, scrollable) mimics a code block via `.install-command` styling (`components.css:628-639`), but the semantic element is wrong. **WCAG**: screen readers will announce it as a paragraph, not a code block.

**⚠️ Missing pitch bullets section on home page:**

§3.1 specifies the home page must have a `.pitch` section: `<h2>Why Phlix?</h2>` + `pitch_bullets` as a list. The site replaced this with a narrative section "Why step inside?" (`index.html:166-179`) that tells a brand story rather than listing the 7 value props. The 7 facts are present elsewhere on the site (features overview and feature-detail cards), so no fact is missing — but the required `.pitch` section structure from §3.1 is absent. **This is a structural spec violation.** The `homepage_narrative` override in §2A re-orders and frames sections; it does not delete the pitch bullets section. The BUILD_LOG (`BUILD_LOG.md:16`) lists the sections but does not mention the absence of `.pitch`.

---

## 10. CTA / Funnel — 88 ⚠️

- Primary CTA above fold on hero — visible without scroll. ✅
- Download reachable in ≤2 clicks from home. ✅
- All CTAs use `.btn.btn-primary`. ✅

**❌ download.html CTA violates §3.4:**

§3.4 specifies the download page CTA banner should link to docs (secondary) OR drive toward the download. The spec says: `closing .cta-banner linking to docs` on download.html. The page renders:

```html
<!-- download.html:149 -->
<a href="https://detain.github.io/phlix-docs" class="btn btn-secondary">Read the Docs</a>
```

This links to the external docs, which matches the spec wording `linking to docs`. However, §3.4's full instruction is: `→ closing .cta-banner linking to docs` **on the download page**. This means download.html should drive toward download — but since this IS the download page, the CTA should ideally offer a next step. The current CTA offers docs as the ONLY next action, with no link back to download or to any download-related resource. This is arguably compliant with the literal spec text but UX-weak for a download page. **Flagged as ⚠️, not ❌.**

**⚠️ Hero CTA label mismatch:**

`index.html:73`: `<a href="download.html" class="btn btn-primary">You Know the Password</a>`. The accessible name "You Know the Password" describes the metaphor, not the destination. Users who rely on screen reader quick-nav or keyboard (tabbing through links) will hear "You Know the Password — link" with no indication it leads to download. Per §19.7: "a CTA label must not misdescribe its destination." The label is metaphorical — it technically *does* go to download — but the accessible name is obscure. WCAG 2.5.3 (label in name) issue: the link's accessible name does not contain the link text's purpose. Gilda (the mascot) is thematically perfect; the CTA label is borderline.

---

## 11. Social Metadata — 98 ✅

- All pages have `og:type=website`, `og:site_name=Phlix`, `og:url` (absolute), `og:title`, `og:description`, `og:image` (absolute URL to `1200×630` PNG). ✅
- Twitter: `twitter:card=summary_large_image`, `twitter:creator=@detain` on all pages. ✅
- `og:image` is absolute URL: `https://detain.github.io/phlix-website/speakeasy-gold/img/og.png` (`index.html:15`). ✅
- `og.png` verified as a real 1200×630 PNG (186 KB, confirmed via `file` command). ✅
- `og.svg` exists as editable source (`img/og.svg:1-102`). ✅
- `<meta name="theme-color">` = `#C9A84C` (primary gold) on all pages. ✅
- Favicon link `type="image/svg+xml"` on all pages. ✅
- **Minor**: `index.html` and `features.html` use the same `og:description` ("Step inside the speakeasy. Phlix is your self-hosted media vault with SyncPlay, transcoding, Live TV, and a hub that reaches you anywhere.") — duplicated across pages. Not a spec violation, but less optimal for SEO. ⚠️

---

## 12. Localization — 100 ✅

- `<html lang="en">` on all 9 pages. ✅
- `content.json` provides `supported_locales: ["en"]`. ✅
- All user-facing strings trace to `content.json` or kit `copy_overlay`. ✅
- Logical CSS properties (`margin-inline`, `padding-block`) used throughout (`base.css`, `theme.css`, `components.css`). ✅
- No locale-unsafe formatting (no `toLocaleDateString`, no hard-coded number formatting). ✅
- Fonts subset to Latin script; no CJK or complex script fonts loaded. ✅

---

## 13. Experience Fidelity — 91 ✅

- Art Deco speakeasy theme is the defining through-line: sunburst patterns, Art Deco ornament SVGs, gold-on-midnight palette, stepped-arch badge frames. ✅
- All 8 pages use the same narrative voice (speakeasy metaphor carried across: "The Lobby" for home, "The Vault" for features, "Every Room" for clients, "Get the Password" for download, "The Tunnel" for Hub, "Our Story" for about). ✅
- Gilda the mascot (Art Deco illustrated woman) appears on index, download, and about pages per `BUILD_LOG.md:17`. ✅
- "Dim the House Lights" intensity toggle in footer (`index.html:247-250`), session-persistent. ✅
- Easter eggs: 7 logo clicks → Gilda + champagne burst; typing "speakeasy" → amber glow (`main.js:106-275`). Both respect `prefers-reduced-motion` (`main.js:47-54`). ✅
- "No Show" 404 page with art deco marquee icon (`404.html:50-65`). ✅
- No off-brand colors, fonts, or UI patterns. ✅

**Deducted**: 9 pts for the home page missing the pitch bullets section (brand experience is thinner on facts than the spec requires; users don't get the quick-scan value-prop list the spec defines).

---

## §FIXES — Required Changes

### FIX-1: `download.html:149` — CTA destination [Severity: HIGH]

**Problem**: The download page's CTA banner links to `https://detain.github.io/phlix-docs`. Per §3.4, download.html is the end of the funnel — its CTA should offer a next step that stays in the product ecosystem, not exit to external docs as the sole option.

**Spec text**: §3.4 — `closing .cta-banner linking to docs`

**Current**:
```html
<a href="https://detain.github.io/phlix-docs" class="btn btn-secondary">Read the Docs</a>
```

**Fix**: Add a secondary action or change the primary CTA label. Since the page IS the download page, the CTA could read "Read the Docs (while it installs)" with href still to docs — this makes the label honest about the destination while remaining useful. Or add a second button: primary to GitHub releases, secondary to docs. The key is the accessible name must match what happens on click.

---

### FIX-2: `index.html` — Missing pitch bullets section [Severity: HIGH]

**Problem**: §3.1 mandates a `.pitch` section with `<h2>Why Phlix?</h2>` + all 7 `pitch_bullets` rendered as a list on the home page. This section is absent. The brand's `homepage_narrative` is an override for *order and framing* of sections, not for deleting required content blocks.

**Spec text**: §3.1 item 2 — "**Pitch** (`.pitch`) — `<h2>Why Phlix?</h2>` + `pitch_bullets` as a list."

**Current**: No `.pitch` section exists. "Why step inside?" narrative section (`index.html:166-179`) covers some of the same ground thematically but does not enumerate the 7 value props as a scannable list.

**Fix**: Add a `.pitch` section between the hero and the features-overview section. Use the verbatim `pitch_bullets` from `content.json`. The speakeasy voice may restyle the list markers (e.g., art-deco diamond bullets), but the 7 facts must be listed in order.

---

## Running Scores

| Dimension | Score | 90+? |
|-----------|-------|------|
| 1. Brand fidelity & spirit | 92 | ✅ |
| 2. SEO | 95 | ✅ |
| 3. Readability | 87 | ⚠️ |
| 4. Spelling & grammar | 100 | ✅ |
| 5. Usability | 93 | ✅ |
| 6. Accessibility | 94 | ✅ |
| 7. Responsive | 90 | ✅ |
| 8. Performance | 95 | ✅ |
| 9. Content accuracy | 85 | ⚠️ |
| 10. CTA / funnel | 88 | ⚠️ |
| 11. Social metadata | 98 | ✅ |
| 12. Localization | 100 | ✅ |
| 13. Experience fidelity | 91 | ✅ |

**Average: 93.4**

---

## Verdict

**NOT APPROVED.**

Two `❌`-level spec violations:
1. **FIX-1** — download.html CTA does not meet the funnel completeness intent of §3.4
2. **FIX-2** — index.html missing the required `.pitch` section per §3.1

Dimensions 3, 9, and 10 score below 90. All three are driven by the above two fixes. Once FIX-1 and FIX-2 are applied, expect dimensions 9 and 10 to rise above 93, and the average to clear 95.

No ❌ on Google Fonts CDN (zero found). No ❌ on contrast (all measured safe). No ❌ on the `@copyright` CSS parse bug (correctly inside comment blocks). No ❌ on og.png (exists, 1200×630 PNG). `npm run lint` passes clean.

Fix the two high-severity items and re-run review.
