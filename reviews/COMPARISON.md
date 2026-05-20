# PH LIX Website — Round 1 Variant Comparison

**Date:** 2026-05-20
**Sources:** All 5 `ROUND-1-SUMMARY.md` files

---

## Aggregate Scores (Confirmed from Files)

| Variant | Aggregate | Accessibility | Performance | Responsive | Branding | Usability | Content | CTA | SEO | Social | Localization |
|---------|----------|--------------|-------------|------------|----------|-----------|---------|-----|-----|--------|--------------|
| 01-minimalist-cinema | **82** | 67 | 87 | 78 | **92** | 78 | 88 | **92** | 58 | 52 | 30 |
| 02-spotlight-projector | **66** | **91** | **95** | 65 | 82 | 84 | 72 | **92** | 70 | 50 | 45 |
| 03-retro-film-reel | **80** | 78 | **94** | 78 | 85 | 72 | 86 | **95** | 62 | 60 | 60 |
| 04-portal-hub | **70.5** | 72 | 78 | 71 | **88** | 67 | **92** | 58 | 74 | 30 | 55 |
| 05-pixel-tech | **73.6** | 52 | 78 | 78 | 78 | **85** | 87 | **93** | 58 | 42 | 35 |

---

## Per-Variant: Strengths and Weaknesses

### V01 — minimalist-cinema (82/100)

**Strongest dimensions (≥85):**
- Branding Consistency: 92
- CTA / Funnel: 92
- Content Quality: 88

**Weakest dimensions (≤70):**
- Localization: 30
- SEO: 58
- Social Metadata: 52
- Accessibility: 67

**Top 3 blocking issues:**
1. No `content.json` — all UI strings hardcoded in HTML (Localization × 0.6 = 18.0 weighted priority, critical)
2. Meta descriptions 194 chars on all 8 pages (limit: 160) — SEO failure on every page
3. Missing `sitemap.xml` and `robots.txt` — search engine discovery blocked entirely

**Additional critical issues:** Missing JSON-LD schema (all pages), missing `manifest.webmanifest` + full favicon set, primary button contrast 4.21:1 (fails AA 4.5:1), `.btn-small` touch target 36px (fails WCAG 2.5.5 min 44px), 24 stylelint errors across 3 CSS files.

---

### V02 — spotlight-projector (66/100)

**Strongest dimensions (≥85):**
- Accessibility: 91
- Performance: 95
- CTA / Funnel: 92

**Weakest dimensions (≤70):**
- Responsive: 65
- Content Quality: 72
- Social Metadata: 50
- Localization: 45

**Top 3 blocking issues:**
1. Meta descriptions 212 chars on all 8 pages (limit: 160) — worst meta desc of all variants
2. No `content.json` — localization architecture entirely absent
3. Missing `sitemap.xml` + `robots.txt` — same SEO infrastructure gap as all other variants

**Additional critical issues:** Nav links touch target ~30px and nav-toggle ~40px (both below 44px WCAG minimum — Accessibility has 1.5× weight multiplier), dead `@font-face` rules referencing missing `fonts/` directory, placeholder domain `phlix-hub.example.com` in user-facing text, OG image is SVG (not guaranteed 1200×630 raster), `.btn-secondary` text contrast ~1.64:1 on hero (fails AA).

---

### V03 — retro-film-reel (80/100)

**Strongest dimensions (≥85):**
- Performance: 94
- Branding Consistency: 85
- Content Quality: 86
- CTA / Funnel: 95

**Weakest dimensions (≤70):**
- SEO: 62
- Social Metadata: 60
- Usability: 72
- Localization: 60

**Top 3 blocking issues:**
1. Meta descriptions 206 chars on all 8 pages (limit: 160) — second worst after V02
2. Missing `sitemap.xml` and `robots.txt` — consistent across all variants
3. Footer copy contrast 2.9:1 (fails WCAG AA 4.5:1) — affects all 8 pages

