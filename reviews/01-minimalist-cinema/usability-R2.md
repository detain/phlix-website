# Usability Review — `01-minimalist-cinema` (Round 2)

**Reviewer:** Dimension Reviewer (Usability)
**Date:** 2026-05-20
**Scope:** All 8 HTML pages in `variants/01-minimalist-cinema/`
**Variant:** 01-minimalist-cinema
**Phase:** Round 2 — Re-audit after Phase I

---

## Score: **78 / 100** *(unchanged from R1)*

---

## ⚠️ Phase I Status: No Changes Detected

All Round 1 failures and concerns remain present. No Phase I fixes were applied to any of the 8 HTML pages, CSS, or JS files. The codebase is byte-identical to Round 1 in every respect relevant to usability.

---

## ✅ Passed Items

| Criterion | Evidence |
|-----------|----------|
| **Visibility of system status** | All 8 pages carry `aria-current="page"` on the active nav link. Mobile nav toggle sets `aria-expanded="true/false"` correctly (main.js:21,34). Skip links on all pages. |
| **Match between system and the real world** | Navigation uses familiar terms: Features, Download, Clients, Plugins, Docs, Hub, About. Body copy explains SyncPlay, DLNA, HLS, transcoding in plain language. No unexplained jargon on marketing pages. |
| **User control and freedom** | Mobile nav closes on link click (main.js:77-82). Escape key closes the mobile menu (main.js:52-57). Focus returns to toggle button when menu closes (main.js:39). Focus trap inside open mobile menu (main.js:59-74). Resize listener closes mobile menu on desktop breakpoint (main.js:86-90). |
| **Consistency and standards** | Identical header/nav/footer structure on all 8 pages. Same ARIA roles (`role="banner"`, `role="navigation"`, `role="contentinfo"`). Same `aria-label` values across all pages. Consistent button hierarchy (`btn-primary`, `btn-secondary`, `btn-small`, `btn-large`). Consistent external-link `rel="noopener noreferrer"` on GitHub CTAs. |
| **Error prevention** | Minimum 44px touch targets on all buttons (components.css:22-23). `:focus-visible` custom focus ring (base.css:155-158). Skip link on every page. Reduced-motion support (base.css:167-176, components.css:618-624). |
| **Recognition rather than recall** | Nav always in same header position. Logo links home. Section headings clearly label content regions. Footer consistently organized into Product / Developers / Project columns. |
| **Flexibility and efficiency of use** | Skip link for keyboard-only users. Full mobile nav focus trap. Touch targets ≥44px. Download page reachable in 1 click from any page via nav or inline CTA. |
| **Aesthetic and minimalist design** | Clean content hierarchy: hero → pitch/features overview → CTA. Feature cards use icon + heading + description pattern. Client cards show status badges (`status-stable`, `status-beta`). Consistent typography scale. |
| **Help users recognize/diagnose/recover from errors** | FAQ accordion uses proper ARIA: `aria-expanded` on buttons, `hidden` attribute on dd elements, only one item open at a time (main.js:125-154). Good accessibility labels on interactive elements. |
| **Help and documentation** | Footer Developer column links to live docs, GitHub source, plugin example, and API reference on every page. Docs page lists 4 external doc sections with direct links. |
| **Primary goal (download) in ≤2 clicks** | **PASS — 1 click from any page.** Home "Get Phlix" button → `download.html` (index.html:94). Home CTA banner → `download.html` (index.html:203). Features page "Download Now" → `download.html` (features.html:179). Clients page "Download Now" → `download.html` (clients.html:154). Download page always in nav. |

---

## ❌ Failures (Still Present After Phase I)

