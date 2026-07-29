/**
 * Dyson Sphere Brand Kit
 * 
 * Concept: Capturing entire stars' energy for your media habit
 * Archetype: Magician (cosmic, powerful, vast)
 * Experience: Immersive
 */

export default {
  meta: {
    name: 'Dyson Sphere',
    tagline: 'Harness the power of entire stars',
    description: 'A stellar megastructure-inspired brand kit featuring energy collectors, plasma tendrils, and cosmic power indicators.',
    version: '1.0.0',
    author: 'PHLIX Brand Team'
  },

  palette: {
    primary: '#FFB800',
    secondary: '#FF6B00',
    accent: '#FF4500',
    dark: '#8B0000',
    deepest: '#1A0A00',
    
    // Functional mappings
    background: '#1A0A00',
    foreground: '#FFB800',
    muted: '#FF6B00',
    border: '#FF4500',
    
    // Gradients
    gradient: {
      solar: 'linear-gradient(135deg, #FFB800 0%, #FF6B00 50%, #FF4500 100%)',
      plasma: 'linear-gradient(180deg, #FFB800 0%, #FF6B00 40%, #8B0000 100%)',
      corona: 'radial-gradient(ellipse at center, #FF6B00 0%, #8B0000 60%, #1A0A00 100%)',
      energy: 'linear-gradient(90deg, #FFB800, #FF6B00, #FF4500, #8B0000)',
    },
    
    // Shadows with brand colors
    glow: {
      primary: '0 0 30px rgba(255, 184, 0, 0.6)',
      secondary: '0 0 60px rgba(255, 107, 0, 0.4)',
      accent: '0 0 90px rgba(255, 69, 0, 0.3)',
      plasma: '0 0 120px rgba(139, 0, 0, 0.5)',
    }
  },

  typography: {
    display: {
      fontFamily: '"Orbitron", "Rajdhani", "Exo 2", system-ui, sans-serif',
      fontWeight: '700',
      fontStyle: 'normal',
      letterSpacing: '0.1em',
      textTransform: 'uppercase'
    },
    heading: {
      fontFamily: '"Rajdhani", "Orbitron", system-ui, sans-serif',
      fontWeight: '600',
      letterSpacing: '0.05em'
    },
    body: {
      fontFamily: '"Exo 2", "Rajdhani", system-ui, sans-serif',
      fontWeight: '400',
      letterSpacing: '0.02em'
    },
    mono: {
      fontFamily: '"Share Tech Mono", "Courier New", monospace',
      fontWeight: '400'
    },
    
    scale: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '2rem',
      '4xl': '2.5rem',
      '5xl': '3.5rem',
      '6xl': '4.5rem'
    }
  },

  spacing: {
    unit: '8px',
    scale: [0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128],
    container: '1200px',
    narrow: '800px'
  },

  borderRadius: {
    none: '0',
    sm: '2px',
    md: '4px',
    lg: '8px',
    xl: '12px',
    full: '9999px'
  },

  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      mega: '1000ms'
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      flare: 'cubic-bezier(0.9, 0.1, 0.1, 0.9)',
      energy: 'cubic-bezier(0.4, 0, 0.6, 1)'
    },
    
    // Named animation keyframes
    keyframes: {
      // Solar flare burst - dramatic radial burst
      solarFlare: {
        '0%': { transform: 'scale(0)', opacity: '1', filter: 'brightness(1)' },
        '50%': { opacity: '1', filter: 'brightness(1.5)' },
        '100%': { transform: 'scale(2)', opacity: '0', filter: 'brightness(0.5)' }
      },
      
      // Energy beam - linear charging effect
      energyBeam: {
        '0%': { backgroundPosition: '200% center', opacity: '0.5' },
        '50%': { opacity: '1' },
        '100%': { backgroundPosition: '-200% center', opacity: '0.5' }
      },
      
      // Ring rotation - megastructure orbital motion
      ringRotation: {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' }
      },
      
      // Ring counter-rotation
      ringCounterRotation: {
        '0%': { transform: 'rotate(360deg)' },
        '100%': { transform: 'rotate(0deg)' }
      },
      
      // Plasma tendril - organic wave motion
      plasmaTendril: {
        '0%, 100%': { 
          transform: 'translateY(0) scaleY(1)',
          filter: 'brightness(1) blur(0px)'
        },
        '25%': {
          transform: 'translateY(-10px) scaleY(1.1)',
          filter: 'brightness(1.3) blur(1px)'
        },
        '50%': {
          transform: 'translateY(-5px) scaleY(0.95)',
          filter: 'brightness(1.1) blur(0.5px)'
        },
        '75%': {
          transform: 'translateY(-15px) scaleY(1.05)',
          filter: 'brightness(1.4) blur(1.5px)'
        }
      },
      
      // Pulse glow - energy indicator breathing
      pulseGlow: {
        '0%, 100%': {
          boxShadow: '0 0 20px rgba(255, 184, 0, 0.4)',
          textShadow: '0 0 10px rgba(255, 184, 0, 0.6)'
        },
        '50%': {
          boxShadow: '0 0 40px rgba(255, 184, 0, 0.8)',
          textShadow: '0 0 20px rgba(255, 184, 0, 1)'
        }
      },
      
      // Stellar drift - subtle floating
      stellarDrift: {
        '0%, 100%': { transform: 'translate(0, 0)' },
        '25%': { transform: 'translate(5px, -10px)' },
        '50%': { transform: 'translate(0, -5px)' },
        '75%': { transform: 'translate(-5px, -10px)' }
      },
      
      // Corona pulse - star breathing
      coronaPulse: {
        '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
        '50%': { transform: 'scale(1.1)', opacity: '1' }
      },
      
      // Flicker - energy instability
      flicker: {
        '0%, 100%': { opacity: '1' },
        '41%': { opacity: '1' },
        '42%': { opacity: '0.8' },
        '43%': { opacity: '1' },
        '45%': { opacity: '0.3' },
        '46%': { opacity: '1' }
      }
    }
  },

  elements: {
    // Stellar Matter - star particles and debris
    stellarMatter: {
      particleCount: 50,
      particleSizes: [1, 2, 3, 4, 6, 8],
      colors: ['#FFB800', '#FF6B00', '#FF4500', '#8B0000'],
      animation: 'stellarDrift'
    },
    
    // Energy Collectors - megastructure harvesting units
    energyCollector: {
      shape: 'hexagonal',
      sizes: [60, 80, 100, 120],
      glowColor: '#FFB800',
      beamColor: '#FF6B00'
    },
    
    // Megastructure Rings - orbital structures
    megastructureRing: {
      thicknesses: [2, 4, 6, 8],
      diameters: [200, 300, 400, 500, 600],
      colors: ['#FFB800', '#FF6B00', '#FF4500'],
      rotationSpeeds: [20, 30, 40, 60]
    },
    
    // Plasma Tendrils - energy streams
    plasmaTendril: {
      width: [2, 4, 6],
      length: [50, 100, 150, 200],
      colors: ['#FF4500', '#FF6B00'],
      animation: 'plasmaTendril'
    },
    
    // Solar Flare Bursts - explosive energy releases
    solarFlare: {
      rayCount: 12,
      rayLengths: [30, 50, 70, 100],
      colors: ['#FFB800', '#FFFFFF', '#FF6B00'],
      animation: 'solarFlare'
    }
  },

  components: {
    button: {
      primary: {
        background: 'linear-gradient(135deg, #FFB800 0%, #FF6B00 100%)',
        color: '#1A0A00',
        border: '2px solid #FFB800',
        borderRadius: '4px',
        fontFamily: 'Rajdhani, system-ui, sans-serif',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        boxShadow: '0 0 20px rgba(255, 184, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        hover: {
          background: 'linear-gradient(135deg, #FFC100 0%, #FF7A00 100%)',
          boxShadow: '0 0 40px rgba(255, 184, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
          transform: 'translateY(-2px)'
        },
        active: {
          transform: 'translateY(0)',
          boxShadow: '0 0 10px rgba(255, 184, 0, 0.3)'
        }
      },
      secondary: {
        background: 'transparent',
        color: '#FFB800',
        border: '2px solid #FF6B00',
        borderRadius: '4px',
        fontFamily: 'Rajdhani, system-ui, sans-serif',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        hover: {
          background: 'rgba(255, 107, 0, 0.1)',
          borderColor: '#FFB800',
          boxShadow: '0 0 30px rgba(255, 184, 0, 0.3)'
        }
      },
      ghost: {
        background: 'transparent',
        color: '#FF6B00',
        border: 'none',
        fontFamily: 'Rajdhani, system-ui, sans-serif',
        hover: {
          color: '#FFB800',
          textShadow: '0 0 10px rgba(255, 184, 0, 0.6)'
        }
      }
    },

    card: {
      background: 'linear-gradient(180deg, rgba(139, 0, 0, 0.3) 0%, rgba(26, 10, 0, 0.8) 100%)',
      border: '1px solid rgba(255, 107, 0, 0.3)',
      borderRadius: '8px',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 184, 0, 0.1)',
      hover: {
        borderColor: 'rgba(255, 184, 0, 0.6)',
        boxShadow: '0 12px 48px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 184, 0, 0.2), inset 0 1px 0 rgba(255, 184, 0, 0.2)'
      }
    },

    input: {
      background: 'rgba(26, 10, 0, 0.8)',
      border: '2px solid rgba(255, 107, 0, 0.4)',
      borderRadius: '4px',
      color: '#FFB800',
      fontFamily: 'Share Tech Mono, monospace',
      padding: '12px 16px',
      focus: {
        borderColor: '#FFB800',
        boxShadow: '0 0 20px rgba(255, 184, 0, 0.3)',
        outline: 'none'
      },
      placeholder: {
        color: 'rgba(255, 107, 0, 0.5)'
      }
    },

    heading: {
      color: '#FFB800',
      fontFamily: 'Rajdhani, system-ui, sans-serif',
      fontWeight: '600',
      textShadow: '0 0 30px rgba(255, 184, 0, 0.5)',
      marginBottom: '1em'
    },

    link: {
      color: '#FF6B00',
      textDecoration: 'none',
      borderBottom: '1px solid transparent',
      transition: 'all 0.3s ease',
      hover: {
        color: '#FFB800',
        borderBottomColor: '#FFB800',
        textShadow: '0 0 10px rgba(255, 184, 0, 0.5)'
      }
    },

    powerMeter: {
      background: 'rgba(26, 10, 0, 0.9)',
      border: '2px solid #FF6B00',
      borderRadius: '8px',
      padding: '20px',
      label: {
        fontFamily: 'Orbitron, monospace',
        fontSize: '0.75rem',
        color: '#FF6B00',
        textTransform: 'uppercase',
        letterSpacing: '0.2em'
      },
      value: {
        fontFamily: 'Orbitron, monospace',
        fontSize: '2.5rem',
        fontWeight: '700',
        color: '#FFB800',
        textShadow: '0 0 20px rgba(255, 184, 0, 0.8)'
      },
      unit: {
        fontFamily: 'Orbitron, monospace',
        fontSize: '1rem',
        color: '#FF6B00',
        marginLeft: '8px'
      },
      meterBar: {
        height: '8px',
        background: 'rgba(139, 0, 0, 0.5)',
        borderRadius: '4px',
        overflow: 'hidden',
        marginTop: '12px'
      },
      meterFill: {
        height: '100%',
        background: 'linear-gradient(90deg, #FFB800, #FF6B00, #FF4500)',
        borderRadius: '4px',
        boxShadow: '0 0 20px rgba(255, 184, 0, 0.5)',
        transition: 'width 1s ease'
      }
    }
  },

  effects: {
    noiseTexture: {
      enabled: true,
      opacity: 0.03,
      url: 'data:image/svg+xml,%3Csvg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noise)"/%3E%3C/svg%3E'
    },
    
    grainOverlay: {
      enabled: true,
      opacity: 0.05,
      blendMode: 'overlay'
    },
    
    vignette: {
      enabled: true,
      intensity: '0.4',
      color: '#1A0A00'
    },
    
    coronaGlow: {
      enabled: true,
      blurRadius: '100px',
      color: '#FF6B00',
      opacity: 0.3
    }
  },

  layout: {
    maxWidth: '1200px',
    narrowWidth: '800px',
    fullBleed: true,
    
    grid: {
      columns: 12,
      gap: '24px',
      breakpoints: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px'
      }
    },
    
    sections: {
      hero: {
        minHeight: '100vh',
        fullBleed: true,
        centered: true
      },
      features: {
        padding: '96px 0',
        background: 'transparent'
      },
      cta: {
        padding: '128px 0',
        fullBleed: true
      }
    }
  },

  motion: {
    prefersReducedMotion: 'auto-detect',
    
    pageLoad: {
      enabled: true,
      sequence: [
        { element: '.stellar-bg', animation: 'fadeIn', duration: '1000ms', delay: '0ms' },
        { element: '.ring-1', animation: 'ringRotation', duration: '20000ms', delay: '200ms' },
        { element: '.ring-2', animation: 'ringCounterRotation', duration: '15000ms', delay: '400ms' },
        { element: '.ring-3', animation: 'ringRotation', duration: '25000ms', delay: '600ms' },
        { element: '.hero-content', animation: 'fadeInUp', duration: '800ms', delay: '800ms' },
        { element: '.energy-beam', animation: 'energyBeam', duration: '3000ms', delay: '1000ms' }
      ]
    },
    
    scrollAnimations: {
      enabled: true,
      triggers: [
        { selector: '.section-reveal', animation: 'fadeInUp', threshold: 0.2 },
        { selector: '.plasma-tendril', animation: 'plasmaTendril', threshold: 0.3 },
        { selector: '.solar-flare', animation: 'solarFlare', threshold: 0.4 }
      ]
    },
    
    microInteractions: {
      buttonHover: {
        animation: 'pulseGlow',
        duration: '500ms'
      },
      linkHover: {
        animation: 'flicker',
        duration: '200ms'
      }
    }
  }
};
