/**
 * Bio-Engineering Theme - Animation Controller
 * Manages all organic animations and scroll effects
 */

export class AnimationController {
  constructor() {
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.observers = [];
    this.floatElements = [];
    this.membraneElements = [];
    this.bioElements = [];
    this.animationFrameId = null;
  }

  /**
   * Register elements for scroll-based reveal animation
   */
  registerScrollReveal(selector, options = {}) {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    const observerOptions = {
      threshold: options.threshold || 0.2,
      rootMargin: options.rootMargin || '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal', 'active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    elements.forEach(el => observer.unobserve(el));
    elements.forEach(el => observer.observe(el));
    this.observers.push(observer);
  }

  /**
   * Register floating animation for elements (like organelles)
   */
  registerFloatElements(selector, options = {}) {
    const elements = document.querySelectorAll(selector);
    if (!elements.length || this.reducedMotion) return;

    const amplitude = options.amplitude || 5;
    const duration = options.duration || 4;
    const delay = options.delay || 0;

    elements.forEach((el, index) => {
      el.style.animation = `floatSequence ${duration}s ease-in-out infinite`;
      el.style.animationDelay = `${delay + index * 0.5}s`;
    });
  }

  /**
   * Register membrane breathing animation
   */
  registerMembraneBreathing(selector, options = {}) {
    const elements = document.querySelectorAll(selector);
    if (!elements.length || this.reducedMotion) return;

    const duration = options.duration || 6;
    const scale = options.scale || 1;

    elements.forEach((el, index) => {
      el.style.animation = `membraneBreathing ${duration}s ease-in-out infinite`;
      el.style.animationDelay = `${index * 0.5}s`;
      el.style.transformOrigin = 'center center';
    });
  }

  /**
   * Register bioluminescent pulse animation
   */
  registerBioluminescentPulse(selector, options = {}) {
    const elements = document.querySelectorAll(selector);
    if (!elements.length || this.reducedMotion) return;

    const duration = options.duration || 3;

    elements.forEach((el, index) => {
      el.style.animation = `bioluminescentPulse ${duration}s ease-in-out infinite`;
      el.style.animationDelay = `${index * 0.3}s`;
    });
  }

  /**
   * Parallax effect for background elements
   */
  registerParallax(selector, options = {}) {
    const elements = document.querySelectorAll(selector);
    if (!elements.length || this.reducedMotion) return;

    const speed = options.speed || 0.1;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      elements.forEach((el, index) => {
        const offset = scrolled * speed * (index + 1);
        el.style.transform = `translateY(${offset}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  /**
   * Animate number counting
   */
  animateValue(element, start, end, duration = 2000) {
    if (this.reducedMotion) {
      element.textContent = end;
      return;
    }

    const startTime = performance.now();
    const range = end - start;

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = this.easeOutCubic(progress);
      const current = Math.round(start + range * easeProgress);

      element.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }

  /**
   * Easing function
   */
  easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  /**
   * Stagger animation for child elements
   */
  staggerAnimation(parentSelector, childSelector, options = {}) {
    const parents = document.querySelectorAll(parentSelector);
    if (!parents.length) return;

    const baseDelay = options.baseDelay || 0;
    const staggerDelay = options.staggerDelay || 100;
    const duration = options.duration || 800;
    const animation = options.animation || 'organicGrowth';

    parents.forEach((parent, parentIndex) => {
      const children = parent.querySelectorAll(childSelector);
      children.forEach((child, childIndex) => {
        child.style.opacity = '0';
        child.style.animation = `${animation} ${duration}ms ease-out forwards`;
        child.style.animationDelay = `${baseDelay + (parentIndex * children.length + childIndex) * staggerDelay}ms`;
      });
    });
  }

  /**
   * Initialize DNA rotation animation
   */
  initDNARotation() {
    const dnaStrands = document.querySelectorAll('.dna-strand');
    if (!dnaStrands.length || this.reducedMotion) return;

    dnaStrands.forEach((strand, index) => {
      strand.style.animation = `dnaRotation ${20 + index * 5}s linear infinite`;
      strand.style.animationDirection = index === 0 ? 'normal' : 'reverse';
    });
  }

  /**
   * Initialize cell division animation sequence
   */
  initCellDivision() {
    const cells = document.querySelectorAll('.cell');
    if (!cells.length || this.reducedMotion) return;

    cells.forEach(cell => {
      cell.addEventListener('mouseenter', () => {
        cell.style.animation = 'cellDivision 2.5s ease-in-out';
      });

      cell.addEventListener('animationend', () => {
        cell.style.animation = 'membraneBreathing 6s ease-in-out infinite';
      });
    });
  }

  /**
   * Setup intersection observer for triggering animations
   */
  createIntersectionObserver(callback, options = {}) {
    return new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        callback(entry, entry.isIntersecting);
      });
    }, {
      threshold: options.threshold || 0.3,
      rootMargin: options.rootMargin || '0px'
    });
  }

  /**
   * Cleanup all observers and animations
   */
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    this.floatElements = [];
    this.membraneElements = [];
    this.bioElements = [];
  }
}

export default AnimationController;
