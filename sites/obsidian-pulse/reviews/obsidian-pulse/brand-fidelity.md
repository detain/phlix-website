# Brand Fidelity Review — Obsidian Pulse Site

**Reviewer:** Adversarial Brand Fidelity Reviewer
**Date:** 2026-07-01
**Site:** `/home/sites/phlix/phlix-website/sites/obsidian-pulse/`
**Ground truth:** `brand-kits/obsidian-pulse.js` (v1.0, 1066 lines) + `new_site.md` (451 lines) + `shared/content.json` (197 lines)

---

## Layout Archetype Choice — `showcase`

**Chosen archetype:** `showcase`

**Why `showcase` fits the kit:**

The kit's `layout_patterns.landing` pattern reads:

> "Full-bleed dark hero with animated pulse line → three-column features → technical specs → CTA."

This maps precisely to the **`showcase`** archetype — the most immersive and cinematic layout option in the Phlix scaffold system. The `showcase` archetype demands:

- Full-viewport dark hero (obsidian background) as the visual anchor
- Centered architectural compositions with extreme negative space on all four sides
- A single bold visual motif (the animated pulse scan line) as the hero's only ornament
- Cinematic horizontal framing with strict grid alignment

The Obsidian Pulse brand DNA is "matte black and electric blue, machined not decorated, silent not loud" — the `showcase` archetype's dark immersion and restraint perfectly express this. The kit's `art_direction` explicitly calls for "centered and architecturally balanced" compositions with "extreme negative space on all four sides." The `landing` layout pattern's sequencing — hero → features → CTA — is the exact structure implemented. This is the correct archetype choice, executed faithfully.

---

## Overall Brand Fidelity Score

**Score: 68 / 100**

The site is structurally sound — colors, spacing, typography roles, motion, and shadows all correctly use design tokens. However, it has **3 ❌ critical defects** (including one spec violation that also creates a broken visual state: fonts load from an empty directory and the CDN fallback), and **3 ⚠️ voice/microcopy violations** that breach the kit's "precise, direct, authoritative, understated" voice mandate.

---

## Dimension Scores

| Dimension                | Score   | Status |
| ------------------------ | ------- | ------ |
| Color tokens             | 95/100  | ✅     |
| Font families            | 40/100  | ❌     |
| Border radius            | 100/100 | ✅     |
| Spacing scale            | 100/100 | ✅     |
| Shadows                  | 100/100 | ✅     |
| Motion speed/easing      | 95/100  | ⚠️     |
| Single Pulse Blue accent | 95/100  | ⚠️     |
| Obsidian background      | 100/100 | ✅     |
| Hairline dividers        | 100/100 | ✅     |
| No mascot                | 100/100 | ✅     |
| Voice / avoid_words      | 80/100  | ⚠️     |
| Primary CTA              | 100/100 | ✅     |
| Layout archetype         | 100/100 | ✅     |
| CDN/font self-hosting    | 0/100   | ❌     |

---

## Findings

---

### ❌ CRITICAL DEFECT 1 — Google Fonts CDN Links in All 8 HTML Files

**Severity:** CRITICAL — spec violation + broken visual fallback
**Files:** `index.html:33-35`, `features.html:33-35`, `download.html:33-35`, `clients.html:33-35`, `hub.html:33-35`, `plugins.html:33-35`, `docs.html:33-35`, `about.html:33-35`

