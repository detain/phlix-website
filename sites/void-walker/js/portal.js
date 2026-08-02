/**
 * Void Walker - Portal Animation System
 * Handles portal swirl, core pulse, and ring animations
 */

class PortalSystem {
  constructor(options = {}) {
    this.portals = document.querySelectorAll('.main-portal, .hero-portal, .cta-portal, .shift-orb');
    this.riftLines = document.querySelectorAll('.rift-line');
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.animationFrame = null;
    this.time = 0;

    this.options = {
      pulseSpeed: options.pulseSpeed || 0.002,
      rotationSpeed: options.rotationSpeed || 0.001,
      riftGlitchChance: options.riftGlitchChance || 0.02,
      ...options,
    };

    this.init();
  }

  init() {
    if (this.reducedMotion) {
      this.initReducedMotion();
      return;
    }

    this.bindEvents();
    this.startAnimation();
  }

  initReducedMotion() {
    // For reduced motion, ensure portals have some static glow
    this.portals.forEach((portal) => {
      portal.style.opacity = '0.15';
      const core = portal.querySelector('.portal-core, .h-portal-core, .orb-core');
      if (core) {
        core.style.animation = 'none';
        core.style.opacity = '0.5';
      }
    });

    // Static rift lines
    this.riftLines.forEach((rift) => {
      rift.style.opacity = '0.2';
      rift.style.animation = 'none';
    });
  }

  bindEvents() {
    // Intersection Observer for portal visibility
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.activatePortal(entry.target);
            } else {
              this.deactivatePortal(entry.target);
            }
          });
        },
        { threshold: 0.1 },
      );

      this.portals.forEach((portal) => {
        this.observer.observe(portal);
      });
    }

    // Scroll-based portal parallax
    window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
  }

  activatePortal(portal) {
    portal.classList.add('is-active');
    portal.style.opacity = '';
  }

  deactivatePortal(portal) {
    portal.classList.remove('is-active');
  }

  handleScroll() {
    if (this.reducedMotion) return;

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // Parallax effect on main portal
    const mainPortal = document.querySelector('.main-portal');
    if (mainPortal && scrollY < windowHeight * 2) {
      const parallax = scrollY * 0.3;
      mainPortal.style.transform = `translateY(calc(-50% + ${parallax}px))`;
    }

    // Opacity fade based on scroll
    this.portals.forEach((portal) => {
      const rect = portal.getBoundingClientRect();
      const isVisible = rect.top < windowHeight && rect.bottom > 0;

      if (isVisible && portal.classList.contains('hero-portal')) {
        const opacity = Math.max(0, 1 - scrollY / (windowHeight * 0.8));
        portal.style.opacity = Math.min(0.3, opacity * 0.3);
      }
    });
  }

  startAnimation() {
    this.animate();
  }

  animate() {
    if (this.reducedMotion) return;

    this.time += 16; // ~60fps

    // Animate rift lines occasionally
    if (Math.random() < this.options.riftGlitchChance) {
      this.triggerRiftGlitch();
    }

    this.animationFrame = requestAnimationFrame(this.animate.bind(this));
  }

  triggerRiftGlitch() {
    const randomRift = this.riftLines[Math.floor(Math.random() * this.riftLines.length)];
    if (!randomRift) return;

    randomRift.style.animation = 'none';
    randomRift.offsetHeight; // Trigger reflow
    randomRift.style.animation = '';

    // Random glitch effect
    randomRift.style.transform = `scaleX(${0.5 + Math.random() * 0.5}) translateX(${(Math.random() - 0.5) * 20}%)`;
    randomRift.style.opacity = '0.8';

    setTimeout(() => {
      randomRift.style.transform = '';
      randomRift.style.opacity = '';
    }, 150);
  }

  stop() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  destroy() {
    this.stop();
    if (this.observer) {
      this.observer.disconnect();
    }
    window.removeEventListener('scroll', this.handleScroll);
  }
}

// Hero Portal specific behavior
class HeroPortal {
  constructor() {
    this.portal = document.querySelector('.hero-portal');
    this.rings = document.querySelectorAll('.h-portal-ring');
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (this.portal) {
      this.init();
    }
  }

  init() {
    if (this.reducedMotion) {
      this.rings.forEach((ring, i) => {
        ring.style.animation = 'none';
        ring.style.opacity = (0.3 - i * 0.05).toString();
      });
      return;
    }

    // Mouse interaction
    this.portal.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.portal.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
  }

  handleMouseMove(e) {
    if (this.reducedMotion) return;

    const rect = this.portal.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Subtle tilt based on mouse position
    const tiltX = (y / rect.height) * 10;
    const tiltY = (x / rect.width) * -10;

    this.rings.forEach((ring, i) => {
      const factor = (i + 1) * 0.3;
      ring.style.transform = `rotateX(${tiltX * factor}deg) rotateY(${tiltY * factor}deg)`;
    });
  }

  handleMouseLeave() {
    this.rings.forEach((ring) => {
      ring.style.transform = '';
    });
  }
}

// Initialize portals
function initPortals() {
  const portalSystem = new PortalSystem({
    pulseSpeed: 0.002,
    rotationSpeed: 0.001,
    riftGlitchChance: 0.03,
  });

  const heroPortal = new HeroPortal();

  // Store references
  window.portalSystem = portalSystem;
  window.heroPortal = heroPortal;
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortals);
} else {
  initPortals();
}

export { PortalSystem, HeroPortal, initPortals };
