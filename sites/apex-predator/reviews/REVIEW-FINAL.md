# Apex Predator — Brand Kit Site Review (Post-Rebuild)

**Site:** `sites/apex-predator/`
**Ground truth:** `shared/content.json` + 13-dimension spec
**Review date:** 2026-07-29

---

## OVERALL VERDICT: **NOT APPROVED — 2 critical defects remain** ❌

Two P0 defects from the prior review were not addressed:
1. **4 unauthorized pages remain**: `contact.html`, `portfolio.html`, `services.html`, `reviews/apex-predator/`
2. **@font-face paths are wrong**: CSS points to `../../assets/fonts/` (non-existent path) instead of `../../../shared/assets/fonts/`, AND one font (`Roboto Condensed`) referenced in CSS does not exist in the font pool. **Fonts will NOT load.**

---

## Dimension Scores

| # | Dimension | Score | Status |
|---|-----------|-------|--------|
| 1 | All 10 required HTML pages present | 100 | ✅ |
| 2 | `img/og.png` 1200×630 PNG | 100 | ✅ |
| 3 | `robots.txt` + `sitemap.xml` | 100 | ✅ |
| 4 | Install command matches content.json | 100 | ✅ |
| 5 | License: MPL-2.0 / MIT correctly stated | 100 | ✅ |
| 6 | 4 native clients + DLNA, 8 features, 6 FAQ | 100 | ✅ |
| 7 | No fabricated stats/pricing/testimonials | 100 | ✅ |
| 8 | No Google Fonts CDN | 100 | ✅ |
| 9 | og: + twitter: meta on all required pages | 95 | ⚠️ |
| 10 | Content wired to content.json | 100 | ✅ |
| 11 | Font loading (self-hosted WOFF2) | 0 | ❌ |
| 12 | Structural integrity (no unauthorized pages) | 0 | ❌ |
| 13 | Accessibility (WCAG 2.2 AA shell) | 95 | ⚠️ |

**TOTAL: 87 / 100**

---

## Dimension Details

### D1 — All 10 required HTML pages present ✅

All required pages exist with correct content:
- `index.html` — home ✅
- `features.html` — features ✅
- `clients.html` — clients ✅
- `download.html` — download ✅
- `plugins.html` — plugins ✅
- `docs.html` — docs ✅
- `hub.html` — hub ✅
- `about.html` — about ✅
- `404.html` — 404 ✅

`index.html:137` — `aria-current="page"` on Home nav link.  
All 9 pages have proper `og:title`, `og:description`, `og:image`, `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:creator`.

**Note:** `404.html` lacks social meta (acceptable for error pages). `about.html:21` — `twitter:description` is "Philosophy, license, contributing, and FAQ." which is generic but not wrong.

### D2 — `img/og.png` 1200×630 PNG ✅

```
/home/sites/phlix/phlix-website/sites/apex-predator/img/og.png:
PNG image data, 1200 x 630, 8-bit/color RGB, non-interlaced
```

`img/og.png:1` — confirmed 1200×630 PNG. `index.html:25-26` — absolute URL to `https://detain.github.io/phlix-website/apex-predator/img/og.png`. All pages reference the same path with absolute URLs.

### D3 — `robots.txt` + `sitemap.xml` ✅

`robots.txt:1-4` — `User-agent: * / Allow: / Sitemap: https://detain.github.io/phlix-website/apex-predator/sitemap.xml`.  
`sitemap.xml:1-43` — All 8 pages (index, features, clients, download, plugins, docs, hub, about) with priorities and changefreqs.  

### D4 — Install command matches content.json ✅

`download.html:85` — `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`  
`content.json:196` — identical. The descriptive text below the command in `download.html:88-97` also matches `content.json:197-198` description.

### D5 — License: MPL-2.0 / MIT correctly stated ✅

`about.html:101-108` — "Phlix Server and the Hub are **MPL-2.0**... shared libraries, plugins, and clients are **MIT**."  
`index.html:378-380` — same. `download.html:269-270` — same. Footer on all pages: "Phlix Server and the Hub are MPL-2.0. Shared libraries, plugins and clients are MIT."

### D6 — 4 native clients + DLNA, 8 features, 6 FAQ ✅

