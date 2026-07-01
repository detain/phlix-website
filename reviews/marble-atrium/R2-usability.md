# R2 — Usability

## Round 1 Fixes: VERIFIED

| # | Issue | Status | Evidence |
|---|-------|--------|----------|
| 2 | DLNA dead button → badge | ✅ FIXED | clients.html:129 `<span class="badge badge-status status-stable">Built in — no app needed</span>`; download.html:111 `<span class="badge badge-status status-stable">Built in</span>` |

---

## NEW ISSUES

### ⚠️ MODERATE: Mobile nav toggle — unclear affordance when collapsed

- **Severity:** Moderate
- **File:** components.css:87–109
- **Evidence:** At ≤900px, the hamburger toggle appears (`.nav-toggle { display: flex }`) but the menu is hidden. The toggle button has no visible label/icon until after the first click — the hamburger SVG is inside the button, but the button border is transparent/hairline. On first visit, it's unclear that this is a navigation trigger.
- **Also:** The toggle has `aria-expanded="false"` initially and `aria-label="Toggle navigation"` — these are correct. However, the button's border is `border: var(--border-hairline)` which is barely visible (#C8C4BC on #F7F5F2 ≈ 1.7:1). At 44×44px it meets touch target minimum but the affordance is weak.
- **Fix suggestion:** Consider making the toggle more visible (border color = `--color-text`) on mobile.

### ⚠️ MINOR: DLNA "Built in" badge not clickable — correct per spec

- **Status:** ✅ Intentional — DLNA is built into the server, requires no separate install. The badge correctly indicates this.
- **Note:** The "download.html" ecosystem section for DLNA shows `<span class="badge badge-status status-stable">Built in</span>` which is informational, not interactive. This is semantically correct.

### ⚠️ MINOR: Hero CTA buttons — correct placement above fold

- **Status:** ✅ Correct — "Get Phlix" (primary, gold) + "Read the docs" (secondary, ghost) are both above the fold on standard desktop viewport.
- **Evidence:** index.html:91–94, theme.css:178–183 flex layout

### ⚠️ MINOR: Download page — ecosystem items not linked to downloadable assets

- **Status:** ✅ Intentional — The ecosystem section links to GitHub repos (source), not downloadable binaries. The server is self-hosted; there are no direct download links for the server itself. The download page correctly shows install instructions (composer + start.php) and links to source for each client.
- **Note:** The download page does not have a direct `.zip` or `.tar.gz` link — this is consistent with a self-hosted server product where users clone from GitHub. No issue.

---

## WHAT'S WORKING (Usability-positive)

| Element | Evidence |
|---------|----------|
| Skip link present, visible on focus | base.css:153–172 ✅ |
| Skip link targets `#main-content` | index.html:53 ✅ |
| Navigation landmark (role="banner") | index.html:55 ✅ |
| Main landmark (id="main-content", tabindex="-1") | All 8 pages ✅ |
| Footer landmark (role="contentinfo") | All 8 pages ✅ |
| Nav 8 links correct order | All pages ✅ |
| aria-current="page" on active nav link | All pages ✅ |
| aria-expanded on mobile toggle | components.css:61 ✅ |
| aria-controls="nav-menu" on toggle | index.html:61 ✅ |
| 44px min-height on interactive elements | components.css:67,173 ✅ |
| Primary CTA above fold | index.html:91–94 ✅ |
| Primary CTA reachable ≤2 clicks from home | ✅ (direct link to download.html) |
| External links have rel="noopener noreferrer" | All external links ✅ |
| Touch targets 44×44px | components.css:173–174 ✅ |
| Keyboard accessible | All links, buttons, form controls reachable ✅ |
| Focus ring visible | base.css:178–181 ✅ (gold ring) |
| Focus ring offset | base.css:180 — 2px offset ✅ |
| No positive tabindex | ✅ None found |
| Labels on form inputs | N/A (no forms on marketing pages) |
| Code blocks readable | theme.css:370–383 ✅ |
| Mobile nav closes on Esc | js/main.js:26–33 ✅ |
| Mobile nav closes on outside click | js/main.js:35–41 ✅ |
| Fade-in scroll animation | js/main.js:54–67 ✅ (with prefers-reduced-motion gate) |
| Marble-vein reveal animation | js/main.js:78–84 ✅ (with prefers-reduced-motion gate) |

---

## INTERNAL LINK CONSISTENCY CHECK

All internal links verified relative (not absolute) within the site folder:
- `features.html` ✅
- `clients.html` ✅
- `download.html` ✅
- `plugins.html` ✅
- `docs.html` ✅
- `hub.html` ✅
- `about.html` ✅
- `./` for home ✅

No broken internal links detected.

---

## SCORE: 87/100

| Factor | Score | Notes |
|--------|-------|-------|
| Navigation | 88 | 8-link nav correct; mobile affordance weak |
| CTAs | 95 | Above fold, clear hierarchy |
| Touch targets | 100 | 44px minimum ✅ |
| Keyboard reach | 100 | All elements reachable |
| Focus visibility | 85 | Ring visible but lacks white offset per spec |
| Mobile nav | 82 | Closes on Esc/outside click ✅; affordance could improve |
| Link consistency | 100 | All internal links relative; no broken links |
| Download page | 90 | Correct for self-hosted product |
| **Overall** | **87** | Strong usability |

**Pass threshold: 75** — ✅ Passes.

### Suggested improvements (not required)
1. Mobile nav toggle: increase border visibility at ≤900px
2. Consider adding `box-shadow: var(--shadow-sm)` to `.nav-toggle:hover` to give it more presence
