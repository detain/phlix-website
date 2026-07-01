# Usability Review — Solarpunk Eden

**Variant**: solarpunk-eden
**Round**: 1
**Reviewer**: adversarial-brand-consistency-reviewer
**Date**: 2026-07-01

## Score

- **Usability**: 87 / 100

## ✅ Passed

- **Visibility of system status**: skip link present, focus visible with solar-gold ring, active nav state uses `aria-current="page"` with canopy-green pill — `components.css:91-94`
- **Match between system and real world**: navigation uses standard 8-link structure (Home, Features, Clients, Download, Plugins, Docs, Hub, About) consistent with new_site.md §5
- **User control and freedom**: escape key closes mobile nav — `main.js:26-31`
- **Consistency and standards**: all pages share same shell, same CSS cascade, same footer structure
- **Recognition rather than recall**: feature cards use inline SVG icons + title + description; no deep menus requiring memory
- **Flexibility and efficiency**: download cards grouped on download page; all official clients listed with source links
- **Help and documentation**: "Read the docs" secondary CTA on home, docs page links to user guide, API reference, developer docs, hub admin guide
- **Download reachable in ≤2 clicks from home**: home → "Get Phlix" → download.html → client download buttons — confirmed
- **No forced email gate**: no modal or redirect before download
- **No auto-play media with sound**: purely informational static site
- Mobile nav closes on outside click — `main.js:19-24`
- `tabindex="-1"` on `<main>` for skip-link target — `index.html:82` etc.
- `aria-expanded` kept in sync on nav toggle — `main.js:16`

## ⚠️ Concerns (non-blocking)

- **hub.html:76** — CTA "Try the public Hub" with "Get started" button links to download.html (correct funnel) but the text says "Try the public Hub" which implies starting the Hub, not downloading Phlix. Minor mismatch between CTA label and destination.
- **No 404 page** — site has no custom 404.html; a missing page falls to GitHub Pages default. Not blocking but poor for brand experience.
- **download.html:65** — "Requires PHP 8.3+ and phlix-server." is linked but "phlix-server" links to github.com/detain/phlix-server — fine but no version pinned in display text.
- **Plugin ecosystem section** (plugins.html:71-72) has placeholder text "The plugin contract makes it easy to add metadata providers..." with no actual listed ecosystem plugins. Empty ecosystem list is somewhat anticlimactic.

## ❌ Failures (must fix this round)

- **No 404.html page** — new_site.md §4 requires all pages be complete standalone HTML; a brand-kit site with no 404 fallback loses visitors who mistype URLs. This is a usability gap per Nielsen heuristic "help users recognize, diagnose, recover from errors."
- **plugins.html:71-72** — "Ecosystem plugins" section has no actual plugin list; it's a placeholder paragraph that reads like a stub. The kit's `do_dont.ux` section says "Keep onboarding flows short and illustrated with Frond" — but even the plugins page has no content.

## Recommendations (ranked by impact)

1. Add `404.html` with same site header/footer, a friendly message ("This garden bed is empty — let's find your way back"), and links to home and docs — improves error recovery (impact: high, effort: low)
2. Remove or flesh out the "Ecosystem plugins" section on plugins.html — either add real plugin examples or remove the section heading to avoid stub content (impact: medium, effort: low)
3. Add Frond mascot SVG to the plugins.html "Write your own" section as an encouraging illustration — matches kit mascot integration guideline (impact: medium, effort: medium)

## Evidence

- Nielsen heuristics verified via page structure audit: all 10 principles represented
- Download funnel click-count: index.html:91 (Get Phlix) → download.html:46 (Download page) → download.html:76-97 (client buttons) = 2 clicks
