/**
 * Dyson Sphere - Energy Beam Effects
 * Creates animated energy collection beams
 */

class EnergyBeam {
  constructor(options = {}) {
    this.element = null;
    this.options = {
      width: options.width || 2,
      length: options.length || 200,
      color: options.color || '#FF6B00',
      position: options.position || { x: 50, y: 50 },
      angle: options.angle || 0,
      duration: options.duration || 3,
      delay: options.delay || 0,
      ...options,
    };

    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isAnimating = false;
  }

  create() {
    this.element = document.createElement('div');
    this.element.className = 'energy-beam animate-energy-beam';

    const gradient = `linear-gradient(90deg, transparent, ${this.options.color}, ${this.options.color}, transparent)`;

    this.element.style.cssText = `
      position: absolute;
      width: ${this.options.length}px;
      height: ${this.options.width}px;
      background: ${gradient};
      background-size: 200% 100%;
      left: ${this.options.position.x}%;
      top: ${this.options.position.y}%;
      transform: rotate(${this.options.angle}deg);
      transform-origin: left center;
      opacity: 0.6;
      filter: blur(1px);
      box-shadow: 0 0 10px ${this.options.color};
      animation: energyBeam ${this.options.duration}s ease-in-out infinite;
      animation-delay: ${this.options.delay}s;
    `;

    return this.element;
  }

  attachTo(container) {
    if (!this.element) {
      this.create();
    }
    container.appendChild(this.element);
    this.isAnimating = true;
  }

  detach() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
    this.isAnimating = false;
  }

  updatePosition(x, y) {
    this.options.position.x = x;
    this.options.position.y = y;
    if (this.element) {
      this.element.style.left = `${x}%`;
      this.element.style.top = `${y}%`;
    }
  }

  updateAngle(angle) {
    this.options.angle = angle;
    if (this.element) {
      this.element.style.transform = `rotate(${angle}deg)`;
    }
  }

  setIntensity(value) {
    // Value from 0 to 1
    const opacity = 0.3 + value * 0.7;
    const blur = 1 + value * 2;
    const boxShadow = `0 0 ${10 + value * 20}px ${this.options.color}`;

    if (this.element) {
      this.element.style.opacity = opacity;
      this.element.style.filter = `blur(${blur}px)`;
      this.element.style.boxShadow = boxShadow;
    }
  }

  destroy() {
    this.detach();
    this.element = null;
  }
}

class EnergyBeamManager {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;

    this.beams = [];
    this.beamConfigs = [
      { length: 150, angle: -15, delay: 0 },
      { length: 200, angle: 5, delay: 1 },
      { length: 180, angle: 25, delay: 2 },
      { length: 120, angle: -35, delay: 0.5 },
      { length: 160, angle: 45, delay: 1.5 },
    ];

    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    if (this.prefersReducedMotion) return;
    this.createBeams();
  }

  createBeams() {
    const centerX = 50;
    const centerY = 50;

    this.beamConfigs.forEach((config, index) => {
      const beam = new EnergyBeam({
        length: config.length,
        angle: config.angle,
        delay: config.delay,
        position: { x: centerX, y: centerY + index * 5 },
        color: index % 2 === 0 ? '#FF6B00' : '#FF4500',
      });

      beam.attachTo(this.container);
      this.beams.push(beam);
    });
  }

  pulseAll(intensity = 1) {
    this.beams.forEach((beam, index) => {
      setTimeout(() => {
        beam.setIntensity(intensity);
      }, index * 100);
    });
  }

  setGlobalIntensity(intensity) {
    this.beams.forEach((beam) => {
      beam.setIntensity(intensity);
    });
  }

  addBeam(config) {
    const beam = new EnergyBeam(config);
    beam.attachTo(this.container);
    this.beams.push(beam);
    return beam;
  }

  removeBeam(index) {
    if (index >= 0 && index < this.beams.length) {
      this.beams[index].destroy();
      this.beams.splice(index, 1);
    }
  }

  destroy() {
    this.beams.forEach((beam) => beam.destroy());
    this.beams = [];
  }
}

// Export for use
window.EnergyBeam = EnergyBeam;
window.EnergyBeamManager = EnergyBeamManager;
