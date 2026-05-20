# Usability Review — `04-portal-hub`

**Variant:** Portal Hub
**Reviewer:** Dimension Reviewer
**Scope:** 8 HTML pages (index, download, features, clients, plugins, docs, hub, about)
**Rubric:** Nielsen heuristics + primary goal ≤2 clicks home→download

---

## Primary Goal: Home → Download in ≤2 Clicks

**✅ PASSED — 1 click**

| Path | Click Count | Evidence |
|------|-------------|----------|
| index.html → download.html | 1 | Hero CTA "Get Phlix" links directly to `/variants/04-portal-hub/download.html` (line 79) |
| Any page nav → download.html | 1-2 | Nav includes "Download" as 4th item; consistent across all pages |

---

## Score: 67/100

| Heuristic | Score | Notes |
|-----------|-------|-------|
| H1: Visibility of system status | 6/10 | No loading states; minimal feedback; placeholder domains (phlix-hub.example.com) undermine trust |
| H2: Match system/real world | 7/10 | Generally clear language; some technical jargon (CRF, NTP offset, libx264) |
| H3: User control & freedom | 5/10 | about.html FAQ uses anchor-only navigation; no back/escape path; broken "Learn more" (href="#") |
| H4: Consistency & standards | 6/10 | CTA text inconsistent ("Get Phlix" vs "Download Now" vs "Download Phlix" vs "Get started"); nav item order identical on all pages but not ordered by user priority |
| H5: Error prevention | 4/10 | **Critical:** download.html has href="#" on DLNA "Learn more" (line 104); no form validation present; no error states defined |
| H6: Recognition not recall | 8/10 | Feature cards, download cards, client cards all self-explanatory; icon + title + description pattern is consistent |
| H7: Flexibility & efficiency | 7/10 | Keyboard navigable; skip links present; mobile hamburger menu exists but JS-dependent |
| H8: Aesthetic & minimalist | 7/10 | Clean glass-card layout; good whitespace; info density appropriate for marketing site |
| H9: Error recovery | 3/10 | **Major:** No error messages defined; no 404 handling; no empty states; no feedback forms |
| H10: Help & documentation | 6/10 | Docs link externally; plugins page references phlix-plugin-example but no inline tutorial; About FAQ is comprehensive |

---

## ✅ Passed Items

### Accessibility (all pages)
- Skip link present (`<a class="skip-link" href="#main-content">`) — line 37 in all pages
- ARIA roles correct: `role="banner"`, `role="navigation"`, `role="contentinfo"`, `role="list"`
- `aria-label` on all nav sections (`aria-label="Primary navigation"`, `aria-label="Footer navigation"`)
- `aria-current="page"` correctly set on active nav item (all pages)
- SVG icons have `aria-hidden="true"` to hide decorative SVGs from screen readers
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`, `<section>`
- Tabindex `-1` on main content for skip link target

### Navigation (all pages)
- Consistent header across 8 pages — same nav items, same order, same layout
- Logo links home — persistent anchor to orient users
- Footer organized into 3 columns (Product, Developers, Project) — useful for power users
- All nav items labeled with descriptive text (not "click here")

### Visual Design
- Hero CTA prominent — "Get Phlix" button uses `btn btn-primary` class, visually dominant
- Feature cards use `glass-card` styling — creates visual hierarchy, scannable
- Client cards use `client-status` badges — clearly indicates stable/beta state
- Consistent heading hierarchy (h1 page title → h2 section → h3 card title)
- Theme color `#00E5FF` set as both meta tag and used consistently

### Content Quality
- index.html hero text is compelling and specific: "SyncPlay, Live TV, transcoding, DLNA, hub relay"
- download.html clearly separates Server / Clients / Ecosystem sections
- clients.html lists specific client capabilities (e.g., "Hub mode", "Skip intro/outro", "Media keys")
- about.html FAQ addresses common competitor comparisons (Plex/Jellyfin/Emby)
- about.html FAQ covers 6 common questions with substantive answers

### Path to Download
- **1 click** from home via hero CTA — meets primary goal with margin
- 5 additional CTA banners across pages all link to download.html
- Nav always shows "Download" link in consistent position (4th item)

---

## ⚠️ Concerns (Non-blocking)

### C1: Inconsistent CTA Labeling
**Location:** Multiple pages
- index.html line 79: "Get Phlix"
- index.html line 187: "Download Phlix"
- features.html line 166: "Download Now"
- hub.html line 84: "Get started"
- clients.html line 144: "Download Now"

**Impact:** Minor; users may wonder if these are the same action.

**Recommendation:** Standardize on one label, preferably "Download" or "Get Phlix" everywhere.

### C2: Technical Jargon in Feature Descriptions
**Location:** index.html lines 80-176; features.html
- "CRF 23/28 libx264/libx265" (index.html line 131)
- "Weighted-mean NTP offset over 5 samples" (index.html line 92)
- "Argon2ID password hashing" (index.html line 140)

**Impact:** Excludes non-technical users skimming feature lists.

**Recommendation:** Add a one-line plain-English summary before technical details in feature cards.

### C3: Mobile Hamburger Menu JS Dependency
**Location:** All pages — `<button class="nav-toggle">` (lines 45-49)
- `aria-expanded="false"` is hardcoded; JS must toggle this
- No `<noscript>` fallback and no visible indication of collapsed state

