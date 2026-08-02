/**
 * Dyson Sphere - Stellar Animation Engine
 * Main controller for all stellar animations
 */

/* global StellarParticles, EnergyBeamManager */
class StellarEngine {
  constructor() {
    this.elements = {
      stellarParticles: document.getElementById('stellarParticles'),
      solarFlares: document.getElementById('solarFlares'),
      centralStar: document.querySelector('.central-star'),
      rings: document.querySelectorAll('.ring'),
      tendrils: document.querySelectorAll('.tendril'),
      beams: document.querySelectorAll('.beam'),
      collectors: document.querySelectorAll('.collector'),
    };

    this.particleSystem = null;
    this.beamManager = null;
    this.isRunning = false;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    this.initParticles();
    this.initScrollAnimations();
    this.initRevealAnimations();

    if (!this.prefersReducedMotion) {
      this.start();
    }
  }

  initParticles() {
    if (this.elements.stellarParticles) {
      this.particleSystem = new StellarParticles('#stellarParticles', {
        particleCount: 40,
        colors: ['#FFB800', '#FF6B00', '#FF4500', '#8B0000', '#FFFFFF'],
      });
    }

    if (this.elements.solarFlares) {
      this.beamManager = new EnergyBeamManager('.energy-beams');
    }
  }

  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');

          // Trigger solar flare on certain elements
          if (entry.target.classList.contains('feature-card')) {
            const rect = entry.target.getBoundingClientRect();
            this.createSolarFlare(rect.left + rect.width / 2, rect.top + rect.height / 2);
          }
        }
      });
    }, observerOptions);

    document.querySelectorAll('[data-reveal]').forEach((el) => {
      observer.observe(el);
    });
  }

  initRevealAnimations() {
    // Initial reveal for elements already in view
    setTimeout(() => {
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add('revealed');
        }
      });
    }, 100);
  }

  start() {
    this.isRunning = true;
    this.animate();
  }

  stop() {
    this.isRunning = false;
  }

  animate() {
    if (!this.isRunning) return;

    // Update any dynamic elements here
    this.updateDynamicElements();

    requestAnimationFrame(() => this.animate());
  }

  updateDynamicElements() {
    const time = Date.now() / 1000;

    // Subtle ring wobble
    this.elements.rings.forEach((ring, index) => {
      const wobble = Math.sin(time * 0.5 + index) * 0.5;
      const currentTransform = ring.style.transform || '';
      const baseTransform = currentTransform.replace(/rotate\([^)]*\)/, '').trim();
      // Don't override the animation transform
    });

    // Tendril movement
    this.elements.tendrils.forEach((tendril, index) => {
      // Tendrils use CSS animations, just update intensity here if needed
    });
  }

  createSolarFlare(x, y, intensity = 1) {
    if (!this.elements.solarFlares || this.prefersReducedMotion) return;

    const flare = document.createElement('div');
    flare.className = 'solar-flare';

    const rayCount = 12;
    const baseSize = 10 + intensity * 10;

    flare.style.cssText = `
      left: ${x}px;
      top: ${y}px;
      width: ${baseSize}px;
      height: ${baseSize}px;
      transform: translate(-50%, -50%);
    `;

    this.elements.solarFlares.appendChild(flare);

    // Create rays
    for (let i = 0; i < rayCount; i++) {
      const ray = document.createElement('div');
      const angle = (i / rayCount) * 360;
      const length = 30 + Math.random() * 50 * intensity;

      ray.style.cssText = `
        position: absolute;
        width: 2px;
        height: ${length}px;
        background: linear-gradient(to top, #FFB800, transparent);
        left: 50%;
        top: 50%;
        transform-origin: center bottom;
        transform: translate(-50%, -100%) rotate(${angle}deg);
        opacity: 0.8;
        animation: solarFlare 0.8s ease-out forwards;
        animation-delay: ${i * 20}ms;
      `;

      flare.appendChild(ray);
    }

    // Clean up after animation
    setTimeout(() => {
      if (flare.parentNode) {
        flare.parentNode.removeChild(flare);
      }
    }, 1200);
  }

  createRandomSolarFlare() {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight * 0.5; // Mostly in upper half
    this.createSolarFlare(x, y, 0.5 + Math.random() * 0.5);
  }

  startRandomFlares(interval = 5000) {
    this.flareInterval = setInterval(() => {
      this.createRandomSolarFlare();
    }, interval);
  }

  stopRandomFlares() {
    if (this.flareInterval) {
      clearInterval(this.flareInterval);
      this.flareInterval = null;
    }
  }

  destroy() {
    this.stop();
    this.stopRandomFlares();

    if (this.particleSystem) {
      this.particleSystem.destroy();
    }

    if (this.beamManager) {
      this.beamManager.destroy();
    }
  }
}

