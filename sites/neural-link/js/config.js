/**
 * Neural-Link Configuration
 * Global Settings and Constants
 */

export const config = {
  name: 'Neural-Link',
  version: '4.2.1',
  build: '2026.07.28',

  api: {
    endpoint: '/api/neural-link',
    timeout: 30000,
    retryAttempts: 3
  },

  animation: {
    duration: {
      fast: 150,
      normal: 300,
      slow: 600,
      verySlow: 1000
    },
    easing: {
      standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }
  },

  neural: {
    nodeCount: 15,
    connectionDistance: 150,
    pulseSpeed: 0.05,
    synapticDelay: 150
  },

  memory: {
    roomsPerPage: 6,
    autoAdvance: false,
    autoAdvanceDelay: 10000
  },

  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1440
  },

  colors: {
    primary: '#FF00FF',
    secondary: '#00FFFF',
    dark: '#1A1A2E',
    darkMid: '#2D2D44',
    accent: '#9D4EDD'
  },

  accessibility: {
    reducedMotion: true,
    highContrast: false,
    largeText: false
  }
};

export default config;
