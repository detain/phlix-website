/**
 * Storm Chaser — Main JavaScript
 * Dynamic storm effects, vortex animation, rain particles, lightning
 */

(function() {
  'use strict';

  /* ==========================================================================
     Storm Intensity System
     ========================================================================== */

  const StormIntensity = {
    levels: [
      { threshold: 0,   label: 'Clear',   speed: 0,      lightning: 0,    rain: 0,   color: '#27AE60' },
      { threshold: 100, label: 'Clouds',  speed: 6000,   lightning: 0.1,  rain: 0.3,  color: '#7F8C8D' },
      { threshold: 500, label: 'Gusting', speed: 4000,   lightning: 0.3,  rain: 0.5,  color: '#F7981D' },
      { threshold: 1000,label: 'Storm',   speed: 2000,   lightning: 0.5,  rain: 0.7,  color: '#E67E22' },
      { threshold: 5000,label: 'Severe',  speed: 1000,   lightning: 0.7,  rain: 0.9,  color: '#C0392B' },
    ],

    current: null,
    librarySize: 0,

    init(librarySize = 1000) {
      this.librarySize = librarySize;
      this.update();
    },

    getLevel() {
      const levels = this.levels;
      for (let i = levels.length - 1; i >= 0; i--) {
        if (this.librarySize >= levels[i].threshold) {
          return levels[i];
        }
      }
      return levels[0];
    },

    update() {
      this.current = this.getLevel();

      // Update CSS custom properties
      const root = document.documentElement;
      root.style.setProperty('--vortex-speed', `${this.current.speed}ms`);
      root.style.setProperty('--lightning-chance', this.current.lightning);
      root.style.setProperty('--rain-intensity', this.current.rain);

      // Update HUD display if exists
      const hud = document.querySelector('.storm-hud');
      if (hud) {
        hud.textContent = `${this.current.label} — ${this.librarySize} files`;
      }
    },

    setLibrarySize(size) {
      this.librarySize = size;
      this.update();
    }
  };

  /* ==========================================================================
     Rain Particle System
     ========================================================================== */

  const RainSystem = {
    canvas: null,
    ctx: null,
    particles: [],
    maxParticles: 150,
    animationId: null,

    init() {
      const canvas = document.createElement('canvas');
      canvas.id = 'rain-canvas';
      canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        opacity: var(--rain-intensity, 0.5);
      `;
      document.body.appendChild(canvas);

      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.resize();
      this.createParticles();

      window.addEventListener('resize', () => this.resize());

      // Check for reduced motion
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.animate();
      }
    },

    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    },

    createParticles() {
      const count = Math.floor(this.maxParticles * (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--rain-intensity')) || 0.5));
      this.particles = [];

      for (let i = 0; i < count; i++) {
        this.particles.push(this.createParticle());
      }
    },

    createParticle() {
      return {
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 10 + 15,
        opacity: Math.random() * 0.3 + 0.2,
        angle: 15 // ~15 degree angle for wind effect
      };
    },

    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.particles.forEach(p => {
        // Draw rain drop
        const endX = p.x + Math.cos(p.angle * Math.PI / 180) * p.length;
        const endY = p.y + Math.sin(p.angle * Math.PI / 180) * p.length;

        this.ctx.beginPath();
        this.ctx.moveTo(p.x, p.y);
        this.ctx.lineTo(endX, endY);
        this.ctx.strokeStyle = `rgba(247, 152, 29, ${p.opacity})`;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();

        // Update position
        p.x += Math.cos(p.angle * Math.PI / 180) * p.speed;
        p.y += Math.sin(p.angle * Math.PI / 180) * p.speed;

        // Reset if off screen
        if (p.y > this.canvas.height) {
          p.y = -p.length;
          p.x = Math.random() * this.canvas.width;
        }
        if (p.x > this.canvas.width) {
          p.x = 0;
        }
      });

      this.animationId = requestAnimationFrame(() => this.animate());
    },

    updateIntensity(intensity) {
      this.canvas.style.opacity = intensity;
      const targetCount = Math.floor(this.maxParticles * intensity);
      while (this.particles.length < targetCount) {
        this.particles.push(this.createParticle());
      }
      while (this.particles.length > targetCount) {
        this.particles.pop();
      }
    }
  };

  /* ==========================================================================
     Lightning Flash Effect
     ========================================================================== */

  const LightningSystem = {
    flashEl: null,
    chance: 0.3,

    init() {
      this.flashEl = document.createElement('div');
      this.flashEl.className = 'lightning-flash';
      this.flashEl.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        background: radial-gradient(ellipse at 50% 0%, rgba(247, 152, 29, 0.4) 0%, transparent 60%);
      `;
      document.body.appendChild(this.flashEl);

      this.scheduleFlash();
    },

    scheduleFlash() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      const delay = Math.random() * 5000 + 3000; // 3-8 seconds
      setTimeout(() => {
        if (Math.random() < this.chance) {
          this.flash();
        }
        this.scheduleFlash();
      }, delay);
    },

    flash() {
      this.flashEl.classList.add('active');
      setTimeout(() => {
        this.flashEl.classList.remove('active');
      }, 150);
    },

    setChance(chance) {
      this.chance = chance;
    }
  };

  /* ==========================================================================
     Vortex Animation
     ========================================================================== */

  const VortexSystem = {
    container: null,
    rings: [],
    core: null,
    prefersReducedMotion: false,

    init(container) {
      this.container = container;
      this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!this.container || this.prefersReducedMotion) return;

      // Create rings
      for (let i = 0; i < 4; i++) {
        const ring = document.createElement('div');
        ring.className = 'vortex-ring';
        ring.style.cssText = `
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 50%;
          border: 2px solid rgba(247, 152, 29, ${0.1 + i * 0.05});
          transform: translate(-50%, -50%);
        `;
        const size = 100 - (i * 20);
        ring.style.width = `${size}%`;
        ring.style.height = `${size}%`;
        ring.style.animationDuration = `${8 - i * 2}s`;
        if (i % 2 === 1) ring.style.animationDirection = 'reverse';
        this.container.appendChild(ring);
        this.rings.push(ring);
      }

      // Create core
      this.core = document.createElement('div');
      this.core.className = 'vortex-core';
      this.core.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20%;
        height: 20%;
        background: radial-gradient(circle, #F7981D 0%, transparent 70%);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: core-pulse 2s ease-in-out infinite;
      `;
      this.container.appendChild(this.core);
    },

    setSpeed(speedMs) {
      if (this.prefersReducedMotion) return;
      this.rings.forEach((ring) => {
        ring.style.animationDuration = `${speedMs / 1000}s`;
      });
    }
  };

  /* ==========================================================================
     Navigation Toggle
     ========================================================================== */

  function initNavigation() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.main-nav');

    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        nav.classList.toggle('open');
      });
    }
  }

  /* ==========================================================================
     Tabs Component
     ========================================================================== */

  function initTabs() {
    document.querySelectorAll('.tabs').forEach(tabsContainer => {
      const buttons = tabsContainer.querySelectorAll('.tab-btn');
      const panels = tabsContainer.parentElement.querySelectorAll('.tab-panel');

      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          const target = btn.dataset.tab;

          buttons.forEach(b => b.classList.remove('active'));
          panels.forEach(p => p.classList.remove('active'));

          btn.classList.add('active');
          const panel = document.getElementById(target);
          if (panel) panel.classList.add('active');
        });
      });
    });
  }

  /* ==========================================================================
     Accordion Component
     ========================================================================== */

  function initAccordions() {
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        const isOpen = item.classList.contains('open');

        // Close all in same group
        item.parentElement.querySelectorAll('.accordion-item').forEach(i => {
          i.classList.remove('open');
        });

        if (!isOpen) {
          item.classList.add('open');
        }
      });
    });
  }

  /* ==========================================================================
     Scroll Animations
     ========================================================================== */

  function initScrollAnimations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .section-title, .page-header').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });

    // Add animation class styles
    const style = document.createElement('style');
    style.textContent = `
      .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(style);
  }

  /* ==========================================================================
     Toast Notifications
     ========================================================================== */

  const Toast = {
    container: null,

    init() {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    },

    show(message, type = 'info', duration = 4000) {
      if (!this.container) this.init();

      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      toast.innerHTML = `
        <span class="toast-message">${message}</span>
        <button class="toast-close" aria-label="Close">&times;</button>
      `;

      toast.querySelector('.toast-close').addEventListener('click', () => {
        this.dismiss(toast);
      });

      this.container.appendChild(toast);

      if (duration > 0) {
        setTimeout(() => this.dismiss(toast), duration);
      }

      return toast;
    },

    dismiss(toast) {
      toast.style.animation = 'toast-slide-in 300ms ease-out reverse';
      setTimeout(() => toast.remove(), 300);
    }
  };

  /* ==========================================================================
     Smooth Scroll
     ========================================================================== */

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ==========================================================================
     HUD Clock / Live Indicator
     ========================================================================== */

  function initHUDClock() {
    const clockEl = document.querySelector('.hud-clock');
    if (!clockEl) return;

    function update() {
      const now = new Date();
      clockEl.textContent = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    }
    update();
    setInterval(update, 1000);
  }

  /* ==========================================================================
     Initialize Everything
     ========================================================================== */

  function init() {
    // Initialize storm intensity with default library size
    StormIntensity.init(1000);

    // Initialize rain system
    RainSystem.init();

    // Initialize lightning
    LightningSystem.init();

    // Initialize vortex in hero if present
    const vortexContainer = document.querySelector('.vortex-bg');
    if (vortexContainer) {
      VortexSystem.init(vortexContainer);
    }

    // Initialize UI components
    initNavigation();
    initTabs();
    initAccordions();
    initScrollAnimations();
    initSmoothScroll();
    initHUDClock();

    // Add lightning flash class reference
    document.querySelector('.lightning-flash');

    // Expose for console debugging
    window.StormChaser = {
      StormIntensity,
      RainSystem,
      LightningSystem,
      VortexSystem,
      Toast
    };
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
