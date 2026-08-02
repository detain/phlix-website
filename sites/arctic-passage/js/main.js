/* @copyright 2026 Phlix — Arctic Passage Brand Kit */
/* Main JavaScript — vanilla, dependency-free */

(function () {
  'use strict';

  // Reduced motion check
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile nav toggle
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    var isOpen = false;

    function toggleNav() {
      isOpen = !isOpen;
      navToggle.setAttribute('aria-expanded', isOpen);
      navMenu.classList.toggle('is-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    function closeNav() {
      isOpen = false;
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    navToggle.addEventListener('click', toggleNav);

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (isOpen && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        closeNav();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) {
        closeNav();
        navToggle.focus();
      }
    });

    // Close on nav link click (accessibility)
    var navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (isOpen) closeNav();
      });
    });
  }

  // Scroll reveal with IntersectionObserver
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var revealElements = document.querySelectorAll(
      '.feature-card, .client-card, .download-card, .feature-detail',
    );

    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      },
    );

    revealElements.forEach(function (el, index) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition =
        'opacity 0.5s ease ' + index * 50 + 'ms, transform 0.5s ease ' + index * 50 + 'ms';
      revealObserver.observe(el);
    });
  }

  // Aurora borealis subtle parallax effect
  if (!prefersReducedMotion) {
    var auroraLayer = document.querySelector('.hero::before');
    if (auroraLayer) {
      document.addEventListener(
        'scroll',
        function () {
          var scrolled = window.pageYOffset;
          var rate = scrolled * 0.3;
          auroraLayer.style.transform = 'translateY(' + rate + 'px)';
        },
        { passive: true },
      );
    }
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start',
        });
      }
    });
  });
})();
