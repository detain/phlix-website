/**
 * ============================================================================
 *  Spark Particles — Ambient spark trail effect
 * ============================================================================
 * Creates and manages spark particles that trail across the screen
 * following cursor movement and random ambient emission.
 */

class SparkParticles {
  constructor(options = {}) {
    this.canvas = document.getElementById('spark-canvas');
    if (!this.canvas) {
      this.canvas = this.createCanvas();
    }

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.mouseX = -1000;
    this.mouseY = -1000;
    this.isActive = false;

    this.options = {
      particleCount: 60,
      particleLife: 1.5,
      particleSpeed: 2,
      particleSize: 3,
      emitRate: 0.3,
      colors: ['#FF9F1A', '#E71D36', '#2EC4B6', '#FFD60A'],
      gravity: 0.15,
      friction: 0.98,
      ...options
    };

    this.init();
  }

  createCanvas() {
    const canvas = document.createElement('canvas');
    canvas.id = 'spark-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(canvas, document.body.firstChild);
    return canvas;
  }

  init() {
    this.resize();
    window.addEventListener('resize', this.debounce(() => this.resize(), 250));

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });

    document.addEventListener('mouseleave', () => {
      this.mouseX = -1000;
      this.mouseY = -1000;
    });

    // Touch support
    document.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.mouseX = e.touches[0].clientX;
        this.mouseY = e.touches[0].clientY;
        this.emitFromMouse(3);
      }
    }, { passive: true });

    document.addEventListener('touchend', () => {
      this.mouseX = -1000;
      this.mouseY = -1000;
    });

    // Emit sparks on click
    document.addEventListener('click', (e) => {
      if (this.reducedMotion) return;
      this.emitBurst(e.clientX, e.clientY, 12);
    });

    // Emit sparks on hover for nav links
    document.querySelectorAll('.nav-link, .btn, .feature-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (this.reducedMotion) return;
        const rect = el.getBoundingClientRect();
        this.emitBurst(
          rect.left + rect.width / 2,
          rect.top + rect.height / 2,
          5
        );
      });
    });

    // Listen for reduced motion changes
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      this.reducedMotion = e.matches;
    });

    if (!this.reducedMotion) {
      this.animate();
      this.startAmbientEmission();
    }
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticle(x, y, vx, vy, options = {}) {
    const angle = Math.random() * Math.PI * 2;
    const speed = options.speed || this.options.particleSpeed * (0.5 + Math.random());

    return {
      x: x,
      y: y,
      vx: vx !== undefined ? vx : Math.cos(angle) * speed,
      vy: vy !== undefined ? vy : Math.sin(angle) * speed,
      size: options.size || this.options.particleSize * (0.5 + Math.random()),
      color: options.color || this.options.colors[Math.floor(Math.random() * this.options.colors.length)],
      life: this.options.particleLife,
      maxLife: this.options.particleLife,
      gravity: options.gravity !== undefined ? options.gravity : this.options.gravity,
      friction: this.options.friction,
      trail: [],
      maxTrail: 8
    };
  }

  emitFromMouse(count = 3) {
    if (this.mouseX < 0 || this.reducedMotion) return;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = this.options.particleSpeed * (0.3 + Math.random() * 0.7);
      const particle = this.createParticle(
        this.mouseX,
        this.mouseY,
        Math.cos(angle) * speed,
        Math.sin(angle) * speed
      );
      this.particles.push(particle);
    }

    this.isActive = true;
  }

  emitBurst(x, y, count = 15) {
    if (this.reducedMotion) return;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
      const speed = this.options.particleSpeed * (0.8 + Math.random() * 1.2);
      const particle = this.createParticle(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed);
      particle.size *= 1.2;
      this.particles.push(particle);
    }
  }

  startAmbientEmission() {
    // Emit ambient sparks periodically
    setInterval(() => {
      if (this.reducedMotion) return;
      if (Math.random() < this.options.emitRate) {
        const x = Math.random() * this.canvas.width;
        const y = this.canvas.height + 20;
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.5;
        const speed = this.options.particleSpeed * (0.5 + Math.random() * 0.5);
        const particle = this.createParticle(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed);
        this.particles.push(particle);
      }
    }, 100);
  }

  update(deltaTime) {
    const dt = deltaTime / 16.67; // Normalize to 60fps

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      // Store trail position
      p.trail.push({ x: p.x, y: p.y });
      if (p.trail.length > p.maxTrail) {
        p.trail.shift();
      }

      // Apply physics
      p.vy += p.gravity * dt;
      p.vx *= p.friction;
      p.vy *= p.friction;
      p.x += p.vx * dt;
      p.y += p.vy * dt;

      // Decay life
      p.life -= (deltaTime / 1000);

      // Remove dead particles
      if (p.life <= 0 || p.y > this.canvas.height + 50 || p.x < -50 || p.x > this.canvas.width + 50) {
        this.particles.splice(i, 1);
      }
    }

    // Limit particle count
    while (this.particles.length > this.options.particleCount) {
      this.particles.shift();
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(p => {
      const lifeRatio = p.life / p.maxLife;
      const alpha = Math.min(lifeRatio * 1.5, 1);

      // Draw trail
      if (p.trail.length > 1) {
        this.ctx.beginPath();
        this.ctx.moveTo(p.trail[0].x, p.trail[0].y);

        for (let i = 1; i < p.trail.length; i++) {
          this.ctx.lineTo(p.trail[i].x, p.trail[i].y);
        }

        this.ctx.strokeStyle = p.color;
        this.ctx.lineWidth = p.size * 0.5;
        this.ctx.lineCap = 'round';
        this.ctx.globalAlpha = alpha * 0.4;
        this.ctx.stroke();
      }

      // Draw particle with glow
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size * lifeRatio, 0, Math.PI * 2);

      // Glow effect
      const gradient = this.ctx.createRadialGradient(
        p.x, p.y, 0,
        p.x, p.y, p.size * 2
      );
      gradient.addColorStop(0, p.color);
      gradient.addColorStop(0.4, p.color);
      gradient.addColorStop(1, 'transparent');

      this.ctx.fillStyle = gradient;
      this.ctx.globalAlpha = alpha;
      this.ctx.fill();

      // Core
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size * 0.5 * lifeRatio, 0, Math.PI * 2);
      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.globalAlpha = alpha * 0.8;
      this.ctx.fill();
    });

    this.ctx.globalAlpha = 1;
  }

  animate() {
    if (this.reducedMotion) return;

    let lastTime = performance.now();

    const loop = (currentTime) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      // Emit sparks near mouse if active
      if (this.isActive && Math.random() < 0.3) {
        this.emitFromMouse(1);
      }

      this.update(deltaTime);
      this.draw();

      this.animationId = requestAnimationFrame(loop);
    };

    this.animationId = requestAnimationFrame(loop);
  }

  debounce(func, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    window.sparkParticles = new SparkParticles();
  }
});
