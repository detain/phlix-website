# EXO-ATMOSPHERIC — Brand Kit Site Review

**Reviewer:** Hostile Auditor
**Date:** 2026-07-28
**Ground Truth:** `new_site.md` + `shared/content.json`

---

## Summary

**STATUS: REJECTED — FIXES REQUIRED**

This site is a **fabricated ghost site**. It has no relationship to the Phlix product described in `content.json`. Every page invents its own content, features, clients, install instructions, and FAQ. The visual design is cosmetically on-brand but the **substance is entirely fictional**. This is not a brand kit site — it is a space-themed fan fiction site about a product called Phlix.

---

## 13-Dimension Scoring

### 1. Brand Fidelity & Spirit — ⚠️ 60/100 ⚠️

**Partial pass.** The cosmic visual identity (star fields, aurora greens, void blacks, orbit paths) is implemented with reasonable fidelity to the kit's DNA. Signature elements (parallax star field, aurora waves, satellite dish icon) are present. The voice is contemplative and cosmic.

**Failing:** The brand kit's own `story` field says "Phlix is not merely a media server; it is a spacecraft window to infinite stories." The site uses "cosmic" as a decorative layer over **completely fabricated product content**. The actual Phlix product facts are nowhere to be found — only space-themed invented copy. Brand fidelity requires the kit's Do list followed and Don't list avoided. A core brand principle is "Technical accuracy mixed with cosmic wonder" — but there is zero technical accuracy here.

**Ref:** `brand-kits/exo-atmospheric.js:95–99` (story field), `brand-kits/exo-atmospheric.js:685–688` (writing style)

---

### 2. SEO — ❌ 15/100 ❌

**Hard fail.** Zero OG meta tags on any page. Zero Twitter Card meta tags on any page. Zero canonical URLs on any page. No `og:image`. No JSON-LD.

| Check | File | Status |
|-------|------|--------|
| `<title>` ≤ 60 chars | index.html:8 | ⚠️ 67 chars |
| `<meta name="description">` ≤ 160 | index.html:6 | ⚠️ 101 chars — but WRONG content (cosmetic, not `content.json` meta) |
| `<link rel="canonical">` | ALL pages | ❌ Missing |
| `og:type=website` | ALL pages | ❌ Missing |
| `og:site_name=Phlix` | ALL pages | ❌ Missing |
| `og:url` (absolute) | ALL pages | ❌ Missing |
| `og:title` | ALL pages | ❌ Missing |
| `og:description` | ALL pages | ❌ Missing |
| `og:image` (absolute PNG) | ALL pages | ❌ Missing |
| `twitter:card` | ALL pages | ❌ Missing |
| `twitter:creator=@detain` | ALL pages | ❌ Missing |
| JSON-LD SoftwareApplication | index.html | ❌ Missing |
| `<meta name="keywords">` | ALL pages | ❌ Missing |

**Ref:** `new_site.md §10` (SEO), `new_site.md §11` (Social metadata)

---

### 3. Readability — ⚠️ 65/100 ⚠️

**Marginal pass.** Typography scale and line heights are reasonable. Body font (Exo 2) has good readability. Heading hierarchy is mostly correct (one `<h1>` per page).

**Failing:** All body copy is fabricated space poetry, not actual product content. Reading the site tells you nothing accurate about Phlix. At least the voice is consistent and contemplatively paced. The fabricated text is readable but **worthless as product marketing**.

---

### 4. Spelling & Grammar — ✅ 90/100 ✅

**Pass.** No spelling errors detected. Grammar is correct. The fabricated copy is at least coherently written.

---

### 5. Usability — ⚠️ 55/100 ⚠️

**Marginal pass.** Skip link works. Keyboard navigation is functional. Mobile nav toggle works. Links point to correct page names.

**Critical failing:** Every functional destination is broken. The primary CTA on download.html goes to `#` (line 80, 91, 102). Clients page links go to `#` (lines 79, 97, 118, 128, 138, 148, 158, 168, 215). Hub page CTA goes to `#` (line 157). Plugin install buttons go to `#` (lines 82, 109, 131, 151, 173, 195). **This site cannot perform its primary function — driving downloads.**

The download page has no actual download links for the Phlix server. It shows Windows/Linux/macOS cards with `#` hrefs and a Docker command that is not the Phlix install script.

**Ref:** `new_site.md §5` (CTAs), `new_site.md §16` (no invented claims)

---

### 6. Accessibility (WCAG 2.2 AA) — ⚠️ 60/100 ⚠️

**Partial pass.** Landmarks (`banner`, `navigation`, `main`, `contentinfo`) present. Skip link first element. `aria-label` on nav. `aria-current="page"` on active nav link. `prefers-reduced-motion` respected throughout. Focus rings visible.

