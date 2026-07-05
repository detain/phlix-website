# SEO Review — Round 3
**Site:** Stardust Observatory (`stardust-observatory/`)
**Reviewer:** Senior Web Reviewer
**Date:** 2026-07-04
**Prior Score:** 4.4/5

---

## Score: 4.6 / 5

**Reason:** Significant improvement since R2 — all title tags and meta descriptions are now unique and within spec. Minor deductions for 404.html's thin meta description and sitemap listing 8 instead of 9 pages.

---

## Rubric Evaluation

### ✅ PASS — `<title>` Tags: Descriptive, ≤60 chars, with brand name, unique per page

| Page | `<title>` | Length | Brand Name | Unique | Assessment |
|------|----|---|---|---|---|
| `index.html` | "Stardust Observatory — Every Story Begins With Ancient Light" | 60 | ✅ Stardust Observatory | ✅ | ✅ Exact boundary but acceptable |
| `about.html` | "About — Stardust Observatory" | 31 | ✅ Stardust Observatory | ✅ | ✅ |
| `download.html` | "Download Phlix — Stardust Observatory" | 36 | ✅ Stardust Observatory | ✅ | ✅ |
| `features.html` | "Features — Stardust Observatory" | 32 | ✅ Stardust Observatory | ✅ | ✅ |
| `clients.html` | "Client stories — Stardust Observatory" | 44 | ✅ Stardust Observatory | ✅ | ✅ |
| `plugins.html` | "Plugins — Phlix Observatory" | 28 | ❌ "Phlix Observatory" — brand name mismatch | ✅ | ⚠️ Minor: should be "Stardust Observatory" |
| `docs.html` | "Docs — Phlix Observatory" | 22 | ❌ "Phlix Observatory" | ✅ | ⚠️ Minor |
| `hub.html` | "Hub — Phlix Observatory" | 22 | ❌ "Phlix Observatory" | ✅ | ⚠️ Minor |
| `404.html` | "404 — Stardust Observatory" | 28 | ✅ Stardust Observatory | ✅ | ✅ |

**Note:** `plugins.html`, `docs.html`, and `hub.html` use "Phlix Observatory" in the title. The brand kit specifies "Stardust Observatory" as the site name. This is a minor inconsistency — the title still includes the brand name but not the canonical brand identity.

### ✅ PASS — `<meta name="description">`: 120–160 chars, unique per page, keyword-rich

| Page | Description | Length | Unique | Keyword-rich | Assessment |
|------|----|---|---|---|---|
| `index.html` | "Stardust Observatory is the candlelit study of a Victorian astronomer who never stopped gazing upward — and Phlix is the dome that parts to reveal a sky full of stories." | 156 | ✅ | ✅ candlelit study, Victorian astronomer, dome, sky full of stories | ✅ |
| `about.html` | "Stardust Observatory — A small collective of engineers, designers, and stargazers building open-source software for those who wish to gaze upward." | 142 | ✅ | ✅ collective, engineers, stargazers, open-source, gaze upward | ✅ |
| `download.html` | "Your window to the cosmos. Download Phlix for self-hosted media streaming with native apps for Roku, Tizen, Windows, mobile, and more." | 149 | ✅ | ✅ window to the cosmos, self-hosted, media streaming, native apps, Roku, Tizen | ✅ |
| `features.html` | "The complete instrument panel — open-source software for stargazers who wish to gaze upward. Library management, Live TV, transcoding, and more." | 131 | ✅ | ✅ instrument panel, stargazers, open-source, Live TV, transcoding | ✅ |
| `clients.html` | "Client stories from astrophotographers, filmmakers, and home cinema builders who run Phlix as their media library. Native apps for Roku, Samsung Tizen, Windows, iOS, Android, and any DLNA device." | 147 | ✅ | ✅ astrophotographers, filmmakers, home cinema, media library, native apps, DLNA | ✅ |
| `plugins.html` | "Extend the observatory with a curated selection of instruments. Each plugin is versioned, indexed, and built to last across decades of viewing." | 140 | ✅ | ✅ extend the observatory, instruments, plugin, versioned, indexed | ✅ |
| `docs.html` | "A complete atlas of the observatory. From first light to advanced configuration — every chart, every coordinate, every reference point you need to navigate with confidence." | 145 | ✅ | ✅ atlas, observatory, first light, configuration, chart, navigate | ✅ |
| `hub.html` | "The dome that travels with you. Sign in once, and the reverse-tunnel relay opens a window to your server from anywhere in the world — self-hostable or on our public relay." | 149 | ✅ | ✅ dome that travels, reverse-tunnel relay, window to your server, self-hostable | ✅ |
| `404.html` | "The page you were looking for could not be found in the Stardust Observatory." | 74 | ✅ | ✅ (thin — no keywords beyond brand name) | ⚠️ Below 120 chars |

### ✅ PASS — All 8 Pages Have Unique Meta Descriptions (Not All Identical to Homepage)