**Impact:** Keyboard-only users may not know hamburger reveals nav on mobile.

**Recommendation:** Ensure focus-visible styles exist for toggle; verify ARIA state updates on toggle.

### C4: Placeholder Domain in Hub Page
**Location:** hub.html line 76
```html
<p>You can run your own <a href="https://github.com/detain/phlix-hub">phlix-hub</a> instance, or use the public one at phlix-hub.example.com — no configuration required.</p>
```
**Impact:** "phlix-hub.example.com" is a placeholder that will confuse users.

**Recommendation:** Replace with real domain or remove reference until production-ready.

### C5: Beta Client Status Without Explanation
**Location:** clients.html line 117
```html
<span class="client-status status-beta">beta</span>
```
**Impact:** Users may install beta software without understanding risk.

**Recommendation:** Add tooltip, footnote, or link explaining what beta means for the mobile app.

### C6: No Version Numbers or Release Dates
**Location:** download.html
- No version indicated for any package
- No release dates
- No changelog links

**Impact:** Power users cannot assess currency of software.

**Recommendation:** Add last-updated date or version number to download page header.

### C7: Plugin Page Thin Content
**Location:** plugins.html
- Lines 72-82 contain only 3 paragraphs
- No inline code examples
- No plugin list
- Ecosystem plugins mentioned but not enumerated

**Impact:** Page feels unfinished; does not build confidence in plugin ecosystem.

**Recommendation:** Expand with at least one concrete plugin example, even if just a name + description.

---

## ❌ Failures (Must Fix)

### F1: Broken "Learn More" Link on Download Page
**Location:** download.html line 104
```html
<a href="#" class="btn btn-secondary" rel="noopener noreferrer">Learn more</a>
```
**Problem:** `href="#"` is a dead link — scrolls to top but offers no additional information.

**Impact:** Users seeking DLNA info hit a dead end; breaks error-recovery heuristic (H9).

**Recommendation:** Either link to a real DLNA info page, remove the link, or replace with text explaining DLNA requires no install.

---

### F2: No Error States, Feedback, or Recovery Paths
**Location:** All pages
- No 404 page defined
- No form validation messages (contact, signup forms absent but still a gap)
- No empty states
- No inline validation
- No error message styling defined in CSS

**Impact:** When things go wrong (broken JS, network failure, invalid input), users see nothing helpful.

**Recommendation:** Define basic error message patterns; at minimum, a 404 page should exist and link to home/download.

---

### F3: Download Page Does Not Enable Download
**Location:** download.html lines 71-77
```html
<div class="download-block">
  <p>Requires PHP 8.3+ and <a href="https://github.com/detain/phlix-server">phlix-server</a>.</p>
  <pre class="code-block"><code>composer require detain/phlix-server
  # or clone from https://github.com/detain/phlix-server</code></pre>
</div>
```
**Problem:** The "Download" page offers no downloadable artifact — only composer/clone instructions.

**Impact:** User who lands on "Download" page expecting a .zip, .tar.gz, or installer will leave confused. This is the primary usability failure for the site's conversion goal.

**Recommendation:** Either add a direct download link (GitHub releases), or rename page title to "Installation" with clearer expectations set in page-lead ("Install via Composer or clone...").

---

## Recommendations (Ranked by Impact)

| Priority | Issue | Impact | Effort |
|----------|-------|--------|--------|
| **P0** | Fix F3: Add downloadable artifact or rename page to "Install" | High — core conversion failure | Low |
| **P0** | Fix F1: Replace `href="#"` on DLNA "Learn more" | High — dead link | Low |
| **P1** | Add F2: Basic error/404 handling | High — trust and recovery | Medium |
| **P1** | Fix C4: Replace phlix-hub.example.com placeholder | Medium — credibility | Low |
| **P2** | Standardize CTA labels (C1) | Low — minor friction | Low |
| **P2** | Add version numbers to download page (C6) | Low — decision support | Low |
| **P3** | Expand plugins page content (C7) | Low — completion feeling | Medium |
| **P3** | Add beta explanation for mobile client (C5) | Low — expectation setting | Low |
| **P3** | Simplify technical jargon in feature cards (C2) | Low — accessibility | Low |

---

## Evidence Summary

| Page | Nielsen H1-5 | Nielsen H6-10 | Click Depth | Critical Issues |
|------|--------------|---------------|-------------|-----------------|
| index.html | 4/5 | 4/5 | 1→download | 0 |
| download.html | 2/5 | 1/5 | 0→download | **2 (F1, F3)** |
| features.html | 4/5 | 4/5 | 1→download | 0 |
| clients.html | 4/5 | 3/5 | 1→download | 0 |
| hub.html | 3/5 | 3/5 | 1→download | 0 (C4) |
| plugins.html | 4/5 | 3/5 | 1→download | 0 |
| docs.html | 4/5 | 3/5 | 1→download | 0 |
| about.html | 3/5 | 2/5 | 1→any | 0 (but thin anchor nav) |

**Download page is the critical bottleneck** — it has 2 of the 3 must-fix failures and the lowest Nielsen scores.

---

## Verdict

**Overall: REQUEST_CHANGES (for P0 issues)**

The site meets the primary goal (1-click to download) and has strong foundational accessibility. However, the download page's `href="#"` dead link and its failure to actually offer a download represent critical usability breakdowns that will cause user confusion and conversion failure. These must be addressed before the variant can be considered production-ready.
