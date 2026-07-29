# Ricochet Site Re-Review (Post-Fix)

**Site:** `sites/ricochet/`
**Review:** Follow-up against prior `reviews/REVIEW.md` (7 ❌ findings)
**Result:** ❌ NOT APPROVED — 5 ❌ remaining, 1 critical

---

## Summary

Strong progress: install URL corrected on download.html, og.png generated, FAQ added to about.html, all 8 features present on features.html, client cards and ecosystem list added to download.html, theme.css grids fixed, and all core meta tags on primary pages. However, docs.html still carries the **fabricated install URL**, index.html still shows the **fabricated "12ms" stat**, clients.html still uses **bare `1fr` grid**, several secondary pages lack **complete Twitter metadata**, and robots.txt still **omits Sitemap**.

---

## Verification of Prior ❌ Items

### ✅ FIXED (9 items)

| # | Item | Status |
|---|------|--------|
| 1 | `download.html` install command `get.phlix.tv` | ✅ Fixed — now `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh \| sudo bash` (`download.html:72-75`) |
| 2 | `img/og.png` as PNG | ✅ Fixed — `file` confirms PNG 1200×630 (`img/og.png`) |
| 3 | `about.html` FAQ | ✅ Fixed — 6-item `<dl class="faq-list">` present (`about.html:77-101`) |
| 4 | `download.html` client cards | ✅ Fixed — 5 client cards (Roku, Samsung Tizen, Windows, Mobile, DLNA) at `download.html:176-260` |
| 5 | `download.html` ecosystem list | ✅ Fixed — 5 ecosystem items at `download.html:268-289` |
| 6 | `features.html` only 5/8 features | ✅ Fixed — all 8 present: library, syncplay, transcode, auth, livetv, dlna, plugins, hub (`features.html:73-220`) |
| 7 | Grid bare `1fr` in theme.css | ✅ Fixed — `theme.css:129` `hero-stats`, `:288` `pitch-grid`, `:352` `feature-cards` all now use `minmax(0, 1fr)` |
| 8 | `og:image` SVG | ✅ Fixed — all pages point to `og.png` |
| 9 | `about.html` og:/twitter: meta | ✅ Fixed — has og:title/description/image/url, twitter:card/title/description/image/creator (`about.html:9-17`) |

### ❌ STILL BROKEN (5 items)

| # | File | Issue | Evidence |
|---|------|-------|----------|
| 1 | `docs.html:82` | **Fabricated install URL** — `curl -sSL https://get.phlix.tv \| bash` | Should be `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh \| sudo bash` |
| 2 | `index.html:185` | **Fabricated hero stat** — "12ms average response time" | Not in content.json; fabricated claim |
| 3 | `clients.html:104` | **Bare `1fr` grid** — `repeat(3, 1fr)` | Should be `repeat(3, minmax(0, 1fr))` |
| 4 | `clients.html:12-14` `plugins.html:12-13` `hub.html:12-13` | **Incomplete Twitter metadata** — missing `twitter:description` and `twitter:image` | `new_site.md §19.4` requires all pages have complete og: + twitter: |
| 5 | `robots.txt` | **Missing Sitemap directive** | Should include `Sitemap: https://detain.github.io/phlix-website/ricochet/sitemap.xml` |

---

## 13-Dimension Full Audit

### 1. Brand Fidelity & Spirit — Score: 78 ⚠️

✅ Spark particles, trajectory SVG, muzzle flash, bullet-pulse animations, penetration-edge cards, speed-line backgrounds, crimson glow on featured card — all match kit DNA.
✅ Brand kit `minmax(0, 1fr)` fix applied to theme.css.
⚠️ `clients.html:104` — `.clients-grid` still uses bare `1fr` instead of `minmax(0, 1fr)` — not in theme.css so missed in the grid fix pass.

### 2. SEO — Score: 72 ⚠️

✅ All primary pages (index, features, download, about) have complete og: + twitter: meta.
✅ Canonical URLs absolute on all pages.
✅ `robots.txt:2` allows `/`.
❌ `robots.txt` missing `Sitemap:` directive.
❌ `clients.html:12-14` — `twitter:description` and `twitter:image` absent.
❌ `plugins.html:12-13` — `twitter:description` and `twitter:image` absent.
❌ `hub.html:12-13` — `twitter:description` and `twitter:image` absent.
❌ `docs.html:14-15` — `twitter:description` and `twitter:image` present but description is generic "Complete documentation for Phlix media server." — may lack specificity.

### 3. Readability — Score: 88 ⚠️

✅ Typography well-set with proper hierarchy and line-heights.
✅ Body `max-width: 65ch`, code blocks use Share Tech Mono.
⚠️ `pitch-desc` at 0.8125rem (13px) on 7-column grid at tablet sizes — compressed.

### 4. Spelling & Grammar — Score: 90 ⚠️

✅ No obvious spelling errors.
⚠️ `index.html:185` — "12ms average response time. Your library loads before you finish clicking." — fabricated claim per Content Accuracy.
⚠️ `docs.html:82` — fabricated install command still present.

### 5. Usability — Score: 74 ⚠️

✅ Copy button on `download.html:77` now copies correct command.
✅ Download page has client cards (Roku, Tizen, Windows, Mobile, DLNA).
✅ Download page has ecosystem list (5 items).
⚠️ `clients.html` client cards have `href="#"` — dead links.
⚠️ `docs.html:82` — wrong install command in documentation.