// Power Meter Controller
class PowerMeterController {
  constructor() {
    this.elements = {
      value: document.getElementById('powerValue'),
      fill: document.getElementById('powerFill'),
      captured: document.getElementById('readingCaptured'),
      converted: document.getElementById('readingConverted'),
      efficiency: document.getElementById('readingEfficiency'),
      stellarOutput: document.getElementById('stellarOutput'),
    };

    this.currentPower = 0;
    this.targetPower = 0;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    if (this.prefersReducedMotion) {
      this.setValues({
        power: 2.4,
        captured: 2400,
        converted: 2380,
        efficiency: 99.2,
        stellarOutput: 73,
      });
    } else {
      this.animateToTarget();
    }
  }

  setValues(values) {
    if (values.power !== undefined && this.elements.value) {
      this.elements.value.textContent = values.power.toFixed(1);
    }
    if (values.captured !== undefined && this.elements.captured) {
      this.elements.captured.textContent = this.formatNumber(values.captured);
    }
    if (values.converted !== undefined && this.elements.converted) {
      this.elements.converted.textContent = this.formatNumber(values.converted);
    }
    if (values.efficiency !== undefined && this.elements.efficiency) {
      this.elements.efficiency.textContent = values.efficiency.toFixed(1);
    }
    if (values.stellarOutput !== undefined && this.elements.stellarOutput) {
      this.elements.stellarOutput.textContent = values.stellarOutput;
    }
    if (values.fillPercent !== undefined && this.elements.fill) {
      this.elements.fill.style.width = `${values.fillPercent}%`;
    }
  }

  formatNumber(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  animateToTarget() {
    this.targetPower = 2.4 + Math.random() * 0.6;
    this.animate();
  }

  animate() {
    const diff = this.targetPower - this.currentPower;

    if (Math.abs(diff) > 0.01) {
      this.currentPower += diff * 0.05;

      const captured = this.currentPower * 1000;
      const converted = captured * (0.98 + Math.random() * 0.02);
      const efficiency = (converted / captured) * 100;
      const stellarOutput = (this.currentPower / 3.8) * 100;
      const fillPercent = (this.currentPower / 4) * 100;

      this.setValues({
        power: this.currentPower,
        captured: Math.round(captured),
        converted: Math.round(converted),
        efficiency,
        stellarOutput: Math.round(stellarOutput),
        fillPercent,
      });

      requestAnimationFrame(() => this.animate());
    } else {
      // Set new target after delay
      setTimeout(() => this.animateToTarget(), 2000 + Math.random() * 3000);
    }
  }
}

// Waveform Controller
class WaveformController {
  constructor() {
    this.path = document.getElementById('waveformPath');
    if (!this.path) return;

    this.points = [];
    this.pointCount = 50;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    this.generatePoints();
    this.updatePath();

    if (!this.prefersReducedMotion) {
      this.animate();
    }
  }

  generatePoints() {
    this.points = [];
    const width = 800;
    const height = 200;
    const midY = height / 2;

    for (let i = 0; i <= this.pointCount; i++) {
      const x = (i / this.pointCount) * width;
      const baseY = midY + Math.sin((i / this.pointCount) * Math.PI * 4) * 30;
      this.points.push({ x, y: baseY });
    }
  }

  updatePath() {
    if (this.points.length === 0) return;

    let d = `M ${this.points[0].x} ${this.points[0].y}`;

    for (let i = 1; i < this.points.length; i++) {
      const prev = this.points[i - 1];
      const curr = this.points[i];
      const cpx = (prev.x + curr.x) / 2;
      d += ` Q ${cpx} ${prev.y} ${curr.x} ${curr.y}`;
    }

    this.path.setAttribute('d', d);
  }

  animate() {
    const time = Date.now() / 1000;
    const width = 800;
    const height = 200;
    const midY = height / 2;

    for (let i = 0; i <= this.pointCount; i++) {
      const x = (i / this.pointCount) * width;
      const phase = (i / this.pointCount) * Math.PI * 4;
      const wave1 = Math.sin(phase + time * 2) * 25;
      const wave2 = Math.sin(phase + time * 3 + 1) * 15;
      const wave3 = Math.sin(phase + time * 0.5 + 2) * 10;

      this.points[i] = {
        x,
        y: midY + wave1 + wave2 + wave3,
      };
    }

    this.updatePath();
    requestAnimationFrame(() => this.animate());
  }
}

// Export for use
window.StellarEngine = StellarEngine;
window.PowerMeterController = PowerMeterController;
window.WaveformController = WaveformController;
