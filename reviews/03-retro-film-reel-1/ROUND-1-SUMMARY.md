# Round 1 Summary — 03-retro-film-reel-1

## Overall Score
61 / 100

## Critical Issues (fix before next wave)
- **Google Fonts CDN violation (ALL 8 PAGES)** — Every HTML page embeds `<style>` blocks with `@font-face` declarations pulling font files from `fonts.gstatic.com` at runtime. The contract MUST NOT clause explicitly prohibits pulling fonts from a third-party CDN at runtime. Self-host the WOFF2 files locally and update all `@font-face src: url()` references. [Severity: Critical — direct contract violation, blocks compliance]

- **OG image meta tag references nonexistent .png file (ALL 8 PAGES)** — All 8 pages have `og:image` pointing to `/img/og.png` but only `img/og.svg` exists on disk. Facebook/LinkedIn social previews will likely fail to render. Either convert `og.svg` to a proper 1200×630 PNG or update all 8 `og:image` meta tags to reference `.svg`. [Severity: Medium — broken social metadata]

- **Hardcoded marketing copy not in shared/content.json (index.html:187)** — The philosophy/CTA block uses invented copy: "Stop renting access to your own media. Set up Phlix in minutes and stream everywhere." The contract requires rendering every page from `shared/content.json` — no invented copy. Either add this text to `content.json` first and reference it, or rewrite using only existing content.json copy. [Severity: High — violates no-invented-copy contract clause]

- **README.md variant table row points to wrong directory** — The root `README.md` table row for variant 03 points to `variants/03-retro-film-reel/` instead of `variants/03-retro-film-reel-1/`. Classic Diner sub-variant is unrepresented in the table. [Severity: Medium — incorrect documentation linking]

- **img/PROMPTS.md missing resolution and aspect ratio** — All image prompt entries are missing required resolution (e.g., 1200×630) and aspect ratio (e.g., 1.91:1) metadata. Contract requires this for asset reproducibility. [Severity: Low — documentation completeness]

## Dimension Scores

| Dimension | Score | Key Finding |
|-----------|-------|-------------|
| Code | 61/100 | Aggregate < 90 with 3 failures; Google Fonts CDN critical violation; og:image .png mismatch; invented copy |
| Tester | 82/100 | 9/11 checks pass; mobile focus trapping partial (minor accessibility gap); no forms to validate |
| Documenter | 50/100 | 2/4 checks pass; VARIANT.md + BUILD_LOG.md pass; PROMPTS.md incomplete; README.md wrong dir |
| Accessibility | NOT SUBMITTED | — |
| Usability | NOT SUBMITTED | — |
| Responsive | NOT SUBMITTED | — |
| Performance | NOT SUBMITTED | — |
| Localization | NOT SUBMITTED | — |
| CTA / Funnel | NOT SUBMITTED | — |
| Content Quality | NOT SUBMITTED | — |
| Social Metadata | NOT SUBMITTED | — |
| SEO | NOT SUBMITTED | — |
| Branding Consistency | NOT SUBMITTED | — |

**Code Review per-dimension estimates** (informational only, not from submitted reviews):
- Code-review itself provided: Accessibility 89, Performance 78, Responsive 88, Branding Consistency 94, Usability 85, Content Quality 70, CTA/Funnel 80, SEO 85, Social Metadata 80, Localization 92

## Strengths
- All 8 HTML pages render with valid DOCTYPE, `lang="en"`, proper semantic structure
- Brand colors and typography tokens match `shared/data/brand-kits.json` exactly
- Content verbatim from `shared/content.json` on all major blocks (hero, pitch bullets, feature cards, client cards, FAQ items, footer)
- Comprehensive accessibility implementation: skip links, visible focus rings (3px teal outline), `prefers-reduced-motion` three-layer support, single `h1` per page, semantic landmarks, `aria-current=page` on active nav, `aria-expanded`/`aria-controls` on menu toggle
- No images without alt text; all SVGs properly marked decorative with `aria-hidden="true"`
- CSS and JS both lint clean (0 ESLint errors, 0 Stylelint problems)
- Mobile menu toggle present with keyboard support; ESC key closes menu and returns focus to toggle
- All navigation links correct; footer external links point to plausible GitHub repositories
- VARIANT.md (175 lines) clearly describes the 1950s Classic Diner retro aesthetic
- BUILD_LOG.md documents all 7 implementation phases and Round 2 fixes

## Recommendations for Improvement
1. **Self-host Google Fonts WOFF2** (Critical) — Download Bebas Neue, Open Sans, Nunito Bold, Cousine WOFF2 files into `css/fonts/` and update all 8 HTML pages' `@font-face src: url()` from CDN to local paths.
2. **Fix og:image mismatch** (High) — Either convert `img/og.svg` to a proper 1200×630 PNG at `img/og.png`, or update all 8 `og:image` meta tags to end in `.svg`.
3. **Source invented copy from content.json** (High) — Move philosophy CTA block text into `shared/content.json` and reference it by key instead of hardcoding.
4. **Update README.md variant table** (Medium) — Change variant 03 row from `03-retro-film-reel/` to `03-retro-film-reel-1/` and reflect "Classic Diner" in the description column.
5. **Add PROMPTS.md resolution/aspect metadata** (Low) — For each of the 17 image prompt entries, add `**Resolution**: NNNN×NNNN` and `**Aspect**: X.XX:1` fields.
6. **Consider explicit mobile focus trapping** (Low) — Move focus into the mobile menu when opened, keep focus within until closed. Current natural tab-order behavior may confuse screen reader users.

## Can Proceed to Phase I?
**NO** — Two critical contract violations must be resolved before compliance: (1) Google Fonts CDN runtime loading on all 8 pages and (2) og:image meta tag references nonexistent `.png` file. Additionally, the hardcoded invented copy on index.html violates the no-invented-copy contract clause. Fix these three items and re-review before Phase I clearance.
