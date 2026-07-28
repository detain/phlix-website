# SITE.md — Pastel Dreamscape

## Kit
- **Slug:** `pastel-dreamscape`
- **Archetype:** `immersive`
- **Brand Kit:** `brand-kits/pastel-dreamscape.js` v1.0

## What makes this site its own

The Pastel Dreamscape kit turns Phlix into a kawaii cloud world — cotton-candy gradients, a floating cloud-fairy mascot named Dreamy, and every interaction dusted with iridescent sparkle. This site feels like opening a sticker album, not loading a media server.

## Implemented experience fields (20/20)

All declared fields implemented. See `REGEN_PLAN.md` §1 for the full table.

Key differentiators:
- **Dreamy mascot** — kawaii cloud fairy with wand, tips per section, easter eggs (logo-clicks:5, typed-word:sparkle), dismissed state persisted in localStorage
- **Seasonal activation** — live-JS motif switching for Winter/Spring/Summer/Autumn with motif overlays
- **Sparkle mode toggle** — footer utility row, persisted in localStorage
- **Five narrative sections** with petal-fall chaptered scroll
- **Gallery-plaques** features layout, **bubble-unfold** download layout, **dream-scroll** about page, **family-of-devices** clients page

## Font weights declared vs used

| Role | Family | Declared | Used |
|---|---|---|---|
| headline | Baloo 2 | 700, 800 | 700, 800 |
| display | Comfortaa | 700 | 700 |
| body | Nunito | 400, 500, 600 | 400, 500, 600 |
| ui | Quicksand | 500, 600, 700 | 500, 600, 700 |
| mono | Fira Code | 400, 500 | 400, 500 |
| number | Baloo 2 | 700 | 700 |

`nunito-700-latin.woff2` exists in pool but is **not used** (700 not declared for Nunito by this kit).

## Contrast notes

Soft ink (#4B3F6B) on cloud cream (#FEF9F5) = 9.04:1 — passes AA without substitution.

Primary (#F9A8D4) and secondary (#C4B5FD) **fail** AA small text on all surfaces — used only for large text (≥24px or ≥19px bold), icons, borders, decorative backgrounds. Link text uses the safe substitute `#7a65b7` at small sizes.

Contrast-safe substitutes used verbatim from `kit-brief` output:
- `#95657f` — primary on bg (safe small text)
- `#766d98` — secondary on bg (safe small text)
- `#7a65b7` — link on bg (safe small text)

## Install command (single source of truth)
```
curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash
```
Source: `shared/content.json` → `install.primary.command`

## Demoted pages
- `plugins.html` — still exists, footer link only (not in primary nav)
- `docs.html` — still exists, footer link only

## Mascot placement
- **≥768px:** `position: fixed`, bottom-right, never over CTA
- **<768px:** `position: relative`, in-flow above footer

## Key CSS rules from §19.12 applied
- Grid tracks: `minmax(0, 1fr)` — never bare `1fr`
- Body text: `overflow-wrap: anywhere` on `p, li, dt, dd, a, span, code, kbd, samp, pre`
- Headings: `hyphens: auto; overflow-wrap: break-word`
- No `overflow: hidden` on containers whose text must reflow
- `font-weight: 600` for `<strong>` (correct 200-unit step from body 400)

## Licence
Phlix Server and Hub: **MPL-2.0**  
phlix-shared, plugins, clients: **MIT**  
Footer links to `https://github.com/detain/phlix-server/blob/master/LICENSE`
