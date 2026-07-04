# Localization Review — Desert Horizon

**Variant**: desert-horizon
**Round**: 1
**Reviewer**: adversarial-localization
**Date**: 2026-07-01

## Score

- **Localization**: 58 / 100

## ✅ Passed

- `<html lang="en">` is set on all 8 pages correctly from `site.default_locale`
- No `toLocaleString()` calls found anywhere in JS or HTML
- No date/number formatting APIs in use — no locale-unsafe formatting detected
- No `float: left` or `float: right` in any CSS — RTL layout uses flexbox/grid throughout
- Fonts (Playfair Display, Arvo, Lora, Source Sans 3, IBM Plex Mono) are Latin-only subsets; no CJK/Arabic/script-heavy fonts included
- All substantive product copy (hero, feature bodies, client data, FAQ, ecosystem, pitch bullets) traces to `content.json` — a translator updating that one file covers all factual claims
- No JavaScript-generated user-facing text; all JS is purely behavioral (nav toggle, focus trap, scroll reveal)

## ⚠️ Concerns (non-blocking)

- **Copyright year hardcoded as `2026`** (`index.html:424`, `features.html:388`, `clients.html:274`, `download.html:290`, `plugins.html:211`, `docs.html:246`, `hub.html:201`, `about.html:240`) — Would require a build-time substitution or manual update each year. Low effort to fix: use `<script>document.write(new Date().getFullYear())</script>` or a build-step variable.
- **UI micro-copy (structural labels) is hardcoded HTML, not in `content.json`** — Navigation labels ("Home", "Features", "Clients", "Download", "Plugins", "Docs", "Hub", "About"), ARIA labels, the skip-link text, and footer column headings ("Product", "Developers", "Project") are baked into every HTML file. Per `new_site.md §15`, all user-facing strings should trace to `content.json` so a translator swaps one file. While the product copy is properly centralized, these structural strings are not — a translator cannot produce a fully translated site without touching 8 HTML files. This is a moderate concern given the spec requirement.
- **Several CTA button labels differ from `content.json`** — `content.json` defines `primary_cta.label: "Get Phlix"` and `secondary_cta.label: "Read the docs"`, but `clients.html:209` uses "Download Now" and `hub.html:136` uses "Get started". These variants are brand-flavored micro-copy (acceptable per spec §2), but they should be documented in `content.json` under a `micro_copy` key so translators know they exist.

## ❌ Failures (must fix this round)

- **No structural failures identified.** The site passes all hard technical gates: `<html lang>` correct, no locale-unsafe APIs, no RTL-unsafe CSS properties, fonts subset to Latin. Product copy is properly centralized.

## Recommendations

1. **Extract UI micro-copy into `content.json`** (impact: high, effort: medium) — Move nav labels, skip-link text, footer column headings ("Product"/"Developers"/"Project"), and CTA button variants to `content.json` under a new `ui` key. Update HTML to reference them. This fulfills the spec's "all user-facing strings trace to `content.json`" requirement and enables a translator to produce a complete translated site by editing one file.
2. **Centralize CTA variant strings** (impact: medium, effort: low) — Add "Download Now" and "Get started" to `content.json` as `cta_variants.download_now` and `cta_variants.get_started`, then reference them in `clients.html` and `hub.html`. Keeps micro-copy translation-ready.
3. **Make copyright year dynamic** (impact: low, effort: low) — Replace the hardcoded `&copy; 2026` with a small inline JS year or a server-side/build-time variable to avoid annual manual updates across 8 files.

## Evidence

- Confirmed `<html lang="en">` on: `index.html:2`, `features.html:2`, `clients.html:2`, `download.html:2`, `plugins.html:2`, `docs.html:2`, `hub.html:2`, `about.html:2`
- `grep -r "toLocaleString" sites/desert-horizon/` → No matches
- `grep -rE "float:\s*(left|right)" sites/desert-horizon/` → No matches
- All CSS layout uses flexbox (`display: flex`, `flex-direction`) and grid (`display: grid`) — no float-based positioning
- CSS font stacks use only Latin scripts (Playfair Display, Arvo, Lora, Source Sans 3, IBM Plex Mono) — no script subsets needed
- JS (`js/main.js`) contains only nav toggle logic, focus trapping, and IntersectionObserver scroll reveals — no locale-sensitive APIs
- Product copy sourced from `content.json`: hero (index.html:124–128), pitch bullets (index.html:147–156), feature cards (index.html:180–348), client cards (clients.html:113–202), FAQ (about.html:133–176)
- Hardcoded UI strings include: `aria-label="Toggle navigation"` (8×), `aria-label="Primary navigation"` (8×), `aria-label="Footer navigation"` (8×), `aria-label="Phlix home"` (8×), skip-link text "Skip to main content" (8×), footer headings "Product"/"Developers"/"Project" (8×), nav labels "Home"/"Features"/"Clients"/"Download"/"Plugins"/"Docs"/"Hub"/"About" (8×)
