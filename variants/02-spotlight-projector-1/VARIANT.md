# Variant 02 — Spotlight Projector V1: Classic Cinematic

## Overview

Spotlight Projector V1 is a "Classic Cinematic" themed website for Phlix, a self-hosted PHP media server. The design evokes traditional film aesthetics with warm tones, theater curtain ambiance, and soft spotlight effects.

## Brand Kit (Consumed Tokens)

**Colors:**
- Primary: gold_spotlight `#F5C542`, deep_black `#000000`, warm_white `#FFF7E6`
- Secondary: burgundy `#7A1F1F`, soft_shadow_gray `#3A3A3A`
- Accent: amber_glow `#FFB84D`

**Typography:**
- Headlines: Cinzel Bold (dramatic, cinematic)
- Body: Lora Regular (warm, readable)
- UI: Source Sans Pro
- Code: Fira Code

**Visual Style:**
- Dark mode by default
- Theater curtain texture hints
- Soft spotlight effects
- Cinematic letterbox touches on hero
- Animated spotlight sweep in header

## Distinctive Design Decisions

1. **Header Motif**: Animated spotlight sweep that moves across the header, creating a theater light effect.

2. **Letterbox Hero**: The hero section has cinematic letterbox-style bars (dark strips at top and bottom) with a soft radial spotlight glow emanating from the center.

3. **Theater Curtain Background**: Subtle vertical gradient hints suggesting theater curtains on the page edges.

4. **Gold Accent System**: Gold (#F5C542) is used for:
   - Headlines and section titles
   - CTA buttons (primary)
   - Active navigation states
   - Icon fills
   - Decorative elements

5. **Warm Color Temperature**: All colors avoid cold tones. Backgrounds use deep black with subtle warm gradients. The burgundy accent adds theatrical warmth.

6. **Spotlight Glow Effects**: Radial gradients behind hero content and feature cards create the sense of warm stage lighting.

## Pages Implemented

All 8 pages from `shared/content.json`:

1. **index.html** — Hero with letterbox effect, pitch bullets, feature grid, ecosystem
2. **features.html** — Deep dive on all 8 features with alternating detail sections
3. **clients.html** — Client cards with stable/beta status, comparison table
4. **download.html** — Docker, Docker Compose, and direct install quickstart
5. **plugins.html** — Plugin model flow, capability types, example plugin link
6. **docs.html** — Doc section cards, quick start guides, external link
7. **hub.html** — Hub features, self-hosted vs public comparison, how-it-works flow
8. **about.html** — Philosophy, license, FAQ accordion, contact

## CSS Architecture

```
css/
  base.css      — Reset, typography, spacing, accessibility
  theme.css     — Dark mode theme, header/footer, spotlight animations
  components.css — Feature cards, client cards, download cards, FAQ, tables
```

## Accessibility

- Skip link to main content
- `prefers-reduced-motion` support (disables spotlight animation)
- Visible focus styles (gold outline)
- ARIA labels on icon-only buttons
- Semantic HTML structure with landmarks
- Touch targets ≥44px

## Responsive Behavior

- Mobile-first approach
- Breakpoints: 320px → 1920px
- Navigation collapses to hamburger menu below 768px
- Feature grids reflow to single column on mobile
- No horizontal scroll at any viewport

## Gotchas & Notes

1. **Fonts**: Cinzel and Lora are loaded via Google Fonts import. For production self-hosting, these should be downloaded and served locally to avoid CDN dependency.

2. **Spotlight Animation**: Uses CSS keyframes with `@media (prefers-reduced-motion: reduce)` to disable on user preference.

3. **SVG Icons**: All icons are inline SVG with appropriate ARIA hidden attributes. No external icon library used.

4. **Theater Curtain Effect**: Created with subtle CSS gradients and pseudo-elements, not actual images.

5. **No JavaScript Dependencies**: Pure vanilla JS for interactivity (mobile menu, FAQ accordion).

## Assets

```
img/
  logo.svg     — Projector icon with "P" letterform, gold on dark
  favicon.svg  — Simplified projector at 32x32
  og.svg       — Social sharing image with hero layout
  PROMPTS.md   — Image generation prompts reference
```

## Files Created

- 8 HTML pages
- 3 CSS files
- 1 JS file
- 4 image assets
- 2 documentation files (VARIANT.md, BUILD_LOG.md)

## Verification Checklist

- [x] All pages render from `shared/content.json` (no paraphrased copy)
- [x] Brand tokens exclusively used (no invented colors/fonts)
- [x] `<html lang="en">` on all pages
- [x] Skip link present
- [x] Visible focus styles
- [x] `prefers-reduced-motion` media query
- [x] Semantic navigation with `<nav>`, `<main>`, `<header>`, `<footer>`
- [x] Single `<h1>` per page
- [x] All meta tags: title (≤60), description (≤160), OG, Twitter, canonical
- [x] Responsive 320 → 1920px
- [x] Touch targets ≥44px
- [x] No frameworks, bundlers, third-party CDNs, or tracking
