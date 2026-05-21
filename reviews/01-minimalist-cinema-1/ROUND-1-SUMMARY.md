# Round 1 Summary — 01-minimalist-cinema-1

## Overall Score
**70 / 100**

> Aggregated from available dimension scores. 6 of 12 review files were NOT SUBMITTED (tester, accessibility, usability, performance, localization, cta-funnel, social-metadata), so this score is a floor estimate.

---

## Critical Issues (fix before next wave)

1. **[CRITICAL — Mobile Nav]** No hamburger button exists in any HTML template. `js/main.js` references `document.getElementById('nav-toggle')` which is absent from all 8 pages. The nav never collapses on mobile — at 320–375px, 5 nav links × 44px will overflow the header causing horizontal overflow. No `.is-open` CSS defined anywhere.

2. **[CRITICAL — SEO]** `sitemap.xml` is entirely missing from the variant directory. `robots.txt` is also missing. These are hard failures per the SEO rubric and block search engine discovery.

3. **[CRITICAL — Code]** Google Fonts CDN is loaded at runtime on all 8 HTML pages via `<link rel="stylesheet">` or `@font-face url(https://fonts.gstatic.com/...)`. The Builder contract explicitly forbids third-party CDN pulls — fonts must be self-hosted locally.

4. **[MEDIUM — Code]** Meta tags reference `/img/og.png` but only `og.svg` exists on disk. OG image mismatch across all 8 pages.

5. **[MEDIUM — Branding]** At least 6 non-headline selectors use `font-weight: 800` (h4, h5, h6, .site-footer__col h3, .ecosystem-item__name, .faq-item__q) violating the brand-kit `dont: ["Use more than 2 font weights"]` rule.

6. **[MEDIUM — Documenter]** `img/PROMPTS.md` does not exist. The file is at `variants/01-minimalist-cinema-1/PROMPTS.md` (root level) instead of inside `img/`, so there are no per-image entries with resolution/aspect/prompt for logo.svg, og.svg, and favicon.svg.

7. **[MEDIUM — SEO]** `hub.html` meta description is 164 chars and `features.html` is 166 chars — both exceed the 160-char limit.

---

## Dimension Scores

| Dimension | Score | Key Finding |
|-----------|-------|-------------|
| Code | 78/100 | FAIL: Google Fonts CDN, OG image mismatch, invented copy on index.html:187 |
| Responsive | 78/100 | FAIL: No mobile nav (hamburger missing), nav overflows at 320–375px |
| Content Quality | 88/100 | PASS: All copy verbatim from content.json, technical claims accurate. Note: plugin hook names (onBoot, onScan, etc.) not verified against phlix-server source |
| SEO | 63/100 | FAIL: Missing sitemap.xml and robots.txt; hub.html and features.html meta descriptions 4–6 chars over limit |
| Branding Consistency | 75/100 | CONDITIONAL: Font-weight overuse (6 non-headline selectors at 800), off-palette hardcoded greys for UI chrome |
| Documenter | 85/100 | PASS: VARIANT.md, BUILD_LOG.md, README.md table all correct; FAIL: img/PROMPTS.md missing |
| Accessibility | NOT SUBMITTED | — |
| Usability | NOT SUBMITTED | — |
| Performance | NOT SUBMITTED | — |
| Localization | NOT SUBMITTED | — |
| CTA / Funnel | NOT SUBMITTED | — |
| Social Metadata | NOT SUBMITTED | — |
| Tester | NOT SUBMITTED | — |

---

## Strengths

- **HTML structure** — All 8 pages present with correct semantic landmarks (header, main, nav, footer), single h1 per page, skip links, visible focus styles, prefers-reduced-motion handling
- **CSS architecture** — Proper CSS custom properties, brand palette correctly defined, spacing scale, clamp() typography, 44px touch targets globally, overflow-x: hidden on body, no horizontal scroll at 320px
- **Brand colors** — All 6 brand-kit colors correctly implemented: electric_blue #2D9CFF, charcoal #1A1A1A, white #FFFFFF, slate_gray #2E2E2E, soft_blue #A7D8FF, neon_aqua #00F0FF
- **Content sourcing** — Hero, pitch bullets, feature cards, clients, FAQ, footer all verbatim from content.json; no invented clients or features (except unverified plugin hook names)
- **Technical accuracy** — PHP 8.3+, Workerman 5.x, Argon2ID, JWT refresh tokens, NTP SyncPlay, CRF 23/28, HLS, ContentDirectory/AvTransport — all consistent with phlix-server documented capabilities
- **No frameworks** — Vanilla JS, no bundlers, no tracking scripts
- **Lint passing** — HTMLHint, ESLint, Stylelint all pass with 0 errors

---

## Recommendations for Improvement

1. **Add mobile navigation immediately** — Add `id="nav-toggle"` button to all 8 HTML templates inside `.site-header__inner`; add `.is-open` CSS to collapse nav on mobile; add a ~600px breakpoint before nav overflows
2. **Self-host Google Fonts** — Download WOFF2 font files and reference them with local `url()` paths instead of `https://fonts.gstatic.com/...`
3. **Fix OG image** — Either convert `og.svg` to proper 1200×630 PNG or update meta tags on all 8 pages to reference `.svg`
4. **Add `sitemap.xml` and `robots.txt`** — Both are hard SEO failures; minimal effort to create
5. **Fix font weights** — Remove `font-weight: 800` from h4/h5/h6, .site-footer__col h3, .ecosystem-item__name, .faq-item__q; use 400 or 500 instead; remove `'Arial Black'` from `--font-headline` fallback stack
6. **Promote off-palette greys to design tokens** — `#555` (text-muted), `#E0E0E0` (border), and ~10 other hardcoded greys for UI chrome should be elevated to CSS custom properties defined in the brand kit
7. **Create `img/PROMPTS.md`** — Add per-image entries for logo.svg, og.svg, favicon.svg with resolution, aspect ratio, and full prompt text
8. **Trim 2 meta descriptions** — Reduce hub.html (164→≤160) and features.html (166→≤160) by removing 4–6 chars each
9. **Verify plugin hook names** — Run `grep -r "onBoot\|onScan\|onTranscode\|onPlay\|onStop" /path/to/phlix-server/src` to confirm or correct the 5 hook names listed in plugins.html before treating them as ground truth

---

## Can Proceed to Phase I?
**NO** — The variant has 3 critical failures that block site usability and discoverability:

1. **Mobile navigation is broken** — The site is functionally unusable on mobile phones (nav overflows, no collapse mechanism)
2. **SEO infrastructure missing** — No sitemap.xml or robots.txt means search engines cannot discover or index the site properly
3. **CDN font loading violates Builder contract** — All pages pull fonts from Google Fonts at runtime

These must be resolved in a fix round before Phase I can begin. The content quality, code structure, and branding foundations are solid — the issues are surface-level but blocking.
