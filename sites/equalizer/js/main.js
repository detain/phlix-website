/**
 * @copyright 2026 Joe Huss <detain@interserver.net>
 *
 * Equalizer — main.js
 * Nav toggle, scroll reveal, FAQ accordion, install copy,
 * EQ spectrum animation on hero.
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────────────────────
     NAV TOGGLE (mobile hamburger)
  ───────────────────────────────────────────────────────────────────────── */

  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.querySelector('.main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* ─────────────────────────────────────────────────────────────────────────
     ACTIVE NAV — highlight current page
  ───────────────────────────────────────────────────────────────────────── */

  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  var navLinks = document.querySelectorAll('.main-nav a[href]');

  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPath || (currentPath === 'index.html' && href === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    }
  });

  /* ─────────────────────────────────────────────────────────────────────────
     SCROLL REVEAL — animate sections into view
  ───────────────────────────────────────────────────────────────────────── */

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    var revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length > 0) {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
      );

      revealEls.forEach(function (el) {
        revealObserver.observe(el);
      });
    }
  }

  /* ─────────────────────────────────────────────────────────────────────────
     FAQ ACCORDION
  ───────────────────────────────────────────────────────────────────────── */

  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var isOpen = item.classList.contains('is-open');
      var answer = item.querySelector('.faq-answer');

      // Close all others
      document.querySelectorAll('.faq-item.is-open').forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove('is-open');
          var openAnswer = openItem.querySelector('.faq-answer');
          if (openAnswer) openAnswer.style.display = 'none';
        }
      });

      // Toggle this one
      item.classList.toggle('is-open', !isOpen);
      if (answer) {
        answer.style.display = isOpen ? 'none' : 'block';
      }
    });
  });

  /* ─────────────────────────────────────────────────────────────────────────
     INSTALL COPY BUTTON
  ───────────────────────────────────────────────────────────────────────── */

  document.querySelectorAll('.install-copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var code = btn.closest('.install-block').querySelector('.install-code');
      var label = btn.textContent;

      if (!code) return;

      navigator.clipboard.writeText(code.textContent.trim()).then(
        function () {
          btn.textContent = 'Copied';
          btn.style.color = 'var(--color-success)';
          btn.style.borderColor = 'var(--color-success)';
          setTimeout(function () {
            btn.textContent = label;
            btn.style.color = '';
            btn.style.borderColor = '';
          }, 2000);
        },
        function () {
          // Fallback: select text
          var range = document.createRange();
          range.selectNodeContents(code);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        },
      );
    });
  });

  /* ─────────────────────────────────────────────────────────────────────────
     EQ SPECTRUM BARS — Hero animation (reduced motion safe)
  ───────────────────────────────────────────────────────────────────────── */

  (function () {
    var spectrum = document.querySelector('.hero-spectrum');
    if (!spectrum) return;

    var bars = spectrum.querySelectorAll('span');
    if (!bars.length) return;

    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      // Static display — leave bars at their default height
      return;
    }

    // Randomize heights for a more realistic spectrum analyzer effect
    function animateSpectrum() {
      bars.forEach(function (bar) {
        var minHeight = 10;
        var maxHeight = 100;
        var height = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
        bar.style.height = height + '%';
      });
    }

    // Run immediately
    animateSpectrum();

    // Then update at ~200ms intervals
    setInterval(animateSpectrum, 200);
  })();

  /* ─────────────────────────────────────────────────────────────────────────
     HUB PAGE — Connection visualization
  ───────────────────────────────────────────────────────────────────────── */

  (function () {
    var hubDiagram = document.querySelector('.hub-diagram');
    if (!hubDiagram) return;

    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Pulse animation for connection nodes
    var nodes = hubDiagram.querySelectorAll('.hub-node');
    nodes.forEach(function (node, i) {
      node.style.opacity = '0';
      node.style.transform = 'translateY(10px)';
      node.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      node.style.transitionDelay = (i * 0.1) + 's';

      setTimeout(function () {
        node.style.opacity = '1';
        node.style.transform = 'translateY(0)';
      }, 100);
    });
  })();

  /* ─────────────────────────────────────────────────────────────────────────
     PAGE TRANSITION — Fade in main on load
  ───────────────────────────────────────────────────────────────────────── */

  (function () {
    var main = document.querySelector('main');
    if (!main) return;

    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    main.style.opacity = '0';
    main.style.transition = 'opacity 0.3s ease';

    requestAnimationFrame(function () {
      main.style.opacity = '1';
    });
  })();
})();
