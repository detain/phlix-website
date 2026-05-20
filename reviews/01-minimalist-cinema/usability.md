# Usability Review — `01-minimalist-cinema`

**Reviewer:** Dimension Reviewer (Usability)
**Date:** 2026-05-20
**Scope:** All 8 HTML pages in `variants/01-minimalist-cinema/`
**Variant:** 01-minimalist-cinema

---

## Score: **78 / 100**

---

## ✅ Passed Items

| Criterion | Evidence |
|-----------|----------|
| **Visibility of system status** | All 8 pages carry `aria-current="page"` on the active nav link. The mobile nav toggle sets `aria-expanded="true/false"` correctly (JS main.js:21,34). Skip links present on all pages (`<a class="skip-link" href="#main-content">`). |
| **Match between system and the real world** | Navigation uses familiar terms: Features, Download, Clients, Plugins, Docs, Hub, About. Body copy explains SyncPlay, DLNA, HLS, transcoding in plain language. No unexplained jargon on marketing pages. |
| **User control and freedom** | Mobile nav closes on link click (JS main.js:77-82). Escape key closes the mobile menu (JS main.js:52-57). Focus returns to the toggle button when menu closes (JS main.js:39). Focus trap inside open mobile menu (JS main.js:59-74). Resize listener closes mobile menu on desktop breakpoint (JS main.js:86-90). |
| **Consistency and standards** | Identical header/nav/footer structure on all 8 pages. Same ARIA roles (`role="banner"`, `role="navigation"`, `role="contentinfo"`). Same `aria-label` values across all pages. Consistent button hierarchy (`btn-primary`, `btn-secondary`, `btn-small`, `btn-large`). Consistent external-link `rel="noopener noreferrer"` on GitHub CTAs on download, plugins, clients, hub pages. |
| **Error prevention** | Minimum 44px touch targets on all buttons (components.css:22-23). `:focus-visible` custom focus ring (base.css:155-158). Skip link on every page. Reduced-motion support (base.css:167-176, components.css:618-624). |
| **Recognition rather than recall** | Nav always in the same position (header). Logo links home. Section headings (`<h1>`, `<h2>`) clearly label every content region. Footer consistently organized into Product / Developers / Project columns. |
| **Flexibility and efficiency of use** | Skip link for keyboard-only users. Full mobile nav focus trap. Touch targets ≥44px. External links marked with `rel="noopener noreferrer"`. Download page is reachable in 1 click from any page via nav or inline CTA. |
| **Aesthetic and minimalist design** | Clean content hierarchy with a clear reading flow: hero → pitch/features overview → CTA. Feature cards on home and features page use a grid with icon + heading + description pattern. Client cards show status badges (`status-stable`, `status-beta`). Consistent typography scale (--font-headline, --font-body, --font-ui, --font-code). |
| **Help users recognize/diagnose/recover from errors** | FAQ accordion on About page uses proper ARIA: `aria-expanded` on buttons, `hidden` attribute on dd elements, only one item open at a time (JS main.js:125-154). Good accessibility labels on interactive elements. |
| **Help and documentation** | Footer Developer column links to live docs, GitHub source, plugin example, and API reference on every page. Docs page (`docs.html`) lists 4 external doc sections with direct links. |
| **Primary goal (download) in ≤2 clicks** | **PASS — 1 click from any page.** Home has "Get Phlix" button → `download.html` (line 76). Home CTA banner → `download.html` (line 185). Features page "Download Now" → `download.html` (line 178). Clients page "Download Now" → `download.html` (line 153). Download page nav item always visible. |

---

## ⚠️ Concerns (Non-blocking)

| # | Criterion | Issue | Location |
|---|-----------|-------|----------|
| C1 | **Help and documentation** | The `docs.html` page contains **zero inline documentation** — it is entirely a list of external links to `detain.github.io/phlix-docs`. A user who lands on the docs page expecting quick guidance (installation steps, configuration, troubleshooting) gets an unhelpful wall of external references. | `docs.html:75-93` |
| C2 | **Match between system and the real world** | The Hub page refers to a "public one at `phlix-hub.example.com`" (line 80) — a clearly fictional domain. Users cannot verify or try the public Hub offering. | `hub.html:80` |
| C3 | **Error prevention / Recognition** | Mobile app (Clients and Download pages) is marked **"Currently in beta"** with no path to join the beta — no TestFlight link, no waitlist, no Google Play beta track. This leaves users wanting mobile access with no actionable next step. | `clients.html:124`, `download.html:101-104` |
| C4 | **Consistency** | Footer Developers column links to `https://detain.github.io/phlix-docs` as "Documentation" on every page — but the site also has a dedicated `/docs.html` page that just redirects to that same URL. Redundant navigation pattern with no added value. | `docs.html` + all footers |
| C5 | **User control and freedom** | The About page FAQ uses a `<button>` inside a `<dt>` element. The answer content (`<dd>`) starts **hidden with `hidden` attribute** and only becomes visible via JavaScript. If JS fails or is blocked, the FAQ answers are completely inaccessible. A `<details>/<summary>` element would be HTML-native and work without JS. | `about.html:88-111`, JS `main.js:115-155` |

