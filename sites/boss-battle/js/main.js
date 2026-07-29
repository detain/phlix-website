/*!
 * @copyright Copyright (c) 2026 Phlix Project
 * @license MPL-2.0 (phlix-server/phlix-hub) / MIT (clients/plugins)
 *
 * Boss-Battle Theme — main.js
 * Nav toggle, reduced motion, scroll reveals
 */

(function () {
  'use strict';

  /* ============================================================
     REDUCED MOTION CHECK
     ============================================================ */

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============================================================
     MOBILE NAV TOGGLE
     ============================================================ */

  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    // Track focus for aria-expanded
    let isOpen = false;

    function openNav() {
      isOpen = true;
      navToggle.setAttribute('aria-expanded', 'true');
      navMenu.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function closeNav() {
      isOpen = false;
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    navToggle.addEventListener('click', function () {
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (isOpen && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        closeNav();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) {
        closeNav();
        navToggle.focus();
      }
    });

    // Trap focus within open menu
    navMenu.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;

      const focusableElements = navMenu.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
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

  /* ============================================================
     SCROLL REVEAL ANIMATION
     ============================================================ */

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll('.feature-card, .client-card, .feature-detail, .download-card, .ecosystem-item');

    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
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

    revealElements.forEach(function (el) {
      el.style.opacity = '0';
      revealObserver.observe(el);
    });
  }

  /* ============================================================
     FAQ ACCORDION (ensure proper behavior)
     ============================================================ */

  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-item__question');

    if (question) {
      question.addEventListener('click', function () {
        // Close other items
        faqItems.forEach(function (otherItem) {
          if (otherItem !== item && otherItem.hasAttribute('open')) {
            otherItem.removeAttribute('open');
          }
        });
      });
    }
  });

  /* ============================================================
     SMOOTH SCROLL FOR ANCHOR LINKS
     ============================================================ */

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start'
        });

        // If nav is open, close it
        if (navMenu && navMenu.classList.contains('is-open')) {
          navToggle.setAttribute('aria-expanded', 'false');
          navMenu.classList.remove('is-open');
          document.body.style.overflow = '';
        }
      }
    });
  });

})();
