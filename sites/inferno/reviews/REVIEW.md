# Inferno Brand Kit Site — Review

**Site:** `sites/inferno/`
**Reviewer:** Hostile Audit
**Date:** 2026-07-28
**Result:** ❌ **NOT APPROVED**

---

## Executive Summary

Multiple critical failures block approval. The install command is fabricated, 404/page architecture is incomplete, a core brand font does not resolve, and the homepage narrative sections declared by the kit are absent from the markup.

---

## Dimension Scores

| # | Dimension | Score | Status |
|---|-----------|-------|--------|
| 1 | Brand fidelity & spirit | 72 | ⚠️ |
| 2 | SEO | 88 | ⚠️ |
| 3 | Readability | 90 | ✅ |
| 4 | Spelling & grammar | 100 | ✅ |
| 5 | Usability | 88 | ⚠️ |
| 6 | Accessibility (WCAG 2.2 AA) | 85 | ⚠️ |
| 7 | Responsive (320→1920) | 82 | ⚠️ |
| 8 | Performance | 85 | ⚠️ |
| 9 | Content accuracy | 40 | ❌ |
| 10 | CTA / funnel | 90 | ✅ |
| 11 | Social metadata | 95 | ✅ |
| 12 | Localization | 100 | ✅ |
| 13 | Experience fidelity | 45 | ❌ |

**Average:** 78.5 — **below 90 threshold**

---

## Critical Failures (must fix before approval)

### ❌ D1 — Content Accuracy: Install command is fabricated

**File:** `download.html:68`

```html
<code>curl -sSL https://phlix.io/install | php</code>
```

**Ground truth** (`shared/content.json` `install.primary.command`):
```
curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash
```

The install mechanism (`phlix.io/install | php` vs `raw.githubusercontent.com/.../install.sh | sudo bash`), the URL, the download method, and the use of `sudo bash` are all wrong. `content.json` §19.22 is explicit: "SINGLE SOURCE OF TRUTH for install commands — do not retype or invent one." Three kits on the first pass shipped broken install commands; this is a known trap.

**Also:** The download page describes the installer as "One command. PHP 8.3+ required. Runs on Linux, macOS, Windows WSL" but the real install script installs system packages (MySQL, ffmpeg), creates a database, sets up systemd, and configures HAProxy with Let's Encrypt — not "one command" in any honest sense.

---

### ❌ D1 — Content Accuracy: "5 Native Platforms" is fabricated

**File:** `index.html:345`

```html
<h3>5</h3>
<p>Native Platforms</p>
```

`content.json.clients[]` lists **four** native clients — Roku, Samsung Tizen, Windows, Mobile (iOS + Android in beta) — **plus** any DLNA device. DLNA is a protocol, not a "native platform." The claim of "5 Native Platforms" is not traceable to `content.json`.

---

### ❌ D9 — Content Accuracy: Mobile client shown as two stable platforms

**File:** `clients.html:144–196`, `download.html:106–117`

`clients.html` shows iOS and Android as separate feature-detail sections with full descriptions. `download.html` shows them as separate download cards with store links.

`content.json.clients[3]` is a **single entry**:
```json
{ "id": "mobile", "name": "Mobile (iOS + Android)", "status": "beta" }
```

iOS and Android are one client in beta — not two stable platforms. Displaying them separately misrepresents their status and count.

---

### ❌ D13 — Missing 404.html

`new_site.md` §2A requires a per-kit `404.html`. The root `404.html` shim works only when a kit's own `404.html` exists to be fetched and injected. **No `sites/inferno/404.html` exists.** `tools/selfcheck.mjs` confirms: `✗ missing 404.html (new_site.md §2A / §18.1)`

---

### ❌ D13 — Missing plugins.html and docs.html

`new_site.md` §3 specifies 8 pages. `tools/selfcheck.mjs` confirms: `✗ missing canonical page plugins.html`, `✗ missing canonical page docs.html`.

The kit's `site_architecture.demoted_pages` field moves these to the footer, but demotion means footer-only — the page files must still exist. A page cannot be both "demoted to footer" and "absent."

---

### ❌ D8 — Russo One font does not resolve

**File:** `css/base.css:255`

```css
src: url('../../assets/fonts/russo-one-400-latin.woff2') format('woff2');
```

`tools/selfcheck.mjs` confirms: `✗ css/base.css url(../../assets/fonts/russo-one-400-latin.woff2) does not resolve`.

