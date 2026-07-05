# Brand Fidelity Review — Speakeasy Gold (Round 3)

**Reviewer:** Senior Brand Designer
**Date:** 2026-07-04
**Kit:** Speakeasy Gold v1.0
**Scope:** 8 HTML pages + css/base.css, css/theme.css, css/components.css

---

## Round 2 Fixes — All Verified ✅

| # | Fix | Status |
|---|-----|--------|
| 1 | `stroke-linecap: square` in components.css | ✅ components.css:353–357 |
| 2 | `.sunburst { display: none }` under `prefers-reduced-motion` | ✅ theme.css:135–139 |
| 3 | Google Fonts CDN removed from all `@font-face` | ✅ base.css:15–91 — `src: local(...)` only |
| 4 | "ecosystem" → "The Establishment" / "The Vault's Collection" | ✅ docs.html:71, plugins.html:67, download.html:99 |
| 5 | JSON-LD added to index.html | ✅ index.html:32–48 |
| 6 | cta-banner added to docs.html and about.html | ✅ docs.html:81–86, about.html:100–105 |
| 7 | hub.html `<title>` moved before stylesheets | ✅ hub.html:25 (before link:26) |
| 8 | Hero h1 `letter-spacing: var(--tracking-headline)` | ✅ theme.css:170 = 0.12em |
| 9 | `[aria-expanded="true"]` visual state; SVG morphs | ✅ components.css:58–60, 138–141 |
| 10 | `overflow-wrap: break-word` on all headings | ✅ base.css:203 |

---

## Round 3 Fixes — All Verified ✅

| Item | Fix | Location |
|------|-----|----------|
| 1 | Hero CTA label = "Reserve your vault" | index.html:93 |
| 2 | Eyebrow "The Evening's Programme" on pitch | index.html:102 |
| 3 | Eyebrow "On the Programme" on features overview | index.html:119 |
| 4 | "See all features" → "Enter the programme" | index.html:186 |
| 5 | CTA banner "Pour yourself something good." | index.html:193 |
| 6 | features.html CTA "The vault is open. Step inside." + "Reserve your vault" | features.html:163–164 |
| 7 | clients.html CTA "Every room. One password." + "Reserve your vault" | clients.html:139–140 |
| 8 | Clients page eyebrow "The Guest Register" | clients.html:56 |
| 9 | Download page server section eyebrow "First Pressings" | download.html:62 |
| 10 | `.btn-small` `min-height: 44px` | components.css:303 |

---

## Dimension 1 — Brand Fidelity & Spirit

### 1. Brand Voice in Micro-Copy

**Score: Strong (with one qualification)**

The Speakeasy Gold brand voice — conspiratorial, elegant, witty, 1920s-inflected — is clearly present in the new micro-copy added in Round 3:

- **Eyebrows:** "The Evening's Programme" (index pitch), "On the Programme" (features overview), "The Guest Register" (clients), "First Pressings" (download server) — all from the brand kit's `vocabulary` list. Each one sets atmosphere before the reader processes feature content.
- **CTAs:** "Reserve your vault" (hero), "Pour yourself something good." (index CTA banner), "The vault is open. Step inside." (features CTA), "Every room. One password." (clients CTA) — these are strong applications of the brand's conspiratorial, invitation-based tone. They deploy 1920s vocabulary ("vault", "pour", "room", "password") naturally.
- **Section headings:** "The Establishment" (docs, download) and "The Vault's Collection" (plugins) properly replace "ecosystem", drawing directly from the brand vocabulary.

**Qualification:** Some hero and page-lead copy remains technically anchored rather than atmosphere-forward:
- Hero eyebrow: "Self-hosted media server" — generic
- Hero sub: "An open-source PHP media server that streams to your Roku..." — technically accurate but reads as standard product marketing rather than brand copy
- Feature card descriptions: "Folder-watcher hashes mtimes, scanner parses S01E02 / (2020) titles, ItemRepository hydrates metadata_json" — this is developer-documentation copy, not 1920s speakeasy copy. It does not describe the experience; it describes the implementation.

These were present in Round 2 and approved then. They represent an intentional product-documentation approach for a technical product. Whether they should be rewritten to brand copy ("Drop a file in, see it appear — like magic") is a product decision beyond this brand kit review.

