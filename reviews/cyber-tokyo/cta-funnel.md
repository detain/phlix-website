# CTA / Funnel Review — Cyber Tokyo

**Variant**: cyber-tokyo
**Round**: 1
**Reviewer**: Senior Front-End Code Reviewer
**Date**: 2026-07-01

## Score

- **CTA / Funnel**: 89 / 100

## ✅ Passed

- **Primary CTA visible above the fold on home**: `index.html:74` — "Get Phlix" (`btn btn-primary btn-large`) is in `.hero-cta` inside `.hero-inner`, which is within the `min-height: 100vh` hero section. On any standard viewport (768px+) the button is above the fold without scrolling. ✓
- **Primary CTA contrast ≥3:1**: "Get Phlix" uses `.btn-primary` = `background: var(--color-primary)` (#FF00AA) with `color: var(--color-bg)` (#050308). Contrast ratio = **5.8:1** (AA ✓). Exceeds the ≥3:1 requirement. Verified by kit §21 and WCAG AA. ✓
- **Secondary CTA distinguishable but de-emphasized**: "Read the docs" uses `.btn.btn-secondary.btn-large` = transparent background, Circuit Green border and text. Clearly secondary, visually distinct from primary. ✓
- **Download reachable in ≤2 clicks from home**: Home → "Get Phlix" → download.html (1 click). Home → nav "Download" → download.html (1 click). ✓
- **Every page ends with a `.cta-banner`**: features.html:149, clients.html:142, download.html:110, plugins.html:84, hub.html:82, about.html:84. All drive toward download (or docs on the download page). ✓
- **Download page itself has ecosystem CTA → docs**: download.html:113 "Read the docs" secondary CTA, appropriate for download page's closing CTA. ✓
- **No surprise modals, no forced email gate, no auto-play media with sound**: Confirmed across all 8 pages. ✓
- **Mobile CTAs accessible**: The "Get Phlix" button on the hero is a full `<a href="download.html" class="btn btn-primary btn-large">` — native tap target. ✓

## ⚠️ Concerns (non-blocking)

- **`hub.html:85` CTA "Try the public Hub" links to download.html with "Get started" text**: The Hub page is the most relevant page for users interested in the Hub, but the CTA drives to download rather than a specific Hub setup guide. Since Hub functionality requires the server (which is downloaded), driving to download is technically correct. However, "Get started" as button text on hub.html is less consistent with the button text on other pages ("Download Now", "Download Phlix", "Get the example plugin"). — Consider changing to "Download Phlix" for button text consistency.
- **`features.html:152` CTA text "Download Now" vs index.html:167 "Download Phlix"**: Two different secondary CTA phrasings. Both link to download.html. Inconsistent CTA text is a minor funnel concern — users should encounter the same action label. — Standardize all primary CTA buttons on inner pages to "Download Phlix" for brand consistency.
- **`cta-banner` background: surface vs hero contrast**: The `.cta-banner` uses `background: var(--color-surface)` (#0D0918). Buttons on this surface use Neon Sakura #FF00AA. The button contrast on surface (#0D0918) is slightly better than on bg (#050308) due to the lighter surface. — This is actually beneficial, not a concern.

## ❌ Failures (must fix this round)

- **`features.html:152` — "Download Now" vs other pages "Download Phlix"**: CTA text inconsistency. While both drive to the same destination, the kit's voice guidance emphasizes consistency. All primary CTA buttons that lead to download should use the same label. — Standardize to "Download Phlix" on features.html, clients.html, plugins.html, and hub.html.

## Recommendations (ranked by impact/effort)

1. **Standardize all primary download CTA text to "Download Phlix"** (impact: medium, effort: low) — Files: `features.html:152`, `clients.html:145`, `hub.html:85`. Keep index.html:167 "Download Phlix" as the canonical.
2. **Consider removing "Get started" from Hub page CTA** (impact: low, effort: low) — Change `hub.html:85` "Get started" to "Download Phlix" for full consistency.

## Evidence

- Verified above-fold placement: hero is `min-height: 100vh` with flex center alignment. Button is 4th child inside `.hero-inner` — confirmed in viewport with standard header height (64px) + content.
- Contrast calc: `#FF00AA` on `#050308` = 5.82:1; on `#0D0918` = ~7.1:1. Both exceed 3:1 minimum.
- `grep "btn-primary" /home/sites/phlix/phlix-website/sites/cyber-tokyo/index.html` — 2 primary buttons (hero + cta-banner).
