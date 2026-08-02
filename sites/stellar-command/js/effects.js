/**
 * Stellar Command - Visual Effects
 * Warp blur, beam-up, console power-up, and other effects
 */

(function () {
  'use strict';

  class Effects {
    constructor() {
      this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.init();
    }

    init() {
      this.bindEvents();
      this.initCounters();
      this.initHoverEffects();

      window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
        this.prefersReducedMotion = e.matches;
      });
    }

    bindEvents() {
      // Channel cards
      document.querySelectorAll('.channel-card').forEach((card) => {
        card.addEventListener('mouseenter', () => this.onChannelEnter(card));
        card.addEventListener('mouseleave', () => this.onChannelLeave(card));
        card
          .querySelector('.channel-tune')
          ?.addEventListener('click', () => this.onChannelTune(card));
      });

      // Buttons
      document.querySelectorAll('.btn').forEach((btn) => {
        btn.addEventListener('click', (e) => this.onButtonClick(e, btn));
      });

      // Transmission cards
      document.querySelectorAll('.transmission-card').forEach((card) => {
        card.addEventListener('mouseenter', () => this.addClass(card, 'beam-up'));
      });

      // Vessel rows
      document.querySelectorAll('.vessel-row').forEach((row) => {
        row.addEventListener('mouseenter', () => this.onVesselEnter(row));
        row.addEventListener('mouseleave', () => this.onVesselLeave(row));
      });

      // Review cards
      document.querySelectorAll('.review-card').forEach((card) => {
        card.addEventListener('mouseenter', () => this.onReviewEnter(card));
      });

      // Stat counters
      document.querySelectorAll('.stat-value[data-count]').forEach((stat) => {
        this.animateCounter(stat);
      });
    }

    initCounters() {
      if (this.prefersReducedMotion) {
        document.querySelectorAll('.stat-value[data-count]').forEach((stat) => {
          stat.textContent = stat.getAttribute('data-count');
        });
      }
    }

    initHoverEffects() {
      // Logo icon pulse
      const logoIcon = document.querySelector('.logo-icon');
      if (logoIcon) {
        logoIcon.addEventListener('mouseenter', () => {
          if (!this.prefersReducedMotion) {
            this.addClass(logoIcon, 'glow-pulse');
          }
        });
        logoIcon.addEventListener('mouseleave', () => {
          this.removeClass(logoIcon, 'glow-pulse');
        });
      }
    }

    onChannelEnter(card) {
      if (this.prefersReducedMotion) return;
      const visual = card.querySelector('.channel-visual');
      if (visual) {
        this.addClass(visual, 'warp-effect');
      }
    }

    onChannelLeave(card) {
      const visual = card.querySelector('.channel-visual');
      if (visual) {
        this.removeClass(visual, 'warp-effect');
      }
    }

    onChannelTune(card) {
      const channelName = card.querySelector('.channel-name')?.textContent || 'Unknown';

      if (!this.prefersReducedMotion) {
        this.addClass(card, 'console-power');
        setTimeout(() => this.removeClass(card, 'console-power'), 600);
      }

      this.showNotification(`Tuning to ${channelName}...`, 'success');
    }

    onButtonClick(e, btn) {
      if (this.prefersReducedMotion) return;

      // Add ripple or feedback effect
      this.addClass(btn, 'console-power');
      setTimeout(() => this.removeClass(btn, 'console-power'), 600);

      // Primary button action
      if (btn.classList.contains('btn-primary') && btn.textContent.includes('Launch')) {
        this.showNotification('Engaging warp drive...', 'success');
      }
    }

    onVesselEnter(row) {
      if (this.prefersReducedMotion) return;
      const powerIndicator = row.querySelector('.power-level');
      if (powerIndicator) {
        powerIndicator.style.transition = 'width 0.3s ease';
      }
    }

    onVesselLeave(row) {
      const powerIndicator = row.querySelector('.power-level');
      if (powerIndicator) {
        powerIndicator.style.transition = '';
      }
    }

    onReviewEnter(card) {
      if (this.prefersReducedMotion) return;
      const avatar = card.querySelector('.review-avatar');
      if (avatar) {
        this.addClass(avatar, 'float');
        setTimeout(() => this.removeClass(avatar, 'float'), 3000);
      }
    }

    animateCounter(stat) {
      if (this.prefersReducedMotion) {
        stat.textContent = stat.getAttribute('data-count');
        return;
      }

      const target = parseFloat(stat.getAttribute('data-count'));
      const duration = 2000;
      const startTime = performance.now();
      const isDecimal = target % 1 !== 0;

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = target * easeProgress;

        stat.textContent = isDecimal ? current.toFixed(1) : Math.round(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }

    showNotification(message, type = 'info') {
      const container = document.getElementById('notification-container');
      if (!container) return;

      const notification = document.createElement('div');
      notification.className = `notification ${type}`;
      notification.innerHTML = `
        <span class="beacon small"></span>
        <span>${message}</span>
      `;

      container.appendChild(notification);

      setTimeout(() => {
        notification.style.animation = 'notification-in 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    }

    addClass(el, className) {
      if (el) el.classList.add(className);
    }

    removeClass(el, className) {
      if (el) el.classList.remove(className);
    }
  }

  // Initialize when DOM is ready
  function init() {
    new Effects();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
