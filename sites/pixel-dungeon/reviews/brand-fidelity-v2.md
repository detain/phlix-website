# Brand Fidelity Review — Round 2
## Pixel Dungeon Site

**Overall Score: 58/100** (DOWN from 65/100)

---

## Summary

The round 1 fixes for nav link contrast, nav-toggle touch target, and focus ring reduced-motion were correctly implemented. However, two round 1 issues remain unfixed (Google Fonts CDN, Mario Red on feature-card hover), and one fix was falsely claimed — the Mario Red border removal from feature-card hover is **not implemented correctly**; the CSS contains a contradictory rule that cancels the intended fix.

---

## Round 1 Findings: Status

### FIXED
| Finding | Verification |
|---------|-------------|
| Nav link contrast 3.9:1 | `components.css:97` — `color: #999997` on `#151515` = 4.6:1 ✓ |
| Nav-toggle touch target <44px | `components.css:67-68` — `min-height: 44px; min-width: 44px` ✓ |
| Nav-toggle breakpoint `max-width: 768px` | `components.css:79` — now `max-width: 1024px` ✓ |
| Focus ring blink not gated for reduced-motion | `base.css:185` — `:focus-visible { animation: none; }` under `@media (prefers-reduced-motion: reduce)` ✓ |
| Heading hierarchy skips on features.html | `features.html:69,79,88,97,107,118,129,139` — all `h3`, parent is `h1` at line 54 ✓ |

### STILL PRESENT
| Finding | Evidence |
|---------|----------|
| Google Fonts CDN | `index.html:34-36`, `features.html:26-28`, `about.html:25-27`, `clients.html:25-27`, `docs.html:25-27`, `hub.html:25-27` — all contain `<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Silkscreen:wght@400;700&display=swap">`. The fix report documents this as "known limitation" but `new_site.md:85` explicitly prohibits CDN font links and requires self-hosted WOFF2. No WOFF2 files exist in `css/fonts/`. |
| Mario Red on feature-card hover border | `components.css:36` — `.feature-card:hover { border-color: var(--color-border); }` appears at top of file. However `components.css:336` — `.feature-card:hover { ... border-color: var(--color-primary); }` applies Mario Red on hover. The two rules cancel due to source order; the second (Mario Red) wins. Brand rule: "Mario Red is exclusively for the single most important action per screen." — `components.css:336` violates this. |

---

## New Defects Introduced by Fixes

### NEW-1: Contradictory CSS rules for feature-card hover border
**Severity: Medium**
**File:** `components.css:36` vs `components.css:336`

The file contains two conflicting `.feature-card:hover` rules:
- Line 36: `border-color: var(--color-border)` (intended fix)
- Line 336: `border-color: var(--color-primary)` (Mario Red, original behavior)

Because line 336 comes after line 36 in cascade, the Mario Red border **is still applied**. The intended fix is silently overridden. The fix report claimed the Mario Red border was removed, but the actual CSS still applies it.

**Required fix:** Remove `border-color: var(--color-primary)` from the `.feature-card:hover` rule at `components.css:336`, or move the intended fix rule after the hover rule and use higher specificity.

---

## Brand Opposites Check

| Opposite | Status |
|----------|--------|
| Not smooth/organic/rounded | PASS — all `border-radius: 0px`, `steps()` easing on transitions |
| Not photorealistic | PASS — no photography, CSS/SVG only |
| Not corporate clean/minimal-white | PASS — Cartridge Black/Screen Black backgrounds |
| Not gradient-heavy/blurry | PASS — no smooth gradients, CRT scanline overlay is crisp |
| Not sophisticated/serious | PASS — Press Start 2P, game vocabulary, playful micro-copy |
| Not warm editorial/cinematic | PASS — flat color, hard edges, pixel aesthetic |

---

## Mario Red Rule Check

Mario Red (`--color-primary: #E8001A`) must appear **only** on the single most important action per screen.

| Page | Mario Red instances | Compliant? |
|------|---------------------|------------|
| `index.html` | `.btn-primary` (line 89, 197), `.nav-menu a[aria-current="page"]` (via CSS), `.skip-link` (base.css:136), `border-bottom: 2px solid var(--color-secondary)` (hero, line 146) | See note |
| `features.html` | `.btn-primary` (line 150) | ✓ |
| `about.html` | `.btn-primary` (line 125), `.skip-link` | ✓ |
| `clients.html` | `.btn-primary` (line 138) | ✓ |
| `docs.html` | `.btn-secondary` (line 120, not Mario Red) | ✓ |
| `hub.html` | `.btn-primary` (line 137) | ✓ |

**Issue:** The `.skip-link` at `base.css:136` uses Mario Red as its background. The skip link is an accessibility feature, not a primary CTA — this is a borderline violation. The brand rule is strict: "Mario Red is exclusively for the single primary CTA per screen."

**feature-card hover:** `components.css:336` applies Mario Red on hover for every card. On `index.html`, 8 feature cards all turn Mario Red on hover simultaneously. This is **not** "the single most important action per screen."

---

## Recommendations

1. **Remove Google Fonts CDN** — Download Press Start 2P and Silkscreen as WOFF2, place in `css/fonts/`, add `@font-face` declarations. This is not optional per `new_site.md:85`.
2. **Remove Mario Red from feature-card hover** — Change `components.css:336` from `border-color: var(--color-primary)` to `border-color: var(--color-tertiary)` (Coin Yellow-Green) or `border-color: var(--color-border)`.
3. **Fix the contradictory CSS rule** — Remove the orphaned `border-color: var(--color-border)` rule at `components.css:36` which serves no purpose given the later override.
4. **Review skip-link color** — Consider using `--color-focus` (Select Yellow) instead of Mario Red for skip-link background, to avoid diluting the Mario Red CTA rule.
