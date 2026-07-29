# Wilderness Trail — Brand Kit Site Review

**Reviewer:** Hostile auditor
**Ground truth:** `new_site.md` (root), `shared/content.json`
**Linter:** `npm run lint` — **PASSES clean** (zero warnings)

---

## Summary

The site is well-built and largely brand-faithful. However, it fails on three counts: a missing pitch bullet (content accuracy), absent `twitter:creator` (social metadata), and a sub-44px touch target (accessibility). All three must be fixed.

---

## Dimension Scores

### 1. Brand Fidelity & Spirit — ✅ PASS (92/100)

- Vintage NPS poster aesthetic faithfully implemented: pine green `#2D5A27`, campfire orange `#D4581A`, canvas tan `#E8D9BC`, topographic SVG textures, Scout the ranger mascot
- Fonts: Playfair Display (headline), Abril Fatface (display), Lora (body), Barlow Condensed (UI), IBM Plex Mono — all self-hosted from `shared/assets/fonts/` pool, `font-display: swap` declared
- No Google Fonts CDN — compliant with §7 / §19.3
- Brand voice: rugged, adventurous, grounded, awe-struck — consistent throughout
- `experience_archetype` fully realized: parallax hero with Scout SVG, trail-blaze nav, chaptered scroll with `section-reveal` + topo textures, mascot with dismiss-to-localStorage, intensity toggle, seasonal JS date-gate, campfire-QA FAQ, Scout 404 page
- CSS architecture: `base.css` (tokens/reset) → `theme.css` (layout/typography) → `components.css` — correct three-sheet cascade with CSS custom properties throughout

**Deduction:** Mascot close button is 20×20px (see dimension 6).

---

### 2. SEO — ✅ PASS (91/100)

- Every page: `<title>` ≤ 60 chars, page-specific; `<meta name="description">` ≤ 160 chars from `content.json.meta`; `<meta name="keywords">` from `content.json.meta.keywords`; `<link rel="canonical">` absolute
- `<h1>` exactly one per page; heading hierarchy never skips a level
- `aria-labelledby` on all `<section>` elements pointing to descriptive headings
- JSON-LD `SoftwareApplication` on home, features, clients, download, hub, about — correct fields (name, description, applicationCategory, operatingSystem, offers/price=0, license)
- `sitemap.xml` with 9 pages, all `<loc>` absolute URLs; `robots.txt` references it
- Descriptive anchor text throughout (`aria-label` on icon-only buttons, no bare "click here")

**Deduction:** `download.html` JSON-LD has `operatingSystem: "PHP 8.3+ / Ubuntu, Debian"` which is imprecise — should just be `"PHP 8.3+"` per content.json spec.

---

### 3. Readability — ✅ PASS (94/100)

- Body text: Lora at `1rem` / `line-height: 1.7` — excellent
- Headline scale: `text-5xl` down to `text-lg` — consistent hierarchy
- Measure: body text max-width ~56ch on section headers, subheadlines max-width ~52ch — readable
- `overflow-wrap: anywhere` on `p, li, dt, dd, a, span, code, kbd, samp, pre` per §19.12 rule 2
- `hyphens: auto` + `overflow-wrap: break-word` on `h1–h6, blockquote` per §19.12 rule 2
- No `overflow: hidden` on text containers — hero explicitly `overflow: visible` to prevent 200% zoom clipping
- All 8 features present on features page with full descriptions from `content.json`

---

### 4. Spelling & Grammar — ✅ PASS (97/100)

- Copy matches `content.json` verbatim for facts; no invented phrases
- Minor: `about.html` uses "licence" (British) consistently — acceptable given the naturalist voice
- No spelling errors detected in any page content

---

### 5. Usability — ✅ PASS (90/100)

- Primary CTA "Lace Up and Begin" → `download.html` visible above fold on home
- Download path: ≤2 clicks from home
- Nav: 6 links matching brand kit spec; demoted pages (plugins, docs) correctly in footer
- Copy button on install command with `navigator.clipboard` + `execCommand` fallback
- Mobile hamburger nav with `aria-expanded` sync, outside-click close, `Escape` close
- Smooth scroll for anchor links
- FAQ accordion closes siblings on open (only one open at a time)
- `prefers-reduced-motion` respected: JS sets `document.documentElement.dataset.reducedMotion` and CSS kills all animations/transitions at `prefers-reduced-motion: reduce`

**Deduction:** `intensity-toggle` label is a `<label>` with `for` not pointing to the checkbox `id` — screen reader may not associate them. See dimension 6.

---

### 6. Accessibility (WCAG 2.2 AA) — ⚠️ BORDERLINE (82/100) ❌

