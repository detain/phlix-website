# CTA / Funnel Review — Midnight Jazz

**Score: 85/100** | Severity: ⚠️

## Findings

### ✅ Passing

| Check | Details |
|-------|---------|
| Primary CTA above fold | Home page hero (`index.html:103–127`) has `Get Phlix` as first button. At 1920px the fold is ~940px; the hero is `min-height: calc(100svh - var(--nav-h))` with content visible without scrolling. ✅ |
| Primary CTA contrast ≥ 3:1 | `.btn-primary` = `#E8961F` bg + `#0d1117` text → ~11.2:1. Far exceeds 3:1. ✅ |
| Secondary CTA de-emphasized | `.btn-secondary` uses ghost style (transparent bg + Cool Slate border + Cool Slate text). Does not compete with primary for visual weight. ✅ |
| Download reachable in ≤2 clicks from home | Home → `.hero-cta .btn-primary` → `download.html` (1 click on CTA, URL loads). Home → nav "Download" → `download.html` (1 click on nav). Both ≤ 2 clicks. ✅ |
| Primary CTA at end of home page | `.cta-banner` at `index.html:338–343` has "Download Phlix" in amber. ✅ |
| "Get Phlix" on home, "Download Phlix" on other pages | Correct per `new_site.md §5` — home uses primary "Get Phlix", inner pages use "Download Phlix" in CTAs. |
| `features.html` closing CTA | "Download Phlix" in amber. ✅ |
| `clients.html` closing CTA | "Download Phlix" in amber. ✅ |
| `download.html` closing CTA | "Read the docs" secondary (per spec exception: download page drives to docs). |
| `plugins.html` closing CTA | "Read the docs" secondary. Drives to external docs. |
| `hub.html` closing CTA | "Read the hub guide" secondary. Drives to `https://detain.github.io/phlix-docs/hub`. |

### ⚠️ Issues

- **`download.html:317`** — The CTA banner on the download page says "Need help getting started?" with only a "Read the docs" secondary button. Per `new_site.md §5`: "Every page ends in a `.cta-banner` that drives toward **download** (or docs on the download page)." The spec explicitly allows the download page to drive to docs. However, having zero primary (amber) download CTA on the download page is a funnel seam — if a user lands directly on download.html, they see no prominent download action. The download page is mostly informational (it tells you how to install via composer), but the missing amber CTA is a UX gap.
- **`hub.html:212`** — CTA says "Read the hub guide" which is a secondary ghost button, not a primary CTA. Hub is not a direct download funnel page, so this is acceptable. The CTA banner drives toward the docs, not download, which is appropriate.
- **Hero CTA layout at 480px** — At very small screens, `theme.css:784–791` stacks buttons vertically and sets `width: 100%` on `.btn-large`. The "Get Phlix" button becomes full-width which is good — but the secondary "Read the docs" also becomes full-width stacked below it. Both are the same visual weight when full-width; the secondary should perhaps be smaller or text-only at mobile. Not a hard failure.

### ❌ Issues

None.

---

## Verdict

Primary CTA is above fold with excellent contrast. Download is reachable in ≤2 clicks from home. The download page's CTA banner uses secondary-docs instead of download CTA — this is a spec exception but represents a UX seam.

**Score: 85/100** — 15-point gap: download page missing a primary amber CTA (spec exception) and hero CTA layout at mobile stacks both buttons at equal visual weight.