```
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Space+Grotesk:wght@300;400;500&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

**Spec rule:** `new_site.md` §6 explicitly states:

> "No CDN dependencies in the deployed page (no Google Fonts `<link>` to `fonts.googleapis.com`, no script CDNs). **Self-host fonts** as WOFF2 and declare them with `@font-face` + `font-display: swap`."

This is a hard requirement, not a preference. The BUILD_LOG.md acknowledges this deviation ("Noted for production build step") but the site shipped with it unresolved.

**Fix:** Remove the three `<link>` elements from every HTML file's `<head>`. The `@font-face` declarations in `base.css:7-93` already point to self-hosted WOFF2 files — those are the correct implementation.

---

### ❌ CRITICAL DEFECT 2 — Empty `css/fonts/` Directory (No Self-Hosted Font Files)

**Severity:** CRITICAL — `@font-face` declarations point to non-existent files; the entire typographic identity is broken without CDN fallback
**File:** `css/fonts/` (directory exists, 0 files inside)

The `base.css:7-93` declares `@font-face` rules referencing:

- `fonts/dm-sans-300.woff2` (base.css:12)
- `fonts/dm-sans-400.woff2` (base.css:20)
- `fonts/dm-sans-500.woff2` (base.css:28)
- `fonts/space-grotesk-300.woff2` (base.css:36)
- `fonts/space-grotesk-400.woff2` (base.css:44)
- `fonts/space-grotesk-500.woff2` (base.css:52)
- `fonts/inter-400.woff2` (base.css:60)
- `fonts/inter-500.woff2` (base.css:68)
- `fonts/inter-600.woff2` (base.css:76)
- `fonts/jetbrains-mono-400.woff2` (base.css:84)
- `fonts/jetbrains-mono-500.woff2` (base.css:92)

None of these files exist. The CDN link in HTML is the only thing preventing a font-stack fallback. The `BUILD_LOG.md:72` explicitly calls this out:

> "No WOFF2 font files in css/fonts/ — The spec expects actual font files. These would be populated at build time from Google Fonts."

**Fix:** Populate `css/fonts/` with WOFF2 font files for all 11 declared faces. The site's visual fidelity depends on these being present — without them, the layout will fall back to system sans-serif/monospace stacks, destroying the kit's typographic precision.

---

### ❌ CRITICAL DEFECT 3 — `"Get started"` CTA Label in `features.html:181`

**Severity:** CRITICAL — brand voice violation (precise/direct/authoritative language only)
**File:** `features.html:181`
**Current copy:** `<h2>Get started in minutes</h2>`

**Spec rule:** `obsidian-pulse.js:673-675` — voice is `["Precise", "Direct", "Authoritative", "Understated"]`; `obsidian-pulse.js:678-681` — "Copy should feel like the product manual of a luxury device — clear, precise, trusted." The avoid_words list (`obsidian-pulse.js:688-692`) prohibits casual marketing language. "Get started in minutes" is vague (what does "minutes" mean? 2? 10?), casual, and implies ease rather than precision — it is exactly the kind of marketing copy the kit forbids.

Additionally, "in minutes" violates the kit's preference for **numbers over adjectives** (`obsidian-pulse.js:678` — "Technical accuracy over marketing warmth. Numbers over adjectives.").

**Fix:** Replace with precise, factual language. Options:

- `"Download Phlix and begin."` (direct, no time claim)
- `"Ready to run."` (minimal, technical)
- `"Begin setup."` (precise verb, no casual framing)

---

### ⚠️ WARNING 1 — `"Get started"` in Hub CTA Button

**Severity:** WARN — brand voice (casual marketing phrase)
**File:** `hub.html:92`
**Current copy:** `<a href="download.html" class="btn btn-primary btn-large">Get started</a>`

"Get started" is casual, non-technical phrasing. The kit requires "direct" voice. A button reading "Get Phlix" (from `content.json.hero.primary_cta.label`) would be more precise and consistent with the kit's language.

**Fix:** Change button label to `"Get Phlix"` per `content.json.hero.primary_cta`.

---

### ⚠️ WARNING 2 — `"Need help getting started?"` in Download CTA Banner

**Severity:** WARN — brand voice (casual/informal phrasing)
**File:** `download.html:145`
**Current copy:** `<h2>Need help getting started?</h2>`

Two problems: (1) "getting started" is casual; (2) the question form is conversational where the kit's voice is declarative. The kit's notification style (`obsidian-pulse.js:706-708`) says "State the event, provide one action if needed. No emojis. No exclamation marks." The preferred tone is direct statement, not question.

**Fix:** Replace with `"Begin here."` or `"Start the server."` — a direct, precise directive.

---

### ⚠️ WARNING 3 — `"Build something great"` in Plugins CTA Banner

**Severity:** WARN — brand voice ("great" is a vague superlative)
**File:** `plugins.html:93`
**Current copy:** `<h2>Build something great</h2>`

The kit's avoid_words list does not explicitly include "great," but the voice guidelines (`obsidian-pulse.js:688-692`) prohibit "beautiful" and "exciting" as vague adjectives. "Great" is the same category — imprecise, subjective, marketing-adjacent. The kit's writing style (`obsidian-pulse.js:678`) is "Short, declarative sentences. No filler. Active voice only." "Build something great" is filler-heavy and imprecise.

**Fix:** Replace with `"Build a plugin."` or `"Write a plugin."` — direct, specific, no vague adjectives.

---

### ⚠️ WARNING 4 — Multiple `btn-primary` (Pulse Blue Fill) Elements Per Screen

**Severity:** WARN — kit rule: "single Pulse Blue accent per screen"
**Files:** `download.html:92-112` (5× `btn-primary` on one page)

The kit's `color_rules` (`obsidian-pulse.js:377`) and `do_dont.colors.dont` (`obsidian-pulse.js:916`) state: "Apply Pulse Blue as a fill to more than one element per screen." The `ui_generation_rules` (`obsidian-pulse.js:733`) say "Use only one accent color per screen: Pulse Blue (#00B4FF)." The download page renders 5 separate `btn-primary` download cards with Pulse Blue fills simultaneously — this violates the single-accent rule.

The primary CTA button on download cards should use the secondary/ghost style (`btn-secondary` or `btn-ghost`) per the kit's button spec (`obsidian-pulse.js:585`), which reserves Pulse Blue fill for the single primary CTA per view.

**Fix:** Change the download card buttons from `btn-primary` to `btn-secondary` on `download.html:92, 97, 102, 107, 112`. Keep only one `btn-primary` (the CTA banner's "Read the docs" link is already `btn-secondary` at download.html:146, but the main CTA banner at the bottom uses no primary button — consider adding one if appropriate for the page's conversion goal).

---

## ✅ Findings — Correctly Implemented

| Check                                        | Status | Reference                                                                                                                                                                                     |
| -------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CSS color tokens all from kit                | ✅     | `base.css:98-115` — all tokens match `design_tokens.color`                                                                                                                                    |
| No off-palette hex values in CSS             | ✅     | All color values trace to `var(--color-*)`                                                                                                                                                    |
| Font families from kit roles                 | ✅     | DM Sans / Space Grotesk / Inter / JetBrains Mono only                                                                                                                                         |
| Border radius ≤ 4px (kit max)                | ✅     | `base.css:135-139`; 2px/4px used in components                                                                                                                                                |
| Spacing scale only allowed values            | ✅     | `base.css:123-132`; all values from kit scale                                                                                                                                                 |
| Shadows pure cool black, no warm tones       | ✅     | `base.css:181-184`; all `rgba(0, 0, 0, …)`                                                                                                                                                    |
| Motion speed 300-500ms                       | ✅     | `base.css:192` `--duration-slow: 400ms`; `main.js:65` `400ms`                                                                                                                                 |
| Easing `cubic-bezier(0.25, 0.0, 0.0, 1.0)`   | ✅     | `base.css:191` `--ease-out: cubic-bezier(0.25, 0.0, 0.0, 1.0)`                                                                                                                                |
| Obsidian background (#0A0B0E)                | ✅     | `base.css:102` `--color-bg: #0A0B0E`                                                                                                                                                          |
| Hairline dividers (#2A2E38)                  | ✅     | `base.css:111` `--color-border: #2A2E38`                                                                                                                                                      |
| No mascot (`mascot: null`)                   | ✅     | No mascot present anywhere in site                                                                                                                                                            |
| Primary CTA: Pulse Blue fill + obsidian text | ✅     | `components.css:161-165` — `background: var(--color-primary); color: var(--color-bg)`                                                                                                         |
| Layout archetype `showcase`                  | ✅     | Correctly implemented: full-viewport hero, centered, extreme negative space                                                                                                                   |
| Pulse scan line animation                    | ✅     | `theme.css:159-176` — `@keyframes pulse-scan` 4s, `cubic-bezier(0.25, 0.0, 0.0, 1.0)`, infinite                                                                                               |
| Reduced motion respected                     | ✅     | `theme.css:178-183`, `base.css:325-332`, `main.js:38-42`                                                                                                                                      |
| Logo per kit `logo_rules`                    | ✅     | `img/logo.svg` — Space Grotesk 300, optical white wordmark, single Pulse Blue bar beneath                                                                                                     |
| Favicon: obsidian square, Pulse Blue bar     | ✅     | `img/favicon.svg` — correct kit symbols                                                                                                                                                       |
| No banned avoid_words                        | ✅     | No "amazing", "incredible", "magic", "seamless", "easy", "beautiful", "exciting", "awesome", "powerful", "revolutionize", "cutting-edge", "next-generation", "industry-leading" found in copy |
| Headline font weights light/regular only     | ✅     | `base.css:162-165` — `--weight-light: 300`, `--weight-regular: 400`; `theme.css:15, 23` apply these to h1/h2                                                                                  |
| Scroll reveal animation correct              | ✅     | `main.js:65` — `opacity 400ms cubic-bezier(0.25, 0.0, 0.0, 1.0), transform 400ms …`                                                                                                           |
| Focus ring: 1px Pulse Blue + glow            | ✅     | `base.css:293-297` — `outline: 1px solid var(--color-focus); box-shadow: 0 0 8px var(--color-primary-glow)`                                                                                   |

---

## Summary

| Severity                | Count  |
| ----------------------- | ------ |
| ❌ Critical (must fix)  | **3**  |
| ⚠️ Warning (should fix) | **4**  |
| ✅ Compliant            | **22** |

### Critical defects requiring immediate fix:

1. **`index.html`, `features.html`, `download.html`, `clients.html`, `hub.html`, `plugins.html`, `docs.html`, `about.html`** — Remove Google Fonts CDN `<link>` elements (lines 33-35 in each file). Self-hosted fonts via `@font-face` in `base.css` are the correct implementation.
2. **`css/fonts/`** — Populate with actual WOFF2 font files for all 11 declared faces. Without these, the site falls back to system fonts and the typographic identity is broken.
3. **`features.html:181`** — Change `"Get started in minutes"` to precise, non-caveated language. The kit forbids both the casual phrasing and the vague time claim.

### Warnings requiring fix before ship:

4. **`hub.html:92`** — Change `"Get started"` button to `"Get Phlix"`.
5. **`download.html:145`** — Change `"Need help getting started?"` to a direct, declarative statement.
6. **`plugins.html:93`** — Change `"Build something great"` to `"Build a plugin."` or similar.
7. **`download.html:92-112`** — Change all 5 `btn-primary` download-card buttons to `btn-secondary`; only one Pulse Blue fill per screen is permitted.

**Post-fix re-score target: 90+ / 100**