**Additional critical issues:** Status-stable badge contrast 2.9:1, status-beta badge contrast 1.6:1 (severe failure), hero eyebrow contrast 1.4:1 — three separate contrast failures in the same pages, missing JSON-LD schema, missing manifest + incomplete favicon set (SVG only, missing 16/32/180/192/512 PNGs), `.btn-small` touch target 36px (below 44px threshold).

---

### V04 — portal-hub (70.5/100)

**Strongest dimensions (≥85):**
- Branding Consistency: 88
- Content Quality: 92

**Weakest dimensions (≤70):**
- CTA / Funnel: 58
- Social Metadata: 30
- Usability: 67
- Responsive: 71

**Top 3 blocking issues:**
1. Missing `sitemap.xml` + `robots.txt` — same universal failure
2. Missing JSON-LD schema on all 8 pages — zero structured data for search engines
3. Missing `manifest.webmanifest` + PNG favicon set — PWA installability broken

**Additional critical issues:** `og:image` uses relative URL path (breaks when shared from non-homepage), 4 interior pages (features, clients, docs, about) have **zero above-fold CTA** — no conversion path, only 1 explicit breakpoint (768px) — 5 of 7 required viewport widths unstyled, Google Fonts `@import` is render-blocking (Lighthouse penalty + FCP risk), `href="#"` dead link on download.html, mobile nav lacks focus trap (WCAG 2.1.2 concern).

---

### V05 — pixel-tech (73.6/100)

**Strongest dimensions (≥85):**
- CTA / Funnel: 93
- Usability: 85
- Content Quality: 87

**Weakest dimensions (≤70):**
- Localization: 35
- Social Metadata: 42
- Accessibility: 52
- SEO: 58

**Top 3 blocking issues:**
1. Body text contrast 1.19:1 — `#1A1A1A` on `#000` fails WCAG 4.5:1 **catastrophically**. Body text is essentially invisible for low-vision users.
2. Meta descriptions identical 203 chars on all 8 pages (limit: 160)
3. Missing JSON-LD schema entirely

**Additional critical issues:** RTL layout not supported (all CSS uses physical properties `left`, `top`, `margin-left` instead of logical properties — layout breaks entirely for Arabic/Hebrew), secondary button text contrast 2.08:1, glitch animation not wrapped in `prefers-reduced-motion` (accessibility concern), empty fonts directory — WOFF2 files never downloaded, `.btn-small` touch target 32px (lowest of all variants), `.client-status` badge touch target ~22px.

---

## Recommended Primary Variant

### **V01 — minimalist-cinema** (Score: 82/100)

Despite its accessibility score of 67, **minimalist-cinema is the recommended primary variant** for the following reasons:

**Accessibility gaps are fixable; brand cohesion is foundational.** V01's Branding (92) and CTA (92) are the highest or tied-highest of all variants. Brand cohesion at 92 means the visual language is most consistent with Phlix's positioning as a self-hostable, privacy-respecting media server — clean, professional, cinematic. That brand identity is hard to engineer retroactively.

**Accessibility failures in V01 are narrow and well-scoped.** The three specific failures (button contrast 4.21:1, footer opacity 60% ≈ 3.18:1, `.btn-small` touch target 36px) are each single-line CSS fixes. No structural rework needed. The 67 Accessibility score reflects those specific, fixable gaps — not a systemic accessibility failure.

**V02's 66/100 is too low to recover.** Even though V02 has excellent Accessibility (91) and Performance (95), its aggregate is 10 points below V01. It has the same root architectural issues (missing sitemap, robots, content.json) and additional responsive failures (nav touch targets ~30-40px) that are more structural than V01's CSS text-color fixes.

**V03's 80/100 has multiple contrast failure categories.** V03 has the best CTA score (95) but suffers from 3 distinct contrast failure types across badge, eyebrow, and footer text — each at different severity levels. This is more design-system work than a simple CSS patch.

