/**
 * main.js — Phlix Event Horizon
 * Vanilla JS, dependency-free, defer-loaded
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     Mobile Navigation Toggle
     -------------------------------------------------------------------------- */
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (
        !navToggle.contains(e.target) &&
        !navMenu.contains(e.target) &&
        navMenu.classList.contains('is-open')
      ) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        navToggle.focus();
      }
    });
  }

  /* --------------------------------------------------------------------------
     Scroll Reveal — fade-in elements on scroll
     -------------------------------------------------------------------------- */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var revealItems = document.querySelectorAll(
      '.feature-card, .client-card, .feature-detail, .download-card',
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
        rootMargin: '0px 0px -40px 0px',
      },
    );

    revealItems.forEach(function (item) {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      item.style.transition =
        'opacity 0.5s cubic-bezier(0.22, 0.61, 0.36, 1), transform 0.5s cubic-bezier(0.22, 0.61, 0.36, 1)';
      revealObserver.observe(item);
    });
  }

  /* --------------------------------------------------------------------------
     Reduced motion listener — update on change
     -------------------------------------------------------------------------- */
  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  motionQuery.addEventListener('change', function () {
    if (motionQuery.matches) {
      // Remove inline styles if user enables reduced motion
      document
        .querySelectorAll('.feature-card, .client-card, .feature-detail, .download-card')
        .forEach(function (el) {
          el.style.opacity = '';
          el.style.transform = '';
          el.style.transition = '';
        });
    }
  });

  /* --------------------------------------------------------------------------
     Active nav link — highlight current page
     -------------------------------------------------------------------------- */
  var currentPath = window.location.pathname;
  var navLinks = document.querySelectorAll('.nav-menu a');

  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === './' || href === 'index.html') {
      if (currentPath.endsWith('/') || currentPath.endsWith('index.html') || currentPath === '/') {
        link.setAttribute('aria-current', 'page');
      }
    } else if (currentPath.includes(href)) {
      link.setAttribute('aria-current', 'page');
    }
  });

  /* --------------------------------------------------------------------------
     Code block copy functionality (optional enhancement)
     -------------------------------------------------------------------------- */
  var codeBlocks = document.querySelectorAll('.code-block pre code');
  codeBlocks.forEach(function (codeBlock) {
    var parent = codeBlock.closest('.code-block');
    if (parent && !parent.querySelector('.copy-btn')) {
      var copyBtn = document.createElement('button');
      copyBtn.className = 'copy-btn btn btn-sm btn-ghost';
      copyBtn.textContent = 'Copy';
      copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
      copyBtn.style.cssText = 'position:absolute;top:8px;right:8px;font-size:12px;padding:4px 8px;';

      copyBtn.addEventListener('click', function () {
        var text = codeBlock.textContent;
        navigator.clipboard
          .writeText(text)
          .then(function () {
            copyBtn.textContent = 'Copied!';
            setTimeout(function () {
              copyBtn.textContent = 'Copy';
            }, 2000);
          })
          .catch(function () {
            copyBtn.textContent = 'Failed';
            setTimeout(function () {
              copyBtn.textContent = 'Copy';
            }, 2000);
          });
      });

      parent.style.position = 'relative';
      parent.appendChild(copyBtn);
    }
  });
})();
