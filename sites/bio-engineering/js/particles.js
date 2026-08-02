/**
 * Bio-Engineering Theme - Particle System
 * Bioluminescent floating particles
 */

export class ParticleSystem {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      particleCount: options.particleCount || 20,
      colors: options.colors || ['#00FF87', '#00B4D8', '#7B2CBF'],
      minSize: options.minSize || 3,
      maxSize: options.maxSize || 6,
      minSpeed: options.minSpeed || 0.5,
      maxSpeed: options.maxSpeed || 1.5,
      fadeSpeed: options.fadeSpeed || 0.005,
    };

    this.particles = [];
    this.isRunning = false;
    this.animationId = null;
  }

  createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const size = this.randomBetween(this.options.minSize, this.options.maxSize);
    const color = this.options.colors[Math.floor(Math.random() * this.options.colors.length)];

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = color;
    particle.style.boxShadow = `0 0 ${size * 3}px ${color}, 0 0 ${size * 6}px ${color}`;
    particle.style.left = `${this.randomBetween(5, 95)}%`;
    particle.style.bottom = '-20px';
    particle.style.opacity = '0';
    particle.style.animationDuration = `${this.randomBetween(8, 15)}s`;
    particle.style.animationDelay = `${this.randomBetween(0, 5)}s`;

    return particle;
  }

  spawnParticle() {
    if (!this.container || this.particles.length >= this.options.particleCount) return;

    const particle = this.createParticle();
    this.container.appendChild(particle);

    this.particles.push({
      element: particle,
      x: parseFloat(particle.style.left),
      y: -20,
      speed: this.randomBetween(this.options.minSpeed, this.options.maxSpeed),
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: this.randomBetween(0.01, 0.03),
    });
  }

  updateParticles() {
    this.particles.forEach((particle, index) => {
      particle.y += particle.speed;
      particle.wobble += particle.wobbleSpeed;

      const wobbleX = Math.sin(particle.wobble) * 2;
      const opacity = this.calculateOpacity(particle.y);

      particle.element.style.transform = `translateY(${particle.y}px) translateX(${wobbleX}px)`;
      particle.element.style.opacity = opacity;

      // Remove particles that have floated off screen
      if (particle.y > window.innerHeight + 50) {
        particle.element.remove();
        this.particles.splice(index, 1);
      }
    });
  }

  calculateOpacity(y) {
    const windowHeight = window.innerHeight;
    const fadeInEnd = windowHeight * 0.1;
    const fadeOutStart = windowHeight * 0.8;

    if (y < fadeInEnd) {
      return (y / fadeInEnd) * 0.8;
    } else if (y > fadeOutStart) {
      return Math.max(0, 0.8 * (1 - (y - fadeOutStart) / (windowHeight * 0.2)));
    }
    return 0.8;
  }

  randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  animate() {
    if (!this.isRunning) return;

    this.updateParticles();

    // Spawn new particles occasionally
    if (Math.random() < 0.02 && this.particles.length < this.options.particleCount) {
      this.spawnParticle();
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  start() {
    if (this.isRunning) return;

    this.isRunning = true;

    // Initial particle spawn
    for (let i = 0; i < Math.min(8, this.options.particleCount); i++) {
      setTimeout(() => this.spawnParticle(), i * 300);
    }

    this.animate();
  }

  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  destroy() {
    this.stop();
    this.particles.forEach((p) => p.element.remove());
    this.particles = [];
  }
}

export default ParticleSystem;
