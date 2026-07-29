# Hostile Review — digital-combat-zone

**Reviewer:** Adversarial audit
**Date:** 2026-07-28
**Site:** `sites/digital-combat-zone/`
**Kit:** `brand-kits/digital-combat-zone.js`
**Ground truth:** `shared/content.json`, `new_site.md`, `brand_kit_schema.js`

---

## Summary

Severe defects found in **content accuracy**, **SEO/social metadata**, **navigation structure**, and **FAQ integrity**. Linter passes CSS/JS/HTML individually, but the combination violates shared/content.json contracts and new_site.md structural requirements. This site requires significant rework before approval.

---

## 1. Brand Fidelity & Spirit — Score: 78 ⚠️

**Verdict:** Mostly faithful. Colors, fonts, voice, and motion match the kit. Signature elements (glitch text, combat cards, speed lines, glow effects) are present. Brand opposites list is respected (no calm/soft/quiet language). One minor concern:

- `index.html:332` — The briefing section body text says "Every frame is a knockout. Every transition is an uppercut." This phrase appears verbatim in the kit's `story` field. While not a `do_dont.dont` violation, it reads as unoriginal framing rather than a fresh brand voice expression.

**Citation:** `index.html:332-338`

---

## 2. SEO — Score: 62 ❌

Multiple pages lack required meta fields:

| Page | Missing `og:description` | Missing `twitter:*` | Notes |
|------|--------------------------|---------------------|-------|
| `features.html` | NO | YES | Has og:description |
| `clients.html` | NO | YES | — |
| `download.html` | YES | YES | Critical - no description at all |
| `plugins.html` | YES | YES | — |
| `docs.html` | YES | YES | — |
| `hub.html` | YES | YES | — |
| `about.html` | YES | YES | — |

**`og:image` is SVG, not PNG:**
- `index.html:26` — `content="https://detain.github.io/phlix-website/digital-combat-zone/img/og.svg"` — new_site.md §19.5 explicitly rejects SVG; must be PNG.
- Same issue on `features.html:18`, `clients.html:15`, `plugins.html:13`, `docs.html:13`, `hub.html:13`, `about.html:13`.

**`404.html` must have `noindex`:**
- `404.html:7` — Missing `<meta name="robots" content="noindex">`. Required per new_site.md §2A.

**Canonical present on all pages:** ✅
**JSON-LD on home:** ✅
**sitemap.xml and robots.txt:** ✅

**Fixes needed:**
1. Regenerate `og.png` from `og.svg` using `node tools/gen-og.mjs --site digital-combat-zone`
2. Update all meta tags to point to `img/og.png` (absolute URL)
3. Add missing `og:description` and complete `twitter:*` to every page
4. Add `noindex` to `404.html`

---

## 3. Readability — Score: 85 ⚠️

Line length is acceptable (max-width: 1400px with fluid containers). Body text is 0.9–1rem on dark backgrounds. Contrast is generally good.

**Concern:**
- `features.html:64` — "Every feature built for one purpose: making your media fight for your attention." — This is a presentation overlay from the kit voice, not a fact from content.json. This is acceptable per new_site.md §2, but it's a thin line between re-voicing and inventing.

No walls of text detected. Hierarchy is clear.

---

## 4. Spelling & Grammar — Score: 92 ✅

No typos detected. Tense is consistent (present tense, active voice). The kit's `avoid_words` (cozy, calm, gentle, relaxed, soft, quiet, subtle, peaceful) are not used in body copy.

---

## 5. Usability — Score: 58 ❌

**Primary CTA reachable in 1 click:** ✅ (hero → download.html)

**Navigation structure violates new_site.md §5:**
- Primary nav has only **6 links**: The Arena, Evidence Files, The Network, Get Access, Reach Anywhere, Combat Logs
- Required 8 links per new_site.md §5: Home · Features · Clients · **Plugins** · **Docs** · Download · Hub · About
- **Docs** and **Plugins** are missing from primary nav entirely — they only appear in footers
- Per new_site.md: "Primary nav (8 links, in order)"

**Mobile nav toggle accessibility:**
- `index.html:290-297` — The toggle button uses `aria-controls="main-nav"` but the `<nav>` has no `id="main-nav"`. The nav menu `<ul>` has no id at all. This means `aria-controls` points to nothing.

**No keyboard trap detected** ✅
**No timeout issues** ✅

---

## 6. Accessibility — Score: 75 ⚠️