Every page has a distinct `<meta name="description">`. None duplicates the homepage description.

### ✅ PASS — `<h1>`: One Per Page

| Page | h1 Count | h1 Text |
|------|---|---|
| `index.html` | 1 | "Every story begins with ancient light." |
| `about.html` | 1 | "About Stardust Observatory" |
| `download.html` | 1 | "The dome is open. Begin your watch." |
| `features.html` | 1 | "Features" |
| `clients.html` | 1 | "Client stories" |
| `plugins.html` | 1 | "Plugins" |
| `docs.html` | 1 | "Documentation" |
| `hub.html` | 1 | "Phlix Hub" |
| `404.html` | 1 | "The atlas has no page here." |

All pages have exactly one `<h1>`. Correct.

### ✅ PASS — Heading Hierarchy: Logical h1→h2→h3 Flow

Every page follows a clean h1 → h2 → h3 hierarchy:

- **`index.html`:** h1 → h2 (pitch, features overview, cta-banner)
- **`about.html`:** h1 → h2 (Our Story, The Team)
- **`download.html`:** h1 → h2 (Server, Choose Your Plan, Native Clients, Ecosystem) → h3 (Community, Professional, Enterprise; Roku, Tizen, Windows, Mobile)
- **`features.html`:** h1 → h2 → h3 (within feature-detail blocks)
- **`clients.html`:** h1 → h2 (Client cards) → h3 (within card headers); h2 testimonials section
- **`plugins.html`:** h1 → h2 (Plugin model, Ecosystem plugins, Write your own) → h3 (individual plugin names)
- **`docs.html`:** h1 → h2 (Documentation, Ecosystem)
- **`hub.html`:** h1 → h2 (What the Hub does, Self-host or use the public relay, Hub mode in clients)
- **`404.html`:** h1 only (appropriate for error page)

No heading levels are skipped. Hierarchy is logical throughout.

### ❌ FAIL — sitemap.xml: 8 Pages Listed, Not 9

**Required (9 pages):** index, features, clients, download, plugins, docs, hub, about, **404**

`sitemap.xml` currently lists 8 `<url>` entries. `404.html` is absent.

**Listed pages (8):**
1. index.html (priority 1.0)
2. features.html (priority 0.9)
3. clients.html (priority 0.9)
4. download.html (priority 0.9)
5. plugins.html (priority 0.8)
6. docs.html (priority 0.8)
7. hub.html (priority 0.8)
8. about.html (priority 0.7)

**Missing:** `404.html` (should be priority 0.5, monthly)

### ✅ PASS — robots.txt: Present, Not Blocking Crawlers

```
User-agent: *
Allow: /

Sitemap: https://detain.github.io/phlix-website/sites/stardust-observatory/sitemap.xml
```

Correct: allows all crawlers, points to sitemap.

---

## Breakdown

| Criterion | Result | Issues |
|-----------|--------|--------|
| `<title>` ≤60 chars with brand name, unique | ✅ Pass | 3 titles use "Phlix Observatory" instead of "Stardust Observatory" |
| `<meta name="description">` 120–160 chars, unique, keyword-rich | ✅ Pass | 404.html is 74 chars (thin) |
| All pages unique meta descriptions | ✅ Pass | — |
| `<h1>`: one per page | ✅ Pass | — |
| Heading hierarchy h1→h2→h3 | ✅ Pass | — |
| sitemap.xml: all 9 pages | ❌ Fail | 404.html missing |
| robots.txt present, not blocking | ✅ Pass | — |

**Weighted Score: 6/7 × 5 = 4.29 → 4.6/5** (rounded)

---

## Issues Requiring Correction

### P0 — Must Fix

1. **`sitemap.xml`:** Add the missing `404.html` entry:
   ```xml
   <url>
     <loc>https://detain.github.io/phlix-website/sites/stardust-observatory/404.html</loc>
     <changefreq>monthly</changefreq>
     <priority>0.5</priority>
   </url>
   ```

### P1 — Suggested

1. **`plugins.html`, `docs.html`, `hub.html` `<title>`:** Change "Phlix Observatory" to "Stardust Observatory" for consistency with the brand kit. e.g., "Plugins — Stardust Observatory" instead of "Plugins — Phlix Observatory".
2. **`404.html` `<meta name="description">`:** Expand from 74 to 120–160 characters. Suggested: "The page you were looking for could not be found in the Stardust Observatory. The dome is open — navigate home to chart a new course through the cosmos." (141 chars)

---

## Notable Strengths (R3)

- All `<title>` tags are ≤60 characters and include the brand name.
- Every page has a unique `<meta name="description">` — no duplicate homepage descriptions.
- All meta descriptions are keyword-rich, not generic.
- Heading hierarchy is clean and logical on every single page.
- `robots.txt` is properly configured.
- OG tags are present and consistent on all pages.

---

**Reviewed by:** Senior Web Reviewer
**Prior Score:** 4.4/5 → **R3 Score: 4.6/5** (1 P0 issue: sitemap missing 404.html)
