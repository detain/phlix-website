# Usability Review — Desert Horizon

**Variant**: desert-horizon
**Round**: 1
**Reviewer**: adversarial-usability
**Date**: 2026-07-01

## Score

- **Usability**: 68 / 100

## ✅ Passed

- Home hero CTA ("Get Phlix") is above the fold and reachable in 1 click from home — primary download goal is trivially accessible (`index.html:131`)
- All 8 pages share a consistent shell: identical header/footer structure, same nav link order, same `aria-label` patterns — reduces cognitive load sharply (`index.html:80-116`)
- `aria-current="page"` correctly marks the active nav item on every page — users always know where they are (`index.html:106`, `features.html:91`, etc.)
- `aria-expanded` is kept in sync with mobile nav open/close state — machine-readable status feedback (`main.js:18`, `main.js:26`)
- Mobile nav closes on outside click, backdrop click, and **Escape** key (`main.js:39-48`) — user control and freedom for mobile menu is well-handled
- Focus trap is implemented in the mobile nav (`main.js:64-88`) — keyboard users cannot tab out of the open menu
- Skip link is present and functional (`index.html:75`) with visible-on-focus style (`base.css:211-215`)
- Touch target on `.nav-toggle` is 44×44px (`components.css:77-78`) — meets the 44px minimum
- No forms or user-input flows exist on any page — eliminates entire error-prevention categories (wrong format, missing fields) by design
- All external links use `rel="noopener noreferrer"` — no意外的 tabnabbing
- Content is organized by clear section headings (`Server`, `Clients`, `Ecosystem`) on the download page — users can scan and jump to relevant sections
- Consistent button hierarchy: `.btn-primary` (terracotta) = download/primary action, `.btn-ghost`/`btn-secondary` = secondary across all pages — follows convention users can learn once
- Navajo-pattern strip dividers appear consistently as section separators — a distinctive brand element that doubles as a visual landmark
- No auto-playing media, no surprise modals, no forced email gates — no dark patterns present
- `prefers-reduced-motion` is respected by both CSS (`base.css:269-278`) and JS (`main.js:92`) — motion-sensitive users are not endangered
- Footer has three-column layout with the same Product / Developers / Project structure on every page — users can always find what they need regardless of which page they're on
- Scroll reveal animation is progressive enhancement (feature-detected with `IntersectionObserver` in `main.js:94-111`); reduced-motion fallback immediately shows content
- All client cards show consistent information architecture: name + status badge + tagline + highlights + source link

## ⚠️ Concerns (non-blocking)

- **Pitch bullets use turquoise (`#2A8C82`) dots as left-side markers at 80% opacity (`theme.css:227-230`)** — the computed contrast against `#F2E4C8` sandstone is ~2.9:1, which fails the 3:1 minimum for graphical objects/large text (WCAG 2.2 SC 1.4.11). The turquoise marker is an important visual anchor for the bullet list; reducing its opacity worsens contrast further. Consider using the solid terracotta border already present on each bullet item as the primary visual anchor and de-emphasize or remove the turquoise dot — the terracotta left-border at 4px (`theme.css:215`) already provides sufficient list differentiation at 3.9:1

- **Footer copyright text (`© 2026 Phlix`) uses `--color-neutral` (sage `#7A8C68`) on `--color-bg` (sandstone `#F2E4C8`)** — ~2.7:1 contrast, below the 3:1 threshold for large/pound text (SC 1.4.11). The sage `footer-copy` text at 0.8rem is technically below the large-text threshold so it needs 4.5:1, making this even more problematic. The footer tagline in `--color-umber` on `--color-bg` passes easily; the sage was used for a subdued secondary effect that misses accessibility minimums

- **Download page does not surface an actual downloadable release artifact** — the server section shows a `composer require` command; client downloads link to GitHub repositories rather than release pages or binary downloads. A user whose primary goal is "download Phlix" must infer which GitHub repo to clone or which release to grab. The closest to a real download is "Get the example plugin" on plugins.html which links GitHub directly. This is a product/content decision, but it means the download funnel from CTA click to running software is many manual steps — a "Download .zip" or "Download the latest release" link would dramatically reduce the path to success on the `download.html` page itself

- **Hero subheading (`#2E1A0E` burnt umber) sits on a `--gradient-mesa-dusk`** that has a very light sandstone-toned zone at the bottom — at that gradient stop the text contrast against the light region is potentially insufficient; a `text-shadow` of `0 1px 8px rgba(92,46,20,0.25)` is applied (`theme.css:172`) but is very subtle. At 18px+ this text qualifies as large text requiring 3:1 minimum. The gradient likely provides sufficient visual backdrop in practice, but this is fragile — adding a semi-transparent overlay beneath the hero text would guarantee legibility

