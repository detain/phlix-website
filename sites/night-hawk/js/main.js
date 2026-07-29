/**
 * Night Hawk Brand Kit — main.js
 * Navigation toggle, reduced motion, scroll reveals
 */

(function() {
  'use strict';

  /* ==========================================================================
     Reduced Motion Check
     ========================================================================== */

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================================
     Mobile Navigation Toggle
     ========================================================================== */

  function initNavToggle() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');

    if (!toggle || !menu) return;

    function openMenu() {
      menu.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close navigation');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Toggle navigation');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', function() {
      const isOpen = menu.classList.contains('open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        closeMenu();
        toggle.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
      if (menu.classList.contains('open') &&
          !menu.contains(e.target) &&
          !toggle.contains(e.target)) {
        closeMenu();
      }
    });

    // Trap focus within menu when open
    menu.addEventListener('keydown', function(e) {
      if (e.key !== 'Tab') return;

      const focusableElements = menu.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex="0"]'
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

  /* ==========================================================================
     Scroll Reveals
     ========================================================================== */

  function initScrollReveals() {
    if (prefersReducedMotion) {
      // Show all elements immediately if reduced motion preferred
      document.querySelectorAll('.reveal').forEach(function(el) {
        el.classList.add('revealed');
      });
      return;
    }

    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    const revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(function(el) {
      revealObserver.observe(el);
    });
  }

  /* ==========================================================================
     FAQ Accordion
     ========================================================================== */

  function initFaqAccordion() {
    const faqTerms = document.querySelectorAll('.faq-list dt');
    if (!faqTerms.length) return;

    faqTerms.forEach(function(term) {
      term.setAttribute('role', 'button');
      term.setAttribute('tabindex', '0');
      term.setAttribute('aria-expanded', 'false');

      const answer = term.nextElementSibling;
      if (answer) {
        answer.setAttribute('aria-hidden', 'true');
      }

      function toggleFaq() {
        const isExpanded = term.getAttribute('aria-expanded') === 'true';

        // Close all others (optional - for single-open behavior)
        // faqTerms.forEach(function(t) {
        //   t.setAttribute('aria-expanded', 'false');
        //   const a = t.nextElementSibling;
        //   if (a) a.setAttribute('aria-hidden', 'true');
        // });

        term.setAttribute('aria-expanded', String(!isExpanded));
        if (answer) {
          answer.setAttribute('aria-hidden', String(isExpanded));
        }
      }

      term.addEventListener('click', toggleFaq);
      term.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleFaq();
        }
      });
    });
  }

  /* ==========================================================================
     HUD Flicker Effect (ambient animation)
     ========================================================================== */

  function initHudFlicker() {
    if (prefersReducedMotion) return;

    const flickeringElements = document.querySelectorAll('.hud-flicker');
    if (!flickeringElements.length) return;

    flickeringElements.forEach(function(el) {
      el.style.animation = 'hudFlicker 8s infinite';
    });
  }

  /* ==========================================================================
     Smooth Scroll for Anchor Links
     ========================================================================== */

  function initSmoothScroll() {
    if (prefersReducedMotion) return;

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
        }
      });
    });
  }

  /* ==========================================================================
     Header Background on Scroll
     ========================================================================== */

  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let lastScrollY = 0;

    window.addEventListener('scroll', function() {
      const scrollY = window.scrollY;

      if (scrollY > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.98)';
        header.style.boxShadow = '0 0 30px rgba(0, 0, 0, 0.5)';
      } else {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.boxShadow = 'none';
      }

      lastScrollY = scrollY;
    }, { passive: true });
  }

  /* ==========================================================================
     Initialize on DOM Ready
     ========================================================================== */

  function init() {
    initNavToggle();
    initScrollReveals();
    initFaqAccordion();
    initHudFlicker();
    initSmoothScroll();
    initHeaderScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
