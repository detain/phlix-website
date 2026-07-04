# Usability Review — Cosmic Horror

**Variant**: cosmic-horror
**Round**: 1 (adversarial)
**Reviewer**: adversarial-code-reviewer
**Date**: 2026-07-04

## Score

- **Usability**: 89 / 100

## ✅ Passed

- **Visibility of system status**: Active nav link has `aria-current="page"` and underline animation — user always knows where they are
- **Match between system and real world**: Navigation order (Home → Features → Clients → Download → Plugins → Docs → Hub → About) matches mental model of a media server product; terminology (SyncPlay, DLNA, Hub) is accurate to the product
- **User control and freedom**: Skip link present at top of DOM (`index.html:70`); mobile nav closes on outside click (`main.js:78-81`) and Escape key (`main.js:58-62`); focus returns to toggle on close (`main.js:43-46`)
- **Consistency and standards**: All pages share the same shell structure; all CTAs use `.btn.btn-primary` / `.btn.btn-secondary` classes; feature cards consistent across index and features pages
- **Error prevention**: No forms with submit on this site (static marketing); no obvious error states that can be triggered by normal navigation
- **Recognition rather than recall**: Icon + text labels on nav links; feature cards have icon + title + description — all discoverable by sight
- **Flexibility and efficiency of use**: Download reachable in 1 click from any page via nav or 1 click from hero CTA; no unnecessary steps
- **Aesthetic and minimalist design**: Dark void aesthetic is intentional per brand kit; no unnecessary decoration; dense but organized information architecture
- **Help and documentation**: "Read the docs" secondary CTA on every page; docs.html links to all four doc categories; ecosystem list links to source repos
- **Primary goal reachable in ≤2 clicks**: Home → "Get Phlix" (hero CTA) → download.html (1 click). From any page → nav Download link (1 click). ✓

## ⚠️ Concerns (non-blocking)

- **Mobile nav focus management** — when opening the mobile menu via toggle, focus moves to `focusGuard` span (`main.js:29`). The guard is `position:fixed;opacity:0;pointer-events:none` so it is technically focusable but invisible. This is a known focus-trap pattern for modals. However for a nav menu that is visually open and contextually clear, this may confuse screen readers if focus lands on an invisible element. The menu items themselves are the better focus target. — *impact: medium, effort: medium*
- **No visible loading state** — for pages that load slowly (e.g. fonts loading via woff2), there is no loading indicator. Since fonts use `font-display: swap` this is handled gracefully by the browser fallback. — *impact: low*

## ❌ Failures (must fix this round)

None — no blocking issues in this dimension. The mobile nav focus management is a concern but not a hard failure under Nielsen heuristics.

## Recommendations (ranked by impact)

1. Move focus to first nav menu item instead of `focusGuard` span on mobile menu open (impact: medium, effort: medium) — this would provide a better screen reader experience and keep focus within visible content
2. Consider adding a `role="dialog"` and `aria-label` to the mobile nav when open to clarify its purpose to assistive technology (impact: medium, effort: medium)

## Evidence

- `index.html:70` — skip link is first focusable element
- `index.html:122` — primary CTA "Get Phlix" → download.html (1 click from hero)
- `main.js:20-31` — openMenu sets aria-expanded, creates focus guard
- `main.js:58-62` — Escape key closes menu and returns focus to toggle
- `main.js:78-81` — outside click closes menu
- `index.html:94-105` — 8 nav links in correct order with aria-current on active page
- `components.css:125-178` — mobile nav with 48px touch targets
