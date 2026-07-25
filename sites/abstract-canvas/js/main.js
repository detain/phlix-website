/**
 * MAIN.JS — Abstract Canvas
 *
 * Self-contained, dependency-free enhancement layer. Everything here is
 * optional: with JS disabled every page still carries its full copy, its
 * navigation and its CTAs (hero_experience.js_budget_kb is 0 — the hero is
 * pure markup).
 *
 * Implements, in kit order:
 *   navigation_model.fallback   mobile menu toggle + Esc + outside click
 *   scroll_experience           opacity-only settle, continuous scroll
 *   intensity_toggle            "Gallery quiet", persisted
 *   mascot.behavior             Palette: tips, idle, reactions, dismissal
 *   easter_eggs                 logo-clicks:5 and typed-word:palette
 *   seasonal_activation         live date-gate over seasonal_variants
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  var root = document.documentElement;
  var store = {
    get: function (k) {
      try {
        return window.localStorage.getItem(k);
      } catch {
        return null;
      }
    },
    set: function (k, v) {
      try {
        window.localStorage.setItem(k, v);
      } catch {
        /* private mode — the feature simply does not persist */
      }
    },
  };

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ── page id, for the tip anchors ("home:#hero", "features:.feature-grid") ── */
  var file = window.location.pathname.split('/').pop() || 'index.html';
  var pageId = file === '' || file === 'index.html' ? 'home' : file.replace(/\.html$/, '');

  /* ══ navigation_model.fallback — standard topbar + labelled hamburger ══ */

  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-menu');

  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    menu.classList.toggle('is-open', open);
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('click', function (e) {
      if (
        menu.classList.contains('is-open') &&
        !menu.contains(e.target) &&
        !toggle.contains(e.target)
      ) {
        setMenu(false);
        toggle.focus();
      }
    });
  }

  /* ══ scroll_experience — a settle, not a slide. Opacity only, and never
       when the visitor has asked for less motion. ══ */

  function revealsAllowed() {
    return !reduceMotion.matches && root.getAttribute('data-intensity') !== 'quiet';
  }

  var revealed = false;

  function startReveals() {
    if (revealed || !revealsAllowed() || !('IntersectionObserver' in window)) return;
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    revealed = true;
    root.classList.add('js-reveals');
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -32px 0px' },
    );
    items.forEach(function (el) {
      io.observe(el);
    });
  }

  /* ══ intensity_toggle — "Gallery quiet" ══ */

  var QUIET_KEY = 'phlix-ac-intensity';
  var quietBtn = document.querySelector('[data-intensity-toggle]');

  function applyIntensity(quiet) {
    if (quiet) root.setAttribute('data-intensity', 'quiet');
    else root.removeAttribute('data-intensity');
    if (quietBtn) quietBtn.setAttribute('aria-pressed', quiet ? 'true' : 'false');
  }

  applyIntensity(store.get(QUIET_KEY) === 'quiet');

  if (quietBtn) {
    quietBtn.addEventListener('click', function () {
      var quiet = quietBtn.getAttribute('aria-pressed') !== 'true';
      applyIntensity(quiet);
      store.set(QUIET_KEY, quiet ? 'quiet' : 'full');
      if (quiet) {
        root.classList.remove('js-reveals');
        document.querySelectorAll('.reveal').forEach(function (el) {
          el.classList.add('is-visible');
        });
      }
    });
  }

  startReveals();

  /* ══ mascot.behavior — Palette, the studio companion ══
       Absent on the FAQ page and on the 404 (where Palette is the artwork),
       both marked with data-palette="off". Dismissal persists. */

  var PALETTE_KEY = 'phlix-ac-palette';
  var TIPS = {
    'home:#hero': 'Every frame is a brushstroke — start painting with your collection.',
    'home:.features-overview':
      "Watch together in perfect sync with SyncPlay. No buffering, no 'are we at the same part?'",
    'features:.feature-grid':
      'Live TV + DVR? A dash of canvas white and a mark of cadmium red — Phlix paints on any surface.',
    'download:#server':
      'One line to spin up the gallery. Palette knows the studio setup from memory.',
  };
  var PALETTE_ART =
    '<svg viewBox="0 0 64 64" fill="none" aria-hidden="true">' +
    '<path d="M32 8c13 0 24 8 24 19 0 7-6 9-11 9-4 0-6 2-6 5 0 4 3 5 3 9 0 4-4 6-10 6C18 56 8 45 8 30 8 17 19 8 32 8z" stroke="#1A1A1A" stroke-width="3" stroke-linejoin="round" fill="#E8E4D8"/>' +
    '<circle cx="22" cy="22" r="4.5" fill="#CC2200"/>' +
    '<circle cx="35" cy="18" r="4" fill="#0055AA"/>' +
    '<circle cx="18" cy="35" r="4" fill="#8A8070"/>' +
    '<path d="M44 44c6 4 10 8 13 14" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round"/>' +
    '</svg>';

  var palette = null;
  var bubble = null;
  var figure = null;

  /* Palette speaks briefly and then goes quiet again: a bubble parked in the
     corner forever would sit on top of the footer utility row and the last
     card of a grid. Nine seconds is long enough to read twice. */
  var sayTimer = null;

  function say(text) {
    if (!bubble) return;
    bubble.textContent = text;
    window.clearTimeout(sayTimer);
    if (text) {
      sayTimer = window.setTimeout(function () {
        if (bubble) bubble.textContent = '';
      }, 9000);
    }
  }

  function buildPalette() {
    if (document.body.getAttribute('data-palette') === 'off') return;
    if (store.get(PALETTE_KEY) === 'rest') return;

    palette = document.createElement('div');
    palette.className = 'palette-companion';
    palette.innerHTML =
      '<p class="palette-bubble" role="status" aria-live="polite"></p>' +
      '<div class="palette-row">' +
      '<button class="palette-figure" type="button" aria-label="Palette, the studio companion">' +
      PALETTE_ART +
      '</button>' +
      '<button class="palette-dismiss" type="button" ' +
      'aria-label="Palette, rest for a moment">×</button>' +
      '</div>';
    document.body.appendChild(palette);

    bubble = palette.querySelector('.palette-bubble');
    figure = palette.querySelector('.palette-figure');

    palette.querySelector('.palette-dismiss').addEventListener('click', function () {
      palette.remove();
      palette = null;
      store.set(PALETTE_KEY, 'rest');
    });

    /* mascot.behavior.easter_interactions[0] — five clicks on Palette */
    var clicks = 0;
    var clickTimer = null;
    figure.addEventListener('click', function () {
      clicks += 1;
      window.clearTimeout(clickTimer);
      clickTimer = window.setTimeout(function () {
        clicks = 0;
      }, 1800);
      if (clicks >= 5) {
        clicks = 0;
        figure.classList.add('is-settling', 'is-glowing');
        say('Palette spins, sets itself down, and gives you an approving look.');
        window.setTimeout(function () {
          if (figure) figure.classList.remove('is-settling');
        }, 900);
      }
    });

    /* mascot.behavior.easter_interactions[1] — hold a hover for two seconds */
    var holdTimer = null;
    figure.addEventListener('mouseenter', function () {
      holdTimer = window.setTimeout(function () {
        say('Palette offers you its sable brush — a gift for the artist who understands the work.');
      }, 2000);
    });
    figure.addEventListener('mouseleave', function () {
      window.clearTimeout(holdTimer);
    });

    /* mascot.behavior.tips — anchored to the section each tip belongs to.
       Not on a phone: a fixed bubble on a 320px viewport lands on top of the
       hero's primary CTA, and an unrequested aside must never cover the action.
       Palette still appears, still reacts when touched, still dismisses. */
    if (window.innerWidth <= 700) return;

    Object.keys(TIPS).forEach(function (where) {
      var parts = where.split(':');
      if (parts[0] !== pageId) return;
      var target = document.querySelector(parts[1]);
      if (!target || !('IntersectionObserver' in window)) return;
      var seen = false;
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting && !seen) {
              seen = true;
              say(TIPS[where]);
              io.disconnect();
            }
          });
        },
        { threshold: 0.35 },
      );
      io.observe(target);
    });
  }

  buildPalette();

  /* ══ easter_eggs ══
       Both are inert for anyone who does not go looking, never shadow a
       browser or assistive-technology shortcut, and exit on Esc. */

  /* easter_eggs[0] — logo-clicks:5. The logo is a link, so it is only counted
     on the page it already points at (home), where suppressing a pointless
     self-navigation costs the visitor nothing. */
  var logo = document.querySelector('.nav-logo');
  if (logo && pageId === 'home') {
    var logoClicks = 0;
    var logoTimer = null;
    logo.addEventListener('click', function (e) {
      e.preventDefault();
      logoClicks += 1;
      window.clearTimeout(logoTimer);
      logoTimer = window.setTimeout(function () {
        logoClicks = 0;
      }, 1800);
      if (logoClicks >= 5) {
        logoClicks = 0;
        if (figure) {
          figure.classList.add('is-settling', 'is-glowing');
          window.setTimeout(function () {
            if (figure) figure.classList.remove('is-settling');
          }, 900);
        }
        say('The work is well-made — keep painting.');
        window.setTimeout(clearEggs, 4000);
      }
    });
  }

  /* easter_eggs[1] — typed-word:palette. Never captures keys while the
     visitor is typing in a field, and never calls preventDefault. */
  var typed = '';
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      clearEggs();
      if (menu && menu.classList.contains('is-open')) {
        setMenu(false);
        if (toggle) toggle.focus();
      }
      return;
    }
    var el = document.activeElement;
    if (el && (el.matches('input, textarea, select') || el.isContentEditable)) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key.length !== 1) return;
    typed = (typed + e.key.toLowerCase()).slice(-7);
    if (typed.indexOf('palette') !== -1) {
      typed = '';
      if (figure) figure.classList.add('is-lifted');
      say('Palette recognizes its own name — you are a true artist. (Esc to set it back down.)');
    }
  });

  function clearEggs() {
    if (figure) figure.classList.remove('is-lifted', 'is-glowing', 'is-settling');
    if (bubble) bubble.textContent = '';
  }

  /* ══ seasonal_activation — mode "live-js" ══
       The season is a date range, not a build flag: the tokens each variant
       declares are applied in the browser, so no rebuild is needed. Append
       ?season=<slug> to preview one out of season. */

  var SEASONS = [
    {
      slug: 'autumn-study',
      from: '10-01',
      to: '11-15',
      tokens: {
        '--color-primary': '#8B3A00',
        '--color-secondary': '#CC6600',
        '--color-bg': '#F2EBD8',
      },
    },
    {
      slug: 'winter-white',
      from: '12-01',
      to: '01-15',
      tokens: {
        '--color-bg': '#F8F6F2',
        '--color-surface': '#EFECE4',
        '--color-secondary': '#003399',
      },
    },
    {
      slug: 'spring-opening',
      from: '03-15',
      to: '05-15',
      tokens: {
        '--color-secondary': '#AA2288',
        '--color-tertiary': '#007744',
      },
    },
  ];
  var SEASON_BANNER = 'The season shifts — Palette has prepared fresh grounds for the canvas.';

  function inRange(md, from, to) {
    // A range that wraps the new year (12-01..01-15) is two ranges.
    return from <= to ? md >= from && md <= to : md >= from || md <= to;
  }

  function activeSeason() {
    var forced = /[?&]season=([a-z-]+)/.exec(window.location.search);
    var now = new Date();
    var md =
      String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
    for (var i = 0; i < SEASONS.length; i++) {
      if (forced ? SEASONS[i].slug === forced[1] : inRange(md, SEASONS[i].from, SEASONS[i].to)) {
        return SEASONS[i];
      }
    }
    return null;
  }

  var season = activeSeason();
  if (season) {
    root.setAttribute('data-season', season.slug);
    Object.keys(season.tokens).forEach(function (token) {
      root.style.setProperty(token, season.tokens[token]);
    });
    var header = document.querySelector('.site-header');
    if (header && header.parentNode) {
      var banner = document.createElement('aside');
      banner.className = 'seasonal-banner';
      banner.innerHTML = '<div class="container"><p></p></div>';
      banner.querySelector('p').textContent = SEASON_BANNER;
      header.parentNode.insertBefore(banner, header);
    }
  }

  /* ══ 404 — show the address that was asked for, once we can read it ══ */

  var pathSlot = document.querySelector('[data-requested-path]');
  if (pathSlot) {
    pathSlot.textContent = window.location.pathname;
    pathSlot.hidden = false;
  }
})();
