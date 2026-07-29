/* ==========================================================================
   VOID WALKER — MAIN JAVASCRIPT
   Navigation toggle, reduced motion, scroll reveals.
   ========================================================================== */

(function() {
  'use strict';

  /* --------------------------------------------------------------------------
     Mobile Navigation Toggle
     -------------------------------------------------------------------------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    const navLinks = navMenu.querySelectorAll('.nav-menu__link');

    // Toggle menu
    navToggle.addEventListener('click', function() {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        navToggle.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Trap focus in menu when open
    navMenu.addEventListener('keydown', function(e) {
      if (e.key !== 'Tab') return;

      const focusable = Array.from(navMenu.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      ));

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

  /* --------------------------------------------------------------------------
     Reduced Motion Check
     -------------------------------------------------------------------------- */
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

  /* --------------------------------------------------------------------------
     Scroll Reveal (Intersection Observer)
     -------------------------------------------------------------------------- */
  if (!prefersReducedMotion.matches) {
    const revealElements = document.querySelectorAll('.feature-card, .feature-detail, .client-card, .download-card, .faq-item');

    if ('IntersectionObserver' in window && revealElements.length > 0) {
      const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
      });

      revealElements.forEach(function(el) {
        el.classList.add('reveal');
        revealObserver.observe(el);
      });
    }
  }

  /* --------------------------------------------------------------------------
     Smooth Scroll for Anchor Links
     -------------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
          block: 'start'
        });

        // Update focus for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });

  /* --------------------------------------------------------------------------
     Active Nav Link Highlighting
     -------------------------------------------------------------------------- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navItems = document.querySelectorAll('.nav-menu__link');

  navItems.forEach(function(link) {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    }
  });

})();
