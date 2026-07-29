# REVIEW — Quantum Stream Brand Kit Site

**Site:** `sites/quantum-stream/`
**Reviewer:** Hostile audit (13-dimension)
**Command:** `npm run lint` — ✅ PASSED (zero warnings)

---

## APPROVAL STATUS: ❌ NOT APPROVED

**Score: 65/100 — 6 critical ❌ blocking approval.**

---

## 1. Brand Fidelity & Spirit — Score: 82 ⚠️

**Citation:** `brand-kits/quantum-stream.js` lines 1–1313

The quantum theme is well-realized. Deep navy void (#0D1B2A), IBM Plex Mono typography, atom structures, probability cloud gradients, blur-on-hover "observer effect," Qubit mascot with orbital animations, steel blue accents throughout. The voice is consistently analytical/quantum: "collapse," "observe," "superposition," "decoherence." No warm tones, no earthbound metaphors.

**Deduction:** The home page nav renames 6/6 nav items with quantum branding ("Signal", "Calibrate", "Interfaces", "Install", "Relay", "System") — but the nav has only **6 items instead of the required 8**. Plugins and Docs pages exist at the correct URLs but are **not reachable from the primary nav**. The brand kit does not override `site_architecture` to document this demotion. Without documented demotion, all 8 canonical pages must be in the primary nav per `new_site.md §5`.

---

## 2. SEO — Score: 78 ⚠️

**Citations:** `index.html:6`, `download.html:6`, `features.html:6`, `clients.html:6`, `about.html:6`, `new_site.md §10`

✅ PASS (index.html): `<title>`, `<meta name="description">`, `<meta name="keywords">`, `<link rel="canonical">` all present and within limits. `<h1>` present, heading hierarchy logical.

⚠️ PARTIAL — Several pages missing `<meta name="keywords">` and `<link rel="canonical">`:
- `download.html:6` — has `<title>` and `<meta name="description>` but no `<meta name="keywords">` and no `<link rel="canonical">`
- `features.html:6` — same
- `clients.html:6` — same
- `about.html:6` — same

❌ OG/TWITTER CRITICAL — See dimension 11.

---

## 3. Readability — Score: 88 ⚠️

**Citations:** `css/theme.css:65–70`, `brand-kits/quantum-stream.js:479`

Typography is IBM Plex Mono (headlines) + IBM Plex Sans (body), self-hosted. Line-height 1.7 for body. Body copy max ~70 chars per line (verified in hero subheadline). No orphaned technical jargon in reading sections.

**Deduction:** `features.html:89` has malformed HTML entity `& collection detection` — the `&` is unencoded, which renders as `&` in the browser but is technically invalid HTML. Should be `&amp;`. This is a lint bug that the linter did not catch (htmlhint does not validate entity encoding in text nodes).

---

## 4. Spelling & Grammar — Score: 89 ⚠️

**Citation:** `features.html:89`, `index.html:196`

No spelling errors detected. Grammar is clean and quantum voice is consistent.

**Deduction:** `features.html:89` — ` collection` (with leading space) in `<li class="spec-row"> collection detection and marking</li>` is malformed text, likely a corrupted unicode character (the `&` entity issue from dimension 3).

---

## 5. Usability — Score: 82 ⚠️

**Citations:** `js/main.js:32–60`, `components.css:61–176`

- Skip link present and visible on focus ✅
- Mobile hamburger nav functional: `aria-expanded` synced, Escape closes, outside-click closes ✅
- 44×44px touch targets on nav-toggle (components.css:66–67) ✅
- Primary CTA above fold on home ✅
- Download reachable in ≤2 clicks from home ✅

**Deduction:** The Qubit mascot (`#mascot-qubit`) is `position: fixed` at `bottom: 80px; right: 80px` (components.css:923–924). At 320px viewport width, this overlaps the bottom of the hero CTA area. This is a documented trap in `new_site.md §19.11`: "A fixed companion must never cover the CTA at 320px." `render-check.mjs` would catch this.

---

## 6. Accessibility (WCAG 2.2 AA) — Score: 86 ⚠️

**Citations:** `base.css:163–168`, `components.css:61–176`, `brand-kits/quantum-stream.js:1140–1155`

- Focus ring: `0 0 0 2px var(--color-bg), 0 0 0 4px var(--color-tertiary)` — steel blue (#778DA9) on deep navy, visible ✅
- Contrast: `#E0E1DD` on `#1B263B` ≈ 12:1; `#E0E1DD` on `#0D1B2A` ≈ 14:1; all pass 4.5:1 ✅
- `prefers-reduced-motion` respected in base.css (lines 243–252) and components.css (lines 1072–1076, 1086–1092) ✅
- 44×44px min touch targets on interactive elements ✅
- 200% text zoom: layout uses fluid `clamp()` and `em` units — survives ✅

**Deduction:** The Qubit mascot's animated electron (`.qubit-idle`, components.css:1073–1076) animates continuously via `qubit-orbit` keyframes with `animation: qubit-orbit 4s linear infinite`. The `@media (prefers-reduced-motion: no-preference)` guard only applies in CSS, but the JS `initMascot()` at line 226 still adds the tip after 1500ms even under reduced motion (the tip delay is gated, but the animation itself is CSS-guarded — this is borderline).

**CRITICAL:** `features.html:89` — the malformed `&` in a `<li>` is invalid HTML which screen readers may mishandle.

---

## 7. Responsive (320→1920) — Score: 79 ⚠️

**Citations:** `base.css:145–148`, `components.css:147–176`, `theme.css:28–29`

- `max-width: var(--content-width)` (1200px) on `.container` — fluid ✅
- `clamp()` font sizes throughout ✅
- Grid uses `minmax(280px, 1fr)` (components.css:1038) ✅
- Mobile nav collapses correctly at 768px breakpoint (components.css:147) ✅

**Deduction:** The `content-grid--2col` (components.css:1042–1044) uses `minmax(360px, 1fr)` — the bare `1fr` track has an implicit `auto` minimum that new_site.md §19.12 specifically calls out as causing overflow at 320px and 200% zoom. This was a "trap" that shipped on multiple previous kits. `render-check.mjs` would fail this at 320×640.

---

## 8. Performance (self-hosted fonts, no CDNs) — Score: 95 ✅

**Citations:** `base.css:257–303`

- Fonts self-hosted as WOFF2 ✅ (`../../assets/fonts/ibm-plex-mono-*-latin.woff2`)
- `@font-face` with `font-display: swap` ✅
- No CDN links in any HTML file ✅
- `defer` on main.js ✅
- CSS is unminified in source but `npm run build` minifies ✅

**Deduction:** The `probability-pulse` keyframe animation (theme.css:885–888) runs continuously on `.hero::after`. Under `prefers-reduced-motion: reduce` it is not explicitly disabled — the `html` level reset handles it, but there's no per-element override.

---

## 9. Content Accuracy — Score: 42 ❌

**Citations:** `shared/content.json`, `download.html:54`, `about.html:59`, `about.html:71`, `index.html`, `features.html`, `new_site.md §2`

> **Rule:** Every fact must be traceable to `shared/content.json`. Presentation copy may follow the kit's voice. `new_site.md §19.22` explicitly designates the install command block as "SINGLE SOURCE OF TRUTH — do not retype or invent one."

### ❌ CRITICAL: Install command fabricated

`download.html:54`:
```html
<pre><code>bash -c "$(curl -fsSL https://get.phlix.net/quantum)"</code></pre>
```

`content.json install.primary.command`:
```
curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash
```

This is a complete invention. `new_site.md §19.22` documents that 16 of 50 first-pass sites invented their own install commands — one "worked" in testing but had the wrong URL. The `get.phlix.net/quantum` URL does not appear in any content.json path. **This is a critical content accuracy failure.**

### ❌ CRITICAL: License misstated

`about.html:59`:
```html
<p>Quantum Stream is released under the GNU General Public License v2.0 with additional terms.</p>
```

`content.json faq[5].a`: "Phlix Server and the Hub are **MPL-2.0**". The site claims GPLv2.0. These are legally distinct licenses. This fact is directly traceable to content.json and is wrong.

### ❌ CRITICAL: GitHub org fabricated

`about.html:71`:
```html
<a href="https://github.com/phlix/quantum-stream" class="path-option">
```
`content.json site.social.github`: `https://github.com/detain/phlix-server`. The correct org is `detain`, not `phlix`. The repo `phlix/quantum-stream` does not exist.

### ❌ Home page pitch bullets missing

`index.html` has hero + "Core Dimensions" (3 feature cards) + proof band + visitor paths + CTA. The **pitch bullets section ("Why Phlix?" with the 7 `pitch_bullets[]` items)** required by `new_site.md §3.1.2` is **completely absent**. This is not optional — it is a required home page section using verbatim content from content.json.

### ⚠️ Feature names don't match content.json IDs

`features.html` defines features with custom quantum names ("Neural Sync", "Adaptive Decoherence", "Quantum Relay", "Library State", "Live TV Observation") rather than the content.json `features[]` IDs and titles:

| Page card | content.json ID | content.json title |
|---|---|---|
| Neural Sync | `syncplay` | SyncPlay across the room or across the country |
| Adaptive Decoherence | `transcode` | Transcoding that picks the right quality |
| Quantum Relay | `hub` | Phlix Hub — reach any of your servers from anywhere |
| Library State | `library` | Library that organizes itself |
| Live TV Observation | `livetv` | Live TV with DVR + EPG |

The custom names may be a valid `feature_casting.angle` re-voicing if the kit specified it, but the `id` attributes on the feature cards are absent or non-matching, making them non-discoverable by the spec's `feature_casting` machinery. No `pitch_bullets`, no `ecosystem` block, no `faq` on about page (about.html uses custom Q&A).

### ⚠️ Clients don't match content.json

`clients.html` shows: Web Observer, iOS/tvOS, Android/Android TV, Windows/macOS/Linux, Roku, Smart TV/Tizen/webOS.

`content.json clients[]`: roku, tizen, windows, mobile, dlna.

The content.json has **5 clients** (Roku, Samsung Tizen, Windows, Mobile, DLNA). The site invents: Web, iOS, tvOS, Android, Android TV, macOS, Linux, Smart TV, webOS, Sony Android TV. These are **fabricated client entries** not present in content.json.

---

## 10. CTA / Funnel — Score: 85 ⚠️

**Citations:** `index.html:62–65`, `download.html:128–131`

- Primary CTA "Initialize Quantum State" → download.html ✅
- Download page has prominent install CTA ✅
- Every page ends with CTA banner ✅
- Primary CTA visible above fold ✅

**Deduction:** Download page install command is fabricated (see dimension 9) — this breaks the funnel at the most critical conversion point. Additionally, `download.html` lists "Client Downloads" with fabricated clients (Web, iOS, Android, etc.) instead of the content.json clients (Roku, Tizen, Windows, Mobile, DLNA).

---

## 11. Social Metadata (OG + Twitter) — Score: 55 ❌

**Citations:** `index.html:13–18`, `download.html`, `features.html`, `clients.html`, `new_site.md §11`, `new_site.md §19.5`

### ❌ CRITICAL: og:image references SVG — must be PNG

`index.html:17`:
```html
<meta property="og:image" content="img/og.svg">
```

`new_site.md §19.5` (known trap): "tools/check-meta.mjs rule 5 rejects an SVG og:image — several platforms will not render one. Keep og.svg as the editable source and rasterise with: `node tools/gen-og.mjs --site <slug>`"

`shared/content.json meta.og_image`: `"img/og.png"`. The site correctly has `img/og.png` in the filesystem (verified `ls img/`) but the HTML references `img/og.svg`.

### ❌ Twitter card meta absent on all pages

`new_site.md §11` requires on **every page**:
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="...">
<meta name="twitter:creator" content="@detain">
```

None of these appear on any page. Not even index.html.

### ⚠️ Missing og:tags on non-home pages

`features.html`, `clients.html`, `download.html`, `plugins.html`, `hub.html`, `about.html` all lack `og:type`, `og:title`, `og:description`, `og:url`, `og:image` tags. `new_site.md §11` says "every page `<head>`."

---

## 12. Localization — Score: 92 ✅

**Citation:** `index.html:2`, `shared/content.json site.default_locale`

- `<html lang="en">` from `site.default_locale` ✅
- All content in English ✅
- No locale-unsafe formatting detected ✅
- Logical CSS properties (`inline-start/end`) used where applicable ✅

---

## 13. Experience Fidelity — Score: 90 ✅

**Citation:** `brand-kits/quantum-stream.js` throughout

- Quantum/superposition theme fully realized: probability clouds, atom structures, orbital paths ✅
- Qubit mascot with idle orbital animation, tips, and dismiss via localStorage ✅
- Observer effect blur-on-hover (`observe-effect` class, `initObserverEffect()` in main.js) ✅
- `prefers-reduced-motion` respected (CSS + JS gating) ✅
- Visitor paths self-select fork on home (Server/Interface/Modules) ✅
- Quantum-themed microcopy: "collapse the wave function," "initialize quantum state" ✅
- Easter eggs: logo 7-clicks (wave collapse), typed "quantum" (superposition fade) ✅
- Seasonal variants declared in brand kit ✅

---

## Summary Table

| # | Dimension | Score | Status |
|---|---|---|---|
| 1 | Brand fidelity & spirit | 82 | ⚠️ |
| 2 | SEO | 78 | ⚠️ |
| 3 | Readability | 88 | ⚠️ |
| 4 | Spelling & grammar | 89 | ⚠️ |
| 5 | Usability | 82 | ⚠️ |
| 6 | Accessibility | 86 | ⚠️ |
| 7 | Responsive | 79 | ⚠️ |
| 8 | Performance | 95 | ✅ |
| 9 | Content accuracy | 42 | ❌ |
| 10 | CTA / funnel | 85 | ⚠️ |
| 11 | Social metadata | 55 | ❌ |
| 12 | Localization | 92 | ✅ |
| 13 | Experience fidelity | 90 | ✅ |

---

## Fixes Required

### P0 — Must fix (blocking)

1. **`download.html:54`** — Replace fabricated install command with `content.json install.primary.command`:
   ```
   curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash
   ```
   Remove the Docker snippet (not in content.json). The "Requires: Linux / macOS / FreeBSD / Docker" line should say "Requires: PHP 8.3+, MySQL, ffmpeg" per `content.json install.requirements`.

2. **`index.html:17`** — Change `content="img/og.svg"` to `content="img/og.png"`. Regenerate with `node tools/gen-og.mjs --site quantum-stream`.

3. **`about.html:59`** — Change license text to match `content.json faq[5].a` MPL-2.0 phrasing.

4. **`about.html:71`** — Fix GitHub URL from `https://github.com/phlix/quantum-stream` to `https://github.com/detain/phlix-server`. Also fix `forums.phlix.net` (line 75) — that domain does not exist.

5. **Add `twitter:card` meta to every page `<head>`** — Must include `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`, and `twitter:creator="@detain"`. See `new_site.md §11`.

6. **Add og:* meta to all non-home pages** — `features.html`, `clients.html`, `download.html`, `plugins.html`, `hub.html`, `about.html`, `docs.html`, `404.html` are all missing og:type, og:title, og:description, og:url, og:image.

7. **Add pitch bullets section to `index.html`** — Insert `.pitch` section with "Why Phlix?" heading and all 7 `pitch_bullets[]` from content.json, between hero and features-overview sections per `new_site.md §3.1.2`.

8. **Fix primary nav to include all 8 canonical pages** — Plugins and Docs pages exist but are not reachable from the nav. Add them back with kit-relanguage labels (e.g., "Modules" for Plugins, "Reference" for Docs). The nav must have 8 links in the canonical order: Home, Features, Clients, Download, Plugins, Docs, Hub, About.

9. **Fix footer columns** — Match `content.json footer.columns` exactly. Currently missing "Documentation" (external link) in the Developers column and "License (MPL-2.0)" in the Project column. The "License" link label must match content.json verbatim.

### P1 — Should fix

10. **`features.html:89`** — Fix malformed `&` → `&amp;` in " collection detection".

11. **`content-grid--2col`** (components.css:1042) — Change `minmax(360px, 1fr)` to `minmax(0, 1fr)` per `new_site.md §19.12` to prevent 320px overflow.

12. **`#mascot-qubit`** (components.css:923) — Check that `position: fixed; bottom: 80px; right: 80px` does not overlap CTA at 320px viewport. Move to `bottom: 16px; right: 16px` or `position: static` at mobile breakpoint.

13. **`clients.html`** — Replace the fabricated client list with the 5 actual `content.json clients[]` entries (roku, tizen, windows, mobile, dlna). The DLNA entry should show as a special card ("Any DLNA device — No install required") matching content.json.

14. **`features.html`** — Add `id` attributes to `.feature-detail` articles matching content.json feature IDs (`library`, `syncplay`, `transcode`, `auth`, `livetv`, `dlna`, `plugins`, `hub`). Add a "See all features →" link to features.html from the home page features-overview.

15. **`about.html`** — Replace custom FAQ with the 6 `content.json faq[]` items using the `.faq-list` component. The current Q&A is non-verbatim and non-matching.

### P2 — Nice to fix

16. Add `<meta name="keywords">` to `download.html`, `features.html`, `clients.html`, `about.html` from `content.json meta.keywords`.

17. Add `<link rel="canonical">` to all pages with absolute URLs.
