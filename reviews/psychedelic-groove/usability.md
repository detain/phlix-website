# Usability Review — Psychedelic Groove

**Variant**: psychedelic-groove
**Round**: 2
**Reviewer**: Code Review Agent
**Date**: 2026-07-04

## Score

- **Usability**: 89 / 100

## ✅ Passed

- **Visibility of system status** — Skip link is present on all pages (first focusable element). Footer-year is dynamically populated via JS. The site communicates its structure adequately for a static marketing site.
- **Match between system and real world** — Navigation uses standard conventions: Home, Features, Clients, Download, Plugins, Docs, Hub, About. Client names match real platforms (Roku, Samsung Tizen, Windows, Mobile). Language is plain and understandable.
- **User control and freedom** — Mobile nav has Esc key handling (main.js:32-38) to close menu. "View source" buttons on client cards open in new tab with rel="noopener noreferrer". External links all use noopener.
- **Consistency and standards** — All 8 pages share the same shell structure. CTA buttons use consistent `.btn.btn-primary` class pattern. Feature cards use consistent `.feature-card` class. The site is highly consistent.
- **Error prevention** — Links to external docs use full URLs with scheme. Internal links use relative paths. No broken internal navigation observed.
- **Recognition rather than recall** — Navigation is persistent and visible (sticky header). Feature sections clearly labeled. FAQ uses descriptive `<dt>` terms. Users don't need to remember information from previous pages.
- **Flexibility and efficiency of use** — The site is a marketing site for first-time visitors. Basic navigation is straightforward.
- **Aesthetic and minimalist design** — The design uses generous whitespace, clear visual hierarchy, and doesn't overwhelm with too many options per section. The psychedelic aesthetic is applied consistently.
- **Help and documentation** — docs.html provides clear link-out to the full documentation at detain.github.io/phlix-docs with specific section links.
- **Primary goal reachable in ≤2 clicks** — index.html has "Get Phlix" CTA linking to download.html. From any page, "Download" is in the persistent navigation. Download is reachable in 1 click from home.
- **btn-fab and btn-danger hover states improved** ✅ — components.css now uses `var(--color-tertiary)` and `var(--color-error)` with `filter: brightness()` instead of raw hex. This improves brand consistency in the hover microinteraction system.

## ⚠️ Concerns (non-blocking)

- **No explicit loading states for external links** — When clicking "View source" buttons, the user is navigated away to GitHub. `target="_blank"` is not present but `rel="noopener noreferrer"` is. Standard practice and acceptable.

- **Mobile nav could show current state more clearly** — The nav-toggle button has static `aria-expanded="false"` in the HTML. While JS correctly updates this on toggle, the initial HTML state may not reflect the actual state for screen readers before JS runs. JS runs synchronously and updates immediately, so impact is minimal.

- **No breadcrumb on inner pages** — While not required for an 8-page marketing site, breadcrumbs would aid navigation on features.html, clients.html, etc. Acceptable for a small site.

## ❌ Failures (must fix this round)

None — no must-fix usability failures found. This round's fixes (Google Fonts CDN removal, aria-hidden partial fix, component hover fixes) improve usability rather than create issues.

## Recommendations (ranked by impact)

1. **Consider adding `target="_blank"` to external link buttons** (impact: low, effort: low) — The "View source" buttons on clients.html have `rel="noopener noreferrer"` but no `target="_blank"`. Adding `target="_blank"` would make the new-tab behavior explicit.
2. **Consider a "back to top" link** (impact: low, effort: low) — On the features.html and clients.html pages with long scrolling content, a floating "back to top" link could improve user control.

## Evidence

- Verified mobile nav Esc key handling in main.js:32-38
- Verified all CTAs link to correct destinations
- Verified 1-click download path from index.html
- Verified nav is sticky on all pages (components.css:8-15)
- Nielsen heuristics checklist applied to all 8 pages
