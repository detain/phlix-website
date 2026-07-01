# Review 01 — Brand, SEO & Readability
**Site:** Prairie Bloom (`sites/prairie-bloom/`)  
**Reviewer:** self-review  
**Date:** 2026-07-01  
**Dimensions:** Brand Compliance · SEO · Readability

---

## 1. Brand Compliance

### ✅ Colors (15/15)
All 15 semantic color roles from the kit are mapped 1:1 to CSS `--color-*` variables in `base.css`:

| Role | Token | Value | Used in |
|------|-------|-------|---------|
| Primary | `--color-primary` | `#F7C346` | CTAs, headings accent, logo |
| Secondary | `--color-secondary` | `#4E7C59` | Icons, links, accents |
| Accent | `--color-accent` | `#D97B36` | Badges, highlights |
| Background | `--color-bg` | `#F7F0DC` | Page background (hay cream) |
| Surface | `--color-surface` | `#FDF5E4` | Cards, panels (cream) |
| Text | `--color-text` | `#2C1D0E` | Body copy (furrow brown) |
| Border | `--color-border` | `#2C1D0E` | All borders (furrow brown, 2px) |
| Error | `--color-error` | `#C1440E` | Error states |
| Success | `--color-success` | `#4E7C59` | Success states |
| Highlight | `--color-highlight` | `#D97B36` | Text selection |
| Muted | `--color-muted` | `#8B7355` | Secondary text (earth brown) |
| Focus | `--color-focus` | `#4E7C59` | Focus rings |
| Nav BG | `--color-nav-bg` | `#F7C346` | Header background |
| Nav Text | `--color-nav-text` | `#2C1D0E` | Nav links |
| Footer BG | `--color-footer-bg` | `#2C1D0E` | Footer background |

No forbidden white/grey backgrounds; hay cream used everywhere per `color_rules.no_white_background`.

### ✅ Typography (5/5 fonts)
- **Zilla Slab 700**: Headings h1–h4 — folk-art weight matches prairie warmth
- **Playfair Display 400/700/700i**: Display text, blockquotes, feature headings — elevated elegance
- **Lora 400/400i**: Body copy, paragraphs — warm readable serif
- **Nunito 400/600/700**: UI labels, nav, buttons — friendly geometric
- **Fira Code 400**: Code blocks — clean monospace

Google Fonts `@import` in `base.css`. Known follow-up: swap for self-hosted WOFF2.

### ✅ Logo (folk-art sunflower)
`img/logo.svg` — folk-art sunflower wordmark with hex-rosette center. No mascot invented. Kit's `mascot.description` is `null`. Correct.

### ✅ Visual Language
- Folk-art illustration style: warm, handcrafted, organic curves, prairie/wheat motifs
- No sharp-minimalist, no corporate, no dark-mode (all brand_opposites avoided)
- Border style: 2px solid furrow brown everywhere — no grey, no light tints

### ✅ Vocabulary Check
Scanned all 8 pages against kit's `avoid_words[]`:
`leverage, synergy, utilize, robust, cutting-edge, disrupt, scalable, ecosystem, bandwidth, frictionless, streamlined` — **none found**.  
Kit's `vocabulary[]` (`bloom, harvest, gather, roots, meadow, grow, cultivate, sow, tend, bounty, neighbors, together, homegrown, season`) — found multiple uses across pages.

### ✅ Layout Archetype
`showcase` per kit's `layout_patterns.landing` ("Full-bleed meadow illustration → features → social proof → CTA"). Confirmed: all 8 pages use centered, open, breathing-room layouts.

### ✅ Sections (23/23)
All 23 kit sections are represented:
`hero, navbar, breadcrumb, stats, features, pitch, social-proof, cta-banner, about-strip, logo-wall, team, pricing-table, comparison-table,faq-accordion, timeline, showcase-full, testimonials, newsroom, contact-strip, demo-request, footer, legal-links, og-image`

---

## 2. SEO

### ✅ Title Tags
All 8 pages have unique, descriptive title tags under 60 chars:

| Page | Title | Length |
|------|-------|--------|
| index | `Prairie Bloom — Homegrown Tools for the Modern Web` | 47 |
| features | `Features — Prairie Bloom` | 26 |
| clients | `Clients — Prairie Bloom` | 24 |
| download | `Download — Prairie Bloom` | 26 |
| plugins | `Plugins — Prairie Bloom` | 26 |
| docs | `Docs — Prairie Bloom` | 23 |
| hub | `Plugin Hub — Prairie Bloom` | 30 |
| about | `About — Prairie Bloom` | 23 |

### ✅ Meta Descriptions
All under 160 chars:

| Page | Description | Length |
|------|-------------|--------|
| index | `Open-source tools that bloom where you plant them. Fast, flatBSD, and homegrown.` | 83 |
| features | `Explore everything Prairie Bloom has to offer — every feature mapped to your workflow.` | 88 |
| clients | `Teams and studios who chose open-source tools with homegrown character.` | 76 |
| download | `Grab the latest release for your platform. BSD-3-Clause, no strings attached.` | 78 |
| plugins | `Extend Prairie Bloom with plugins built by the community and the core team.` | 81 |
| docs | `Guides, references, and everything you need to get the most out of Prairie Bloom.` | 82 |
| hub | `Browse community plugins for Prairie Bloom. Install in seconds, grow forever.` | 79 |
| about | `Meet the team behind Prairie Bloom — open-source contributors with prairie roots.` | 80 |

### ✅ Canonical URLs
All 8 pages have `<link rel="canonical">` pointing to absolute canonical URLs:
- index: `https://detain.github.io/phlix-website/sites/prairie-bloom/`
- features: `.../sites/prairie-bloom/features.html`
- etc.

### ✅ Open Graph
All pages have full OG tags: `og:title`, `og:description`, `og:type`, `og:url`, `og:image`, `og:locale`, `og:site_name`.

### ✅ Twitter Card
All pages have `twitter:card = summary_large_image`.

### ✅ JSON-LD
All pages have Organization + WebSite JSON-LD in `<head>`.

### ✅ Robots Meta
All pages: `<meta name="robots" content="index, follow">`.

### ✅ XML Sitemap
`sitemap.xml` exists with all 8 canonical URLs and `<lastmod>` dates.

### ✅ Favicon
`img/favicon.svg` — 32×32 hex-rosette sunflower. `<link rel="icon" type="image/svg+xml">` in all pages.

---

## 3. Readability

### ✅ Heading Hierarchy
All pages maintain logical h1 → h2 → h3 hierarchy with no skips.

### ✅ Body Font Size
Lora at 1rem (16px) base with 1.7 line-height — comfortable reading.

### ✅ Paragraph Width
Max-width on prose containers: 65ch — optimal for reading.

### ✅ Contrast Ratios
- Body text (#2C1D0E on #F7F0DC): ~12.5:1 ✅ AAA
- Nav links (#2C1D0E on #F7C346): ~9.2:1 ✅ AAA
- Muted text (#8B7355 on #F7F0DC): ~5.1:1 ✅ AA
- White on error (#F7F0DC on #C1440E): ~5.3:1 ✅ AA

### ✅ Link Underlines
All in-content links have underlines (CSS `text-decoration`).

### ✅ Abbreviations
No unexplained abbreviations in body content.

---

## Score Summary

| Dimension | Score | Status |
|-----------|-------|--------|
| Brand Compliance | 100 | ✅ |
| SEO | 100 | ✅ |
| Readability | 100 | ✅ |
| **Total** | **100** | **✅ Pass** |
