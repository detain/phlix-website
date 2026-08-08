/**
 * Terraform Brand Kit
 * Planetary terraforming theme — reshaping digital worlds to suit your media needs
 */
const terraformKit = {
  // Brand Identity
  name: 'Terraform',
  slug: 'terraform',
  archetype: 'Magician',
  experienceArchetype: 'Immersive',
  concept: 'Reshaping digital worlds to suit your media needs',

  // Canonical top-level fields read by tools/build.mjs when it renders this
  // kit's gallery card. This kit predates the canonical schema and kept its
  // colours under `palette`; that stays exactly as it was for back-compat,
  // and the fields below mirror it in the shape the build reads. Every value
  // is lifted verbatim from `concept` / `features` / `palette` — no new brand
  // decisions are made in this block.
  tagline_primary: 'Reshaping digital worlds to suit your media needs',
  personality: ['Transformative', 'Planetary', 'Atmospheric', 'Industrial', 'Immersive'],

  // `colors` is the canonical name for the palette; the keys are mapped
  // one-for-one from `palette` below, not re-chosen. `palette.light` has no
  // canonical counterpart and is deliberately left out rather than guessed at.
  colors: {
    primary: { name: 'Life Spring Teal-Green', hex: '#06D6A0' },
    secondary: { name: 'Ocean Depth Teal', hex: '#1B998B' },
    tertiary: { name: 'Cosmic Void Navy', hex: '#26547C' },
    accent: { name: 'Energy Pulse Coral', hex: '#EF476F' },
    neutral: { name: 'Muted Gray-Blue', hex: '#7B8C9A' },
    background: { name: 'Deep Space Black', hex: '#0D1B2A' },
    surface: { name: 'Dark Surface', hex: '#1B2838' },
    text: { name: 'Soft White', hex: '#E8F1F2' },
  },

  // Color Palette
  palette: {
    primary: '#06D6A0', // Vibrant teal-green (life spring)
    secondary: '#1B998B', // Deep teal (ocean depth)
    accent: '#EF476F', // Coral pink (energy pulse)
    dark: '#26547C', // Deep navy-blue (cosmic void)
    light: '#FFD166', // Warm gold (solar energy)
    background: '#0D1B2A', // Deep space black
    surface: '#1B2838', // Dark surface
    text: '#E8F1F2', // Soft white
    textMuted: '#7B8C9A', // Muted gray-blue
  },

  // Typography
  typography: {
    display: "'Orbitron', 'Courier New', monospace",
    heading: "'Exo 2', 'Courier New', monospace",
    body: "'IBM Plex Sans', 'Courier New', monospace",
    mono: "'IBM Plex Mono', 'Courier New', monospace",
  },

  // Visual Elements
  elements: ['Planetary surfaces', 'Atmosphere layers', 'Mining drones', 'Colony domes'],

  // Motion & Animation
  motion: ['Crater formations', 'Terraforming pulses', 'Atmospheric glows'],

  // Key Visual Features
  features: {
    planetary: true,
    atmospheric: true,
    industrial: true,
    transformative: true,
  },

  // Animation Timing
  timing: {
    pulse: '2.5s',
    orbit: '20s',
    terraform: '4s',
    glow: '3s',
  },

  // CSS Variables
  cssVariables: function () {
    return `:root {
                --tf-primary: ${this.palette.primary};
                --tf-secondary: ${this.palette.secondary};
                --tf-accent: ${this.palette.accent};
                --tf-dark: ${this.palette.dark};
                --tf-light: ${this.palette.light};
                --tf-bg: ${this.palette.background};
                --tf-surface: ${this.palette.surface};
                --tf-text: ${this.palette.text};
                --tf-text-muted: ${this.palette.textMuted};
                --tf-font-display: ${this.typography.display};
                --tf-font-heading: ${this.typography.heading};
                --tf-font-body: ${this.typography.body};
                --tf-font-mono: ${this.typography.mono};
                --tf-pulse: ${this.timing.pulse};
                --tf-orbit: ${this.timing.orbit};
                --tf-terraform: ${this.timing.terraform};
                --tf-glow: ${this.timing.glow};
            }`;
  },
};

// Export for use.
//
// This package is `"type": "module"`, and this file used to wrap everything in
// an IIFE and export via `window` / `module.exports`. Under ESM neither guard
// can fire — `module` is not defined, `window` is not defined in Node, and the
// IIFE kept `terraformKit` out of module scope entirely — so `import()` resolved
// to an empty namespace. tools/build.mjs then skipped the kit and left the site
// undeployed. The IIFE is gone (module scope is already private in ESM) and the
// ESM exports below are the only export path.
export default terraformKit;
export { terraformKit };