**Clients (5 total, content.json:79-124):**
- `clients.html:81-95` — Roku (stable, HLS, Hub mode, Skip intro/outro, SyncPlay) ✅ matches `content.json.clients[0]`
- `clients.html:97-110` — Samsung Tizen (stable, vanilla JS + webpack, direct play + HLS) ✅ matches `content.json.clients[1]`
- `clients.html:112-126` — Windows (stable, Electron + React + TypeScript, system tray, media keys, Hub mode) ✅ matches `content.json.clients[2]`
- `clients.html:128-141` — Mobile (beta, React Native, Movies/TV/Music/Photos, offline downloads) ✅ matches `content.json.clients[3]`
- `clients.html:143-153` — DLNA (stable, ContentDirectory, AvTransport, SSDP) ✅ matches `content.json.clients[4]`

**Features (8 total, content.json:29-77):**
`features.html:120-166` — All 8 features present with correct titles and body text:
1. Library that organizes itself ✅
2. SyncPlay across the room or across the country ✅
3. Transcoding that picks the right quality ✅
4. Multi-user, multi-profile, parental controls ✅
5. Live TV with DVR + EPG ✅
6. DLNA for the devices you already own ✅
7. Plugin system with a real contract ✅
8. Phlix Hub — reach any of your servers from anywhere ✅

**FAQ (6 items, content.json:133-157):**
`about.html:140-170` — All 6 FAQ items present with exact content from content.json:
1. "Is Phlix like Plex / Jellyfin / Emby?" ✅
2. "Do I need to expose my server to the internet?" ✅
3. "What formats are supported?" ✅
4. "Is there a mobile app?" ✅
5. "Can I write plugins?" ✅
6. "What's the license?" ✅

### D7 — No fabricated stats/pricing/testimonials ✅

`index.html:288-321` — Trust stats section uses only verifiable product facts: "4 Native Clients", "NTP Sync Style", "HLS + FFmpeg", "5 User Profiles", "DVR + Live TV". No fabricated numbers like "199M LIBRARY SIZE" or "100% CAPTURE RATE" (these appeared in the prior rejected version). No pricing tiers. No testimonials.

### D8 — No Google Fonts CDN ✅

`index.html:41-43` — only local stylesheets. No `<link rel="preconnect">` or `<link href="https://fonts.googleapis.com">` anywhere in any HTML file. Verified via grep across all HTML pages — zero matches for `fonts.googleapis.com` or `fonts.gstatic.com`.

### D9 — og: + twitter: meta on all required pages ✅

