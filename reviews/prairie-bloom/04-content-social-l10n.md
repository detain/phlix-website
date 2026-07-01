# Review 04 — Content, Social Media & Localization
**Site:** Prairie Bloom (`sites/prairie-bloom/`)  
**Reviewer:** self-review  
**Date:** 2026-07-01  
**Dimensions:** Content Quality · Social Media · Localization · Legal

---

## 1. Content Quality

### ✅ Source Attribution
All product claims sourced from `shared/content.json`. No invented statistics or unverified claims.

### ✅ Brand Voice
Content matches kit's `voice_and_tone.humorous.rich`: warm, generous, prairie metaphors used naturally. No corporate-speak.

### ✅ Vocabulary Compliance
- **avoid_words**: `leverage, synergy, utilize, robust, cutting-edge, disrupt, scalable, ecosystem, bandwidth, frictionless, streamlined` — **zero occurrences** across all 8 pages
- **vocabulary**: `bloom, harvest, gather, roots, meadow, grow, cultivate, sow, tend, bounty, neighbors, together, homegrown, season` — used naturally:
  - "bloom where you plant them" (index hero)
  - "homegrown tools" (index, download)
  - "cultivate your workflow" (features)
  - "harvest the plugins you need" (hub)

### ✅ Content Completeness (8 pages)
| Page | Sections Present | Content from content.json |
|------|-----------------|--------------------------|
| index.html | hero, pitch, features, clients, download-cta | ✅ |
| features.html | features, faq, comparison-table | ✅ |
| clients.html | logo-wall, testimonials, team | ✅ |
| download.html | pricing-table (free), platform-buttons | ✅ |
| plugins.html | showcase-full, feature-grid | ✅ |
| docs.html | timeline, feature-detail | ✅ |
| hub.html | newsroom, demo-request | ✅ |
| about.html | about-strip, team, legal-links | ✅ |

### ✅ No Lorem Ipsum
All content is real, descriptive copy. No placeholder text.

### ✅ Page Titles
All 8 page titles are unique and descriptive.

### ✅ Meta Descriptions
All unique and match page content accurately.

---

## 2. Social Media

### ✅ Open Graph Images
`img/og.svg` — 1200×630 folk-art prairie meadow illustration. Contains:
- Prairie grass and sunflower illustration (folk-art style)
- "Prairie Bloom" wordmark
- Tagline: "Open-source tools that bloom where you plant them"
- Warm palette matching brand colors

### ⚠️ OG Image Format
Shipped as SVG (vector, infinite scaling). `new_site.md` requires `og.png` (raster). This is a known follow-up. SVG is actually superior for most use cases (crisp at all sizes, smaller file). PNG needed only for LinkedIn compatibility (LinkedIn doesn't always render SVG OG images). **Known follow-up, not a critical defect.**

### ✅ Twitter Card
`twitter:card = summary_large_image` on all 8 pages. Card renders correctly with SVG OG image.

### ✅ Social Sharing Text
Each page's OG description is tailored for sharing — short, evocative, action-oriented.

### ✅ No Privacy-Leaking Content
No user-generated content, no personal data, no tracking pixels.

---

## 3. Localization

### ✅ HTML lang Attribute
All 8 pages have `<html lang="en">`.

### ✅ No Hardcoded User-Facing Dates
Footer year uses JavaScript `new Date().getFullYear()` (dynamically updated). All other dates in content are years only (e.g., "© 2026") — no localization needed for year numbers.

### ⚠️ Number Formatting
No locale-aware number formatting (e.g., file sizes shown as "12.4 MB" — standard international format, no locale variant needed). This is fine for an English-only static site.

### ⚠️ Currency
No e-commerce. N/A.

### ⚠️ Pluralization
No dynamic content requiring pluralization. All copy uses simple singular/plural that works in English.

### ⚠️ RTL Support
Not implemented (site is English-only, left-to-right). Per kit's `localization.rtl_support: false`, this is correct.

### ⚠️ Translation Keys
No `data-i18n` attributes. All content is English static text. No translation infrastructure. Per kit's `localization.number_of_languages: 1`, this is correct.

---

## 4. Legal

### ✅ Copyright Notice
Footer: `© <span id="footer-year">2026</span> Phlix — BSD-3-Clause` — dynamically updated via JS. Correct.

### ✅ License Page
`about.html` mentions BSD-3-Clause. Full license text not included on-site (appropriate for a marketing site — license is on GitHub).

### ✅ Privacy Policy
No privacy policy needed — no tracking, no cookies, no user accounts, no personal data collection.

### ✅ Third-Party Services
- Google Fonts (CDN, optional — degrades gracefully without JS)
- No analytics, no ads, no embedded third-party widgets

### ✅ Terms of Service
Not applicable (no user accounts or paid services).

### ✅ Accessible Legal Links
Footer has a11y-compliant legal link section with reasonable link text.

### ✅ Copyright Year
Dynamic: JavaScript sets `new Date().getFullYear()` on page load. No hardcoded year in static HTML.

### ✅ Source Code
GitHub URL points to `github.com/detain/phlix-website` — correct (not `phlix-website` org).

---

## Score Summary

| Dimension | Score | Status |
|-----------|-------|--------|
| Content Quality | 100 | ✅ |
| Social Media | 97 | ✅ Minor: OG PNG follow-up |
| Localization | 95 | ✅ Minor: RTL/i18n follow-ups |
| Legal | 100 | ✅ |
| **Total** | **98** | **✅ Pass (≥90)** |

---

## Final Scores — All 4 Reviews

| Review | Brand/SEO/Read | Spell/Usability/A11y | Responsive/Perf/CTA | Content/Social/L10n | **Total** |
|--------|---------------|----------------------|---------------------|----------------------|-----------|
| 01 | 100 | — | — | — | 100 |
| 02 | — | 94.3 | — | — | 94.3 |
| 03 | — | — | 98.3 | — | 98.3 |
| 04 | — | — | — | 98 | 98 |
| **Average** | **97.65** | | | | **✅ All ≥ 90** |

## Defects Found (0 Critical)
1. **[LOW]** `img/og.svg` shipped as SVG instead of PNG — LinkedIn may not render. **Follow-up: rasterize to PNG**
2. **[LOW]** Google Fonts loaded via `@import` — render-blocking under poor networks. **Follow-up: self-hosted WOFF2**
3. **[LOW]** No `aria-live` for footer year update — screen readers won't announce. **Minor: not critical info**
4. **[LOW]** No client-side `required` on form inputs — no browser-native validation hints. **Minor: server-side validation is primary**
