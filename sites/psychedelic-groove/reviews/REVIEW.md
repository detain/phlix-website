# Hostile Review — psychedelic-groove

**Site:** `sites/psychedelic-groove/`
**Lint:** ✅ PASS (zero warnings)
**Ground truth:** `new_site.md` + `shared/content.json`

---

## Verdict: ❌ NOT APPROVED

Multiple critical failures. Fix all ❌ items before re-review.

---

## 1. Brand Fidelity & Spirit — Score: 82 ⚠️

✅ Psychedelic aesthetic is full and consistent: purple/orange/lime palette, mandala SVGs, cosmic language ("trip", "cosmic", "groove"), Paisley mascot, UV bloom shadows, paisley drop-shadow.
✅ Self-hosted fonts (Fredoka One, Nunito, Space Mono) — no Google Fonts CDN.
✅ All CSS tokens from kit design_tokens; brand colors used consistently.
❌ **Desktop nav missing Plugins and Docs** — ALL 8 pages have the same 6-item nav (Home, Features, Clients, Download, Hub, About). Per `new_site.md §5`: primary nav must be **8 links in order**: Home · Features · Clients · Download · Plugins · Docs · Hub · About. Mobile drawer correctly has 8. Desktop does not. `index.html:68-75`, `features.html:40-47`, `clients.html:38-45`, `download.html:38-45`, `plugins.html:35-42`, `docs.html:35-42`, `hub.html:35-42`, `about.html:35-42`.
❌ **"5 Native clients"** — `index.html:267` says `5 Native clients`. Per `content.json.clients[]` and `new_site.md §19.13`: there are **4 native clients** (Roku, Tizen, Windows, Mobile/beta) **plus any DLNA device** — NOT 5 native clients. `content.json` wins on facts. This claim is fabricated.

---

## 2. SEO — Score: 88 ⚠️

✅ `<title>` ≤60 chars on all pages. Format is `Download — Phlix` etc.
✅ `<meta name="description">` ≤160 chars on all pages.
✅ `<meta name="keywords">` present on all pages.
✅ `<link rel="canonical">` absolute URL on every page.
✅ JSON-LD `SoftwareApplication` block on home page with name, description, applicationCategory, operatingSystem, offers/price=0, license.
✅ sitemap.xml exists and references robots.txt.
❌ **sitemap.xml references non-existent `trip-guide.html`** — `sitemap.xml:28` includes `<loc>https://detain.github.io/phlix-website/psychedelic-groove/trip-guide.html</loc>` — this page does **not exist** in the site directory. Remove it from sitemap. Only 8 canonical pages + 404 should be in sitemap.

---

## 3. Readability — Score: 88 ⚠️

✅ Typography scale uses `clamp()` for fluid sizing.
✅ `line-height: 1.7` on body, `1.65` on hero sub.
✅ Body text never drops below 16px.
✅ `max-width: 72ch` on `p` elements prevents line over-length.
⚠️ Feature card body text uses `color: rgb(245,240,255,0.75)` which computes to ~#BEB6C4 against #120825. Contrast ratio ~7.9:1 — passes AA. But the 0.75 opacity should be verified against your kit's accessibility note.

---

## 4. Spelling & Grammar — Score: 95 ✅

✅ No spelling errors detected.
✅ Grammar is clean and natural.
✅ Brand voice ("cosmic", "trip", "vessel") is consistent and appropriate.

---

## 5. Usability — Score: 82 ⚠️

✅ Mobile nav toggle works (opens drawer, aria-expanded synced, closes on Esc/outside click).
✅ All internal links use relative paths.
✅ External links use `rel="noopener noreferrer" target="_blank"`.
✅ Copy button on code block functional (uses `navigator.clipboard`).
✅ 404.html exists with recovery links.
❌ **Desktop nav missing Plugins and Docs** — users on desktop cannot reach these pages from the primary nav. They must use the mobile drawer or footer links. This is a broken navigation path.

---

## 6. Accessibility (WCAG 2.2 AA) — Score: 82 ⚠️

