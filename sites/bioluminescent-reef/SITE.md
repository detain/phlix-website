# SITE.md — Bioluminescent Reef

## Concept

Bioluminescent Reef descends to the midnight zone — the crushing dark miles below the surface where sunlight has never reached, yet life blazes. Every interface is a window into that abyss: jellyfish pulse cold aqua, siphonophores trail violet fire, anglerfish dangle amber lures in the black water. This kit captures the alien beauty of living light in total darkness — eerie, gorgeous, primal, and wholly unlike anything the shallows can offer.

## Palette

| Token | Value | Name | Use |
|---|---|---|---|
| `--color-primary` | `#00e8c8` | Biolume aqua | CTAs, active states, glow halos — 12.63:1 on hadal-darkness |
| `--color-secondary` | `#7700ff` | Abyssal violet | Decorative — fails small text (3.05:1), safe for large/UI |
| `--color-tertiary` | `#ff7b00` | Anglerfish amber | Primary CTA lure only — 7.63:1 on hadal-darkness |
| `--color-bg` | `#010b14` | Hadal darkness | Background — the abyss itself |
| `--color-surface` | `#020f1c` | Abyssal trench | Cards, panels |
| `--color-surface-alt` | `#03142a` | Midnight zone | Striped rows, nested panels |
| `--color-text` | `#c8f0ff` | Phosphor white | Body copy — 16.39:1 on hadal-darkness |

All text meets or exceeds WCAG AA. Violet secondary and red-tide error are restricted to large/UI text only.

## Typography

- **Headline** — Cormorant Garamond 600/700 — gothic, dramatic, deep-sea gravitas
- **Display** — Raleway 100/200 — cinematic, fluid, wave-like negative space
- **Body/UI** — Inter 400/500/600 — legible in the dark
- **Mono** — JetBrains Mono 400/500 — depth readings, code, tokens
- **Number** — Raleway 100/200 — thin numerals like depth meters

## Motion

Slow, fluid, organic — creatures in zero-gravity salt water. Animations never startle; they reveal. Bioluminescent pulse on the hero wordmark (3s period). Cards rise and glow on hover. Abyss jellyfish drifts in a sine-wave path (6s period, disabled under reduced-motion).

## Structure

- **Home** — 5 narrative sections: hero descent → featured creatures → why phlix → proof record → conversion ladder
- **Features** — Full grid of 8 feature cards with serial IDs
- **Clients** — 5 portals (Roku, Tizen, Windows, Mobile, DLNA) with highlights
- **Download** — The real one-line install command from content.json + HTTPS variant + dev checkout (labelled "not an install")
- **Footer** — 3-column layout from content.json, plus demoted plugins/docs

## Mascot

Abyss — a translucent jellyfish whose bell pulses with slow rings of biolume aqua. Bottom-right on home, features, download. Tips keyed to page sections. Dismissed to localStorage. Hover-hold (3s) and logo-click (5x) easter interactions.

## License

Phlix Server and the Hub are MPL-2.0. Shared libraries, plugins, clients are MIT. Per-file: modify a Phlix file, that file stays open; anything added beside it stays yours.
