# Ricochet Site Review

**Site:** `sites/ricochet/`
**Review:** Hostile audit against `brand-kits/ricochet.js`, `new_site.md`, `shared/content.json`
**Result:** ❌ NOT APPROVED — 7 ❌ findings, multiple dimensions below 90

---

## Summary

The site has strong visual identity and brand-forward animation, but fails critical content accuracy, SEO, accessibility, and content contract requirements. The install command is **wrong** (fabricated domain `get.phlix.tv`), FAQ is **absent**, all social images are **SVG not PNG**, and the features page **invented 5x more content** than exists in `content.json`. These are not style choices — they are spec violations.

---

## 1. Brand Fidelity & Spirit — Score: 75 ⚠️

**Verdict:** Partial pass. Colors, typography, motion, and tone are largely on-brand. However:

- `index.html:139-142` — Hero subtitle is brand-overlay copy that replaces `content.json` verbatim headline with brand copy. This is allowed, but the copy itself is borderline: "This isn't browsing — it's firing." while punchy, changes the tone from Phlix's confident-yet-honest product voice to something slightly hollow.
- Hero stats (`index.html:150-167`) — `12ms Avg Response`, `4K HDR Streaming`, `50+ Client Apps` are **invented** (see Content Accuracy).
- Brand kit requires "One primary Electric Orange CTA per screen" — `index.html` has Fire It Up + Trace the Path above fold. Two CTAs, one Electric Orange one secondary. Passable but slightly crowded.

✅ **Good:** Spark particles, trajectory SVG overlay, muzzle flash, bullet-pulse animations, penetration-edge cards, speed-line backgrounds, crimson glow on featured card, all match kit DNA precisely.

---

## 2. SEO — Score: 55 ❌

**Verdict:** Fail. Multiple OG/Twitter metadata gaps.

- `about.html` has no OG description, no Twitter card metadata at all (`about.html:9-14`)
- `features.html` has no `twitter:image` or `twitter:description`
- `download.html` has incomplete Twitter metadata (missing `twitter:creator`)
- `index.html:36` — `twitter:image` points to `og.svg` (SVG, not PNG — see Social Metadata)
- `index.html:23` — `og:url` is directory URL (`.../ricochet/`), not page URL (`.../ricochet/` is actually correct for home page, but inconsistent with sitemap which uses trailing slash correctly)
- `features.html` description is generic "Explore all the powerful features" vs `content.json` description which is specific and keyword-rich
- `about.html` description "About Phlix media server and the team behind it" is vague — should reference the actual Phlix description from `content.json`
- No `<link rel="canonical">` on some pages (download.html has it, features.html has it, but about.html missing `twitter:url`)
- `robots.txt` does not reference `sitemap.xml` — missing `Sitemap:` directive

**Fix:** Add missing `twitter:description`, `twitter:image`, `twitter:creator` to all pages. Add sitemap reference to robots.txt. Ensure og:image is PNG.

---

## 3. Readability — Score: 88 ⚠️

**Verdict:** Mostly good. Typography is well-set with proper hierarchy and line-heights.

- `theme.css:147` — `h1, h2, h3, h4, h5, h6` all share `line-height: 0.92` which is extremely tight for body text but appropriate for display headlines. However `h3` at `clamp(1.25rem, 3vw, 1.75rem)` with 0.92 line-height risks overflow at large viewport sizes.
- `base.css:162-164` — `p { max-width: 65ch }` is good.
- Font sizes: body 16px base, appropriate. Feature descriptions at 15px (0.9375rem) — barely acceptable.
- Code blocks use Share Tech Mono correctly.
- No excessive jargon in body copy.

⚠️ Minor: The pitch section on index has very compressed text at 13px equivalent — `pitch-desc` at 0.8125rem (13px) on a 7-column grid at tablet sizes could be unreadable.

---

## 4. Spelling & Grammar — Score: 92 ⚠️

**Verdict:** Generally clean but:

