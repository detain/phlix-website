# new_site.md — How to Scaffold a Phlix Brand-Kit Site

> The complete, brand-agnostic rulebook for generating **one Phlix brand-kit
> site** — the flagship marketing site for Phlix rendered entirely in the
> identity of a single **brand kit** (`brand-kits/<slug>.js`). Pair this with a
> brand kit and the build prompt (`new_site_prompt.md`): **this file says _what_
> to build** (structure, pages, links, contracts, quality gates); the brand kit +
> prompt say _how it should look, feel, and read_.

---

## 0. What you are building

A **brand-kit site** is a self-contained, static, multi-page marketing site for
**Phlix** — a self-hostable PHP media server — styled top-to-bottom by **one
brand kit**. Each brand kit in `brand-kits/` gets **its own complete site**.

Every brand-kit site markets the **same product** with the **same factual copy**
(from `shared/content.json`) across the **same eight pages**; what changes from
one kit's site to another is the **entire brand identity** — colors, type,
shapes, motion, artwork, and voice — expressed fully and faithfully. There is
**no backend, no framework, no build step required to view** — pure HTML + CSS +
vanilla JS.

A finished site must:

1. Render correctly as **static files** opened directly and under `npm run build`.
2. Be **brand-faithful** — colors, type, shapes, motion, and voice all trace
   back to the kit, with nothing off-palette or off-voice. It should feel like a
   site that brand would actually ship, not a generic template recolored.
3. Pass the **quality gates** in §18 (accessibility, SEO, performance,
   responsive, content accuracy).

---

## 1. Output location & file inventory

Each brand-kit site lives in its own folder under `sites/`, named with the brand
kit's own `slug` (the `slug` field inside the kit — no numbering, no suffix):

```
sites/<slug>/              e.g. sites/neon-noir/   sites/dia-de-muertos/
```

Required contents (this exact layout — tooling discovers any folder that contains
an `index.html`):

```
sites/<slug>/
├── index.html              Home
├── features.html           Features
├── clients.html            Clients
├── download.html           Download
├── plugins.html            Plugins
├── docs.html               Docs (link-out + summary)
├── hub.html                Phlix Hub
├── about.html              About + FAQ
├── css/
│   ├── base.css            reset, tokens (:root CSS variables), element defaults
│   ├── theme.css           typography, layout containers, page structure
│   ├── components.css      header/nav, footer, buttons, cards, forms, badges…
│   └── fonts/              self-hosted WOFF2 (optional but preferred)
├── js/
│   └── main.js             nav toggle, reduced-motion, scroll reveals
├── img/
│   ├── logo.svg            brand wordmark/logo lockup
│   ├── favicon.svg         square favicon (brand primary color)
│   ├── og.png              1200×630 social share image (or og.svg → png)
│   └── PROMPTS.md          exact prompts that (re)generate every image asset
├── robots.txt              references the site's sitemap
├── sitemap.xml             one <url> per page, absolute canonical URLs
├── SITE.md                 human design rationale (concept, palette, type, motion)
└── BUILD_LOG.md            what was built + any deviations/notes
```

**Rules**

- Every page is a **complete standalone HTML document** with the shared shell
  baked in (see §4). Do not rely on a runtime template engine for the deployed
  output — pre-render to static HTML.
- All intra-site links are **relative within the site folder** (`features.html`,
  `./`) so the site is portable wherever it is served. External links use
  absolute `https://` URLs and `rel="noopener noreferrer"`.
- No CDN dependencies in the deployed page (no Google Fonts `<link>` to
  `fonts.googleapis.com`, no script CDNs). **Self-host fonts** as WOFF2 and
  declare them with `@font-face` + `font-display: swap`. (CDN font links are an
  explicit, previously-fixed regression — do not reintroduce them.)

---

## 2. The shared content contract (`shared/content.json`)

`shared/content.json` is the **single source of marketing copy** and is the same
for every brand-kit site. Read it; do **not** invent product copy, features, or
claims. It provides these blocks — wire each into the pages as noted:

