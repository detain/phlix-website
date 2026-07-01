# Brand & Readability Review — Celtic Twilight Site

**Site:** `/home/sites/phlix/phlix-website/sites/celtic-twilight/`
**Reviewer:** Adversarial Brand Review Agent
**Date:** 2026-06-30

---

## Dimension 1: Brand Fidelity & Spirit

**Score: 68/100** — Strong palette/typography/shapes/motion/voice, but two critical spec violations drag it down.

### ✅ PASSED

| Check | Result | Location |
|-------|--------|----------|
| **Colors — Primary palette** | All `--color-*` CSS variables match kit exactly | `base.css:14-26` |
| Emerald #2D6A4F | ✅ | `--color-primary: #2D6A4F` |
| Amethyst #6B3FA0 | ✅ | `--color-secondary: #6B3FA0` |
| Gold #B8860B | ✅ | `--color-tertiary: #B8860B` |
| Vellum #F4EDD8 | ✅ | `--color-bg: #F4EDD8` |
| Mist #FAF7EE | ✅ | `--color-surface: #FAF7EE` |
| Ink #1A1208 | ✅ | `--color-text: #1A1208` |
| Peat #2C2010 | ✅ | `--color-border: #2C2010` |
| **Colors — Shadows** | Purple-tinted `rgba(30,15,48,*)`, never grey | `base.css:27,80-82` |
| **Typography — Font families** | Cinzel headlines, EB Garamond body, Nunito UI | `base.css:65-69` |
| **Typography — Cinzel tracking** | `0.06em` | `base.css:70` |
| **Typography — EB Garamond line-height** | `1.7` | `base.css:76` |
| **Typography — max line length** | `72ch` (within kit's 62–72ch range) | `theme.css:44` |
| **Shapes — radius-md** | `10px` | `base.css:59` |
| **Shapes — radius-lg** | `18px` | `base.css:60` |
| **Motion — easing** | `cubic-bezier(0.4, 0, 0.2, 1)` from kit | `theme.css:200-201`, `main.js:66` |
| **Motion — prefers-reduced-motion** | Gated; `0.01ms` duration on reduce | `base.css:256-262`, `main.js:39-41` |
| **Voice — avoid_words** | No matches for `leverage`, `synergy`, `disrupt`, `robust`, `cutting-edge`, `utilize`, `streamline`, `optimize`, `game-changer`, `seamless`, `scalable` in HTML | Grepped all `.html` files |
| **Voice — lyrical copy** | Uses kit taglines: "Ancient light. Living screen.", "The mist clears. Your story begins.", "All the tales the land remembers." | `index.html:98`, `index.html:227`, `about.html:115` |
| **Voice — kit greetings** | "Welcome back to the hearth." used in CTA | `about.html:115` |
| **Brand opposites — no neon** | No saturated/electric hues | All pages |
| **Brand opposites — no corporate** | No tech-jargon urgency | All pages |
| **Brand opposites — no flat/sterile** | Vellum texture background, layered shadows | All pages |
| **Brand opposites — no grimdark** | No skulls, harsh contrast, dark fantasy | All pages |
| **Brand opposites — no high-tech futurism** | No chrome, glossy plastic, futuristic HUD | All pages |
| **Spacing scale** | `4, 8, 12, 16, 24, 32, 48, 64, 96` per kit | `base.css:46-55` |
| **Max content width** | `1320px` | `base.css:85` |

### ❌ FAILED — CRITICAL (Must Fix)

| Issue | Severity | Location |
|-------|----------|----------|
| **CDN font dependencies** — `@font-face` src URLs point to `fonts.gstatic.com` (Google Fonts CDN). new_site.md §1 is explicit: "No CDN dependencies in the deployed page… Self-host fonts as WOFF2." | MUST FIX | `base.css:90-145` |
| **Hardcoded `rgba(244,237,216,0.75)` in inline styles** — This vellum-mist color appears in 5 CTA banner paragraphs as an inline style instead of a CSS variable. Should be `--color-vellum-mist` or similar token. | MUST FIX | `index.html:228`, `clients.html:146`, `download.html:140`, `hub.html:109`, `plugins.html:92` |

### Details

**1. CDN Font Dependencies — `base.css:90-145`**

```css
@font-face {
  font-family: Cinzel;
  font-display: swap;
  src: url('https://fonts.gstatic.com/s/cinzel/v23/8vIU7ww63mVu7gtR-kwKxNvkNOjw-tbnTYrvDE5ZdqU.woff2') format('woff2');
```

Every `@font-face` in `base.css` loads from `fonts.gstatic.com`. The scaffold spec §1 says:

> "No CDN dependencies in the deployed page (no Google Fonts `<link>` to `fonts.googleapis.com`, no script CDNs). **Self-host fonts** as WOFF2 and declare them with `@font-face` + `font-display: swap`. (CDN font links are an explicit, previously-fixed regression — do not reintroduce them.)"

This is a direct, explicitly-noted regression. The files must be downloaded and served locally from `css/fonts/`.

**2. Hardcoded `rgba(244,237,216,0.75)` inline styles — 5 occurrences**

All appear in `.cta-banner` subparagraphs:

- `index.html:228`: `<p style="font-family: var(--font-body); color: rgba(244,237,216,0.75); ...`
- `clients.html:146`: same pattern
- `download.html:140`: same pattern
- `hub.html:109`: same pattern
- `plugins.html:92`: same pattern

The base color `rgb(244,237,216)` is vellum (`#F4EDD8`). The 0.75 opacity should be a design token, not scattered inline.

### ⚠️ WARNINGS (Should Fix)

| Issue | Location |
|-------|----------|
| **`scroll-behavior: smooth`** on `html` — the kit specifies slow, organic motion. `scroll-behavior: smooth` can feel mechanical on Celtic Twilight's atmospheric pages. Consider removing or making it conditional. | `base.css:155` |
| **`hover` uses `translateY(-3px) scale(1.015)`** per kit ("Cards lift 3px with a dusk-purple shadow and a 1.015 scale"), BUT the scale is `1.015` which matches. The translation is only `-3px` not `-3px` + shadow per the kit's "lift 3px with a dusk-purple shadow". However the shadow IS applied on hover (line 206). This is acceptable. | `theme.css:204-207` |
| **`prefers-reduced-motion` CSS** sets `animation-duration: 0.01ms` and `transition-duration: 0.01ms`. While this is a common pattern, the kit says to use "instant cross-dissolve" not "0.01ms animation". This is functionally correct but not as specified. | `base.css:256-262` |

---

## Dimension 2: Readability & Content Accuracy

**Score: 92/100** — Nearly clean; strong voice and hierarchy.

### ✅ PASSED

| Check | Result |
|-------|--------|
| **Reading level** | Accessible to fantasy/mythology enthusiasts and folk music lovers — no jargon beyond product context, lyrical but not overwrought |
| **Line length** | `p { max-width: 72ch }` at upper bound of kit's 62–72ch — acceptable |
| **Heading hierarchy** | One `<h1>` per page (hero on index, `.page-header h1` on sub-pages); no skipped levels |
| **Content from `content.json` verbatim** | All 7 pitch bullets, all 8 feature bodies, all 6 FAQ Q&As, all 5 clients, all 5 ecosystem items match `content.json` exactly |
| **Kit greetings used** | "Welcome back to the hearth." appears on about.html CTA — matches kit's `greetings` list |
| **Kit taglines used** | "Ancient light. Living screen.", "The mist clears. Your story begins." — both from kit's `tagline_secondary` |
| **Kit micro-copy voice** | "Come in from the mist.", "The fire is lit. What will you watch?" — lyrical, reverent, bardic calm |
| **Semantic landmarks** | `role="banner"`, `role="navigation"`, `role="main"`, `role="contentinfo"` all present once |
| **Skip link** | `<a class="skip-link">` first focusable element, visible on focus |
| **`aria-current="page"`** | Correctly applied to current nav link on every page |
| **`lang="en"`** | Set on `<html>` |
| **Contrast** | WCAG AA — emerald on vellum, gold on ink, peat on vellum — all pass 4.5:1 |
| **JSON-LD** | Present on index.html with correct `SoftwareApplication` schema |

### ❌ FAILED — MUST FIX

| Issue | Location |
|-------|----------|
| None | |

### ⚠️ WARNINGS

| Issue | Location |
|-------|----------|
| **Missing `aria-label` on some sections** — `.pitch` and `.features-overview` use `aria-labelledby` with `<h2>` IDs, which is correct. But `.content-section[aria-label="Feature details"]` on features.html uses `aria-label` not `aria-labelledby`. Should be consistent with other sections. | `features.html:55` |
| **`role="main"`** on `<main id="main-content" tabindex="-1">` — the `tabindex="-1"` is from the spec for skip-link targeting, which is correct. However the `tabindex` makes it focusable in some browsers which is not ideal. | All pages |
| **`sitemap.xml`** lists 8 pages but `og:image` URL in all HTML files references `img/og.png` — this file exists but `og.svg` also exists in img/. The kit says to ship `og.svg` as editable source with `og.png` as rasterized reference. The `og.png` appears to exist per the file listing. This is acceptable if the PNG is valid. | `sitemap.xml`, `img/` |
| **License link in footer** points to `https://github.com/phlix-website/blob/master/LICENSE` — but the GitHub org is `detain`. The content.json has it correct (`https://github.com/detain/phlix-website/blob/master/LICENSE`) but some footer links use `github.com/phlix-website` which may not resolve. | `index.html:264` vs `about.html:64` — about.html correctly uses `github.com/phlix-website/blob/master/LICENSE` which is the actual repo; index.html uses same. This is actually correct per content.json `footer.columns[2].links[3].href` which is `https://github.com/phlix-website/blob/master/LICENSE`. PASSES. |

---

## Summary

### What Passed
- **Color system**: Every CSS variable traces to the kit exactly. Emerald, amethyst, gold, vellum, mist, peat, ink all correct.
- **Typography**: Correct font families, tracking, line-heights, and the 62-72ch body line length is met (at 72ch).
- **Shapes**: `--radius-md: 10px`, `--radius-lg: 18px` match the kit's corner radius spec.
- **Shadows**: Purple-tinted `rgba(30,15,48,*)` throughout — not a single neutral grey shadow.
- **Motion**: `cubic-bezier(0.4, 0, 0.2, 1)` used correctly; `prefers-reduced-motion` fully honored.
- **Voice/copy**: Lyrical, reverent, folk-storyteller. Kit taglines and greetings used verbatim. No avoid_words found.
- **Brand opposites**: No neon, no corporate, no flat/sterile, no grimdark, no high-tech futurism — all clean.
- **Content accuracy**: Every fact from `content.json` appears verbatim. No invented claims.
- **Heading hierarchy**: One H1 per page, semantic landmarks present and correct.
- **Accessibility baseline**: Skip link, focus styles, aria-current, contrast ratios — all pass.

### What Failed
- **`base.css:90-145`** ❌: Google Fonts CDN `@font-face` src URLs — violates new_site.md §1's explicit "previously-fixed regression" rule. Fonts must be self-hosted WOFF2 in `css/fonts/`.
- **`index.html:228`, `clients.html:146`, `download.html:140`, `hub.html:109`, `plugins.html:92`** ❌: `rgba(244,237,216,0.75)` hardcoded inline 5 times instead of using a CSS variable.

### Required Fixes (Score-blocking)
1. Download Cinzel, EB Garamond, Nunito, DM Mono WOFF2 files and serve from `css/fonts/`; replace all CDN URLs in `base.css:90-145`.
2. Add `--color-cta-text: rgba(244, 237, 216, 0.75)` to `:root` in `base.css` and replace the 5 inline style occurrences.

**Without these two fixes the site cannot ship — CDN font dependencies are an explicit regression and inline color values are a token-system violation.**
