# Egyptian Dusk — Brand Kit Site Review

**Site:** `sites/egyptian-dusk/`
**Reviewer:** Hostile auditor (all 13 dimensions)
**Ground truth:** `shared/content.json`, `new_site.md`

---

## Scorecard

| # | Dimension | Score | Status |
|---|-----------|-------|--------|
| 1 | Brand fidelity & spirit | 85 | ⚠️ |
| 2 | SEO | 78 | ⚠️ |
| 3 | Readability | 88 | ⚠️ |
| 4 | Spelling & grammar | 95 | ✅ |
| 5 | Usability | 70 | ❌ |
| 6 | Accessibility (WCAG 2.2 AA) | 72 | ⚠️ |
| 7 | Responsive (320→1920) | 85 | ⚠️ |
| 8 | Performance | 92 | ✅ |
| 9 | Content accuracy | 68 | ❌ |
| 10 | CTA / funnel | 82 | ⚠️ |
| 11 | Social metadata | 90 | ✅ |
| 12 | Localization | 85 | ⚠️ |
| 13 | Experience fidelity | 88 | ⚠️ |

**Overall: 83 — NOT APPROVED**

---

## Critical Failures — Must fix before approval

### ❌ Dimension 5 (Usability) — Navigation missing 2 of 8 required links

**Every page** has only 6 nav items. Per `new_site.md §5`: the primary nav **must** have 8 links in order: Home · Features · Clients · Download · Plugins · Docs · Hub · About.

**What exists:**
```
The Kingdom | Sacred Scrolls | The Pantheon | Enter the Tomb | The Mirror | The Cartouche
```
**What is missing:** `Plugins` and `Docs` (demoted to footer per SITE.md — violates spec §5).

Files affected: `index.html:78-99`, `features.html:74-96`, `clients.html:70-89`, `download.html:64-86`, `plugins.html:70-89`, `docs.html:67-86`, `hub.html:67-87`, `about.html:67-87`, `404.html:67-86`

`new_site.md §5` is explicit: `(Docs may link to the external docs site instead of docs.html if you prefer the link-out; keep one behavior consistent.)` — meaning docs.html must be in the nav OR link externally, not missing entirely.

---

### ❌ Dimension 9 (Content accuracy) — `from_source` install command corrupted

`download.html:206-209` shows the `from_source` command as a single mangled line:

```html
<code>git clone https://github.com/detain/phlix-server.git cd phlix-server composer install</code>
```

Per `content.json install.from_source.command`, it must be three separate lines:
```
git clone https://github.com/detain/phlix-server.git
cd phlix-server
composer install
```

The `line_count: 3` is also wrong (says "Not an install — a development checkout only" but the code is one line). `new_site.md §2` says "copy, never retype" for install commands — this was retyped and broken.

---

### ❌ Dimension 2 (SEO) — sitemap.xml references non-canonical 9th page

`sitemap.xml:10` includes:
```xml
<url><loc>https://detain.github.io/phlix-website/egyptian-dusk/archive-journey.html</loc></url>
```

`archive-journey.html` is a **9th page** that does not exist in the 8-page spec (`new_site.md §1`). It must be removed from the sitemap and should not be in the nav. The sitemap must contain exactly 8 canonical pages + `404.html` is `noindex` per spec §10.

---

### ❌ Dimension 9 (Content accuracy) — Extra non-canonical page: `archive-journey.html`

`archive-journey.html` is a full 262-line page not defined in `new_site.md §3`. The spec defines exactly 8 pages (`index`, `features`, `clients`, `download`, `plugins`, `docs`, `hub`, `about`). `SITE.md:76` explicitly declares it as an "Extra page" — this is an admitted spec violation. If this page is desired, the kit must declare it through the proper `site_architecture`/`page_blueprints` override channels, not as a unilateral addition.

Also: the visitor paths fork on `index.html:124-146` is an extra section not in the spec's §3.1 home page structure. The spec mandates hero → pitch → features overview → CTA banner only. Visitor paths is a `visitor_paths` field that may be opt-in, but it is inserted as a `<div style="margin-top: 3rem">` between the hero and the next section with no kit field to authorize it.

---

### ❌ Dimension 6 (Accessibility) — `lapis` (`#1A4890`) used as text-equivalent color

