# Afrofuturism Marketing Site — Readability & Usability Review

**Reviewer:** Adversarial readability / usability auditor
**Date:** 2026-06-30
**Scope:** 8 HTML pages, base.css, theme.css, components.css, main.js
**Site root:** `/home/sites/phlix/sites/autumn-harvest/` (note: user referred to this as `afrofuturism`; actual directory is `autumn-harvest`)

---

## Overall Score: 76 / 100

The site is structurally sound, accessible at a basic level, and visually coherent. However, it ships with several real usability defects: broken section hierarchy on Download, missing CTAs on Hub, missing contact/social info in footer, non-descriptive feature copy that drowns value in jargon, and an invisible ecosystem of plugins. A real user — especially a non-technical one comparing against Plex or Jellyfin — will struggle to answer basic questions without hunting.

---

## Per-Dimension Scores

| Dimension | Score | Notes |
|---|---|---|
| Navigation Clarity | 82/100 | Good ARIA, current-page indicators correct, mobile nav works. Deducted for no social/contact in footer and missing Hub page CTA. |
| Scannability | 68/100 | Heading hierarchy is broken on download.html. Ecosystem lists lack visual structure. Feature card copy is jargon-heavy and hard to skim. |
| Interaction Clarity | 78/100 | Buttons are obvious and tactile. Mobile nav ARIA states update correctly. No forms to fail. Deducted for inconsistent "View source" CTA on clients (DLNA card has none) and missing CTA on Hub page. |
| Content Quality | 65/100 | Hero and pitch copy is solid. Feature card body copy is 60% jargon artifacts ("ItemRepository hydrates metadata_json"). Plugins page has no actual plugins to show. Ecosystem lists on docs/download don't match content.json structure. |
| Visual Hierarchy | 80/100 | Hero is striking. Page-header banners create clear section breaks. CTAs in banners pop. Deducted for visual sameness between feature detail rows and awkward spacing on download.html. |
| Mobile UX | 74/100 | Core responsive breakpoints work. Mobile nav has solid keyboard handling. Deducted for nav overflow at 900px (8 nav items at 48px font), Ecosystem lists go 2-column then collapse poorly between 600–768px, and no visible focus ring on hamburger button before first interaction. |

---

## Detailed Defects

### 🔴 Critical (直接影响使用)

#### D1: Broken section heading hierarchy on download.html
- **File:** `download.html:75–80`
- **Severity:** High — affects scannability and accessibility outline
- **Defect:** `<h2>Server</h2>` at line 75 is a sibling to `<h2>Clients</h2>` at line 80. On a page titled "Download," having three consecutive `<h2>` elements ("Server", "Clients", "Ecosystem") violates proper heading hierarchy. The "Server" section is a parent-level item on the page but semantically should be `<h3>` or wrapped in a `<section>` with its own `<h2>`.
- **Fix:** Wrap the Server section in `<section><h2>Install the server</h2>…</section>`, change line 75 to `<h3>`, and change line 80 to `<h3>Clients</h3>` (keeping "Ecosystem" as the final `<h2>`).

#### D2: Ecosystem list items use wrong semantic structure on download.html and docs.html
- **File:** `download.html:110–116`, `docs.html:85–91`
- **Severity:** Medium — violates content contract, reduces accessibility
- **Defect:** The ecosystem list is a flat `<ul>` where each `<li>` contains multiple distinct pieces of information (project name, role, tech stack) presented as `—`-delimited text. content.json defines an array of objects with `name`, `repo`, and `what` fields. The HTML does not semantically distinguish these fields, making it impossible for screen readers or extraction tools to present them as structured data.
- **Additional issue on download.html:** `phlix-server` appears in both the Server section (composer command) and the Ecosystem list — confusing duplication on a page titled "Download."
- **Fix:** Replace flat `<li>` text with `<dl>`/`<dt>`/`<dd>` triplets, or separate `<strong>` name from `<span>` description. Remove the `phlix-server` duplicate from the Ecosystem list on download.html.

#### D3: Hub page has no CTA banner
- **File:** `hub.html:87–92`
- **Severity:** Medium — every other page ends with a CTA banner; Hub is the only exception
- **Defect:** `hub.html` ends its `<main>` content at line 85, followed immediately by the footer. Every other page (`features.html`, `clients.html`, `download.html`, `plugins.html`, `index.html`) has a `<section class="cta-banner">` before the footer. This breaks the user's flow — they read about Hub, want to try it, and find no obvious next action.
- **Fix:** Add the standard CTA banner block before the closing `</main>` tag on hub.html.

