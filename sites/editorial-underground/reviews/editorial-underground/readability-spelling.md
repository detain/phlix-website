## Readability — Score: 92/100

### Findings

**Line length (60–75ch target): ⚠️ PARTIAL**

The hero subheadline and page-header lead text are correctly capped at `max-width: 60ch` (`theme.css:192`, `theme.css:346`), and the about page philosophy copy also uses `max-width: 60ch` (`about.html:70–76`). Good.

However, several body-text regions lack explicit `ch` constraints and will exceed 75ch on wide viewports:

1. **Pitch bullet text** — `.pitch-bullets li` has no `max-width`. A bullet like "Multi-source metadata: TMDB, TVDB, Fanart.tv, and local NFO with 24-hour cache" at Space Mono ~16px approaches 140ch+ on a 1200px container. No `max-width` set on the element or its container. (`theme.css:224–236`)
2. **FAQ answer text** — `.faq-item dd` has no `max-width`. At 1200px container width, FAQ answers render at ~133ch. (`theme.css:389–394`)
3. **Ecosystem list descriptions** — `.ecosystem-list p` has no `max-width`. Same problem. (`components.css:553–559`)
4. **Feature card body** — `.feature-card p` and `.feature-detail p` have no `max-width`. At 300px card min-width these are manageable, but still unconstrained within the card. (`components.css:365–371`, `components.css:404–410`)

The pitch bullets in particular — the site's core value props — deserve the 60–75ch treatment. Consider adding `max-width: 70ch` to `.pitch-bullets li`, `.faq-item dd`, and `.ecosystem-list p`.

**Line height on pitch bullets: ⚠️ 1.6 instead of 1.7**

`.pitch-bullets li` uses `line-height: 1.6` (`theme.css:234`). The brand kit requires body copy line-height of 1.7 for Space Mono. This is a minor deviation — the brand kit explicitly calls out that monospace needs generous leading — but it is under-specified.

**Visual hierarchy: ✅ CLEAN**

All 8 pages maintain strict h1 → h2 → h3 hierarchy with no skipped levels:

- `index.html`: h1 (hero), h2 (pitch, features-overview, CTA banner) — correct
- `features.html`: h1, h2 (per feature detail) — correct
- `clients.html`: h1, h2 (per client card) — correct
- `download.html`: h1, h2 (Server/Clients/Ecosystem headings), h3 (per client card) — correct
- `plugins.html`: h1, h2 (Plugin model/Ecosystem/Write your own) — correct
- `docs.html`: h1, h2 (Documentation/Ecosystem) — correct
- `hub.html`: h1, h2 (What/Selhost/Clients) — correct
- `about.html`: h1, h2 (Philosophy/License/Contributing/FAQ) — correct

**Spacing scale: ✅**

CSS spacing uses the brand kit scale `[4, 8, 12, 16, 24, 32, 48, 64, 96]` via `--space-*` tokens throughout. No ad-hoc values detected.

**Left-aligned body copy: ✅**

All body text is flush-left. Hero sub, pitch bullets, feature bodies, FAQ answers, ecosystem descriptions — all left-aligned. The brand kit rule "Manifestos do not center" is respected.

**Reading level / brand voice: ✅**

Copy is terse, declarative, direct. Matches the countercultural audience — no corporate softening. Example CTAs read as imperatives: "Get Phlix", "Download Phnix", "Set it up. Stream it out.", "No NAT. No port forwarding. Just play." Tone is anti-corporate and urgent without being exclamatory.

---

## Spelling & Grammar — Score: 100/100

### Findings

**Typos: ✅ Zero**

Scanned all micro-copy across 8 pages: nav labels (Home, Features, Clients, Download, Plugins, Docs, Hub, About), button text (Get Phlix, Read the docs, View source, Open the docs), section headings, hero copy, pitch bullets, feature titles, client names, CTA banners, footer links — no typos detected.

**Tense and voice: ✅**

All copy uses active voice. Product claims are stated as facts, not possibilities. Example: "Folder-watcher hashes mtimes, scanner parses S01E02 / (2020) titles, ItemRepository hydrates metadata_json." — subject/verb/object, active throughout.

**Brand kit `avoid_words`: ✅ CLEAN**

Scanned all 8 pages against the 20-word avoid list: "cozy", "warm", "fun", "friendly", "delight", "seamless", "robust", "synergy", "leverage", "utilize", "exciting", "awesome", "amazing", "experience", "journey", "vibrant", "passionate", "curated", "premium". None appear anywhere in UI copy or body text.

**Exclamation marks: ✅ CLEAN**

Zero `!` characters found in any UI text, button labels, nav items, CTAs, section headings, or footer links. The page `<title>` tag "Phlix — No Signal. No Permission. Just Play." contains periods (slogans, not UI copy) but no exclamation marks.

**Question marks in UI copy: ✅ CLEAN**

No `?` characters appear in any nav label, button text, CTA, section heading, or footer link. The 6 FAQ questions in `about.html` use interrogative form (`<dt>Is Phlix like Plex / Jellyfin / Emby?</dt>`), but these are data-driven informational content from `content.json` — not UI copy that prompts user action. They do not fall under the brand kit's "declare, do not ask" rule for UI elements.

---

## Summary

The Editorial Underground site is copy-clean — zero spelling or grammar errors, no forbidden vocabulary, no punctuation violations in UI elements. Brand voice is consistent with the punk zine / countercultural aesthetic throughout all 8 pages.

The primary actionable issue is **line length**: pitch bullets, FAQ answers, and ecosystem descriptions lack `max-width` constraints in CSS and will render far beyond the 60–75ch target on full-width viewports. Adding `max-width: 70ch` to `.pitch-bullets li`, `.faq-item dd`, and `.ecosystem-list p` would bring these in spec. The pitch bullet `line-height` should also be bumped from `1.6` to `1.7` to match the brand kit's Space Mono body leading specification.

All else — heading hierarchy, spacing scale, left-alignment, brand voice — is solid.
