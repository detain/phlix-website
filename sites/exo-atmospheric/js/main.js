/**
 * ============================================================================
 *  EXO-ATMOSPHERIC BRAND KIT — Main JavaScript
 * ============================================================================
 *  Theme: Outside Earth's atmosphere — vast, infinite, cosmic
 *  Features: Parallax star field, aurora waves, orbit paths, navigation
 * ============================================================================
 */

(function() {
  'use strict';

  /* ==========================================================================
     1. INITIALIZE ON DOM READY
     ========================================================================== */

  document.addEventListener('DOMContentLoaded', function() {
    initStarField();
    initAuroraWaves();
    initNavigation();
    initScrollEffects();
    initAccessibility();
  });

  /* ==========================================================================
     2. PARALLAX STAR FIELD
     ========================================================================== */

  function initStarField() {
    const starField = document.querySelector('.star-field');
    if (!starField) return;

    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Add depth intensification over time
    let depthLevel = 0;
    const maxDepth = 5;
    const depthInterval = 10000; // 10 seconds per depth level

    function intensifyDepth() {
      if (depthLevel < maxDepth) {
        depthLevel++;
        starField.setAttribute('data-depth', depthLevel);
        starField.style.opacity = 0.5 + (depthLevel * 0.1);
      }
    }

    // Gradually deepen the star field
    setInterval(intensifyDepth, depthInterval);

    // Subtle mouse parallax effect
    let ticking = false;

    if (window.matchMedia('(pointer: fine)').matches) {
      document.addEventListener('mousemove', function(e) {
        if (!ticking) {
          requestAnimationFrame(function() {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;

            const layers = starField.querySelectorAll('.star-field__layer');
            layers.forEach(function(layer, index) {
              const depth = (index + 1) * 0.5;
              layer.style.transform = 'translate(' + (x * depth) + 'px, ' + (y * depth) + 'px)';
            });

            ticking = false;
          });
          ticking = true;
        }
      });
    }
  }

  /* ==========================================================================
     3. AURORA WAVE ANIMATION
     ========================================================================== */

  function initAuroraWaves() {
    const auroraElements = document.querySelectorAll('.aurora');
    if (!auroraElements.length) return;

    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      auroraElements.forEach(function(aurora) {
        aurora.style.opacity = '0.3';
      });
      return;
    }

    // Initialize aurora wave animations
    auroraElements.forEach(function(aurora) {
      aurora.setAttribute('aria-hidden', 'true');
    });
  }

  /* ==========================================================================
     4. NAVIGATION
     ========================================================================== */

  function initNavigation() {
    const nav = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav__toggle');
    const navLinks = document.querySelector('.nav__links');

    if (!nav) return;

    // Mobile menu toggle
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('nav__links--open');
        const isOpen = navLinks.classList.contains('nav__links--open');
        navToggle.setAttribute('aria-expanded', isOpen);

        // Update toggle icon
        const icon = navToggle.querySelector('svg use');
        if (icon) {
          icon.setAttribute('href', isOpen ? '#icon-close' : '#icon-menu');
        }
      });

      // Close menu on link click
      navLinks.querySelectorAll('.nav__link').forEach(function(link) {
        link.addEventListener('click', function() {
          navLinks.classList.remove('nav__links--open');
          navToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Scroll-based nav background
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 50) {
        nav.classList.add('nav--scrolled');
      } else {
        nav.classList.remove('nav--scrolled');
      }
    }, { passive: true });

    // Active link highlighting
    const currentPath = window.location.pathname;
    navLinks && navLinks.querySelectorAll('.nav__link').forEach(function(link) {
      const href = link.getAttribute('href');
      if (href && (currentPath === href || currentPath.includes(href))) {
        link.classList.add('nav__link--active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ==========================================================================
     5. SCROLL EFFECTS
     ========================================================================== */

  function initScrollEffects() {
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.card, .section-header, .hero__content');

    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
      });

      revealElements.forEach(function(el) {
        el.classList.add('reveal');
        revealObserver.observe(el);
      });
    } else {
      // Fallback: reveal all immediately
      revealElements.forEach(function(el) {
        el.classList.add('revealed');
      });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // Update focus for accessibility
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
      });
    });
  }

  /* ==========================================================================
     6. ACCESSIBILITY
     ========================================================================== */

  function initAccessibility() {
    // Handle reduced motion preference changes
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    motionQuery.addEventListener('change', function(e) {
      document.body.classList.toggle('reduced-motion', e.matches);

      // Update star field
      const starField = document.querySelector('.star-field');
      if (starField) {
        starField.style.opacity = e.matches ? '0.5' : '1';
      }
    });

    // Skip link for keyboard navigation
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.tabIndex = -1;
          target.focus();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

  }

  /* ==========================================================================
     7. EXPORTED API (for potential external use)
     ========================================================================== */

  window.ExoAtmospheric = {
    version: '1.0',
    init: function() {
      initStarField();
      initAuroraWaves();
      initNavigation();
      initScrollEffects();
      initAccessibility();
    },
    getReducedMotion: function() {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  };

})();
