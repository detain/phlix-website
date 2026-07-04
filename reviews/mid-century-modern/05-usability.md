# Usability Review — Mid-Century Modern

**Variant**: mid-century-modern
**Round**: 1
**Reviewer**: adversarial-usability-reviewer
**Date**: 2026-07-01

## Score

- **Usability**: 87 / 100

## ✅ Passed

- All 8 pages have consistent `<nav>` structure with `aria-current="page"` on active links — users always know where they are.
- Mobile hamburger toggle has correct `aria-expanded` (toggled between `"true"`/`"false"`) and `aria-controls="nav-menu"` on all pages.
- **Escape key closes mobile menu** and returns focus to the toggle button (`js/main.js:27-31`) — Nielsen #3 user control fully satisfied.
- **Click outside nav** also closes the mobile menu (`js/main.js:19-24`) — no sticky-menu trap.
- Visible `:focus-visible` ring (2px teal + 4px halo offset) on all interactive elements (`base.css:177-181`) — keyboard users can see where they are.
- Skip-to-main-content link present on all 8 pages (`<a class="skip-link" href="#main-content">`) — keyboard bypass functional.
- `prefers-reduced-motion` fully honored: CSS `transition-duration: 0.01ms !important` block (`base.css:137-146`) plus JS class-toggle (`js/main.js:36-43`) — no surprise motion.
- All links use descriptive anchor text; no bare "click here" or "read more" with no context.
- Language throughout is plain and familiar (no unexplained jargon except standard media-server terms: DLNA, SyncPlay, DVR, EPG — all appropriate for the audience).
- Footer links to docs on every page — Nielsen #10 satisfied.
- No forms on any page — zero form-validation concerns.
- No surprise modals, no auto-play media, no forced email gates — no dark patterns.
- **Download reachable in 1 click** from home: hero "Get Phlix" on `index.html:386` links directly to `download.html`.

## ⚠️ Concerns (non-blocking)

- **Download page has no direct download assets** — every client download button (`download.html:118-163`) links to GitHub source repos, not to release artifacts or `.zip` files. Users who want to install the software must click through to GitHub and hunt for release assets. This weakens the value of the "Download" page as a destination, though it is not a blocking failure since GitHub is a legitimate distribution channel for open-source software. — *Suggested next step: add a "Latest Release" section with direct download links or a `composer require` install snippet that actually installs the package.*
- **Scroll-reveal animation on card grids** (theme.css:418-435) uses `opacity + translateY` transitions. Users who find motion distracting but have not explicitly enabled `prefers-reduced-motion` will experience the stagger-reveal on scroll. This is a minor violation of heuristic #11 since the motion is non-essential. — *Suggested next step: gate scroll reveals behind `prefers-reduced-motion: no-preference` rather than just checking for `IntersectionObserver` support, or accept the current behavior as intentional.*
- **Inline `style` attributes on CTA banners** (`features.html:321-328`, `clients.html:201-209`, `download.html:216-224`, `plugins.html:139-146`, `hub.html:136-144`, `about.html` none) override font/color via inline styles rather than class-based tokens. Not a functional failure but violates DRY and makes future brand-wide token changes harder. — *Suggested next step: extract to dedicated `cta-banner-text` class in theme.css.*

## ❌ Failures (must fix this round)

None identified. All 10 Nielsen heuristics are satisfied at the threshold level. No keyboard traps, no missing ARIA, no missing escape-key handling, no invisible focus states.

## Recommendations (ranked by impact)

1. **Add direct download/install links** to `download.html` — add a `composer require detain/phlix-server` block or links to actual release `.zip` files alongside the GitHub repo links (impact: high, effort: low).
2. **Gate scroll-reveal behind `prefers-reduced-motion: no-preference`** — replace `if ('IntersectionObserver' in window)` with `if (!prefersReducedMotion.matches && 'IntersectionObserver' in window)` so users who prefer-reduced-motion get zero animation even without explicitly opting out of scroll reveals (impact: medium, effort: low).
3. **Extract inline CTA styles to a token class** — create a `.cta-banner-text { font-family: var(--font-body); color: var(--color-neutral); margin-bottom: var(--space-6); }` in theme.css and replace all 5 inline style blocks (impact: low, effort: low).

## Evidence

- Mobile menu Escape handling: `js/main.js:27-31`
  ```js
  if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.focus();
  }
  ```
- Click outside closes menu: `js/main.js:19-24`
- `aria-expanded` toggle: `js/main.js:16`
- `prefers-reduced-motion` JS guard: `js/main.js:36-43`
- `prefers-reduced-motion` CSS block: `base.css:137-146`
- `:focus-visible` ring: `base.css:177-181`
- Download 1 click from home: `index.html:386` — `<a href="download.html" class="btn btn-primary btn-large">Get Phlix</a>`
- Active nav `aria-current`: confirmed on all 8 pages (e.g. `index.html:106`, `features.html:84`)
- Inline styles on CTA banners: `features.html:321-328`, `clients.html:201-209`, `download.html:216-224`, `plugins.html:139-146`, `hub.html:136-144`
- Download page GitHub-only links: `download.html:118-163`
