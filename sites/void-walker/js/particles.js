/**
 * Void Walker - Floating Debris Particle System
 * Creates and animates particles orbiting in gravity wells
 */

class DebrisSystem {
  constructor(container, options = {}) {
    this.container = container;
    this.particleCount = options.particleCount || 30;
    this.colors = options.colors || [
      'rgba(108, 99, 255, 0.6)', // rift-violet
      'rgba(108, 99, 255, 0.4)', // rift-violet dim
      'rgba(232, 232, 240, 0.3)', // membrane-white
      'rgba(255, 107, 107, 0.3)', // shadow-coral
    ];
    this.minSize = options.minSize || 1;
    this.maxSize = options.maxSize || 4;
    this.minOrbitRadius = options.minOrbitRadius || 50;
    this.maxOrbitRadius = options.maxOrbitRadius || 250;
    this.minDuration = options.minDuration || 15;
    this.maxDuration = options.maxDuration || 40;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.particles = [];
    this.init();
  }

  init() {
    if (this.reducedMotion) {
      this.createStaticParticles();
      return;
    }

    this.createParticles();
    this.animate();
  }

  createStaticParticles() {
    // Create a few static particles for reduced motion
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement('div');
      particle.className = 'debris-particle';
      particle.style.cssText = `
        position: absolute;
        width: ${this.randomBetween(this.minSize, this.maxSize * 1.5)}px;
        height: ${this.randomBetween(this.minSize, this.maxSize * 1.5)}px;
        background: ${this.randomFrom(this.colors)};
        border-radius: 50%;
        left: ${this.randomBetween(5, 95)}%;
        top: ${this.randomBetween(5, 95)}%;
        opacity: 0.3;
      `;
      this.container.appendChild(particle);
      this.particles.push({ element: particle, active: true });
    }
  }

  createParticles() {
    for (let i = 0; i < this.particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'debris-particle';

      const size = this.randomBetween(this.minSize, this.maxSize);
      const orbitRadius = this.randomBetween(this.minOrbitRadius, this.maxOrbitRadius);
      const duration = this.randomBetween(this.minDuration, this.maxDuration);
      const delay = this.randomBetween(0, duration);
      const startAngle = this.randomBetween(0, 360);

      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        --orbit-radius: ${orbitRadius}px;
        animation-duration: ${duration}s;
        animation-delay: -${delay}s;
        background: ${this.randomFrom(this.colors)};
      `;

      // Set initial position
      const initialX = Math.cos((startAngle * Math.PI) / 180) * orbitRadius;
      const initialY = Math.sin((startAngle * Math.PI) / 180) * orbitRadius;

      this.container.appendChild(particle);
      this.particles.push({
        element: particle,
        x: initialX,
        y: initialY,
        active: true,
      });
    }
  }

  animate() {
    if (this.reducedMotion) return;

    // Particles are animated via CSS, no JS animation needed
    // This method can be used for additional JS-controlled behavior
  }

  randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  randomFrom(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  update() {
    // For future use if we need to update particle positions dynamically
  }

  destroy() {
    this.particles.forEach((p) => {
      if (p.element && p.element.parentNode) {
        p.element.parentNode.removeChild(p.element);
      }
    });
    this.particles = [];
  }
}

// Initialize when DOM is ready
function initDebrisSystem() {
  const container = document.getElementById('debris-container');
  if (!container) return;

  // Only run on pages that need particles
  if (!document.querySelector('.hero, .features-section, .shift-section')) {
    return;
  }

  // Reduced motion check
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    new DebrisSystem(container, { particleCount: 15 });
    return;
  }

  const debris = new DebrisSystem(container, {
    particleCount: 35,
    colors: [
      'rgba(108, 99, 255, 0.5)',
      'rgba(108, 99, 255, 0.3)',
      'rgba(232, 232, 240, 0.25)',
      'rgba(255, 107, 107, 0.25)',
    ],
    minOrbitRadius: 80,
    maxOrbitRadius: 350,
    minDuration: 20,
    maxDuration: 50,
  });

  // Store reference for cleanup
  window.debrisSystem = debris;
}

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Initialize on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDebrisSystem);
} else {
  initDebrisSystem();
}

// Reinitialize on resize (debounced)
const debouncedInit = debounce(initDebrisSystem, 250);
window.addEventListener('resize', debouncedInit);

export { DebrisSystem, initDebrisSystem };