| # | Criterion | Issue | Evidence |
|---|-----------|-------|----------|
| F1 | **Flexibility and efficiency of use** | **No site search.** 8 pages of content, external docs, GitHub repos, and plugin ecosystem — zero search. Users hunting "how to install", "DLNA", "SyncPlay" must manually navigate or browser Ctrl+F. | All pages |
| F2 | **Help and documentation** | **Docs page has no inline documentation.** `docs.html` is an anti-pattern: titled "Docs" but contains no docs — only 4 links to external docs and ecosystem package list. Worse than linking directly to external docs. | `docs.html:75-93` |
| F3 | **Match between system and the real world** | **Mobile beta inaccessible.** "Mobile (iOS + Android)" is "Currently in beta" with no mechanism to join — no TestFlight link, no waitlist, no Google Play beta track. Primary CTA "Get Mobile" links to GitHub repo, not a beta install path. | `clients.html:121-133`, `download.html:100-104` |
| F4 | **Visibility of system status** | **No HTTP security headers.** No Content-Security-Policy, no `X-Frame-Options`, no `X-Content-Type-Options` in any `<head>`. For a media server project, showing security awareness in headers signals maturity. | All pages `<head>` |

---

## ⚠️ Concerns (Non-blocking — Still Present)

| # | Criterion | Issue | Evidence |
|---|-----------|-------|----------|
| C1 | **Help and documentation** | Docs page contains zero inline documentation. User landing on `/docs.html` expecting quick guidance (installation, configuration, troubleshooting) gets an unhelpful wall of external references. | `docs.html:75-93` |
| C2 | **Match between system and the real world** | Hub page refers to "public one at `phlix-hub.example.com`" — a clearly fictional domain. Users cannot verify or try the public Hub offering. | `hub.html:80-81` |
| C3 | **Error prevention / Recognition** | Mobile app marked "beta" with no path to join beta — creates a dead end for interested users. | `clients.html:124`, `download.html:101-104` |
| C4 | **Consistency** | Footer "Documentation" link points to `detain.github.io/phlix-docs` on every page. The `/docs.html` page itself only redirects to that same URL — redundant navigation with no added value. | `docs.html` + all footers |
| C5 | **User control and freedom** | About page FAQ uses `<button type="button">` inside `<dt>`. Answer `<dd>` starts hidden with `hidden` attribute, only visible via JS. If JS fails or is blocked, FAQ answers are completely inaccessible. `<details>/<summary>` would be HTML-native and work without JS. | `about.html:88-111`, `main.js:115-155` |

---

## Nielsen Heuristic Score Breakdown

| Heuristic | Max | Score | Notes |
|-----------|-----|-------|-------|
| Visibility of system status | 10 | 9 | aria-current, aria-expanded, skip links present. No loading/progress states needed. Security headers missing (-1). |
| Match between system and the real world | 10 | 7 | Familiar terms, clear language. Mobile app beta with no access path (-2), Hub example domain (-1). |
| User control and freedom | 10 | 8 | Strong keyboard nav, focus trap, Escape key. No breadcrumbs or undo path (-1), FAQ JS-dependent (-1). |
| Consistency and standards | 10 | 9 | Highly consistent across all 8 pages. Footer's docs link redundant (-1). |
| Error prevention | 10 | 9 | Good touch targets (44px+), focus styles, reduced-motion. No forms so no validation to test. |
| Recognition rather than recall | 10 | 9 | Consistent nav, clear labels, organized footer. No search (-1). |
| Flexibility and efficiency of use | 10 | 6 | Good keyboard nav. No site search (-3), no power-user shortcuts (-1). |
| Aesthetic and minimalist design | 10 | 8 | Clean layout. Cannot fully assess visual impact without live CSS rendering. |
| Help users recognize/diagnose/recover | 10 | 7 | FAQ accordion is good but JS-dependent. No error messages since no forms. |
| Help and documentation | 10 | 5 | Footer links help. Docs page has no inline content (-3), Mobile beta inaccessible (-2). |
| Primary goal in ≤2 clicks | — | PASS | Download reachable in 1 click from all pages. |
| **Total** | **100** | **78** | |

---

## Recommendations (Ranked by Impact)