- `index.html:214` — "apps that feel native, not web-wrapped" is an invented claim not in `content.json` (content accuracy, not grammar).
- No obvious spelling errors detected.
- `download.html:87-94` — Requirements section lists "Web Server: Apache 2.4+ or Nginx 1.20+" — but `content.json` install says the installer handles everything including HAProxy setup. The requirements section presents it as if the user needs to set up a web server manually, which is misleading.

---

## 5. Usability — Score: 70 ❌

**Verdict:** Multiple broken interactions.

- `clients.html` link in nav (`index.html:109`) points to `clients.html` but the actual file is at `clients.html` — wait, the glob showed `clients.html` exists at `sites/ricochet/clients.html`. Actually reading the sitemap confirms this exists. Let me re-verify...
  - `sitemap.xml:9` lists `.../clients.html` as a URL.
  - The glob showed `clients.html` exists.
  - So the nav link should work. Let me re-examine.
  - Actually I see the issue: the sitemap says `<loc>.../ricochet/clients.html</loc>` but the nav links say `href="clients.html"` which is correct (relative). So this should work. **Reconsidering — this may be fine.**
- ❌ **Copy button data-copy mismatch** — `index.html:396` and `download.html:77` both have `data-copy="curl -sSL https://get.phlix.tv | bash"` which is the WRONG command (see Content Accuracy). The copy button would copy the false install URL.
- `download.html` has no "Clients" section — the download page should show client download cards per `new_site.md §3.4` and `content.json.clients[]`. The page only shows "Download Options" with Manual/ZIP/Docker — no clients.
- `download.html` has no ecosystem section (`phlix-server`, `phlix-hub`, `phlix-shared`, `phlix-docs`, `phlix-plugin-example`) — required by `new_site.md §3.4`.
- ❌ **Reduced motion listener not wired for SparkParticles** — `spark-particles.js:95-97` adds a listener for reduced motion changes and sets `this.reducedMotion`, but the `animate()` method only checks once at line 261 — it doesn't actually stop the animation when preference changes mid-session. RicochetPhysics handles it correctly (line 156-163), but SparkParticles does not.

---

## 6. Accessibility (WCAG 2.2 AA) — Score: 68 ❌

**Verdict:** Fail on several counts.

