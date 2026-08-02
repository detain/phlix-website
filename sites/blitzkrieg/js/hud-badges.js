/**
 * ============================================================================
 *  HUD BADGES
 *  Military HUD style status badges
 * ============================================================================ */

(function () {
  'use strict';

  class HudBadges {
    constructor(options = {}) {
      this.options = {
        ...options,
      };

      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    /**
     * Create a HUD badge
     */
    create(label, type = 'default') {
      const badge = document.createElement('span');
      badge.className = `hud-badge${type !== 'default' ? ` hud-badge--${type}` : ''}`;

      const dot = document.createElement('span');
      dot.className = 'hud-badge__dot';
      badge.appendChild(dot);

      const text = document.createTextNode(label);
      badge.appendChild(text);

      if (!this.reducedMotion && (type === 'danger' || type === 'warning')) {
        badge.classList.add('hud-badge--pulse');
      }

      return badge;
    }

    /**
     * Update badge status
     */
    setStatus(badge, status) {
      badge.classList.remove(
        'hud-badge--primary',
        'hud-badge--secondary',
        'hud-badge--success',
        'hud-badge--warning',
        'hud-badge--danger',
      );

      if (status) {
        badge.classList.add(`hud-badge--${status}`);
      }
    }

    /**
     * Create a progress badge
     */
    createProgress(current, total) {
      const badge = document.createElement('span');
      badge.className = 'hud-badge hud-badge--progress';

      const dot = document.createElement('span');
      dot.className = 'hud-badge__dot';
      badge.appendChild(dot);

      const text = document.createTextNode(`${current}/${total}`);
      badge.appendChild(text);

      return badge;
    }

    /**
     * Create status indicator
     */
    createIndicator(status = 'inactive') {
      const indicator = document.createElement('span');
      indicator.className = `hud-status-bar__indicator hud-status-bar__indicator--${status}`;
      return indicator;
    }
  }

  /* --------------------------------------------------------------------------
     Initialize HUD Badge Behaviors
     -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    const badges = document.querySelectorAll('.hud-badge');

    badges.forEach((badge) => {
      // Add animation class for dangerous/warning badges
      if (
        badge.classList.contains('hud-badge--danger') ||
        badge.classList.contains('hud-badge--warning')
      ) {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          badge.classList.add('hud-badge--pulse');
        }
      }
    });
  });

  /* --------------------------------------------------------------------------
     Expose Global
     -------------------------------------------------------------------------- */
  window.HudBadges = HudBadges;
})();
