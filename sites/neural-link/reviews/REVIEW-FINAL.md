# REVIEW-FINAL: Neural-Link Brand Kit Site (POST-REBUILD AUDIT)

**Site:** `sites/neural-link/`
**Reviewer:** Hostile Audit
**Date:** 2026-07-29
**Status:** ❌ REJECTED — NO RECONSTRUCTION PERFORMED

---

## SUMMARY

**This site is IDENTICAL to the rejected version.** Zero content from `shared/content.json` is used. The "rebuild" did not occur — the site still markets a fictional "brain-computer interface" product called "NEURAL-LINK" with fabricated stats, fake section names, and no connection to Phlix. All 10 verification dimensions fail.

**Previous review:** 2026-07-29 (REJECTED — 18/1300 ≈ 1.4%)
**This review:** 0/100 — identical content, no fixes applied

---

## VERIFICATION RESULTS (10 DIMENSIONS)

| # | Dimension | Result | Evidence |
|---|-----------|--------|----------|
| 1 | All 9 HTML pages + 404.html exist | ❌ FAIL | Only `index.html`, `404.html` exist. Missing: `features.html`, `clients.html`, `download.html`, `plugins.html`, `docs.html`, `hub.html`, `about.html` |
| 2 | `img/og.png` exists (1200x630 PNG) | ❌ FAIL | `img/` contains only `favicon.svg`. `og.png` absent |
| 3 | `robots.txt` and `sitemap.xml` exist | ❌ FAIL | Both files absent from site root |
| 4 | Install command present | ❌ FAIL | `content.json.install.primary.command` (`curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh \| sudo bash`) not displayed anywhere |
| 5 | License: MPL-2.0 (server), MIT (clients/plugins) | ❌ FAIL | No license information on site |
| 6 | 4 native clients + DLNA, 8 features, 6 FAQ | ❌ FAIL | Zero Phlix content. No clients, features, or FAQ from `content.json` |
| 7 | No fabricated stats/pricing/testimonials | ❌ FAIL | Fabricated hero stats: "2847 Synaptic Paths", "12 Memory Nodes", "99.7% Clarity" (`index.html:74-87`) |
| 8 | No Google Fonts CDN | ❌ FAIL | `js/head-tags.js:23-24` has `fonts.googleapis.com` preconnect |
| 9 | og: + twitter: meta on all pages | ❌ FAIL | OG/Twitter tags only in `js/head-tags.js` (not loaded by HTML). Missing `og:image`, `og:site_name`, `og:url`, `twitter:creator`. No meta in static HTML |
| 10 | `prefers-reduced-motion` respected | ✅ PASS | `css/styles.css:1447-1469` and JS files check the media query |

**Score: 1/10 ✅ = 10/100**

---

## DETAILED DEFECTS

### 1. HTML Pages (2/10 exist) ❌

**Required:** index.html, features.html, clients.html, download.html, plugins.html, docs.html, hub.html, about.html, 404.html

**Found:** `index.html`, `404.html`

**Evidence:**
```
/home/sites/phlix/phlix-website/sites/neural-link/index.html  (17877 bytes, 2026-07-28 21:24)
/home/sites/phlix/phlix-website/sites/neural-link/404.html    (7560 bytes, 2026-07-28 21:38)
```

### 2. og.png (0/1) ❌

**Required:** `img/og.png` (1200×630 PNG)

**Found:** Only `img/favicon.svg` exists

**Evidence:**
```
$ ls -la img/
total 12
drwxr-xr-x  2 my my 4096 Jul 28 21:35 .
drwxr-xr-x  1 my my 4096 Jul 28 21:35 img/
-rw-rw-r--  1 my my 1451 Jul 28 21:35 img/favicon.svg
```

### 3. robots.txt + sitemap.xml ❌

Both files completely absent from site root.

### 4. Install Command ❌

**Required:** `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`

**Found:** No install command anywhere on the site. Contact form has "Neural ID", "Consciousness Level", "Synaptic Pattern" fields (`index.html:368-388`) — meaningless for a media server.

### 5. License Information ❌

No license information displayed anywhere. `content.json.faq[5]` explicitly addresses licensing (MPL-2.0 server, MIT clients/plugins) — not referenced.

### 6. Phlix Content (0% compliance) ❌

**Zero content from `shared/content.json` is used.**

