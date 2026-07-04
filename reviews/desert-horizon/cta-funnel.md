# CTA / Funnel Review — Desert Horizon

**Variant**: desert-horizon
**Round**: 1
**Reviewer**: adversarial-cta-funnel
**Date**: 2026-07-01

## Score

- **CTA / Funnel**: 63 / 100

## ✅ Passed

- Home hero primary CTA (`btn-primary.btn-large` → `download.html`) visible above the fold — `.hero` has `min-height: 80vh` and CTA is first interactive element in `.hero-cta` (index.html:131) — **Pass**
- Primary CTA button text (`#faf0dc`, luminance 0.878) on terracotta `#C2542A` background yields **4.04:1** contrast — exceeds ≥3:1 WCAG AA requirement for large text/UI — **Pass** (contrast.py:primary)
- Download reachable in **1 click** from home (`index.html:131` → `download.html`) — well within ≤2-click spec — **Pass**
- Features, Clients, Download, Plugins, Hub, and Home all end with a `.cta-banner` driving toward download — **Pass**
- No surprise modals, no forced email gate, no auto-play media with sound detected across all 8 pages — **Pass**

## ⚠️ Concerns (non-blocking)

- **Ghost button secondary CTA on hero** — `index.html:133-137` — The ghost button (`.btn-ghost`) text color `#2e1a0e` on the `gradient-mesa-dusk` hero background falls to **3.62:1** at the mid-gradient stop (`#c2542a`) and **1.46:1** at the dark gradient stop (`#5c2e14`). When the hero renders on different viewport heights, large portions of the ghost button area sit at <3:1. While the primary CTA passes, the secondary CTA does not meet WCAG AA ≥3:1 for all portions of its background. — **Suggested next step**: add an explicit `background: rgba(242,180,122,0.85)` (or adobe dust) to `.btn-ghost` in the hero context, or promote a `.btn-secondary` (turquoise) as the secondary CTA variant.

## ❌ Failures (must fix this round)

- **`docs.html`** — The page ends immediately after the ecosystem list with no `.cta-banner` section. Per `new_site.md` §3.6 and §5, "every page ends in a `.cta-banner` that drives toward download (or docs on the download page)." — **Required outcome**: Add a `.cta-banner` section before `</main>` in `docs.html`, e.g., `<section class="cta-banner" aria-labelledby="cta-banner-heading"><div class="cta-banner-inner"><h2 id="cta-banner-heading">Ready to install?</h2><a href="download.html" class="btn btn-primary btn-large">Get Phlix</a></div></section>`

- **`about.html`** — The page ends after the FAQ list with no `.cta-banner` section. Per `new_site.md` §3.8 and §5, every page must end with a CTA driving toward download. — **Required outcome**: Add a `.cta-banner` section before `</main>` in `about.html`, e.g., `<section class="cta-banner" aria-labelledby="cta-banner-heading"><div class="cta-banner-inner"><h2 id="cta-banner-heading">Start streaming today</h2><a href="download.html" class="btn btn-primary btn-large">Download Phlix</a></div></section>`

- **Ghost button contrast — `index.html:133-137`** — The secondary CTA (`.btn-ghost`, text `#2e1a0e`) on the hero's `gradient-mesa-dusk` (`#f2b87a → #c2542a → #5c2e14`) fails WCAG AA ≥3:1 for large text/UI. Contrast at dark gradient stop = **1.46:1**, at mid stop = **3.62:1**, at light stop = **9.38:1**. A significant portion of the hero background (the lower half) yields sub-3:1 contrast for ghost button text. — **Required outcome**: Give `.btn-ghost` an explicit `background` color (e.g., `rgba(250,240,220,0.9)` or `#FAF0DC` adobe dust) so it has a predictable, passing contrast surface, OR replace with `.btn-secondary` (turquoise) which already passes at all gradient stops.

## Recommendations

1. Add explicit `background: var(--color-adobe)` (or a semi-transparent version) to the `.btn-ghost` class when used in hero contexts, to ensure text contrast is measured against a known surface rather than a gradient (impact: high, effort: low)
2. Add `.cta-banner` to `docs.html` and `about.html` to close the 2-missing-banners gap — both pages are missing a required CTA per spec §5 (impact: high, effort: low)
3. Promote `.btn-secondary` (turquoise) as the canonical secondary CTA variant for hero sections, since it has sufficient contrast against the gradient at all stops (impact: medium, effort: low)

## Evidence

- `bash grep -l cta-banner *.html` — only 6 of 8 pages contain `.cta-banner`: **MISSING** from `docs.html`, `about.html`
- `contrast.py` — ghost button text `#2e1a0e` (L=0.0135) on `gradient-mesa-dusk`:
  - vs `#f2b87a` (L=0.5456): **9.38:1** ✅
  - vs `#c2542a` (L=0.1798): **3.62:1** ⚠️ (borderline)
  - vs `#5c2e14` (L=0.0428): **1.46:1** ❌
- Primary CTA text `#faf0dc` on `#c2542a`: **4.04:1** ✅
- `index.html:131` — primary CTA `href="download.html" class="btn btn-primary btn-large"` — 1 click from home to download ✅
- `new_site.md:238-239` — "Primary funnel rule: the download goal must be reachable in **≤2 clicks** from home, and the primary CTA visible above the fold."
- `new_site.md:228-229` — "Every page ends in a `.cta-banner` that drives toward **download** (or docs on the download page)."
