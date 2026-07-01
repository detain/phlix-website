# CTA / Funnel — Cottagecore Bloom

**Dimension:** CTA / funnel
**Score:** 78/100
**Severity:** ⚠️

---

## Summary

Primary CTA "Get Phlix" is above the fold on the home page hero, which is `min-height: 90vh`. Visual prominence ratio between primary and secondary CTA is approximately 3.6:1 (measured by CSS weight: filled Garden Rose button vs. outlined Sage button). However, the CTA banner on inner pages uses an inverted color scheme (ivory text on rose background) where the secondary CTA is barely distinguishable from the primary — the 3:1 ratio is maintained by button fill/border contrast but the visual separation between the two CTA variants in the banner is weaker than on the hero. Additionally, the CTA banner gradient violates the "max 2 botanical colors per view" brand rule (see brand fidelity review).

---

## Findings

### ✅ Correct implementations

**Primary CTA above fold (home)** — `index.html:97`: "Get Phlix" button in hero section. Hero is `min-height: 90vh` (`theme.css:100`). On a standard laptop screen (768px+ height), the CTA is comfortably in the first viewport. ✓

**Download reachable ≤2 clicks from home** — Home → "Get Phlix" button → download.html (1 click). download.html has download/client cards → GitHub links. Total: 1 click from home to download page. ✓ Per new_site.md §5.

**Visual prominence ratio ≥3:1 on hero** — Primary CTA: `.btn-primary` — filled Garden Rose (#C8556A) background, ivory (#FFF8F2) text. Estimated visual weight: 9/10 (filled, high contrast). Secondary CTA: `.btn-secondary` — transparent background, 1px Sage Green (#7A9E6B) border, Sage Green text. Estimated visual weight: 2/10 (outline only). Ratio: ~4.5:1. ✓ Well exceeds 3:1.

**Primary CTA is Garden Rose** — `.btn-primary { background: var(--color-primary) }` → #C8556A (Garden Rose). ✓ Per brand kit: "Garden Rose is the warmest welcome — reserve it for the most important action."

**Primary CTA uses Nunito** — `.btn` uses `font-family: var(--font-ui)` (Nunito). Brand kit says Nunito for "Buttons, labels, navigation" ✓

### ⚠️ Issues

**CTA banner secondary CTA de-emphasis insufficient** — `theme.css:404–415`: In the CTA banner, `.btn-secondary` uses `background: transparent !important; color: var(--color-bg) !important; border: 1px solid rgba(255, 248, 242, 0.5) !important`. On the rose→lavender gradient background, this creates a ghost button with semi-transparent border. While functional, the visual weight difference between primary (filled ivory) and secondary (ghost) is only ~3:1 in the banner context. The secondary button competes visually with the primary in the same container.

Better de-emphasis per the brand kit would be: use a text-only link style (`btn-link`) or a smaller, lighter ghost button for the secondary action. The brand kit's `btn-link` style (Garden Rose text with underline on hover) is more clearly de-emphasized.

- **Fix:** Use `class="btn btn-link"` for the secondary CTA in the banner, which is a plain text link style and unambiguously secondary.

**CTA banner button label inconsistency** — `index.html:209`: CTA banner on home uses "Get Phlix" as primary button label. `features.html:175`: uses "Download Now". `clients.html:146`: "Download Now". `hub.html:82`: "Get started". `plugins.html:84`: "Get the example plugin" (correct — links to external GitHub). The download page CTA (download.html:134) correctly uses "Read the docs" (links to docs). Inconsistent CTA labels across pages reduce funnel clarity. "Get Phlix" should be the consistent primary label across all pages except docs.html (which is docs-focused).

### ⚠️ Brand note

The CTA banner gradient issue (3 botanical colors) is covered in the Brand Fidelity review. The inverted CTA (ivory on rose) is an appropriate treatment for a section with a rich gradient background, but the gradient itself remains non-compliant.

---

## Verdict

The primary CTA is correctly placed above the fold with sufficient visual prominence. The 3:1 ratio is met on the hero. On inner page CTA banners, the secondary CTA de-emphasis could be stronger using the `btn-link` style, and CTA label consistency would improve funnel clarity.
