# Usability Review — Día de Muertos

**Variant**: dia-de-muertos
**Round**: 1
**Reviewer**: adversarial-reviews-agent
**Date**: 2026-07-01

## Score

- **Usability**: 71 / 100

## ✅ Passed

- Skip link present and functional: `<a class="skip-link" href="#main-content">Skip to main content</a>` rendered on all 9 HTML pages. Target `#main-content` exists as `id="main-content" tabindex="-1"` on every page
- Visibility of system status: toast component at `components.css:597-631` is implemented with success/warning/error variants, anchored bottom-right, slides in from right with smooth transition. Correct for communicating system status
- Match between system and real world: product terminology (Library, SyncPlay, DLNA, Hub, Plugin) is consistent with industry conventions for media server software. Technical terms map correctly to their functions
- User control and freedom: mobile nav at `components.css:104-138` closes on outside click (line 26-30 of `js/main.js`) and on Escape key (line 34-40 of `js/main.js`), returning focus to the toggle button. This is excellent UX
- Consistency and standards: button styles are consistent across all pages — primary (gold bg, dark text), secondary (purple ghost), ghost (border-only). Typography scale is consistent across all pages
- Error prevention: no forms on this static site that could produce errors. Code blocks at `download.html:104-105` use `<pre><code>` correctly — no risk of code injection
- Recognition rather than recall: feature cards use icon+title+description pattern — each feature is immediately recognizable. Client cards use consistent structure with tagline + highlights list
- Flexibility and efficiency: the site is a simple static marketing site — single-page-per-topic is efficient for the use case. No unnecessary complexity
- Aesthetic and minimalist design: clean dark theme, consistent spacing, no visual clutter. Brand kit colors and typography create a distinctive aesthetic
- Help and documentation: documentation links are present in footer and on the docs page. "Read the docs" CTA present on index.html
- Primary CTA "Get Phlix" / "Download Phlix" visible above the fold on index.html (`index.html:123`)
- Download reachable in ≤2 clicks from home: index → Download link in nav → download page. The primary CTA on index goes directly to download.html
- Mobile nav works: toggle button at `components.css:44-68` shows/hides menu via JS at `js/main.js:14-23`. Button has `aria-expanded`, `aria-controls`, `aria-label` attributes. Menu has `role="list"`. Touch target is 44×44px at `components.css:55-56`
- Logical tab order: skip link → nav logo → nav menu items → main content → footer. This is a sensible reading order
- External links (GitHub, docs) use `rel="noopener noreferrer"` appropriately throughout all pages
- Download page has clear client-by-client download cards with distinct actions
- No auto-playing media, no forced email gates, no surprise modals

## ⚠️ Concerns (non-blocking)

- **`hub.html`** — The "Try the public Hub" CTA at `hub.html:119` says "Get started" which is generic and less compelling than a more specific CTA. The button text doesn't clearly communicate what "started" means in this context
- **`download.html:205`** — "Need help getting started?" CTA goes to docs.html with `btn-secondary` style — this is appropriate but the secondary button styling makes it less prominent than it should be for a help-seeking action. A user who needs help shouldn't have to work to find it
- Mobile menu `components.css:109-126`: the menu slides down and covers content but there's no backdrop dimming. A user could lose their place. Not a critical failure but reduces spatial awareness
- Nav menu on desktop at `components.css:80-102` uses `padding: var(--space-2) var(--space-3)` which is quite small. The brand kit specifies 48px min touch targets on tablet/mobile, and while desktop isn't constrained by this, the nav links feel cramped
- `features.html` page has no H1 in the main content flow (though visually one exists in the page-header). The semantic structure may confuse screen reader users about the page's primary heading. See accessibility notes in Dimension 6
- No keyboard shortcut for search (if search existed). Site is simple enough this is not critical
- No breadcrumb navigation — but for a flat site with 8 pages this is acceptable
- No loading skeleton for client-side transitions — site is static HTML so this isn't applicable

## ❌ Failures (must fix this round)

