/**
 * ============================================================================
 *  RADAR SWEEP
 *  Ambient radar rotation effect
 * ============================================================================ */

(function() {
  'use strict';

  class RadarSweep {
    constructor(element, options = {}) {
      this.element = element;
      this.options = {
        speed: options.speed || 8000,      // Full rotation time in ms
        color: options.color || 'rgba(0, 255, 136, 0.4)',
        gridColor: options.gridColor || 'rgba(42, 42, 74, 0.5)',
        size: options.size || 400,
        ...options
      };
      
      this.enabled = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (this.enabled) {
        this.init();
      }
    }

    init() {
      this.createGrid();
      this.createSweep();
      this.startRotation();
    }

    createGrid() {
      const grid = document.createElement('div');
      grid.className = 'radar-grid';
      grid.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: ${this.options.size}px;
        height: ${this.options.size}px;
        background-image: 
          linear-gradient(${this.options.gridColor} 1px, transparent 1px),
          linear-gradient(90deg, ${this.options.gridColor} 1px, transparent 1px);
        background-size: 40px 40px;
        mask-image: radial-gradient(circle, black 0%, transparent 70%);
        -webkit-mask-image: radial-gradient(circle, black 0%, transparent 70%);
      `;
      this.element.appendChild(grid);
    }

    createSweep() {
      const sweep = document.createElement('div');
      sweep.className = 'radar-sweep-animated';
      sweep.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: ${this.options.size}px;
        height: ${this.options.size}px;
        background: conic-gradient(
          from 0deg,
          transparent 0deg,
          ${this.options.color} 30deg,
          transparent 60deg
        );
        border-radius: 50%;
        mask-image: radial-gradient(circle, black 0%, transparent 70%);
        -webkit-mask-image: radial-gradient(circle, black 0%, transparent 70%);
      `;
      this.element.appendChild(sweep);
      this.sweep = sweep;
    }

    startRotation() {
      if (!this.sweep) return;
      
      const animate = () => {
        if (!this.enabled) return;
        
        this.sweep.style.transform = 'translate(-50%, -50%) rotate(0deg)';
        
        requestAnimationFrame(() => {
          this.sweep.style.transition = `transform ${this.options.speed}ms linear`;
          this.sweep.style.transform = 'translate(-50%, -50%) rotate(360deg)';
        });

        setTimeout(() => {
          if (this.enabled) {
            this.sweep.style.transition = 'none';
            this.startRotation();
          }
        }, this.options.speed);
      };

      animate();
    }

    destroy() {
      this.enabled = false;
      if (this.sweep) {
        this.sweep.remove();
      }
      this.element.innerHTML = '';
    }
  }

  /* --------------------------------------------------------------------------
     Initialize on DOM Ready
     -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    const radarContainers = document.querySelectorAll('.radar-container');
    
    radarContainers.forEach(container => {
      // Only initialize if not already handled by CSS
      if (!container.querySelector('.radar-sweep-animated')) {
        new RadarSweep(container);
      }
    });

    // Mini radar in HUD display
    const miniRadars = document.querySelectorAll('.radar-mini');
    miniRadars.forEach(radar => {
      const sweep = radar.querySelector('.radar-sweep-mini');
      if (sweep && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Already handled by CSS animation
      }
    });
  });

  /* --------------------------------------------------------------------------
     Expose Global
     -------------------------------------------------------------------------- */
  window.RadarSweep = RadarSweep;

})();
