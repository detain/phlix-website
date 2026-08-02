/**
 * Bio-Engineering Brand Kit — Main JavaScript
 * Vanilla JS, no dependencies, defer-loaded
 */

(function () {
  'use strict';

  // ========================================
  // Mobile Navigation Toggle
  // ========================================

  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen.toString());
      navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (
        !navToggle.contains(e.target) &&
        !navMenu.contains(e.target) &&
        navMenu.classList.contains('is-open')
      ) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open navigation');
        document.body.style.overflow = '';
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open navigation');
        document.body.style.overflow = '';
        navToggle.focus();
      }
    });

    // Trap focus in mobile menu
    navMenu.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;

      const focusableElements = navMenu.querySelectorAll('a[href], button:not([disabled])');
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    });
  }

  // ========================================
  // Reduced Motion Detection
  // ========================================

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function handleReducedMotion() {
    if (prefersReducedMotion.matches) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  }

  handleReducedMotion();
  prefersReducedMotion.addEventListener('change', handleReducedMotion);

  // ========================================
  // Scroll Reveal Animation
  // ========================================

  if (!prefersReducedMotion.matches) {
    const revealElements = document.querySelectorAll(
      '.feature-card, .client-card, .download-card, .feature-detail',
    );

    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px',
        },
      );

      revealElements.forEach(function (el) {
        el.classList.add('reveal');
        revealObserver.observe(el);
      });
    }
  }

  // ========================================
  // Smooth Scroll for Anchor Links
  // ========================================

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
          block: 'start',
        });

        // Update focus for accessibility
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus({ preventScroll: true });
      }
    });
  });

  // ========================================
  // Bioluminescent Pulse Effect (CSS-driven)
  // Only active if JS is enabled and motion is allowed
  // ========================================

  const pulseElements = document.querySelectorAll('.bioluminescent-pulse');

  if (pulseElements.length > 0 && !prefersReducedMotion.matches) {
    pulseElements.forEach(function (el) {
      el.style.animation = 'bioluminescentPulse 3s ease-in-out infinite';
    });
  }

  // ========================================
  // Active Nav Link Highlighting
  // ========================================

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-menu a');

  navLinks.forEach(function (link) {
    const linkPath = link.getAttribute('href');
    if (
      linkPath === currentPath ||
      (currentPath === '' && linkPath === 'index.html') ||
      (currentPath === 'index.html' && linkPath === './') ||
      (currentPath === 'index.html' && linkPath === 'index.html')
    ) {
      link.setAttribute('aria-current', 'page');
    }
  });

  // ========================================
  // Touch Device Detection
  // ========================================

  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.documentElement.classList.add('touch-device');
  }
})();
