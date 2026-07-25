/**
 * MAIN.JS — Abstract Canvas
 *
 * Self-contained, dependency-free enhancement layer. Everything here is
 * optional: with JS off every page keeps its copy, its CTAs and — via
 * css/nojs.css — its navigation (hero_experience.js_budget_kb is 0).
 *
 * In kit order: navigation_model.fallback · scroll_experience ·
 * intensity_toggle · mascot.behavior · easter_eggs · seasonal_activation.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  var root = document.documentElement;

  /* Wrapped because private mode throws on access. `store` outlives the tab
     (preferences); `session` survives one self-navigation (the logo egg). */
  function safeStore(which) {
    return {
      get: function (k) {
        try {
          return window[which].getItem(k);
        } catch {
          return null;
        }
      },
      set: function (k, v) {
        try {
          window[which].setItem(k, v);
        } catch {
          /* nothing to do: the feature is simply not persisted */
        }
      },
    };
  }

  var store = safeStore('localStorage');
  var session = safeStore('sessionStorage');

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

  /* Nine seconds reads twice; a bubble parked forever sits on the footer row.
     `earned` = a line the visitor asked for (an egg reward, a reaction to
     touching Palette) and it holds against the unrequested scroll tips. */
  var SAY_MS = 9000;
  var sayTimer = null;
  var holdUntil = 0;

  function say(text, earned) {
    if (!bubble) return;
    if (!earned && Date.now() < holdUntil) return;
    if (earned) holdUntil = Date.now() + SAY_MS;
    bubble.textContent = text;
    guardPalette(); /* speaking changes the footprint */
    window.clearTimeout(sayTimer);
    if (text) {
      sayTimer = window.setTimeout(function () {
        if (bubble) bubble.textContent = '';
        guardPalette();
      }, SAY_MS);
    }
  }

  /* ══ §19.11 — Palette must never be painted over a control ══
       Cheapest step first: decline the tip (the bubble is usually what grew the
       footprint), then step aside while the control is still underneath — and
       step straight back. Every width, every control, because "the primary CTA"
       is whatever copy_overlay renamed it to. Rects in REGEN_PLAN row 26. */

  var TIP_MAX_WIDTH = 700;
  var CONTROLS = 'a[href], button, input, select, textarea, [tabindex]';
  var guardBox = null;
  var guardFrame = null;
  var guardTargets = null;

  function paletteObstructs() {
    /* Cache: a hidden box measures 0, but the last good rect is the corner it
       comes back to. */
    var r = palette.getBoundingClientRect();
    if (r.width > 0 && r.height > 0) guardBox = r;
    if (!guardBox) return false;
    if (!guardTargets) guardTargets = document.querySelectorAll(CONTROLS);
    for (var i = 0; i < guardTargets.length; i++) {
      var el = guardTargets[i];
      if (el.contains(palette) || palette.contains(el)) continue;
      var b = el.getBoundingClientRect();
      if (b.width < 1 || b.height < 1) continue;
      if (b.bottom < 0 || b.top > window.innerHeight) continue;
      if (
        b.left < guardBox.right - 1 &&
        b.right > guardBox.left + 1 &&
        b.top < guardBox.bottom - 1 &&
        b.bottom > guardBox.top + 1
      ) {
        return true;
      }
    }
    return false;
  }

  function guardPalette() {
    if (!palette) return;
    palette.classList.remove('is-stepped-aside');
    if (!paletteObstructs()) return;
    if (bubble && bubble.textContent) {
      window.clearTimeout(sayTimer);
      bubble.textContent = '';
      if (!paletteObstructs()) return;
    }
    palette.classList.add('is-stepped-aside');
  }

  function scheduleGuard() {
    if (guardFrame) return;
    guardFrame = window.requestAnimationFrame(function () {
      guardFrame = null;
      guardPalette();
    });
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
    /* Inside <main>, not loose in <body>: a top-level div is content outside
       every landmark, and the mandated `main[tabindex="-1"]` would otherwise be
       a "control" the companion is forever on top of. */
    (document.getElementById('main-content') || document.body).appendChild(palette);

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
        say('Palette spins, sets itself down, and gives you an approving look.', true);
        window.setTimeout(function () {
          if (figure) figure.classList.remove('is-settling');
        }, 900);
      }
    });

    /* mascot.behavior.easter_interactions[1] — hold a hover for two seconds */
    var holdTimer = null;
    figure.addEventListener('mouseenter', function () {
      holdTimer = window.setTimeout(function () {
        say(
          'Palette offers you its sable brush — a gift for the artist who understands the work.',
          true,
        );
      }, 2000);
    });
    figure.addEventListener('mouseleave', function () {
      window.clearTimeout(holdTimer);
    });

    /* §19.11 — keep the companion off every button, at every scroll position. */
    window.addEventListener('scroll', scheduleGuard, { passive: true });
    window.addEventListener('resize', scheduleGuard);
    guardPalette();

    /* mascot.behavior.tips, anchored to their sections — but not on a phone,
       where §19.11 forbids an unrequested aside. Palette still appears, still
       reacts when touched, still dismisses. */
    if (window.innerWidth <= TIP_MAX_WIDTH) return;

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

  /* easter_eggs[0] — logo-clicks:5. The wordmark is a link named "Phlix home"
     and it stays one: an egg does not license `preventDefault()`, which killed
     both click and Enter. The count rides in sessionStorage across the
     self-navigation and expires after 20s, so it rewards a flurry. */
  var LOGO_KEY = 'phlix-ac-logo-clicks';
  var LOGO_WINDOW = 20000;
  var logo = document.querySelector('.nav-logo');

  function logoClicks() {
    var parts = (session.get(LOGO_KEY) || '').split(':');
    var count = parseInt(parts[0], 10);
    var at = parseInt(parts[1], 10);
    if (!count || !at || Date.now() - at > LOGO_WINDOW) return 0;
    return count;
  }

  if (logo && pageId === 'home') {
    if (logoClicks() >= 5) {
      session.set(LOGO_KEY, '');
      if (figure) {
        figure.classList.add('is-settling', 'is-glowing');
        window.setTimeout(function () {
          if (figure) figure.classList.remove('is-settling');
        }, 900);
      }
      say('The work is well-made — keep painting.', true);
      window.setTimeout(clearEggs, 4000);
    }

    logo.addEventListener('click', function () {
      session.set(LOGO_KEY, logoClicks() + 1 + ':' + Date.now());
      /* No preventDefault, no return false: the link navigates. */
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
      say(
        'Palette recognizes its own name — you are a true artist. (Esc to set it back down.)',
        true,
      );
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

  /* Attribute and tokens only. The banner is authored markup on every page, kept
     `display: none` by css/theme.css until `data-season` appears — which is also
     where the declared `motif_assets` mark is attached. Nothing is inserted
     after first paint, so no landmark appears above `banner`. */
  var season = activeSeason();
  if (season) {
    root.setAttribute('data-season', season.slug);
    Object.keys(season.tokens).forEach(function (token) {
      root.style.setProperty(token, season.tokens[token]);
    });
  }

  /* ══ 404 — show the address that was asked for, once we can read it ══ */

  var pathSlot = document.querySelector('[data-requested-path]');
  if (pathSlot) {
    pathSlot.textContent = window.location.pathname;
    pathSlot.hidden = false;
  }
})();
