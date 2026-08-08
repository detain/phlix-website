/**
 * Stellar Command Brand Kit
 * 
 * A starship bridge-inspired media fleet management experience.
 * Command your content with the precision of a starship captain.
 */

const stellarCommand = {
  name: 'Stellar Command',
  slug: 'stellar-command',

  // Canonical top-level fields read by tools/build.mjs when it renders this
  // kit's gallery card. This kit predates the canonical schema and kept its
  // identity under `concept` / `palette`; those stay exactly as they were for
  // back-compat, and the fields below mirror them in the shape the build reads.
  // Every value here is lifted verbatim from `concept` / `palette` below — no
  // new brand decisions are made in this block.
  archetype: 'Sage',
  tagline_primary: 'Bridge of a starship managing your media fleet',
  personality: ['Commanding', 'Strategic', 'Precise', 'Analytical', 'Immersive'],

  // `colors` is the canonical name for the palette; the keys are mapped
  // one-for-one from `palette` below, not re-chosen.
  colors: {
    primary: { name: 'Deep Space Navy', hex: '#0B132B' },
    secondary: { name: 'Hull Plating Blue', hex: '#1C2541' },
    tertiary: { name: 'Console Teal-Blue', hex: '#3A506B' },
    accent: { name: 'Navigation Beacon Cyan', hex: '#5BC0BE' },
    background: { name: 'Deep Space Navy', hex: '#0B132B' },
    surface: { name: 'Hull Plating Blue', hex: '#1C2541' },
    text: { name: 'Bridge White', hex: '#FFFFFF' },
    success: { name: 'Systems Online', hex: '#4ECDC4' },
    warning: { name: 'Caution Yellow', hex: '#FFE66D' },
    error: { name: 'Red Alert', hex: '#FF6B6B' },
  },

  // Core palette
  palette: {
    primary: '#0B132B',     // Deep space navy
    secondary: '#1C2541',   // Hull plating blue
    tertiary: '#3A506B',    // Console teal-blue
    accent: '#5BC0BE',      // Navigation beacon cyan
    highlight: '#FFFFFF',   // Bridge white
    alert: '#FF6B6B',       // Red alert
    success: '#4ECDC4',     // Systems online
    warning: '#FFE66D',     // Caution yellow
  },
  
  // Concept & archetype
  concept: {
    tagline: 'Bridge of a starship managing your media fleet',
    description: 'Take command of your streaming empire from the bridge of your starship. Navigate through content universes with precision navigation, power up your media systems, and broadcast across the fleet.',
    archetype: 'Sage',
    archetypeDescription: 'Commanding, strategic, and space-age wisdom. The Sage archetype brings analytical precision and commanding authority to content management.',
    experienceArchetype: 'Immersive',
    experienceDescription: 'Full sensory immersion into a starship command bridge. Every interaction feels like operating advanced space technology.',
  },
  
  // Design elements
  elements: {
    console: {
      description: 'Starship console panels with glowing edges and holographic displays',
      css: {
        background: 'linear-gradient(135deg, rgba(27, 37, 65, 0.9) 0%, rgba(11, 19, 43, 0.95) 100%)',
        border: '1px solid rgba(91, 192, 190, 0.3)',
        boxShadow: '0 0 30px rgba(91, 192, 190, 0.1), inset 0 1px 0 rgba(255,255,255,0.05)',
        borderRadius: '4px',
      }
    },
    nacelle: {
      description: 'Warp nacelle inspired elements for power and speed indicators',
      css: {
        background: 'linear-gradient(90deg, #3A506B 0%, #5BC0BE 50%, #3A506B 100%)',
        borderRadius: '2px',
      }
    },
    beacon: {
      description: 'Navigation beacon pulsing lights for status indicators',
      css: {
        animation: 'beacon-pulse 2s ease-in-out infinite',
      }
    },
    hull: {
      description: 'Hull plating textures for solid, reliable surfaces',
      css: {
        backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(255,255,255,0.02) 50px, rgba(255,255,255,0.02) 51px)',
        backgroundColor: '#1C2541',
      }
    },
    viewscreen: {
      description: 'Main view screen for showcasing content',
      css: {
        background: 'radial-gradient(ellipse at center, #1C2541 0%, #0B132B 100%)',
        border: '2px solid #3A506B',
        boxShadow: '0 0 60px rgba(91, 192, 190, 0.2), inset 0 0 100px rgba(0,0,0,0.5)',
      }
    },
  },
  
  // Motion effects
  motion: {
    warpBlur: {
      description: 'Warp-speed blur effect for transitions',
      keyframes: 'warp-speed 1.5s ease-out',
    },
    beamUp: {
      description: 'Beam-up effect for loading and reveals',
      keyframes: 'beam-up 0.8s ease-out',
    },
    consolePowerUp: {
      description: 'Console power-up glow effect',
      keyframes: 'console-power 0.6s ease-out',
    },
    beaconPulse: {
      description: 'Navigation beacon pulse',
      keyframes: 'beacon-pulse 2s ease-in-out infinite',
    },
    scanLine: {
      description: 'Scan line effect for retro display feel',
      keyframes: 'scanline 4s linear infinite',
    },
  },
  
  // Unique twist
  twist: {
    name: 'Hailing Frequencies',
    description: 'Live TV channels appear as incoming hailing frequencies from different star systems. Each channel is a transmission from across the galaxy.',
    examples: [
      { channel: 'CNN', transmission: 'Federation News Network' },
      { channel: 'ESPN', transmission: 'Sports Channel Nova' },
      { channel: 'HBO', transmission: 'HoloEntertainment Grid' },
      { channel: 'Netflix', transmission: 'Stream Nebula' },
    ],
  },
  
  // Typography choices
  typography: {
    displayFont: 'system-ui, -apple-system, "Segoe UI", sans-serif',
    bodyFont: 'system-ui, -apple-system, "Segoe UI", sans-serif',
    displayWeights: [700, 900],
    bodyWeights: [400, 500, 600],
    displayLetterSpacing: '-0.02em',
    bodyLineHeight: 1.6,
  },
  
  // Component styles
  components: {
    button: {
      primary: {
        background: 'linear-gradient(135deg, #5BC0BE 0%, #3A506B 100%)',
        color: '#FFFFFF',
        border: '1px solid rgba(91, 192, 190, 0.5)',
        boxShadow: '0 4px 15px rgba(91, 192, 190, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
        borderRadius: '4px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      },
      secondary: {
        background: 'transparent',
        color: '#5BC0BE',
        border: '1px solid #5BC0BE',
        borderRadius: '4px',
        fontWeight: 500,
      },
    },
    card: {
      background: 'linear-gradient(180deg, rgba(27, 37, 65, 0.8) 0%, rgba(11, 19, 43, 0.9) 100%)',
      border: '1px solid rgba(91, 192, 190, 0.2)',
      borderRadius: '8px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 1px rgba(91, 192, 190, 0.5)',
    },
    header: {
      background: 'linear-gradient(180deg, #0B132B 0%, #1C2541 100%)',
      borderBottom: '2px solid #3A506B',
      boxShadow: '0 0 30px rgba(91, 192, 190, 0.1)',
    },
    footer: {
      background: '#0B132B',
      borderTop: '1px solid #3A506B',
    },
  },
  
  // Decorative elements
  decorative: {
    stars: true,
    gridLines: true,
    cornerBrackets: true,
    glowEffects: true,
    scanLines: true,
    particleEffects: false,
  },
  
  // Accessibility
  accessibility: {
    reducedMotion: {
      warpBlur: 'none',
      beamUp: 'fade-in 0.3s ease-out',
      consolePowerUp: 'none',
      beaconPulse: 'none',
      scanLine: 'none',
    },
    contrastRatios: {
      primary: '#FFFFFF on #0B132B = 14.5:1',
      secondary: '#5BC0BE on #1C2541 = 6.2:1',
    },
  },
  
  // Animation durations
  timing: {
    fast: '150ms',
    medium: '300ms',
    slow: '600ms',
    warp: '1500ms',
  },
  
  // Spacing system
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    section: '4rem',
  },
  
  // Breakpoints
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1200px',
  },
  
  // Z-index layers
  zIndex: {
    base: 1,
    dropdown: 100,
    sticky: 200,
    modal: 300,
    tooltip: 400,
    notification: 500,
  },
};

// Export for use.
//
// This package is `"type": "module"`, so the CommonJS `module.exports` this file
// used to carry exported NOTHING: `module` is not defined in an ES module, the
// `typeof` guard swallowed that, and `import()` resolved to an empty namespace.
// tools/build.mjs then skipped the kit and left the site undeployed. Keep the
// ESM exports below as the only export path.
export default stellarCommand;
export { stellarCommand };
