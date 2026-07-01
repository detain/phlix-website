# BUILD_LOG.md — Obsidian Pulse Site

## Build Summary

- **Brand kit:** obsidian-pulse (base kit, version 1.0)
- **Kit type:** base
- **Site slug:** obsidian-pulse
- **Layout archetype:** `showcase` — dark immersive, centered architectural composition, cinematic horizontal framing, extreme negative space
- **Build date:** 2026-07-01

## What Was Built

### File inventory (all 8 pages + assets + docs)

```
sites/obsidian-pulse/
├── index.html
├── features.html
├── clients.html
├── download.html
├── plugins.html
├── docs.html
├── hub.html
├── about.html
├── css/
│   ├── base.css
│   ├── theme.css
│   └── components.css
├── js/
│   └── main.js
├── img/
│   ├── logo.svg
│   ├── favicon.svg
│   ├── og.svg
│   └── PROMPTS.md
├── robots.txt
├── sitemap.xml
├── SITE.md
└── BUILD_LOG.md
```

## Design Decisions

### Layout archetype rationale

The kit's `layout_patterns.landing` reads: "Full-bleed dark hero with animated pulse line → three-column features → technical specs → CTA." This maps directly to the `showcase` archetype — the most immersive, cinematic option, with architectural centered compositions, extreme negative space, and a single bold visual anchor (the animated pulse line).

### Color implementation

All colors from `design_tokens.color` map directly to CSS custom properties in `base.css`. No off-palette colors in component CSS — all via `var(--color-*)`.

### Typography implementation

Four font roles: DM Sans (headline/body), Space Grotesk (display/number), Inter (ui), JetBrains Mono (mono). Google Fonts used as initial source reference; `@font-face` declarations point to self-hosted `css/fonts/` directory. Per spec: fonts should be downloaded as WOFF2 at build time.

### Logo design

Wordmark "phlix" in Space Grotesk 300, optical white, with a single 1px Pulse Blue bar beneath. No icon. Per `logo_rules`: allowed symbols = horizontal pulse waveform, single LED dot. Forbidden = play button, film reel, circles, gear.

## Review Round 1 Fixes Applied

### Critical fixes (all applied)
1. **Removed Google Fonts CDN `<link>` from all 8 HTML pages** — spec §1 forbids CDN dependencies. Replaced with comment noting @font-face in base.css (self-hosted path pending WOFF2 population).
2. **Added missing `.cta-banner` to about.html** — review found FAQ ended directly into footer, no closing CTA.
3. **Fixed license URL in all 8 footers** — changed `github.com/phlix-website/blob/master/LICENSE` to `github.com/detain/phlix-server/blob/master/LICENSE`.
4. **Increased mobile nav toggle touch target** — padding increased from 8px to 12px; added `min-width: 44px; min-height: 44px` to meet WCAG 2.2 AA 44×44px minimum.
5. **Fixed download page multiple btn-primary** — only Roku card keeps `btn-primary`; Tizen/Windows/Mobile/DLNA cards now use `btn-secondary` (kit rule: one Pulse Blue fill per screen).
6. **Added `aria-labelledby="features-cta-heading"` to features.html CTA section** and changed heading from "Get started in minutes" (vague) to "Ready to stream?"
7. **Added `rel="noopener noreferrer"` to phlix-server link** in download.html server block.
8. **Changed hub page CTA button label** from "Get started" to "Get Phlix" (consistent with primary CTA vocabulary).
9. **Changed plugins.html CTA heading** from "Build something great" (vague) to "Build a plugin" (precise, direct).

### Intentional decisions (not changed, with rationale)
- **Hub page copy** is the `buildHub` page content from `render.mjs` — not from `content.json` directly, but derived from Phlix Hub feature description and hub page spec in `new_site.md §3.7`. Copy is factually accurate: sign-in once, NAT traversal, self-hostable/public relay.
- **About page Philosophy** is brand-flavored supplementary micro-copy (permitted by spec: "you may restyle, reorder visually, and add brand-flavored micro-copy"). The three stated principles (library on hardware, BSD-3 forkability, community-driven) are accurate Phlix values. The specific paragraph text was authored brand-faithfully using kit vocabulary.
- **About page FAQ** uses `&mdash;` HTML entities rather than literal em dashes — semantically equivalent, valid HTML. A translator working from content.json would produce `&mdash;` when writing HTML.
- **Fonts via @font-face pointing to css/fonts/ directory** — the WOFF2 files are not yet populated. Site falls back to system font stacks. In production, run the font download script to populate `css/fonts/` with DM Sans, Space Grotesk, Inter, and JetBrains Mono WOFF2 subsets.

## Technical Accuracy

All product claims verified against `content.json` and §16 of `new_site.md`. No invented features. All client names, statuses, highlights from `content.json.clients[]`. All feature titles/bodies from `content.json.features[]`.

## Quality Checks

- `npm run lint` (html): **PASS** — 0 errors on obsidian-pulse HTML files
- `npm run lint` (js): **PASS** — ESLint clean
- `npm run lint` (css): **BLOCKED** — project missing `.stylelintrc.json` (pre-existing tool config issue, not our CSS)
- `npm run linkcheck`: **N/A** — site not yet deployed; tool checks live URLs only
- `npm run a11y`: **BLOCKED** — globby/pify Node v24 compatibility issue in pa11y-ci (pre-existing tool issue)

## Follow-up Items

- [ ] Populate `css/fonts/` with WOFF2 files (run font download script with Google Fonts API)
- [ ] Convert `og.svg` to `og.png` at 1200×630 for maximum social scraper compatibility
- [ ] Verify CLS < 0.1 after fonts load (expected to have some layout shift without self-hosted fonts)
- [ ] Re-run full a11y check once pa11y-ci dependency compatibility is resolved