| Key | Shape | Used on |
|-----|-------|---------|
| `site` | name, url, repo_org, locales, `social.{github,docs}` | shell, footer, meta |
| `hero` | eyebrow, headline, subheadline, `primary_cta`, `secondary_cta` | home hero |
| `pitch_bullets[]` | 7 one-line value props | home "Why Phlix?" |
| `features[]` | 8 × `{id,title,body,icon}` | home overview + features page |
| `clients[]` | 5 × `{id,name,tagline,repo,highlights[],store_url,status}` | clients + download |
| `ecosystem[]` | 5 × `{name,repo,what}` | download + docs |
| `faq[]` | 6 × `{q,a}` | about |
| `footer` | tagline + 3 `columns[]` of `{heading,links[]}` | footer (all pages) |
| `meta` | description, keywords[], og_image, twitter_card | `<head>` of every page |

You **may** restyle, reorder visually, and add brand-flavored **micro-copy**
(section eyebrows, button labels, empty/aside lines, alt text) drawn from the
kit's voice. The rule is now about **facts vs. presentation**, not "copy must
stay byte-for-byte":

- All **FACTS** — spec claims, numbers, licenses, repo links, and FAQ **answer
  substance** — must remain **traceable to `content.json`**. Never invent,
  inflate, or drop a fact.
- **Presentation copy** — hero eyebrow/headline/subheadline, CTA labels, section
  headings, per-feature framing, footer tagline — **may follow a kit's
  `copy_overlay` and `feature_casting.angle` fields when those are present**
  (see §2A). A kit **re-voices** facts; it never changes them.
- Where a kit declares **no** overlay for a given slot, that copy stays
  **verbatim** from `content.json`. Absence of an override = today's behavior.

If the kit's voice wants a different headline and provides no `copy_overlay`,
treat it as a _visual headline overlay_, not a replacement of the factual copy.

---

## 2A. Kit-declared experience overrides (opt-in)

Historically every brand-kit site shared one fixed skeleton, one nav, and one set
of marketing copy — kits only changed CSS/colors/fonts. A kit **may now declare**
any of the following fields to drive a genuinely different **user experience**
(information architecture, content emphasis, interaction model, navigation
paradigm, conversion funnel), not just a visual reskin:

`site_architecture`, `homepage_narrative`, `page_blueprints`, `copy_overlay`,
`feature_casting`, `copy_treatments`, `faq_experience`, `hero_experience`,
`navigation_model`, `scroll_experience`, `easter_eggs`, `conversion_funnel`,
`proof_strategy`, `visitor_paths`, `experience_archetype`, `complexity_profile`,
`intensity_toggle`, `mascot.behavior`, `seasonal_activation`, and
`persona_vignettes`.

**Override rule:** when a field is **present**, it **OVERRIDES** the previous
default fixed structure/copy **for that concern only**. When a field is
**absent**, keep **today's default behavior** (the shared nav, page structure,
and `content.json` copy) — nothing breaks for a kit that doesn't opt in. Fields
compose: a kit can override its nav without touching its copy, or restyle the FAQ
without changing its funnel.

**Facts stay locked.** Every override re-weights emphasis or re-voices
presentation; none of them may invent, drop, or alter a **fact**. All facts stay
traceable to `content.json` (§2), and any `proof_strategy` signal must be
**verifiable** against `content.json` or the real repos — never a fabricated
testimonial or count.

### Field-by-field: what to DO with each

