# Neon Noir — Phlix Brand-Kit Site

Regenerated 2026-07-25 from `brand-kits/neon-noir.js` (base kit, schema 2.1) against
`new_site.md`. The change manifest is `REGEN_PLAN.md`; the build record and the deviations
list are in `BUILD_LOG.md`.

---

## Concept & vision

Rain-slicked streets at 2 a.m., a marquee buzzing over a doorway, and a figure who has seen
every reel in the building. The site is written as a **case file**: the visitor is the
detective, Phlix is the toolkit, and the archive is the thing behind the locked door.

That framing is not decoration — it drives the information architecture. The nav is a case
index, the features page is an evidence board with serial numbers, the clients page is a
network of lit nodes hanging off one trunk line, the download page is a briefing room whose
single most prominent object is the clearance token (the install snippet), and the FAQ is a
transcript of Lux answering the room.

**Declared archetype:** `narrative-scroll`. The home page is five ordered beats — opener →
case brief → lead cases → field summary → closing act — and each beat cuts into frame as you
reach it.

---

## Aesthetic direction

Neo-noir cinematic; high-contrast dark; neon glow halation; hard shadow expressionism; art
deco geometry. Never warm, never pastel, never cheerful, never corporate-clean.

Compositions are deliberately **asymmetric** — the kit lists "symmetrical, centred hero
layouts" as a don't. Copy sits hard left, the alley illustration sits right, and the dark half
of the frame is left dark on purpose: negative space is structural here, not space waiting to
be filled.

---

## Colour

Every value is `design_tokens.color` verbatim. Contrast was **measured**, not taken from the
kit's prose (see `new_site.md` §19.1 — the kit's own arithmetic is wrong in three places).

| Token                 | Name           | Hex       | Role                                   |
| --------------------- | -------------- | --------- | -------------------------------------- |
| `--color-primary`     | Neon Amber     | `#f5a623` | The one CTA per screen, active markers |
| `--color-secondary`   | Electric Cyan  | `#00e5ff` | Links, eyebrows, focus ring, node glow |
| `--color-tertiary`    | Neon Magenta   | `#ff2d78` | Clue-card edges, pins, beta badge      |
| `--color-bg`          | Void Black     | `#0a0c10` | Page ground                            |
| `--color-surface`     | Deep Navy      | `#111827` | Cards, header, footer                  |
| `--color-surface-alt` | Charcoal Slate | `#1c2333` | Striped rows, chips, code bar          |
| `--color-text`        | Ghost White    | `#e8edf5` | Body and headline text                 |
| `--color-neutral`     | Steel Mist     | `#7a8fa6` | Secondary text, serials, glosses       |
| `--color-success`     | Cyan Spark     | `#00c9a7` | reserved — no success state on a page  |
| `--color-warning`     | Flicker Amber  | `#ffb300` | reserved                               |
| `--color-error`       | Danger Magenta | `#e5154e` | reserved — see the note below          |
| `--color-info`        | Cold Blue      | `#29abe2` | reserved                               |
| `--color-border`      | Dim Steel      | `#2a3650` | Decorative card edges and dividers     |
| `--color-focus`       | Focus Cyan     | `#00e5ff` | 2px ring + 2px offset + 4px halo       |

### Measured contrast (WCAG 2.x)

| Foreground                          | on Void `#0a0c10` | on Navy `#111827` | on Slate `#1c2333` |
| ----------------------------------- | ----------------- | ----------------- | ------------------ |
| Ghost White `#e8edf5`               | **16.65**         | **15.09**         | **13.35**          |
| Electric Cyan `#00e5ff`             | **12.72**         | **11.53**         | **10.21**          |
| Neon Amber `#f5a623`                | **9.66**          | **8.75**          | **7.75**           |
| Steel Mist `#7a8fa6`                | **5.88**          | **5.33**          | **4.72**           |
| Neon Magenta `#ff2d78`              | 5.50              | 4.98              | **4.41 — fails**   |
| Danger Magenta `#e5154e`            | **4.24 — fails**  | 3.84              | 3.40               |
| Void on Neon Amber (primary button) | **9.66**          | —                 | —                  |

Three of the kit's own claims are wrong, all found by measuring: it says ghost-on-void is
17.5:1 (really 16.65:1), amber-on-void is 7.2:1 (really 9.66:1), and warns that "cyan on
deep-navy is tight" when it is 11.53:1. Those are harmless. The two failures above are not,
so:

