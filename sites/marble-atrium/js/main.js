/**
 * main.js — Marble Atrium site
 * Vanilla, dependency-free, defer-loaded.
 * Responsibilities:
 *   - Mobile nav toggle (aria-expanded, Esc close, outside click)
 *   - Reduced motion gate (prefers-reduced-motion) — gates BOTH animation AND transition
 *   - Optional scroll reveal (IntersectionObserver)
 *   - Easter egg: logo-clicks:5 → marble-vein pulse + concierge toast
 *   - Intensity toggle: "Dim the lights" — removes hover effects and gradients
 *   - Seasonal activation: date-gated banner for Winter Gala, Spring Bloom, Midsummer Terrace
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  /* ---------------------------------------------------------------------
     Mobile Nav Toggle
     --------------------------------------------------------------------- */
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('open', !expanded);
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
        navToggle.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
      }
    });
  }

  /* ---------------------------------------------------------------------
     Reduced Motion Gate — per §19.20: gate BOTH animation AND transition
     Also attach a change listener so the visitor can change mid-session
     --------------------------------------------------------------------- */
  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function handleMotionPreference(e) {
    if (e.matches) {
      document.documentElement.classList.add('reduce-motion');
      // Show all fade-ins immediately
      document.querySelectorAll('.fade-in').forEach(function (el) {
        el.classList.add('visible');
      });
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  }

  handleMotionPreference(motionQuery); // Set initial state
  motionQuery.addEventListener('change', handleMotionPreference); // Listen for changes

  /* ---------------------------------------------------------------------
     Scroll Reveal — fade-in on scroll (disabled if reduced motion)
     --------------------------------------------------------------------- */
  if (!motionQuery.matches) {
    var fadeEls = document.querySelectorAll('.fade-in');
    if (fadeEls.length && 'IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
      );

      fadeEls.forEach(function (el) {
        observer.observe(el);
      });
    }
  }

  /* ---------------------------------------------------------------------
     Marble-vein reveal on hero (only if motion allowed)
     --------------------------------------------------------------------- */
  if (!motionQuery.matches) {
    var veinEl = document.querySelector('.reveal-vein');
    if (veinEl) {
      setTimeout(function () {
        veinEl.style.opacity = '1';
      }, 50);
    }
  }

  /* ---------------------------------------------------------------------
     Easter Egg: logo-clicks:5 → marble-vein pulse + concierge toast
     Disabled while focus is in an input/textarea/contenteditable
     Does NOT call preventDefault — does not hijack typing
     Exits on Esc
     --------------------------------------------------------------------- */
  var logoClickCount = 0;
  var logoClickTimer = null;
  var toastEl = document.getElementById('concierge-toast');
  var marqueeVein = null;
  var toastTimeout = null;

  function createMarqueeVein() {
    if (marqueeVein) return;
    marqueeVein = document.createElement('div');
    marqueeVein.className = 'marquee-vein';
    marqueeVein.setAttribute('aria-hidden', 'true');
    document.body.appendChild(marqueeVein);
  }

  function showConciergeToast() {
    if (!toastEl) return;

    // Build the toast message
    var toastMsg = toastEl.querySelector('.toast-message');
    if (toastMsg) toastMsg.textContent = 'Well noticed — welcome to the inner lobby.';

    toastEl.classList.add('visible', 'success');
    toastEl.setAttribute('role', 'status');

    // Clear any existing timeout
    if (toastTimeout) clearTimeout(toastTimeout);

    // Auto-dismiss after 3 seconds
    toastTimeout = setTimeout(function () {
      hideConciergeToast();
    }, 3000);
  }

  function hideConciergeToast() {
    if (!toastEl) return;
    toastEl.classList.remove('visible', 'success');
  }

  function triggerEasterEgg() {
    // Marble-vein pulse overlay
    createMarqueeVein();
    if (marqueeVein) {
      marqueeVein.classList.add('active');
      setTimeout(function () {
        marqueeVein.classList.remove('active');
      }, 2400); // 3 × 800ms pulses
    }

    // Concierge toast
    showConciergeToast();
  }

  // Listen for Escape to dismiss toast (but not to trigger)
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      hideConciergeToast();
    }
  });

  // Logo click counter — only when not in an input
  var logoEl = document.querySelector('.nav-logo');
  if (logoEl) {
    logoEl.addEventListener('click', function (e) {
      // Don't count if focus is in a form element
      var active = document.activeElement;
      if (
        active &&
        (active.tagName === 'INPUT' ||
          active.tagName === 'TEXTAREA' ||
          active.getAttribute('contenteditable') === 'true')
      ) {
        return;
      }

      // Don't prevent default — don't hijack the navigation
      logoClickCount++;
      clearTimeout(logoClickTimer);
      logoClickTimer = setTimeout(function () {
        logoClickCount = 0; // Reset after 1 second of no clicks
      }, 1000);

      if (logoClickCount >= 5) {
        logoClickCount = 0;
        clearTimeout(logoClickTimer);
        triggerEasterEgg();
      }
    });
  }

  /* ---------------------------------------------------------------------
     Intensity Toggle — "Dim the lights"
     Adds/removes .intensity-calm on <html>
     --------------------------------------------------------------------- */
  var intensityToggle = document.getElementById('intensity-toggle');
  if (intensityToggle) {
    // Initialize aria-pressed from current state
    var isCalm = document.documentElement.classList.contains('intensity-calm');
    intensityToggle.setAttribute('aria-pressed', String(isCalm));

    intensityToggle.addEventListener('click', function () {
      var htmlEl = document.documentElement;
      var nowCalm = htmlEl.classList.contains('intensity-calm');

      if (nowCalm) {
        htmlEl.classList.remove('intensity-calm');
        intensityToggle.setAttribute('aria-pressed', 'false');
      } else {
        htmlEl.classList.add('intensity-calm');
        intensityToggle.setAttribute('aria-pressed', 'true');
      }
    });
  }

  /* ---------------------------------------------------------------------
     Seasonal Activation — kit §20a seasonal_activation
     Date-gated banner for three seasons:
       Winter Gala:      December 1–31
       Spring Bloom:     March 20 – May 31
       Midsummer Terrace: June 21 – September 21
     Motif SVG assets (img/seasonal/): atrium-winter-garland.svg,
     marble-vein-spring.svg, terrace-shade-summer.svg — note these may not
     exist at build time; the motif slot is present but gracefully absent.
     --------------------------------------------------------------------- */
  (function () {
    var banner = document.getElementById('seasonal-banner');
    if (!banner) return;

    var dismissBtn = document.getElementById('seasonal-banner-dismiss');
    var motifSlot = document.getElementById('seasonal-banner-motif');

    // Check if banner was previously dismissed this session
    var dismissedKey = 'phlix-seasonal-dismissed';
    try {
      if (sessionStorage.getItem(dismissedKey) === '1') return;
    } catch (e) {
      /* sessionStorage unavailable */
    }

    var now = new Date();
    var month = now.getMonth() + 1; // 1–12
    var day = now.getDate();

    var isActive = false;
    var activeSeason = null;

    // Winter Gala: December 1–31
    if (month === 12) {
      isActive = true;
      activeSeason = 'winter';
    }
    // Spring Bloom: March 20 – May 31
    else if (month === 3 && day >= 20) {
      isActive = true;
      activeSeason = 'spring';
    } else if (month === 4 || month === 5) {
      isActive = true;
      activeSeason = 'spring';
    }
    // Midsummer Terrace: June 21 – September 21
    else if (month === 6 && day >= 21) {
      isActive = true;
      activeSeason = 'summer';
    } else if (month === 7 || month === 8) {
      isActive = true;
      activeSeason = 'summer';
    } else if (month === 9 && day <= 21) {
      isActive = true;
      activeSeason = 'summer';
    }

    if (!isActive) return;

    // Inject motif SVG if asset is expected to exist (no-op if 404)
    var motifMap = {
      winter: 'img/seasonal/atrium-winter-garland.svg',
      spring: 'img/seasonal/marble-vein-spring.svg',
      summer: 'img/seasonal/terrace-shade-summer.svg',
    };
    if (motifSlot && motifMap[activeSeason]) {
      var motifImg = document.createElement('img');
      motifImg.src = motifMap[activeSeason];
      motifImg.alt = '';
      motifImg.setAttribute('aria-hidden', 'true');
      motifSlot.appendChild(motifImg);
    }

    // Show banner
    banner.classList.add('visible');

    // Dismiss handler
    if (dismissBtn) {
      dismissBtn.addEventListener('click', function () {
        banner.classList.remove('visible');
        try {
          sessionStorage.setItem(dismissedKey, '1');
        } catch (e) {
          /* sessionStorage unavailable */
        }
      });
    }
  })();
})();
