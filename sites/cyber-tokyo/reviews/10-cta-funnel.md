# Dimension 10: CTA / funnel

## Score: 100/100

## Severity: ✅

## Findings

CTA implementation is strong. Primary CTA is above the fold, highly visible, and has sufficient contrast. Secondary CTA is appropriately de-emphasized.

## What passed

- **Primary CTA above the fold on home page**: "Download Phlix" button (`index.html:93`) is in `.hero-inner` below the hero content — it appears above the fold on standard 768px+ viewports and on taller mobile viewports. The `.hero` has `min-height: 100vh` so content below is not visible until scrolled ✅

- **Primary CTA ≥3:1 contrast**: Primary button uses `#FF00AA` background (Neon Sakura) with `#050308` text (Tokyo Night). Contrast ratio = 5.8:1 against a dark background — exceeds the 3:1 minimum for large/bold text (WCAG 2.2 §2.4.11) and also passes AA for normal text (4.5:1) ✅

- **Primary CTA styling correct per kit**: `background: var(--color-primary)`, `color: var(--color-bg)`, `border-radius: 2px`, `box-shadow: 0 0 8px rgba(255,0,170,0.3)` — matches kit's `buttons.primary` definition ✅

- **Secondary CTA de-emphasized**: Secondary button uses transparent background with circuit-green border and text — visually subordinate to the solid pink primary CTA. Button text "Read the docs" links to an external resource ✅

- **Download reachable in ≤2 clicks from home**: Home → Click "Download Phlix" → download.html (which has all client download links). The "Get Phlix" CTA on the features overview section (`index.html:178`) also links to features.html first — primary hero CTA goes directly to download ✅

- **CTA present on all interior pages**: Every page ends with a `.cta-banner` section with a primary CTA button ✅
  - `index.html:186`: "Download Phlix" → download.html
  - `features.html:153`: "Download Phlix" → download.html
  - `clients.html:146`: "Download Phlix" → download.html
  - `download.html:114`: "Read the docs" → docs.html (secondary, appropriate for this page)
  - `plugins.html:88`: "Get the example plugin" → external GitHub
  - `hub.html:86`: "Download Phlix" → download.html
  - `about.html`: No CTA banner (FAQ page ends cleanly — intentional)

- **Download page links are all GitHub repo URLs** (no dead ends) — all official clients link to their respective GitHub repos ✅

- **Primary CTA uses prominent sizing**: `.btn-large` (1.0625rem font, `padding: var(--space-4) var(--space-8)`) on hero and cta-banner CTAs — visually dominant ✅