### Derived tokens — mixes of the kit's own pigments, not new hues

| Token                  | Mix                                | Hex       | Measured                           |
| ---------------------- | ---------------------------------- | --------- | ---------------------------------- |
| `--color-magenta-text` | Neon Magenta 80% + Ghost White 20% | `#fa5391` | 6.25 void / 5.67 navy / 5.02 slate |
| `--color-edge-strong`  | Dim Steel 40% + Steel Mist 60%     | `#5a6b84` | 3.61 void / 3.27 navy              |

`--color-magenta-text` carries every small magenta text use (clue serials, the transcript Q
marker, the beta badge label). `--color-edge-strong` carries edges that mean something — the
ghost-button border, the calm-mode switch track, the 404 numerals — because non-text UI needs
3:1 and raw Dim Steel is 1.47:1. Dim Steel stays where it belongs: decorative card edges.
Danger Magenta is never used as text anywhere on the site.

**Never colour alone.** Client status is spelled out ("Stable" / "Beta") beside its colour,
the active nav item carries `aria-current` **and** a 3px amber marker **and** a "you are here"
gloss, and calm mode reports "Neon on" / "Lights out" in words as well as by knob position.

### Gradients

- **Neon Horizon** `linear-gradient(160deg, #ff2d78, #00e5ff)` — reserved for splash art.
- **Amber Interrogation** radial `rgba(245,166,35,0.35) → transparent` — the overhead light
  behind the opener and every CTA banner.
- **City Depth** `linear-gradient(180deg, #111827, #0a0c10)` — panel and page-header fade.

---

## Typography

| Role              | Face             | Weights     | Where                                            |
| ----------------- | ---------------- | ----------- | ------------------------------------------------ |
| `--font-headline` | Playfair Display | 700 / 900   | `h1`–`h4`, leads, quotes, the wordmark           |
| `--font-display`  | Bebas Neue       | 400         | Ladder and chapter numerals (uppercase only)     |
| `--font-body`     | IBM Plex Serif   | 400 / 500   | All body copy, left-aligned, never all-caps      |
| `--font-ui`       | IBM Plex Sans    | 400/500/600 | Nav, buttons, badges, labels, eyebrows           |
| `--font-mono`     | IBM Plex Mono    | 400 / 600   | Serials, dockets, code — typewriter moments only |

All five are self-hosted WOFF2 from `shared/assets/fonts/` — ten `@font-face` rules, each
`font-display: swap`, zero external font requests. Headlines are 700+ with `-0.02em`
tracking; Bebas Neue appears only in uppercase; body copy is never centred.

---

## Spatial system

Kit spacing scale only: 4, 8, 12, 16, 24, 32, 48, 64, 96. Max content width 1400px. Radii
2/4/8/12px — sharp — with the pill radius reserved for the evidence pin. Borders are 1px
solid, never rounded, never hand-drawn.

---

## Motion philosophy

Slow, deliberate, camera-like: `cubic-bezier(0.4, 0, 0.2, 1)`, 200ms hover, 460ms cut,
`steps(8, end)` for the neon buzz. No spring, no bounce, no elastic.

- **`scroll_experience: cinematic`** — a section group cuts into frame (dimmed and 14px low,
  then one flicker as the neon settles) while the venetian-blind divider at the boundary wipes
  left to right. The armed state is **dimmed, never hidden**, and `js/main.js` only arms
  groups still below the fold, so a script failure cannot hide content and nothing visible
  ever flashes away.
- **`header_motif`** — a slow-scan flicker across the opener headline every 7s.
- **Neon buzz** on the alley sign, which dies once the final lead lands.
- **Card hover** — 1px cyan edge, 3px lift, cyan glow, 200ms, under `@media (hover: hover)`.
- **Focus** — 2px cyan ring, 2px offset, 4px cyan halo, always visible.

Every one of these answers to **two** switches: `prefers-reduced-motion: reduce` and the
footer calm-mode toggle. Glow reads through `--glow-*` custom properties, so calm mode turns
the neon off in one place.

---

## Signature elements

