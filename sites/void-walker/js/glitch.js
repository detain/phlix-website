/**
 * Void Walker - Glitch Effect System
 * Chromatic aberration, scanlines, and distortion effects
 */

class GlitchSystem {
  constructor(options = {}) {
    this.elements = document.querySelectorAll('[data-glitch], .feature-card, .hero-title');
    this.scanlines = document.querySelector('.rift-overlay');
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.options = {
      glitchInterval: options.glitchInterval || 5000,
      glitchDuration: options.glitchDuration || 200,
      intensity: options.intensity || 1,
      ...options
    };

    this.glitchTimer = null;
    this.isGlitching = false;

    this.init();
  }

  init() {
    if (this.reducedMotion) {
      this.initReducedMotion();
      return;
    }

    this.bindEvents();
    this.startGlitchCycle();
  }

  initReducedMotion() {
    // Remove scanlines for reduced motion
    if (this.scanlines) {
      this.scanlines.style.opacity = '0.05';
    }

    // Static glitch states
    this.elements.forEach(el => {
      el.dataset.glitchIntensity = '0';
    });
  }

  bindEvents() {
    // Hover glitch on feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
      card.addEventListener('mouseenter', () => this.triggerElementGlitch(card));
    });

    // Click glitch on buttons
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('click', (_e) => {
        this.triggerClickGlitch(btn);
      });
    });

    // Scroll-based occasional glitches
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
      const scrollDelta = Math.abs(window.scrollY - lastScrollY);
      if (scrollDelta > 50 && Math.random() < 0.3) {
        this.triggerSubtleGlitch();
      }
      lastScrollY = window.scrollY;
    }, { passive: true });
  }

  startGlitchCycle() {
    this.glitchTimer = setInterval(() => {
      if (Math.random() < 0.3 * this.options.intensity) {
        this.triggerRandomGlitch();
      }
    }, this.options.glitchInterval);
  }

  triggerElementGlitch(element) {
    if (this.isGlitching || this.reducedMotion) return;

    this.isGlitching = true;
    element.classList.add('is-glitching');

    // Chromatic aberration effect
    element.style.textShadow = `
      ${2 * this.options.intensity}px 0 rgba(255, 107, 107, 0.8),
      ${-2 * this.options.intensity}px 0 rgba(108, 99, 255, 0.8)
    `;

    // Slight skew
    element.style.transform = `skewX(${(Math.random() - 0.5) * 2 * this.options.intensity}deg)`;

    setTimeout(() => {
      element.classList.remove('is-glitching');
      element.style.textShadow = '';
      element.style.transform = '';
      this.isGlitching = false;
    }, this.options.glitchDuration * 2);
  }

  triggerClickGlitch(element) {
    if (this.reducedMotion) return;

    this.isGlitching = true;

    // Rapid color shift
    const originalBg = element.style.background;
    const originalTransform = element.style.transform;

    element.style.transform = 'scale(0.98)';

    setTimeout(() => {
      element.style.transform = originalTransform || 'scale(1)';
      element.style.background = originalBg;
      this.isGlitching = false;
    }, 100);
  }

  triggerSubtleGlitch() {
    if (this.isGlitching || this.reducedMotion) return;

    const elements = document.querySelectorAll('.feature-card, .section-title');
    const randomElement = elements[Math.floor(Math.random() * elements.length)];

    if (randomElement) {
      this.triggerElementGlitch(randomElement);
    }
  }

  triggerRandomGlitch() {
    if (this.isGlitching || this.reducedMotion) return;

    this.isGlitching = true;

    // Get all glitchable elements
    const glitchableElements = document.querySelectorAll('.hero-title, .section-title, .feature-title');

    if (glitchableElements.length === 0) {
      this.isGlitching = false;
      return;
    }

    const targetElement = glitchableElements[Math.floor(Math.random() * glitchableElements.length)];

    // Apply glitch
    const originalText = targetElement.textContent;
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';

    let iterations = 0;
    const maxIterations = 5;

    const glitchInterval = setInterval(() => {
      if (iterations >= maxIterations) {
        clearInterval(glitchInterval);
        targetElement.textContent = originalText;
        targetElement.style.textShadow = '';
        this.isGlitching = false;
        return;
      }

      // Generate glitched text
      let glitchedText = '';
      for (let i = 0; i < originalText.length; i++) {
        if (Math.random() < 0.3) {
          glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
        } else {
          glitchedText += originalText[i];
        }
      }

      targetElement.textContent = glitchedText;

      // Chromatic aberration
      targetElement.style.textShadow = `
        ${2 * Math.random() * this.options.intensity}px 0 rgba(255, 107, 107, 0.7),
        ${-2 * Math.random() * this.options.intensity}px 0 rgba(108, 99, 255, 0.7)
      `;

      iterations++;
    }, 30);
  }

  stop() {
    if (this.glitchTimer) {
      clearInterval(this.glitchTimer);
      this.glitchTimer = null;
    }
    this.isGlitching = false;
  }

  destroy() {
    this.stop();
    this.elements.forEach(el => {
      el.classList.remove('is-glitching');
      el.style.textShadow = '';
      el.style.transform = '';
    });
  }
}

// Scanline effect
class ScanlineSystem {
  constructor() {
    this.overlay = document.querySelector('.rift-overlay');
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.lines = document.querySelectorAll('.rift-line');
    this.animationFrame = null;

    this.init();
  }

  init() {
    if (this.reducedMotion) {
      this.lines.forEach(line => {
        line.style.opacity = '0.1';
        line.style.animation = 'none';
      });
      return;
    }

    this.animate();
  }

  animate() {
    // Lines animate via CSS, this is for potential JS control
    this.animationFrame = requestAnimationFrame(this.animate.bind(this));
  }

  stop() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }
}

// Shadow creature animation
class ShadowCreature {
  constructor() {
    this.creature = document.getElementById('shadow-creature');
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isVisible = false;

    if (this.creature) {
      this.init();
    }
  }

  init() {
    if (this.reducedMotion) {
      this.creature.style.animation = 'none';
      this.creature.style.opacity = '0.4';
      return;
    }

    // Intersection observer for visibility
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.show();
            } else {
              this.hide();
            }
          });
        },
        { threshold: 0.1 }
      );

      // Observe the footer area where creature typically appears
      const footer = document.querySelector('.site-footer');
      if (footer) {
        this.observer.observe(footer);
      } else {
        this.show();
      }
    } else {
      this.show();
    }
  }

  show() {
    if (this.isVisible) return;
    this.isVisible = true;
    this.creature.style.opacity = '0.6';
  }

  hide() {
    if (!this.isVisible) return;
    this.isVisible = false;
    this.creature.style.opacity = '0';
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Initialize glitch systems
function initGlitch() {
  const glitchSystem = new GlitchSystem({
    glitchInterval: 6000,
    glitchDuration: 250,
    intensity: 1,
  });

  const scanlineSystem = new ScanlineSystem();
  const shadowCreature = new ShadowCreature();

  // Store references
  window.glitchSystem = glitchSystem;
  window.scanlineSystem = scanlineSystem;
  window.shadowCreature = shadowCreature;
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGlitch);
} else {
  initGlitch();
}

export { GlitchSystem, ScanlineSystem, ShadowCreature, initGlitch };
