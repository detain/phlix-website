/* ============================================================================
   MAIN.JS — Demolition Crew
   Global interactions: nav toggle, scroll animations, particle init
   ============================================================================ */

import DebrisParticleSystem from './particles.js';
import DemoMode from './demo-mode.js';

class DemolitionCrew {
  constructor() {
    this.particles = null;
    this.demoMode = null;
    this._init();
  }

  _init() {
    this._initNav();
    this._initParticles();
    this._initDemoMode();
    this._initScrollAnimations();
    this._initCtaButtons();
  }

  /* ─── Navigation toggle ─────────────────────────────────────────────────── */
  _initNav() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-primary')) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ─── Debris particle canvas ─────────────────────────────────────────────── */
  _initParticles() {
    this.particles = new DebrisParticleSystem('debris-canvas', {
      count: window.innerWidth < 768 ? 15 : 40,
    });
  }

  /* ─── Demo Mode toggle ─────────────────────────────────────────────────── */
  _initDemoMode() {
    this.demoMode = new DemoMode('.demo-toggle', '.demo-panel');
  }

  /* ─── Scroll-triggered animations ───────────────────────────────────────── */
  _initScrollAnimations() {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all scroll-animate targets
    document.querySelectorAll('[data-animate]').forEach((el) => {
      el.classList.add('animate-ready');
      observer.observe(el);
    });
  }

  /* ─── CTA button explosive effects ─────────────────────────────────────── */
  _initCtaButtons() {
    document.querySelectorAll('.btn-primary').forEach((btn) => {
      btn.addEventListener('mouseenter', () => {
        this._blastEffect(btn);
      });
    });
  }

  _blastEffect(el) {
    // Create radial blast effect on hover
    const rect = el.getBoundingClientRect();
    const blast = document.createElement('div');
    blast.style.cssText = `
      position: fixed;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255,56,56,0.6) 0%, rgba(108,92,231,0.3) 50%, transparent 70%);
      left: ${rect.left + rect.width / 2}px;
      top: ${rect.top + rect.height / 2}px;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 9999;
      animation: blast-explode 0.4s ease-out forwards;
    `;
    document.body.appendChild(blast);
    setTimeout(() => blast.remove(), 400);
  }
}

/* ─── Add CSS for blast animation ─────────────────────────────────────────── */
const style = document.createElement('style');
style.textContent = `
  @keyframes blast-explode {
    0%   { width: 10px; height: 10px; opacity: 1; }
    100% { width: 120px; height: 120px; opacity: 0; }
  }
  .animate-ready {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .animate-ready.is-visible {
    opacity: 1;
    transform: none;
  }
  [data-animate="fade"] { transition-duration: 0.4s; }
  [data-animate="slide-up"] { transform: translateY(30px); }
  [data-animate="slide-up"].is-visible { transform: translateY(0); }
  [data-animate="scale"] { transform: scale(0.92); }
  [data-animate="scale"].is-visible { transform: scale(1); }
`;
document.head.appendChild(style);

/* ─── Bootstrap on DOM ready ──────────────────────────────────────────────── */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new DemolitionCrew());
} else {
  new DemolitionCrew();
}

export default DemolitionCrew;
