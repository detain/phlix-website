/**
 * Neural-Link Accessibility
 * A11y Features and Helpers
 */

export class AccessibilityManager {
  constructor() {
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.init();
  }

  init() {
    this.setupAriaLabels();
    this.setupFocusManagement();
    this.setupReducedMotion();
    this.setupSkipLinks();
  }

  setupAriaLabels() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
      if (!btn.getAttribute('aria-label') && !btn.textContent.trim()) {
        btn.setAttribute('aria-label', 'Neural interface button');
      }
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      if (!link.getAttribute('aria-label')) {
        link.setAttribute('aria-label', `Navigate to ${link.textContent}`);
      }
    });
  }

  setupFocusManagement() {
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-nav');
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
          modal.classList.remove('active');
        });
      }
    });
  }

  setupReducedMotion() {
    this.reducedMotion.addEventListener('change', (e) => {
      document.body.classList.toggle('reduce-motion', e.matches);

      if (e.matches) {
        document.querySelectorAll('.memory-cube, .thought-bubble, .pulse-ring').forEach(el => {
          el.style.animation = 'none';
        });
      }
    });

    document.body.classList.toggle('reduce-motion', this.reducedMotion.matches);
  }

  setupSkipLinks() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  announceToScreenReader(message, priority = 'polite') {
    const announcer = document.createElement('div');
    announcer.setAttribute('role', 'status');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = message;
    document.body.appendChild(announcer);

    setTimeout(() => {
      announcer.remove();
    }, 1000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.accessibilityManager = new AccessibilityManager();
});

export default AccessibilityManager;