| Field | What the authoring agent does with it |
|-------|----------------------------------------|
| `site_architecture` | Build the primary nav from `nav[]` (label/order/emphasis; ids stay canonical). Move `demoted_pages` into the footer (respect `fold_into`). Author any `extra_pages`, drawing content **only** from the listed `facts_from` content.json paths. Arrange the footer per `footer_arrangement`. |
| `homepage_narrative` | Order and render the home page's sections per `sections[]` (each `source`/`treatment`/`weight`); frame the page with `logline` and the chosen `arc`. |
| `page_blueprints` | For each listed page id, compose the DOM per its `template` + literal `spec` (this is *what the page is*; §3/§13 still govern *how it looks*). |
| `feature_casting` | Hero the `hero[]` features (use each `angle` as its voiced, factual headline), grid the `support[]`, push `footnote[]` to the Features page only, keep `omit_from_home[]` off the home page. Every feature must still appear **somewhere**. |
| `copy_overlay` | Replace **presentation** copy (hero, section headings, footer tagline) with the overlay values; anything absent inherits `content.json` verbatim. Facts unchanged. |
| `copy_treatments` | Render the named shared block (pitch_bullets/faq/clients/ecosystem) in the specified container/component — same facts, brand-native markup. |
| `faq_experience` | Frame the FAQ per `frame`/`persona`; reorder answers per `question_order`; add `extra_questions` as re-phrasings that **map to** existing canonical answers (`maps_to`) — no new facts. |
| `persona_vignettes` | Use each vignette to decide which product `surfaces` to mock up in imagery and which `features_shown` to depict; seed `img/PROMPTS.md`. |
| `hero_experience` | Build the hero interaction per `mode`/`spec` within `js_budget_kb`; **always** ship the `fallback` (static/no-JS/reduced-motion) carrying the **same copy**. |
| `navigation_model` | Build the nav paradigm per `mode`/`spec`/`keyboard`; **always** also render the `fallback` standard accessible topbar/menu — the exotic mode is an enhancement layer only. |
| `scroll_experience` | Apply the reading rhythm per `mode`/`spec`; under `prefers-reduced-motion` resolve to the `reduced_motion` description (plain continuous scroll). |
| `easter_eggs` | Wire each `{trigger, effect, reward_copy, exit}`; keep them inert for non-discoverers, never shadow browser/AT shortcuts, and honor the explicit `exit`. |
| `conversion_funnel` | Shape the download journey per `style`; open the Download page with `download_opening`; wire the `cta_ladder` steps; respect `friction_notes`. |
| `proof_strategy` | Render the ordered `signals` at `placement` using only **verifiable** proof (real numbers/links/quotes). |
| `visitor_paths` | If present, render the self-select fork (`prompt` + `paths[]`) near the hero, emphasizing each path's `emphasis` feature ids. `null` = single curated path, no fork. |
| `experience_archetype` | Adopt this as the declared layout archetype (replaces the derived guess in `new_site_prompt.md` STEP 1). |
| `complexity_profile` | Enforce `density`/`reading_level`/`jargon_policy` and the `page_budget` caps (max home sections, max words/section). For `jargon_policy: "translate"`, surface the plain term and preserve the precise one in a `<details>`. |
| `intensity_toggle` | If present, add the visitor-facing calm-mode toggle (`label`/`affects`/`default`/`placement`) as a self-contained enhancement. `null` = nothing loud enough to tame. |
| `mascot.behavior` | If non-`null`, build the on-page companion (`placement`/`idle`/`tips`/`easter_interactions`/`dismiss`); disable `idle` under reduced-motion; persist dismissal via localStorage. `null` = imagery-only mascot. |
| `seasonal_activation` | `"documented"` = record seasonal data only (no live behavior). `"live-js"` = ship a tiny date-gate that flips the `seasonal_variants` override tokens + motif during `active_range`. |
| `error_page_experience` | **Schema-only for now** — document the 404 concept; do **not** attempt to ship a per-kit 404 this pass (see the note below). |

### Performance & safety rule for opt-in JS

Any per-site JS added for `hero_experience`, `navigation_model`, `mascot.behavior`,
`easter_eggs`, or `seasonal_activation` must be:

- **Self-contained, hand-written vanilla JS** with **no external dependencies**
  (no libraries, no CDNs) — consistent with §7.
- **Budgeted at roughly ≤15 KB total** across all of them (each field may carry a
  tighter per-feature budget, e.g. `hero_experience.js_budget_kb`).
- **`prefers-reduced-motion`-respecting** — motion is gated/dropped under reduced
  motion.
- For `navigation_model` and `hero_experience`, it must **always render a working
  no-JS fallback** that carries the **same information/copy** (the `fallback`
  field is mandatory, not optional).

### `error_page_experience` → ship a real `404.html`

GitHub Pages serves exactly **one root `404.html` per Pages site**, so a per-kit
404 needed build tooling. **That shim now exists**, so a per-kit 404 is
**required**, not schema-only.

How it works: the repo-root `404.html` is the only error document Pages will ever
hand back. Its inline shim reads a manifest injected by `tools/build.mjs`, works
out which kit the requested path belongs to, `fetch`es that kit's
`sites/<slug>/404.html`, injects a `<base href="/<base>/<slug>/">`, and replaces
the document — so **the requested URL and the 404 status are both preserved**
while the visitor sees the kit's own themed page. Kits without a `404.html` get a
generic fallback tinted with the kit's accent and offering its
`error_page_experience.recovery_links`.

