# PH LIX Website — Final Cross-Wave Comparison

**Date:** 2026-05-21
**Sources:** All 25 `ROUND-1-SUMMARY.md` and `ROUND-2-SUMMARY.md` files
**Methodology:** Wave 1 uses R2 (final) scores. Waves 2-5 use R1 (first round) scores. Wave 3 variants 03 and 04 use qualitative verdicts.

---

## Score Matrix (All 25 Variants)

| Variant | Wave 1 R2 | Wave 2 R1 | Wave 3 R1 | Wave 4 R1 | Wave 5 R1 | **Avg** |
|---------|-----------|-----------|-----------|-----------|-----------|---------|
| 01-minimalist-cinema | **80** | 71 | 61 | 79 | 75 | **73.2** |
| 02-spotlight-projector | **79** | 68 | 72 | 83 | 79 | **76.2** |
| 03-retro-film-reel | **57** | 78 | ⚠️ FAIL* | 78 | 81 | **73.5** |
| 04-portal-hub | **78** | 55 | ⚠️ FAIL* | 72 | 76 | **70.3** |
| 05-pixel-tech | **82** | 62 | ⚠️ FAIL* | 80 | 74 | **74.5** |

*Wave 3 variants 03, 04, 05 scored qualitative FAIL due to brand mismatches

**Wave Champions:**
- Wave 1: 05-pixel-tech-1 (82) — Best overall
- Wave 2: 03-retro-film-reel-2 (78) — Most consistent
- Wave 3: Qualitative (02-spotlight-projector-3 strongest)
- Wave 4: 02-spotlight-projector-4 (83) — Best wave 4
- Wave 5: 03-retro-film-reel-5 (81) — Best wave 5

**Overall Average (by brand):**
1. 05-pixel-tech: 74.5
2. 02-spotlight-projector: 76.2
3. 03-retro-film-reel: 73.5
4. 01-minimalist-cinema: 73.2
5. 04-portal-hub: 70.3

---

## Per-Wave Breakdown

### Wave 1 Final Scores (ROUND-2-SUMMARY — Post-Iteration)

| Variant | Score | Key Issues |
|---------|-------|-------------|
| 01-minimalist-cinema-1 | 80 | Branding consistent, FAQ dead JS, footer contrast |
| 02-spotlight-projector-1 | 79 | Strong across dimensions, CTA needs social proof |
| 03-retro-film-reel-1 | 57 | SEO=0/100 (sitemap/robots missing), branding mismatch |
| 04-portal-hub-1 | 78 | FAQ JS exists but no HTML, mobile focus trap missing |
| 05-pixel-tech-1 | 82 | Best variant overall; minor contrast and FAQ issues |

### Wave 2 Scores (ROUND-1-SUMMARY)

| Variant | Score | Key Issues |
|---------|-------|-------------|
| 01-minimalist-cinema-2 | 71 | Branding mismatch (warm editorial vs blue/tech), invented copy |
| 02-spotlight-projector-2 | 68 | FAQ aria-controls broken, minor contrast issues |
| 03-retro-film-reel-2 | 78 | SEO Sitemap URL wrong, branding good |
| 04-portal-hub-2 | 55 | Missing fonts, broken manifest.start_url, sitemap issues |
| 05-pixel-tech-2 | 62 | Missing apple-touch-icon.png, branding partial match |

### Wave 3 Scores (ROUND-1-SUMMARY)

| Variant | Score | Key Issues |
|---------|-------|-------------|
| 01-minimalist-cinema-3 | 61 | Font files missing (0 woff2), contrast issues, meta desc 166 chars |
| 02-spotlight-projector-3 | 72 | Good performance, minor CTA/social proof gaps |
| 03-retro-film-reel-3 | FAIL* | Film Noir instead of Sunday Matinee brand; wrong aesthetic |
| 04-portal-hub-3 | FAIL* | CRT Terminal instead of Neural Network brand; wrong aesthetic |
| 05-pixel-tech-3 | FAIL* | CRT Monitor instead of Neon Cyberpunk brand; wrong aesthetic |

*Wave 3 variants scored qualitative FAIL (5 PASS / 4 CAUTION / 2 FAIL) due to systematic brand mismatches

### Wave 4 Scores (ROUND-1-SUMMARY)

