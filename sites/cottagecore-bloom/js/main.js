/* ==========================================================================
   main.js — Cottagecore Bloom
   Nav toggle, reduced-motion, scroll reveals
   ========================================================================== */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ── Mobile nav toggle ──────────────────────────────────────────────────── */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('is-open', !expanded);
    });

    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
        navToggle.focus();
      }
    });
  }

  /* ── Scroll reveals ─────────────────────────────────────────────────────── */
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length > 0) {
      const revealObserver = new IntersectionObserver(
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
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ── Petal hero animation (reduced motion safe) ─────────────────────────── */
  const heroPetals = document.querySelector('.hero-petals');
  if (heroPetals && !prefersReducedMotion.matches) {
    const petalData = [
      { class: 'petal--rose', size: 18, left: '10%', delay: '0s', duration: '12s' },
      { class: 'petal--lavender', size: 14, left: '25%', delay: '1.5s', duration: '14s' },
      { class: 'petal--sage', size: 16, left: '40%', delay: '3s', duration: '11s' },
      { class: 'petal--rose', size: 12, left: '55%', delay: '0.8s', duration: '13s' },
      { class: 'petal--lavender', size: 20, left: '70%', delay: '2.2s', duration: '15s' },
      { class: 'petal--sage', size: 15, left: '85%', delay: '4.5s', duration: '12.5s' },
      { class: 'petal--rose', size: 11, left: '35%', delay: '6s', duration: '14.5s' },
      { class: 'petal--lavender', size: 13, left: '60%', delay: '7.2s', duration: '13.5s' },
      { class: 'petal--sage', size: 17, left: '80%', delay: '8s', duration: '11.5s' },
      { class: 'petal--rose', size: 14, left: '15%', delay: '5s', duration: '15.5s' },
      { class: 'petal--lavender', size: 12, left: '50%', delay: '3.5s', duration: '12s' },
      { class: 'petal--sage', size: 16, left: '90%', delay: '9s', duration: '13s' },
    ];

    petalData.forEach(function (data) {
      const petal = document.createElement('div');
      petal.className = 'petal ' + data.class;
      petal.style.cssText =
        'width:' +
        data.size +
        'px;' +
        'height:' +
        data.size +
        'px;' +
        'left:' +
        data.left +
        ';' +
        'top:-' +
        data.size +
        'px;' +
        'animation-delay:' +
        data.delay +
        ';' +
        'animation-duration:' +
        data.duration +
        ';' +
        'animation-name:petal-drift;' +
        'animation-timing-function:ease-in-out;' +
        'animation-iteration-count:infinite;';
      heroPetals.appendChild(petal);
    });
  }

  /* ── Smooth anchor scroll ───────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion.matches ? 'auto' : 'smooth' });
      }
    });
  });
})();