✅ Skip link present and visible on focus (`index.html:51`).
✅ Landmarks: `role="banner"`, `role="navigation"`, `role="main"`, `role="contentinfo"` — one each.
✅ `aria-current="page"` on current nav link.
✅ All buttons have `aria-label` or inner text.
✅ `@media (prefers-reduced-motion: reduce)` in `base.css:292` kills all animations.
✅ All `.btn` variants have `min-height: 44px; min-width: 44px` — meets 44px touch target requirement.
✅ `.nav-toggle` is 44×44px.
❌ **Primary CTA button fails small-text contrast** — `btn-primary` uses `background: var(--color-primary)` (#9B00FF) with `color: var(--color-text)` (#F5F0FF). White (#FFF) on #9B00FF = **4.6:1** — this is AA for large text (≥18pt or 14pt bold) but fails for **small text** which requires **4.5:1**. The CTA button text is 0.95rem (~15px), which is small text. Either lighten the button text color or darken the background to get to 4.5:1. Reference: `components.css:201-206`.
⚠️ No `aria-labelledby` on `<section>` elements beyond the hero and named sections. Most sections use `aria-labelledby` correctly but some do not. Not a hard fail.

---

## 7. Responsive (320→1920) — Score: 88 ⚠️

✅ Uses `minmax(0, 1fr)` for all grid tracks — prevents overflow from unbreakable tokens (`new_site.md §19.12`).
✅ `overflow-wrap: anywhere` on `p, li, dd, span, a, code` — handles narrow tracks.
✅ `hyphens: auto; overflow-wrap: break-word` on headings.
✅ Mandalas and mascot hidden at `width ≤ 400px` — prevents overflow/overlap at tiny viewports.
✅ `clamp()` typography prevents text from being too large or too small.
✅ `@media (width <= 768px)` stacks footer grid to 1 column.
⚠️ `render-check` was not run. Per `new_site.md §19.10`: "No linter finds those; a browser does." The mandala-positioned elements use `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)` which should be safe, but without `render-check` we cannot confirm.

---

## 8. Performance (self-hosted fonts, no CDNs) — Score: 90 ✅

✅ Fonts self-hosted as WOFF2 via `@font-face` from `../../assets/fonts/` — no CDN, no Google Fonts.
✅ `font-display: swap` on all `@font-face` declarations.
✅ `script src="js/main.js" defer` — non-render-blocking.
✅ CSS loaded before JS.
✅ `og.png` at 166KB — slightly above the ~120KB guideline but acceptable.
✅ No analytics, no third-party scripts, no external dependencies.
✅ Critical CSS (base + theme + components) is separate and appropriate.

---

## 9. Content Accuracy — Score: 72 ❌

✅ Install command matches `content.json.install.primary.command` exactly.
✅ All 7 `pitch_bullets` match `content.json` verbatim.
✅ All 8 `features[]` titles and bodies match `content.json`.
✅ All 5 `clients[]` names, taglines, highlights, repos, and statuses match `content.json`.
✅ All 6 FAQ items match `content.json` exactly.
✅ Footer 3-column structure and all links match `content.json.footer`.
✅ License statement in footer and about page matches `content.json` exactly.
✅ Ecosystem items on download page match `content.json.ecosystem` exactly.
❌ **"5 Native clients"** — fabricated claim. See §1. `content.json` says "Native clients on Roku, Samsung Tizen, Windows, Mobile, plus any DLNA device". 4 native + 1 DLNA ≠ 5 native clients. `new_site.md §19.13`: "content.json wins on facts."
❌ **"MIT plugin ecosystem"** — misleading. The plugin contract (LifecycleInterface + manifest) is part of `phlix-server` which is MPL-2.0. Individual plugins may be MIT but the ecosystem itself is not exclusively MIT. `index.html:275-276`.

---

## 10. CTA / Funnel — Score: 85 ⚠️

✅ Primary CTA ("Take the Trip" → `download.html`) above the fold on home page.
✅ Download reachable in ≤2 clicks from home.
✅ "Read the docs" secondary CTA on home page links to external docs.
✅ Every page ends with a `.cta-banner` driving toward download.
✅ Download page has the correct install command.
⚠️ Hero CTA labels ("Take the Trip", "Read the Groove") are a `copy_overlay` — this is allowed by `new_site.md §2A` when the kit provides `copy_overlay`. If the kit's brand voice owns these labels, they're valid. If not, they should use `content.json` labels ("Get Phlix", "Read the docs").

---

## 11. Social Metadata (OG + Twitter, og:image PNG) — Score: 95 ✅

✅ `og:type=website`, `og:site_name=Phlix` on all pages.
✅ `og:url` absolute on every page.
✅ `og:title` and `og:description` on every page.
✅ `og:image` absolute URL to 1200×630 PNG on every page — not SVG.
✅ `twitter:card=summary_large_image` on all pages.
✅ `twitter:creator=@detain` on all pages.
✅ `<meta name="theme-color">` = #9B00FF (primary color) on all pages.
✅ `<link rel="icon" type="image/svg+xml">` on all pages.

---

## 12. Localization — Score: 90 ✅

✅ `<html lang="en">` from `site.default_locale`.
✅ All user-facing strings trace to `content.json` — single-file translation surface.
✅ No locale-unsafe formatting detected (no `Intl.NumberFormat`, no hard-coded dates).
✅ Uses logical CSS properties (`inline-start/end`, `margin-inline`, `block`) where appropriate.
✅ `content.json` has `supported_locales: ["en"]` — single locale.

---

## 13. Experience Fidelity — Score: 82 ⚠️

✅ Psychedelic brand expression is full, immersive, and consistent across all pages.
✅ Paisley mascot is present on most pages with idle animation, tip bubble, and dismiss behavior.
✅ Mandala hero decorations reinforce the brand identity.
✅ Seasonal activation system (summer/harvest/winter) correctly gates via date and applies CSS custom property overrides.
✅ Intensity toggle ("Cosmic Calm") is a genuine enhancement layer.
✅ Easter eggs (logo-clicks:5, typed-word:groovy, scroll-past-footer) are correctly implemented per spec: disabled in inputs, exit on Esc, no `preventDefault`, `reducedMotion` safe.
⚠️ **Home page has a `visitor_paths` fork** — `index.html:134-154` shows a path-cards fork ("What kind of trip are you here for?"). Per `new_site.md §3.1`, the home page hero should be followed by the pitch section, then features overview. The visitor fork appears between hero and pitch. If this is driven by a kit's `visitor_paths` field, it overrides the default. If not, it's an undeclared deviation. The spec allows it via `visitor_paths` override, but the spec says `visitor_paths` renders "near the hero" — it is placed correctly, but the pitch bullets still come after it which is correct.

---

## Fixes Required

### ❌ CRITICAL (must fix before approval)

1. **Add Plugins and Docs to ALL desktop navs** — Every `.nav-menu` in every HTML file must include:
   ```html
   <li><a href="plugins.html">Plugins</a></li>
   <li><a href="docs.html">Docs</a></li>
   ```
   in position 5 and 6 (between Download and Hub). This affects all 8 pages.

2. **Remove `trip-guide.html` from `sitemap.xml`** — Line 28 references a non-existent page. Delete that `<url>` entry. Keep only the 8 canonical pages + 404.

3. **Fix "5 Native clients"** — `index.html:267` must say "4 native clients + DLNA" or simply "4 native clients, any DLNA device". Do NOT claim 5. Source: `content.json.clients[]` (5 entries, but DLNA is not a "native client").

4. **Fix "MIT plugin ecosystem"** — `index.html:275-276` should say "plugin ecosystem" without the MIT qualifier, or say "MIT-licensed plugins" if referring to individual plugin packages. The plugin system itself is MPL-2.0.

5. **Fix primary CTA contrast** — `.btn-primary` text (#F5F0FF on #9B00FF = 4.6:1) must reach 4.5:1 for the small-text case. Options:
   - Change `color` to a darker lavender, or
   - Change button background to a deeper purple

---

## Summary Table

| Dimension | Score | Status |
|-----------|-------|--------|
| 1. Brand fidelity & spirit | 82 | ⚠️ |
| 2. SEO | 88 | ⚠️ |
| 3. Readability | 88 | ⚠️ |
| 4. Spelling & grammar | 95 | ✅ |
| 5. Usability | 82 | ⚠️ |
| 6. Accessibility | 82 | ⚠️ |
| 7. Responsive | 88 | ⚠️ |
| 8. Performance | 90 | ✅ |
| 9. Content accuracy | 72 | ❌ |
| 10. CTA / funnel | 85 | ⚠️ |
| 11. Social metadata | 95 | ✅ |
| 12. Localization | 90 | ✅ |
| 13. Experience fidelity | 82 | ⚠️ |

**Average (excluding 1 ❌):** ~86
**Critical blockers:** 5
**Re-review after fixes required.**

---

*Review generated by hostile audit. All citations reference line numbers in the site's HTML/CSS/JS files or the ground truth documents.*
