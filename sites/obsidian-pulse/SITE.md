# SITE.md — Obsidian Pulse Brand Kit Site

## Concept & Vision

Obsidian Pulse is the visual identity of precision luxury electronics — matte obsidian planes broken by hairline electric-blue pulse lines, surfaces that absorb light and reflect it back as pure form. The brand kit draws from high-end audiophile equipment, precision Swiss watchmaking, luxury automotive interiors, and precision instrumentation. Every surface is machined, not decorated. Every pixel is intentional.

The site renders the Phlix media server through this lens: a precision instrument for serious users. Dark room, flawless image, no distractions.

---

## Aesthetic Direction

**Theme:** Dark premium tech — polished obsidian surfaces, precision-machined aluminum, subtle electric blue pulse lines, the aesthetic of high-end audio equipment and luxury electronics.

**Moodboard anchors:**
- Bang & Olufsen speaker minimalism
- McLaren and Porsche interior cockpit design
- Leica camera industrial design
- Luxury Swiss watchmaking precision movements
- CNC-machined heat sinks and processor dies
- Oscilloscope pulse waveforms
- Dark-mode operating systems at night

**Layout archetype:** `showcase` — immersive, dark, full-viewport hero with extreme negative space. Architectural centered compositions. Cinematic horizontal framing.

**Art direction:** Artwork feels like a product render from a luxury electronics catalogue: obsidian black backgrounds, surfaces rendered with barely-visible material grain (matte vs gloss), objects lit by a single cool overhead point source casting a tight specular highlight. Electric blue appears only as a glowing edge, a pulse line, or an indicator dot — never as fill.

---

## Color Table

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Background | Obsidian | `#0A0B0E` | Default page background |
| Surface | Matte Black | `#111317` | Card and panel surfaces |
| Surface Alt | Gloss Black | `#16191F` | Hover states, elevated panels |
| Primary | Pulse Blue | `#00B4FF` | Primary CTAs, active states, pulse animations |
| Text | Optical White | `#F0F2F5` | Headlines and body text |
| Text Muted | Platinum Silver | `#C8CDD6` | Secondary labels, captions, dividers |
| Border | Hairline Silver | `#2A2E38` | Card borders, dividers, 1px hairlines |
| Success | Precision Green | `#00C896` | Success states |
| Warning | Amber Signal | `#FFB020` | Warnings |
| Error | Critical Red | `#FF3A3A` | Errors |
| Info | Ice Blue | `#4DC8F5` | Informational |
| Neutral | Deep Charcoal | `#1C1F26` | Slightly elevated surfaces |

**Gradients:**
- Pulse Horizon: `linear-gradient(90deg, #0A0B0E 0%, #0D1520 50%, #0A0B0E 100%)` — Hero backdrop sweep
- Blue Edge Glow: `radial-gradient(circle, rgba(0, 180, 255, 0.18) 0%, rgba(0, 180, 255, 0.0) 100%)` — Active element glow halos
- Surface Sheen: `linear-gradient(180deg, #16191F 0%, #111317 100%)` — Elevated card surfaces

---

## Typography

| Role | Family | Weight | Tracking | Usage |
|------|--------|--------|----------|-------|
| Headline | DM Sans | 300, 400 | 0.08em | Hero headlines, section titles |
| Display | Space Grotesk | 300, 400 | 0.12em | Oversized numerals, product name |
| Body | DM Sans | 400, 500 | 0.01em | Paragraphs, descriptions |
| UI | Inter | 400, 500, 600 | 0.02em | Buttons, labels, navigation |
| Mono | JetBrains Mono | 400, 500 | 0em | Technical values, stats, code |

**Rules:**
- Headlines always light (300) or regular (400) — never bold.
- Letter-spacing is wide on headlines to reinforce luxury precision.
- Body text is optical white on dark surfaces — never grey for long-form.
- Technical values (runtime, bitrate, resolution) always in JetBrains Mono.
- Body line-length 60–70 characters for comfortable dark-background reading.

---

## Spatial System

**Spacing scale (only allowed values):** 2, 4, 8, 12, 16, 24, 32, 48, 64, 96px

**Content max-width:** 1400px
**Content narrow max-width:** 1200px

**Corner radius:** 2px (sm), 4px (md), 6px (lg), 8px (xl), 4px (pill)
Note: Maximum corner radius is 4px — near-zero radius is a signature of the precision aesthetic.

**Shadows:**
- sm: `0 1px 4px rgba(0, 0, 0, 0.5)` — Cool black, tight
- md: `0 4px 16px rgba(0, 0, 0, 0.65)` — Deep
- lg: `0 12px 40px rgba(0, 0, 0, 0.8)` — Heavy depth
- Glow: `0 0 12px rgba(0, 180, 255, 0.25)` — Pulse Blue halo

All shadows are pure cool black — no warm tones.

---

## Motion Philosophy

**Speed:** Slow — 300–500ms transitions
**Easing:** `cubic-bezier(0.25, 0.0, 0.0, 1.0)` — precise, never bouncy
**Style:** Deliberate, slow, cinematic

**Micro-interactions:**
- Hover: Surface brightens one step (matte → gloss), 1px Pulse Blue border fades in over 200ms
- Button press: Opacity drops to 0.85, returns over 150ms
- Loading: Single Pulse Blue horizontal scan line traversing left-to-right
- Focus: 1px Pulse Blue ring with 4px electric-blue glow
- Success: Pulse Blue indicator dot blinks once, holds solid 1.2s

**Reduced motion:** Honor `prefers-reduced-motion`. Replace scan-line animation with instant opacity transitions.

---

## Visual Assets

- **logo.svg:** Space Grotesk 300-weight wordmark "phlix" in optical white, single 1px Pulse Blue bar beneath. Minimal, no icon.
- **favicon.svg:** Obsidian square, single Pulse Blue horizontal bar, small LED dot at right. 32x32.
- **og.svg:** 1200x630, obsidian background with faint micro-grid, wordmark, pulse bar, tagline "SIGNAL. REFINED."
- **Feature icons:** Inline SVG, single-color, 1px stroke, sharp right-angle joins, 24px grid-perfect. Optical white or Pulse Blue.
- **Hero:** CSS gradient backdrop (Pulse Horizon) + animated scan line + precision grid overlay.

---

## Signature Motifs

- **Animated pulse scan line** — 1px Pulse Blue horizontal line scanning left-to-right on hero, 4s duration, infinite
- **Precision grid overlay** — Very faint 40px grid on hero and dark surfaces (2% opacity)
- **Hairline silver dividers** — 1px #2A2E38 lines between all major sections
- **LED indicator dot** — Small Pulse Blue circle used as "signal active" indicator
