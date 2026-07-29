/**
 * main.js — Hollywood Sign Theme
 * Vanilla JS, no dependencies. Handles mobile nav, reduced motion, scroll reveals.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  // =========================================================================
  // MOBILE NAVIGATION
  // =========================================================================

  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    const navLinks = navMenu.querySelectorAll('a');

    // Toggle menu
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('is-open');
      navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Close on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        navToggle.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // =========================================================================
  // REDUCED MOTION
  // =========================================================================

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function handleReducedMotion() {
    document.documentElement.classList.toggle('reduce-motion', prefersReducedMotion.matches);
  }

  prefersReducedMotion.addEventListener('change', handleReducedMotion);
  handleReducedMotion();

  // =========================================================================
  // SCROLL REVEALS (IntersectionObserver)
  // =========================================================================

  if (!prefersReducedMotion.matches) {
    const revealElements = document.querySelectorAll(
      '.feature-card, .client-card, .download-card, .feature-detail'
    );

    if (revealElements.length && 'IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          rootMargin: '0px 0px -50px 0px',
          threshold: 0.1
        }
      );

      revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        revealObserver.observe(el);
      });
    }
  }

  // Add revealed styles
  const style = document.createElement('style');
  style.textContent = `
    .revealed {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

})();
