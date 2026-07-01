# Usability Review — Marina Breeze

**Dimension:** Usability (Nielsen heuristics)
**Score:** 88/100
**Severity:** ⚠️

---

## Findings

### ✅ PASS — Visibility of System Status
No interactive system status displays on a marketing site (no auth states, no loading of user data). The CTA banners and navigation provide clear status through aria-current on nav links ✅

### ✅ PASS — Match Between System and Real World
Navigation uses standard marketing site conventions: horizontal nav bar, logo links home, 8 standard pages in predictable order. No confusing terminology ✅

### ✅ PASS — User Control and Freedom
Mobile nav has an Escape key handler (`main.js:29-35`) that closes the menu and returns focus to the toggle button ✅
Outside-click closes nav (`main.js:21-26`) ✅
`aria-expanded` is kept in sync with actual state (`main.js:17, 24, 32`) ✅

### ✅ PASS — Consistency and Standards
All 8 pages use the same HTML shell, same CSS cascade, same class naming conventions ✅
Buttons use `.btn` + variant classes consistently ✅
Card components use consistent `.feature-card`, `.client-card`, `.ecosystem-item` naming ✅

### ⚠️ WARNING — Download Goal: 3 Clicks Required for Download from Home
**Funnel analysis:**
1. Home → Click "Get Phlix" → download.html (1 click) ✅
2. download.html → Scroll to "Client apps" section → Click client "View source" link (GitHub) OR...
3. The server section shows install snippet, but **there is no direct download link** for the server software on download.html.

`download.html:61-72` shows only a server requirements section with an install snippet (git clone + composer). There is **no "Download Server" button** on the download page that goes to a release artifact.

Per new_site.md §5: "Calls to action (reused): 'Get Phlix' / 'Download Phlix' (primary, → download)". The expectation is that download.html itself provides a direct path to download the software. Currently, users must navigate to download.html, read the install instructions, and manually clone the repo — this is more than 2 clicks and requires technical steps.

This violates the "download goal reachable in ≤2 clicks" rule (new_site.md §5 / §2 principle).

### ✅ PASS — Error Prevention
No user input forms on marketing site. No error-prone contexts ✅
Code blocks use `<pre>` tag (`download.html:66-69`) preventing copy-paste errors ✅

### ✅ PASS — Recognition Rather Than Recall
Navigation items clearly labeled; no abbreviations or icons-only navigation ✅
Feature cards clearly labeled with icon + title + description pattern ✅

### ⚠️ WARNING — No Loading States Needed
Marketing site is entirely static with no async data loading, so no loading states are applicable ✅ (not a failure, just N/A)

### ✅ PASS — Help Users Recognize/Recover from Errors
No user-initiated errors on marketing site. Appropriate for static marketing content ✅

### ✅ PASS — Help and Documentation
Docs page (`docs.html`) links to all 4 documentation areas (user guide, API reference, developer docs, hub admin) ✅
Plugin page links to phlix-plugin-example ✅

### ✅ PASS — Mobile Navigation Works
`main.js:14-36` — Full mobile nav toggle implementation with:
- Click toggle ✅
- aria-expanded sync ✅
- Outside click close ✅
- Escape key close + focus return to toggle ✅

`components.css:621-638` — Mobile nav displayed as dropdown panel with `.is-open` class ✅

### ✅ PASS — Hover/Focus States on All Interactive Elements
`components.css:211-216` — `.btn-primary:hover` darkens background ✅
`components.css:225-228` — `.btn-secondary:hover` darkens background ✅
`components.css:238-241` — `.btn-ghost:hover` fills background ✅
`components.css:326-328` — `.feature-card:hover` lifts 3px ✅
`components.css:232-235` — `:focus-visible` ring on all interactive elements ✅

---

## Summary

**Score: 88/100 — ⚠️ WARNING**

The site is broadly usable with solid mobile nav, good hover states, keyboard accessibility, and consistent component patterns. The primary concern is that the download funnel requires more than 2 clicks/steps: users land on download.html, see an install snippet (git clone instructions) but no actual download link for pre-built server artifacts. For a non-technical user, "clone the repo" is not equivalent to "download." This is a significant funnel issue given the site's primary conversion goal is download.

Fix: Add a direct download link or GitHub releases link to the server section on download.html.
