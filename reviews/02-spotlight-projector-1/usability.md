# Usability Review — Variant `02-spotlight-projector-1`
**Wave 1, Classic Cinematic** | Nielsen Heuristics Evaluation
**Pages reviewed**: `index`, `features`, `clients`, `download`, `plugins`, `docs`, `hub`, `about` (all .html)

---

## Overview

The variant is a polished, consistent marketing site for Phlix, a self-hosted PHP media server. Across all 8 pages, the design language, navigation structure, and ARIA conventions are uniform. The primary user goal — reaching the download — is achieved in 1 click from any page. The most significant gaps are in error recovery, contextual help, and system-status feedback.

---

## Heuristic Breakdown

### 1. Visibility of System Status
**Rating: Adequate**

- Skip-to-main-content link present on all 8 pages.
- `aria-current="page"` correctly marks the active nav item on every page.
- `aria-expanded`/`aria-controls` on the mobile menu toggle button.
- `aria-label` on all icon-only interactive elements.
- Meta descriptions, Open Graph, and Twitter Card tags on every page — good for social sharing context.

**Gaps:**
- No loading or progress indicators for any network-dependent content.
- The mobile hamburger button communicates `aria-expanded` state to screen readers but provides no visible visual state change feedback (e.g., icon transformation or label update) for sighted users.
- No breadcrumb navigation on any page, making it difficult to orient within the site hierarchy.

---

### 2. Match Between System and the Real World
**Rating: Good**

- Page titles are descriptive and follow a consistent pattern (`[Page Name] — Phlix`).
- Feature names use familiar media-server vocabulary (SyncPlay, transcoding, DVR, DLNA).
- Technical terms are usually contextualized: the home page explains SyncPlay as "NTP-style time sync so movie night actually stays in sync."
- The `download.html` page pairs recognizable system icons (SVG) with each requirement.

**Gaps:**
- Dense technical jargon appears in some feature card descriptions without explanation. Example from `index.html` line 120: *"Folder-watcher hashes mtimes, scanner parses S01E02 / (2020) titles, ItemRepository hydrates metadata_json."* A non-technical user cannot parse this.
- Acronyms like "EPG," "NFO," and "CRF" appear without expansion on first use.

---

### 3. User Control and Freedom
**Rating: Good**

- Skip-link enables keyboard users to jump to main content.
- Logo on every page links back to `/` — consistent, reliable home return.
- External links consistently use `target="_blank"` with `rel="noopener noreferrer"`.
- No destructive actions exist on a static marketing site; this heuristic is partially out of scope.

**Gaps:**
- No breadcrumb trail on any sub-page.
- No "back" navigation within long-form pages (e.g., features.html scrolls through 8 feature sections with no in-page anchor nav or skip-to-section control).

---

### 4. Consistency and Standards
**Rating: Good**

- Identical header (logo + nav + hamburger), footer (3-column grid + tagline), and `<main>` structure on all 8 pages.
- Consistent CSS class naming: `.section`, `.container`, `.section-header`, `.feature-grid`, `.ecosystem-grid`, `.site-footer`.
- Consistent ARIA attribute usage across all pages.
- Consistent external link treatment (`target="_blank"` + `rel="noopener noreferrer"`).

**Gaps:**
- No confirmed CSS class for `.download-card-code` — appears in `download.html` line 89 but would need to be verified in `components.css`.
- No visible focus styles mentioned in CSS, although a `.skip-link` implies some keyboard accessibility investment.

---

### 5. Error Prevention
**Rating: Inadequate**

- The FAQ accordion on `about.html` uses `<button>` elements (not divs or JS onclick handlers) — semantically correct.
- Links that point to GitHub use `target="_blank"`; links pointing to the external docs domain (`detain.github.io/phlix-docs`) on the same host are also external and treated consistently.

**Gaps:**
- No visible form validation — no required-field markers, no inline error messages, no ARIA live regions for error announcements.
- On `download.html`, the "Next Steps" section tells users to "Access the Web UI at http://localhost:8080" — no guidance on what to do if the server doesn't start (firewall, port conflict, etc.).
- No 404 or error-page design exists in this variant. A broken internal link produces a generic browser "page not found" with no branded recovery path.

---

### 6. Recognition Rather Than Recall
**Rating: Good**

- Consistent global navigation eliminates the need to memorize layout.
- Feature grids with SVG icons allow rapid scanning without reading every line.
- The comparison table on `clients.html` lets users find relevant features without reading individual client pages.
- Clear section labels: "Quick Start," "System Requirements," "Next Steps," "Plugin Model."

**Gaps:**
- No breadcrumbs mean users can't re-orient after navigating deep into a page.
- No persistent context indicator (e.g., "You are on: Download > Docker Compose") anywhere on the site.
- No history or recently viewed navigation for returning users.

---