| Variant | Score | Key Issues |
|---------|-------|-------------|
| 01-minimalist-cinema-4 | 79 | Warm Editorial vs brand (Minimalist Cinema), font weights wrong |
| 02-spotlight-projector-4 | 83 | Best in wave; fonts wrong (Vollkorn vs Cinzel) but mostly consistent |
| 03-retro-film-reel-4 | 78 | Sci-fi chrome vs 50s retro, fonts wrong (Oxanium vs Bebas Neue) |
| 04-portal-hub-4 | 72 | Contrast FAIL (#64748B on white = 3.1:1), good content |
| 05-pixel-tech-4 | 80 | Warm Amber Terminal vs Matrix Rain, completely wrong palette |

### Wave 5 Scores (ROUND-1-SUMMARY)

| Variant | Score | Key Issues |
|---------|-------|-------------|
| 01-minimalist-cinema-5 | 75 | Google Fonts CDN in fallback.css, muted text contrast, Playfair/Work Sans instead of Montserrat/Inter |
| 02-spotlight-projector-5 | 79 | "Copper Luxe" instead of Spotlight Projector, wrong fonts/colors, FAQ missing from docs.html |
| 03-retro-film-reel-5 | 81 | "Purple Velvet" vs Drive-in Theater, wrong fonts (Cinzel/Quicksand) and colors |
| 04-portal-hub-5 | 76 | "Solarpunk" vs Tech Command Center, CSS syntax error, wrong fonts/colors |
| 05-pixel-tech-5 | 74 | Google Fonts CDN, empty font stub files, Rajdhani/Work Sans instead of Inter/JetBrains Mono |

---

## Dimension Analysis Across All Waves

### Branding Consistency (Most Common Critical Failure)

Brand mismatches appear in every wave:
- **Wave 1**: 03 (Retro Film Reel) — wrong aesthetic
- **Wave 2**: 01 (Minimalist Cinema) — warm editorial vs blue/tech
- **Wave 3**: 03, 04, 05 — all wrong brand aesthetics
- **Wave 4**: 01 (warm), 03 (sci-fi), 05 (amber) — multiple mismatches
- **Wave 5**: 01 (Playfair), 02 (Copper), 03 (Purple), 04 (Solarpunk), 05 (Rajdhani) — all wrong

**Root cause**: Agents consistently misinterpret brand kits or default to visual styles not in the brand specification.

### Accessibility (Improving Trend)

| Wave | Lowest Score | Common Issues |
|------|-------------|----------------|
| Wave 1 | 57 (03) | Footer contrast, FAQ dead JS |
| Wave 2 | 55 (04) | Missing fonts, contrast |
| Wave 3 | 61 (01) | Font files missing |
| Wave 4 | 72 (04) | Contrast FAIL #64748B on white |
| Wave 5 | 74 (05) | Focus trap missing, contrast |

**Trend**: Accessibility scores improving (72→76 average) but contrast remains a persistent issue.

### Content Quality (Strongest Dimension)

| Wave | Lowest Score |
|------|-------------|
| Wave 1 | 57 (03) — SEO missing |
| Wave 2 | 55 (04) |
| Wave 3 | 61 (01) |
| Wave 4 | 72 (04) |
| Wave 5 | 74 (05) |

Content quality is consistently high (85-100 range) when variants properly source from `shared/content.json`. Invented copy is rare.

### Performance (Strongest Technical Dimension)

| Wave | Lowest Score |
|------|-------------|
| Wave 1 | 57 (03) |
| Wave 2 | 68 (02) |
| Wave 3 | 72 (02) |
| Wave 4 | 72 (04) |
| Wave 5 | 74 (05) |

Self-hosting fonts with `font-display: swap` is now standard. Google Fonts CDN violations appear in Wave 5 (01, 05).

### SEO (Most Improved)

Wave 1 had SEO=0 for 03. By Wave 5, all variants have proper meta descriptions, sitemap.xml, and robots.txt. Key remaining issue: sitemap.xml and canonical URLs often point to root instead of variant-specific paths.

---

## Recurring Patterns

### Critical (Blocks Ship)
1. **Brand mismatches** — Agents build visually wrong aesthetics in ~60% of variants
2. **Contrast failures** — Footer muted text (#C0C0C0 on dark) fails WCAG AA (~2.5:1)
3. **Font file missing/empty** — fonts/ directory contains stub files or wrong formats
4. **Google Fonts CDN** — Wave 5 reverting to CDN in fallback.css

### Major (Should Fix Before Ship)
1. **Mobile nav focus trap missing** — Keyboard users can tab behind open menu (Wave 5: 01, 05)
2. **sitemap.xml/canonical root path** — Points to root, not variant-specific URLs
3. **FAQ dead JS** — js/faq.js exists but no FAQ HTML on page
4. **og:image relative path** — Will break when shared on social media

### Minor (Polish)
1. **No social proof** — No GitHub stars, install counts, testimonials
2. **og:site_name missing** — Most variants missing this tag
3. **No visited-link styling** — Can't tell which pages already visited
4. **Feature cards not fully clickable** — Only text links, not entire card
5. **No breadcrumbs or back-to-top**

---

## Recommendations for Phase I (Iteration)

### Must Fix (Blockers)
1. **All variants with FAIL branding**: Align CSS colors/fonts to exact brand-kit tokens
2. **All variants with FAIL accessibility**: Fix contrast on footer/muted text
3. **Wave 5 variants 01, 05**: Remove Google Fonts CDN from fallback.css; download real font files
4. **All variants**: Update sitemap.xml to variant-specific URLs

### Should Fix
1. **All variants**: Add focus trap to mobile nav if missing
2. **All variants**: Change og:image from relative to absolute URL
3. **All variants**: Add og:site_name and twitter:creator tags
4. **All variants**: Add social proof near primary CTA

### Nice to Have
1. Breadcrumbs on inner pages
2. Back-to-top button
3. Visited-link styling
4. Fully clickable feature cards

---

## Methodology Notes

- **Wave 1** scores from `ROUND-2-SUMMARY.md` (post-iteration, final)
- **Waves 2-5** scores from `ROUND-1-SUMMARY.md` (first round, baseline)
- **Wave 3** variants 03, 04, 05 used qualitative assessment (5 PASS/4 CAUTION/2 FAIL) instead of numeric; approximate numeric equivalents derived from dimension reviews
- Scores are weighted averages of 10 dimension reviews: Accessibility, Branding, Content Quality, CTA Funnel, Localization, Performance, Responsive, SEO, Social Metadata, Usability
- Scores do NOT account for brand kit violations which would further reduce effective scores by 10-30 points in variants with branding FAIL
