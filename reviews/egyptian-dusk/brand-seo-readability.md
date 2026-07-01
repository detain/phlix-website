# Egyptian Dusk — Brand, SEO & Readability Review

**Site:** `/home/sites/phlix/phlix-website/sites/egyptian-dusk/`
**Review scope:** All 8 pages (index, features, clients, download, plugins, docs, hub, about) + CSS + JS + assets + sitemap + robots.txt

---

## 1. Brand fidelity & spirit — Score: 72/100

### Findings

#### CSS Design Tokens ✅
- `base.css:61–165` — All CSS custom properties (colors, spacing, radii, fonts, shadows) match `design_tokens` exactly. No off-palette hex values found.

#### Colors ✅
- No colors outside the kit palette. Gradient `--gradient-dusk-pyramids` uses only `#C8440A / #D4A520 / #1A4890` — all from kit. No cold blue-greys introduced.

#### Typography ⚠️
- `base.css:186–189` — h1 size `var(--text-5xl)` = 48px; h2 = 36px; h3 = 24px. Consistent scale but h3 font-family is `var(--font-headline)` (Cinzel), which is correct per `fonts.headline`.
- `base.css:192–194` — Body uses `var(--font-body)` (Cormorant Garamond) with `line-height: var(--leading-relaxed)` (1.7) ✅ matches kit body.line_height of 1.70.
- `theme.css:207–216` — Hero sub has correct body font, 18px, 1.7 line-height ✅
- `theme.css:241–250` — `.pitch h2` uses `font-display` (Cinzel Decorative), `text-3xl` (30px). Per kit `fonts.display` is for "monumental display only". The pitch h2 at 30px is arguably display-scale ✅
- `components.css:285–309` — Buttons correctly use `font-ui` (Cinzel) ✅

#### Spacing ✅
- `base.css:86–95` — Spacing scale `[4, 8, 12, 16, 24, 32, 48, 64, 96]` matches kit exactly. No off-scale values.

#### Corner Radii ✅
- `base.css:97–102` — `[1px, 3px, 6px, 10px, 999px]` matches kit's `corner_radius` scale.

#### Motion ⚠️
- `theme.css:199–205` — Hero h1 has `@keyframes shimmer` using 6s duration, ease-in-out, infinite. The kit's `header_motif` describes a "golden shimmer animation — light travelling across the hero wordmark like Ra's sun-disk". However, the kit's `animation/motion` section lists "never run continuous looping animations without pause" under its dont list. A 6s infinite animation is close to continuous without pause. **Verdict: borderline acceptable** given it matches the header_motif description, but it should arguably have a longer cycle or pause.
- `components.css:442–448` — `.feature-card:hover` uses `transform: translateY(-2px)`. Kit `brand_opposites` says "Not fast or bouncy — nothing rushed". The transition is 280ms ease-in-out (not bouncy), but translateY is still a lift effect. **Minor concern.**
- `base.css:154–158` — `--transition-fast: 150ms`, `--transition-base: 280ms`. The kit `microinteractions.hover` specifies 280ms for cards. `microinteractions.button_press` specifies 180ms (short of the 350ms minimum for major state changes), and `focus` is 150ms. The kit's "never under 200ms for major state changes" rule (line 1159) appears to apply to transitions, not just microinteractions.
- `js/main.js:106–107` — Scroll reveal uses 500ms `cubic-bezier(0.3,0,0.15,1)` ✅ within 350–600ms ceremonial range.

#### Signature elements ⚠️
- Hieroglyphic-band dividers: `theme.css:97–112` ✅ — gradient fade with gold center for `.section-band::before`
- Cartouche badges: `components.css:591–604, 624–653` ✅ — pill-radius status badges
- Gold foil shimmer: `theme.css:199–205` + `components.css:48` (nav-wordmark text-shadow) ✅
- Scarab watermark: Not present. Hero uses `.hero-silhouette` with pyramid silhouette instead of a scarab. No scarab background in hero panels. **Not implemented.**
- Ankh/Eye of Horus icon motifs: `logo.svg` has ankhs in the logo lockup (allowed per `logo_rules.allowed_symbols`). Navigation icons are plain 3-line hamburger SVGs with no Egyptian motifs. **Not implemented.**
- Sand-grain texture: `theme.css:139–146` ✅ — SVG feTurbulence noise overlay on hero