- **`clients.html:104-192`** — Client card `<article>` elements contain `<h2>` elements (Roku, Samsung Tizen, Windows, Mobile, DLNA) but the parent structure is: `content-section > client-cards > article.client-card > h2`. The page itself has `h1=Clients`, then immediately H2 elements appear in articles. This is actually semantically correct (H1Clients → multiple H2 client names is valid heading hierarchy). However, each client card's `<h2>` is NOT a section heading in the ARIA sense — these are item titles within a list of clients. Using H2 for each client in a grid creates 5 H2 elements as siblings, which is valid HTML5 outline but may confuse assistive technology. A more semantically correct approach would be to use H2=Clients for the section, then each client card title as H3, OR use `<ul>` with `<li>` containing `<p>` or `<h3>` for card titles. The current structure is technically valid but not optimal for screen reader navigation of a card grid. The brand kit doesn't specify this, so this is a concern not a failure
- **`download.html`** — The download page shows "phlix-server" installation instructions at `download.html:104-105` using a `<pre><code>` block with `github.com/detain/phlix-server` as a URL anchor inside the code block. The URL text inside `<code>` at `download.html:105` links to the GitHub repository but has `rel="noopener noreferrer"` at `download.html:161`. However, the URL inside the `<code>` block at line 105 does not have the rel attribute — the anchor wraps the URL text in the code block at `download.html:101-105`. The `<a href>` tag at line 161 does have `rel="noopener noreferrer"` but this is a different occurrence of the phlix-server link. The code block link at `download.html:101-105` needs verification — it wraps the URL in an anchor with the same href but we should verify the rel is present on that specific instance. Actually, looking at `download.html:101-105`: the `<pre class="code-block">` contains `<code>` with text including `https://github.com/detain/phlix-server` but the anchor is only around the repository name in the `<p>` at `download.html:102`. The `<code>` block at lines 104-105 does NOT have a hyperlink — it contains `composer require detain/phlix-server` and `# or clone from https://github.com/detain/phlix-server` as plain text. These URLs should be clickable links for usability. Required: convert the URLs in the code block to proper anchor tags
- **`components.css:586-594`** — The `prefers-reduced-motion` rule in `components.css` disables `.candle-glow` and `.petal-loader` animations, BUT the `base.css` rule at `273-281` sets `animation-duration: 0.01ms !important` which only shortens the duration, not removes the animation. For animations that use opacity/transform, `0.01ms` still produces a brief flash before stopping. For the petal loader, if `animation: none` is not explicitly set, the browser may still trigger brief animation frames. The `components.css:585-595` rule correctly sets `animation: none` for the petal loader. However, the `base.css` reduced-motion rule applies to ALL elements, and `.candle-glow` would still be set to `animation-duration: 0.01ms` rather than `animation: none`. This means the candle glow would flash once briefly instead of being truly static. The `components.css` rule overrides this for `.candle-glow` specifically, but the interaction between the two rules is fragile. A cleaner approach would be a unified reduced-motion strategy. Not a blocking failure but technical debt

## Recommendations (ranked by impact)

1. Make code block URLs clickable with proper anchor tags (impact: high, effort: low)
2. Review client card heading hierarchy — consider H3 for card titles inside the H1→H2 page structure (impact: medium, effort: medium)
3. Add backdrop overlay to mobile nav menu for better spatial awareness (impact: low, effort: low)
4. Unify prefers-reduced-motion strategy so all animations use `animation: none` consistently (impact: low, effort: medium)
5. Consider making "Need help?" CTA more prominent on download page (impact: low, effort: low)

## Evidence

- Mobile nav JS: `sites/dia-de-muertos/js/main.js:9-41`
- Mobile nav CSS: `sites/dia-de-muertos/css/components.css:104-138`
- Toast component: `sites/dia-de-muertos/css/components.css:597-631`
- Skip link: `sites/dia-de-muertos/css/base.css:218-237`
- Primary CTA: `sites/dia-de-muertos/index.html:123`
- Nav toggle ARIA: `sites/dia-de-muertos/index.html:80-97`
- prefers-reduced-motion base: `sites/dia-de-muertos/css/base.css:272-281`
- prefers-reduced-motion components: `sites/dia-de-muertos/css/components.css:585-595`