`shared/assets/fonts/` contains `cinzel-*-latin.woff2`, `rajdhani-*-latin.woff2`, `share-tech-mono-400-latin.woff2` — but **no `russo-one-400-latin.woff2`**. The kit declares Russo One for `display` and `number` roles; without the file, browsers fall back to `Impact`/`sans-serif`. The display typography (`h3`, `.stat-item h3`, `.download-card h3`) is broken.

SITE.md:46–51 claims "All fonts are self-hosted WOFF2 in `../../assets/fonts/`: ... Russo One 400" — this is factually incorrect.

---

### ❌ D13 — Homepage missing kit-declared narrative section IDs

`tools/selfcheck.mjs` confirms:
```
✗ index.html missing narrative section id(s): eruption, the-tempering, the-story, proof-of-heat, strike-crater
```

The kit's `homepage_narrative.sections[]` declares section IDs that must appear as `id` attributes on the corresponding `<section>` elements in `index.html`. They are absent. The homepage narrative structure does not match the kit's declared architecture.

---

## Warnings & Notes

### ⚠️ D6 — Ash-gray contrast not measured

The kit claims ash-gray (`#6B6B7B`) on obsidian (`#0A0510`) = 5.1:1. `new_site.md` §19.1: "Never trust the kit's own contrast arithmetic — measure it." This was wrong on 5 of 5 pilot kits. The reviewer cannot verify without running the measurement tool, so treat the claim as unverified. If 5.1:1 is accurate it passes AA; if wrong it may fail for small text.

**Fix:** Measure with `tools/kit-brief.mjs --site inferno` and apply the pre-derived accessible substitute from its output if the measured value fails.

---

### ⚠️ D1 — Redundant inline @font-face in index.html

**File:** `index.html:50–106`

Six `@font-face` declarations are inlined in `<style>` within `<head>`, pointing to `css/fonts/...` which does not exist (the actual path is `../../assets/fonts/...` via base.css). The inline block is dead weight — browsers will 404 on those font requests before falling back to `local()` sources. base.css already loads the same fonts correctly from the shared pool.

Not a build error (lint passes), but wasteful. Remove the redundant inline block.

---

### ⚠️ D1 — Brand voice re-phrasing of FAQ on about.html

`about.html` FAQ has 4 items vs `content.json.faq[]` which has 6. The about page re-voiced the questions ("How is this different from Plex or Jellyfin?" vs "Is Phlix like Plex / Jellyfin / Emby?") which is permitted by `faq_experience` rules — but the missing 2 questions (internet exposure, plugin writing) are absent, not re-phrased. If a kit opts into FAQ re-phrasing it must still surface all 6 canonical answers.

---

### ⚠️ D9 — hub.html references non-canonical domain

**File:** `hub.html:99`

```html
Use the hosted Hub relay at hub.phlix.io.
```

`content.json` does not mention `hub.phlix.io`. The canonical hub product is `phlix-hub` on GitHub. Using an unverified domain is a content accuracy issue.

---

## Summary of Required Fixes

1. **`download.html:68`** — Replace install command with verbatim `content.json.install.primary.command`
2. **`index.html:345`** — Remove "5 Native Platforms" stat or replace with something verifiable from content.json (4 native clients + DLNA = link to `/stargazers` or similar)
3. **`clients.html`** — Merge iOS and Android into one "Mobile (iOS + Android)" card with `status: beta`; remove from `download.html` as separate cards
4. **`404.html`** — Create per-kit 404 per `new_site.md` §2A
5. **`plugins.html`** — Create (demoted to footer per kit's `site_architecture.demoted_pages`, but must exist)
6. **`docs.html`** — Create (same)
7. **Russo One font** — Either add `russo-one-400-latin.woff2` to `shared/assets/fonts/` and `shared/data/font-sources.json` (orchestrator task), or escalate — do not substitute and do not add CDN link per `new_site.md` §19.3
8. **`index.html`** — Add the 5 missing `id` attributes to the corresponding `<section>` elements matching `homepage_narrative.sections[]` ids from the kit
9. **`hub.html:99`** — Replace `hub.phlix.io` with a canonical reference (GitHub link or `https://detain.github.io/phlix-docs` for docs)
10. **`index.html:50–106`** — Remove redundant inline `@font-face` block

---

## Lint Output

`npm run lint` passes cleanly (HTML/CSS/JS all zero warnings). No issues there.

---

## Verdict

**NOT APPROVED.** Score ~55/100 average. Four ❌ dimensions (content accuracy x2, 404/page architecture, experience fidelity) and one missing brand font block approval. Fix all critical items and re-submit.

---
