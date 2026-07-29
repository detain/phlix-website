/* ==========================================================================
   MAIN.JS — Synthwave Sunset
   Vanilla JS: mobile nav toggle, reduced motion handling, scroll reveals.
   No external dependencies. Respects prefers-reduced-motion.
   @copyright 2026 Joe Huss <detain@interserver.net>
   ========================================================================== */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     Mobile Navigation Toggle
     -------------------------------------------------------------------------- */
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navMenu.classList.toggle('open', !isOpen);

      if (!isOpen) {
        navMenu.querySelector('a')?.focus();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
        navToggle.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
      }
    });
  }

  /* --------------------------------------------------------------------------
     Reduced Motion
     -------------------------------------------------------------------------- */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function handleReducedMotion() {
    document.documentElement.classList.toggle('reduce-motion', prefersReducedMotion.matches);
  }

  prefersReducedMotion.addEventListener('change', handleReducedMotion);
  handleReducedMotion();

  /* --------------------------------------------------------------------------
     Scroll Reveals (IntersectionObserver)
     -------------------------------------------------------------------------- */
  if (!prefersReducedMotion.matches && 'IntersectionObserver' in window) {
    var revealElements = document.querySelectorAll(
      '.feature-card, .client-card, .download-card, .feature-detail'
    );

    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -50px 0px', threshold: 0.1 }
    );

    revealElements.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 400ms ease, transform 400ms ease';
      revealObserver.observe(el);
    });

    document.head.insertAdjacentHTML(
      'beforeend',
      '<style>' +
        '.reduce-motion .feature-card, ' +
        '.reduce-motion .client-card, ' +
        '.reduce-motion .download-card, ' +
        '.reduce-motion .feature-detail { ' +
          'opacity: 1 !important; ' +
          'transform: none !important; ' +
          'transition: none !important; ' +
        '}' +
        '.revealed { ' +
          'opacity: 1 !important; ' +
          'transform: translateY(0) !important; ' +
        '}' +
      '</style>'
    );
  }

  /* --------------------------------------------------------------------------
     Copy Install Command Button
     -------------------------------------------------------------------------- */
  var copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var commandEl = btn.closest('.install-command')?.querySelector('code');
      if (!commandEl) return;

      var text = commandEl.textContent.trim();
      navigator.clipboard.writeText(text).then(function () {
        var original = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.color = 'var(--color-secondary)';
        setTimeout(function () {
          btn.textContent = original;
          btn.style.color = '';
        }, 2000);
      }).catch(function () {
        btn.textContent = 'Failed';
        setTimeout(function () {
          btn.textContent = 'Copy';
        }, 2000);
      });
    });
  });
})();