### 6. Accessibility (WCAG 2.2 AA) — Score: 88 ⚠️

✅ Skip link, aria-expanded, aria-current, prefers-reduced-motion all properly wired.
✅ Focus ring visible on keyboard nav via `.keyboard-nav *:focus`.
⚠️ `clients.html` dead-link buttons (`href="#"` on client cards) — no `aria-disabled` or `role="button"`.

### 7. Responsive (320→1920) — Score: 76 ⚠️

✅ `theme.css:129` hero-stats: `repeat(4, minmax(0, 1fr))` — fixed.
✅ `theme.css:288` pitch-grid: `repeat(7, minmax(0, 1fr))` — fixed.
✅ `theme.css:352` feature-cards: `repeat(2, minmax(0, 1fr))` — fixed.
✅ `download.html` all grids use `minmax(0, 1fr)`.
❌ `clients.html:104` — `.clients-grid` uses `repeat(3, 1fr)` (bare `1fr`). At 320px with 7px gaps × 2 = 14px + 48px padding = 62px, 258px / 3 = 86px per column. Passes min-width, but 200% text zoom could compress below minimum.
⚠️ `docs.html:133` — `240px 1fr` sidebar uses bare `1fr`. At narrow widths this may cause overflow.

### 8. Performance (self-hosted fonts, no CDNs) — Score: 85 ⚠️

✅ No Google Fonts CDN, no icon font CDN, no external JS CDN.
✅ All JS self-hosted, scripts at end of body.
⚠️ No `@font-face` declarations found. Fonts may be falling back to system fonts (Impact, sans-serif).

### 9. Content Accuracy (install from content.json) — Score: 60 ⚠️

✅ `download.html:72-75` — correct install command with `sudo bash`.
✅ `download.html:112` — correct install command in option card.
✅ All 5 client cards present with real GitHub links.
✅ All 5 ecosystem items present.
✅ All 8 features from content.json present on features.html.
✅ FAQ with 6 items on about.html.
❌ `index.html:185` — "12ms average response time. Your library loads before you finish clicking." — **fabricated**. Not in content.json.
❌ `docs.html:82` — `curl -sSL https://get.phlix.tv | bash` — **still the wrong URL**. This is the same fabricated domain from the original review.

### 10. CTA / Funnel — Score: 85 ✅

✅ Primary CTA "Fire It Up" above fold on home.
✅ Download page shows client cards and ecosystem.
✅ CTA copies correct install command.
⚠️ `docs.html:82` — documentation page shows wrong install command.

### 11. Social Metadata (OG + Twitter, og:image PNG) — Score: 82 ⚠️

✅ `og:image` is PNG on all 8 pages (was SVG, now fixed).
✅ All primary pages (index, features, download, about) have complete og: + twitter: meta.
❌ `clients.html:12-14` — missing `twitter:description`, `twitter:image`.
❌ `plugins.html:12-13` — missing `twitter:description`, `twitter:image`.
❌ `hub.html:12-13` — missing `twitter:description`, `twitter:image`.
❌ `404.html` — no og: or twitter: meta at all.

### 12. Localization — Score: 95 ✅

✅ `<html lang="en">` set on all pages.
✅ All user-facing strings trace to content.json (with brand overlay).
✅ No hard-coded locale-unsafe formatting.

### 13. Experience Fidelity — Score: 85 ✅

✅ Spark particle canvas overlay, trajectory SVG, bullet-pulse animations, speed-line backgrounds, muzzle flash, penetration ragged-edge cards, crimson glow on featured card, teal bounce-point markers, bounce spring keyframes, dark navy backgrounds, Electric Orange CTA, prefers-reduced-motion respected.
✅ Brand kit grid fix applied (minmax).
⚠️ "12ms" fabricated stat in pitch section is out of place in an otherwise honest product description.

---

## Remaining Defects (Must Fix Before Approval)

### 🔴 Critical

1. **`docs.html:82`** — Install command: `curl -sSL https://get.phlix.tv | bash` is the **fabricated URL**. Must be:
   ```
   curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash
   ```

### 🟠 Major

2. **`index.html:185`** — "12ms average response time" is **fabricated** (not in content.json). Remove or replace with verifiable content.

### 🟡 Minor

3. **`clients.html:104`** — `.clients-grid { grid-template-columns: repeat(3, 1fr); }` → change to `repeat(3, minmax(0, 1fr))`.

4. **`clients.html:12-14`**, **`plugins.html:12-13`**, **`hub.html:12-13`** — Add `twitter:description` and `twitter:image` meta tags per `new_site.md §19.4`.

5. **`robots.txt`** — Add `Sitemap: https://detain.github.io/phlix-website/ricochet/sitemap.xml`.

---

## Final Verdict

**NOT APPROVED**

Significant improvement from the first review — 9 of 15 flagged items are now fixed. However, the **fabricated install URL persists in docs.html** (the same `get.phlix.tv` domain that was correctly fixed on download.html and index.html), a **fabricated hero stat** (12ms) remains on index.html, and several secondary pages lack complete social metadata. The critical blockers are few but real.

The brand aesthetics, install command on download page, FAQ, features page, client cards, ecosystem list, and og:image PNG are all now correct. Fix the 5 remaining issues and this site is ready for master.