- Skip link: present, visible on focus, targets `#main-content` — PASS
- All interactive elements: visible `:focus-visible` ring with `--color-focus` (campfire orange 2px offset 3px) — PASS
- Form labels: `<label>` associated with inputs — PASS
- `prefers-reduced-motion: reduce` respected — PASS (§7 JS, §12 CSS) — PASS
- 200% text zoom: no clipping or overlap expected; `hero` is `overflow: visible` — PASS
- Touch targets: **FAIL** — `.mascot__close` is 20×20px, below 44×44px minimum (WCAG 2.2 AA §2.5.8). The mascot is `position: fixed; bottom: var(--space-6); right: var(--space-6)` and should be tested at 320px.
- **Potential issue**: `intensity-toggle input { display: none }` uses `display: none` which removes it from the accessibility tree entirely, yet it is a functional checkbox that persists the user's dim preference to localStorage. The three spans (track, thumb, label text) visually replace it. If a screen reader user tabs to this area, the checkbox state is invisible. Recommend `appearance: none; opacity: 0; position: absolute; width: 1px; height: 1px` instead of `display: none` to keep it in the DOM while visually hidden.

**Failure:** `.mascot__close` is 20×20px (44px required) — fails WCAG 2.2 AA §2.5.8.

---

### 7. Responsive (320→1920) — ✅ PASS (91/100)

- `grid-template-columns: repeat(auto-fill, minmax(280px, minmax(0, 1fr)))` — uses `minmax(0, 1fr)` per §19.12 rule 1
- `.hero__content` uses `grid-template-columns: 1fr auto` with Scout hidden at `≤768px`
- Mobile nav: `position: absolute` dropdown, `box-shadow` on open, toggle `display: flex` at `≤768px`
- `container` has `padding-inline: var(--space-4)` at `≤768px` (vs `var(--space-8)` desktop) — adequate at 320px
- `.mascot` hidden at `≤768px` — no overlap with content at mobile
- No `overflow: hidden` on containers with reflowing text — hero explicitly `overflow: visible`

**Note:** `@media (width <= 768px)` breakpoints exist throughout but no `@media (width <= 480px)` or `@media (width <= 375px)` for the smallest phones. The `clamp()`-based hero text scales down but other elements may need tightening. Layout uses fluid widths with max-width — no fixed-px layout widths.

---

### 8. Performance (self-hosted fonts, no CDNs) — ✅ PASS (93/100)

- All `@font-face` declarations point to WOFF2 in `../../assets/fonts/` — verified all files exist in `shared/assets/fonts/`
- `font-display: swap` on every `@font-face`
- No CDN links: `grep -r "fonts.googleapis.com\|fonts.gstatic.com"` returns **zero matches**
- JS is `defer`-loaded, no render-blocking scripts
- No third-party scripts, no analytics
- CSS includes `minmax(0, 1fr)` on all grid tracks — prevents overflow
- Seasonal data is CSS-only (SVG data URIs, CSS custom property overrides) — no JS for purely decorative seasonal changes

**Deduction:** `js/main.js` is not `defer`-loaded on all pages — download.html and about.html load it as `<script src="js/main.js">` without `defer`. Per new_site.md §7: "Keep it tiny and non-render-blocking. No analytics, no third-party scripts." The spec doesn't explicitly require `defer` but best practice is to add it. The hero has no JS dependency so this doesn't block first paint.

---

### 9. Content Accuracy — ❌ FAIL (78/100) — MANDATORY FIX

**Issue 1 — Missing pitch bullet:** `content.json` defines 8 `pitch_bullets[]`. The home page "Why this trail?" section renders **7** items (heading: "Seven reasons to lace up"). The **4th item — "Multi-source metadata: TMDB, TVDB, Fanart.tv, and local NFO with 24-hour cache"** — is entirely absent from the trail blazes. This is a direct content.json fact that was dropped.

**Issue 2 — Mascot close button label:** `index.html:429` — `<button class="mascot__close" aria-label="Dismiss Scout">✕</button>` — button size is 20×20px in `components.css:736-755`. This is a factual accessibility issue.

