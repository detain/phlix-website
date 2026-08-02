/**
 * Apex Predator Tracking System
 * Prey tracking, hunting-mode focus, and tracking reticle effects
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ============================================
  // TRACKING RETICLE
  // ============================================
  class TrackingReticle {
    constructor(options = {}) {
      this.options = {
        color: '#C70039',
        size: 30,
        thickness: 2,
        ...options,
      };
      this.element = null;
      this.isActive = false;
    }

    create() {
      if (this.element) return;

      this.element = document.createElement('div');
      this.element.className = 'tracking-reticle';
      this.element.style.cssText = `
                position: fixed;
                pointer-events: none;
                z-index: 9997;
                width: ${this.options.size}px;
                height: ${this.options.size}px;
                opacity: 0;
                transition: opacity 0.2s ease;
            `;

      this.element.innerHTML = `
                <svg viewBox="0 0 ${this.options.size} ${this.options.size}" fill="none" stroke="${this.options.color}" stroke-width="${this.options.thickness}">
                    <circle cx="${this.options.size / 2}" cy="${this.options.size / 2}" r="${this.options.size / 2 - 4}" opacity="0.5"/>
                    <line x1="${this.options.size / 2}" y1="0" x2="${this.options.size / 2}" y2="${this.options.size / 4}"/>
                    <line x1="${this.options.size / 2}" y1="${(this.options.size * 3) / 4}" x2="${this.options.size / 2}" y2="${this.options.size}"/>
                    <line x1="0" y1="${this.options.size / 2}" x2="${this.options.size / 4}" y2="${this.options.size / 2}"/>
                    <line x1="${(this.options.size * 3) / 4}" y1="${this.options.size / 2}" x2="${this.options.size}" y2="${this.options.size / 2}"/>
                </svg>
            `;

      document.body.appendChild(this.element);
    }

    followCursor(e) {
      if (!this.element || !this.isActive) return;

      this.element.style.left = `${e.clientX - this.options.size / 2}px`;
      this.element.style.top = `${e.clientY - this.options.size / 2}px`;
    }

    show() {
      if (!this.element) this.create();
      this.isActive = true;
      this.element.style.opacity = '1';
    }

    hide() {
      if (!this.element) return;
      this.isActive = false;
      this.element.style.opacity = '0';
    }

    destroy() {
      if (this.element) {
        this.element.remove();
        this.element = null;
      }
    }
  }

  // ============================================
  // HUNTING MODE
  // ============================================
  class HuntingMode {
    constructor() {
      this.isActive = false;
      this.reticle = new TrackingReticle();
      this.trackedTarget = null;
    }

    activate() {
      this.isActive = true;
      this.reticle.show();
      document.body.classList.add('hunting-mode');
      this.bindEvents();
    }

    deactivate() {
      this.isActive = false;
      this.reticle.hide();
      document.body.classList.remove('hunting-mode');
      this.unbindEvents();
      this.releaseTarget();
    }

    toggle() {
      if (this.isActive) {
        this.deactivate();
      } else {
        this.activate();
      }
      return this.isActive;
    }

    bindEvents() {
      this.handleMouseMove = (e) => this.reticle.followCursor(e);
      document.addEventListener('mousemove', this.handleMouseMove);

      this.handleClick = (e) => {
        if (e.target.closest('.prey-card')) {
          this.lockOnTarget(e.target.closest('.prey-card'));
        }
      };
      document.addEventListener('click', this.handleClick);
    }

    unbindEvents() {
      if (this.handleMouseMove) {
        document.removeEventListener('mousemove', this.handleMouseMove);
      }
      if (this.handleClick) {
        document.removeEventListener('click', this.handleClick);
      }
    }

    lockOnTarget(target) {
      if (this.trackedTarget) {
        this.trackedTarget.classList.remove('locked');
      }

      this.trackedTarget = target;
      target.classList.add('locked');

      // Lock animation
      if (!prefersReducedMotion) {
        target.style.animation = 'huntingFocus 0.5s ease forwards';
      }

      // Dispatch event
      window.dispatchEvent(
        new CustomEvent('preyLocked', {
          detail: {
            target: target,
            id: target.dataset.id || target.querySelector('.prey-title')?.textContent,
          },
        }),
      );
    }

    releaseTarget() {
      if (this.trackedTarget) {
        this.trackedTarget.classList.remove('locked');
        this.trackedTarget.style.animation = '';
        this.trackedTarget = null;
      }
    }
  }

  // ============================================
  // TRACKING DOTS (for stats/tracking display)
  // ============================================
  class TrackingDots {
    constructor(container) {
      this.container = container;
      this.dots = [];
      this.positions = [];
      this.init();
    }

    init() {
      const dotCount = parseInt(this.container.dataset.dots) || 5;

      for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('span');
        dot.className = 'tracking-dot';
        dot.style.cssText = `
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    background: var(--ap-primary);
                    border-radius: 50%;
                    margin: 0 4px;
                    opacity: ${0.3 + i * 0.15};
                    animation: trackingPulse 1.5s ease-in-out infinite;
                    animation-delay: ${i * 0.2}s;
                `;
        this.container.appendChild(dot);
        this.dots.push(dot);
      }
    }

    pulse() {
      if (prefersReducedMotion) return;
      this.dots.forEach((dot, i) => {
        dot.style.animation = 'none';
        setTimeout(() => {
          dot.style.animation = `trackingPulse 1s ease-in-out infinite`;
        }, i * 100);
      });
    }
  }

  // ============================================
  // PREY TRACKER (stores tracked items)
  // ============================================
  class PreyTracker {
    constructor() {
      this.tracked = new Map();
      this.loadState();
    }

    loadState() {
      try {
        const saved = localStorage.getItem('apexPredator_tracked');
        if (saved) {
          const parsed = JSON.parse(saved);
          parsed.forEach((item) => this.tracked.set(item.id, item));
        }
      } catch (e) {
        // localStorage not available
      }
    }

    saveState() {
      try {
        localStorage.setItem('apexPredator_tracked', JSON.stringify([...this.tracked]));
      } catch (e) {
        // localStorage not available
      }
    }

    track(id, data = {}) {
      this.tracked.set(id, {
        id,
        data,
        timestamp: Date.now(),
      });
      this.saveState();
    }

    untrack(id) {
      this.tracked.delete(id);
      this.saveState();
    }

    isTracked(id) {
      return this.tracked.has(id);
    }

    getAll() {
      return [...this.tracked.values()];
    }

    getCount() {
      return this.tracked.size;
    }
  }

  // ============================================
  // INITIALIZATION
  // ============================================
  let huntingMode;
  let preyTracker;

  function init() {
    // Initialize hunting mode toggle
    const huntingToggle = document.getElementById('huntingModeToggle');
    if (huntingToggle) {
      huntingMode = new HuntingMode();

      huntingToggle.addEventListener('click', () => {
        const isActive = huntingMode.toggle();
        huntingToggle.classList.toggle('active', isActive);
        huntingToggle.setAttribute('aria-pressed', isActive);
      });
    }

    // Initialize prey tracker
    preyTracker = new PreyTracker();

    // Initialize tracking dots
    document.querySelectorAll('.tracking-dots').forEach((container) => {
      new TrackingDots(container);
    });

    // Track prey clicks
    document.querySelectorAll('.prey-card').forEach((card) => {
      card.addEventListener('click', () => {
        const id = card.dataset.id || card.querySelector('.prey-title')?.textContent;
        if (id && preyTracker && !preyTracker.isTracked(id)) {
          preyTracker.track(id, {
            title: card.querySelector('.prey-title')?.textContent,
            status: card.dataset.status,
          });
        }
      });
    });

    // Listen for prey locked events
    window.addEventListener('preyLocked', (e) => {
      console.log('Prey locked:', e.detail.id);
    });
  }

  // Global access
  window.apexTrack = {
    HuntingMode,
    TrackingReticle,
    PreyTracker,
    getHuntingMode: () => huntingMode,
    getPreyTracker: () => preyTracker,
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