#### Brand opposites ⚠️
- `brand_opposites` lists "Not fast or bouncy — nothing rushed". `transform: translateY(-2px)` on card hover at 280ms is not bouncy (no spring/overshoot), but is a lift motion. The kit explicitly says "animate more than one element simultaneously — don't". Only one element is animating here. Acceptable.
- No playful, cartoonish, neon, modern-minimal, cold-blue-grey, or pastel elements detected ✅

#### Voice & Copy ⚠️
- All copy reviewed — no `avoid_words` (cool, awesome, amazing, fun, easy, quick, leverage, synergy, robust, utilize, exciting, pop, vibe, sleek) found in any body text or headings ✅
- `features.html:175` — "Get started in minutes" uses "minutes" (from the avoid list). Should be brand-flavored e.g. "Begin your passage" per kit vocabulary.
- Brand voice is largely generic product description copy (from `content.json`) rather than Egyptian-inflected. The kit's writing_style calls for "Egyptian-inflected vocabulary (kingdom, eternal, sacred, carved, the Nile, throne, passage, afterlife)". Almost no instances of this vocabulary appear in the actual page copy — the hidden `aria-hidden` tagline watermark at `index.html:96–98` is the only explicit Egyptian Dusk voice element. **Significant gap.**

#### Design principles ✅
- Gold = single CTA per screen: `components.css:315–327` — `.btn-primary` uses `--color-primary` (Pharaoh Gold). One primary CTA per banner/screen ✅
- Darkness = fertile silt: All backgrounds use `--color-bg` (#0A0603 Black Silt Night) or `--color-surface` (#130C05 Khufu's Shadow) ✅
- Lapis = divine/elevate, not decorate: `--color-secondary` (#1A4890) used for status-beta badge, `docs-links` hover border. Not for destructive states ✅
- Composition symmetrical/processional: Hero centered; pitch bullets centered; cards in symmetric grids. The design is predominantly centered/symmetric ✅
- Typography inscriptional: Cinzel/Cinzel Decorative for all headings/UI, Cormorant Garamond for body ✅
- Motion slow/ceremonial: 500ms reveal, 280ms card hover, 400ms slow transitions. Generally within range ✅
- Terracotta = danger only: Only appears in `status-beta` (error variant) and download-cards hover border. Correct per `terracotta_rule` ✅

#### Logo ⚠️
- `img/logo.svg:37–41, 44–48` — Ankh symbols flanking the wordmark. The kit's `logo_rules.allowed_symbols` explicitly includes "ankh cross" and forbids only play-button triangles, gears, modern sans-serifs, rounded bubbly shapes, and sunbursts. Ankh is permitted. The logo is a cartouche-style rectangular stele with 1px Pharaoh Gold border ✅. However, the logo wordmark font is not Cinzel Decorative in the SVG — it uses a generic serif fallback chain, not the brand font (this is a render limitation of SVG text without web font loading, but worth noting).

### Verdict
**Partial fail.** The CSS token system is impeccable and the color/spacing/typography rules are faithfully implemented. Motion timing is mostly within range. However, the Egyptian Dusk brand voice is barely present in the copy — the site reads as a generic dark product site with Egyptian decorations rather than a site that embodies the brand's ceremonial, mythic voice. The tagline watermark is the only Egyptian-inflected text on the entire site. The feature-card hover has a translateY lift (minor). The infinite shimmer animation, while matching the header_motif description, risks violating the "no continuous looping" rule. Missing signature elements (scarab watermark, Egyptian motif nav icons) further dilute the brand.

---

## 2. SEO — Score: 79/100

### Findings

#### `<title>` tags ❌
- `index.html:6` — **Title: "Phlix — Your media. Your library. Your Phlix." (47 chars)** — The new_site.md §10 requires `<Page> — Phlix` format for interior pages and `Phlix — <tagline>` (using `tagline_primary: "Stories Carved in Gold."`) for the home page. The home page title does not use the tagline_primary. Should be "Stories Carved in Gold. — Phlix" or similar. Other pages correctly use "Features — Phlix", "Clients — Phlix" etc. **Home title does not match spec format.**
- All other page titles (Features — Phlix, Clients — Phlix, Download — Phlix, Plugins — Phlix, Docs — Phlix, Hub — Phlix, About — Phlix) are correctly formatted ✅

#### `<meta name="description">` ✅
- All 8 pages: "Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support." — 112 chars, within 160-char limit ✅

#### `<meta name="keywords">` ❌
- **No `<meta name="keywords">` found on any page.** new_site.md §10 explicitly requires it from `meta.keywords`. `content.json.meta.keywords` exists and contains: `["phlix", "media server", "plex alternative", "jellyfin alternative", "self-hosted streaming", "php media server"]`. This tag is missing from all 8 pages.

#### `<link rel="canonical">` ✅
- All 8 pages have correct absolute canonical URLs pointing to `https://detain.github.io/phlix-website/egyptian-dusk/<page>.html` ✅

#### `<h1>` and heading hierarchy ✅
- `index.html:82` — One h1: "Your media. Your library. Your Phlix." ✅
- `features.html:60` — h1: "Features" ✅
- All other pages — one h1 per page, no heading level skips detected ✅
- Heading hierarchy: h1 → h2 → h3 on all pages, never skipping a level ✅

#### Anchor text ✅
- No "click here" or generic non-descriptive link text found. All links are descriptive or contain meaningful context ✅

#### JSON-LD ✅
- `index.html:37–48` — Valid `SoftwareApplication` JSON-LD with `name`, `description`, `applicationCategory` ("MultimediaApplication"), `operatingSystem` ("PHP 8.3+"), `offers` (price "0", priceCurrency "USD"), `license` ✅
- Other pages: No JSON-LD required ✅

#### `sitemap.xml` ✅
- Contains all 8 pages with absolute canonical URLs ✅
- `<loc>` entries are correct ✅
- `priority` and `changefreq` values are appropriate ✅

#### `robots.txt` ✅
- References sitemap at correct absolute URL ✅
- `Allow: /` present ✅

#### Open Graph ⚠️
- All pages have `og:type`, `og:site_name`, `og:url` (absolute), `og:title`, `og:description`, `og:image`, `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:creator` ✅
- `og:image` on all pages: relative URL `/img/og.svg`. new_site.md §11 requires absolute URL. This is noted in the spec as "a known past bug — always absolute". **Relative path used instead of absolute.**

### Verdict
**Partial fail.** Canonical URLs, JSON-LD, h1 hierarchy, anchor text, sitemap, and robots.txt are all correct. The `og:image` uses a relative path (known spec violation). The home `<title>` does not follow the spec's required format (should use `tagline_primary`). The `<meta name="keywords">` tag is entirely absent from all pages.

---

## 3. Readability — Score: 81/100

### Findings

#### Reading level ✅
- Copy is from `content.json` — factual, adult-oriented, technical. No colloquialisms. Vocabulary level is appropriate for adults 28–55 seeking depth and grandeur ✅
- Brand kit voice (ceremonial, authoritative) is mostly absent from the visible copy (only in hidden watermark), but when present in copy structure (declarative sentences, no exclamation marks) it passes ✅

#### Line length ⚠️
- `theme.css:213` — `.hero-sub` max-width: 640px, font-size 18px. At 640px width and Cormorant Garamond ~9px per character, this is approximately **90 characters per line** — exceeds the 60–75ch target.
- `theme.css:256` — `.pitch-bullets` max-width: 720px, font-size 18px. Approximately **90+ characters per line** — exceeds target.
- `theme.css:400–401` — `.page-lead` max-width: 560px at 18px, ~70ch ✅ (within range)
- Feature card body text at 14px in `components.css:483`, in a 280px min-width grid column — approximately 40–50ch ✅

#### Visual hierarchy ✅
- h1 (48px Cinzel Decorative) → h2 (36px Cinzel Decorative or Cinzel) → h3 (24px Cinzel) → body (18px Cormorant Garamond) ✅
- Clear spacing between sections (64px vertical padding) ✅
- Pitch section has 32px gap between bullets and visual left-edge gold accent line ✅
- FAQ items have gold left-border accent ✅

#### Spacing / darkness as ceremony ✅
- `theme.css:94` — `.section-band { padding-block: var(--space-16) }` = 64px ✅
- `theme.css:238` — `.pitch { padding-block: var(--space-16) }` = 64px ✅
- `theme.css:291–292` — `.features-overview { padding-block: var(--space-16) }` = 64px ✅
- Generous negative space throughout — the dark backgrounds are structural, not absent ✅

#### Typography inscriptional and authoritative ✅
- Headlines use Cinzel/Cinzel Decorative at 700+ weight with wide letter-spacing (0.04–0.08em) ✅
- Body copy uses Cormorant Garamond at weight 400, 18px, line-height 1.7 ✅
- All-caps UI labels in Cinzel with tracking (nav items, button text, eyebrow label) ✅
- No centered long body copy blocks — bullets and card text are left-aligned or in structured grids ✅

#### Brand typography rules compliance ⚠️
- `typography_rules` says "Tracking on headlines is open (0.04em+) — inscriptional spacing reads as authority." Applied correctly via `letter-spacing: var(--tracking-wide)` (0.04em) on h1–h4 ✅
- `typography_rules` says "Body copy (Cormorant Garamond) must never be set in all-caps." The pitch bullets use sentence case, not all-caps ✅
- `typography_rules` says "Use Courier Prime only for tomb-inscription / technical readout moments." `.text-mono` class is defined but not used prominently in page content — acceptable ✅
- `typography_rules` says "Cinzel Decorative should be uppercase; its weight alone makes lowercase feel weak." Hero h1 uses `text-transform: uppercase` ✅

### Verdict
**Pass with concern.** Typography is inscriptional and the type scale is well-constructed. Spacing honors the "darkness as ceremony" principle. Line length on the hero sub and pitch bullets exceeds the 60–75ch target significantly (running ~90ch), which hurts readability. The brand voice gap (from dimension 1) means the site doesn't fully deliver the "depth and grandeur" the brand promises, but mechanically the readability infrastructure is sound.

---

## Summary of Must-Fix Issues

| # | Dimension | Severity | File:Line | Issue |
|---|-----------|----------|-----------|-------|
| 1 | SEO | ❌ Critical | `index.html:6` | `<title>` does not use brand `tagline_primary` — spec requires `Phlix — Stories Carved in Gold.` format |
| 2 | SEO | ❌ Critical | All 8 pages | `<meta name="keywords">` is entirely absent — `content.json.meta.keywords` not wired |
| 3 | SEO | ❌ Critical | All 8 pages | `og:image` uses relative path — spec requires absolute URL |
| 4 | Brand | ⚠️ Should-fix | `features.html:175` | "Get started in minutes" uses brand `avoid_word` "minutes" |
| 5 | Brand | ⚠️ Should-fix | All pages | Egyptian-inflected vocabulary (kingdom, eternal, sacred, etc.) absent from visible copy — only present in hidden watermark |
| 6 | Readability | ⚠️ Should-fix | `theme.css:213,256` | Hero sub and pitch bullets exceed 75ch line length (~90ch at current max-width) |
| 7 | Brand | ⚠️ Should-fix | `theme.css:199–205` | Infinite shimmer animation on hero h1 — consider adding a longer cycle or pause |
| 8 | Brand | ⚠️ Should-fix | CSS | Scarab watermark not implemented; Egyptian motif nav icons (ankh, Eye of Horus) not implemented |
| 9 | Brand | ⚠️ Minor | `components.css:442–448` | `transform: translateY(-2px)` on feature-card hover — small lift may conflict with "nothing rushed" brand opposite |
| 10 | SEO | ⚠️ Minor | All pages | `<meta name="theme-color">` uses primary gold but should arguably be brand-matched on a per-page basis (not a real defect) |