### 🔴 High Impact
1. **Add site search** — A search input or at minimum a link to `detain.github.io/phlix-docs/search` would close the single largest usability gap. Critical given the breadth of the project.
2. **Fix the Docs page** — Either embed a quick-start guide inline, or remove the page entirely and change the footer "Documentation" link directly to the external docs. The current docs page provides no added value.
3. **Provide a mobile beta access path** — Add a TestFlight/Google Play beta link or waitlist signup. "Beta" with no access mechanism is a dead end.

### 🟡 Medium Impact
4. **Replace FAQ `<button>` in `<dt>` with `<details>/<summary>`** — HTML-native, works without JS, progressive enhancement.
5. **Replace `phlix-hub.example.com` with a real URL** — A fictional domain undermines trust. Either use a real URL or note the public Hub is not yet available.
6. **Add breadcrumbs** — On inner pages like `/features.html`, `/clients.html`, `/download.html`, a breadcrumb (`Home > Features`) would improve wayfinding for users landing directly.

### 🟢 Low Impact
7. **Add `rel="noopener noreferrer"` to site-logo home link** — Minor consistency fix. Logo link has no `rel` while sibling links use proper external link handling.
8. **Consider keyboard shortcuts for power users** — A `?` shortcut to show a shortcuts overlay (common in documentation sites) would serve developers.

---

## Primary Goal Check: Home → Download

| Path | Clicks | Evidence |
|------|--------|----------|
| `index.html` → "Get Phlix" button | 1 | `index.html:94` → `download.html` |
| `index.html` → CTA banner | 1 | `index.html:203` → `download.html` |
| `features.html` → "Download Now" | 1 | `features.html:179` → `download.html` |
| `clients.html` → "Download Now" | 1 | `clients.html:154` → `download.html` |
| `download.html` → nav item | 0 | Already on download page |

**Result: PASS — Download is always reachable in ≤1 click from any page.**

---

## Evidence Summary

| Page | nav items | CTAs | aria-current | Skip link | External links with `rel` |
|------|-----------|------|--------------|------------|---------------------------|
| `index.html` | 8 | 2 (Get Phlix, Read the docs) | Home ✓ | ✓ | GitHub org links in footer ✓ |
| `download.html` | 8 | 4 (client GitHub links) | Download ✓ | ✓ | All GitHub links ✓ |
| `features.html` | 8 | 1 (Download Now) | Features ✓ | ✓ | Footer links ✓ |
| `clients.html` | 8 | 5 (View source per client) | Clients ✓ | ✓ | All GitHub links ✓ |
| `plugins.html` | 8 | 1 (Get the example plugin) | Plugins ✓ | ✓ | GitHub links ✓ |
| `docs.html` | 8 | 4 (doc section links) | Docs ✓ | ✓ | All external ✓ |
| `hub.html` | 8 | 1 (Get started) | Hub ✓ | ✓ | GitHub link ✓ |
| `about.html` | 8 | 0 | About ✓ | ✓ | GitHub org ✓ |

All 8 pages share identical structural markup to the byte level. The single structural variation per page is `aria-current="page"` on the active nav item.

---

## Changes from Round 1

| Item | R1 Status | R2 Status | Delta |
|------|------------|------------|-------|
| F1: No site search | FAIL | FAIL | None |
| F2: Docs page empty | FAIL | FAIL | None |
| F3: Mobile beta inaccessible | FAIL | FAIL | None |
| F4: No security headers | FAIL | FAIL | None |
| C1: Docs page no inline content | Concern | Concern | None |
| C2: Hub fictional domain | Concern | Concern | None |
| C3: Mobile beta no access path | Concern | Concern | None |
| C4: Redundant footer docs link | Concern | Concern | None |
| C5: FAQ JS-dependent | Concern | Concern | None |
| **Overall Score** | **78/100** | **78/100** | **0** |

**No Phase I fixes were applied to the usability issues identified in Round 1.**

---

*Review generated by Dimension Reviewer — Usability (Round 2). Files reviewed: `variants/01-minimalist-cinema/*.html`, `css/base.css`, `css/components.css`, `css/theme.css`, `js/main.js`.*
