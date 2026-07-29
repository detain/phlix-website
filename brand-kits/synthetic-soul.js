/**
 * Synthetic Soul Brand Kit
 * 
 * Emotion-capable AI with genuine feeling behind recommendations
 * Archetype: Sage (emotional, wise, perceptive)
 * Experience: Immersive
 */

export default {
  meta: {
    name: 'Synthetic Soul',
    tagline: 'AI that feels. Recommendations that resonate.',
    description: 'An emotional AI brand experience featuring heartbeat pulses, expression morphs, and organic circuits. The AI mood indicator evolves with your viewing patterns.',
    version: '1.0.0',
    author: 'Brand Team',
    date: '2026-07-28'
  },

  palette: {
    primary: '#FF6B6B',      // Coral heartbeat
    secondary: '#4ECDC4',    // Teal pulse
    accent: '#FFE66D',       // Warm yellow glow
    dark: '#1A1A2E',         // Deep void
    light: '#C7F9CC',         // Soft mint
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%)',
    moodGradient: 'radial-gradient(circle at 50% 50%, #FF6B6B 0%, #1A1A2E 100%)'
  },

  typography: {
    display: "'Cormorant Garamond', Georgia, serif",
    body: "'Crimson Text', Georgia, serif",
    mono: "'IBM Plex Mono', 'Courier New', monospace",
    scale: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '2rem',
      '4xl': '2.75rem',
      '5xl': '3.5rem',
      '6xl': '4.5rem'
    }
  },

  spacing: {
    unit: '8px',
    scale: [0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128],
    container: '1200px',
    sectionGap: '96px'
  },

  borderRadius: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '24px',
    full: '9999px'
  },

  shadows: {
    sm: '0 2px 4px rgba(26, 26, 46, 0.1)',
    md: '0 4px 16px rgba(26, 26, 46, 0.15)',
    lg: '0 8px 32px rgba(26, 26, 46, 0.2)',
    xl: '0 16px 48px rgba(26, 26, 46, 0.25)',
    glow: {
      primary: '0 0 30px rgba(255, 107, 107, 0.4)',
      secondary: '0 0 30px rgba(78, 205, 196, 0.4)',
      accent: '0 0 30px rgba(255, 230, 109, 0.4)',
      pulse: '0 0 60px rgba(255, 107, 107, 0.6)'
    }
  },

  motion: {
    duration: {
      instant: '100ms',
      fast: '200ms',
      normal: '400ms',
      slow: '800ms',
      heartbeat: '1000ms',
      pulse: '1500ms',
      wave: '2000ms',
      morph: '3000ms'
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      pulse: 'cubic-bezier(0.9, 0.1, 0.1, 0.9)'
    },
    animations: {
      heartbeat: 'heartbeat 1s ease-in-out infinite',
      pulse: 'pulse 1.5s ease-in-out infinite',
      pulseWave: 'pulseWave 2s ease-in-out infinite',
      expressionMorph: 'expressionMorph 3s ease-in-out infinite',
      float: 'float 6s ease-in-out infinite',
      glow: 'glow 2s ease-in-out infinite alternate',
      waveFlow: 'waveFlow 3s ease-in-out infinite',
      organicCircuit: 'organicCircuit 4s linear infinite'
    }
  },

  elements: {
    emotionalFace: {
      states: ['neutral', 'curious', 'happy', 'concerned', 'thoughtful'],
      morphDuration: '3s',
      expressions: {
        neutral: { eyeOpenness: 0.8, mouthCurve: 0, browAngle: 0 },
        curious: { eyeOpenness: 1.0, mouthCurve: 0.2, browAngle: 5 },
        happy: { eyeOpenness: 0.7, mouthCurve: 0.8, browAngle: 0 },
        concerned: { eyeOpenness: 0.9, mouthCurve: -0.3, browAngle: -8 },
        thoughtful: { eyeOpenness: 0.75, mouthCurve: 0.1, browAngle: 3 }
      }
    },
    heartMonitor: {
      lineColor: '#FF6B6B',
      backgroundColor: '#1A1A2E',
      gridColor: 'rgba(78, 205, 196, 0.1)',
      lineWidth: 2,
      glowIntensity: 0.6
    },
    pulseLines: {
      count: 5,
      spacing: 20,
      opacity: 0.3,
      animationDelay: 0.2
    },
    organicCircuits: {
      nodeRadius: 4,
      lineWidth: 1.5,
      nodeColor: '#4ECDC4',
      lineColor: '#4ECDC4',
      branchProbability: 0.3,
      maxDepth: 4
    }
  },

  components: {
    hero: {
      height: '100vh',
      showMoodIndicator: true,
      showPulseLines: true,
      showOrganicCircuits: true
    },
    moodIndicator: {
      size: 60,
      position: 'top-right',
      states: ['calm', 'engaged', 'excited', 'contemplative'],
      updateInterval: 5000
    },
    nav: {
      style: 'minimal',
      showOnScroll: true,
      blurOnScroll: true
    },
    cta: {
      style: 'gradient-border',
      hoverGlow: true
    }
  },

  moodTracking: {
    enabled: true,
    trackScrollDepth: true,
    trackHoverTime: true,
    trackClickPatterns: true,
    moodStates: {
      calm: { color: '#4ECDC4', expression: 'neutral', pulseRate: 60 },
      engaged: { color: '#FFE66D', expression: 'curious', pulseRate: 75 },
      excited: { color: '#FF6B6B', expression: 'happy', pulseRate: 95 },
      contemplative: { color: '#C7F9CC', expression: 'thoughtful', pulseRate: 65 }
    },
    transitions: {
      duration: 2000,
      easing: 'smooth'
    }
  },

  accessibility: {
    prefersReducedMotion: {
      disableAnimations: true,
      reduceMotionDuration: '10ms',
      showStaticFallbacks: true
    },
    minimumContrast: '4.5:1',
    focusIndicators: true
  },

  assets: {
    icons: {
      source: 'inline',
      style: 'custom'
    },
    images: {
      optimization: 'lazy',
      formats: ['webp', 'jpg']
    }
  }
};
