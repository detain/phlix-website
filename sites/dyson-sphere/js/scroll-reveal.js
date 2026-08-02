/**
 * Dyson Sphere - Scroll Reveal Module
 * Handles scroll-based reveal animations
 */

class ScrollReveal {
  constructor(options = {}) {
    this.options = {
      threshold: options.threshold || 0.2,
      rootMargin: options.rootMargin || '0px 0px -50px 0px',
      staggerDelay: options.staggerDelay || 100,
      ...options,
    };

    this.observer = null;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    if (this.prefersReducedMotion) {
      this.revealAll();
      return;
    }

    this.createObserver();
    this.observeElements();
  }

  createObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.revealElement(entry.target);
          this.observer.unobserve(entry.target);
        }
      });
    }, this.options);
  }

  observeElements() {
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      this.observer.observe(el);
    });
  }

  revealElement(element) {
    const delay = element.dataset.revealDelay || 0;

    setTimeout(() => {
      element.classList.add('revealed');

      // Trigger solar flare for certain elements
      if (element.classList.contains('feature-card')) {
        this.triggerRevealFlare(element);
      }
    }, delay);
  }

  triggerRevealFlare(element) {
    if (!window.stellarEngine) return;

    const rect = element.getBoundingClientRect();
    window.stellarEngine.createSolarFlare(
      rect.left + rect.width / 2,
      rect.top + rect.height / 2,
      0.5,
    );
  }

  revealAll() {
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      el.classList.add('revealed');
    });
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

window.ScrollReveal = ScrollReveal;