Author `sites/<slug>/404.html` as an **ordinary ninth page**:

- Realise `error_page_experience.concept` as the page's actual content — that
  field is a design brief, not display copy; do not print it verbatim.
- Use the **same shared shell** (§4) as every other page, and **relative** asset
  paths (`css/…`, `img/…`) exactly like the other pages. The injected `<base>`
  makes them resolve against the kit directory no matter how deep the missing
  path was, so **no `../` walking and no absolute paths**.
- Offer every link in `error_page_experience.recovery_links` (`home` → `./`,
  `features` → `features.html`, `download` → `download.html`).
- Add `<meta name="robots" content="noindex">`. The page is reached only through
  the shim, and `tools/gen-sitemap.mjs` deliberately excludes `404.html`.
- Canonical/og:url still follow the normal rule (`<site.url>/<slug>/404.html`).

The page must stand on its own with **JS disabled** — the shim needs JS, but once
the document is swapped in, its content must not depend on script.

---

## 3. The eight pages — section-by-section spec

Each page = the shared shell (§4) wrapping a `<main id="main-content">` whose
inner sections are below. Section class names are the canonical ones the
tooling/CSS expect (see `tools/render.mjs` for the reference markup) — keep them
so styling and reviews stay portable.

### 3.1 `index.html` — Home
1. **Hero** (`.hero`) — `hero.eyebrow` → `<h1>hero.headline</h1>` →
   `hero.subheadline` → two CTAs (`.btn.btn-primary` = `primary_cta`,
   `.btn.btn-secondary` = `secondary_cta`). The primary CTA must be **above the
   fold** with ≥3:1 contrast.
2. **Pitch** (`.pitch`) — `<h2>Why Phlix?</h2>` + `pitch_bullets` as a list.
3. **Features overview** (`.features-overview`) — `<h2>`, then a card grid of all
   8 `features` (`.feature-card` with inline SVG icon, `h3` title, `p` body) and
   a "See all features →" link to `features.html`.
4. **CTA banner** (`.cta-banner`) — closing `<h2>` + a prominent download button.

### 3.2 `features.html`
- `.page-header` (`<h1>Features</h1>` + lead) → `.content-section` with a
  `.content-grid` of `.feature-detail` articles (one per `features[]`, each with
  `id="<feature.id>"`, larger icon, `h2`, body) → closing `.cta-banner`.

### 3.3 `clients.html`
- `.page-header` → `.client-cards` grid of `.client-card` (one per `clients[]`):
  `h2` name + `.client-status.status-<status>` badge, tagline, `highlights[]`
  list, and a "View source" button when `repo` is set → closing `.cta-banner`.

### 3.4 `download.html`
- `.page-header` → **Server** block (PHP 8.3+ requirement + install snippet in a
  `.code-block`) → **Clients** download cards (skip `status:"deprecated"`) →
  **Ecosystem** list from `ecosystem[]` → closing `.cta-banner` linking to docs.

### 3.5 `plugins.html`
- `.page-header` → "Plugin model" (`LifecycleInterface` + manifest, drop into
  `plugins/`) → "Ecosystem plugins" → "Write your own" (link to
  `phlix-plugin-example`) → closing `.cta-banner`.

### 3.6 `docs.html`
- `.page-header` → "Documentation" linking out to `site.social.docs` with
  User guide / API reference / Developer docs / Hub admin links → "Ecosystem"
  list. (This page is a summary + link-out, not full docs.)

### 3.7 `hub.html`
- `.page-header` ("Phlix Hub") → "What the Hub does" (reverse-tunnel relay, NAT
  traversal) → "Self-host or use the public hub" → "Hub mode in clients" →
  closing `.cta-banner`.

### 3.8 `about.html`
- `.page-header` → "Philosophy" → "License" (BSD-3-Clause) → "Contributing"
  (the `detain` GitHub org) → **FAQ** as a `<dl class="faq-list">` of all
  `faq[]` items.

---

## 4. The shared HTML shell

Every page uses the same skeleton. **Order and landmarks matter** for
accessibility and SEO.

