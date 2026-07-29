/**
 * Neural-Link Brand Kit
 * Brain-Computer Interface Aesthetic
 * Archetype: Sage (intelligent, neural, connected)
 * Experience Archetype: Immersive
 */

export const neuralLink = {
  name: 'Neural-Link',
  slug: 'neural-link',
  concept: 'Direct brain-to-media interface aesthetic',
  archetype: 'sage',
  experienceArchetype: 'immersive',

  palette: {
    primary: '#FF00FF',
    secondary: '#00FFFF',
    dark: '#1A1A2E',
    darkMid: '#2D2D44',
    accent: '#9D4EDD',
    colors: ['#FF00FF', '#00FFFF', '#1A1A2E', '#2D2D44', '#9D4EDD']
  },

  typography: {
    displayFont: '"Orbitron", "Rajdhani", sans-serif',
    bodyFont: '"Exo 2", "Monda", sans-serif',
    accentFont: '"Share Tech Mono", monospace'
  },

  elements: [
    { name: 'Brain Scan Patterns', description: 'EEG-style wave visualizations' },
    { name: 'Synapse Flashes', description: 'Neural pathway light bursts' },
    { name: 'Memory Cubes', description: '3D cubic memory storage units' },
    { name: 'Thought Bubbles', description: 'Cerebral cloud formations' }
  ],

  motion: {
    effects: [
      { name: 'Synaptic Firing', description: 'Burst animations along neural paths' },
      { name: 'Memory Retrieval Pulses', description: 'Cascading data access waves' },
      { name: 'Neural Network Animations', description: 'Node connection animations' }
    ],
    prefersReducedMotion: true
  },

  layout: {
    features: [
      { name: 'Memory Palace', description: 'Spatial navigation for collections' }
    ],
    style: 'immersive-grid'
  },

  visualEffects: {
    gradients: [
      'linear-gradient(135deg, #FF00FF 0%, #9D4EDD 50%, #00FFFF 100%)',
      'radial-gradient(circle at 20% 80%, #9D4EDD 0%, transparent 50%)',
      'radial-gradient(circle at 80% 20%, #00FFFF 0%, transparent 40%)'
    ],
    patterns: [
      'neural-network',
      'brain-scan',
      'synaptic-web'
    ],
    textures: [
      'subtle-noise',
      'circuit-trace'
    ]
  },

  animations: {
    synapticFiring: {
      keyframes: [
        { transform: 'scale(1)', opacity: 1 },
        { transform: 'scale(1.5)', opacity: 0.8 },
        { transform: 'scale(2)', opacity: 0 }
      ],
      duration: '600ms',
      timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      iteration: 3
    },
    memoryPulse: {
      keyframes: [
        { boxShadow: '0 0 0 0 rgba(157, 78, 221, 0.4)' },
        { boxShadow: '0 0 20px 10px rgba(157, 78, 221, 0.2)' },
        { boxShadow: '0 0 40px 20px rgba(0, 255, 255, 0.1)' }
      ],
      duration: '800ms',
      timing: 'ease-out'
    },
    thoughtBubble: {
      keyframes: [
        { transform: 'scale(0.8)', opacity: 0 },
        { transform: 'scale(1.1)', opacity: 0.7 },
        { transform: 'scale(1)', opacity: 1 }
      ],
      duration: '500ms',
      timing: 'ease-out'
    }
  },

  components: {
    buttons: {
      primary: {
        background: 'linear-gradient(135deg, #FF00FF 0%, #9D4EDD 100%)',
        border: '1px solid #00FFFF',
        boxShadow: '0 0 15px rgba(255, 0, 255, 0.3), inset 0 0 15px rgba(0, 255, 255, 0.1)'
      },
      secondary: {
        background: 'transparent',
        border: '2px solid #00FFFF',
        boxShadow: '0 0 10px rgba(0, 255, 255, 0.2)'
      }
    },
    cards: {
      background: 'linear-gradient(180deg, rgba(45, 45, 68, 0.9) 0%, rgba(26, 26, 46, 0.95) 100%)',
      border: '1px solid rgba(157, 78, 221, 0.3)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 60px rgba(157, 78, 221, 0.1)'
    },
    inputs: {
      background: 'rgba(26, 26, 46, 0.8)',
      border: '1px solid #9D4EDD',
      focusBoxShadow: '0 0 20px rgba(157, 78, 221, 0.4)',
      fontFamily: '"Share Tech Mono", monospace'
    }
  },

  spatial: {
    containerMaxWidth: '1400px',
    spacingUnit: '8px',
    gridGutter: '24px'
  },

  responsive: {
    mobileBreakpoint: '768px',
    tabletBreakpoint: '1024px',
    desktopBreakpoint: '1440px'
  }
};

export default neuralLink;