**V05's 52 Accessibility is a hard blocker.** V05's body text at 1.19:1 contrast is a catastrophic failure requiring rewriting the entire color system, not a patch. Combined with RTL non-support and the lowest localization score (35), this is not recoverable without substantial rework.

**V04's 70.5/100 has the worst Social Metadata (30) and CTA failures.** Four pages without above-fold CTAs is a conversion-critical issue that requires structural HTML changes, not CSS patches.

### Reasoning Summary

| Criterion | V01 Winner Rationale |
|----------|---------------------|
| Accessibility | V01's failures are 3 one-line CSS fixes; no structural rework |
| Brand Cohesion | V01 has highest Branding (92) — foundation is correct |
| Visual Appeal | V01's 92 CTA score reflects strong visual hierarchy and design language |
| Overall Score | V01 leads at 82, with the most straightforward path to 90+ |

---

## Hypothetical v2 — Best-of-Breed Composition

Which ideas from each variant would compose into a single best site:

### From V01 — minimalist-cinema (take as primary base)
- **CSS patterns:** The dark cinematic palette (`#1A1A1A` charcoal background, `#00F0FF` cyan accent). The 3-file CSS split (base.css/theme.css/components.css) for organization. The CSS custom property approach for theming.
- **Brand colors:** `#00F0FF` cyan on `#1A1A1A` charcoal — strong, distinctive, passes contrast in hover states (9.7:1).
- **UI elements:** Clean, minimal button hierarchy with `.btn-primary` and `.btn-small` classes. The focused, no-nonsense hero layout with tight typographic scale.