#### D4: Plugins page has no ecosystem plugins to show
- **File:** `plugins.html:80–84`
- **Severity:** Medium — page promises "ecosystem plugins" with a subheading but shows none
- **Defect:** Line 80–84 reads "Ecosystem plugins / The plugin contract makes it easy…" with no actual plugin listing. This is an empty promise to a user evaluating the plugin ecosystem. Meanwhile, the actual plugins (phlix-plugin-anidb, phlix-plugin-myanimelist, etc.) are not mentioned anywhere on the site.
- **Fix:** Add a plugin listing grid matching the client-cards pattern, populated from content.json ecosystem data or linked from GitHub.

---

### 🟡 Moderate (影响体验)

#### D5: DLNA client card has no "View source" CTA
- **File:** `clients.html:134–145`
- **Severity:** Low — inconsistent action presentation
- **Defect:** All four client cards (Roku, Tizen, Windows, Mobile) have a "View source" button at the bottom. The DLNA card at line 134 ends with just the `<ul>` of highlights — no button. A user scanning the client cards sees every other card has an action button, then DLNA has nothing, creating a visual dead end.
- **Fix:** Add `<a href="…" class="btn btn-small">View source</a>` (or a "No install required" label if there's no repo).

#### D6: Footer lacks contact information and social links
- **Files:** All 8 HTML files, footer sections
- **Severity:** Medium — footer completeness standard not met
- **Defect:** The footer has three link columns (Product, Developers, Project) and a copyright line. It does not include: (a) a contact email address, (b) social media links (GitHub org link exists in the Project column, but Twitter/X, Discord, or other social channels are absent). content.json:8–11 defines a `social` object with `github` and `docs` keys — only `docs` is linked in the Developer column; `github` is buried in the Project column but no social icons are shown.
- **Fix:** Add a fourth footer column or inline social icon links (GitHub, Twitter/X) with appropriate aria-labels.

#### D7: "See all features →" link text is minimally descriptive
- **File:** `index.html:211`
- **Severity:** Low — usability, not critical
- **Defect:** `<a href="features.html">See all features →</a>` is not the worst "read more" pattern, but "→" as link text in the middle of flowing prose is easy to miss. The arrow character is decorative and invisible to screen readers.
- **Fix:** Change to `<a href="features.html">See all eight features <span aria-hidden="true">→</span></a>` or simply "See the full features list →".

#### D8: Ecosystem list missing on about.html
- **File:** `about.html:72–113`
- **Severity:** Low — every other page (download.html, docs.html) shows the ecosystem list; about.html is the only page that doesn't
- **Defect:** The about page covers Philosophy, License, Contributing, and FAQ. It has no ecosystem/repo listing. This is inconsistent with the download and docs pages, which both show the ecosystem.
- **Fix:** Add the standard ecosystem list block from docs.html to about.html.

---

### 🟠 Minor / Technical

#### D9: Download page ecosystem duplicates phlix-server
- **File:** `download.html:77–78` and `download.html:111`
- **Severity:** Low — confusion
- **Defect:** phlix-server appears as a composer install command at line 77–78 AND as the first ecosystem list item at line 111. On a page titled "Download," users may not understand why phlix-server is listed twice with different presentations.
- **Fix:** Remove phlix-server from the Ecosystem list on download.html, or change its listing to focus on non-server ecosystem packages.

#### D10: Feature card copy contains jargon artifacts
- **Files:** `index.html:141,151,162,171,180,189,198,208` (feature-card p elements)
- **Severity:** Low — content quality for non-developer users
- **Defect:** Feature card body text repeatedly exposes internal implementation artifacts that mean nothing to general users: "ItemRepository hydrates metadata_json," "QualitySelector profiles," "ChannelManager, GuideManager, and Recorder," "LifecycleInterface + manifest schema." A user who just wants to know "can I watch my TV shows?" reads these cards and gets code-level details instead of benefit statements.
- **Note:** These match content.json exactly, so the issue originates in the content source. Flagging for awareness.
- **Fix (content.json):** Replace implementation references with benefit-oriented language. e.g., "Add a file, see it appear within minutes" instead of "ItemRepository hydrates metadata_json."

#### D11: Hub page heading hierarchy — three siblings without a clear parent
- **File:** `hub.html:75–82`
- **Severity:** Low — scannability
- **Defect:** Three `<h2>` elements ("What the Hub does", "Self-host or use the public hub", "Hub mode in clients") appear consecutively with no visual breaks or sub-section treatment. Users scanning the page see three headings of equal weight, making it unclear which section contains the information they need.
- **Fix:** Consider adding a visual divider (horizontal rule with gradient, or spacing) between the second and third `<h2>`, or wrap sections in `<section>` elements with `aria-labelledby`.

#### D12: Mobile nav hamburger button ARIA state before first interaction
- **File:** `js/main.js:19`
- **Severity:** Low — mobile accessibility
- **Defect:** The hamburger button has `aria-expanded="false"` hardcoded in HTML (download.html:45, features.html:45, etc.) and the JS immediately re-sets it to `"false"` on line 19 of main.js. The button correctly updates on click. However, before first click, the button is visually a "collapsed" hamburger icon — which is correct. This is not a defect, merely flagging for awareness that the ARIA state is consistent.

#### D13: Missing 1024px responsive breakpoint
- **Files:** `theme.css:469–499`, `components.css:100–137`
- **Severity:** Low — tablet coverage gap
- **Defect:** No explicit breakpoint at 1024px. Feature-cards and client-cards use `auto-fill, minmax(280px, 1fr)` which creates variable column counts depending on container width. At 1024px container width, cards may render as 3 columns on some layouts and 2 on others, unpredictably. No explicit handling.
- **Fix:** Add a `@media (max-width: 1024px)` block to enforce 2-column maximum on feature/client grids.

#### D14: Scroll reveal animation — elements visible in DOM order, not visual order
- **File:** `js/main.js:89–115`
- **Severity:** Low — accessibility
- **Defect:** IntersectionObserver-based scroll reveal animates elements from opacity 0 → 1 with `translateY(16px) → 0`. Elements are present in DOM order and keyboard focus order, but visually appear later. Screen reader users will encounter all feature cards in DOM order regardless. This is fine for the current layout but could cause confusion if content order ever diverges from visual order.
- **Note:** `prefers-reduced-motion` is properly checked; this is not a defect, just an observation.

#### D15: Ecosystem list uses `<ul>` with custom leaf-bullet, not `<ol>` with numbered context
- **Files:** `download.html:110`, `docs.html:85`
- **Severity:** Very low — consistency with content.json
- **Defect:** The ecosystem list is ordered conceptually (step-by-step setup or priority order per content.json) but rendered as an unordered list with a custom SVG bullet. A screen reader announces it as a bullet list, not a sequence.
- **Fix:** Change `<ul class="ecosystem-list">` to `<ol class="ecosystem-list">` and update the CSS to use `list-style: decimal` or a custom counter.

---

## Verdict: **FAIL** (score 76 < 90 threshold)

The site passes on structural integrity and basic accessibility, but fails on content quality (jargon-heavy feature copy, empty plugin ecosystem page), scannability (broken heading hierarchy on download, flat ecosystem lists), and completeness (missing Hub CTA, missing social links in footer, missing ecosystem on about page). A non-technical user evaluating Phlix against Plex or Jellyfin will have a frustrating information-seeking experience on this site.

---

## Summary by File

| File | Critical Issues | Moderate Issues | Minor Issues |
|---|---|---|---|
| index.html | 0 | D7 | D10 |
| features.html | 0 | 0 | D12, D14 |
| clients.html | 0 | D5 | D8 |
| download.html | D1, D2 | D3, D6 | D9, D13, D15 |
| plugins.html | D4 | D6 | — |
| docs.html | D2 | D6 | D8, D15 |
| hub.html | D3 | D6 | D11 |
| about.html | 0 | D6, D8 | D10 |
| base.css | 0 | 0 | D12 |
| theme.css | 0 | 0 | D13 |
| components.css | 0 | 0 | D12 |
| main.js | 0 | 0 | D12, D14 |

---

## Recommendations (Priority Order)

1. **Fix download.html heading hierarchy** (D1) — highest-impact scannability fix
2. **Add Hub CTA banner** (D3) — every page should end with a conversion opportunity
3. **Fix ecosystem list semantics** (D2) — restructure as `<dl>` or semantically distinct fields; remove duplicate phlix-server from download
4. **Show actual plugins on plugins.html** (D4) — or link to the GitHub topic page
5. **Add contact + social to footer** (D6) — at minimum a mailto: link and Twitter/X icon
6. **Desuckify feature card copy** (D10) — translate "ItemRepository hydrates metadata_json" into user benefit language
7. **Add 1024px responsive breakpoint** (D13) — stabilize tablet rendering
