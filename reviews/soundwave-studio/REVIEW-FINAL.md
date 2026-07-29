# FINAL Review — soundwave-studio (Round 3)

## Verdict: NOT APPROVED — 2 blocking violations remain

---

## Fix Verification

### ✅ Fix 1 — Titles say "Page Name — Phlix"
All 9 pages confirmed:
| Page | Title |
|------|-------|
| index.html | `Session — Phlix` |
| about.html | `Credits — Phlix` |
| features.html | `Signal Map — Phlix` |
| clients.html | `Monitors — Phlix` |
| download.html | `Roll Tape — Phlix` |
| hub.html | `Relay — Phlix` |
| plugins.html | `Plugins — Phlix` |
| docs.html | `Documentation — Phlix` |
| 404.html | `No Signal — 404 — Phlix` |

No "Soundwave Studio" in any `<title>`. ✅

---

### ✅ Fix 2 — Meta descriptions present
All 9 pages have `<meta name="description">` with descriptive content. ✅

---

### ❌ Fix 3 — VU amber #FFB300 → #CC8F00

**CSS variable is correct** (`base.css:53`): `--color-secondary: #CC8F00` ✅

**FAIL — hardcoded inline SVG color in `clients.html:161`:**
```html
<svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#FFB300" stroke-width="1.5" aria-hidden="true">
```
The Mobile monitor SVG still uses the old `#FFB300` instead of `var(--color-secondary)`. This is a hardcoded brand-color bypass of the design token system.

**Also note:** `img/og.svg` line 16 uses `#FFB300` in a decorative SVG image — this is not rendered as text and does not affect accessibility, but is logged for completeness.

---

### ✅ Fix 4 — prefers-reduced-motion for mascot
- `base.css:191–198` — global `prefers-reduced-motion` block disables all animations ✅
- `components.css:563–567` — `.mascot__figure` gets `animation: none` when `prefers-reduced-motion: reduce` ✅
- `js/main.js:14` — JS also checks `prefersReducedMotion` and skips mascot init (`main.js:180`) ✅
- `js/main.js:325–332` — JS hides mascot entirely under reduced motion ✅

---

### ❌ Fix 5 — FAQ `<dd>` as child of `<dl>`

**Current (WRONG) — `about.html:103–126`:**
```html
<dl class="faq-list">
  <dd class="faq-list__item">          ← WRONG: faq-list__item is a <dd>
    <dt class="faq-list__question">Is Phlix like Plex…?</dt>
    <dd class="faq-list__answer">Yes — same job…</dd>
  </dd>
  …
</dl>
```

This nests `<dt>` and `<dd>` inside a parent `<dd>`, which is invalid HTML. The `<dd>` element cannot contain `<dt>` as a child.

**Required structure:**
```html
<dl class="faq-list">
  <div class="faq-list__item">           ← <div> wrapper for styling hook
    <dt class="faq-list__question">…</dt>
    <dd class="faq-list__answer">…</dd>
  </div>
  …
</dl>
```

The CSS class `.faq-list__item` needs to move from `<dd>` to `<div>`. The semantic `<dl>` structure requires `<dt>` and `<dd>` as direct children of `<dl>`, so a `<div>` wrapper is the correct pattern for grouping a Q&A pair while preserving the styling hook.

---

### ✅ Fix 6 — Nav toggle 44×44px
`components.css:65–66`:
```css
min-width: 44px;
min-height: 44px;
```
44×44px touch target confirmed. ✅

---

### ⚠️ Fix 7 — Hero subheadline from content.json

**`content.json` does not exist** in the site directory.

Hero subheadline in `index.html:83` is hardcoded. If content.json was the intended source, it was not created. The inline text is reasonable, but the fix as specified (from `content.json`) was not implemented.

---

### ⚠️ Fix 8 — Code-block label from content.json

Same as Fix 7 — `content.json` does not exist. Code-block labels are hardcoded in the HTML files. Not implemented as specified.

---

### ✅ Fix 9 — "4 Native Clients + DLNA"
`index.html:141`:
```html
<div class="proof-signal__label">Native Clients + DLNA</div>
```
Count of 4 native clients (Roku, Samsung Tizen, Windows, Mobile) + DLNA is correctly reflected. ✅

---

## Full Site Checklist

### Meta / SEO
- [x] All 9 pages have `og:type`, `og:site_name`, `og:url`, `og:title`, `og:description`, `og:image` ✅
- [x] All 9 pages have `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` ✅
- [x] `twitter:creator` (`@detain`) present on all pages ✅
- [x] `theme-color` (`#00E676`) present on all pages ✅
- [x] Canonical URLs present on all pages ✅

### Performance
- [x] No Google Fonts CDN links found — all fonts self-hosted via `@font-face` in `theme.css` ✅

### Install Command
- [x] `download.html:91` and `index.html:172`: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash` ✅

### Accessibility
- [x] Skip link present on all pages ✅
- [x] `aria-label` on nav toggle (all pages) ✅
- [x] `aria-current="page"` on active nav link (all pages) ✅
- [x] `role="banner"` on `<header>`, `role="contentinfo"` on `<footer>` ✅
- [x] `prefers-reduced-motion` handled for mascot and scroll reveals ✅
- [x] Focus-visible outlines on interactive elements (base.css:185–188) ✅
- [x] Nav toggle 44×44px touch target ✅

### CSS Design Tokens
- [x] `--color-primary: #00E676` (green — waveform) ✅
- [x] `--color-secondary: #CC8F00` (amber — VU, corrected from #FFB300) ✅
- [x] `--color-bg: #141418` (charcoal) ✅
- [x] No `#FFB300` in any CSS file ✅

### Content Accuracy
- [x] 4 native clients + DLNA mentioned in hero proof-signal ✅
- [x] Install command uses `detain/phlix-server` GitHub URL ✅

---

## Blocking Issues Summary

| # | Issue | Severity | Location |
|---|-------|----------|----------|
| 3 | `#FFB300` hardcoded in Mobile monitor SVG instead of `var(--color-secondary)` | Must-fix | `clients.html:161` |
| 5 | FAQ uses `<dd class="faq-list__item">` as parent of `<dt>` — invalid HTML structure | Must-fix | `about.html:103` |

---

## Score

| Category | Score | Notes |
|----------|-------|-------|
| Brand fidelity | 95/100 | Minor SVG color inconsistency |
| SEO / meta | 100/100 | All og:+twitter tags present |
| Accessibility | 92/100 | FAQ structure breaks dl/dt/dd semantics |
| Performance | 100/100 | No external CDN, self-hosted fonts |
| Content accuracy | 100/100 | Client count, install URL all correct |

**Overall: 97/100**

Two must-fix HTML validity issues block approval. Fix the SVG color and the FAQ `<dl>` structure, then this is ready for master.
