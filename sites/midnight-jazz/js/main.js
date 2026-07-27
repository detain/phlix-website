/**
 * main.js — Midnight Jazz
 * Mobile nav, reduced motion, scroll reveals, easter eggs, mascot, intensity toggle
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  /* ========================================================================
     STATE
     ======================================================================== */

  const state = {
    navOpen: false,
    mascotDismissed: localStorage.getItem('miles-dismissed') === 'true',
    mascotVisible: false,
    logoClickCount: 0,
    typedBuffer: '',
    calmMode: localStorage.getItem('intensity-calm') === 'true',
  };

  /* ========================================================================
     UTILITIES
     ======================================================================== */

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  function getReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches || state.calmMode;
  }

  /* ========================================================================
     MOBILE NAV TOGGLE
     ======================================================================== */

  function initNav() {
    const toggle = $('.nav-toggle');
    const menu = $('.nav-menu');
    if (!toggle || !menu) return;

    function openNav() {
      state.navOpen = true;
      menu.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      // Trap focus
      const firstLink = $('a', menu);
      if (firstLink) firstLink.focus();
    }

    function closeNav() {
      state.navOpen = false;
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }

    toggle.addEventListener('click', () => {
      state.navOpen ? closeNav() : openNav();
    });

    // Close on Esc
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && state.navOpen) closeNav();
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (state.navOpen && !menu.contains(e.target) && !toggle.contains(e.target)) {
        closeNav();
      }
    });

    // Close on nav link click
    $$('a', menu).forEach((link) => {
      link.addEventListener('click', () => {
        if (state.navOpen) closeNav();
      });
    });
  }

  /* ========================================================================
     SCROLL REVEAL (IntersectionObserver)
     ======================================================================== */

  function initScrollReveal() {
    if (getReducedMotion()) return;

    const targets = $$('.reveal-section');
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -48px 0px' },
    );

    targets.forEach((el) => observer.observe(el));
  }

  /* ========================================================================
     REDUCED MOTION — listen for changes
     ======================================================================== */

  function initReducedMotion() {
    const mm = window.matchMedia('(prefers-reduced-motion: reduce)');
    mm.addEventListener('change', () => {
      if (mm.matches) {
        document.body.classList.add('intensity-calm');
      } else if (!state.calmMode) {
        document.body.classList.remove('intensity-calm');
      }
      initScrollReveal(); // re-init without animation
    });
  }

  /* ========================================================================
     INTENSITY TOGGLE
     ======================================================================== */

  function initIntensityToggle() {
    const toggle = $('.intensity-toggle__switch');
    if (!toggle) return;

    // Restore saved state
    if (state.calmMode) {
      toggle.classList.add('is-active');
      document.body.classList.add('intensity-calm');
    }

    toggle.addEventListener('click', () => {
      state.calmMode = !state.calmMode;
      toggle.classList.toggle('is-active', state.calmMode);
      document.body.classList.toggle('intensity-calm', state.calmMode);
      localStorage.setItem('intensity-calm', state.calmMode ? 'true' : 'false');
    });
  }

  /* ========================================================================
     EASTER EGG 1 — logo-clicks:5
     ======================================================================== */

  function initLogoEasterEgg() {
    const logo = $('.nav-logo');
    if (!logo) return;

    let clickCount = 0;
    let rewardTimer = null;

    logo.addEventListener('click', (e) => {
      // Don't count if modifier keys
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
      e.preventDefault();

      clickCount++;

      if (clickCount === 5) {
        clickCount = 0;
        triggerLogoReward();
      }

      // Reset counter after 3s of no clicks
      clearTimeout(rewardTimer);
      rewardTimer = setTimeout(() => {
        clickCount = 0;
      }, 3000);
    });
  }

  function triggerLogoReward() {
    // Show vinyl record animation
    const vinyl = $('.mascot__vinyl');
    const reward = $('.easter-reward');
    if (vinyl) vinyl.classList.add('is-active');
    if (reward) {
      reward.classList.add('is-active');
      setTimeout(() => reward.classList.remove('is-active'), 3000);
    }
    setTimeout(() => {
      if (vinyl) vinyl.classList.remove('is-active');
    }, 3000);
  }

  /* ========================================================================
     EASTER EGG 2 — typed-word:deepcut
     Disabled when focus is in input/textarea/contenteditable
     Never calls preventDefault
     Exits on Esc
     ======================================================================== */

  function initTypedWordEasterEgg() {
    const TARGET_WORD = 'deepcut';
    let buffer = '';
    let spotlightTimer = null;

    document.addEventListener('keydown', (e) => {
      // Skip if focus is in editable element
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;

      // Exit on Escape
      if (e.key === 'Escape') {
        clearSpotlight();
        buffer = '';
        return;
      }

      // Only record a-z characters
      const char = e.key.toLowerCase();
      if (char.length === 1 && char >= 'a' && char <= 'z') {
        buffer += char;

        // Keep buffer from growing indefinitely
        if (buffer.length > TARGET_WORD.length) {
          buffer = buffer.slice(-TARGET_WORD.length);
        }

        if (buffer === TARGET_WORD) {
          buffer = '';
          triggerSpotlight();
        }

        // Reset buffer after 1.5s of no typing
        clearTimeout(spotlightTimer);
        spotlightTimer = setTimeout(() => {
          buffer = '';
        }, 1500);
      }
    });
  }

  function triggerSpotlight() {
    const spotlight = $('.easter-spotlight');
    if (spotlight) {
      spotlight.classList.add('is-active');
      setTimeout(() => spotlight.classList.remove('is-active'), 2500);
    }
  }

  function clearSpotlight() {
    const spotlight = $('.easter-spotlight');
    if (spotlight) spotlight.classList.remove('is-active');
  }

  /* ========================================================================
     MASCOT — Miles
     ======================================================================== */

  const MASCOT_TIPS = [
    { where: 'home:#hero', say: 'Press play. The session is yours.' },
    {
      where: 'home:.features-overview',
      say: 'Library organizes itself. Drop it in and let it sit.',
    },
    { where: 'home:.proof-section', say: 'Real setup, honest numbers. Check the booth.' },
    { where: 'download:#server', say: "One line and you're the projectionist." },
    { where: 'download:#clients', say: 'Pick your seat. Every screen gets a ticket.' },
  ];

  function initMascot() {
    const mascot = $('.mascot');
    if (!mascot) return;

    // Check dismissed state
    if (state.mascotDismissed) return;

    // Determine if this page should show the mascot
    const showOnPages = ['home', 'download'];
    const currentPage = document.body.dataset.page;
    if (!showOnPages.includes(currentPage)) return;

    // Show the mascot
    mascot.style.display = 'flex';
    state.mascotVisible = true;

    // Set up tip based on current section
    setupMascotTip();

    // Dismiss button
    const dismissBtn = $('.mascot__dismiss');
    if (dismissBtn) {
      dismissBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dismissMascot();
      });
    }
  }

  function setupMascotTip() {
    const tip = $('.mascot__tip');
    if (!tip) return;

    // Find the tip for the current section
    const page = document.body.dataset.page || 'home';

    let tipText = '';
    if (page === 'home') {
      // Tip based on scroll position
      const hero = $('#hero');
      const features = $('.features-overview');
      const proof = $('.proof-section');

      if (hero && isInViewport(hero)) tipText = MASCOT_TIPS[0].say;
      else if (features && isInViewport(features)) tipText = MASCOT_TIPS[1].say;
      else if (proof && isInViewport(proof)) tipText = MASCOT_TIPS[2].say;
      else tipText = MASCOT_TIPS[0].say;
    } else if (page === 'download') {
      const server = $('#server');
      const clients = $('#clients');
      if (server && isInViewport(server)) tipText = MASCOT_TIPS[3].say;
      else if (clients && isInViewport(clients)) tipText = MASCOT_TIPS[4].say;
      else tipText = MASCOT_TIPS[3].say;
    }

    if (tipText) {
      tip.textContent = tipText;
      tip.classList.add('is-visible');
    }
  }

  function isInViewport(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight * 0.7;
  }

  function dismissMascot() {
    const mascot = $('.mascot');
    if (mascot) mascot.style.display = 'none';
    state.mascotDismissed = true;
    state.mascotVisible = false;
    localStorage.setItem('miles-dismissed', 'true');
  }

  /* ========================================================================
     VISITOR PATHS INTERACTIONS
     ======================================================================== */

  function initVisitorPaths() {
    const pathBtns = $$('.visitor-path-btn');
    pathBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        if (target) window.location.href = target + '.html';
      });
    });
  }

  /* ========================================================================
     INIT
     ======================================================================== */

  onReady(() => {
    initNav();
    initReducedMotion();
    initIntensityToggle();
    initScrollReveal();
    initLogoEasterEgg();
    initTypedWordEasterEgg();
    initMascot();
    initVisitorPaths();
  });
})();
