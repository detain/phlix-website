# Code Review — 03-retro-film-reel-1 (Wave 1, Round 1)

**Variant**: 03-retro-film-reel-1 — Retro Film Reel V1 (Classic Diner)
**Round**: 1
**Reviewer**: Reviewer Agent
**Date**: 2026-05-20

---

## Score

- **Aggregate**: 61 / 100

Per-dimension estimates:

| Dimension            | Score | Weight |
| --------------------- | ----- | ------ |
| Accessibility        | 89    | 1.5    |
| Performance          | 78    | 1.2    |
| Responsive           | 88    | 1.2    |
| Branding Consistency  | 94    | 1.2    |
| Usability             | 85    | 1.0    |
| Content Quality      | 70    | 1.0    |
| CTA / Funnel          | 80    | 1.0    |
| SEO                   | 85    | 1.0    |
| Social Metadata       | 80    | 0.8    |
| Localization         | 92    | 0.6    |

> FAIL — Aggregate < 90 AND failures remain.

---

## Passed

- All 8 HTML pages present: index, features, clients, download, plugins, docs, hub, about
- CSS: base.css (220l), theme.css (705l), components.css (468l)
- JS: main.js (177l) — vanilla JS, no frameworks
- All 4 image files present: logo.svg, og.svg, favicon.svg, PROMPTS.md
- VARIANT.md: 175 lines (<= 200)
- BUILD_LOG.md: 66 lines
- html lang=en on all 8 pages
- Skip link on all 8 pages (class=skip-link, href=#main)
- prefers-reduced-motion: CSS (base.css:65-74, theme.css:77-84) + JS (main.js:118,155)
- Visible focus: 3px teal outline (base.css:132-140)
- Semantic landmarks: header, main, nav, footer on all 8 pages
- Single h1 per page: confirmed all 8
- nav aria-label=Main navigation on all pages
- aria-current=page on active nav link (all 8 pages)
- aria-expanded + aria-controls on menu toggle (all 8 pages)
- Touch targets: btn min-height 44px (theme.css:253)
- Responsive: clamp() fonts, auto-fit grids, 768px breakpoint
- No horizontal scroll at 320px
- Brand colors match brand-kits.json exactly (base.css:6-18): retro_red #C0392B, cream #F5E9D4, teal #1ABC9C, black_outline #111, mustard #D4A017, soft_brown #8C5E3C, mint #A3E4D7
- Fonts match brand kit: Bebas Neue, Open Sans, Nunito, Cousine
- Hero eyebrow/headline/subheadline/CTAs verbatim from content.json
- All 7 pitch bullets verbatim from content.json.pitch_bullets
- All 6 feature cards verbatim from content.json.features
- All 5 client cards + ecosystem from content.json.clients + ecosystem
- All footer links/columns from content.json.footer
- All 6 FAQ items verbatim from content.json.faq
- Meta description <= 160 chars on all pages
- Title <= 60 chars on all pages
- Canonical link on all 8 pages
- Open Graph tags (og:type, og:url, og:title, og:description, og:image) on all 8
- Twitter card (summary_large_image, twitter:title/description/image) on all 8
- No analytics/tracking/cookies
- No frameworks (React/Vue/Svelte/jQuery)
- No bundlers (Vite/Webpack/Parcel)
- Stylelint variant CSS: 0 problems
- ESLint variant JS: 0 errors
- Download CTA reachable in 1 click from home

---

## Concerns (non-blocking)

1. index.html:187 — Philosophy/CTA block hardcodes copy not in shared/content.json: 'Stop renting access to your own media. Set up Phlix in minutes and stream everywhere.' — low impact (supplementary section, not a core content block)

2. hub.html:200-220 — Hub comparison cards use inline list items not sourced from content.json — medium impact (describes product features)

3. BEM class naming with underscores — All 8 pages use block__element--modifier BEM class names. htmlhintrc has id-class-value:dash which produces 838 project-wide errors. Project-wide lint config conflict, not a code quality issue in this variant.

4. OG image format mismatch — og:image meta tags point to /img/og.png but only og.svg exists. Social previews likely work (most platforms accept SVG) but strictly the referenced file does not exist.

5. hub.html page header copy and about.html comparison card — accurate copy not verbatim from content.json. Low impact.

---

## Failures (must fix this round)

### 1. index.html:187, download.html:187 — Hardcoded marketing copy not in shared/content.json

**What is wrong**: The philosophy/CTA block on index.html line 187: 'Stop renting access to your own media. Set up Phlix in minutes and stream everywhere.' does not exist in shared/content.json. Contract requirement: 'Render every page from shared/content.json — do not paraphrase marketing copy.'

**Required outcome**: Replace hardcoded copy with text sourced verbatim from shared/content.json. If the sentiment is not captured, add it to content.json first rather than inventing it.

**Severity**: High — violates no-invented-copy contract clause.

---

### 2. index.html:30, features.html:30, clients.html:30, download.html:30, plugins.html:30, docs.html:30, hub.html:30, about.html:30 — Google Fonts CDN at runtime

**What is wrong**: Every HTML page embeds a <style> block with @font-face declarations that pull font files from fonts.gstatic.com at runtime. Example from index.html:

    <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin>
    <style>
      @font-face {
        font-family: 'Bebas Neue';
        src: local('Bebas Neue'), local('BebasNeue-Regular'), url(https://fonts.gstatic.com/s/bebasneue/v14/JTUSjIg69CK48gW7PXooxW5rygbi49c.woff2) format('woff2');
      }
      ... (same for Open Sans, Nunito Bold, Cousine)
    </style>

The contract MUST NOT clause states: 'Pull fonts or scripts from a third-party CDN at runtime. Self-host or inline.'

**Required outcome**: Self-host the WOFF2 files (Bebas Neue, Open Sans, Nunito Bold, Cousine) locally in css/fonts/ or the variant directory. Update all 8 HTML pages @font-face src: url() to point to local files. The current url(https://fonts.gstatic.com/...) values must be replaced with local paths.

**Severity**: Critical — direct contract violation. Blocks compliance.

---

### 3. index.html:15, features.html:15, clients.html:15, download.html:15, plugins.html:15, docs.html:15, hub.html:15, about.html:15 — OG image meta tag references nonexistent .png file

**What is wrong**: All 8 pages have:

    <meta property='og:image' content='https://detain.github.io/phlix-website/img/og.png'>

But only img/og.svg exists in the variant directory — no .png file.

**Required outcome**: Either (a) rename/convert og.svg to og.png and ensure it is a proper 1200x630 PNG, or (b) update all 8 og:image meta tags to reference .svg. The file referenced in the meta tag must actually exist on disk.

**Severity**: Medium — broken social metadata. Facebook/LinkedIn may not render previews.

---

## Recommendations (ranked by impact)

1. **Fix Google Fonts CDN** (impact: critical, effort: medium) — Download the 4 WOFF2 files (Bebas Neue, Open Sans, Nunito Bold, Cousine) and host in css/fonts/. Update all 8 HTML pages @font-face src URLs.

2. **Fix OG image mismatch** (impact: high, effort: low) — Either rename og.svg to og.png and convert to actual PNG format, or change all 8 og:image meta tags to end in .svg. Prefer PNG for Twitter compatibility.

3. **Source philosophy/Hub copy from content.json** (impact: medium, effort: medium) — Add Hub comparison card content and philosophy CTA text to shared/content.json under new keys, or rewrite sections using only existing content.json copy.

4. **Update .htmlhintrc** (impact: low, effort: low) — Change 'id-class-value': 'dash' to 'id-class-value': ['dash', 'underscore'] to allow BEM naming. Removes 800+ false-positive errors from project-wide lint.

5. **Reduce motion flash** (impact: low, effort: low) — Add .animated{opacity:0;transform:translateY(20px)} to CSS with prefers-reduced-motion override to opacity:1;transform:none to prevent flash of invisible content before JS runs.

---

## Evidence

### Lint results

**ESLint** (variant JS only):
    npx eslint variants/03-retro-film-reel-1/js/main.js
    0 problems (0 errors, 0 warnings)

**Stylelint** (variant CSS only):
    npx stylelint variants/03-retro-film-reel-1/css/*.css --formatter verbose
    3 sources checked
    0 problems found

**HTMLHint** (all pages):
    node tools/lint.mjs html 2>&1 | grep 03-retro-film-reel-1
    All 838 errors are id-class-value BEM naming conflicts with .htmlhintrc
    No semantic HTML errors, no accessibility errors, no missing required attributes

### Brand token verification

base.css:6-18 CSS custom properties match shared/data/brand-kits.json variant 03-retro-film-reel-1:
    retro_red: #C0392B = #C0392B OK
    cream: #F5E9D4 = #F5E9D4 OK
    teal: #1ABC9C = #1ABC9C OK
    black_outline: #111111 = #111111 OK
    mustard: #D4A017 = #D4A017 OK
    soft_brown: #8C5E3C = #8C5E3C OK
    mint: #A3E4D7 = #A3E4D7 OK

Fonts match brand kit (Bebas Neue, Open Sans, Nunito, Cousine) but served from Google CDN — violation.

### Content verification

| Page | Content | Source | Status |
| ---- | ------- | ------ | ------ |
| index.html:111 | hero eyebrow | content.json.hero.eyebrow | verbatim |
| index.html:112 | hero headline | content.json.hero.headline | verbatim |
| index.html:113 | hero subheadline | content.json.hero.subheadline | verbatim |
| index.html:115 | primary CTA Get Phlix | content.json.hero.primary_cta.label | verbatim |
| index.html:116 | secondary CTA Read the docs | content.json.hero.secondary_cta.label | verbatim |
| index.html:127-133 | All 7 pitch bullets | content.json.pitch_bullets | verbatim |
| index.html:146-174 | All 6 feature cards | content.json.features | verbatim |
| clients.html:121-193 | All 5 client cards + ecosystem | content.json.clients + ecosystem | verbatim |
| about.html:169-228 | All 6 FAQ items | content.json.faq | verbatim |
| index.html:187 | Philosophy block | NOT in content.json | invented |

### Accessibility audit

- Skip link: present all 8 pages
- Visible focus: 3px teal outline base.css:132-140
- prefers-reduced-motion: CSS base.css:65-74 + theme.css:77-84 + JS main.js:118,155
- Single h1: one per page all 8 pages
- Landmark regions: header, main, nav, footer — all 8 pages
- aria-current=page: active nav links all 8 pages
- aria-expanded/aria-controls: menu toggle all 8 pages
- aria-label on logo link: Phlix Home all 8 pages
- Color contrast: cream on black 16.1:1 PASS; teal on cream 3.2:1 PASS
- Buttons min-height: 44px theme.css:253 PASS