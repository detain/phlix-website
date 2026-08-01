/* ============================================================================
 * PHLIX BRAND KIT — Retro Seventies
 * main.js
 * Navigation toggle, reduced-motion, scroll reveals, mascot, easter eggs
 * ============================================================================
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * SPDX-License-Identifier: MPL-2.0
 * ============================================================================ */

(function () {
  'use strict';

  /* ---------------------------------------------------------------------------
   * Navigation — mobile toggle
   * --------------------------------------------------------------------------- */
  var navToggle = document.querySelector('.nav__toggle');
  var navList = document.querySelector('.nav__list');

  if (navToggle && navList) {
    navToggle.addEventListener('click', function () {
      var isOpen = navList.classList.toggle('nav__list--open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
        navList.classList.remove('nav__list--open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navList.classList.contains('nav__list--open')) {
        navList.classList.remove('nav__list--open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* ---------------------------------------------------------------------------
   * Active nav link
   * --------------------------------------------------------------------------- */
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  var navLinks = document.querySelectorAll('.nav__link');

  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPath || (currentPath === 'index.html' && href === 'index.html')) {
      link.classList.add('nav__link--active');
    }
  });

  /* ---------------------------------------------------------------------------
   * Reduced motion — check preference
   * --------------------------------------------------------------------------- */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------------------
   * Scroll reveals — fade in sections on scroll
   * --------------------------------------------------------------------------- */
  if (!prefersReducedMotion) {
    var revealElements = document.querySelectorAll('.fade-in');
    if (revealElements.length > 0) {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.style.animationPlayState = 'running';
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );

      revealElements.forEach(function (el) {
        el.style.animationPlayState = 'paused';
        revealObserver.observe(el);
      });
    }
  }

  /* ---------------------------------------------------------------------------
   * FAQ accordion
   * --------------------------------------------------------------------------- */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-item__question');
    if (question) {
      question.addEventListener('click', function () {
        var isOpen = item.classList.toggle('faq-item--open');
        question.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    }
  });

  /* ---------------------------------------------------------------------------
   * Mascot — Groove the lava lamp blob
   * --------------------------------------------------------------------------- */
  (function () {
    var mascot = document.querySelector('.mascot');
    if (!mascot) return;

    var mascotDismiss = mascot.querySelector('.mascot__dismiss');
    var dismissedKey = 'phlix-retro-groove-dismissed';

    // Check if previously dismissed
    if (localStorage.getItem(dismissedKey) === 'true') {
      mascot.classList.add('mascot--hidden');
      return;
    }

    // Show after a delay
    setTimeout(function () {
      mascot.classList.add('mascot--visible');
    }, 2000);

    // Dismiss handler
    if (mascotDismiss) {
      mascotDismiss.addEventListener('click', function (e) {
        e.stopPropagation();
        mascot.classList.remove('mascot--visible');
        mascot.classList.add('mascot--hidden');
        localStorage.setItem(dismissedKey, 'true');
      });
    }

    // Easter: click Groove 3 times
    var grooveClickCount = 0;
    var grooveClickTimer;

    mascot.addEventListener('click', function () {
      grooveClickCount++;
      clearTimeout(grooveClickTimer);
      grooveClickTimer = setTimeout(function () { grooveClickCount = 0; }, 600);

      if (grooveClickCount >= 3) {
        grooveClickCount = 0;
        clearTimeout(grooveClickTimer);
        // Animate split
        mascot.classList.add('mascot--celebrating');
        setTimeout(function () { mascot.classList.remove('mascot--celebrating'); }, 2000);
      }
    });
  })();

  /* ---------------------------------------------------------------------------
   * Easter egg: typed-word "groove"
   * --------------------------------------------------------------------------- */
  (function () {
    var typedBuffer = '';
    var targetWord = 'groove';
    var bufferTimeout;

    function resetBuffer() {
      typedBuffer = '';
    }

    document.addEventListener('keydown', function (e) {
      // Don't trigger when typing in inputs
      if (
        e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA' ||
        e.target.isContentEditable
      ) {
        return;
      }

      // Handle Escape to clear
      if (e.key === 'Escape') {
        resetBuffer();
        return;
      }

      // Only handle single printable characters
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        typedBuffer += e.key.toLowerCase();
        clearTimeout(bufferTimeout);
        bufferTimeout = setTimeout(resetBuffer, 1000);

        // Check if buffer ends with target word
        if (typedBuffer.endsWith(targetWord)) {
          resetBuffer();
          // Trigger groove easter egg — cursor vinyl
          document.body.classList.add('groove-cursor');
          setTimeout(function () { document.body.classList.remove('groove-cursor'); }, 3000);
        }
      }
    });
  })();

  /* ---------------------------------------------------------------------------
   * Logo easter egg: 3 clicks
   * --------------------------------------------------------------------------- */
  (function () {
    var logo = document.querySelector('.nav__brand');
    if (!logo) return;

    var clickCount = 0;
    var clickTimer;

    logo.addEventListener('click', function (e) {
      // Prevent navigation on repeated clicks
      e.preventDefault();

      clickCount++;
      clearTimeout(clickTimer);
      clickTimer = setTimeout(function () { clickCount = 0; }, 600);

      if (clickCount >= 3) {
        clickCount = 0;
        clearTimeout(clickTimer);
        // Trigger Groove celebration
        var mascot = document.querySelector('.mascot');
        if (mascot && !mascot.classList.contains('mascot--hidden')) {
          mascot.classList.add('mascot--celebrating');
          setTimeout(function () { mascot.classList.remove('mascot--celebrating'); }, 2000);
        }
      }
    });
  })();

  /* ---------------------------------------------------------------------------
   * Smooth scroll for anchor links
   * --------------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      }
    });
  });

})();
