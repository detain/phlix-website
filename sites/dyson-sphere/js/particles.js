/**
 * Dyson Sphere - Stellar Particles System
 * Creates and manages floating stellar matter particles
 */

class StellarParticles {
  constructor(containerSelector, options = {}) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;
    
    this.options = {
      particleCount: options.particleCount || 50,
      minSize: options.minSize || 1,
      maxSize: options.maxSize || 8,
      colors: options.colors || ['#FFB800', '#FF6B00', '#FF4500', '#8B0000'],
      animationDuration: options.animationDuration || 15,
      animationDelay: options.animationDelay || 2,
      initialOpacity: options.initialOpacity || 0.6,
     ...options
    };
    
    this.particles = [];
    this.isRunning = false;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    this.init();
  }
  
  init() {
    this.createParticles();
    if (!this.prefersReducedMotion) {
      this.startAnimation();
    }
  }
  
  createParticles() {
    for (let i = 0; i < this.options.particleCount; i++) {
      const particle = this.createParticle(i);
      this.particles.push(particle);
      this.container.appendChild(particle.element);
    }
  }
  
  createParticle(index) {
    const size = this.randomBetween(this.options.minSize, this.options.maxSize);
    const color = this.options.colors[Math.floor(Math.random() * this.options.colors.length)];
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = this.options.animationDuration + this.randomBetween(-5, 5);
    const delay = (index * this.options.animationDelay) % 20;
    
    const element = document.createElement('div');
    element.className = 'particle';
    element.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      left: ${x}%;
      top: ${y}%;
      opacity: ${this.options.initialOpacity};
      animation: stellarDrift ${duration}s ease-in-out infinite;
      animation-delay: ${delay}s;
      box-shadow: 0 0 ${size * 2}px ${color};
    `;
    
    return {
      element,
      size,
      color,
      x,
      y,
      duration,
      delay
    };
  }
  
  randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  startAnimation() {
    this.isRunning = true;
    this.animate();
  }
  
  stopAnimation() {
    this.isRunning = false;
  }
  
  animate() {
    if (!this.isRunning) return;
    
    // Subtle movement update for continuous drift
    this.particles.forEach((particle, index) => {
      const time = Date.now() / 1000;
      const offsetX = Math.sin(time + index) * 2;
      const offsetY = Math.cos(time + index * 0.7) * 2;
      
      particle.element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
    
    requestAnimationFrame(() => this.animate());
  }
  
  addParticle() {
    const index = this.particles.length;
    const particle = this.createParticle(index);
    this.particles.push(particle);
    this.container.appendChild(particle.element);
  }
  
  removeParticle() {
    if (this.particles.length === 0) return;
    
    const particle = this.particles.pop();
    if (particle && particle.element.parentNode) {
      particle.element.parentNode.removeChild(particle.element);
    }
  }
  
  updateCount(newCount) {
    const currentCount = this.particles.length;
    
    if (newCount > currentCount) {
      for (let i = currentCount; i < newCount; i++) {
        this.addParticle();
      }
    } else if (newCount < currentCount) {
      for (let i = currentCount; i > newCount; i--) {
        this.removeParticle();
      }
    }
  }
  
  destroy() {
    this.stopAnimation();
    this.particles.forEach(particle => {
      if (particle.element.parentNode) {
        particle.element.parentNode.removeChild(particle.element);
      }
    });
    this.particles = [];
  }
}

// Export for use
window.StellarParticles = StellarParticles;