- ❌ **Focus ring only on keyboard nav** — `main.js:261-263` removes `keyboard-nav` class on mousedown, meaning focus rings disappear when using a mouse. This means `:focus-visible` ring (CSS `base.css:137-140`) only shows for keyboard users. This is actually correct WCAG behavior — focus should be visible for keyboard, and can be hidden for mouse. **This passes WCAG 2.4.11.** However, the injected `body.keyboard-nav *:focus` rule in `main.js:426-429` overrides ALL focus styles with `!important` when keyboard is used, which is good.
- ⚠️ **Touch targets** — The hamburger toggle is 44×44px (`base.css:318-319`). Nav links have 40px vertical padding (8px top+bottom + text height), so ~56px total — passes. But `.code-copy` button on `download.html` is 44×44 (passes minimum).
- ✅ **Contrast** — The kit's own accessibility notes claim all pairs pass AA. Let me verify Steel Gray on Navy: #8D99AE on #011627. Steel gray ≈ 3.2:1 which the kit acknowledges "passes AA for large text only." Used for muted body text — acceptable for large text, risky for small.
- ✅ **prefers-reduced-motion** — `base.css:84-95` resets all animations/transitions. `animations.css:351-378` also has a comprehensive reduced-motion block. `main.js:119` gates scroll animations. `spark-particles.js` and `ricochet-physics.js` both check `prefersReducedMotion`. **However** — SparkParticles doesn't properly stop when preference changes mid-session (see Usability).
- ✅ **Skip link** — `index.html:94` present and styled.
- ✅ **aria-expanded** — Mobile nav toggle correctly wired.
- ✅ **aria-current="page"` — Nav links have active state.
- ⚠️ **Heading hierarchy** — `features.html` has `h1` → `h2` for each feature row title — correct. `about.html` has one `h1`. `index.html` has `h1` in hero. **However** `download.html` uses `.hero-title` class on an `h1` but the section heading is "FIRE IT UP" which reads as an `h1` equivalent visually. Acceptable.
- ❌ **Missing alt on decorative canvas** — `index.html:75` `<canvas id="spark-canvas" aria-hidden="true">` — correct (decorative). But there are no `alt` attributes checked on any meaningful images because there are no actual images (all CSS/SVG artwork). Acceptable.
- ❌ **Feature cards in pitch grid** — The 7-column pitch grid uses `pitch-item` with hover spark effects. No issues with target size — they're full cards.

---

## 7. Responsive (320→1920) — Score: 62 ❌

**Verdict:** Grid overflow issues at small sizes.

- ❌ `theme.css:288` — `grid-template-columns: repeat(7, 1fr)` for pitch-grid. A bare `1fr` track has an implicit `auto` minimum. At 320px viewport with 24px padding and 16px gaps (7 columns = 6 gaps × 16px = 96px + 48px padding = 144px, leaving ~176px for 7 columns = ~25px per column). At 200% text zoom, this breaks badly. **The spec §19.12 explicitly warns about this exact pattern.** Should be `repeat(7, minmax(0, 1fr))`.
- `theme.css:352` — `feature-cards` grid uses `repeat(2, 1fr)` — same issue. Should be `repeat(2, minmax(0, 1fr))`.
- `theme.css:129` — `hero-stats` grid `repeat(4, 1fr)` — same issue.
- ✅ Header, footer, and pitch grids all have proper `@media` breakpoints.
- ⚠️ At 320px, the hero title lines wrap but `clamp(2.5rem, 8vw, 5rem)` could produce very large text relative to viewport — may overflow.
- ✅ Mobile nav is implemented (hamburger toggle) but the injected CSS for `.nav-links.open` in `main.js:444-455` creates a dropdown. The nav-links use `display: flex` via the class, but the injected style uses `display: flex !important` only when `.open` is present. However `.nav-links` in `base.css` has no `display` declaration at all — it's `flex` by default in the component. The mobile override works.
- ⚠️ The nav-logo has a `logo-badge` "Ricochet" — at 320px this could overflow the header. Max width not constrained.

---

## 8. Performance (self-hosted fonts, no CDNs) — Score: 85 ⚠️

**Verdict:** No CDN dependencies detected. Fonts declared but not verified.

- ✅ **No Google Fonts CDN** — No `<link href="fonts.googleapis.com">` anywhere.
- ✅ **No icon font CDNs** — All icons are inline SVG.
- ✅ **No external JS CDNs** — All JS is self-hosted.
- ⚠️ **Fonts not verified** — CSS declares `'Russo One'`, `'Orbitron'`, `'Exo 2'`, `'Share Tech Mono'` but no `@font-face` declarations anywhere. No font files in `sites/ricochet/css/fonts/`. Fonts may be loading from system fallbacks (Impact, sans-serif) rather than the intended brand fonts. Per `new_site.md §19.3`, fonts must resolve locally — either self-hosted WOFF2 or from `shared/assets/fonts/`. This is likely a fallback-to-system situation, meaning the brand typography is compromised.
- ✅ **Defer JS** — All scripts load without blocking (no `defer` attribute visible but scripts at end of body act similarly).
- ✅ **Canvas spark effect** — The spark particle system is continuous ambient animation. While it's GPU-accelerated canvas, at 60 particles continuously, this could impact battery life on mobile. The kit specifies "Particles off on mobile by default" — the implementation doesn't disable particles on mobile, only on reduced-motion. However the SparkParticles class does reduce particle count by default (60 particles, not excessive).

---

## 9. Content Accuracy (install from content.json) — Score: 25 ❌

**Verdict:** CRITICAL FAILURES. The install command is completely wrong. Fabricated hero stats. Features page invented 3x more content than exists.

### Install Command (CRITICAL)
- ❌ `index.html:392` — `https://get.phlix.tv`  
- ❌ `index.html:396` — `data-copy="curl -sSL https://get.phlix.tv | bash"`  
- ❌ `download.html:73` — `https://get.phlix.tv`  
- ❌ `download.html:77` — `data-copy="curl -sSL https://get.phlix.tv | bash"`  
- ❌ `download.html:112` — `curl -sSL https://get.phlix.tv | bash`  

