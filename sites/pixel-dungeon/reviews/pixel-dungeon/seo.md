# SEO Review — Pixel Dungeon

**Dimension:** SEO compliance
**Overall Score:** 85 / 100
**Severity scale:** ✅ (pass) / ⚠️ (warning) / ❌ (fail)

---

## Per-Page Analysis

### `index.html` — Home

| Check | Status | Detail | Citation |
|---|---|---|---|
| `<title>` ≤ 60 chars | ✅ | "Phlix — Insert Coin. Begin Story." (32 chars) | `index.html:6` |
| `<meta name="description">` ≤ 160 chars | ✅ | 131 chars | `index.html:7` |
| `<meta name="keywords">` present | ✅ | "phlix, media server, plex alternative..." | `index.html:8` |
| `<link rel="canonical">` absolute URL | ✅ | `https://detain.github.io/phlix-website/sites/pixel-dungeon/` | `index.html:9` |
| One `<h1>` per page | ✅ | `<h1 class="hero__title">Your media. Your library. Your Phlix.</h1>` | `index.html:86` |
| Heading hierarchy (no skip) | ✅ | h1 → h2 (pitch, features-overview, cta-banner) | `index.html:98,114,196` |
| JSON-LD SoftwareApplication | ✅ | Present, correct schema | `index.html:39-54` |
| OG absolute URLs | ✅ | All og: URLs are absolute | `index.html:15-18` |
| Twitter card | ✅ | `twitter:card=summary_large_image` + all fields | `index.html:21-25` |

### `features.html` — Features

| Check | Status | Detail | Citation |
|---|---|---|---|
| `<title>` ≤ 60 chars | ✅ | "Features — Phlix" (17 chars) | `features.html:6` |
| `<meta name="description">` ≤ 160 chars | ✅ | 131 chars | `features.html:7` |
| `<meta name="keywords">` present | ✅ | Present | `features.html:8` |
| `<link rel="canonical">` absolute URL | ✅ | Absolute | `features.html:9` |
| One `<h1>` per page | ✅ | `<h1 class="page-header__title">Quest Complete — All Features Unlocked</h1>` | `features.html:54` |
| Heading hierarchy | ⚠️ | Page has h1 then feature-detail articles start with h2, but the content section itself has no h2 intro — jumps from page-header h1 to feature-detail h2 elements within the grid. No skipped levels, but the section wrapper `.content-section` has no explicit h2. Acceptable. | `features.html:59-145` |
| OG absolute URLs | ✅ | All absolute | `features.html:13-16` |
| Twitter card | ✅ | Complete | `features.html:17-21` |

### `clients.html` — Clients

| Check | Status | Detail | Citation |
|---|---|---|---|
| `<title>` ≤ 60 chars | ✅ | "Clients — Phlix" (16 chars) | `clients.html:6` |
| `<meta name="description">` ≤ 160 chars | ✅ | 131 chars | `clients.html:7` |
| `<meta name="keywords">` present | ❌ | **Missing** — no `<meta name="keywords">` in `<head>` | `clients.html:<head>` |
| `<link rel="canonical">` absolute URL | ✅ | Absolute | `clients.html:8` |
| One `<h1>` per page | ✅ | `<h1 class="page-header__title">Your Party — Every Client Class</h1>` | `clients.html:51` |
| Heading hierarchy | ✅ | h1 → h2 (cta-banner) → client-card h2 names | `clients.html:51,135,62,77,91,106,120` |
| OG absolute URLs | ✅ | All absolute | `clients.html:12-15` |
| Twitter card | ✅ | Complete | `clients.html:16-20` |

### `download.html` — Download

| Check | Status | Detail | Citation |
|---|---|---|---|
| `<title>` ≤ 60 chars | ✅ | "Download — Phlix" (19 chars) | `download.html:6` |
| `<meta name="description">` ≤ 160 chars | ✅ | 131 chars | `download.html:7` |
| `<meta name="keywords">` present | ✅ | Present | `download.html:8` |
| `<link rel="canonical">` absolute URL | ✅ | Absolute | `download.html:9` |
| One `<h1>` per page | ✅ | `<h1 class="page-header__title">Insert Coin. Begin Story.</h1>` | `download.html:51` |
| Heading hierarchy | ⚠️ | `download.html:70,139` use h2 for section titles "Choose Your Class" and "The Full Party". Client cards use h3 for names (`.client-card__name`) while clients.html uses h2 for the same element. Inconsistent heading level between two pages for the same content type. Not a skip, but an inconsistency. | `download.html:70,75,87,99,111,123` |
| OG absolute URLs | ✅ | All absolute | `download.html:12-15` |
| Twitter card | ✅ | Complete | `download.html:16-20` |