1. Venetian-blind dividers (`hr.rule-venetian`) that wipe on entry.
2. Neon halos as `box-shadow` / `text-shadow` — never glow images, per the kit's perf rules.
3. Pushed-film grain: a 3px dot lattice on `body`.
4. Rain: a 104° hairline gradient over the alley, masked to fade downward.
5. Wet-asphalt reflection bars under the marquee.
6. Monospace serials (EF-01…EF-08, CL-01…CL-07) and dockets.
7. The evidence pin — a magenta-lit dot holding each card to the wall.

---

## Interactive surfaces

| Surface               | Implementation                                                                                                                                                                                                           |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `hero_experience`     | Playable vignette: the sign cycles cyan → magenta → amber, Lux shifts pose, each pose lights one more lead. With JS off all three leads are lit and the sign is steady — the declared fallback, carrying identical copy. |
| `navigation_model`    | Topbar: Playfair wordmark, IBM Plex Sans cyan links, each with its canonical page name as a gloss. Hamburger below 900px. Works with JS off, because the menu is a plain list of real links.                             |
| `mascot.behavior`     | Lux on Home / Features / Download / About only. The tip is a closed `<details>`, so it works with JS off and never pushes itself at anybody. Fixed bottom-right at ≥768px; in-flow above the footer below that (§19.11). |
| `easter_eggs`         | Five rapid clicks on the wordmark (a single click still navigates normally); typing `shadow` outside any field. Both exit on Esc.                                                                                        |
| `intensity_toggle`    | "Case closed (calm mode)" in the footer utility row, persisted in `localStorage`; kills animation, glow, wipes and eggs, and releases anything still armed.                                                              |
| `seasonal_activation` | `live-js` date gate over the three `seasonal_variants`: flips the override tokens, shows the motif and the banner. Nothing is active in July.                                                                            |

Total site JS is ~14 KB across `main.js` and `experience.js` — hand-written, dependency-free,
no analytics, no third party.

---

## Visual assets

- **`img/logo.svg`** — carried forward: Playfair-italic "Phlix" in a sharp cyan-edged badge
  with an amber accent bar, NEON NOIR set in steel mist.
- **`img/favicon.svg`** — carried forward: void-black square, amber edge, italic "P".
- **`img/og.svg` → `img/og.png`** — carried forward; the PNG is regenerated by
  `tools/gen-og.mjs`, because `og:image` must be a PNG.
- **Alley diorama** (inline SVG, home) — rooftops, lit windows, marquee halo, the sign, Lux in
  a doorway, wet-asphalt reflections. Decorative and `aria-hidden`.
- **Dead-end alley** (inline SVG, 404) — a burnt-out X sign with one arm still lit and a file
  cabinet in the shadow.
- **Eight feature icons** — inline, 1.5px stroke, square caps, no rounded joins.
- **Three seasonal motifs** — `img/seasonal/*.svg`, referenced by the date gate.
- **`img/PROMPTS.md`** — the exact prompt for every asset, keyed to `persona_vignettes`.

---

## Responsive strategy

| Width    | Behaviour                                                                      |
| -------- | ------------------------------------------------------------------------------ |
| 320–699  | Single column; hamburger nav; Lux in-flow above the footer; 48px touch targets |
| 700–959  | Two-column card grids; three-rung ladder; two-column chapters                  |
| 960–1199 | Asymmetric 7/5 opener, 6/5 brief, 8/4 clearance; four support cards; Lux fixed |
| 1200+    | Three-column evidence board; content capped at 1400px                          |

The header is **not** sticky. Noir wants the frame to hold still, and it means nothing can
float over the primary CTA at any width (§19.11).

---

## Accessibility commitments

- WCAG 2.2 AA measured, not assumed: body text ≥4.5:1, large text and UI ≥3:1.
- One `<h1>` per page; landmarks once each; skip link first in the tab order.
- Focus ring visible everywhere: 2px cyan + 2px offset + 4px halo.
- Touch targets ≥44px, and ≥48px for nav items and buttons.
- 200% text zoom at 320px with no horizontal scroll and no clipping. `overflow-wrap: anywhere`
  on `body` is load-bearing here: several rows are flex containers whose anonymous text item
  would otherwise refuse to shrink below the width of "ContentDirectory".
- `prefers-reduced-motion` honoured unconditionally, plus a visitor-facing calm mode.
- The typed-word egg is inert while focus is in any input, textarea or contenteditable, and it
  never calls `preventDefault` (§19.8).
