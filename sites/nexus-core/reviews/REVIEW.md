# Nexus Core — Brand Kit Site Review

**Site:** `sites/nexus-core/`
**Review date:** 2026-07-29
**Lint status:** PASS (zero warnings)

---

## Summary

**NOT APPROVED.** Multiple critical defects across content accuracy, social metadata, page completeness, and SEO.

---

## Dimension Scores

| # | Dimension | Score | Status |
|---|-----------|-------|--------|
| 1 | Brand fidelity & spirit | 85 | ⚠️ |
| 2 | SEO | 60 | ❌ |
| 3 | Readability | 88 | ⚠️ |
| 4 | Spelling & grammar | 95 | ✅ |
| 5 | Usability | 78 | ⚠️ |
| 6 | Accessibility | 82 | ⚠️ |
| 7 | Responsive | 85 | ⚠️ |
| 8 | Performance | 90 | ✅ |
| 9 | Content accuracy | 55 | ❌ |
| 10 | CTA / funnel | 80 | ⚠️ |
| 11 | Social metadata | 50 | ❌ |
| 12 | Localization | 90 | ✅ |
| 13 | Experience fidelity | 85 | ⚠️ |

---

## Critical Defects (must fix)

### ❌ D1 — Content Accuracy (score: 55)

**install command is fabricated** — `download.html:54`
```html
<code>curl -sSL https://phlix.io/install | bash</code>
```
content.json `install.primary.command`:
```
curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash
```
The fabricated `phlix.io/install` URL does not exist and would fail. This is a direct content.json violation.

**Wrong port** — `download.html:75`
```
http://your-server:8080
```
content.json says port **8096** (HAProxy on :80/:443, server on :8096).

**Wrong client highlights throughout clients.html** — `clients.html:51-147`

content.json clients[].highlights are the canonical source of truth:
- **Roku**: `["HLS playback", "Hub mode", "Skip intro/outro", "SyncPlay"]` — site shows fabricated `["4K HDR10+ playback", "SyncPlay support", "Private listening", "Voice search"]`
- **Samsung Tizen**: `["Vanilla JS + webpack", "Direct play + HLS transcoded", "Remote-optimized UI"]` — site shows `["4K UHD playback", "Dolby Vision", "AirPlay 2 support", "Smart Things integration"]`
- **Windows**: `["Electron + React + TypeScript", "System tray", "Media keys", "Hub mode"]` — site shows `["Full hardware acceleration", "Local file support", "SyncPlay client", "Desktop notifications"]`
- **Mobile**: `["Movies, TV, Music, Photos", "Offline downloads", "Token refresh"]` — site shows `["Cast support", "Offline downloads", "Hardware decoding", "Gesture controls"]`

**Wrong repo URL** — `download.html:93`
```html
href="https://github.com/detain/phlix-client-windows/releases"
```
Should be `phlix-windows-client`, not `phlix-client-windows`. See content.json ecosystem[2].

**Wrong client count** — `index.html:250`
```html
<span class="proof-value">5</span>
<span class="proof-label">Native clients</span>
```
content.json defines **4 native clients** (Roku, Tizen, Windows, Mobile) **plus any DLNA device** — not 5. Two kits stated "5" and both were wrong per new_site.md §19.14.

### ❌ D2 — SEO (score: 60)

**Missing canonical URL on all pages** — No `<link rel="canonical">` on any page.

**Sitemap missing pages** — `sitemap.xml` lists only 6 pages but 8 exist:
- Missing: `plugins.html`, `docs.html`

**Duplicate content signals** — `features.html:44` uses heading "What the nexus unlocks" which matches content.json `section_headings.pitch` but is used here instead of on index.html where it belongs per kit's `copy_overlay.section_headings.pitch`.

### ❌ D11 — Social Metadata (score: 50)

**og.png is missing** — `img/` contains only `og.svg` (SVG) and `favicon.svg`. new_site.md §11 and §19.5 explicitly require `og.png` (1200×630 raster PNG). `tools/check-meta.mjs` rule 5 rejects SVG og:image — several platforms will not render one.

**Multiple pages missing all social metadata** — `about.html`, `hub.html`, `plugins.html`, `404.html` have **no** og:image, og:url, og:type, og:site_name, twitter:card, twitter:title, twitter:description, twitter:image.

**Inconsistent og:url** — `features.html:11` has `https://detain.github.io/phlix-website/nexus-core/features.html` but `clients.html` lacks og:url entirely.

---

## High-Priority Defects

### ⚠️ D1 — Nav structure (score impact: content accuracy)

**Only 6 nav items instead of 8** — `index.html:57-64`, `features.html:29-36`, etc.

Required per site_architecture.nav: Home, Features, Clients, Download, Plugins, Docs, Hub, About.

