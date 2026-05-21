# BUILD LOG — Variant 05: Pixel Tech V1

## Timeline

### Day 1 — Project Setup
- Read shared content.json, brand-kits.json, brand_identity.md (Concept 5 section)
- Loaded frontend-philosophy skill for design guidance
- Created directory structure: `css/`, `js/`, `img/`

### Day 1 — CSS Implementation
- Created `css/base.css` (~150 lines)
  - CSS custom properties with all brand colors and fonts
  - Reset, skip link, focus styles, reduced-motion support
  - Typography base with proper font stacks
  - Scrollbar styling in terminal green
- Created `css/theme.css` (~280 lines)
  - Terminal-style header with command prompts
  - Hero section with scanline overlay
  - Terminal typing animation with blinking cursor
  - Feature grid and pitch bullet styling
  - Footer with terminal aesthetic
- Created `css/components.css` (~260 lines)
  - Terminal-style buttons (green on black, no rounded corners)
  - Terminal window component with traffic-light dots
  - Client cards with stable/beta badges
  - FAQ list styling
  - Download command blocks

### Day 1 — JavaScript
- Created `js/main.js` (~75 lines)
  - Terminal typing animation with randomized timing
  - Mobile navigation toggle with escape key support
  - Staggered card entrance via IntersectionObserver
  - Reduced-motion detection and fallback

### Day 1 — Image Assets
- Created `img/logo.svg` — Triple-bracket mark (solid, 70%, 40% opacity)
- Created `img/favicon.svg` — Same mark scaled to 32x32
- Created `img/og.svg` — 1200x630 social image with grid pattern, logo, tagline
- Created `img/PROMPTS.md` — Asset documentation

### Day 1 — HTML Pages
All 8 pages created with consistent structure:
- Proper `<html lang="en">`
- Complete meta tags (title, description, canonical, OG, Twitter card)
- Skip link, semantic landmarks, ARIA labels
- Responsive layout (320px → 1920px)
- Mobile navigation overlay

**Pages created:**
1. `index.html` — Hero + pitch bullets + feature cards + CTAs
2. `features.html` — Deep dive on library, SyncPlay, transcode, auth, Live TV, DLNA, plugins, hub
3. `clients.html` — 5 client cards with stable/beta status
4. `download.html` — Quickstart commands, system requirements, ecosystem
5. `plugins.html` — Plugin manifest schema, lifecycle hooks, phlix-plugin-example link
6. `docs.html` — User guide, dev docs, hub admin, API reference links
7. `hub.html` — Hub explanation with terminal-style network diagrams
8. `about.html` — Philosophy, BSD-3 license, FAQ, contact

### Day 1 — Documentation
- Created `VARIANT.md` (~120 lines) — Design language, decisions, technical approach
- Created `BUILD_LOG.md` — This file

### Day 1 — Verification
- All 8 pages exist: ✓
- All CSS files present: ✓
- All JS files present: ✓
- All image assets present: ✓
- Linting: PENDING

## Notes

- ~~Fonts via Google Fonts CDN (Orbitron, Inter, Roboto Mono, JetBrains Mono)~~ — FIXED: Self-hosted fonts
- No third-party JS frameworks used
- All animations respect prefers-reduced-motion
- Brand colors strictly followed — no invented colors
- Terminal aesthetic consistent across all pages

## Fixes Applied (Wave 1 Review)

### Failure 1: Google Fonts CDN — FIXED
- **Problem**: All HTML pages had `@font-face` with `url(https://fonts.gstatic.com/...)` pulling fonts from Google CDN at runtime
- **Contract violation**: Builder MUST NOT pull fonts or scripts from a third-party CDN at runtime
- **Fix applied**:
  - Created `variants/05-pixel-tech-1/fonts/` directory
  - Downloaded WOFF2 font files: Orbitron Bold, Inter Medium, Roboto Mono (400, 500), JetBrains Mono (400, 500)
  - Replaced Google Fonts `@import` in `css/base.css` with self-hosted `@font-face` declarations
  - Removed all `fonts.gstatic.com` and `fonts.googleapis.com` references

### Failure 2: OG image mismatch — ALREADY FIXED
- **Problem**: All 8 HTML pages had `og:image` meta referencing `/img/og.png` but only `og.svg` existed
- **Status**: Verified all 8 HTML pages now correctly reference `/img/og.svg` (no changes needed)

### Failure 3: Fake domain in hub.html — NOT FOUND
- **Problem**: Review claimed `hub.html` line 16 had fake domain `https://phlix-hub.example.com`
- **Status**: Searched entire variant — no `phlix-hub.example.com` found. The only `example.com` reference is `user@example.com` in a terminal demo output (line 126), which is example text, not a real link. No fix needed.

## Verification Results
- HTML lint (variant 05): **PASS** — 0 errors
- CSS lint (variant 05): **PASS** — 0 errors  
- JS lint (variant 05): **PASS** — 0 errors
- No `fonts.gstatic.com` URLs: **VERIFIED**
- No `fonts.googleapis.com` URLs: **VERIFIED**
- No `phlix-hub.example.com` domains: **VERIFIED**
- No `og.png` references: **VERIFIED** (all use `og.svg`)
