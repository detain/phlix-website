# SITE.md — Chrome Velocity Design Rationale

## Concept & Vision

Chrome Velocity is the **motorsport-identity brand** for Phlix. Every screen is a
pit wall. Every title is a lap record. The visual language borrows from Formula 1
livery design, carbon-fiber textures, stadium floodlight photography, and telemetry
data readouts — delivering a media server brand that feels as immediate and
electrifying as a race start.

The brand DNA: *Chrome Velocity is carbon black, chrome silver, racing red, and speed
yellow — a palette as instantly legible as a race livery at 300 km/h. It is sharp,
technical, and relentlessly fast.*

## Aesthetic Direction

**Art Direction:** Deep carbon black grounds every composition. Chrome silver is the
reflective mid-tone. Racing red cuts through as the primary accent. Speed yellow is
used sparingly — only for the sharpest highlights (elite badges, warnings). Lighting
is dramatic: hard stadium floods from above, creating crisp catch-lights on chrome
and strong shadows below. Typography treatments feel like a timing screen or
pit-board — condensed, bold, monospaced for data. Angular 8–15 degree diagonal cuts
recur across panel edges, badges, and dividers to evoke racing aerodynamics.

**Visual Style tags:** Technical illustration, high-contrast photography, sharp
geometric vector, data visualization overlay, motion-blur kinetics.

**Rendering:** Semi-realistic vector/cel-shading/halftone composite. Medium texture.
Layered depth. Cool hard stadium floodlight, high contrast, hard shadows.

## Color Palette

| Role          | Name            | Hex       | Usage |
|---------------|-----------------|-----------|-------|
| Primary       | Racing Red      | `#CC0000` | CTAs, active states, critical accents |
| Secondary     | Chrome Silver   | `#C0C5CE` | Secondary actions, metadata labels, UI rails |
| Tertiary      | Speed Yellow    | `#FFD100` | Warning states, elite badges (sparingly) |
| Background    | Carbon Black    | `#0D0D0F` | Default page background |
| Surface       | Carbon Panel    | `#17181C` | Card/panel surfaces |
| Surface Alt   | Pit Dark        | `#1F2026` | Alternate surfaces, hover states |
| Text          | Signal White    | `#F0F2F5` | Primary body/headline text |
| Text Muted    | Chrome Silver   | `#C0C5CE` | De-emphasized labels, metadata |
| Border        | Titanium        | `#2A2C32` | Borders, dividers, structural lines |
| Focus         | Telemetry Cyan  | `#00E5FF` | Keyboard focus rings |
| Success       | Green Sector    | `#00C853` | Success states |
| Error         | Danger Red      | `#FF1A1A` | Errors, destructive actions |
| Warning       | Yellow Flag     | `#FFD100` | Warnings, caution states |
| Info          | Blue Flag       | `#0096FF` | Informational messages |

**Gradients:**
- **Race Start:** `#CC0000` → `#FF6B00` (135deg) — hero CTA, progress fills
- **Telemetry Sweep:** `#0D0D0F` → `#17181C` → `#1F2026` (90deg) — surface depth
- **Chrome Sheen:** `#5A5E68` → `#C0C5CE` → `#5A5E68` (160deg) — premium element sheen
- **Speed Burn:** radial yellow glow on dark — subtle halo behind speed-yellow accents

**Color Rules (hard constraints):**
- Backgrounds are always carbon black or carbon panel surface — never light
- Racing red is the sole primary CTA color — never dilute it with other actions
- Speed yellow appears on at most one element per screen section
- Chrome silver is the go-to for secondary text, metadata, and UI rails
- Avoid warm-toned shadows — all shadows are cool or pure black
- Never use more than three accent colors (red, yellow, cyan) in a single view

## Typography

| Role      | Family              | Weight   | Usage |
|-----------|---------------------|----------|-------|
| Headline  | Barlow Condensed    | 700, 800 | Race-board headlines, hero titles, section headers |
| Display   | Barlow Condensed    | 800      | Oversized numerals, splash hero text |
| Body      | Barlow              | 400, 500 | Paragraphs, descriptions |
| UI        | Barlow              | 500, 600 | Buttons, labels, navigation, chips |
| Mono      | JetBrains Mono      | 400, 600 | Telemetry readouts, lap times, code |
| Number    | Barlow Condensed    | 700      | Stat dashboards, counters |

**Rules:**
- ALL CAPS for section headers and short labels
- Headlines must be condensed and bold — no thin/light weights
- Body text is Barlow regular — never condensed
- JetBrains Mono is the telemetry voice — all numerical live data
- Max 70 characters per line for body copy

## Spatial System

**Spacing scale (px):** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96

All margins, padding, and gaps use only these steps. No arbitrary values.

## Motion Philosophy

Motion is decisive — racing cars do not bounce, they cut. Animations feel like
precise mechanical movements on a race car, not playful UI flourishes.

- **Speed:** 80–150ms micro, 250ms max transitions
- **Easing:** `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (sharp) for most; `ease-out` for entrances; `linear` for telemetry sweeps
- **Hero motif:** Animated telemetry data stream with speed-line blur on scroll entry
- **Microinteractions:**
  - Hover: Cards shift 4px up + racing-red left-border flash + shadow sharpens
  - Button press: Hard 0.96 scale snap — instant precision, no spring
  - Loading: Lap-timer countdown or telemetry bar sweeping L→R
  - Focus: 2px telemetry-cyan ring fires at 60ms
  - Success: Green sector flash + checkered-flag micro-animation
- **Reduced motion:** Honor `prefers-reduced-motion: reduce` — hard cuts replace wipes, no motion-blur trails

## Layout Archetype

**Showcase** — Full-bleed immersive hero → tech-spec feature grid → social proof → race-red CTA strip.

Key layout decisions:
- Max content width: 1440px; tight columns at 1200px
- Generous negative space used like a slipstream draft
- Angular 8–15° panel cuts divide content zones
- All corners sharp — ≤4px radius maximum (tight 2px standard)

## Visual Assets

- **Logo:** Angular parallelogram badge with CHROME (heavy 800) / VELOCITY (700) wordmark, racing red left accent bar, checkered flag motif. Dark carbon background.
- **Favicon:** Racing red (#CC0000) square with bold P in signal white.
- **OG Card:** Dark carbon background with carbon fiber diagonal grid, red glow top accent, red left bar, Phlix + Chrome Velocity wordmark, telemetry-style status strip with checkered flag.
- **Feature Icons:** Inline SVG, 1.5px stroke, chrome silver, sharp square corners, single-color default / racing red for active state.
- **Signature elements to incorporate:** Checkered flag stripe motif, carbon fiber weave texture, chrome reflective surfaces, racing telemetry data readouts, speed-line motion blur streaks.

## Component Notes

- **Cards:** Carbon panel surface (#17181C), 1px titanium border (#2A2C32), 4px radius, 16px padding. Hover: 4px upward translate + 2px racing-red left border.
- **Buttons:** Primary = racing red. Secondary = transparent + titanium border. ALL CAPS, 0.04em tracking, tight.
- **Badges:** Sharp rectangular (no rounding), 1px border. Chrome silver (quality), speed yellow (elite), racing red (status), green sector (success).
- **Forms:** Carbon panel fill, 1px titanium border, 4px radius, telemetry-cyan focus ring.
- **Navigation:** Sticky carbon header. Active item = racing-red underline (desktop) or left border (mobile). ALL CAPS, tight tracking.
