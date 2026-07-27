/**
 * ============================================================================
 * MAIN.JS — Bollywood Dreams
 * Vanilla JS: mobile nav, reduced-motion, scroll reveals, Priya mascot,
 * easter eggs, intensity toggle, seasonal activation, visitor paths.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * ============================================================================
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────────────────────
     SEASONAL ACTIVATION — date-gate for live-js mode
     Checks which seasonal_variants active_range today falls inside and
     applies the CSS variable overrides to :root.
     ───────────────────────────────────────────────────────────────────────── */
  (function seasonalInit() {
    // MM-DD..MM-DD ranges for Bollywood Dreams seasonal_variants
    var variants = [
      {
        name: 'Diwali Festival of Light',
        range: '10-20..11-05',
        overrides: {
          '--color-primary': '#F5C400',
          '--color-secondary': '#FF8C00',
          '--color-tertiary': '#CC0066',
        },
      },
      {
        name: 'Holi Colour Burst',
        range: '03-01..03-15',
        overrides: {
          '--color-primary': '#F5A800',
          '--color-secondary': '#00C9A7',
          '--color-tertiary': '#FF3DAC',
        },
      },
      {
        name: 'Monsoon Romance',
        range: '06-15..09-15',
        overrides: {
          '--color-primary': '#00A8CC',
          '--color-secondary': '#F5A800',
          '--color-tertiary': '#F5C400',
          '--color-surface': '#0F0A12',
        },
      },
      {
        name: 'Silver Screen New Year',
        range: '12-28..01-03',
        overrides: {
          '--color-primary': '#F5A800',
          '--color-secondary': '#CC0066',
          '--color-tertiary': '#00A8CC',
        },
      },
    ];

    function getMonthDay() {
      var d = new Date();
      return String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    }

    function inRange(md, range) {
      var parts = range.split('..');
      return md >= parts[0] && md <= parts[1];
    }

    var today = getMonthDay();
    var active = variants.filter(function (v) {
      return inRange(today, v.range);
    });

    if (active.length > 0) {
      var root = document.documentElement;
      active.forEach(function (v) {
        Object.keys(v.overrides).forEach(function (prop) {
          root.style.setProperty(prop, v.overrides[prop]);
        });
      });
      // Show banner
      var slot = document.getElementById('season-slot');
      if (slot) {
        slot.removeAttribute('hidden');
        slot.textContent =
          '🎆 ' +
          active[0].name +
          ' — ' +
          (active[0].name === 'Diwali Festival of Light'
            ? 'The festival season is upon us — pull up a seat and celebrate.'
            : active[0].name === 'Holi Colour Burst'
              ? 'Colour bursts and powder clouds — celebrate with us.'
              : active[0].name === 'Monsoon Romance'
                ? 'Rain on the lens, peacock teal rises — the monsoon cinema is here.'
                : active[0].name === 'Silver Screen New Year'
                  ? 'Silver screen, golden hour — the new year begins.'
                  : '');
      }
    }
  })();

  /* ─────────────────────────────────────────────────────────────────────────
     REDUCED MOTION
     Read once at load AND listen for changes ( Trap §19.20 )
     ───────────────────────────────────────────────────────────────────────── */
  var mqReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var isReduced = mqReduced.matches;

  mqReduced.addEventListener('change', function (e) {
    isReduced = e.matches;
    document.documentElement.dataset.motion = isReduced ? 'reduced' : 'full';
    // Update Priya idle
    var priya = document.getElementById('priya-companion');
    if (priya) {
      var figure = priya.querySelector('.priya-figure');
      if (figure) {
        figure.style.animation = isReduced ? 'none' : 'priya-idle 4s ease-in-out infinite';
      }
    }
  });

  document.documentElement.dataset.motion = isReduced ? 'reduced' : 'full';

  /* ─────────────────────────────────────────────────────────────────────────
     MOBILE NAV TOGGLE
     ───────────────────────────────────────────────────────────────────────── */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-menu');
  var backdrop = document.querySelector('.nav-backdrop');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('open', !expanded);
      if (backdrop) backdrop.classList.toggle('open', !expanded);
    });

    // Close on backdrop click
    if (backdrop) {
      backdrop.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
        backdrop.classList.remove('open');
      });
    }

    // Close on Esc
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
        if (backdrop) backdrop.classList.remove('open');
        toggle.focus();
      }
    });
  }

  /* ─────────────────────────────────────────────────────────────────────────
     SCROLL REVEALS — IntersectionObserver
     ───────────────────────────────────────────────────────────────────────── */
  if (!isReduced && 'IntersectionObserver' in window) {
    var revealEls = document.querySelectorAll('.reveal');
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show all immediately
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ─────────────────────────────────────────────────────────────────────────
     INTENSITY TOGGLE — "Dim the house lights"
     Affects: animation, parallax, scroll effects
     Writes data-intensity="dim" on <html>
     ───────────────────────────────────────────────────────────────────────── */
  var intensityToggle = document.getElementById('intensity-toggle');
  if (intensityToggle) {
    // Restore persisted state
    if (localStorage.getItem('phlix-intensity') === 'dim') {
      document.documentElement.dataset.intensity = 'dim';
      intensityToggle.setAttribute('aria-pressed', 'true');
      intensityToggle.textContent = 'Restore full lights';
    }

    intensityToggle.addEventListener('click', function () {
      var isDim = document.documentElement.dataset.intensity === 'dim';
      if (isDim) {
        document.documentElement.dataset.intensity = 'full';
        intensityToggle.setAttribute('aria-pressed', 'false');
        intensityToggle.textContent = 'Dim the house lights';
        localStorage.setItem('phlix-intensity', 'full');
      } else {
        document.documentElement.dataset.intensity = 'dim';
        intensityToggle.setAttribute('aria-pressed', 'true');
        intensityToggle.textContent = 'Restore full lights';
        localStorage.setItem('phlix-intensity', 'dim');
      }
    });
  }

  /* ─────────────────────────────────────────────────────────────────────────
     PRIYA MASCOT
     behavior: idle sway + blink, contextual tips on anchors,
     easter_interactions (click:5 → tail fan, hover-hold:2s → gesture),
     dismiss to localStorage.
     Must NOT be position:fixed on mobile — see .priya-companion CSS.
     ───────────────────────────────────────────────────────────────────────── */
  var priya = document.getElementById('priya-companion');
  if (priya) {
    var priyaFigure = priya.querySelector('.priya-figure');
    var priyaTip = priya.querySelector('.priya-tip');
    var priyaClose = priya.querySelector('.priya-close');
    var priyaDismissed = localStorage.getItem('phlix-priya-dismissed') === '1';

    // Tips keyed by anchor → message
    var tips = [
      { where: 'home', say: 'Welcome, dear guest — the show is about to begin.' },
      {
        where: 'home:#hero',
        say: 'Welcome, dear guest — the show is about to begin. Have you chosen your seat?',
      },
      {
        where: 'home:.feature-cards',
        say: 'Psst\u2026 these are the grand features that make our cinema sing.',
      },
      {
        where: 'download:#server',
        say: 'One command and you are the projectionist. I shall hold the marigolds.',
      },
      {
        where: 'about:#faq',
        say: 'Curtain questions? I have seen them all in the suggestion box \u2014 let me share.',
      },
    ];

    function getTip() {
      var hash = window.location.hash || '';
      var path = window.location.pathname.replace(/\.html$/, '') || '/';
      for (var i = 0; i < tips.length; i++) {
        var t = tips[i];
        if (hash && t.where === hash) return t.say;
        if (!hash && t.where === 'home') return t.say;
      }
      return '';
    }

    function showPriya() {
      priya.removeAttribute('hidden');
      var tip = getTip();
      if (priyaTip && tip) priyaTip.textContent = tip;
    }

    // Initial visibility
    if (priyaDismissed) {
      priya.setAttribute('hidden', '');
    } else {
      showPriya();
    }

    // Close button
    if (priyaClose) {
      priyaClose.addEventListener('click', function () {
        priya.setAttribute('hidden', '');
        localStorage.setItem('phlix-priya-dismissed', '1');
      });
    }

    // Easter: click 5 times → tail fan
    var clickCount = 0;
    priyaFigure.addEventListener('click', function () {
      clickCount++;
      if (clickCount >= 5) {
        clickCount = 0;
        priyaFigure.style.animation = 'priya-celebrate 800ms ease-out';
        triggerPetalBurst();
        if (priyaTip) priyaTip.textContent = 'Intermission! Priya loves an attentive audience.';
        setTimeout(function () {
          priyaFigure.style.animation = isReduced ? 'none' : 'priya-idle 4s ease-in-out infinite';
        }, 900);
      }
    });

    // Easter: hover-hold 2s → gesture wing
    var hoverTimer;
    priyaFigure.addEventListener('mouseenter', function () {
      hoverTimer = setTimeout(function () {
        if (priyaTip) priyaTip.textContent = 'I was hoping you would stay!';
      }, 2000);
    });
    priyaFigure.addEventListener('mouseleave', function () {
      clearTimeout(hoverTimer);
    });
  }

  /* ─────────────────────────────────────────────────────────────────────────
     EASTER EGG 1: logo-clicks:5 → Priya petal burst
     (Also wired via Priya click above, but also on .nav-logo for discoverability)
     ───────────────────────────────────────────────────────────────────────── */
  var logoClicks = 0;
  var navLogo = document.querySelector('.nav-logo');
  if (navLogo) {
    navLogo.addEventListener('click', function (e) {
      // Don't count if clicking a real link
      if (e.defaultPrevented) return;
      logoClicks++;
      if (logoClicks >= 5) {
        logoClicks = 0;
        triggerPetalBurst();
        showToast('Intermission! Priya loves an attentive audience.', 'success');
      }
    });
  }

  /* ─────────────────────────────────────────────────────────────────────────
     EASTER EGG 2: typed-word:namaste
     Disabled while focus is in input/textarea/contenteditable.
     Never calls preventDefault. Exits on Esc.
     ───────────────────────────────────────────────────────────────────────── */
  var typedBuffer = '';
  var easterTimeout;
  var easterActive = false;

  function triggerNamasteEaster() {
    easterActive = true;
    // Cursor becomes marigold blossom via CSS
    document.body.style.cursor =
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='10' fill='%23F5A800'/%3E%3C/svg%3E\") 10 10, auto";
    // Marquee bulb chase: animate .hero__rangoli-top lights
    var rangoli = document.querySelector('.hero__rangoli-top');
    if (rangoli) {
      rangoli.style.animation = 'rangoli-chase 1.5s ease-in-out';
    }
    showToast('You found the respectful heart of the house.', 'success');
    setTimeout(function () {
      document.body.style.cursor = '';
      easterActive = false;
      if (rangoli) rangoli.style.animation = '';
    }, 5000);
  }

  document.addEventListener('keydown', function (e) {
    // Skip if focus is in an editable element
    var tag = document.activeElement && document.activeElement.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement.isContentEditable) return;

    if (e.key === 'Escape') {
      typedBuffer = '';
      if (easterActive) {
        document.body.style.cursor = '';
        easterActive = false;
        var rangoli = document.querySelector('.hero__rangoli-top');
        if (rangoli) rangoli.style.animation = '';
      }
      return;
    }

    // Only listen for printable character keys
    if (e.key.length !== 1) return;

    typedBuffer += e.key.toLowerCase();

    // Keep buffer bounded
    if (typedBuffer.length > 20) typedBuffer = typedBuffer.slice(-10);

    clearTimeout(easterTimeout);
    easterTimeout = setTimeout(function () {
      typedBuffer = '';
    }, 2000);

    if (typedBuffer.indexOf('namaste') !== -1) {
      typedBuffer = '';
      triggerNamasteEaster();
    }
  });

  /* ─────────────────────────────────────────────────────────────────────────
     PETAL BURST — jasmine petal particle effect
     ───────────────────────────────────────────────────────────────────────── */
  function triggerPetalBurst() {
    var existing = document.getElementById('petal-burst');
    if (existing) existing.remove();

    var burst = document.createElement('div');
    burst.id = 'petal-burst';
    burst.className = 'petal-burst active';
    burst.setAttribute('aria-hidden', 'true');

    var colors = ['#F5A800', '#FFF5E0', '#F5C400', '#CC0066'];
    for (var i = 0; i < 24; i++) {
      var petal = document.createElement('span');
      petal.className = 'petal';
      petal.style.left = Math.random() * 100 + '%';
      petal.style.background = colors[Math.floor(Math.random() * colors.length)];
      petal.style.animationDelay = Math.random() * 0.8 + 's';
      petal.style.animationDuration = 3 + Math.random() * 2 + 's';
      burst.appendChild(petal);
    }

    document.body.appendChild(burst);
    setTimeout(function () {
      burst.remove();
    }, 6000);
  }

  /* ─────────────────────────────────────────────────────────────────────────
     TOAST NOTIFICATIONS — for easter egg rewards
     ───────────────────────────────────────────────────────────────────────── */
  function showToast(message, type) {
    type = type || 'info';
    var container =
      document.querySelector('.toast-container') ||
      (function () {
        var c = document.createElement('div');
        c.className = 'toast-container';
        document.body.appendChild(c);
        return c;
      })();

    var toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(function () {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(function () {
        toast.remove();
      }, 300);
    }, 4500);
  }

  /* ─────────────────────────────────────────────────────────────────────────
     VISITOR PATHS — self-select fork interactions
     Highlight selected path card briefly on click
     ───────────────────────────────────────────────────────────────────────── */
  document.querySelectorAll('.visitor-path-card').forEach(function (card) {
    card.addEventListener('click', function (e) {
      // Brief highlight flash
      card.style.boxShadow = '0 0 24px rgba(245, 168, 0, 0.5)';
      setTimeout(function () {
        card.style.boxShadow = '';
      }, 600);
    });
  });

  /* ─────────────────────────────────────────────────────────────────────────
     SECTION REVEAL on scroll — chaptered scroll experience
     Film-burn wipe at section top for non-reduced-motion visitors
     ───────────────────────────────────────────────────────────────────────── */
  if (!isReduced && 'IntersectionObserver' in window) {
    var sections = document.querySelectorAll('section[id]');
    var scrollObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
          }
        });
      },
      { threshold: 0.05 },
    );

    sections.forEach(function (sec) {
      scrollObserver.observe(sec);
    });
  }
})();