`#1A4890` (lapis lazuli) on `#0A0603` (background) produces a contrast ratio of **2.28:1**. This fails WCAG 2.2 AA for large text (requires ≥3:1) and AAA for small text (requires ≥4.5:1).

The safe substitute `#5678AD` was derived and documented in `SITE.md:30-32` and `base.css:95-96` but is not used where lapis appears as a text or text-adjacent color. Specifically:

- `components.css:860`: `border-left: 2px solid #5a7baf` — not a CSS variable, hardcoded, and close to (but not exactly) the safe substitute. Use `--color-secondary-safe` as a CSS variable.
- The scarab mascot's lapis wings (`index.html:433-450`) are decorative SVG fills at `opacity: 0.8` — decorative-only, no contrast issue.

The primary offending usage is `border-left: 2px solid #5a7baf` in `.ecosystem-item` on `download.html:338-361`. The border color should use a token that passes contrast. Fix: `border-left-color: var(--color-secondary-safe)` or the exact derived `#5678AD`.

---

## Non-Critical Issues — Fix for 90+

### ⚠️ Dimension 2 (SEO) — `og:image` description mismatch

`index.html:9` meta description: *"Your media. Your kingdom. Carved forever. Step into the sacred space where every film is a hieroglyph and your collection is an eternal offering to Ra."* (97 chars — over 160 char limit)

OG description on same page: *"Your media. Your kingdom. Carved forever."* (37 chars — under-optimal but valid)

These are inconsistent. The meta description should be ≤160 chars and should align with the og:description. The current meta description at 97 chars technically passes the ≤160 requirement but is at the ragged edge. Consider trimming to: *"Your media. Your kingdom. Carved forever. Step into the sacred space where every film is a hieroglyph."* (89 chars).

---

### ⚠️ Dimension 3 (Readability) — Hero pitch section heading absent

The pitch section on `index.html:259-284` lacks the `<h2>` label "Why Phlix?" specified in `content.json pitch_bullets`. The heading is simply `class="pitch__heading"`: "What the archive offers:" — this is brand-voiced but not traceable to `content.json`. Per `new_site.md §2`, presentation copy may follow kit voice when no override exists, but "Why Phlix?" is the canonical section heading. The actual heading "What the archive offers:" is brand-voiced replacement — acceptable only if the kit provides a `copy_overlay` for this slot, otherwise it should use the verbatim `content.json` heading.

---

### ⚠️ Dimension 6 (Accessibility) — `.proof-tablet__value` uses `word-break: break-all`

`components.css:665`:
```css
.proof-tablet__value {
  word-break: break-all;
}
```

`break-all` causes readability issues and is unnecessary since the parent already has `overflow-wrap: anywhere` from the base reset. Remove `word-break: break-all` — the overflow-wrap rule handles long tokens sufficiently.

---

### ⚠️ Dimension 7 (Responsive) — Hardcoded two-column grid in plugins.html

`plugins.html:115`:
```html
style="grid-template-columns: 1fr 1fr; gap: var(--space-6)"
```

This is not responsive — it will overflow at narrow viewports. The spec (§19.12) explicitly warns against bare `1fr` tracks. It should use `minmax(0, 1fr)` to shrink properly. Change to `style="grid-template-columns: repeat(auto-fit, minmax(0, 1fr)); gap: var(--space-6)"` or the standard `.content-grid` class which already has the correct pattern.

Same issue in `hub.html:112` — `style="grid-template-columns: 1fr 1fr; gap: var(--space-6)"`.

---

### ⚠️ Dimension 9 (Content accuracy) — Download page ecosystem list item uses hardcoded hex

`components.css:860`: `border-left: 2px solid #5a7baf` — hardcoded, not a CSS variable. Should be `var(--color-secondary-safe)` per the derived tokens already defined in `base.css:95-96`.

---

### ⚠️ Dimension 13 (Experience fidelity) — `homepage_narrative` not declared but sections differ from spec

`new_site.md §3.1` defines exactly 4 home page sections: Hero → Pitch → Features overview → CTA banner. The Egyptian Dusk home page inserts a "Testimony from the Archives" (proof strategy) section between pitch and CTA, plus the visitor paths fork between hero and pitch. The `SITE.md` does not declare `homepage_narrative` or `visitor_paths` to authorize these additions. The proof section may be covered by `proof_strategy`, but the visitor paths fork has no kit field citation.