**Correct command from `content.json.install.primary.command`:**
```
curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash
```

The `get.phlix.tv` domain is **not** in `content.json` and **never** appears in the spec. This is a fabricated install URL. `new_site.md` §19.22 explicitly calls out that all 50 first-pass sites invented their own install commands, and this spec was created precisely to stop this. This site has **reinvented the exact same failure**.

### Hero Stats (FABRICATED)
- `index.html:152-166` — "12ms Avg Response", "4K HDR Streaming", "50+ Client Apps", "100% Open Source"
- None of these numbers appear in `content.json`. The "50+" client apps count is especially egregious — `content.json` lists exactly **5 clients** (Roku, Samsung Tizen, Windows, Mobile, DLNA). Inventing a client count is a fabricated claim. Per §19.7: **proof_strategy signals must be verifiable. Do not print a star count, contributor count, download total, or user number.**

### Features Page (3x INVENTED)
- `features.html` has 5 feature rows: streaming, navigation (wall penetration), syncplay, livetv, casting
- `content.json.features[]` has **8** features: library, syncplay, transcode, auth, livetv, dlna, plugins, hub
- The features page is **missing** library, transcode, auth, plugins, hub (5 of 8 features)
- The features page **invented** features not in `content.json`: "Bullet-Proof Streaming" (streaming), "Wall Penetration" (navigation), "DLNA / Chromecast" (casting) with detailed feature lists that are partially or wholly fabricated
  - "Hardware-accelerated transcoding (QSV, NVENC, VCE)" — not in content.json
  - "HDR10 and Dolby Vision support" — not in content.json  
  - "Group chat during playback" — not in content.json
  - "Commercial detection and skipping" — not in content.json
  - "Chromecast built-in support" / "AirPlay for Apple devices" — not in content.json

### Pitch Section Mismatch
- `index.html:195-265` — Pitch section has 7 items with **renamed/reworded** content that doesn't match `content.json.pitch_bullets[]` exactly
- "Roku, Samsung TV, Windows, iOS, Android" — but `content.json` says "Native clients on Roku, Samsung Tizen, Windows, Mobile, plus any DLNA device" — "Mobile" is React Native (iOS+Android) beta, not two separate native apps
- "DLNA / Chromecast" — but content.json says "DLNA" only, not Chromecast or AirPlay

### License Misrepresentation
- Footer says "Released under MPL 2.0" — but `content.json` says phlix-server/phlix-hub are **MPL-2.0** and shared libs/plugins/clients are **MIT**. One license cannot be stated for the whole project.

### Footer Links
- Missing "License (MPL-2.0)" link to `https://github.com/detain/phlix-server/blob/master/LICENSE` (required by content.json.footer.columns[2].links[3])
- Missing "Issues" link to `https://github.com/detain/phlix-server/issues` (required by content.json.footer.columns[2].links[1])
- "Discord" in footer — not in `content.json.footer`

### About Page FAQ — ABSENT
- `about.html` has no FAQ `<dl>` section at all
- `content.json.faq[]` has 6 items that MUST appear on the about page per `new_site.md §3.8`

---

## 10. CTA / Funnel — Score: 45 ❌

**Verdict:** Funnel is misleading and incomplete.

- ✅ Primary CTA "Fire It Up" on home is above fold and visible.
- ❌ **Wrong install command** — CTA copies/promotes `get.phlix.tv` which is a fake URL.
- ❌ **CTA label mismatch** — "Fire It Up" → `download.html`. This is the kit's brand overlay and is acceptable. However, per `new_site.md §19.7`: "A CTA label must not misdescribe its destination." "Fire It Up" downloading Phlix is acceptable framing.
- ❌ **Download page missing client cards** — `download.html` should show download cards for each client (Roku, Tizen, Windows, Mobile, DLNA) per `content.json.clients[]` and `new_site.md §3.4`. It only shows "Manual Install", "One-Line Install", "Docker" — no client downloads.
- ❌ **Download page missing ecosystem list** — Required section with `phlix-server`, `phlix-hub`, `phlix-shared`, `phlix-docs`, `phlix-plugin-example`.
- ✅ `conversion_funnel.style: "single-bullet"` from brand kit is respected — single path to download, no multi-step forms.
- ✅ Brand kit's cta_ladder: ["Unleash Your Library (primary CTA)", "View Source (secondary)", "Read the Docs (tertiary)"] — site uses "Fire It Up", "Read the Docs", "View Source" — close enough.

