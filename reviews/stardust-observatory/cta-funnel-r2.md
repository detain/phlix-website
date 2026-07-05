# CTA / Funnel Review — Stardust Observatory

## Score
**3.5 / 8 pages pass** — Most pages lack a primary CTA above the fold; no nav CTA button.

---

## ✅ Passed

### index.html
- **Primary CTA above fold**: YES — Hero section is `min-height: calc(100vh - 80px)`, both CTAs ("Get Phlix" + "Read the docs") are visible without scrolling.
- **CTA copy**: "Get Phlix" and "Read the docs" are specific and action-oriented.
- **Hover states**: `.btn-primary:hover` lightens background, lifts 1px, glows. `.btn-secondary:hover` adds tinted background. All buttons have transitions (line 247–258, 267–270 in components.css).
- **Active states**: `.btn-primary:active` scales down to 0.97 and flattens shadow (components.css:255–258).

### download.html
- **Download cards with CTA buttons per tier**: YES — 4 client cards (Roku, Tizen, Windows, Mobile) each have a `btn btn-primary` CTA: "Get Roku", "Get Tizen", "Get Windows", "Get Mobile" (lines 72–91). This meets the pricing-card-per-tier intent for a download page.

### clients.html
- **CTA banner**: "Download Now" in a `.btn-primary btn-large` at bottom (line 141).

### features.html / hub.html / plugins.html
- **CTA banner**: Each has a bottom CTA banner with action-specific copy: "Download Now" (features.html:150), "Get started" (hub.html:77), "Get the example plugin" (plugins.html:79).

---

## ⚠️ Concerns

### Secondary footer CTA
- The footer on every page only shows a tagline "Open-source media, on your terms." No newsletter signup or contact CTA.
- **Impact**: Low — not every site needs a footer CTA, and the primary funnel routes users through page CTAs.

---

## ❌ Failures

### Missing nav CTA button
- The nav menu (every page) contains only text links. There is no "Get Started" / "Download" / "Start Free" styled button in the header.
- The rubric requires "Get Started / Download / Start Free button in nav header."
- **Evidence**: nav-menu links are plain `<a>` elements with no `.btn` class (e.g., index.html lines 68–77).

### No primary CTA above fold on 7 of 8 pages
- **about.html**: No hero, no above-fold CTA. Page opens directly into content.
- **features.html**: No hero. Feature grid is visible but there is no CTA until the bottom banner (after scrolling).
- **download.html**: No hero. Server section and client cards come first; CTA banner is below the fold on typical screens.
- **docs.html**: No hero. Documentation links page; no CTA until the bottom of the page.
- **plugins.html**: No hero. Brief plugin model explanation; CTA at very bottom.
- **clients.html**: No hero. Client cards grid is the main content; CTA banner is at the bottom.
- **hub.html**: No hero. Three short paragraphs; CTA banner at the very bottom.

---

## Recommendations

1. **Add a nav CTA button**: Insert a `.btn.btn-primary` (or a visually distinct "Download" link) as the last item in `.nav-menu`, e.g.:
   ```html
   <li><a href="download.html" class="btn btn-primary">Download</a></li>
   ```
   Then add nav-specific btn styles if needed to avoid the full button padding in the compact nav.

2. **Add hero sections to interior pages** (about, features, download, docs, plugins, clients, hub):
   - Each interior page currently opens with a minimal `.page-header` that shows only a heading + subheading.
   - Adding even a slim hero with a one-liner and a single CTA button would satisfy the above-fold requirement.
   - The about page specifically has no CTA anywhere on the page.

3. **Footer newsletter CTA**: Consider adding a simple email signup form or mailto link in the footer to capture passive visitors.

---

## Evidence

- **Hero viewport**: index.html:137 `min-height: calc(100vh - 80px)` — full-screen hero with CTAs.
- **Button hover CSS**: components.css:247–258 (`.btn-primary:hover/:active`), :267–270 (`.btn-secondary:hover`).
- **Download cards**: download.html:72–91 with `btn btn-primary` per client.
- **No nav CTA**: All pages share identical nav structure (e.g., index.html:68–77) — only `<a>` tags, no `.btn` class.
- **No hero on interior pages**: Confirmed across about.html, features.html, download.html, docs.html, plugins.html, clients.html, hub.html — all open with `.page-header` (not `.hero`).