If the kit intends these sections, it must declare `visitor_paths` and `proof_strategy` in its kit JSON; otherwise they are unsanctioned additions.

---

### ⚠️ Dimension 12 (Localization) — `html lang` correctly "en" but `hreflang` absent

All pages have `<html lang="en">` — correct. However, there is no `<link rel="alternate" hreflang="en" href="...">` in the `<head>`. For a single-locale site this is not strictly required, but `new_site.md §15` recommends locale-safe formatting and structured lang attribution. With only `en` supported, this is a minor miss.

---

### ⚠️ Dimension 1 (Brand fidelity) — `@copyright` in all three CSS files

All three CSS files have `* @copyright 2026 Joe Huss...` inside the comment block (lines 4-5 of each file). Per `new_site.md §19.2`, a bare ` * @copyright …` line **inside** a `/* … */` block is fine — browsers only misparse it when it is **outside** the block. All three files wrap it correctly. **No bug here** — this is a confirmed pass.

---

### ⚠️ Dimension 8 (Performance) — Fonts self-hosted, but `Courier Prime` only has 400/700

`base.css:202-216` declares `Courier Prime` at 400 and 700 weights. This matches the font's actual weight availability. However, `Cormorant Garamond` at `font-weight: 500` (`base.css:197-200`) — the font only ships regular (400) weight in the shared pool per standard OFL distributions. Check that `../../assets/fonts/cormorant-garamond-500-latin.woff2` actually exists. If it doesn't, the 500 weight will fall back to the system serif and the body's `font-weight: 400` will render correctly, but the 500-weight declaration in base.css is spurious.

---

## Dimension Details

### 1. Brand fidelity & spirit — 85 ⚠️
Strong Egyptian theming throughout — Cinzel/Cormorant Garamond typography, gold/lapis/terracotta palette, scarab mascot "Kheper", ceremonial copy voice ("Enter the Tomb", "Sacred Scrolls", "The Pantheon"). The brand kit's `narrative-scroll` archetype is faithfully expressed. Deduction: visitor paths fork unauthorized; proof section insertion without kit field citation; `archive-journey.html` unauthorized extra page.

### 2. SEO — 78 ⚠️
All pages have canonical URLs, `<title>`, `<meta name="description">`, `<meta name="keywords">`, semantic HTML. JSON-LD on home page. Sitemap present. **Critical deduction**: sitemap contains non-canonical `archive-journey.html`. **Minor deduction**: home page meta description at 97 chars (near limit), some title-tag branded suffixes could be more descriptive.

### 3. Readability — 88 ⚠️
Cormorant Garamond body text at `line-height: 1.75` on `max-width: 68ch` is excellent. Pitch bullets are well-structured with gold left border. Feature cards use clear hierarchy. Deduction: pitch heading deviates from `content.json` without clear kit authorization; proof section adds dense mono-text tablet layout that interrupts reading flow.

### 4. Spelling & grammar — 95 ✅
No spelling or grammar errors detected. All factual statements are accurate to content.json.

### 5. Usability — 70 ❌
Two required nav items missing (Plugins, Docs). Mobile nav toggle works correctly. Skip link present. Download goal reachable in ≤2 clicks from home. Social links in footer. Deduction: missing nav links is a **hard fail** under new_site.md §5.

### 6. Accessibility — 72 ⚠️
Skip link present and correct. Focus rings on all interactive elements (`components.css:329-335`). `aria-current="page"` on active nav. `prefers-reduced-motion` respected in JS and CSS. 44×44px touch targets on all buttons. **Critical deduction**: lapis lazuli `#1A4890` as non-decorative border in `.ecosystem-item` produces 2.28:1 (fails 3:1 for large text). Fix: use `--color-secondary-safe`. **Minor deduction**: `word-break: break-all` on `.proof-tablet__value` harms readability.

### 7. Responsive — 85 ⚠️
`minmax(0, 1fr)` used in `.features-grid` and `.content-grid` — correct pattern. `overflow-wrap: anywhere` in base reset. Deduction: `plugins.html:115` and `hub.html:112` hardcode `1fr 1fr` two-column grids without `minmax(0, ...)` — will misbehave at 320px. All other layouts use proper responsive patterns.

