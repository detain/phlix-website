/**
 * Night Hawk Brand Kit
 * Stealth fighter aesthetic — elite, precise, untouchable
 * 
 * Palette: #0A0A0A #1B2631 #415A77 #00B4D8 #E0E1DD
 * Archetype: Sage (elite, authoritative, precise)
 * Experience Archetype: immersive (dark, tactical, precise)
 */

export const nightHawk = {
  name: 'Night Hawk',
  slug: 'night-hawk',
  tagline: 'Stealth. Precision. Dominance.',
  description: 'A tactical brand kit inspired by stealth fighter aesthetics — dark, authoritative, and razor-sharp. Perfect for brands that project elite authority and technical precision.',
  
  // Color Palette
  palette: {
    background: '#0A0A0A',      // Deep black - stealth mode base
    surface: '#1B2631',         // Dark slate - cockpit panels
    secondary: '#415A77',       // Steel blue - tactical overlay
    primary: '#00B4D8',         // Cyan - HUD glow, targeting
    accent: '#E0E1DD',         // Off-white - cockpit displays
    highlight: '#00B4D8',      // Cyan highlight
    danger: '#FF4444',          // Alert red
    success: '#00FF88',         // Night vision green
    text: {
      primary: '#E0E1DD',
      secondary: '#415A77',
      muted: '#778DA9'
    }
  },

  // Typography
  typography: {
    display: {
      fontFamily: '"Orbitron", "Courier New", monospace',
      weight: 700,
      letterSpacing: '0.15em',
      textTransform: 'uppercase'
    },
    heading: {
      fontFamily: '"Share Tech Mono", "Courier New", monospace',
      weight: 600,
      letterSpacing: '0.1em'
    },
    body: {
      fontFamily: '"Share Tech", "Courier New", monospace',
      weight: 400,
      letterSpacing: '0.05em'
    },
    mono: {
      fontFamily: '"Fira Code", "Consolas", monospace',
      weight: 400
    }
  },

  // Visual Elements
  elements: {
    aircraftSilhouettes: true,
    hudOverlays: true,
    radarSweeps: true,
    nightVisionGreen: true,
    targetingReticles: true,
    afterburnerGlows: true,
    scanlines: true,
    gridOverlays: true,
    telemetryText: true,
    missileLock: true
  },

  // Animations
  motion: {
    missileLockAnimations: true,
    targetingReticles: true,
    afterburnerGlows: true,
    radarSweep: true,
    hudFlicker: true,
    stealthMode: true,
    scanlineReveal: true,
    glitchEffect: true
  },

  // Experience Features
  experience: {
    stealthMode: {
      enabled: true,
      description: '"Stealth mode" dims UI to near-black, creating an immersive tactical experience',
      activationDelay: 5000,
      dimOpacity: 0.3
    },
    hudOverlay: {
      enabled: true,
      showCoordinates: true,
      showTimer: true,
      showRadar: true
    },
    audioCues: {
      enabled: false,
      toggleLabel: 'Enable Audio Cues'
    }
  },

  // CSS Variables
  cssVariables: {
    '--nh-bg': '#0A0A0A',
    '--nh-surface': '#1B2631',
    '--nh-secondary': '#415A77',
    '--nh-primary': '#00B4D8',
    '--nh-accent': '#E0E1DD',
    '--nh-glow': 'rgba(0, 180, 216, 0.6)',
    '--nh-glow-strong': 'rgba(0, 180, 216, 0.9)',
    '--nh-nv-green': '#00FF88',
    '--nh-scanline': 'rgba(0, 180, 216, 0.03)',
    '--nh-border': '1px solid rgba(0, 180, 216, 0.3)',
    '--nh-border-glow': '0 0 10px rgba(0, 180, 216, 0.5)',
    '--nh-transition': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '--nh-transition-slow': 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
  },

  // Component Patterns
  components: {
    card: {
      background: 'linear-gradient(135deg, var(--nh-surface) 0%, var(--nh-bg) 100%)',
      border: 'var(--nh-border)',
      borderRadius: '2px',
      boxShadow: 'inset 0 1px 0 rgba(0, 180, 216, 0.1), var(--nh-border-glow)',
      backdropFilter: 'blur(10px)'
    },
    button: {
      primary: {
        background: 'linear-gradient(135deg, var(--nh-primary) 0%, #0090b0 100%)',
        color: 'var(--nh-bg)',
        border: 'none',
        boxShadow: '0 0 20px var(--nh-glow), inset 0 1px 0 rgba(255,255,255,0.2)'
      },
      secondary: {
        background: 'transparent',
        color: 'var(--nh-primary)',
        border: 'var(--nh-border)',
        boxShadow: 'var(--nh-border-glow)'
      },
      ghost: {
        background: 'transparent',
        color: 'var(--nh-accent)',
        border: 'none'
      }
    },
    input: {
      background: 'rgba(27, 38, 49, 0.8)',
      border: 'var(--nh-border)',
      color: 'var(--nh-accent)',
      focusBorder: 'var(--nh-primary)',
      focusShadow: '0 0 15px var(--nh-glow)'
    },
    badge: {
      background: 'rgba(0, 180, 216, 0.15)',
      color: 'var(--nh-primary)',
      border: '1px solid rgba(0, 180, 216, 0.3)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      fontSize: '0.75rem'
    }
  },

  // Layout
  layout: {
    maxWidth: '1400px',
    gridGap: '2rem',
    sectionPadding: '6rem 2rem',
    cardPadding: '2rem'
  },

  // Shadows & Effects
  effects: {
    glowCyan: '0 0 20px rgba(0, 180, 216, 0.6)',
    glowGreen: '0 0 20px rgba(0, 255, 136, 0.6)',
    scanlineOverlay: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 180, 216, 0.03) 2px,
        rgba(0, 180, 216, 0.03) 4px
      )
    `,
    noiseTexture: `
      url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")
    `,
    hudCornerDecorators: `
      url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20 L0 0 L20 0' fill='none' stroke='%2300B4D8' stroke-width='1'/%3E%3Cpath d='M20 0 L40 0 L40 20' fill='none' stroke='%2300B4D8' stroke-width='1'/%3E%3C/svg%3E")
    `
  },

  // Animations Keyframes
  keyframes: {
    radarSweep: '@keyframes radarSweep { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }',
    missileLock: '@keyframes missileLock { 0%, 100% { box-shadow: 0 0 0 0 var(--nh-glow); } 50% { box-shadow: 0 0 30px 10px var(--nh-glow); } }',
    afterburner: '@keyframes afterburner { 0%, 100% { opacity: 0.5; filter: blur(2px); } 50% { opacity: 1; filter: blur(0px); } }',
    hudFlicker: '@keyframes hudFlicker { 0%, 100% { opacity: 1; } 92% { opacity: 1; } 93% { opacity: 0.8; } 94% { opacity: 1; } 96% { opacity: 0.9; } 97% { opacity: 1; } }',
    scanlineMove: '@keyframes scanlineMove { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }',
    glitch: '@keyframes glitch { 0%, 100% { transform: translate(0); } 20% { transform: translate(-2px, 2px); } 40% { transform: translate(2px, -2px); } 60% { transform: translate(-2px, -2px); } 80% { transform: translate(2px, 2px); } }',
    targetPulse: '@keyframes targetPulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.1); opacity: 0.8; } }',
    stealthFade: '@keyframes stealthFade { 0% { opacity: 1; } 100% { opacity: var(--stealth-opacity, 0.3); } }'
  },

  // Breakpoints
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1400px'
  },

  // Z-Index Scale
  zIndex: {
    base: 1,
    overlay: 100,
    hud: 500,
    modal: 1000,
    stealth: 1100
  },

  // Meta
  meta: {
    author: 'Brand Kit System',
    version: '1.0.0',
    created: '2026-07-28',
    tags: ['stealth', 'tactical', 'military', 'dark', 'hud', 'night-vision']
  }
};

// Export default
export default nightHawk;