Current nav omits **Plugins** and **Docs** entirely. Footer and sitemap also lack these links.

### ⚠️ D6 — Accessibility

**404.html missing `noindex` meta** — new_site.md §2A: "Add `<meta name="robots" content="noindex">`." Present on 404.html? **NO.**

**Keyboard trap in overlay easter eggs** — `main.js:154-165` and `main.js:208-214` add `keydown` listener that only removes itself on `Escape`. Multiple overlays can layer and the listener management becomes confused when dismissDiffraction() is called from two different paths.

**Focus-visible not present on `.mascot-dismiss`** — `components.css:689-695` defines `.mascot-dismiss` with cursor pointer but no focus style. User cannot tab to it.

### ⚠️ D10 — CTA / Funnel

**Primary CTA in download.html goes to `#server` anchor but no install snippet from content.json** — The install command shown is the fabricated one (see content accuracy above). Even with the correct URL, no `code-block` with the real command exists.

**"Coming Soon" CTAs on download.html** — Roku, Samsung TV, Android, iOS all show `#` href with "Coming Soon" button. Should use content.json client `store_url` or link to real release pages.

### ⚠️ D5 — Usability

**Seasonal banner occupies space when active** — `components.css:708-717` but `.seasonal-banner` has `display: none` by default. When activated, it doesn't shift `.site-header` down — it overlays the header because header is `position: sticky`. Affects nav accessibility at narrow widths.

---

## Medium-Priority Observations

### ⚠️ Brand fidelity

**Logo uses `<text>` element** — `img/logo.svg:21` uses `<text>` for "PHLIX" word. Kit's logo_rules specify "Wordmark in Orbitron" — SVG text is not self-contained and depends on system fonts. Should be paths.

**Mascot Orb tip shows for all visitors** — `main.js:241-242` shows tip for 1500ms on load regardless of user preference. Kit's mascot behavior says tips are part of idle animation which should be disabled under reduced-motion, but there's no check before the 1500ms timeout.

**Dual easter egg triggers share same counter** — Logo egg at 5 clicks (`main.js:136`) and mascot egg at 3 clicks (`main.js:266`) are separate but the mascot one uses a separate counter. This is per spec but noted as potentially confusing.

### ⚠️ Responsive

**`.proof-band` at 320px** — `components.css:418-423` uses `flex-wrap: wrap` and `gap: var(--space-8)` but doesn't set a minimum item width. At 320px the 6 proof-items will likely overflow.

**`content-grid--2col` uses `1fr`** — `components.css:401` uses bare `1fr` which new_site.md §19.12 says causes overflow at narrow widths. Should be `minmax(0, 1fr)`.

### ⚠️ Performance

**Fonts not verified to exist** — base.css references `../../assets/fonts/exo-2-300-latin.woff2` etc. Files exist in `shared/assets/fonts/` but the path `../../assets/fonts/` from `sites/nexus-core/css/` resolves to `phlix-website/assets/fonts/` — which does not exist at that relative path. Actual fonts are in `phlix-website/shared/assets/fonts/`. The path should be `../../../shared/assets/fonts/` or the assets should be copied.

---

## Required Fixes

1. **Generate `og.png`** via `node tools/gen-og.mjs --site nexus-core` (requires librsvg2-bin) per new_site.md §19.5.

2. **Replace install command** in download.html with verbatim from content.json `install.primary.command`.

3. **Fix port** in download.html from 8080 to 8096.

4. **Replace all client highlights** in clients.html with content.json `clients[].highlights` verbatim.

5. **Fix Windows repo URL** from `phlix-client-windows` to `phlix-windows-client`.

6. **Add Plugins and Docs** to nav, footer, and sitemap.xml.

7. **Add `og.png` meta to all pages** (absolute URL: `https://detain.github.io/phlix-website/nexus-core/img/og.png`).

8. **Add `og:url`, `og:site_name`, `og:type`** to all pages.

9. **Add `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`** to all pages (except 404.html which is noindex).

10. **Add canonical URL** to all pages.

11. **Add `<meta name="robots" content="noindex">`** to 404.html.

12. **Fix font paths** in base.css — change `../../assets/fonts/` to `../../../shared/assets/fonts/`.

13. **Fix `content-grid--2col`** from `1fr` to `minmax(0, 1fr)`.

14. **Fix proof-band "5"** to "4" for native clients.

---

## Verdict

**NOT APPROVED.** Content accuracy failures (fabricated install command, wrong client highlights, wrong port) are hard gates. Social metadata missing on 5 of 9 pages. Missing required pages (docs.html doesn't exist, plugins.html missing from sitemap/nav). Font paths likely broken.

Fix all ❌ items before re-review.
