/**
 * Bio-Engineering Brand Kit
 * Concept: Grown, not built — organic media server
 * Archetype: Sage (organic, growing, natural)
 * Experience Archetype: Immersive
 */

export const bioEngineering = {
  meta: {
    name: 'Bio-Engineering',
    tagline: 'Grown, Not Built',
    description: 'An organic media server experience that evolves like living systems. Library growth visualized as natural evolution with bioluminescent aesthetics.',
    version: '1.0.0',
    author: 'Phlix Creative Studio',
    archetype: 'sage',
    experienceArchetype: 'immersive'
  },

  palette: {
    primary: '#00FF87',
    secondary: '#00B4D8',
    accent: '#7B2CBF',
    highlight: '#FF006E',
    dark: '#1A1A2E',
    background: '#0D1117',
    surface: '#161B22',
    text: '#E6EDF3',
    textMuted: '#8B949E',
    bioluminescent: '#00FF87',
    membrane: 'rgba(0, 180, 216, 0.15)',
    dna: '#7B2CBF',
    cell: '#00B4D8'
  },

  elements: {
    dna: {
      enabled: true,
      color: '#7B2CBF',
      glowColor: 'rgba(123, 44, 191, 0.6)',
      animationSpeed: 8,
      strandCount: 2,
      basePairCount: 12
    },
    cell: {
      enabled: true,
      membraneColor: 'rgba(0, 180, 216, 0.3)',
      nucleusColor: '#7B2CBF',
      organelleCount: 5,
      pulseSpeed: 4
    },
    membrane: {
      enabled: true,
      color: 'rgba(0, 255, 135, 0.1)',
      borderColor: 'rgba(0, 255, 135, 0.4)',
      breathingSpeed: 6,
      thickness: 2
    },
    bioluminescence: {
      enabled: true,
      color: '#00FF87',
      glowIntensity: 0.8,
      pulseSpeed: 3,
      particleCount: 20
    },
    nucleus: {
      enabled: true,
      color: '#FF006E',
      orbitCount: 3,
      rotationSpeed: 20
    }
  },

  motion: {
    cellDivision: {
      enabled: true,
      duration: 2.5,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      phases: ['interphase', 'prophase', 'metaphase', 'anaphase', 'telophase', 'cytokinesis']
    },
    membraneBreathing: {
      enabled: true,
      minScale: 0.98,
      maxScale: 1.02,
      duration: 4,
      easing: 'ease-in-out'
    },
    bioluminescentPulse: {
      enabled: true,
      minOpacity: 0.3,
      maxOpacity: 1,
      duration: 3,
      easing: 'ease-in-out',
      syncWithBreathing: true
    },
    dnaRotation: {
      enabled: true,
      speed: 20,
      direction: 'clockwise',
      axis: 'Y'
    },
    organicGrowth: {
      enabled: true,
      duration: 1.5,
      staggerDelay: 0.1,
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
    }
  },

  typography: {
    display: {
      fontFamily: '"Playfair Display", Georgia, serif',
      weights: [400, 700, 900],
      useCase: 'Headlines, hero text, brand moments'
    },
    body: {
      fontFamily: '"Source Sans 3", "Segoe UI", sans-serif',
      weights: [300, 400, 600],
      useCase: 'Body text, navigation, UI elements'
    },
    accent: {
      fontFamily: '"JetBrains Mono", "Fira Code", monospace',
      weights: [400, 500],
      useCase: 'Technical details, stats, metadata'
    },
    scale: {
      base: '16px',
      ratio: '1.25',
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '2rem',
      '3xl': '2.5rem',
      '4xl': '3.5rem',
      '5xl': '4.5rem'
    }
  },

  layout: {
    grid: {
      columns: 12,
      gutter: '2rem',
      maxWidth: '1400px',
      breakpointKeys: ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
    },
    sections: {
      hero: {
        minHeight: '100vh',
        padding: '4rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      features: {
        padding: '6rem 2rem',
        gridGap: '3rem'
      },
      stats: {
        padding: '4rem 2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem'
      },
      cta: {
        padding: '5rem 2rem',
        textAlign: 'center'
      }
    }
  },

  effects: {
    gradients: [
      {
        name: 'bioluminescent-glow',
        colors: ['#00FF87', '#00B4D8', '#7B2CBF'],
        direction: '135deg'
      },
      {
        name: 'membrane-sheen',
        colors: ['rgba(0,180,216,0.1)', 'rgba(123,44,191,0.2)', 'rgba(0,255,135,0.1)'],
        direction: '180deg'
      },
      {
        name: 'cell-metabolism',
        colors: ['#0D1117', '#1A1A2E', '#161B22'],
        direction: '0deg'
      }
    ],
    shadows: [
      {
        name: 'bioluminescent-shadow',
        values: '0 0 30px rgba(0, 255, 135, 0.4), 0 0 60px rgba(0, 255, 135, 0.2)'
      },
      {
        name: 'membrane-shadow',
        values: '0 0 20px rgba(0, 180, 216, 0.3), inset 0 0 20px rgba(0, 180, 216, 0.1)'
      },
      {
        name: 'nucleus-shadow',
        values: '0 0 40px rgba(255, 0, 110, 0.5), 0 0 80px rgba(255, 0, 110, 0.3)'
      }
    ],
    textures: [
      {
        name: 'cell-membrane',
        type: 'noise',
        opacity: 0.05,
        scale: 1.5
      },
      {
        name: 'organic-matter',
        type: 'grain',
        opacity: 0.03,
        scale: 2
      }
    ]
  },

  components: {
    buttons: {
      primary: {
        background: 'linear-gradient(135deg, #00FF87 0%, #00B4D8 100%)',
        color: '#1A1A2E',
        border: 'none',
        borderRadius: '50px',
        padding: '1rem 2.5rem',
        fontFamily: 'Source Sans 3, sans-serif',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        hover: {
          transform: 'scale(1.05)',
          boxShadow: '0 0 30px rgba(0, 255, 135, 0.6), 0 0 60px rgba(0, 255, 135, 0.3)'
        }
      },
      secondary: {
        background: 'transparent',
        color: '#00FF87',
        border: '2px solid #00FF87',
        borderRadius: '50px',
        padding: '0.875rem 2rem',
        fontFamily: 'Source Sans 3, sans-serif',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        transition: 'all 0.3s ease',
        hover: {
          background: 'rgba(0, 255, 135, 0.1)',
          boxShadow: '0 0 20px rgba(0, 255, 135, 0.3)'
        }
      },
      ghost: {
        background: 'transparent',
        color: '#E6EDF3',
        border: '1px solid rgba(230, 237, 243, 0.2)',
        borderRadius: '8px',
        padding: '0.75rem 1.5rem',
        fontFamily: 'Source Sans 3, sans-serif',
        fontWeight: 400,
        transition: 'all 0.3s ease',
        hover: {
          borderColor: '#00FF87',
          color: '#00FF87'
        }
      }
    },
    cards: {
      feature: {
        background: 'rgba(22, 27, 34, 0.8)',
        border: '1px solid rgba(0, 180, 216, 0.2)',
        borderRadius: '16px',
        padding: '2rem',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.4s ease',
        hover: {
          borderColor: 'rgba(0, 255, 135, 0.4)',
          boxShadow: '0 0 30px rgba(0, 255, 135, 0.15), 0 8px 32px rgba(0, 0, 0, 0.3)',
          transform: 'translateY(-4px)'
        }
      },
      stat: {
        background: 'linear-gradient(135deg, rgba(0, 180, 216, 0.1) 0%, rgba(123, 44, 191, 0.1) 100%)',
        border: '1px solid rgba(0, 255, 135, 0.2)',
        borderRadius: '12px',
        padding: '1.5rem 2rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }
    },
    navigation: {
      background: 'rgba(13, 17, 23, 0.9)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(0, 180, 216, 0.15)',
      padding: '1rem 2rem',
      fontFamily: 'Source Sans 3, sans-serif',
      linkColor: '#E6EDF3',
      linkHoverColor: '#00FF87',
      height: '70px'
    },
    progress: {
      trackColor: 'rgba(0, 180, 216, 0.2)',
      fillColor: 'linear-gradient(90deg, #00FF87, #00B4D8, #7B2CBF)',
      height: '6px',
      borderRadius: '3px',
      animated: true
    },
    badges: {
      background: 'rgba(0, 255, 135, 0.15)',
      color: '#00FF87',
      border: '1px solid rgba(0, 255, 135, 0.3)',
      borderRadius: '50px',
      padding: '0.25rem 0.75rem',
      fontSize: '0.75rem',
      fontFamily: 'JetBrains Mono, monospace',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }
  },

  animations: {
    keyframes: {
      bioluminescentPulse: `
        @keyframes bioluminescentPulse {
          0%, 100% { opacity: 0.3; filter: brightness(1); }
          50% { opacity: 1; filter: brightness(1.3) drop-shadow(0 0 10px currentColor); }
        }
      `,
      membraneBreathing: `
        @keyframes membraneBreathing {
          0%, 100% { transform: scale(0.98); border-width: 2px; }
          50% { transform: scale(1.02); border-width: 3px; }
        }
      `,
      dnaRotation: `
        @keyframes dnaRotation {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
      `,
      cellDivision: `
        @keyframes cellDivision {
          0% { transform: scale(1); border-radius: 50%; }
          25% { transform: scale(1.1); border-radius: 50% 50% 50% 50%; }
          50% { transform: scale(1.05); border-radius: 50%; }
          75% { transform: scale(0.95); border-radius: 50% 50% 0 0; }
          100% { transform: scale(1); border-radius: 50%; }
        }
      `,
      organicGrowth: `
        @keyframes organicGrowth {
          0% { transform: scale(0.8); opacity: 0; filter: blur(4px); }
          100% { transform: scale(1); opacity: 1; filter: blur(0); }
        }
      `,
      floatSequence: `
        @keyframes floatSequence {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `,
      glowPulse: `
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 135, 0.3); }
          50% { box-shadow: 0 0 40px rgba(0, 255, 135, 0.6), 0 0 60px rgba(0, 255, 135, 0.3); }
        }
      `
    }
  },

  accessibility: {
    prefersReducedMotion: {
      strategy: 'disable-all-animations',
      exceptions: ['membraneBreathing']
    },
    contrastRatio: {
      minText: 4.5,
      minLargeText: 3,
      minUI: 3
    },
    focusVisible: {
      outlineColor: '#00FF87',
      outlineWidth: '2px',
      outlineOffset: '2px'
    }
  }
};

export default bioEngineering;
