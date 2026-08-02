/**
 * ==========================================================================
 * MAIN.JS — Neon Blossom
 * Nav toggle, reduced motion, mascot (Lumia), easter eggs, seasonal
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * ==========================================================================
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     Utilities
     -------------------------------------------------------------------------- */
  function qs(selector, ctx) {
    return (ctx || document).querySelector(selector);
  }

  function qsa(selector, ctx) {
    return Array.from((ctx || document).querySelectorAll(selector));
  }

  function on(el, event, handler, opts) {
    if (!el) return;
    el.addEventListener(event, handler, opts);
  }

  function off(el, event, handler, opts) {
    if (!el) return;
    el.removeEventListener(event, handler, opts);
  }

  /* --------------------------------------------------------------------------
     Reduced motion
     -------------------------------------------------------------------------- */
  var motionToggle = qs('.reduce-motion-toggle');
  var motionInput = motionToggle ? qs('input', motionToggle) : null;
  var htmlEl = document.documentElement;

  function applyReducedMotion(reduce) {
    if (reduce) {
      htmlEl.style.setProperty('--transition-duration', '0.01ms');
      htmlEl.style.setProperty('--animation-duration', '0.01ms');
    } else {
      htmlEl.style.removeProperty('--transition-duration');
      htmlEl.style.removeProperty('--animation-duration');
    }
  }

  function checkMotionPreference() {
    var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    var stored = localStorage.getItem('phlix-reduce-motion');
    if (stored !== null) {
      applyReducedMotion(stored === 'true');
      if (motionInput) motionInput.checked = stored === 'true';
    } else {
      applyReducedMotion(mq.matches);
      if (motionInput) motionInput.checked = mq.matches;
    }
  }

  checkMotionPreference();

  on(motionInput, 'change', function () {
    var reduce = motionInput.checked;
    localStorage.setItem('phlix-reduce-motion', reduce);
    applyReducedMotion(reduce);
  });

  on(window.matchMedia('(prefers-reduced-motion: reduce)'), 'change', function (e) {
    if (localStorage.getItem('phlix-reduce-motion') === null) {
      applyReducedMotion(e.matches);
      if (motionInput) motionInput.checked = e.matches;
    }
  });

  /* --------------------------------------------------------------------------
     Mobile nav toggle
     -------------------------------------------------------------------------- */
  var navToggle = qs('.nav-toggle');
  var primaryNav = qs('.primary-nav');

  if (navToggle && primaryNav) {
    on(navToggle, 'click', function () {
      primaryNav.classList.toggle('primary-nav--open');
      var expanded = primaryNav.classList.contains('primary-nav--open');
      navToggle.setAttribute('aria-expanded', String(expanded));
    });

    // Close on nav link click
    qsa('.nav-link', primaryNav).forEach(function (link) {
      on(link, 'click', function () {
        primaryNav.classList.remove('primary-nav--open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --------------------------------------------------------------------------
     Mascot — Lumia
     -------------------------------------------------------------------------- */
  var mascot = qs('.mascot');
  if (mascot) {
    var mascotDismiss = qs('.mascot-dismiss');
    var mascotTip = qs('.mascot-tip');
    var dismissedKey = 'phlix-lumia-dismissed';
    var clickCount = 0;
    var clickTimer = null;

    function showMascotTip() {
      if (mascotTip) mascotTip.classList.add('mascot-tip--visible');
    }

    function hideMascotTip() {
      if (mascotTip) mascotTip.classList.remove('mascot-tip--visible');
    }

    function triggerMascotLand() {
      showMascotTip();
      setTimeout(hideMascotTip, 3000);
    }

    function dismissMascot() {
      mascot.classList.add('mascot--hidden');
      localStorage.setItem(dismissedKey, '1');
    }

    function restoreMascot() {
      mascot.classList.remove('mascot--hidden');
      localStorage.removeItem(dismissedKey);
    }

    // Check stored dismissal
    if (localStorage.getItem(dismissedKey) === '1') {
      mascot.classList.add('mascot--hidden');
    }

    // Show tip on hover/focus (desktop only)
    if (window.matchMedia('(min-width: 768px)').matches) {
      on(mascot, 'mouseenter', showMascotTip);
      on(mascot, 'mouseleave', hideMascotTip);
      on(mascot, 'focusin', showMascotTip);
      on(mascot, 'focusout', hideMascotTip);
    }

    // Dismiss
    if (mascotDismiss) {
      on(mascotDismiss, 'click', function (e) {
        e.stopPropagation();
        dismissMascot();
      });
    }

    // Easter: click 3 times → spiral + pollen
    on(mascot, 'click', function () {
      clickCount++;
      clearTimeout(clickTimer);
      clickTimer = setTimeout(function () {
        clickCount = 0;
      }, 1000);

      if (clickCount >= 3) {
        clickCount = 0;
        triggerMascotSpiral();
      }
    });

    var hoverTimer = null;
    on(mascot, 'mouseenter', function () {
      hoverTimer = setTimeout(function () {
        triggerMascotLand();
      }, 2000);
    });
    on(mascot, 'mouseleave', function () {
      clearTimeout(hoverTimer);
    });

    // Restore control (add to page if not present)
    var restoreBtn = qs('.mascot-restore');
    if (restoreBtn) {
      on(restoreBtn, 'click', restoreMascot);
    }
  }

  function triggerMascotSpiral() {
    if (!mascot) return;
    var body = qs('.mascot-body', mascot);
    if (!body) return;
    body.style.animation = 'none';
    body.offsetHeight; // reflow
    body.style.animation = 'mascot-spiral 0.8s ease-in-out';
    setTimeout(function () {
      body.style.animation = 'mascot-float 4s ease-in-out infinite';
    }, 800);
    spawnPollen();
  }

  function spawnPollen() {
    if (!mascot) return;
    var rect = mascot.getBoundingClientRect();
    for (var i = 0; i < 6; i++) {
      var dot = document.createElement('div');
      dot.style.cssText = [
        'position:fixed',
        'width:6px',
        'height:6px',
        'border-radius:50%',
        'background:' +
          getComputedStyle(document.documentElement).getPropertyValue('--color-tertiary'),
        'pointer-events:none',
        'z-index:9999',
        'left:' + (rect.left + rect.width / 2) + 'px',
        'top:' + (rect.top + rect.height / 2) + 'px',
        'animation:pollen-trail 0.8s ease-out forwards',
        'animation-delay:' + i * 60 + 'ms',
      ].join(';');
      document.body.appendChild(dot);
      setTimeout(
        (function (d) {
          return function () {
            d.remove();
          };
        })(dot),
        1000,
      );
    }
  }

  /* --------------------------------------------------------------------------
     Easter eggs
     -------------------------------------------------------------------------- */

  // 1. Logo clicks: 7 → Lumia spiral
  var logoClicks = 0;
  var logoClickTimer = null;
  var siteLogo = qs('.site-logo');
  if (siteLogo) {
    on(siteLogo, 'click', function (e) {
      // Don't count if in an input
      if (e.target.closest('input, textarea, [contenteditable]')) return;

      logoClicks++;
      clearTimeout(logoClickTimer);
      logoClickTimer = setTimeout(function () {
        logoClicks = 0;
      }, 1500);

      if (logoClicks >= 7) {
        logoClicks = 0;
        if (mascot) triggerMascotSpiral();
      }
    });
  }

  // 2. Typed-word: "lumia"
  var typedBuffer = '';
  var typedTimer = null;

  on(document, 'keydown', function (e) {
    // Skip if in input/textarea/contenteditable
    var tag = e.target.tagName;
    if (e.target === document.body || tag === 'BODY') {
      // OK
    } else if (e.target.closest('input, textarea, [contenteditable]')) {
      return;
    }

    // Esc exits
    if (e.key === 'Escape') {
      typedBuffer = '';
      return;
    }

    clearTimeout(typedTimer);
    typedTimer = setTimeout(function () {
      typedBuffer = '';
    }, 1000);

    typedBuffer += e.key.toLowerCase();

    if (typedBuffer.endsWith('lumia')) {
      typedBuffer = '';
      triggerTypedWordReward();
    }
  });

  function triggerTypedWordReward() {
    // Firefly burst on screen
    var burst = document.createElement('div');
    burst.style.cssText = [
      'position:fixed',
      'inset:0',
      'pointer-events:none',
      'z-index:9998',
      'display:flex',
      'align-items:center',
      'justify-content:center',
    ].join(';');

    var glow = document.createElement('div');
    glow.style.cssText = [
      'width:120px',
      'height:120px',
      'border-radius:50%',
      'background:radial-gradient(circle, rgba(255,209,102,0.4) 0%, transparent 70%)',
      'animation:firefly-burst 0.6s ease-out forwards',
    ].join(';');

    burst.appendChild(glow);
    document.body.appendChild(burst);
    setTimeout(function () {
      burst.remove();
    }, 700);
  }

  /* --------------------------------------------------------------------------
     FAQ accordion
     -------------------------------------------------------------------------- */
  qsa('.faq-item').forEach(function (item) {
    var question = qs('.faq-question', item);
    if (!question) return;

    on(question, 'click', function () {
      var isOpen = item.classList.contains('faq-item--open');
      // Close all
      qsa('.faq-item').forEach(function (i) {
        i.classList.remove('faq-item--open');
      });
      // Toggle current
      if (!isOpen) {
        item.classList.add('faq-item--open');
      }
    });
  });

  /* --------------------------------------------------------------------------
     Seasonal activation
     -------------------------------------------------------------------------- */
  (function () {
    var variants = [
      {
        name: 'Midnight Winter Bloom',
        start: [12, 1],
        end: [1, 6],
        overrides: {
          '--color-primary': '#FF4FA0',
          '--color-secondary': '#7B52FF',
          '--color-tertiary': '#E8F4FF',
        },
      },
      {
        name: 'Spring Awakening',
        start: [3, 20],
        end: [5, 31],
        overrides: {
          '--color-primary': '#FF6EB4',
          '--color-secondary': '#B060FF',
          '--color-quaternary': '#4DFFA0',
        },
      },
      {
        name: 'Midsummer Firefly Festival',
        start: [6, 21],
        end: [8, 31],
        overrides: { '--color-primary': '#FF1A6E', '--color-tertiary': '#FFE066' },
      },
      {
        name: 'Autumn Dusk Garden',
        start: [9, 22],
        end: [11, 30],
        overrides: {
          '--color-primary': '#FF6040',
          '--color-secondary': '#8B3FD9',
          '--color-tertiary': '#D4872A',
        },
      },
    ];

    function getMonthDay() {
      var d = new Date();
      return [d.getMonth() + 1, d.getDate()];
    }

    function inRange(md, start, end) {
      var m = md[0],
        d = md[1];
      var s = start[0] * 100 + start[1];
      var e = end[0] * 100 + end[1];
      var c = m * 100 + d;
      if (s <= e) return c >= s && c <= e;
      return c >= s || c <= e;
    }

    var now = getMonthDay();
    var active = variants.find(function (v) {
      return inRange(now, v.start, v.end);
    });

    if (active) {
      Object.keys(active.overrides).forEach(function (prop) {
        document.documentElement.style.setProperty(prop, active.overrides[prop]);
      });
    }
  })();

  /* --------------------------------------------------------------------------
     Scroll reveal (simplified, no intersection observer overhead)
     -------------------------------------------------------------------------- */
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    qsa('[data-reveal]').forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    function reveal() {
      qsa('[data-reveal]').forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });
    }

    on(window, 'scroll', reveal, { passive: true });
    reveal();
  }
})();
