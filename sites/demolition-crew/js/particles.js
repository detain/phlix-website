/* ============================================================================
   PARTICLES.JS — Demolition Crew
   Debris particle system — angular fragments falling with gravity
   ============================================================================ */

class DebrisParticleSystem {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.raf = null;
    this.options = {
      count: options.count ?? 40,
      colors: options.colors ?? ['#FF3838', '#FFD93D', '#6C5CE7', '#2D3436', '#636E72'],
      minSize: options.minSize ?? 3,
      maxSize: options.maxSize ?? 12,
      minSpeed: options.minSpeed ?? 1,
      maxSpeed: options.maxSpeed ?? 4,
      rotationSpeed: options.rotationSpeed ?? 2,
      gravity: options.gravity ?? 0.15,
      fadeThreshold: 0.3,
      ...options,
    };

    this._prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this._init();
  }

  _init() {
    this._resize();
    window.addEventListener('resize', () => this._resize());
    this._prefersReducedMotion ? this._renderStatic() : this._start();
  }

  _resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    if (this._prefersReducedMotion) this._renderStatic();
  }

  _createParticle(forceY = null) {
    const size = this._rand(this.options.minSize, this.options.maxSize);
    return {
      x: Math.random() * this.width,
      y: forceY !== null ? forceY : Math.random() * -this.height,
      vx: (Math.random() - 0.5) * this.options.maxSpeed,
      vy: this._rand(this.options.minSpeed, this.options.maxSpeed),
      size,
      color: this.options.colors[Math.floor(Math.random() * this.options.colors.length)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * this.options.rotationSpeed,
      opacity: 1,
      // Angular debris shape vertices
      vertices: this._generateDebrisShape(3 + Math.floor(Math.random() * 3)),
    };
  }

  _generateDebrisShape(vertices) {
    const points = [];
    for (let i = 0; i < vertices; i++) {
      const angle = (i / vertices) * Math.PI * 2;
      const radius = 0.5 + Math.random() * 0.5;
      points.push({ x: Math.cos(angle) * radius, y: Math.sin(angle) * radius });
    }
    return points;
  }

  _rand(min, max) {
    return min + Math.random() * (max - min);
  }

  _start() {
    // Initial batch
    for (let i = 0; i < this.options.count; i++) {
      const p = this._createParticle();
      p.y = Math.random() * this.height; // scatter across viewport initially
      this.particles.push(p);
    }
    this._loop();
  }

  _loop() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this._update();
    this._draw();
    this.raf = requestAnimationFrame(() => this._loop());
  }

  _update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += this.options.gravity;
      p.rotation += p.rotationSpeed * 0.02;
      p.opacity -= 0.003;

      if (p.y > this.height + 50 || p.opacity <= 0) {
        this.particles.splice(i, 1);
        this.particles.push(this._createParticle());
      }
    }
    // Maintain count
    while (this.particles.length < this.options.count) {
      this.particles.push(this._createParticle());
    }
  }

  _draw() {
    for (const p of this.particles) {
      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);
      this.ctx.globalAlpha = Math.max(0, p.opacity);
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      const v = p.vertices;
      this.ctx.moveTo(v[0].x * p.size, v[0].y * p.size);
      for (let i = 1; i < v.length; i++) {
        this.ctx.lineTo(v[i].x * p.size, v[i].y * p.size);
      }
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.restore();
    }
  }

  _renderStatic() {
    // Static dust overlay for reduced motion
    this.ctx.clearRect(0, 0, this.width, this.height);
    const gradient = this.ctx.createRadialGradient(
      this.width * 0.5,
      this.height,
      0,
      this.width * 0.5,
      this.height,
      this.height * 0.6,
    );
    gradient.addColorStop(0, 'rgba(45,52,54,0.7)');
    gradient.addColorStop(1, 'transparent');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  destroy() {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.particles = [];
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}

export default DebrisParticleSystem;
