# Usability Review — variant `05-pixel-tech-1` (Wave 1, Terminal Hacker)

## Summary

**Primary goal met: YES.** The download is reachable in ≤2 clicks from the home page.
The site is otherwise well-structured and consistent, with a clear terminal/hacker aesthetic that fits the variant theme. Several minor and moderate usability issues were found; none are critical blockers, but they compound to reduce the overall experience quality.

---

## Nielsen Heuristic Breakdown

### 1. Visibility of System Status ✅ PASS

- **Nav active state**: Every page correctly sets `aria-current="page"` on the current nav item. This is consistently applied across all 8 pages.
- **Terminal windows as status mockups**: `download.html`, `hub.html`, `plugins.html`, `docs.html`, and `clients.html` all include styled terminal windows that simulate CLI output — effective contextual feedback for a developer audience.
- **Skip link**: `<a href="#main-content" class="skip-link">` present on every page.
- **No real-time status**: No HTTP status codes, loading spinners, or progress indicators for any async action. Acceptable for a static marketing site.

**Verdict: PASS — strong implementation.**

---

### 2. Match Between System and the Real World ✅ PASS

- The terminal/code aesthetic (dark bg, monospace fonts, neon-green `#39FF14` accents, `>_`, `[$]`, `[#]` icon notation) mirrors the developer-facing CLI product being marketed.
- Technical terminology (NTP offset, FFmpeg, Argon2ID, HLS, CRF, DLNA) is appropriate for the audience.
- No unexplained jargon for non-technical concepts.

**Verdict: PASS — aesthetic and language match the target user.**

---

### 3. User Control and Freedom ⚠️ MINOR ISSUE

- Mobile nav has a close button (`mobile-nav-close`) with correct `aria-label` and `aria-modal="true"` on the dialog.
- **Issue — keyboard focus trap**: The mobile nav (`id="mobile-nav"`) is a `role="dialog"` with `aria-modal="true"`, but there is no JavaScript observed in the HTML (inline or in `/js/main.js`, which exists but was not reviewed as it lives outside the variant folder) that enforces a focus trap. Users who open the mobile nav and Tab through it may tab into the background page content, breaking modal expectations.
- **No back navigation shortcut**: Browser back button is the only escape from the mobile nav. A visible "×" close button is present, which helps.

**Verdict: MINOR — mobile nav close button works but focus trap behavior of the modal is unverified.**

---

### 4. Consistency and Standards ✅ PASS

- Header structure is byte-for-byte identical across all 8 pages (same nav items, same `aria-label` values, same logo markup).
- Footer is consistent across all pages.
- All external links use `rel="noopener noreferrer"` — consistent.
- Button classes (`btn btn-primary`, `btn btn-secondary`, `btn btn-ghost`) are used consistently.
- `aria-current="page"` on the active nav link is correctly set on every page.
- Consistent `id` and `aria-labelledby` pairing for section headings.
- CSS class names follow a consistent naming convention (`site-header`, `terminal-nav`, `hero`, `section`, `feature-card`, etc.).

**Verdict: PASS — excellent cross-page consistency.**

---

### 5. Error Prevention ⚠️ MINOR ISSUE

- No forms or user input fields on any page — error prevention evaluation is largely N/A.
- **Download page**: the "quickstart" section shows three shell commands. No actual downloadable binary is linked. If the user's goal is "download Phlix," they must copy-paste three commands into a terminal. This is high friction compared to a direct download link or installer.

**Verdict: MINOR — no form errors possible, but download UX could offer a binary.**

---

### 6. Recognition Rather Than Recall ✅ PASS

- Navigation is persistent and always visible in the header — no need to recall navigation structure.
- Feature sections on `index.html` use visual icon anchors (`>_`, `[$]`, `[#]`, etc.) that serve as consistent memory anchors.
- Footer has categorized links (Product / Developers / Project), reducing search effort.
- Section labels (e.g., "Quickstart", "Requirements", "Ecosystem") clearly describe content without requiring the user to read the full body.

**Verdict: PASS — good use of visible navigation and categorized layouts.**

---

### 7. Flexibility and Efficiency of Use ⚠️ MINOR ISSUE

- Mobile nav (`id="mobile-nav"`) is a modal dialog. The hamburger toggle button has `aria-expanded="false"` but there is no observable ARIA attribute toggle in the static HTML (it would need JS to toggle `aria-expanded` and show/hide the nav).
- No keyboard shortcut system observed (e.g., no `accesskey` attributes).
- No search or filter on any page (e.g., `plugins.html` lists hooks in a plain table — no search).

**Verdict: MINOR — static site limitations, not critical failures.**

---