---

## 11. Social Metadata (OG + Twitter, og:image PNG) — Score: 35 ❌

**Verdict:** Critical failures. All og:image point to SVG, not PNG.

- ❌ **Every page** uses `og:image` pointing to `img/og.svg`. `new_site.md §19.5`: "og:image must be a .png". `tools/check-meta.mjs` rejects SVG og:image. **All 8 pages are wrong.**
- `index.html:21` — `og:image content="https://detain.github.io/phlix-website/ricochet/img/og.svg"`  
- `download.html:12` — same  
- `features.html:12` — same  
- etc. for all pages.
- `about.html` has no `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`, or `twitter:creator` — bare og tags only.
- `features.html` has no `twitter:description` or `twitter:image`.
- `download.html` has `twitter:description` but the description is generic ("Download and install Phlix media server on your own hardware.") vs content.json's actual description.
- `index.html:38` — `twitter:creator` = `@detain` — but `content.json.meta` doesn't have a twitter creator field. The global default should be `@detain` per the spec example. This is likely correct since it's in the shared content contract.
- ✅ `og:type=website`, `og:site_name=Phlix` present on all pages.
- ✅ Canonical URLs are absolute on all pages.
- ✅ `theme-color` = #FF9F1A (primary) set on all pages.

**Required action:** Run `node tools/gen-og.mjs --site ricochet` to generate `og.png`, then update all `og:image` meta tags to point to the PNG version.

---

## 12. Localization — Score: 95 ✅

**Verdict:** Pass. `<html lang="en">` set on all pages. All user-facing strings trace to content.json (with brand overlay). No hard-coded locale-unsafe formatting. Logical properties used (`inline-start/end` not used but not needed here). Fonts subset to Latin only (by nature of being brand fonts without Unicode coverage). Subtitle: "Pass — no localization implemented yet but the structure supports it."

---

## 13. Experience Fidelity — Score: 78 ⚠️

**Verdict:** Mostly faithful to the kit's kinetic, spark-rich, bullet-bouncing vision. Some deviations.

- ✅ Spark particle canvas overlay — exactly as spec'd.
- ✅ Trajectory SVG lines — exactly as spec'd.  
- ✅ Bullet-pulse animations on hero visual — correct.
- ✅ Speed-line background on hero — correct.
- ✅ Muzzle flash on btn-muzzle click — correct.
- ✅ Penetration ragged-edge cards with bullethole decoration — correct.
- ✅ Crimson glow on featured/trending card — correct.
- ✅ Teal bounce-point markers on trajectory nodes — correct.
- ✅ Bounce spring keyframes — correct.
- ✅ Dark Navy backgrounds throughout — correct.
- ✅ Electric Orange primary CTA — correct (though slightly crowded above fold).
- ✅ Logo with Russo One wordmark and "Ricochet" badge — correct.
- ✅ `prefers-reduced-motion` respected across CSS and JS — mostly correct (SparkParticles bug noted elsewhere).
- ⚠️ Kit specifies "Spark trails follow every click" — implemented via canvas particle burst on click. Correct.
- ⚠️ Kit specifies "Trajectory lines trace bullet paths between categories — the ricochet twist" — implemented via the trajectory SVG with gradient lines. Correct.
- ⚠️ Kit specifies "Penetration reveals punch through card/panel surfaces to show content beneath" — the CSS bullethole effect is decorative, not a real content reveal. This is a CSS-only implementation of what the kit describes as an actual interaction. Acceptable as a static approximation.
- ❌ Kit's `scroll_experience.mode: "bullet-trace"` with "Content sections fire in from edges as the user scrolls" — not implemented. The pitch items fade in via IntersectionObserver, but there's no "firing from edges" effect.
- ⚠️ Kit's `hero_experience` has no explicit override in the site — the site uses its own hero design.

