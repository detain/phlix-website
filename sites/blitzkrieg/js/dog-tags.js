/**
 * ============================================================================
 *  DOG TAGS
 *  Military-style identifier badges
 * ============================================================================ */

(function () {
  'use strict';

  class DogTags {
    constructor(options = {}) {
      this.options = {
        pulseColor: options.pulseColor || '#E94560',
        animationDuration: options.animationDuration || 2000,
        ...options,
      };

      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    /**
     * Create a dog tag element
     */
    create(text, type = 'default') {
      const tag = document.createElement('span');
      tag.className = `dog-tag${type !== 'default' ? ` dog-tag--${type}` : ''}`;
      tag.textContent = text;

      if (!this.reducedMotion) {
        tag.classList.add('dog-tag--animated');
      }

      return tag;
    }

    /**
     * Create multiple dog tags as a group
     */
    createGroup(tags, options = {}) {
      const group = document.createElement('div');
      group.className = 'dog-tag-group';
      group.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        gap: ${options.gap || '8px'};
      `;

      tags.forEach((tag) => {
        const type = tag.type || 'default';
        const element = this.create(tag.text, type);
        group.appendChild(element);
      });

      return group;
    }

    /**
     * Animate dog tag pulse
     */
    pulse(element) {
      if (this.reducedMotion) return;

      element.classList.add('dog-tag--pulse');

      setTimeout(() => {
        element.classList.remove('dog-tag--pulse');
      }, this.options.animationDuration);
    }

    /**
     * Flash dog tag (for alerts)
     */
    flash(element) {
      if (this.reducedMotion) return;

      element.classList.add('dog-tag--flash');

      setTimeout(() => {
        element.classList.remove('dog-tag--flash');
      }, 500);
    }
  }

  /* --------------------------------------------------------------------------
     Initialize Dog Tag Behaviors
     -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentReady', () => {
    const dogTags = document.querySelectorAll('.dog-tag');

    dogTags.forEach((tag) => {
      // Set ARIA role
      tag.setAttribute('role', 'status');

      // Set live region for dynamic updates
      if (tag.classList.contains('dog-tag--cta')) {
        tag.setAttribute('aria-live', 'polite');
      }
    });
  });

  /* --------------------------------------------------------------------------
     Expose Global
     -------------------------------------------------------------------------- */
  window.DogTags = DogTags;
})();
