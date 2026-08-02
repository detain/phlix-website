/**
 * ============================================================================
 *  THUNDER STRIKE — Main JavaScript
 *  Electrical storm experience with arc animations, electric jitter, and zap transitions
 * ============================================================================
 */

(function () {
  'use strict';

  /* ==========================================================================
   * ARC BACKGROUND ANIMATION
   * ========================================================================== */
  class ArcBackground {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d');
      this.arcs = [];
      this.raf = null;
      this.isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      this.resize();
      this.init();
      this.bindEvents();
    }

    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    bindEvents() {
      window.addEventListener('resize', () => this.resize());
    }

    init() {
      // Create initial arcs
      for (let i = 0; i < 5; i++) {
        this.arcs.push(this.createArc());
      }
      this.animate();
    }

    createArc() {
      return {
        startX: Math.random() * this.canvas.width,
        startY: Math.random() * this.canvas.height * 0.5,
        endX: Math.random() * this.canvas.width,
        endY: Math.random() * this.canvas.height,
        life: 0,
        maxLife: 60 + Math.random() * 60,
        speed: 2 + Math.random() * 3,
        hue: Math.random() > 0.5 ? 280 : 189, // Purple or Cyan
        branchChance: 0.3,
        branches: [],
      };
    }

    drawArc(arc) {
      const progress = arc.life / arc.maxLife;
      const alpha = progress < 0.2 ? progress * 5 : 1 - progress;

      this.ctx.beginPath();
      this.ctx.strokeStyle = `hsla(${arc.hue}, 80%, 60%, ${alpha})`;
      this.ctx.lineWidth = 2;
      this.ctx.shadowBlur = 15;
      this.ctx.shadowColor = `hsla(${arc.hue}, 80%, 60%, ${alpha * 0.5})`;

      // Draw main arc with jagged path
      const segments = 10;
      const dx = (arc.endX - arc.startX) / segments;
      const dy = (arc.endY - arc.startY) / segments;

      this.ctx.moveTo(arc.startX, arc.startY);

      for (let i = 1; i < segments; i++) {
        const jitterX = (Math.random() - 0.5) * 40;
        const jitterY = (Math.random() - 0.5) * 40;
        this.ctx.lineTo(arc.startX + dx * i + jitterX, arc.startY + dy * i + jitterY);
      }

      this.ctx.lineTo(arc.endX, arc.endY);
      this.ctx.stroke();

      // Draw branches
      arc.branches.forEach((branch) => {
        this.ctx.beginPath();
        this.ctx.strokeStyle = `hsla(${arc.hue}, 70%, 50%, ${alpha * 0.7})`;
        this.ctx.lineWidth = 1;
        this.ctx.moveTo(branch.startX, branch.startY);
        this.ctx.lineTo(branch.endX, branch.endY);
        this.ctx.stroke();
      });

      this.ctx.shadowBlur = 0;
    }

    animate() {
      if (this.isReduced) {
        // Static render for reduced motion
        this.ctx.fillStyle = 'rgba(19, 23, 32, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        return;
      }

      this.ctx.fillStyle = 'rgba(19, 23, 32, 0.15)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      this.arcs.forEach((arc, index) => {
        arc.life++;

        // Update branches
        if (arc.life === Math.floor(arc.maxLife * 0.3) && arc.branchChance > Math.random()) {
          const midX = (arc.startX + arc.endX) / 2 + (Math.random() - 0.5) * 100;
          const midY = (arc.startY + arc.endY) / 2 + (Math.random() - 0.5) * 100;
          arc.branches.push({
            startX: midX,
            startY: midY,
            endX: midX + (Math.random() - 0.5) * 100,
            endY: midY + (Math.random() - 0.5) * 100,
          });
        }

        this.drawArc(arc);

        // Reset arc when life ends
        if (arc.life >= arc.maxLife) {
          this.arcs[index] = this.createArc();
        }
      });

      this.raf = requestAnimationFrame(() => this.animate());
    }
  }

  /* ==========================================================================
   * ELECTRIC JITTER EFFECT
   * ========================================================================== */
  class ElectricJitter {
    constructor(element) {
      this.element = element;
      this.isActive = false;
      this.timeout = null;
    }

    start() {
      if (this.isActive || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      this.isActive = true;
      this.jitter();
    }

    stop() {
      this.isActive = false;
      clearTimeout(this.timeout);
      this.element.style.transform = '';
    }

    jitter() {
      if (!this.isActive) return;

      const x = (Math.random() - 0.5) * 4;
      const y = (Math.random() - 0.5) * 4;
      this.element.style.transform = `translate(${x}px, ${y}px)`;

      this.timeout = setTimeout(() => this.jitter(), 50);
    }
  }

  /* ==========================================================================
   * THUNDER RUMBLE SHAKE
   * ========================================================================== */
  function thunderRumble(element, duration = 500) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    element.classList.add('thunder-rumble');
    setTimeout(() => {
      element.classList.remove('thunder-rumble');
    }, duration);
  }

  /* ==========================================================================
   * COUNTER ANIMATION
   * ========================================================================== */
  function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * easeOut);

      element.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  /* ==========================================================================
   * NAVIGATION
   * ========================================================================== */
  function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (navToggle && mainNav) {
      navToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', mainNav.classList.contains('active'));
      });

      // Close nav on link click
      mainNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          mainNav.classList.remove('active');
        });
      });
    }

    // Active nav highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.main-nav a').forEach((link) => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /* ==========================================================================
   * CLOCK
   * ========================================================================== */
  function initClock() {
    const clockElement = document.querySelector('.hud-clock');
    if (!clockElement) return;

    function updateClock() {
      const now = new Date();
      clockElement.textContent = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    }

    updateClock();
    setInterval(updateClock, 1000);
  }

  /* ==========================================================================
   * CARD INTERACTIONS
   * ========================================================================== */
  function initCardInteractions() {
    document.querySelectorAll('.card').forEach((card) => {
      const jitter = new ElectricJitter(card);

      card.addEventListener('mouseenter', () => {
        card.classList.add('crackle-hover');
      });

      card.addEventListener('mouseleave', () => {
        card.classList.remove('crackle-hover');
      });

      // Add rumble on click
      card.addEventListener('click', () => {
        thunderRumble(card, 300);
      });
    });
  }

  /* ==========================================================================
   * BUTTON INTERACTIONS
   * ========================================================================== */
  function initButtonInteractions() {
    document.querySelectorAll('.btn').forEach((btn) => {
      btn.addEventListener('mouseenter', () => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        btn.style.animation = 'electricJitter 0.1s linear 3';
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.animation = '';
      });

      btn.addEventListener('click', () => {
        // Brief flash effect
        btn.style.filter = 'brightness(1.3)';
        setTimeout(() => {
          btn.style.filter = '';
        }, 100);
      });
    });
  }

  /* ==========================================================================
   * STAT COUNTERS
   * ========================================================================== */
  function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target, 10);
            animateCounter(entry.target, target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    statNumbers.forEach((stat) => observer.observe(stat));
  }

  /* ==========================================================================
   * PLAYPause CLICK HANDLER (example for media cards)
   * ========================================================================== */
  function initMediaCards() {
    document.querySelectorAll('.poster-card').forEach((card) => {
      card.addEventListener('click', function () {
        const wasPlaying = this.classList.contains('is-playing');

        // Remove playing from all
        document.querySelectorAll('.poster-card.is-playing').forEach((c) => {
          c.classList.remove('is-playing');
        });

        // Toggle on clicked
        if (!wasPlaying) {
          this.classList.add('is-playing');
          thunderRumble(this, 400);
        }
      });
    });
  }

  /* ==========================================================================
   * SCROLL ANIMATIONS
   * ========================================================================== */
  function initScrollAnimations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const animatedElements = document.querySelectorAll('.card, .section-title, .hero-content');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 },
    );

    animatedElements.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  /* ==========================================================================
   * ZAP TRANSITION ON NAVIGATION
   * ========================================================================== */
  function initZapTransitions() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
          e.preventDefault();

          // Create flash effect
          const flash = document.createElement('div');
          flash.style.cssText = `
            position: fixed;
            inset: 0;
            background: linear-gradient(135deg, #5F27CD, #48DBFB);
            z-index: 9999;
            animation: zapFlash 0.3s ease forwards;
            pointer-events: none;
          `;
          document.body.appendChild(flash);

          setTimeout(() => {
            flash.remove();
            target.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        }
      });
    });
  }

  /* ==========================================================================
   * FOCUS VISIBILITY
   * ========================================================================== */
  function initFocusVisibility() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-nav');
    });
  }

  /* ==========================================================================
   * PLAYING CONTENT CRACKLE
   * ========================================================================== */
  function initPlayingCrackle() {
    const playingElements = document.querySelectorAll('.is-playing, [data-playing="true"]');

    playingElements.forEach((el) => {
      // Add crackle outline
      el.classList.add('playing-crackle');

      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.setAttribute('aria-playing', 'true');
      }
    });
  }

  /* ==========================================================================
   * INITIALIZE
   * ========================================================================== */
  function init() {
    // Start arc background
    new ArcBackground('arcCanvas');

    // Initialize components
    initNavigation();
    initClock();
    initCardInteractions();
    initButtonInteractions();
    initStatCounters();
    initMediaCards();
    initScrollAnimations();
    initZapTransitions();
    initFocusVisibility();
    initPlayingCrackle();

    // Add keyboard-nav class for focus styles
    document.body.classList.add('keyboard-nav');
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ==========================================================================
   * EXPORTS (for potential module use)
   * ========================================================================== */
  window.ThunderStrike = {
    ArcBackground,
    ElectricJitter,
    thunderRumble,
    animateCounter,
  };
})();
