/**
 * Neural-Link Main JavaScript
 * Brain-Computer Interface Core Functionality
 */

class NeuralInterface {
  constructor() {
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.nodes = [];
    this.canvas = null;
    this.ctx = null;
    this.animationId = null;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initCounters();
    this.setupMobileMenu();
    this.setupFormHandling();
    this.setupScrollAnimations();

    if (!this.reducedMotion) {
      this.initBrainScan();
    }
  }

  setupEventListeners() {
    const synapticBtns = document.querySelectorAll('[data-effect="synaptic"]');
    synapticBtns.forEach(btn => {
      btn.addEventListener('click', (e) => this.handleSynapticEffect(e));
    });

    const pulseBtns = document.querySelectorAll('[data-effect="pulse"]');
    pulseBtns.forEach(btn => {
      btn.addEventListener('click', (e) => this.handlePulseEffect(e));
    });
  }

  handleSynapticEffect(e) {
    if (this.reducedMotion) return;

    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    this.createSynapticBurst(x, y);
  }

  handlePulseEffect(e) {
    if (this.reducedMotion) return;

    const btn = e.currentTarget;
    btn.classList.add('memory-pulse');

    setTimeout(() => {
      btn.classList.remove('memory-pulse');
    }, 800);

    const memoryPalace = document.getElementById('memory-palace');
    if (memoryPalace) {
      memoryPalace.scrollIntoView({ behavior: 'smooth' });
    }
  }

  createSynapticBurst(x, y) {
    const burst = document.createElement('div');
    burst.className = 'synaptic-burst';
    burst.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 10px;
      height: 10px;
      background: #FF00FF;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
    `;

    document.body.appendChild(burst);

    if (!this.reducedMotion) {
      burst.animate([
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
        { transform: 'translate(-50%, -50%) scale(30)', opacity: 0 }
      ], {
        duration: 600,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }).onfinish = () => burst.remove();
    } else {
      burst.remove();
    }
  }

  initCounters() {
    const counters = document.querySelectorAll('[data-count]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const count = parseFloat(target.dataset.count);
          this.animateCounter(target, count);
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  animateCounter(element, target) {
    const duration = 2000;
    const start = performance.now();
    const isDecimal = target % 1 !== 0;

    const update = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = target * easeProgress;

      element.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    if (this.reducedMotion) {
      element.textContent = isDecimal ? target.toFixed(1) : target;
    } else {
      requestAnimationFrame(update);
    }
  }

  setupMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
      menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');
      });

      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('active');
          menuBtn.classList.remove('active');
        });
      });
    }
  }

  setupFormHandling() {
    const forms = document.querySelectorAll('.neural-form');

    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFormSubmit(form);
      });
    });
  }

  handleFormSubmit(form) {
    const inputs = form.querySelectorAll('.form-input');
    const data = {};

    inputs.forEach(input => {
      if (input.name) {
        data[input.name] = input.value;
      }
    });

    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.classList.add('memory-pulse');

      setTimeout(() => {
        btn.classList.remove('memory-pulse');
      }, 800);
    }

    console.log('Neural transmission:', data);
  }

  setupScrollAnimations() {
    const sections = document.querySelectorAll('.section');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('neural-fade-in');
        }
      });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));
  }

  initBrainScan() {
    this.canvas = document.getElementById('brainScanCanvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
    this.drawBrainScan();

    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    if (!this.canvas) return;

    const container = this.canvas.parentElement;
    const rect = container.getBoundingClientRect();

    this.canvas.width = rect.width;
    this.canvas.height = Math.min(400, rect.width * 0.6);

    if (!this.reducedMotion) {
      this.drawBrainScan();
    }
  }

  drawBrainScan() {
    if (!this.ctx) return;

    const { width, height } = this.canvas;
    const centerX = width / 2;
    const centerY = height / 2;

    this.ctx.clearRect(0, 0, width, height);

    this.drawBrainOutline(centerX, centerY);

    this.drawNeuralActivity(centerX, centerY);

    if (!this.reducedMotion) {
      this.animationId = requestAnimationFrame(() => this.drawBrainScan());
    }
  }

  drawBrainOutline(cx, cy) {
    this.ctx.save();

    const gradient = this.ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(cx, cy) * 0.8);
    gradient.addColorStop(0, 'rgba(157, 78, 221, 0.1)');
    gradient.addColorStop(0.7, 'rgba(157, 78, 221, 0.05)');
    gradient.addColorStop(1, 'rgba(0, 255, 255, 0.2)');

    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.ellipse(cx, cy, cx * 0.8, cy * 0.9, 0, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.strokeStyle = 'rgba(157, 78, 221, 0.3)';
    this.ctx.lineWidth = 1;
    this.ctx.stroke();

    this.ctx.restore();
  }

  drawNeuralActivity(cx, cy) {
    const time = Date.now() * 0.001;

    for (let i = 0; i < 5; i++) {
      const angle = (time * 0.5 + i * Math.PI * 0.4) % (Math.PI * 2);
      const radius = 30 + i * 20;

      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius * 0.8;

      const alpha = 0.3 + Math.sin(time * 2 + i) * 0.2;

      this.ctx.save();
      this.ctx.fillStyle = `rgba(0, 255, 255, ${alpha})`;
      this.ctx.beginPath();
      this.ctx.arc(x, y, 3, 0, Math.PI * 2);
      this.ctx.fill();

      if (i > 0) {
        const prevAngle = (time * 0.5 + (i - 1) * Math.PI * 0.4) % (Math.PI * 2);
        const prevRadius = 30 + (i - 1) * 20;
        const prevX = cx + Math.cos(prevAngle) * prevRadius;
        const prevY = cy + Math.sin(prevAngle) * prevRadius * 0.8;

        this.ctx.strokeStyle = `rgba(157, 78, 221, 0.5)`;
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(prevX, prevY);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
      }

      this.ctx.restore();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.neuralInterface = new NeuralInterface();
});

export default NeuralInterface;