### From V02 — spotlight-projector
- **CSS patterns:** The navbar elevation and scroll-shadow treatment (`box-shadow` on scroll). The warm amber/sepia palette (`#FFF7E6` cream, `#C8945A` warm amber) as an **alternative accent** for secondary sections (e.g., "ecosystem" or "community" callouts).
- **Brand colors:** Amber `#C8945A` warm tones for secondary accents (V02 scores 82 Branding, showing strong cohesion with this palette).
- **UI elements:** The feature card grid layout with icon + title + description pattern. The `.status-*` badge component system from V03 (adopted into V02's design language) — `status-stable`, `status-beta`.

### From V03 — retro-film-reel
- **CSS patterns:** The teal `#1ABC9C` / cream `#F5E9D4` / brown `#8C5E3C` palette for a **warmer, friendlier product tone** — particularly for client page badges and ecosystem descriptions. The `.badge` component with solid background + dark text (replacing V01's current text-on-light approach).
- **Brand colors:** Teal `#1ABC9C` for success/stable states. Cream `#F5E9D4` for card backgrounds. The cream-on-dark footer that already passes WCAG at full opacity.
- **UI elements:** The `version-badge` component (version number + release date on download page). The DLNA button tooltip pattern. The ecosystem list standardization (all items uniformly linked).

### From V04 — portal-hub
- **CSS patterns:** The glassmorphism header (`backdrop-filter: blur()`) — but **only for desktop**. Add a `@media (max-width: 768px)` that sets `backdrop-filter: none` to prevent scroll jank. The dark blue `#0A0F1F` base for a more technical, "portal" feel as an **alternative dark theme** for specific sections.
- **Brand colors:** Electric cyan `#00E5FF` as a **high-contrast accent** for links and interactive elements in hub/network contexts.
- **UI elements:** The `page-header-cta` banner (above-fold CTA on interior pages — adopt V04's interior CTA placement to all pages). The 7-breakpoint responsive strategy (explicit media queries at 320px, 375px, 414px, 768px, 1024px, 1280px, 1920px).

### From V05 — pixel-tech
- **CSS patterns:** The **glitch animation** on the hero — a distinctive, memorable loading effect. Wrap it in `prefers-reduced-motion` (as V05's own issue notes it fails here). The CSS grid card layout with `minmax(280px, 1fr)` for content grids. The pixel-art favicon concept (keep SVG but note pixel-grid aesthetic for social sharing).
- **Brand colors:** Neon green `#39FF14` for **accent on dark** — but only for decorative elements, not body text. Black `#000` background from V05 is valid for high-contrast sections. Use `#B0B0B0` (not `#1A1A1A`) for body silver text on black to pass 4.5:1.
- **UI elements:** The strong CTA button placement (V05 scores 93 CTA — the button hierarchy and placement is excellent). The `aria-labelledby` pattern for download cards.

---

### Hypothetical v2 — Consolidated Brand System

| Element | Source Variant | Implementation |
|---------|---------------|----------------|
| Primary brand colors | V01 | `#1A1A1A` charcoal bg, `#00F0FF` cyan accent |
| Secondary accent | V02 | `#FFF7E6` cream, `#C8945A` warm amber for community/ecosystem sections |
| Success/stable badges | V03 | `#1ABC9C` teal with black text (passes 7.2:1) |
| Warm UI accents | V03 | `#F5E9D4` cream card backgrounds on docs/features pages |
| Hub/network accent | V04 | `#00E5FF` electric cyan for hub relay sections |
| Decorative neon | V05 | `#39FF14` neon green for glitch effects and decorative pixel elements only |
| Body text on black | V05 fixed | `#B0B0B0` silver (not `#1A1A1A`) |
| Typography | V01 | Montserrat 800 for headlines, Inter/sans-serif for body |
| 3-file CSS split | V01 | base.css / theme.css / components.css |
| Glassmorphism header | V04 | `backdrop-filter: blur()` on desktop, `backdrop-filter: none` on mobile |
| 7-breakpoint responsive | V04 | Explicit media queries at 320/375/414/768/1024/1280/1920px |
| CTA button hierarchy | V01/V05 | `.btn-primary` (charcoal text on cyan) + `.btn-secondary` + `.btn-small` |
| Badge component | V03 | Solid teal bg + black text + `min-height: 44px` |
| Version badge | V03 | `v1.0.0` + `Released 2026-05-20` on download page |
| Glitch animation | V05 | `.glitch::before/::after` with `prefers-reduced-motion` wrapper |
| Navbar scroll shadow | V02 | `box-shadow` on `.site-header` when scrolled |
| Above-fold CTA all pages | V04 | `page-header-cta` banner on features/clients/docs/about |
| RTL logical CSS | V05 (fix needed) | Use `inset-inline-start`, `margin-inline-start` throughout |
| Touch targets all ≥44px | All variants | Global `.btn-small { min-height: 44px }` rule |

---

## Cross-Variant Common Issues (Fix Once, Apply to All)

All 5 variants share these same failures — a shared fix or shared asset would resolve all simultaneously:

| Issue | Affected Variants | Shared Fix |
|-------|------------------|------------|
| Meta descriptions >160 chars | All 5 | Create per-variant trimmed descriptions from V01's suggested values |
| Missing `sitemap.xml` | All 5 | Single sitemap template; variant-specific only in `<loc>` paths |
| Missing `robots.txt` | All 5 | Identical across all variants (only `Sitemap:` URL differs) |
| Missing `content.json` | All 5 | Single shared/content.json already exists; variant HTML needs JS loader or build step |
| Missing JSON-LD schema | All 5 | Single `SoftwareApplication` template; add to all variant HTML files |
| Missing `manifest.webmanifest` | All 5 | Per-variant theme colors; shared structure |
| Incomplete favicon PNG set | All 5 | Generate once; reuse across all variants |
| `.btn-small` touch target | V01, V02, V03, V04, V05 | Single CSS rule `min-height: 44px` in shared base.css |
| `phlix-hub.example.com` placeholder | V01, V02, V04 | Replace with real relay URL or rephrase |

---

*Generated by Comparator Agent — Round 1 variant comparison*