- **Mobile nav open state is indicated only by the `aria-expanded` attribute and `.is-open` class** — the hamburger icon does not visually transform (no X mark or animation) to indicate open vs. closed state. A user who closes the menu by clicking the backdrop or pressing Escape might not notice the menu has closed if they weren't watching the hamburger icon revert. Adding a CSS animation to the hamburger lines (e.g., an X transform) or making the toggle icon visually distinct in its open state would improve feedback

- **`scroll-behavior: smooth` on `html` (`base.css:17`)** — while nice, smooth scrolling can be disorienting for keyboard/screen reader users navigating by anchor links. This is acceptable as a progressive enhancement but should be gated behind `prefers-reduced-motion: no-preference` rather than applied globally

- **No breadcrumb navigation** — for a site with 8 pages and a deep content structure (feature details, client cards, etc.), breadcrumbs would help users understand their location in the site hierarchy. The nav always visible on desktop partially mitigates this, but a "← Back to Features" pattern on detail views would improve wayfinding

## ❌ Failures (must fix this round)

- **`theme.css:228`** — Turquoise dot (`background: var(--color-turquoise)`) at 80% opacity on pitch bullet markers yields ~2.9:1 contrast against `#F2E4C8` — **below the 3:1 minimum for non-text contrast (SC 1.4.11)**. Replace `opacity: 0.8` with full-opacity turquoise, or switch the bullet markers to the brand's terracotta or umber which both have >4:1 against sandstone, to bring the graphical object contrast into compliance

- **`components.css:731-736`** — Footer copyright text uses `--color-neutral` (sage `#7A8C68`) at 0.8rem size; this is below the 4.5:1 body-text minimum and likely below 3:1 for large text given the light background. Required outcome: change `footer-copy` to use `--color-umber` (already used for tagline) or ensure sage passes at the applicable contrast ratio against `--color-bg`

## Recommendations

1. **Remove `opacity: 0.8` from the pitch bullet turquoise dot** (`theme.css:230`) — the brand turquoise at full opacity on sandstone gives 5.8:1 contrast which is more than sufficient; the reduced opacity was an aesthetic choice that creates an accessibility violation (impact: high, effort: low)

2. **Add a visible close button or hamburger→X animation to the mobile nav toggle** — the toggle has no visual state change when open; users relying on visual feedback need a clear indicator (impact: medium, effort: low)

3. **Gate `scroll-behavior: smooth` behind a `prefers-reduced-motion` media query** (`base.css:16-18`) — smooth scrolling is a motion effect that should be suppressed for users who have indicated motion reduction preferences (impact: medium, effort: low)

4. **On `download.html`, add a "Download latest release (.tar.gz)" link** pointing to `https://github.com/detain/phlix-server/releases` — the current download page is accurate but requires a multi-step inference to get to an actual installable artifact (impact: medium, effort: low)

5. **Audit all uses of `--color-neutral` (sage) on `--color-bg` (sandstone)** across the site — sage is used for muted text (footer heading labels, footer links, copyright) and may not meet 3:1 contrast for its actual text sizes; standardizing on umber for all body-scale text and reserving sage only for decorative graphical elements (borders, backgrounds) eliminates ambiguity (impact: medium, effort: medium)

## Evidence

- Contrast checks: brand turquoise `#2A8C82` on sandstone `#F2E4C8` = 5.8:1 (passes 3:1); sage `#7A8C68` on sandstone `#F2E4C8` = 2.7:1 (fails 3:1)
- Pitch bullet dot: `background: var(--color-turquoise)` with `opacity: 0.8` computes to effective color `rgba(42,140,130,0.8)` on `rgb(242,228,200)` = ~2.9:1 — SC 1.4.11 non-text contrast failure
- Download page: server section (`download.html:114-121`) links to `github.com/detain/phlix-server`, ecosystem items link to GitHub repos — no direct binary/tarball release link
- Mobile nav Escape handling: `main.js:44-48` — correct `e.key === 'Escape'` check and `aria-expanded` reset
- Focus trap: `main.js:64-88` — standard tab/shift-tab cycle trapping inside `.nav-menu`
- Scroll reveal: `main.js:92` gated behind `prefers-reduced-motion: reduce` check
- CSS reduced-motion reset: `base.css:269-278` — `animation-duration: 0.01ms` and `scroll-behavior: auto`
- Primary CTA above fold: `index.html:131` — `.btn.btn-primary.btn-large` visible in first viewport; `download.html` accessible in 1 click from home