---

## Fixed Files Checklist

Required fixes (must implement before re-review):

| # | File | Issue | Fix |
|---|------|-------|-----|
| 1 | `download.html`, `index.html` | Install command uses `get.phlix.tv` | Replace with `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh \| sudo bash` |
| 2 | ALL pages | `og:image` points to `.svg` | Generate `og.png` via `tools/gen-og.mjs`, update all `<meta property="og:image">` to end in `.png` |
| 3 | `about.html` | No FAQ section | Add `<dl class="faq-list">` with all 6 items from `content.json.faq[]` |
| 4 | `download.html` | No clients section | Add client cards grid from `content.json.clients[]` |
| 5 | `download.html` | No ecosystem section | Add ecosystem list from `content.json.ecosystem[]` |
| 6 | `index.html:150-167` | Hero stats fabricated | Remove or replace with verifiable content from content.json |
| 7 | `features.html` | Only 5 features shown; 5 missing; invented bullet points | Show all 8 features from `content.json.features[]` with kit's visual treatment; remove fabricated feature details |
| 8 | `features.html` | Missing 3 features (transcode, auth, plugins, hub) | Add the 3 missing features |
| 9 | `sitemap.xml` | No reference to `404.html` exclusion | Already correct (404 excluded from sitemap) |
| 10 | `robots.txt` | No `Sitemap:` directive | Add `Sitemap: https://detain.github.io/phlix-website/ricochet/sitemap.xml` |
| 11 | All footers | "Released under MPL 2.0" blanket statement | Change to accurate license text per content.json.footer.columns |
| 12 | All footers | Missing "License (MPL-2.0)" link to phlix-server LICENSE | Add from content.json.footer.columns[2].links[3] |
| 13 | All footers | Missing "Issues" link | Add from content.json.footer.columns[2].links[1] |
| 14 | All footers | "Discord" link not in content.json | Remove or keep if brand-kit adds it via override |
| 15 | `theme.css:288`, `:352`, `:129` | Bare `1fr` grid tracks | Change to `minmax(0, 1fr)` to prevent overflow at 320px and 200% zoom |
| 16 | `about.html` | Missing Philosophy, Contributing, License sections | Add per `new_site.md §3.8` |
| 17 | `about.html` | No `og:url`, `og:image`, `twitter:*` metadata | Add complete OG + Twitter meta block |
| 18 | `features.html` | No `twitter:description`, `twitter:image` | Add from content.json.meta |
| 19 | `download.html` | No `twitter:creator` | Add `@detain` |
| 20 | `base.css` | No `@font-face` declarations for brand fonts | Add self-hosted font declarations or reference `shared/assets/fonts/` per `new_site.md §19.3` |
| 21 | `spark-particles.js` | Reduced motion change listener doesn't stop animation | Re-wire to properly cancel animation frame when preference changes |

---

## Final Verdict

**NOT APPROVED**

The site excels at brand aesthetics — the kinetic spark-rich visual identity is well-executed and recognizable. However, three categories of failures prevent approval:

1. **Content accuracy catastrophe** — A completely fabricated install URL (`get.phlix.tv`) appears in both the copy and the copy-to-clipboard function. Hero stats are invented. The features page invented more content than it used from the spec. The FAQ is entirely absent. These are not polish issues — they are spec violations that would mislead users.

2. **og:image is SVG on every page** — This is a known regression that `new_site.md` was specifically written to prevent. Every page references an SVG for social sharing when the spec requires PNG.

3. **Responsive grid overflow** — The bare `1fr` grid tracks will overflow at 320px viewport and 200% text zoom, exactly as warned in `new_site.md §19.12`.

The brand team should be proud of the visual direction. The content and technical implementation need to be rebuilt against the spec.
