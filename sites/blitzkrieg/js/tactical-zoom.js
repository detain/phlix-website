/**
 * ============================================================================
 *  TACTICAL ZOOM
 *  Scope-like focus scaling on media cards
 * ============================================================================ */

(function () {
  'use strict';

  class TacticalZoom {
    constructor(options = {}) {
      this.options = {
        scale: options.scale || 1.08,
        blur: options.blur || 2,
        glow: options.glow || 'rgba(233, 69, 96, 0.4)',
        duration: options.duration || 300,
        ...options,
      };

      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.activeElement = null;

      if (!this.reducedMotion) {
        this.init();
      }
    }

    init() {
      this.createOverlay();
      this.attachListeners();
    }

    createOverlay() {
      const overlay = document.createElement('div');
      overlay.className = 'tactical-zoom-overlay';
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 999;
        opacity: 0;
        transition: opacity ${this.options.duration}ms ease-out;
      `;
      document.body.appendChild(overlay);
      this.overlay = overlay;
    }

    attachListeners() {
      const zoomTargets = document.querySelectorAll('[data-tactical-zoom], [data-zoom]');

      zoomTargets.forEach((target) => {
        target.addEventListener('mouseenter', (e) => this.zoomIn(e.currentTarget));
        target.addEventListener('mouseleave', (e) => this.zoomOut(e.currentTarget));
      });
    }

    zoomIn(element) {
      if (this.reducedMotion) return;

      this.activeElement = element;

      const rect = element.getBoundingClientRect();

      element.style.transition = `
        transform ${this.options.duration}ms cubic-bezier(0.16, 1, 0.3, 1),
        filter ${this.options.duration}ms ease-out,
        box-shadow ${this.options.duration}ms ease-out
      `;
      element.style.transform = `scale(${this.options.scale})`;
      element.style.filter = `drop-shadow(0 0 20px ${this.options.glow})`;

      // Show overlay with crosshair at element center
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      this.overlay.style.opacity = '1';
      this.overlay.style.background = `radial-gradient(circle at ${centerX}px ${centerY}px, transparent 0%, transparent 40px, rgba(0,0,0,0.3) 60px)`;
    }

    zoomOut(element) {
      if (this.reducedMotion) return;

      this.activeElement = null;

      element.style.transform = 'scale(1)';
      element.style.filter = 'none';
      element.style.transition = `
        transform ${this.options.duration}ms ease-out,
        filter ${this.options.duration}ms ease-out,
        box-shadow ${this.options.duration}ms ease-out
      `;

      this.overlay.style.opacity = '0';
    }

    destroy() {
      if (this.overlay) {
        this.overlay.remove();
      }
    }
  }

  /* --------------------------------------------------------------------------
     Initialize on DOM Ready
     -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.tacticalZoomInstance = new TacticalZoom();
    }
  });

  /* --------------------------------------------------------------------------
     Expose Global
     -------------------------------------------------------------------------- */
  window.TacticalZoom = TacticalZoom;
})();
