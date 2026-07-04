# Spelling & Grammar Review — Desert Horizon

**Variant**: desert-horizon
**Round**: 1
**Reviewer**: adversarial-spelling-grammar
**Date**: 2026-07-01

## Score

- **Spelling & Grammar**: 65 / 100

## ✅ Passed

- Zero typos detected across all 8 pages (index.html, about.html, clients.html, docs.html, download.html, features.html, hub.html, plugins.html)
- Consistent use of em-dash entity `&mdash;` — no bare `--` used as em-dash anywhere
- "Phlix" is capitalized correctly throughout all body copy (not "phlix" or "PHLIX")
- Active voice predominates; tone is unhurried and matches the Desert Horizon voice guidelines
- No instances of: leverage, synergy, utilize, disrupt, cutting-edge, robust, seamless, unlock, empower

## ⚠️ Concerns (non-blocking)

- `docs.html:140` — Section heading "Ecosystem" technically uses the avoid_word as a UI label/class name, not visible prose — low risk but inconsistent with brand kit intent — consider renaming to "Related Projects" or "Components"
- `download.html:177` — Same "Ecosystem" heading issue — same recommended fix

## ❌ Failures (must fix this round)

- **docs.html:140** — `<h2>Ecosystem</h2>` heading uses "Ecosystem", which is on the brand kit's avoid_words list (desert-horizon.js:708) — must rename the section to avoid word
- **download.html:177** — `<h2>Ecosystem</h2>` heading uses "Ecosystem", which is on the brand kit's avoid_words list (desert-horizon.js:708) — must rename the section to avoid word
- **plugins.html:120–123** — Body copy reads "As the ecosystem grows, more plugins will be available from the community" — "ecosystem" is on the avoid_words list — replace with "plugin community", "network", or "ecosystem" alternative per brand kit vocabulary guidance

## Recommendations

1. Replace all three "Ecosystem" headings/labels with "Related Projects" or "Components" — brand kit §15 explicitly lists "ecosystem" as an avoid_word (impact: high, effort: low)
2. In plugins.html:123, change "As the ecosystem grows" to "As the plugin community grows" or "As more plugins are contributed" (impact: high, effort: low)

## Evidence

- `grep -n "ecosystem\|leverage\|synergy\|utilize\|disrupt\|cutting-edge\|robust\|seamless\|unlock\|empower" /home/sites/phlix/phlix-website/sites/desert-horizon/*.html`
  - docs.html:141 `<ul class="ecosystem-list">`
  - download.html:178 `<ul class="ecosystem-list">`
  - plugins.html:123 `anything else you can imagine. As the ecosystem grows, more plugins will be available from`
- `grep -n " Ecosystem " /home/sites/phlix/phlix-website/sites/desert-horizon/*.html`
  - docs.html:140 `<h2>Ecosystem</h2>`
  - download.html:177 `<h2>Ecosystem</h2>`
- brand-kits/desert-horizon.js:707-710 confirm "ecosystem" is in `avoid_words` array