```html
<!doctype html>
<html lang="en">           <!-- from site.default_locale -->
<head> … (see §10/§11) … </head>
<body>
  <a class="skip-link" href="#main-content">Skip to main content</a>

  <header class="site-header" role="banner">
    <nav class="nav-primary" aria-label="Primary navigation">
      <a class="nav-logo" href="./" aria-label="Phlix home"><img src="img/logo.svg" alt="Phlix logo" width="120" height="40"></a>
      <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="nav-menu">…</button>
      <ul class="nav-menu" id="nav-menu" role="list"> … 8 links (§5) … </ul>
    </nav>
  </header>

  <main id="main-content" tabindex="-1"> … page sections (§3) … </main>

  <footer class="site-footer" role="contentinfo">
    <p class="footer-tagline">footer.tagline</p>
    <nav class="footer-nav" aria-label="Footer navigation"> … 3 columns (§5) … </nav>
    <p class="footer-copy">&copy; <year> Phlix — BSD-3-Clause</p>
  </footer>

  <script src="js/main.js" defer></script>
</body>
</html>
```

**Mandatory shell rules**
- Exactly **one `<h1>` per page** (the hero `h1` on home; the `.page-header h1`
  elsewhere). Heading hierarchy never skips a level.
- The current page's nav link gets `aria-current="page"`.
- Landmarks present once each: `banner`, `navigation`, `main`, `contentinfo`.
- Skip-link first focusable element; visible on focus; targets `#main-content`.
- Images have meaningful `alt`, or `alt=""` when purely decorative.

---

## 5. Common items & links (memorize these)

**Primary nav (8 links, in order):** Home · Features · Clients · Download ·
Plugins · Docs · Hub · About.
(`Docs` may link to the external docs site instead of `docs.html` if you prefer
the link-out; keep one behavior consistent.)

**Footer — 3 columns (from `content.json.footer.columns`):**
- **Product:** Features, Clients, Download, Plugins
- **Developers:** Documentation, Server source, Plugin example, API reference
- **Project:** GitHub org, Issues, Hub, License (BSD-3)

**Calls to action (reused):** "Get Phlix" / "Download Phlix" (primary, → download),
"Read the docs" (secondary, → external docs). Every page ends in a `.cta-banner`
that drives toward **download** (or docs on the download page).

**External link targets that must be correct:**
- Server source: `https://github.com/detain/phlix-server`
- Docs: `https://detain.github.io/phlix-docs`
- Plugin example: `https://github.com/detain/phlix-plugin-example`
- Hub: `https://github.com/detain/phlix-hub`
- GitHub org: `https://github.com/detain`

**Primary funnel rule:** the download goal must be reachable in **≤2 clicks**
from home, and the primary CTA visible above the fold.

---

## 6. CSS architecture

Three stylesheets, loaded in this order, all driven by **CSS custom properties**
so the brand kit is a single source of truth:

