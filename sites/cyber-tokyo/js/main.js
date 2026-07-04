/* main.js — Cyber Tokyo site JS */

(function () {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ── Mobile nav toggle ── */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu   = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('is-open', !expanded);
    });

    /* Close on outside click */
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
      }
    });

    /* Close on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
        navToggle.focus();
      }
    });
  }

  /* ── Scroll reveals (reduced-motion safe) ── */
  if (!reducedMotion.matches) {
    var revealEls = document.querySelectorAll('.feature-card, .client-card, .feature-detail');
    if (revealEls.length > 0 && 'IntersectionObserver' in window) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

      revealEls.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        el.style.transition = 'opacity 200ms ease-out, transform 200ms ease-out';
        revealObserver.observe(el);
      });
    }
  }

  /* ── Glitch hover on feature card icons ── */
  if (!reducedMotion.matches) {
    var glitchCards = document.querySelectorAll('.feature-card');
    glitchCards.forEach(function (card) {
      card.addEventListener('mouseenter', function () {
        var icon = card.querySelector('.feature-icon');
        if (icon) {
          icon.style.animation = 'none';
          icon.offsetHeight; /* force reflow */
          icon.style.animation = 'glitch-shift 200ms steps(2, end)';
        }
      });
      card.addEventListener('mouseleave', function () {
        var icon = card.querySelector('.feature-icon');
        if (icon) {
          icon.style.animation = '';
        }
      });
    });
  }
})();
