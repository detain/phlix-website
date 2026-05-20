# Usability Review — 02-spotlight-projector

**Variant**: 02-spotlight-projector
**Round**: 1
**Reviewer**: Claude (Dimension Reviewer)
**Date**: 2026-05-20

## Score

- **Usability**: 84 / 100

## ✅ Passed

- **Download reachable in ≤2 clicks from home**: Home page has "Get Phlix" CTA in hero (line 73, index.html) and CTA banner (line 181). Download page is also directly in the persistent nav. This passes the primary-goal criterion.
- **Visibility of system status**: Skip link present on all 8 pages (`<a class="skip-link" href="#main-content">`). `aria-current="page"` used consistently on the active nav item. `aria-expanded` on mobile nav toggle is correctly updated by JS (main.js:16). FAQ accordion uses `aria-expanded` and `hidden` attributes correctly (main.js:76–113).
- **User control and freedom**: Focus moves to first menu item when mobile nav opens (main.js:19). Escape key closes mobile nav and returns focus to toggle (main.js:24–29). Focus trap within mobile nav (main.js:32–47). All 8 pages have consistent persistent nav — no user traps.
- **Consistency and standards**: All 8 pages share identical header/footer structure, same CSS cascade (base.css → theme.css → components.css), same ARIA landmark pattern (`role="banner"`, `role="navigation"`, `role="list"`, `role="contentinfo"`). `aria-current="page"` on active nav link on every page.
- **Recognition rather than recall**: Feature cards (index.html lines 100–172) pair icons with bold headings and descriptive text. Client cards (clients.html lines 75–141) show status badges (stable/beta) and bulleted highlights. Footer organizes links into three labeled columns (Product / Developers / Project).
- **Error prevention**: All external links carry `rel="noopener noreferrer"` (download.html lines 86, 91, 96, 101; clients.html lines 87, 100, 114, 127, etc.). Code blocks use `<pre class="code-block"><code>` (download.html lines 77–78). No forms on the site — no validation concerns.
- **Flexibility and efficiency**: Download page has a clear three-tier hierarchy: Server → Clients → Ecosystem. Feature-overview cards let experts scan quickly; hero copy and pitch bullets serve newcomers. FAQ on about.html addresses common questions without requiring doc navigation.
- **Aesthetic and minimalist design**: Dark theme with gold accent (#F5C542 on #000) provides strong contrast. Typography is role-differentiated: Cinzel for headlines, Lora for body, Source Sans Pro for UI labels. Cards use consistent padding, border-radius, and hover glow. No visual clutter.
- **Help users recognize/diagnose/recover from errors**: The site is purely informational — no interactive error states. Footer links to GitHub issues (about.html line 81). FAQ covers "Is Phlix like Plex?" and "Do I need to expose my server to the internet?" — actionable questions for the target user.
- **Help and documentation**: docs.html (line 75) links to full documentation. Footer "Documentation" link on all 8 pages. Download page has "Need help getting started?" CTA → docs.html. Code example on download.html shows `composer require detain/phlix-server`.
- **`prefers-reduced-motion` respected**: base.css line 173 disables all animations. theme.css line 353 disables the spotlight-sweep header animation.
- **Keyboard navigation**: `:focus-visible` outline in gold (base.css line 162). All interactive elements (nav links, buttons, FAQ dt elements) are keyboard-reachable.

## ⚠️ Concerns (non-blocking)

- **nav.html:51–58 — 8 nav items on mobile may cause accordion clutter**: The nav menu lists Home, Features, Clients, Download, Plugins, Docs, Hub, and About. On small mobile screens this produces a tall stack before reaching page content. Impact is moderate since the menu is functional and focusable. Suggested: consider grouping (e.g., Product / Community / Resources) or a search shortcut.
- **docs.html:74–81 — Docs page is a thin redirect with no on-page content**: The page says "Full documentation is maintained at..." and then lists four external links. A user arriving at `/docs.html` gets almost no information. This fragments the help experience — users who don't click through are left with nothing. Suggested: add 2–3 sentence summaries for each doc section so the page has standalone value.
- **hub.html:81 — Placeholder URL "phlix-hub.example.com"**: The Hub page says "no configuration required" but uses an example.com domain. Users may not realize this is a placeholder and could try to visit it. Suggested: either remove the example URL or label it clearly as "e.g., phlix-hub.example.com".
- **plugins.html:80 — "Ecosystem plugins" section has no content**: The section heading reads "Ecosystem plugins" followed immediately by paragraph text and a "Write your own" section. No actual plugins are listed. Suggested: either populate with real plugins or rename the section to avoid implying content exists.
- **features.html + index.html — Technical jargon in feature descriptions may exclude some users**: Descriptions like "ItemRepository hydrates metadata_json" or "CRF 23/28 libx264/libx265 with HLS master and variant playlists" assume prior knowledge. For a product marketed as self-hostable for "anyone," this could be intimidating. Suggested: add a one-line plain-language summary above the technical description in each feature detail block.
- **No breadcrumbs on interior pages**: A user on `/clients.html` has no in-page indicator of their location in the site hierarchy beyond the nav highlight. Breadcrumbs would help, though the persistent nav partially mitigates this concern.

## ❌ Failures (must fix this round)

- **hub.html:81** — "phlix-hub.example.com" is a fake placeholder domain appearing in a user-facing sentence ("or use the public one at phlix-hub.example.com — no configuration required"). Users who try to visit this URL will hit a dead end, damaging trust. Required outcome: replace with a real public URL or remove the domain reference entirely and rely on the GitHub link instead.

## Recommendations (ranked by impact)

1. **(impact: high, effort: low)** Fix or remove the placeholder "phlix-hub.example.com" URL on hub.html:81 — directly prevents user confusion and failed navigation.
2. **(impact: high, effort: medium)** Populate the docs.html page with at least 2–3 sentences per doc link describing what each section covers — reduces fragmentation of the help experience.
3. **(impact: medium, effort: low)** Populate the "Ecosystem plugins" section on plugins.html:80 or remove the empty heading to avoid misleading users.
4. **(impact: medium, effort: low)** Add plain-language summaries above technical feature descriptions on features.html — broadens audience accessibility.
5. **(impact: medium, effort: medium)** Consider grouping the 8-item nav into 3 collapsible top-level categories on mobile to reduce cognitive load — current implementation works but is crowded.

## Evidence

- All 8 HTML files read and parsed: index.html, download.html, features.html, docs.html, clients.html, plugins.html, hub.html, about.html
- CSS files read: base.css (182 lines), theme.css (357 lines), components.css (571 lines)
- JavaScript read: main.js (123 lines) — confirmed `aria-expanded` updates (line 16), escape key handler (lines 24–29), focus trap (lines 32–47), FAQ accordion with `aria-expanded`/`hidden` (lines 70–121)
- Navigation item count verified across all pages: 8 items in `<ul class="nav-menu">` on every page
- External link `rel="noopener noreferrer"` checked on: download.html (4 client links), clients.html (5 client links), plugins.html (2 links), hub.html (1 link), about.html (1 link)
- Download CTAs counted on index.html: 2 (hero btn-primary line 73, hero btn-secondary line 74, cta-banner btn-primary line 181) — all link to download.html
- `prefers-reduced-motion` queries found in base.css:173 and theme.css:353