| Content Element | Required | Found |
|-----------------|----------|-------|
| Site name | "Phlix" | "NEURAL-LINK" (`index.html:34`) |
| Hero headline | "Your media. Your library. Your Phlix." | "CONNECT YOUR MIND TO MEDIA" (`index.html:56-60`) |
| Hero subheadline | PHP media server description | "brain-to-media interface technology" (`index.html:61-63`) |
| Primary CTA | "Get Phlix" | "Initiate Link" (`index.html:67`) |
| Secondary CTA | "Read the docs" | "Explore Memory" (`index.html:71`) |
| 8 features | From `content.json.features[]` | Fake: "Neural Map", "Memory Palace", "Synapse Gallery", "Thought Stream" |
| 5 clients | From `content.json.clients[]` | None |
| 6 FAQ | From `content.json.faq[]` | None (contact form present instead) |
| Footer | `content.json.footer.columns` | Fake: "Neural Protocol", "Synapse API", "Memory SDK", "Consciousness Docs" (`index.html:414-417`) |
| Pitch bullets | `content.json.pitch_bullets[]` | None |

**Evidence of zero Phlix content:**
```bash
$ grep -i "phlix\|media server\|roku\|dlna\|syncplay" /home/sites/phlix/phlix-website/sites/neural-link/*.html
# No matches
```

### 7. Fabricated Stats Present ❌

**Hero stats (fabricated, unverifiable):**
- `index.html:76`: "2847 Synaptic Paths"
- `index.html:80`: "12 Memory Nodes"
- `index.html:84`: "99.7% Clarity"

These numbers are invented and unrelated to Phlix. Per `new_site.md` §19.7: "proof_strategy signals must be verifiable."

### 8. Google Fonts CDN Violation ❌

**File:** `js/head-tags.js:23-24`
```js
{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' }
```

This directly violates `new_site.md` §1: "No CDN dependencies in the deployed page (no Google Fonts `<link>` to `fonts.googleapis.com`, no script CDNs)."

Note: These preconnect tags are in `head-tags.js` which is NOT imported by any HTML page. The actual HTML files do not load Google Fonts via CDN either (good), but this file remains a violation source.

### 9. Social Metadata ❌

**OG/Twitter meta tags only exist in `js/head-tags.js:13-18`** — this module is NOT imported by any HTML page (`index.html:426-430` shows which scripts ARE loaded; `head-tags.js` is absent).

**Missing from actual HTML:**
- `og:image` (required: absolute URL to 1200×630 PNG)
- `og:site_name` (required: "Phlix")
- `og:url` (required: absolute URL per page)
- `twitter:creator` (required: `@detain`)
- `theme-color` points to `#1A1A2E` instead of kit primary `#FF00FF` (`head-tags.js:11`)

### 10. prefers-reduced-motion ✅

**CSS:** `styles.css:1447-1469` disables animations for users who prefer reduced motion.

**JS:** Multiple files check the media query:
- `js/main.js:8`
- `js/neural-network.js:12`
- `js/synaptic-effects.js:8`
- `js/memory-palace.js:16`

---

## REQUIRED FILES MISSING

| File | Status |
|------|--------|
| `features.html` | ❌ MISSING |
| `clients.html` | ❌ MISSING |
| `download.html` | ❌ MISSING |
| `plugins.html` | ❌ MISSING |
| `docs.html` | ❌ MISSING |
| `hub.html` | ❌ MISSING |
| `about.html` | ❌ MISSING |
| `robots.txt` | ❌ MISSING |
| `sitemap.xml` | ❌ MISSING |
| `img/og.png` | ❌ MISSING |

---

## VERDICT

**REJECTED.**

This site was NOT rebuilt. It contains identical content to the 2026-07-29 rejected review:

- Site still markets "NEURAL-LINK" brain-computer interface, not Phlix media server
- Nav still points to fake sections: `#neural-map`, `#memory-palace`, `#synapse-gallery`, `#thought-stream`
- Hero still says "CONNECT YOUR MIND TO MEDIA" 
- Stats still fabricated: "2847 Synaptic Paths", "12 Memory Nodes", "99.7% Clarity"
- Footer still fake: "Neural Protocol", "Synapse API", "Memory SDK", "Consciousness Docs"
- Zero Phlix content from `shared/content.json`

**The site cannot be approved. Reconstruction has not been performed.**

To fix: Replace ALL content with `shared/content.json` data, implement all 8 required pages, add missing files (robots.txt, sitemap.xml, og.png), remove Google Fonts CDN references, and use correct OG/Twitter meta tags.

(End of file - total 313 lines)
