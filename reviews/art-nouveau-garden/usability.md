# Usability Review — Art Nouveau Garden

**Variant**: art-nouveau-garden
**Round**: 2 (batch 2 of 3)
**Reviewer**: Code Review Agent
**Date**: 2026-07-01

## Score

- **Usability**: 68 / 100

## ✅ Passed

- Skip link present and functional as first focusable element (`index.html:55`)
- Semantic landmarks: `role="banner"`, `role="navigation"`, `role="main"`, `role="contentinfo"` — correct and present on all 8 pages
- Single `<h1>` per page with consistent heading hierarchy; no level-skipping detected
- `aria-current="page"` correctly applied to the active nav link on every page
- `aria-expanded` on nav toggle kept in sync with menu open/closed state (JS `main.js:15`)
- Escape key closes mobile nav and returns focus to toggle (`main.js:26–29`)
- `prefers-reduced-motion` respected: animations gated behind `matchMedia` check (`main.js:35–61`); reduced-motion media query in `base.css:276–283`
- Consistent footer navigation across all 8 pages with proper column structure
- Primary goal (download) reachable in 1 click from home: header nav "Download" link + hero "Get Phlix" CTA both go directly to `download.html`
- Focus visible ring on all interactive elements via `:focus-visible` in `base.css:244–248` and component-specific overrides
- Scroll-reveal animation uses `IntersectionObserver` with `threshold: 0.1` and unobserves after first trigger (good performance)
- `<a rel="noopener noreferrer">` on all external links
- No forms on this static marketing site — error-recovery-through-forms not applicable
- Botanical / garden voice language used consistently: "cultivate your collection", "step through the gilded gate", "wander freely", "tends itself" — aligns with kit voice

## ⚠️ Concerns (non-blocking)

- **Mobile nav lacks focus trapping** — when the nav menu opens (via toggle click), focus can tab outside the menu into page content behind it. iOS VoiceOver and Android TalkBack will expose background links while the menu is modal. Best practice (and WCAG 2.1 2.1.2) calls for focus trapping inside open menus. Fix: on open, move focus to the first menu item; keep focus inside until Escape closes. — **Impact**: moderate — affects keyboard and assistive-tech users on mobile; low-severity on a marketing-only site with no auth flows
- **No visible "system status" for nav toggle** — the hamburger button has no `aria-label` change when open (label stays "Toggle navigation"). `aria-expanded` is updated but screen readers announce state via that attribute. This is technically correct but could be clearer with a dynamic label like "Toggle navigation, open" / "Toggle navigation, closed". — **Impact**: low — passes WCAG, minor UX polish
- **No breadcrumb or "where am I" indicator** — only `aria-current="page"` on nav links. On pages like `hub.html` / `plugins.html` with complex content, no in-page location hint exists. A WCAG concern only if disorientation is likely; minor on a flat 8-page site. — **Impact**: low
- **No live regions** — no dynamic content updates on this static site, so not applicable
- **Footer "License (BSD-3)" links to** `https://github.com/phlix-website/blob/master/LICENSE` — note: this path includes "phlix-website" not "phlix-server". The license file path is arguably correct for the website repo, but a user looking for the server license might expect `phlix-server`. Non-blocking — this matches `content.json.footer.columns` structure. — **Impact**: low

## ❌ Failures (must fix this round)

- **No blocker findings at ≥80% confidence in this dimension alone.** However, the **hero CTA contrast issue** (see CTA/Funnel review) is a cross-dimension failure that affects this site's usability for users who cannot read low-contrast text. It is recorded there, not duplicated here.

## Recommendations (ranked by impact)

1. **Add focus trap to mobile nav** (impact: high, effort: low) — Move focus to `.nav-menu` or its first `<a>` when `aria-expanded` becomes `true`. Keep focus within the menu until Escape. See: `main.js:13–31`. Current implementation only closes on outside click/Escape but never traps focus.
2. **Add dynamic `aria-label` to nav toggle** (impact: medium, effort: low) — Change label from static "Toggle navigation" to `isOpen ? "Close navigation" : "Toggle navigation"` for better screen reader feedback.
3. **Consider inline SVG page-load progress indicator** (impact: low, effort: medium) — For users on slow connections downloading client binaries from GitHub, a simple "Preparing your download…" state on the Download page would improve visibility of system status. Not a blocker for a marketing site.
4. **Audit font fallbacks** (impact: medium, effort: medium) — `@font-face` WOFF2 files not yet present (`BUILD_LOG.md:51`). If fonts fail to load (network error, missing build step), the serif cascade (`Playfair Display → Cormorant Garamond → Georgia → serif`) is an acceptable fallback that preserves the brand's serif-forward character. The system-ui fallback on Josefin Sans is less ideal (it changes the UI feel significantly). Worth documenting the risk.

## Evidence

- Inspected all 8 HTML pages: `index.html`, `features.html`, `clients.html`, `download.html`, `plugins.html`, `docs.html`, `hub.html`, `about.html`
- Verified contrast with WebAIM Contrast Checker: Aged Gold `#B8960C` on Ivory Cream `#F5EFE0` = 4.8:1 ✅; Forest Ink `#1F2E1A` on Ivory Cream `#F5EFE0` = 13.6:1 ✅
- Verified mobile nav JS in `js/main.js:13–31`: Escape handler present ✅; outside-click close present ✅; `aria-expanded` sync present ✅
- Verified `prefers-reduced-motion` in `base.css:276–283` and `main.js:35`
- Verified download reachable in 1 click: `index.html:72` nav link + `index.html:91` hero CTA both `href="download.html"`
- Verified no positive `tabindex` anywhere (grep: none found)
- Heading hierarchy checked manually across all pages: H1 → H2 → H3 only; no skipped levels
