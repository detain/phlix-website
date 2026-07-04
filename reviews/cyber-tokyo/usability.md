# Usability Review — Cyber Tokyo

**Variant**: cyber-tokyo
**Round**: 1
**Reviewer**: Senior Front-End Code Reviewer
**Date**: 2026-07-01

## Score

- **Usability**: 85 / 100

## ✅ Passed

- **Visibility of system status**: Navigation highlights the current page via `aria-current="page"` on all 8 pages, and the active state uses a visible 2px pink underline with neon glow. Hover states on feature cards and client cards provide immediate visual feedback with border color change + subtle lift + glow.
- **Match between system and real world**: Product terminology (SyncPlay, DLNA, Hub, DVR) is used consistently across all pages. The "ecosystem" metaphor for the download page mirrors the actual project structure.
- **User control and freedom**: Mobile nav can be closed via the toggle button, outside click, or Escape key (`main.js:28–34`). Navigation is always reachable.
- **Consistency and standards**: All pages share the same shell, same header/nav structure, same footer, same CSS. Buttons use consistent `.btn`, `.btn-primary`, `.btn-secondary` across all pages.
- **Error prevention**: Download page uses `btn-secondary` (not `btn-primary`) for Mobile beta client card — appropriate de-emphasis for beta status. Clients page correctly omits "View source" button for DLNA (which has no `repo` in `content.json`).
- **Recognition rather than recall**: Feature cards use icons + titles + body text — users can scan and recognize features rather than memorizing navigation.
- **Flexibility and efficiency**: The site is intentionally simple — no nested menus, no multi-step flows. Power users can reach any page in 1 click from nav.
- **Aesthetic and minimalist design**: High contrast, clear hierarchy, no visual clutter. Density is controlled — one concept per section.
- **Help and documentation**: Every page ends in a CTA banner. Download page links to docs. Docs page links to all external documentation.
- **Primary goal (download) reachable in ≤2 clicks from home**: Home → "Get Phlix" button → download.html. Exactly 1 click. ✓

## ⚠️ Concerns (non-blocking)

- **No loading/progress indicators for client-side transitions**: The scroll-reveal animation in `main.js` has no visible loading state if JS fails or is slow. Since the content is static HTML, this is acceptable but worth noting. — Non-blocking.
- **`hub.html:85` CTA "Get started" links to download rather than hub documentation**: On the Hub page, the logical next action for a user interested in Hub would be either to download the server with Hub mode or to read hub-specific docs. "Get started → download.html" is technically correct but a slight mismatch. — Consider linking to the docs hub-admin guide instead, or changing CTA text to "Download Phlix" for consistency with other pages.
- **Footer License link points to `phlix-website/blob/master/LICENSE`**: The license link on all pages (`about.html:143`, footer) goes to the website repo license, not the server license. While BSD-3 is the same, the more accurate link would be `https://github.com/detain/phlix-server/blob/master/LICENSE`. — Low severity since the content is identical (BSD-3); noted for accuracy.

## ❌ Failures (must fix this round)

- **`<nav aria-label="Primary navigation">` is missing a wrapping `<nav>` element**: The `nav-primary` div/section has `aria-label` but is a `<div>` not a `<nav>` element in the HTML. The landmark semantics are conveyed via `role="banner"` on `<header>` and the `aria-label` on the `<ul>` — but a `<nav>` element should wrap the `<ul class="nav-menu">` for proper landmark semantics. — Wrap the `<ul class="nav-menu">... </ul>` in `<nav class="nav-links" aria-label="Primary navigation">` on all 8 pages.

## Recommendations (ranked by impact/effort)

1. **Wrap nav-menu `<ul>` in `<nav>` element** (impact: medium, effort: low) — One structural change per page. Proper landmark semantics. Files: all 8 HTML pages.
2. **Change Hub page CTA "Get started" to "Download Phlix" or link to hub-admin docs** (impact: low, effort: low) — File: `hub.html:85`.
3. **Update footer License link to point to phlix-server LICENSE** (impact: low, effort: low) — Files: all HTML pages / footer template.

## Evidence

- `grep -c "download.html" /home/sites/phlix/phlix-website/sites/cyber-tokyo/index.html` — "Get Phlix" button on home links directly to download.
- `wc -l /home/sites/phlix/phlix-website/sites/cyber-tokyo/js/main.js` — 80 lines, all vanilla, no dependencies.
- Nielsen heuristics confirmed: no modal traps, no infinite scrolls, no deep nested menus.