### 8. Aesthetic and Minimalist Design ✅ PASS

- Dark terminal theme is cohesive and distinctive for the "Terminal Hacker" variant.
- Spacing and layout are consistent (`container`, `section`, `section-header` pattern).
- Color use is restrained: neon green `#39FF14` for accents, dark backgrounds, silver text.
- No decorative clutter; every element serves a purpose.
- Terminal window mockups reinforce the theme without being gratuitous.

**Verdict: PASS — clean, cohesive, on-theme.**

---

### 9. Help Users Recognize, Diagnose, and Recover from Errors ⚠️ NOT APPLICABLE

- Static marketing site — no error states observable.
- 404 handling: no custom 404 page observed in this variant.
- No inline validation messages.

**Verdict: N/A — no error-prone interactions on a static site.**

---

### 10. Help and Documentation ⚠️ MINOR ISSUE

- `docs.html` provides four categorized doc links (User Guide, Developer Docs, Hub Admin Guide, API Reference) all pointing to external VitePress docs.
- Footer provides direct links to documentation.
- **Issue**: The download page does not link to installation documentation (`https://detain.github.io/phlix-docs` is only in the hero CTA as a secondary button). A user who lands directly on `/download` and is unsure how to proceed has no inline help.

**Verdict: MINOR — docs exist and are linked, but installation help on the download page itself is sparse.**

---

## Primary Goal Check: Download in ≤2 Clicks

| Step | Action | Result |
|------|--------|--------|
| 1 | Visit `/` | Home page loads |
| 2 | Click "Get Phlix" in hero OR "Download" in nav | `/download` loads |

**Goal: MET in 2 clicks (home → download).**

However, the **download page itself does not provide a downloadable binary** — only CLI commands. A user expecting a one-click download must execute `git clone`, `composer install`, and `php serve.php` manually. The stated goal checks out structurally, but the experience may not meet the practical expectation of "downloading" software.

---

## Issues by Severity

### 🟠 Moderate (2)

1. **Missing downloadable binary on `/download`**  
   The quickstart section shows CLI commands only. No `.zip`, `.tar.gz`, or installer artifact is linked. A user who wants to "download and run" without using git/cli has no path forward.  
   *Suggested fix*: Add a "Download .tar.gz" or "Download for [OS]" button above the CLI quickstart, pointing to a GitHub Releases artifact.

2. **Mobile nav `aria-expanded` is hardcoded to `false`**  
   The hamburger button always reads `aria-expanded="false"` in the HTML source. While JS likely toggles this dynamically, the static HTML is incorrect and may cause incorrect screen reader announcements before JS runs.  
   *Suggested fix*: Remove `aria-expanded="false"` from the static HTML and let JS set the initial state, or initialize it via JS before user interaction.

### 🟡 Minor (3)

3. **No mobile nav focus trap**  
   The mobile nav dialog (`role="dialog"`, `aria-modal="true"`) has no confirmed focus trap implementation. Keyboard users can Tab out of the modal into background content.  
   *Suggested fix*: Ensure `main.js` traps focus within `#mobile-nav` when open, and returns focus to the hamburger toggle on close.

4. **Download page has no inline installation help**  
   A user who lands directly on `/download` sees three commands but no explanation of what comes after `php serve.php`.  
   *Suggested fix*: Add a one-line note: "After starting, open http://localhost:8080 in your browser."

5. **`clients.html` — Mobile client dead end**  
   The mobile client card is marked `BETA` but has no GitHub link or download URL, unlike all other client cards which link to their repos.  
   *Suggested fix*: Add the mobile client GitHub URL, or a note like "APK / TestFlight links available via GitHub Releases."

---

## Metrics Summary

| Heuristic | Status |
|-----------|--------|
| Visibility of system status | ✅ PASS |
| Match system & real world | ✅ PASS |
| User control & freedom | ⚠️ MINOR |
| Consistency & standards | ✅ PASS |
| Error prevention | ⚠️ MINOR |
| Recognition not recall | ✅ PASS |
| Flexibility & efficiency | ⚠️ MINOR |
| Aesthetic & minimalist | ✅ PASS |
| Error recovery help | ⚠️ N/A |
| Help & documentation | ⚠️ MINOR |
| **Primary goal (download ≤2 clicks)** | ✅ **MET** |

---

## Recommendation

The variant passes the primary usability gate and exhibits strong consistency and aesthetic coherence. The moderate and minor issues identified are not blocking, but addressing the missing downloadable binary on `/download` would have the highest impact on real-world user satisfaction. The mobile nav focus trap and `aria-expanded` attribute should also be verified against the actual `main.js` behavior (outside scope of this review — recommend a follow-up review that includes shared assets).