### 7. Flexibility and Efficiency of Use
**Rating: Adequate**

- Keyboard accessible: skip link, tabbable nav links, FAQ accordion buttons are keyboard-operable.
- The site targets two audiences (end users and developers) — `features.html` and `clients.html` serve the former; `plugins.html` and `docs.html` serve the latter.
- Client comparison table (`clients.html`) is an efficient reference for power users.

**Gaps:**
- No search functionality across the site.
- No user-configurable preferences (contrast, text size, etc.).
- No bookmarkable anchor states for FAQ accordion (expanding a question changes the URL fragment, making it shareable).

---

### 8. Aesthetic and Minimalist Design
**Rating: Good**

- Dark theme with amber/gold (`#F5C542`) accents — coherent, cinematic identity appropriate to the Classic Cinematic wave.
- Generous whitespace, clean typographic hierarchy.
- SVG icons used consistently; no broken image references.
- Hero CTAs are clearly distinguished (primary vs secondary button treatment).

**Gaps:**
- Feature card descriptions on `index.html` are technically dense; they may overwhelm users who just want a one-line value prop.
- The `pitch-list` (index, line 93–101) is a wall of text — not scannable for users who don't read every bullet.

---

### 9. Help Users Recognize, Diagnose, Recover from Errors
**Rating: Poor**

This is the weakest area for the variant.

- No visible error message design anywhere on the 8 pages.
- No error-state UI components (no danger/warning/info banners).
- The `about.html` FAQ section partially compensates by addressing common questions, but this is documentation, not runtime error recovery.
- The external docs link (`troubleshooting`) provides guidance, but users must navigate off-site to find it — and there is no local fallback if that link breaks.

**Gaps:**
- No inline validation errors on any form-like interactions.
- No 404/error page within the site.
- No diagnostic feedback for failed operations (e.g., "Docker image not found — check your internet connection").

---

### 10. Help and Documentation
**Rating: Adequate**

- `docs.html` provides a clear map of 4 documentation sections (User Guide, Developer Guide, API Reference, Hub Admin).
- Links to external docs (`detain.github.io/phlix-docs`) are present on relevant pages and clearly labeled.
- `download.html` includes "Next Steps" for post-install guidance.

**Gaps:**
- All documentation is hosted externally — no local fallback or offline-accessible summary.
- No inline tooltips or contextual help within pages.
- The external docs links use `target="_blank"` — this opens a new tab but there is no indicator of this behavior (no `aria-label` description, no visual clue beyond the external-link icon SVG on docs.html).

---

## Primary Goal: Download Reachable in ≤2 Clicks from Home

**✅ PASSES**

- From `index.html`: "Get Phlix" button → `download.html` (1 click). Nav also has a direct "Download" link.
- From any other page: "Download" in the global nav is always 1 click away.
- No modal, no interstitial, no multi-step funnel — direct.

---

## Summary Scores

| Heuristic | Score |
|---|---|
| Visibility of system status | Adequate |
| Match between system and real world | Good |
| User control and freedom | Good |
| Consistency and standards | Good |
| Error prevention | Inadequate |
| Recognition rather than recall | Good |
| Flexibility and efficiency | Adequate |
| Aesthetic and minimalist design | Good |
| Help users recognize/diagnose/recover | Poor |
| Help and documentation | Adequate |
| **Primary goal (download ≤2 clicks)** | ✅ Pass |

---

## Priority Findings

### High Priority
1. **No error/404 page** — A broken link drops users to a blank browser screen with no recovery path. A branded error page (404, 500) should be added.
2. **No inline validation or error feedback** — Any future forms (newsletter signup, contact, etc.) must include visible, accessible error states using ARIA live regions.
3. **FAQ accordion lacks URL fragment state** — Expanding a question should update `window.location.hash` so the answer is bookmarkable/shareable.

### Medium Priority
4. **Dense jargon in feature descriptions** — Phrases like *"ItemRepository hydrates metadata_json"* or *"CRF 23/28 libx264/libx265 with HLS master and variant playlists"* exclude non-technical users. Consider a plain-language summary adjacent to technical detail.
5. **No breadcrumbs** — On a site with 8 pages and no deep hierarchy, breadcrumbs are still helpful for orientation. At minimum, a "You are here" indicator on sub-pages.
6. **Mobile menu icon state invisible** — The hamburger button changes `aria-expanded` but has no visible state change for sighted users. Adding a visual transform (× vs ≡) would close the feedback loop.

### Low Priority
7. **No site search** — Useful for larger sites; currently 8 pages is navigable without it, but a simple client-side search would future-proof the site.
8. **No user preference settings** — Contrast, text size, etc. Not expected on a marketing site but would enhance accessibility.
9. **External docs links open new tabs without warning** — `target="_blank"` links should include `aria-label="(opens in new tab)"` or a visual indicator (e.g., a small icon) so users are not surprised.