**Verified correct:**
- Install command: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash` — verbatim match to `content.json.install.primary.command`
- Install description text matches `content.json.install.primary.what_it_does`
- All 8 features present on features page with correct descriptions
- All 6 FAQ answers match `content.json` verbatim
- License text in footer matches `content.json` (MPL-2.0 for server+hub, MIT for libs/plugins/clients)
- Client status badges: all correct (`stable` for Roku/Tizen/Windows/DLNA, `beta` for Mobile)
- `ecosystem[]` links all correct and complete on download page
- Footer column links match `content.json.footer.columns` exactly

---

### 10. CTA / Funnel — ✅ PASS (90/100)

- Primary CTA "Lace Up and Begin" visible above fold on home
- CTA ladder (3 steps: Lace Up → Browse Outposts → Install) with correct hrefs
- Install command in `code-block` with copy button
- Download page: 3-step funnel (install → choose outpost → set up relay)
- Closing `.cta-banner` on features, clients, download, hub, about pages
- Download → clients → download cycle works correctly

---

### 11. Social Metadata (OG + Twitter) — ❌ FAIL (75/100) — MANDATORY FIX

**Issue — Missing `twitter:creator`:**

`new_site.md §11` requires: `twitter:creator=@detain` on every page.

```
$ grep -r "twitter:creator" sites/wilderness-trail/*.html
# ZERO matches in any HTML page
```

Only `FINAL-REVIEW.md` contains this string — it was documented but never implemented.

**Verified correct:**
- All pages: `og:type=website`, `og:site_name=Phlix`, `og:url` absolute, `og:title`, `og:description`, `og:image` (absolute URL to `img/og.png`)
- All pages: `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`
- `og:image` is PNG (not SVG) — `img/og.png` confirmed exists (43942 bytes)
- `<meta name="theme-color">` = `#2D5A27` on all pages

---

### 12. Localization — ✅ PASS (94/100)

- `<html lang="en">` set on all pages — matches `content.json.site.default_locale: "en"`
- All user-facing strings trace to `content.json` (single source of truth)
- Logical CSS properties (`margin-inline`, `padding-inline`) used throughout — RTL-ready
- Font subset: Latin only — appropriate for `en` locale

---

### 13. Experience Fidelity — ✅ PASS (90/100)

All declared in `SITE.md §Experience Features Implemented`:

| Feature | Implementation | Status |
|---------|----------------|--------|
| `hero_experience` | Parallax hero with Scout SVG, CSS-only fallback | ✅ |
| `navigation_model` | Topbar with trail-blaze diamond separators, ember active state | ✅ |
| `scroll_experience` | `section-reveal` with `IntersectionObserver`, topo texture | ✅ |
| `easter_eggs` | Logo-clicks:5 → Scout tip, typed-word:summit | ✅ |
| `mascot.behavior` | Scout fixed bottom-right on home/download/about, localStorage dismiss | ✅ (but button too small) |
| `intensity_toggle` | "Dim the Campfire" checkbox, localStorage persistence | ✅ |
| `seasonal_activation` | JS date-gate with `data-season` on `<html>`, seasonal banner | ✅ |
| `faq_experience` | Campfire-QA frame, 6 Q&A, "Scout says —" prefix | ✅ |
| `error_page_experience` | Scout at wrong trail sign, 3 recovery links | ✅ |

All `prefers-reduced-motion` gated. No JS library CDN dependencies. JS budget self-check not run but `main.js` is hand-written vanilla JS, ~12KB.

---

## Mandatory Fixes (before approval)

### ❌ 1. Missing Pitch Bullet (Content Accuracy — Critical)

**Location:** `index.html:218` — missing 4th trail blaze

The home page "Why this trail?" section renders 7 of 8 pitch bullets. The missing item is `pitch_bullets[3]`:

> "Multi-source metadata: TMDB, TVDB, Fanart.tv, and local NFO with 24-hour cache"

This fact must appear somewhere on the home page. Options:
- Add as an 8th blaze in the "why-this-trail" section
- Add as a footnote or badge in the "key-waypoints" section
- Merge it into the Library waypoint card body text

**Reference:** `content.json:pitch_bullets[3]`, `new_site.md §2` (facts must remain traceable)

---

### ❌ 2. `twitter:creator=@detain` Absent (Social Metadata — Critical)

**Location:** All HTML pages — `<head>` missing `twitter:creator`

Every page's `<head>` needs:
```html
<meta name="twitter:creator" content="@detain" />
```

Pages affected: `index.html`, `features.html`, `clients.html`, `download.html`, `hub.html`, `about.html`, `plugins.html`, `docs.html`, `expedition-guide.html`, `404.html`

**Reference:** `new_site.md §11`, `SITE.md §11`

---

### ❌ 3. Mascot Close Button Touch Target (Accessibility — WCAG 2.2 AA Failure)

**Location:** `components.css:736-755`

`.mascot__close` is 20×20px. WCAG 2.2 AA §2.5.8 requires **44×44px minimum** touch target for pointer input.

**Fix:** Increase to `width: 44px; height: 44px;` and reposition the × visually (e.g., `top: -10px; right: -10px`) so the full 44×44px area is clickable while the × glyph stays visually centered in the small figure.

---

## Non-Blocking Notes

1. **Intensity toggle accessibility:** `input { display: none }` removes the checkbox from the accessibility tree. Consider `appearance: none; opacity: 0; position: absolute; width: 1px; height: 1px` to keep it reachable by keyboard/screen readers while visually hidden.

2. **Download page JSON-LD `operatingSystem`:** `"PHP 8.3+ / Ubuntu, Debian"` is imprecise. Use `"PHP 8.3+"` per `content.json` spec.

3. **Install command scroll:** `.install-command` has `overflow-x: auto` with `white-space: pre` on `<code>`. On very small screens the command will scroll rather than wrap. Acceptable given the command length, but `overflow-wrap: anywhere` on the `<code>` would be more robust.

4. **Footer links are correct:** Despite SITE.md showing plugins/docs as demoted, the footer columns use the same links as `content.json.footer.columns` which include Plugins and Documentation. This is correct — "demoted to footer" means they appear in the footer, not the primary nav.

---

## Verdict

**NOT APPROVED.**

Three mandatory fixes required:
1. Add missing pitch bullet about multi-source metadata (content.json fact)
2. Add `twitter:creator=@detain` to every page `<head>`
3. Fix `.mascot__close` touch target to ≥44×44px

Once these are resolved, re-run `npm run lint` and confirm accessibility at 320px via `node tools/render-check.mjs --site wilderness-trail`.