- **`base.css`** — modern reset, `box-sizing: border-box`, the `:root` token
  block (colors, spacing scale, radii, font-family vars, shadows — mapped from
  the kit's `design_tokens` and color/spacing/radius/shadow blocks), base
  element styles, `.skip-link`, `:focus-visible` ring, and
  `@media (prefers-reduced-motion: reduce)` resets.
- **`theme.css`** — typography scale (headline/display/body/ui/mono roles),
  layout containers (max content width — default **1400px**, centered), the
  page-structure rules (`.hero`, `.pitch`, `.features-overview`, `.page-header`,
  `.content-section`, `.content-grid`, grids), and the chosen **layout
  archetype** deltas.
- **`components.css`** — `.site-header`/`.nav-*`, `.site-footer`/`.footer-*`,
  `.btn` variants, `.feature-card`/`.feature-detail`, `.client-card`,
  `.download-card`, `.code-block`, `.faq-list`, badges, and any
  brand-specific component (carousel/marquee/etc.).

**Token rules**
- Define every brand color, spacing step, radius, shadow, and font once in
  `:root`; reference via `var(--…)` everywhere. **No raw off-palette hex** in
  component CSS.
- Use only the kit's **spacing scale** steps for margins/padding/gaps.
- Respect the kit's **corner_radius** scale and **borders** spec for all
  rounded/edged surfaces.
- CSS is minified at build time — keep authored CSS readable and commented.

---

## 7. JavaScript (`js/main.js`)

Vanilla, dependency-free, `defer`-loaded. Responsibilities:
- **Mobile nav toggle:** wire `.nav-toggle` ↔ `.nav-menu`, keep
  `aria-expanded` in sync, close on `Esc` and on outside click, and trap/return
  focus correctly.
- **Reduced motion:** gate all non-essential animation behind
  `matchMedia('(prefers-reduced-motion: reduce)')`.
- **Scroll reveals (optional):** `IntersectionObserver` fade-ins — feature-detect
  and no-op without it.
- Keep it tiny and non-render-blocking. No analytics, no third-party scripts.

---

## 8. Assets

- **`logo.svg`** — the kit's wordmark/lockup per its `logo_rules`
  (allowed/forbidden symbols, colors, negative space). Inline-friendly, legible
  small.
- **`favicon.svg`** — simple square mark in the kit's **primary** color; also
  used to derive `theme-color`.
- **`og.png` (1200×630)** — social share card: brand background, logo/wordmark,
  `hero.headline` or `tagline_primary`. Ship `og.svg` as the editable source if
  used, but reference a rasterized **`og.png`** in meta.
- **Inline SVG icons** for the 8 feature icons (library, syncplay, transcode,
  shield, antenna, broadcast/dlna, puzzle, hub) — single-color, stroke-based,
  matching the kit's icon style. No icon-font CDNs.
- **`img/PROMPTS.md`** — record the exact generation prompt for every image asset
  (built from the kit's `image_prompt_prefix` + subject + `image_prompt_suffix`
  + `negative_prompt`) so artwork can be regenerated later. Until real renders
  exist, CSS/SVG-only artwork is preferred over raster placeholders.

---

## 9. Per-site documentation files

- **`SITE.md`** — concept & vision, aesthetic direction, color table
  (role→name→hex), typography roles, spatial system, motion philosophy, and the
  visual-assets list.
- **`BUILD_LOG.md`** — what was generated, any intentional deviations from this
  spec, and known follow-ups.

---

## 10. SEO requirements (every page)

- `<title>` ≤ 60 chars, page-specific (`<Page> — Phlix` / `Phlix — <tagline>`).
- `<meta name="description">` ≤ 160 chars (from `meta.description`).
- `<meta name="keywords">` from `meta.keywords`.
- `<link rel="canonical">` to the page's absolute URL.
- One `<h1>`; unbroken heading hierarchy; semantic landmarks.
- Descriptive anchor text (no "click here").
- **JSON-LD** `SoftwareApplication` block on the home page (name, description,
  applicationCategory, operatingSystem, offers/price=0, license).
- Each site ships its own **`sitemap.xml`** (all 8 canonical pages, absolute URLs
  — **not** `404.html`, which is `noindex`) and **`robots.txt`** referencing it.

---

## 11. Social metadata requirements (every page `<head>`)

- **Open Graph:** `og:type=website`, `og:site_name=Phlix`, `og:url` (absolute),
  `og:title`, `og:description`, `og:image` (absolute URL to the 1200×630 png).
- **Twitter:** `twitter:card=summary_large_image`, `twitter:title`,
  `twitter:description`, `twitter:image`, `twitter:creator=@detain`.
- `<meta name="theme-color">` = kit primary color.
- Favicon link (`image/svg+xml`).

`og:image` and canonical/og URLs must be **absolute** (a relative `og:image` is a
known past bug — always absolute).

---

## 12. Accessibility baseline — WCAG 2.2 AA (hard gate)

- **Contrast:** body text ≥ 4.5:1; large text & UI/icons ≥ 3:1 against their
  actual background. Re-check any color the kit flags as low-contrast (some kits
  note "use as surface only, not text").
- Fully **keyboard reachable**; **visible focus** indicator on every
  interactive element; logical tab order; no positive `tabindex`.
- Form inputs have associated `<label>`/`aria-label`.
- ARIA only where native HTML can't express it.
- Honor `prefers-reduced-motion: reduce` (replace bounces with fades/none).
- Touch targets ≥ **44×44px**.
- Layout survives **200% text zoom** without clipping or overlap.

---

## 13. Performance budgets

- Lighthouse perf ≥ **90** mobile & desktop. LCP < 2.5s, CLS < 0.1, INP < 200ms.
- Hero image ≤ ~120 KB; total transferred per page ≤ ~500 KB.
- Fonts self-hosted WOFF2 with `font-display: swap`; subset to used scripts.
- No render-blocking JS (`defer`); reasonable critical CSS.
- Lazy-load below-the-fold imagery.

---

## 14. Responsive behavior

Probe at **320, 375, 414, 768, 1024, 1280, 1920**. No horizontal scroll at any
width. Mobile menu works. Body text never drops below ~16px on phones. Use the
kit's `responsive_behavior` guidance (desktop multi-column → mobile single
column, larger touch targets, sticky/bottom patterns where the kit calls for
them). Layout containers use fluid widths + a max content width; no fixed-px
layout widths.