### 2. avoid_words — Absent ✅

Scanned all 8 HTML pages. **Zero occurrences** of: `leverage`, `synergy`, `robust`, `cutting-edge`, `disruptive`, `ecosystem`, `utilize`, `streamline`, `empower`, `solution`.

Note: "ecosystem" was present as a heading in Round 2 (verified absent in Round 3).

### 3. Icon `stroke-linecap: square` ✅

Applied globally to `.feature-icon svg` and `.feature-detail-icon svg` in components.css:353–357. This is the correct Art Deco geometric UI icon rule per the brand kit's `icon_rules`: "UI icons use square caps."

### 4. Design Principles Honored ✅

| Principle | Implementation | Status |
|-----------|----------------|--------|
| "Every screen should feel like stepping through a velvet curtain into gold light" | Midnight black backgrounds, gilded-candelabra radial gradient in hero, page-header, and CTA banner sections | ✅ |
| "Geometry first — Art Deco patterns, sunbursts, fan vaults, stepped arches anchor every layout" | CSS-only sunburst on hero, Art Deco diamond bullet markers in pitch list, stepped-arch composition implied by radial glow layering | ✅ |
| "Gold is not decoration; it is the primary visual signal of importance" | h1–h3 in Poiret One champagne gold, primary CTA buttons with Bourbon Pour gradient, active nav underline in gold | ✅ |
| "Dark surfaces set the mood; let content glow against midnight black" | `#0A0806` background on body, surface panels `#15110D`, CTA on `#0A0806` with gold | ✅ |
| "Restraint in density — a speakeasy is atmospheric, never cluttered" | Generous section padding, max 4-column auto-fill grid, centered single-column inner content at 960px | ✅ |
| "Typography carries the era: geometric capitals for headlines, elegant serif for prose" | Poiret One + Josefin Sans all-caps for headlines/UI; Cormorant Garamond for body | ✅ |
| "Motion should feel like a Charleston step: precise, rhythmic, with a little thrill" | Hero fade-in (0.8s ease), sunburst rotation at 120s (very slow, deliberate), card hover lift (3px, 200ms ease) — all medium, deliberate pacing | ✅ |
| "Every empty state is an invitation, not an apology" | 404/docs missing-content not evaluated in this review | N/A |

### 5. No brand_opposites Drifts ✅

| Opposite | Status |
|----------|--------|
| Not flat, clinical, or tech-startup minimal | ✅ Deep midnight black backgrounds, warm gold, atmospheric layering |
| Not pastel or soft-casual | ✅ Champagne gold + bourbon amber + Art Deco emerald — no pastels |
| Not family-friendly primary colors | ✅ No primary colors anywhere |
| Not futuristic or sci-fi chrome | ✅ Art Deco geometric vocabulary, no chrome or neon |
| Not corporate navy-and-white | ✅ Midnight black + champagne gold palette throughout |
| Not horror or grimdark | ✅ Warm amber candlelight aesthetic; nothing horror |
| Not noisy or visually cluttered | ✅ Generous dark breathing room, restrained density |

---

## Summary

**Dimension 1 — Brand Fidelity & Spirit: 87 / 100**

**Strengths:**
- All 10 Round 2 fixes applied and verified
- All 10 Round 3 fixes applied and verified
- Brand vocabulary from the kit appears consistently across eyebrows, CTAs, and section headings
- Zero avoid_words in visible content
- `stroke-linecap: square` correctly applied to UI icons
- Design principles honored throughout: dark lacquer surfaces, Art Deco geometry, champagne gold as primary signal, restrained density, period-appropriate typography
- No brand_opposites drifts detected

**Deduction:**
- Feature-card copy and hero sub-descriptions remain in a technically descriptive register (developer documentation style), rather than the brand's experiential, conspiratorial voice. While this was present in Round 2, it represents the one area where brand spirit is diluted on the marketing-facing pages. Severity: minor. These are secondary content blocks, not primary brand moments.

**Near-perfect implementation of a well-specified brand kit. The micro-copy improvements in Round 3 substantially raised the visible brand voice on the homepage, features, and clients pages.**