**Contrast ratios (spot check):**
- Primary text (#F5F5F7) on background (#16213E): ~12.5:1 ✅
- Neutral text (#A0A0B0) on surface (#0F0F1A): ~4.8:1 ✅
- Tertiary/cyan (#00D9FF) on dark backgrounds: sufficient ✅

**`prefers-reduced-motion`:** Implemented in CSS (base.css:23-36, theme.css:629-654) and JS (main.js:51, 140, 195, 222, 271). The speed-lines animation is properly suppressed under reduced motion. ✅

**Focus indicators:** Cyan (#00D9FF) with 2px offset and box-shadow — visible and on-brand. ✅

**Missing `aria-label` on footer headings:**
- `index.html:842` — `<h3>Product</h3>` should have `aria-label="Footer navigation - Product"` or similar for landmark comprehension.

**Touch targets:** Buttons are ≥44px tall. ✅

**200% text zoom:** Layout survives without clipping. ✅

**Keyboard navigation:** Mostly works, but the `aria-controls` mismatch on nav toggle (noted above) could confuse screen readers.

---

## 7. Responsive — Score: 88 ⚠️

Grid uses `minmax(0, 1fr)` per new_site.md §19.12 — correctly preventing overflow. ✅

**Minor layout concern at 320px:**
- `theme.css:1176-1189` — `.header-inner` at 380px and below uses 3px padding. The site wordmark may crowd the nav toggle at very narrow widths.

No horizontal scroll detected. Mobile menu is implemented (though with the aria-controls bug noted above).

---

## 8. Performance — Score: 95 ✅

**Fonts self-hosted:** ✅ All @font-face declarations point to `../../assets/fonts/` WOFF2 files (bebas-neue, exo-2 variants, share-tech-mono). Files confirmed present in shared pool.

**No CDN dependencies:** ✅ No Google Fonts, no icon CDNs, no external scripts.

**JS is deferred:** `index.html:907` — `<script src="js/main.js"></script>` (not `defer` attribute — but scripts at end of body are non-blocking equivalent).

**Lazy loading:** No images on most pages (SVG icons inline). OG image is external.

**CLS budget:** Fonts use `font-display: swap`. No layout shift expected.

---

## 9. Content Accuracy — Score: 35 ❌

**CRITICAL — Install command is completely wrong:**
- `download.html:58` — Shows `curl -sSL https://get.phlix.cloud | bash`
- **Required** (from `shared/content.json`): `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`
- These are entirely different URLs/scripts. This is not a re-voicing — this is a fabricated install command.

**Wrong requirements text:**
- `download.html:59` — "Requires PHP 8.3+, MySQL/MariaDB. Runs on Linux, macOS, Windows WSL."
- content.json says: "PHP 8.3+, MySQL, ffmpeg. The installer targets a fresh Ubuntu/Debian host..."
- **MariaDB is not in content.json** (it says MySQL)
- **FFmpeg is missing** from the site
- **"Runs on Linux, macOS, Windows WSL"** — not in content.json

**FAQ answers are not from content.json:**
- `about.html:89-117` — Custom questions AND custom answers that don't match `shared/content.json/faq[]`
- content.json[0].q: "Is Phlix like Plex / Jellyfin / Emby?" — about.html uses "What makes Phlix different from Plex or Jellyfin?" (re-phrased)
- content.json[1].q: "Do I need to expose my server to the internet?" — not present at all
- content.json[5].q: "What's the license?" — **completely missing** from about.html FAQ
- Per new_site.md §2: "all facts stay traceable to content.json" and FAQ answer substance must match
- Per new_site.md §2: "extra_questions as re-phrasings that **map to** existing canonical answers (`maps_to`) — no new facts"

**Proof stats fabricated:**
- `index.html:691-692` — "5 Native Clients" — The actual count per content.json is **4 native clients** (Roku, Samsung Tizen, Windows, Mobile) + any DLNA device. Two kits already tried to claim "5" and were wrong per new_site.md §19.14 table.

**Footer license text deviation:**
- `index.html:886-888` — "Site built on the MPL-2.0 licence." — This is not the wording from content.json footer.columns[2].links[3].label which is "License (MPL-2.0)". The site's version is factually different and potentially confusing (it says the *site* is built on MPL-2.0, not the software).

---

## 10. CTA / Funnel — Score: 80 ⚠️

**Primary CTA above fold:** ✅
**Primary CTA uses combat-red (#FF3E3E):** ✅
**≥3:1 contrast ratio on primary CTA:** ✅ (#FF3E3E on #16213E ≈ 5.2:1)

**Secondary CTA de-emphasized:** ⚠️
- `index.html:319` — "Study the Fight Card" links to features.html. It's styled as `btn-secondary` (cyan outline). This is appropriate.

**Download in ≤2 clicks:** ✅

---

## 11. Social Metadata — Score: 45 ❌

Per new_site.md §11, **every page** needs:
- `og:type=website` ✅
- `og:site_name=Phlix` — only on index.html
- `og:url` (absolute) — only on index.html
- `og:title` — mostly present
- `og:description` — **missing on download, plugins, docs, hub, about**
- `og:image` (absolute) — points to SVG (should be PNG)
- `twitter:card=summary_large_image` — mostly present
- `twitter:title` — mostly present
- `twitter:description` — **missing on features, download, plugins, docs, hub, about**
- `twitter:image` — mostly present, points to SVG
- `twitter:creator=@detain` — only on index.html

**og:image issue:**
- new_site.md §19.5: "tools/check-meta.mjs rule 5 rejects an SVG og:image — several platforms will not render one"
- All pages use `img/og.svg` instead of `img/og.png`

---

## 12. Localization — Score: 95 ✅

`<html lang="en">` on all pages. ✅ All user-facing strings trace back to content.json or kit voice (acceptable per §2). No hard-coded locale-unsafe formatting.

---

## 13. Experience Fidelity — Score: 55 ❌

**`site_architecture` — Navigation model violation:**
- Kit declares `navigation_model.mode: "topbar-fight-hud"` with 8 nav links
- Site has only 6 links in primary nav — **Plugins and Docs are demoted to footer only** without kit authorization
- new_site.md §5 is clear: "Primary nav (8 links, in order)" — this is not a kit opt-in, it's the baseline contract

**`homepage_narrative` — Not implemented:**
- Kit specifies `sections: [hero→explosive-hero, pitch→speed-lines, features→card-grid, cta-banner→impact-banner]`
- The homepage does have these sections but the **content is wrong** (wrong install command in implied CTA area, fabricated proof stats, non-standard FAQ)

**`page_blueprints` / `feature_casting`:**
- `features.html` — Only shows 4 features (SyncPlay, Library, Transcoding, User Profiles) in the main grid, but all 8 features should appear per content.json. The remaining 4 are listed in the combat-board but there's no "See all features" link from the home page to features.html — wait, actually there is at `index.html:675`. The home page feature grid shows only 2 features (SyncPlay and Library as "Knockout Moves") which is intentional per kit's `feature_casting.hero` — this is acceptable.

**Wrong heading hierarchy on features.html:**
- `features.html:69-113` — Feature cards use `<h2 class="feature-title">` but the parent section already has `<h1 id="features-title">`. This violates WCAG 2.4.6 (headings describe topic/purpose) and creates invalid document structure (h2 siblings of h1 not in aside/section). Should be `<h3>`.

**Duplicate SVG symbol IDs on features.html:**
- `features.html:30-31` — `<symbol id="i-shield">` is defined TWICE (lines 30 and 37). The second definition (line 37) is dead code and creates ID collision. Only one should exist.

---

## Fixes Required (Priority Order)

### P0 — Content accuracy (blocking)
1. **`download.html:58`** — Replace `curl -sSL https://get.phlix.cloud | bash` with the exact command from `content.json`: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`
2. **`download.html:59`** — Fix requirements to match content.json: "PHP 8.3+, MySQL, ffmpeg. The installer targets a fresh Ubuntu/Debian host and also compiles the Swoole and php-uv extensions from source."
3. **`about.html`** — Replace FAQ with verbatim questions and answers from `content.json/faq[]`. Include "What's the license?" question. Do not re-phrase or omit.
4. **`index.html:692`** — "5 Native Clients" is wrong. Change to "4 Native Clients" or remove the stat entirely. Per new_site.md §19.14 table: content.json wins on facts.

### P1 — Navigation structure (blocking)
5. **`index.html:280-287`** — Add `<li><a href="plugins.html" ...>Plugins</a></li>` and `<li><a href="docs.html" ...>Docs</a></li>` to the primary nav. Maintain order: Home · Features · Clients · Download · Plugins · Docs · Hub · About.

### P2 — Social metadata (blocking)
6. **All pages** — Regenerate `og.png` using `node tools/gen-og.mjs --site digital-combat-zone`
7. **All pages** — Update `og:image` meta to point to `img/og.png` (absolute URL)
8. **features, clients, download, plugins, docs, hub, about** — Add missing `og:description` and complete `twitter:*` tags

### P3 — Accessibility
9. **`index.html:294`** — Add `id="main-nav"` to the `<nav class="main-nav">` element so `aria-controls="main-nav"` on the toggle button works
10. **`404.html:7`** — Add `<meta name="robots" content="noindex">`

### P4 — Minor issues
11. **`features.html:69-113`** — Change `<h2 class="feature-title">` to `<h3 class="feature-title">` inside all `.feature-card` elements
12. **`features.html:37`** — Remove the duplicate `<symbol id="i-shield">` definition
13. **`index.html:886-888`** — Restore footer license link text to match content.json verbatim: "License (MPL-2.0)" not the para-phrased version
14. **`index.html:332-338`** — Consider replacing "Every frame is a knockout. Every transition is an uppercut." with a fresher brand-original expression

---

## Conclusion

**NOT APPROVED** — Score: 68/100 with multiple ❌ dimensions.

The site has strong brand execution (colors, typography, motion, voice all trace to the kit correctly) and passes the linter. However, **content accuracy failures on install commands, FAQ, and proof stats** are hard gates per new_site.md §18. The navigation structure deviation removes Docs and Plugins from the primary nav, which violates the baseline contract. Social metadata is incomplete on most pages and uses SVG instead of PNG for og:image.

This site cannot be approved without fixing P0 and P1 items.
