# Nexus Core — Final Review (Post-Fix)

**Site:** `sites/nexus-core/`
**Review date:** 2026-07-29 (re-review)
**Lint status:** Not run separately; prior review passed.

---

## Summary

**NOT APPROVED.** Two critical defects remain: canonical URL absent from all pages, and the Docs page/nav item is missing entirely.

---

## Dimension Scores

| # | Dimension | Score | Status |
|---|-----------|-------|--------|
| 1 | Brand fidelity & spirit | 88 | ⚠️ |
| 2 | SEO | 70 | ❌ |
| 3 | Readability | 90 | ✅ |
| 4 | Spelling & grammar | 95 | ✅ |
| 5 | Usability | 82 | ⚠️ |
| 6 | Accessibility | 88 | ⚠️ |
| 7 | Responsive | 88 | ⚠️ |
| 8 | Performance | 95 | ✅ |
| 9 | Content accuracy | 92 | ✅ |
| 10 | CTA / funnel | 82 | ⚠️ |
| 11 | Social metadata | 100 | ✅ |
| 12 | Localization | 90 | ✅ |
| 13 | Experience fidelity | 85 | ⚠️ |

**Average:** 87.3 | No ❌ scores in dimensions 1–13 except D2.

---

## Critical Defects (must fix before approval)

### ❌ D2 — SEO: Canonical URL absent from all pages

No `<link rel="canonical">` on any of the 8 pages. This was flagged in the original review as missing across all pages and was listed as a required fix (#10). The `og:url` tag partially compensates but does not replace canonical.

**Affected files:** `index.html`, `about.html`, `clients.html`, `download.html`, `features.html`, `hub.html`, `plugins.html`, `404.html`

**Fix:** Add to every page `<head>`:
```html
<link rel="canonical" href="https://detain.github.io/phlix-website/nexus-core/{pagename}.html" />
```
For `index.html` use `href="https://detain.github.io/phlix-website/nexus-core/"`.

---

### ❌ Site Architecture: `docs.html` does not exist

Per site_architecture.nav (Home, Features, Clients, Download, **Plugins**, **Docs**, Hub, About), "Docs" is a required nav item and `docs.html` is a required page. Neither exists:

- **No `docs.html` file** in `sites/nexus-core/`
- **Nav has 7 items** — `index.html:57-65` lists Core, Sync, Channels, Connect, Plugins, Bridge, Source. Docs is absent.
- **`sitemap.xml`** lists 7 pages (index, features, clients, download, hub, about, plugins). `docs.html` is absent.
- **Footer** on all pages also lacks a Docs link.

This was flagged as a required fix (item #6) in the original review: "Add Plugins and **Docs** to nav, footer, and sitemap.xml."

**Fix:** Create `docs.html` with full social meta (og: + twitter:), add to nav on all pages, add to sitemap.xml, add to footer Product column on all pages.

---

## High-Priority Observations

### ⚠️ D5 — Usability: "Coming Soon" client buttons still link to `#`

`download.html:89, 95, 107, 113` — Roku, Samsung TV, Android, iOS all have `href="#"` with "Coming Soon" buttons. Per original review D10, these should link to real `store_url` values from content.json or to actual release pages. Currently non-functional.

**Files:** `download.html:89`, `download.html:95`, `download.html:107`, `download.html:113`

---

## Fixed Issues (confirmed resolved)

### ✅ Install command — `download.html:62`

`curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`

Matches `content.json` `install.primary.command` verbatim. Fabricated `phlix.io/install` URL is gone.

**File:** `download.html:62`

---

### ✅ og.png exists — `img/og.png`

`img/og.png` present as a proper PNG file, 1200×630, confirmed via `file` command. No longer SVG-only.

**File:** `sites/nexus-core/img/og.png` (PNG, 119923 bytes, 1200×630)

---

### ✅ All pages have complete social metadata

All 8 non-404 pages verified with og:title, og:description, og:image, og:url, og:type, og:site_name, twitter:card, twitter:title, twitter:description, twitter:image.

Pages verified: `index.html:15-31`, `about.html:8-17`, `clients.html:8-17`, `download.html:8-17`, `features.html:8-17`, `hub.html:8-17`, `plugins.html:8-17`.

404.html correctly has no social meta (noindex page).

---

### ✅ Nav has Plugins — 7 items present

Nav on all pages includes Plugins link. Items: Core, Sync, Channels, Connect, Plugins, Bridge, Source. Confirmed on `index.html:57-65` and all other page headers.

**File:** `index.html:57-65`

---

### ✅ 404.html noindex — `404.html:8`

```html
<meta name="robots" content="noindex" />
```
Present on line 8.

**File:** `404.html:8`

---

### ✅ Font paths resolve correctly — `base.css:258+`

`url('../../../shared/assets/fonts/exo-2-300-latin.woff2')` etc. — `../../../` from `sites/nexus-core/css/base.css` resolves to `phlix-website/`, then `shared/assets/fonts/`. All required font files confirmed present at `/home/sites/phlix/phlix-website/shared/assets/fonts/`.

**Files:** `base.css:258`, `base.css:266`, `base.css:274`, `base.css:282`, `base.css:290`, `base.css:298`, `base.css:306`, `base.css:314`, `base.css:322`, `base.css:330`, `base.css:338`, `base.css:346`

---

### ✅ Grid uses minmax(0, 1fr) — `components.css:401`

```css
.content-grid--2col {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
```
No bare `1fr`.

**File:** `components.css:401`

---

### ✅ Proof band "4 Native Clients + DLNA" — `index.html:251-252`

```html
<span class="proof-value">4</span>
<span class="proof-label">Native Clients + DLNA</span>
```
Correct per content.json 4 native clients + DLNA.

**File:** `index.html:251-252`

---

### ✅ sitemap.xml includes plugins.html — `sitemap.xml:40-44`

```xml
<url>
  <loc>https://detain.github.io/phlix-website/nexus-core/plugins.html</loc>
  <lastmod>2026-07-28</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

---

### ✅ Windows repo URL fixed — `download.html:101`

```html
href="https://github.com/detain/phlix-windows-client/releases"
```
Correct per content.json `ecosystem[2]`.

**File:** `download.html:101`

---

### ✅ Port corrected to 8096 — `download.html:67`

```html
After installation, access the web interface at <code>http://your-server:8096</code>
```

**File:** `download.html:67`

---

### ✅ Client highlights correct — `clients.html:68-150`

Highlights match content.json canonical values:
- **Roku:** HLS playback, Hub mode, Skip intro/outro, SyncPlay ✅ (`clients.html:69-72`)
- **Samsung Tizen:** Vanilla JS + webpack, Direct play + HLS transcoded, Remote-optimized UI ✅ (`clients.html:86-88`)
- **Windows:** Electron + React + TypeScript, System tray, Media keys, Hub mode ✅ (`clients.html:101-104`)
- **Mobile (Android):** Movies/TV/Music/Photos, Offline downloads, Token refresh ✅ (`clients.html:117-119`)

---

## Verdict

**NOT APPROVED.** Two critical defects block approval:

1. **`canonical` URL missing** — one-tag fix per page
2. **`docs.html` missing** — page doesn't exist, nav/footer/sitemap all omit it

Both were flagged in the original review's required fixes list. All other defects (install command, og.png, social meta on all pages, nav Plugins, 404 noindex, font paths, grid, client count, plugins in sitemap, Windows repo URL, port) are confirmed resolved.

Fix the two remaining items and re-submit for final approval.
