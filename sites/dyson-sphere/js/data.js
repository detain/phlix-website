/**
 * Dyson Sphere - Site Data
 * Configuration and data for the site
 */

const SITE_CONFIG = {
  name: 'Dyson Sphere',
  tagline: 'Harness the Power of Entire Stars',
  description: 'Stellar megastructure brand kit for Type II Kardashev civilizations',
  version: '1.0.0',
  author: 'PHLIX Brand Team',
  year: new Date().getFullYear(),

  // API endpoints (placeholder)
  endpoints: {
    contact: '/api/contact',
    subscribe: '/api/subscribe',
    status: '/api/status',
  },

  // Animation settings
  animations: {
    particleCount: 40,
    flareInterval: 6000,
    waveformUpdateRate: 60,
    powerMeterUpdateRate: 50,
  },

  // Feature data
  features: [
    {
      id: 'stellar-capture',
      title: 'Stellar Capture',
      description: 'Full-spectrum energy harvesters extract power from every wavelength.',
      stat: { value: '99.7%', label: 'Capture Efficiency' },
      icon: 'stellar-capture',
    },
    {
      id: 'plasma-conversion',
      title: 'Plasma Conversion',
      description: 'Advanced fusion reactors convert captured stellar matter.',
      stat: { value: '2.4 PW', label: 'Output Capacity' },
      icon: 'plasma-conversion',
    },
    {
      id: 'megastructure-routing',
      title: 'Megastructure Routing',
      description: 'Intelligent orbital rings route energy across the construct.',
      stat: { value: '<1ms', label: 'Signal Latency' },
      icon: 'megastructure-routing',
    },
    {
      id: 'autonomous-maintenance',
      title: 'Autonomous Operation',
      description: 'Self-replicating nanomachine swarms maintain the structure.',
      stat: { value: '99.99%', label: 'Uptime Guarantee' },
      icon: 'autonomous-maintenance',
    },
  ],

  // Technical specifications
  specs: [
    { label: 'Dyson Swarm Diameter', value: '2.8 AU' },
    { label: 'Energy Collectors', value: '4.2 million' },
    { label: 'Total Collection Area', value: '5.5 × 10^16 m²' },
    { label: 'Peak Power Output', value: '3.846 × 10^26 W' },
    { label: 'Ring Rotation Period', value: '247 days' },
    { label: 'Plasma Temperature', value: '15,000,000 K' },
    { label: 'Maintenance Cycles', value: 'Continuous' },
    { label: 'Design Lifetime', value: 'Billions of years' },
  ],

  // Power meter readings
  powerReadings: {
    peakPower: 3.846,
    currentPower: 2.4,
    capturedTW: 2400,
    convertedTW: 2380,
    efficiency: 99.2,
    stellarOutput: 73,
  },
};

// Export for use
window.SITE_CONFIG = SITE_CONFIG;