---

## ❌ Failures (Must Fix)

| # | Criterion | Issue | Location |
|---|-----------|-------|----------|
| F1 | **Flexibility and efficiency of use** | **No site search.** A project with 8 pages of content, external docs, multiple GitHub repos, and plugin ecosystem has zero search capability. Users hunting for a specific topic (e.g., "how to install", "DLNA", "SyncPlay") must manually navigate or use browser Ctrl+F. A simple search input (even just a link to a docs search) would dramatically improve this. | All pages |
| F2 | **Help and documentation** | **Docs page has no inline documentation.** The `docs.html` page is an anti-pattern: a page titled "Docs" that contains no documentation — only 4 links to external docs and a list of ecosystem packages. A user looking for quick guidance (installation, setup, configuration) gets no value from this page. It offers a worse experience than simply linking to the external docs directly. | `docs.html:75-93` |
| F3 | **Match between system and the real world** | **Mobile client is inaccessible.** The "Mobile (iOS + Android)" client is described as "Currently in beta" but provides no mechanism to join or access the beta. Users on Download page and Clients page are told the app exists but cannot get it. This is a broken promise — the primary CTA "Get Mobile" links to a GitHub repo, not an actual beta install path. | `clients.html:121-133`, `download.html:100-104` |
| F4 | **Visibility of system status** | **No HTTP security headers note.** No Content Security Policy, no `X-Frame-Options`, no `X-Content-Type-Options` in the `<head>`. For a media server project, security is a core concern. While this is a marketing site (not the server itself), showing security awareness in the site headers signals maturity. | All pages `<head>` sections |

---

## Score Breakdown

| Heuristic | Max | Score | Notes |
|----------|-----|-------|-------|
| Visibility of system status | 10 | 9 | aria-current, aria-expanded, skip links all present. No loading/progress states needed. |
| Match between system and the real world | 10 | 7 | Familiar terms, clear language. Mobile app beta with no access path (-2), Hub example domain (-1). |
| User control and freedom | 10 | 8 | Strong keyboard nav, focus trap, Escape key. No breadcrumbs, no undo path (-1), FAQ needs JS (-1). |
| Consistency and standards | 10 | 9 | Highly consistent across all 8 pages. Footer's docs link is redundant (-1). |
| Error prevention | 10 | 9 | Good touch targets, focus styles, reduced-motion. No form validation since no forms. |
| Recognition rather than recall | 10 | 9 | Consistent nav, clear labels. No search (-1). |
| Flexibility and efficiency of use | 10 | 6 | Good keyboard nav. No site search (-3), no power-user shortcuts (-1). |
| Aesthetic and minimalist design | 10 | 8 | Clean layout. Cannot fully assess visual impact without live CSS rendering. |
| Help users recognize/diagnose/recover | 10 | 7 | FAQ accordion is good but JS-dependent. No error messages anywhere since no forms. |
| Help and documentation | 10 | 5 | Footer links help. Docs page has no inline content (-3), Mobile beta inaccessible (-2). |
| Primary goal in ≤2 clicks | — | PASS | Download reachable in 1 click from all pages. |
| **Total** | **100** | **78** | |

---

## Recommendations (Ranked by Impact)

### 🔴 High Impact
1. **Add site search** — A search input or at minimum a prominent link to the docs site search (`detain.github.io/phlix-docs/search`) would address the single largest usability gap. This is especially important given the breadth of the project (server, clients, plugins, hub, docs ecosystem).
2. **Fix the Docs page** — Either embed a quick-start guide inline (recommended), or remove the page entirely and change the footer "Documentation" link to point directly to the external docs. The current docs page provides no value and wastes a navigation slot.
3. **Provide a mobile beta access path** — Add a TestFlight/Google Play beta link, or a waitlist signup, for the mobile app. The current "beta" label with no access mechanism is a dead end for interested users.

### 🟡 Medium Impact
4. **Replace FAQ `<button>` in `<dt>` with `<details>/<summary>`** — This would make the FAQ fully accessible without JavaScript dependency. Progressive enhancement: works without JS, enhanced with JS animation.
5. **Replace `phlix-hub.example.com` with a real URL** — Either a real public Hub URL or a note that the public Hub is not yet available. A fictional domain undermines trust.
6. **Add breadcrumbs** — On pages like `/features.html`, `/clients.html`, `/download.html`, a breadcrumb (`Home > Features`) would improve wayfinding, especially for users landing directly on inner pages.

### 🟢 Low Impact
7. **Add a `rel="noopener noreferrer"` to the site-logo home link** — Minor, but the logo link has no `rel` attribute while child links on the same page (e.g., in the hero CTA) use proper external link handling.
8. **Consider adding keyboard shortcuts for power users** — A `?` shortcut to show a shortcuts overlay (common in documentation sites) would serve developers browsing this site.

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

All 8 pages share identical structural markup. Navigation is consistent to the byte level. The single structural variation is `aria-current="page"` on the active item per page.

---

*Review generated by Dimension Reviewer — Usability. Files reviewed: `variants/01-minimalist-cinema/*.html`, `css/base.css`, `css/components.css`, `css/theme.css`, `js/main.js`.*
