/**
 * ============================================================================
 *  MAIN.JS — Ice Cathedral
 *  Nav toggle, reduced-motion, seasonal activation,
 *  easter eggs, mascot companion.
 *  @copyright 2026 Joe Huss <detain@interserver.net>
 * ============================================================================
 */

(function () {
  'use strict';

  /* ── Helpers ─────────────────────────────────────────────────────────────── */
  var $ = function (selector, context) {
    return (context || document).querySelector(selector);
  };

  var _$$ = function (selector, context) {
    return Array.from((context || document).querySelectorAll(selector));
  };

  function isInputFocus() {
    var el = document.activeElement;
    return (
      el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.contentEditable === 'true')
    );
  }

  /* ── Reward stubs (no-op handlers for easter-egg triggers) ─────────────── */
  const showReward = () => {};
  const hideReward = () => {};

  /* ── Mobile nav toggle ───────────────────────────────────────────────────── */
  (function () {
    var toggle = $('.nav-toggle');
    var menu = $('.nav-menu');

    if (!toggle || !menu) return;

    function openMenu() {
      toggle.setAttribute('aria-expanded', 'true');
      menu.classList.add('nav-menu--open');
      menu.querySelector('a') && menu.querySelector('a').focus();
    }

    function closeMenu() {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('nav-menu--open');
      toggle.focus();
    }

    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      expanded ? closeMenu() : openMenu();
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        closeMenu();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('nav-menu--open')) {
        closeMenu();
      }
    });
  })();

  /* ── Reduced motion — read on change, not just once ──────────────────────── */
  (function () {
    var html = document.documentElement;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    function applyMotionPreference(prefersReduced) {
      if (prefersReduced) {
        html.classList.add('reduced-motion');
        html.setAttribute('data-motion', 'reduced');
      } else {
        html.classList.remove('reduced-motion');
        html.setAttribute('data-motion', 'full');
      }

      // Crystal's idle animation must stop when prefers-reduced-motion is set
      var companion = document.querySelector('.mascot-companion');
      if (companion) {
        companion.classList.toggle('mascot-companion--reduced-motion', prefersReduced);
      }
    }

    applyMotionPreference(reduced.matches);
    reduced.addEventListener('change', function (e) {
      applyMotionPreference(e.matches);
    });
  })();

  /* ── Seasonal activation (live-js date-gate) ─────────────────────────────── */
  /* Three seasonal variants:
       Midwinter Solstice  : 12-18 .. 01-05
       Aurora Season       : 09-15 .. 10-15
       Ice Hotel Opening   : 12-01 .. 12-17
  */
  (function () {
    var now = new Date();
    var month = now.getMonth() + 1; // 1–12
    var day = now.getDate(); // 1–31

    function inRange(month, day, start, end) {
      // start/end format: "MM-DD"
      var startParts = start.split('-').map(Number); // [MM, DD]
      var endParts = end.split('-').map(Number);
      var startNum = startParts[0] * 100 + startParts[1];
      var endNum = endParts[0] * 100 + endParts[1];
      var current = month * 100 + day;

      if (startNum <= endNum) {
        // Normal range within year
        return current >= startNum && current <= endNum;
      } else {
        // Range spans year boundary (e.g. Dec–Jan)
        return current >= startNum || current <= endNum;
      }
    }

    if (inRange(month, day, '12-18', '01-05')) {
      document.documentElement.classList.add('seasonal-midwinter', 'seasonal-active');
    } else if (inRange(month, day, '09-15', '10-15')) {
      document.documentElement.classList.add('seasonal-aurora', 'seasonal-active');
    } else if (inRange(month, day, '12-01', '12-17')) {
      document.documentElement.classList.add('seasonal-icehotel', 'seasonal-active');
    }
  })();

  /* ── Easter egg: logo-clicks:9 ──────────────────────────────────────────── */
  (function () {
    var logo = $('.nav-logo');
    if (!logo) return;

    var clickCount = 0;
    var clearTimer = null;

    logo.addEventListener('click', function (_e) {
      if (isInputFocus()) return;

      clickCount++;

      if (clickCount === 9) {
        clickCount = 0;
        if (clearTimer) clearTimeout(clearTimer);

        // Rose-window refraction effect on logo
        logo.classList.add('easter-rose-window');

        // Show reward toast
        showReward('The ice shifts. Perfection requires patience.');

        clearTimer = setTimeout(function () {
          logo.classList.remove('easter-rose-window');
        }, 2000);

        // Exit on Escape
        function onEsc(e) {
          if (e.key === 'Escape') {
            clickCount = 0;
            clearTimeout(clearTimer);
            logo.classList.remove('easter-rose-window');
            hideReward();
            document.removeEventListener('keydown', onEsc);
          }
        }
        document.addEventListener('keydown', onEsc);
      }
    });
  })();

  /* ── Easter egg: typed-word:cathedral ───────────────────────────────────── */
  (function () {
    var typed = '';
    var clearTimer = null;
    var target = 'cathedral';

    var overlay = document.createElement('div');
    overlay.className = 'easter-rose-lattice';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlay);

    document.addEventListener('keydown', function (e) {
      // Never preventDefault — easter egg must not shadow browser/AT keys
      if (isInputFocus()) return;
      if (e.key === 'Escape') {
        clearTyped();
        return;
      }

      // Only record letter characters
      if (e.key.length === 1) {
        typed += e.key.toLowerCase();

        // Keep buffer bounded
        if (typed.length > target.length + 4) {
          typed = typed.slice(-target.length);
        }

        if (typed.endsWith(target)) {
          triggerLattice();
        }
      }
    });

    function triggerLattice() {
      clearTyped();
      overlay.classList.add('easter-rose-lattice--active');
      showReward('You understand the architecture.');

      setTimeout(function () {
        overlay.classList.remove('easter-rose-lattice--active');
      }, 3000);

      setTimeout(hideReward, 3200);
    }

    function clearTyped() {
      typed = '';
      if (clearTimer) clearTimeout(clearTimer);
      overlay.classList.remove('easter-rose-lattice--active');
      hideReward();
    }
  })();

  /* ── Reward toast ────────────────────────────────────────────────────────── */
  (function () {
    var toast = document.createElement('div');
    toast.className = 'easter-reward';
    toast.setAttribute('aria-live', 'polite');
    toast.setAttribute('aria-hidden', 'true');
    document.body.appendChild(toast);
    var toastTimer = null;

    window.showReward = function (text) {
      if (toastTimer) clearTimeout(toastTimer);
      toast.textContent = text;
      toast.setAttribute('aria-hidden', 'false');
      toast.classList.add('easter-reward--visible');
      toastTimer = setTimeout(hideReward, 3500);
    };

    window.hideReward = function () {
      toast.classList.remove('easter-reward--visible');
      toast.setAttribute('aria-hidden', 'true');
    };
  })();

  /* ── Mascot companion: Crystal ────────────────────────────────────────────── */
  /* Appears on Home, Features, Clients, Download, Hub.
     Dismisses persistently via localStorage.
     Tips shown per current section. */
  (function () {
    var companion = $('.mascot-companion');
    if (!companion) return;

    var crystal = $('.mascot-crystal', companion);
    var tipEl = $('.mascot-tip', companion);
    var dismissBtn = $('.mascot-dismiss', companion);

    var DISMISSED_KEY = 'ice-cathedral-crystal-dismissed';

    // Check persistent dismissal
    if (localStorage.getItem(DISMISSED_KEY) === 'true') {
      companion.classList.add('mascot-companion--dismissed');
      return;
    }

    // Show after short delay (allow page to settle)
    var showTimer = setTimeout(function () {
      companion.style.opacity = '1';
    }, 1200);

    // Section tips map
    var sectionTips = [
      { selector: '#the-void, .hero', say: 'The ice holds still. You may enter.' },
      {
        selector: '.feature-detail',
        say: 'Each structure, ancient and eternal — chosen with the patience of geological time.',
      },
      {
        selector: '.client-card',
        say: 'Five screens, one cold light — the architecture reaches anywhere.',
      },
      { selector: '#server', say: 'One line. The glacier never hurries.' },
      {
        selector: '.page-header',
        say: "The hub carries the cathedral's light across distance without dimming.",
      },
    ];

    var currentTip = '';

    function updateTip() {
      for (var i = 0; i < sectionTips.length; i++) {
        var el = document.querySelector(sectionTips[i].selector);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.7) {
          currentTip = sectionTips[i].say;
          tipEl.textContent = currentTip;
          tipEl.classList.add('mascot-tip--visible');
          return;
        }
      }
      tipEl.classList.remove('mascot-tip--visible');
    }

    // Initial tip
    updateTip();
    window.addEventListener('scroll', updateTip, { passive: true });

    // Dismiss
    if (dismissBtn) {
      dismissBtn.addEventListener('click', function () {
        localStorage.setItem(DISMISSED_KEY, 'true');
        companion.classList.add('mascot-companion--dismissed');
        clearTimeout(showTimer);
      });
    }

    // Hover-hold interaction (Crystal's easter_interaction: 3s hover)
    if (crystal) {
      var hoverTimer = null;

      crystal.addEventListener('mouseenter', function () {
        if (isReducedMotion()) return;
        hoverTimer = setTimeout(function () {
          showReward('You see the cathedral within the crystal.');
          crystal.classList.add('mascot-crystal--refracting');
          setTimeout(function () {
            crystal.classList.remove('mascot-crystal--refracting');
          }, 2500);
        }, 3000);
      });

      crystal.addEventListener('mouseleave', function () {
        if (hoverTimer) clearTimeout(hoverTimer);
      });
    }

    function isReducedMotion() {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  })();
})();
