/**
 * ============================================================================
 *  ARTILLERY TRANSITION
 *  Three-phase chamber/aim/fire page transitions
 * ============================================================================ */

(function() {
  'use strict';

  class ArtilleryTransition {
    constructor(options = {}) {
      this.options = {
        duration: options.duration || 800,
        easing: options.easing || 'cubic-bezier(0.16, 1, 0.3, 1)',
        ...options
      };
      
      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.isTransitioning = false;
    }

    /**
     * Execute three-phase transition
     * Phase 1: Chamber - Element compresses/charges
     * Phase 2: Aim - Element locks onto target
     * Phase 3: Fire - Element launches/proceeds
     */
    async transition(element, callback) {
      if (this.isTransitioning || this.reducedMotion) {
        callback();
        return;
      }

      this.isTransitioning = true;
      element.classList.add('artillery-transition');

      try {
        // Phase 1: Chamber
        await this.chamber(element);
        
        // Phase 2: Aim
        await this.aim(element);
        
        // Phase 3: Fire
        await this.fire(element);
        
        // Execute callback
        callback();
      } finally {
        this.isTransitioning = false;
        element.classList.remove('artillery-transition');
      }
    }

    chamber(element) {
      return new Promise(resolve => {
        element.style.transition = `transform ${this.options.duration * 0.3}ms ${this.options.easing}`;
        element.style.transform = 'scale(0.95) translateY(10px)';
        
        setTimeout(resolve, this.options.duration * 0.3);
      });
    }

    aim(element) {
      return new Promise(resolve => {
        element.style.transition = `transform ${this.options.duration * 0.3}ms ${this.options.easing}`;
        element.style.transform = 'scale(1.02) translateY(-5px)';
        
        setTimeout(resolve, this.options.duration * 0.3);
      });
    }

    fire(element) {
      return new Promise(resolve => {
        element.style.transition = `transform ${this.options.duration * 0.4}ms ${this.options.easing}`;
        element.style.transform = 'scale(1) translateY(0)';
        
        setTimeout(resolve, this.options.duration * 0.4);
      });
    }

    /**
     * Page exit transition
     */
    exit() {
      return new Promise(resolve => {
        if (this.reducedMotion) {
          resolve();
          return;
        }

        const overlay = document.createElement('div');
        overlay.className = 'artillery-exit-overlay';
        overlay.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--color-overlay);
          z-index: 9999;
          opacity: 0;
          transition: opacity 200ms ease-out;
        `;
        document.body.appendChild(overlay);

        requestAnimationFrame(() => {
          overlay.style.opacity = '1';
          
          setTimeout(() => {
            resolve();
            overlay.remove();
          }, 200);
        });
      });
    }
  }

  /* --------------------------------------------------------------------------
     Initialize
     -------------------------------------------------------------------------- */
  const artillery = new ArtilleryTransition();

  /* --------------------------------------------------------------------------
     Intercept Internal Links
     -------------------------------------------------------------------------- */
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    
    const href = link.getAttribute('href');
    
    // Only handle internal links
    if (link.hostname !== window.location.hostname) return;
    if (href.startsWith('#') || href.startsWith('?')) return;
    if (!href.endsWith('.html')) return;
    if (href === window.location.pathname) return;
    
    e.preventDefault();
    
    artillery.exit().then(() => {
      window.location.href = href;
    });
  });

  /* --------------------------------------------------------------------------
     Expose Global
     -------------------------------------------------------------------------- */
  window.ArtilleryTransition = ArtilleryTransition;

})();
