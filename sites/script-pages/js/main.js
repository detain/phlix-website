/* sites/script-pages/js/main.js */

/* ============================================
   PHLIX — script-pages brand kit
   @copyright 2026 Phlix. All rights reserved.
   ============================================ */

(function() {
  'use strict';

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('is-open', !isExpanded);
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
        navToggle.focus();
      }
    });
  }

  // Reduced motion check
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll reveals
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll('.feature-card, .client-card, .download-card, .faq-item');

    const revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(function(el, index) {
      el.style.opacity = '0';
      el.classList.add('stagger-' + ((index % 8) + 1));
      revealObserver.observe(el);
    });
  }

  // FAQ accordion (ensure details/summary works properly)
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function(item) {
    item.addEventListener('toggle', function() {
      if (item.open && !prefersReducedMotion) {
        item.classList.add('fade-in-up');
      }
    });
  });

})();
