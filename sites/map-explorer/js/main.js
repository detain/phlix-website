/**
 * main.js — map-explorer
 * Vanilla JS for Phlix brand kit site.
 * Handles: mobile nav toggle, reduced motion, scroll reveals.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  // =======================================================================
  // Mobile Navigation Toggle
  // =======================================================================

  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    const navLinks = navMenu.querySelectorAll('a');

    // Toggle menu
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    navLinks.forEach((link) => {
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

    // Trap focus in open menu
    navMenu.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;

      const focusable = Array.from(
        navMenu.querySelectorAll('a[href], button:not([disabled]), textarea, input, select'),
      );

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  // =======================================================================
  // Reduced Motion
  // =======================================================================

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function handleReducedMotion() {
    document.documentElement.classList.toggle('reduce-motion', prefersReducedMotion.matches);
  }

  prefersReducedMotion.addEventListener('change', handleReducedMotion);
  handleReducedMotion();

  // =======================================================================
  // Scroll Reveals (IntersectionObserver)
  // =======================================================================

  if (!prefersReducedMotion.matches) {
    const revealElements = document.querySelectorAll(
      '.feature-card, .client-card, .download-card, .feature-detail',
    );

    if ('IntersectionObserver' in window && revealElements.length > 0) {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-fade-in-up');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          rootMargin: '0px 0px -50px 0px',
          threshold: 0.1,
        },
      );

      revealElements.forEach((el) => {
        el.style.opacity = '0';
        revealObserver.observe(el);
      });
    }
  }

  // =======================================================================
  // FAQ Details Animation (optional enhancement)
  // =======================================================================

  const faqDetails = document.querySelectorAll('.faq-list details');

  faqDetails.forEach((details) => {
    const summary = details.querySelector('summary');

    if (summary) {
      summary.addEventListener('click', (e) => {
        // Ensure smooth animation when toggling
        if (prefersReducedMotion.matches) {
          e.preventDefault();
          details.open = !details.open;
        }
      });
    }
  });
})();

/* @copyright 2026 Joe Huss <detain@interserver.net> */
