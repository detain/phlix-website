# Usability Review — Variant 03-retro-film-reel

**Reviewer:** Dimension Reviewer (Usability)
**Date:** 2026-05-20
**Pages Reviewed:** index.html, download.html, features.html, docs.html, plugins.html, clients.html, hub.html, about.html
**Supporting Files:** css/base.css, css/components.css, css/theme.css, js/main.js

---

## Nielsen Heuristic Scores

| # | Heuristic | Score | Notes |
|---|-----------|-------|-------|
| 1 | Visibility of system status | 8/10 | Skip link, aria-current, descriptive page titles. No loading states but acceptable for static HTML. |
| 2 | Match between system and real world | 7/10 | Plain English nav labels. Composer command on download page is technical for general users. |
| 3 | User control and freedom | 8/10 | Skip link, Escape closes mobile menu, focus trap in mobile nav. |
| 4 | Consistency and standards | 9/10 | Consistent header/footer/nav across all 8 pages. Proper ARIA roles and labels. |
| 5 | Error prevention | 7/10 | No forms. Disabled DLNA button has no tooltip explanation. |
| 6 | Recognition rather than recall | 9/10 | Persistent nav, clear button labels, consistent iconography. |
| 7 | Flexibility and efficiency of use | 7/10 | Good keyboard support but no skip-to-content on inner pages, no search. |
| 8 | Aesthetic and minimalist design | 8/10 | Clean, on-brand. Marquee animation may distract some users. |
| 9 | Error recovery | N/A | Static marketing site — no error states present. |
| 10 | Help and documentation | 7/10 | Docs page links out. FAQ on about page. No on-page getting-started guide. |

---

## Primary Goal: ≤2 Clicks Home→Download

| Path | Clicks | Result |
|------|--------|--------|
| index.html hero "Get Phlix" → download.html | 1 | ✅ PASS |
| index.html nav "Download" → download.html | 1 | ✅ PASS |

**Verdict: PASS** — Download is reachable in 1 click from home.

---

## ✅ Passed Items

### Navigation & Structure
- Skip-to-main-content link present on all 8 pages (line 37 in each HTML)
- Consistent header/nav structure across all pages
- aria-current="page" correctly marks active nav item
- Footer consistent across all pages with 3-column layout
- Mobile nav has proper aria-controls, aria-expanded, and aria-label attributes
- Focus trap implemented in mobile nav (main.js lines 46-60)

### Accessibility
- Proper role="navigation" and aria-label on all nav elements
- Focus styles visible (teal outline, base.css line 184-187)
- All SVG icons have aria-hidden="true"
- Descriptive link text throughout ("View source", "Get Phlix", "Read the docs")
- prefers-reduced-motion respected in CSS animations (base.css lines 97-109)
- Buttons have min-height: 44px for touch targets (components.css line 24)

### Content & Clarity
- Page titles are descriptive: "Download — Phlix", "Features — Phlix", etc.
- Consistent visual hierarchy with h1 → h2 → h3
- Feature cards on index.html have icon + title + description pattern
- Client cards on clients.html show status badges (stable/beta)
- Download cards on download.html organized by platform

### Interaction
- Escape key closes mobile nav (main.js lines 36-43)
- Click-outside closes mobile nav (main.js lines 62-69)
- Smooth scroll for anchor links (main.js lines 74-92)
- Hover states on all interactive elements
- Cards lift on hover with subtle rotation (components.css lines 252-255)

---

## ⚠️ Concerns (Non-blocking)

### 1. Download Page Clarity
**File:** download.html, lines 88-112

The DLNA "Built-in" button uses `style="opacity: 0.6; cursor: default;"` to appear disabled but has no tooltip or explanation for why it's disabled/built-in.

**Recommendation:** Add a title attribute or small tooltip explaining "DLNA is built into Phlix — no separate client needed."

### 2. Technical Barrier on Download Page
**File:** download.html, lines 79-84

Server installation via `composer require` may be unfamiliar to non-technical users. There's no indication of minimum requirements beyond "PHP 8.3+".

**Recommendation:** Consider adding a brief "Quick Start" section or link to installation docs.

### 3. Download Cards Don't Distinguish GitHub Links vs Actual Downloads
**File:** download.html, lines 91, 96, 101, 106

All client download buttons link to GitHub repository pages, not to direct download artifacts (.exe, .apk, etc.). This creates confusion — users must navigate GitHub to find actual install files.

**Recommendation:** Either provide direct download links or clarify "View on GitHub" to set expectations.

### 4. No On-Page Getting Started Guide
**File:** docs.html, lines 78-95