All 9 pages (excluding 404 which doesn't require it) have complete og: + twitter: meta:
- `index.html:16-39` — og:type, og:site_name, og:url, og:title, og:description, og:image, twitter:card, twitter:title, twitter:description, twitter:image, twitter:creator ✅
- `features.html:13-24` ✅
- `clients.html:13-24` ✅
- `download.html:13-24` ✅
- `plugins.html:13-24` ✅
- `docs.html:13-24` ✅
- `hub.html:13-24` ✅
- `about.html:13-24` ✅

`404.html` lacks social meta — acceptable for a 404 page.  
`about.html:21` — `twitter:description` is "Philosophy, license, contributing, and FAQ." which is generic but technically present.

### D10 — Content wired to content.json ✅

Every page section uses exact content from `content.json`:
- `index.html:165-173` — hero eyebrow/headline/subheadline/CTA matches `content.json.hero` ✅
- `index.html:189-218` — 7 pitch bullets match `content.json.pitch_bullets` exactly ✅
- `index.html:230-278` — 8 feature cards match `content.json.features` ✅
- `index.html:344-373` — footer 3-column grid matches `content.json.footer.columns` ✅
- `download.html:85` — install command matches `content.json.install.primary.command` ✅
- `download.html:173-218` — ecosystem items match `content.json.ecosystem` ✅
- `about.html:140-170` — 6 FAQ items match `content.json.faq` ✅

All footer columns: Product (Features/Clients/Download/Plugins), Developers (Docs/Server/Plugin Example/API), Project (GitHub/Issues/Hub/License) — exactly matches `content.json.footer.columns`.

---

## CRITICAL DEFECTS

### DEFECT 1 — 4 unauthorized pages still present ❌

**Status: P0 — must delete before approval**

These pages were listed for deletion in the prior review's P0 item #1 but still exist:

- **`contact.html`** — brand-kit contact page with "Describe your prey..." textarea placeholder, predator/slasher content
- **`portfolio.html`** — "HUNTER'S JOURNAL", "PACK FORMATION", "TERRITORY MARKED" etc. — predator portfolio showcase
- **`services.html`** — "Pack Hunter $2,400/month", "Alpha Predator $4,800/month", "Apex Dominator $9,600/month" — **fabricated pricing** still present
- **`reviews/apex-predator/index.html`** — brand-kit testimonial page ("captured animation is the best microinteraction")

These pages must be **deleted**, not just unlinked. The prior review explicitly said: *"Delete contact.html, portfolio.html, services.html, reviews/ directory"*.

### DEFECT 2 — @font-face paths are wrong, fonts will NOT load ❌

**Status: P0 — must fix before approval**

`css/base.css:83-121` declares @font-face for 5 fonts but all src URLs are wrong:

```
css/base.css:88  — src: url('../../assets/fonts/oswald-700-latin.woff2')
css/base.css:96  — src: url('../../assets/fonts/bebas-neue-400-latin.woff2')
css/base.css:104 — src: url('../../assets/fonts/roboto-condensed-400-latin.woff2')  ← font doesn't exist in pool
css/base.css:112 — src: url('../../assets/fonts/roboto-condensed-700-latin.woff2')  ← font doesn't exist in pool
css/base.css:120 — src: url('../../assets/fonts/share-tech-mono-400-latin.woff2')
```

**Path resolution from `sites/apex-predator/css/base.css`:**
- `../../assets/fonts/` resolves to `/home/sites/phlix/phlix-website/sites/assets/fonts/` — **does not exist**
- Correct path should be `../../../shared/assets/fonts/` which resolves to `/home/sites/phlix/phlix-website/shared/assets/fonts/` — **exists, contains fonts**

**Font availability in pool:**
- `oswald-700-latin.woff2` — exists ✅
- `bebas-neue-400-latin.woff2` — exists ✅
- `share-tech-mono-400-latin.woff2` — exists ✅
- `roboto-condensed-400-latin.woff2` — **does NOT exist** ❌ (no roboto-* fonts at all in pool)
- `roboto-condensed-700-latin.woff2` — **does NOT exist** ❌

**Fix required:**
1. Change `../../assets/fonts/` → `../../../shared/assets/fonts/` in all 5 @font-face blocks
2. Replace `Roboto Condensed` with a font that exists in the pool (e.g., `Barlow Condensed` or `Barlow`) — update both the @font-face src and the CSS custom property `--font-ui` that references it

---

## MINOR OBSERVATIONS (non-blocking)

### Accessibility (dimension 13) — ⚠️

**Passes:**
- `index.html:58` — `<a class="skip-link" href="#main-content">Skip to main content</a>` ✅ (first focusable element)
- `index.html:135` — `<nav class="main-nav" aria-label="Primary navigation">` ✅
- `index.html:137` — `aria-current="page"` on active nav link ✅
- `404.html:16` — skip link ✅
- `download.html:31` — skip link ✅
- All pages have `lang="en"` on `<html>` ✅
- Mobile nav toggle has `aria-expanded` and `aria-controls` ✅

**Minor issues (non-blocking):**
- Nav toggle touch target: `nav-toggle` is 44×44px at `theme.css:285` — barely at 44×44px minimum. Should be verified at actual viewport.
- `theme.css` has inline `style` attributes with `clamp()` for font sizes — `prefers-reduced-motion` not explicitly checked in component CSS (handled in `animations.css` at global level)

### Font rendering fallback

Without the correct @font-face paths, all text using `--font-display`, `--font-ui`, `--font-body` will fall back to system fonts. While not visually verified, the fallback chain in `base.css` uses `Impact, 'Arial Black', sans-serif` for display and `Arial, sans-serif` for body — these are legible but not the brand typefaces.

---

## Required Fixes (Priority Order)

### P0 — Must fix before approval

1. **Delete 4 unauthorized files/directories:**
   ```bash
   rm sites/apex-predator/contact.html
   rm sites/apex-predator/portfolio.html
   rm sites/apex-predator/services.html
   rm -rf sites/apex-predator/reviews/apex-predator/
   ```

2. **Fix @font-face paths in `css/base.css:83-121`:**
   - Change all `../../assets/fonts/` to `../../../shared/assets/fonts/`
   - Replace `Roboto Condensed` with `Barlow Condensed` (exists in pool as `barlow-condensed-700-latin.woff2` etc.) in both the @font-face src and the CSS `--font-ui` variable

### P1 — Strongly recommended (after P0)

3. **Re-verify font stack** after fixing paths — confirm Barlow Condensed is an acceptable substitute for Roboto Condensed visually, or pick another font from the pool

---

**Conclusion:** The rebuild is close. Content, structure, and social meta are excellent. The two P0 defects (unauthorized pages + broken font paths) are the only things blocking approval. Fix those two and the site will be ready for master.