### `plugins.html` — Plugins

| Check | Status | Detail | Citation |
|---|---|---|---|
| `<title>` ≤ 60 chars | ✅ | "Plugins — Phlix" (17 chars) | `plugins.html:6` |
| `<meta name="description">` ≤ 160 chars | ✅ | 131 chars | `plugins.html:7` |
| `<meta name="keywords">` present | ✅ | Present | `plugins.html:8` |
| `<link rel="canonical">` absolute URL | ✅ | Absolute | `plugins.html:9` |
| One `<h1>` per page | ✅ | `<h1 class="page-header__title">Plugin Contract — Drop & Play</h1>` | `plugins.html:51` |
| Heading hierarchy | ✅ | h1 → h2 (model, write) → h3 (plugin-model__title, plugin-step body) — no skip | `plugins.html:56-98` |
| OG description mismatch | ⚠️ | `<meta property="og:description">` = "Extend Phlix with the versioned plugin contract. LifecycleInterface + manifest schema." (71 chars) — different from `<meta name="description">` (131 chars, generic Phlix copy). Not an error, but the social share will differ from the search description. | `plugins.html:14` |
| OG absolute URLs | ✅ | All absolute | `plugins.html:12-15` |
| Twitter card | ✅ | Complete | `plugins.html:16-20` |

### `docs.html` — Docs

| Check | Status | Detail | Citation |
|---|---|---|---|
| `<title>` ≤ 60 chars | ✅ | "Docs — Phlix" (13 chars) | `docs.html:6` |
| `<meta name="description">` ≤ 160 chars | ✅ | 131 chars | `docs.html:7` |
| `<meta name="keywords">` present | ❌ | **Missing** — no `<meta name="keywords">` in `<head>` | `docs.html:<head>` |
| `<link rel="canonical">` absolute URL | ✅ | Absolute | `docs.html:8` |
| One `<h1>` per page | ✅ | `<h1 class="page-header__title">The Dungeon Map — Documentation</h1>` | `docs.html:51` |
| Heading hierarchy | ⚠️ | The "Ecosystem" section uses `hub-feature__title` (h3) without a parent h2. The h2 for ecosystem-docs exists but the hub-features within it use h3. Acceptable hierarchy (h1 → h2 → h3 is valid). | `docs.html:81,85,91,97,103,109` |
| OG description mismatch | ⚠️ | og:description = generic Phlix description, not page-specific | `docs.html:14` |
| OG absolute URLs | ✅ | All absolute | `docs.html:12-15` |
| Twitter card | ✅ | Complete | `docs.html:16-20` |

### `hub.html` — Hub

| Check | Status | Detail | Citation |
|---|---|---|---|
| `<title>` ≤ 60 chars | ✅ | "Hub — Phlix" (12 chars) | `hub.html:6` |
| `<meta name="description">` ≤ 160 chars | ✅ | 131 chars | `hub.html:7` |
| `<meta name="keywords">` present | ❌ | **Missing** — no `<meta name="keywords">` in `<head>` | `hub.html:<head>` |
| `<link rel="canonical">` absolute URL | ✅ | Absolute | `hub.html:8` |
| One `<h1>` per page | ✅ | `<h1 class="page-header__title">Phlix Hub — Your World, Connected</h1>` | `hub.html:51` |
| Heading hierarchy | ✅ | h1 → h2 (hub-what, hub-self, hub-clients) → h3 (hub-feature__title) — valid | `hub.html:56-131` |
| OG/Twitter description specific to Hub | ⚠️ | og:description = "Sign in once. Reach any of your servers from anywhere. Phlix Hub reverse-tunnel relay." — this is contextually appropriate and actually better for social sharing than the generic meta description. Not a violation, but inconsistent with other pages. | `hub.html:14` |
| OG absolute URLs | ✅ | All absolute | `hub.html:12-15` |
| Twitter card | ✅ | Complete | `hub.html:16-20` |

### `about.html` — About

