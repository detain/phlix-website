/**
 * js/main.js — Art Nouveau Garden brand kit
 * @copyright 2026 Joe Huss <detain@interserver.net>
 *
 * Responsibilities:
 * - Mobile nav toggle (accessible hamburger)
 * - Reduced motion (listens for changes, not just read-once)
 * - Scroll reveals (IntersectionObserver)
 * - Focus ring bloom animation
 * - Easter eggs (logo-clicks:3, typed-word:garden)
 * - Mascot Lily (idle, tips, easter interactions, dismiss)
 * - Intensity toggle (calm mode)
 * - Seasonal activation (live-js date-gate)
 */
(function () {
  'use strict';

  /* ── Utilities ─────────────────────────────────────────────────────────── */
  function isInputFocus() {
    return (
      document.activeElement &&
      (document.activeElement.tagName === 'INPUT' ||
        document.activeElement.tagName === 'TEXTAREA' ||
        document.activeElement.contentEditable === 'true')
    );
  }

  /* ── Mobile nav toggle ──────────────────────────────────────────────────── */
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    var focusableSelectors =
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

    var focusableEls = function () {
      return [].slice.call(navMenu.querySelectorAll(focusableSelectors)).filter(function (el) {
        return el.offsetParent !== null;
      });
    };

    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      if (isOpen) {
        var items = focusableEls();
        if (items.length > 0) items[0].focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    navMenu.addEventListener('keydown', function (e) {
      if (e.key === 'Tab') {
        var items = focusableEls();
        if (items.length === 0) return;
        if (e.shiftKey) {
          if (document.activeElement === items[0]) {
            e.preventDefault();
            navToggle.focus();
            navMenu.classList.remove('is-open');
            navToggle.setAttribute('aria-expanded', 'false');
          }
        } else {
          if (document.activeElement === items[items.length - 1]) {
            e.preventDefault();
            navToggle.focus();
            navMenu.classList.remove('is-open');
            navToggle.setAttribute('aria-expanded', 'false');
          }
        }
      }
      if (e.key === 'Escape') {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* ── Reduced motion — listener that responds to changes (not read-once) ── */
  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function handleMotionChange() {
    var prefersReducedMotion = motionQuery.matches;
    if (prefersReducedMotion) {
      document.body.classList.add('reduce-motion');
    } else {
      document.body.classList.remove('reduce-motion');
    }
  }

  motionQuery.addEventListener('change', handleMotionChange);
  handleMotionChange(); // run once on load

  /* ── Scroll reveals (IntersectionObserver) ─────────────────────────────── */
  if (!motionQuery.matches && 'IntersectionObserver' in window) {
    var revealEls = document.querySelectorAll('.feature-card, .client-card, .feature-detail');
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
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ── Focus ring bloom on interactive elements ───────────────────────────── */
  if (!motionQuery.matches) {
    document.querySelectorAll('.btn, a, button, input, select, textarea').forEach(function (el) {
      el.addEventListener(
        'focus',
        function () {
          el.classList.add('focus-ring-bloom');
        },
        { passive: true },
      );
      el.addEventListener(
        'blur',
        function () {
          el.classList.remove('focus-ring-bloom');
        },
        { passive: true },
      );
    });
  }

  /* ── Easter Egg 1: logo-clicks:3 ─────────────────────────────────────── */
  var logoClicks = 0;
  var logoTimeout = null;
  var logoEl = document.querySelector('.nav-logo');
  var easterRewardEl = null;

  function showEasterReward(message) {
    if (easterRewardEl) {
      easterRewardEl.remove();
    }
    var el = document.createElement('div');
    el.className = 'easter-reward';
    el.setAttribute('aria-live', 'polite');
    el.textContent = message;
    document.body.appendChild(el);
    easterRewardEl = el;
    clearTimeout(logoTimeout);
    logoTimeout = setTimeout(function () {
      if (easterRewardEl) {
        easterRewardEl.remove();
        easterRewardEl = null;
      }
    }, 3000);
  }

  if (logoEl) {
    logoEl.addEventListener('click', function (e) {
      if (isInputFocus()) return;
      logoClicks++;
      if (logoClicks === 3) {
        logoClicks = 0;
        showEasterReward('The garden remembers the curious visitor.');
        // Add visual vine animation to logo
        logoEl.classList.add('vine-unfurl');
        setTimeout(function () {
          logoEl.classList.remove('vine-unfurl');
        }, 3000);
      }
    });
  }

  /* ── Easter Egg 2: typed-word:garden ─────────────────────────────────── */
  var typedBuffer = '';

  document.addEventListener('keydown', function (e) {
    if (isInputFocus()) return;
    if (e.key === 'Escape') {
      typedBuffer = '';
      if (easterRewardEl) {
        easterRewardEl.remove();
        easterRewardEl = null;
      }
      return;
    }
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    if (e.key.length !== 1) return;

    typedBuffer += e.key.toLowerCase();

    // Keep buffer to last 20 chars
    if (typedBuffer.length > 20) {
      typedBuffer = typedBuffer.slice(-20);
    }

    if (typedBuffer.indexOf('garden') !== -1) {
      typedBuffer = '';
      showEasterReward("You speak the garden's language.");
      document.body.classList.add('garden-shimmer');
      setTimeout(function () {
        document.body.classList.remove('garden-shimmer');
      }, 3000);
    }
  });

  /* ── Intensity toggle (calm mode) ─────────────────────────────────────── */
  var intensityToggle = document.getElementById('intensity-toggle');
  var calmToggleLink = document.getElementById('calm-toggle-link');

  function applyCalmMode(active) {
    if (active) {
      document.body.classList.add('calm-mode');
      if (intensityToggle) intensityToggle.setAttribute('aria-pressed', 'true');
      if (calmToggleLink) calmToggleLink.setAttribute('aria-pressed', 'true');
    } else {
      document.body.classList.remove('calm-mode');
      if (intensityToggle) intensityToggle.setAttribute('aria-pressed', 'false');
      if (calmToggleLink) calmToggleLink.setAttribute('aria-pressed', 'false');
    }
    try {
      localStorage.setItem('phlix-calm', active ? '1' : '0');
    } catch (err) {}
  }

  // Restore saved preference
  try {
    var savedCalm = localStorage.getItem('phlix-calm');
    if (savedCalm === '1') {
      applyCalmMode(true);
    }
  } catch (err) {}

  if (intensityToggle) {
    intensityToggle.addEventListener('click', function () {
      var isCalm = document.body.classList.contains('calm-mode');
      applyCalmMode(!isCalm);
    });
  }

  if (calmToggleLink) {
    calmToggleLink.addEventListener('click', function (e) {
      e.preventDefault();
      var isCalm = document.body.classList.contains('calm-mode');
      applyCalmMode(!isCalm);
    });
  }

  /* ── Seasonal activation (live-js date-gate) ───────────────────────────── */
  var today = new Date();
  var monthDay = ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);

  var seasonMap = [
    {
      start: '06-01',
      end: '08-31',
      name: 'midsummer',
      bg: '#F8F2E0',
      secondary: '#D4956A',
      tertiary: '#8DB87A',
    },
    {
      start: '09-22',
      end: '11-30',
      name: 'autumn',
      bg: '#F2E8D5',
      primary: '#A07818',
      secondary: '#B06050',
      tertiary: '#6E8A62',
    },
    {
      start: '12-01',
      end: '02-28',
      name: 'winter',
      bg: '#F0EDE8',
      surface: '#F8F6F2',
      primary: '#8C7840',
      secondary: '#7090A0',
    },
    { start: '03-01', end: '05-31', name: 'spring', secondary: '#C890A0', tertiary: '#80B088' },
  ];

  for (var i = 0; i < seasonMap.length; i++) {
    var season = seasonMap[i];
    if (monthDay >= season.start && monthDay <= season.end) {
      var r = document.documentElement;
      if (season.bg) r.style.setProperty('--color-bg', season.bg);
      if (season.surface) r.style.setProperty('--color-surface', season.surface);
      if (season.primary) r.style.setProperty('--color-primary', season.primary);
      if (season.secondary) r.style.setProperty('--color-secondary', season.secondary);
      if (season.tertiary) r.style.setProperty('--color-tertiary', season.tertiary);
      break;
    }
  }

  /* ── Mascot Lily ───────────────────────────────────────────────────────── */
  var mascot = document.getElementById('mascot-lily');
  if (mascot) {
    // Restore dismissal
    try {
      if (localStorage.getItem('phlix-lily-dismissed') === '1') {
        mascot.classList.add('dismissed');
      }
    } catch (err) {}

    // Dismiss button
    var dismissBtn = mascot.querySelector('.mascot-dismiss');
    if (dismissBtn) {
      dismissBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        mascot.classList.add('dismissed');
        try {
          localStorage.setItem('phlix-lily-dismissed', '1');
        } catch (err) {}
      });
    }

    // Scroll-based drift (desktop only)
    if (!motionQuery.matches && window.innerWidth >= 768) {
      var lastScrollY = window.scrollY;
      var driftTime = 0;

      window.addEventListener(
        'scroll',
        function () {
          if (mascot.classList.contains('dismissed')) return;
          var delta = window.scrollY - lastScrollY;
          driftTime += delta * 0.05;
          var driftY = Math.sin(driftTime) * 4;
          mascot.style.transform = 'translateY(' + driftY + 'px)';
          lastScrollY = window.scrollY;
        },
        { passive: true },
      );
    }

    // Hover-hold easter: after 2s on mascot, Lily nods and gestures to nearest CTA
    var hoverTimer = null;
    mascot.addEventListener('mouseenter', function () {
      if (isInputFocus()) return;
      hoverTimer = setTimeout(function () {
        if (!mascot.classList.contains('dismissed')) {
          mascot.classList.add('gesture-cta');
          setTimeout(function () {
            mascot.classList.remove('gesture-cta');
          }, 2000);
        }
      }, 2000);
    });
    mascot.addEventListener('mouseleave', function () {
      clearTimeout(hoverTimer);
    });
  }

  /* ── Jargon details toggle ─────────────────────────────────────────────── */
  var jargonDetails = document.querySelectorAll('.jargon-details');
  jargonDetails.forEach(function (detail) {
    detail.addEventListener('toggle', function () {
      if (detail.open) {
        detail.classList.add('is-open');
      } else {
        detail.classList.remove('is-open');
      }
    });
  });

  /* ── Mascot click easter (Lily's lantern brightens) ────────────────────── */
  if (mascot) {
    mascot.addEventListener('click', function (e) {
      if (e.target.closest('.mascot-dismiss')) return;
      if (isInputFocus()) return;
      mascot.classList.add('lantern-brighten');
      setTimeout(function () {
        mascot.classList.remove('lantern-brighten');
      }, 600);
    });
  }
})();