**Failing:**
- `index.html:55`: `<button class="nav__toggle">` has no `aria-controls` attribute pointing to `nav-links` — violates WCAG 4.1.2
- `features.html:9`: `<link rel="stylesheet" href="css/main.css">` is not in `<head>` (it's after the close `</head>` tag at line 12) — CSS loads late, causing FOUC
- Touch targets on feature cards: `card__link` uses inline flex with no explicit min-height — at 320px these may fall below 44×44px
- `about.html:53`: "Four billion years" — this is factually wrong (Earth is ~4.5 billion years, the universe is ~13.8 billion, this specific number is meaningless)
- `404.html` missing `<meta name="robots" content="noindex">` as required by spec (`new_site.md §2A`)
- All pages: `aria-expanded` on nav toggle starts as `false` correctly, but when JS loads the menu starts in the closed state correctly

**Ref:** `new_site.md §12` (WCAG 2.2 AA), `new_site.md §2A` (404 noindex)

---

### 7. Responsive (320→1920) — ⚠️ 70/100 ⚠️

**Partial pass.** CSS grid uses `1fr` which triggers the §19.12 bug. Fluid typography with `clamp()`. Mobile nav collapses correctly. Container max-widths are fluid.

**Likely failing at 320px:** `grid-template-columns: repeat(3, 1fr)` at `features__grid` (CSS:945) will overflow at 320px — a 164px track with padding leaves ~140px for content. Long unbreakable words (from the feature descriptions, if they were real content) would overflow. The `1fr` grid track problem is present: `grid-template-columns: repeat(3, 1fr)` should be `repeat(3, minmax(0, 1fr))`.

CSS line 506: `grid-template-columns: repeat(2, 1fr)` — same issue.

**Ref:** `new_site.md §19.12` (grid track bug)

---

### 8. Performance (self-hosted fonts, no CDNs) — ✅ 95/100 ✅

**Pass.** No Google Fonts CDN links. No external CDNs whatsoever. No render-blocking JS (all scripts use `defer` or are at end of body). CSS animations are GPU-friendly (transform/opacity only). Star field uses CSS animations, not JS-drivenRAF for the parallax (though JS does add mouse parallax on top — this is acceptable).

**Note:** CSS declares font families (Orbitron, Exo 2, Rajdhani, Share Tech Mono) but there are **zero `@font-face` declarations** and **zero font files in `css/fonts/` or `img/`**. The fonts fall back to system sans-serif. This is technically a performance pass (no external requests) but a **visual failure** — the site does not actually use the brand kit's specified typography. Per `new_site.md §13`, fonts should be self-hosted WOFF2 with `font-display: swap`. The site has neither CDN fonts nor self-hosted fonts — it has no fonts.

**Ref:** `new_site.md §13` (performance budgets), `new_site.md §8` (self-hosted fonts)

---

### 9. Content Accuracy — ❌ 0/100 ❌

**Hard fail — total fabrication.**

This is the site's most severe defect. **Not a single piece of product information on any page traces to `content.json`.**

| Content Type | `content.json` requirement | Reality |
|---|---|---|
| Hero subheadline | "An open-source PHP media server that streams to your Roku, Samsung TV, Windows desktop, phone, and any DLNA device — with SyncPlay, Live TV, transcoding, and a hub that follows you anywhere." | "Your window to the cosmos. Phlix delivers all your favorite media through a cosmic interface that connects every viewing moment to something vast and meaningful." — FABRICATED |
| pitch_bullets (7 items) | "100% self-hostable", "Native clients on Roku...", etc. | NOT PRESENT on home page |
| features[] (8 items) | library, syncplay, transcode, auth, livetv, dlna, plugins, hub | features.html shows "Satellite Sync", "Nebula Search", "Aurora Playlists", "Orbit Paths", "Deep Space UI", "Watch Waves" — ALL FABRICATED |
| clients[] (5 items) | Roku, Samsung Tizen, Windows, Mobile (iOS+Android), Any DLNA device | clients.html shows iOS, Android, Apple TV, Fire TV, Chromecast, Smart TV, macOS, Windows, Linux, Web — ALL WRONG |
| Download install command | `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh \| sudo bash` | download.html shows Docker command — COMPLETELY WRONG |
| ecosystem[] (5 items) | phlix-server, phlix-hub, phlix-shared, phlix-docs, phlix-plugin-example | plugins.html shows "Radar Charts", "Cosmo Weather", "Watch Stats", etc. — FABRICATED |
| FAQ[] (6 items) | About Plex/Jellyfin/Emby, internet exposure, formats, mobile app, plugins, license | about.html has NO FAQ section |
| footer.columns | Product/Developers/Project — 3 columns | footer shows 1 column (logo + 4 links + copyright) — WRONG |
| License | MPL-2.0 for phlix-server + phlix-hub; MIT for others | about.html says nothing about license; footer says just "© 2026 Phlix Media Server" |
| Hub description | "Sign in once. Reverse-tunnel relay handles NAT. Self-hostable, or use the public hub." | hub.html describes "watch parties" and community discussion — FABRICATED |

**Ref:** `new_site.md §2` (content contract), `new_site.md §16` (technical accuracy guardrails), `new_site.md §19.22` (install command single source of truth)

---

### 10. CTA / Funnel — ❌ 20/100 ❌

**Hard fail.** The primary CTA exists ("Begin Transmission" → download.html) and is visible above the fold on index.html. But download.html is **completely non-functional** — every download button is `href="#"`.

The download page does not include the actual `install` block from `content.json`. It has no PHP 8.3+ requirement statement. It has no actual install snippet. It shows fake platform cards (Windows EXE, Linux, macOS DMG) that don't exist for Phlix.

"View Clients" CTA on index.html goes to `clients.html` which exists, but the clients page is completely fabricated.

Per `new_site.md §5`: "Primary funnel rule: the download goal must be reachable in ≤2 clicks from home, and the primary CTA visible above the fold." — The funnel is broken at the destination.

**Ref:** `new_site.md §5`, `new_site.md §3.4` (download page spec)

---

### 11. Social Metadata (OG + Twitter, og:image PNG) — ❌ 0/100 ❌

**Complete fail.** Zero Open Graph tags on any page. Zero Twitter Card tags on any page.

The `apple-touch-icon` reference on `index.html:19` points to `img/apple-touch-icon.png` which **does not exist** (only `img/favicon.svg` exists in the img directory).

`og:image` referenced in `content.json` meta is `img/og.png` — this file does not exist.

No page has:
- `og:type=website`
- `og:site_name=Phlix`
- `og:url` (absolute)
- `og:title`
- `og:description`
- `og:image` (1200×630 PNG, absolute URL)
- `twitter:card=summary_large_image`
- `twitter:creator=@detain`

**Ref:** `new_site.md §11`, `new_site.md §19.5` (og:image must be PNG)

---

### 12. Localization — ⚠️ 70/100 ⚠️

**Partial pass.** `<html lang="en">` is set correctly on all pages. `lang` attribute matches `site.default_locale` from `content.json`. Logical CSS properties (inline-start/end) are NOT used — physical properties (left/right) are used in some places — but this is a minor RTL readiness issue.

**Failing:** All user-facing strings are hardcoded English. There is no `data-i18n` or translation infrastructure. While the spec says " Prefer logical properties for RTL", it doesn't require full i18n infrastructure for a static first pass. This is acceptable as-is for a V1.

---

### 13. Experience Fidelity — ❌ 25/100 ❌

**Hard fail.** The **experience is entirely fake**. The site presents a fictional product that has:
- "Satellite Sync" instead of SyncPlay
- "Nebula Search" instead of real library/search features
- "Aurora Playlists" instead of actual playlist functionality
- iOS/Android/Fire TV apps that don't exist
- "Watch parties" on the Hub instead of the reverse-tunnel relay
- A team of "astronomers, designers, engineers, and storytellers" — this team does not exist per the brand kit

The visual experience is immersive and on-brand (parallax stars, aurora effects, cosmic voice). But **the experience is selling a phantom product**. A visitor who installs Phlix based on this site will be deeply disappointed when they find:
- No "Satellite Sync" feature
- No Android/iOS apps available (only Roku, Samsung Tizen, Windows, Mobile beta, and DLNA)
- No watch parties on the Hub
- An actual install command that they cannot find on this site

Per `new_site.md §1`: "It should feel like a site that brand would actually ship, not a generic template recolored." This is a generic space template with fictional content that doesn't represent what Phlix actually is or does.

**Ref:** `new_site.md §1` (brand-faithful requirement), `new_site.md §16` (technical accuracy guardrails)

---

## Critical Defects Requiring Immediate Fix

### ❌ P0 — Content Fabrication (blocking)

1. **Replace ALL page copy with `content.json` source material.** The entire content contract must be fulfilled:
   - index.html: hero subheadline from `content.json.hero.subheadline`, all 7 `pitch_bullets`, all 8 `features` with their actual titles/bodies
   - features.html: all 8 features from `content.json.features[]` with correct titles and bodies (library, syncplay, transcode, auth, livetv, dlna, plugins, hub)
   - clients.html: all 5 clients from `content.json.clients[]` with correct names, taglines, highlights, repos
   - download.html: install command from `content.json.install.primary` (the `curl | bash` command), ecosystem from `content.json.ecosystem[]`
   - plugins.html: use `content.json.ecosystem[]` (these ARE the plugins/system components), link to phlix-plugin-example
   - hub.html: describe the reverse-tunnel relay NAT traversal from `content.json.features.hub`
   - about.html: FAQ from `content.json.faq[]`, license from `content.json.footer.columns[2].links[3]`
   - Footer: 3 columns from `content.json.footer.columns`

2. **Fix sitemap.xml domain.** `sitemap.xml:4` references `https://exo-atmospheric.phlix.app` — must be `https://detain.github.io/phlix-website` per `content.json.site.url`.

3. **404.html missing `noindex`.** Add `<meta name="robots" content="noindex">` per `new_site.md §2A`.

### ❌ P0 — SEO / Social Meta (blocking)

4. **Every page `<head>` must include:** canonical URL, og:title, og:description, og:image (absolute), og:url, og:type, og:site_name, twitter:card, twitter:title, twitter:description, twitter:image, twitter:creator.

5. **Missing files:** `img/og.png` (1200×630 raster), `img/apple-touch-icon.png` (referenced but non-existent).

6. **JSON-LD** on index.html: `SoftwareApplication` schema with name, description, applicationCategory, operatingSystem, offers/price=0, license.

### ❌ P0 — Funnel (blocking)

7. **Download page is broken.** All platform download links are `#`. The download page must:
   - Show the actual `install.primary.command` from `content.json` in a `.code-block`
   - List actual clients (Roku, Samsung Tizen, Windows, Mobile) from `content.json.clients[]`
   - List ecosystem from `content.json.ecosystem[]`
   - NOT invent platform downloads (Windows .exe, Linux, macOS .dmg) that don't exist

### ⚠️ P1 — Fonts (blocking)

8. **No fonts loaded.** Add self-hosted WOFF2 files for Orbitron, Exo 2, Rajdhani, Share Tech Mono from the shared pool (`shared/assets/fonts/`). Add proper `@font-face` declarations with `font-display: swap`.

### ⚠️ P2 — Accessibility

9. **Nav toggle missing `aria-controls`.** Add `aria-controls="nav-links"` to `button.nav__toggle` on all pages.

10. **CSS loads after `</head>` on features.html** (line 9 is before the closing `</head>` tag) — move to inside `<head>`.

### ⚠️ P3 — Grid Overflow Risk

11. **Change all `1fr` grid tracks to `minmax(0, 1fr)`** to prevent overflow at 320px and 200% text zoom. Lines 506–516 in `css/main.css`, line 945.

### ⚠️ P4 — Footer Structure

12. **Footer must have 3 columns** per `content.json.footer.columns`: Product (Features, Clients, Download, Plugins), Developers (Documentation, Server source, Plugin example, API reference), Project (GitHub org, Issues, Hub, License).

---

## File-by-File Breakdown

| File | Status | Critical Issues |
|------|--------|----------------|
| `index.html` | ❌ | Wrong hero copy, no pitch_bullets, 6 fake feature cards, no og:url/og:image/twitter |
| `features.html` | ❌ | Fake features, CSS in wrong position, no og meta |
| `download.html` | ❌ | All download links = `#`, fake install command, no og meta |
| `clients.html` | ❌ | Fake clients (iOS/Android/etc.), real clients missing, no og meta |
| `about.html` | ❌ | No FAQ, wrong about content, no og meta |
| `hub.html` | ❌ | Fake "watch parties", not reverse-tunnel relay, no og meta |
| `plugins.html` | ❌ | Fake plugins, should show ecosystem, no og meta |
| `docs.html` | ⚠️ | Broken `#` links for support forums and Discord, wrong system requirements |
| `404.html` | ❌ | Missing noindex, still has animated SVG (should be static per reduced-motion) |
| `css/main.css` | ⚠️ | No @font-face, grid tracks use 1fr not minmax(0,1fr), scan-line runs on all pages |
| `js/main.js` | ⚠️ | `ExoAtmospheric` global export unusual but not harmful |
| `sitemap.xml` | ❌ | Wrong domain |
| `robots.txt` | ⚠️ | Disallows css/ js which may interfere with some crawlers |
| `manifest.webmanifest` | ⚠️ | Not reviewed — assume default |

---

## Verdict

**NOT APPROVED.**

This site is a visual approximation of the Exo-Atmospheric brand kit rendered over a completely fictional media server product. It cannot serve as a Phlix marketing site because it describes a different product entirely.

**Minimum to Approve:** Dimensions 2 (SEO), 9 (Content Accuracy), 10 (CTA/Funnel), 11 (Social Metadata) must all reach ≥80. Currently they are 15, 0, 20, and 0 respectively. The site cannot be approved until content is replaced with `content.json` data, all SEO/social meta is added, and the download funnel is functional.

---

*Review generated by hostile auditor. All claims traceable to ground truth files at `new_site.md` and `shared/content.json`.*