| Check | Status | Detail | Citation |
|---|---|---|---|
| `<title>` ≤ 60 chars | ✅ | "About — Phlix" (14 chars) | `about.html:6` |
| `<meta name="description">` ≤ 160 chars | ✅ | 131 chars | `about.html:7` |
| `<meta name="keywords">` present | ❌ | **Missing** — no `<meta name="keywords">` in `<head>` | `about.html:<head>` |
| `<link rel="canonical">` absolute URL | ✅ | Absolute | `about.html:8` |
| One `<h1>` per page | ✅ | `<h1 class="page-header__title">Player 1 Ready</h1>` | `about.html:51` |
| Heading hierarchy | ⚠️ | The FAQ section uses a `<dl class="faq-list">` with `<dt>`/`<dd>` rather than heading elements. No `<h2>` exists for the FAQ block itself (the FAQ list is inside a section with `aria-labelledby="faq-title"` but `faq-title` is an h2 that is the first element in the section). Valid HTML but the FAQ dt elements are styled like headings without being `<h3>` or similar. No broken hierarchy. | `about.html:97-120` |
| OG absolute URLs | ✅ | All absolute | `about.html:12-15` |
| Twitter card | ✅ | Complete | `about.html:16-20` |

---

## sitemap.xml

| Check | Status | Detail | Citation |
|---|---|---|---|
| All 8 pages present | ✅ | index, features, clients, download, plugins, docs, hub, about — all present | `sitemap.xml` |
| Absolute URLs | ✅ | All `<loc>` entries are absolute `https://` URLs | `sitemap.xml:4,9,14,19,24,29,34,39` |
| `<changefreq>` and `<priority>` | ✅ | Present on all entries | `sitemap.xml` |

---

## robots.txt

| Check | Status | Detail | Citation |
|---|---|---|---|
| References sitemap | ✅ | `Sitemap: https://detain.github.io/phlix-website/sites/pixel-dungeon/sitemap.xml` | `robots.txt:4` |
| User-agent: * | ✅ | `User-agent: *` | `robots.txt:1` |

---

## Cross-Page SEO Issues

| # | Severity | Page(s) | Finding | Citation |
|---|---|---|---|---|
| 1 | ❌ | clients.html, docs.html, hub.html, about.html | Missing `<meta name="keywords">` | See per-page table above |
| 2 | ⚠️ | features.html | Page header h1 is "Quest Complete — All Features Unlocked" but this does not match the `<title>` "Features — Phlix". The h1 should reflect "Features" as a clear page topic. The game-style headline is on-brand but the h1 content diverges significantly from the nav label and page title. | `features.html:54` vs `features.html:6` |
| 3 | ⚠️ | download.html | Client card names use h3 while clients.html uses h2 for the same semantic element. Heading levels for the same content type are inconsistent across pages. | `download.html:75,87,99,111,123` vs `clients.html:62,77,91,106,120` |
| 4 | ⚠️ | about.html | FAQ section uses `<dl>` with `<dt>` elements styled as headings rather than proper `<h3>` elements. The FAQ dt text is styled via `.faq-list dt { font-family: var(--font-ui); ... text-transform: uppercase; }` but is not semantically a heading. A screen reader will not recognize these as section headings. | `about.html:100-118` |

---

## Summary

| Check | Score | Notes |
|---|---|---|
| `<title>` ≤ 60 chars | 8/8 ✅ | All pages pass |
| `<meta name="description">` ≤ 160 chars | 8/8 ✅ | All pages pass |
| `<meta name="keywords">` present | 4/8 ❌ | Missing on about, clients, docs, hub |
| `<link rel="canonical">` absolute | 8/8 ✅ | All pages pass |
| One `<h1>` per page | 8/8 ✅ | All pages pass |
| Heading hierarchy no skip | 6/8 ⚠️ | features and download have minor issues |
| JSON-LD on home page only | 1/1 ✅ | index.html only |
| sitemap.xml (8 pages, absolute) | ✅ | Complete |
| robots.txt referencing sitemap | ✅ | Present |

**SEO Score: 85 / 100**

The site has strong SEO fundamentals: correct title lengths, canonical URLs, absolute OG/Twitter URLs, structured data on home, complete sitemap and robots.txt. The primary deficiencies are the missing `<meta name="keywords">` on 4 of 8 pages and some heading hierarchy inconsistencies between pages that use the same content patterns (client cards, feature sections).
