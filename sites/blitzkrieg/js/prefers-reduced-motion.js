/**
 * ============================================================================
 *  PREFERS REDUCED MOTION
 *  Handles prefers-reduced-motion preference
 * ============================================================================ */

(function() {
  'use strict';

  class PrefersReducedMotion {
    constructor() {
      this.mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.reducedMotion = this.mediaQuery.matches;
      
      this.init();
    }

    init() {
      // Set initial state on body
      this.updateBodyClass();
      
      // Listen for changes
      this.mediaQuery.addEventListener('change', (e) => {
        this.reducedMotion = e.matches;
        this.updateBodyClass();
        this.dispatchEvent();
      });
    }

    updateBodyClass() {
      document.body.classList.toggle('reduced-motion', this.reducedMotion);
    }

    dispatchEvent() {
      const event = new CustomEvent('motionPreferenceChange', {
        detail: { reducedMotion: this.reducedMotion }
      });
      document.dispatchEvent(event);
      
      // Also dispatch on window
      window.dispatchEvent(new CustomEvent('motionPreferenceChange', {
        detail: { reducedMotion: this.reducedMotion }
      }));
    }

    /**
     * Get current preference
     */
    getPrefersReducedMotion() {
      return this.reducedMotion;
    }

    /**
     * Check if animations should run
     */
    shouldAnimate() {
      return !this.reducedMotion;
    }

    /**
     * Get animation duration multiplier
     */
    getDurationMultiplier() {
      return this.reducedMotion ? 0.01 : 1;
    }
  }

  /* --------------------------------------------------------------------------
     Initialize
     -------------------------------------------------------------------------- */
  const motionPref = new PrefersReducedMotion();

  /* --------------------------------------------------------------------------
     Expose Global
     -------------------------------------------------------------------------- */
  window.PrefersReducedMotion = PrefersReducedMotion;
  window.prefersReducedMotion = motionPref;

})();
