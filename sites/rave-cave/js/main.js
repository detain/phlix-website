/**
 * Rave Cave — main.js
 * Mobile navigation toggle, scroll reveals, reduced motion support.
 * Vanilla JS, dependency-free, defer-loaded.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  // ─── MOBILE NAV TOGGLE ─────────────────────────────────────────────────────
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    const toggleMenu = () => {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    navToggle.addEventListener('click', toggleMenu);

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        toggleMenu();
        navToggle.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        if (navMenu.classList.contains('is-open')) {
          toggleMenu();
        }
      }
    });

    // Close on resize to desktop
    const mediaQuery = window.matchMedia('(min-width: 1025px)');
    const handleResize = (e) => {
      if (e.matches && navMenu.classList.contains('is-open')) {
        toggleMenu();
        document.body.style.overflow = '';
      }
    };
    mediaQuery.addEventListener('change', handleResize);
  }

  // ─── REDUCED MOTION ────────────────────────────────────────────────────────
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const disableAnimations = (element) => {
    element.style.animation = 'none';
    element.style.transition = 'none';
  };

  if (prefersReducedMotion.matches) {
    document.querySelectorAll('.animate-float, .animate-pulse-glow').forEach(disableAnimations);
  }

  // ─── SCROLL REVEALS ────────────────────────────────────────────────────────
  if (!prefersReducedMotion.matches && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1,
      }
    );

    document.querySelectorAll('.feature-card, .feature-detail, .client-card, .download-card').forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      revealObserver.observe(el);
    });

    // Add CSS for revealed state
    const style = document.createElement('style');
    style.textContent = `
      .is-revealed { opacity: 1 !important; transform: translateY(0) !important; }
    `;
    document.head.appendChild(style);
  }

  // ─── FOCUS TRAP FOR MOBILE NAV ────────────────────────────────────────────
  // Keep focus within open mobile nav
  if (navToggle && navMenu) {
    navMenu.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;

      const focusableElements = navMenu.querySelectorAll(
        'a[href], button:not([disabled])'
      );
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
})();

/* @copyright 2026 Joe Huss <detain@interserver.net> */