---

## 15. Localization readiness

`<html lang>` set from `site.default_locale`. All user-facing strings trace back
to `content.json` (so a translator swaps one file). Avoid locale-unsafe
formatting. Prefer logical properties (`inline-start/end`) over `left/right` so
RTL stays possible. Subset fonts to needed scripts.

---

## 16. Technical accuracy guardrails (don't invent)

All product claims must match Phlix reality. Safe, true facts you can lean on:

- **PHP 8.3+**, **Workerman 5.x**, async/coroutine server.
- Auth: **JWT** (access + refresh), **Argon2ID** password hashing, up to 5
  profiles/user, 4-/6-digit PINs, G–NC-17 rating filter.
- Metadata: **TMDB, TVDB, Fanart.tv, local NFO**, 24-hour cache.
- Streaming: **adaptive HLS**, **FFmpeg** transcoding, per-device quality
  profiles; **direct play** when supported.
- **SyncPlay** with NTP-style time sync. **Live TV + DVR + EPG**. **DLNA**
  (ContentDirectory/AvTransport/SSDP). **Plugin** contract
  (`LifecycleInterface` + manifest). **Phlix Hub** reverse-tunnel relay.
- Clients: **Roku, Samsung Tizen, Windows, Mobile (RN, beta), any DLNA device**.
- License: **BSD-3-Clause**.

Do **not** mention unsupported clients, invented features, or competitor
trademarks except the factual "Plex/Jellyfin/Emby alternative" framing already in
`content.json`.

---

## 17. Build, preview & test commands

```bash
npm install
npm run build                                 # static dist/ (copies site folders + minifies CSS)
npm run lint                                  # html + css + js lint (zero warnings)
npm run linkcheck                             # broken-link sweep
npm run a11y                                  # pa11y-ci accessibility
npm test                                      # lint + linkcheck + meta
```

A site is build-valid when its folder contains an `index.html`; the build copies
it to `dist/<slug>/` and minifies its CSS. **Tooling note:** the current
`tools/build.mjs` and `tools/dev-server.mjs` scan the legacy `variants/`
directory — when you adopt `sites/`, point those scanners at `sites/` (or build
the folder list from `brand-kits/`). Lint must be **zero-warning** (ESLint flat
config; prefix deliberately-unused params with `_`). Do not mix stylelint majors.

---

## 18. Definition of done — quality gates

A brand-kit site is **done** only when **all** are true:

1. All 8 pages + `404.html` (§2A) + css/js/img + robots.txt + sitemap.xml +
   SITE.md + BUILD_LOG.md exist and validate.
2. `npm run lint`, `npm run linkcheck`, and `npm run a11y` pass clean.
3. **Accessibility** WCAG 2.2 AA met (§12); **SEO** complete (§10); **social
   meta** complete & absolute (§11).
4. **Brand fidelity:** every color/font/shape/motion/voice choice traces to the
   kit; nothing off-palette or off-voice; the kit's Do list followed and Don't
   list avoided.
5. **Content accuracy:** all claims match §16; spelling/grammar clean; every
   **fact** traceable to `content.json`, and any re-voiced **presentation** copy
   traceable to the kit's `copy_overlay` / `feature_casting.angle` (§2A);
   `proof_strategy` signals verifiable; nothing invented.
6. **Responsive** clean at all breakpoints (§14); **performance** within budget
   (§13).
7. The review loop (see `new_site_prompt.md`) reports **no remaining ❌ and no
   dimension below the agreed score bar**.
