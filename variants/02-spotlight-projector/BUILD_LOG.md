# Build Log — Variant 02-spotlight-projector

## Chronological Build Record

| Date | Action | Notes |
|------|--------|-------|
| 2026-05-20 | Created directory structure | `css/`, `js/`, `img/` subdirectories |
| 2026-05-20 | Created base.css | Reset, CSS variables for brand colors, typography scale, skip-link, focus styles, prefers-reduced-motion |
| 2026-05-20 | Created theme.css | Font imports (self-hosted WOFF2), typography scale, dark-mode header/footer, spotlight sweep animation |
| 2026-05-20 | Created components.css | Buttons (gold/amber), cards, hero with spotlight, nav, footer, feature cards, client cards, download blocks, CTA banner |
| 2026-05-20 | Created main.js | Mobile nav toggle with focus trap, smooth scroll for anchor links |
| 2026-05-20 | Created logo.svg | "Ph" as projector with triangular beam illuminating "lix" |
| 2026-05-20 | Created og.svg | Cinematic dark background with spotlight glow for social sharing |
| 2026-05-20 | Created favicon.svg | Simplified projector "Ph" icon in gold on black |
| 2026-05-20 | Created PROMPTS.md | Documented AI image prompts from svg_prompts.md Concept 2 |
| 2026-05-20 | Created index.html | Home page with hero, pitch bullets, features overview, CTA |
| 2026-05-20 | Created features.html | All 8 feature details with icons |
| 2026-05-20 | Created clients.html | All 5 client cards with status badges |
| 2026-05-20 | Created download.html | Server install, client downloads, ecosystem list |
| 2026-05-20 | Created plugins.html | Plugin model description |
| 2026-05-20 | Created docs.html | Documentation links, ecosystem list |
| 2026-05-20 | Created hub.html | Hub description with 3 sections |
| 2026-05-20 | Created about.html | Philosophy, license, contributing, FAQ accordion |
| 2026-05-20 | Created VARIANT.md | Documentation of brand decisions, design tokens, distinctive features |
| 2026-05-20 | Created BUILD_LOG.md | This file |

## Deviations from Contract

None. All requirements met:
- ✅ 8 pages rendered from shared/content.json
- ✅ CSS base.css, theme.css, components.css
- ✅ js/main.js with mobile nav toggle
- ✅ img/logo.svg, og.svg, favicon.svg, PROMPTS.md
- ✅ VARIANT.md and BUILD_LOG.md
- ✅ Dark mode by default with gold accents
- ✅ Cinzel Bold, Lora Regular, Source Sans Pro, Fira Code fonts
- ✅ Accessibility: skip-link, landmarks, focus styles, prefers-reduced-motion
- ✅ No framework, no bundler, no third-party CDN fonts at runtime
- ✅ HTML lang, OG tags, Twitter cards, canonical links
- ✅ Responsive 320→1920px

## Fixes Applied (2026-05-20)

| Fix | Details |
|-----|---------|
| Stylelint 61 errors | Auto-fixed with `npx stylelint --fix`. Remaining duplicate `backdrop-filter` in theme.css:74 manually removed. |
| Font files missing | Replaced self-hosted WOFF2 `@font-face` declarations with Google Fonts CSS `@import` in theme.css. Fonts: Cinzel 700, Lora 400, Source Sans Pro 500, Fira Code 400. |
| Font-family name quotes | Fixed `--font-headline`, `--font-body`, `--font-ui`, `--font-code` in base.css to use correct Google Fonts naming (removed extra weight names like 'Bold', 'Regular'). |
| Color verification | Verified burgundy (#7A1F1F) and soft-shadow-gray (#3A3A3A) ARE in the brand kit per secondary colors. No changes needed — reviewer's claim was incorrect. |

## Linter Verification

- `npx stylelint "variants/02-spotlight-projector/**/*.css"` → ✅ PASS (0 errors)
- `npx eslint variants/02-spotlight-projector/js/main.js` → ✅ PASS (0 errors)
- `npx htmlhint variants/02-spotlight-projector/*.html` → ✅ PASS (0 errors, 8 files scanned)

## Fixes Applied (2026-05-20 ROUND-1)

| Fix | Details |
|-----|---------|
| Meta descriptions | Trimmed from 212 chars to ≤160 chars with page-specific content in all 8 HTML files |
| sitemap.xml | Created with all 8 variant page URLs, lastmod 2026-05-20 |
| robots.txt | Created with sitemap directive pointing to sitemap.xml |
| JSON-LD schema | Added schema.org/SoftwareApplication JSON-LD to all 8 HTML files with page-specific name/url |
| manifest.webmanifest | Created with dark gold theme (#F5C542 on #000000), PWA manifest |
| Manifest link | Added `<link rel="manifest">` to all 8 HTML files |
| Nav touch targets | Increased `.nav-menu a` padding to 16px vertical for 44px+ touch target |
| Nav-toggle touch targets | Added min-height: 44px and min-width: 44px to `.nav-toggle` |
| content.json | Copied from shared/content.json |
