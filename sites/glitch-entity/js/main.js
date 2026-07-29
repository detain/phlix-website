/* ==========================================================================
   MAIN.JS — Glitch Entity Theme
   Vanilla JS, dependency-free, defer-loaded
   @copyright 2026 Joe Huss <detain@interserver.net>
   ========================================================================== */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     Reduced Motion Detection
     -------------------------------------------------------------------------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function handleReducedMotionChange() {
    document.body.classList.toggle('motion-reduced', prefersReducedMotion.matches);
  }

  prefersReducedMotion.addEventListener('change', handleReducedMotionChange);
  handleReducedMotionChange();

  /* --------------------------------------------------------------------------
     Mobile Navigation Toggle
     -------------------------------------------------------------------------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* --------------------------------------------------------------------------
     Scroll Reveals — IntersectionObserver fade-ins
     -------------------------------------------------------------------------- */
  if (!prefersReducedMotion.matches && 'IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll('.feature-card, .client-card, .download-card, .feature-detail');

    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
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

    revealElements.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      revealObserver.observe(el);
    });

    // Add revealed class styles
    const style = document.createElement('style');
    style.textContent = `
      .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(style);
  }

  /* --------------------------------------------------------------------------
     Focus Trap for Modals (if needed in future)
     -------------------------------------------------------------------------- */
  function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus();
          e.preventDefault();
        }
      }
    });
  }

  /* --------------------------------------------------------------------------
     Smooth Scroll for Anchor Links
     -------------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
          block: 'start'
        });
      }
    });
  });

  /* --------------------------------------------------------------------------
     Glitch Effect on Hover (for interactive elements)
     -------------------------------------------------------------------------- */
  if (!prefersReducedMotion.matches) {
    const glitchElements = document.querySelectorAll('.btn-primary, .hero h1');

    glitchElements.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        this.style.animation = 'none';
        this.offsetHeight; // Trigger reflow
        this.style.animation = 'glitch-hover 0.3s ease';
      });
    });

    const glitchStyle = document.createElement('style');
    glitchStyle.textContent = `
      @keyframes glitch-hover {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
      }
    `;
    document.head.appendChild(glitchStyle);
  }

})();
