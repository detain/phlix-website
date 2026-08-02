/**
 * js/main.js — Inferno
 * Vanilla, dependency-free. Mobile nav, reduced-motion, ember particles,
 * heat shimmer, explosive bloom on clicks, Live TV heartbeat pulse.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ─── Mobile nav toggle ────────────────────────────────────────────────────────
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  // ─── Ember particles ─────────────────────────────────────────────────────────
  function createEmberParticle() {
    if (reducedMotion) return;

    var container = document.getElementById('ember-container');
    if (!container) return;

    var ember = document.createElement('div');
    ember.className = 'ember-particle';
    ember.setAttribute('aria-hidden', 'true');

    var left = Math.random() * 100;
    var size = 2 + Math.random() * 4;
    var duration = 2000 + Math.random() * 2000;

    ember.style.left = left + '%';
    ember.style.width = size + 'px';
    ember.style.height = size + 'px';
    ember.style.opacity = 0.6 + Math.random() * 0.4;
    ember.style.animationDuration = duration + 'ms';

    container.appendChild(ember);

    setTimeout(function () {
      if (ember.parentNode) {
        ember.parentNode.removeChild(ember);
      }
    }, duration);
  }

  // Spawn ember particles periodically
  if (!reducedMotion) {
    setInterval(createEmberParticle, 300);

    // Initial burst
    for (var i = 0; i < 5; i++) {
      setTimeout(createEmberParticle, i * 100);
    }
  }

  // ─── Heat shimmer effect ──────────────────────────────────────────────────────
  function initHeatShimmer() {
    if (reducedMotion) return;

    var shimmers = document.querySelectorAll('.heat-shimmer');
    shimmers.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        el.style.filter = 'blur(0.5px)';
      });
      el.addEventListener('mouseleave', function () {
        el.style.filter = '';
      });
    });
  }

  initHeatShimmer();

  // ─── Explosive bloom on CTA clicks ────────────────────────────────────────────
  function initExplosiveBloom() {
    var buttons = document.querySelectorAll('.btn-primary, .explosive-bloom');

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        if (reducedMotion) return;

        // Don't add bloom if it's a link that will navigate
        if (btn.tagName === 'A') return;

        btn.classList.add('explosive-bloom');

        setTimeout(function () {
          btn.classList.remove('explosive-bloom');
        }, 400);
      });
    });
  }

  initExplosiveBloom();

  // ─── Lava drip animation restart ────────────────────────────────────────────
  function restartLavaDrips() {
    if (reducedMotion) return;

    var drips = document.querySelectorAll('.lava-drip');
    drips.forEach(function (drip) {
      drip.style.animation = 'none';
      drip.offsetHeight; // Trigger reflow
      drip.style.animation = '';
    });
  }

  // Restart lava drips on scroll
  var scrollTimeout;
  window.addEventListener('scroll', function () {
    if (reducedMotion) return;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(restartLavaDrips, 250);
  });

  // ─── Scroll reveals (disabled when reduced-motion is active) ─────────────────
  if (!reducedMotion && 'IntersectionObserver' in window) {
    var revealTargets = document.querySelectorAll(
      '.feature-card, .client-card, .download-card, .feature-detail',
    );
    if (revealTargets.length > 0) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
      );

      revealTargets.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(12px)';
        el.style.transition =
          'opacity 400ms cubic-bezier(0.22,1,0.36,1), transform 400ms cubic-bezier(0.22,1,0.36,1)';
        observer.observe(el);
      });
    }
  }

  // ─── Live TV heartbeat pulse ─────────────────────────────────────────────────
  // The CSS handles the animation; this is for interaction feedback
  function initHeartbeatPulse() {
    var heartbeats = document.querySelectorAll('.heartbeat-pulse');
    heartbeats.forEach(function (el) {
      el.style.cursor = 'default';
    });
  }

  initHeartbeatPulse();

  // ─── Easter egg: logo click counter ──────────────────────────────────────────
  var logoClickCount = 0;
  var logoClickTimeout;

  var logo = document.querySelector('.nav-logo');
  if (logo) {
    logo.addEventListener('click', function (e) {
      if (reducedMotion) return;

      e.preventDefault();
      logoClickCount++;

      clearTimeout(logoClickTimeout);
      logoClickTimeout = setTimeout(function () {
        logoClickCount = 0;
      }, 2000);

      if (logoClickCount >= 5) {
        logoClickCount = 0;
        // Flash effect
        logo.style.filter = 'brightness(1.5)';
        setTimeout(function () {
          logo.style.filter = '';
        }, 200);
      }
    });
  }

  // ─── Easter egg: type "pyrra" ─────────────────────────────────────────────────
  var typedBuffer = '';
  var typeTimeout;

  document.addEventListener('keypress', function (e) {
    if (reducedMotion) return;

    typedBuffer += String.fromCharCode(e.charCode).toLowerCase();
    clearTimeout(typeTimeout);
    typeTimeout = setTimeout(function () {
      typedBuffer = '';
    }, 1000);

    if (typedBuffer.indexOf('pyrra') !== -1) {
      typedBuffer = '';
      document.body.style.filter = 'sepia(0.2) hue-rotate(-10deg)';
      setTimeout(function () {
        document.body.style.filter = '';
      }, 1000);
    }
  });
})();
