/**
 * @copyright 2026 Joe Huss <detain@interserver.net>
 *
 * Premiere Night — main.js
 * Nav, FAQ accordion, install copy, scroll reveal.
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

    // Close on Escape key
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
     FAQ ACCORDION — using native <details>/<summary>
  ───────────────────────────────────────────────────────────────────────── */

  // Ensure proper ARIA and styling on FAQ items
  document.querySelectorAll('.faq-item details').forEach(function (details) {
    var summary = details.querySelector('.faq-question');
    if (summary) {
      summary.addEventListener('click', function (e) {
        e.preventDefault();
        // Toggle this details element
        if (details.hasAttribute('open')) {
          details.removeAttribute('open');
        } else {
          // Close all other FAQ items
          document.querySelectorAll('.faq-item details[open]').forEach(function (openDetails) {
            if (openDetails !== details) {
              openDetails.removeAttribute('open');
            }
          });
          details.setAttribute('open', '');
        }
      });
    }
  });

  /* ─────────────────────────────────────────────────────────────────────────
     PAGE HEADER ANIMATION
  ───────────────────────────────────────────────────────────────────────── */

  if (!prefersReducedMotion) {
    var pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
      pageHeader.classList.add('reveal');
      var headerObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              headerObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 },
      );
      headerObserver.observe(pageHeader);
    }
  }
})();