The docs page is a gateway to external VitePress docs. A brief on-page summary of the setup process (e.g., "1. Install server → 2. Add media → 3. Connect client") would help orient first-time visitors.

**Recommendation:** Add a 3-step quickstart checklist directly on docs.html or download.html.

### 5. Marquee Animation May Distract
**File:** components.css, lines 325-356

The marquee-lights animation in the hero (5 lights with staggered glow) may be distracting or cause motion sickness for some users. No UI control to pause it.

**Recommendation:** Consider adding a pause button or ensure it respects prefers-reduced-motion more aggressively.

### 6. Hub Page Missing Visual Diagram
**File:** hub.html, lines 76-88

The hub concept (reverse-tunnel relay, NAT traversal) is described textually but may be confusing to non-technical users. A simple ASCII/network diagram would help.

**Recommendation:** Add a small inline SVG diagram showing server → hub → client flow.

---

## ❌ Failures (Must Fix)

### 1. Download Page Has No Version/Release Information
**File:** download.html

The download page shows client buttons linking to GitHub but provides no information about:
- Current version number (e.g., "v1.2.3")
- Release date
- What's new/changelog link

Users cannot determine if they are downloading an up-to-date version without navigating to GitHub.

**Fix Required:** Add version badge (e.g., "v1.0.0" or "Latest") and date to server section and/or each client card.

### 2. Clients Page Mobile Client Status Inconsistent
**File:** clients.html, lines 127-128

The Mobile client shows `status-beta` badge but the download page (download.html line 104) uses the same badge styling. The ecosystem list on download.html has no version context for any component.

**Fix Required:** Ensure all clients with beta status clearly communicate stability implications to users.

### 3. ecosystem-list Items Are Not Linked
**File:** download.html, lines 115-122

The ecosystem list items use `<strong>` tags around project names but the links are only on the project names themselves. The structure is semantically inconsistent — "phlix-server" is linked but "phlix-hub" is wrapped in strong without being a direct link.

**Fix Required:** Ensure all ecosystem project names are consistently clickable links.

---

## Score: 72/100

**Rationale:** The variant demonstrates solid foundational usability — consistent navigation, proper accessibility attributes, good keyboard support, and clear visual hierarchy. However, critical gaps exist around the download experience (no version info, GitHub links instead of direct downloads) and some interactive elements lack proper states (disabled DLNA button). The concerns are non-blocking but collectively impact user confidence in getting started.

---

## Recommendations (Ranked by Impact)

### High Impact
1. **Add version/release info to download page** — Users need to know they're getting current software. Add version number and last-updated date for each client and the server.

2. **Provide direct download links or clarify "View on GitHub"** — Current download buttons imply getting software but actually route to GitHub repository pages. Either provide direct .exe/.apk links or relabel buttons to "View source" / "View on GitHub".

### Medium Impact
3. **Add quick-start steps on download or docs page** — A 3-step onboarding ("Install server → Add media → Connect client") would dramatically improve first-time user orientation.

4. **Add tooltip/explanation to disabled DLNA button** — The "Built-in" disabled button confuses without context. A hover title attribute would cost nothing and clarify.

5. **Add prefers-reduced-motion pause control** — The marquee animation should be pausable. A small "Pause animation" control or aggressive motion reduction respect would improve accessibility.

### Low Impact
6. **Add network diagram to Hub page** — A simple SVG showing server→hub→client topology would make the NAT traversal concept tangible.

7. **Add search to site** — For a site with 8 pages and growing docs, even a simple search would help.

8. **Standardize ecosystem list links** — Ensure all project names in ecosystem lists are consistently linked.

---

## Evidence Summary

| Check | Evidence |
|-------|-----------|
| Skip link present | All 8 HTML files line 37: `<a class="skip-link" href="#main-content">` |
| aria-current on nav | index.html line 52, download.html line 55, etc. |
| Focus styles | base.css lines 184-187, components.css hover states |
| Keyboard nav | main.js lines 36-43 (Escape), 46-60 (focus trap) |
| prefers-reduced-motion | base.css lines 97-109, main.js lines 126-134 |
| Consistent header | All 8 files use identical `<header class="site-header">` structure |
| Consistent footer | All 8 files use identical `<footer class="site-footer">` structure |
| Mobile nav | main.js lines 12-70 with full ARIA support |
| Consistent button classes | components.css .btn-primary, .btn-secondary throughout |
| Version info on downloads | ❌ NOT FOUND on download.html |
| Direct download links | ❌ All download buttons link to GitHub, not binaries |
| Tooltip on disabled button | ❌ DLNA button has no title/aria-label |