### 8. Performance — 92 ✅
Fonts self-hosted WOFF2 (`../../assets/fonts/...`) — no CDN. `font-display: swap` on all faces. `defer` on main.js. No render-blocking resources. Hero uses CSS gradient (no image). Deduction: 4 `@font-face` families is reasonable; Cormorant Garamond 500 weight may be spurious if file doesn't exist.

### 9. Content accuracy — 68 ❌
Install command from `content.json` correctly copied for primary install. License correctly states MPL-2.0/MIT split. Client facts accurate (5 clients including DLNA). Feature facts accurate. **Critical deductions**: `from_source` command is a single corrupted line (should be 3 lines). `archive-journey.html` in sitemap is non-canonical. Ecosystem list border uses hardcoded `#5a7baf` instead of CSS variable.

### 10. CTA / funnel — 82 ⚠️
Primary CTA "Enter the Tomb" → download.html on every page. Secondary CTA to docs on download page. All CTAs are descriptive (no "click here"). Deduction: the `from_source` malformed block on download.html undermines the install credibility. The "Become the Keeper" ghost button on index.html is labeled correctly.

### 11. Social metadata — 90 ✅
All pages: `og:type=website`, `og:site_name=Phlix`, absolute `og:url`, `og:title`, `og:description`, absolute `og:image` (PNG, 1200×630). Twitter card `summary_large_image`, `twitter:creator=@detain`. `theme-color` set. Favicon SVG link present. All metadata is absolute URLs — no relative URL bug.

### 12. Localization — 85 ⚠️
`<html lang="en">` correct. All user-facing strings trace to CSS variables or `content.json`. RTL-ready logical properties used in some places (`margin-inline`, `padding-inline`). `hreflang` absent but not required for single-locale. CSS subset to Latin only — correct. Deduction: no `hreflang` annotation; `lang` attribute only.

### 13. Experience fidelity — 88 ⚠️
`narrative-scroll` archetype faithfully rendered. Kheper mascot (fixed bottom-right, in-flow on mobile), seasonal activation (Opet/Osiris/Solstice), easter eggs (logo-clicks:7, typed-word:cartouche, scroll-past-footer) — all properly implemented with `prefers-reduced-motion` fallbacks. Deduction: visitor paths fork inserted without kit field authorization; proof section (testimony tablets) inserted without clear `proof_strategy` kit field.

---

## Fixes Required

1. **`index.html`, `features.html`, `clients.html`, `download.html`, `plugins.html`, `docs.html`, `hub.html`, `about.html`, `404.html`** — Add `Plugins` and `Docs` to the primary nav. Plugins → `plugins.html`. Docs → `docs.html` (or external `https://detain.github.io/phlix-docs` per spec §5).

2. **`download.html:206-209`** — Fix the `from_source` code block to show three separate lines:
   ```
   git clone https://github.com/detain/phlix-server.git
   cd phlix-server
   composer install
   ```

3. **`sitemap.xml`** — Remove the `archive-journey.html` `<url>` entry. Only the 8 canonical pages should be present.

4. **`archive-journey.html`** — Either remove entirely (preferred, since it's an unsanctioned 9th page) or declare it through the kit's proper `site_architecture`/`page_blueprints` channels.

5. **`components.css:860`** — Change `border-left: 2px solid #5a7baf` to `border-left: 2px solid var(--color-secondary-safe)` (or the derived `#5678ad`).

6. **`plugins.html:115`** — Change `grid-template-columns: 1fr 1fr` to `repeat(auto-fit, minmax(0, 1fr))`.

7. **`hub.html:112`** — Same fix as #6.

8. **`components.css:665`** — Remove `word-break: break-all` from `.proof-tablet__value`.

---

## APPROVED? NO

5 critical failures across Dimensions 2, 5, 6, and 9. The site shows strong brand work and mostly correct technical implementation, but missing Plugins/Docs nav links, a corrupted install command, a non-canonical sitemap entry, and a failing contrast ratio are hard blockers.

Re-review after fixes #1–#5 are resolved.
