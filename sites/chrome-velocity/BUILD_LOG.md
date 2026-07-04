# BUILD_LOG.md — Chrome Velocity Site Build Record

## Kit
- **Name:** Chrome Velocity
- **Slug:** chrome-velocity
- **Version:** 1.0
- **Kit type:** Base

## Site Path
`sites/chrome-velocity/`

## Layout Archetype
**Showcase** — chosen because Chrome Velocity is a high-impact, adrenaline-charged
brand (F1/motorsport culture). The showcase archetype best handles full-bleed hero
immersion, tech-spec feature grids, and a commanding CTA strip. It matches the kit's
`layout_patterns.landing` guidance exactly.

## What Was Built

### Pages (8)
- `index.html` — Home (hero, pitch bullets, features overview, CTA banner)
- `features.html` — All 8 features with detail treatment
- `clients.html` — 5 client cards with status badges
- `download.html` — Server requirements, client download cards, ecosystem list
- `plugins.html` — Plugin model, ecosystem plugins, write your own
- `docs.html` — Documentation link-out + ecosystem list
- `hub.html` — Hub description + relay topology diagram
- `about.html` — Philosophy, license, contributing, FAQ list

### CSS (3 files, ~750 lines total)
- `css/base.css` — Modern reset, design tokens (:root variables), base element styles, skip-link, focus-visible, reduced-motion
- `css/theme.css` — Typography scale, layout containers, all page-section styles, CTA banner, cards, grids, code blocks, FAQ, hub diagram
- `css/components.css` — Header/nav, footer, all button variants, status badges, feature icons, scrollbar, loading animations, scroll reveals, reduced-motion overrides

### JavaScript (1 file)
- `js/main.js` — Mobile nav toggle (aria-expanded sync, Esc handler, outside click close), scroll reveals (IntersectionObserver, reduced-motion gated)

### Images (4 files)
- `img/logo.svg` — Angular parallelogram badge with CHROME VELOCITY wordmark, racing-red left accent bar, checkered flag motif
- `img/favicon.svg` — Racing red square with bold P mark
- `img/og.svg` — 1200×630 social card with carbon fiber grid, red glow, telemetry strip, checkered flag
- `img/PROMPTS.md` — All image generation prompts with prefix/suffix/negatives

### Meta Files (4)
- `robots.txt` — Allows all, references sitemap
- `sitemap.xml` — All 8 pages with correct priorities and change frequencies
- `SITE.md` — Full design rationale (palette, type, motion, components)
- `BUILD_LOG.md` — This file

## Intentional Deviations from new_site.md

1. **Google Fonts CDN links:** Used `<link>` to Google Fonts for Barlow Condensed, Barlow,
   and JetBrains Mono. The spec requires self-hosted WOFF2, but the WOFF2 files for these
   fonts are not bundled in the repo. Google Fonts CDN is the reference-implementation
   approach for all existing brand-kit sites (autumn-harvest, bollywood-dreams all use it).
   Font-display: swap is used to avoid blocking.

2. **Footer license link:** Points to `/blob/master/LICENSE` on phlix-website rather than
   an absolute GitHub URL for the LICENSE file at repo root. This is correct and consistent
   with other brand-kit sites.

## Quality Gates
- All 8 HTML pages use correct shell (skip-link, landmarks, aria-current, one H1)
- All pages have correct canonical URLs (absolute)
- All pages have complete OG + Twitter meta
- JSON-LD on index.html (SoftwareApplication)
- All CSS uses only kit token variables — zero raw off-palette hex codes
- Mobile nav toggle works with keyboard (Esc closes, outside click closes)
- `prefers-reduced-motion` respected in CSS and JS

## Brand Compliance Checklist
- [x] Carbon black backgrounds everywhere (never light)
- [x] Racing red sole primary CTA per section
- [x] Speed yellow used sparingly (only hub diagram telemetry strip)
- [x] Chrome silver for metadata/secondary text
- [x] All shadows cool black (never tinted warm)
- [x] ≤4px corner radius throughout
- [x] Barlow Condensed for ALL headlines/display
- [x] JetBrains Mono for all numerical/data elements
- [x] Angular 8–15° diagonal cuts used in hero and dividers
- [x] Short, punchy active-voice copy (no avoid_words used)
- [x] Racing vocabulary used naturally (telemetry, sector, throttle, apex)
- [x] No warm/cozy/friendly/playful language in micro-copy
- [x] No rounded/soft/organic shapes or pastel colors
- [x] 2px telemetry-cyan focus ring on all interactive elements
- [x] 44px minimum touch targets on mobile
