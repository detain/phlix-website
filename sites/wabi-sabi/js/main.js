/**
 * main.js — Wabi-Sabi
 * Navigation, scroll reveals, mascot, easter eggs, seasonal activation
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  /* ========================================================================
   * NAV — mark active link
   * ======================================================================== */

  function initNav() {
    const current = new URL(window.location.href).pathname.replace(/\/$/, '') || '/';
    const navLinks = document.querySelectorAll('.topbar__nav a[href]');
    navLinks.forEach(function (link) {
      const href = link.getAttribute('href').replace(/\/$/, '') || '/';
      if (href === current || (href !== '/' && current.startsWith(href))) {
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ========================================================================
   * SCROLL REVEALS — gentle fade-in-up as sections enter viewport
   * Disabled under prefers-reduced-motion
   * ======================================================================== */

  function initScrollReveals() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Show everything immediately
      document.querySelectorAll('.animate-fade-in-up, .animate-fade-in').forEach(function (el) {
        el.style.animationPlayState = 'paused';
        el.style.opacity = '1';
      });
      return;
    }

    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    document.querySelectorAll('.reveal').forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(8px)';
      el.style.transition = 'opacity 600ms ease-in-out, transform 600ms ease-in-out';
      io.observe(el);
    });
  }

  /* ========================================================================
   * MASCOT — Tsugi, the kintsugi-repaired raku bowl
   * Appears on: home, download, about
   * Manages: idle breathing, tips, easter interactions, dismiss
   * ======================================================================== */

  var MASCOT_KEY = 'phlix_wabisabi_mascot_dismissed';

  function initMascot() {
    var mascotEl = document.querySelector('.mascot');
    if (!mascotEl) return;

    // Respect dismiss state
    if (localStorage.getItem(MASCOT_KEY) === 'true') {
      mascotEl.style.display = 'none';
      return;
    }

    var bowl = mascotEl.querySelector('.mascot__bowl');
    var tip = mascotEl.querySelector('.mascot__tip');
    var dismissBtn = mascotEl.querySelector('.mascot__dismiss');
    var clickCount = 0;
    var hoverTimer = null;
    var tipTimeout = null;

    // Start idle animation
    mascotEl.classList.add('is-idle');

    // Tip data — keyed by CSS selector
    var tips = [
      { selector: '#hero, .hero', say: 'The library is ready to hold what you bring.' },
      { selector: '.features-overview', say: 'Every feature is built for slowness and presence.' },
      { selector: '#server', say: 'One line to run. The rest is just opening your hands.' },
      { selector: '.faq-list', say: 'Your questions are always welcome here.' },
    ];

    function showTip(text) {
      if (!tip) return;
      if (tipTimeout) clearTimeout(tipTimeout);
      tip.textContent = text;
      tip.classList.add('is-visible');
      tipTimeout = setTimeout(function () {
        tip.classList.remove('is-visible');
      }, 4000);
    }

    function hideTip() {
      if (!tip) return;
      tip.classList.remove('is-visible');
    }

    // Show tip on first view of a tracked section
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !entry.target._mascotTipShown) {
            entry.target._mascotTipShown = true;
            var match = tips.find(function (t) {
              return entry.target.matches(t.selector) || entry.target.querySelector(t.selector);
            });
            if (match) {
              setTimeout(function () {
                showTip(match.say);
              }, 800);
            }
          }
        });
      },
      { threshold: 0.3 },
    );

    tips.forEach(function (t) {
      var el = document.querySelector(t.selector);
      if (el) observer.observe(el);
    });

    // Click:5 easter interaction
    bowl.addEventListener('click', function () {
      clickCount++;
      if (clickCount >= 5) {
        clickCount = 0;
        showTip('Tsugi settles deeper into the stone, almost imperceptibly content.');
      }
    });

    // Hover-hold:2s easter interaction
    bowl.addEventListener('mouseenter', function () {
      hoverTimer = setTimeout(function () {
        showTip('A single gold brushstroke appears and fades, like repair work happening.');
      }, 2000);
    });

    bowl.addEventListener('mouseleave', function () {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
        hoverTimer = null;
      }
      hideTip();
    });

    // Dismiss — hides for the session (localStorage)
    if (dismissBtn) {
      dismissBtn.addEventListener('click', function () {
        localStorage.setItem(MASCOT_KEY, 'true');
        mascotEl.style.display = 'none';
      });
    }
  }

  /* ========================================================================
   * EASTER EGG — scroll past footer: ink brushstroke appears
   * §19.8: must not preventDefault, must exit on Esc,
   * disabled while focus in input/textarea/contenteditable
   * ======================================================================== */

  function initEasterEgg() {
    var brushstroke = document.querySelector('.easter-brushstroke');
    if (!brushstroke) return;

    var shown = false;
    var escHandler = null;

    function showBrushstroke() {
      if (shown) return;
      shown = true;
      brushstroke.classList.add('is-visible');

      escHandler = function (e) {
        if (e.key === 'Escape') {
          brushstroke.classList.remove('is-visible');
          shown = false;
          document.removeEventListener('keydown', escHandler);
        }
      };
      document.addEventListener('keydown', escHandler);

      // Auto-fade after 6 seconds
      setTimeout(function () {
        brushstroke.classList.remove('is-visible');
        shown = false;
        if (escHandler) document.removeEventListener('keydown', escHandler);
      }, 6000);
    }

    // Scroll past footer
    var footer = document.querySelector('.footer');
    if (footer) {
      var footerIO = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
              // Footer has scrolled out of view — past the footer
              showBrushstroke();
              footerIO.disconnect();
            }
          });
        },
        { threshold: 0 },
      );
      footerIO.observe(footer);
    }

    // §19.8: disable while typing
    document.addEventListener('keydown', function (e) {
      var tag = document.activeElement && document.activeElement.tagName;
      if (
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        (document.activeElement && document.activeElement.contentEditable === 'true')
      ) {
        // Don't trigger egg while typing — but also do NOT call preventDefault
        return;
      }
    });
  }

  /* ========================================================================
   * SEASONAL ACTIVATION — live-js mode
   * Checks current date against seasonal_ranges and applies CSS vars
   * ======================================================================== */

  function initSeasonal() {
    // Sakura Drift:   03-20 .. 04-10
    // Autumn Maple:  10-10 .. 11-20
    // Midwinter Still: 01-05 .. 02-10
    var now = new Date();
    var mmdd =
      (now.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      now.getDate().toString().padStart(2, '0');

    function inRange(mmdd, start, end) {
      return mmdd >= start && mmdd <= end;
    }

    var root = document.documentElement;

    if (inRange(mmdd, '03-20', '04-10')) {
      root.style.setProperty('--color-tertiary', '#D4849A');
      root.style.setProperty('--color-surface', '#F0E8EC');
      root.style.setProperty('--color-surface-alt', '#E8D8DF');
      // Append sakura petals element if asset exists
      var petals = document.createElement('div');
      petals.className = 'seasonal-sakura-petals';
      petals.setAttribute('aria-hidden', 'true');
      document.body.appendChild(petals);
    } else if (inRange(mmdd, '10-10', '11-20')) {
      root.style.setProperty('--color-primary', '#8B3A1A');
      root.style.setProperty('--color-tertiary', '#C05A10');
      root.style.setProperty('--color-surface', '#EFE0CC');
    } else if (inRange(mmdd, '01-05', '02-10')) {
      root.style.setProperty('--color-bg', '#F2EEE8');
      root.style.setProperty('--color-secondary', '#3A4E5C');
      root.style.setProperty('--color-text-muted', '#7A7E80');
    }
  }

  /* ========================================================================
   * INIT
   * ======================================================================== */

  function init() {
    initNav();
    initScrollReveals();
    initMascot();
    initEasterEgg();
    initSeasonal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
