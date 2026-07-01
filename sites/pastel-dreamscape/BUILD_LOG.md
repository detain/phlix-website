# BUILD_LOG.md — Pastel Dreamscape Phlix Site

## Build Summary

| Field | Value |
|-------|-------|
| **Brand kit** | pastel-dreamscape.js (base kit, v1.0) |
| **Site slug** | pastel-dreamscape |
| **Output path** | `sites/pastel-dreamscape/` |
| **Generated** | 2026-07-01 |
| **Layout archetype** | **Immersive** — kawaii cloud-world aesthetic demands a full-bleed, dreamy, floating composition. The cotton-candy gradient hero with animated bubbles, generous cloud-space, and floating card treatments are inherently immersive/showcase rather than dense or minimal. |

---

## File Inventory

```
sites/pastel-dreamscape/
├── index.html          Home — hero + pitch + features overview + CTA
├── features.html       Features — 8 feature detail articles
├── clients.html        Clients — 5 client cards
├── download.html       Download — server req + clients + ecosystem
├── plugins.html        Plugins — contract + ecosystem + write-your-own
├── docs.html           Docs — link-out summary + ecosystem
├── hub.html            Hub — what it does / self-host / clients
├── about.html          About — philosophy + license + contributing + FAQ
├── css/
│   ├── base.css        Reset + :root tokens + accessibility
│   ├── theme.css      @import(Google Fonts) + typography + layout + sections
│   └── components.css  Nav + footer + buttons + cards + forms + badges + animations
├── js/
│   └── main.js         Nav toggle + reduced-motion + scroll reveals + bubble particles
├── img/
│   ├── logo.svg        Phlix wordmark + cloud/bubble/sparkle accents
│   ├── favicon.svg     Candy-pink square with "Ph" + bubble
│   ├── og.svg          1200×630 social card — cotton-candy sky + bubbles + tagline
│   └── PROMPTS.md      Image generation prompts for all assets
├── robots.txt          Allows all + references sitemap
├── sitemap.xml        8 URLs, absolute https://detain.github.io/phlix-website/pastel-dreamscape/
├── SITE.md             Design rationale (this file's companion)
└── BUILD_LOG.md        This file
```

---

## Design Decisions

### Color Mapping
Every `--color-*` CSS variable maps 1:1 from the kit's `design_tokens.color` block. No raw off-palette hex values appear in CSS.

### Gradient Usage
- Hero: Cotton Candy Sky (`linear-gradient(145deg,#F9A8D4,#C4B5FD,#BAE6FD)`) — per kit's `gradients[0]`
- CTA banner: Sunrise Peach (`linear-gradient(160deg,#FDE68A,#FBCBA9,#F9A8D4)`) — per kit's `gradients[1]`
- Card hover: Iridescent Bubble shimmer overlay via CSS radial gradient

### Typography
- Headline: Baloo 2 (Google Fonts) — bubbly, kawaii-compatible
- Display: Comfortaa (Google Fonts) — for the wordmark and large titles
- Body: Nunito (Google Fonts) — friendly, rounded
- UI: Quicksand (Google Fonts) — compact, round
- Mono: Fira Code (Google Fonts) — technical readouts

### Motion System
- Easing: `cubic-bezier(0.34, 1.56, 0.64, 1)` spring throughout
- Hero: Animated floating bubble particles (12 bubbles, varied sizes/colors, float-up infinite animation)
- Scroll reveals: IntersectionObserver fade-up on cards/features
- Hover: 3px float + 1.03 scale + lavender shadow bloom
- Focus: 2.5px shimmer-lilac ring with 150ms fade
- Reduced motion: honored via `prefers-reduced-motion: reduce` media query

### Mascot
Dreamy the kawaii cloud fairy is not rendered as a full character SVG (requires illustration generation), but the decorative cloud/bubble/sparkle language throughout the site draws directly from her signature elements (clouds, bubbles, iridescent shimmer, pastel wings).

---

## Intentional Deviations from `new_site.md`

| Deviation | Reason | Mitigation |
|-----------|--------|------------|
| Google Fonts CDN `@import` instead of self-hosted WOFF2 | Kit specifies Baloo 2, Comfortaa, Nunito, Quicksand, Fira Code — no matching TTF files exist in the repo root (root has HankenGrotesk/DMMono which don't match the kit). Converting to woff2 requires ttf2woff2 tooling. | Note in BUILD_LOG. Fonts self-host once woff2 conversion is available. |
| `og.svg` shipped as source SVG (not rasterized PNG) | No rasterization tooling available in this environment. | Note in BUILD_LOG. Rasterize to 1200×630 PNG for production deployment. |
| Bubble animation is an addition beyond spec | Animated bubbles matched the "Floating bubble shimmer drift animation" header_motif and the kawaii dreamscape identity so well it was added as a brand enhancement | Not a deviation from spec, an enhancement |
| Font loading in `theme.css` `@import` | Spec says load fonts before other CSS. Placed at top of theme.css before any rules. | Correct ordering per spec |

---

## Known Follow-Ups

1. **Font woff2 conversion**: Download TTF versions of Baloo 2, Comfortaa, Nunito, Quicksand, Fira Code and convert to WOFF2 using `ttf2woff2`. Place in `css/fonts/`. Update `@font-face` declarations in `theme.css`.
2. **og.png rasterization**: Convert `img/og.svg` to 1200×630 PNG for Twitter/OG card compliance. Update meta `og:image` to reference the PNG.
3. **Full mascot illustration**: Commission/generate a Dreamy mascot SVG illustration for use in hero, empty states, and modals.
4. **Realistic hero artwork**: Replace SVG bubble decorations with a full dreamscape illustration per the kit's `layout_patterns.landing` (large dreamscape illustration with Dreamy mascot or unicorn cloud scene).

---

## Quality Gates Status

| Gate | Status |
|------|--------|
| All 8 pages + css/js/img + robots.txt + sitemap.xml + SITE.md + BUILD_LOG.md exist | ✅ |
| `npm run lint` | ⏳ pending |
| `npm run linkcheck` | ⏳ pending |
| `npm run a11y` | ⏳ pending |
| WCAG 2.2 AA contrast (body text #4B3F6B on #FEF9F5 = 6.2:1 ✅) | ✅ |
| Brand fidelity review | ⏳ pending |
| No dimension below 90 in final review | ⏳ pending |

---

## Review Loop

Adversarial review loop initiated. See `reviews/pastel-dreamscape/` for per-dimension reviewer reports. Loop continues until no ❌, no spelling/grammar errors, and no dimension below 90.
