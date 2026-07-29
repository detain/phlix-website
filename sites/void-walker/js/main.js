/**
 * Void Walker - Main JavaScript
 * Initialization and main application logic
 */

// Import modules (for use with ES modules bundler)
// import { initDebrisSystem } from './particles.js';
// import { initPortals } from './portal.js';
// import { initGlitch } from './glitch.js';

// Fallback initialization if modules aren't supported
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all systems
  initAll();

  // Set up navigation
  initNavigation();

  // Set up scroll behaviors
  initScrollBehavior();

  // Set up intersection observers
  initIntersectionObservers();

  // Set up accessibility
  initAccessibility();

  // Set up reduced motion preference
  initReducedMotion();
});

/**
 * Initialize all animation and particle systems
 */
function initAll() {
  // Debris particles
  const debrisContainer = document.getElementById('debris-container');
  if (debrisContainer) {
    // Particles are initialized via their own script
  }

  // Portal animations
  // Portal system is self-initializing

  // Glitch effects
  // Glitch system is self-initializing
}

/**
 * Navigation initialization and behavior
 */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  // Mobile menu toggle
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('is-open');
      mobileToggle.setAttribute('aria-expanded', isOpen.toString());
      mobileNav.setAttribute('aria-hidden', (!isOpen).toString());
    });

    // Close mobile nav when clicking a link
    mobileNav.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
      });
    });
  }

  // Active nav link based on scroll position
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // Header scroll state
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/**
 * Scroll-based behaviors
 */
function initScrollBehavior() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });

  // Parallax effect for void layers
  const voidDepth1 = document.querySelector('.void-depth-1');
  const voidDepth2 = document.querySelector('.void-depth-2');

  if (voidDepth1 && voidDepth2) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const factor = 0.3;

      voidDepth1.style.transform = `translateY(${scrollY * factor * 0.5}px)`;
      voidDepth2.style.transform = `translateY(${scrollY * factor * 0.3}px)`;
    }, { passive: true });
  }
}

/**
 * Intersection Observer for reveal animations
 */
function initIntersectionObservers() {
  if (!('IntersectionObserver' in window)) {
    // Fallback: show all elements immediately
    document.querySelectorAll('.feature-card, .section-header').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  // Reveal on scroll
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  document.querySelectorAll('.feature-card, .section-header, .shift-content, .cta-content').forEach(el => {
    el.classList.add('reveal-on-scroll');
    revealObserver.observe(el);
  });

  // Stagger animation for feature cards
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.feature-card');
          cards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 100}ms`;
          });
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  const featuresGrid = document.querySelector('.features-grid');
  if (featuresGrid) {
    cardObserver.observe(featuresGrid);
  }
}

/**
 * Accessibility enhancements
 */
function initAccessibility() {
  // Focus trap for modals (if any)
  // Keyboard navigation improvements
  // Screen reader announcements

  // Announce page load
  const announcer = document.createElement('div');
  announcer.setAttribute('aria-live', 'polite');
  announcer.setAttribute('aria-atomic', 'true');
  announcer.className = 'visually-hidden';
  document.body.appendChild(announcer);

  setTimeout(() => {
    announcer.textContent = 'Void Walker page loaded. Traversing the membrane between dimensions.';
  }, 1000);
}

/**
 * Reduced motion preference handling
 */
function initReducedMotion() {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function handleReducedMotion(e) {
    if (e.matches) {
      document.body.classList.add('reduced-motion');
    } else {
      document.body.classList.remove('reduced-motion');
    }
  }

  mediaQuery.addEventListener('change', handleReducedMotion);
  handleReducedMotion(mediaQuery);

  // Listen for custom event to toggle motion (for manual override)
  document.addEventListener('voidwalker:toggle-motion', (e) => {
    if (e.detail && e.detail.reduced !== undefined) {
      document.body.classList.toggle('reduced-motion', e.detail.reduced);
    }
  });
}

/**
 * Utility: Debounce function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Utility: Throttle function
 */
function throttle(func, limit) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Get animation preferences based on user settings
 */
function getMotionPreference() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'reduced' : 'full';
}

/**
 * Check if user prefers high contrast
 */
function getContrastPreference() {
  return window.matchMedia('(prefers-contrast: high)').matches ? 'high' : 'normal';
}

// Export utilities for use in other modules
window.VoidWalker = {
  debounce,
  throttle,
  getMotionPreference,
  getContrastPreference,
};

// Add CSS for reveal animations
const revealStyles = document.createElement('style');
revealStyles.textContent = `
  .reveal-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s cubic-bezier(0.22, 0.61, 0.36, 1),
                transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
  }

  .reveal-on-scroll.is-revealed {
    opacity: 1;
    transform: translateY(0);
  }

  .reduced-motion .reveal-on-scroll {
    opacity: 1;
    transform: none;
    transition: none;
  }
`;
document.head.appendChild(revealStyles);
