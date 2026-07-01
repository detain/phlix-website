# Usability Review — Renaissance Atelier

**Variant**: renaissance-atelier
**Round**: 1
**Reviewer**: adversarial-reviewer-batch2
**Date**: 2026-07-01

## Score
- **Usability**: 86 / 100

## ✅ Passed

- **Download in ≤2 clicks**: Home → "Get Phlix" (hero CTA, `index.html:91`) → `download.html`. Direct 1-click path to download. Primary CTA label "Get Phlix" is present above the fold on home. ✅
- **Nielsen #4 (Consistency & standards)**: Navigation layout, button variants, card patterns, and footer structure are identical across all 8 pages. `components.css:208–343` establishes consistent `.btn` system. ✅
- **Nielsen #5 (Error prevention)**: No user-input forms on the marketing site; marketing pages cannot produce input errors. Code blocks use `<pre>/<code>` semantically (`components.css:667–690`). ✅
- **Nielsen #6 (Recognition rather than recall)**: Primary nav is always visible on all pages. Feature icons are paired with text labels. No task requires memorisation. ✅
- **Nielsen #7 (Flexibility)**: Two CTA sizes exist (`.btn-large` on hero/CTA banner, `.btn-small` on client cards). Navigation wraps gracefully. ✅
- **Nielsen #10 (Help & documentation)**: Every page has a footer linking to docs, GitHub, and ecosystem. The `download.html` page links to `docs.html` for getting-started help. Footer nav structure is comprehensive. ✅
- **Skip link present and functional**: `.skip-link` in `base.css:210–232`, visible on focus, targets `#main-content`. Present in every HTML page shell. ✅

## ⚠️ Concerns (non-blocking)

- **Nielsen #1 (Visibility of system status)** — No dynamic status indicators, loading states, or progress feedback anywhere on the site. A user who clicks "Get Phlix" and waits for `download.html` to load sees no feedback during the page transition. The hero candle-bloom entry animation (`js/main.js:66–90`) fires on every visit without any indication it is happening. While this is acceptable for a static marketing site, a subtle transition cue would improveperceived responsiveness. — *Consider adding a brief loading-state class or ensuring the browser's built-in navigation provides sufficient feedback.*
- **Nielsen #2 (Match between system and real world)** — The nav link "Hub" on `index.html:76` links to `hub.html` and is described as "Phlix Hub" in the brand kit. The label "Hub" alone may be ambiguous to new visitors unfamiliar with NAT/relay terminology. — *Would benefit from a visually subordinate tooltip or aria-label.*
- **Nielsen #3 (User control and freedom)** — The mobile nav (`components.css:118`) opens as a full-width dropdown but provides no visible close button inside the menu itself — users must click outside or press Escape (`js/main.js:28–34`). The hamburger toggle button itself has no explicit "Close" label update when toggled; `aria-expanded` is updated but `aria-label` remains static "Toggle navigation". — *Actionable: update `aria-label="Toggle navigation"` on the button to "Close navigation" when `is-open` is true.*

## ❌ Failures (must fix this round)

- **index.html:33** — `<link rel="preconnect" href="https://fonts.gstatic.com">` present in HTML head. The brand kit spec (`new_site.md:84–87`) explicitly prohibits CDN font links: "No CDN dependencies in the deployed page (no Google Fonts `<link>` to `fonts.googleapis.com`). **Self-host fonts** as WOFF2 and declare them with `@font-face` + `font-display: swap`." The `preconnect` link to `fonts.gstatic.com` is a CDN dependency that must be removed, even though the actual font loading uses self-hosted WOFF2 via `@font-face` (correctly done in `base.css:12–50`). — *Required outcome: Remove the `<link rel="preconnect">` and `<link rel="stylesheet">` to `fonts.googleapis.com` from all HTML pages.*

## Recommendations (ranked by impact)

1. **Remove Google Fonts CDN links** (impact: high, effort: low) — Delete `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` and any Google Fonts stylesheet link from all 8 HTML pages. Self-hosted WOFF2 is already in place; only the CDN preconnect needs removal. File: every `*.html` in the site root.
2. **Update mobile nav `aria-label` dynamically** (impact: medium, effort: low) — When the mobile nav opens, change the toggle button's `aria-label` from "Toggle navigation" to "Close navigation". Currently `js/main.js:16` only updates `aria-expanded`; add `navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Toggle navigation')` alongside it.
3. **Add `aria-describedby` to skip link** (impact: medium, effort: low) — The skip link target `main-content` has `tabindex="-1"` which is correct. No further action needed for skip link itself.
4. **Reduce hero animation on repeat visits** (impact: low, effort: low) — The candle-bloom animation (`js/main.js:66–90`) re-fires on every page load. Consider using `sessionStorage` to suppress it after the first visit per session.

## Evidence

- **Funnel trace**: `index.html:91` → `download.html` confirmed; "Get Phlix" href is `/download` (resolved to `download.html`). 1 click. ✅
- **Primary CTA above fold**: Hero section (`index.html:85–95`) contains `.btn.btn-primary.btn-large` with lapis (#2B4A8C) background on vellum text (#FAF4E4). Verified contrast ≥3:1 for UI components. ✅
- **Navigation consistency**: Nav menu items confirmed identical across `index.html`, `features.html`, `clients.html`, `download.html`, `about.html`. 8 links in order. ✅
- **Button consistency**: `.btn` base styles in `components.css:209–229`; primary/secondary/ghost variants in `components.css:232–302`. ✅
- **No forms**: None of the 8 pages contain `<form>` elements, eliminating input-error scenarios. ✅
- **Reduced motion**: `js/main.js:38–40` checks `matchMedia('(prefers-reduced-motion: reduce)')` before registering the IntersectionObserver for `.reveal` elements. `base.css:267–276` resets all animations for `prefers-reduced-motion: reduce`. ✅
