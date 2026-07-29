/* ==========================================================================
   MAIN.JS — Film Grain
   Vanilla JS for navigation, reduced motion, and scroll reveals.
   @copyright 2026 Joe Huss <detain@interserver.net>
   ========================================================================== */

(function() {
  'use strict';

  /* ========================================
     MOBILE NAVIGATION
     ======================================== */

  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navOverlay = document.querySelector('.nav-overlay');

  function openNav() {
    navMenu.classList.add('is-open');
    navOverlay.classList.add('is-visible');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    // Focus first menu item
    const firstLink = navMenu.querySelector('a');
    if (firstLink) firstLink.focus();
  }

  function closeNav() {
    navMenu.classList.remove('is-open');
    navOverlay.classList.remove('is-visible');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    navToggle.focus();
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('is-open');
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Close on overlay click
    if (navOverlay) {
      navOverlay.addEventListener('click', closeNav);
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        closeNav();
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('is-open') &&
          !navMenu.contains(e.target) &&
          !navToggle.contains(e.target)) {
        closeNav();
      }
    });
  }

  /* ========================================
     REDUCED MOTION
     ======================================== */

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function handleReducedMotion() {
    if (prefersReducedMotion.matches) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  }

  handleReducedMotion();
  prefersReducedMotion.addEventListener('change', handleReducedMotion);

  /* ========================================
     SCROLL REVEAL ANIMATION
     ======================================== */

  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0 && !prefersReducedMotion.matches) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });
  }

  /* ========================================
     FAQ DETAILS ACCESSIBILITY
     ======================================== */

  const faqDetails = document.querySelectorAll('.faq-list details');

  faqDetails.forEach((details) => {
    const summary = details.querySelector('summary');

    if (summary) {
      // Add aria-expanded when JS is running
      details.addEventListener('toggle', () => {
        summary.setAttribute('aria-expanded', details.open);
      });

      // Keyboard navigation
      summary.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          details.toggle();
        }
      });
    }
  });

  /* ========================================
     STAGGERED REVEAL FOR GRID ITEMS
     ======================================== */

  const staggerContainers = document.querySelectorAll('[data-stagger]');

  if (staggerContainers.length > 0 && !prefersReducedMotion.matches) {
    const staggerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('[data-stagger-item]');
            items.forEach((item, index) => {
              item.style.transitionDelay = `${index * 100}ms`;
              item.classList.add('is-visible');
            });
            staggerObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1
      }
    );

    staggerContainers.forEach((container) => {
      // Set initial state
      const items = container.querySelectorAll('[data-stagger-item]');
      items.forEach((item) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      });

      staggerObserver.observe(container);
    });
  }

})();
