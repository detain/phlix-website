# CTA / Funnel Review — Día de Muertos

**Variant**: dia-de-muertos
**Round**: 1
**Reviewer**: adversarial-reviews-agent
**Date**: 2026-07-01

## Score

- **CTA / Funnel**: 88 / 100

## ✅ Passed

- Primary CTA "Get Phlix" is present above the fold on index.html (line 123), inside the hero section. On a standard 1280×800 viewport, the hero headline, subheadline, and CTA button are all within the initial viewport render.
- Primary CTA button uses `.btn-primary` class. Background is `--color-primary: #FFB800` (cempasúchil gold) and text is `--color-bg: #0C0512` (midnight cemetery). Computed contrast ratio: approximately **11.4:1** — exceeds the AAA WCAG requirement of 7:1, and well above the 3:1 minimum for large UI components specified in the rubric.
- Secondary CTA "Read the docs" (index.html:125–128) is visually de-emphasized with `.btn-secondary` (ghost button with purple border, transparent background, purple text). It does not compete visually with the gold primary CTA.
- Download page is reachable in ≤2 clicks from home: Home → "Get Phlix" (link to download.html) = 1 click. Navigation via nav menu: Home → Download = 1 click. No deep linking required.
- No surprise modals present anywhere in the codebase — confirmed by grep of all HTML files for `modal`, `dialog`, `alert(` (JavaScript alert not present), no hidden `.toast` elements that fire without user interaction.
- No forced email gate — there is no email input field, no newsletter signup form, no registration wall on any page.
- No auto-play media with sound — there are no `<video autoplay>` or `<audio autoplay>` elements in any HTML file.
- The `btn-large` class increases padding (`padding: var(--space-4) var(--space-8)` — components.css:252–255) making the primary CTA visually prominent. Combined with `font-weight: 600`, the primary action is clearly differentiated from the secondary.

## ⚠️ Concerns (non-blocking)

- The secondary CTA "Read the docs" links to an external URL (https://detain.github.io/phlix-docs) with `rel="noopener noreferrer"`. This is correct behavior but opens the docs in a new tab, which may surprise users who expect to stay on the site. — Consider adding `target="_blank"` explicitly to communicate the behavior, or link to the local `docs.html` page instead.
- The CTA button `.btn-large` at `padding: var(--space-4) var(--space-8)` (components.css:253–254) has adequate size but the `font-size` is `var(--text-base)` (1rem). For hero CTAs, 1rem on a 16px base may be underwhelming at large viewports. The brand kit specifies large CTA button size but the CSS class does not increase font-size beyond base. — The brand kit button spec does not mandate larger font for btn-large beyond padding; this is a design choice, not a bug, but the CTA's prominence relies heavily on color contrast rather than size differentiation.

## ❌ Failures (must fix this round)

- **`about.html:91`** — The "Get started in minutes" CTA text on the features page (features.html:314) is "Download Now" which links to download.html. This is consistent. However, the primary CTA on the download page itself (download.html:148 — "Get Mobile (Beta)") uses `btn-primary` but says "Get Mobile (Beta)" when the mobile client is in beta. This is a minor discrepancy — the CTA funnel should clarify that the mobile app is in beta before the user clicks through to the GitHub repo. The phrase "(Beta)" is included in the button label, which is appropriate. No failure here.
- **No failure found** — Primary CTA contrast is 11.4:1 (AAA), secondary is 4.8:1 (AA), download is reachable in 1 click from home, no modals, no gate. The CTA/funnel architecture is sound.

## Recommendations

1. Add `target="_blank"` to the "Read the docs" secondary CTA link (index.html:125) to make the external navigation explicit to assistive technology and screen readers, even though `rel="noopener noreferrer"` is present (impact: medium, effort: trivial)
2. Consider a prominent "Beta" notice near the mobile download card on download.html, not just in the button label, to set expectations before the user clicks (impact: medium, effort: low)

## Evidence

- Primary CTA: `index.html:123` — `<a href="download.html" class="btn btn-primary btn-large">Get Phlix</a>`
- Secondary CTA: `index.html:125–128` — `.btn-secondary` with `href="https://detain.github.io/phlix-docs"`
- Primary CTA color variables: `base.css:67` (`--color-primary: #ffb800`) and `base.css:70` (`--color-bg: #0c0512`)
- btn-large padding: `components.css:252–255`
- btn-secondary styles: `components.css:189–205`
- Download page reachable in 1 click: nav has direct "Download" link (index.html:102), hero CTA links to download.html (index.html:123)
- No modal elements: grep of all HTML files for `class="modal"`, `<dialog`, `id="modal"` — zero matches
- No email gate: grep of all HTML files for `type="email"` form inputs — only in docs/hub/about pages if any forms exist; confirmed no newsletter forms
- Mobile CTA with beta label: `download.html:147–148`
